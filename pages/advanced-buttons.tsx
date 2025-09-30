import React, { useState } from 'react'
import {
  Layers,
  Gem,
  Boxes,
  Droplets,
  Zap,
  Sparkles,
  Shield,
  Info,
  AlertCircle,
  AlertTriangle,
  Palette,
  Star
} from 'lucide-react'

// 简易 className 合并工具
const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ')

type ToneKey = 'default' | 'success' | 'info' | 'danger' | 'warning' | 'theme'

// 按钮样式配置
const toneConfigs: Record<
  ToneKey,
  {
    label: string
    icon: React.ElementType
    glassmorphism: string
    gradientBorder: string
    embossed3D: string
    liquid: string
    shineWave: string
    neonPulse: string
  }
> = {
  default: {
    label: '默认',
    icon: Shield,
    glassmorphism:
      'bg-slate-100/10 backdrop-blur-xl border border-white/20 text-slate-100 shadow-[0_8px_32px_0_rgba(15,23,42,0.37)] hover:bg-slate-100/20 hover:border-white/40',
    gradientBorder:
      'relative bg-slate-900/90 text-slate-100 before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-slate-400 before:via-slate-300 before:to-slate-500 before:-z-10 hover:before:from-slate-300 hover:before:via-slate-200 hover:before:to-slate-400',
    embossed3D:
      'bg-gradient-to-b from-slate-700 to-slate-800 text-slate-100 shadow-[0_10px_20px_rgba(15,23,42,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_5px_15px_rgba(15,23,42,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]',
    liquid:
      'relative overflow-hidden bg-slate-800 text-slate-100 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700',
    shineWave:
      'relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-800 text-slate-100 after:absolute after:inset-0 after:bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000',
    neonPulse:
      'bg-slate-900 text-slate-100 border-2 border-slate-400/50 shadow-[0_0_20px_rgba(148,163,184,0.3),inset_0_0_20px_rgba(148,163,184,0.1)] hover:shadow-[0_0_35px_rgba(148,163,184,0.6),inset_0_0_25px_rgba(148,163,184,0.2)] animate-pulse-subtle'
  },
  success: {
    label: '成功',
    icon: Sparkles,
    glassmorphism:
      'bg-emerald-500/10 backdrop-blur-xl border border-emerald-300/30 text-emerald-100 shadow-[0_8px_32px_0_rgba(16,185,129,0.37)] hover:bg-emerald-500/20 hover:border-emerald-300/50',
    gradientBorder:
      'relative bg-emerald-900/90 text-emerald-50 before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-emerald-400 before:via-green-400 before:to-teal-400 before:-z-10 hover:before:from-emerald-300 hover:before:via-green-300 hover:before:to-teal-300',
    embossed3D:
      'bg-gradient-to-b from-emerald-500 to-emerald-600 text-emerald-50 shadow-[0_10px_20px_rgba(16,185,129,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_5px_15px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]',
    liquid:
      'relative overflow-hidden bg-emerald-600 text-emerald-50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700',
    shineWave:
      'relative overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-600 text-emerald-50 after:absolute after:inset-0 after:bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000',
    neonPulse:
      'bg-emerald-950 text-emerald-100 border-2 border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.4),inset_0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_40px_rgba(16,185,129,0.7),inset_0_0_30px_rgba(16,185,129,0.25)] animate-pulse-subtle'
  },
  info: {
    label: '信息',
    icon: Info,
    glassmorphism:
      'bg-sky-500/10 backdrop-blur-xl border border-sky-300/30 text-sky-100 shadow-[0_8px_32px_0_rgba(14,165,233,0.37)] hover:bg-sky-500/20 hover:border-sky-300/50',
    gradientBorder:
      'relative bg-sky-900/90 text-sky-50 before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-sky-400 before:via-blue-400 before:to-cyan-400 before:-z-10 hover:before:from-sky-300 hover:before:via-blue-300 hover:before:to-cyan-300',
    embossed3D:
      'bg-gradient-to-b from-sky-500 to-sky-600 text-sky-50 shadow-[0_10px_20px_rgba(14,165,233,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_5px_15px_rgba(14,165,233,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]',
    liquid:
      'relative overflow-hidden bg-sky-600 text-sky-50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700',
    shineWave:
      'relative overflow-hidden bg-gradient-to-r from-sky-500 to-blue-600 text-sky-50 after:absolute after:inset-0 after:bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000',
    neonPulse:
      'bg-sky-950 text-sky-100 border-2 border-sky-400/60 shadow-[0_0_20px_rgba(14,165,233,0.4),inset_0_0_20px_rgba(14,165,233,0.15)] hover:shadow-[0_0_40px_rgba(14,165,233,0.7),inset_0_0_30px_rgba(14,165,233,0.25)] animate-pulse-subtle'
  },
  danger: {
    label: '危险',
    icon: AlertCircle,
    glassmorphism:
      'bg-rose-500/10 backdrop-blur-xl border border-rose-300/30 text-rose-100 shadow-[0_8px_32px_0_rgba(244,63,94,0.37)] hover:bg-rose-500/20 hover:border-rose-300/50',
    gradientBorder:
      'relative bg-rose-900/90 text-rose-50 before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-rose-400 before:via-red-400 before:to-pink-400 before:-z-10 hover:before:from-rose-300 hover:before:via-red-300 hover:before:to-pink-300',
    embossed3D:
      'bg-gradient-to-b from-rose-500 to-rose-600 text-rose-50 shadow-[0_10px_20px_rgba(244,63,94,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_5px_15px_rgba(244,63,94,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]',
    liquid:
      'relative overflow-hidden bg-rose-600 text-rose-50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700',
    shineWave:
      'relative overflow-hidden bg-gradient-to-r from-rose-500 to-rose-600 text-rose-50 after:absolute after:inset-0 after:bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000',
    neonPulse:
      'bg-rose-950 text-rose-100 border-2 border-rose-400/60 shadow-[0_0_20px_rgba(244,63,94,0.4),inset_0_0_20px_rgba(244,63,94,0.15)] hover:shadow-[0_0_40px_rgba(244,63,94,0.7),inset_0_0_30px_rgba(244,63,94,0.25)] animate-pulse-subtle'
  },
  warning: {
    label: '警告',
    icon: AlertTriangle,
    glassmorphism:
      'bg-amber-500/10 backdrop-blur-xl border border-amber-300/30 text-amber-100 shadow-[0_8px_32px_0_rgba(245,158,11,0.37)] hover:bg-amber-500/20 hover:border-amber-300/50',
    gradientBorder:
      'relative bg-amber-900/90 text-amber-50 before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-amber-400 before:via-yellow-400 before:to-orange-400 before:-z-10 hover:before:from-amber-300 hover:before:via-yellow-300 hover:before:to-orange-300',
    embossed3D:
      'bg-gradient-to-b from-amber-500 to-amber-600 text-amber-950 shadow-[0_10px_20px_rgba(245,158,11,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_5px_15px_rgba(245,158,11,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]',
    liquid:
      'relative overflow-hidden bg-amber-600 text-amber-950 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700',
    shineWave:
      'relative overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 after:absolute after:inset-0 after:bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000',
    neonPulse:
      'bg-amber-950 text-amber-100 border-2 border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.4),inset_0_0_20px_rgba(245,158,11,0.15)] hover:shadow-[0_0_40px_rgba(245,158,11,0.7),inset_0_0_30px_rgba(245,158,11,0.25)] animate-pulse-subtle'
  },
  theme: {
    label: '主题',
    icon: Palette,
    glassmorphism:
      'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-300/30 text-purple-100 shadow-[0_8px_32px_0_rgba(139,92,246,0.37)] hover:from-indigo-500/20 hover:via-purple-500/20 hover:to-pink-500/20 hover:border-purple-300/50',
    gradientBorder:
      'relative bg-purple-900/90 text-purple-50 before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-indigo-400 before:via-purple-400 before:to-pink-400 before:-z-10 hover:before:from-indigo-300 hover:before:via-purple-300 hover:before:to-pink-300',
    embossed3D:
      'bg-gradient-to-b from-purple-500 to-purple-600 text-purple-50 shadow-[0_10px_20px_rgba(139,92,246,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_5px_15px_rgba(139,92,246,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] active:shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]',
    liquid:
      'relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-purple-50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700',
    shineWave:
      'relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-purple-50 after:absolute after:inset-0 after:bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] after:translate-x-[-200%] hover:after:translate-x-[200%] after:transition-transform after:duration-1000',
    neonPulse:
      'bg-purple-950 text-purple-100 border-2 border-purple-400/60 shadow-[0_0_20px_rgba(139,92,246,0.4),inset_0_0_20px_rgba(139,92,246,0.15)] hover:shadow-[0_0_40px_rgba(139,92,246,0.7),inset_0_0_30px_rgba(139,92,246,0.25)] animate-pulse-subtle'
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

const buttonGroups = [
  {
    id: 'glassmorphism',
    title: '玻璃拟态按钮',
    description:
      '融合毛玻璃效果与透明度，营造轻盈悬浮质感，适合现代简约风格界面。',
    styleKey: 'glassmorphism' as const,
    icon: Gem
  },
  {
    id: 'gradientBorder',
    title: '渐变边框按钮',
    description:
      '利用多层伪元素实现流光边框效果，增强视觉层次感，适合强调区块。',
    styleKey: 'gradientBorder' as const,
    icon: Layers
  },
  {
    id: 'embossed3D',
    title: '3D浮雕按钮',
    description:
      '通过多重阴影模拟立体浮雕质感，提供触感反馈，适合传统操作场景。',
    styleKey: 'embossed3D' as const,
    icon: Boxes
  },
  {
    id: 'liquid',
    title: '液态流动按钮',
    description:
      '悬停时触发液体般的光波扫过效果，流畅自然，适合交互丰富的应用。',
    styleKey: 'liquid' as const,
    icon: Droplets
  },
  {
    id: 'shineWave',
    title: '扫光波纹按钮',
    description: '对角线扫光动画模拟金属光泽质感，高端大气，适合品牌展示页面。',
    styleKey: 'shineWave' as const,
    icon: Zap
  },
  {
    id: 'neonPulse',
    title: '霓虹脉冲按钮',
    description: '结合边框发光与脉冲动画，科技感十足，适合游戏或科幻类产品。',
    styleKey: 'neonPulse' as const,
    icon: Star
  }
]

const AdvancedButtons: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string>(
    'theme-glassmorphism'
  )

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950'>
      {/* 动态背景光效 */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-indigo-500/20 blur-[120px]' />
        <div className='absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/20 blur-[120px] animation-delay-2000' />
        <div className='absolute left-1/2 top-1/2 h-96 w-96 animate-pulse rounded-full bg-pink-500/15 blur-[120px] animation-delay-4000' />
      </div>

      <div className='relative z-10 px-6 py-16 md:px-12 lg:px-20'>
        {/* 页面标题 */}
        <header className='mx-auto mb-16 max-w-6xl'>
          <div className='rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_50px_100px_-40px_rgba(99,102,241,0.5)] backdrop-blur-2xl'>
            <div className='mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-200 backdrop-blur-sm'>
              <Sparkles className='h-4 w-4' />
              Advanced Button Lab
            </div>
            <h1 className='mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl'>
              进阶按钮特效实验室
            </h1>
            <p className='max-w-3xl text-base leading-relaxed text-slate-200/90 md:text-lg'>
              探索六种进阶按钮样式：玻璃拟态、渐变边框、3D浮雕、液态流动、扫光波纹与霓虹脉冲。每组包含完整语义色系，满足复杂交互场景的视觉需求。
            </p>

            <div className='mt-8 flex flex-wrap gap-4 text-xs text-slate-200/70'>
              <div className='flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2'>
                <div className='h-2 w-2 rounded-full bg-emerald-400' />
                <span>全场景覆盖</span>
              </div>
              <div className='flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2'>
                <div className='h-2 w-2 rounded-full bg-sky-400' />
                <span>动效细腻流畅</span>
              </div>
              <div className='flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2'>
                <div className='h-2 w-2 rounded-full bg-purple-400' />
                <span>可扩展性强</span>
              </div>
            </div>
          </div>
        </header>

        {/* 按钮组展示 */}
        <main className='mx-auto max-w-6xl space-y-14'>
          {buttonGroups.map(group => {
            const GroupIcon = group.icon
            return (
              <section
                key={group.id}
                className='rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_50px_100px_-50px_rgba(59,130,246,0.5)] backdrop-blur-2xl transition-all duration-500 hover:border-white/20'
              >
                {/* 组标题 */}
                <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
                  <div className='space-y-3'>
                    <div className='inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-purple-200'>
                      <GroupIcon className='h-4 w-4' />
                      {group.styleKey}
                    </div>
                    <h2 className='text-2xl font-bold text-white md:text-3xl'>
                      {group.title}
                    </h2>
                    <p className='max-w-xl text-sm text-slate-200/80'>
                      {group.description}
                    </p>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-slate-200/60'>
                    <span className='rounded-full bg-white/10 px-3 py-1.5 font-medium'>
                      6 种语义
                    </span>
                  </div>
                </div>

                {/* 按钮网格 */}
                <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                  {toneOrder.map(tone => {
                    const config = toneConfigs[tone]
                    const ToneIcon = config.icon
                    const buttonId = `${tone}-${group.id}`
                    const isActive = activeButton === buttonId

                    return (
                      <div
                        key={buttonId}
                        className={cn(
                          'group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300',
                          isActive
                            ? 'border-white/40 bg-white/10 shadow-[0_25px_50px_-25px_rgba(165,180,252,0.6)]'
                            : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
                        )}
                      >
                        <div className='mb-4 flex items-center justify-between'>
                          <div className='flex items-center gap-2'>
                            <div
                              className={cn(
                                'rounded-lg p-2',
                                tone === 'default' && 'bg-slate-500/20',
                                tone === 'success' && 'bg-emerald-500/20',
                                tone === 'info' && 'bg-sky-500/20',
                                tone === 'danger' && 'bg-rose-500/20',
                                tone === 'warning' && 'bg-amber-500/20',
                                tone === 'theme' && 'bg-purple-500/20'
                              )}
                            >
                              <ToneIcon className='h-4 w-4 text-white' />
                            </div>
                            <span className='text-xs font-semibold uppercase tracking-[0.2em] text-white/70'>
                              {config.label}
                            </span>
                          </div>
                          {isActive && (
                            <div className='flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-400'>
                              <div className='h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400' />
                              Active
                            </div>
                          )}
                        </div>

                        <button
                          type='button'
                          onClick={() => setActiveButton(buttonId)}
                          className={cn(
                            'w-full rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50',
                            config[group.styleKey]
                          )}
                        >
                          <span className='relative z-10'>磁场按钮</span>
                        </button>

                        <p className='mt-3 text-xs leading-relaxed text-slate-200/60'>
                          {group.styleKey === 'glassmorphism' &&
                            '毛玻璃透明层叠'}
                          {group.styleKey === 'gradientBorder' &&
                            '多色渐变边框包裹'}
                          {group.styleKey === 'embossed3D' &&
                            '立体阴影浮雕质感'}
                          {group.styleKey === 'liquid' && '液体扫过动态效果'}
                          {group.styleKey === 'shineWave' && '对角线扫光波纹'}
                          {group.styleKey === 'neonPulse' && '边框霓虹脉冲闪烁'}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </main>

        {/* 设计理念说明 */}
        <footer className='mx-auto mt-16 max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_50px_100px_-50px_rgba(79,70,229,0.6)] backdrop-blur-2xl'>
          <h3 className='mb-6 text-xl font-bold text-white'>
            设计理念与技术细节
          </h3>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='rounded-2xl border border-white/10 bg-white/10 p-5'>
              <h4 className='mb-2 flex items-center gap-2 font-semibold text-white'>
                <Gem className='h-5 w-5 text-purple-400' />
                玻璃拟态 (Glassmorphism)
              </h4>
              <p className='text-sm leading-relaxed text-slate-200/70'>
                利用 `backdrop-blur-xl`
                与低透明度背景色，结合半透明边框，模拟毛玻璃质感。适合叠加在渐变或图片背景之上。
              </p>
            </div>

            <div className='rounded-2xl border border-white/10 bg-white/10 p-5'>
              <h4 className='mb-2 flex items-center gap-2 font-semibold text-white'>
                <Layers className='h-5 w-5 text-indigo-400' />
                渐变边框 (Gradient Border)
              </h4>
              <p className='text-sm leading-relaxed text-slate-200/70'>
                通过 `::before` 伪元素配合 `p-[2px]` 与负
                z-index，在按钮外围绘制渐变描边，实现流光边框效果。
              </p>
            </div>

            <div className='rounded-2xl border border-white/10 bg-white/10 p-5'>
              <h4 className='mb-2 flex items-center gap-2 font-semibold text-white'>
                <Boxes className='h-5 w-5 text-sky-400' />
                3D浮雕 (3D Embossed)
              </h4>
              <p className='text-sm leading-relaxed text-slate-200/70'>
                叠加多重 box-shadow（外阴影 + 内高光），配合 active
                状态的内凹阴影，营造可按压的立体质感。
              </p>
            </div>

            <div className='rounded-2xl border border-white/10 bg-white/10 p-5'>
              <h4 className='mb-2 flex items-center gap-2 font-semibold text-white'>
                <Droplets className='h-5 w-5 text-emerald-400' />
                液态流动 (Liquid)
              </h4>
              <p className='text-sm leading-relaxed text-slate-200/70'>
                使用伪元素渐变从按钮外侧滑入再滑出，模拟液体流经表面的动态效果，过渡时长
                700ms。
              </p>
            </div>

            <div className='rounded-2xl border border-white/10 bg-white/10 p-5'>
              <h4 className='mb-2 flex items-center gap-2 font-semibold text-white'>
                <Zap className='h-5 w-5 text-amber-400' />
                扫光波纹 (Shine Wave)
              </h4>
              <p className='text-sm leading-relaxed text-slate-200/70'>
                对角线 linear-gradient 配合 translate
                动画，模拟金属表面的光泽扫过效果，过渡时长 1000ms。
              </p>
            </div>

            <div className='rounded-2xl border border-white/10 bg-white/10 p-5'>
              <h4 className='mb-2 flex items-center gap-2 font-semibold text-white'>
                <Star className='h-5 w-5 text-rose-400' />
                霓虹脉冲 (Neon Pulse)
              </h4>
              <p className='text-sm leading-relaxed text-slate-200/70'>
                双色边框叠加外发光与内发光阴影，配合
                animate-pulse，营造霓虹灯管呼吸效果，科技感十足。
              </p>
            </div>
          </div>

          <div className='mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4'>
            <p className='text-sm leading-relaxed text-emerald-100'>
              <strong className='font-semibold'>实践建议：</strong>
              以上按钮样式均基于 Tailwind CSS 原子类与伪元素组合实现，无需额外
              JS 动画库。可根据品牌色调灵活调整配色方案，保持 UI
              一致性。建议在高对比度背景下使用，以充分展示特效细节。
            </p>
          </div>
        </footer>
      </div>

      {/* 自定义动画 */}
      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default AdvancedButtons
