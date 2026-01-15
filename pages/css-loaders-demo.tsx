import {
  CssSpinner,
  CssPulseWaves,
  CssGeometricLoader,
  CssOrbitLoader,
  CssTextShimmer,
  CssGooeyLoader
} from '../components/CssLoaders';
import { Card } from '../components/Card';
import AnimatedBackground from '../components/AnimatedBackground';

export default function CssLoadersDemo() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 font-sans text-gray-900 dark:text-gray-100 relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            纯 CSS 高性能加载动画
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            完全不依赖 JavaScript 动画库。使用原生 CSS @keyframes 和 transform 实现。
            零运行时开销，极致轻量。
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Minimal Spinner */}
          <Card className="flex flex-col items-center justify-center gap-6 p-8 min-h-[200px] hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">极简环形 (CSS)</h3>
              <p className="text-xs text-gray-400">@keyframes rotate</p>
            </div>
            <div className="flex gap-4">
              <CssSpinner size={24} color="#3b82f6" />
              <CssSpinner size={32} color="#8b5cf6" />
              <CssSpinner size={40} color="#ec4899" />
            </div>
          </Card>

          {/* Card 2: Pulse Waves */}
          <Card className="flex flex-col items-center justify-center gap-6 p-8 min-h-[200px] hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">律动波纹 (CSS)</h3>
              <p className="text-xs text-gray-400">animation-delay 序列</p>
            </div>
            <CssPulseWaves color="#10b981" />
          </Card>

          {/* Card 3: Geometric Morph */}
          <Card className="flex flex-col items-center justify-center gap-6 p-8 min-h-[200px] hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">几何变换 (CSS)</h3>
              <p className="text-xs text-gray-400">border-radius 动画</p>
            </div>
            <CssGeometricLoader />
          </Card>

           {/* Card 4: Orbit Particles */}
           <Card className="flex flex-col items-center justify-center gap-6 p-8 min-h-[200px] hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">轨道粒子 (CSS)</h3>
              <p className="text-xs text-gray-400">嵌套容器旋转</p>
            </div>
            <CssOrbitLoader color="#0ea5e9" />
          </Card>

           {/* Card 5: Text Shimmer */}
           <Card className="flex flex-col items-center justify-center gap-6 p-8 min-h-[200px] hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">文本扫光 (CSS)</h3>
              <p className="text-xs text-gray-400">mask-position 动画</p>
            </div>
            <CssTextShimmer text="加载中..." />
          </Card>

           {/* Card 6: Gooey Effect */}
           <Card className="flex flex-col items-center justify-center gap-6 p-8 min-h-[200px] hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">粘性融合 (CSS)</h3>
              <p className="text-xs text-gray-400">SVG Filter + CSS 变换</p>
            </div>
            <CssGooeyLoader />
          </Card>
        </div>
      </div>
    </div>
  );
}
