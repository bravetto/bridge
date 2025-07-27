'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/typography'
import { BaseCard } from '@/components/ui/base-card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Zap, 
  Users, 
  Brain, 
  Target, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Heart, 
  Award, 
  Play, 
  Monitor, 
  Layers,
  Code,
  Palette
} from 'lucide-react'

function SimpleDesignSystemShowcase() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedVariant, setSelectedVariant] = useState('hero')
  const [selectedHeader, setSelectedHeader] = useState('glassmorphic')
  const [selectedFooter, setSelectedFooter] = useState('interactive')

  const landingPageVariants = [
    { id: 'hero', name: 'Hero Landing', description: 'Perfect for product launches and brand showcases' },
    { id: 'saas', name: 'SaaS Platform', description: 'Optimized for software and digital services' },
    { id: 'ecommerce', name: 'E-commerce', description: 'Conversion-focused for online stores' },
    { id: 'agency', name: 'Creative Agency', description: 'Portfolio and service-oriented design' },
    { id: 'startup', name: 'Startup', description: 'Growth-focused with investor appeal' }
  ]

  const headerVariants = [
    { id: 'minimal', name: 'Minimal', description: 'Clean and simple navigation' },
    { id: 'immersive', name: 'Immersive', description: 'Full-width with rich backgrounds' },
    { id: 'ai-powered', name: 'AI-Powered', description: 'Smart search and personalization' },
    { id: 'glassmorphic', name: 'Glassmorphic', description: 'Modern glass effect styling' },
    { id: 'mega-nav', name: 'Mega Navigation', description: 'Comprehensive navigation system' },
    { id: 'floating', name: 'Floating', description: 'Minimal floating design' }
  ]

  const footerVariants = [
    { id: 'mega', name: 'Mega Footer', description: 'Comprehensive with all sections' },
    { id: 'minimal', name: 'Minimal', description: 'Clean and simple approach' },
    { id: 'interactive', name: 'Interactive', description: 'Engaging with animations' },
    { id: 'social-focused', name: 'Social Focused', description: 'Community-driven design' },
    { id: 'newsletter-focused', name: 'Newsletter', description: 'Subscription-optimized' },
    { id: 'creative', name: 'Creative', description: 'Unique and artistic' }
  ]

  const designInnovations = [
    {
      title: 'Liquid Glass Effects',
      description: 'Advanced glassmorphism with dynamic lighting and depth perception',
      icon: Sparkles,
      features: ['Dynamic lighting', 'Depth perception', 'Interactive transparency', 'Backdrop blur effects']
    },
    {
      title: 'AI-Powered Personalization',
      description: 'Adaptive interfaces that learn from user behavior in real-time',
      icon: Brain,
      features: ['Behavioral adaptation', 'Content personalization', 'Smart recommendations', 'Predictive UI']
    },
    {
      title: 'Microinteractions',
      description: 'Delightful animations that guide users and provide instant feedback',
      icon: Zap,
      features: ['Hover animations', 'Loading states', 'Feedback loops', 'Gesture responses']
    },
    {
      title: 'Conversion Optimization',
      description: 'Every element scientifically designed to maximize engagement',
      icon: Target,
      features: ['A/B tested patterns', 'Urgency elements', 'Social proof', 'Trust signals']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 backdrop-blur-3xl animate-pulse"
              style={{
                left: `${20 + i * 20}%`,
                top: `${10 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <Container className="relative z-10 max-w-6xl">
          <div className="space-y-8">
            <Badge className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 border-blue-200 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              2025 Design System Showcase
            </Badge>

            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 bg-clip-text text-transparent leading-tight">
              The Future of
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Web Design
              </span>
            </h1>

            <Text className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Explore revolutionary 2025 design innovations featuring AI-powered personalization, 
              liquid glass effects, conversion-optimized microinteractions, and delightful user experiences 
              that transform visitors into loyal customers.
            </Text>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-xl"
                onClick={() => setActiveTab('demos')}
              >
                Explore Demos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg"
                onClick={() => setActiveTab('innovations')}
              >
                View Innovations
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-16">
        <div className="w-full">
          <div className="grid w-full grid-cols-4 mb-12 bg-slate-100 rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: Monitor },
              { id: 'demos', label: 'Live Demos', icon: Play },
              { id: 'innovations', label: 'Innovations', icon: Sparkles },
              { id: 'colors', label: 'Colors', icon: Palette }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 text-lg py-3 px-4 rounded-md transition-all ${
                  activeTab === tab.id 
                    ? 'bg-white shadow-sm text-blue-600' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-16">
              <h2 className="text-4xl font-bold text-center mb-8">
                2025 Design System Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Landing Page Variants',
                    count: landingPageVariants.length,
                    description: 'Complete page templates for different use cases',
                    icon: Layers,
                    action: () => setActiveTab('demos')
                  },
                  {
                    title: 'Header Styles',
                    count: headerVariants.length,
                    description: 'Navigation patterns from minimal to immersive',
                    icon: Monitor,
                    action: () => setActiveTab('demos')
                  },
                  {
                    title: 'Footer Designs',
                    count: footerVariants.length,
                    description: 'Engagement-focused footer variations',
                    icon: Layers,
                    action: () => setActiveTab('demos')
                  },
                  {
                    title: 'Design Innovations',
                    count: designInnovations.length,
                    description: 'Cutting-edge 2025 design techniques',
                    icon: Sparkles,
                    action: () => setActiveTab('innovations')
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="cursor-pointer group"
                    onClick={item.action}
                  >
                    <BaseCard className="p-8 text-center h-full bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-200 group-hover:-translate-y-1">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                        <item.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <div className="text-3xl font-bold text-blue-600 mb-4">
                        {item.count}
                      </div>
                      <Text className="text-slate-600">
                        {item.description}
                      </Text>
                    </BaseCard>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Demos Tab */}
          {activeTab === 'demos' && (
            <div className="space-y-12">
              <h2 className="text-4xl font-bold text-center mb-8">
                Interactive Design Demos
              </h2>

              {/* Variant Selectors */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Landing Page Style</h3>
                  <div className="space-y-2">
                    {landingPageVariants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`w-full p-3 text-left rounded-lg border transition-all ${
                          selectedVariant === variant.id 
                            ? 'bg-blue-50 border-blue-200 text-blue-700' 
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-medium">{variant.name}</div>
                        <div className="text-sm text-slate-500">{variant.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Header Style</h3>
                  <div className="space-y-2">
                    {headerVariants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedHeader(variant.id)}
                        className={`w-full p-3 text-left rounded-lg border transition-all ${
                          selectedHeader === variant.id 
                            ? 'bg-blue-50 border-blue-200 text-blue-700' 
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-medium">{variant.name}</div>
                        <div className="text-sm text-slate-500">{variant.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Footer Style</h3>
                  <div className="space-y-2">
                    {footerVariants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedFooter(variant.id)}
                        className={`w-full p-3 text-left rounded-lg border transition-all ${
                          selectedFooter === variant.id 
                            ? 'bg-blue-50 border-blue-200 text-blue-700' 
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="font-medium">{variant.name}</div>
                        <div className="text-sm text-slate-500">{variant.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview Cards */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">Component Previews</h3>
                    <Badge className="bg-green-100 text-green-800">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                      Interactive Demo
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <BaseCard className="p-6">
                      <h4 className="text-lg font-semibold mb-4">Header Preview</h4>
                      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-center">
                        <p className="font-medium">{headerVariants.find(h => h.id === selectedHeader)?.name}</p>
                        <p className="text-sm opacity-80 mt-1">Modern navigation design</p>
                      </div>
                    </BaseCard>

                    <BaseCard className="p-6">
                      <h4 className="text-lg font-semibold mb-4">Landing Page Preview</h4>
                      <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg text-center">
                        <p className="font-medium">{landingPageVariants.find(l => l.id === selectedVariant)?.name}</p>
                        <p className="text-sm opacity-80 mt-1">Conversion-optimized layout</p>
                      </div>
                    </BaseCard>

                    <BaseCard className="p-6">
                      <h4 className="text-lg font-semibold mb-4">Footer Preview</h4>
                      <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-center">
                        <p className="font-medium">{footerVariants.find(f => f.id === selectedFooter)?.name}</p>
                        <p className="text-sm opacity-80 mt-1">Engagement-focused design</p>
                      </div>
                    </BaseCard>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Innovations Tab */}
          {activeTab === 'innovations' && (
            <div className="space-y-12">
              <h2 className="text-4xl font-bold text-center mb-8">
                2025 Design Innovations
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {designInnovations.map((innovation, index) => (
                  <div key={index} className="group">
                    <BaseCard className="p-8 h-full bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                          <innovation.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-3">
                            {innovation.title}
                          </h3>
                          <Text className="text-slate-600 mb-4 leading-relaxed">
                            {innovation.description}
                          </Text>
                          <div className="space-y-2">
                            {innovation.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <Text className="text-sm text-slate-600">{feature}</Text>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </BaseCard>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Colors Tab */}
          {activeTab === 'colors' && (
            <div className="space-y-12">
              <h2 className="text-4xl font-bold text-center mb-8">
                2025 Blue Color System
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Primary Blue', color: '#3b82f6', usage: 'Main actions, CTAs, brand elements' },
                  { name: 'Secondary Purple', color: '#a855f7', usage: 'AI features, innovation highlights' },
                  { name: 'Accent Orange', color: '#f97316', usage: 'High-conversion CTAs, urgent actions' },
                  { name: 'Success Green', color: '#10b981', usage: 'Success states, positive feedback' },
                  { name: 'Warning Amber', color: '#f59e0b', usage: 'Warnings, attention elements' },
                  { name: 'Error Red', color: '#ef4444', usage: 'Error states, critical alerts' },
                  { name: 'Neutral Gray', color: '#6b7280', usage: 'Text, borders, backgrounds' },
                  { name: 'Pure White', color: '#ffffff', usage: 'Clean backgrounds, contrast' }
                ].map((color, index) => (
                  <BaseCard key={index} className="p-6 text-center">
                    <div 
                      className="w-full h-20 rounded-lg mb-4 border border-gray-200"
                      style={{ backgroundColor: color.color }}
                    />
                    <h4 className="font-semibold text-gray-900 mb-2">{color.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{color.color}</p>
                    <p className="text-xs text-gray-400">{color.usage}</p>
                  </BaseCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Digital Experience?
            </h2>
            <Text className="text-xl text-white/90 mb-8">
              Get access to all 2025 design innovations, templates, and conversion optimization 
              techniques. Start building the future of web design today.
            </Text>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-white/90 px-8 py-4 text-lg font-semibold"
              >
                Get Full Access
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4"
              >
                View Documentation
              </Button>
            </div>

            <div className="flex justify-center items-center gap-6 mt-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Complete design system</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>React & Next.js ready</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Conversion optimized</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default withErrorBoundary(SimpleDesignSystemShowcase, "SimpleDesignSystemShowcase") 