import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'btn inline-flex items-center justify-center font-semibold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
    
    const variants = {
      primary: 'btn-primary bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(37,99,235,0.3)]',
      secondary: 'btn-secondary bg-blue-100 text-blue-900 border-blue-200 hover:bg-blue-200 hover:border-blue-300 hover:-translate-y-0.5',
      ghost: 'text-blue-600 hover:bg-blue-50 hover:text-blue-700',
      outline: 'border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300'
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-lg'
    }
    
    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button } 