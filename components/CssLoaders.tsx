import { cn } from '../utils/cn';

// 1. 极简环形加载 (CSS Version)
export const CssSpinner = ({ className, size = 24, color = 'currentColor' }: { className?: string; size?: number; color?: string }) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <div
        className="block border-2 border-transparent rounded-full box-border absolute inset-0 animate-css-spin"
        style={{ borderTopColor: color, borderRightColor: color }}
      />
      <div
        className="block border-2 border-transparent rounded-full box-border absolute inset-0 opacity-20"
        style={{ borderColor: color }}
      />
    </div>
  );
};

// 2. 律动波纹 (CSS Version)
export const CssPulseWaves = ({ className, color = '#3b82f6' }: { className?: string; color?: string }) => {
  return (
    <div className={cn("flex items-center gap-1 h-8", className)}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-1.5 bg-current rounded-full"
          style={{ 
            height: '100%', 
            backgroundColor: color,
            animation: 'css-pulse-wave 1s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`
          }}
        />
      ))}
    </div>
  );
};

// 3. 几何变换 (CSS Version)
export const CssGeometricLoader = ({ className, size = 40 }: { className?: string; size?: number }) => {
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <div
        className="absolute inset-0 bg-indigo-500 rounded-lg opacity-80 animate-css-morph-1"
      />
      <div
        className="absolute inset-0 bg-purple-500 rounded-lg opacity-50 mix-blend-multiply animate-css-morph-2"
      />
    </div>
  );
};

// 4. 轨道粒子 (CSS Version)
export const CssOrbitLoader = ({ className, size = 48, color = '#10b981' }: { className?: string; size?: number; color?: string }) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
      {/* Track Ring */}
      <div className="absolute inset-0 rounded-full border border-gray-200 dark:border-gray-700 opacity-30" />
      
      {/* Particle 1 - Outer Orbit */}
      <div className="absolute inset-0 animate-css-orbit-outer">
        <span 
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full shadow-sm" 
          style={{ backgroundColor: color }} 
        />
      </div>

      {/* Particle 2 - Inner Orbit (Reverse) */}
      <div className="absolute inset-3 animate-css-orbit-inner">
        <span 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full opacity-80" 
          style={{ backgroundColor: color }} 
        />
      </div>
      
      {/* Core */}
      <div className="w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: color }} />
    </div>
  );
};

// 5. 文本闪烁 (CSS Version)
export const CssTextShimmer = ({ text = "Loading...", className }: { text?: string; className?: string }) => {
  return (
    <div className={cn("font-medium text-lg relative inline-block", className)}>
      {/* Base Text */}
      <span className="text-gray-200 dark:text-gray-800">{text}</span>
      
      {/* Shimmer Overlay */}
      <span
        className="absolute inset-0 text-gray-900 dark:text-gray-100 animate-css-shimmer"
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
      </span>
    </div>
  );
};

// 6. 粘性融合 (CSS Version)
export const CssGooeyLoader = () => {
  return (
    <div className="h-24 w-40 relative flex items-center justify-center">
       <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="css-goo-filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>
      <div className="relative w-full h-full flex items-center justify-center" style={{ filter: 'url(#css-goo-filter)' }}>
         <div 
            className="w-6 h-6 bg-pink-500 rounded-full absolute animate-css-gooey-1"
         />
         <div 
            className="w-6 h-6 bg-rose-500 rounded-full absolute animate-css-gooey-2"
         />
      </div>
    </div>
  )
}
