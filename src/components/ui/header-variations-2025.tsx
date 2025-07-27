'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/typography'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { 
  Sparkles, 
  Menu, 
  X, 
  Search, 
  Bell, 
  User, 
  Globe,
  Brain,
  Zap,
  Star,
  ChevronDown,
  Settings,
  ShoppingCart,
  Heart,
  MessageCircle,
  Mic,
  Sun,
  Moon
} from 'lucide-react'

interface HeaderProps {
  variant?: 'minimal' | 'immersive' | 'ai-powered' | 'glassmorphic' | 'mega-nav' | 'floating'
  hasNotifications?: boolean
  isAuthenticated?: boolean
  cartItems?: number
}

export function HeaderVariations2025({ 
  variant = 'glassmorphic',
  hasNotifications = false,
  isAuthenticated = false,
  cartItems = 0
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Render different header variants
  const renderHeader = () => {
    switch (variant) {
      case 'minimal':
        return <MinimalHeader {...{ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }} />
      case 'immersive':
        return <ImmersiveHeader {...{ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }} />
      case 'ai-powered':
        return <AIPoweredHeader {...{ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, searchQuery, setSearchQuery, isSearchFocused, setIsSearchFocused }} />
      case 'glassmorphic':
        return <GlassmorphicHeader {...{ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, isDarkMode, setIsDarkMode }} />
      case 'mega-nav':
        return <MegaNavHeader {...{ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, hasNotifications, isAuthenticated, cartItems }} />
      case 'floating':
        return <FloatingHeader {...{ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }} />
      default:
        return <GlassmorphicHeader {...{ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, isDarkMode, setIsDarkMode }} />
    }
  }

  return renderHeader()
}

// Minimal Header - Clean and Simple
function MinimalHeader({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }: any) {
  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
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
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Text className="text-white font-bold text-sm">M</Text>
          </div>
          <Text className="text-xl font-bold text-slate-900">Minimal</Text>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Services', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {item}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 group-hover:w-full transition-all duration-300"
              />
            </motion.a>
          ))}
        </nav>

        {/* CTA */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="bg-slate-900 hover:bg-slate-800 text-white">
            Get Started
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-200"
          >
            <Container className="py-4">
              <nav className="flex flex-col gap-4">
                {['Home', 'About', 'Services', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-slate-700 hover:text-slate-900 font-medium py-2"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// Immersive Header - Full-width with Background
function ImmersiveHeader({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }: any) {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Bar */}
      <div className="bg-black/20 backdrop-blur-sm">
        <Container className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-4 text-white/80">
            <span>🎉 New 2025 Features Available Now!</span>
          </div>
          <div className="flex items-center gap-4 text-white/80">
            <span>Support: +1 (555) 123-4567</span>
            <div className="flex gap-2">
              {['twitter', 'linkedin'].map((social) => (
                <Globe key={social} className="w-4 h-4 cursor-pointer hover:text-white" />
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <Container className="flex items-center justify-between py-4">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <Text className="text-2xl font-bold text-white">Immersive</Text>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          {['Products', 'Solutions', 'Resources', 'Pricing', 'Company'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/90 hover:text-white font-medium transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {item}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
              />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
            Sign In
          </Button>
          <Button className="bg-white text-purple-600 hover:bg-white/90">
            Start Free Trial
          </Button>
        </div>
      </Container>
    </motion.header>
  )
}

// AI-Powered Header - Smart Search and Personalization
function AIPoweredHeader({ isScrolled, searchQuery, setSearchQuery, isSearchFocused, setIsSearchFocused }: any) {
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate AI-powered search suggestions
      const suggestions = [
        `${searchQuery} templates`,
        `${searchQuery} tutorials`,
        `${searchQuery} best practices`,
        `How to ${searchQuery}`,
      ]
      setAiSuggestions(suggestions)
    } else {
      setAiSuggestions([])
    }
  }, [searchQuery])

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Container className="flex items-center justify-between py-4">
        {/* Logo with AI Badge */}
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>
          <div>
            <Text className="text-xl font-bold text-white">AI Design</Text>
            <Text className="text-xs text-green-400">Online • Learning</Text>
          </div>
        </motion.div>

        {/* AI-Powered Search */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <div className="relative w-full">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Ask AI anything... (Try 'landing page trends')"
              className="w-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-white/60 pl-12 pr-16"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Mic className="w-4 h-4 text-white/60 cursor-pointer hover:text-white" />
              <Badge className="bg-purple-500/20 text-purple-300 text-xs">AI</Badge>
            </div>
          </div>

          {/* AI Suggestions Dropdown */}
          <AnimatePresence>
            {isSearchFocused && aiSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl"
              >
                {aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 cursor-pointer border-b border-slate-100 last:border-0"
                    whileHover={{ x: 4 }}
                  >
                    <Brain className="w-4 h-4 text-purple-600" />
                    <Text className="text-slate-700">{suggestion}</Text>
                    <Badge className="ml-auto bg-purple-100 text-purple-700 text-xs">AI</Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <motion.div 
            className="relative cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <Bell className="w-6 h-6 text-white/80 hover:text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </motion.div>
          
          <motion.div 
            className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <User className="w-5 h-5 text-white" />
          </motion.div>
        </div>
      </Container>
    </motion.header>
  )
}

// Glassmorphic Header - Modern Glass Effect
function GlassmorphicHeader({ isScrolled, isDarkMode, setIsDarkMode }: any) {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-3xl border-b border-white/20"
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
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <Text className="text-xl font-bold text-slate-900">Glass Design</Text>
        </motion.div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {['Home', 'Features', 'Pricing', 'About'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition-all rounded-lg hover:bg-white/20 backdrop-blur-sm"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-slate-700" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </motion.button>

          <Button className="bg-white/20 backdrop-blur-sm border border-white/20 text-slate-900 hover:bg-white/30">
            Get Started
          </Button>
        </div>
      </Container>
    </motion.header>
  )
}

// Mega Navigation Header - Full-featured
function MegaNavHeader({ isScrolled, hasNotifications, isAuthenticated, cartItems }: any) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const megaMenuItems = {
    'Products': [
      { name: 'Design System', desc: 'Complete UI components library' },
      { name: 'Templates', desc: 'Ready-to-use page templates' },
      { name: 'Icons', desc: 'Thousands of premium icons' },
      { name: 'Illustrations', desc: 'Custom illustrations pack' }
    ],
    'Solutions': [
      { name: 'For Startups', desc: 'Rapid prototyping tools' },
      { name: 'For Enterprise', desc: 'Scalable design systems' },
      { name: 'For Agencies', desc: 'Client collaboration tools' },
      { name: 'For Developers', desc: 'Code generation features' }
    ]
  }

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'
      }`}
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
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <Text className="text-xl font-bold text-slate-900">MegaNav</Text>
        </motion.div>

        {/* Main Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {Object.keys(megaMenuItems).map((item) => (
            <div
              key={item}
              className="relative"
              onMouseEnter={() => setActiveDropdown(item)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <motion.a
                href={`#${item.toLowerCase()}`}
                className="flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
                <ChevronDown className="w-4 h-4" />
              </motion.a>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {activeDropdown === item && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl"
                  >
                    <div className="p-6">
                      <div className="grid gap-4">
                        {megaMenuItems[item as keyof typeof megaMenuItems].map((subItem, index) => (
                          <motion.a
                            key={index}
                            href="#"
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                            whileHover={{ x: 4 }}
                          >
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                              <Star className="w-4 h-4 text-purple-600" />
                            </div>
                            <div>
                              <Text className="font-semibold text-slate-900">{subItem.name}</Text>
                              <Text className="text-sm text-slate-600">{subItem.desc}</Text>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          {['Pricing', 'Resources', 'Support'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <motion.button
            className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center hover:bg-slate-200 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <Search className="w-5 h-5 text-slate-600" />
          </motion.button>

          {/* Notifications */}
          <motion.div 
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Bell className="w-6 h-6 text-slate-600" />
            {hasNotifications && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            )}
          </motion.div>

          {/* Shopping Cart */}
          <motion.div 
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <ShoppingCart className="w-6 h-6 text-slate-600" />
            {cartItems > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                {cartItems}
              </div>
            )}
          </motion.div>

          {/* User Profile */}
          {isAuthenticated ? (
            <motion.div 
              className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <User className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Sign In</Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600">Sign Up</Button>
            </div>
          )}
        </div>
      </Container>
    </motion.header>
  )
}

// Floating Header - Minimal floating design
function FloatingHeader({ isScrolled }: any) {
  return (
    <motion.header 
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? 'w-full max-w-4xl' : 'w-auto'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl px-6 py-3">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <Text className="text-lg font-bold text-slate-900">Float</Text>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {['Home', 'About', 'Work', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-slate-700 hover:text-slate-900 font-medium transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* CTA */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              Hire Me
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default withErrorBoundary(HeaderVariations2025, "HeaderVariations2025") 