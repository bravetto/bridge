'use client'

import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Heading, Text } from '@/components/ui/typography'
import { ArrowRight } from 'lucide-react'
import { withErrorBoundary } from '@/components/ui/error-boundary'

function SmartCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <Container className="text-center">
        <Heading as="h2" size="h2" className="text-3xl font-bold mb-4">
          Help JAHmere Today
        </Heading>
        <Text className="text-xl mb-8 opacity-90">
          Every action matters. Every voice counts.
        </Text>
        <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50">
          Take Action Now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Container>
    </section>
  )
}

export default withErrorBoundary(SmartCTA, "SmartCTA") 