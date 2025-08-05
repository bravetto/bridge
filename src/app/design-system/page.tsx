'use client'

import React, { useState, lazy, Suspense } from 'react'
import { Button } from '@/components/ui/button'

import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { PageLayout } from '@/components/layout/site-navigation'

// Dynamic imports for heavy sections
const ColorsSection = lazy(() => import('./sections/ColorsSection'))
const TypographySection = lazy(() => import('./sections/TypographySection'))
const ComponentsSection = lazy(() => import('./sections/ComponentsSection'))
const MenuSection = lazy(() => import('./sections/MenuSection'))
const AnimationsSection = lazy(() => import('./sections/AnimationsSection'))
const TokensSection = lazy(() => import('./sections/TokensSection'))

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
      <div className="bg-blue-50 border-b border-blue-200">
        <Container size="xl" className="py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Heading as="h1" size="hero" className="mb-4 text-blue-900">
            JAHmere Webb Components
          </Heading>
          <Text size="xl" variant="muted" className="max-w-3xl mx-auto text-blue-700">
            UI components supporting JAHmere Webb's freedom advocacy portal.
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

        {/* Components */}
        <Suspense fallback={<div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
        {activeTab === 'colors' && <ColorsSection />}
        {activeTab === 'typography' && <TypographySection />}
        {activeTab === 'components' && <ComponentsSection />}
        {activeTab === 'menu' && <MenuSection />}
        {activeTab === 'animations' && <AnimationsSection />}
        {activeTab === 'tokens' && <TokensSection />}
        </Suspense>
        </Container>
      </div>
    </PageLayout>
  )
}







export default withErrorBoundary(DesignSystemPage, "DesignSystemPage") 