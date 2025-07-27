'use client'

import { withErrorBoundary } from '@/components/ui/error-boundary'

/**
 * Unified Design System Demo Component
 * Showcases Champion V1 colors + Champion V2 typography
 */
function UnifiedSystemDemo() {
  return (
    <div className="champion-container champion-container-7xl champion-py-4">
      {/* Hero Section - V1 Colors + V2 Typography */}
      <section className="champion-hero champion-mb-8">
        <div className="champion-container champion-container-5xl">
          <h1 className="champion-hero-title champion-mb-4">
            Unified Design System
          </h1>
          <p className="champion-hero-subtitle champion-mb-8">
            Champion V1 colors meet Champion V2 typography for the perfect balance
          </p>
          
          <div className="champion-flex champion-gap-4 champion-justify-center">
            <button className="champion-btn champion-btn-primary champion-btn-lg">
              Primary Action
            </button>
            <button className="champion-btn champion-btn-secondary champion-btn-lg">
              Secondary Action
            </button>
          </div>
        </div>
      </section>

      {/* Typography Showcase */}
      <section className="champion-bg-white champion-py-4 champion-mb-8">
        <div className="champion-container champion-container-5xl">
          <h2 className="champion-heading-1 champion-text-center champion-mb-8">
            Typography Hierarchy
          </h2>
          
          <div className="champion-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
            <div className="champion-card">
              <h3 className="champion-heading-2 champion-mb-4 champion-text-purple">
                Heading 1 (60px)
              </h3>
              <p className="champion-text-base">
                Perfect for page titles and major sections. Uses Champion V2's moderate sizing for better readability.
              </p>
            </div>
            
            <div className="champion-card">
              <h4 className="champion-heading-3 champion-mb-4 champion-text-orange">
                Heading 2 (48px)
              </h4>
              <p className="champion-text-base">
                Ideal for section headers. Maintains visual hierarchy without overwhelming the content.
              </p>
            </div>
            
            <div className="champion-card">
              <h5 className="champion-heading-4 champion-mb-4">
                Heading 3 (36px)
              </h5>
              <p className="champion-text-base">
                Great for subsections and card titles. Clean and professional appearance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Color Showcase */}
      <section className="champion-py-4 champion-mb-8">
        <div className="champion-container champion-container-5xl">
          <h2 className="champion-heading-2 champion-text-center champion-mb-8">
            Champion V1 Color System
          </h2>
          
          <div className="champion-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)' }}>
            {/* Purple Scale */}
            <div className="champion-card champion-card-purple">
              <h3 className="champion-heading-4 champion-text-white champion-mb-4">
                Purple Primary
              </h3>
              <p className="champion-text-base champion-text-white" style={{ opacity: 0.9 }}>
                Core brand color for interactive elements and primary actions.
              </p>
            </div>
            
            {/* Orange Scale */}
            <div className="champion-card" style={{ background: 'var(--champion-gradient-accent)' }}>
              <h3 className="champion-heading-4 champion-text-white champion-mb-4">
                Orange Accent
              </h3>
              <p className="champion-text-base champion-text-white" style={{ opacity: 0.9 }}>
                Accent color for CTAs and important highlights.
              </p>
            </div>
            
            {/* Neutral */}
            <div className="champion-card">
              <h3 className="champion-heading-4 champion-mb-4">
                Clean Neutrals
              </h3>
              <p className="champion-text-base">
                Professional gray scale for text, borders, and backgrounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Button Showcase */}
      <section className="champion-bg-white champion-py-4">
        <div className="champion-container champion-container-5xl">
          <h2 className="champion-heading-2 champion-text-center champion-mb-8">
            Button System
          </h2>
          
          <div className="champion-flex champion-gap-4 champion-justify-center champion-mb-6">
            <button className="champion-btn champion-btn-primary">
              Primary Button
            </button>
            <button className="champion-btn champion-btn-secondary">
              Secondary Button
            </button>
          </div>
          
          <div className="champion-flex champion-gap-4 champion-justify-center">
            <button className="champion-btn champion-btn-primary champion-btn-sm">
              Small
            </button>
            <button className="champion-btn champion-btn-primary">
              Default
            </button>
            <button className="champion-btn champion-btn-primary champion-btn-lg">
              Large
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default withErrorBoundary(UnifiedSystemDemo, "UnifiedSystemDemo") 