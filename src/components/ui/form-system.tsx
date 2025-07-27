'use client'

import React, { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { Eye, EyeOff, AlertCircle, CheckCircle2, X } from 'lucide-react'

// Form validation types
interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: string) => string | null
}

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'textarea' | 'select'
  placeholder?: string
  validation?: ValidationRule
  options?: { value: string; label: string }[]
  disabled?: boolean
  required?: boolean
}

interface FormSystemProps {
  fields: FormField[]
  onSubmit: (data: Record<string, string>) => void
  submitLabel?: string
  className?: string
  spacing?: 'compact' | 'comfortable' | 'spacious'
}

/**
 * Comprehensive Form System Component
 * Features: Validation, mobile optimization, accessibility
 */
function FormSystemComponent({ 
  fields, 
  onSubmit, 
  submitLabel = 'Submit', 
  className,
  spacing = 'comfortable'
}: FormSystemProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validation function
  const validateField = useCallback((field: FormField, value: string): string | null => {
    const { validation } = field
    if (!validation) return null

    if (validation.required && !value.trim()) {
      return `${field.label} is required`
    }

    if (validation.minLength && value.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`
    }

    if (validation.maxLength && value.length > validation.maxLength) {
      return `${field.label} must be no more than ${validation.maxLength} characters`
    }

    if (validation.pattern && !validation.pattern.test(value)) {
      if (field.type === 'email') {
        return 'Please enter a valid email address'
      }
      if (field.type === 'tel') {
        return 'Please enter a valid phone number'
      }
      return `${field.label} format is invalid`
    }

    if (validation.custom) {
      return validation.custom(value)
    }

    return null
  }, [])

  // Handle field change
  const handleFieldChange = useCallback((fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }))
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }))
    }
  }, [errors])

  // Handle field blur
  const handleFieldBlur = useCallback((field: FormField) => {
    setTouched(prev => ({ ...prev, [field.name]: true }))
    
    const value = formData[field.name] || ''
    const error = validateField(field, value)
    
    if (error) {
      setErrors(prev => ({ ...prev, [field.name]: error }))
    }
  }, [formData, validateField])

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate all fields
    const newErrors: Record<string, string> = {}
    fields.forEach(field => {
      const value = formData[field.name] || ''
      const error = validateField(field, value)
      if (error) {
        newErrors[field.name] = error
      }
    })

    setErrors(newErrors)
    setTouched(fields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {}))

    if (Object.keys(newErrors).length === 0) {
      try {
        await onSubmit(formData)
      } catch (error) {
        console.error('Form submission error:', error)
      }
    }

    setIsSubmitting(false)
  }, [fields, formData, validateField, onSubmit])

  // Toggle password visibility
  const togglePasswordVisibility = useCallback((fieldName: string) => {
    setShowPasswords(prev => ({ ...prev, [fieldName]: !prev[fieldName] }))
  }, [])

  // Get mobile-optimized input attributes
  const getMobileAttributes = (field: FormField) => {
    const attrs: any = {}
    
    // Prevent zoom on iOS for certain input types
    if (field.type === 'email' || field.type === 'tel' || field.type === 'number') {
      attrs.style = { fontSize: '16px' }
    }

    // Input modes for better mobile keyboards
    switch (field.type) {
      case 'email':
        attrs.inputMode = 'email'
        attrs.autoComplete = 'email'
        break
      case 'tel':
        attrs.inputMode = 'tel'
        attrs.autoComplete = 'tel'
        break
      case 'number':
        attrs.inputMode = 'numeric'
        break
    }

    return attrs
  }

  // Spacing classes
  const spacingClasses = {
    compact: 'champion-space-3',
    comfortable: 'champion-space-4', 
    spacious: 'champion-space-6'
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        'champion-form-container',
        spacingClasses[spacing],
        className
      )}
      noValidate
    >
      <div className={`space-y-${spacingClasses[spacing]}`}>
        {fields.map((field) => {
          const value = formData[field.name] || ''
          const error = errors[field.name]
          const isTouched = touched[field.name]
          const hasError = error && isTouched
          const isValid = isTouched && !error && value.length > 0

          return (
            <div key={field.name} className="champion-form-field">
              <Label 
                htmlFor={field.name}
                className={cn(
                  'champion-form-label',
                  field.required && 'champion-form-label-required'
                )}
              >
                {field.label}
                {field.required && <span className="champion-text-orange ml-1">*</span>}
              </Label>

              <div className="relative">
                {/* Text Input */}
                {['text', 'email', 'tel', 'number'].includes(field.type) && (
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    value={value}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    onBlur={() => handleFieldBlur(field)}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                    variant={hasError ? 'error' : 'default'}
                    className={cn(
                      'champion-form-input',
                      'min-h-[44px]', // Mobile touch target
                      hasError && 'champion-form-input-error',
                      isValid && 'champion-form-input-valid'
                    )}
                    aria-invalid={hasError ? 'true' : 'false'}
                    aria-describedby={hasError ? `${field.name}-error` : undefined}
                    {...getMobileAttributes(field)}
                  />
                )}

                {/* Password Input */}
                {field.type === 'password' && (
                  <>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPasswords[field.name] ? 'text' : 'password'}
                      value={value}
                      onChange={(e) => handleFieldChange(field.name, e.target.value)}
                      onBlur={() => handleFieldBlur(field)}
                      placeholder={field.placeholder}
                      disabled={field.disabled}
                      variant={hasError ? 'error' : 'default'}
                                             className={cn(
                         'champion-form-input',
                         'min-h-[44px] pr-12',
                         hasError && 'champion-form-input-error',
                         isValid && 'champion-form-input-valid'
                       )}
                       aria-invalid={hasError ? 'true' : 'false'}
                       aria-describedby={hasError ? `${field.name}-error` : undefined}
                      autoComplete="current-password"
                      style={{ fontSize: '16px' }}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field.name)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 champion-text-gray-500 hover:champion-text-gray-700 min-w-[44px] min-h-[44px] flex items-center justify-center"
                      aria-label={showPasswords[field.name] ? 'Hide password' : 'Show password'}
                    >
                      {showPasswords[field.name] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </>
                )}

                {/* Textarea */}
                {field.type === 'textarea' && (
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={value}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    onBlur={() => handleFieldBlur(field)}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                                         className={cn(
                       'champion-form-textarea',
                       'min-h-[88px]', // Double mobile touch target for textarea
                       hasError && 'champion-form-input-error',
                       isValid && 'champion-form-input-valid'
                     )}
                     aria-invalid={hasError ? 'true' : 'false'}
                     aria-describedby={hasError ? `${field.name}-error` : undefined}
                    style={{ fontSize: '16px' }}
                  />
                )}

                {/* Select */}
                {field.type === 'select' && field.options && (
                  <Select
                    value={value}
                    onValueChange={(newValue) => handleFieldChange(field.name, newValue)}
                    disabled={field.disabled}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                )}

                {/* Validation Icons */}
                {isTouched && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    {hasError && (
                      <AlertCircle className="w-4 h-4 champion-text-red-500" />
                    )}
                    {isValid && (
                      <CheckCircle2 className="w-4 h-4 champion-text-green-500" />
                    )}
                  </div>
                )}
              </div>

              {/* Error Message */}
              {hasError && (
                <div 
                  id={`${field.name}-error`}
                  className="champion-form-error-message flex items-center gap-2 champion-mt-1"
                  role="alert"
                >
                  <AlertCircle className="w-4 h-4 champion-text-red-500 flex-shrink-0" />
                  <span className="text-sm champion-text-red-600">{error}</span>
                </div>
              )}

              {/* Success Message */}
              {isValid && (
                <div className="champion-form-success-message flex items-center gap-2 champion-mt-1">
                  <CheckCircle2 className="w-4 h-4 champion-text-green-500 flex-shrink-0" />
                  <span className="text-sm champion-text-green-600">Looks good!</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Submit Button */}
      <div className={`champion-mt-${spacingClasses[spacing]}`}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full min-h-[48px]"
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </Button>
      </div>

      {/* Form Status */}
      {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
        <div 
          className="champion-form-status champion-bg-red-50 border border-red-200 rounded-lg champion-p-4 champion-mt-4"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 champion-text-red-500 flex-shrink-0 champion-mt-0.5" />
            <div>
              <h4 className="font-medium champion-text-red-800 champion-mb-1">
                Please fix the following errors:
              </h4>
              <ul className="text-sm champion-text-red-700 space-y-1">
                {Object.entries(errors).map(([fieldName, error]) => (
                  touched[fieldName] && (
                    <li key={fieldName}>• {error}</li>
                  )
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

export const FormSystem = withErrorBoundary(FormSystemComponent, "FormSystem")

// Pre-built form configurations
export const commonFormFields = {
  contact: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text' as const,
      placeholder: 'Enter your full name',
      required: true,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 100
      }
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email' as const,
      placeholder: 'your@email.com',
      required: true,
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      }
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel' as const,
      placeholder: '(555) 123-4567',
      validation: {
        pattern: /^[\+]?[1-9][\d]{0,15}$/
      }
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea' as const,
      placeholder: 'Tell us how we can help...',
      required: true,
      validation: {
        required: true,
        minLength: 10,
        maxLength: 1000
      }
    }
  ],

  registration: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text' as const,
      placeholder: 'First name',
      required: true,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 50
      }
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text' as const,
      placeholder: 'Last name',
      required: true,
      validation: {
        required: true,
        minLength: 2,
        maxLength: 50
      }
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email' as const,
      placeholder: 'your@email.com',
      required: true,
      validation: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password' as const,
      placeholder: 'Create a secure password',
      required: true,
      validation: {
        required: true,
        minLength: 8,
        custom: (value: string) => {
          if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            return 'Password must contain uppercase, lowercase, and number'
          }
          return null
        }
      }
    }
  ]
}

export default FormSystem 