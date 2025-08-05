import { Metadata } from 'next'
import Link from 'next/link'
import { Heading, Text } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'


export const metadata: Metadata = {
  title: 'JAHmere Webb Freedom Portal',
  description: 'Supporting JAHmere Webb\'s journey to freedom.',
}

function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-16 sm:py-20 shadow-lg">
        <Container size="lg">
          <div className="text-center">
            <Heading as="h1" size="hero" className="text-white mb-6">
              JAHmere Webb Needs Treatment, Not More Prison
            </Heading>
            <Text size="xl" variant="inverse" className="mb-8 max-w-4xl mx-auto leading-relaxed">
              After 12 years in the system for a crime committed with the mental capacity of a 15-year-old, 
              JAHmere deserves a chance at treatment and redemption. Judge Ferrero can choose rehabilitation over warehousing.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/write-letter">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto min-w-[200px]">
                  Write to Judge Ferrero
                </Button>
              </Link>
              <Link href="/the-case">
                <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] border-white text-white hover:bg-white hover:text-blue-900">
                  Learn the Facts
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container size="lg" className="py-16">
        {/* Key Facts Section */}
        <div className="text-center mb-16">
          <Heading as="h2" size="h2" className="mb-8 text-gray-900">
            The Facts Speak for Themselves
          </Heading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">12 Years</div>
              <Text className="text-gray-700">In the system since 2013</Text>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">$294K</div>
              <Text className="text-gray-700">Taxpayer savings with treatment</Text>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200 sm:col-span-2 lg:col-span-1">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">176%</div>
              <Text className="text-gray-700">Less crime with treatment vs. prison</Text>
            </div>
          </div>
        </div>

        {/* The Bridge Trinity */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Heading as="h2" size="h2" className="mb-4 text-gray-900">
              The Bridge Trinity
            </Heading>
            <Text className="text-gray-600 max-w-3xl mx-auto">
              Three men united by transformation: JAHmere (The Heart), Jordan Dungy (The Voice), and Michael Mataluni (The Mind). 
              Together, they represent a complete architecture for systemic change.
            </Text>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="p-6 text-center border-red-200 bg-red-50">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">❤️</div>
              <Heading as="h3" size="h3" className="mb-2 text-red-900">JAHmere Webb</Heading>
              <Text className="text-red-700 font-medium mb-2">The Heart</Text>
              <Text className="text-gray-600 text-sm">Bridge Builder who became The Bridge</Text>
            </Card>
            
            <Card className="p-6 text-center border-green-200 bg-green-50">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">📢</div>
              <Heading as="h3" size="h3" className="mb-2 text-green-900">Jordan Dungy</Heading>
              <Text className="text-green-700 font-medium mb-2">The Voice</Text>
              <Text className="text-gray-600 text-sm">Tony Dungy's son, movement amplifier</Text>
            </Card>
            
            <Card className="p-6 text-center border-blue-200 bg-blue-50 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto">🧠</div>
              <Heading as="h3" size="h3" className="mb-2 text-blue-900">Michael Mataluni</Heading>
              <Text className="text-blue-700 font-medium mb-2">The Mind</Text>
              <Text className="text-gray-600 text-sm">Tech CEO, economic architect</Text>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/founders">
              <Button variant="outline" size="lg">
                Meet The Bridge Trinity
              </Button>
            </Link>
          </div>
        </div>

        {/* Character Witnesses Preview */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <Heading as="h2" size="h2" className="mb-4 text-gray-900">
              Voices of Support
            </Heading>
            <Text className="text-gray-600 max-w-2xl mx-auto">
              Community leaders, family, and friends stand with JAHmere, believing in his potential for transformation.
            </Text>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="p-6 bg-yellow-50 border-yellow-200">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">🏆</div>
                <div>
                  <Text className="font-semibold text-gray-900">Tony Dungy</Text>
                  <Text className="text-sm text-gray-600">NFL Hall of Fame Coach</Text>
                </div>
              </div>
              <Text className="text-gray-700 text-sm italic">
                "JAHmere has the purest heart - just needs the right support. I believe strongly in his potential."
              </Text>
            </Card>
            
            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">🤝</div>
                <div>
                  <Text className="font-semibold text-gray-900">Jordan Dungy</Text>
                  <Text className="text-sm text-gray-600">Best Friend & Co-Founder</Text>
                </div>
              </div>
              <Text className="text-gray-700 text-sm italic">
                "JAHmere sees the world through innocent eyes. He deserves treatment, not more punishment."
              </Text>
            </Card>
            
            <Card className="p-6 bg-green-50 border-green-200 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="text-2xl mr-3">💼</div>
                <div>
                  <Text className="font-semibold text-gray-900">Michael Mataluni</Text>
                  <Text className="text-sm text-gray-600">Tech CEO & Co-Founder</Text>
                </div>
              </div>
              <Text className="text-gray-700 text-sm italic">
                "I see massive potential in JAHmere. We have a job waiting. He just needs the chance."
              </Text>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/witnesses">
              <Button variant="outline" size="lg">
                Read All Testimonials
              </Button>
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gray-50 p-8 sm:p-12 rounded-lg border border-gray-200">
          <Heading as="h2" size="h2" className="mb-4 text-gray-900">
            Your Voice Can Make the Difference
          </Heading>
          <Text className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Judge Ferrero will decide JAHmere's future on August 25th, 2025. 
            Your letter could be the difference between treatment and more warehousing.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/write-letter">
              <Button size="lg" className="w-full sm:w-auto min-w-[200px]">
                Write Your Letter Now
              </Button>
            </Link>
            <Link href="/the-case">
              <Button variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px]">
                Get the Full Story
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </>
  )
}

export default HomePage
