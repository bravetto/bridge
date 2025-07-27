'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { 
  Sparkles, 
  ArrowRight, 
  Star, 
  Check, 
  Play, 
  Users, 
  Zap, 
  Shield, 
  Brain,
  TrendingUp,
  Heart,
  Globe,
  Award,
  ChevronRight,
  Quote,
  Target,
  Rocket,
  Lock,
  Clock,
  MessageCircle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react'

interface LandingPage2025Props {
  variant?: 'hero' | 'saas' | 'ecommerce' | 'agency' | 'startup'
  headerVariant?: 'minimal' | 'immersive' | 'ai-powered' | 'glassmorphic'
  footerVariant?: 'mega' | 'minimal' | 'interactive' | 'social-focused'
}

export function LandingPage2025({ 
  variant = 'hero', 
  headerVariant = 'glassmorphic',
  footerVariant = 'interactive'
}: LandingPage2025Props) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPersonalized, setIsPersonalized] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  
  // Parallax effects
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Mouse tracking for liquid glass effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // AI Personalization simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsPersonalized(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CEO, TechFlow",
      content: "This platform transformed our conversion rates by 340%. The AI-powered insights are incredible.",
      avatar: "/images/people/sarah-chen.svg",
      rating: 5
    },
    {
      name: "Marcus Rodriguez", 
      role: "Founder, GrowthLab",
      content: "The liquid glass UI and microinteractions create such a delightful user experience.",
      avatar: "/images/people/marcus-rodriguez.svg",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Product Director, InnovateCorp",
      content: "Best-in-class design system. Our team productivity increased by 200%.",
      avatar: "/images/people/emily-watson.svg", 
      rating: 5
    }
  ]

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Personalization",
      description: "Adaptive interfaces that learn from user behavior and preferences in real-time.",
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      icon: Sparkles,
      title: "Liquid Glass Effects",
      description: "Cutting-edge glassmorphism with dynamic lighting and depth perception.",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      icon: Zap,
      title: "Microinteractions",
      description: "Delightful animations that guide users and provide instant feedback.",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Target,
      title: "Conversion Optimized",
      description: "Every element scientifically designed to maximize user engagement and conversions.",
      gradient: "from-green-500 to-emerald-600"
    }
  ]

  const stats = [
    { label: "Conversion Rate Increase", value: "340%", icon: TrendingUp },
    { label: "User Engagement", value: "+250%", icon: Heart },
    { label: "Load Time", value: "<1.2s", icon: Rocket },
    { label: "Customer Satisfaction", value: "98%", icon: Star }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Dynamic Header Component */}
      <Header variant={headerVariant} isPersonalized={isPersonalized} />

      {/* Hero Section with 2025 Innovations */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-4 py-20"
        style={{ y: yTransform, opacity: opacityTransform }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Liquid Glass Background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
            backdropFilter: 'blur(20px) saturate(180%)',
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 backdrop-blur-3xl"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <Container className="relative z-10 text-center space-y-8 max-w-6xl">
          {/* AI Personalization Badge */}
          <AnimatePresence>
            {isPersonalized && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-lg rounded-full border border-white/20"
              >
                <Brain className="w-4 h-4 text-purple-600" />
                <Text className="text-sm font-medium text-purple-700">
                  AI has personalized this experience for you
                </Text>
                <Sparkles className="w-4 h-4 text-blue-600" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Headline with Large Typography Trend */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-6"
          >
            <Heading 
              as="h1" size="h1" 
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-900 via-purple-900 to-blue-900 bg-clip-text text-transparent leading-tight"
            >
              The Future of
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Digital Experience
              </span>
            </Heading>
            
            <Text className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Revolutionary 2025 design innovations featuring AI-powered personalization, 
              liquid glass effects, and conversion-optimized microinteractions that 
              transform visitors into loyal customers.
            </Text>
          </motion.div>

          {/* CTA Section with Microinteractions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg cursor-pointer"
            >
              <Play className="w-5 h-5 text-slate-600" />
              <Text className="font-medium text-slate-700">Watch Demo</Text>
            </motion.div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
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
          </motion.div>
        </Container>
      </motion.section>

      {/* Features Section with 3D Elements */}
      <FeaturesSection features={features} />

      {/* Stats Section with Animated Counters */}
      <StatsSection stats={stats} />

      {/* Testimonials with Scroll-Triggered Animations */}
      <TestimonialsSection testimonials={testimonials} currentTestimonial={currentTestimonial} />

      {/* CTA Section with Urgency Elements */}
      <CTASection />

      {/* Dynamic Footer Component */}
      <Footer variant={footerVariant} />
    </div>
  )
}

// Header Component with Multiple Variations
function Header({ variant, isPersonalized }: { variant: string, isPersonalized: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const baseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300"
  
  const variantStyles = {
    minimal: `${baseClasses} ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`,
    immersive: `${baseClasses} bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-lg`,
    'ai-powered': `${baseClasses} ${isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'}`,
    glassmorphic: `${baseClasses} bg-white/10 backdrop-blur-3xl border-b border-white/20`
  }

  return (
    <motion.header 
      className={variantStyles[variant as keyof typeof variantStyles]}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Container className="flex items-center justify-between py-4">
        {/* Logo */}
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <Text className="text-xl font-bold text-slate-900">2025 Design</Text>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {['Features', 'Pricing', 'About', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-slate-700 hover:text-purple-600 font-medium transition-colors"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
            Get Started
          </Button>
        </motion.div>
      </Container>
    </motion.header>
  )
}

// Features Section with 3D Cards
function FeaturesSection({ features }: { features: any[] }) {
  return (
    <section className="py-24 bg-slate-50/50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Heading as="h2" size="h2" className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            2025 Design Innovations
          </Heading>
          <Text className="text-xl text-slate-600 max-w-3xl mx-auto">
            Experience the future of digital design with cutting-edge features that 
            redefine user interaction and engagement.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ 
                y: -10,
                rotateX: 5,
                rotateY: 5,
                scale: 1.02
              }}
              className="group"
            >
              <Card className="p-8 h-full bg-white/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-4">
                  {feature.title}
                </Heading>
                <Text className="text-slate-600 leading-relaxed">
                  {feature.description}
                </Text>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Stats Section with Animated Counters
function StatsSection({ stats }: { stats: any[] }) {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <div className="flex justify-center mb-4">
                <stat.icon className="w-8 h-8 text-white/80" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold mb-2"
              >
                {stat.value}
              </motion.div>
              <Text className="text-white/80 font-medium">{stat.label}</Text>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection({ testimonials, currentTestimonial }: { testimonials: any[], currentTestimonial: number }) {
  return (
    <section className="py-24 bg-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Heading as="h2" size="h2" className="text-4xl font-bold text-slate-900 mb-6">
            What Our Users Say
          </Heading>
          <Text className="text-xl text-slate-600">
            Join thousands of satisfied customers who've transformed their digital presence
          </Text>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Card className="p-8 bg-slate-50 border-none shadow-lg">
                <Quote className="w-12 h-12 text-purple-600 mx-auto mb-6" />
                <Text className="text-xl text-slate-700 mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </Text>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <Text className="text-white font-semibold">
                      {testimonials[currentTestimonial].name.charAt(0)}
                    </Text>
                  </div>
                  <div className="text-left">
                    <Text className="font-semibold text-slate-900">
                      {testimonials[currentTestimonial].name}
                    </Text>
                    <Text className="text-slate-600">
                      {testimonials[currentTestimonial].role}
                    </Text>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}

// CTA Section with Urgency
function CTASection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
            style={{
              left: `${i * 30}%`,
              top: `${i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
            <Clock className="w-4 h-4 mr-2" />
            Limited Time Offer
          </Badge>

          <Heading as="h2" size="h2" className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Transform Your
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Digital Experience?
            </span>
          </Heading>

          <Text className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join over 10,000+ companies using our 2025 design innovations to create 
            extraordinary user experiences and drive unprecedented growth.
          </Text>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 my-8">
            {[
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl font-bold">{item.value.toString().padStart(2, '0')}</div>
                <div className="text-sm text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-12 py-4 text-lg font-semibold">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-8 py-4">
                Schedule Demo
              </Button>
            </motion.div>
          </div>

          <div className="flex justify-center items-center gap-6 pt-8">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <Text className="text-slate-300">No credit card required</Text>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <Text className="text-slate-300">14-day free trial</Text>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-400" />
              <Text className="text-slate-300">Cancel anytime</Text>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

// Footer Component with Multiple Variations
function Footer({ variant }: { variant: string }) {
  const currentYear = new Date().getFullYear()

  const footerContent = {
    mega: (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <Text className="text-xl font-bold">2025 Design</Text>
          </div>
          <Text className="text-slate-600">
            Revolutionary design innovations for the future of digital experiences.
          </Text>
          <div className="flex gap-4">
            {['twitter', 'linkedin', 'github'].map((social) => (
              <div key={social} className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-purple-100 transition-colors">
                <Globe className="w-5 h-5 text-slate-600" />
              </div>
            ))}
          </div>
        </div>
        
        {[
          { title: 'Product', links: ['Features', 'Pricing', 'Templates', 'Integrations'] },
          { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
          { title: 'Support', links: ['Help Center', 'Contact', 'Status', 'Updates'] }
        ].map((section, index) => (
          <div key={index} className="space-y-4">
            <Text className="font-semibold text-slate-900">{section.title}</Text>
            <div className="space-y-2">
              {section.links.map((link) => (
                <div key={link}>
                  <Text className="text-slate-600 hover:text-purple-600 cursor-pointer transition-colors">
                    {link}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
    minimal: (
      <div className="text-center space-y-8 mb-12">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <Text className="text-xl font-bold">2025 Design</Text>
        </div>
        <div className="flex justify-center gap-8">
          {['Features', 'Pricing', 'About', 'Contact'].map((link) => (
            <Text key={link} className="text-slate-600 hover:text-purple-600 cursor-pointer transition-colors">
              {link}
            </Text>
          ))}
        </div>
      </div>
    ),
    interactive: (
      <div className="space-y-12 mb-12">
        <div className="text-center space-y-6">
          <Heading as="h3" size="h3" className="text-3xl font-bold text-slate-900">
            Stay Updated with 2025 Innovations
          </Heading>
          <Text className="text-slate-600 max-w-2xl mx-auto">
            Get the latest design trends, tips, and exclusive resources delivered to your inbox.
          </Text>
          <div className="flex max-w-md mx-auto gap-2">
            <Input 
              placeholder="Enter your email" 
              className="flex-1"
            />
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
              Subscribe
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Phone, title: 'Call Us', content: '+1 (555) 123-4567' },
            { icon: Mail, title: 'Email Us', content: 'hello@2025design.com' },
            { icon: MapPin, title: 'Visit Us', content: 'San Francisco, CA' }
          ].map((contact, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-slate-50 rounded-xl"
            >
              <contact.icon className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <Text className="font-semibold text-slate-900 mb-2">{contact.title}</Text>
              <Text className="text-slate-600">{contact.content}</Text>
            </motion.div>
          ))}
        </div>
      </div>
    ),
    'social-focused': (
      <div className="text-center space-y-8 mb-12">
        <Heading as="h3" size="h3" className="text-2xl font-bold text-slate-900">
          Connect with Our Community
        </Heading>
        <div className="flex justify-center gap-6">
          {[
            { name: 'Twitter', followers: '12.5K' },
            { name: 'LinkedIn', followers: '8.2K' },
            { name: 'GitHub', followers: '15.1K' },
            { name: 'Discord', followers: '25.3K' }
          ].map((social, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-slate-50 rounded-xl p-6 text-center cursor-pointer"
            >
              <Globe className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <Text className="font-semibold text-slate-900">{social.name}</Text>
              <Text className="text-sm text-slate-600">{social.followers} followers</Text>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <footer className="bg-white border-t border-slate-200">
      <Container className="py-16">
        {footerContent[variant as keyof typeof footerContent]}
        
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <Text className="text-slate-600">
            © {currentYear} 2025 Design. All rights reserved.
          </Text>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((link) => (
              <Text key={link} className="text-slate-600 hover:text-purple-600 cursor-pointer transition-colors">
                {link}
              </Text>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default withErrorBoundary(LandingPage2025, "LandingPage2025") 