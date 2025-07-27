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
  MotionH2,
  fadeInUp,
  fadeInLeft,
  scaleIn,
  staggerContainer,
  usePerfectStormDetector
} from '@/components/ui/framer-motion-safe'
import { 
  Sparkles, 
  ArrowRight, 
  Brain,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Star,
  Palette,
  Code
} from 'lucide-react'

function UltraModern2025Design() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const stormDetector = usePerfectStormDetector()

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Show storm detection status
  if (stormDetector.isStormDetected) {
    console.warn('🌪️ Perfect Storm detected but handled safely!')
  }

  return (
    <LayoutTransition className="min-h-screen overflow-hidden">
      {/* White/Grey Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-slate-100" />
      
      {/* Animated Background Orbs - Ultra Modern Spinning Balls */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Large Spinning Ball 1 */}
        <MotionDiv
          className="absolute w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
            top: '10%',
            left: '15%',
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
        
        {/* Large Spinning Ball 2 */}
        <MotionDiv
          className="absolute w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'conic-gradient(from 180deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)',
            top: '60%',
            right: '10%',
          }}
          animate={{
            rotate: -360,
            scale: [1, 0.9, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: 'linear' },
            scale: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
        
        {/* Medium Spinning Ball 3 */}
        <MotionDiv
          className="absolute w-64 h-64 rounded-full opacity-25"
          style={{
            background: 'conic-gradient(from 90deg, #8b5cf6, #06b6d4, #3b82f6, #8b5cf6)',
            top: '30%',
            right: '60%',
          }}
          animate={{
            rotate: 360,
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            rotate: { duration: 15, repeat: Infinity, ease: 'linear' },
            x: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
        
        {/* Small Floating Orbs */}
        {[...Array(6)].map((_, i) => (
          <MotionDiv
            key={i}
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: `conic-gradient(from ${i * 60}deg, #3b82f6, #8b5cf6, #06b6d4)`,
              opacity: 0.1,
              top: `${20 + (i * 15)}%`,
              left: `${10 + (i * 12)}%`,
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.2, 1],
              x: [0, Math.sin(i) * 30, 0],
              y: [0, Math.cos(i) * 20, 0],
            }}
            transition={{
              rotate: { duration: 18 + i * 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 8 + i, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        ))}
      </div>

      {/* Mouse Following Gradient */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1), transparent 40%)`
        }}
      />

      {/* Main Content */}
      <Container className="relative z-10 min-h-screen flex items-center">
        <MotionDiv 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center w-full"
        >
          {/* Left Column - Header Text Styled to Left */}
          <div className="space-y-8">
            {/* Badge */}
            <MotionDiv variants={fadeInUp}>
              <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-blue-200/50">
                <Sparkles className="w-4 h-4 mr-2" />
                Ultra Modern 2025 Design
              </Badge>
            </MotionDiv>

            {/* Main Title - Left Aligned */}
            <MotionH1 
              variants={fadeInLeft}
              className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-left"
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Future
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Design
              </span>
            </MotionH1>

            {/* Subtitle */}
            <MotionH2 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-lg"
            >
              Experience the next generation of web design with ultra-modern aesthetics, 
              liquid animations, and championship performance.
            </MotionH2>

            {/* CTA Buttons */}
            <MotionDiv 
              variants={fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Experience Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="bg-white/50 backdrop-blur-sm border-gray-200/50">
                <Code className="w-5 h-5 mr-2" />
                View Code
              </Button>
            </MotionDiv>
          </div>

          {/* Right Column - Feature Cards */}
          <MotionDiv 
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Feature Card 1 */}
            <MotionDiv 
              variants={scaleIn}
              className="p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">AI-Powered Design</h3>
                  <p className="text-gray-600">Intelligent layouts that adapt to user behavior</p>
                </div>
              </div>
            </MotionDiv>

            {/* Feature Card 2 */}
            <MotionDiv 
              variants={scaleIn}
              className="p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Lightning Fast</h3>
                  <p className="text-gray-600">Championship performance with 60fps animations</p>
                </div>
              </div>
            </MotionDiv>

            {/* Feature Card 3 */}
            <MotionDiv 
              variants={scaleIn}
              className="p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Storm Resistant</h3>
                  <p className="text-gray-600">Perfect Storm prevention with FrozenRouter</p>
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      </Container>

      {/* Performance Stats */}
      <MotionDiv 
        variants={fadeInUp}
        className="absolute bottom-8 left-8 p-4 bg-white/60 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-lg"
      >
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>27-131ms API • 9.0s builds • 0 errors</span>
        </div>
      </MotionDiv>

      {/* Debug Info (Development) */}
      {process.env.NODE_ENV === 'development' && (
        <MotionDiv 
          variants={fadeInUp}
          className="absolute bottom-8 right-8 p-3 bg-gray-900/80 backdrop-blur-xl rounded-lg text-white text-xs font-mono"
        >
          <div>Segment: {stormDetector.segment || 'null'}</div>
          <div>Renders: {stormDetector.renderCount}</div>
          <div>Storm: {stormDetector.isStormDetected ? '🌪️' : '✅'}</div>
        </MotionDiv>
      )}
    </LayoutTransition>
  )
}

export default withErrorBoundary(UltraModern2025Design, "UltraModern2025Design") 