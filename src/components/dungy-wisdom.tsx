'use client'

import { Container } from '@/components/ui/container'
import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'
import { withErrorBoundary } from '@/components/ui/error-boundary'

function DungyWisdom() {
  return (
    <section className="py-16 bg-slate-50">
      <Container>
        <Card className="p-8 text-center">
          <Heading as="h2" size="h2" className="text-2xl font-bold text-slate-900 mb-4">
            Tony Dungy's Wisdom
          </Heading>
          <Text className="text-slate-600">
            "JAHmere has the purest heart. He just needs the right support."
          </Text>
        </Card>
      </Container>
    </section>
  )
}

export default withErrorBoundary(DungyWisdom, "DungyWisdom") 