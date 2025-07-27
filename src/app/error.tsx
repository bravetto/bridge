'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error)
  }, [error])

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-blue-600">⚠️</h1>
          <h2 className="text-2xl font-bold text-gray-900">
            Something went wrong!
          </h2>
          <p className="text-gray-600">
            We encountered an unexpected error. This has been logged and we're working to fix it.
          </p>
        </div>
        
        <div className="space-y-3">
          <Button
            onClick={() => reset()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Try again
          </Button>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              Return to homepage
            </Button>
          </Link>
        </div>
        
        {process.env.NODE_ENV === 'development' && error.digest && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-xs font-mono text-gray-600">
            Error ID: {error.digest}
          </div>
        )}
      </div>
    </Container>
  )
}
