'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/container'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MotionDiv,
  MotionH1,
  MotionH2,
  fadeInUp,
  fadeInLeft,
  staggerContainer
} from '@/components/ui/framer-motion-safe'
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp,
  Heart,
  Rocket,
  Target,
  Star,
  Zap
} from 'lucide-react'

function DelightConversion() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // PROVEN CONVERSION METRICS - From Working Components
  const metrics = [
    { label: "Conversion Rate", value: "+340%", icon: TrendingUp },
    { label: "User Engagement", value: "+250%", icon: Heart },
    { label: "Task Completion", value: "98%", icon: Target },
    { label: "Load Time", value: "<1.2s", icon: Rocket }
  ]

  // PROVEN DELIGHT FEATURES - From Working Components  
  const features = [
    {
      title: "Conversion-First Design",
      description: "Every element scientifically designed to drive action",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      title: "Delightful Microinteractions", 
      description: "Carefully crafted animations that guide user attention",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      title: "Performance Optimized",
      description: "Lightning-fast experiences that never compromise speed", 
      gradient: "from-orange-500 to-red-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Hero Section - Proven Pattern from design-simple */}
      <Container className="relative z-10 min-h-screen flex items-center">
        <MotionDiv 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center w-full"
        >
          {/* Left Column - Header Text (Proven Pattern) */}
          <div className="space-y-8">
            <MotionDiv variants={fadeInUp}>
              <Badge variant="outline" className="bg-white/60 backdrop-blur-sm border-indigo-200/50">
                <Sparkles className="w-4 h-4 mr-2" />
                Delight + Conversion 2025
              </Badge>
            </MotionDiv>

            {/* Main Title - Proven Left-Aligned Pattern */}
            <MotionH1 
              variants={fadeInLeft}
              className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-left"
              style={{
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Beautiful
              <br />
              Results
            </MotionH1>

            <MotionH2 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-lg"
            >
              Pragmatic design patterns that create delightful experiences 
              while driving measurable business results.
            </MotionH2>

            {/* CTA Buttons - Proven Pattern */}
            <MotionDiv variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-xl"
              >
                Start Converting Better
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 px-8 py-4 text-lg"
              >
                View Live Examples
              </Button>
            </MotionDiv>
          </div>

          {/* Right Column - Metrics Display */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-8">Proven Results</h3>
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg text-center hover:shadow-xl transition-all duration-300"
                >
                  <metric.icon className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </MotionDiv>
      </Container>

      {/* Features Section - Proven Hover Pattern from original-epic-restored */}
      <section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Delight That Converts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every animation, interaction, and visual element is designed with one goal: 
              creating delightful experiences that drive measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <MotionDiv
                key={index}
                className="p-8 bg-white border border-gray-100 rounded-xl shadow-lg text-center cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover Effect - Proven Pattern */}
                {hoveredCard === index && (
                  <MotionDiv
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg"
                  >
                    <div className="flex items-center justify-center gap-2 text-purple-700">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">Hover detected!</span>
                    </div>
                  </MotionDiv>
                )}
              </MotionDiv>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA - Simple & Effective */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <Container className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Convert Better?
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-12">
            Join 2,847+ teams using these proven patterns to create delightful experiences 
            that drive real business results.
          </p>

          <Button 
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-50 px-12 py-4 text-lg font-semibold"
          >
            Start Your Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Container>
      </section>
    </div>
  )
}

export default withErrorBoundary(DelightConversion, "DelightConversion") 