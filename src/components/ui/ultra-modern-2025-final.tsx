'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  Palette,
  Layout,
  Settings,
  Zap,
  Copy,
  Check
} from 'lucide-react'

interface UltraModern2025FinalProps {
  className?: string
}

export function UltraModern2025Final({ className }: UltraModern2025FinalProps) {
  const [activeTab, setActiveTab] = useState('colors')
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const tabs = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'layouts', label: 'Layouts', icon: Layout },
    { id: 'effects', label: 'Effects', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const blueVariations = [
    { name: 'Ocean Blue', value: '#0066CC', gradient: 'from-blue-600 to-blue-800' },
    { name: 'Sky Blue', value: '#87CEEB', gradient: 'from-sky-300 to-sky-600' },
    { name: 'Royal Blue', value: '#4169E1', gradient: 'from-blue-700 to-indigo-800' },
    { name: 'Navy Blue', value: '#000080', gradient: 'from-navy-600 to-navy-900' },
    { name: 'Cyan Blue', value: '#00BFFF', gradient: 'from-cyan-400 to-blue-600' },
    { name: 'Electric Blue', value: '#7DF9FF', gradient: 'from-cyan-300 to-blue-500' },
    { name: 'Midnight Blue', value: '#191970', gradient: 'from-slate-800 to-blue-900' },
    { name: 'Steel Blue', value: '#4682B4', gradient: 'from-slate-500 to-blue-600' },
    { name: 'Powder Blue', value: '#B0E0E6', gradient: 'from-blue-200 to-blue-400' },
    { name: 'Cornflower Blue', value: '#6495ED', gradient: 'from-blue-400 to-indigo-600' },
    { name: 'Dodger Blue', value: '#1E90FF', gradient: 'from-blue-500 to-blue-700' },
    { name: 'Deep Sky Blue', value: '#00BFFF', gradient: 'from-sky-400 to-blue-600' },
    { name: 'Light Blue', value: '#ADD8E6', gradient: 'from-blue-100 to-blue-300' },
    { name: 'Medium Blue', value: '#0000CD', gradient: 'from-blue-600 to-blue-800' },
    { name: 'Dark Blue', value: '#00008B', gradient: 'from-blue-800 to-blue-950' },
    { name: 'Sapphire Blue', value: '#0F52BA', gradient: 'from-blue-700 to-indigo-900' }
  ]

  const copyToClipboard = async (color: string, name: string) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopiedColor(name)
      setTimeout(() => setCopiedColor(null), 2000)
    } catch (err) {
      console.error('Failed to copy color:', err)
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 relative overflow-hidden ${className}`}>
      {/* Ultra Modern Spinning Ball Animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large Primary Spinning Ball */}
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 backdrop-blur-3xl animate-spin-slow shadow-2xl" 
             style={{ animationDuration: '20s' }} />
        
        {/* Medium Secondary Ball */}
        <div className="absolute top-60 left-40 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-300/15 to-blue-500/15 backdrop-blur-2xl animate-spin-reverse shadow-xl" 
             style={{ animationDuration: '15s' }} />
        
        {/* Small Accent Ball */}
        <div className="absolute bottom-40 right-60 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400/25 to-blue-600/25 backdrop-blur-xl animate-pulse shadow-lg" />
        
        {/* Micro Floating Elements */}
        <div className="absolute top-40 left-20 w-16 h-16 rounded-full bg-gradient-to-r from-blue-300/30 to-cyan-400/30 animate-bounce" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-60 left-80 w-20 h-20 rounded-full bg-gradient-to-r from-purple-300/20 to-blue-400/20 animate-bounce" 
             style={{ animationDelay: '2s' }} />
        
        {/* Orbital Ring Effect */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 border border-blue-200/20 rounded-full animate-spin-slow" 
             style={{ animationDuration: '30s' }}>
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400/60 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-purple-400/60 rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>
      </div>

      {/* Main Content */}
      <Container className="relative z-10 py-20">
        {/* Left-Aligned Epic Header */}
        <div className="max-w-4xl mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-lg rounded-full border border-white/30 shadow-lg mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <Text className="text-sm font-medium text-slate-700">Ultra Modern 2025 Design System</Text>
            </div>
            
            <Heading as="h1" size="h1" className="text-7xl md:text-8xl font-bold text-left mb-6 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent">
                The Future of
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                Digital Excellence
              </span>
            </Heading>
            
            <Text className="text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
              Experience the pinnacle of 2025 design innovation with ultra-modern spinning animations, 
              glassmorphic interfaces, and a comprehensive design system that redefines digital experiences.
            </Text>
            
            <div className="flex items-center gap-4">
              <Button 
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl"
              >
                Explore Design System
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Text className="ml-2 text-slate-600 font-medium">Perfect 5.0 Rating</Text>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Tab Navigation Menu */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 p-2 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/80 text-blue-600 shadow-lg backdrop-blur-sm'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-white/40'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'colors' && (
            <div className="space-y-8">
              <div>
                <Heading as="h2" size="h2" className="text-4xl font-bold text-slate-900 mb-4">
                  Blue Color Variations
                </Heading>
                <Text className="text-xl text-slate-600 mb-8">
                  Comprehensive collection of 16 blue variations for ultra-modern interfaces
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {blueVariations.map((color, index) => (
                  <Card 
                    key={index}
                    className="group p-6 bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                    onClick={() => copyToClipboard(color.value, color.name)}
                  >
                    <div className={`w-full h-24 bg-gradient-to-br ${color.gradient} rounded-xl mb-4 shadow-inner relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {copiedColor === color.name ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : (
                          <Copy className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </div>
                    <Heading as="h3" size="h3" className="text-lg font-semibold text-slate-900 mb-2">
                      {color.name}
                    </Heading>
                    <Text className="text-slate-600 font-mono text-sm">
                      {color.value}
                    </Text>
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Text className="text-xs text-blue-600 font-medium">
                        Click to copy
                      </Text>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'layouts' && (
            <div className="space-y-8">
              <div>
                <Heading as="h2" size="h2" className="text-4xl font-bold text-slate-900 mb-4">
                  Layout Components
                </Heading>
                <Text className="text-xl text-slate-600 mb-8">
                  Ultra-modern layout patterns for 2025 interfaces
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Hero Sections', description: 'Epic landing page headers with dynamic backgrounds' },
                  { title: 'Card Layouts', description: 'Glassmorphic cards with advanced hover effects' },
                  { title: 'Navigation', description: 'Floating navigation with smooth transitions' },
                  { title: 'Grids', description: 'Responsive grid systems with intelligent spacing' },
                  { title: 'Sidebars', description: 'Collapsible sidebars with blur effects' },
                  { title: 'Modals', description: 'Immersive modal dialogs with backdrop blur' }
                ].map((layout, index) => (
                  <Card key={index} className="p-8 bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <Layout className="w-12 h-12 text-blue-600 mb-4" />
                    <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-3">
                      {layout.title}
                    </Heading>
                    <Text className="text-slate-600">
                      {layout.description}
                    </Text>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'effects' && (
            <div className="space-y-8">
              <div>
                <Heading as="h2" size="h2" className="text-4xl font-bold text-slate-900 mb-4">
                  Visual Effects
                </Heading>
                <Text className="text-xl text-slate-600 mb-8">
                  Advanced animations and effects for immersive experiences
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: 'Spinning Animations', description: 'Ultra-smooth orbital and rotation effects', icon: Zap },
                  { title: 'Glassmorphism', description: 'Advanced glass effects with backdrop blur', icon: Sparkles },
                  { title: 'Gradient Overlays', description: 'Dynamic gradient animations and transitions', icon: Palette },
                  { title: 'Particle Systems', description: 'Floating elements and interactive particles', icon: Star }
                ].map((effect, index) => (
                  <Card key={index} className="p-8 bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                    <effect.icon className="w-12 h-12 text-blue-600 mb-4" />
                    <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-3">
                      {effect.title}
                    </Heading>
                    <Text className="text-slate-600">
                      {effect.description}
                    </Text>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <Heading as="h2" size="h2" className="text-4xl font-bold text-slate-900 mb-4">
                  Design Settings
                </Heading>
                <Text className="text-xl text-slate-600 mb-8">
                  Customize your ultra-modern design experience
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="p-8 bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg">
                  <Settings className="w-12 h-12 text-blue-600 mb-4" />
                  <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-6">
                    Animation Controls
                  </Heading>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Text className="text-slate-700">Spinning Speed</Text>
                      <div className="w-24 h-2 bg-slate-200 rounded-full">
                        <div className="w-3/4 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text className="text-slate-700">Blur Intensity</Text>
                      <div className="w-24 h-2 bg-slate-200 rounded-full">
                        <div className="w-2/3 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Text className="text-slate-700">Opacity Level</Text>
                      <div className="w-24 h-2 bg-slate-200 rounded-full">
                        <div className="w-1/2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg">
                  <Palette className="w-12 h-12 text-blue-600 mb-4" />
                  <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-6">
                    Theme Options
                  </Heading>
                  <div className="space-y-4">
                    {['Light Mode', 'Dark Mode', 'Auto Mode'].map((mode, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${index === 0 ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`} />
                        <Text className="text-slate-700">{mode}</Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </Container>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse linear infinite;
        }
      `}</style>
    </div>
  )
}

export default withErrorBoundary(UltraModern2025Final, "UltraModern2025Final") 