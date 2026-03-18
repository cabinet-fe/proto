import { useState } from 'react'
import { Download, Plus, Search, Settings2, SlidersHorizontal } from 'lucide-react'
import { Scroll } from '../components/Scroll'
import { cn } from '../utils/cn'

export const pageMeta = {
  title: '菜谱列表布局'
}

type RecipeRow = {
  id: string
  title: string
  category: string
  author: string
  difficulty: '简单' | '中等' | '困难'
  time: string
  updatedAt: string
}

type LayoutKey = 'compact-top' | 'two-row' | 'left-filter'

const RECIPES: RecipeRow[] = [
  {
    id: 'RCP-2081',
    title: '番茄牛腩煲',
    category: '家常炖煮',
    author: '林夏',
    difficulty: '中等',
    time: '65 分钟',
    updatedAt: '2026-03-01'
  },
  {
    id: 'RCP-2076',
    title: '蒜香黄油虾',
    category: '快手海鲜',
    author: '顾言',
    difficulty: '简单',
    time: '20 分钟',
    updatedAt: '2026-02-28'
  },
  {
    id: 'RCP-2069',
    title: '照烧鸡腿饭',
    category: '便当主食',
    author: '周岚',
    difficulty: '简单',
    time: '30 分钟',
    updatedAt: '2026-02-27'
  },
  {
    id: 'RCP-2062',
    title: '黑椒牛排拼烤蔬菜',
    category: '西式主菜',
    author: '林夏',
    difficulty: '困难',
    time: '45 分钟',
    updatedAt: '2026-02-24'
  },
  {
    id: 'RCP-2058',
    title: '椰香南瓜浓汤',
    category: '汤品',
    author: '程予',
    difficulty: '中等',
    time: '35 分钟',
    updatedAt: '2026-02-22'
  },
  {
    id: 'RCP-2047',
    title: '罗勒青酱意面',
    category: '西式快餐',
    author: '顾言',
    difficulty: '中等',
    time: '28 分钟',
    updatedAt: '2026-02-20'
  },
  {
    id: 'RCP-2039',
    title: '低脂鸡胸藜麦沙拉',
    category: '轻食',
    author: '周岚',
    difficulty: '简单',
    time: '18 分钟',
    updatedAt: '2026-02-18'
  },
  {
    id: 'RCP-2028',
    title: '红酒炖牛肉',
    category: '法式炖菜',
    author: '程予',
    difficulty: '困难',
    time: '95 分钟',
    updatedAt: '2026-02-16'
  }
]

const LAYOUT_OPTIONS: { key: LayoutKey; label: string }[] = [
  { key: 'compact-top', label: '方案 A: 单行工具区' },
  { key: 'two-row', label: '方案 B: 双层工具区' },
  { key: 'left-filter', label: '方案 C: 左筛选布局' }
]

function DifficultyBadge({ value }: { value: RecipeRow['difficulty'] }) {
  const className =
    value === '简单'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : value === '中等'
      ? 'border-amber-200 bg-amber-50 text-amber-700'
      : 'border-rose-200 bg-rose-50 text-rose-700'

  return <span className={cn('inline-flex rounded-full border px-2.5 py-1 text-xs font-medium', className)}>{value}</span>
}

function TableView() {
  return (
    <div className='min-h-0 flex-1 bg-white'>
      <Scroll className='h-full w-full' viewportClassName='h-full w-full'>
        <div className='min-h-full'>
          <table className='min-w-full border-separate border-spacing-0'>
            <thead className='sticky top-0 z-10 bg-slate-100/95 backdrop-blur'>
              <tr>
                <th className='border-b border-slate-200 px-6 py-3 text-left text-xs font-semibold tracking-wide text-slate-500'>编号</th>
                <th className='border-b border-slate-200 px-6 py-3 text-left text-xs font-semibold tracking-wide text-slate-500'>菜谱名称</th>
                <th className='border-b border-slate-200 px-6 py-3 text-left text-xs font-semibold tracking-wide text-slate-500'>分类</th>
                <th className='border-b border-slate-200 px-6 py-3 text-left text-xs font-semibold tracking-wide text-slate-500'>作者</th>
                <th className='border-b border-slate-200 px-6 py-3 text-left text-xs font-semibold tracking-wide text-slate-500'>难度</th>
                <th className='border-b border-slate-200 px-6 py-3 text-left text-xs font-semibold tracking-wide text-slate-500'>时长</th>
                <th className='border-b border-slate-200 px-6 py-3 text-left text-xs font-semibold tracking-wide text-slate-500'>更新时间</th>
              </tr>
            </thead>
            <tbody>
              {RECIPES.map(row => (
                <tr key={row.id} className='transition hover:bg-slate-50'>
                  <td className='border-b border-slate-100 px-6 py-3 text-sm font-medium text-slate-700'>{row.id}</td>
                  <td className='border-b border-slate-100 px-6 py-3 text-sm text-slate-900'>{row.title}</td>
                  <td className='border-b border-slate-100 px-6 py-3 text-sm text-slate-600'>{row.category}</td>
                  <td className='border-b border-slate-100 px-6 py-3 text-sm text-slate-600'>{row.author}</td>
                  <td className='border-b border-slate-100 px-6 py-3 text-sm text-slate-700'>
                    <DifficultyBadge value={row.difficulty} />
                  </td>
                  <td className='border-b border-slate-100 px-6 py-3 text-sm text-slate-600'>{row.time}</td>
                  <td className='border-b border-slate-100 px-6 py-3 text-sm text-slate-600'>{row.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Scroll>
    </div>
  )
}

function SearchFields({ stacked = false }: { stacked?: boolean }) {
  return (
    <div className={cn('flex items-center gap-3', stacked ? 'flex-col' : 'flex-wrap')}>
      <label className={cn('relative', stacked ? 'w-full' : 'min-w-[240px] flex-1')}>
        <Search size={16} className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' />
        <input
          type='text'
          placeholder='搜索菜谱名称 / 编号 / 作者'
          className='h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200/70'
        />
      </label>

      <select className={cn('h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200/70', stacked && 'w-full')}>
        <option>全部分类</option>
        <option>家常炖煮</option>
        <option>轻食</option>
        <option>西式主菜</option>
      </select>

      <select className={cn('h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-200/70', stacked && 'w-full')}>
        <option>全部难度</option>
        <option>简单</option>
        <option>中等</option>
        <option>困难</option>
      </select>

      <button className={cn('inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 transition hover:bg-slate-100', stacked && 'w-full justify-center')}>
        <SlidersHorizontal size={15} />
        筛选
      </button>

      <button className={cn('inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 transition hover:bg-slate-100', stacked && 'w-full justify-center')}>
        <Settings2 size={15} />
        列设置
      </button>
    </div>
  )
}

function ActionButtons() {
  return (
    <div className='flex items-center gap-2'>
      <button className='inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 transition hover:bg-slate-50'>
        <Download size={15} />
        导出
      </button>
      <button className='inline-flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-3.5 text-sm font-medium text-white transition hover:bg-slate-800'>
        <Plus size={15} />
        新建菜谱
      </button>
    </div>
  )
}

function MetaBar() {
  return (
    <div className='flex items-center justify-between border-b border-slate-200 px-6 py-3'>
      <p className='text-sm text-slate-600'>共 {RECIPES.length} 条结果</p>
      <p className='text-sm text-slate-500'>默认按最近更新时间排序</p>
    </div>
  )
}

function CompactTopLayout() {
  return (
    <>
      <header className='border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white px-6 py-5'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-500'>Recipe Index</p>
            <h1 className='mt-1 text-2xl font-semibold text-slate-900'>菜谱列表</h1>
          </div>
          <ActionButtons />
        </div>
      </header>

      <div className='border-b border-slate-200 bg-slate-50/85 px-6 py-4'>
        <SearchFields />
      </div>

      <MetaBar />
      <TableView />
    </>
  )
}

function TwoRowLayout() {
  return (
    <>
      <header className='border-b border-slate-200 bg-gradient-to-b from-white to-slate-50 px-6 py-5'>
        <p className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-500'>Recipe Index</p>
        <div className='mt-2 flex flex-wrap items-center justify-between gap-3'>
          <h1 className='text-2xl font-semibold text-slate-900'>菜谱列表</h1>
          <ActionButtons />
        </div>
        <p className='mt-2 text-sm text-slate-500'>将“全局动作”和“筛选动作”拆成两层，阅读路径更直观。</p>
      </header>

      <div className='border-b border-slate-200 bg-white px-6 py-4'>
        <div className='grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center'>
          <SearchFields />
          <div className='rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600'>
            当前视图: 标准列表
          </div>
        </div>
      </div>

      <MetaBar />
      <TableView />
    </>
  )
}

function LeftFilterLayout() {
  return (
    <>
      <header className='border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white px-6 py-5'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-500'>Recipe Index</p>
            <h1 className='mt-1 text-2xl font-semibold text-slate-900'>菜谱列表</h1>
          </div>
          <ActionButtons />
        </div>
      </header>

      <div className='grid min-h-0 flex-1 lg:grid-cols-[280px_1fr]'>
        <aside className='border-b border-r border-slate-200 bg-slate-50/80 px-5 py-5 lg:border-b-0'>
          <p className='mb-3 text-sm font-medium text-slate-700'>筛选区</p>
          <SearchFields stacked />
        </aside>

        <div className='flex min-h-0 flex-1 flex-col'>
          <MetaBar />
          <TableView />
        </div>
      </div>
    </>
  )
}

export default function ListLayoutRecipesPage() {
  const [layout, setLayout] = useState<LayoutKey>('compact-top')

  return (
    <div className="mx-auto h-full w-full max-w-7xl px-4 py-6 [font-family:'Noto_Sans_SC','PingFang_SC','Microsoft_YaHei',sans-serif] sm:px-6 lg:px-8">
      <div className='mb-4 flex items-center justify-between gap-3'>
        <p className='text-sm text-slate-500'>切换不同布局骨架（不是配色切换）</p>
        <div className='inline-flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-1'>
          {LAYOUT_OPTIONS.map(option => (
            <button
              key={option.key}
              onClick={() => setLayout(option.key)}
              className={cn(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition',
                layout === option.key
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:bg-slate-100'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <section className='flex h-full min-h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_28px_60px_-42px_rgba(15,23,42,0.35)]'>
        {layout === 'compact-top' && <CompactTopLayout />}
        {layout === 'two-row' && <TwoRowLayout />}
        {layout === 'left-filter' && <LeftFilterLayout />}
      </section>
    </div>
  )
}
