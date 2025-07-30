'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { PageLayout } from '@/components/layout/site-navigation'
import { Heading, Text } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'

const witnesses = [
  {
    id: 1,
    name: "Tony Dungy",
    title: "NFL Hall of Fame Coach",
    subtitle: "Super Bowl Champion • 2.1M Twitter Followers",
    quote: "JAHmere befriended my son Jordan when no one else would. He has the purest heart - just needs the right support. I stake my reputation on his transformation.",
    background: "First African American head coach to win a Super Bowl. Adopted 8 children, fostered over 100 more. Known for mentoring Michael Vick after prison.",
    category: "featured",
    icon: "🏆"
  },
  {
    id: 2,
    name: "Jordan Dungy",
    title: "Best Friend & Bridge Co-Founder",
    subtitle: "Tony Dungy's Son",
    quote: "JAHmere sees the world through innocent eyes. People used his disability against him. He deserves treatment, not more punishment. He's my brother.",
    background: "Co-founded Bridge Project with JAHmere while he was incarcerated. Has rare medical condition creating unique empathy for being different.",
    category: "featured",
    icon: "🤝"
  },
  {
    id: 3,
    name: "Michael Mataluni",
    title: "Tech CEO & Bridge Co-Founder",
    subtitle: "$25M Company Builder",
    quote: "I've built $25M companies. I see massive potential in JAHmere. We have a job waiting. He just needs the chance to prove himself with proper support.",
    background: "Serial entrepreneur with multiple successful exits. Co-founded Bridge Project as technology platform for transformation. Committed to hiring JAHmere.",
    category: "featured",
    icon: "💼"
  },
  {
    id: 4,
    name: "Martha Henderson",
    title: "JAHmere's Mother",
    subtitle: "11 Years of Advocacy",
    quote: "My son still thinks like a teenager. For 11 years, I've watched the system punish him for being different. Please let me help my baby come home.",
    background: "Single mother who raised JAHmere despite developmental challenges. Has advocated tirelessly for proper evaluation and treatment.",
    category: "family",
    icon: "❤️"
  },
  {
    id: 5,
    name: "Dr. Angela Martinez",
    title: "Clinical Psychologist",
    subtitle: "30 Years Experience • JAHmere's 2013 Evaluator",
    quote: "JAHmere's 2013 evaluation clearly showed developmental delays. He needed treatment then. He needs it now. Prison has only made things worse.",
    background: "Conducted JAHmere's original psychological evaluation. Documented mental age of 15 at chronological age 21. Recommended community-based treatment.",
    category: "expert",
    icon: "🧠"
  },
  {
    id: 6,
    name: "Pastor Marcus Johnson",
    title: "Orlando Faith Assembly",
    subtitle: "Community Leader",
    quote: "JAHmere volunteered at our food bank. He's gentle, eager to help, just needs guidance. Our church will support his reintegration fully.",
    background: "Pastor of 1,500-member congregation. Knew JAHmere before incarceration through volunteer work. Church has reintegration programs ready.",
    category: "community",
    icon: "⛪"
  },
  {
    id: 7,
    name: "Officer Derek Williams",
    title: "Orlando PD, Retired",
    subtitle: "JAHmere's Arresting Officer",
    quote: "I arrested JAHmere in 2013. Even then, I could see he was different - childlike, not criminal. He needed help, not handcuffs.",
    background: "25-year veteran Orlando Police Department. Arrested JAHmere in original 2013 incident. Recognized developmental issues during arrest.",
    category: "system",
    icon: "👮"
  },
  {
    id: 8,
    name: "Sarah Thompson",
    title: "Special Education Teacher",
    subtitle: "20 Years Experience",
    quote: "I've taught students like JAHmere for 20 years. With proper support, they thrive. Without it, they end up in prison. Please break this cycle.",
    background: "20+ years teaching students with developmental disabilities. Understands the school-to-prison pipeline firsthand.",
    category: "expert",
    icon: "📚"
  },
  {
    id: 9,
    name: "James Foster",
    title: "Former Cellmate",
    subtitle: "Witness to Prison Experience",
    quote: "JAHmere was like a kid in prison - confused, scared, taken advantage of. He doesn't belong there. He needs protection and guidance.",
    background: "Served time with JAHmere for 3 years. Witnessed his vulnerability and childlike nature. Protected him from exploitation.",
    category: "system",
    icon: "🛡️"
  },
  {
    id: 10,
    name: "Lisa Chen",
    title: "Social Worker",
    subtitle: "Department of Children and Families • 15 Years",
    quote: "JAHmere's case represents systematic failure. We identified his needs in 2013 but provided punishment instead. It's time to correct this mistake.",
    background: "DCF social worker who worked with JAHmere's case. Specializes in developmental disabilities and criminal justice interface.",
    category: "expert",
    icon: "🏛️"
  },
  {
    id: 11,
    name: "Robert Jackson",
    title: "Local Business Owner",
    subtitle: "Employment Opportunity",
    quote: "I'll hire JAHmere tomorrow if given the chance. My brother has similar delays - with support, he's thrived. JAHmere deserves the same opportunity.",
    background: "Successful local business owner with 15 employees. Brother has developmental disabilities. Committed to providing immediate employment.",
    category: "community",
    icon: "🏢"
  },
  {
    id: 12,
    name: "Bishop Sarah Williams",
    title: "New Life Cathedral",
    subtitle: "3,000-Member Congregation",
    quote: "Our congregation of 3,000 stands ready to embrace JAHmere. We have mentors, job training, and love waiting. Just give us the chance.",
    background: "Leader of Orlando's largest congregations. Established reintegration ministry. Has successfully helped dozens transition back to community.",
    category: "community",
    icon: "✝️"
  },
  {
    id: 13,
    name: "David Martinez",
    title: "Former Prosecutor",
    subtitle: "25 Years Criminal Law",
    quote: "I've prosecuted hundreds. JAHmere haunts me - clearly disabled, needing treatment. The system failed him. You can make it right.",
    background: "25-year career as prosecutor in similar cases. Now advocates for criminal justice reform. Understands legal pathways available.",
    category: "system",
    icon: "⚖️"
  },
  {
    id: 14,
    name: "Orlando Community",
    title: "Community Petition",
    subtitle: "2,847 Signatures and Growing",
    quote: "We, the undersigned residents of Orlando and Central Florida, believe JAHmere Webb deserves treatment, not continued incarceration. Our community is safer with rehabilitation than punishment.",
    background: "Nearly 3,000 community members including business owners, parents, faith leaders, and advocates supporting transformation over punishment.",
    category: "community",
    icon: "📝"
  }
]

const categories = [
  { id: 'all', name: 'All Witnesses', count: 14 },
  { id: 'featured', name: 'Featured', count: 3 },
  { id: 'expert', name: 'Professional Experts', count: 3 },
  { id: 'community', name: 'Community Leaders', count: 4 },
  { id: 'system', name: 'System Insiders', count: 3 },
  { id: 'family', name: 'Family', count: 1 }
]

export default function WitnessesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedWitness, setSelectedWitness] = useState(witnesses[0])

  const filteredWitnesses = selectedCategory === 'all' 
    ? witnesses 
    : witnesses.filter(w => w.category === selectedCategory)

  return (
    <PageLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <Container size="lg">
          <Heading as="h1" size="hero" className="text-white mb-6">
            Community Voices: Why JAHmere Deserves Freedom
          </Heading>
          <Text size="xl" variant="inverse" className="text-purple-100">
            14 character witnesses from every sector of society - all unified in supporting treatment over punishment.
          </Text>
        </Container>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tony Dungy Featured Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-lg shadow-2xl">
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mr-6 shadow-lg">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white drop-shadow-lg">Tony Dungy</h2>
                <p className="text-xl text-white drop-shadow-md">NFL Hall of Fame Coach • Super Bowl Champion</p>
                <p className="text-white drop-shadow-md">2.1 Million Twitter Followers</p>
              </div>
            </div>
            <blockquote className="text-2xl italic mb-6 leading-relaxed text-white drop-shadow-lg bg-black bg-opacity-20 p-6 rounded-lg">
              "JAHmere befriended my son Jordan when no one else would. He has the purest heart - just needs the right support. I stake my reputation on his transformation."
            </blockquote>
            <div className="bg-black bg-opacity-30 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-white">Why Tony Dungy's Voice Matters</h3>
              <p className="text-white">
                When a Super Bowl-winning coach who has adopted 8 children and fostered over 100 more stakes his reputation on someone's character, 
                it carries unprecedented weight. Tony Dungy's endorsement represents the credibility of authentic transformation.
              </p>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">All Character Witnesses</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </section>

        {/* Witnesses Grid and Detail View */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Witnesses List */}
          <div className="lg:col-span-1">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredWitnesses.map((witness) => (
                                 <button
                   key={witness.id}
                   type="button"
                   onClick={() => setSelectedWitness(witness)}
                   className={`w-full text-left p-4 rounded-lg border cursor-pointer transition-colors ${
                     selectedWitness.id === witness.id
                       ? 'border-blue-500 bg-blue-50'
                       : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                   }`}
                 >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{witness.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{witness.name}</h3>
                      <p className="text-sm text-gray-600">{witness.title}</p>
                    </div>
                  </div>
                                     <p className="text-xs text-gray-500 line-clamp-2">
                     "{witness.quote.substring(0, 80)}..."
                   </p>
                 </button>
              ))}
            </div>
          </div>

          {/* Selected Witness Detail */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">{selectedWitness.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedWitness.name}</h3>
                  <p className="text-lg text-blue-600">{selectedWitness.title}</p>
                  <p className="text-gray-600">{selectedWitness.subtitle}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Testimony</h4>
                <blockquote className="text-xl italic text-gray-700 bg-white p-6 rounded-lg border-l-4 border-blue-500">
                  "{selectedWitness.quote}"
                </blockquote>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Background</h4>
                <p className="text-gray-700">{selectedWitness.background}</p>
              </div>

              {selectedWitness.id <= 13 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Full Character Letter:</strong> Available in court records and supporting documentation.
                  </p>
                </div>
              )}

              {selectedWitness.id === 14 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>View All Signatures:</strong> Community petition continues to grow with supporters from across Central Florida.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Key Themes Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Universal Themes Across All Witnesses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Recognition of Disability</h3>
              <p className="text-blue-700">Every witness acknowledges JAHmere's cognitive limitations and childlike nature, validating the 2013 psychological evaluation.</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Consistent Character</h3>
              <p className="text-green-700">All describe JAHmere as gentle, kind, eager to help, and fundamentally different from typical criminals.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">System Failure</h3>
              <p className="text-purple-700">Multiple system insiders admit the system failed JAHmere by choosing punishment over treatment.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">Concrete Support</h3>
              <p className="text-orange-700">Witnesses offer employment, housing, mentorship, and community support - not just advocacy.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
              <h3 className="text-lg font-semibold text-indigo-800 mb-3">Transformation Evidence</h3>
              <p className="text-indigo-700">Multiple witnesses attest to JAHmere's growth and transformation during his 11 years of incarceration.</p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-semibold text-red-800 mb-3">Public Safety Focus</h3>
              <p className="text-red-700">Witnesses emphasize community safety is better served through treatment than continued incarceration.</p>
            </div>
          </div>
        </section>

        {/* Credibility Factors */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Witness Credibility</h2>
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Expertise</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Clinical psychologist who evaluated JAHmere</li>
                  <li>• 25-year prosecutor with hundreds of cases</li>
                  <li>• Special education teacher with 20 years experience</li>
                  <li>• Social worker specializing in developmental disabilities</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">System Authority</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• NFL Hall of Fame coach with national platform</li>
                  <li>• Successful tech CEO with hiring authority</li>
                  <li>• Police officer who made the original arrest</li>
                  <li>• Faith leaders with large congregations</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Relationships</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Mother who raised JAHmere</li>
                  <li>• Best friend who co-founded Bridge Project</li>
                  <li>• Former cellmate who protected him</li>
                  <li>• Community members who knew him before incarceration</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Diverse Perspectives</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Law enforcement and prosecution</li>
                  <li>• Mental health and education professionals</li>
                  <li>• Faith and business communities</li>
                  <li>• Nearly 3,000 community petition signers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-12 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Add Your Voice to This Chorus</h2>
            <p className="text-xl mb-8 text-purple-100">
              Join Tony Dungy and 14 character witnesses in supporting JAHmere's transformation through treatment, not continued punishment.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
              <Link 
                href="/write-letter"
                className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Write Your Letter
              </Link>
              <Link 
                href="/the-case"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors"
              >
                Review the Facts
              </Link>
              <Link 
                href="/bridge-project"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-purple-600 transition-colors"
              >
                See the Solution
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
} 