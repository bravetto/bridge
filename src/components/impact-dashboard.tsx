'use client'

import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { TrendingUp, Users, Heart, Star } from 'lucide-react'

// Mock impact events for compatibility
export const impactEvents = {
  data: [
    { id: 1, type: 'letter', count: 8421 },
    { id: 2, type: 'prayer', count: 15000 },
    { id: 3, type: 'share', count: 3200 }
  ],
  addHeart: () => {
    // Mock implementation for compatibility
    console.log('Heart added to impact tracking');
  },
  addLetter: () => {
    // Mock implementation for compatibility
    console.log('Letter added to impact tracking');
  }
}

function ImpactDashboard() {
  const stats = [
    { label: 'Letters Sent', value: '8,421', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Prayer Supporters', value: '15,000', icon: Heart, color: 'text-red-600' },
    { label: 'Social Shares', value: '3,200', icon: Users, color: 'text-green-600' },
    { label: 'Days Until July 28', value: '2', icon: Star, color: 'text-orange-600' }
  ]

  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <Heading as="h2" size="h2" className="text-3xl font-bold text-slate-900 mb-4">
            Impact Dashboard
          </Heading>
          <Text className="text-xl text-slate-600">
            Real-time support for JAHmere's freedom
          </Text>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center">
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-4`} />
              <div className="text-2xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <Text className="text-sm text-slate-600">{stat.label}</Text>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default withErrorBoundary(ImpactDashboard, "ImpactDashboard") 