import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import {
  Funnel,
  LayoutPanelTop,
  PanelLeft,
  Search,
  Settings2,
  SlidersHorizontal,
  Table,
  RotateCcw
} from 'lucide-react'
import { cn } from '../utils/cn'

type OrderStatus = '待处理' | '进行中' | '已完成' | '已暂停'
type ColumnKey = 'id' | 'project' | 'client' | 'owner' | 'status' | 'budget' | 'updatedAt'

interface OrderRow {
  id: string
  project: string
  client: string
  owner: string
  status: OrderStatus
  budget: number
  updatedAt: string
}

interface FilterState {
  keyword: string
  status: '全部状态' | OrderStatus
  owner: '全部负责人' | string
}

interface ColumnDef {
  key: ColumnKey
  label: string
  align?: 'left' | 'right'
  render: (row: OrderRow) => string | ReactNode
}

const ROWS: OrderRow[] = [
  {
    id: 'PRJ-1024',
    project: '供应链可视化平台',
    client: '华北物流集团',
    owner: '王川',
    status: '进行中',
    budget: 486000,
    updatedAt: '2026-02-28'
  },
  {
    id: 'PRJ-1018',
    project: '门店经营看板升级',
    client: '星屿零售',
    owner: '李敏',
    status: '待处理',
    budget: 268000,
    updatedAt: '2026-02-26'
  },
  {
    id: 'PRJ-1013',
    project: '会员运营自动化',
    client: '海岚文旅',
    owner: '赵然',
    status: '已完成',
    budget: 715000,
    updatedAt: '2026-02-23'
  },
  {
    id: 'PRJ-1009',
    project: '客服质检模型接入',
    client: '启光保险',
    owner: '王川',
    status: '已暂停',
    budget: 352000,
    updatedAt: '2026-02-21'
  },
  {
    id: 'PRJ-1007',
    project: '仓储排班系统重构',
    client: '长衡制造',
    owner: '李敏',
    status: '进行中',
    budget: 534000,
    updatedAt: '2026-02-20'
  },
  {
    id: 'PRJ-1003',
    project: '财务归档流程优化',
    client: '南舟供应链',
    owner: '赵然',
    status: '待处理',
    budget: 192000,
    updatedAt: '2026-02-18'
  }
]

const STATUS_OPTIONS: FilterState['status'][] = ['全部状态', '待处理', '进行中', '已完成', '已暂停']
const OWNER_OPTIONS = ['全部负责人', '王川', '李敏', '赵然']

const COLUMNS: ColumnDef[] = [
  {
    key: 'id',
    label: '项目编号',
    render: row => <span className='font-medium text-slate-900'>{row.id}</span>
  },
  {
    key: 'project',
    label: '项目名称',
    render: row => <span className='text-slate-800'>{row.project}</span>
  },
  {
    key: 'client',
    label: '客户名称',
    render: row => <span className='text-slate-700'>{row.client}</span>
  },
  {
    key: 'owner',
    label: '负责人',
    render: row => <span className='text-slate-700'>{row.owner}</span>
  },
  {
    key: 'status',
    label: '状态',
    render: row => <StatusBadge status={row.status} />
  },
  {
    key: 'budget',
    label: '预算(元)',
    align: 'right',
    render: row => <span className='tabular-nums text-slate-800'>{row.budget.toLocaleString('zh-CN')}</span>
  },
  {
    key: 'updatedAt',
    label: '最近更新',
    render: row => <span className='text-slate-600'>{row.updatedAt}</span>
  }
]

const DEFAULT_FILTERS: FilterState = {
  keyword: '',
  status: '全部状态',
  owner: '全部负责人'
}

const DEFAULT_VISIBLE_COLUMNS: Record<ColumnKey, boolean> = {
  id: true,
  project: true,
  client: true,
  owner: true,
  status: true,
  budget: true,
  updatedAt: true
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
        status === '待处理' && 'border-amber-200 bg-amber-50 text-amber-700',
        status === '进行中' && 'border-sky-200 bg-sky-50 text-sky-700',
        status === '已完成' && 'border-emerald-200 bg-emerald-50 text-emerald-700',
        status === '已暂停' && 'border-slate-300 bg-slate-100 text-slate-600'
      )}
    >
      {status}
    </span>
  )
}

function useListDemoState() {
  const [draft, setDraft] = useState<FilterState>(DEFAULT_FILTERS)
  const [applied, setApplied] = useState<FilterState>(DEFAULT_FILTERS)
  const [visibleColumns, setVisibleColumns] = useState<Record<ColumnKey, boolean>>(DEFAULT_VISIBLE_COLUMNS)

  const filteredRows = useMemo(() => {
    return ROWS.filter(row => {
      const hitKeyword =
        !applied.keyword ||
        row.id.toLowerCase().includes(applied.keyword.toLowerCase()) ||
        row.project.toLowerCase().includes(applied.keyword.toLowerCase()) ||
        row.client.toLowerCase().includes(applied.keyword.toLowerCase())
      const hitStatus = applied.status === '全部状态' || row.status === applied.status
      const hitOwner = applied.owner === '全部负责人' || row.owner === applied.owner
      return hitKeyword && hitStatus && hitOwner
    })
  }, [applied])

  const activeColumns = useMemo(() => COLUMNS.filter(column => visibleColumns[column.key]), [visibleColumns])

  const setField = (field: keyof FilterState, value: string) => {
    setDraft(prev => ({ ...prev, [field]: value }))
  }

  const handleSearch = () => {
    setApplied(draft)
  }

  const handleReset = () => {
    setDraft(DEFAULT_FILTERS)
    setApplied(DEFAULT_FILTERS)
  }

  const toggleColumn = (key: ColumnKey) => {
    setVisibleColumns(prev => {
      const activeCount = Object.values(prev).filter(Boolean).length
      if (prev[key] && activeCount === 1) {
        return prev
      }
      return { ...prev, [key]: !prev[key] }
    })
  }

  return {
    draft,
    filteredRows,
    activeColumns,
    visibleColumns,
    setField,
    handleSearch,
    handleReset,
    toggleColumn
  }
}

function QueryFields({
  draft,
  setField,
  direction
}: {
  draft: FilterState
  setField: (field: keyof FilterState, value: string) => void
  direction: 'row' | 'column'
}) {
  const wrapperClass =
    direction === 'row'
      ? 'grid gap-3 md:grid-cols-[1.3fr_1fr_1fr]'
      : 'flex flex-col gap-3'

  return (
    <div className={wrapperClass}>
      <label className='flex flex-col gap-1'>
        <span className='text-xs font-medium text-slate-500'>关键字</span>
        <input
          type='text'
          value={draft.keyword}
          onChange={event => setField('keyword', event.target.value)}
          placeholder='项目名称 / 编号 / 客户'
          className='h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100'
        />
      </label>

      <label className='flex flex-col gap-1'>
        <span className='text-xs font-medium text-slate-500'>状态</span>
        <select
          value={draft.status}
          onChange={event => setField('status', event.target.value)}
          className='h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100'
        >
          {STATUS_OPTIONS.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className='flex flex-col gap-1'>
        <span className='text-xs font-medium text-slate-500'>负责人</span>
        <select
          value={draft.owner}
          onChange={event => setField('owner', event.target.value)}
          className='h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100'
        >
          {OWNER_OPTIONS.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

function ActionBar({
  handleSearch,
  handleReset,
  visibleColumns,
  toggleColumn,
  compact
}: {
  handleSearch: () => void
  handleReset: () => void
  visibleColumns: Record<ColumnKey, boolean>
  toggleColumn: (key: ColumnKey) => void
  compact?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-2', compact ? 'flex-wrap' : 'justify-end')}>
      <button
        onClick={handleSearch}
        className='inline-flex h-9 items-center gap-2 rounded-lg bg-sky-600 px-4 text-sm font-medium text-white transition hover:bg-sky-700'
      >
        <Search size={15} />
        查询
      </button>
      <button
        onClick={handleReset}
        className='inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition hover:bg-slate-50'
      >
        <RotateCcw size={15} />
        重置
      </button>
      <ColumnConfigMenu visibleColumns={visibleColumns} toggleColumn={toggleColumn} />
    </div>
  )
}

function ColumnConfigMenu({
  visibleColumns,
  toggleColumn
}: {
  visibleColumns: Record<ColumnKey, boolean>
  toggleColumn: (key: ColumnKey) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className='relative' ref={rootRef}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className='inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 transition hover:bg-slate-50'
      >
        <Settings2 size={15} />
        列配置
      </button>

      {open && (
        <div className='absolute right-0 top-11 z-20 w-48 rounded-xl border border-slate-200 bg-white p-3 shadow-lg'>
          <p className='mb-2 text-xs font-medium text-slate-500'>显示列</p>
          <div className='space-y-2'>
            {COLUMNS.map(column => (
              <label key={column.key} className='flex cursor-pointer items-center gap-2 text-sm text-slate-700'>
                <input
                  type='checkbox'
                  checked={visibleColumns[column.key]}
                  onChange={() => toggleColumn(column.key)}
                  className='h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500'
                />
                {column.label}
              </label>
            ))}
          </div>
          <p className='mt-2 text-[11px] text-slate-400'>至少保留 1 列</p>
        </div>
      )}
    </div>
  )
}

function ListTable({
  rows,
  columns,
  className
}: {
  rows: OrderRow[]
  columns: ColumnDef[]
  className?: string
}) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className='min-w-full border-separate border-spacing-0'>
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={column.key}
                className={cn(
                  'border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold tracking-wide text-slate-500',
                  column.align === 'right' ? 'text-right' : 'text-left'
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.id} className='transition hover:bg-sky-50/50'>
              {columns.map(column => (
                <td
                  key={`${row.id}-${column.key}`}
                  className={cn(
                    'border-b border-slate-100 px-4 py-3 text-sm',
                    column.align === 'right' ? 'text-right' : 'text-left'
                  )}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function VariantHeader({
  icon,
  title,
  description
}: {
  icon: ReactNode
  title: string
  description: string
}) {
  return (
    <div className='mb-4 flex items-start gap-3'>
      <div className='rounded-xl border border-slate-200 bg-white p-2 text-slate-600 shadow-sm'>{icon}</div>
      <div>
        <h2 className='text-xl font-semibold text-slate-900'>{title}</h2>
        <p className='mt-1 text-sm text-slate-500'>{description}</p>
      </div>
    </div>
  )
}

function TopBarLayout() {
  const state = useListDemoState()

  return (
    <section className='rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50/70 p-5'>
      <VariantHeader
        icon={<LayoutPanelTop size={18} />}
        title='方案 A：顶栏查询 + 下方结果'
        description='适合大多数后台页面，查询区域独立，结果区更稳定。'
      />

      <div className='rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
        <div className='grid gap-3 lg:grid-cols-[1fr_auto] lg:items-end'>
          <QueryFields draft={state.draft} setField={state.setField} direction='row' />
          <ActionBar
            handleSearch={state.handleSearch}
            handleReset={state.handleReset}
            visibleColumns={state.visibleColumns}
            toggleColumn={state.toggleColumn}
          />
        </div>
      </div>

      <div className='mt-4 rounded-xl border border-slate-200 bg-white shadow-sm'>
        <div className='flex items-center justify-between border-b border-slate-100 px-4 py-3'>
          <p className='text-sm text-slate-500'>共 {state.filteredRows.length} 条记录</p>
          <p className='text-sm text-slate-400'>标准列表布局</p>
        </div>
        <ListTable rows={state.filteredRows} columns={state.activeColumns} />
      </div>
    </section>
  )
}

function SideBarLayout() {
  const state = useListDemoState()

  return (
    <section className='rounded-2xl border border-slate-200 bg-slate-50 p-5'>
      <VariantHeader
        icon={<PanelLeft size={18} />}
        title='方案 B：左侧筛选 + 右侧表格'
        description='筛选项较多时更清晰，常用于运营管理、工单中心。'
      />

      <div className='grid gap-4 lg:grid-cols-[260px_1fr]'>
        <aside className='rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
          <div className='mb-3 flex items-center gap-2 text-sm font-medium text-slate-700'>
            <Funnel size={15} />
            查询条件
          </div>
          <QueryFields draft={state.draft} setField={state.setField} direction='column' />
          <div className='mt-4 flex flex-col gap-2'>
            <button
              onClick={state.handleSearch}
              className='inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 text-sm font-medium text-white transition hover:bg-slate-800'
            >
              <Search size={15} />
              查询
            </button>
            <button
              onClick={state.handleReset}
              className='inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 transition hover:bg-slate-50'
            >
              <RotateCcw size={15} />
              重置条件
            </button>
          </div>
        </aside>

        <div className='rounded-xl border border-slate-200 bg-white shadow-sm'>
          <div className='flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-3'>
            <div>
              <p className='text-sm font-medium text-slate-800'>项目列表</p>
              <p className='text-xs text-slate-500'>当前匹配 {state.filteredRows.length} 条</p>
            </div>
            <ColumnConfigMenu visibleColumns={state.visibleColumns} toggleColumn={state.toggleColumn} />
          </div>
          <ListTable rows={state.filteredRows} columns={state.activeColumns} className='max-h-[360px]' />
        </div>
      </div>
    </section>
  )
}

function ToolBarLayout() {
  const state = useListDemoState()

  return (
    <section className='rounded-2xl border border-slate-200 bg-white p-5'>
      <VariantHeader
        icon={<SlidersHorizontal size={18} />}
        title='方案 C：工具条查询 + 紧凑列表'
        description='用于高频操作场景，查询、动作与结果保持在一屏内。'
      />

      <div className='rounded-xl border border-slate-200 bg-slate-900 p-4 text-slate-100 shadow-sm'>
        <div className='flex flex-wrap items-center gap-3'>
          <div className='inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs text-slate-200'>
            <Table size={14} />
            紧凑工具条
          </div>
          <input
            type='text'
            value={state.draft.keyword}
            onChange={event => state.setField('keyword', event.target.value)}
            placeholder='输入关键字后回车或点击查询'
            className='h-9 min-w-[220px] flex-1 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/60 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
          />
          <select
            value={state.draft.status}
            onChange={event => state.setField('status', event.target.value)}
            className='h-9 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
          >
            {STATUS_OPTIONS.map(option => (
              <option key={option} value={option} className='text-slate-900'>
                {option}
              </option>
            ))}
          </select>
          <select
            value={state.draft.owner}
            onChange={event => state.setField('owner', event.target.value)}
            className='h-9 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-300/30'
          >
            {OWNER_OPTIONS.map(option => (
              <option key={option} value={option} className='text-slate-900'>
                {option}
              </option>
            ))}
          </select>
          <ActionBar
            handleSearch={state.handleSearch}
            handleReset={state.handleReset}
            visibleColumns={state.visibleColumns}
            toggleColumn={state.toggleColumn}
            compact
          />
        </div>
      </div>

      <div className='mt-4 overflow-hidden rounded-xl border border-slate-200'>
        <ListTable rows={state.filteredRows} columns={state.activeColumns} />
      </div>
    </section>
  )
}

export default function ListLayoutRecipesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 [font-family:'Noto_Sans_SC','PingFang_SC','Microsoft_YaHei',sans-serif] sm:px-6 lg:px-8">
      <header className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        <p className='text-sm font-medium tracking-wide text-sky-700'>LIST LAYOUT LAB</p>
        <h1 className='mt-2 text-3xl font-semibold text-slate-900'>列表页组合布局示例</h1>
        <p className='mt-2 text-sm text-slate-500'>
          每个方案都包含查询条件、查询按钮、表格主体、列配置，可直接复制到业务页面再微调字段。
        </p>
      </header>

      <TopBarLayout />
      <SideBarLayout />
      <ToolBarLayout />
    </div>
  )
}
