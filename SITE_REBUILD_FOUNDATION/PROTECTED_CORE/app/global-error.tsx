'use client' // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body className="bg-gray-50 text-gray-900">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center space-y-6 max-w-md mx-auto">
            <div className="space-y-2">
              <h1 className="text-6xl font-bold text-red-600">🚨</h1>
              <h2 className="text-2xl font-bold">
                Critical System Error
              </h2>
              <p className="text-gray-600">
                The JAHmere Webb Freedom Portal has encountered a critical error. 
                Our team has been notified and is working to resolve this immediately.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => reset()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Try again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Return to homepage
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && error.digest && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-xs font-mono text-gray-600">
                Error ID: {error.digest}
              </div>
            )}
          </div>
        </div>
      </body>
    </html>
  )
} 