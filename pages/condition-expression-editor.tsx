import { Fragment, useMemo, useState } from 'react'
import {
  Activity,
  Braces,
  Check,
  ChevronDown,
  CirclePlus,
  RefreshCw,
  Trash2,
  X
} from 'lucide-react'
import { Scroll } from '../components/Scroll'
import { cn } from '../utils/cn'

export const pageMeta = {
  title: '条件表达式编辑器'
}

type FieldType = 'number' | 'string' | 'boolean'
type FieldId = 'age' | 'country' | 'score' | 'isVip' | 'tagCount' | 'lastActiveDays'
type OperatorId = 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq' | 'contains' | 'startsWith' | 'isTrue' | 'isFalse'
type LogicMode = 'all' | 'any'

interface FieldOption {
  id: FieldId
  label: string
  type: FieldType
  hint: string
}

interface OperatorOption {
  id: OperatorId
  label: string
}

interface Condition {
  id: string
  field: FieldId
  operator: OperatorId
  value: string
}

interface ConditionGroup {
  id: string
  logic: LogicMode
  conditions: Condition[]
}

interface AudienceProfile {
  age: number
  country: string
  score: number
  isVip: boolean
  tagCount: number
  lastActiveDays: number
}

const FIELD_OPTIONS: FieldOption[] = [
  { id: 'age', label: '年龄', type: 'number', hint: '用户年龄' },
  { id: 'country', label: '国家 / 地区', type: 'string', hint: '地域属性' },
  { id: 'score', label: '评分', type: 'number', hint: '行为评分' },
  { id: 'isVip', label: 'VIP 用户', type: 'boolean', hint: '会员状态' },
  { id: 'tagCount', label: '标签数量', type: 'number', hint: '画像标签' },
  { id: 'lastActiveDays', label: '距上次活跃天数', type: 'number', hint: '近期活跃度' }
]

const OPERATOR_MAP: Record<FieldType, OperatorOption[]> = {
  number: [
    { id: 'gte', label: '大于等于' },
    { id: 'gt', label: '大于' },
    { id: 'lte', label: '小于等于' },
    { id: 'lt', label: '小于' },
    { id: 'eq', label: '等于' },
    { id: 'neq', label: '不等于' }
  ],
  string: [
    { id: 'eq', label: '等于' },
    { id: 'neq', label: '不等于' },
    { id: 'contains', label: '包含' },
    { id: 'startsWith', label: '开头是' }
  ],
  boolean: [
    { id: 'isTrue', label: '为 true' },
    { id: 'isFalse', label: '为 false' }
  ]
}

const COUNTRY_OPTIONS = ['中国', '美国', '日本', '德国', '新加坡', '英国']

const PROFILE_PRESETS: Array<{ id: string; name: string; note: string; values: AudienceProfile }> = [
  {
    id: 'growth',
    name: '增长型用户',
    note: '评分高、活跃好、标签丰富',
    values: { age: 29, country: '中国', score: 86, isVip: false, tagCount: 7, lastActiveDays: 3 }
  },
  {
    id: 'vip',
    name: '高价值 VIP',
    note: '会员用户且最近刚访问',
    values: { age: 35, country: '新加坡', score: 74, isVip: true, tagCount: 5, lastActiveDays: 1 }
  },
  {
    id: 'sleeping',
    name: '沉默老客',
    note: '年龄偏高但近期不活跃',
    values: { age: 42, country: '德国', score: 61, isVip: true, tagCount: 3, lastActiveDays: 28 }
  },
  {
    id: 'trial',
    name: '试用访客',
    note: '评分一般、非会员、标签较少',
    values: { age: 22, country: '美国', score: 58, isVip: false, tagCount: 2, lastActiveDays: 11 }
  }
]

let groupCounter = 3
let conditionCounter = 5

function getFieldOption(fieldId: FieldId) {
  return FIELD_OPTIONS.find(item => item.id === fieldId) ?? FIELD_OPTIONS[0]
}

function getDefaultOperator(fieldId: FieldId) {
  const field = getFieldOption(fieldId)
  return OPERATOR_MAP[field.type][0].id
}

function getDefaultValue(fieldId: FieldId) {
  const field = getFieldOption(fieldId)

  if (field.type === 'number') {
    return fieldId === 'lastActiveDays' ? '7' : fieldId === 'tagCount' ? '3' : '60'
  }

  if (field.type === 'string') {
    return COUNTRY_OPTIONS[0]
  }

  return ''
}

function createCondition(field: FieldId = 'score'): Condition {
  return {
    id: `condition-${conditionCounter++}`,
    field,
    operator: getDefaultOperator(field),
    value: getDefaultValue(field)
  }
}

function createGroup(logic: LogicMode, conditions: Condition[]): ConditionGroup {
  return {
    id: `group-${groupCounter++}`,
    logic,
    conditions
  }
}

function getInitialGroups() {
  return [
    createGroup('all', [
      { id: 'condition-1', field: 'age', operator: 'gte', value: '25' },
      { id: 'condition-2', field: 'score', operator: 'gte', value: '80' }
    ]),
    createGroup('all', [
      { id: 'condition-3', field: 'isVip', operator: 'isTrue', value: '' },
      { id: 'condition-4', field: 'lastActiveDays', operator: 'lte', value: '7' }
    ])
  ]
}

function formatValue(field: FieldOption, rawValue: string) {
  if (field.type === 'number') {
    return Number(rawValue || 0)
  }

  if (field.type === 'boolean') {
    return rawValue === 'true'
  }

  return rawValue
}

function getOperatorLabel(operatorId: OperatorId) {
  const match = Object.values(OPERATOR_MAP)
    .flat()
    .find(item => item.id === operatorId)

  return match?.label ?? operatorId
}

function evaluateCondition(condition: Condition, profile: AudienceProfile) {
  const field = getFieldOption(condition.field)
  const profileValue = profile[condition.field]
  const targetValue = formatValue(field, condition.value)

  switch (condition.operator) {
    case 'gt':
      return Number(profileValue) > Number(targetValue)
    case 'gte':
      return Number(profileValue) >= Number(targetValue)
    case 'lt':
      return Number(profileValue) < Number(targetValue)
    case 'lte':
      return Number(profileValue) <= Number(targetValue)
    case 'eq':
      return String(profileValue) === String(targetValue)
    case 'neq':
      return String(profileValue) !== String(targetValue)
    case 'contains':
      return String(profileValue).includes(String(targetValue))
    case 'startsWith':
      return String(profileValue).startsWith(String(targetValue))
    case 'isTrue':
      return Boolean(profileValue) === true
    case 'isFalse':
      return Boolean(profileValue) === false
    default:
      return false
  }
}

function describeCondition(condition: Condition) {
  const field = getFieldOption(condition.field)
  const operator = getOperatorLabel(condition.operator)

  if (field.type === 'boolean') {
    return `${field.label} ${operator}`
  }

  return `${field.label} ${operator} ${condition.value}`
}

function buildExpression(groups: ConditionGroup[], rootLogic: LogicMode) {
  const joiner = rootLogic === 'all' ? ' && ' : ' || '

  return groups
    .map(group => {
      const groupJoiner = group.logic === 'all' ? ' && ' : ' || '
      return `(${group.conditions
        .map(condition => {
          const field = condition.field
          const value = getFieldOption(field).type === 'string' ? `'${condition.value}'` : condition.value

          if (condition.operator === 'isTrue') {
            return `${field} === true`
          }

          if (condition.operator === 'isFalse') {
            return `${field} === false`
          }

          const operatorMap: Partial<Record<OperatorId, string>> = {
            gt: '>',
            gte: '>=',
            lt: '<',
            lte: '<=',
            eq: '===',
            neq: '!==',
            contains: '.includes',
            startsWith: '.startsWith'
          }

          if (condition.operator === 'contains' || condition.operator === 'startsWith') {
            return `${field}${operatorMap[condition.operator]}(${value})`
          }

          return `${field} ${operatorMap[condition.operator]} ${value}`
        })
        .join(groupJoiner)})`
    })
    .join(joiner)
}

function LogicToggle({
  value,
  onChange,
  compact = false
}: {
  value: LogicMode
  onChange: (value: LogicMode) => void
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        'inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5',
        compact && 'rounded-md'
      )}
    >
      {[
        { id: 'all' as const, label: 'AND' },
        { id: 'any' as const, label: 'OR' }
      ].map(option => {
        const active = value === option.id

        return (
          <button
            key={option.id}
            type='button'
            onClick={() => onChange(option.id)}
            className={cn(
              'rounded-md px-2.5 py-1 text-xs font-medium transition',
              active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700',
              compact && 'px-2 py-1'
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

function ResultPill({ passed }: { passed: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium',
        passed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
      )}
    >
      {passed ? <Check className='h-3.5 w-3.5' /> : <X className='h-3.5 w-3.5' />}
      {passed ? 'true' : 'false'}
    </span>
  )
}

function ControlShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('relative rounded-lg border border-slate-200 bg-white', className)}>{children}</div>
  )
}

export default function ConditionExpressionEditor() {
  const [rootLogic, setRootLogic] = useState<LogicMode>('any')
  const [groups, setGroups] = useState<ConditionGroup[]>(getInitialGroups)
  const [profile, setProfile] = useState<AudienceProfile>({ ...PROFILE_PRESETS[0].values })

  const evaluatedGroups = useMemo(() => {
    return groups.map(group => {
      const conditionResults = group.conditions.map(condition => ({
        condition,
        passed: evaluateCondition(condition, profile)
      }))

      const passed =
        group.logic === 'all'
          ? conditionResults.every(item => item.passed)
          : conditionResults.some(item => item.passed)

      return {
        ...group,
        passed,
        conditionResults
      }
    })
  }, [groups, profile])

  const finalResult = useMemo(() => {
    if (evaluatedGroups.length === 0) {
      return false
    }

    return rootLogic === 'all'
      ? evaluatedGroups.every(group => group.passed)
      : evaluatedGroups.some(group => group.passed)
  }, [evaluatedGroups, rootLogic])

  const expressionText = useMemo(() => buildExpression(groups, rootLogic), [groups, rootLogic])

  const totalConditions = useMemo(
    () => groups.reduce((sum, group) => sum + group.conditions.length, 0),
    [groups]
  )

  const updateGroup = (groupId: string, updater: (group: ConditionGroup) => ConditionGroup) => {
    setGroups(current => current.map(group => (group.id === groupId ? updater(group) : group)))
  }

  const updateCondition = (
    groupId: string,
    conditionId: string,
    updater: (condition: Condition) => Condition
  ) => {
    updateGroup(groupId, group => ({
      ...group,
      conditions: group.conditions.map(condition =>
        condition.id === conditionId ? updater(condition) : condition
      )
    }))
  }

  const removeCondition = (groupId: string, conditionId: string) => {
    updateGroup(groupId, group => {
      if (group.conditions.length === 1) {
        return group
      }

      return {
        ...group,
        conditions: group.conditions.filter(condition => condition.id !== conditionId)
      }
    })
  }

  const removeGroup = (groupId: string) => {
    setGroups(current => (current.length === 1 ? current : current.filter(group => group.id !== groupId)))
  }

  const logicLabel = rootLogic === 'all' ? '全部组都满足' : '任意一组满足'

  return (
    <Scroll className='h-full' viewportClassName='h-full'>
      <div className='min-h-full bg-slate-100 text-slate-900'>
        <div className='mx-auto flex min-h-full w-full max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6'>
          <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5'>
            <div className='flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between'>
              <div className='space-y-2'>
                <div className='inline-flex items-center gap-2 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600'>
                  <Braces className='h-3.5 w-3.5' />
                  Compact Expression Builder
                </div>
                <div>
                  <h1 className='text-xl font-semibold tracking-tight text-slate-900'>条件表达式编辑器</h1>
                  <p className='mt-1 text-sm leading-6 text-slate-500'>
                    面向表单场景的紧凑版条件编辑器，只保留字段、运算、取值和结果反馈。
                  </p>
                </div>
              </div>

              <div className='grid gap-2 sm:grid-cols-2'>
                <div className='rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5'>
                  <div className='text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400'>最终结果</div>
                  <div className='mt-2 flex items-center gap-2'>
                    <ResultPill passed={finalResult} />
                    <span className='text-sm text-slate-500'>{logicLabel}</span>
                  </div>
                </div>
                <div className='rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5'>
                  <div className='text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400'>当前规模</div>
                  <div className='mt-2 text-sm font-medium text-slate-700'>
                    {groups.length} 组 · {totalConditions} 条条件
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className='grid flex-1 gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.95fr)]'>
            <section className='rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4'>
              <div className='flex flex-col gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between'>
                <div>
                  <div className='text-sm font-medium text-slate-900'>表达式结构</div>
                  <div className='mt-1 text-xs text-slate-500'>适合嵌入普通表单，不依赖大卡片和重视觉装饰。</div>
                </div>

                <div className='flex flex-wrap items-center gap-2'>
                  <LogicToggle value={rootLogic} onChange={setRootLogic} />
                  <button
                    type='button'
                    onClick={() => setGroups(current => [...current, createGroup('all', [createCondition()])])}
                    className='inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50'
                  >
                    <CirclePlus className='h-4 w-4' />
                    新增条件组
                  </button>
                </div>
              </div>

              <div className='mt-4 space-y-2'>
                {groups.map((group, groupIndex) => {
                  const evaluatedGroup = evaluatedGroups.find(item => item.id === group.id)

                  return (
                    <Fragment key={group.id}>
                      {groupIndex > 0 ? (
                        <div className='flex items-center gap-2 px-1'>
                          <div className='h-px flex-1 bg-slate-200' />
                          <span className='rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500'>
                            {rootLogic === 'all' ? 'AND' : 'OR'}
                          </span>
                          <div className='h-px flex-1 bg-slate-200' />
                        </div>
                      ) : null}

                      <div className='rounded-xl border border-slate-200 bg-slate-50/70 p-3'>
                        <div className='flex flex-col gap-2 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between'>
                          <div className='flex flex-wrap items-center gap-2'>
                            <span className='rounded-md bg-white px-2 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200'>
                              条件组 {groupIndex + 1}
                            </span>
                            <LogicToggle
                              value={group.logic}
                              onChange={value => updateGroup(group.id, current => ({ ...current, logic: value }))}
                              compact
                            />
                            <ResultPill passed={evaluatedGroup?.passed ?? false} />
                          </div>

                          <div className='flex items-center gap-1.5'>
                            <button
                              type='button'
                              onClick={() =>
                                updateGroup(group.id, current => ({
                                  ...current,
                                  conditions: [...current.conditions, createCondition()]
                                }))
                              }
                              className='inline-flex h-8 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50'
                            >
                              <CirclePlus className='h-3.5 w-3.5' />
                              添加条件
                            </button>
                            <button
                              type='button'
                              onClick={() => removeGroup(group.id)}
                              disabled={groups.length === 1}
                              className='inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40'
                              aria-label='删除条件组'
                            >
                              <Trash2 className='h-4 w-4' />
                            </button>
                          </div>
                        </div>

                        <div className='mt-3 space-y-2'>
                          {group.conditions.map((condition, conditionIndex) => {
                            const field = getFieldOption(condition.field)
                            const operators = OPERATOR_MAP[field.type]
                            const conditionResult = evaluatedGroup?.conditionResults.find(
                              item => item.condition.id === condition.id
                            )

                            return (
                              <Fragment key={condition.id}>
                                {conditionIndex > 0 ? (
                                  <div className='px-1 text-[11px] font-medium text-slate-400'>
                                    {group.logic === 'all' ? 'AND' : 'OR'}
                                  </div>
                                ) : null}

                                <div className='grid gap-2 rounded-xl border border-slate-200 bg-white p-2.5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,0.9fr)_auto]'>
                                  <label className='space-y-1'>
                                    <span className='text-[11px] font-medium text-slate-400'>字段</span>
                                    <ControlShell>
                                      <select
                                        value={condition.field}
                                        onChange={event => {
                                          const nextField = event.target.value as FieldId
                                          updateCondition(group.id, condition.id, current => ({
                                            ...current,
                                            field: nextField,
                                            operator: getDefaultOperator(nextField),
                                            value: getDefaultValue(nextField)
                                          }))
                                        }}
                                        className='h-9 w-full appearance-none bg-transparent px-3 pr-8 text-sm text-slate-700 outline-none'
                                      >
                                        {FIELD_OPTIONS.map(option => (
                                          <option key={option.id} value={option.id}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </select>
                                      <ChevronDown className='pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
                                    </ControlShell>
                                    <div className='truncate text-[11px] text-slate-400'>{field.hint}</div>
                                  </label>

                                  <label className='space-y-1'>
                                    <span className='text-[11px] font-medium text-slate-400'>运算</span>
                                    <ControlShell>
                                      <select
                                        value={condition.operator}
                                        onChange={event =>
                                          updateCondition(group.id, condition.id, current => ({
                                            ...current,
                                            operator: event.target.value as OperatorId
                                          }))
                                        }
                                        className='h-9 w-full appearance-none bg-transparent px-3 pr-8 text-sm text-slate-700 outline-none'
                                      >
                                        {operators.map(option => (
                                          <option key={option.id} value={option.id}>
                                            {option.label}
                                          </option>
                                        ))}
                                      </select>
                                      <ChevronDown className='pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
                                    </ControlShell>
                                  </label>

                                  <label className='space-y-1'>
                                    <span className='text-[11px] font-medium text-slate-400'>取值</span>
                                    {field.type === 'boolean' ? (
                                      <div className='flex h-9 items-center rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 text-sm text-slate-400'>
                                        布尔字段无需输入
                                      </div>
                                    ) : field.type === 'string' ? (
                                      <ControlShell>
                                        <select
                                          value={condition.value}
                                          onChange={event =>
                                            updateCondition(group.id, condition.id, current => ({
                                              ...current,
                                              value: event.target.value
                                            }))
                                          }
                                          className='h-9 w-full appearance-none bg-transparent px-3 pr-8 text-sm text-slate-700 outline-none'
                                        >
                                          {COUNTRY_OPTIONS.map(option => (
                                            <option key={option} value={option}>
                                              {option}
                                            </option>
                                          ))}
                                        </select>
                                        <ChevronDown className='pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
                                      </ControlShell>
                                    ) : (
                                      <ControlShell>
                                        <input
                                          value={condition.value}
                                          inputMode='numeric'
                                          onChange={event =>
                                            updateCondition(group.id, condition.id, current => ({
                                              ...current,
                                              value: event.target.value.replace(/[^\d.-]/g, '')
                                            }))
                                          }
                                          className='h-9 w-full bg-transparent px-3 text-sm text-slate-700 outline-none'
                                          placeholder='输入数值'
                                        />
                                      </ControlShell>
                                    )}
                                  </label>

                                  <div className='flex items-end justify-between gap-2 md:justify-end'>
                                    <div className='pb-1'>
                                      <ResultPill passed={conditionResult?.passed ?? false} />
                                    </div>
                                    <button
                                      type='button'
                                      onClick={() => removeCondition(group.id, condition.id)}
                                      disabled={group.conditions.length === 1}
                                      className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40'
                                      aria-label='删除条件'
                                    >
                                      <Trash2 className='h-4 w-4' />
                                    </button>
                                  </div>
                                </div>
                              </Fragment>
                            )
                          })}
                        </div>
                      </div>
                    </Fragment>
                  )
                })}
              </div>
            </section>

            <aside className='space-y-4'>
              <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
                <div className='flex items-center gap-2 text-sm font-medium text-slate-900'>
                  <Braces className='h-4 w-4 text-slate-500' />
                  表达式预览
                </div>
                <div className='mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 px-3 py-2.5 font-mono text-xs leading-6 text-slate-100'>
                  {expressionText}
                </div>
              </section>

              <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
                <div className='flex items-center justify-between gap-3'>
                  <div>
                    <div className='flex items-center gap-2 text-sm font-medium text-slate-900'>
                      <Activity className='h-4 w-4 text-slate-500' />
                      测试数据
                    </div>
                    <p className='mt-1 text-xs text-slate-500'>切换预设或微调字段，实时验证表达式。</p>
                  </div>
                  <button
                    type='button'
                    onClick={() => setProfile({ ...PROFILE_PRESETS[0].values })}
                    className='inline-flex h-8 items-center gap-1 rounded-lg border border-slate-200 px-2.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50'
                  >
                    <RefreshCw className='h-3.5 w-3.5' />
                    重置
                  </button>
                </div>

                <div className='mt-3 grid gap-2'>
                  {PROFILE_PRESETS.map(preset => {
                    const active = Object.entries(preset.values).every(
                      ([key, value]) => profile[key as keyof AudienceProfile] === value
                    )

                    return (
                      <button
                        key={preset.id}
                        type='button'
                        onClick={() => setProfile({ ...preset.values })}
                        className={cn(
                          'rounded-xl border px-3 py-2 text-left transition',
                          active
                            ? 'border-slate-900 bg-slate-900 text-white'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
                        )}
                      >
                        <div className='text-sm font-medium'>{preset.name}</div>
                        <div className={cn('mt-1 text-xs', active ? 'text-slate-300' : 'text-slate-500')}>
                          {preset.note}
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className='mt-4 grid gap-2 sm:grid-cols-2'>
                  <label className='space-y-1'>
                    <span className='text-[11px] font-medium text-slate-400'>年龄</span>
                    <ControlShell>
                      <input
                        value={profile.age}
                        inputMode='numeric'
                        onChange={event =>
                          setProfile(current => ({
                            ...current,
                            age: Number(event.target.value.replace(/[^\d.-]/g, '') || 0)
                          }))
                        }
                        className='h-9 w-full bg-transparent px-3 text-sm text-slate-700 outline-none'
                      />
                    </ControlShell>
                  </label>

                  <label className='space-y-1'>
                    <span className='text-[11px] font-medium text-slate-400'>国家 / 地区</span>
                    <ControlShell>
                      <select
                        value={profile.country}
                        onChange={event => setProfile(current => ({ ...current, country: event.target.value }))}
                        className='h-9 w-full appearance-none bg-transparent px-3 pr-8 text-sm text-slate-700 outline-none'
                      >
                        {COUNTRY_OPTIONS.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className='pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
                    </ControlShell>
                  </label>

                  <label className='space-y-1'>
                    <span className='text-[11px] font-medium text-slate-400'>评分</span>
                    <ControlShell>
                      <input
                        value={profile.score}
                        inputMode='numeric'
                        onChange={event =>
                          setProfile(current => ({
                            ...current,
                            score: Number(event.target.value.replace(/[^\d.-]/g, '') || 0)
                          }))
                        }
                        className='h-9 w-full bg-transparent px-3 text-sm text-slate-700 outline-none'
                      />
                    </ControlShell>
                  </label>

                  <label className='space-y-1'>
                    <span className='text-[11px] font-medium text-slate-400'>VIP 用户</span>
                    <ControlShell>
                      <select
                        value={String(profile.isVip)}
                        onChange={event =>
                          setProfile(current => ({ ...current, isVip: event.target.value === 'true' }))
                        }
                        className='h-9 w-full appearance-none bg-transparent px-3 pr-8 text-sm text-slate-700 outline-none'
                      >
                        <option value='true'>true</option>
                        <option value='false'>false</option>
                      </select>
                      <ChevronDown className='pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
                    </ControlShell>
                  </label>

                  <label className='space-y-1'>
                    <span className='text-[11px] font-medium text-slate-400'>标签数量</span>
                    <ControlShell>
                      <input
                        value={profile.tagCount}
                        inputMode='numeric'
                        onChange={event =>
                          setProfile(current => ({
                            ...current,
                            tagCount: Number(event.target.value.replace(/[^\d.-]/g, '') || 0)
                          }))
                        }
                        className='h-9 w-full bg-transparent px-3 text-sm text-slate-700 outline-none'
                      />
                    </ControlShell>
                  </label>

                  <label className='space-y-1'>
                    <span className='text-[11px] font-medium text-slate-400'>距上次活跃天数</span>
                    <ControlShell>
                      <input
                        value={profile.lastActiveDays}
                        inputMode='numeric'
                        onChange={event =>
                          setProfile(current => ({
                            ...current,
                            lastActiveDays: Number(event.target.value.replace(/[^\d.-]/g, '') || 0)
                          }))
                        }
                        className='h-9 w-full bg-transparent px-3 text-sm text-slate-700 outline-none'
                      />
                    </ControlShell>
                  </label>
                </div>
              </section>

              <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
                <div className='flex items-center justify-between gap-2'>
                  <div className='text-sm font-medium text-slate-900'>命中明细</div>
                  <ResultPill passed={finalResult} />
                </div>
                <div className='mt-3 space-y-2'>
                  {evaluatedGroups.map((group, groupIndex) => (
                    <div key={group.id} className='rounded-xl border border-slate-200 bg-slate-50 p-3'>
                      <div className='flex items-center justify-between gap-2'>
                        <div className='text-sm font-medium text-slate-700'>组 {groupIndex + 1}</div>
                        <div className='flex items-center gap-2 text-xs text-slate-400'>
                          <span>{group.logic === 'all' ? 'AND' : 'OR'}</span>
                          <ResultPill passed={group.passed} />
                        </div>
                      </div>
                      <div className='mt-2 space-y-1.5'>
                        {group.conditionResults.map(item => (
                          <div
                            key={item.condition.id}
                            className='flex items-center justify-between gap-3 rounded-lg bg-white px-2.5 py-2'
                          >
                            <div className='min-w-0 text-xs text-slate-600'>{describeCondition(item.condition)}</div>
                            <ResultPill passed={item.passed} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </Scroll>
  )
}
