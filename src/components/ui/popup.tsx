'use client'

import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { cn } from '@/lib/utils'

interface PopupProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  className?: string
  overlayClassName?: string
  preventScroll?: boolean
}

/**
 * 🎯 ULTRA MODERN 2025 POPUP COMPONENT
 * Accessible, performant modal with glassmorphic design
 * Based on proven patterns from ultra-modern-2025-final
 */
function Popup({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  variant = 'default',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  overlayClassName,
  preventScroll = true
}: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose, closeOnEscape])

  // Handle scroll prevention
  useEffect(() => {
    if (!preventScroll) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, preventScroll])

  // Focus management
  useEffect(() => {
    if (isOpen && popupRef.current) {
      popupRef.current.focus()
    }
  }, [isOpen])

  // Size variants
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw] max-h-[95vh]'
  }

  // Variant styles
  const variantStyles = {
    default: {
      icon: null,
      borderColor: 'border-slate-200',
      headerBg: 'bg-white'
    },
    success: {
      icon: CheckCircle,
      borderColor: 'border-green-200',
      headerBg: 'bg-green-50'
    },
    warning: {
      icon: AlertTriangle,
      borderColor: 'border-yellow-200',
      headerBg: 'bg-yellow-50'
    },
    error: {
      icon: AlertCircle,
      borderColor: 'border-red-200',
      headerBg: 'bg-red-50'
    },
    info: {
      icon: Info,
      borderColor: 'border-blue-200',
      headerBg: 'bg-blue-50'
    }
  }

  const currentVariant = variantStyles[variant]
  const IconComponent = currentVariant.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
              overlayClassName
            )}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Popup Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'relative w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl',
                'border border-white/20',
                currentVariant.borderColor,
                sizeClasses[size],
                'max-h-[90vh] overflow-hidden',
                className
              )}
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? 'popup-title' : undefined}
            >
              {/* Header */}
              {(title || showCloseButton) && (
                <div className={cn(
                  'flex items-center justify-between p-6 border-b border-slate-200',
                  currentVariant.headerBg
                )}>
                  <div className="flex items-center gap-3">
                    {IconComponent && (
                      <IconComponent className={cn(
                        'w-5 h-5',
                        variant === 'success' && 'text-green-600',
                        variant === 'warning' && 'text-yellow-600',
                        variant === 'error' && 'text-red-600',
                        variant === 'info' && 'text-blue-600'
                      )} />
                    )}
                    {title && (
                      <h2 
                        id="popup-title"
                        className="text-xl font-semibold text-slate-900"
                      >
                        {title}
                      </h2>
                    )}
                  </div>
                  
                  {showCloseButton && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClose}
                      className="h-8 w-8 p-0 hover:bg-slate-100"
                      aria-label="Close popup"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

// Confirmation Dialog Component
interface ConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'danger'
  isLoading?: boolean
}

function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  isLoading = false
}: ConfirmationDialogProps) {
  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      variant={variant === 'danger' ? 'error' : 'default'}
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
    >
      <div className="space-y-6">
        <p className="text-slate-600 leading-relaxed">{message}</p>
        
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'destructive' : 'default'}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : confirmText}
          </Button>
        </div>
      </div>
    </Popup>
  )
}

// Quick Alert Component
interface QuickAlertProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  variant?: 'success' | 'warning' | 'error' | 'info'
  autoClose?: number // milliseconds
}

function QuickAlert({
  isOpen,
  onClose,
  title,
  message,
  variant = 'info',
  autoClose
}: QuickAlertProps) {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(onClose, autoClose)
      return () => clearTimeout(timer)
    }
  }, [isOpen, autoClose, onClose])

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      variant={variant}
    >
      <div className="space-y-4">
        <p className="text-slate-600 leading-relaxed">{message}</p>
        
        <div className="flex justify-end">
          <Button onClick={onClose}>
            OK
          </Button>
        </div>
      </div>
    </Popup>
  )
}

export default withErrorBoundary(Popup, "Popup")
export { ConfirmationDialog, QuickAlert } 