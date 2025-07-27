'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  LayoutTransition,
  MotionDiv,
  MotionH1,
  MotionSection
} from '@/components/ui/framer-motion-safe'
import { 
  Sparkles, 
  ArrowRight, 
  Palette,
  Code,
  Zap,
  Star
} from 'lucide-react'

function OriginalEpicRestored() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Recreating the original blue palette from the 2025-blue-color-system.css
  const blueColors = [
    { name: 'Blue 50', color: '#eff6ff', usage: 'Lightest backgrounds' },
    { name: 'Blue 100', color: '#dbeafe', usage: 'Card backgrounds' },
    { name: 'Blue 200', color: '#bfdbfe', usage: 'Hover states' },
    { name: 'Blue 300', color: '#93c5fd', usage: 'Borders' },
    { name: 'Blue 400', color: '#60a5fa', usage: 'Interactive elements' },
    { name: 'Blue 500', color: '#3b82f6', usage: 'Primary brand' },
    { name: 'Blue 600', color: '#2563eb', usage: 'Primary hover' },
    { name: 'Blue 700', color: '#1d4ed8', usage: 'Primary active' },
    { name: 'Blue 800', color: '#1e40af', usage: 'Dark mode primary' },
    { name: 'Blue 900', color: '#1e3a8a', usage: 'Darkest blue' },
    { name: 'Blue 950', color: '#172554', usage: 'Deep contrast' },
    { name: 'Indigo 500', color: '#6366f1', usage: 'Secondary accent' },
    { name: 'Sky 500', color: '#0ea5e9', usage: 'Info states' },
    { name: 'Cyan 500', color: '#06b6d4', usage: 'Fresh accents' },
    { name: 'Slate 500', color: '#64748b', usage: 'Neutral text' },
    { name: 'Steel Blue', color: '#4682b4', usage: 'Professional tone' }
  ]

  return (
    <LayoutTransition className="min-h-screen overflow-hidden">
      {/* White/Grey Gradient Background - Original Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30" />
      
      {/* Ultra Modern Spinning Balls - RESTORED ORIGINAL FRAMER MOTION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <MotionDiv
            key={i}
            className="absolute rounded-full opacity-30"
            style={{
              width: `${120 + i * 40}px`,
              height: `${120 + i * 40}px`,
              background: `conic-gradient(from ${i * 45}deg, ${
                i % 4 === 0 ? '#8b5cf6' : 
                i % 4 === 1 ? '#3b82f6' : 
                i % 4 === 2 ? '#06b6d4' : '#f59e0b'
              } 0deg, transparent 90deg, ${
                i % 4 === 0 ? '#8b5cf6' : 
                i % 4 === 1 ? '#3b82f6' : 
                i % 4 === 2 ? '#06b6d4' : '#f59e0b'
              } 180deg, transparent 270deg)`,
              left: `${Math.sin(i * 0.8) * 30 + 50}%`,
              top: `${Math.cos(i * 0.8) * 25 + 40}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 8 + i * 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Container className="py-20">
          {/* Header Section - Left Aligned */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <MotionDiv
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-blue-200">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ultra Modern 2025 Design System
                </Badge>
                
                <MotionH1 
                  className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  INCREDIBLE
                  <br />
                  DESIGN
                </MotionH1>
                
                <MotionDiv
                  className="text-xl text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  The original ultra modern design system with glassmorphic cards,
                  spinning animations, and championship-level performance.
                </MotionDiv>
              </MotionDiv>
            </div>
            
            <MotionDiv
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full backdrop-blur-xl border border-white/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Palette className="w-16 h-16 text-blue-500" />
                </div>
              </div>
            </MotionDiv>
          </div>

          {/* Tab Navigation - Original Pattern */}
          <MotionDiv
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex space-x-1 bg-white/60 backdrop-blur-xl rounded-xl p-2 border border-gray-200/50 w-fit">
              {[
                { id: 'overview', label: 'Overview', icon: Star },
                { id: 'colors', label: 'Colors', icon: Palette },
                { id: 'animations', label: 'Live Demos', icon: Zap },
                { id: 'innovations', label: 'Innovations', icon: Code }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === id
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </MotionDiv>

          {/* Tab Content */}
          <MotionSection
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[400px]"
          >
            {activeTab === 'colors' && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Complete Blue Spectrum</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {blueColors.map((color, index) => (
                    <MotionDiv
                      key={color.name}
                      className="p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div
                        className="w-full h-16 rounded-lg mb-4 border border-gray-200/50"
                        style={{ backgroundColor: color.color }}
                      />
                      <h3 className="font-semibold text-gray-800 mb-2">{color.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{color.color}</p>
                      <p className="text-xs text-gray-500">{color.usage}</p>
                    </MotionDiv>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: 'Glassmorphic Design', desc: 'Backdrop blur and transparency effects', icon: Sparkles },
                  { title: 'Framer Motion', desc: 'Smooth, hardware-accelerated animations', icon: Zap },
                  { title: 'Championship Performance', desc: '60fps animations, <100ms response times', icon: Star }
                ].map((feature, index) => (
                  <MotionDiv
                    key={feature.title}
                    className="p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                  >
                    <feature.icon className="w-8 h-8 text-blue-500 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.desc}</p>
                  </MotionDiv>
                ))}
              </div>
            )}

            {activeTab === 'animations' && (
              <div className="text-center py-16">
                <MotionDiv
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-block p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl backdrop-blur-xl border border-white/20"
                >
                  <Zap className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800">Live Animation Demo</h3>
                  <p className="text-gray-600 mt-2">Hover to see the magic!</p>
                </MotionDiv>
              </div>
            )}

            {activeTab === 'innovations' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-gray-800">2025 Innovations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'FrozenRouter Pattern - Perfect Storm Prevention',
                    'CSS-First Animations with Framer Motion Fallbacks',
                    'Glassmorphic UI Components',
                    'Hardware-Accelerated Transforms'
                  ].map((innovation, index) => (
                    <MotionDiv
                      key={innovation}
                      className="p-4 bg-white/40 backdrop-blur-lg rounded-xl border border-gray-200/50"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Code className="w-5 h-5 text-blue-500 mb-2" />
                      <p className="text-gray-700">{innovation}</p>
                    </MotionDiv>
                  ))}
                </div>
              </div>
            )}
          </MotionSection>
        </Container>
      </div>
    </LayoutTransition>
  )
}

export default withErrorBoundary(OriginalEpicRestored, "OriginalEpicRestored") 