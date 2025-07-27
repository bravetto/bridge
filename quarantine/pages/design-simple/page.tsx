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

function UltraModernDesignSimple() {
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

  return (
    <LayoutTransition className="min-h-screen overflow-hidden">
      {/* White/Grey Gradient Background - Original Style */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-slate-50/30" />
      
      {/* Ultra Modern Spinning Balls Background - RESTORED FRAMER MOTION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <MotionDiv
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              background: `conic-gradient(from ${i * 60}deg, ${
                i % 3 === 0 ? '#6366f1' : 
                i % 3 === 1 ? '#8b5cf6' : 
                '#06b6d4'
              } 0deg, transparent 120deg, ${
                i % 3 === 0 ? '#6366f1' : 
                i % 3 === 1 ? '#8b5cf6' : 
                '#06b6d4'
              } 240deg, transparent)`,
              left: `${Math.sin(i * 1.2) * 35 + 50}%`,
              top: `${Math.cos(i * 1.2) * 30 + 40}%`,
              opacity: 0.3,
              filter: 'blur(0.5px)',
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.2, 1],
              x: [0, Math.sin(i) * 30, 0],
              y: [0, Math.cos(i) * 20, 0],
            }}
            transition={{
              rotate: { duration: 15 + i * 3, repeat: Infinity, ease: 'linear' },
              scale: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
              x: { duration: 8 + i, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        ))}
        
        {/* Additional floating geometric shapes - RESTORED */}
        {[...Array(8)].map((_, i) => (
          <MotionDiv
            key={`geo-${i}`}
            className="absolute"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              background: `linear-gradient(45deg, ${
                i % 4 === 0 ? '#3b82f6' : 
                i % 4 === 1 ? '#8b5cf6' : 
                i % 4 === 2 ? '#06b6d4' : '#10b981'
              }, transparent)`,
              left: `${(i * 12) % 90 + 5}%`,
              top: `${(i * 8) % 80 + 10}%`,
              opacity: 0.2,
              borderRadius: i % 2 === 0 ? '50%' : '4px',
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2
            }}
          />
        ))}
      </div>

      {/* Mouse Following Gradient - RESTORED */}
      <MotionDiv 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.2), transparent 40%)`
        }}
        animate={{
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Main Content - LEFT ALIGNED as you requested */}
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
              <Badge variant="outline" className="bg-white/60 backdrop-blur-sm border-indigo-200/50">
                <Sparkles className="w-4 h-4 mr-2" />
                Ultra Modern 2025 Design
              </Badge>
            </MotionDiv>

            {/* Main Title - Left Aligned with EPIC animations */}
            <MotionH1 
              variants={fadeInLeft}
              className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-left"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Future
              <br />
              Design
            </MotionH1>

            {/* Subtitle */}
            <MotionH2 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-lg"
            >
              Experience the next generation of web design with ultra-modern aesthetics, 
              epic Framer Motion animations, and championship performance.
            </MotionH2>

            {/* CTA Buttons */}
            <MotionDiv 
              variants={fadeInUp}
              className="flex flex-wrap gap-4"
            >
              <MotionDiv
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Experience Epic Design
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </MotionDiv>
              <MotionDiv
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg" className="bg-white/60 backdrop-blur-sm border-gray-200/50">
                  <Code className="w-5 h-5 mr-2" />
                  View Source
                </Button>
              </MotionDiv>
            </MotionDiv>
          </div>

          {/* Right Column - Feature Cards with EPIC animations */}
          <MotionDiv 
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Feature Card 1 */}
            <MotionDiv 
              variants={scaleIn}
              className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg"
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center space-x-4">
                <MotionDiv 
                  className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Brain className="w-6 h-6 text-white" />
                </MotionDiv>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Restored Framer Motion</h3>
                  <p className="text-gray-600">Epic animations with Perfect Storm protection</p>
                </div>
              </div>
            </MotionDiv>

            {/* Feature Card 2 */}
            <MotionDiv 
              variants={scaleIn}
              className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg"
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center space-x-4">
                <MotionDiv 
                  className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Zap className="w-6 h-6 text-white" />
                </MotionDiv>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Ultra Modern Spinning</h3>
                  <p className="text-gray-600">Geometric shapes with 60fps performance</p>
                </div>
              </div>
            </MotionDiv>

            {/* Feature Card 3 */}
            <MotionDiv 
              variants={scaleIn}
              className="p-6 bg-white/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg"
              whileHover={{ 
                scale: 1.02, 
                y: -8,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center space-x-4">
                <MotionDiv 
                  className="p-3 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl"
                  animate={{ rotateY: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Shield className="w-6 h-6 text-white" />
                </MotionDiv>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">FrozenRouter Safe</h3>
                  <p className="text-gray-600">No more Perfect Storm crashes</p>
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      </Container>

      {/* Performance Stats - Floating */}
      <MotionDiv 
        variants={fadeInUp}
        className="absolute bottom-8 left-8 p-4 bg-white/70 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-lg"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>EPIC • Restored • 60fps • Storm-Safe</span>
        </div>
      </MotionDiv>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <MotionDiv 
          variants={fadeInUp}
          className="absolute bottom-8 right-8 p-3 bg-gray-900/80 backdrop-blur-xl rounded-lg text-white text-xs font-mono"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div>✅ Original Epic Design Restored</div>
          <div>🎭 Framer Motion: Safe</div>
          <div>🌪️ Storm: {stormDetector.isStormDetected ? 'Detected but Protected' : 'Clear'}</div>
        </MotionDiv>
      )}
    </LayoutTransition>
  )
}

export default withErrorBoundary(UltraModernDesignSimple, "UltraModernDesignSimple") 