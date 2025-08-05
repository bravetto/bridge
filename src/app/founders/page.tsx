import React from 'react'
import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/site-navigation'
import Link from 'next/link'


export const metadata: Metadata = {
  title: 'The Bridge Trinity - JAHmere Webb Freedom Portal',
  description: 'Meet the founders: JAHmere Webb (The Heart), Jordan Dungy (The Voice), and Michael Mataluni (The Mind). Three men united by transformation.',
}

function FoundersPage() {
  const founders = [
    {
      name: "JAHmere Webb",
      title: "Founder & The Heart",
      description: "The Bridge Builder who became The Bridge. JAHmere's lived experience from incarceration to transformation gives him unquestionable credibility and the vision to help others make the same journey.",
      badge: "The Heart ❤️",
      href: "/the-case",
      background: "11 years incarcerated, now leading transformation from the center. His experiential authority creates safe spaces and offers hope from the authenticity of his journey.",
      contribution: "Bridge building and transformation leadership",
      position: "center",
      quote: "I don't help people get out of prison. I help them discover they were never meant to be prisoners."
    },
    {
      name: "Jordan Dungy",
      title: "Co-Founder & The Voice",
      description: "Son of NFL Hall of Fame coach Tony Dungy, Jordan brings championship leadership principles and prophetic voice power to amplify JAHmere's mission to the world.",
      badge: "The Voice 📢",
      href: "/jordan-dungy",
      background: "Championship leadership experience with focus on community transformation, narrative power, and movement building through multimedia mastery.",
      contribution: "Strategic leadership and movement amplification",
      position: "left",
      quote: "Every transformed life is a microphone. We're not just changing stories—we're changing the storytellers."
    },
    {
      name: "Michael Mataluni",
      title: "Co-Founder & The Mind",
      description: "Technology executive and strategic architect who transforms vision into sustainable reality, building economic engines that fund freedom and scale transformation.",
      badge: "The Mind 🧠",
      href: "/michael-mataluni",
      background: "Built $25M+ enterprises from ground zero. Mother's imprisonment became entrepreneurial fuel, proving that our greatest pain creates our greatest power.",
      contribution: "Technical architecture and economic transformation",
      position: "right",
      quote: "Every business plan is a freedom plan. Every dollar earned is a life transformed."
    }
  ]

  return (
    <PageLayout>
      <div className="bg-blue-900 text-white border-b border-blue-800">
        <Container size="xl" className="py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <Heading as="h1" size="hero" className="mb-6 text-white">
              The Bridge Trinity
            </Heading>
            <Text size="xl" className="max-w-4xl mx-auto text-blue-100 mb-8">
              A revolutionary leadership model—not a hierarchy, but a trinity of transformation where three men, each carrying unique wounds and gifts, form a complete architecture for systemic change.
            </Text>
            
            {/* Sacred Geometry Visual */}
            <div className="mt-12 mb-8">
              <div className="flex flex-col items-center space-y-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl mb-2 mx-auto">❤️</div>
                  <Text className="text-blue-100 font-semibold">JAHmere Webb</Text>
                  <Text className="text-blue-200 text-sm">THE HEART</Text>
                </div>
                <div className="flex items-center justify-center space-x-16">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center text-xl mb-2">🧠</div>
                    <Text className="text-blue-100 font-semibold">Michael</Text>
                    <Text className="text-blue-200 text-sm">THE MIND</Text>
                  </div>
                  <div className="text-center">
                    <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-xl mb-2">📢</div>
                    <Text className="text-blue-100 font-semibold">Jordan</Text>
                    <Text className="text-blue-200 text-sm">THE VOICE</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-blue-800 p-8 rounded-lg border border-blue-700">
            <Text className="text-blue-100 font-medium text-center text-lg">
              🌉 <span className="font-semibold">The Bridge Trinity:</span> Where three become one, and one transforms millions. This is not merely an organizational chart—it's a spiritual technology where each position amplifies the others, creating exponential transformation power.
            </Text>
          </div>
        </Container>
      </div>

      <Container size="xl" className="py-16">
        {/* Founders Grid */}
        <div className="space-y-12">
          {founders.map((founder) => (
            <Card key={founder.name} className={`p-8 border-2 ${
              founder.position === 'center' ? 'border-red-300 bg-red-50' :
              founder.position === 'left' ? 'border-green-300 bg-green-50' :
              'border-blue-300 bg-blue-50'
            }`}>
              <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-1">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 ${
                      founder.position === 'center' ? 'bg-red-500' :
                      founder.position === 'left' ? 'bg-green-500' :
                      'bg-blue-500'
                    }`}>
                      {founder.badge.includes('❤️') ? '❤️' : founder.badge.includes('📢') ? '📢' : '🧠'}
                    </div>
                    <div>
                      <Heading as="h2" size="h2" className={`mb-1 ${
                        founder.position === 'center' ? 'text-red-900' :
                        founder.position === 'left' ? 'text-green-900' :
                        'text-blue-900'
                      }`}>
                        {founder.name}
                      </Heading>
                      <Text className={`font-medium ${
                        founder.position === 'center' ? 'text-red-700' :
                        founder.position === 'left' ? 'text-green-700' :
                        'text-blue-700'
                      }`}>
                        {founder.title}
                      </Text>
                    </div>
                  </div>
                  <Badge variant="default" className="mb-4">
                    {founder.badge}
                  </Badge>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <Text className="text-gray-700 text-lg">
                    {founder.description}
                  </Text>

                  <div>
                    <Text className="font-semibold text-gray-900 mb-2">Background:</Text>
                    <Text className="text-gray-600">
                      {founder.background}
                    </Text>
                  </div>

                  <div>
                    <Text className="font-semibold text-gray-900 mb-2">Key Contribution:</Text>
                    <Text className="text-gray-600">
                      {founder.contribution}
                    </Text>
                  </div>

                  {founder.quote && (
                    <div className={`p-4 rounded-lg border-l-4 ${
                      founder.position === 'center' ? 'bg-red-100 border-red-500' :
                      founder.position === 'left' ? 'bg-green-100 border-green-500' :
                      'bg-blue-100 border-blue-500'
                    }`}>
                      <Text className={`italic font-medium ${
                        founder.position === 'center' ? 'text-red-800' :
                        founder.position === 'left' ? 'text-green-800' :
                        'text-blue-800'
                      }`}>
                        "{founder.quote}"
                      </Text>
                    </div>
                  )}

                  <div className="pt-4">
                    <Link href={founder.href}>
                      <Button variant="outline" size="sm">
                        Learn More →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trinity in Operation */}
        <div className="mt-16 bg-gray-50 p-8 rounded-lg border border-gray-200">
          <Heading as="h2" size="h2" className="mb-6 text-gray-900 text-center">
            🌟 The Trinity in Sacred Operation
          </Heading>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heading as="h3" size="h3" className="mb-3 text-red-800">
                The Transformation Sequence
              </Heading>
              <div className="space-y-2 text-sm text-gray-700">
                <Text>1. <strong>JAHmere</strong> recognizes and embraces the broken person</Text>
                <Text>2. <strong>Michael</strong> designs their pathway to wholeness</Text>
                <Text>3. <strong>Jordan</strong> ensures their story inspires others</Text>
              </div>
            </div>
            
            <div className="text-center">
              <Heading as="h3" size="h3" className="mb-3 text-blue-800">
                Business Development Flow
              </Heading>
              <div className="space-y-2 text-sm text-gray-700">
                <Text>1. <strong>JAHmere</strong> identifies the human need and divine opportunity</Text>
                <Text>2. <strong>Michael</strong> architects the sustainable business model</Text>
                <Text>3. <strong>Jordan</strong> markets the mission to the masses</Text>
              </div>
            </div>
            
            <div className="text-center">
              <Heading as="h3" size="h3" className="mb-3 text-green-800">
                Policy Change Process
              </Heading>
              <div className="space-y-2 text-sm text-gray-700">
                <Text>1. <strong>JAHmere</strong> provides moral authority from lived experience</Text>
                <Text>2. <strong>Michael</strong> supplies data and economic arguments</Text>
                <Text>3. <strong>Jordan</strong> crafts narratives that move legislators</Text>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Text className="text-gray-600 font-medium">
              The Mathematical Miracle: <span className="text-blue-600 font-bold">1 + 1 + 1 = 111</span> (Exponential, not additive)
            </Text>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Heading as="h2" size="h2" className="mb-4 text-blue-900">
            Join The Bridge Mission
          </Heading>
          <Text className="text-gray-700 mb-8 max-w-3xl mx-auto">
            The Bridge Trinity stands as a living invitation showing that when divine purpose aligns different gifts, when ego submits to mission, when pain transforms into power, anything is possible.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/write-letter">
              <Button size="lg">
                Write a Letter for JAHmere
              </Button>
            </Link>
            <Link href="/the-case">
              <Button variant="outline" size="lg">
                Learn JAHmere's Story
              </Button>
            </Link>
            <Link href="/witnesses">
              <Button variant="outline" size="lg">
                View Character Witnesses
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </PageLayout>
  )
}

export default FoundersPage 