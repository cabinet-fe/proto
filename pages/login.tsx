import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Github,
  Chrome,
  MessageCircle,
  Sparkles
} from 'lucide-react'
import { Input, Button, AnimatedBackground } from '../components'
import { cn } from '../utils/cn'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    console.log('登录信息:', { ...formData, rememberMe })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // 第三方登录按钮配置
  const socialLogins = [
    { icon: Github, label: 'GitHub', bg: 'hover:bg-gray-700' },
    { icon: Chrome, label: 'Google', bg: 'hover:bg-red-500/20' },
    { icon: MessageCircle, label: '微信', bg: 'hover:bg-green-500/20' }
  ]

  return (
    <div className='relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* 动态背景 */}
      <AnimatedBackground variant='cosmic' />

      {/* 额外的渐变光效 */}
      <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
      <motion.div
        className='absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl'
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className='absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl'
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* 主内容 */}
      <div className='relative z-10 flex min-h-screen items-center justify-center p-4'>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='w-full max-w-md'
        >
          {/* 玻璃拟态卡片 */}
          <div className='relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl'>
            {/* 卡片顶部光效 */}
            <div className='absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/50 to-transparent' />

            {/* Logo 区域 */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='mb-8 text-center'
            >
              <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg shadow-purple-500/25'>
                <Sparkles className='h-8 w-8 text-white' />
              </div>
              <h1 className='text-2xl font-bold text-white'>欢迎回来</h1>
              <p className='mt-2 text-sm text-white/60'>
                登录以继续使用原型平台
              </p>
            </motion.div>

            {/* 登录表单 */}
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className='space-y-5'
            >
              {/* 用户名 */}
              <Input
                name='username'
                value={formData.username}
                onChange={handleInputChange}
                variant='glass'
                size='lg'
                placeholder='请输入用户名'
                icon={<User className='h-5 w-5' />}
                iconPosition='left'
                autoComplete='username'
                required
              />

              {/* 密码 */}
              <div className='relative'>
                <Input
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  variant='glass'
                  size='lg'
                  placeholder='请输入密码'
                  icon={<Lock className='h-5 w-5' />}
                  iconPosition='left'
                  autoComplete='current-password'
                  required
                  className='pr-12'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? '隐藏密码' : '显示密码'}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 focus-visible:outline-none focus-visible:text-white transition-colors'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>

              {/* 记住我 & 忘记密码 */}
              <div className='flex items-center justify-between'>
                <label className='flex cursor-pointer items-center gap-2 text-sm text-white/70 hover:text-white/90 transition-colors'>
                  <input
                    type='checkbox'
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className={cn(
                      'h-4 w-4 rounded border-white/20 bg-white/10 text-purple-500',
                      'focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-0',
                      'checked:bg-purple-500 checked:border-purple-500'
                    )}
                  />
                  记住我
                </label>
                <button
                  type='button'
                  className='text-sm text-purple-400 hover:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded transition-colors'
                >
                  忘记密码?
                </button>
              </div>

              {/* 登录按钮 */}
              <Button
                type='submit'
                loading={isLoading}
                className='w-full h-12 text-base font-semibold shadow-lg shadow-purple-500/25'
              >
                {isLoading ? '登录中...' : '登录'}
              </Button>
            </motion.form>

            {/* 分隔线 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className='my-6 flex items-center gap-4'
            >
              <div className='h-px flex-1 bg-gradient-to-r from-transparent to-white/20' />
              <span className='text-sm text-white/40'>或</span>
              <div className='h-px flex-1 bg-gradient-to-l from-transparent to-white/20' />
            </motion.div>

            {/* 第三方登录 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className='flex justify-center gap-4'
            >
              {socialLogins.map(({ icon: Icon, label, bg }) => (
                <button
                  key={label}
                  type='button'
                  title={`使用 ${label} 登录`}
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-xl',
                    'border border-white/10 bg-white/5 backdrop-blur-sm',
                    'text-white/70 transition-all duration-200',
                    'hover:scale-105 hover:border-white/20 hover:text-white',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50',
                    bg
                  )}
                >
                  <Icon className='h-5 w-5' />
                </button>
              ))}
            </motion.div>

            {/* 注册入口 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className='mt-8 text-center text-sm text-white/50'
            >
              还没有账号?{' '}
              <button
                type='button'
                className='font-medium text-purple-400 hover:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded transition-colors'
              >
                立即注册
              </button>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
