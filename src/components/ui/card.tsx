import React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated'
  children: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseClasses = 'card transition-all duration-300 ease-out'
    
    const variants = {
      default: 'bg-white border border-blue-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-[0_8px_25px_rgba(37,99,235,0.15)]',
      glass: 'card-glass bg-white/90 backdrop-blur-xl border border-blue-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-[0_8px_25px_rgba(37,99,235,0.15)]',
      elevated: 'bg-white border border-blue-200 rounded-xl p-6 shadow-md hover:shadow-lg hover:border-blue-300 hover:-translate-y-1'
    }
    
    return (
      <div
        className={cn(
          baseClasses,
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export { Card } 