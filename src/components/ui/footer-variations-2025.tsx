'use client'

import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram, 
  Facebook, 
  Youtube,
  ArrowRight,
  Heart,
  Star,
  Award,
  Shield,
  Zap,
  Users,
  TrendingUp,
  MessageCircle,
  Send,
  Check,
  ExternalLink,
  ChevronUp,
  Clock,
  Calendar,
  Download,
  Play
} from 'lucide-react'
import { useRef } from 'react'

interface FooterProps {
  variant?: 'mega' | 'minimal' | 'interactive' | 'social-focused' | 'newsletter-focused' | 'creative'
  showBackToTop?: boolean
  companyName?: string
  year?: number
}

export function FooterVariations2025({ 
  variant = 'interactive',
  showBackToTop = true,
  companyName = "2025 Design",
  year = new Date().getFullYear()
}: FooterProps) {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showBackToTopBtn, setShowBackToTopBtn] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true })

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTopBtn(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail('')
    }
  }

  const renderFooter = () => {
    switch (variant) {
      case 'mega':
        return <MegaFooter {...{ companyName, year, email, setEmail, handleSubscribe, isSubscribed }} />
      case 'minimal':
        return <MinimalFooter {...{ companyName, year }} />
      case 'interactive':
        return <InteractiveFooter {...{ companyName, year, email, setEmail, handleSubscribe, isSubscribed }} />
      case 'social-focused':
        return <SocialFocusedFooter {...{ companyName, year }} />
      case 'newsletter-focused':
        return <NewsletterFocusedFooter {...{ companyName, year, email, setEmail, handleSubscribe, isSubscribed }} />
      case 'creative':
        return <CreativeFooter {...{ companyName, year }} />
      default:
        return <InteractiveFooter {...{ companyName, year, email, setEmail, handleSubscribe, isSubscribed }} />
    }
  }

  return (
    <div ref={footerRef} className="relative">
      {renderFooter()}
      
      {/* Back to Top Button */}
      {showBackToTop && showBackToTopBtn && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  )
}

// Mega Footer - Comprehensive with all sections
function MegaFooter({ companyName, year, email, setEmail, handleSubscribe, isSubscribed }: any) {
  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Templates', href: '#templates' },
        { name: 'Integrations', href: '#integrations' },
        { name: 'API', href: '#api' },
        { name: 'Changelog', href: '#changelog' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Careers', href: '#careers', badge: 'Hiring' },
        { name: 'Press', href: '#press' },
        { name: 'Blog', href: '#blog' },
        { name: 'Contact', href: '#contact' },
        { name: 'Partners', href: '#partners' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '#docs' },
        { name: 'Help Center', href: '#help' },
        { name: 'Community', href: '#community' },
        { name: 'Tutorials', href: '#tutorials' },
        { name: 'Webinars', href: '#webinars' },
        { name: 'Status', href: '#status' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '#privacy' },
        { name: 'Terms of Service', href: '#terms' },
        { name: 'Cookie Policy', href: '#cookies' },
        { name: 'GDPR', href: '#gdpr' },
        { name: 'Security', href: '#security' },
        { name: 'Compliance', href: '#compliance' }
      ]
    }
  ]

  const socialLinks = [
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Github, href: '#', name: 'GitHub' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Youtube, href: '#', name: 'YouTube' }
  ]

  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600">
        <Container className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Heading as="h2" size="h2" className="text-4xl font-bold text-white mb-6">
              Stay Ahead of 2025 Design Trends
            </Heading>
            <Text className="text-xl text-white/90 mb-8">
              Get exclusive insights, early access to new features, and design inspiration 
              delivered to your inbox every week.
            </Text>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/70"
                required
              />
              <Button 
                type="submit"
                className="bg-white text-purple-600 hover:bg-white/90 font-semibold"
                disabled={isSubscribed}
              >
                {isSubscribed ? <Check className="w-5 h-5" /> : 'Subscribe'}
              </Button>
            </form>
            
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-200"
              >
                ✨ Thanks for subscribing! Check your email for confirmation.
              </motion.div>
            )}
          </motion.div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <Container className="py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <Text className="text-2xl font-bold">{companyName}</Text>
              </div>
              
              <Text className="text-slate-300 text-lg leading-relaxed mb-6">
                Pioneering the future of digital design with AI-powered tools, 
                liquid glass interfaces, and conversion-optimized experiences.
              </Text>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <Text className="text-slate-300">hello@2025design.com</Text>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <Text className="text-slate-300">+1 (555) 123-4567</Text>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <Text className="text-slate-300">San Francisco, CA</Text>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-4"
            >
              <Text className="text-lg font-semibold text-white">{section.title}</Text>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors group"
                    >
                      <span>{link.name}</span>
                      {link.badge && (
                        <Badge className="bg-green-500/20 text-green-400 text-xs">
                          {link.badge}
                        </Badge>
                      )}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Awards & Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-slate-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                <Text className="text-slate-300">Awwwards Site of the Year 2024</Text>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <Text className="text-slate-300">SOC 2 Certified</Text>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-400" />
                <Text className="text-slate-300">4.9/5 Customer Rating</Text>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5 text-slate-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <Text className="text-slate-400">
            © {year} {companyName}. All rights reserved.
          </Text>
          <div className="flex items-center gap-2">
            <Text className="text-slate-400">Made with</Text>
            <Heart className="w-4 h-4 text-red-400" />
            <Text className="text-slate-400">in San Francisco</Text>
          </div>
        </div>
      </Container>
    </footer>
  )
}

// Minimal Footer - Clean and Simple
function MinimalFooter({ companyName, year }: any) {
  return (
    <footer className="bg-white border-t border-slate-200">
      <Container className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <Text className="text-xl font-bold text-slate-900">{companyName}</Text>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center gap-8 flex-wrap">
            {['Home', 'About', 'Services', 'Contact', 'Privacy', 'Terms'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {[Twitter, Linkedin, Github].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Icon className="w-5 h-5 text-slate-600" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <Text className="text-slate-500">
            © {year} {companyName}. All rights reserved.
          </Text>
        </motion.div>
      </Container>
    </footer>
  )
}

// Interactive Footer - Engaging with animations
function InteractiveFooter({ companyName, year, email, setEmail, handleSubscribe, isSubscribed }: any) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const contactCards = [
    {
      icon: Phone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM PST',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'hello@2025design.com',
      description: 'We reply within 24 hours',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      content: 'Start a conversation',
      description: 'Available 24/7',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <footer className="bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl"
              style={{
                left: `${i * 30}%`,
                top: `${i * 20}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <Container className="py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Heading as="h2" size="h2" className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Digital Experience?
            </Heading>
            <Text className="text-xl text-white/90 mb-8">
              Join over 10,000+ designers and developers who trust our 2025 innovations
            </Text>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/70"
                required
              />
              <Button 
                type="submit"
                className="bg-white text-purple-600 hover:bg-white/90 font-semibold"
                disabled={isSubscribed}
              >
                {isSubscribed ? <Check className="w-5 h-5" /> : 'Get Started Free'}
              </Button>
            </form>

            <div className="flex justify-center items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* Contact Cards */}
      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Heading as="h3" size="h3" className="text-3xl font-bold text-slate-900 mb-4">
            Get in Touch
          </Heading>
          <Text className="text-slate-600 max-w-2xl mx-auto">
            Have questions? We're here to help you succeed with our 2025 design innovations.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="cursor-pointer"
            >
              <Card className="p-8 text-center h-full bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                {/* Hover Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 transition-opacity duration-300`}
                  animate={{ opacity: hoveredCard === index ? 0.1 : 0 }}
                />
                
                <div className="relative z-10">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center mx-auto mb-6`}
                    animate={{ 
                      scale: hoveredCard === index ? 1.1 : 1,
                      rotate: hoveredCard === index ? 5 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <card.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <Heading as="h4" size="h4" className="text-xl font-semibold text-slate-900 mb-2">
                    {card.title}
                  </Heading>
                  <Text className="text-slate-700 font-medium mb-2">
                    {card.content}
                  </Text>
                  <Text className="text-slate-500 text-sm">
                    {card.description}
                  </Text>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Templates', 'API'] },
            { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
            { title: 'Resources', links: ['Documentation', 'Help Center', 'Community', 'Status'] },
            { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Compliance'] }
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-4"
            >
              <Text className="font-semibold text-slate-900">{section.title}</Text>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-slate-600 hover:text-purple-600 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <Text className="text-slate-600">
              © {year} {companyName}. All rights reserved.
            </Text>
          </div>
          
          <div className="flex gap-4">
            {[Twitter, Linkedin, Github, Instagram].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-purple-100 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Icon className="w-5 h-5 text-slate-600" />
              </motion.a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}

// Social-Focused Footer
function SocialFocusedFooter({ companyName, year }: any) {
  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: Twitter,
      followers: '12.5K',
      description: 'Daily design tips & trends',
      color: 'from-blue-400 to-blue-600',
      handle: '@2025design'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      followers: '8.2K',
      description: 'Professional insights',
      color: 'from-blue-600 to-blue-800',
      handle: 'company/2025design'
    },
    {
      name: 'GitHub',
      icon: Github,
      followers: '15.1K',
      description: 'Open source projects',
      color: 'from-gray-700 to-gray-900',
      handle: '2025design'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      followers: '25.3K',
      description: 'Design tutorials',
      color: 'from-red-500 to-red-700',
      handle: '@2025design'
    }
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <Container className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Heading as="h2" size="h2" className="text-4xl font-bold text-white mb-6">
            Connect with Our Community
          </Heading>
          <Text className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join thousands of designers and developers sharing the latest 2025 innovations, 
            tips, and behind-the-scenes content across our social channels.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Card className="p-6 bg-slate-800 border-slate-700 text-center h-full hover:bg-slate-750 transition-all duration-300">
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <platform.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <Text className="text-xl font-semibold text-white mb-2">
                  {platform.name}
                </Text>
                <Text className="text-slate-300 text-sm mb-3">
                  {platform.description}
                </Text>
                <Text className="text-slate-400 text-sm mb-4">
                  {platform.handle}
                </Text>
                
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-purple-400" />
                  <Text className="text-purple-400 font-semibold">
                    {platform.followers}
                  </Text>
                  <Text className="text-slate-400 text-sm">followers</Text>
                </div>

                <Button 
                  size="sm" 
                  className={`w-full bg-gradient-to-r ${platform.color} hover:opacity-90 text-white border-none`}
                >
                  Follow
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Heading as="h3" size="h3" className="text-2xl font-bold text-white mb-8 text-center">
            Latest from Our Community
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                platform: 'Twitter',
                content: 'Just dropped our 2025 Design Trends report! 🚀 Liquid glass effects are taking over...',
                time: '2 hours ago',
                engagement: '127 likes, 23 retweets'
              },
              {
                platform: 'YouTube',
                content: 'New tutorial: Building AI-powered interfaces with React and Next.js',
                time: '1 day ago',
                engagement: '2.1K views, 89 likes'
              },
              {
                platform: 'LinkedIn',
                content: 'The future of UX is here: How microinteractions are changing user behavior',
                time: '3 days ago',
                engagement: '45 comments, 156 reactions'
              }
            ].map((post, index) => (
              <Card key={index} className="p-4 bg-slate-800 border-slate-700">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-purple-500/20 text-purple-300">
                    {post.platform}
                  </Badge>
                  <Text className="text-slate-400 text-sm">{post.time}</Text>
                </div>
                <Text className="text-slate-300 mb-3 leading-relaxed">
                  {post.content}
                </Text>
                <Text className="text-slate-500 text-sm">
                  {post.engagement}
                </Text>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="pt-8 border-t border-slate-700 text-center">
          <Text className="text-slate-400">
            © {year} {companyName}. Building the future of design, together.
          </Text>
        </div>
      </Container>
    </footer>
  )
}

// Newsletter-Focused Footer
function NewsletterFocusedFooter({ companyName, year, email, setEmail, handleSubscribe, isSubscribed }: any) {
  const benefits = [
    { icon: Zap, text: 'Weekly design trends & insights' },
    { icon: Star, text: 'Exclusive templates & resources' },
    { icon: Users, text: 'Early access to new features' },
    { icon: TrendingUp, text: 'Industry reports & case studies' }
  ]

  return (
    <footer className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
            style={{
              left: `${i * 25}%`,
              top: `${i * 15}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
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

      <Container className="py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <Badge className="bg-white/20 text-white border-white/30 mb-6">
              <Send className="w-4 h-4 mr-2" />
              Newsletter
            </Badge>
            
            <Heading as="h1" size="h1" className="text-5xl md:text-6xl font-bold mb-6">
              Stay Ahead of the
              <br />
              <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Design Revolution
              </span>
            </Heading>
            
            <Text className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Join 50,000+ designers, developers, and innovators who get exclusive access 
              to 2025 design trends, cutting-edge techniques, and industry insights.
            </Text>

            {/* Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <Text className="text-white/90 text-sm">{benefit.text}</Text>
                </motion.div>
              ))}
            </div>

            {/* Newsletter Form */}
            <motion.form
              onSubmit={handleSubscribe}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white/20 border-white/30 text-white placeholder-white/70 h-14 text-lg"
                required
              />
              <Button 
                type="submit"
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 font-semibold h-14 px-8"
                disabled={isSubscribed}
              >
                {isSubscribed ? (
                  <Check className="w-6 h-6" />
                ) : (
                  <>
                    Subscribe Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.form>

            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-500/20 border border-green-400/30 rounded-xl p-6 mb-8"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Check className="w-6 h-6 text-green-400" />
                  <Text className="text-xl font-semibold text-green-400">
                    Welcome to the community!
                  </Text>
                </div>
                <Text className="text-green-300">
                  Check your email for confirmation and your first exclusive design resource.
                </Text>
              </motion.div>
            )}

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Weekly delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-16 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <Text className="text-xl font-bold">{companyName}</Text>
          </div>

          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/70 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <Text className="text-white/50">
            © {year} {companyName}
          </Text>
        </motion.div>
      </Container>
    </footer>
  )
}

// Creative Footer - Unique and artistic
function CreativeFooter({ companyName, year }: any) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <footer className="bg-black text-white relative overflow-hidden min-h-screen flex items-center">
      {/* Interactive Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`,
        }}
      />

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg transform rotate-45" />
          </motion.div>
        ))}
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="space-y-12"
        >
          {/* Large Typography */}
          <div className="space-y-8">
            <motion.div
              className="text-8xl md:text-9xl font-black leading-none"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{
                background: "linear-gradient(45deg, #ffffff, #8b5cf6, #3b82f6, #ffffff)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              2025
            </motion.div>
            
            <Text className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto">
              Where creativity meets technology.
              <br />
              Where imagination becomes reality.
            </Text>
          </div>

          {/* Interactive Elements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { title: 'Create', subtitle: 'Design the future' },
              { title: 'Innovate', subtitle: 'Push boundaries' },
              { title: 'Inspire', subtitle: 'Change the world' }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
                  <Text className="text-4xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </Text>
                  <Text className="text-white/60 group-hover:text-white/80 transition-colors">
                    {item.subtitle}
                  </Text>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Text className="text-xl text-white/60">
              Ready to create something extraordinary?
            </Text>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-full"
              >
                Let's Talk
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-16 border-t border-white/10"
          >
            <Text className="text-white/40">
              © {year} {companyName}. Crafted with passion and purpose.
            </Text>
          </motion.div>
        </motion.div>
      </Container>
    </footer>
  )
}

export default withErrorBoundary(FooterVariations2025, "FooterVariations2025") 