import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'

export default function ColorsSection() {
  const colorPalettes = [
    {
      name: 'Primary Blue',
      description: 'Main brand colors for interactive elements',
      colors: [
        { name: 'blue-50', hex: '#eff6ff', usage: 'Surface backgrounds' },
        { name: 'blue-100', hex: '#dbeafe', usage: 'Subtle accents' },
        { name: 'blue-200', hex: '#bfdbfe', usage: 'Borders and dividers' },
        { name: 'blue-600', hex: '#2563eb', usage: 'Primary brand' },
        { name: 'blue-700', hex: '#1d4ed8', usage: 'Hover states' },
        { name: 'blue-900', hex: '#1e3a8a', usage: 'High contrast text' }
      ]
    },
    {
      name: 'Accent Colors',
      description: 'Context-specific colors for states and highlights',
      colors: [
        { name: 'green-500', hex: '#10b981', usage: 'Success states' },
        { name: 'red-500', hex: '#ef4444', usage: 'Error states' },
        { name: 'orange-500', hex: '#f59e0b', usage: 'Warning states' },
        { name: 'purple-600', hex: '#7c3aed', usage: 'Counter highlights' }
      ]
    }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <Heading as="h2" size="h2" className="mb-4">Color Palette</Heading>
        <Text variant="muted">Color palette for trust and accessibility</Text>
      </div>

      {colorPalettes.map((palette) => (
        <Card key={palette.name} className="p-8">
          <Heading as="h3" size="h3" className="mb-2">{palette.name}</Heading>
          <Text variant="muted" className="mb-6">{palette.description}</Text>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {palette.colors.map((color) => (
              <div key={color.name} className="flex items-center space-x-4">
                <div 
                  className="w-16 h-16 rounded-lg border border-gray-200 shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <div>
                  <Text variant="primary" className="font-semibold">{color.name}</Text>
                  <Text variant="muted" size="sm">{color.hex}</Text>
                  <Text variant="muted" size="xs">{color.usage}</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}