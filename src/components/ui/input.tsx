import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'error' | 'success'
  label?: string
  error?: string
  helperText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${inputId}-error` : undefined
    const helperId = helperText ? `${inputId}-helper` : undefined
    
    const baseClasses = 'input w-full px-3 py-2 border rounded-lg transition-all duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      default: 'border-blue-200 focus:border-blue-500 focus:ring-blue-500/20',
      error: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
      success: 'border-green-500 focus:border-green-500 focus:ring-green-500/20'
    }
    
    const currentVariant = error ? 'error' : variant
    
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-blue-900">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={cn(
            baseClasses,
            variants[currentVariant],
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={cn(
            errorId,
            helperId
          )}
          {...props}
        />
        
        {error && (
          <p id={errorId} role="alert" className="text-sm text-red-600 flex items-center gap-1">
            <span className="text-red-500">⚠</span>
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={helperId} className="text-sm text-blue-600">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input } 