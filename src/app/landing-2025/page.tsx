'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components/ui/container'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Button } from '@/components/ui/button'
import { Text, Heading } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  Brain,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Heart
} from 'lucide-react'

function UltraModern2025Landing() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Glassmorphic Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-3xl border-b border-white/20 transition-all duration-300">
        <Container className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <Text className="text-xl font-bold text-slate-900">2025 Design</Text>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-700 hover:text-purple-600 font-medium transition-colors hover:-translate-y-0.5 transform duration-200"
              >
                {item}
              </a>
            ))}
          </nav>
          
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white hover:scale-105 transform transition-all duration-200">
            Get Started
          </Button>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 pt-32">
        {/* Liquid Glass Background */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
            backdropFilter: 'blur(20px) saturate(180%)',
          }}
        />

        {/* Ultra Modern Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 backdrop-blur-3xl animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + i * 2}s`,
              }}
            />
          ))}
        </div>

        <Container className="relative z-10 text-center space-y-8 max-w-6xl">
          {/* AI Personalization Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-lg rounded-full border border-white/20 animate-fade-in-up">
            <Brain className="w-4 h-4 text-purple-600" />
            <Text className="text-sm font-medium text-purple-700">
              AI has personalized this experience for you
            </Text>
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>

          {/* Massive Hero Headline */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Heading 
              as="h1" 
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 bg-clip-text text-transparent leading-tight"
            >
              The Future of
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Digital Experience
              </span>
            </Heading>
            
            <Text className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Revolutionary 2025 design innovations featuring AI-powered personalization, 
              liquid glass effects, and conversion-optimized microinteractions that transform 
              visitors into loyal customers.
            </Text>
          </div>

          {/* Epic Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl shadow-2xl hover:scale-105 transform transition-all duration-300"
            >
              Watch Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-4 text-lg border-2 border-purple-200 hover:border-purple-300 text-purple-700 rounded-2xl hover:scale-105 transform transition-all duration-300"
            >
              Explore Features
            </Button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Text className="ml-2 text-slate-600 font-medium">4.9/5 from 2,847+ users</Text>
            </div>
            
            <div className="flex items-center gap-8 opacity-70">
              <Text className="text-sm text-slate-500">Trusted by leading companies:</Text>
              <div className="flex items-center gap-6">
                {['Google', 'Microsoft', 'Apple', 'Meta', 'Tesla'].map((company) => (
                  <Text key={company} className="text-sm font-semibold text-slate-400">{company}</Text>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50/50">
        <Container>
          <div className="text-center mb-16">
            <Heading as="h2" className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              2025 Design Innovations
            </Heading>
            <Text className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the future of digital design with cutting-edge features that 
              redefine user interaction and engagement.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Personalization",
                description: "Intelligent content adaptation that learns from user behavior and preferences in real-time.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Shield,
                title: "Liquid Glass Effects",
                description: "Stunning glassmorphism with depth perception that makes every element feel alive.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Zap,
                title: "Micro-Interactions",
                description: "Delightful animations and feedback that guide users through seamless experiences.",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: Users,
                title: "Social Proof Engine",
                description: "Dynamic testimonials and social signals that build trust and drive conversions.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: TrendingUp,
                title: "Conversion Analytics",
                description: "Real-time insights into user behavior with actionable optimization recommendations.",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: Heart,
                title: "Emotional Design",
                description: "Psychology-driven design elements that create deep emotional connections with users.",
                gradient: "from-pink-500 to-red-500"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-8 bg-white/60 backdrop-blur-xl border border-white/20 rounded-3xl hover:bg-white/80 transition-all duration-500 hover:scale-105 hover:-translate-y-2 transform"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-purple-700 transition-colors">
                  {feature.title}
                </h3>
                <Text className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                  {feature.description}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <Container className="text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Heading as="h2" className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Digital Experience?
            </Heading>
            <Text className="text-xl opacity-90 mb-8">
              Join over 10,000+ companies using our 2025 design innovations to create 
              extraordinary user experiences and drive unprecedented growth.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="px-8 py-4 text-lg bg-white text-purple-600 hover:bg-gray-50 rounded-2xl shadow-2xl hover:scale-105 transform transition-all duration-300"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg border-2 border-white/30 text-white hover:bg-white/10 rounded-2xl hover:scale-105 transform transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <Text className="text-xl font-bold">2025 Design</Text>
              </div>
              <Text className="text-slate-400">
                Revolutionary design innovations for the future of digital experiences.
              </Text>
            </div>
            
            {['Product', 'Company', 'Resources'].map((section) => (
              <div key={section} className="space-y-4">
                <Text className="font-semibold text-lg">{section}</Text>
                <div className="space-y-2">
                  {['Features', 'Pricing', 'About', 'Contact'].map((link) => (
                    <div key={link}>
                      <a href="#" className="text-slate-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <Text className="text-slate-400">
              © 2025 Design Co. All rights reserved.
            </Text>
          </div>
        </Container>
      </footer>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-20px) rotate(90deg) scale(1.1); }
          50% { transform: translateY(0px) rotate(180deg) scale(1); }
          75% { transform: translateY(-10px) rotate(270deg) scale(1.05); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float infinite ease-in-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default withErrorBoundary(UltraModern2025Landing, "UltraModern2025Landing") 