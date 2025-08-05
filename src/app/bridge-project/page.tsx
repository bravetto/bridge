import { Metadata } from 'next'
import Link from 'next/link'

import { Heading, Text } from '@/components/ui/typography'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'The Bridge Project - JAHmere Webb Freedom Portal',
  description: 'Revolutionary AI-powered platform transforming lives through mentor matching and blockchain rewards. Evidence-based treatment alternative.',
}

function BridgeProjectPage() {
  return (
    <>
      {/* Hero Section */}
              <div className="bg-blue-800 text-white py-16 shadow-lg">
        <Container size="lg">
          <Heading as="h1" size="hero" className="text-white mb-6">
            The Bridge Project: From Prison to Purpose
          </Heading>
          <Text size="xl" variant="inverse" className="text-purple-100">
            A structured reentry program supporting formerly incarcerated individuals in their journey back to society
          </Text>
        </Container>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Co-Founders Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Three Co-Founders, One Vision</h2>
          <div className="mb-8 bg-blue-100 p-6 rounded-lg border-l-4 border-blue-600">
            <Text className="text-blue-800 font-medium">
              🎯 <span className="font-semibold">Mission Critical:</span> Support JAHmere Webb's freedom advocacy for his August 25th, 2025 court date.
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-3">JAHmere Webb</h3>
              <p className="text-blue-700 mb-4">Co-Founder & Lived Experience Expert</p>
              <p className="text-sm text-blue-600">
                12 years of growth in the system since 2013. Developed the AI algorithm for mentor matching based on shared experiences.
              </p>
            </div>
            
                            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-green-500">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-3">
                <Link href="/jordan-dungy" className="hover:underline">Jordan Dungy</Link>
              </h3>
              <p className="text-green-700 mb-4">Co-Founder & Confidence Support Specialist</p>
              <p className="text-sm text-green-600">
                <strong>Tony Dungy's son with full family backing.</strong> 4.0 GPA graduate who chose personal fulfillment over traditional paths. 
                Helps people build confidence and explore their potential. Personal friendship with JAHmere spans years.
              </p>
              <div className="mt-3 p-3 bg-green-50 rounded border-l-2 border-green-500">
                <p className="text-xs text-green-600">
                  <strong>Foundation:</strong> "Be strong and courageous... for the Lord your God will be with you wherever you go." - Joshua 1:9
                </p>
              </div>
              <div className="mt-2 p-3 bg-green-50 rounded border-l-2 border-green-500">
                <p className="text-xs text-green-600">
                  <strong>Approach:</strong> Shows young people that success can include both achievement and personal happiness.
                </p>
              </div>
              <div className="mt-3 p-3 bg-white rounded border-l-2 border-blue-500">
                <p className="text-xs text-blue-700 italic">
                  "JAHmere befriended my son during a difficult time. I believe strongly in his potential for positive change." - Tony Dungy
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-orange-500">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a2 2 0 104 0 2 2 0 00-4 0zm6 0a2 2 0 104 0 2 2 0 00-4 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-orange-800 mb-3">
                <Link href="/michael-mataluni" className="hover:underline">Michael Mataluni</Link>
              </h3>
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
          <div className="bg-blue-700 text-white p-12 rounded-lg shadow-lg border-l-4 border-purple-500">
            <h2 className="text-3xl font-bold mb-6">From Participant to Co-Founder</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-200">The Transformation</h3>
                <p className="text-white mb-4">
                  JAHmere entered prison at 21 with a mental age of 15. Instead of just serving time, 
                  he used his 12 years in the system to develop solutions for others facing similar challenges.
                </p>
                <p className="text-white">
                  His AI algorithm emerged from understanding that traditional matching systems failed 
                  because they didn't account for lived experience and trauma-informed connections.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-200">The Vision</h3>
                <p className="text-purple-100 mb-4">
                  "I realized that my 12 years in the system weren't wasted if I could use them to help others avoid 
                  the same path. The Bridge Project isn't just about me - it's about creating a bridge 
                  for people who need a second chance."
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
                  <li>• Employment opportunity with Michael's company</li>
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
          <div className="bg-blue-800 text-white p-12 rounded-lg shadow-lg border-l-4 border-blue-600">
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
    </>
  )
}

export default BridgeProjectPage 