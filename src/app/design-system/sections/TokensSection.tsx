import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'

export default function TokensSection() {
  const designTokens = [
    {
      category: 'Spacing',
      tokens: [
        { name: '--spacing-xs', value: '0.25rem', usage: '4px - Minimal spacing' },
        { name: '--spacing-sm', value: '0.5rem', usage: '8px - Small spacing' },
        { name: '--spacing-md', value: '1rem', usage: '16px - Default spacing' },
        { name: '--spacing-lg', value: '1.5rem', usage: '24px - Large spacing' },
        { name: '--spacing-xl', value: '2rem', usage: '32px - Extra large spacing' }
      ]
    },
    {
      category: 'Typography',
      tokens: [
        { name: '--text-xs', value: '0.75rem', usage: '12px - Captions' },
        { name: '--text-sm', value: '0.875rem', usage: '14px - Small text' },
        { name: '--text-md', value: '1rem', usage: '16px - Body text' },
        { name: '--text-lg', value: '1.125rem', usage: '18px - Large text' },
        { name: '--text-xl', value: '1.25rem', usage: '20px - Extra large' }
      ]
    },
    {
      category: 'Animation',
      tokens: [
        { name: '--animation-speed-fast', value: '150ms', usage: 'Quick interactions' },
        { name: '--animation-speed-normal', value: '250ms', usage: 'Standard transitions' },
        { name: '--animation-speed-slow', value: '350ms', usage: 'Emphasized animations' },
        { name: '--animation-ease', value: 'cubic-bezier(0.4, 0, 0.2, 1)', usage: 'Natural easing' }
      ]
    }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <Heading as="h2" size="h2" className="mb-4">Design Tokens</Heading>
        <Text variant="muted">CSS custom properties for consistent design</Text>
      </div>

      {designTokens.map((category) => (
        <Card key={category.category} className="p-8">
          <Heading as="h3" size="h3" className="mb-6">{category.category}</Heading>
          <div className="space-y-4">
            {category.tokens.map((token) => (
              <div key={token.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Text variant="primary" className="font-mono font-semibold">{token.name}</Text>
                  <Text size="sm" variant="muted">{token.usage}</Text>
                </div>
                <div className="text-right">
                  <Text variant="primary" className="font-mono">{token.value}</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}

      {/* Usage Example */}
      <Card className="p-8 bg-blue-50">
        <Heading as="h3" size="h3" className="mb-4">Usage Example</Heading>
        <pre className="text-sm bg-white p-4 rounded-lg border overflow-x-auto">
{`.my-component {
  padding: var(--spacing-md);
  font-size: var(--text-lg);
  transition: all var(--animation-speed-normal) var(--animation-ease);
}`}
        </pre>
      </Card>
    </div>
  )
}