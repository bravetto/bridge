'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface CharacterWitness {
  id: string
  name: string
  role: string
  credibilityLevel: 'celebrity' | 'community' | 'personal'
  quote: string
  trustIndicator: string
  profileImage: string
}

interface WitnessCardProps {
  witness: CharacterWitness
}

export function WitnessCard({ witness }: WitnessCardProps) {
  const getCredibilityColor = (level: string) => {
    switch (level) {
      case 'celebrity':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'community':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'personal':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCredibilityIcon = (level: string) => {
    switch (level) {
      case 'celebrity':
        return '⭐'
      case 'community':
        return '🏛️'
      case 'personal':
        return '👥'
      default:
        return '📝'
    }
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200 border border-blue-200">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-100">
            <Image
              src={witness.profileImage}
              alt={`${witness.name} profile`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
                         {/* Header */}
               <div className="flex items-center justify-between mb-2">
                 <h3 className="text-lg font-semibold text-gray-900 truncate">
                   {witness.name}
                 </h3>
                 <div className="flex items-center space-x-2">
                   <Badge className={`${getCredibilityColor(witness.credibilityLevel)}`}>
                     {getCredibilityIcon(witness.credibilityLevel)} {witness.trustIndicator}
                   </Badge>
                   <div className="w-2 h-2 bg-green-400 rounded-full" title="Verified Character Reference"></div>
                 </div>
               </div>

          {/* Role */}
          <p className="text-sm text-blue-600 font-medium mb-3">
            {witness.role}
          </p>

                           {/* Quote */}
                 <blockquote className="text-gray-700 italic leading-relaxed border-l-4 border-blue-200 pl-4 py-2 bg-blue-50/30 rounded-r">
                   "{witness.quote}"
                 </blockquote>

                 {/* Enhanced Social Proof Indicators */}
                 <div className="mt-4 flex items-center justify-between text-xs">
                   <div className="flex items-center text-gray-500">
                     <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                     Character Reference • Social Proof
                   </div>
                   <div className="flex items-center space-x-2 text-blue-600">
                     <span className="font-medium">✓ Verified</span>
                     <span className="text-gray-400">•</span>
                     <span className="font-medium">Authentic</span>
                   </div>
                 </div>
        </div>
      </div>
    </Card>
  )
} 