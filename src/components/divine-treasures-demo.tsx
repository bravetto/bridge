'use client'

import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Heart, Star, Users, ArrowRight } from 'lucide-react'

function DivineTreasuresDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Container className="py-20">
        <div className="text-center mb-12">
          <Badge className="bg-purple-100 text-purple-800 border-purple-200 mb-4">
            <Heart className="w-4 h-4 mr-2" />
            Divine Treasures
          </Badge>
          <Heading as="h1" size="h1" className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Treasures of Hope
          </Heading>
          <Text className="text-xl text-slate-600 max-w-3xl mx-auto">
            Every story, every prayer, every act of support is a treasure in JAHmere's journey to freedom.
          </Text>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center">
            <Heart className="w-12 h-12 text-red-600 mx-auto mb-6" />
            <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-4">
              Letters of Love
            </Heading>
            <Text className="text-slate-600 mb-6">
              8,421 letters sent to Judge Ferrero asking for mercy
            </Text>
            <Button variant="outline" className="w-full">
              Read Letters
            </Button>
          </Card>

          <Card className="p-8 text-center">
            <Star className="w-12 h-12 text-yellow-600 mx-auto mb-6" />
            <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-4">
              Character Witnesses
            </Heading>
            <Text className="text-slate-600 mb-6">
              47 people who know JAHmere speaking for his character
            </Text>
            <Button variant="outline" className="w-full">
              View Witnesses
            </Button>
          </Card>

          <Card className="p-8 text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-6" />
            <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-4">
              Community Support
            </Heading>
            <Text className="text-slate-600 mb-6">
              15,000+ people praying and supporting JAHmere's freedom
            </Text>
            <Button variant="outline" className="w-full">
              Join Community
            </Button>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Explore All Treasures
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Container>
    </div>
  )
}

export { DivineTreasuresDemo }
export default withErrorBoundary(DivineTreasuresDemo, "DivineTreasuresDemo") 