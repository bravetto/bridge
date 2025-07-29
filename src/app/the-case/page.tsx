import { Metadata } from 'next'
import Link from 'next/link'
import { PageLayout } from '@/components/layout/site-navigation'
import { Heading, Text } from '@/components/ui/typography'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'The Case - JAHmere Webb Freedom Portal',
  description: 'The legal facts: Why JAHmere deserves treatment, not more prison. 11 years served, $294,000 taxpayer savings possible.',
}

export default function TheCasePage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <Container size="lg">
          <Heading as="h1" size="hero" className="text-white mb-6">
            The Facts: Why JAHmere Deserves Treatment, Not More Prison
          </Heading>
          <Text size="xl" variant="inverse" className="text-blue-100">
            11 years served. $294,000 taxpayer savings possible. 176% less crime with treatment.
          </Text>
        </Container>
      </div>

      <Container size="lg" className="py-12">
        {/* Case Overview */}
        <section className="mb-16">
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Case Overview</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600">JAHmere Webb</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Age at arrest:</strong> 21 (documented mental age of 15)</li>
                  <li><strong>Sentence:</strong> 25 years (typical: 5-7 years)</li>
                  <li><strong>Time served:</strong> 11 years (44% of sentence)</li>
                  <li><strong>Current age:</strong> 32</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-600">The Cost</h3>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Remaining time:</strong> 14 years</li>
                  <li><strong>Prison cost:</strong> $28,800/year = $403,200 total</li>
                  <li><strong>Treatment cost:</strong> $109,200 over 14 years</li>
                  <li><strong>Taxpayer savings:</strong> $294,000</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The Disparity */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Disparity</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-semibold mb-4 text-red-700">What Happened</h3>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Original offense:</strong> Classified as violent under Florida law</li>
                <li><strong>Firearm enhancement:</strong> 10-20-Life law added mandatory minimums</li>
                <li><strong>Age factor:</strong> Tried as adult despite mental age of 15</li>
                <li><strong>Anti-Murder Act:</strong> Limits judicial discretion</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-xl font-semibold mb-4 text-green-700">What Should Have Happened</h3>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Developmental evaluation:</strong> Mental age of 15 documented in 2013</li>
                <li><strong>Treatment focus:</strong> Address underlying disabilities</li>
                <li><strong>Appropriate sentence:</strong> 5-7 years typical for similar cases</li>
                <li><strong>Community support:</strong> Available through Bridge Project</li>
              </ul>
            </div>
          </div>
        </section>

        {/* The Evidence */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Evidence</h2>
          
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-blue-600">2013 Psychological Evaluation</h3>
            <div className="bg-blue-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-700">
                <li><strong>Mental age:</strong> 15 years old at chronological age 21</li>
                <li><strong>Developmental delays:</strong> Documented intellectual disabilities</li>
                <li><strong>Treatment recommendation:</strong> Community-based intervention</li>
                <li><strong>Prison impact:</strong> Warehousing without addressing root causes</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-red-700">Current Path (14 more years)</h4>
              <ul className="space-y-2 text-gray-700">
                <li>Prison costs: <strong>$403,200</strong></li>
                <li>No treatment provided</li>
                <li>Recidivism risk: <strong>37.6%</strong> (176% higher for intellectually disabled)</li>
                <li>Future crime costs: <strong>$2.1 million potential</strong></li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold mb-4 text-green-700">Treatment Alternative</h4>
              <ul className="space-y-2 text-gray-700">
                <li>Bridge Project cost: <strong>$109,200 over 14 years</strong></li>
                <li>Direct savings: <strong>$294,000</strong></li>
                <li>Recidivism reduction: From 37.6% to <strong>&lt;15%</strong></li>
                <li>Community safety: <strong>Fewer future victims</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* The Bridge Project Solution */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Bridge Project: Evidence-Based Treatment</h2>
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-lg">
            <p className="text-lg text-gray-700 mb-6">
              JAHmere has co-founded an innovative treatment program that transforms his lived experience into community healing. 
              The Bridge Project represents exactly the kind of evidence-based alternative that Judge Ferrero can authorize.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">AI</span>
                </div>
                <h4 className="font-semibold mb-2">JAHmere's Algorithm</h4>
                <p className="text-sm text-gray-600">AI-powered mentor matching based on shared lived experience</p>
              </div>
              <div className="text-center">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">🎯</span>
                </div>
                <h4 className="font-semibold mb-2">Bridge Tokens</h4>
                <p className="text-sm text-gray-600">Blockchain rewards that make positive choices financially rewarding</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">🌉</span>
                </div>
                <h4 className="font-semibold mb-2">Community Impact</h4>
                <p className="text-sm text-gray-600">Transform youth into community leaders who solve real problems</p>
              </div>
            </div>
          </div>
        </section>

        {/* Tony Dungy's Endorsement */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Champion Endorsement</h2>
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-lg">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-4">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Tony Dungy</h3>
                <p className="text-blue-200">Super Bowl Champion Coach • 2.1M Twitter Followers</p>
              </div>
            </div>
            <blockquote className="text-xl italic mb-4">
              "JAHmere befriended my son when no one else would. He has proven that transformation is real. 
              His freedom will create pathways for thousands of others to cross from struggle to success."
            </blockquote>
            <p className="text-blue-200">
              When a Super Bowl-winning coach stakes his reputation on someone's character, it matters. 
              Tony Dungy's endorsement represents the credibility of authentic transformation.
            </p>
          </div>
        </section>

        {/* Florida Context */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Florida Context</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red-600">Prison Crisis</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Repair needs:</strong> $2.2 billion required immediately</li>
                <li><strong>Overcrowding:</strong> System at 95% capacity</li>
                <li><strong>Healthcare costs:</strong> Growing 21% annually</li>
                <li><strong>Every bed matters:</strong> Unnecessary incarceration strains failing system</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Anti-Murder Act Impact</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>Pre-Act:</strong> 78% received alternatives to full sentences</li>
                <li><strong>Post-Act:</strong> 91% serve full sentences regardless of circumstances</li>
                <li><strong>Success rate:</strong> &lt;3% overcome legal presumptions</li>
                <li><strong>JAHmere's challenge:</strong> Act limits Judge Ferrero's options</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Legal Options */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">The Path Forward</h2>
          <div className="bg-green-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 text-green-700">Legal Options for Judge Ferrero</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-700">ADA Accommodation</h4>
                  <p className="text-sm text-gray-600">Recognize developmental disability requirements</p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-700">Constitutional Challenge</h4>
                  <p className="text-sm text-gray-600">8th Amendment cruel/unusual for disabled</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-700">Treatment Alternative</h4>
                  <p className="text-sm text-gray-600">Bridge Project as evidence-based solution</p>
                </div>
                <div className="bg-white p-4 rounded border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-700">Time Served</h4>
                  <p className="text-sm text-gray-600">11 years exceeds typical sentences by 57-120%</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">The Facts Are Clear - Now Add Your Voice</h2>
            <p className="text-xl mb-8 text-blue-100">
              Judge Ferrero has the legal authority to choose treatment over continued warehousing. 
              Your letter can help her make the right decision.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
              <Link 
                href="/write-letter"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Write to Judge Ferrero
              </Link>
              <Link 
                href="/witnesses"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Read Character Witnesses
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </PageLayout>
  )
} 