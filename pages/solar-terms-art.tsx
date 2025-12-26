import React, { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../utils/cn'

// --- 类型定义 ---

type Season = 'spring' | 'summer' | 'autumn' | 'winter'

interface SolarTerm {
  name: string
  english: string
  poem: string[]
  description: string
  longitude: number
  season: Season
}

// --- 数据 ---

const SOLAR_TERMS: SolarTerm[] = [
  { name: '立春', english: 'Start of Spring', poem: ['东风带雨逐西风', '大地阳和暖气生'], description: '东风解冻，蛰虫始振', longitude: 315, season: 'spring' },
  { name: '雨水', english: 'Rain Water', poem: ['好雨知时节', '当春乃发生'], description: '冰雪消融，草木萌动', longitude: 330, season: 'spring' },
  { name: '惊蛰', english: 'Awakening of Insects', poem: ['微雨众卉新', '一雷惊蛰始'], description: '春雷乍响，万物复苏', longitude: 345, season: 'spring' },
  { name: '春分', english: 'Spring Equinox', poem: ['仲春初四日', '春色正中分'], description: '昼夜平分，燕子归来', longitude: 0, season: 'spring' },
  { name: '清明', english: 'Clear and Bright', poem: ['清明时节雨纷纷', '路上行人欲断魂'], description: '气清景明，桃花盛开', longitude: 15, season: 'spring' },
  { name: '谷雨', english: 'Grain Rain', poem: ['好雨生百谷', '清明断雪天'], description: '雨生百谷，春播繁忙', longitude: 30, season: 'spring' },
  { name: '立夏', english: 'Start of Summer', poem: ['芳菲歇去何须恨', '夏木阴阴正可人'], description: '万物繁茂，夏日初临', longitude: 45, season: 'summer' },
  { name: '小满', english: 'Grain Buds', poem: ['夜莺啼绿柳', '皓月醒长空'], description: '麦穗初齐，蚕蛹结茧', longitude: 60, season: 'summer' },
  { name: '芒种', english: 'Grain in Ear', poem: ['家家麦未饭', '处处菱歌长'], description: '仲夏始至，麦收在即', longitude: 75, season: 'summer' },
  { name: '夏至', english: 'Summer Solstice', poem: ['昼晷已云极', '宵漏自此长'], description: '日长之至，阳气盛极', longitude: 90, season: 'summer' },
  { name: '小暑', english: 'Minor Heat', poem: ['倏忽温风至', '因循小暑来'], description: '温风至，蟋蟀居壁', longitude: 105, season: 'summer' },
  { name: '大暑', english: 'Major Heat', poem: ['赤日几时过', '清风无处寻'], description: '炎热至极，万物蒸腾', longitude: 120, season: 'summer' },
  { name: '立秋', english: 'Start of Autumn', poem: ['一叶梧桐一报秋', '稻花田里话丰收'], description: '凉风至，白露降', longitude: 135, season: 'autumn' },
  { name: '处暑', english: 'End of Heat', poem: ['离离暑云散', '袅袅凉风起'], description: '暑气渐消，秋意初显', longitude: 150, season: 'autumn' },
  { name: '白露', english: 'White Dew', poem: ['露从今夜白', '月是故乡明'], description: '露凝而白，玄鸟归去', longitude: 165, season: 'autumn' },
  { name: '秋分', english: 'Autumn Equinox', poem: ['暑退秋澄转爽凉', '日光夜色两均长'], description: '昼夜均分，丹桂飘香', longitude: 180, season: 'autumn' },
  { name: '寒露', english: 'Cold Dew', poem: ['萧疏桐叶上', '月白露初团'], description: '露寒而冷，鸿雁来宾', longitude: 195, season: 'autumn' },
  { name: '霜降', english: 'Frost Descent', poem: ['霜叶红于二月花', '寒潭碧水映晚霞'], description: '气肃霜降，草木摇落', longitude: 210, season: 'autumn' },
  { name: '立冬', english: 'Start of Winter', poem: ['北风往复几寒凉', '疏木摇空半绿黄'], description: '水始冰，地始冻', longitude: 225, season: 'winter' },
  { name: '小雪', english: 'Minor Snow', poem: ['花雪随风不厌看', '更多还肯失林峦'], description: '虹藏不见，天气上腾', longitude: 240, season: 'winter' },
  { name: '大雪', english: 'Major Snow', poem: ['六出飞花入户时', '坐看青竹变琼枝'], description: '至此而雪盛，鹖旦不鸣', longitude: 255, season: 'winter' },
  { name: '冬至', english: 'Winter Solstice', poem: ['天时人事日相催', '冬至阳生春又来'], description: '日短之至，阴极阳生', longitude: 270, season: 'winter' },
  { name: '小寒', english: 'Minor Cold', poem: ['小寒连大吕', '欢鹊垒新巢'], description: '雁北乡，鹊始巢', longitude: 285, season: 'winter' },
  { name: '大寒', english: 'Major Cold', poem: ['大寒岂可无杯酒', '欲致多多恨未能'], description: '寒气之逆极，坚冰深厚', longitude: 300, season: 'winter' },
]

// 中国传统色配置
const SEASON_THEME: Record<Season, {
  bgGradient: string
  primaryColor: string
  secondaryColor: string
  textColor: string
  sealColor: string
  particleType: 'petal' | 'firefly' | 'leaf' | 'snow'
}> = {
  spring: {
    bgGradient: 'from-[#f0f0f4] to-[#d4f2e7]', // 铅白 -> 碧色
    primaryColor: '#80989b', // 蟹壳青
    secondaryColor: '#f1939c', // 桃红
    textColor: '#2e3a1f', // 油绿
    sealColor: '#c83c23', // 殷红
    particleType: 'petal',
  },
  summer: {
    bgGradient: 'from-[#fffbf0] to-[#eaffd0]', // 象牙白 -> 柳黄
    primaryColor: '#5e7987', // 这里的颜色需要微调以保持对比度
    secondaryColor: '#4fab85', // 竹绿
    textColor: '#2b333e', // 墨灰
    sealColor: '#b22c46',
    particleType: 'firefly',
  },
  autumn: {
    bgGradient: 'from-[#fffce7] to-[#f9e0c9]', // 米色 -> 杏黄
    primaryColor: '#9d2933', // 胭脂
    secondaryColor: '#e29c45', // 金黄
    textColor: '#5d3f3f', // 赭石
    sealColor: '#8c1a1a',
    particleType: 'leaf',
  },
  winter: {
    bgGradient: 'from-[#f7f9fa] to-[#d8e3e7]', // 雪白 -> 云水蓝
    primaryColor: '#1661ab', // 靛蓝
    secondaryColor: '#8fa2b8', // 这里的辅助色
    textColor: '#1a2933', // 苍黑
    sealColor: '#a61b29',
    particleType: 'snow',
  },
}

// --- 辅助函数 ---

function getSunLongitude(date: Date): number {
  const year = date.getFullYear()
  const start = new Date(year, 0, 1)
  const diff = date.getTime() - start.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  const springEquinoxDay = 80
  const degreesPerDay = 360 / 365.25
  let longitude = (dayOfYear - springEquinoxDay) * degreesPerDay
  if (longitude < 0) longitude += 360
  return longitude % 360
}

function getCurrentSolarTermIndex(date: Date): number {
  const sunLongitude = getSunLongitude(date)
  for (let i = 0; i < SOLAR_TERMS.length; i++) {
    const current = SOLAR_TERMS[i].longitude
    const next = SOLAR_TERMS[(i + 1) % SOLAR_TERMS.length].longitude
    if (next > current) {
      if (sunLongitude >= current && sunLongitude < next) return i
    } else {
      if (sunLongitude >= current || sunLongitude < next) return i
    }
  }
  return 0
}

// --- 组件 ---

const SVGIcons = {
  petal: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12,2C12,2 14,8 18,10C22,12 22,14 20,16C18,18 16,16 12,22C8,16 6,18 4,16C2,14 2,12 6,10C10,8 12,2 12,2Z" />
    </svg>
  ),
  leaf: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12,2L14,8L20,8L16,12L18,18L12,14L6,18L8,12L4,8L10,8L12,2Z" />
    </svg>
  ),
  snow: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
    </svg>
  )
}

function Particles({ type, color }: { type: string, color: string }) {
  const count = type === 'firefly' ? 30 : 50

  const items = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  })), [type, count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute"
          style={{
            left: `${item.x}%`,
            top: type === 'firefly' ? `${item.y}%` : '-20px',
            color: color,
            width: item.size,
            height: item.size,
            opacity: 0.6
          }}
          animate={
            type === 'firefly'
              ? {
                  x: [0, Math.random() * 50 - 25, 0],
                  y: [0, Math.random() * 50 - 25, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0.8, 1.2, 0.8]
                }
              : {
                  y: ['0vh', '110vh'],
                  x: [0, Math.sin(item.id) * 100],
                  rotate: [0, 360],
                  opacity: [0, 1, 0]
                }
          }
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear'
          }}
        >
          {type === 'petal' && <SVGIcons.petal />}
          {type === 'leaf' && <SVGIcons.leaf />}
          {type === 'snow' && <SVGIcons.snow />}
          {type === 'firefly' && <div className="w-full h-full rounded-full bg-yellow-200 blur-sm shadow-[0_0_10px_rgba(255,255,0,0.5)]" />}
        </motion.div>
      ))}
    </div>
  )
}

function Seal({ text, color }: { text: string, color: string }) {
  return (
    <div 
      className="w-16 h-16 border-4 border-double flex items-center justify-center rounded-sm transform rotate-3 opacity-80"
      style={{ borderColor: color, color: color }}
    >
      <div className="text-2xl font-bold [writing-mode:vertical-rl] font-serif select-none">
        {text}
      </div>
    </div>
  )
}

export default function SolarTermsArtPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // 初始化时计算当前节气
  useEffect(() => {
    setCurrentIndex(getCurrentSolarTermIndex(new Date()))
  }, [])

  const currentTerm = SOLAR_TERMS[currentIndex]
  const theme = SEASON_THEME[currentTerm.season]

  // 处理鼠标滚轮切换
  const handleWheel = () => {
    // 简单的防抖或节流逻辑可以在这里添加，目前简化处理
  }
  
  const nextTerm = () => setCurrentIndex((prev) => (prev + 1) % SOLAR_TERMS.length)
  const prevTerm = () => setCurrentIndex((prev) => (prev - 1 + SOLAR_TERMS.length) % SOLAR_TERMS.length)

  return (
    <div 
      className={cn(
        "relative w-full h-screen overflow-hidden transition-colors duration-1000",
        "bg-gradient-to-br"
      )}
      style={{
        backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))`,
        '--tw-gradient-from': theme.bgGradient.split(' ')[1], 
        background: `linear-gradient(135deg, ${theme.bgGradient.match(/from-\[(.*?)\]/)?.[1] || '#fff'} 0%, ${theme.bgGradient.match(/to-\[(.*?)\]/)?.[1] || '#eee'} 100%)`
      } as React.CSSProperties}
      onWheel={handleWheel}
    >
      {/* 噪点纹理 */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <Particles type={theme.particleType} color={theme.secondaryColor} />

      {/* 导航按钮 */}
      <button onClick={prevTerm} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 hover:bg-black/5 rounded-full transition-colors text-black/30 hover:text-black/60">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button onClick={nextTerm} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 hover:bg-black/5 rounded-full transition-colors text-black/30 hover:text-black/60">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* 主体内容 */}
      <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-20 font-serif">
        
        {/* 左侧：诗词 & 描述 */}
        <div className="h-full flex flex-col justify-center items-start md:items-end order-2 md:order-1 flex-1">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentTerm.name + 'poem'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-row-reverse gap-8"
            >
              {currentTerm.poem.map((line, i) => (
                <div key={i} 
                  className="[writing-mode:vertical-rl] text-2xl md:text-3xl tracking-[0.3em] font-light leading-loose"
                  style={{ color: theme.textColor }}
                >
                  {line}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          <motion.div 
            className="mt-12 text-right opacity-60 md:mr-4"
            style={{ color: theme.textColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
          >
            <p className="mb-2 text-lg">{currentTerm.description}</p>
            <p className="text-sm font-sans uppercase tracking-widest">{currentTerm.english}</p>
          </motion.div>
        </div>

        {/* 中间：装饰圆环 (在移动端可能隐藏或叠底) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 md:opacity-100">
           <motion.div
             className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border-[1px]"
             style={{ borderColor: theme.primaryColor }}
             animate={{ rotate: 360 }}
             transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
           />
        </div>

        {/* 右侧：节气名 & 印章 */}
        <div className="h-full flex flex-col justify-center items-center md:items-start order-1 md:order-2 flex-1 pl-0 md:pl-20">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentTerm.name}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
               {/* 巨大的节气字 */}
               <h1 
                 className="text-[120px] md:text-[180px] leading-none font-bold [writing-mode:vertical-rl] select-none"
                 style={{ 
                   color: theme.primaryColor,
                   fontFamily: '"Noto Serif SC", "SimSun", serif',
                   textShadow: '4px 4px 0px rgba(0,0,0,0.05)'
                 }}
               >
                 {currentTerm.name}
               </h1>
               
               {/* 印章位置 */}
               <div className="absolute -bottom-8 -left-8 md:-left-12">
                 <Seal text={currentTerm.season === 'spring' ? '春日' : currentTerm.season === 'summer' ? '夏至' : currentTerm.season === 'autumn' ? '秋收' : '冬藏'} color={theme.sealColor} />
               </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* 底部时间轴指示器 */}
      <div className="absolute bottom-8 left-0 w-full px-8">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          {SOLAR_TERMS.map((term, index) => {
            const isActive = index === currentIndex
            return (
              <div 
                key={term.name}
                className="group relative flex flex-col items-center cursor-pointer"
                onClick={() => setCurrentIndex(index)}
              >
                <div 
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-300 mb-2",
                    isActive ? "w-2 h-2 scale-150" : "opacity-30 hover:opacity-100"
                  )}
                  style={{ backgroundColor: isActive ? theme.primaryColor : theme.textColor }}
                />
                {isActive && (
                  <span className="absolute -top-8 text-xs font-serif whitespace-nowrap" style={{ color: theme.textColor }}>
                    {term.name}
                  </span>
                )}
              </div>
            )
          })}
        </div>
        <div className="w-full h-[1px] bg-black/5 absolute bottom-[39px] left-0 max-w-4xl mx-auto right-0 -z-10" />
      </div>
    </div>
  )
}
