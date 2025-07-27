'use client'

import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/typography'
import { withErrorBoundary } from '@/components/ui/error-boundary'

interface TestimonialCardProps {
  name?: string
  role?: string
  content?: string
}

function TestimonialCard({ 
  name = "Character Witness", 
  role = "Community Member",
  content = "JAHmere deserves a second chance."
}: TestimonialCardProps) {
  return (
    <Card className="p-6">
      <Text className="text-slate-700 italic mb-4">"{content}"</Text>
      <div>
        <Text className="font-semibold text-slate-900">{name}</Text>
        <Text className="text-sm text-slate-600">{role}</Text>
      </div>
    </Card>
  )
}

export default withErrorBoundary(TestimonialCard, "TestimonialCard") 