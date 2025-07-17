import React, { forwardRef } from 'react'
import { cn } from '../utils/cn'

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  description?: string
  variant?: 'default' | 'card' | 'button' | 'minimal' | 'modern'
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  helperText?: string
}

export interface RadioGroupProps {
  name: string
  value?: string
  onChange?: (value: string) => void
  children: React.ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical'
  variant?: RadioProps['variant']
  size?: RadioProps['size']
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      label,
      description,
      variant = 'default',
      size = 'md',
      error = false,
      helperText,
      disabled,
      ...props
    },
    ref
  ) => {
    const radioId = React.useId()

    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    }

    const labelSizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }

    const renderRadio = () => {
      switch (variant) {
        case 'card':
          return (
            <label
              htmlFor={radioId}
              className={cn(
                'relative flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200',
                'hover:border-blue-300 hover:bg-blue-50/50',
                'has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:shadow-sm',
                'has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed has-[:disabled]:hover:border-gray-200',
                error
                  ? 'border-red-300 hover:border-red-400'
                  : 'border-gray-200',
                className
              )}
            >
              <input
                ref={ref}
                type='radio'
                id={radioId}
                disabled={disabled}
                className='sr-only'
                {...props}
              />
              <div
                className={cn(
                  'flex-shrink-0 rounded-full border-2 transition-all duration-200 mt-1',
                  sizeClasses[size],
                  error ? 'border-red-400' : 'border-gray-300',
                  'peer-checked:border-blue-500 peer-checked:bg-blue-500',
                  disabled ? 'opacity-50' : ''
                )}
              >
                <div className='w-full h-full rounded-full bg-white scale-0 transition-transform duration-200 peer-checked:scale-50' />
              </div>
              <div className='ml-3 flex-1'>
                {label && (
                  <div
                    className={cn(
                      'font-medium text-gray-900',
                      labelSizeClasses[size],
                      disabled ? 'opacity-50' : ''
                    )}
                  >
                    {label}
                  </div>
                )}
                {description && (
                  <div
                    className={cn(
                      'text-gray-500 mt-1',
                      size === 'sm'
                        ? 'text-xs'
                        : size === 'lg'
                        ? 'text-base'
                        : 'text-sm',
                      disabled ? 'opacity-50' : ''
                    )}
                  >
                    {description}
                  </div>
                )}
              </div>
            </label>
          )

        case 'button':
          return (
            <label
              htmlFor={radioId}
              className={cn(
                'relative inline-flex items-center justify-center px-4 py-2 border-2 rounded-lg cursor-pointer transition-all duration-200',
                'hover:border-blue-300 hover:bg-blue-50',
                'has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500 has-[:checked]:text-white has-[:checked]:shadow-lg',
                'has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed',
                error
                  ? 'border-red-300 hover:border-red-400'
                  : 'border-gray-200',
                labelSizeClasses[size],
                className
              )}
            >
              <input
                ref={ref}
                type='radio'
                id={radioId}
                disabled={disabled}
                className='sr-only'
                {...props}
              />
              {label}
            </label>
          )

        case 'minimal':
          return (
            <label
              htmlFor={radioId}
              className={cn(
                'relative flex items-center cursor-pointer group',
                disabled ? 'cursor-not-allowed opacity-50' : '',
                className
              )}
            >
              <input
                ref={ref}
                type='radio'
                id={radioId}
                disabled={disabled}
                className='sr-only'
                {...props}
              />
              <div
                className={cn(
                  'relative rounded-full border-2 transition-all duration-200',
                  sizeClasses[size],
                  error ? 'border-red-400' : 'border-gray-300',
                  'group-hover:border-blue-400',
                  'peer-checked:border-blue-500 peer-checked:bg-blue-500'
                )}
              >
                <div className='absolute inset-1 rounded-full bg-white scale-0 transition-transform duration-200 peer-checked:scale-100' />
              </div>
              {label && (
                <span
                  className={cn('ml-2 text-gray-700', labelSizeClasses[size])}
                >
                  {label}
                </span>
              )}
            </label>
          )

        case 'modern':
          return (
            <label
              htmlFor={radioId}
              className={cn(
                'relative flex items-start p-3 border rounded-xl cursor-pointer transition-all duration-200',
                'hover:border-blue-300 hover:shadow-sm',
                'has-[:checked]:border-blue-500 has-[:checked]:bg-gradient-to-r has-[:checked]:from-blue-50 has-[:checked]:to-indigo-50',
                'has-[:disabled]:opacity-50 has-[:disabled]:cursor-not-allowed',
                error ? 'border-red-300' : 'border-gray-200',
                className
              )}
            >
              <input
                ref={ref}
                type='radio'
                id={radioId}
                disabled={disabled}
                className='sr-only'
                {...props}
              />
              <div
                className={cn(
                  'relative rounded-full border-2 transition-all duration-200 flex-shrink-0 mt-0.5',
                  sizeClasses[size],
                  error ? 'border-red-400' : 'border-gray-300',
                  'peer-checked:border-blue-500 peer-checked:bg-gradient-to-br peer-checked:from-blue-500 peer-checked:to-indigo-600'
                )}
              >
                <div className='absolute inset-1 rounded-full bg-white scale-0 transition-transform duration-200 peer-checked:scale-75' />
              </div>
              <div className='ml-3 flex-1'>
                {label && (
                  <div
                    className={cn(
                      'font-medium text-gray-900',
                      labelSizeClasses[size]
                    )}
                  >
                    {label}
                  </div>
                )}
                {description && (
                  <div
                    className={cn(
                      'text-gray-500 mt-1',
                      size === 'sm'
                        ? 'text-xs'
                        : size === 'lg'
                        ? 'text-base'
                        : 'text-sm'
                    )}
                  >
                    {description}
                  </div>
                )}
              </div>
            </label>
          )

        default:
          return (
            <label
              htmlFor={radioId}
              className={cn(
                'relative flex items-start cursor-pointer group',
                disabled ? 'cursor-not-allowed opacity-50' : '',
                className
              )}
            >
              <input
                ref={ref}
                type='radio'
                id={radioId}
                disabled={disabled}
                className='sr-only peer'
                {...props}
              />
              <div
                className={cn(
                  'relative rounded-full border-2 transition-all duration-200 flex-shrink-0 mt-1',
                  sizeClasses[size],
                  error ? 'border-red-400' : 'border-gray-300',
                  'group-hover:border-blue-400',
                  'peer-checked:border-blue-500 peer-checked:bg-blue-500',
                  'peer-focus:ring-2 peer-focus:ring-blue-200 peer-focus:ring-offset-2'
                )}
              >
                <div className='absolute inset-1 rounded-full bg-white scale-0 transition-transform duration-200 peer-checked:scale-75' />
              </div>
              <div className='ml-3 flex-1'>
                {label && (
                  <div
                    className={cn(
                      'font-medium text-gray-900',
                      labelSizeClasses[size]
                    )}
                  >
                    {label}
                  </div>
                )}
                {description && (
                  <div
                    className={cn(
                      'text-gray-500 mt-1',
                      size === 'sm'
                        ? 'text-xs'
                        : size === 'lg'
                        ? 'text-base'
                        : 'text-sm'
                    )}
                  >
                    {description}
                  </div>
                )}
              </div>
            </label>
          )
      }
    }

    return (
      <div className='space-y-1'>
        {renderRadio()}
        {helperText && (
          <p
            className={cn(
              'text-sm ml-8',
              error ? 'text-red-600' : 'text-gray-500'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  children,
  className,
  orientation = 'vertical',
  variant,
  size
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value)
    }
  }

  return (
    <div
      className={cn(
        'space-y-2',
        orientation === 'horizontal' ? 'flex space-x-4 space-y-0' : '',
        className
      )}
      role='radiogroup'
    >
      {React.Children.map(children, child => {
        if (React.isValidElement<RadioProps>(child) && child.type === Radio) {
          return React.cloneElement(child, {
            name,
            checked: value === child.props.value,
            onChange: handleChange,
            variant: child.props.variant || variant,
            size: child.props.size || size
          })
        }
        return child
      })}
    </div>
  )
}

export { Radio }
