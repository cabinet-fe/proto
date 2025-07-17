import React from 'react'
import { Input } from '../components/Input'
import {
  Search,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Phone,
  CreditCard
} from 'lucide-react'

export default function InputShowcase() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPassword2, setShowPassword2] = React.useState(false)

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            输入框组件展示
          </h1>
          <p className='text-lg text-gray-600'>多种精美的输入框样式和变体</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Default Variant */}
          <div className='bg-white rounded-2xl p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              默认样式
            </h2>
            <div className='space-y-6'>
              <Input
                label='用户名'
                placeholder='请输入用户名'
                icon={<User />}
                helperText='这是默认的输入框样式'
              />
              <Input
                label='邮箱'
                type='email'
                placeholder='请输入邮箱地址'
                icon={<Mail />}
                size='lg'
              />
              <Input
                label='搜索'
                placeholder='搜索内容...'
                icon={<Search />}
                size='sm'
              />
            </div>
          </div>

          {/* Outlined Variant */}
          <div className='bg-white rounded-2xl p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              轮廓样式
            </h2>
            <div className='space-y-6'>
              <Input
                variant='outlined'
                label='用户名'
                placeholder='请输入用户名'
                icon={<User />}
                helperText='轮廓样式，聚焦时有阴影效果'
              />
              <Input
                variant='outlined'
                label='密码'
                type={showPassword ? 'text' : 'password'}
                placeholder='请输入密码'
                icon={<Lock />}
                iconPosition='left'
                size='lg'
              />
              <Input
                variant='outlined'
                label='电话'
                placeholder='请输入手机号码'
                icon={<Phone />}
                error='请输入正确的手机号码'
                size='sm'
              />
            </div>
          </div>

          {/* Filled Variant */}
          <div className='bg-white rounded-2xl p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              填充样式
            </h2>
            <div className='space-y-6'>
              <Input
                variant='filled'
                label='邮箱地址'
                placeholder='example@email.com'
                icon={<Mail />}
                helperText='填充样式，聚焦时背景变为白色'
              />
              <Input
                variant='filled'
                label='信用卡号'
                placeholder='**** **** **** ****'
                icon={<CreditCard />}
                size='lg'
              />
              <Input
                variant='filled'
                label='搜索'
                placeholder='搜索...'
                icon={<Search />}
                size='sm'
              />
            </div>
          </div>

          {/* Underlined Variant */}
          <div className='bg-white rounded-2xl p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              下划线样式
            </h2>
            <div className='space-y-6'>
              <Input
                variant='underlined'
                label='姓名'
                placeholder='请输入您的姓名'
                helperText='简约的下划线样式'
              />
              <Input
                variant='underlined'
                label='邮箱'
                type='email'
                placeholder='请输入邮箱'
                icon={<Mail />}
                size='lg'
              />
              <Input
                variant='underlined'
                label='备注'
                placeholder='添加备注...'
                error='此字段为必填项'
                size='sm'
              />
            </div>
          </div>

          {/* Floating Label Variant */}
          <div className='bg-white rounded-2xl p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              浮动标签
            </h2>
            <div className='space-y-6'>
              <Input
                variant='floating'
                label='用户名'
                placeholder=' '
                icon={<User />}
                helperText='浮动标签动画效果'
              />
              <Input
                variant='floating'
                label='密码'
                type={showPassword2 ? 'text' : 'password'}
                placeholder=' '
                icon={<Lock />}
                size='lg'
              />
              <Input
                variant='floating'
                label='邮箱地址'
                type='email'
                placeholder=' '
                icon={<Mail />}
                size='sm'
              />
            </div>
          </div>

          {/* Modern Variant */}
          <div className='bg-white rounded-2xl p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
              现代样式
            </h2>
            <div className='space-y-6'>
              <Input
                variant='modern'
                label='搜索'
                placeholder='搜索任何内容...'
                icon={<Search />}
                helperText='现代设计风格，带有微妙的背景模糊'
              />
              <Input
                variant='modern'
                label='邮箱'
                type='email'
                placeholder='your@email.com'
                icon={<Mail />}
                size='lg'
              />
              <Input
                variant='modern'
                label='用户名'
                placeholder='用户名'
                icon={<User />}
                size='sm'
              />
            </div>
          </div>
        </div>

        {/* Glass and Gradient styles on dark background */}
        <div className='mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Glass Variant */}
          <div className='bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold text-white mb-6'>玻璃质感</h2>
            <div className='space-y-6'>
              <Input
                variant='glass'
                label='用户名'
                placeholder='请输入用户名'
                icon={<User />}
                helperText='玻璃质感样式，适合深色背景'
              />
              <Input
                variant='glass'
                label='密码'
                type='password'
                placeholder='请输入密码'
                icon={<Lock />}
                size='lg'
              />
              <Input
                variant='glass'
                label='搜索'
                placeholder='搜索...'
                icon={<Search />}
                size='sm'
              />
            </div>
          </div>

          {/* Gradient Variant */}
          <div className='bg-gradient-to-br from-purple-800 to-pink-800 rounded-2xl p-8 shadow-lg'>
            <h2 className='text-2xl font-semibold text-white mb-6'>渐变样式</h2>
            <div className='space-y-6'>
              <Input
                variant='gradient'
                label='邮箱'
                placeholder='your@example.com'
                icon={<Mail />}
                helperText='渐变背景样式'
              />
              <Input
                variant='gradient'
                label='密码'
                type='password'
                placeholder='请输入密码'
                icon={<Lock />}
                size='lg'
              />
              <Input
                variant='gradient'
                label='搜索'
                placeholder='搜索内容'
                icon={<Search />}
                error='请输入有效的搜索关键词'
                size='sm'
              />
            </div>
          </div>
        </div>

        {/* Size Variants */}
        <div className='mt-12 bg-white rounded-2xl p-8 shadow-lg'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
            尺寸变体
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div>
              <h3 className='text-lg font-medium text-gray-700 mb-4'>
                小尺寸 (SM)
              </h3>
              <Input
                size='sm'
                label='小尺寸'
                placeholder='小尺寸输入框'
                icon={<Search />}
              />
            </div>
            <div>
              <h3 className='text-lg font-medium text-gray-700 mb-4'>
                中尺寸 (MD)
              </h3>
              <Input
                size='md'
                label='中尺寸'
                placeholder='中尺寸输入框'
                icon={<Search />}
              />
            </div>
            <div>
              <h3 className='text-lg font-medium text-gray-700 mb-4'>
                大尺寸 (LG)
              </h3>
              <Input
                size='lg'
                label='大尺寸'
                placeholder='大尺寸输入框'
                icon={<Search />}
              />
            </div>
          </div>
        </div>

        {/* Error States */}
        <div className='mt-12 bg-white rounded-2xl p-8 shadow-lg'>
          <h2 className='text-2xl font-semibold text-gray-800 mb-6'>
            错误状态
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <Input
              variant='default'
              label='用户名'
              placeholder='请输入用户名'
              icon={<User />}
              error='用户名不能为空'
            />
            <Input
              variant='outlined'
              label='邮箱'
              placeholder='请输入邮箱'
              icon={<Mail />}
              error='请输入有效的邮箱地址'
            />
            <Input
              variant='filled'
              label='密码'
              type='password'
              placeholder='请输入密码'
              icon={<Lock />}
              error='密码至少需要8个字符'
            />
            <Input
              variant='modern'
              label='电话'
              placeholder='请输入手机号'
              icon={<Phone />}
              error='手机号格式不正确'
            />
          </div>
        </div>

        <div className='mt-12 text-center'>
          <p className='text-gray-600'>
            这些输入框组件支持多种样式、尺寸和状态，可以根据设计需求灵活使用。
          </p>
        </div>
      </div>
    </div>
  )
}
