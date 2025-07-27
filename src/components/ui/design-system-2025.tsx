'use client'

import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Palette, Layout, Sparkles, ArrowRight } from 'lucide-react'

function DesignSystem2025() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Container className="py-20">
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Design System 2025
          </Badge>
          <Heading as="h1" size="h1" className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Ultra Modern Design System
          </Heading>
          <Text className="text-xl text-slate-600 max-w-3xl mx-auto">
            Components and patterns for the JAHmere Webb Freedom Portal
          </Text>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center">
            <Palette className="w-12 h-12 text-blue-600 mx-auto mb-6" />
            <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-4">
              Color System
            </Heading>
            <Text className="text-slate-600 mb-6">
              Comprehensive blue variations and accessibility-focused palette
            </Text>
            <Button variant="outline" className="w-full">
              View Colors
            </Button>
          </Card>

          <Card className="p-8 text-center">
            <Layout className="w-12 h-12 text-green-600 mx-auto mb-6" />
            <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-4">
              Components
            </Heading>
            <Text className="text-slate-600 mb-6">
              Button, Card, Typography, and form components
            </Text>
            <Button variant="outline" className="w-full">
              View Components
            </Button>
          </Card>

          <Card className="p-8 text-center">
            <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-6" />
            <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-4">
              Animations
            </Heading>
            <Text className="text-slate-600 mb-6">
              Subtle transitions and micro-interactions
            </Text>
            <Button variant="outline" className="w-full">
              View Effects
            </Button>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            View Full System
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Container>
    </div>
  )
}

export { DesignSystem2025 }
export default withErrorBoundary(DesignSystem2025, "DesignSystem2025") 