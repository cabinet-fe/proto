import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '../components/Card'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  ArrowRight,
  Star,
  Zap,
  Globe,
  Users,
  Award,
  TrendingUp
} from 'lucide-react'

const EnhancedLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // 页面加载动画
  useEffect(() => {
    setPageLoaded(true)
  }, [])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.email) {
      newErrors.email = '请输入邮箱地址'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }

    if (!formData.password) {
      newErrors.password = '请输入密码'
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少需要6位字符'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // 模拟登录过程
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('登录成功:', formData)
      // 这里可以添加成功后的跳转逻辑
    } catch (error) {
      setErrors({ general: '登录失败，请检查您的凭据' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // 清除相应字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const features = [
    { icon: <Shield className='w-5 h-5' />, text: '安全加密', delay: '0.1s' },
    { icon: <Zap className='w-5 h-5' />, text: '极速响应', delay: '0.2s' },
    { icon: <Globe className='w-5 h-5' />, text: '全球服务', delay: '0.3s' },
    { icon: <Users className='w-5 h-5' />, text: '团队协作', delay: '0.4s' }
  ]

  const stats = [
    { number: '10M+', label: '活跃用户', delay: '0.5s' },
    { number: '99.9%', label: '服务可用性', delay: '0.6s' },
    { number: '150+', label: '国家覆盖', delay: '0.7s' }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex items-center justify-center relative overflow-hidden'>
      {/* 动态背景 */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* 动态光球 */}
        <div className='absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse'></div>
        <div
          className='absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-l from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className='absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-tr from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '2s' }}
        ></div>

        {/* 星星效果 */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className='absolute w-1 h-1 bg-white rounded-full animate-pulse'
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* 主内容容器 */}
      <div
        className={`w-full max-w-7xl mx-auto px-4 transition-all duration-1000 ${
          pageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className='grid lg:grid-cols-2 gap-12 items-center min-h-screen py-12'>
          {/* 左侧 Slogan区域 */}
          <div
            className={`text-white space-y-8 transition-all duration-1000 delay-300 ${
              pageLoaded
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* 主标题 */}
            <div className='space-y-6'>
              <div className='flex items-center gap-3 mb-4'>
                <div
                  className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg animate-bounce'
                  style={{ animationDelay: '0.5s' }}
                >
                  <Sparkles className='w-6 h-6 text-white' />
                </div>
                <h1 className='text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent'>
                  创新未来
                </h1>
              </div>

              <p className='text-xl lg:text-2xl text-blue-100 font-light leading-relaxed'>
                连接世界，赋能梦想
              </p>

              <p className='text-lg text-gray-300 leading-relaxed max-w-lg'>
                我们致力于为全球用户提供最先进的数字化解决方案，让科技成为您成功路上的最强助力。
              </p>
            </div>

            {/* 特性展示 */}
            <div className='grid grid-cols-2 gap-4'>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 ${
                    pageLoaded
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: feature.delay }}
                >
                  <div className='text-blue-300'>{feature.icon}</div>
                  <span className='text-sm font-medium'>{feature.text}</span>
                </div>
              ))}
            </div>

            {/* 统计数据 */}
            <div className='flex gap-8 pt-6'>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transition-all duration-500 ${
                    pageLoaded
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: stat.delay }}
                >
                  <div className='text-2xl lg:text-3xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                    {stat.number}
                  </div>
                  <div className='text-sm text-gray-300'>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 奖项展示 */}
            <div
              className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 transition-all duration-500 ${
                pageLoaded
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '0.8s' }}
            >
              <Award className='w-8 h-8 text-yellow-400' />
              <div>
                <p className='text-sm font-semibold text-yellow-100'>
                  2024年度最佳创新产品
                </p>
                <p className='text-xs text-yellow-200'>全球科技创新大会</p>
              </div>
            </div>
          </div>

          {/* 右侧登录表单 */}
          <div
            className={`max-w-lg transition-all duration-1000 delay-500 ${
              pageLoaded
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <Card className='backdrop-blur-xl bg-white/95 border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]'>
              <CardHeader className='text-center pb-2'>
                {/* Logo区域 */}
                <div className='mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform hover:scale-110 hover:rotate-6 transition-all duration-300'>
                  <Shield className='w-8 h-8 text-white' />
                </div>

                <h2 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'>
                  登录账户
                </h2>
                <p className='text-gray-600 mt-2'>开启您的数字化之旅</p>
              </CardHeader>

              <CardContent className='space-y-6'>
                {/* 通用错误信息 */}
                {errors.general && (
                  <div className='bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 animate-bounce'>
                    <div className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></div>
                    <span className='text-red-700 text-sm'>
                      {errors.general}
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                  {/* 邮箱输入 */}
                  <div className='transform hover:scale-[1.02] transition-transform duration-200'>
                    <Input
                      label='邮箱地址'
                      type='email'
                      name='email'
                      placeholder='请输入您的邮箱'
                      value={formData.email}
                      onChange={handleInputChange}
                      error={errors.email}
                      icon={<Mail className='w-5 h-5' />}
                      iconPosition='left'
                      className='transition-all duration-300 hover:shadow-md focus:shadow-xl focus:scale-[1.01]'
                    />
                  </div>

                  {/* 密码输入 */}
                  <div className='space-y-2 transform hover:scale-[1.02] transition-transform duration-200'>
                    <label className='block text-sm font-medium text-gray-700'>
                      密码
                    </label>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='请输入您的密码'
                        value={formData.password}
                        onChange={handleInputChange}
                        error={errors.password}
                        icon={<Lock className='w-5 h-5' />}
                        iconPosition='left'
                        className='pr-12 transition-all duration-300 hover:shadow-md focus:shadow-xl focus:scale-[1.01]'
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 p-1 rounded-md hover:bg-gray-100 hover:scale-110'
                      >
                        {showPassword ? (
                          <EyeOff className='w-5 h-5' />
                        ) : (
                          <Eye className='w-5 h-5' />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className='text-sm text-red-600 animate-pulse'>
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* 选项区域 */}
                  <div className='flex items-center justify-between'>
                    <label className='flex items-center space-x-2 cursor-pointer group'>
                      <input
                        type='checkbox'
                        name='rememberMe'
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200 hover:scale-110'
                      />
                      <span className='text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200'>
                        记住我
                      </span>
                    </label>

                    <a
                      href='#'
                      className='text-sm text-blue-600 hover:text-blue-800 font-medium transition-all duration-200 hover:underline hover:scale-105'
                    >
                      忘记密码？
                    </a>
                  </div>

                  {/* 登录按钮 */}
                  <Button
                    type='submit'
                    variant='primary'
                    size='lg'
                    loading={isLoading}
                    className='w-full mt-6 h-12 text-base font-semibold shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 group'
                  >
                    {isLoading ? (
                      <div className='flex items-center gap-2'>
                        <div className='animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent'></div>
                        登录中...
                      </div>
                    ) : (
                      <>
                        <Sparkles className='w-5 h-5 group-hover:animate-spin' />
                        立即登录
                        <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>

              <CardFooter className='flex-col space-y-4'>
                {/* 分割线 */}
                <div className='relative w-full'>
                  <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t border-gray-200' />
                  </div>
                  <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-white px-2 text-gray-500'>或者</span>
                  </div>
                </div>

                {/* 社交登录 */}
                <div className='flex gap-4 w-full'>
                  <button className='flex-1 flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 group'>
                    <div className='w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded'></div>
                    <span className='text-sm text-gray-600 group-hover:text-gray-800'>
                      微信
                    </span>
                  </button>
                  <button className='flex-1 flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:scale-105 group'>
                    <div className='w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded'></div>
                    <span className='text-sm text-gray-600 group-hover:text-gray-800'>
                      微博
                    </span>
                  </button>
                </div>

                {/* 注册链接 */}
                <p className='text-center text-sm text-gray-600'>
                  还没有账户？{' '}
                  <a
                    href='#'
                    className='font-semibold text-blue-600 hover:text-blue-800 transition-all duration-200 hover:underline hover:scale-105 inline-block'
                  >
                    立即注册
                  </a>
                </p>
              </CardFooter>
            </Card>

            {/* 底部安全提示 */}
            <div className='mt-6 text-center'>
              <p className='text-xs text-gray-300 flex items-center justify-center gap-1 hover:text-white transition-colors duration-200'>
                <Shield className='w-3 h-3' />
                您的信息受到安全加密保护
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedLoginPage
