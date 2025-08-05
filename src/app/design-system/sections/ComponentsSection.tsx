import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioOption } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'

export default function ComponentsSection() {
  const [buttonLoading, setButtonLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [radioValue, setRadioValue] = useState('option1')

  const handleLoadingDemo = () => {
    setButtonLoading(true)
    setTimeout(() => setButtonLoading(false), 2000)
  }

  const radioOptions: RadioOption[] = [
    { value: 'option1', label: 'Option 1', description: 'First option description' },
    { value: 'option2', label: 'Option 2', description: 'Second option description' },
    { value: 'option3', label: 'Option 3', description: 'Third option description' }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <Heading as="h2" size="h2" className="mb-4">Components</Heading>
        <Text variant="muted">Examples of UI components</Text>
      </div>

      {/* Buttons */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Buttons</Heading>
        <div className="space-y-6">
          <div>
            <Text variant="primary" className="font-semibold mb-3">Variants</Text>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>
          
          <div>
            <Text variant="primary" className="font-semibold mb-3">Sizes</Text>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          
          <div>
            <Text variant="primary" className="font-semibold mb-3">States</Text>
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button onClick={handleLoadingDemo}>
                {buttonLoading ? 'Loading...' : 'Loading Demo'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Cards */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Cards</Heading>
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="default">
            <Heading as="h4" size="h4" className="mb-2">Default Card</Heading>
            <Text>Card with shadow and hover effects.</Text>
          </Card>
          
          <Card variant="glass">
            <Heading as="h4" size="h4" className="mb-2">Glass Card</Heading>
            <Text>Glass effect with blur.</Text>
          </Card>
          
          <Card variant="elevated">
            <Heading as="h4" size="h4" className="mb-2">Elevated Card</Heading>
            <Text>Shadow with lift on hover.</Text>
          </Card>
        </div>
      </Card>

      {/* Form Components */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Form Components</Heading>
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Input
                label="Text Input"
                placeholder="Enter your name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="This is helper text"
              />
            </div>
            <div>
              <Input
                label="Input with Error"
                placeholder="Enter email"
                error="Please enter a valid email"
                variant="error"
              />
            </div>
          </div>
          
          <div>
            <Textarea
              label="Textarea"
              placeholder="Enter your message..."
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              rows={4}
              helperText="Maximum 500 characters"
            />
          </div>
          
          <div>
            <RadioGroup
              name="demo-radio"
              label="Radio Group"
              value={radioValue}
              onValueChange={setRadioValue}
              options={radioOptions}
            />
          </div>
        </div>
      </Card>

      {/* Badges */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Badges</Heading>
        <div className="space-y-4">
          <div>
            <Text variant="primary" className="font-semibold mb-3">Variants</Text>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="purple">Purple</Badge>
            </div>
          </div>
          
          <div>
            <Text variant="primary" className="font-semibold mb-3">Sizes</Text>
            <div className="flex flex-wrap items-center gap-2">
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Container */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Container</Heading>
        <div className="space-y-4">
          <Text variant="muted">Responsive containers with padding:</Text>
          <div className="space-y-2 text-sm font-mono">
            <div>sm: max-width 672px</div>
            <div>md: max-width 896px</div>
            <div>lg: max-width 1152px (default)</div>
            <div>xl: max-width 1280px</div>
          </div>
        </div>
      </Card>
    </div>
  )
}