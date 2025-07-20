import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Zap,
  Sparkles,
  Rocket,
  Palette,
  Layers,
  RotateCcw,
  Bluetooth,
  Eye,
  Settings,
  Menu,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Star,
  Heart,
  Code,
  Image,
  Music,
  Video
} from 'lucide-react'
import { Drawer } from '../components'
import { Button } from '../components'

type DrawerVariant =
  | 'slide'
  | 'scale'
  | 'rotate'
  | 'blur'
  | 'glass'
  | 'neon'
  | 'cosmic'
type Position = 'left' | 'right' | 'top' | 'bottom'

const DrawerShowcase: React.FC = () => {
  const [activeDrawer, setActiveDrawer] = useState<{
    variant: DrawerVariant
    position: Position
  } | null>(null)

  const closeDrawer = () => setActiveDrawer(null)

  const openDrawer = (variant: DrawerVariant, position: Position = 'right') => {
    setActiveDrawer({ variant, position })
  }

  const variants = [
    {
      name: 'slide',
      icon: Menu,
      title: '滑动抽屉',
      description: '经典的滑动效果',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'scale',
      icon: Zap,
      title: '缩放抽屉',
      description: '炫酷的缩放动画',
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'rotate',
      icon: RotateCcw,
      title: '旋转抽屉',
      description: '3D旋转效果',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'blur',
      icon: Bluetooth,
      title: '模糊抽屉',
      description: '毛玻璃模糊效果',
      color: 'from-orange-500 to-orange-600'
    },
    {
      name: 'glass',
      icon: Eye,
      title: '玻璃抽屉',
      description: '透明玻璃质感',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      name: 'neon',
      icon: Sparkles,
      title: '霓虹抽屉',
      description: '赛博朋克风格',
      color: 'from-green-400 to-green-500'
    },
    {
      name: 'cosmic',
      icon: Rocket,
      title: '宇宙抽屉',
      description: '星空主题效果',
      color: 'from-indigo-500 to-purple-600'
    }
  ] as const

  const positions = [
    { name: 'left', icon: ArrowLeft, title: '左侧' },
    { name: 'right', icon: ArrowRight, title: '右侧' },
    { name: 'top', icon: ArrowUp, title: '顶部' },
    { name: 'bottom', icon: ArrowDown, title: '底部' }
  ] as const

  const getDrawerContent = (variant: DrawerVariant) => {
    switch (variant) {
      case 'slide':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
              滑动抽屉
            </h2>
            <p className='text-gray-600 dark:text-gray-300'>
              这是经典的滑动效果抽屉，简洁而优雅。
            </p>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <Settings className='text-blue-500' size={20} />
                <span>设置选项</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Star className='text-yellow-500' size={20} />
                <span>收藏内容</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Heart className='text-red-500' size={20} />
                <span>喜欢的项目</span>
              </div>
            </div>
          </div>
        )

      case 'scale':
        return (
          <div className='space-y-6'>
            <motion.h2
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className='text-2xl font-bold text-purple-600'
            >
              ⚡ 缩放抽屉
            </motion.h2>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='space-y-4'
            >
              <p className='text-gray-600 dark:text-gray-300'>
                带有动态缩放效果的现代抽屉设计。
              </p>
              {[1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className='p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg'
                >
                  <p>动画项目 {i}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )

      case 'rotate':
        return (
          <div className='space-y-6'>
            <motion.h2
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className='text-2xl font-bold text-green-600'
            >
              🌪️ 旋转抽屉
            </motion.h2>
            <p className='text-gray-600 dark:text-gray-300'>
              3D旋转效果让抽屉更加生动有趣。
            </p>
            <div className='grid grid-cols-2 gap-4'>
              {[1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  whileHover={{ rotateY: 180, scale: 1.05 }}
                  className='aspect-square bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center cursor-pointer'
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className='text-green-600 font-bold'>{i}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'blur':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-orange-600'>🌫️ 模糊抽屉</h2>
            <p className='text-gray-600 dark:text-gray-300'>
              毛玻璃效果营造出现代感十足的视觉体验。
            </p>
            <div className='space-y-4'>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className='p-4 bg-white/30 backdrop-blur-sm rounded-lg border border-white/20'
              >
                <h3 className='font-semibold mb-2'>模糊卡片 1</h3>
                <p className='text-sm opacity-80'>
                  这是一个带有模糊效果的卡片。
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className='p-4 bg-white/20 backdrop-blur-sm rounded-lg border border-white/20'
              >
                <h3 className='font-semibold mb-2'>模糊卡片 2</h3>
                <p className='text-sm opacity-80'>背景模糊创造层次感。</p>
              </motion.div>
            </div>
          </div>
        )

      case 'glass':
        return (
          <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-white'>✨ 玻璃抽屉</h2>
            <p className='text-white/80'>透明玻璃质感，轻盈而现代。</p>
            <div className='space-y-4'>
              {['Code', 'Image', 'Music', 'Video'].map((item, i) => {
                const icons = [Code, Image, Music, Video]
                const Icon = icons[i]
                return (
                  <motion.div
                    key={item}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }}
                    className='flex items-center space-x-3 p-3 rounded-lg border border-white/10 backdrop-blur-sm'
                  >
                    <Icon className='text-white/80' size={20} />
                    <span className='text-white/90'>{item}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )

      case 'neon':
        return (
          <div className='space-y-6'>
            <motion.h2
              animate={{
                textShadow: [
                  '0 0 10px #00ff88',
                  '0 0 20px #00ff88',
                  '0 0 10px #00ff88'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className='text-2xl font-bold text-green-400'
            >
              🚀 霓虹抽屉
            </motion.h2>
            <p className='text-green-300'>赛博朋克风格的未来感设计。</p>
            <div className='space-y-3'>
              {[
                'System Status',
                'Network Monitor',
                'Data Stream',
                'Security Log'
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
                  }}
                  className='p-3 border border-green-400/50 rounded text-green-300 hover:bg-green-400/10 transition-all cursor-pointer'
                >
                  <span className='font-mono text-sm'>» {item}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className='text-green-400 text-xs font-mono text-center mt-8'
            >
              &gt; SYSTEM_ONLINE_
            </motion.div>
          </div>
        )

      case 'cosmic':
        return (
          <div className='space-y-6 text-white'>
            <motion.h2
              animate={{
                y: [0, -5, 0],
                textShadow: [
                  '0 0 20px rgba(147, 51, 234, 0.8)',
                  '0 0 30px rgba(59, 130, 246, 0.8)',
                  '0 0 20px rgba(147, 51, 234, 0.8)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className='text-2xl font-bold'
            >
              🌌 宇宙抽屉
            </motion.h2>
            <p className='text-white/80'>探索无限的星空主题界面。</p>

            <div className='space-y-4'>
              {['🪐 行星探索', '⭐ 星座图谱', '🚀 太空任务', '🌟 银河系'].map(
                (item, i) => (
                  <motion.div
                    key={item}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.2, type: 'spring', damping: 15 }}
                    whileHover={{
                      scale: 1.05,
                      rotate: 5,
                      boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)'
                    }}
                    className='p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-purple-400/30 cursor-pointer'
                  >
                    <span className='text-lg'>{item}</span>
                  </motion.div>
                )
              )}
            </div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className='flex justify-center mt-8'
            >
              <div className='w-16 h-16 border-2 border-dashed border-purple-400/50 rounded-full flex items-center justify-center'>
                <span className='text-2xl'>🌍</span>
              </div>
            </motion.div>
          </div>
        )

      default:
        return <div>抽屉内容</div>
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-cyan-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-cyan-900/20'>
      {/* Header */}
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10' />
        <div className='relative px-6 py-12 text-center'>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent mb-4'>
              🎨 酷炫抽屉展示
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
              体验七种不同风格的抽屉动画效果，每一种都能让你眼前一亮
            </p>
          </motion.div>
        </div>
      </div>

      {/* Variants Grid */}
      <div className='px-6 py-12'>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mb-12'
        >
          <h2 className='text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white'>
            ✨ 抽屉样式
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto'>
            {variants.map((variant, index) => {
              const Icon = variant.icon
              return (
                <motion.div
                  key={variant.name}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: 'spring',
                    damping: 15
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  className='group cursor-pointer'
                  onClick={() => openDrawer(variant.name as DrawerVariant)}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${variant.color} p-6 text-white h-full`}
                  >
                    <div className='absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300' />
                    <div className='relative z-10'>
                      <Icon
                        size={32}
                        className='mb-4 group-hover:scale-110 transition-transform duration-300'
                      />
                      <h3 className='text-xl font-bold mb-2'>
                        {variant.title}
                      </h3>
                      <p className='text-white/80 text-sm'>
                        {variant.description}
                      </p>
                    </div>
                    <motion.div
                      className='absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full'
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Positions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className='text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white'>
            📍 抽屉位置
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto'>
            {positions.map((position, index) => {
              const Icon = position.icon
              return (
                <motion.div
                  key={position.name}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className='group cursor-pointer'
                  onClick={() => openDrawer('slide', position.name as Position)}
                >
                  <div className='bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700'>
                    <Icon
                      size={24}
                      className='mx-auto mb-3 text-gray-600 dark:text-gray-300 group-hover:text-purple-500 transition-colors'
                    />
                    <p className='font-medium text-gray-900 dark:text-white'>
                      {position.title}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='text-center mt-16'
        >
          <h2 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>
            🚀 快速体验
          </h2>
          <div className='flex flex-wrap justify-center gap-4'>
            <Button
              onClick={() => openDrawer('cosmic', 'right')}
              className='bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
            >
              🌌 宇宙抽屉
            </Button>
            <Button
              onClick={() => openDrawer('neon', 'left')}
              className='bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700'
            >
              🚀 霓虹抽屉
            </Button>
            <Button
              onClick={() => openDrawer('glass', 'top')}
              className='bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700'
            >
              ✨ 玻璃抽屉
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Drawer Component */}
      <Drawer
        isOpen={!!activeDrawer}
        onClose={closeDrawer}
        variant={activeDrawer?.variant || 'slide'}
        position={activeDrawer?.position || 'right'}
        size='lg'
      >
        {activeDrawer && getDrawerContent(activeDrawer.variant)}
      </Drawer>
    </div>
  )
}

export default DrawerShowcase
