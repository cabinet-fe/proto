import { 
  Spinner, 
  PulseWaves, 
  GeometricLoader, 
  OrbitLoader, 
  TextShimmer,
  GooeyLoader
} from '../components/Loaders';
import { Card } from '../components/Card';
import AnimatedBackground from '../components/AnimatedBackground';

export default function LoadersDemo() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8 font-sans text-gray-900 dark:text-gray-100 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            高性能加载动画集合
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            基于 Framer Motion 和 Tailwind CSS 构建，注重性能与视觉体验。
            包含 GPU 加速优化、SVG 路径变形与合成层处理。
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Minimal Spinner */}
          <Card className="flex flex-col items-center justify-center gap-6 p-8 min-h-[200px] hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">极简环形 (Minimal Spinner)</h3>
              <p className="text-xs text-gray-400">SVG Stroke 动画 • GPU 加速</p>
            </div>
            <div className="flex gap-4">
              <Spinner size={24} color="#3b82f6" />
              <Spinner size={32} color="#8b5cf6" />
              <Spinner size={40} color="#ec4899" />
            </div>
          </Card>

          {/* Card 2: Pulse Waves */}
          <Card className="flex flex-col items-center justify-center gap-6 p-8 min-h-[200px] hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">律动波纹 (Pulse Waves)</h3>
              <p className="text-xs text-gray-400">ScaleY 变换 • 适合音频/等待</p>
            </div>
            <PulseWaves color="#10b981" />
          </Card>

          {/* Card 3: Geometric Morph */}
          <Card className="flex flex-col items-center justify-center gap-6 p-8 min-h-[200px] hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">几何变换 (Geometric Morph)</h3>
              <p className="text-xs text-gray-400">多属性插值 • 混合模式</p>
            </div>
            <GeometricLoader />
          </Card>

           {/* Card 4: Orbit Particles */}
           <Card className="flex flex-col items-center justify-center gap-6 p-8 min-h-[200px] hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">轨道粒子 (Orbit Particles)</h3>
              <p className="text-xs text-gray-400">复合旋转 • 科技感</p>
            </div>
            <OrbitLoader color="#0ea5e9" />
          </Card>

           {/* Card 5: Text Shimmer */}
           <Card className="flex flex-col items-center justify-center gap-6 p-8 min-h-[200px] hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">文本扫光 (Text Shimmer)</h3>
              <p className="text-xs text-gray-400">ClipPath 遮罩 • 骨架屏替代</p>
            </div>
            <TextShimmer text="Loading Data..." />
          </Card>

           {/* Card 6: Gooey Effect */}
           <Card className="flex flex-col items-center justify-center gap-6 p-8 min-h-[200px] hover:shadow-lg transition-shadow bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-gray-200/50 dark:border-gray-800/50">
            <div className="space-y-2 text-center">
              <h3 className="font-semibold">粘性融合 (Gooey Effect)</h3>
              <p className="text-xs text-gray-400">SVG Filter • 视觉粘连</p>
            </div>
            <GooeyLoader />
          </Card>
        </div>
      </div>
    </div>
  );
}
