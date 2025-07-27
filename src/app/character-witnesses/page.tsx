import { Metadata } from 'next'
import { Container } from '@/components/ui/container'
import { WitnessCard } from '@/components/character-witnesses/WitnessCard'
import { characterWitnesses, characterWitnessStats, getHighProfileWitnesses } from '@/data/character-witnesses'

export const metadata: Metadata = {
  title: 'Character Witnesses - JAHmere Webb Freedom Portal',
  description: 'Character references and social proof supporting JAHmere Webb\'s integrity, positive impact, and community contributions.',
  keywords: 'JAHmere Webb, character witnesses, social proof, integrity, community impact',
}

export default function CharacterWitnessesPage() {
  const highProfileWitnesses = getHighProfileWitnesses()
  const personalWitnesses = characterWitnesses.filter(w => w.credibilityLevel === 'personal')

  return (
    <Container className="py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Character Witnesses
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
          Respected community members, leaders, and friends who vouch for JAHmere Webb's 
          character, integrity, and positive impact on the community.
        </p>
        
                       {/* Enhanced Social Proof Stats */}
               <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                 <div className="text-center mb-4">
                   <h3 className="text-lg font-semibold text-gray-900 mb-2">Character Reference Statistics</h3>
                   <p className="text-sm text-gray-600">Verified testimonials from respected community members</p>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                     <div className="text-3xl font-bold text-blue-600 mb-1">{characterWitnessStats.total}</div>
                     <div className="text-sm font-medium text-gray-700">Total References</div>
                     <div className="text-xs text-gray-500 mt-1">✓ All Verified</div>
                   </div>
                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                     <div className="text-3xl font-bold text-purple-600 mb-1">{characterWitnessStats.community}</div>
                     <div className="text-sm font-medium text-gray-700">Community Leaders</div>
                     <div className="text-xs text-gray-500 mt-1">🏛️ Authority</div>
                   </div>
                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                     <div className="text-3xl font-bold text-green-600 mb-1">{characterWitnessStats.personal}</div>
                     <div className="text-sm font-medium text-gray-700">Personal References</div>
                     <div className="text-xs text-gray-500 mt-1">👥 Close Relations</div>
                   </div>
                   <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                     <div className="text-3xl font-bold text-orange-600 mb-1">100%</div>
                     <div className="text-sm font-medium text-gray-700">Positive Impact</div>
                     <div className="text-xs text-gray-500 mt-1">⭐ Unanimous</div>
                   </div>
                 </div>
               </div>
      </div>

      {/* High-Profile Witnesses Section */}
      {highProfileWitnesses.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            High-Profile Character References
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 max-w-4xl mx-auto">
            {highProfileWitnesses.map((witness) => (
              <WitnessCard key={witness.id} witness={witness} />
            ))}
          </div>
        </section>
      )}

      {/* Personal Witnesses Section */}
      {personalWitnesses.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Personal Character References
          </h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
            {personalWitnesses.map((witness) => (
              <WitnessCard key={witness.id} witness={witness} />
            ))}
          </div>
        </section>
      )}

      {/* Social Proof Summary */}
      <section className="bg-blue-50 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">
          Character Speaks Volumes
        </h3>
        <p className="text-gray-700 max-w-2xl mx-auto">
          These character witnesses represent a diverse group of respected individuals 
          who have personally interacted with JAHmere Webb and can attest to his positive 
          character, integrity, and commitment to making a positive impact in his community.
        </p>
        <div className="mt-6 flex justify-center space-x-4 text-sm">
          <span className="bg-white px-3 py-1 rounded-full text-gray-600">
            ✓ Verified Character References
          </span>
          <span className="bg-white px-3 py-1 rounded-full text-gray-600">
            ✓ Community Impact
          </span>
          <span className="bg-white px-3 py-1 rounded-full text-gray-600">
            ✓ Personal Integrity
          </span>
        </div>
      </section>
    </Container>
  )
} 