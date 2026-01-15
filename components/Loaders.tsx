import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

// 1. 极简环形加载 (Minimal Spinner)
// 高性能：使用 SVG stroke-dasharray 动画，GPU 加速
export const Spinner = ({ className, size = 24, color = 'currentColor' }: { className?: string; size?: number; color?: string }) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <motion.span
        className="block border-2 border-transparent rounded-full box-border absolute inset-0"
        style={{ borderTopColor: color, borderRightColor: color }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="block border-2 border-transparent rounded-full box-border absolute inset-0 opacity-20"
        style={{ borderColor: color }}
      />
    </div>
  );
};

// 2. 律动波纹 (Pulse Waves)
// 视觉舒适，适合等待响应
export const PulseWaves = ({ className, color = '#3b82f6' }: { className?: string; color?: string }) => {
  return (
    <div className={cn("flex items-center gap-1 h-8", className)}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-current rounded-full"
          style={{ height: '100%', backgroundColor: color }}
          animate={{
            scaleY: [0.3, 1, 0.3],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15
          }}
        />
      ))}
    </div>
  );
};

// 3. 几何变换 (Geometric Morph)
// 高颜值，利用 layoutId 或 SVG path 变形
export const GeometricLoader = ({ className, size = 40 }: { className?: string; size?: number }) => {
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 bg-indigo-500 rounded-lg opacity-80"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ["20%", "50%", "20%", "50%", "20%"],
          scale: [1, 0.8, 1, 0.8, 1],
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-purple-500 rounded-lg opacity-50 mix-blend-multiply"
        animate={{
          rotate: [0, -90, -180, -270, -360],
          borderRadius: ["50%", "20%", "50%", "20%", "50%"],
          scale: [0.8, 1, 0.8, 1, 0.8],
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
          repeat: Infinity,
        }}
      />
    </div>
  );
};

// 4. 轨道粒子 (Orbit Particles)
// 科技感强
export const OrbitLoader = ({ className, size = 48, color = '#10b981' }: { className?: string; size?: number; color?: string }) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      {/* Track Ring */}
      <div className="absolute inset-0 rounded-full border border-gray-200 dark:border-gray-700 opacity-30" />
      
      {/* Particle 1 - Outer Orbit */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <span 
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-sm" 
          style={{ backgroundColor: color }} 
        />
      </motion.div>

      {/* Particle 2 - Inner Orbit (Reverse) */}
      <motion.div
        className="absolute inset-3"
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <span 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full opacity-80" 
          style={{ backgroundColor: color }} 
        />
      </motion.div>
      
      {/* Core */}
      <div className="w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: color }} />
    </div>
  );
};

// 5. 文本闪烁 (Text Shimmer)
// 适合骨架屏或加载文字
export const TextShimmer = ({ text = "Loading...", className }: { text?: string; className?: string }) => {
  return (
    <div className={cn("font-medium text-lg relative inline-block", className)}>
      {/* Base Text */}
      <span className="text-gray-200 dark:text-gray-800">{text}</span>
      
      {/* Shimmer Overlay */}
      <motion.span
        className="absolute inset-0 text-gray-900 dark:text-gray-100"
        initial={{ maskPosition: '-100% 0', WebkitMaskPosition: '-100% 0' } as any}
        animate={{ maskPosition: '200% 0', WebkitMaskPosition: '200% 0' } as any}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 0.5
        }}
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%, transparent 100%)',
          maskSize: '50% 100%',
          WebkitMaskSize: '50% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export const GooeyLoader = () => {
  return (
    <div className="h-24 w-40 relative flex items-center justify-center">
       <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="goo-loader-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
      <div className="relative w-full h-full flex items-center justify-center" style={{ filter: 'url(#goo-loader-filter)' }}>
         <motion.div 
            className="w-6 h-6 bg-pink-500 rounded-full absolute"
            animate={{ x: [-30, 30, -30], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
         />
         <motion.div 
            className="w-6 h-6 bg-rose-500 rounded-full absolute"
            animate={{ x: [30, -30, 30], scale: [1.2, 1, 1.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
         />
      </div>
    </div>
  )
}
