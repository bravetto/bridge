'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heading, Text } from '@/components/ui/typography'
import { BaseCard } from '@/components/ui/base-card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Zap, Users, Palette, Code, BarChart, Eye, Smartphone, Monitor, Tablet } from 'lucide-react'

/**
 * Comprehensive Design System Showcase
 * Demonstrates all components using the unified championship system
 */
function DesignSystemShowcase() {
  const [selectedComponent, setSelectedComponent] = useState('colors')
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  return (
    <div className="min-h-screen champion-bg-white">
      {/* Header */}
      <div className="champion-bg-purple champion-py-6">
        <Container>
          <div className="text-center">
            <h1 className="champion-hero-title champion-text-white champion-mb-2">
              Championship Unified Design System
            </h1>
            <p className="champion-hero-subtitle champion-text-white/90 champion-mb-4">
              Champion V1 Colors + Champion V2 Typography = Perfect Balance
            </p>
            
            {/* Viewport Selector */}
            <div className="flex justify-center gap-2 champion-mb-4">
              <Button
                variant={viewport === 'mobile' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewport('mobile')}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
              <Button
                variant={viewport === 'tablet' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewport('tablet')}
              >
                <Tablet className="w-4 h-4 mr-2" />
                Tablet
              </Button>
              <Button
                variant={viewport === 'desktop' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setViewport('desktop')}
              >
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="champion-py-8">
        <Tabs value={selectedComponent} onValueChange={setSelectedComponent}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 champion-mb-8">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
            <TabsTrigger value="accessibility">A11y</TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8">
            <div>
              <h2 className="champion-section-title champion-mb-6">Color System</h2>
              
              {/* Primary Colors */}
              <div className="champion-mb-8">
                <h3 className="champion-card-title champion-mb-4">Primary Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <BaseCard spacing="compact" className="text-center">
                    <div className="champion-bg-purple w-full h-16 rounded champion-mb-2"></div>
                    <Text size="sm" className="font-mono">Purple</Text>
                    <Text size="xs" className="champion-text-gray-600">#8b5cf6</Text>
                  </BaseCard>
                  <BaseCard spacing="compact" className="text-center">
                    <div className="champion-bg-orange w-full h-16 rounded champion-mb-2"></div>
                    <Text size="sm" className="font-mono">Orange</Text>
                    <Text size="xs" className="champion-text-gray-600">#ea580c</Text>
                  </BaseCard>
                </div>
              </div>

              {/* Neutral Colors */}
              <div className="champion-mb-8">
                <h3 className="champion-card-title champion-mb-4">Perfect Neutrals</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {[
                    { name: 'White', class: 'champion-bg-white', hex: '#ffffff' },
                    { name: 'Gray 50', class: 'champion-bg-gray-50', hex: '#f8fafc' },
                    { name: 'Gray 200', class: 'champion-bg-gray-200', hex: '#e2e8f0' },
                    { name: 'Gray 500', class: 'champion-bg-gray-500', hex: '#64748b' },
                    { name: 'Gray 700', class: 'champion-bg-gray-700', hex: '#334155' },
                    { name: 'Gray 900', class: 'champion-bg-gray-900', hex: '#0f172a' },
                  ].map((color) => (
                    <BaseCard key={color.name} spacing="compact" className="text-center">
                      <div className={`${color.class} w-full h-12 rounded champion-mb-2 border border-gray-200`}></div>
                      <Text size="xs" className="font-mono">{color.name}</Text>
                      <Text size="xs" className="champion-text-gray-600">{color.hex}</Text>
                    </BaseCard>
                  ))}
                </div>
              </div>

              {/* Contrast Examples */}
              <div>
                <h3 className="champion-card-title champion-mb-4">Text Contrast Examples</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <BaseCard spacing="comfortable" className="champion-bg-white">
                    <h4 className="champion-text-gray-900 champion-mb-2">AAA Contrast (21:1)</h4>
                    <p className="champion-text-gray-700">This text has perfect readability on white background.</p>
                  </BaseCard>
                  <BaseCard spacing="comfortable" className="champion-bg-purple">
                    <h4 className="champion-text-white champion-mb-2">AAA Contrast (8.1:1)</h4>
                    <p className="champion-text-white/90">White text on purple background is perfectly readable.</p>
                  </BaseCard>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-8">
            <div>
              <h2 className="champion-section-title champion-mb-6">Typography System</h2>
              
              <div className="space-y-6">
                <div>
                  <h1 className="champion-hero-title champion-mb-2">Hero Title (72px)</h1>
                  <Text className="champion-text-gray-600">Used for main page heroes and primary headings</Text>
                </div>
                
                <div>
                  <h2 className="champion-section-title champion-mb-2">Section Title (60px)</h2>
                  <Text className="champion-text-gray-600">Used for major section headings</Text>
                </div>
                
                <div>
                  <h3 className="champion-card-title champion-mb-2">Card Title (48px)</h3>
                  <Text className="champion-text-gray-600">Used for card headings and subsections</Text>
                </div>
                
                <div>
                  <h4 className="champion-feature-title champion-mb-2">Feature Title (32px)</h4>
                  <Text className="champion-text-gray-600">Used for feature cards and smaller headings</Text>
                </div>
                
                <div>
                  <p className="champion-body-text champion-mb-2">Body Text (18px)</p>
                  <Text className="champion-text-gray-600">Primary body text with optimal readability</Text>
                </div>
                
                <div>
                  <p className="champion-small-text champion-mb-2">Small Text (16px)</p>
                  <Text className="champion-text-gray-600">Secondary text and captions</Text>
                </div>
              </div>

              {/* Responsive Typography Demo */}
              <div className="champion-mt-8">
                <h3 className="champion-card-title champion-mb-4">Responsive Scaling</h3>
                <BaseCard spacing="comfortable" variant="outlined">
                  <div className="space-y-4">
                    <div className="p-4 border rounded">
                      <h4 className="text-sm font-medium champion-text-gray-700 champion-mb-2">Mobile (320px+)</h4>
                      <div style={{ fontSize: 'clamp(2.25rem, 2.25rem + 1.5vw, 3rem)' }}>
                        Responsive Hero
                      </div>
                    </div>
                    <div className="p-4 border rounded">
                      <h4 className="text-sm font-medium champion-text-gray-700 champion-mb-2">Desktop (1024px+)</h4>
                      <div className="text-5xl">
                        Full Size Hero
                      </div>
                    </div>
                  </div>
                </BaseCard>
              </div>
            </div>
          </TabsContent>

          {/* Buttons Tab */}
          <TabsContent value="buttons" className="space-y-8">
            <div>
              <h2 className="champion-section-title champion-mb-6">Button System</h2>
              
              <div className="space-y-8">
                {/* Button Variants */}
                <div>
                  <h3 className="champion-card-title champion-mb-4">Button Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="destructive">Destructive Button</Button>
                  </div>
                </div>

                {/* Button Sizes */}
                <div>
                  <h3 className="champion-card-title champion-mb-4">Button Sizes</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                {/* Button States */}
                <div>
                  <h3 className="champion-card-title champion-mb-4">Button States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>Normal</Button>
                    <Button disabled>Disabled</Button>
                    <Button className="opacity-75">Loading State</Button>
                  </div>
                </div>

                {/* Mobile Touch Targets */}
                <div>
                  <h3 className="champion-card-title champion-mb-4">Mobile Touch Targets</h3>
                  <BaseCard spacing="comfortable" variant="outlined">
                    <Text className="champion-mb-4">All buttons meet 44px minimum touch target requirement:</Text>
                    <div className="space-y-2">
                      <Button size="sm" className="min-h-[44px]">Small Button (44px height)</Button>
                      <Button size="default">Default Button (48px height)</Button>
                      <Button size="lg">Large Button (56px height)</Button>
                    </div>
                  </BaseCard>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-8">
            <div>
              <h2 className="champion-section-title champion-mb-6">Form System</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="champion-card-title champion-mb-4">Input Elements</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium champion-text-gray-700 champion-mb-2">
                        Default Input
                      </label>
                      <Input placeholder="Enter text here..." />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium champion-text-gray-700 champion-mb-2">
                        Email Input
                      </label>
                      <Input type="email" placeholder="your@email.com" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium champion-text-gray-700 champion-mb-2">
                        Error State
                      </label>
                      <Input variant="error" placeholder="Invalid input" />
                      <Text size="sm" className="text-red-600 champion-mt-1">This field is required</Text>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="champion-card-title champion-mb-4">Mobile Optimization</h3>
                  <BaseCard spacing="comfortable" variant="outlined">
                    <Text className="champion-mb-4">Mobile-optimized inputs prevent zoom and improve UX:</Text>
                    <div className="space-y-3">
                      <Input 
                        type="email" 
                        placeholder="Email (no zoom on iOS)" 
                        style={{ fontSize: '16px' }}
                      />
                      <Input 
                        type="tel" 
                        placeholder="Phone number" 
                        inputMode="tel"
                        style={{ fontSize: '16px' }}
                      />
                      <Input 
                        type="number" 
                        placeholder="Number input" 
                        inputMode="numeric"
                        style={{ fontSize: '16px' }}
                      />
                    </div>
                  </BaseCard>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-8">
            <div>
              <h2 className="champion-section-title champion-mb-6">Card System</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <BaseCard spacing="compact" variant="default">
                  <h4 className="champion-feature-title champion-mb-2">Compact Card</h4>
                  <Text>Minimal spacing for dense information.</Text>
                </BaseCard>
                
                <BaseCard spacing="comfortable" variant="elevated">
                  <h4 className="champion-feature-title champion-mb-2">Comfortable Card</h4>
                  <Text>Balanced spacing for most use cases.</Text>
                </BaseCard>
                
                <BaseCard spacing="spacious" variant="outlined">
                  <h4 className="champion-feature-title champion-mb-2">Spacious Card</h4>
                  <Text>Generous spacing for emphasis.</Text>
                </BaseCard>
              </div>

              {/* Interactive Cards */}
              <div className="champion-mt-8">
                <h3 className="champion-card-title champion-mb-4">Interactive Cards</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <BaseCard 
                    spacing="comfortable" 
                    variant="elevated" 
                    interactive
                    onClick={() => alert('Card clicked!')}
                  >
                    <Shield className="w-8 h-8 champion-text-purple champion-mb-3" />
                    <h4 className="champion-feature-title champion-mb-2">Clickable Card</h4>
                    <Text>This card responds to clicks and keyboard navigation.</Text>
                  </BaseCard>
                  
                  <BaseCard spacing="comfortable" variant="outlined">
                    <Zap className="w-8 h-8 champion-text-orange champion-mb-3" />
                    <h4 className="champion-feature-title champion-mb-2">Static Card</h4>
                    <Text>This card is for display only.</Text>
                  </BaseCard>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-8">
            <div>
              <h2 className="champion-section-title champion-mb-6">Layout System</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="champion-card-title champion-mb-4">Spacing Scale</h3>
                  <div className="space-y-2">
                    {[1, 2, 4, 6, 8, 12, 16, 24].map((space) => (
                      <div key={space} className="flex items-center gap-4">
                        <div className="w-16 text-sm font-mono">{space * 4}px</div>
                        <div 
                          className="champion-bg-purple h-4" 
                          style={{ width: `${space * 4}px` }}
                        ></div>
                        <div className="text-sm champion-text-gray-600">champion-space-{space}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="champion-card-title champion-mb-4">Responsive Grid</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <BaseCard spacing="comfortable" variant="outlined">
                      <Text>1 column on mobile</Text>
                    </BaseCard>
                    <BaseCard spacing="comfortable" variant="outlined">
                      <Text>2 columns on tablet</Text>
                    </BaseCard>
                    <BaseCard spacing="comfortable" variant="outlined">
                      <Text>3 columns on desktop</Text>
                    </BaseCard>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Mobile Tab */}
          <TabsContent value="mobile" className="space-y-8">
            <div>
              <h2 className="champion-section-title champion-mb-6">Mobile Optimization</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="champion-card-title champion-mb-4">Touch Targets</h3>
                  <BaseCard spacing="comfortable" variant="outlined">
                    <Text className="champion-mb-4">All interactive elements meet 44px minimum:</Text>
                    <div className="space-y-3">
                      <Button className="min-h-[44px] w-full">44px Touch Target</Button>
                      <div className="flex gap-2">
                        <Button size="sm" className="min-h-[44px] flex-1">Button 1</Button>
                        <Button size="sm" className="min-h-[44px] flex-1">Button 2</Button>
                      </div>
                    </div>
                  </BaseCard>
                </div>

                <div>
                  <h3 className="champion-card-title champion-mb-4">Responsive Typography</h3>
                  <BaseCard spacing="comfortable" variant="outlined">
                    <div className="space-y-4">
                      <div>
                        <Text size="sm" className="champion-text-gray-600">Mobile (16px minimum):</Text>
                        <div style={{ fontSize: 'max(16px, 1rem)' }}>Never smaller than 16px</div>
                      </div>
                      <div>
                        <Text size="sm" className="champion-text-gray-600">Responsive scaling:</Text>
                        <div style={{ fontSize: 'clamp(1rem, 1rem + 0.25vw, 1.125rem)' }}>
                          Scales with viewport
                        </div>
                      </div>
                    </div>
                  </BaseCard>
                </div>

                <div>
                  <h3 className="champion-card-title champion-mb-4">Mobile-First Design</h3>
                  <div className="grid gap-4">
                    <BaseCard spacing="comfortable" variant="elevated">
                      <Text className="champion-mb-2">✅ Touch-friendly spacing</Text>
                      <Text className="champion-mb-2">✅ Readable font sizes (16px+)</Text>
                      <Text className="champion-mb-2">✅ Optimized line lengths</Text>
                      <Text>✅ Perfect contrast ratios</Text>
                    </BaseCard>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Accessibility Tab */}
          <TabsContent value="accessibility" className="space-y-8">
            <div>
              <h2 className="champion-section-title champion-mb-6">Accessibility Features</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="champion-card-title champion-mb-4">WCAG Compliance</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <BaseCard spacing="comfortable" variant="outlined">
                      <h4 className="font-semibold champion-mb-2">✅ AA Compliant</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 4.5:1 contrast for normal text</li>
                        <li>• 3:1 contrast for large text</li>
                        <li>• Keyboard navigation</li>
                        <li>• Screen reader support</li>
                      </ul>
                    </BaseCard>
                    
                    <BaseCard spacing="comfortable" variant="outlined">
                      <h4 className="font-semibold champion-mb-2">🏆 AAA Enhanced</h4>
                      <ul className="space-y-1 text-sm">
                        <li>• 7:1 contrast for normal text</li>
                        <li>• 4.5:1 contrast for large text</li>
                        <li>• Enhanced focus indicators</li>
                        <li>• Motion reduction support</li>
                      </ul>
                    </BaseCard>
                  </div>
                </div>

                <div>
                  <h3 className="champion-card-title champion-mb-4">Focus Management</h3>
                  <BaseCard spacing="comfortable" variant="outlined">
                    <Text className="champion-mb-4">Try tabbing through these elements:</Text>
                    <div className="space-y-2">
                      <Button>Focusable Button 1</Button>
                      <Input placeholder="Focusable Input" />
                      <Button variant="outline">Focusable Button 2</Button>
                    </div>
                  </BaseCard>
                </div>

                <div>
                  <h3 className="champion-card-title champion-mb-4">Screen Reader Support</h3>
                  <BaseCard spacing="comfortable" variant="outlined">
                    <div className="space-y-4">
                      <Button aria-label="Close dialog (screen reader accessible)">
                        ×
                      </Button>
                      <div role="status" aria-live="polite">
                        Status updates are announced to screen readers
                      </div>
                      <img 
                        src="/images/logo-blue.png" 
                        alt="JAHmere Webb Freedom Portal Logo"
                        className="w-16 h-16"
                      />
                    </div>
                  </BaseCard>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  )
}

export default withErrorBoundary(DesignSystemShowcase, "DesignSystemShowcase") 