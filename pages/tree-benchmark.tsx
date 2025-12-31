import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  RotateCcw,
  Zap,
  Clock,
  TrendingUp,
  Activity,
  Layers,
  GitBranch,
  Database,
  CheckCircle2,
  Loader2
} from 'lucide-react'

// ============================================================================
// Types & Constants
// ============================================================================

// 单个算法的测试结果
interface BenchmarkResult {
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

// 按规模分组的结果
interface ScaleResult {
  scale: number
  results: BenchmarkResult[]
  status: 'pending' | 'running' | 'completed'
}

const SCALES = [5000, 10000, 50000, 100000]
// ============================================================================
// Benchmark 配置（目标 B：更可信的 microbenchmark）
// ============================================================================

const ROUNDS = 40 // 每棵树每算法采样轮数（每轮会做批量迭代计时）
const TREES_PER_SCALE = 5 // 每个规模生成多棵树以降低“单个随机形态”带来的偶然性
const WARMUP_ROUNDS = 30 // JIT/缓存预热（每棵树每算法）
const OUTLIER_PERCENT = 0.1 // 移除最快/最慢各 10% 的异常值（截断均值）
const MAX_DEPTH = 10
const BASE_SEED = 20251231 // 固定 seed 让结果可复现（改动算法/参数时方便对比）
const TARGET_BATCH_MS = 2 // 每个 sample 期望耗时，用于自适应 innerIters（摊薄计时开销）
const MAX_INNER_ITERS = 200

const ALGORITHMS = [
  {
    name: 'DFS 递归',
    key: 'dfs-recursive',
    color: '#00ff88',
    gradient: 'from-emerald-400 to-green-500'
  },
  {
    name: 'DFS 栈',
    key: 'dfs-stack',
    color: '#00d4ff',
    gradient: 'from-cyan-400 to-blue-500'
  },
  {
    name: 'BFS',
    key: 'bfs',
    color: '#a855f7',
    gradient: 'from-purple-400 to-violet-500'
  }
]

// 滚动条样式
const scrollbarClass =
  '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-600/50'

// ============================================================================
function formatTime(ms: number): string {
  if (ms >= 1000) return `${(ms / 1000).toFixed(2)}s`
  if (ms >= 1) return `${ms.toFixed(2)}ms`
  if (ms >= 0.001) return `${(ms * 1000).toFixed(2)}μs`
  if (ms >= 0.000001) return `${(ms * 1000000).toFixed(2)}ns`
  if (ms >= 0.000000001) return `${(ms * 1000000000).toFixed(2)}ps`
  return '< 1ps'
}

// ============================================================================
// 子组件
// ============================================================================

/** 单个算法的结果行 */
function AlgorithmRow({
  result,
  maxTime
}: {
  result: BenchmarkResult
  maxTime: number
}) {
  const algo = ALGORITHMS.find(a => a.name === result.algorithm)!
  const barWidth = maxTime > 0 ? (result.medianTime / maxTime) * 100 : 0
  const metrics = [
    { label: '平均', value: result.avgTime, icon: Activity },
    { label: '中位', value: result.medianTime, icon: TrendingUp },
    { label: 'P10', value: result.p10Time, icon: Zap },
    { label: 'P90', value: result.p90Time, icon: Clock }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className='bg-slate-900/40 rounded-lg p-3 border border-slate-800/30'
    >
      {/* 桌面端 */}
      <div className='hidden lg:flex items-center gap-4'>
        {/* 算法名称 - 固定宽度 */}
        <div className='flex items-center gap-2 w-24 shrink-0'>
          <span
            className='w-2.5 h-2.5 rounded-full shrink-0'
            style={{
              backgroundColor: algo.color,
              boxShadow: `0 0 8px ${algo.color}`
            }}
          />
          <span className='text-sm font-medium text-white truncate'>
            {result.algorithm}
          </span>
        </div>
        {/* 进度条 - 固定宽度 */}
        <div className='w-32 shrink-0 h-1.5 bg-slate-800 rounded-full overflow-hidden'>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 0.8 }}
            className={`h-full bg-gradient-to-r ${algo.gradient} rounded-full`}
          />
        </div>
        {/* 指标 - 自动填充剩余空间 */}
        <div className='flex-1 flex items-center justify-end gap-5 text-xs'>
          {metrics.map(m => (
            <div key={m.label} className='flex items-center gap-1.5'>
              <m.icon className='w-3 h-3 text-slate-500' />
              <span className='text-[10px] text-slate-500 uppercase'>
                {m.label}
              </span>
              <span
                className='font-mono font-semibold w-16 text-right'
                style={{ color: algo.color }}
              >
                {formatTime(m.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* 移动端 */}
      <div className='lg:hidden space-y-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span
              className='w-2.5 h-2.5 rounded-full'
              style={{
                backgroundColor: algo.color,
                boxShadow: `0 0 8px ${algo.color}`
              }}
            />
            <span className='text-sm font-medium text-white'>
              {result.algorithm}
            </span>
          </div>
          <span
            className='font-mono text-sm font-semibold'
            style={{ color: algo.color }}
          >
            {formatTime(result.avgTime)}
          </span>
        </div>
        <div className='h-1.5 bg-slate-800 rounded-full overflow-hidden'>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${barWidth}%` }}
            transition={{ duration: 0.8 }}
            className={`h-full bg-gradient-to-r ${algo.gradient} rounded-full`}
          />
        </div>
        <div className='grid grid-cols-4 gap-1 text-[10px]'>
          {metrics.map(m => (
            <div key={m.label} className='text-center'>
              <span className='text-slate-500'>{m.label}</span>
              <div className='font-mono' style={{ color: algo.color }}>
                {formatTime(m.value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/** 规模卡片 - 展示单个规模下所有算法的表现 */
function ScaleCard({
  scaleResult,
  index
}: {
  scaleResult: ScaleResult
  index: number
}) {
  const { scale, results, status } = scaleResult
  const maxScoreTime = Math.max(...results.map(r => r.medianTime), 0.001)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className='relative'
    >
      <div className='absolute -inset-px bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 rounded-2xl blur-sm' />
      <div className='relative bg-slate-950/90 backdrop-blur-xl rounded-2xl border border-slate-800/50 overflow-hidden'>
        {/* 头部 */}
        <header className='relative px-5 py-3 border-b border-slate-800/50 bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-purple-500/5'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-9 h-9 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 flex items-center justify-center'>
                <Database className='w-4 h-4 text-cyan-400' />
              </div>
              <div>
                <h2 className='text-lg font-bold text-white font-mono'>
                  {scale.toLocaleString()}
                </h2>
                <p className='text-[10px] text-slate-500'>节点数量</p>
              </div>
            </div>
            {status === 'pending' && (
              <span className='px-2.5 py-1 text-[10px] font-medium text-slate-400 bg-slate-800/50 rounded-full'>
                等待中
              </span>
            )}
            {status === 'running' && (
              <div className='flex items-center gap-1.5 px-2.5 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20'>
                <Loader2 className='w-3 h-3 text-cyan-400 animate-spin' />
                <span className='text-[10px] font-medium text-cyan-400'>
                  运行中
                </span>
              </div>
            )}
            {status === 'completed' && results.length > 0 && (
              <div className='flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20'>
                <CheckCircle2 className='w-3 h-3 text-emerald-400' />
                <span className='text-[10px] font-medium text-emerald-400'>
                  完成
                </span>
              </div>
            )}
          </div>
        </header>

        {/* 内容 */}
        <div className='p-4'>
          <AnimatePresence mode='wait'>
            {results.length > 0 ? (
              <motion.div
                key='results'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='space-y-2'
              >
                {results.map(r => (
                  <AlgorithmRow
                    key={r.algorithm}
                    result={r}
                    maxTime={maxScoreTime}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key='empty'
                className='flex flex-col items-center justify-center py-6 text-slate-500'
              >
                <Layers className='w-8 h-8 mb-2 opacity-30' />
                <p className='text-xs'>点击开始运行基准测试</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// 主页面
// ============================================================================

export default function TreeBenchmark() {
  const [isRunning, setIsRunning] = useState(false)
  const [scaleResults, setScaleResults] = useState<ScaleResult[]>(
    SCALES.map(scale => ({ scale, results: [], status: 'pending' }))
  )
  const [error, setError] = useState<string | null>(null)
  const workerRef = useRef<Worker | null>(null)

  useEffect(() => {
    return () => {
      workerRef.current?.terminate()
      workerRef.current = null
    }
  }, [])

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
    | {
        type: 'done'
        payload: Array<{ scale: number; results: BenchmarkResult[] }>
      }
    | { type: 'error'; payload: { message: string; stack?: string } }

  const runAllBenchmarks = () => {
    // 如果已有任务在跑，先终止（避免并发 worker 抢 CPU）
    workerRef.current?.terminate()
    workerRef.current = null

    setError(null)
    setIsRunning(true)
    setScaleResults(
      SCALES.map(scale => ({ scale, results: [], status: 'pending' }))
    )

    const w = new Worker(
      new URL('../utils/tree-benchmark.worker.ts', import.meta.url),
      { type: 'module' }
    )
    workerRef.current = w

    w.onmessage = (evt: MessageEvent<WorkerMessage>) => {
      const msg = evt.data
      if (!msg) return

      if (msg.type === 'progress') {
        setScaleResults(prev =>
          prev.map(sr => {
            if (sr.scale !== msg.payload.scale) return sr
            if (msg.payload.status === 'running')
              return { ...sr, status: 'running' }
            return {
              ...sr,
              status: 'completed',
              results: msg.payload.results ?? sr.results
            }
          })
        )
        return
      }

      if (msg.type === 'done') {
        const byScale = new Map(
          msg.payload.map(x => [x.scale, x.results] as const)
        )
        setScaleResults(
          SCALES.map(scale => ({
            scale,
            status: 'completed',
            results: byScale.get(scale) ?? []
          }))
        )
        setIsRunning(false)
        workerRef.current?.terminate()
        workerRef.current = null
        return
      }

      if (msg.type === 'error') {
        setError(msg.payload.message)
        setIsRunning(false)
        workerRef.current?.terminate()
        workerRef.current = null
      }
    }

    w.postMessage({
      type: 'run',
      payload: {
        scales: SCALES,
        rounds: ROUNDS,
        treesPerScale: TREES_PER_SCALE,
        warmupRounds: WARMUP_ROUNDS,
        outlierPercent: OUTLIER_PERCENT,
        maxDepth: MAX_DEPTH,
        seed: BASE_SEED,
        targetBatchMs: TARGET_BATCH_MS,
        maxInnerIters: MAX_INNER_ITERS
      }
    })
  }

  const resetBenchmarks = () => {
    workerRef.current?.terminate()
    workerRef.current = null
    setIsRunning(false)
    setError(null)
    setScaleResults(
      SCALES.map(scale => ({ scale, results: [], status: 'pending' }))
    )
  }

  // 统计每个规模下哪个算法最快
  const summary = useMemo(() => {
    const completed = scaleResults.filter(sr => sr.status === 'completed')
    if (!completed.length) return null

    const fastest: Record<string, number> = Object.fromEntries(
      ALGORITHMS.map(a => [a.name, 0])
    )

    // 对每个规模，找出最快的算法
    completed.forEach(sr => {
      if (!sr.results.length) return
      let best = sr.results[0]
      for (let i = 1; i < sr.results.length; i++) {
        if (sr.results[i].medianTime < best.medianTime) best = sr.results[i]
      }
      fastest[best.algorithm]++
    })

    return { fastest, total: completed.length }
  }, [scaleResults])

  const steps = [
    {
      n: 1,
      bg: 'bg-emerald-500/20',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      title: '生成测试树',
      desc: `固定 seed 生成 ${TREES_PER_SCALE} 棵多叉树（每规模）`
    },
    {
      n: 2,
      bg: 'bg-cyan-500/20',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      title: 'JIT + 缓存预热',
      desc: `每算法预热 ${WARMUP_ROUNDS} 次，降低分层编译/缓存噪声`
    },
    {
      n: 3,
      bg: 'bg-purple-500/20',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      title: '正式测试',
      desc: `每算法 ${ROUNDS} 轮采样；每轮做“批量迭代计时”摊薄计时开销`
    },
    {
      n: 4,
      bg: 'bg-amber-500/20',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      title: '稳健统计',
      desc: `输出中位数 / P10 / P90 + 截断均值（去两端各 ${
        OUTLIER_PERCENT * 100
      }%）`
    }
  ]

  const optimizations = [
    {
      dot: 'bg-emerald-400',
      text: 'text-emerald-400',
      name: 'DFS 递归',
      desc: '内联遍历，缓存数组长度'
    },
    {
      dot: 'bg-cyan-400',
      text: 'text-cyan-400',
      name: 'DFS 栈',
      desc: '指针复用，避免 push/pop 开销'
    },
    {
      dot: 'bg-purple-400',
      text: 'text-purple-400',
      name: 'BFS',
      desc: '双指针队列，避免 O(n) shift'
    },
    {
      dot: 'bg-amber-400',
      text: 'text-amber-400',
      name: '测量优化',
      desc: '批量迭代计时 + 百分位数，减少定时器/GC 噪声'
    }
  ]

  return (
    <div className='h-screen flex bg-slate-950 text-white overflow-hidden'>
      {/* 背景 */}
      <div className='fixed inset-0 pointer-events-none'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl' />
        <div className='absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl' />
        <div
          className='absolute inset-0 opacity-[0.02]'
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* 左栏 */}
      <aside
        className={`relative w-[380px] shrink-0 h-screen overflow-y-auto p-6 space-y-6 border-r border-slate-800/50 ${scrollbarClass}`}
      >
        {/* 标题 */}
        <div>
          <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900/50 rounded-full border border-slate-800/50 mb-4'>
            <GitBranch className='w-4 h-4 text-cyan-400' />
            <span className='text-sm text-slate-400'>Tree Traversal</span>
          </div>
          <h1 className='text-3xl font-bold mb-3 bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent'>
            算法性能实验室
          </h1>
          <p className='text-sm text-slate-400 leading-relaxed'>
            对比 DFS 递归、DFS 栈、BFS 三种树遍历算法的性能
          </p>
        </div>

        {/* 按钮 */}
        <div className='flex gap-3'>
          <button
            onClick={runAllBenchmarks}
            disabled={isRunning}
            className='group relative flex-1 py-2.5 rounded-xl font-medium overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-90 group-hover:opacity-100 transition-opacity' />
            <span className='relative flex items-center justify-center gap-2 text-white'>
              {isRunning ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  运行中...
                </>
              ) : (
                <>
                  <Play className='w-4 h-4' />
                  开始测试
                </>
              )}
            </span>
          </button>
          <button
            onClick={resetBenchmarks}
            className='px-4 py-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 disabled:opacity-50'
          >
            <RotateCcw className='w-4 h-4' />
          </button>
        </div>

        {error && (
          <section className='bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 text-sm'>
            <div className='text-rose-300 font-medium mb-1'>运行失败</div>
            <div className='text-rose-200/80 break-words'>{error}</div>
          </section>
        )}

        {/* 图例 */}
        <div className='flex flex-wrap gap-4'>
          {ALGORITHMS.map(a => (
            <div key={a.key} className='flex items-center gap-2'>
              <span
                className='w-2.5 h-2.5 rounded-full'
                style={{
                  backgroundColor: a.color,
                  boxShadow: `0 0 6px ${a.color}`
                }}
              />
              <span className='text-sm text-slate-400'>{a.name}</span>
            </div>
          ))}
        </div>

        {/* 测试流程 */}
        <section className='bg-slate-900/40 rounded-xl p-4 border border-slate-800/30'>
          <h3 className='text-sm font-semibold text-white mb-3 flex items-center gap-2'>
            <Activity className='w-4 h-4 text-cyan-400' />
            测试流程
          </h3>
          <div className='space-y-3'>
            {steps.map(s => (
              <div key={s.n} className='flex gap-3 text-sm'>
                <span
                  className={`w-5 h-5 rounded-full ${s.bg} border ${s.border} flex items-center justify-center ${s.text} shrink-0 text-xs`}
                >
                  {s.n}
                </span>
                <div>
                  <div className='text-slate-300 font-medium'>{s.title}</div>
                  <div className='text-slate-500 text-xs'>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 性能优化 */}
        <section className='bg-slate-900/40 rounded-xl p-4 border border-slate-800/30'>
          <h3 className='text-sm font-semibold text-white mb-3 flex items-center gap-2'>
            <Zap className='w-4 h-4 text-amber-400' />
            性能优化
          </h3>
          <div className='space-y-2 text-sm'>
            {optimizations.map(o => (
              <div key={o.name} className='flex items-start gap-2'>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${o.dot} mt-2 shrink-0`}
                />
                <span>
                  <span className={`${o.text} font-medium`}>{o.name}：</span>
                  <span className='text-slate-400'>{o.desc}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 测试规模 */}
        <section className='bg-slate-900/40 rounded-xl p-4 border border-slate-800/30'>
          <h3 className='text-sm font-semibold text-white mb-3 flex items-center gap-2'>
            <Database className='w-4 h-4 text-purple-400' />
            测试规模
          </h3>
          <div className='grid grid-cols-4 gap-2'>
            {SCALES.map(s => (
              <div
                key={s}
                className='text-center py-2 bg-slate-800/50 rounded-lg border border-slate-700/30'
              >
                <div className='font-mono text-sm text-white'>
                  {s.toLocaleString()}
                </div>
                <div className='text-xs text-slate-500'>节点</div>
              </div>
            ))}
          </div>
        </section>
      </aside>

      {/* 右栏 */}
      <main
        className={`relative flex-1 h-screen overflow-y-auto p-6 ${scrollbarClass}`}
      >
        {/* 统计卡片 */}
        {summary && (
          <motion.section
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-slate-900/40 mb-4 rounded-xl p-4 border border-emerald-500/20'
          >
            <h3 className='text-xs uppercase tracking-wider text-slate-500 mb-3 text-center'>
              最快算法统计 ({summary.total} 规模)
            </h3>
            <div className='flex justify-around'>
              {ALGORITHMS.map(a => (
                <div key={a.key} className='text-center'>
                  <div
                    className='text-2xl font-bold font-mono'
                    style={{ color: a.color }}
                  >
                    {summary.fastest[a.name]}
                  </div>
                  <div className='text-xs text-slate-500'>{a.name}</div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 规模卡片列表 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className='space-y-4'
        >
          {scaleResults.map((sr, i) => (
            <ScaleCard key={sr.scale} scaleResult={sr} index={i} />
          ))}
        </motion.div>
      </main>
    </div>
  )
}
