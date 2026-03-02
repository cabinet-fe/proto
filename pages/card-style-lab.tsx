import React, { useMemo, useState } from 'react'
import { ArrowRight, CheckCircle2, Feather, Hexagon, Mountain, Zap } from 'lucide-react'
import { cn } from '../utils/cn'

type StyleId = 'editorial' | 'neon' | 'nature' | 'brutalist'

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface StylePreset {
  id: StyleId
  name: string
  tone: string
  description: string
  icon: IconType
  displayFont: string
  bodyFont: string
  shellClass: string
  cardClass: string
  badgeClass: string
  titleClass: string
  textClass: string
  featureClass: string
  primaryBtnClass: string
  secondaryBtnClass: string
  glowClass: string
}

const stylePresets: StylePreset[] = [
  {
    id: 'editorial',
    name: 'Editorial Ivory',
    tone: '杂志感 · 优雅克制',
    description: '高留白、衬线字体与纸张肌理，适合内容型产品与品牌故事。',
    icon: Feather,
    displayFont: '"Bodoni Moda", "Noto Serif SC", serif',
    bodyFont: '"Source Sans 3", "PingFang SC", sans-serif',
    shellClass:
      'bg-[linear-gradient(145deg,#f7efe4_0%,#f1e4d2_100%)] border border-[#dbc4a8] shadow-[0_22px_40px_-24px_rgba(62,39,23,0.55)]',
    cardClass:
      'bg-[#fffaf3]/90 border border-[#d9c2a8] rounded-[24px] shadow-[0_14px_28px_-20px_rgba(64,41,23,0.6)]',
    badgeClass: 'bg-[#3f2e1f] text-[#f8ecdc] border border-[#3f2e1f]',
    titleClass: 'text-[#2f2015] tracking-[0.02em]',
    textClass: 'text-[#634833]',
    featureClass: 'border-[#d7c2a8] bg-[#fff7ec]/80 text-[#533c2a]',
    primaryBtnClass:
      'bg-[#3f2e1f] text-[#f7ead8] border border-[#3f2e1f] hover:bg-[#322215]',
    secondaryBtnClass:
      'bg-transparent text-[#3f2e1f] border border-[#3f2e1f]/35 hover:bg-[#f2e2cf]',
    glowClass: 'bg-[#d6b188]/45'
  },
  {
    id: 'neon',
    name: 'Neon Glass',
    tone: '赛博感 · 霓虹玻璃',
    description: '半透明材质叠加冷暖霓虹，适合 AI、数据与科技品牌。',
    icon: Hexagon,
    displayFont: '"Rajdhani", "Noto Sans SC", sans-serif',
    bodyFont: '"IBM Plex Sans", "PingFang SC", sans-serif',
    shellClass:
      'bg-[radial-gradient(circle_at_20%_10%,rgba(16,185,129,0.18),transparent_48%),radial-gradient(circle_at_85%_5%,rgba(236,72,153,0.2),transparent_45%),linear-gradient(160deg,#020617,#0a1024)] border border-cyan-300/20 shadow-[0_20px_40px_-20px_rgba(34,211,238,0.5)]',
    cardClass:
      'bg-white/8 backdrop-blur-xl border border-cyan-200/30 rounded-[26px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_25px_55px_-35px_rgba(34,211,238,0.8)]',
    badgeClass: 'bg-cyan-300/20 text-cyan-100 border border-cyan-200/40',
    titleClass: 'text-cyan-50 tracking-[0.06em] uppercase',
    textClass: 'text-slate-200/90',
    featureClass: 'border-cyan-300/30 bg-slate-900/40 text-cyan-100',
    primaryBtnClass:
      'bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-slate-950 border border-cyan-200/30 hover:brightness-110',
    secondaryBtnClass:
      'bg-transparent text-cyan-100 border border-cyan-200/30 hover:bg-cyan-300/10',
    glowClass: 'bg-cyan-400/45'
  },
  {
    id: 'nature',
    name: 'Botanical Soft',
    tone: '自然感 · 温润纸感',
    description: '柔和绿调与轻拟物阴影，适合健康、教育与生活方式产品。',
    icon: Mountain,
    displayFont: '"Cormorant Garamond", "Noto Serif SC", serif',
    bodyFont: '"Nunito Sans", "PingFang SC", sans-serif',
    shellClass:
      'bg-[linear-gradient(160deg,#edf5e6_0%,#e3f0da_44%,#d5e8ca_100%)] border border-[#afc4a3] shadow-[0_22px_36px_-24px_rgba(48,83,55,0.5)]',
    cardClass:
      'bg-[#fffdf6]/95 border border-[#b5c7a8] rounded-[30px] shadow-[0_16px_34px_-24px_rgba(42,79,52,0.55)]',
    badgeClass: 'bg-[#2d5238] text-[#eaf7eb] border border-[#2d5238]',
    titleClass: 'text-[#23412e] tracking-[0.01em]',
    textClass: 'text-[#355745]',
    featureClass: 'border-[#b3c8a8] bg-[#f2f8ea] text-[#31503d]',
    primaryBtnClass:
      'bg-[#2d5238] text-[#edf8ea] border border-[#2d5238] hover:bg-[#22402c]',
    secondaryBtnClass:
      'bg-transparent text-[#2d5238] border border-[#2d5238]/35 hover:bg-[#e0edd6]',
    glowClass: 'bg-emerald-500/35'
  },
  {
    id: 'brutalist',
    name: 'Poster Brutal',
    tone: '粗野感 · 海报冲击',
    description: '高对比配色、硬边与错位阴影，适合活动页和强营销场景。',
    icon: Zap,
    displayFont: '"Archivo Black", "Noto Sans SC", sans-serif',
    bodyFont: '"Barlow", "PingFang SC", sans-serif',
    shellClass:
      'bg-[linear-gradient(130deg,#fee788_0%,#ffd24d_100%)] border-[3px] border-black shadow-[12px_12px_0_0_#111]',
    cardClass:
      'bg-[#fff5c4] border-[3px] border-black rounded-[16px] shadow-[8px_8px_0_0_#111]',
    badgeClass: 'bg-black text-[#ffe07a] border-[2px] border-black',
    titleClass: 'text-black uppercase tracking-[0.02em]',
    textClass: 'text-black/80',
    featureClass: 'border-[2px] border-black bg-[#ffe383] text-black',
    primaryBtnClass:
      'bg-black text-[#ffe07a] border-[2px] border-black hover:-translate-y-0.5 transition-transform',
    secondaryBtnClass:
      'bg-[#fff5c4] text-black border-[2px] border-black hover:-translate-y-0.5 transition-transform',
    glowClass: 'bg-amber-300/70'
  }
]

const cardFeatures = [
  '可自定义角标与主视觉插画',
  '支持深浅色主题与品牌色映射',
  '移动端优先，桌面端增强展示'
]

export default function CardStyleLabPage() {
  const [selectedIds, setSelectedIds] = useState<StyleId[]>([
    'editorial',
    'neon',
    'nature'
  ])

  const selectedPresets = useMemo(
    () => stylePresets.filter(preset => selectedIds.includes(preset.id)),
    [selectedIds]
  )

  const togglePreset = (id: StyleId) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  return (
    <div className='min-h-screen bg-[radial-gradient(circle_at_15%_15%,#ffffff_0%,#f6f7fb_34%,#eceef5_100%)] px-4 py-8 text-slate-900 sm:px-8'>
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-8'>
        <header className='rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_24px_45px_-30px_rgba(15,23,42,0.4)] backdrop-blur-xl sm:p-8'>
          <div className='flex flex-wrap items-start justify-between gap-4'>
            <div className='space-y-3'>
              <p className='inline-flex items-center rounded-full border border-slate-300/80 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600'>
                Card Style Lab
              </p>
              <h1 className='text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl'>
                卡片组件风格选择器
              </h1>
              <p className='max-w-2xl text-sm leading-6 text-slate-600 sm:text-base'>
                下面提供 4 套视觉方向，你可以多选并并排对比。确认方向后，我可以继续把某个风格拆成可复用组件并接入业务数据。
              </p>
            </div>

            <div className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600'>
              已选择 <span className='font-semibold text-slate-900'>{selectedIds.length}</span> / {stylePresets.length}
            </div>
          </div>

          <div className='mt-6 flex flex-wrap gap-3'>
            <button
              type='button'
              onClick={() => setSelectedIds(stylePresets.map(preset => preset.id))}
              className='rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2'
            >
              全选风格
            </button>
            <button
              type='button'
              onClick={() => setSelectedIds([])}
              className='rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2'
            >
              清空选择
            </button>
          </div>

          <div className='mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4'>
            {stylePresets.map(preset => {
              const isActive = selectedIds.includes(preset.id)
              const Icon = preset.icon

              return (
                <button
                  key={preset.id}
                  type='button'
                  onClick={() => togglePreset(preset.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'group rounded-2xl border p-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2',
                    isActive
                      ? 'border-slate-900 bg-slate-900 text-white shadow-[0_16px_24px_-18px_rgba(15,23,42,0.8)]'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:-translate-y-0.5'
                  )}
                >
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <p className='text-sm font-semibold'>{preset.name}</p>
                      <p
                        className={cn(
                          'mt-1 text-xs',
                          isActive ? 'text-slate-200' : 'text-slate-500'
                        )}
                      >
                        {preset.tone}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
                        isActive
                          ? 'border-white/30 bg-white/10 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300'
                      )}
                    >
                      <Icon className='h-4 w-4' />
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </header>

        {selectedPresets.length === 0 ? (
          <div className='rounded-3xl border border-dashed border-slate-300 bg-white/70 p-10 text-center text-slate-500'>
            当前未选择风格，请先勾选上方任意风格。
          </div>
        ) : (
          <section className='grid grid-cols-1 gap-6 xl:grid-cols-2'>
            {selectedPresets.map((preset, index) => (
              <article
                key={preset.id}
                className={cn(
                  'relative overflow-hidden rounded-[30px] p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6',
                  preset.shellClass
                )}
                style={{
                  animation: `fadeUp 420ms cubic-bezier(0.2, 0.8, 0.2, 1) ${
                    index * 90
                  }ms both`,
                  fontFamily: preset.bodyFont
                }}
              >
                <div
                  className={cn(
                    'pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl',
                    preset.glowClass
                  )}
                />

                <div
                  className={cn(
                    'relative z-10 flex h-full flex-col gap-5 p-5 sm:p-6',
                    preset.cardClass
                  )}
                >
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <span
                        className={cn(
                          'inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                          preset.badgeClass
                        )}
                      >
                        {preset.name}
                      </span>
                      <h2
                        className={cn('mt-3 text-3xl leading-none', preset.titleClass)}
                        style={{ fontFamily: preset.displayFont }}
                      >
                        Growth Card
                      </h2>
                    </div>
                    <div className='rounded-full border border-white/20 bg-white/10 p-2'>
                      <CheckCircle2 className='h-5 w-5' />
                    </div>
                  </div>

                  <p className={cn('text-sm leading-6', preset.textClass)}>
                    {preset.description}
                  </p>

                  <div className='space-y-2'>
                    {cardFeatures.map(feature => (
                      <div
                        key={feature}
                        className={cn(
                          'rounded-xl border px-3 py-2 text-sm',
                          preset.featureClass
                        )}
                      >
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className='mt-auto flex flex-wrap gap-3'>
                    <button
                      type='button'
                      className={cn(
                        'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                        preset.primaryBtnClass
                      )}
                    >
                      选这个方向
                      <ArrowRight className='h-4 w-4' />
                    </button>
                    <button
                      type='button'
                      className={cn(
                        'rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                        preset.secondaryBtnClass
                      )}
                    >
                      查看细节
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
