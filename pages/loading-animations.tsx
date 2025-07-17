import { useState, useEffect } from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Loader2, Zap, Heart, Star, RefreshCw } from 'lucide-react'

const LoadingAnimations = () => {
  const [activeAnimations, setActiveAnimations] = useState<Set<string>>(
    new Set()
  )
  const [progress, setProgress] = useState(0)
  const [pulseIntensity, setPulseIntensity] = useState(1)

  // 进度条动画
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 0 : prev + 1))
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // 脉冲动画强度
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIntensity(prev => (prev === 1 ? 1.2 : 1))
    }, 800)
    return () => clearInterval(interval)
  }, [])

  const toggleAnimation = (animationId: string) => {
    setActiveAnimations(prev => {
      const newSet = new Set(prev)
      if (newSet.has(animationId)) {
        newSet.delete(animationId)
      } else {
        newSet.add(animationId)
      }
      return newSet
    })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* 页面标题 */}
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-white mb-4 animate-bounce'>
            🎭 加载动画展示页面
          </h1>
          <p className='text-gray-300 text-lg'>各种酷炫的加载效果和动画演示</p>
        </div>

        {/* 旋转加载器 */}
        <Card className='p-6 bg-white/10 backdrop-blur-sm border-white/20'>
          <h2 className='text-2xl font-semibold text-white mb-6'>旋转加载器</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {/* 基础旋转 */}
            <div className='text-center'>
              <div className='animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-2'></div>
              <p className='text-gray-300'>基础旋转</p>
            </div>

            {/* 双环旋转 */}
            <div className='text-center'>
              <div className='relative h-12 w-12 mx-auto mb-2'>
                <div className='animate-spin h-12 w-12 border-4 border-green-500 border-t-transparent rounded-full'></div>
                <div
                  className='animate-spin h-8 w-8 border-4 border-yellow-500 border-b-transparent rounded-full absolute top-2 left-2'
                  style={{ animationDirection: 'reverse' }}
                ></div>
              </div>
              <p className='text-gray-300'>双环旋转</p>
            </div>

            {/* Lucide图标旋转 */}
            <div className='text-center'>
              <Loader2 className='animate-spin h-12 w-12 text-purple-500 mx-auto mb-2' />
              <p className='text-gray-300'>图标旋转</p>
            </div>

            {/* 3D旋转 */}
            <div className='text-center'>
              <div
                className='animate-spin h-12 w-12 mx-auto mb-2'
                style={{
                  background:
                    'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)',
                  borderRadius: '50%',
                  transform: 'rotateX(45deg)'
                }}
              ></div>
              <p className='text-gray-300'>3D旋转</p>
            </div>
          </div>
        </Card>

        {/* 脉冲和呼吸效果 */}
        <Card className='p-6 bg-white/10 backdrop-blur-sm border-white/20'>
          <h2 className='text-2xl font-semibold text-white mb-6'>
            脉冲和呼吸效果
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {/* 脉冲圆点 */}
            <div className='text-center'>
              <div className='relative h-12 w-12 mx-auto mb-2'>
                <div className='animate-ping absolute h-12 w-12 rounded-full bg-red-400 opacity-75'></div>
                <div className='relative h-12 w-12 rounded-full bg-red-500'></div>
              </div>
              <p className='text-gray-300'>脉冲圆点</p>
            </div>

            {/* 呼吸效果 */}
            <div className='text-center'>
              <div
                className='animate-pulse h-12 w-12 bg-blue-500 rounded-full mx-auto mb-2'
                style={{
                  transform: `scale(${pulseIntensity})`
                }}
              ></div>
              <p className='text-gray-300'>呼吸效果</p>
            </div>

            {/* 心跳效果 */}
            <div className='text-center'>
              <Heart
                className='h-12 w-12 text-red-500 mx-auto mb-2 animate-pulse'
                style={{
                  animationDuration: '1s'
                }}
              />
              <p className='text-gray-300'>心跳效果</p>
            </div>

            {/* 闪烁星星 */}
            <div className='text-center'>
              <Star className='h-12 w-12 text-yellow-400 mx-auto mb-2 animate-ping' />
              <p className='text-gray-300'>闪烁星星</p>
            </div>
          </div>
        </Card>

        {/* 进度条动画 */}
        <Card className='p-6 bg-white/10 backdrop-blur-sm border-white/20'>
          <h2 className='text-2xl font-semibold text-white mb-6'>进度条动画</h2>
          <div className='space-y-6'>
            {/* 基础进度条 */}
            <div>
              <div className='flex justify-between mb-2'>
                <span className='text-gray-300'>基础进度条</span>
                <span className='text-gray-300'>{progress}%</span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-2'>
                <div
                  className='bg-blue-500 h-2 rounded-full transition-all duration-100'
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* 渐变进度条 */}
            <div>
              <div className='flex justify-between mb-2'>
                <span className='text-gray-300'>渐变进度条</span>
                <span className='text-gray-300'>{progress}%</span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-3'>
                <div
                  className='bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-100'
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* 条纹进度条 */}
            <div>
              <div className='flex justify-between mb-2'>
                <span className='text-gray-300'>条纹进度条</span>
                <span className='text-gray-300'>{progress}%</span>
              </div>
              <div className='w-full bg-gray-700 rounded-full h-3 overflow-hidden'>
                <div
                  className='h-3 rounded-full transition-all duration-100 relative'
                  style={{
                    width: `${progress}%`,
                    background:
                      'linear-gradient(45deg, #10b981 25%, transparent 25%, transparent 50%, #10b981 50%, #10b981 75%, transparent 75%, transparent)',
                    backgroundSize: '20px 20px',
                    animation: 'stripe-move 1s linear infinite'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </Card>

        {/* 点动画 */}
        <Card className='p-6 bg-white/10 backdrop-blur-sm border-white/20'>
          <h2 className='text-2xl font-semibold text-white mb-6'>点动画</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* 波浪点 */}
            <div className='text-center'>
              <div className='flex justify-center space-x-1 mb-2'>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className='w-3 h-3 bg-blue-500 rounded-full animate-bounce'
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '0.8s'
                    }}
                  ></div>
                ))}
              </div>
              <p className='text-gray-300'>波浪点</p>
            </div>

            {/* 缩放点 */}
            <div className='text-center'>
              <div className='flex justify-center space-x-2 mb-2'>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className='w-3 h-3 bg-green-500 rounded-full animate-pulse'
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '1s'
                    }}
                  ></div>
                ))}
              </div>
              <p className='text-gray-300'>缩放点</p>
            </div>

            {/* 旋转点 */}
            <div className='text-center'>
              <div className='relative h-12 w-12 mx-auto mb-2'>
                {[0, 1, 2, 3].map(i => (
                  <div
                    key={i}
                    className='absolute w-2 h-2 bg-purple-500 rounded-full'
                    style={{
                      top: '22px',
                      left: '22px',
                      transform: `rotate(${i * 90}deg) translateX(18px)`,
                      transformOrigin: '0 0',
                      animation: `spin 2s linear infinite`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
              <p className='text-gray-300'>旋转点</p>
            </div>
          </div>
        </Card>

        {/* 交互式动画控制 */}
        <Card className='p-6 bg-white/10 backdrop-blur-sm border-white/20'>
          <h2 className='text-2xl font-semibold text-white mb-6'>交互式动画</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* 可控制的旋转 */}
            <div className='text-center'>
              <div
                className={`h-16 w-16 mx-auto mb-4 ${
                  activeAnimations.has('rotate') ? 'animate-spin' : ''
                }`}
              >
                <RefreshCw className='h-16 w-16 text-blue-500' />
              </div>
              <Button
                onClick={() => toggleAnimation('rotate')}
                className={`${
                  activeAnimations.has('rotate')
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {activeAnimations.has('rotate') ? '停止旋转' : '开始旋转'}
              </Button>
            </div>

            {/* 可控制的弹跳 */}
            <div className='text-center'>
              <div
                className={`h-16 w-16 mx-auto mb-4 ${
                  activeAnimations.has('bounce') ? 'animate-bounce' : ''
                }`}
              >
                <Zap className='h-16 w-16 text-yellow-500' />
              </div>
              <Button
                onClick={() => toggleAnimation('bounce')}
                className={`${
                  activeAnimations.has('bounce')
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                {activeAnimations.has('bounce') ? '停止弹跳' : '开始弹跳'}
              </Button>
            </div>

            {/* 可控制的脉冲 */}
            <div className='text-center'>
              <div
                className={`h-16 w-16 mx-auto mb-4 ${
                  activeAnimations.has('pulse') ? 'animate-ping' : ''
                }`}
              >
                <div className='h-16 w-16 bg-purple-500 rounded-full'></div>
              </div>
              <Button
                onClick={() => toggleAnimation('pulse')}
                className={`${
                  activeAnimations.has('pulse')
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-purple-500 hover:bg-purple-600'
                }`}
              >
                {activeAnimations.has('pulse') ? '停止脉冲' : '开始脉冲'}
              </Button>
            </div>
          </div>
        </Card>

        {/* 更多动画效果 */}
        <Card className='p-6 bg-white/10 backdrop-blur-sm border-white/20'>
          <h2 className='text-2xl font-semibold text-white mb-6'>
            更多动画效果
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* 摆动动画 */}
            <div className='text-center'>
              <div className='relative h-16 w-16 mx-auto mb-2'>
                <div className='absolute top-0 left-1/2 w-0.5 h-12 bg-gray-400 transform -translate-x-1/2'></div>
                <div
                  className='absolute bottom-0 left-1/2 w-4 h-4 bg-orange-500 rounded-full transform -translate-x-1/2'
                  style={{
                    animation: 'swing 2s ease-in-out infinite',
                    transformOrigin: '50% -48px'
                  }}
                ></div>
              </div>
              <p className='text-gray-300'>摆动钟摆</p>
            </div>

            {/* 水波纹动画 */}
            <div className='text-center'>
              <div className='relative h-16 w-16 mx-auto mb-2 flex items-center justify-center'>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className='absolute w-4 h-4 border-2 border-blue-400 rounded-full animate-ping'
                    style={{
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '2s'
                    }}
                  ></div>
                ))}
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
              </div>
              <p className='text-gray-300'>水波纹</p>
            </div>

            {/* 呼吸灯动画 */}
            <div className='text-center'>
              <div className='relative h-16 w-16 mx-auto mb-2 flex items-center justify-center'>
                <div
                  className='w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full'
                  style={{
                    animation: 'breathe 3s ease-in-out infinite'
                  }}
                ></div>
              </div>
              <p className='text-gray-300'>呼吸灯</p>
            </div>

            {/* 弹性加载 */}
            <div className='text-center'>
              <div className='flex justify-center space-x-1 mb-2'>
                {[0, 1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className='w-2 h-8 bg-green-500 rounded-full'
                    style={{
                      animation: 'elastic 1.2s ease-in-out infinite',
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
              <p className='text-gray-300'>弹性加载</p>
            </div>

            {/* 翻转卡片 */}
            <div className='text-center'>
              <div className='relative h-16 w-16 mx-auto mb-2'>
                <div
                  className='w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg'
                  style={{
                    animation: 'flip 2s ease-in-out infinite'
                  }}
                ></div>
              </div>
              <p className='text-gray-300'>翻转卡片</p>
            </div>

            {/* 简洁组合 */}
            <div className='text-center'>
              <div className='relative h-16 w-16 mx-auto mb-2 flex items-center justify-center'>
                <div className='animate-spin h-12 w-12 border-2 border-indigo-500 border-t-transparent rounded-full'></div>
                <div className='absolute animate-pulse w-6 h-6 bg-indigo-500 rounded-full'></div>
              </div>
              <p className='text-gray-300'>简洁组合</p>
            </div>
          </div>
        </Card>
      </div>

      {/* CSS动画样式 */}
      <style>{`
        @keyframes stripe-move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 20px 0;
          }
        }

        @keyframes swing {
          0%, 100% {
            transform: translateX(-50%) rotate(-15deg);
          }
          50% {
            transform: translateX(-50%) rotate(15deg);
          }
        }

        @keyframes breathe {
          0%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }

        @keyframes elastic {
          0%, 100% {
            transform: scaleY(0.3);
          }
          50% {
            transform: scaleY(1);
          }
        }

        @keyframes flip {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(180deg);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingAnimations
