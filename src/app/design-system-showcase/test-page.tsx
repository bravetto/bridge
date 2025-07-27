'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/typography'
import { BaseCard } from '@/components/ui/base-card'
import { withErrorBoundary } from '@/components/ui/error-boundary'

function TestPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Design System Test Page
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseCard className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Component Test</h2>
              <Text className="mb-4">
                This is a test to verify that our components are loading correctly.
              </Text>
              <Button 
                onClick={() => setCount(count + 1)}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Click Count: {count}
              </Button>
            </BaseCard>

            <BaseCard className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Status Check</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <Text>React State: Working</Text>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <Text>Components: Loading</Text>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <Text>Styling: Applied</Text>
                </div>
              </div>
            </BaseCard>
          </div>

          <div className="mt-8 text-center">
            <Button 
              onClick={() => window.location.href = '/design-system-showcase'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Go to Full Design System Showcase
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default withErrorBoundary(TestPage, "TestPage") 