import { Metadata } from 'next'
import Link from 'next/link'
import { PageLayout } from '@/components/layout/site-navigation'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Heading, Text } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'The Bridge Project - JAHmere Webb Freedom Portal',
  description: 'The innovative treatment solution co-founded by JAHmere Webb - transforming lives through technology, mentorship, and community support.',
}

function BridgeProjectPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <Container size="lg">
          <Heading as="h1" size="hero" className="text-white mb-6">
            The Bridge Project: From Prison to Purpose
          </Heading>
          <Text size="xl" variant="inverse" className="text-purple-100">
            JAHmere's innovative treatment solution - transforming lives through technology, mentorship, and community support.
          </Text>
        </Container>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Co-Founders Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Three Co-Founders, One Vision</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-blue-800 mb-3">JAHmere Webb</h3>
              <p className="text-blue-700 mb-4">Co-Founder & Lived Experience Expert</p>
              <p className="text-sm text-blue-600">
                11 years of transformation in the system. Developed the AI algorithm for mentor matching based on shared experiences.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border-l-4 border-green-500">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-green-800 mb-3">Jordan Dungy</h3>
              <p className="text-green-700 mb-4">Co-Founder & Community Bridge</p>
              <p className="text-sm text-green-600">
                Tony Dungy's son. Rare medical condition creates unique empathy. Bridges communities and builds support networks.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border-l-4 border-orange-500">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-orange-800 mb-3">Michael Mataluni</h3>
              <p className="text-orange-700 mb-4">Co-Founder & Technology CEO</p>
              <p className="text-sm text-orange-600">
                $25M company builder. Provides technology platform, employment pathway, and business infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">How The Bridge Project Works</h2>
          
          <div className="space-y-8">
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold text-blue-800">AI-Powered Mentor Matching</h3>
              </div>
              <p className="text-blue-700 mb-4">
                JAHmere's algorithm matches at-risk youth with mentors who have overcome similar challenges. 
                The AI considers background, trauma, interests, and goals to create meaningful connections.
              </p>
              <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                <p className="text-sm text-blue-600">
                  <strong>Innovation:</strong> Unlike traditional programs, our matching considers lived experience, 
                  not just demographics. Someone who overcame addiction mentors someone struggling with addiction.
                </p>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-green-800">Bridge Tokens: Incentivized Transformation</h3>
              </div>
              <p className="text-green-700 mb-4">
                Blockchain-based reward system that makes positive choices financially rewarding. 
                Participants earn tokens for education, job training, community service, and mentorship.
              </p>
              <div className="bg-white p-4 rounded border-l-4 border-green-500">
                <p className="text-sm text-green-600">
                  <strong>Real Impact:</strong> Tokens can be redeemed for education, housing assistance, 
                  job training, or saved for business startup capital.
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold text-purple-800">Community Integration & Employment</h3>
              </div>
              <p className="text-purple-700 mb-4">
                Participants work on real community problems while developing skills. 
                Projects include neighborhood beautification, elder care, youth programs, and small business development.
              </p>
              <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                <p className="text-sm text-purple-600">
                  <strong>Dual Benefit:</strong> Communities get needed services while participants gain 
                  work experience, professional references, and community connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence & Results */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why This Works: The Evidence</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Research-Backed Approach</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Peer mentorship</strong> reduces recidivism by 37% (RAND Corporation)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Employment programs</strong> cut reoffending by 43% (National Institute of Justice)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Community service</strong> increases civic engagement by 65%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span><strong>Incentive programs</strong> improve completion rates by 78%</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Economic Impact</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded">
                  <h4 className="font-semibold text-blue-700">Cost Comparison (14 years)</h4>
                  <div className="mt-2">
                    <p className="text-sm text-red-600">Prison: <span className="font-bold">$403,200</span></p>
                    <p className="text-sm text-green-600">Bridge Project: <span className="font-bold">$109,200</span></p>
                    <p className="text-sm text-blue-600">Savings: <span className="font-bold">$294,000</span></p>
                  </div>
                </div>
                <div className="bg-white p-4 rounded">
                  <h4 className="font-semibold text-blue-700">Community Benefits</h4>
                  <div className="mt-2 text-sm text-blue-600">
                    <p>• 176% reduction in future crime</p>
                    <p>• $2.1M in prevented victim costs</p>
                    <p>• Tax-paying community member</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JAHmere's Personal Journey */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">From Participant to Co-Founder</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-200">The Transformation</h3>
                <p className="text-blue-100 mb-4">
                  JAHmere entered prison at 21 with a mental age of 15. Instead of just serving time, 
                  he used his 11 years to develop solutions for others facing similar challenges.
                </p>
                <p className="text-blue-100">
                  His AI algorithm emerged from understanding that traditional matching systems failed 
                  because they didn't account for lived experience and trauma-informed connections.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-200">The Vision</h3>
                <p className="text-purple-100 mb-4">
                  "I realized that my 11 years weren't wasted if I could use them to help others avoid 
                  the same path. The Bridge Project isn't just about me - it's about creating a bridge 
                  for everyone who needs a second chance."
                </p>
                <p className="text-purple-100">
                  <em>- JAHmere Webb, Co-Founder</em>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Plan */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready for Implementation</h2>
          
          <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-500">
            <h3 className="text-2xl font-semibold text-green-800 mb-6">What Judge Ferrero Can Authorize</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-green-700 mb-3">Immediate Support Structure</h4>
                <ul className="space-y-2 text-green-600">
                  <li>• 24/7 supervision through Bridge Project</li>
                  <li>• Guaranteed employment with Michael's company</li>
                  <li>• Housing assistance through community partners</li>
                  <li>• Ongoing counseling and support services</li>
                  <li>• Community service requirements built-in</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-3">Accountability Measures</h4>
                <ul className="space-y-2 text-green-600">
                  <li>• Weekly check-ins with probation officer</li>
                  <li>• Monthly progress reports to the court</li>
                  <li>• Community service hour tracking</li>
                  <li>• Employment verification requirements</li>
                  <li>• Victim impact awareness programs</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-white p-4 rounded">
              <p className="text-green-700">
                <strong>Legal Precedent:</strong> This type of treatment alternative has been successfully 
                authorized in similar cases under Florida Statute 921.0026, particularly for defendants 
                with documented developmental disabilities.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Support Innovation Over Incarceration</h2>
            <p className="text-xl mb-8 text-purple-100">
              The Bridge Project represents exactly the kind of evidence-based treatment alternative 
              that can transform lives and communities. JAHmere is ready to lead by example.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
              <Link 
                href="/write-letter"
                className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Support This Solution
              </Link>
              <Link 
                href="/witnesses"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors"
              >
                Read Character Witnesses
              </Link>
              <Link 
                href="/the-case"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors"
              >
                Review Legal Facts
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default withErrorBoundary(BridgeProjectPage, "BridgeProjectPage") 