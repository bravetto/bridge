'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { withErrorBoundary } from '@/components/ui/error-boundary'

function Hero() {
  const router = useRouter()

  // Auto-redirect to MVP after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/bridge-project-mvp')
    }, 3000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Container className="text-center">
        <Heading as="h1" size="h1" className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
          JAHmere Webb Freedom Portal
        </Heading>
        <Text className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
          This page has been optimized. Redirecting to the MVP experience...
        </Text>
        <Button 
          onClick={() => router.push('/bridge-project-mvp')}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          Go to MVP Now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Container>
    </section>
  )
}

export default withErrorBoundary(Hero, "Hero") 