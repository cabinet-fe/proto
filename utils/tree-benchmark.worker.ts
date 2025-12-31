/// <reference lib="webworker" />

/**
 * Tree Benchmark Worker
 * - 目标：更可信的 microbenchmark（多树、多轮、批量迭代计时、稳健统计）
 * - 注意：不隔离分配成本（每次遍历内部照常创建 queue/stack 等），用于模拟真实代码场景
 */

export {}

// ============================================================================
// Types
// ============================================================================

interface TreeNode {
  value: number
  children: TreeNode[]
}

/**
 * 访问回调：在“访问某个节点”时触发（真实使用场景：回调必传）
 * - node：当前访问的节点
 * - indexInParent：该节点在 parent.children 中的索引；根节点为 -1
 * - parent：父节点；根节点为 null
 */
type VisitCallback = (
  node: TreeNode,
  indexInParent: number,
  parent: TreeNode | null
) => void

export interface BenchmarkResult {
  algorithm: string
  avgTime: number // 截断均值（ms/次遍历）
  medianTime: number
  p10Time: number
  p90Time: number
  minTime: number
  maxTime: number
  samples: number
  innerIters: number
}

export interface ScaleResult {
  scale: number
  results: BenchmarkResult[]
  status: 'completed'
}

interface BenchmarkConfig {
  scales: number[]
  rounds: number
  treesPerScale: number
  warmupRounds: number
  outlierPercent: number // 两端截断比例（0.1 表示去掉最快10%+最慢10%）
  maxDepth: number
  seed: number
  targetBatchMs: number // 每个 sample 期望耗时（用于自适应 innerIters）
  maxInnerIters: number
}

type AlgorithmKey = 'dfs-recursive' | 'dfs-stack' | 'bfs'

interface WorkerRunMessage {
  type: 'run'
  payload: BenchmarkConfig
}

type WorkerMessage =
  | {
      type: 'progress'
      payload: {
        scale: number
        index: number
        total: number
        status: 'running' | 'completed'
        results?: BenchmarkResult[]
      }
    }
  | { type: 'done'; payload: ScaleResult[] }
  | { type: 'error'; payload: { message: string; stack?: string } }

// ============================================================================
// RNG（可复现）
// ============================================================================

function createRng(seed: number) {
  // xorshift32
  let x = seed | 0
  if (x === 0) x = 0x6d2b79f5
  return () => {
    x ^= x << 13
    x ^= x >>> 17
    x ^= x << 5
    // 0..1（不要再 & 0xffffffff：位运算结果会回到有符号 32 位，可能产生负数随机值）
    return (x >>> 0) / 4294967296
  }
}

function mixSeed(...parts: number[]) {
  // 简单的整数混合，避免 seed 过于相关
  let x = 0x9e3779b9
  for (const p of parts) {
    x ^= p + 0x9e3779b9 + (x << 6) + (x >>> 2)
    x |= 0
  }
  return x | 0
}

// ============================================================================
// 算法实现（与 UI 解耦）
// ============================================================================

function dfsRecursive(root: TreeNode, onVisit: VisitCallback): number {
  // callback path：携带 parent + indexInParent（回调必传，无需每节点 if 分支）
  let count = 0
  const traverse = (node: TreeNode, parent: TreeNode | null, idx: number) => {
    onVisit(node, idx, parent)
    count++
    const children = node.children
    for (let i = 0, len = children.length; i < len; i++)
      traverse(children[i], node, i)
  }
  traverse(root, null, -1)
  return count
}

function dfsStack(root: TreeNode, onVisit: VisitCallback): number {
  // 使用并行数组保存 node/parent/index（避免每节点创建对象）
  let count = 0
  const stackNodes: TreeNode[] = [root]
  const stackParents: Array<TreeNode | null> = [null]
  const stackIndex: number[] = [-1]
  let ptr = 1

  while (ptr > 0) {
    const node = stackNodes[--ptr]
    const parent = stackParents[ptr]
    const idx = stackIndex[ptr]

    onVisit(node, idx, parent)
    count++

    const children = node.children
    // 反向压栈，保证出栈访问顺序与 children 的自然顺序一致
    for (let i = children.length - 1; i >= 0; i--) {
      stackNodes[ptr] = children[i]
      stackParents[ptr] = node
      stackIndex[ptr] = i
      ptr++
    }
  }

  return count
}

function bfs(root: TreeNode, onVisit: VisitCallback): number {
  // 并行队列保存 node/parent/index
  let count = 0
  const queueNodes: TreeNode[] = [root]
  const queueParents: Array<TreeNode | null> = [null]
  const queueIndex: number[] = [-1]
  let head = 0,
    tail = 1

  while (head < tail) {
    const node = queueNodes[head]
    const parent = queueParents[head]
    const idx = queueIndex[head]
    head++

    onVisit(node, idx, parent)
    count++

    const children = node.children
    for (let i = 0, len = children.length; i < len; i++) {
      queueNodes[tail] = children[i]
      queueParents[tail] = node
      queueIndex[tail] = i
      tail++
    }
  }

  return count
}

const ALGORITHMS: Array<{
  key: AlgorithmKey
  name: string
  fn: (root: TreeNode, onVisit: VisitCallback) => number
}> = [
  { name: 'DFS 递归', key: 'dfs-recursive', fn: dfsRecursive },
  { name: 'DFS 栈', key: 'dfs-stack', fn: dfsStack },
  { name: 'BFS', key: 'bfs', fn: bfs }
]

// ============================================================================
// 树生成（不计入遍历计时，但会影响缓存/布局，这是“真实场景”的一部分）
// ============================================================================

function generateTree(
  nodeCount: number,
  maxDepth: number,
  seed: number
): TreeNode {
  const rand = createRng(seed)
  const nodes: TreeNode[] = Array.from({ length: nodeCount }, (_, i) => ({
    value: i,
    children: []
  }))
  const depths = new Uint8Array(nodeCount)
  const validParents = [0]

  for (let i = 1; i < nodeCount; i++) {
    const pick = (rand() * validParents.length) | 0
    const parentIdx = validParents[pick]
    if (parentIdx === undefined) {
      throw new Error(
        `生成树失败：parentIdx 为空（pick=${pick}, len=${validParents.length}, i=${i}, seed=${seed}）`
      )
    }
    nodes[parentIdx].children.push(nodes[i])
    depths[i] = (depths[parentIdx] + 1) as number

    if (depths[i] < maxDepth - 1) validParents.push(i)
  }
  return nodes[0]
}

// ============================================================================
// 统计（稳健）
// ============================================================================

function computeRobustStats(
  times: number[],
  outlierPercent: number
): {
  trimmedMean: number
  median: number
  p10: number
  p90: number
  min: number
  max: number
  innerIters: number
} {
  if (times.length === 0)
    return {
      trimmedMean: 0,
      median: 0,
      p10: 0,
      p90: 0,
      min: 0,
      max: 0,
      innerIters: 1
    }

  const sorted = [...times].sort((a, b) => a - b)
  const min = sorted[0]
  const max = sorted[sorted.length - 1]

  const q = (p: number) => {
    const idx = (sorted.length - 1) * p
    const lo = Math.floor(idx)
    const hi = Math.ceil(idx)
    if (lo === hi) return sorted[lo]
    const t = idx - lo
    return sorted[lo] * (1 - t) + sorted[hi] * t
  }

  const p10 = q(0.1)
  const p90 = q(0.9)
  const median = q(0.5)

  const trimCount = Math.floor(sorted.length * outlierPercent)
  const trimmed = sorted.slice(
    trimCount,
    Math.max(trimCount + 1, sorted.length - trimCount)
  )
  const total = trimmed.reduce((a, b) => a + b, 0)
  const trimmedMean = total / trimmed.length

  return { trimmedMean, median, p10, p90, min, max, innerIters: 1 }
}

// ============================================================================
// Benchmark 核心：批量迭代计时 + 黑洞防 DCE + innerIters 自适应
// ============================================================================

let blackhole = 0

const defaultVisit: VisitCallback = (node, indexInParent, parent) => {
  // 尽量接近“真实使用”：访问时带走一点信息，避免被引擎完全当作无副作用路径
  blackhole ^= node.value
  blackhole ^= indexInParent
  if (parent) blackhole ^= parent.value
}

function calibrateInnerIters(
  tree: TreeNode,
  algorithm: (root: TreeNode, onVisit: VisitCallback) => number,
  targetBatchMs: number,
  maxInnerIters: number
) {
  // 运行几次取最小值，减少偶发噪声对估计的放大
  let best = Number.POSITIVE_INFINITY
  for (let i = 0; i < 3; i++) {
    const s = performance.now()
    blackhole ^= algorithm(tree, defaultVisit)
    const dt = performance.now() - s
    if (dt > 0 && dt < best) best = dt
  }
  if (!Number.isFinite(best) || best <= 0) return 1

  const iters = Math.round(targetBatchMs / best)
  return Math.min(maxInnerIters, Math.max(1, iters))
}

function runBatchedSamples(
  tree: TreeNode,
  algorithm: (root: TreeNode, onVisit: VisitCallback) => number,
  rounds: number,
  warmupRounds: number,
  targetBatchMs: number,
  maxInnerIters: number
): { timesPerIter: number[]; innerIters: number } {
  // JIT / 分层编译预热
  for (let i = 0; i < warmupRounds; i++)
    blackhole ^= algorithm(tree, defaultVisit)

  const innerIters = calibrateInnerIters(
    tree,
    algorithm,
    targetBatchMs,
    maxInnerIters
  )

  const times: number[] = new Array(rounds)
  for (let i = 0; i < rounds; i++) {
    const s = performance.now()
    for (let j = 0; j < innerIters; j++)
      blackhole ^= algorithm(tree, defaultVisit)
    times[i] = (performance.now() - s) / innerIters
  }
  return { timesPerIter: times, innerIters }
}

// ============================================================================
// Worker entry
// ============================================================================

self.onmessage = (evt: MessageEvent<WorkerRunMessage>) => {
  if (!evt.data || evt.data.type !== 'run') return

  try {
    const cfg = evt.data.payload
    const out: ScaleResult[] = []

    for (let si = 0; si < cfg.scales.length; si++) {
      const scale = cfg.scales[si]

      ;(self as DedicatedWorkerGlobalScope).postMessage({
        type: 'progress',
        payload: {
          scale,
          index: si,
          total: cfg.scales.length,
          status: 'running'
        }
      } satisfies WorkerMessage)

      // 对每个算法聚合所有树/轮次的样本
      const allTimesByAlgo: Record<AlgorithmKey, number[]> = {
        'dfs-recursive': [],
        'dfs-stack': [],
        bfs: []
      }
      const innerItersByAlgo: Record<AlgorithmKey, number> = {
        'dfs-recursive': 1,
        'dfs-stack': 1,
        bfs: 1
      }

      for (let ti = 0; ti < cfg.treesPerScale; ti++) {
        const seed = mixSeed(cfg.seed, scale, ti)
        const tree = generateTree(scale, cfg.maxDepth, seed)

        for (let ai = 0; ai < ALGORITHMS.length; ai++) {
          const algo = ALGORITHMS[ai]
          const { timesPerIter, innerIters } = runBatchedSamples(
            tree,
            algo.fn,
            cfg.rounds,
            cfg.warmupRounds,
            cfg.targetBatchMs,
            cfg.maxInnerIters
          )
          allTimesByAlgo[algo.key].push(...timesPerIter)
          // 记录最后一次 innerIters（不同树可能略不同，但 UI 里展示一个代表值即可）
          innerItersByAlgo[algo.key] = innerIters
        }
      }

      const results: BenchmarkResult[] = ALGORITHMS.map(algo => {
        const times = allTimesByAlgo[algo.key]
        const stats = computeRobustStats(times, cfg.outlierPercent)
        return {
          algorithm: algo.name,
          avgTime: stats.trimmedMean,
          medianTime: stats.median,
          p10Time: stats.p10,
          p90Time: stats.p90,
          minTime: stats.min,
          maxTime: stats.max,
          samples: times.length,
          innerIters: innerItersByAlgo[algo.key]
        }
      })

      out.push({ scale, results, status: 'completed' })
      ;(self as DedicatedWorkerGlobalScope).postMessage({
        type: 'progress',
        payload: {
          scale,
          index: si,
          total: cfg.scales.length,
          status: 'completed',
          results
        }
      } satisfies WorkerMessage)
    }

    ;(self as DedicatedWorkerGlobalScope).postMessage({
      type: 'done',
      payload: out
    } satisfies WorkerMessage)
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e))
    ;(self as DedicatedWorkerGlobalScope).postMessage({
      type: 'error',
      payload: { message: err.message, stack: err.stack }
    } satisfies WorkerMessage)
  }
}
