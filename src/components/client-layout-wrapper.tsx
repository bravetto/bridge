'use client'

import { withErrorBoundary } from '@/components/ui/error-boundary'

interface ClientLayoutWrapperProps {
  children: React.ReactNode
}

function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}

export default withErrorBoundary(ClientLayoutWrapper, "ClientLayoutWrapper") 