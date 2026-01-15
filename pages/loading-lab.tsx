import React, { useEffect, useMemo, useState } from 'react'

type LoaderCardProps = {
  title: string
  desc: string
  delay: number
  children: React.ReactNode
}

function LoaderCard({ title, desc, delay, children }: LoaderCardProps) {
  return (
    <div
      className='group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-6 shadow-[0_20px_60px_rgba(31,41,55,0.12)] backdrop-blur-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(31,41,55,0.18)]'
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className='absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
        <div className='absolute -left-10 top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,_rgba(248,184,82,0.45)_0%,_rgba(248,184,82,0)_65%)]'></div>
        <div className='absolute right-0 top-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(45,212,191,0.4)_0%,_rgba(45,212,191,0)_60%)]'></div>
      </div>
      <div className='relative flex h-full flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-400'>
              Loader
            </p>
            <h3 className='mt-2 text-lg font-semibold text-slate-900'>{title}</h3>
          </div>
          <span className='rounded-full bg-slate-900/5 px-3 py-1 text-[11px] font-medium text-slate-500'>
            循环
          </span>
        </div>
        <div className='flex min-h-[120px] items-center justify-center rounded-2xl border border-white/60 bg-white/70'>
          {children}
        </div>
        <p className='text-sm text-slate-500'>{desc}</p>
      </div>
    </div>
  )
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setReduced(media.matches)
    handleChange()
    if (media.addEventListener) {
      media.addEventListener('change', handleChange)
      return () => media.removeEventListener('change', handleChange)
    }
    media.addListener(handleChange)
    return () => media.removeListener(handleChange)
  }, [])

  return reduced
}

function useRafTime(active: boolean) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (!active) {
      setTime(0)
      return
    }
    let raf = 0
    let last = 0
    const start = performance.now()
    const tick = (now: number) => {
      if (now - last >= 16) {
        setTime(now - start)
        last = now
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  return time
}

export default function LoadingLab() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const time = useRafTime(!prefersReducedMotion)
  const t = time / 1000

  const orbitDots = useMemo(
    () => [
      { radius: 28, size: 10, color: '#fbbf24', glow: 'rgba(251,191,36,0.7)', speed: 1.2, offset: 0 },
      { radius: 34, size: 8, color: '#2dd4bf', glow: 'rgba(45,212,191,0.7)', speed: 0.9, offset: 1.8 },
      { radius: 22, size: 7, color: '#fda4af', glow: 'rgba(244,114,182,0.6)', speed: 1.45, offset: 3.4 }
    ],
    []
  )

  const equalizerBars = useMemo(() => Array.from({ length: 7 }), [])

  const flipTiles = useMemo(
    () => [
      { color: '#fb7185', axis: 'X', phase: 0 },
      { color: '#fdba74', axis: 'Y', phase: 0.7 },
      { color: '#34d399', axis: 'X', phase: 1.3 },
      { color: '#60a5fa', axis: 'Y', phase: 2.1 }
    ],
    []
  )

  const rippleDelays = useMemo(() => [0, 0.7, 1.4], [])

  const shimmerShift = ((t * 24) % 200) - 100
  const dotSlide = Math.sin(t * 2.4) * 60
  const prismAngle = (t * 120) % 360

  return (
    <div className='loading-lab min-h-full'>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700&family=Spline+Sans:wght@400;500;600&display=swap');

.loading-lab {
  font-family: 'Spline Sans', 'Segoe UI', sans-serif;
  color: #0f172a;
  background: radial-gradient(120% 120% at 12% 12%, #fff4db 0%, #f7eddc 32%, #eff2f3 62%, #e7eef1 100%);
}

.loading-title {
  font-family: 'Bricolage Grotesque', 'Spline Sans', sans-serif;
  letter-spacing: 0.01em;
}
      `}</style>

      <div className='relative overflow-hidden px-6 py-12 sm:px-10 lg:px-16'>
        <div className='pointer-events-none absolute -left-20 top-20 h-60 w-60 rounded-full bg-[radial-gradient(circle,_rgba(253,230,138,0.7)_0%,_rgba(253,230,138,0)_70%)] blur-2xl'></div>
        <div className='pointer-events-none absolute right-0 top-12 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(45,212,191,0.45)_0%,_rgba(45,212,191,0)_65%)] blur-2xl'></div>
        <div className='pointer-events-none absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(244,114,182,0.2)_0%,_rgba(244,114,182,0)_70%)] blur-3xl'></div>

        <div className='relative mx-auto flex max-w-6xl flex-col gap-10'>
          <header className='flex flex-col gap-6'>
            <div className='inline-flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 shadow-[0_10px_30px_rgba(15,23,42,0.08)]'>
              <span className='inline-flex h-2 w-2 rounded-full bg-amber-400'></span>
              Loading Motion Lab
            </div>
            <div>
              <h1 className='loading-title text-4xl font-semibold text-slate-900 sm:text-5xl'>
                前端加载动画精选
              </h1>
              <p className='mt-4 max-w-2xl text-base text-slate-600 sm:text-lg'>
                以柔和光感与材质层次为主线，提供 6 套可直接落地的加载方案。动效由 JS 驱动，节奏可控且更易统一。
              </p>
            </div>
            <div className='flex flex-wrap gap-3 text-sm text-slate-600'>
              <span className='rounded-full border border-white/70 bg-white/60 px-4 py-2'>
                响应式布局
              </span>
              <span className='rounded-full border border-white/70 bg-white/60 px-4 py-2'>
                低动效也清晰
              </span>
              <span className='rounded-full border border-white/70 bg-white/60 px-4 py-2'>
                动线统一
              </span>
            </div>
          </header>

          <section className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            <LoaderCard
              title='潮汐环轨'
              desc='适合层级较多的数据加载，环绕节奏稳定。'
              delay={60}
            >
              <div className='relative h-20 w-20'>
                <div className='absolute inset-2 rounded-full border border-amber-200/70'></div>
                {orbitDots.map((dot, index) => {
                  const angle = t * dot.speed * Math.PI * 2 + dot.offset
                  const x = Math.cos(angle) * dot.radius
                  const y = Math.sin(angle) * dot.radius
                  return (
                    <span
                      key={index}
                      className='absolute left-1/2 top-1/2 rounded-full'
                      style={{
                        width: dot.size,
                        height: dot.size,
                        background: dot.color,
                        boxShadow: `0 0 16px ${dot.glow}`,
                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                      }}
                    ></span>
                  )
                })}
                <span className='sr-only'>加载中</span>
              </div>
            </LoaderCard>

            <LoaderCard
              title='晨光律动'
              desc='适用于音视频或实时内容，节拍感更强。'
              delay={120}
            >
              <div className='flex items-end gap-1'>
                {equalizerBars.map((_, index) => {
                  const phase = t * 2.1 + index * 0.55
                  const scale = 0.35 + (Math.sin(phase) * 0.5 + 0.5) * 0.75
                  return (
                    <span
                      key={index}
                      className='h-10 w-2 rounded-full bg-[linear-gradient(180deg,#2dd4bf_0%,#fbbf24_100%)] shadow-[0_8px_20px_rgba(45,212,191,0.35)]'
                      style={{
                        transform: `scaleY(${scale})`,
                        transformOrigin: 'bottom'
                      }}
                    ></span>
                  )
                })}
                <span className='sr-only'>加载中</span>
              </div>
            </LoaderCard>

            <LoaderCard
              title='折纸转轴'
              desc='适合卡片式内容加载，几何感清晰。'
              delay={180}
            >
              <div className='grid grid-cols-2 gap-2 [perspective:420px]'>
                {flipTiles.map((tile, index) => {
                  const rotation = ((t * 180 + tile.phase * 120) % 360) - 180
                  const rotateTransform =
                    tile.axis === 'X'
                      ? `rotateX(${rotation}deg)`
                      : `rotateY(${rotation}deg)`
                  return (
                    <span
                      key={index}
                      className='h-6 w-6 rounded-md shadow-[0_8px_20px_rgba(15,23,42,0.2)]'
                      style={{
                        backgroundColor: tile.color,
                        transform: `perspective(420px) ${rotateTransform}`
                      }}
                    ></span>
                  )
                })}
                <span className='sr-only'>加载中</span>
              </div>
            </LoaderCard>

            <LoaderCard
              title='云雾涟漪'
              desc='适合大图预览或地图资源加载。'
              delay={240}
            >
              <div className='relative h-20 w-20'>
                {rippleDelays.map((delay, index) => {
                  const progress = ((t + delay) % 2.4) / 2.4
                  const scale = 0.45 + progress * 0.8
                  const opacity = 0.7 * (1 - progress)
                  return (
                    <span
                      key={index}
                      className='absolute inset-0 rounded-full border border-emerald-300/80'
                      style={{ transform: `scale(${scale})`, opacity }}
                    ></span>
                  )
                })}
                <div className='absolute inset-6 rounded-full bg-emerald-300/60 shadow-[0_0_18px_rgba(52,211,153,0.6)]'></div>
                <span className='sr-only'>加载中</span>
              </div>
            </LoaderCard>

            <LoaderCard
              title='极光滑轨'
              desc='适合表单提交或流程进度，动线清晰。'
              delay={300}
            >
              <div className='relative h-3 w-40 overflow-hidden rounded-full bg-slate-200/70'>
                <div
                  className='absolute inset-0 rounded-full bg-[linear-gradient(90deg,#fde68a,#2dd4bf,#fca5a5)]'
                  style={{ backgroundSize: '220% 220%', backgroundPosition: `${shimmerShift}% 50%` }}
                ></div>
                <div
                  className='absolute top-1/2 h-4 w-4 rounded-full bg-white shadow-[0_10px_30px_rgba(15,23,42,0.25)]'
                  style={{ transform: `translate(${dotSlide}px, -50%)` }}
                ></div>
                <span className='sr-only'>加载中</span>
              </div>
            </LoaderCard>

            <LoaderCard
              title='棱镜旋轮'
              desc='适合品牌型开屏，质感强烈。'
              delay={360}
            >
              <div className='relative h-20 w-20'>
                <div
                  className='absolute inset-0 rounded-full bg-[conic-gradient(from_90deg,#fbbf24,#60a5fa,#34d399,#fb7185,#fbbf24)] [mask:radial-gradient(transparent_56%,_#000_57%)] [-webkit-mask:radial-gradient(transparent_56%,_#000_57%)]'
                  style={{ transform: `rotate(${prismAngle}deg)` }}
                ></div>
                <div className='absolute inset-3 rounded-full bg-[#f6f1e6] shadow-[inset_0_0_10px_rgba(15,23,42,0.12)]'></div>
                <span className='sr-only'>加载中</span>
              </div>
            </LoaderCard>
          </section>

          <section className='grid gap-6 rounded-[32px] border border-white/70 bg-white/70 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.12)] sm:p-8'>
            <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
              <div>
                <h2 className='loading-title text-2xl font-semibold text-slate-900'>
                  组合建议
                </h2>
                <p className='mt-2 text-sm text-slate-600'>
                  尝试将不同节奏的加载器混用在页面首屏与局部区域，形成主次对比。
                </p>
              </div>
              <div className='flex flex-wrap gap-2 text-xs text-slate-500'>
                <span className='rounded-full border border-white/70 bg-white/60 px-3 py-2'>
                  首屏：棱镜旋轮
                </span>
                <span className='rounded-full border border-white/70 bg-white/60 px-3 py-2'>
                  局部：晨光律动
                </span>
                <span className='rounded-full border border-white/70 bg-white/60 px-3 py-2'>
                  通知：极光滑轨
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
