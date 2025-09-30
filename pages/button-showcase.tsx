import React, { useMemo, useState } from 'react'
import {
  Sparkles,
  ShieldCheck,
  Info,
  Flame,
  ArrowUpRight,
  RadioTower,
  Stars
} from 'lucide-react'

// 简易 className 合并工具，保持页面独立性
const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

type ToneKey = 'default' | 'success' | 'info' | 'danger' | 'warning' | 'theme'

// 定义不同色调在各类按钮样式中的表现
const toneStyles: Record<ToneKey, Record<string, string>> = {
  default: {
    label: '默认',
    solid:
      'bg-slate-900/90 text-slate-50 shadow-[0_18px_35px_-20px_rgba(15,23,42,0.9)] hover:bg-slate-900 focus-visible:outline-slate-200',
    outline:
      'border border-slate-600/80 text-slate-200 hover:bg-slate-900/50 focus-visible:outline-slate-200',
    soft: 'bg-slate-200/80 text-slate-900 hover:bg-slate-300/80 focus-visible:outline-slate-400',
    ghost: 'text-slate-200 hover:bg-white/10 focus-visible:outline-slate-200',
    neon: 'bg-slate-900 text-slate-100 shadow-[0_0_30px_rgba(148,163,184,0.35)] hover:shadow-[0_0_45px_rgba(148,163,184,0.55)] focus-visible:outline-slate-100',
    aura: 'bg-slate-900/80 text-slate-50 border border-white/10 shadow-[0_25px_45px_-25px_rgba(15,23,42,0.9)] hover:border-white/30 focus-visible:outline-slate-200'
  },
  success: {
    label: '成功',
    solid:
      'bg-emerald-500 text-emerald-50 shadow-[0_18px_35px_-20px_rgba(16,185,129,0.9)] hover:bg-emerald-400 focus-visible:outline-emerald-200',
    outline:
      'border border-emerald-400 text-emerald-200 hover:bg-emerald-500/10 focus-visible:outline-emerald-200',
    soft: 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 focus-visible:outline-emerald-300',
    ghost:
      'text-emerald-300 hover:bg-emerald-500/15 focus-visible:outline-emerald-200',
    neon: 'bg-emerald-500/90 text-emerald-50 shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:shadow-[0_0_50px_rgba(16,185,129,0.7)] focus-visible:outline-emerald-200',
    aura: 'bg-gradient-to-br from-emerald-500/90 via-emerald-400/80 to-emerald-600/90 text-emerald-50 border border-emerald-200/30 hover:border-emerald-100/80 focus-visible:outline-emerald-200'
  },
  info: {
    label: '信息',
    solid:
      'bg-sky-500 text-sky-50 shadow-[0_18px_35px_-20px_rgba(14,165,233,0.9)] hover:bg-sky-400 focus-visible:outline-sky-200',
    outline:
      'border border-sky-400 text-sky-100 hover:bg-sky-400/10 focus-visible:outline-sky-200',
    soft: 'bg-sky-100 text-sky-900 hover:bg-sky-200 focus-visible:outline-sky-300',
    ghost: 'text-sky-300 hover:bg-sky-500/15 focus-visible:outline-sky-200',
    neon: 'bg-sky-500/90 text-white shadow-[0_0_34px_rgba(56,189,248,0.45)] hover:shadow-[0_0_60px_rgba(56,189,248,0.65)] focus-visible:outline-sky-200',
    aura: 'bg-gradient-to-br from-sky-500/90 via-sky-400/80 to-blue-600/90 text-sky-50 border border-sky-200/40 hover:border-sky-100 focus-visible:outline-sky-200'
  },
  danger: {
    label: '危险',
    solid:
      'bg-rose-500 text-rose-50 shadow-[0_18px_35px_-20px_rgba(244,63,94,0.9)] hover:bg-rose-400 focus-visible:outline-rose-200',
    outline:
      'border border-rose-400 text-rose-100 hover:bg-rose-500/15 focus-visible:outline-rose-200',
    soft: 'bg-rose-100 text-rose-900 hover:bg-rose-200 focus-visible:outline-rose-300',
    ghost: 'text-rose-300 hover:bg-rose-500/20 focus-visible:outline-rose-200',
    neon: 'bg-rose-500/90 text-white shadow-[0_0_34px_rgba(244,63,94,0.5)] hover:shadow-[0_0_60px_rgba(244,63,94,0.65)] focus-visible:outline-rose-200',
    aura: 'bg-gradient-to-br from-rose-500/90 via-rose-400/80 to-rose-600/90 text-rose-50 border border-rose-100/50 hover:border-rose-50 focus-visible:outline-rose-200'
  },
  warning: {
    label: '警告',
    solid:
      'bg-amber-500 text-amber-950 shadow-[0_18px_35px_-20px_rgba(245,158,11,0.9)] hover:bg-amber-400 focus-visible:outline-amber-200',
    outline:
      'border border-amber-400 text-amber-100 hover:bg-amber-400/15 focus-visible:outline-amber-200',
    soft: 'bg-amber-100 text-amber-900 hover:bg-amber-200 focus-visible:outline-amber-300',
    ghost:
      'text-amber-300 hover:bg-amber-400/20 focus-visible:outline-amber-200',
    neon: 'bg-amber-500/90 text-amber-950 shadow-[0_0_34px_rgba(245,158,11,0.5)] hover:shadow-[0_0_60px_rgba(245,158,11,0.7)] focus-visible:outline-amber-200',
    aura: 'bg-gradient-to-br from-amber-500/95 via-orange-400/85 to-yellow-500/95 text-amber-950 border border-amber-200/60 hover:border-amber-100 focus-visible:outline-amber-200'
  },
  theme: {
    label: '主题',
    solid:
      'bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white shadow-[0_20px_45px_-22px_rgba(139,92,246,0.8)] hover:from-indigo-400 hover:via-purple-500 hover:to-pink-500 focus-visible:outline-purple-200',
    outline:
      'border border-indigo-400/80 text-indigo-100 hover:bg-indigo-500/15 focus-visible:outline-purple-200',
    soft: 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200 focus-visible:outline-indigo-300',
    ghost:
      'text-indigo-300 hover:bg-indigo-500/15 focus-visible:outline-purple-200',
    neon: 'bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 text-white shadow-[0_0_38px_rgba(167,139,250,0.55)] hover:shadow-[0_0_70px_rgba(167,139,250,0.75)] focus-visible:outline-purple-200',
    aura: 'bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.7),_rgba(192,132,252,0.55))] text-white border border-purple-200/40 hover:border-purple-50 focus-visible:outline-purple-200'
  }
}

const toneOrder: ToneKey[] = [
  'default',
  'success',
  'info',
  'danger',
  'warning',
  'theme'
]

const showcaseGroups = [
  {
    id: 'solid',
    title: '炫彩实心按钮',
    description:
      '强调主操作的高光按钮，饱满鲜明的配色搭配柔和光晕，适合关键路径 CTA。',
    styleKey: 'solid',
    icon: Sparkles
  },
  {
    id: 'outline',
    title: '凌厉描边按钮',
    description:
      '轻盈的描边表达，让次级操作在高对比背景中仍具存在感，避免视觉负担。',
    styleKey: 'outline',
    icon: ShieldCheck
  },
  {
    id: 'soft',
    title: '柔雾质感按钮',
    description:
      '采用透明度和低饱和度配色，适合频繁出现的中立操作，不易产生干扰。',
    styleKey: 'soft',
    icon: Info
  },
  {
    id: 'ghost',
    title: '极简幻影按钮',
    description: '隐藏式交互元素，仅在 hover 时显露背景，适合沉浸式内容布局。',
    styleKey: 'ghost',
    icon: RadioTower
  },
  {
    id: 'neon',
    title: '霓虹悬浮按钮',
    description: '高对比霓虹光效搭配轻微位移，为强调状态和动效体验而生。',
    styleKey: 'neon',
    icon: Flame
  },
  {
    id: 'aura',
    title: '流光能量按钮',
    description: '混合玻璃拟态与渐变边框，营造未来流体质感，用于高价值场景。',
    styleKey: 'aura',
    icon: ArrowUpRight
  }
]

const heroStatistics = [
  {
    label: '动效帧率',
    value: '120fps',
    detail: '保持顺滑视觉反馈'
  },
  {
    label: '配色权重',
    value: '6色系',
    detail: '全局品牌一致'
  },
  {
    label: '交互状态',
    value: 'Hover / Active / Focus',
    detail: '状态语义明确'
  }
]

const ButtonShowcase: React.FC = () => {
  const [pressed, setPressed] = useState<ToneKey | null>('theme')

  // 计算用于动效展示的动态渐变背景
  const dynamicGradient = useMemo(() => {
    const palette =
      toneStyles[pressed ?? 'theme'].solid.match(/from-([a-z0-9-]+)/)
    return `radial-gradient(circle at 0% 0%, rgba(129, 140, 248, 0.45), transparent 55%), radial-gradient(circle at 100% 0%, rgba(236, 72, 153, 0.38), transparent 60%), radial-gradient(circle at 50% 100%, rgba(56, 189, 248, 0.35), transparent 55%)`
  }, [pressed])

  return (
    <div className='relative min-h-screen overflow-hidden bg-slate-950 text-slate-100'>
      {/* 背景动效层 */}
      <div
        className='pointer-events-none absolute inset-0 opacity-90 transition-all duration-700'
        style={{ backgroundImage: dynamicGradient }}
      />

      <div className='relative z-10 flex min-h-screen flex-col px-6 pb-16 pt-20 md:px-12 lg:px-20'>
        {/* 顶部标题区 */}
        <header className='mx-auto w-full max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_45px_90px_-45px_rgba(99,102,241,0.45)] backdrop-blur-2xl'>
          <div className='flex flex-col gap-8 md:flex-row md:items-center md:justify-between'>
            <div className='space-y-4'>
              <div className='inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200'>
                <Stars className='h-4 w-4' />
                Button Atmosphere Lab
              </div>
              <h1 className='text-4xl font-bold tracking-tight text-white md:text-5xl'>
                高级按钮视觉实验
              </h1>
              <p className='max-w-2xl text-base text-slate-200/90 md:text-lg'>
                通过渐变、玻璃拟态、霓虹光晕与动效细节组合，构建多组可复用按钮语义集，为未来派管理系统定制高能
                UI 语言。
              </p>
            </div>
            <div className='grid w-full max-w-sm grid-cols-1 gap-4 text-sm text-slate-200/80 sm:grid-cols-3'>
              {heroStatistics.map(stat => (
                <div
                  key={stat.label}
                  className='rounded-2xl border border-white/10 bg-white/5 p-4 text-center shadow-[0_25px_50px_-25px_rgba(15,23,42,0.6)]'
                >
                  <div className='text-xs uppercase tracking-[0.2em]'>
                    {stat.label}
                  </div>
                  <div className='mt-1 text-sm font-semibold text-white'>
                    {stat.value}
                  </div>
                  <div className='mt-1 text-xs text-slate-200/70'>
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* 按钮展示主区域 */}
        <main className='mx-auto mt-14 w-full max-w-6xl space-y-12'>
          {showcaseGroups.map(group => {
            const Icon = group.icon
            return (
              <section
                key={group.id}
                className='rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_55px_120px_-70px_rgba(59,130,246,0.45)] backdrop-blur-2xl'
              >
                <div className='flex flex-col gap-6 md:flex-row md:items-start md:justify-between'>
                  <div className='max-w-xl space-y-2'>
                    <div className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200'>
                      <Icon className='h-4 w-4' />
                      {group.title}
                    </div>
                    <h2 className='text-2xl font-semibold text-white'>
                      {group.title}
                    </h2>
                    <p className='text-sm text-slate-200/80'>
                      {group.description}
                    </p>
                  </div>
                  <div className='flex items-center gap-3 text-xs text-slate-200/70'>
                    <span className='rounded-full bg-white/10 px-3 py-1 font-medium uppercase tracking-[0.2em]'>
                      {group.styleKey}
                    </span>
                    <span>六种语义配色</span>
                  </div>
                </div>

                <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                  {toneOrder.map(tone => {
                    const toneInfo = toneStyles[tone]
                    const isActive = pressed === tone
                    return (
                      <button
                        key={`${group.id}-${tone}`}
                        type='button'
                        onClick={() => setPressed(tone)}
                        className={cn(
                          'group relative overflow-hidden rounded-2xl border border-white/5 p-[1px] transition-all duration-300 hover:border-white/20 focus-visible:outline-none',
                          isActive &&
                            'border-white/40 shadow-[0_30px_60px_-35px_rgba(165,180,252,0.8)]'
                        )}
                      >
                        <div
                          className={cn(
                            'relative flex h-full w-full flex-col items-start justify-center gap-2 rounded-2xl px-5 py-5 text-left transition-all duration-300',
                            toneInfo[group.styleKey],
                            group.styleKey === 'ghost' &&
                              'backdrop-blur-md hover:backdrop-blur-xl border border-white/5',
                            group.styleKey === 'neon' &&
                              'after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-2xl after:opacity-0 after:transition-opacity after:duration-300 after:content-[""] hover:after:opacity-100',
                            group.styleKey === 'neon' &&
                              'after:bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.15)_0deg,rgba(255,255,255,0)_140deg,rgba(255,255,255,0.3)_320deg)]',
                            group.styleKey === 'aura' &&
                              'shadow-[0_40px_100px_-60px_rgba(129,140,248,0.7)]'
                          )}
                        >
                          <span className='text-xs font-semibold uppercase tracking-[0.3em] text-white/70'>
                            {toneInfo.label}
                          </span>
                          <div className='flex items-center gap-3 text-base font-semibold tracking-wide'>
                            <span>磁场按钮</span>
                          </div>
                          <p className='text-xs text-white/70'>
                            {group.styleKey === 'solid' &&
                              '适合强调主线操作，捕捉用户视线。'}
                            {group.styleKey === 'outline' &&
                              '保持轻量视觉的同时提供明确框架。'}
                            {group.styleKey === 'soft' &&
                              '柔和层次让背景更通透，适合中性操作。'}
                            {group.styleKey === 'ghost' &&
                              '极简风格，在 hover 中显露交互意图。'}
                            {group.styleKey === 'neon' &&
                              '霓虹质感瞬间点亮界面动能。'}
                            {group.styleKey === 'aura' &&
                              '流光包裹营造仪式感，适配高价值场景。'}
                          </p>

                          <span
                            className={cn(
                              'absolute right-5 top-5 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.35em] transition-all duration-300',
                              group.styleKey === 'ghost'
                                ? 'text-white/40'
                                : 'text-white/70',
                              isActive && 'text-white'
                            )}
                          >
                            Use
                            <Sparkles className='h-3 w-3' />
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </main>

        {/* 交互说明区 */}
        <footer className='mx-auto mt-16 w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-sm text-slate-200/80 shadow-[0_50px_100px_-60px_rgba(79,70,229,0.65)] backdrop-blur-2xl'>
          <h3 className='text-lg font-semibold text-white'>交互细节指南</h3>
          <ul className='mt-4 grid gap-3 md:grid-cols-2'>
            <li className='rounded-2xl border border-white/10 bg-white/10 p-4'>
              <strong className='font-semibold text-white'>Hover 状态：</strong>
              利用 `hover:translate-y-0`,
              `hover:shadow-xl`、渐变强化视觉反馈，保持 150-250ms 的平滑过渡。
            </li>
            <li className='rounded-2xl border border-white/10 bg-white/10 p-4'>
              <strong className='font-semibold text-white'>Focus 状态：</strong>
              使用 `focus-visible:outline`
              与高对比色，兼顾无鼠标用户的可达性体验。
            </li>
            <li className='rounded-2xl border border-white/10 bg-white/10 p-4'>
              <strong className='font-semibold text-white'>
                Active 状态：
              </strong>
              通过 `active:translate-y-0.5`、`scale-98`
              平衡按压质感与动画连贯性。
            </li>
            <li className='rounded-2xl border border-white/10 bg-white/10 p-4'>
              <strong className='font-semibold text-white'>语义扩展：</strong>
              统一六色语义体系，可扩展至 Tag、Badge
              与图标按钮，保证系统视觉一致。
            </li>
          </ul>
        </footer>
      </div>
    </div>
  )
}

export default ButtonShowcase
