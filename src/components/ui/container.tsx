import React from 'react'
import { cn } from '@/lib/utils'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  children: React.ReactNode
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', children, ...props }, ref) => {
    const baseClasses = 'mx-auto px-4 sm:px-6 lg:px-8'
    
    const sizes = {
      sm: 'max-w-2xl',      // 672px
      md: 'max-w-4xl',      // 896px  
      lg: 'max-w-6xl',      // 1152px
      xl: 'max-w-7xl',      // 1280px
      full: 'max-w-full'    // No max width
    }
    
    return (
      <div
        className={cn(
          baseClasses,
          sizes[size],
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

Container.displayName = 'Container'

export { Container } 