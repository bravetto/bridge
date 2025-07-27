'use client'

import { withErrorBoundary } from '@/components/ui/error-boundary'

interface AnalyticsWrapperProps {
  children: React.ReactNode
  className?: string
}

function AnalyticsWrapper({ children, className }: AnalyticsWrapperProps) {
  // Simple wrapper for analytics - no tracking in MVP
  return (
    <div className={className}>
      {children}
    </div>
  )
}

// Mock hook for compatibility
export const useModalAnalytics = () => ({
  trackModalOpen: () => {},
  trackModalClose: () => {},
  trackModalView: () => {},
  trackInteraction: () => {}
})

export default withErrorBoundary(AnalyticsWrapper, "AnalyticsWrapper") 