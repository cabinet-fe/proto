import React, { useState, useEffect } from 'react'
import { Button, Input } from '../components'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Zap,
  Rocket
} from 'lucide-react'

const ModernLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [currentSloganIndex, setCurrentSloganIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const slogans = [
    {
      text: '颠覆想象，重新定义未来',
      icon: <Sparkles className='w-8 h-8' />,
      gradient: 'from-pink-500 via-purple-500 to-cyan-500'
    },
    {
      text: '创新无界，探索无限可能',
      icon: <Zap className='w-8 h-8' />,
      gradient: 'from-orange-500 via-red-500 to-purple-500'
    },
    {
      text: '突破边界，引领科技革命',
      icon: <Rocket className='w-8 h-8' />,
      gradient: 'from-green-500 via-blue-500 to-purple-500'
    }
  ]

  // Slogan轮播效果
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSloganIndex(prev => (prev + 1) % slogans.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // 模拟登录过程
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const currentSlogan = slogans[currentSloganIndex]

  return (
    <div className='min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      {/* 动态背景元素 */}
      <div className='absolute inset-0'>
        {/* 渐变球体 */}
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse delay-2000'></div>

        {/* 浮动几何图形 */}
        <div className='absolute top-20 left-20 w-4 h-4 bg-white/20 rotate-45 animate-bounce'></div>
        <div className='absolute top-40 right-32 w-6 h-6 bg-purple-400/40 rounded-full animate-ping'></div>
        <div className='absolute bottom-32 left-40 w-3 h-3 bg-cyan-400/60 rotate-45 animate-spin'></div>
        <div className='absolute bottom-20 right-20 w-5 h-5 bg-pink-400/50 rounded-full animate-pulse'></div>
      </div>

      <div className='relative z-10 flex min-h-screen'>
        {/* 左侧 - Slogan展示区 */}
        <div className='flex-1 flex items-center justify-center p-12'>
          <div className='text-center space-y-12 max-w-4xl w-full'>
            {/* 动态Slogan */}
            <div className='relative h-56 flex items-center justify-center'>
              {slogans.map((slogan, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 transform ${
                    index === currentSloganIndex
                      ? 'opacity-100 scale-100 translate-y-0'
                      : 'opacity-0 scale-95 translate-y-4'
                  }`}
                >
                  <div
                    className={`mb-8 text-transparent bg-clip-text bg-gradient-to-r ${slogan.gradient} animate-pulse`}
                  >
                    {slogan.icon}
                  </div>
                  <h1
                    className={`text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${slogan.gradient} leading-tight`}
                  >
                    {slogan.text}
                  </h1>
                </div>
              ))}
            </div>

            {/* Slogan指示器 */}
            <div className='flex justify-center space-x-4'>
              {slogans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSloganIndex(index)}
                  className={`transition-all duration-300 ${
                    index === currentSloganIndex
                      ? 'w-8 h-2 bg-white rounded-full'
                      : 'w-2 h-2 bg-white/30 hover:bg-white/50 rounded-full'
                  }`}
                />
              ))}
            </div>

            {/* 装饰性文字 */}
            <div className='text-white/60 text-xl font-light'>
              体验前所未有的创新之旅
            </div>
          </div>
        </div>

        {/* 右侧 - 登录表单 */}
        <div className='flex-1 flex items-center justify-center p-12'>
          <div className='w-full max-w-md'>
            {/* 登录卡片 */}
            <div className='backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl'>
              <div className='text-center mb-6'>
                <div className='w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center'>
                  <Lock className='w-6 h-6 text-white' />
                </div>
                <h2 className='text-2xl font-bold text-white mb-1'>欢迎回来</h2>
                <p className='text-white/60 text-sm'>登录开启您的创新之旅</p>
              </div>

              <form onSubmit={handleLogin} className='space-y-5'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-white/80'>
                    邮箱地址
                  </label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5' />
                    <input
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder='输入您的邮箱'
                      className='flex h-11 w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 pl-10 text-white placeholder:text-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-white/80'>
                    密码
                  </label>
                  <div className='relative'>
                    <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5' />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder='输入您的密码'
                      className='flex h-11 w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 pl-10 pr-12 text-white placeholder:text-white/50 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors'
                    >
                      {showPassword ? (
                        <EyeOff className='w-5 h-5' />
                      ) : (
                        <Eye className='w-5 h-5' />
                      )}
                    </button>
                  </div>
                </div>

                <div className='flex items-center justify-between text-sm'>
                  <label className='flex items-center text-white/70'>
                    <input type='checkbox' className='mr-2 rounded' />
                    记住我
                  </label>
                  <a
                    href='#'
                    className='text-purple-400 hover:text-purple-300 transition-colors'
                  >
                    忘记密码？
                  </a>
                </div>

                <Button
                  type='submit'
                  loading={isLoading}
                  className='w-full h-12 text-base font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200'
                >
                  {isLoading ? '登录中...' : '立即登录'}
                  {!isLoading && <ArrowRight className='w-5 h-5 ml-2' />}
                </Button>
              </form>

              <div className='mt-6 text-center'>
                <p className='text-white/60 text-sm'>
                  还没有账户？{' '}
                  <a
                    href='#'
                    className='text-purple-400 hover:text-purple-300 font-semibold transition-colors'
                  >
                    立即注册
                  </a>
                </p>
              </div>

              {/* 社交登录 */}
              <div className='mt-6'>
                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-white/20'></div>
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='px-4 bg-transparent text-white/60'>
                      或使用
                    </span>
                  </div>
                </div>

                <div className='mt-4 grid grid-cols-2 gap-3'>
                  <button className='flex items-center justify-center px-3 py-2.5 border border-white/20 rounded-xl text-white/80 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm text-sm'>
                    <svg className='w-5 h-5 mr-2' viewBox='0 0 24 24'>
                      <path
                        fill='currentColor'
                        d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                      />
                      <path
                        fill='currentColor'
                        d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                      />
                      <path
                        fill='currentColor'
                        d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                      />
                      <path
                        fill='currentColor'
                        d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                      />
                    </svg>
                    Google
                  </button>
                  <button className='flex items-center justify-center px-3 py-2.5 border border-white/20 rounded-xl text-white/80 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm text-sm'>
                    <svg
                      className='w-5 h-5 mr-2'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
                    </svg>
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModernLogin
