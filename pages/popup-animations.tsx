import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Card, CardHeader, CardContent } from '../components'
import {
  Sparkles,
  Zap,
  Star,
  Heart,
  Gift,
  Rocket,
  Wand2,
  Crown,
  Diamond,
  Flame
} from 'lucide-react'

// 动画变种配置
const animationVariants = {
  center: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 }
  },
  slideFromTop: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 }
  },
  slideFromBottom: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 }
  },
  slideFromLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  },
  slideFromRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 }
  },
  bounceScale: {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 300, damping: 20 }
    },
    exit: { scale: 0, opacity: 0 }
  },
  rotateIn: {
    initial: { rotate: -180, scale: 0, opacity: 0 },
    animate: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 200, damping: 15 }
    },
    exit: { rotate: 180, scale: 0, opacity: 0 }
  },
  flip: {
    initial: { rotateY: -90, opacity: 0 },
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 300, damping: 25 }
    },
    exit: { rotateY: 90, opacity: 0 }
  },
  swing: {
    initial: { rotate: -30, scale: 0, opacity: 0 },
    animate: {
      rotate: [0, 10, -10, 5, -5, 0],
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' as const }
    },
    exit: { rotate: 30, scale: 0, opacity: 0 }
  }
}

// 动画配置数据
const animationTypes = [
  {
    key: 'center',
    name: '中心弹出',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500',
    description: '从中心缩放弹出'
  },
  {
    key: 'slideFromTop',
    name: '上方滑入',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    description: '从顶部滑动进入'
  },
  {
    key: 'slideFromBottom',
    name: '下方滑入',
    icon: Star,
    color: 'from-green-500 to-emerald-500',
    description: '从底部滑动进入'
  },
  {
    key: 'slideFromLeft',
    name: '左侧滑入',
    icon: Heart,
    color: 'from-red-500 to-rose-500',
    description: '从左侧滑动进入'
  },
  {
    key: 'slideFromRight',
    name: '右侧滑入',
    icon: Gift,
    color: 'from-orange-500 to-amber-500',
    description: '从右侧滑动进入'
  },
  {
    key: 'bounceScale',
    name: '弹性缩放',
    icon: Rocket,
    color: 'from-indigo-500 to-purple-500',
    description: '带弹性效果的缩放'
  },
  {
    key: 'rotateIn',
    name: '旋转进入',
    icon: Wand2,
    color: 'from-pink-500 to-violet-500',
    description: '旋转同时缩放进入'
  },
  {
    key: 'flip',
    name: '翻转效果',
    icon: Crown,
    color: 'from-teal-500 to-blue-500',
    description: '3D翻转进入效果'
  },
  {
    key: 'swing',
    name: '摆动进入',
    icon: Diamond,
    color: 'from-yellow-500 to-orange-500',
    description: '摆动摇摆进入效果'
  }
]

export default function PopupAnimations() {
  const [activePopup, setActivePopup] = useState<string | null>(null)
  const [selectedAnimation, setSelectedAnimation] = useState('center')

  const showPopup = (animationType: string) => {
    setSelectedAnimation(animationType)
    setActivePopup(animationType)
  }

  const hidePopup = () => setActivePopup(null)

  const showRandomPopup = () => {
    hidePopup()
    setTimeout(() => {
      const randomAnimation =
        animationTypes[Math.floor(Math.random() * animationTypes.length)]
      showPopup(randomAnimation.key)
    }, 200)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8'>
      {/* 背景装饰 */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto'>
        {/* 标题区域 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-12'
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className='inline-block mb-4'
          >
            <Flame className='w-16 h-16 text-orange-400' />
          </motion.div>
          <h1 className='text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4'>
            酷炫弹出动画展示
          </h1>
          <p className='text-xl text-slate-300 max-w-2xl mx-auto'>
            体验各种令人惊艳的弹出动画效果，每种动画都有独特的视觉魅力和交互体验
          </p>
        </motion.div>

        {/* 动画按钮网格 */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'>
          {animationTypes.map((animation, index) => {
            const IconComponent = animation.icon
            return (
              <motion.div
                key={animation.key}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className='bg-slate-800/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 cursor-pointer group'
                  onClick={() => showPopup(animation.key)}
                >
                  <CardContent className='p-6 text-center'>
                    <div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${animation.color} p-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className='w-full h-full text-white' />
                    </div>
                    <h3 className='text-xl font-semibold text-white mb-2'>
                      {animation.name}
                    </h3>
                    <p className='text-slate-400 text-sm'>
                      {animation.description}
                    </p>
                    <Button
                      className='mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0'
                      size='sm'
                    >
                      试试看
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* 全局控制按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className='text-center'
        >
          <Button
            onClick={() => showPopup('center')}
            className='bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white border-0 text-lg px-8 py-3'
          >
            <Sparkles className='w-5 h-5 mr-2' />
            显示随机弹窗
          </Button>
        </motion.div>
      </div>

      {/* 弹出层 */}
      <AnimatePresence>
        {activePopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40'
              onClick={hidePopup}
            />
            <div className='fixed inset-0 flex items-center justify-center z-50 p-4'>
              <motion.div
                variants={
                  animationVariants[
                    selectedAnimation as keyof typeof animationVariants
                  ]
                }
                initial='initial'
                animate='animate'
                exit='exit'
                className='relative'
              >
                <Card className='bg-slate-800 border-slate-600 h-[90vh] shadow-2xl w-[90vw]'>
                  <CardHeader className='text-center pb-4'>
                    <div className='w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-5'>
                      <Sparkles className='w-full h-full text-white' />
                    </div>
                    <h2 className='text-2xl font-bold text-white'>
                      弹出动画成功！
                    </h2>
                  </CardHeader>
                  <CardContent className='text-center pb-6'>
                    <p className='text-slate-300 mb-6'>
                      您刚刚体验了 "
                      {
                        animationTypes.find(a => a.key === selectedAnimation)
                          ?.name
                      }
                      " 动画效果。 每种动画都有独特的视觉表现和用户体验。
                    </p>
                    <div className='flex gap-3 justify-center'>
                      <Button
                        onClick={hidePopup}
                        variant='outline'
                        className='border-slate-600 text-slate-300 hover:bg-slate-700'
                      >
                        关闭
                      </Button>
                      <Button
                        onClick={showRandomPopup}
                        className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0'
                      >
                        再试一个
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
