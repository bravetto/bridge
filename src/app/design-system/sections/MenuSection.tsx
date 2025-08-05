import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'
import { Menu, NavBar, MenuItem } from '@/components/ui/menu'

export default function MenuSection() {
  const [, ] = useState('default')

  const menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      href: '/',
      description: 'Return to homepage'
    },
    {
      id: 'about',
      label: 'About',
      children: [
        { id: 'team', label: 'Our Team', href: '/team' },
        { id: 'mission', label: 'Mission', href: '/mission' }
      ]
    },
    {
      id: 'contact',
      label: 'Contact',
      href: '/contact'
    }
  ]

  return (
    <div className="space-y-12">
      <div className="text-center">
        <Heading as="h2" size="h2" className="mb-4">Menu & Navigation</Heading>
        <Text variant="muted">Accessible navigation components</Text>
      </div>

      {/* Menu Demo */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Menu Component</Heading>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Menu 
              items={menuItems}
            />
            <Menu 
              items={menuItems}
            />
          </div>
        </div>
      </Card>

      {/* NavBar Demo */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Navigation Bar</Heading>
        <div className="space-y-6">
          <NavBar
            title="JAHmere Webb Portal"
            menuItems={menuItems}
          />
        </div>
      </Card>

      {/* Features */}
      <Card className="p-8">
        <Heading as="h3" size="h3" className="mb-6">Features</Heading>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <Text variant="primary" className="font-semibold">Accessibility</Text>
            </div>
            <Text size="sm" variant="muted">WCAG 2.1 AA compliant with keyboard navigation</Text>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <Text variant="primary" className="font-semibold">Responsive</Text>
            </div>
            <Text size="sm" variant="muted">Mobile-first design with touch-friendly targets</Text>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <Text variant="primary" className="font-semibold">Variants</Text>
            </div>
            <Text size="sm" variant="muted">Multiple variants, positions, and styling options</Text>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <Text variant="primary" className="font-semibold">Nested Menus</Text>
            </div>
            <Text size="sm" variant="muted">Multi-level menu hierarchies with transitions</Text>
          </div>
        </div>
      </Card>
    </div>
  )
}