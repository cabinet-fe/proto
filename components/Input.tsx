import React from 'react'
import { cn } from '../utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      icon,
      iconPosition = 'left',
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = React.useId()

    return (
      <div className='space-y-2'>
        {label && (
          <label
            htmlFor={inputId}
            className='block text-sm font-medium text-gray-700'
          >
            {label}
          </label>
        )}
        <div className='relative'>
          {icon && iconPosition === 'left' && (
            <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={cn(
              'flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              error &&
                'border-red-500 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
              {icon}
            </div>
          )}
        </div>
        {error && <p className='text-sm text-red-600'>{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
export type { InputProps }
