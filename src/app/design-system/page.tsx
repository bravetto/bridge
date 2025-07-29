'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioOption } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Menu, NavBar, MenuItem } from '@/components/ui/menu'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { PageLayout } from '@/components/layout/site-navigation'

function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState('colors')

  const tabs = [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'components', label: 'Components' },
    { id: 'menu', label: 'Menu & Navigation' },
    { id: 'animations', label: 'Animations' },
    { id: 'tokens', label: 'Design Tokens' }
  ]

  return (
    <PageLayout>
      <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50/30">
        <Container size="xl" className="py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Heading as="h1" size="hero" className="mb-4">
            JAHmere Webb Design System
          </Heading>
          <Text size="xl" variant="muted" className="max-w-3xl mx-auto">
            A comprehensive design system built for consistency, accessibility, and developer experience.
            All components use design tokens and follow WCAG 2.1 AA standards.
          </Text>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              onClick={() => setActiveTab(tab.id)}
              className="transition-all duration-200"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        {activeTab === 'colors' && <ColorsSection />}
        {activeTab === 'typography' && <TypographySection />}
        {activeTab === 'components' && <ComponentsSection />}
        {activeTab === 'menu' && <MenuSection />}
        {activeTab === 'animations' && <AnimationsSection />}
        {activeTab === 'tokens' && <TokensSection />}
        </Container>
      </div>
    </PageLayout>
  )
}

// Colors Section
function ColorsSection() {
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
        <Heading as="h2" size="h2" className="mb-4">Color System</Heading>
        <Text variant="muted">Research-backed color palette optimized for trust and accessibility</Text>
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

// Typography Section
function TypographySection() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <Heading as="h2" size="h2" className="mb-4">Typography Scale</Heading>
        <Text variant="muted">Consistent hierarchy using design tokens</Text>
      </div>

      <Card className="p-8">
        <div className="space-y-8">
          <div>
            <Heading as="h1" size="hero">Hero Text (60px)</Heading>
            <Text variant="muted" size="sm">font-size: var(--font-hero) • font-weight: 900</Text>
          </div>
          
          <div>
            <Heading as="h1" size="h1">Heading 1 (48px)</Heading>
            <Text variant="muted" size="sm">font-size: var(--font-h1) • font-weight: 700</Text>
          </div>
          
          <div>
            <Heading as="h2" size="h2">Heading 2 (36px)</Heading>
            <Text variant="muted" size="sm">font-size: var(--font-h2) • font-weight: 700</Text>
          </div>
          
          <div>
            <Heading as="h3" size="h3">Heading 3 (30px)</Heading>
            <Text variant="muted" size="sm">font-size: var(--font-h3) • font-weight: 700</Text>
          </div>
          
          <div>
            <Text size="base">Body text (16px) - This is the standard body text size used throughout the application. It provides optimal readability across all devices.</Text>
            <Text variant="muted" size="sm">font-size: var(--font-body) • line-height: 1.5</Text>
          </div>
          
          <div>
            <Text size="sm">Small text (14px) - Used for captions and secondary information</Text>
            <Text variant="muted" size="sm">font-size: var(--font-small) • line-height: 1.5</Text>
          </div>
        </div>
      </Card>
    </div>
  )
}

// Components Section
function ComponentsSection() {
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
        <Text variant="muted">Interactive examples of all UI components</Text>
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
                {buttonLoading ? 'Loading...' : 'Click for Loading Demo'}
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
            <Text>Standard card with subtle shadow and hover effects.</Text>
          </Card>
          
          <Card variant="glass">
            <Heading as="h4" size="h4" className="mb-2">Glass Card</Heading>
            <Text>Glass morphism effect with backdrop blur.</Text>
          </Card>
          
          <Card variant="elevated">
            <Heading as="h4" size="h4" className="mb-2">Elevated Card</Heading>
            <Text>Enhanced shadow with lift animation on hover.</Text>
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
          <Text variant="muted">Responsive containers with consistent padding:</Text>
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

// Menu Section
function MenuSection() {
  const [selectedMenuVariant, setSelectedMenuVariant] = useState<'default' | 'glass' | 'minimal'>('default')
  const [selectedNavVariant, setSelectedNavVariant] = useState<'default' | 'glass' | 'minimal'>('default')

  // Sample menu items for demonstration
  const sampleMenuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      icon: <HomeIcon />,
      description: 'Return to homepage'
    },
    {
      id: 'case',
      label: 'The Case',
      href: '/the-case',
      icon: <DocumentIcon />,
      description: 'Legal facts and timeline',
      badge: 'Updated'
    },
    {
      id: 'witnesses',
      label: 'Character Witnesses',
      href: '/witnesses',
      icon: <UsersIcon />,
      description: '14 community testimonials'
    },
    {
      id: 'actions',
      label: 'Take Action',
      icon: <BoltIcon />,
      children: [
        { id: 'write-letter', label: 'Write Letter', href: '/write-letter', badge: 'Popular' },
        { id: 'share-story', label: 'Share Story', onClick: () => alert('Share feature coming soon') },
        { id: 'contact-media', label: 'Contact Media', onClick: () => alert('Media contacts available') }
      ]
    },
    {
      id: 'design',
      label: 'Design System',
      href: '/design-system',
      icon: <SwatchIcon />,
      description: 'Component library'
    }
  ]

  const navMenuItems: MenuItem[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'case', label: 'The Case', href: '/the-case' },
    { id: 'witnesses', label: 'Witnesses', href: '/witnesses' },
    { id: 'write-letter', label: 'Write Letter', href: '/write-letter' },
    { id: 'design', label: 'Design System', href: '/design-system' }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <Heading as="h2" size="h2" className="mb-4">Menu & Navigation System</Heading>
        <Text variant="muted">Delightful, performant menu components with smooth animations</Text>
      </div>

      {/* Navigation Bar Demo */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Navigation Bar</Heading>
        <div className="space-y-6">
          <div>
            <Text variant="primary" className="font-semibold mb-3">Variant Selection</Text>
            <div className="flex flex-wrap gap-2 mb-4">
              {(['default', 'glass', 'minimal'] as const).map((variant) => (
                <Button
                  key={variant}
                  variant={selectedNavVariant === variant ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedNavVariant(variant)}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <NavBar
              title="JAHmere Webb Portal"
              menuItems={navMenuItems}
              variant={selectedNavVariant}
              logo={<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">J</div>}
            />
            <div className="p-8 bg-gray-50 text-center">
              <Text variant="muted">Navigation bar preview - resize window to see mobile menu</Text>
            </div>
          </div>
        </div>
      </Card>

      {/* Dropdown Menu Demo */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Dropdown Menu</Heading>
        <div className="space-y-6">
          <div>
            <Text variant="primary" className="font-semibold mb-3">Variant Selection</Text>
            <div className="flex flex-wrap gap-2 mb-4">
              {(['default', 'glass', 'minimal'] as const).map((variant) => (
                <Button
                  key={variant}
                  variant={selectedMenuVariant === variant ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedMenuVariant(variant)}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Bottom Left */}
            <div>
              <Text variant="primary" className="font-semibold mb-3">Bottom Left</Text>
              <Menu
                items={sampleMenuItems}
                variant={selectedMenuVariant}
                position="bottom-left"
                onItemClick={(item) => console.log('Clicked:', item.label)}
              />
            </div>

            {/* Bottom Right */}
            <div className="flex justify-end">
              <div>
                <Text variant="primary" className="font-semibold mb-3">Bottom Right</Text>
                <Menu
                  items={sampleMenuItems}
                  variant={selectedMenuVariant}
                  position="bottom-right"
                  onItemClick={(item) => console.log('Clicked:', item.label)}
                />
              </div>
            </div>

            {/* Custom Trigger */}
            <div>
              <Text variant="primary" className="font-semibold mb-3">Custom Trigger</Text>
              <Menu
                items={sampleMenuItems}
                variant={selectedMenuVariant}
                position="bottom-left"
                trigger={
                  <Button variant="outline" size="md">
                    Actions ▼
                  </Button>
                }
                onItemClick={(item) => console.log('Clicked:', item.label)}
              />
            </div>

            {/* With Badge */}
            <div>
              <Text variant="primary" className="font-semibold mb-3">With Notifications</Text>
              <Menu
                items={sampleMenuItems}
                variant={selectedMenuVariant}
                position="bottom-right"
                trigger={
                  <div className="relative">
                    <Button variant="primary" size="md">
                      Menu
                    </Button>
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </div>
                }
                onItemClick={(item) => console.log('Clicked:', item.label)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Features Overview */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Features</Heading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Text variant="primary" className="font-semibold">Performance</Text>
            </div>
            <Text size="sm" variant="muted">Hardware-accelerated animations, lazy loading, and optimized rendering</Text>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <Text variant="primary" className="font-semibold">Accessibility</Text>
            </div>
            <Text size="sm" variant="muted">Full keyboard navigation, ARIA labels, and screen reader support</Text>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <Text variant="primary" className="font-semibold">Responsive</Text>
            </div>
            <Text size="sm" variant="muted">Mobile-first design with touch-friendly interactions</Text>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <Text variant="primary" className="font-semibold">Customizable</Text>
            </div>
            <Text size="sm" variant="muted">Multiple variants, positions, and styling options</Text>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <Text variant="primary" className="font-semibold">Nested Menus</Text>
            </div>
            <Text size="sm" variant="muted">Support for multi-level menu hierarchies with smooth transitions</Text>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <Text variant="primary" className="font-semibold">TypeScript</Text>
            </div>
            <Text size="sm" variant="muted">Full type safety with comprehensive interfaces</Text>
          </div>
        </div>
      </Card>

      {/* Usage Example */}
      <Card className="p-8 bg-gray-50">
        <Heading as="h3" size="h4" className="mb-4">Usage Example</Heading>
        <pre className="text-sm bg-white p-4 rounded-lg border overflow-x-auto">
{`import { Menu, NavBar, MenuItem } from '@/components/ui/menu'

const menuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: <HomeIcon />,
    description: 'Return to homepage'
  },
  {
    id: 'actions',
    label: 'Actions',
    children: [
      { id: 'action1', label: 'Action 1', onClick: handleAction },
      { id: 'action2', label: 'Action 2', href: '/action2' }
    ]
  }
]

// Dropdown Menu
<Menu 
  items={menuItems}
  variant="glass"
  position="bottom-left"
  onItemClick={handleMenuClick}
/>

// Navigation Bar
<NavBar
  title="My App"
  menuItems={menuItems}
  variant="default"
/>`}
        </pre>
      </Card>
    </div>
  )
}

// Simple icon components for demo
function HomeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <title>Home</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.25-8.25a1.125 1.125 0 0 1 1.59 0L21 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
}

function DocumentIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <title>Document</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  )
}

function UsersIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <title>Users</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <title>Bolt</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
    </svg>
  )
}

function SwatchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <title>Swatch</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M4.098 19.902A3.75 3.75 0 1 0 9.402 14.598l6.401-6.402M4.098 19.902l6.401-6.402m0 0a3.75 3.75 0 0 1 5.304-5.303l6.401 6.402a3.75 3.75 0 1 1-5.304 5.303" />
    </svg>
  )
}

// Animations Section
function AnimationsSection() {
  const [triggerAnimation, setTriggerAnimation] = useState(0)

  const handleTriggerAnimation = () => {
    setTriggerAnimation(prev => prev + 1)
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <Heading as="h2" size="h2" className="mb-4">Animation System</Heading>
        <Text variant="muted">Hardware-accelerated CSS animations with performance optimization</Text>
      </div>

      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Foundation Animations</Heading>
        <div className="space-y-8">
          <div>
            <Button onClick={handleTriggerAnimation} className="mb-4">
              Trigger Animations
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div key={`slide-${triggerAnimation}`} className="slide-up">
              <Card variant="glass">
                <Text className="font-semibold mb-2">Slide Up</Text>
                <Text size="sm" variant="muted">Smooth entrance from bottom</Text>
              </Card>
            </div>
            
            <div key={`fade-${triggerAnimation}`} className="fade-in" style={{ animationDelay: '0.1s' }}>
              <Card variant="glass">
                <Text className="font-semibold mb-2">Fade In</Text>
                <Text size="sm" variant="muted">Gentle opacity transition</Text>
              </Card>
            </div>
            
            <div key={`scale-${triggerAnimation}`} className="scale-in" style={{ animationDelay: '0.2s' }}>
              <Card variant="glass">
                <Text className="font-semibold mb-2">Scale In</Text>
                <Text size="sm" variant="muted">Bounce entrance effect</Text>
              </Card>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Interactive Feedback</Heading>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="hover-lift cursor-pointer">
            <Card>
              <Text className="font-semibold mb-2">Hover Lift</Text>
              <Text size="sm" variant="muted">Subtle lift on hover</Text>
            </Card>
          </div>
          
          <div className="card-hover cursor-pointer">
            <Card>
              <Text className="font-semibold mb-2">Card Hover</Text>
              <Text size="sm" variant="muted">Enhanced hover with shadow</Text>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  )
}

// Tokens Section
function TokensSection() {
  const tokenCategories = [
    {
      name: 'Colors',
      tokens: [
        { name: '--primary', value: 'var(--blue-600)', description: 'Primary interactive color' },
        { name: '--primary-hover', value: 'var(--blue-700)', description: 'Primary hover state' },
        { name: '--surface', value: 'var(--blue-50)', description: 'Background surfaces' },
        { name: '--text-primary', value: 'var(--blue-900)', description: 'Primary text color' }
      ]
    },
    {
      name: 'Typography',
      tokens: [
        { name: '--font-hero', value: '3.75rem', description: '60px - Hero sections' },
        { name: '--font-h1', value: '3rem', description: '48px - Page titles' },
        { name: '--font-body', value: '1rem', description: '16px - Body text' },
        { name: '--line-normal', value: '1.5', description: 'Standard line height' }
      ]
    },
    {
      name: 'Spacing',
      tokens: [
        { name: '--space-sm', value: '0.5rem', description: '8px - Small spacing' },
        { name: '--space-md', value: '1rem', description: '16px - Medium spacing' },
        { name: '--space-lg', value: '1.5rem', description: '24px - Large spacing' },
        { name: '--space-xl', value: '2rem', description: '32px - Extra large' }
      ]
    },
    {
      name: 'Animation',
      tokens: [
        { name: '--animation-speed-fast', value: '0.15s', description: 'Quick interactions' },
        { name: '--animation-speed-normal', value: '0.3s', description: 'Standard transitions' },
        { name: '--animation-ease', value: 'cubic-bezier(0.4, 0, 0.2, 1)', description: 'Smooth easing' }
      ]
    }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <Heading as="h2" size="h2" className="mb-4">Design Tokens</Heading>
        <Text variant="muted">CSS custom properties for consistent design decisions</Text>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {tokenCategories.map((category) => (
          <Card key={category.name} className="p-6">
            <Heading as="h3" size="h4" className="mb-4">{category.name}</Heading>
            <div className="space-y-3">
              {category.tokens.map((token) => (
                <div key={token.name} className="border-l-2 border-blue-200 pl-4">
                  <div className="font-mono text-sm text-blue-700">{token.name}</div>
                  <div className="font-mono text-xs text-gray-600">{token.value}</div>
                  <div className="text-xs text-gray-500">{token.description}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-8 bg-gray-50">
        <Heading as="h3" size="h4" className="mb-4">Usage Example</Heading>
        <pre className="text-sm bg-white p-4 rounded-lg border overflow-x-auto">
{`.my-component {
  color: var(--text-primary);
  background: var(--surface);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  transition: all var(--animation-speed-normal) var(--animation-ease);
}`}
        </pre>
      </Card>
    </div>
  )
}

export default withErrorBoundary(DesignSystemPage, "DesignSystemPage") 