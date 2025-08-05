import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'

export default function TypographySection() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Heading as="h2" size="h2" className="mb-4">Typography</Heading>
        <Text variant="muted">Accessible typography system</Text>
      </div>

      {/* Headings */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Headings</Heading>
        <div className="space-y-4">
          <Heading as="h1" size="hero">Hero Heading</Heading>
          <Heading as="h1" size="h1">Heading 1</Heading>
          <Heading as="h2" size="h2">Heading 2</Heading>
          <Heading as="h3" size="h3">Heading 3</Heading>
          <Heading as="h4" size="h4">Heading 4</Heading>
          <Heading as="h5" size="h5">Heading 5</Heading>
          <Heading as="h6" size="h5">Heading 6</Heading>
        </div>
      </Card>

      {/* Body Text */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Body Text</Heading>
        <div className="space-y-4">
          <Text size="xl">Extra large body text for emphasis</Text>
          <Text size="lg">Large body text for important content</Text>
          <Text size="base">Regular body text for most content</Text>
          <Text size="sm">Small text for secondary information</Text>
          <Text size="xs">Extra small text for captions</Text>
        </div>
      </Card>

      {/* Text Variants */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Text Variants</Heading>
        <div className="space-y-4">
          <Text variant="primary">Primary text color</Text>
          <Text variant="secondary">Secondary text color</Text>
          <Text variant="muted">Muted text color</Text>
          <Text variant="inverse">Inverse text color</Text>
        </div>
      </Card>
    </div>
  )
}