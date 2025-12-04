import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { User, Lock, Eye, EyeOff, ArrowRight, Fingerprint, Shield, Zap } from 'lucide-react'
import { cn } from '../utils/cn'

// 3D 卡片组件 - 跟随鼠标倾斜
function Card3D({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 50 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 50 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 浮动装饰元素
function FloatingElement({
  children,
  delay = 0,
  duration = 4,
  className
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 10, -10] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// 粒子背景
function ParticleField() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }))

  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className='absolute rounded-full bg-white/20'
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )
}

// 光环效果
function GlowRing({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(
        'absolute rounded-full border border-white/20',
        className
      )}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    />
  )
}

export default function Login3DPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    console.log('登录信息:', formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // 特性卡片数据
  const features = [
    { icon: Shield, label: '安全加密', color: 'from-emerald-400 to-cyan-400' },
    { icon: Zap, label: '极速响应', color: 'from-amber-400 to-orange-400' },
    { icon: Fingerprint, label: '生物识别', color: 'from-purple-400 to-pink-400' }
  ]

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950'>
      {/* 粒子背景 */}
      <ParticleField />

      {/* 动态网格背景 */}
      <div
        className='absolute inset-0 opacity-20'
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* 渐变光球 */}
      <motion.div
        className='absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl'
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className='absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl'
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl'
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 主内容 */}
      <div className='relative z-10 flex min-h-screen items-center justify-center p-4' style={{ perspective: '1000px' }}>
        <motion.div
          initial={{ opacity: 0, z: -100 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='w-full max-w-md'
        >
          <Card3D>
            {/* 主卡片 */}
            <div
              className='relative rounded-3xl overflow-hidden'
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 卡片多层背景 - 立体深度效果 */}
              <div className='absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl' />
              <div
                className='absolute inset-0 border border-white/20 rounded-3xl'
                style={{ transform: 'translateZ(0px)' }}
              />

              {/* 顶部渐变光条 */}
              <motion.div
                className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent'
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* 卡片内容 */}
              <div className='relative p-8' style={{ transform: 'translateZ(50px)' }}>
                {/* Logo 区域 */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className='mb-8 text-center'
                >
                  {/* 3D Logo */}
                  <div className='relative mx-auto mb-6 w-20 h-20'>
                    <GlowRing className='w-20 h-20 -inset-0' />
                    <GlowRing className='w-24 h-24 -inset-2' />
                    <motion.div
                      className='relative w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl shadow-indigo-500/50 flex items-center justify-center'
                      whileHover={{ scale: 1.05, rotateY: 15 }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <motion.div
                        animate={{ rotateY: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      >
                        <Fingerprint className='w-10 h-10 text-white' />
                      </motion.div>
                    </motion.div>
                  </div>

                  <motion.h1
                    className='text-3xl font-bold bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    欢迎回来
                  </motion.h1>
                  <motion.p
                    className='mt-2 text-white/50'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    登录以探索无限可能
                  </motion.p>
                </motion.div>

                {/* 特性标签 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className='flex justify-center gap-3 mb-8'
                >
                  {features.map((feature, index) => (
                    <FloatingElement key={feature.label} delay={index * 0.2} duration={3 + index}>
                      <motion.div
                        whileHover={{ scale: 1.1, y: -5 }}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-full',
                          'bg-white/5 border border-white/10 backdrop-blur-sm',
                          'text-xs text-white/70'
                        )}
                      >
                        <feature.icon className={cn('w-3.5 h-3.5 bg-gradient-to-r bg-clip-text', feature.color)} style={{ color: 'transparent', backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                        <span>{feature.label}</span>
                      </motion.div>
                    </FloatingElement>
                  ))}
                </motion.div>

                {/* 登录表单 */}
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onSubmit={handleSubmit}
                  className='space-y-5'
                >
                  {/* 用户名输入 */}
                  <div className='relative group'>
                    <motion.div
                      className={cn(
                        'absolute -inset-0.5 rounded-xl opacity-0 blur transition-all duration-300',
                        'bg-gradient-to-r from-indigo-500 to-purple-500',
                        focusedField === 'username' && 'opacity-50'
                      )}
                    />
                    <div className='relative flex items-center'>
                      <div className='absolute left-4 text-white/40 group-hover:text-white/60 transition-colors'>
                        <User className='w-5 h-5' />
                      </div>
                      <input
                        name='username'
                        type='text'
                        value={formData.username}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('username')}
                        onBlur={() => setFocusedField(null)}
                        placeholder='用户名 / 邮箱'
                        autoComplete='username'
                        required
                        className={cn(
                          'w-full h-14 pl-12 pr-4 rounded-xl',
                          'bg-white/5 border border-white/10',
                          'text-white placeholder:text-white/30',
                          'focus:outline-none focus:border-white/30 focus:bg-white/10',
                          'transition-all duration-300'
                        )}
                      />
                    </div>
                  </div>

                  {/* 密码输入 */}
                  <div className='relative group'>
                    <motion.div
                      className={cn(
                        'absolute -inset-0.5 rounded-xl opacity-0 blur transition-all duration-300',
                        'bg-gradient-to-r from-purple-500 to-pink-500',
                        focusedField === 'password' && 'opacity-50'
                      )}
                    />
                    <div className='relative flex items-center'>
                      <div className='absolute left-4 text-white/40 group-hover:text-white/60 transition-colors'>
                        <Lock className='w-5 h-5' />
                      </div>
                      <input
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                        placeholder='请输入密码'
                        autoComplete='current-password'
                        required
                        className={cn(
                          'w-full h-14 pl-12 pr-12 rounded-xl',
                          'bg-white/5 border border-white/10',
                          'text-white placeholder:text-white/30',
                          'focus:outline-none focus:border-white/30 focus:bg-white/10',
                          'transition-all duration-300'
                        )}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-4 text-white/40 hover:text-white/80 transition-colors'
                        aria-label={showPassword ? '隐藏密码' : '显示密码'}
                      >
                        {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                      </button>
                    </div>
                  </div>

                  {/* 辅助链接 */}
                  <div className='flex justify-between items-center text-sm'>
                    <label className='flex items-center gap-2 cursor-pointer text-white/50 hover:text-white/70 transition-colors'>
                      <input
                        type='checkbox'
                        className='w-4 h-4 rounded bg-white/10 border-white/20 text-indigo-500 focus:ring-indigo-500/50'
                      />
                      记住我
                    </label>
                    <button type='button' className='text-indigo-400 hover:text-indigo-300 transition-colors'>
                      忘记密码?
                    </button>
                  </div>

                  {/* 登录按钮 */}
                  <motion.button
                    type='submit'
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      'relative w-full h-14 rounded-xl font-semibold text-white overflow-hidden',
                      'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600',
                      'shadow-lg shadow-indigo-500/30',
                      'disabled:opacity-70 disabled:cursor-not-allowed',
                      'transition-all duration-300'
                    )}
                  >
                    {/* 按钮光效 */}
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
                      initial={{ x: '-100%' }}
                      animate={!isLoading ? { x: '100%' } : {}}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                    />

                    <span className='relative flex items-center justify-center gap-2'>
                      {isLoading ? (
                        <>
                          <motion.div
                            className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full'
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          验证中...
                        </>
                      ) : (
                        <>
                          立即登录
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <ArrowRight className='w-5 h-5' />
                          </motion.div>
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>

                {/* 分隔线 */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className='flex items-center gap-4 my-6'
                >
                  <div className='flex-1 h-px bg-gradient-to-r from-transparent to-white/20' />
                  <span className='text-white/30 text-sm'>其他登录方式</span>
                  <div className='flex-1 h-px bg-gradient-to-l from-transparent to-white/20' />
                </motion.div>

                {/* 社交登录按钮 */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className='flex justify-center gap-4'
                >
                  {['GitHub', 'Google', '微信'].map((provider, index) => (
                    <motion.button
                      key={provider}
                      type='button'
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={cn(
                        'w-14 h-14 rounded-2xl',
                        'bg-white/5 border border-white/10',
                        'flex items-center justify-center',
                        'text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20',
                        'transition-all duration-300',
                        'shadow-lg shadow-black/20'
                      )}
                      title={`使用 ${provider} 登录`}
                    >
                      <span className='text-lg font-bold'>{provider[0]}</span>
                    </motion.button>
                  ))}
                </motion.div>

                {/* 注册入口 */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className='mt-8 text-center text-white/40'
                >
                  还没有账号?{' '}
                  <button
                    type='button'
                    className='text-indigo-400 hover:text-indigo-300 font-medium transition-colors'
                  >
                    立即注册
                  </button>
                </motion.p>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </div>

      {/* 底部装饰 */}
      <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 text-sm'>
        <motion.div
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          © 2024 Proto Platform. All rights reserved.
        </motion.div>
      </div>
    </div>
  )
}
