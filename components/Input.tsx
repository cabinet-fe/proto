import React from 'react'
import { cn } from '../utils/cn'

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  variant?:
    | 'default'
    | 'outlined'
    | 'filled'
    | 'underlined'
    | 'floating'
    | 'modern'
    | 'glass'
    | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      icon,
      iconPosition = 'left',
      variant = 'default',
      size = 'md',
      type = 'text',
      helperText,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId()
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(
      !!props.value || !!props.defaultValue
    )

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    // Size variants
    const sizeClasses = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-12 px-4 text-base',
      lg: 'h-14 px-5 text-lg'
    }

    // Icon positioning based on size
    const iconClasses = {
      sm:
        icon && iconPosition === 'left'
          ? 'pl-8'
          : icon && iconPosition === 'right'
          ? 'pr-8'
          : '',
      md:
        icon && iconPosition === 'left'
          ? 'pl-10'
          : icon && iconPosition === 'right'
          ? 'pr-10'
          : '',
      lg:
        icon && iconPosition === 'left'
          ? 'pl-12'
          : icon && iconPosition === 'right'
          ? 'pr-12'
          : ''
    }

    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }

    const iconPositions = {
      sm: iconPosition === 'left' ? 'left-2' : 'right-2',
      md: iconPosition === 'left' ? 'left-3' : 'right-3',
      lg: iconPosition === 'left' ? 'left-4' : 'right-4'
    }

    // Variant styles
    const variantClasses = {
      default: cn(
        'border border-gray-300 bg-white rounded-lg',
        'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      ),
      outlined: cn(
        'border-2 border-gray-300 bg-transparent rounded-xl',
        'focus:border-blue-600 focus:shadow-lg focus:shadow-blue-500/25',
        error && 'border-red-500 focus:border-red-600 focus:shadow-red-500/25'
      ),
      filled: cn(
        'border-0 bg-gray-100 rounded-lg',
        'focus:bg-white focus:ring-2 focus:ring-blue-500/30 focus:shadow-md',
        error && 'bg-red-50 focus:ring-red-500/30'
      ),
      underlined: cn(
        'border-0 border-b-2 border-gray-300 bg-transparent rounded-none px-0',
        'focus:border-blue-500 focus:ring-0',
        error && 'border-red-500 focus:border-red-500'
      ),
      floating: cn(
        'border border-gray-300 bg-white rounded-lg pt-6',
        'focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      ),
      modern: cn(
        'border border-gray-200 bg-gray-50/50 rounded-2xl backdrop-blur-sm',
        'focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100/50 focus:shadow-xl',
        'transition-all duration-300 ease-out',
        error && 'border-red-400 focus:border-red-400 focus:ring-red-100/50'
      ),
      glass: cn(
        'border border-white/20 bg-white/10 backdrop-blur-md rounded-xl',
        'focus:border-white/40 focus:bg-white/20 focus:ring-2 focus:ring-white/20',
        'placeholder:text-white/70 text-white',
        error && 'border-red-400/60 focus:border-red-400 focus:ring-red-400/20'
      ),
      gradient: cn(
        'border-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl',
        'focus:from-purple-500/20 focus:to-pink-500/20 focus:ring-2 focus:ring-purple-500/30',
        'backdrop-blur-sm transition-all duration-300',
        error &&
          'from-red-500/10 to-orange-500/10 focus:from-red-500/20 focus:to-orange-500/20'
      )
    }

    const renderLabel = () => {
      if (!label) return null

      if (variant === 'floating') {
        return (
          <label
            htmlFor={inputId}
            className={cn(
              'absolute left-4 transition-all duration-200 pointer-events-none',
              'text-gray-500',
              isFocused || hasValue
                ? 'top-2 text-xs text-blue-600 font-medium'
                : 'top-1/2 -translate-y-1/2 text-base',
              error && (isFocused || hasValue) && 'text-red-600'
            )}
          >
            {label}
          </label>
        )
      }

      if (variant === 'underlined') {
        return (
          <label
            htmlFor={inputId}
            className={cn(
              'block text-sm font-medium mb-2',
              'text-gray-700',
              error && 'text-red-600'
            )}
          >
            {label}
          </label>
        )
      }

      return (
        <label
          htmlFor={inputId}
          className={cn(
            'block text-sm font-medium mb-2',
            variant === 'glass' ? 'text-white/90' : 'text-gray-700',
            error && 'text-red-600'
          )}
        >
          {label}
        </label>
      )
    }

    return (
      <div className='space-y-1'>
        {label && variant !== 'floating' && renderLabel()}

        <div className='relative'>
          {variant === 'floating' && renderLabel()}

          {icon && (
            <div
              className={cn(
                'absolute top-1/2 transform -translate-y-1/2 z-10',
                iconPositions[size],
                variant === 'glass' ? 'text-white/70' : 'text-gray-400',
                error && variant !== 'glass' && 'text-red-400'
              )}
            >
              <div className={iconSizes[size]}>{icon}</div>
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            className={cn(
              'flex w-full transition-all duration-200',
              'placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50',
              sizeClasses[size],
              iconClasses[size],
              variantClasses[variant],
              variant === 'glass' && 'placeholder:text-white/50',
              className
            )}
            {...props}
          />

          {/* Animated underline for underlined variant */}
          {variant === 'underlined' && (
            <div
              className={cn(
                'absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300',
                isFocused ? 'w-full' : 'w-0',
                error && 'bg-red-500'
              )}
            />
          )}
        </div>

        {/* Helper text or error message */}
        {(error || helperText) && (
          <p
            className={cn(
              'text-sm',
              error
                ? 'text-red-600'
                : variant === 'glass'
                ? 'text-white/70'
                : 'text-gray-500'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
export type { InputProps }
