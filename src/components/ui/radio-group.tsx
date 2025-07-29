import React from 'react'
import { cn } from '@/lib/utils'

export interface RadioOption {
  value: string
  label: string
  description?: string
}

export interface RadioGroupProps {
  name: string
  value?: string
  onValueChange?: (value: string) => void
  options: RadioOption[]
  label?: string
  error?: string
  className?: string
  disabled?: boolean
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, value, onValueChange, options, label, error, className, disabled, ...props }, ref) => {
    const groupId = `radio-group-${Math.random().toString(36).substr(2, 9)}`
    const errorId = error ? `${groupId}-error` : undefined
    
    return (
      <div ref={ref} className={cn('space-y-3', className)} {...props}>
        {label && (
          <legend className="block text-sm font-medium text-blue-900 mb-3">
            {label}
          </legend>
        )}
        
        <div className="space-y-2" role="radiogroup" aria-describedby={errorId}>
          {options.map((option) => {
            const optionId = `${name}-${option.value}`
            const isSelected = value === option.value
            
            return (
              <label
                key={option.value}
                htmlFor={optionId}
                className={cn(
                  'flex items-start cursor-pointer p-3 rounded-lg border transition-all duration-150',
                  isSelected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value}
                  checked={isSelected}
                  onChange={(e) => onValueChange?.(e.target.value)}
                  disabled={disabled}
                  className="mt-1 mr-3 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">
                    {option.label}
                  </div>
                  {option.description && (
                    <div className="text-xs text-gray-600 mt-1">
                      {option.description}
                    </div>
                  )}
                </div>
              </label>
            )
          })}
        </div>
        
        {error && (
          <p id={errorId} role="alert" className="text-sm text-red-600 flex items-center gap-1">
            <span className="text-red-500">⚠</span>
            {error}
          </p>
        )}
      </div>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

export { RadioGroup } 