import { Metadata } from 'next'
import Link from 'next/link'
import { PageLayout } from '@/components/layout/site-navigation'
import { Heading, Text } from '@/components/ui/typography'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export const metadata: Metadata = {
  title: 'JAHmere Webb Freedom Portal',
  description: 'Supporting JAHmere Webb\'s journey to freedom.',
}

export default function HomePage() {
  return (
    <PageLayout showBreadcrumb={false}>
      <Container size="lg" className="py-16">
        <div className="text-center mb-16">
          <Heading as="h1" size="hero" className="mb-6">
            JAHmere Webb
          </Heading>
          <Heading as="h2" size="h2" className="text-blue-600 mb-8">
            Freedom Portal
          </Heading>
          <Text size="xl" variant="secondary" className="mb-8">
            Supporting JAHmere's journey to freedom through community action and advocacy.
          </Text>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card variant="default" className="text-center">
            <Heading as="h3" size="h4" className="mb-4">Community</Heading>
            <Text variant="muted">
              Building support for JAHmere's freedom.
            </Text>
          </Card>
          <Card variant="default" className="text-center">
            <Heading as="h3" size="h4" className="mb-4">Advocacy</Heading>
            <Text variant="muted">
              Working for justice and fair representation.
            </Text>
          </Card>
          <Card variant="default" className="text-center">
            <Heading as="h3" size="h4" className="mb-4">Hope</Heading>
            <Text variant="muted">
              Supporting transformation and positive change.
            </Text>
          </Card>
        </div>

        <Card variant="elevated" className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
          <Heading as="h2" size="h3" className="text-white mb-4">
            Your Voice Matters
          </Heading>
          <Text size="lg" variant="inverse" className="mb-6">
            Join the movement supporting JAHmere's freedom.
          </Text>
          <Link href="/contact">
            <Button variant="secondary" size="lg">
              Take Action
            </Button>
          </Link>
        </Card>
      </Container>
    </PageLayout>
  )
}
