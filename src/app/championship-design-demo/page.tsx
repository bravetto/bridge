'use client'

import { withErrorBoundary } from '@/components/ui/error-boundary'

function ChampionshipDesignDemo() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Reference Style */}
      <section className="champion-hero">
        <div className="champion-container champion-container-7xl">
          <div className="champion-flex champion-flex-col champion-items-center champion-gap-8 relative z-10">
            <h1 className="champion-hero-title">
              Championship Design System
            </h1>
            <p className="champion-hero-subtitle max-w-3xl">
              Battle-tested, performance-optimized design system inspired by the reference masterpiece. 
              Deep purple gradients meet vibrant orange accents in perfect harmony.
            </p>
            <div className="champion-flex champion-gap-4 champion-mt-8">
              <button className="champion-btn champion-btn-primary champion-btn-lg">
                Primary Action
              </button>
              <button className="champion-btn champion-btn-secondary champion-btn-lg">
                Secondary Action
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette Section */}
      <section className="champion-py-4 champion-bg-white">
        <div className="champion-container champion-container-7xl">
          <div className="champion-text-center champion-mb-16">
            <h2 className="champion-heading-2 champion-mb-4">Championship Color Palette</h2>
            <p className="champion-text-lg champion-text-muted max-w-2xl mx-auto">
              Deep purple foundations with vibrant orange accents, exactly matching the reference image brilliance.
            </p>
          </div>

          {/* Purple Scale */}
          <div className="champion-mb-12">
            <h3 className="champion-heading-4 champion-mb-6 champion-text-purple">Purple Foundation</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-purple-50)'}}></div>
                <p className="champion-text-sm">50</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-purple-100)'}}></div>
                <p className="champion-text-sm">100</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-purple-200)'}}></div>
                <p className="champion-text-sm">200</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-purple-300)'}}></div>
                <p className="champion-text-sm">300</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-purple-400)'}}></div>
                <p className="champion-text-sm">400</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-purple-500)'}}></div>
                <p className="champion-text-sm champion-text-white">500</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-purple-600)'}}></div>
                <p className="champion-text-sm champion-text-white">600</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-purple-700)'}}></div>
                <p className="champion-text-sm champion-text-white">700</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-purple-800)'}}></div>
                <p className="champion-text-sm champion-text-white">800</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-purple-900)'}}></div>
                <p className="champion-text-sm champion-text-white">900</p>
              </div>
            </div>
          </div>

          {/* Orange Scale */}
          <div className="champion-mb-12">
            <h3 className="champion-heading-4 champion-mb-6 champion-text-orange">Orange Accent</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-orange-50)'}}></div>
                <p className="champion-text-sm">50</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-orange-100)'}}></div>
                <p className="champion-text-sm">100</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-orange-200)'}}></div>
                <p className="champion-text-sm">200</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-orange-300)'}}></div>
                <p className="champion-text-sm">300</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-orange-400)'}}></div>
                <p className="champion-text-sm">400</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-orange-500)'}}></div>
                <p className="champion-text-sm champion-text-white">500</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-orange-600)'}}></div>
                <p className="champion-text-sm champion-text-white">600</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-orange-700)'}}></div>
                <p className="champion-text-sm champion-text-white">700</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-orange-800)'}}></div>
                <p className="champion-text-sm champion-text-white">800</p>
              </div>
              <div className="champion-text-center">
                <div className="w-full h-16 rounded-lg mb-2" style={{backgroundColor: 'var(--champion-orange-900)'}}></div>
                <p className="champion-text-sm champion-text-white">900</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="champion-py-4 bg-gray-50">
        <div className="champion-container champion-container-7xl">
          <div className="champion-text-center champion-mb-16">
            <h2 className="champion-heading-2 champion-mb-4">Typography Scale</h2>
            <p className="champion-text-lg champion-text-muted max-w-2xl mx-auto">
              Clean, readable typography hierarchy with perfect scaling and spacing.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="champion-heading-1">Heading 1 - Championship Title</h1>
              <p className="champion-text-sm champion-text-muted mt-2">60px • font-weight: 900 • line-height: 1</p>
            </div>
            <div>
              <h2 className="champion-heading-2">Heading 2 - Section Title</h2>
              <p className="champion-text-sm champion-text-muted mt-2">48px • font-weight: 800 • line-height: 1.1</p>
            </div>
            <div>
              <h3 className="champion-heading-3">Heading 3 - Subsection</h3>
              <p className="champion-text-sm champion-text-muted mt-2">36px • font-weight: 700 • line-height: 1.2</p>
            </div>
            <div>
              <h4 className="champion-heading-4">Heading 4 - Component Title</h4>
              <p className="champion-text-sm champion-text-muted mt-2">30px • font-weight: 600 • line-height: 1.3</p>
            </div>
            <div>
              <p className="champion-text-lg">Large body text for important content and introductions.</p>
              <p className="champion-text-sm champion-text-muted mt-2">18px • font-weight: 400 • line-height: 1.7</p>
            </div>
            <div>
              <p className="champion-text-base">Regular body text for general content and descriptions.</p>
              <p className="champion-text-sm champion-text-muted mt-2">16px • font-weight: 400 • line-height: 1.6</p>
            </div>
            <div>
              <p className="champion-text-sm">Small text for captions, metadata, and secondary information.</p>
              <p className="champion-text-sm champion-text-muted mt-2">14px • font-weight: 400 • line-height: 1.5</p>
            </div>
          </div>
        </div>
      </section>

      {/* Button Showcase */}
      <section className="champion-py-4 champion-bg-white">
        <div className="champion-container champion-container-7xl">
          <div className="champion-text-center champion-mb-16">
            <h2 className="champion-heading-2 champion-mb-4">Button System</h2>
            <p className="champion-text-lg champion-text-muted max-w-2xl mx-auto">
              Reference-inspired buttons with perfect hover states and accessibility.
            </p>
          </div>

          <div className="space-y-8">
            {/* Primary Buttons */}
            <div>
              <h3 className="champion-heading-5 champion-mb-4">Primary Buttons (Orange CTA)</h3>
              <div className="champion-flex champion-gap-4 flex-wrap">
                <button className="champion-btn champion-btn-primary champion-btn-sm">Small Primary</button>
                <button className="champion-btn champion-btn-primary">Default Primary</button>
                <button className="champion-btn champion-btn-primary champion-btn-lg">Large Primary</button>
                <button className="champion-btn champion-btn-primary champion-btn-xl">XL Primary</button>
              </div>
            </div>

            {/* Secondary Buttons */}
            <div>
              <h3 className="champion-heading-5 champion-mb-4">Secondary Buttons (Purple)</h3>
              <div className="champion-flex champion-gap-4 flex-wrap">
                <button className="champion-btn champion-btn-secondary champion-btn-sm">Small Secondary</button>
                <button className="champion-btn champion-btn-secondary">Default Secondary</button>
                <button className="champion-btn champion-btn-secondary champion-btn-lg">Large Secondary</button>
                <button className="champion-btn champion-btn-secondary champion-btn-xl">XL Secondary</button>
              </div>
            </div>

            {/* Outline Buttons */}
            <div>
              <h3 className="champion-heading-5 champion-mb-4">Outline Buttons</h3>
              <div className="champion-flex champion-gap-4 flex-wrap">
                <button className="champion-btn champion-btn-outline champion-btn-sm">Small Outline</button>
                <button className="champion-btn champion-btn-outline">Default Outline</button>
                <button className="champion-btn champion-btn-outline champion-btn-lg">Large Outline</button>
                <button className="champion-btn champion-btn-outline champion-btn-xl">XL Outline</button>
              </div>
            </div>

            {/* Ghost Buttons */}
            <div>
              <h3 className="champion-heading-5 champion-mb-4">Ghost Buttons</h3>
              <div className="champion-flex champion-gap-4 flex-wrap">
                <button className="champion-btn champion-btn-ghost champion-btn-sm">Small Ghost</button>
                <button className="champion-btn champion-btn-ghost">Default Ghost</button>
                <button className="champion-btn champion-btn-ghost champion-btn-lg">Large Ghost</button>
                <button className="champion-btn champion-btn-ghost champion-btn-xl">XL Ghost</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Card Showcase */}
      <section className="champion-py-4 bg-gray-50">
        <div className="champion-container champion-container-7xl">
          <div className="champion-text-center champion-mb-16">
            <h2 className="champion-heading-2 champion-mb-4">Card System</h2>
            <p className="champion-text-lg champion-text-muted max-w-2xl mx-auto">
              Clean, interactive cards with hover effects and perfect spacing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="champion-card">
              <h3 className="champion-heading-4 champion-mb-4">Standard Card</h3>
              <p className="champion-text-base champion-mb-4">
                Clean white background with subtle shadows and smooth hover effects.
              </p>
              <button className="champion-btn champion-btn-outline">Learn More</button>
            </div>

            <div className="champion-card-purple">
              <h3 className="champion-heading-4 champion-mb-4 champion-text-white">Purple Card</h3>
              <p className="champion-text-base champion-mb-4 champion-text-white opacity-90">
                Purple gradient background with glowing effects and premium feel.
              </p>
              <button className="champion-btn champion-btn-primary">Get Started</button>
            </div>

            <div className="champion-card">
              <h3 className="champion-heading-4 champion-mb-4">Feature Card</h3>
              <p className="champion-text-base champion-mb-4">
                Perfect for showcasing features, testimonials, or important content blocks.
              </p>
              <button className="champion-btn champion-btn-secondary">Explore</button>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="champion-py-4 champion-bg-white">
        <div className="champion-container champion-container-7xl">
          <div className="champion-text-center champion-mb-16">
            <h2 className="champion-heading-2 champion-mb-4">Championship Performance</h2>
            <p className="champion-text-lg champion-text-muted max-w-2xl mx-auto">
              Battle-tested performance metrics that deliver championship-level user experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="champion-text-center champion-p-6 champion-card">
              <div className="champion-heading-1 champion-text-purple champion-mb-2">&lt;7ms</div>
              <div className="champion-heading-5 champion-mb-2">API Response</div>
              <p className="champion-text-sm champion-text-muted">Lightning-fast server responses</p>
            </div>
            <div className="champion-text-center champion-p-6 champion-card">
              <div className="champion-heading-1 champion-text-orange champion-mb-2">&lt;15s</div>
              <div className="champion-heading-5 champion-mb-2">Build Time</div>
              <p className="champion-text-sm champion-text-muted">Optimized build pipeline</p>
            </div>
            <div className="champion-text-center champion-p-6 champion-card">
              <div className="champion-heading-1 champion-text-purple champion-mb-2">100%</div>
              <div className="champion-heading-5 champion-mb-2">Accessibility</div>
              <p className="champion-text-sm champion-text-muted">WCAG 2.1 AA compliant</p>
            </div>
            <div className="champion-text-center champion-p-6 champion-card">
              <div className="champion-heading-1 champion-text-orange champion-mb-2">0</div>
              <div className="champion-heading-5 champion-mb-2">TS Errors</div>
              <p className="champion-text-sm champion-text-muted">Type-safe codebase</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default withErrorBoundary(ChampionshipDesignDemo, "ChampionshipDesignDemo") 