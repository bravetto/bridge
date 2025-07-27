'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { BaseCard } from '@/components/ui/base-card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/typography'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { 
  Palette, 
  Eye, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Star,
  Zap,
  Shield,
  Heart,
  Target,
  Copy,
  Check
} from 'lucide-react'
import { useState } from 'react'

interface ColorSystemGuideProps {
  showExamples?: boolean
}

export function ColorSystemGuide({ showExamples = true }: ColorSystemGuideProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyToClipboard = async (color: string, name: string) => {
    try {
      await navigator.clipboard.writeText(color)
      setCopiedColor(name)
      setTimeout(() => setCopiedColor(null), 2000)
    } catch (err) {
      console.error('Failed to copy color:', err)
    }
  }

  const primaryColors = [
    { name: 'blue-50', hex: '#eff6ff', usage: 'Subtle backgrounds, light overlays' },
    { name: 'blue-100', hex: '#dbeafe', usage: 'Hover states on light backgrounds' },
    { name: 'blue-200', hex: '#bfdbfe', usage: 'Borders, dividers' },
    { name: 'blue-300', hex: '#93c5fd', usage: 'Disabled states' },
    { name: 'blue-400', hex: '#60a5fa', usage: 'Secondary buttons' },
    { name: 'blue-500', hex: '#3b82f6', usage: 'PRIMARY BRAND - main actions' },
    { name: 'blue-600', hex: '#2563eb', usage: 'Primary hover states' },
    { name: 'blue-700', hex: '#1d4ed8', usage: 'Primary active states' },
    { name: 'blue-800', hex: '#1e40af', usage: 'Dark text on light backgrounds' },
    { name: 'blue-900', hex: '#1e3a8a', usage: 'High contrast text' }
  ]

  const secondaryColors = [
    { name: 'purple-500', hex: '#a855f7', usage: 'AI features, innovation' },
    { name: 'orange-500', hex: '#f97316', usage: 'High-conversion CTAs' },
    { name: 'green-500', hex: '#10b981', usage: 'Success, positive actions' },
    { name: 'red-500', hex: '#ef4444', usage: 'Errors, urgent actions' },
    { name: 'amber-500', hex: '#f59e0b', usage: 'Warnings, attention' }
  ]

  const neutralColors = [
    { name: 'white', hex: '#ffffff', usage: 'Pure white backgrounds' },
    { name: 'gray-50', hex: '#f9fafb', usage: 'Page backgrounds' },
    { name: 'gray-100', hex: '#f3f4f6', usage: 'Card backgrounds' },
    { name: 'gray-200', hex: '#e5e7eb', usage: 'Borders' },
    { name: 'gray-500', hex: '#6b7280', usage: 'Secondary text' },
    { name: 'gray-600', hex: '#4b5563', usage: 'Body text' },
    { name: 'gray-700', hex: '#374151', usage: 'Headings' },
    { name: 'gray-900', hex: '#111827', usage: 'High contrast text' }
  ]

  const colorRelationships = [
    {
      title: 'Primary Combinations',
      combinations: [
        { colors: ['Blue', 'White'], usage: 'Trust & clarity', example: 'Main CTAs' },
        { colors: ['Blue', 'Gray'], usage: 'Professional & reliable', example: 'Business content' },
        { colors: ['Blue', 'Purple'], usage: 'Modern & innovative', example: 'Tech features' }
      ]
    },
    {
      title: 'High-Converting Combinations',
      combinations: [
        { colors: ['Blue', 'Orange'], usage: 'Energy & conversion', example: 'Landing pages' },
        { colors: ['White', 'Blue'], usage: 'Clean & trustworthy', example: 'Forms & inputs' },
        { colors: ['Gray', 'Blue'], usage: 'Subtle & professional', example: 'Navigation' }
      ]
    }
  ]

  const usageExamples = [
    {
      category: 'Headers',
      rules: [
        'Background: White or glass effect',
        'Logo: Primary blue (#3b82f6)',
        'Navigation: Gray-600 text, blue-500 active',
        'CTA Button: Primary blue or accent orange'
      ]
    },
    {
      category: 'Content Areas',
      rules: [
        'Headings: Gray-900 to gray-700',
        'Body text: Gray-600',
        'Links: Primary blue with hover states',
        'Cards: White background, gray-200 borders'
      ]
    },
    {
      category: 'Buttons',
      rules: [
        'Primary: Blue-500 background, white text',
        'Secondary: White background, blue-500 border/text',
        'Destructive: Red-500 background, white text',
        'Ghost: Transparent background, gray-600 text'
      ]
    },
    {
      category: 'Forms',
      rules: [
        'Input borders: Gray-300',
        'Focus states: Primary blue',
        'Error states: Red-500',
        'Success states: Green-500'
      ]
    }
  ]

  return (
    <div className="space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">2025 Blue Color System</h1>
        </div>
        <Text className="text-xl text-gray-600 max-w-3xl mx-auto">
          A comprehensive guide to using the revolutionary blue-based color system for 
          modern web design, conversion optimization, and brand consistency.
        </Text>
      </motion.div>

      {/* Primary Blue Palette */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Primary Blue Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {primaryColors.map((color, index) => (
            <motion.div
              key={color.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
              onClick={() => copyToClipboard(color.hex, color.name)}
            >
              <BaseCard className="p-4 hover:shadow-lg transition-all duration-300">
                <div 
                  className="w-full h-20 rounded-lg mb-3 border border-gray-200"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-semibold text-gray-900">{color.name}</Text>
                  {copiedColor === color.name ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  )}
                </div>
                <Text className="text-sm text-gray-500 mb-2">{color.hex}</Text>
                <Text className="text-xs text-gray-400">{color.usage}</Text>
                {color.name === 'blue-500' && (
                  <Badge className="mt-2 bg-blue-100 text-blue-700 border-blue-200">
                    PRIMARY
                  </Badge>
                )}
              </BaseCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Secondary & Accent Colors */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Secondary & Accent Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {secondaryColors.map((color, index) => (
            <motion.div
              key={color.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
              onClick={() => copyToClipboard(color.hex, color.name)}
            >
              <BaseCard className="p-4 hover:shadow-lg transition-all duration-300">
                <div 
                  className="w-full h-16 rounded-lg mb-3 border border-gray-200"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-semibold text-gray-900">{color.name}</Text>
                  {copiedColor === color.name ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  )}
                </div>
                <Text className="text-sm text-gray-500 mb-2">{color.hex}</Text>
                <Text className="text-xs text-gray-400">{color.usage}</Text>
              </BaseCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Neutral Colors */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Neutral Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {neutralColors.map((color, index) => (
            <motion.div
              key={color.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
              onClick={() => copyToClipboard(color.hex, color.name)}
            >
              <BaseCard className="p-4 hover:shadow-lg transition-all duration-300">
                <div 
                  className="w-full h-16 rounded-lg mb-3 border border-gray-200"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="flex items-center justify-between mb-2">
                  <Text className="font-semibold text-gray-900">{color.name}</Text>
                  {copiedColor === color.name ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  )}
                </div>
                <Text className="text-sm text-gray-500 mb-2">{color.hex}</Text>
                <Text className="text-xs text-gray-400">{color.usage}</Text>
              </BaseCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Color Relationships */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Color Relationships & Combinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {colorRelationships.map((section, index) => (
            <BaseCard key={index} className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h3>
              <div className="space-y-4">
                {section.combinations.map((combo, comboIndex) => (
                  <div key={comboIndex} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center gap-2 mb-1">
                      {combo.colors.map((color, colorIndex) => (
                        <Badge 
                          key={colorIndex}
                          variant="outline"
                          className="text-sm"
                        >
                          {color}
                        </Badge>
                      ))}
                    </div>
                    <Text className="font-medium text-gray-700">{combo.usage}</Text>
                    <Text className="text-sm text-gray-500">{combo.example}</Text>
                  </div>
                ))}
              </div>
            </BaseCard>
          ))}
        </div>
      </motion.section>

      {/* Usage Examples */}
      {showExamples && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Site-wide Usage Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {usageExamples.map((example, index) => (
              <BaseCard key={index} className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{example.category}</h3>
                <div className="space-y-2">
                  {example.rules.map((rule, ruleIndex) => (
                    <div key={ruleIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <Text className="text-gray-600 text-sm">{rule}</Text>
                    </div>
                  ))}
                </div>
              </BaseCard>
            ))}
          </div>
        </motion.section>
      )}

      {/* Interactive Examples */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Interactive Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Primary Button */}
          <BaseCard className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Button</h3>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white mb-4">
              Get Started
            </Button>
            <Text className="text-sm text-gray-500">
              Blue-500 background with white text
            </Text>
          </BaseCard>

          {/* Secondary Button */}
          <BaseCard className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Secondary Button</h3>
            <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white mb-4">
              Learn More
            </Button>
            <Text className="text-sm text-gray-500">
              Blue-500 border with blue text
            </Text>
          </BaseCard>

          {/* Accent Button */}
          <BaseCard className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Accent Button</h3>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white mb-4">
              Buy Now
            </Button>
            <Text className="text-sm text-gray-500">
              Orange-500 for high-conversion CTAs
            </Text>
          </BaseCard>
        </div>
      </motion.section>

      {/* Best Practices */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseCard className="p-6 border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900">Do</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Use blue-500 as primary brand color</li>
              <li>• Maintain 60-30-10 color ratio</li>
              <li>• Ensure WCAG AA contrast compliance</li>
              <li>• Test colors on different devices</li>
              <li>• Use semantic colors consistently</li>
            </ul>
          </BaseCard>

          <BaseCard className="p-6 border-l-4 border-red-500">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900">Don't</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• Use more than 3 saturated colors per page</li>
              <li>• Mix red and orange (too aggressive)</li>
              <li>• Use low contrast combinations</li>
              <li>• Override semantic color meanings</li>
              <li>• Forget to test in dark mode</li>
            </ul>
          </BaseCard>
        </div>
      </motion.section>
    </div>
  )
}

export default withErrorBoundary(ColorSystemGuide, "ColorSystemGuide") 