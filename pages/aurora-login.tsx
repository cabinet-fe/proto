import React, { useMemo, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Fingerprint,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles
} from 'lucide-react'
import { cn } from '../utils/cn'

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface InputFieldProps {
  label: string
  name: string
  type?: string
  icon: IconType
  value: string
  placeholder?: string
  autoComplete?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onToggleVisibility?: () => void
  showVisibilityToggle?: boolean
  isVisible?: boolean
}

function InputField({
  label,
  name,
  type = 'text',
  icon: Icon,
  value,
  placeholder,
  autoComplete,
  onChange,
  onToggleVisibility,
  showVisibilityToggle,
  isVisible
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <label className='block space-y-2 text-sm font-medium text-slate-200'>
      <span>{label}</span>
      <div className={cn(
        'relative flex items-center rounded-2xl border border-white/10 bg-white/5 px-4',
        'backdrop-blur-md transition-shadow duration-300',
        isFocused && 'shadow-[0_10px_40px_-15px_rgba(59,130,246,0.45)] border-blue-400/60'
      )}>
        <Icon className='mr-3 h-5 w-5 text-slate-400' />
        <input
          className={cn(
            'h-12 w-full bg-transparent text-base text-slate-100 placeholder:text-slate-500',
            'focus:outline-none'
          )}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label={label}
        />
        {showVisibilityToggle && onToggleVisibility && (
          <button
            type='button'
            onClick={onToggleVisibility}
            className='absolute right-4 text-slate-400 transition-colors hover:text-slate-100'
            aria-label={isVisible ? '隐藏密码' : '显示密码'}
          >
            {isVisible ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
          </button>
        )}
      </div>
    </label>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  })
}

export default function AuroraLoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [remember, setRemember] = useState(true)

  const insights = useMemo(() => ([
    { label: '实时风险扫描', value: '99.97%', icon: ShieldCheck },
    { label: '平均响应', value: '82ms', icon: Sparkles },
    { label: '周活用户', value: '128K', icon: CheckCircle2 }
  ]), [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    console.log('登录请求', { ...formData, remember })
  }

  return (
    <div className='relative min-h-screen overflow-hidden bg-slate-950 text-slate-50'>
      {/* 背景装饰 */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-900/30 via-slate-900 to-slate-950' />
      <div className='absolute inset-0' style={{
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.12), transparent 35%), radial-gradient(circle at 80% 0%, rgba(139, 92, 246, 0.12), transparent 30%), radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.12), transparent 35%)'
      }} />
      <div className='absolute inset-0 opacity-40 mix-blend-soft-light' style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(240deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      <div className='relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 lg:px-12'>
        <div className='grid w-full grid-cols-1 gap-8 lg:grid-cols-2'>
          {/* 左侧品牌与要点 */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={fadeUp}
            className='flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl'
          >
            <div className='space-y-8'>
              <div className='inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-md'>
                <Fingerprint className='h-4 w-4 text-cyan-300' />
                <span>零信任 · 自适应安全 · 实时守护</span>
              </div>

              <div className='space-y-4'>
                <div className='inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-cyan-100'>
                  新世代登录体验
                </div>
                <h1 className='text-4xl font-bold leading-tight text-slate-50 lg:text-5xl'>
                  更快，更稳，更安全
                </h1>
                <p className='text-base text-slate-200/80 lg:text-lg'>
                  采用渐进式验证与即时风险识别，保证高转换率同时守护账号资产。
                </p>
              </div>

              <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                {insights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    custom={0.1 * index}
                    initial='hidden'
                    animate='visible'
                    variants={fadeUp}
                    className='rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-blue-900/20 backdrop-blur-md'
                  >
                    <div className='flex items-center justify-between text-xs text-slate-400'>
                      <span>{item.label}</span>
                      <item.icon className='h-4 w-4 text-cyan-300' />
                    </div>
                    <div className='mt-3 text-2xl font-semibold text-slate-50'>{item.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className='mt-10 flex flex-wrap gap-3 text-sm text-slate-300'>
              <span className='inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1'>
                <ShieldCheck className='h-4 w-4 text-emerald-300' />
                企业级合规加密
              </span>
              <span className='inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1'>
                <Sparkles className='h-4 w-4 text-amber-300' />
                智能推荐与动态验证
              </span>
            </div>
          </motion.div>

          {/* 右侧表单 */}
          <motion.div
            initial='hidden'
            animate='visible'
            variants={fadeUp}
            custom={0.1}
            className='relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 p-8 shadow-2xl shadow-blue-900/30 backdrop-blur-2xl'
          >
            <div className='absolute inset-x-8 top-8 h-32 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 blur-3xl' />

            <div className='relative space-y-6'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm uppercase tracking-[0.12em] text-cyan-200/80'>Login</p>
                  <h2 className='mt-1 text-2xl font-semibold text-slate-50'>欢迎回来</h2>
                </div>
                <div className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200'>
                  <span className='font-semibold text-cyan-200'>SLA 99.9%</span>
                </div>
              </div>

              <form className='space-y-6' onSubmit={handleSubmit}>
                <InputField
                  label='邮箱'
                  name='email'
                  icon={Mail}
                  value={formData.email}
                  placeholder='you@example.com'
                  autoComplete='email'
                  onChange={handleChange}
                />

                <InputField
                  label='密码'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  icon={Lock}
                  value={formData.password}
                  placeholder='请输入密码'
                  autoComplete='current-password'
                  onChange={handleChange}
                  showVisibilityToggle
                  isVisible={showPassword}
                  onToggleVisibility={() => setShowPassword(prev => !prev)}
                />

                <div className='flex items-center justify-between text-sm text-slate-300'>
                  <label className='inline-flex items-center gap-2'>
                    <input
                      type='checkbox'
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                      className='h-4 w-4 rounded border-white/30 bg-transparent text-cyan-400 focus:ring-cyan-500'
                    />
                    记住我
                  </label>
                  <button type='button' className='text-cyan-200 transition-colors hover:text-cyan-100'>
                    忘记密码？
                  </button>
                </div>

                <motion.button
                  type='submit'
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={cn(
                    'group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl',
                    'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-base font-semibold text-white shadow-xl shadow-blue-900/30',
                    'transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70'
                  )}
                >
                  <span className='absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
                  {isSubmitting ? (
                    <span className='flex items-center gap-2'>
                      <span className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white' />
                      安全校验中...
                    </span>
                  ) : (
                    <span className='flex items-center gap-2'>
                      立即登录
                      <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                    </span>
                  )}
                </motion.button>

                <div className='space-y-3'>
                  <div className='flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-slate-400'>
                    <span className='flex-1 border-t border-white/10' />
                    <span>或使用单点登录</span>
                    <span className='flex-1 border-t border-white/10' />
                  </div>
                  <div className='grid grid-cols-2 gap-3 text-sm'>
                    {['Okta SSO', 'Azure AD'].map(provider => (
                      <button
                        key={provider}
                        type='button'
                        className='group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition-colors hover:border-cyan-400/50 hover:bg-white/10'
                      >
                        <span>{provider}</span>
                        <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
                      </button>
                    ))}
                  </div>
                </div>
              </form>

              <div className='pt-2 text-center text-sm text-slate-400'>
                还没有账号？
                <button
                  type='button'
                  className='ml-1 font-semibold text-cyan-200 transition-colors hover:text-cyan-100'
                >
                  立即注册
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
