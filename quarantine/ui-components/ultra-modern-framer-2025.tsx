'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { 
  MotionDiv,
  MotionSection,
  fadeInUp,
  fadeIn,
  slideInLeft,
  scaleIn,
  staggerContainer,
  staggerItem,
  hoverScale,
  hoverLift,
  SharedLayout
} from '@/components/ui/framer-motion-wrapper'
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  Palette,
  Layout,
  Settings,
  Zap,
  Copy,
  Check,
  Brain,
  Target,
  TrendingUp,
  Heart,
  Rocket
} from 'lucide-react'

interface UltraModernFramer2025Props {
  className?: string
}

export function UltraModernFramer2025({ className }: UltraModernFramer2025Props) {
  const [activeTab, setActiveTab] = useState('colors')
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const tabs = [
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'layouts', label: 'Layouts', icon: Layout },
    { id: 'effects', label: 'Effects', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const blueVariations = [
    { name: 'Light Blue', value: '#ADD8E6', gradient: 'from-blue-100 to-blue-300' },
    { name: 'Powder Blue', value: '#B0E0E6', gradient: 'from-blue-200 to-blue-400' },
    { name: 'Sky Blue', value: '#87CEEB', gradient: 'from-sky-300 to-sky-600' },
    { name: 'Electric Blue', value: '#7DF9FF', gradient: 'from-cyan-300 to-blue-500' },
    { name: 'Deep Sky Blue', value: '#00BFFF', gradient: 'from-sky-400 to-blue-600' },
    { name: 'Cyan Blue', value: '#00BFFF', gradient: 'from-cyan-400 to-blue-600' },
    { name: 'Dodger Blue', value: '#1E90FF', gradient: 'from-blue-500 to-blue-700' },
    { name: 'Cornflower Blue', value: '#6495ED', gradient: 'from-blue-400 to-indigo-600' },
    { name: 'Steel Blue', value: '#4682B4', gradient: 'from-slate-500 to-blue-600' },
    { name: 'Royal Blue', value: '#4169E1', gradient: 'from-blue-700 to-indigo-800' },
    { name: 'Ocean Blue', value: '#0066CC', gradient: 'from-blue-600 to-blue-800' },
    { name: 'Medium Blue', value: '#0000CD', gradient: 'from-blue-600 to-blue-800' },
    { name: 'Sapphire Blue', value: '#0F52BA', gradient: 'from-blue-700 to-indigo-900' },
    { name: 'Midnight Blue', value: '#191970', gradient: 'from-slate-800 to-blue-900' },
    { name: 'Navy Blue', value: '#000080', gradient: 'from-navy-600 to-navy-900' },
    { name: 'Dark Blue', value: '#00008B', gradient: 'from-blue-800 to-blue-950' }
  ]

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Design",
      description: "Intelligent design systems that adapt to user behavior and preferences.",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: Sparkles,
      title: "Framer Motion Enhanced",
      description: "Smooth animations powered by battle-tested Framer Motion integration.",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "Zero-compromise performance with advanced animation techniques.",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Target,
      title: "Framework Safe",
      description: "Engineered to work flawlessly with Next.js 15 and React 18.",
      gradient: "from-green-500 to-emerald-600"
    }
  ]

  const stats = [
    { label: "Animation Performance", value: "60fps", icon: TrendingUp },
    { label: "Framework Compatibility", value: "100%", icon: Heart },
    { label: "Load Time", value: "<1.2s", icon: Rocket },
    { label: "User Satisfaction", value: "99%", icon: Star }
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
      {/* Ultra Modern Spinning Ball Animations - Enhanced with Framer Motion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large Primary Spinning Ball */}
        <MotionDiv 
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-600/20 backdrop-blur-3xl shadow-2xl"
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Medium Secondary Ball */}
        <MotionDiv 
          className="absolute top-60 left-40 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-300/15 to-blue-500/15 backdrop-blur-2xl shadow-xl"
          animate={{ 
            rotate: -360,
            y: [0, -20, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 7, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Small Accent Ball */}
        <MotionDiv 
          className="absolute bottom-40 right-60 w-32 h-32 rounded-full bg-gradient-to-br from-indigo-400/25 to-blue-600/25 backdrop-blur-xl shadow-lg"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 10, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Floating Elements */}
        <MotionDiv 
          className="absolute top-40 left-20 w-16 h-16 rounded-full bg-gradient-to-r from-blue-300/30 to-cyan-400/30"
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        />
        
        <MotionDiv 
          className="absolute bottom-60 left-80 w-20 h-20 rounded-full bg-gradient-to-r from-purple-300/20 to-blue-400/20"
          animate={{ 
            y: [0, -25, 0],
            x: [0, 15, 0],
            rotate: [0, -360]
          }}
          transition={{ 
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
            rotate: { duration: 12, repeat: Infinity, ease: "linear" }
          }}
        />
        
        {/* Orbital Ring Effect */}
        <MotionDiv 
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 border border-blue-200/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <MotionDiv 
            className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400/60 rounded-full -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <MotionDiv 
            className="absolute bottom-0 left-1/2 w-3 h-3 bg-purple-400/60 rounded-full -translate-x-1/2 translate-y-1/2"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </MotionDiv>
      </div>

      {/* Main Content */}
      <Container className="relative z-10 py-20">
        {/* Left-Aligned Epic Header with Framer Motion */}
        <MotionSection 
          className="max-w-4xl mb-20"
          {...fadeInUp}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <MotionDiv 
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-lg rounded-full border border-white/30 shadow-lg mb-6"
              {...scaleIn}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <Text className="text-sm font-medium text-slate-700">Ultra Modern 2025 Design System</Text>
            </MotionDiv>
            
            <MotionDiv {...slideInLeft} transition={{ duration: 0.8, delay: 0.3 }}>
              <Heading as="h1" size="h1" className="text-7xl md:text-8xl font-bold text-left mb-6 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent">
                  The Future of
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                  Animated Excellence
                </span>
              </Heading>
            </MotionDiv>
            
            <MotionDiv {...fadeInUp} transition={{ duration: 0.8, delay: 0.5 }}>
              <Text className="text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
                Experience the pinnacle of 2025 design innovation with battle-tested Framer Motion animations, 
                glassmorphic interfaces, and a framework-safe design system that works flawlessly with Next.js 15.
              </Text>
            </MotionDiv>
            
            <MotionDiv 
              className="flex items-center gap-4"
              {...staggerContainer}
            >
              <MotionDiv 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold shadow-xl"
                >
                  Explore Animations
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </MotionDiv>
              
              <MotionDiv 
                className="flex items-center gap-2"
                {...staggerItem}
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Text className="ml-2 text-slate-600 font-medium">Perfect 5.0 Rating</Text>
              </MotionDiv>
            </MotionDiv>
          </div>
        </MotionSection>

        {/* 4-Tab Navigation Menu with Shared Layout Animation */}
        <MotionDiv 
          className="mb-12"
          {...fadeIn}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="flex flex-wrap gap-2 p-2 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg inline-flex relative">
            {tabs.map((tab) => (
              <MotionDiv 
                key={tab.id} 
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 relative z-10 ${
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
                                 {activeTab === tab.id && (
                   <SharedLayout
                     layoutId="activeTab"
                     className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg"
                   >
                     <div />
                   </SharedLayout>
                 )}
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

        {/* Tab Content with Stagger Animations */}
        <MotionDiv className="space-y-8" {...staggerContainer}>
                     {activeTab === 'colors' && (
             <MotionDiv className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <MotionDiv {...staggerItem}>
                <Heading as="h2" size="h2" className="text-4xl font-bold text-slate-900 mb-4">
                  Blue Color Variations
                </Heading>
                <Text className="text-xl text-slate-600 mb-8">
                  Comprehensive collection of 16 blue variations for ultra-modern interfaces
                </Text>
              </MotionDiv>

              <MotionDiv 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                {...staggerContainer}
              >
                {blueVariations.map((color, index) => (
                  <MotionDiv 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ y: -2, scale: 0.98 }}
                  >
                    <Card 
                      className="group p-4 bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg cursor-pointer h-64 flex flex-col w-full"
                      onClick={() => copyToClipboard(color.value, color.name)}
                    >
                      <div 
                        className="w-full h-28 rounded-lg mb-4 relative overflow-hidden flex-shrink-0 border-2 border-gray-300"
                        style={{ 
                          backgroundColor: color.value + ' !important',
                          background: color.value + ' !important',
                          minHeight: '112px',
                          color: color.value
                        }}
                      >
                        <MotionDiv 
                          className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {copiedColor === color.name ? (
                            <Check className="w-6 h-6 text-white" />
                          ) : (
                            <Copy className="w-6 h-6 text-white" />
                          )}
                        </MotionDiv>
                      </div>
                      <div className="flex-1 flex flex-col justify-between overflow-hidden">
                        <div className="flex-1 min-h-0">
                          <Heading as="h3" size="h3" className="text-sm font-semibold text-slate-900 mb-2 leading-tight truncate">
                            {color.name}
                          </Heading>
                          <Text className="text-slate-600 font-mono text-xs mb-2 truncate">
                            {color.value}
                          </Text>
                        </div>
                        <MotionDiv 
                          className="mt-auto flex-shrink-0"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Text className="text-xs text-blue-600 font-medium">
                            Click to copy
                          </Text>
                        </MotionDiv>
                      </div>
                    </Card>
                  </MotionDiv>
                ))}
              </MotionDiv>
            </MotionDiv>
          )}

                     {activeTab === 'layouts' && (
             <MotionDiv className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <MotionDiv {...staggerItem}>
                <Heading as="h2" size="h2" className="text-4xl font-bold text-slate-900 mb-4">
                  Animation Features
                </Heading>
                <Text className="text-xl text-slate-600 mb-8">
                  Battle-tested Framer Motion patterns for Next.js 15
                </Text>
              </MotionDiv>

              <MotionDiv 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                {...staggerContainer}
              >
                {features.map((feature, index) => (
                  <MotionDiv 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ y: -2, scale: 0.98 }}
                  >
                    <Card className="p-8 bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg">
                      <MotionDiv 
                        className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </MotionDiv>
                      <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-3">
                        {feature.title}
                      </Heading>
                      <Text className="text-slate-600">
                        {feature.description}
                      </Text>
                    </Card>
                  </MotionDiv>
                ))}
              </MotionDiv>
            </MotionDiv>
          )}

                     {activeTab === 'effects' && (
             <MotionDiv className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <MotionDiv {...staggerItem}>
                <Heading as="h2" size="h2" className="text-4xl font-bold text-slate-900 mb-4">
                  Performance Stats
                </Heading>
                <Text className="text-xl text-slate-600 mb-8">
                  Real-world performance metrics with Framer Motion
                </Text>
              </MotionDiv>

              <MotionDiv 
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                {...staggerContainer}
              >
                {stats.map((stat, index) => (
                  <MotionDiv 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="p-6 bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg text-center">
                      <MotionDiv 
                        className="flex justify-center mb-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <stat.icon className="w-8 h-8 text-blue-600" />
                      </MotionDiv>
                      <MotionDiv 
                        className="text-3xl font-bold text-slate-900 mb-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15, delay: index * 0.1 }}
                      >
                        {stat.value}
                      </MotionDiv>
                      <Text className="text-slate-600 text-sm">{stat.label}</Text>
                    </Card>
                  </MotionDiv>
                ))}
              </MotionDiv>
            </MotionDiv>
          )}

                     {activeTab === 'settings' && (
             <MotionDiv className="space-y-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <MotionDiv {...staggerItem}>
                <Heading as="h2" size="h2" className="text-4xl font-bold text-slate-900 mb-4">
                  Framework Integration
                </Heading>
                <Text className="text-xl text-slate-600 mb-8">
                  Safe Framer Motion patterns for production applications
                </Text>
              </MotionDiv>

              <MotionDiv 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                {...staggerContainer}
              >
                <MotionDiv 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ y: -2, scale: 0.98 }}
                >
                  <Card className="p-8 bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg">
                    <Settings className="w-12 h-12 text-blue-600 mb-4" />
                    <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-6">
                      Battle-Tested Patterns
                    </Heading>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Text className="text-slate-700">FrozenRouter</Text>
                        <div className="w-24 h-2 bg-slate-200 rounded-full">
                          <MotionDiv 
                            className="h-2 bg-green-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Text className="text-slate-700">Safe Transitions</Text>
                        <div className="w-24 h-2 bg-slate-200 rounded-full">
                          <MotionDiv 
                            className="h-2 bg-blue-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "90%" }}
                            transition={{ duration: 1, delay: 0.7 }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Text className="text-slate-700">Performance</Text>
                        <div className="w-24 h-2 bg-slate-200 rounded-full">
                          <MotionDiv 
                            className="h-2 bg-purple-600 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: "95%" }}
                            transition={{ duration: 1, delay: 0.9 }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </MotionDiv>

                <MotionDiv 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ y: -2, scale: 0.98 }}
                >
                  <Card className="p-8 bg-white/60 backdrop-blur-xl border border-white/30 shadow-lg">
                    <Zap className="w-12 h-12 text-blue-600 mb-4" />
                    <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-6">
                      Framework Compatibility
                    </Heading>
                    <div className="space-y-4">
                      {['Next.js 15', 'React 18', 'TypeScript 5'].map((framework, index) => (
                        <MotionDiv 
                          key={index} 
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 + 1 }}
                        >
                          <MotionDiv 
                            className="w-4 h-4 rounded-full bg-green-600"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.2 + 1.2 }}
                          />
                          <Text className="text-slate-700">{framework}</Text>
                        </MotionDiv>
                      ))}
                    </div>
                  </Card>
                </MotionDiv>
              </MotionDiv>
            </MotionDiv>
          )}
        </MotionDiv>
      </Container>
    </div>
  )
}

export default withErrorBoundary(UltraModernFramer2025, "UltraModernFramer2025") 