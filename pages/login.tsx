import React, { useState } from 'react'
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
  ArrowRight
} from 'lucide-react'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

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

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* 背景装饰 */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse'></div>
        <div
          className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* 主内容区域 */}
      <div className='w-full max-w-md relative z-10'>
        <Card className='backdrop-blur-xl bg-white/80 border-white/20 shadow-2xl'>
          <CardHeader className='text-center pb-2'>
            {/* Logo区域 */}
            <div className='mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg transform hover:scale-105 transition-transform duration-300'>
              <Shield className='w-8 h-8 text-white' />
            </div>

            <h1 className='text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'>
              欢迎回来
            </h1>
            <p className='text-gray-600 mt-2'>登录您的账户以继续使用</p>
          </CardHeader>

          <CardContent className='space-y-6'>
            {/* 通用错误信息 */}
            {errors.general && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2'>
                <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                <span className='text-red-700 text-sm'>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* 邮箱输入 */}
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
                className='transition-all duration-300 hover:shadow-md focus:shadow-lg'
              />

              {/* 密码输入 */}
              <div className='space-y-2'>
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
                    className='pr-12 transition-all duration-300 hover:shadow-md focus:shadow-lg'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-md hover:bg-gray-100'
                  >
                    {showPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-sm text-red-600'>{errors.password}</p>
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
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200'
                  />
                  <span className='text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-200'>
                    记住我
                  </span>
                </label>

                <a
                  href='#'
                  className='text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline'
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
                className='w-full mt-6 h-12 text-base font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300'
              >
                {isLoading ? (
                  '登录中...'
                ) : (
                  <>
                    <Sparkles className='w-5 h-5' />
                    立即登录
                    <ArrowRight className='w-5 h-5' />
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

            {/* 注册链接 */}
            <p className='text-center text-sm text-gray-600'>
              还没有账户？{' '}
              <a
                href='#'
                className='font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline'
              >
                立即注册
              </a>
            </p>
          </CardFooter>
        </Card>

        {/* 底部安全提示 */}
        <div className='mt-6 text-center'>
          <p className='text-xs text-gray-500 flex items-center justify-center gap-1'>
            <Shield className='w-3 h-3' />
            您的信息受到安全加密保护
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
