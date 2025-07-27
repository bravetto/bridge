'use client'

import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'
import { withErrorBoundary } from '@/components/ui/error-boundary'

function LettersOfHope() {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-12">
          <Heading as="h2" size="h2" className="text-3xl font-bold text-slate-900 mb-4">
            Letters of Hope
          </Heading>
          <Text className="text-xl text-slate-600">
            47 character witnesses standing with JAHmere
          </Text>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <Text className="text-slate-700 italic mb-4">
                "JAHmere deserves a second chance..."
              </Text>
              <Text className="font-semibold text-slate-900">Character Witness {i}</Text>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default withErrorBoundary(LettersOfHope, "LettersOfHope") 