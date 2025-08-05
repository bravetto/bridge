import { Metadata } from 'next'
import Link from 'next/link'

import { Heading, Text } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { PageLayout } from '@/components/layout/site-navigation'

export const metadata: Metadata = {
  title: 'Michael Mataluni - JAHmere Webb Freedom Portal',
  description: 'Tech CEO & Bridge Project Co-Founder. Building technology solutions that create meaningful opportunities for people who need them most.',
}

function MichaelMataluniPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
              <div className="bg-blue-700 text-white py-16 shadow-lg">
        <Container size="lg">
          <Heading as="h1" size="hero" className="text-white mb-6">
            Michael Mataluni
          </Heading>
          <Text size="xl" variant="inverse" className="text-white mb-8">
            Tech CEO & Bridge Project Co-Founder
          </Text>
          <Text size="lg" variant="inverse" className="text-white/90 max-w-3xl">
            "Building technology solutions that create meaningful opportunities for people who need them most."
          </Text>
        </Container>
      </div>

      {/* Profile Overview */}
      <Container size="lg" className="py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <Heading as="h2" size="h2" className="mb-6">
              Leadership & Vision
            </Heading>
            <Text size="lg" className="mb-6">
              Michael Mataluni brings over 15 years of technology leadership experience to The Bridge Project, 
              focusing on building systems that create employment opportunities and support pathways for individuals 
              seeking fresh starts.
            </Text>
            <Text className="mb-6">
              His approach combines practical technology solutions with human-centered design, 
              working to bridge the gap between technical capability and real-world impact.
            </Text>
          </div>
          
          <Card className="p-8">
            <Heading as="h3" size="h3" className="mb-4 text-blue-800">
              Core Expertise
            </Heading>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Technology platform development and scaling</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Employment systems and workforce development</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Strategic partnerships and community building</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Social impact technology implementation</span>
              </li>
            </ul>
          </Card>
        </div>
      </Container>

      {/* Bridge Project Role */}
      <div className="bg-gray-50 py-16">
        <Container size="lg">
          <Heading as="h2" size="h2" className="text-center mb-12">
            The Bridge Project Mission
          </Heading>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="text-3xl mb-4">🏗️</div>
              <Heading as="h3" size="h3" className="mb-3 text-blue-800">
                Platform Builder
              </Heading>
              <Text size="sm">
                Developing technology infrastructure that connects individuals with employment opportunities, 
                treatment resources, and support systems.
              </Text>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="text-3xl mb-4">🤝</div>
              <Heading as="h3" size="h3" className="mb-3 text-green-800">
                Partnership Focused
              </Heading>
              <Text size="sm">
                Building relationships with employers, treatment providers, and community organizations 
                to create comprehensive support networks.
              </Text>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="text-3xl mb-4">📈</div>
              <Heading as="h3" size="h3" className="mb-3 text-purple-800">
                Impact Driven
              </Heading>
              <Text size="sm">
                Measuring success through meaningful outcomes: job placements, treatment completions, 
                and sustainable life changes.
              </Text>
            </Card>
          </div>
        </Container>
      </div>

      {/* Philosophy & Approach */}
      <Container size="lg" className="py-16">
        <div className="max-w-4xl mx-auto">
          <Heading as="h2" size="h2" className="text-center mb-12">
            Leadership Philosophy
          </Heading>
          
          <div className="space-y-8">
            <Card className="p-8">
              <Heading as="h3" size="h3" className="mb-4 text-blue-800">
                Technology with Purpose
              </Heading>
              <Text className="mb-4">
                "Technology should solve real problems for real people. Our focus is building systems 
                that create opportunities and remove barriers, not just impressive features."
              </Text>
              <Text size="sm" variant="muted">
                This philosophy guides The Bridge Project's development approach, prioritizing user needs 
                and measurable outcomes over technical complexity.
              </Text>
            </Card>
            
            <Card className="p-8">
              <Heading as="h3" size="h3" className="mb-4 text-green-800">
                Collaborative Growth
              </Heading>
              <Text className="mb-4">
                Michael believes that sustainable change happens through partnership. The Bridge Project 
                works with existing organizations rather than replacing them, building connections that 
                strengthen the entire support ecosystem.
              </Text>
              <Text size="sm" variant="muted">
                This approach has led to partnerships with treatment centers, employers, and community 
                organizations across multiple states.
              </Text>
            </Card>
            
            <Card className="p-8">
              <Heading as="h3" size="h3" className="mb-4 text-purple-800">
                Continuous Learning
              </Heading>
              <Text className="mb-4">
                "Every person we work with teaches us something new about what support really looks like. 
                Our platform evolves based on real feedback from real experiences."
              </Text>
              <Text size="sm" variant="muted">
                This iterative approach ensures The Bridge Project remains responsive to user needs 
                and changing circumstances.
              </Text>
            </Card>
          </div>
        </div>
      </Container>

      {/* Personal Commitment */}
      <div className="bg-blue-50 py-16">
        <Container size="lg">
          <div className="max-w-3xl mx-auto text-center">
            <Heading as="h2" size="h2" className="mb-8">
              Personal Commitment to JAHmere's Case
            </Heading>
            <Text size="lg" className="mb-6">
              "JAHmere's story represents exactly why The Bridge Project exists. When someone is ready 
              to change their life, they deserve access to the tools and support that make that change possible."
            </Text>
            <Text className="mb-8">
              Michael has committed to providing JAHmere with employment opportunities through The Bridge Project's 
              network, demonstrating the platform's practical application in supporting individual transformation.
            </Text>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Text size="sm" variant="muted" className="italic">
                "Technology can't solve everything, but it can remove barriers and create pathways. 
                That's what we're building - pathways to better outcomes."
              </Text>
            </div>
          </div>
        </Container>
      </div>

      {/* Call to Action */}
      <Container size="lg" className="py-16 text-center">
        <Heading as="h2" size="h2" className="mb-6">
          Learn More About The Bridge Project
        </Heading>
        <Text size="lg" className="mb-8 max-w-2xl mx-auto">
          Discover how technology and community partnership can create meaningful opportunities 
          for individuals seeking fresh starts.
        </Text>
        <Link href="/bridge-project">
          <Button size="lg">
            Explore The Bridge Project
          </Button>
        </Link>
      </Container>
    </PageLayout>
  )
}

export default MichaelMataluniPage 