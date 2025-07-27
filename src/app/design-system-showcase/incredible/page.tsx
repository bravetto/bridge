'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/typography'
import { BaseCard } from '@/components/ui/base-card'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Zap, 
  Star, 
  Heart, 
  Award, 
  Target,
  TrendingUp,
  Palette,
  Code,
  Monitor
} from 'lucide-react'

function IncredibleDesignSystemShowcase() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-96 h-96 rounded-full opacity-20 animate-pulse"
            style={{
              background: `radial-gradient(circle, ${
                i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#3b82f6' : '#06b6d4'
              } 0%, transparent 70%)`,
              left: `${10 + (i * 15)}%`,
              top: `${5 + (i * 12)}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-bounce opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 text-center">
        <Container className="max-w-6xl">
          <div className="space-y-8">
            {/* Incredible Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
              <span className="text-white font-semibold">INCREDIBLE 2025 Design System</span>
              <Star className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>

            {/* Massive Gradient Title */}
            <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-yellow-200 via-pink-200 via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight animate-pulse">
              INCREDIBLE
              <br />
              <span className="bg-gradient-to-r from-cyan-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
                DESIGN
              </span>
            </h1>

            {/* Epic Subtitle */}
            <Text className="text-2xl md:text-4xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
              🚀 Revolutionary visual experiences that transform 
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-bold"> visitors into believers </span>
              through stunning design, incredible animations, and 
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent font-bold"> championship-level performance </span>
            </Text>

            {/* Epic Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
                <Zap className="mr-3 h-6 w-6" />
                Experience the Magic
              </Button>
              <Button className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-700 hover:via-blue-700 hover:to-indigo-700 text-white rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white/20">
                <Target className="mr-3 h-6 w-6" />
                See the Power
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Incredible Features Grid */}
      <section className="relative z-10 py-20">
        <Container className="max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
              Incredible Features
            </h2>
            <Text className="text-xl text-white/80 max-w-3xl mx-auto">
              Every element designed to create awe, inspire action, and deliver championship results
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Liquid Glass Effects",
                description: "Advanced glassmorphism with dynamic lighting and depth perception that makes every element feel alive",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Zap,
                title: "Lightning Animations",
                description: "60fps hardware-accelerated animations that guide users through magical experiences",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Star,
                title: "Stellar Typography",
                description: "Championship-level text hierarchy that commands attention and drives action",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: Heart,
                title: "Emotional Impact",
                description: "Color psychology and visual design that creates deep emotional connections",
                gradient: "from-pink-500 to-red-500"
              },
              {
                icon: Award,
                title: "Championship Performance",
                description: "Battle-tested optimization delivering <7ms render times and perfect scores",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Target,
                title: "Conversion Focused",
                description: "Every pixel scientifically designed to maximize engagement and drive results",
                gradient: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <BaseCard 
                key={feature.title}
                className="p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:rotate-1 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-200 transition-colors">
                  {feature.title}
                </h3>
                <Text className="text-white/80 leading-relaxed group-hover:text-white transition-colors">
                  {feature.description}
                </Text>
              </BaseCard>
            ))}
          </div>
        </Container>
      </section>

      {/* Incredible Stats */}
      <section className="relative z-10 py-20">
        <Container className="max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "60fps", label: "Animation Performance", icon: Monitor },
              { number: "7ms", label: "Render Time", icon: Zap },
              { number: "100%", label: "Wow Factor", icon: Star },
              { number: "∞", label: "Possibilities", icon: Sparkles }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
              >
                <stat.icon className="w-12 h-12 text-yellow-300 mx-auto mb-4 animate-pulse" />
                <div className="text-5xl font-black bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <Text className="text-white/80 font-semibold">
                  {stat.label}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20">
        <Container className="max-w-4xl text-center">
          <div className="p-12 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 backdrop-blur-xl rounded-3xl border border-white/20">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent mb-6">
              Ready for Incredible?
            </h2>
            <Text className="text-xl text-white/90 mb-8 leading-relaxed">
              This is just the beginning. Experience the full power of the incredible design system 
              that transforms ordinary websites into extraordinary experiences.
            </Text>
            <div className="flex gap-6 justify-center">
              <Badge className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold border-0">
                <Award className="w-5 h-5 mr-2" />
                Championship Ready
              </Badge>
              <Badge className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-semibold border-0">
                <TrendingUp className="w-5 h-5 mr-2" />
                Performance Optimized
              </Badge>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default withErrorBoundary(IncredibleDesignSystemShowcase, "IncredibleDesignSystemShowcase") 