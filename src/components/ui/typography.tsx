import React from 'react'
import { cn } from '@/lib/utils'

// Heading Component
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  size?: 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  children: React.ReactNode
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as = 'h2', size, children, ...props }, ref) => {
    const Component = as
    
    // Default size based on heading level if not specified
    const defaultSize = size || (as === 'h1' ? 'h1' : as === 'h2' ? 'h2' : as === 'h3' ? 'h3' : as === 'h4' ? 'h4' : 'h5')
    
    const baseClasses = 'font-bold text-blue-900 leading-tight'
    
    const sizes = {
      hero: 'text-6xl font-black',    // 60px
      h1: 'text-5xl',                // 48px
      h2: 'text-4xl',                // 36px  
      h3: 'text-3xl',                // 30px
      h4: 'text-2xl',                // 24px
      h5: 'text-xl'                  // 20px
    }
    
    return (
      <Component
        className={cn(
          baseClasses,
          sizes[defaultSize],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'

// Text Component
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'muted' | 'inverse'
  children: React.ReactNode
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, as = 'p', size = 'base', variant = 'secondary', children, ...props }, ref) => {
    const Component = as as any
    
    const baseClasses = 'leading-normal'
    
    const sizes = {
      xs: 'text-xs',      // 12px
      sm: 'text-sm',      // 14px
      base: 'text-base',  // 16px
      lg: 'text-lg',      // 18px
      xl: 'text-xl'       // 20px
    }
    
    const variants = {
      primary: 'text-blue-900',
      secondary: 'text-blue-700', 
      muted: 'text-blue-600',
      inverse: 'text-white'
    }
    
    return (
      <Component
        className={cn(
          baseClasses,
          sizes[size],
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Text.displayName = 'Text'

export { Heading, Text } 