import { Metadata } from 'next'
import Link from 'next/link'

import { Heading, Text } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'


export const metadata: Metadata = {
  title: 'Jordan Dungy - JAHmere Webb Freedom Portal',
  description: 'Confidence Support Specialist & Bridge Project Co-Founder. Son of Tony Dungy, helping people discover their potential.',
}

function JordanDungyPage() {
  return (
    <>
      {/* Hero Section */}
              <div className="bg-blue-700 text-white py-16 shadow-lg">
        <Container size="lg">
          <Heading as="h1" size="hero" className="text-white mb-6">
            Jordan Dungy
          </Heading>
          <Text size="xl" variant="inverse" className="text-green-100">
            Confidence Support Specialist | The Bridge Project Co-Founder
          </Text>
          <Text size="lg" variant="inverse" className="text-green-200 mt-4">
            "Helping people discover their potential"
          </Text>
        </Container>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Approach Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Approach</h2>
          <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-500">
            <Text className="text-lg text-green-800 mb-4">
              Jordan helps people build confidence and explore their capabilities. Whether helping someone navigate technology 
              or supporting a friend's goals, Jordan creates encouraging environments where people can grow.
            </Text>
          </div>
        </section>

        {/* Foundation Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Foundation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-blue-50 border-l-4 border-blue-500">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Favorite Scripture</h3>
              <Text className="text-blue-700 italic mb-4">
                "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, 
                for the Lord your God will be with you wherever you go."
              </Text>
              <Text className="text-sm text-blue-600">- Joshua 1:9</Text>
            </Card>
            
            <Card className="p-6 bg-orange-50 border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">813 Born & Raised</h3>
              <Text className="text-orange-700 mb-4">
                Tampa Bay area roots. Jordan brings authentic Florida community spirit to his work.
              </Text>
              <Text className="text-sm text-orange-600 font-semibold">
                Life Philosophy: "Everything happens for a reason, whether it's good or bad. Just because it's bad doesn't mean it's bad."
              </Text>
            </Card>
          </div>
        </section>

        {/* Background Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Background</h2>
          <div className="bg-purple-50 p-8 rounded-lg border-l-4 border-purple-500">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Academic Achievement</h3>
                <Text className="text-purple-700 mb-4">
                  Graduated high school with a <strong>4.0 GPA</strong>. Left college to pursue personal interests 
                  including jet skiing and outdoor activities.
                </Text>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-800 mb-3">Values Freedom</h3>
                <Text className="text-purple-700">
                  Jordan enjoys jet skiing, outdoor time, and flexible living. He demonstrates that success 
                  can include personal fulfillment and happiness.
                </Text>
              </div>
            </div>
          </div>
        </section>

        {/* Strengths Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Strengths</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Clear Communication</h3>
              <Text size="sm" variant="muted">Explains concepts in accessible ways</Text>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Support</h3>
              <Text size="sm" variant="muted">Comfortable with repeated questions and learning processes</Text>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Encouragement</h3>
              <Text size="sm" variant="muted">Helps people feel more confident about their abilities</Text>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Enthusiasm</h3>
              <Text size="sm" variant="muted">Gets excited about other people's progress and potential</Text>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Alternative Perspectives</h3>
              <Text size="sm" variant="muted">Shows that success can include joy and personal freedom</Text>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Testimonials</h2>
          <div className="space-y-6">
            <Card className="p-6 bg-blue-50 border-l-4 border-blue-500">
              <Text className="text-blue-800 italic mb-4">
                "Jordan is smart and I enjoy watching him succeed - he has a gift for helping people feel more capable."
              </Text>
              <Text className="text-sm text-blue-600 font-semibold">- Michael</Text>
            </Card>
            
            <Card className="p-6 bg-green-50 border-l-4 border-green-500">
              <Text className="text-green-800 italic mb-4">
                "She felt good when I helped her with her phone."
              </Text>
              <Text className="text-sm text-green-600 font-semibold">- Jordan on supporting others</Text>
            </Card>

            <Card className="p-6 bg-purple-50 border-l-4 border-purple-500">
              <Text className="text-purple-800 italic mb-4">
                "JAHmere befriended my son during a difficult time. I believe strongly in his potential for positive change."
              </Text>
              <Text className="text-sm text-purple-600 font-semibold">- Tony Dungy</Text>
            </Card>
          </div>
        </section>

        {/* Bridge Project Role */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Bridge Project Role</h2>
          <div className="bg-green-50 p-8 rounded-lg border border-green-200">
            <Heading as="h2" size="h2" className="mb-4 text-green-900">
              🏆 Championship Leadership
            </Heading>
            <Text className="text-green-700 mb-4">
              Jordan Dungy represents the championship mindset and leadership excellence that JAHmere Webb embodies.
            </Text>
          </div>
        </section>

        {/* Commitment */}
        <section className="mb-16">
          <div className="bg-blue-700 text-white p-12 rounded-lg text-center shadow-lg border-l-4 border-green-500">
            <h2 className="text-3xl font-bold mb-6">Commitment</h2>
            <Text size="xl" className="text-white italic">
              "Many people feel better about themselves after we work together. That's meaningful work, 
              and life should include both purpose and enjoyment."
            </Text>
          </div>
        </section>

        {/* Navigation */}
        <section className="text-center">
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Link 
              href="/bridge-project"
              className="inline-block bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors shadow-lg border border-green-500"
            >
              Learn About Bridge Project
            </Link>
            <Link 
              href="/witnesses"
              className="inline-block border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-600 hover:text-white transition-colors"
            >
              Read Character Witnesses
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default JordanDungyPage 