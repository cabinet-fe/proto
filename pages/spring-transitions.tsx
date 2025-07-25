import React, { useState, useEffect } from 'react'
import { Button, Card, CardHeader, CardContent } from '../components'
import { Play, Pause, RotateCcw, Sparkles, Zap, Heart } from 'lucide-react'

// 简化的弹簧动画样式
const springStyles = `
@keyframes bounceSpring {
  0% {
    transform: scale(0) translateY(20px);
    opacity: 0;
  }
  40% {
    transform: scale(1.2) translateY(-10px);
    opacity: 1;
  }
  70% {
    transform: scale(0.9) translateY(5px);
    opacity: 1;
  }
  100% {
    transform: scale(1) translateY(0px);
    opacity: 1;
  }
}

@keyframes scaleSpring {
  0% {
    transform: scale(0) rotate(90deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.3) rotate(30deg);
    opacity: 1;
  }
  80% {
    transform: scale(0.9) rotate(-10deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

@keyframes slideSpring {
  0% {
    transform: translateX(80%) scale(0.5);
    opacity: 0;
  }
  40% {
    transform: translateX(-20%) scale(1.2);
    opacity: 1;
  }
  70% {
    transform: translateX(10%) scale(0.9);
    opacity: 1;
  }
  100% {
    transform: translateX(0%) scale(1);
    opacity: 1;
  }
}

@keyframes elasticSpring {
  0% {
    transform: scaleX(0) scaleY(1.5);
    opacity: 0;
  }
  40% {
    transform: scaleX(1.4) scaleY(0.6);
    opacity: 1;
  }
  70% {
    transform: scaleX(0.8) scaleY(1.2);
    opacity: 1;
  }
  100% {
    transform: scaleX(1) scaleY(1);
    opacity: 1;
  }
}

.spring-element {
  transform-origin: center center;
}

.spring-element.animate-bounce {
  animation: bounceSpring 0.5s ease-out forwards;
}

.spring-element.animate-scale {
  animation: scaleSpring 0.5s ease-out forwards;
}

.spring-element.animate-slide {
  animation: slideSpring 0.5s ease-out forwards;
}

.spring-element.animate-elastic {
  animation: elasticSpring 0.5s ease-out forwards;
}

.spring-element.hidden {
  opacity: 0;
  transform: scale(0);
}

.spring-element.visible {
  opacity: 1;
  transform: scale(1);
}
`

const SpringTransitionsFixed: React.FC = () => {
  const [animations, setAnimations] = useState({
    bounce: false,
    scale: false,
    slide: false,
    elastic: false
  })
  const [autoPlay, setAutoPlay] = useState(false)

  // 重置动画的函数
  const triggerAnimation = (type: keyof typeof animations) => {
    // 先设为 false 重置动画
    setAnimations(prev => ({ ...prev, [type]: false }))
    // 短暂延迟后设为 true 触发动画
    setTimeout(() => {
      setAnimations(prev => ({ ...prev, [type]: true }))
    }, 50)
  }

  // 自动播放逻辑
  useEffect(() => {
    if (!autoPlay) return

    const animationTypes = Object.keys(
      animations
    ) as (keyof typeof animations)[]

    animationTypes.forEach(triggerAnimation)

    const interval = setInterval(() => {
      animationTypes.forEach(triggerAnimation)
    }, 1500)

    return () => clearInterval(interval)
  }, [autoPlay])

  const resetAll = () => {
    setAnimations({
      bounce: false,
      scale: false,
      slide: false,
      elastic: false
    })
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: springStyles }} />
      <div className='min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-6'>
        <div className='max-w-4xl mx-auto'>
          {/* 头部控制区 */}
          <Card className='mb-8 backdrop-blur-sm bg-white/70 border-white/50 shadow-xl'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div>
                  <h1 className='text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent'>
                    弹簧动画展示
                  </h1>
                  <p className='text-gray-600 mt-2'>快速弹簧动画效果</p>
                </div>
                <div className='flex gap-3'>
                  <Button
                    onClick={() => setAutoPlay(!autoPlay)}
                    className={`${
                      autoPlay
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white`}
                  >
                    {autoPlay ? (
                      <Pause className='w-4 h-4 mr-2' />
                    ) : (
                      <Play className='w-4 h-4 mr-2' />
                    )}
                    {autoPlay ? '停止自动播放' : '开始自动播放'}
                  </Button>
                  <Button onClick={resetAll} variant='outline'>
                    <RotateCcw className='w-4 h-4 mr-2' />
                    重置所有
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* 动画展示网格 */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* 弹跳动画 */}
            <Card className='backdrop-blur-sm bg-white/70 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300'>
              <CardHeader>
                <h3 className='text-lg font-semibold text-gray-800 flex items-center'>
                  <Sparkles className='w-5 h-5 mr-2 text-purple-500' />
                  弹跳效果
                </h3>
              </CardHeader>
              <CardContent>
                <div className='h-32 flex items-center justify-center relative overflow-hidden'>
                  <div
                    className={`spring-element w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-xl ${
                      animations.bounce ? 'animate-bounce visible' : 'hidden'
                    }`}
                  >
                    ✨
                  </div>
                </div>
                <Button
                  onClick={() => triggerAnimation('bounce')}
                  className='w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white'
                >
                  触发弹跳
                </Button>
              </CardContent>
            </Card>

            {/* 缩放弹簧动画 */}
            <Card className='backdrop-blur-sm bg-white/70 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300'>
              <CardHeader>
                <h3 className='text-lg font-semibold text-gray-800 flex items-center'>
                  <Zap className='w-5 h-5 mr-2 text-blue-500' />
                  弹性缩放
                </h3>
              </CardHeader>
              <CardContent>
                <div className='h-32 flex items-center justify-center relative overflow-hidden'>
                  <div
                    className={`spring-element w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-xl flex items-center justify-center text-white font-bold text-2xl border-4 border-white ${
                      animations.scale ? 'animate-scale visible' : 'hidden'
                    }`}
                  >
                    💎
                  </div>
                </div>
                <Button
                  onClick={() => triggerAnimation('scale')}
                  className='w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white'
                >
                  弹性缩放
                </Button>
              </CardContent>
            </Card>

            {/* 滑动弹簧动画 */}
            <Card className='backdrop-blur-sm bg-white/70 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300'>
              <CardHeader>
                <h3 className='text-lg font-semibold text-gray-800 flex items-center'>
                  <Heart className='w-5 h-5 mr-2 text-red-500' />
                  滑动弹跳
                </h3>
              </CardHeader>
              <CardContent>
                <div className='h-32 flex items-center justify-center relative overflow-hidden'>
                  <div
                    className={`spring-element w-18 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold px-4 ${
                      animations.slide ? 'animate-slide visible' : 'hidden'
                    }`}
                  >
                    🚀
                  </div>
                </div>
                <Button
                  onClick={() => triggerAnimation('slide')}
                  className='w-full mt-4 bg-red-500 hover:bg-red-600 text-white'
                >
                  滑动弹跳
                </Button>
              </CardContent>
            </Card>

            {/* 弹性变形动画 */}
            <Card className='backdrop-blur-sm bg-white/70 border-white/50 shadow-lg hover:shadow-xl transition-all duration-300'>
              <CardHeader>
                <h3 className='text-lg font-semibold text-gray-800'>
                  弹性变形
                </h3>
              </CardHeader>
              <CardContent>
                <div className='h-32 flex items-center justify-center relative overflow-hidden'>
                  <div
                    className={`spring-element w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold text-xl ${
                      animations.elastic ? 'animate-elastic visible' : 'hidden'
                    }`}
                  >
                    🎯
                  </div>
                </div>
                <Button
                  onClick={() => triggerAnimation('elastic')}
                  className='w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white'
                >
                  弹性变形
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default SpringTransitionsFixed
