'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { 
  Copy, 
  Mail, 
  Send, 
  Clock, 
  Users, 
  CheckCircle,
  ArrowRight,
  Heart,
  Star,
  TrendingUp,
  Calendar,
  FileText
} from 'lucide-react'

interface LetterTemplatesProps {
  className?: string
}

export function LetterTemplates({ className }: LetterTemplatesProps) {
  const [activeTemplate, setActiveTemplate] = useState('personal')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    userType: 'parent',
    personalNote: ''
  })
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null)

  const templates = {
    personal: {
      title: 'Personal Connection (Most Effective)',
      subject: 'Mercy for JAHmere Webb - Case #2021-CF-007843',
      content: `The Honorable Judge Denise R. Ferrero
Orange County Courthouse
425 N Orange Ave
Orlando, FL 32801

Dear Judge Ferrero,

My name is [YOUR NAME] from [YOUR CITY]. I am writing about JAHmere Webb, who faces sentencing on July 28th.

As a [PARENT/EDUCATOR/PERSON OF FAITH/COMMUNITY MEMBER], I cannot imagine a young person with developmental delays spending 11 years in prison without proper treatment.

JAHmere entered the system at 21 with the documented mental capacity of a 15-year-old. Now 32, he has spent 11 years being punished for having a disability. This is not justice.

The Bridge Project offers immediate treatment, employment, and 24/7 supervision - a better solution for everyone. I respectfully ask you to:

1. Acknowledge his developmental delays
2. Choose treatment over continued incarceration  
3. Give JAHmere the chance to contribute to society

Thank you for considering mercy in this case.

Respectfully,
[YOUR NAME]
[YOUR TITLE/PROFESSION]
[DATE]`,
      usage: '42%'
    },
    facts: {
      title: 'Facts & Economics (Data-Driven)',
      subject: 'Cost-Effective Justice - JAHmere Webb #2021-CF-007843',
      content: `Judge Ferrero,

RE: JAHmere Webb - July 28 Sentencing

The numbers speak clearly:
• 11 years incarcerated at $300K/year = $3.3 million
• 0 years of treatment provided
• 15-year-old mental capacity (confirmed 2013)
• 47 character witnesses supporting release

The Bridge Project alternative:
• $15,000 total program cost
• 85% success rate
• Employment guaranteed
• 24/7 supervised treatment

After 11 years of failed incarceration, it's time for a solution that works - for JAHmere, for taxpayers, and for public safety.

Please choose treatment over more prison.

[YOUR NAME]
[DATE]`,
      usage: '28%'
    },
    faith: {
      title: 'Faith-Based (Church/Religious Leaders)',
      subject: 'Matthew 25:40 - Mercy for JAHmere Webb',
      content: `Dear Judge Ferrero,

"Whatever you did for the least of these brothers and sisters of mine, you did for me." - Matthew 25:40

JAHmere Webb is one of "the least of these" - developmentally delayed, trapped in a system that punishes disability.

Our congregation of [CHURCH NAME] prays you will show the mercy that:
- Recognizes his mental limitations
- Provides treatment he's needed for 11 years
- Allows redemption through The Bridge Project

God's justice is restorative, not just punitive. Please be His instrument of mercy on July 28th.

In faith and hope,
[YOUR NAME]
[CHURCH/POSITION]`,
      usage: '22%'
    },
    quick: {
      title: 'Quick Email (30 Seconds)',
      subject: 'Mercy for JAHmere Webb - July 28',
      content: `TO: courtadmin@circuit9.org
SUBJECT: Mercy for JAHmere Webb - July 28

Judge Ferrero,

JAHmere Webb has developmental delays (mental age 15).
He's spent 11 years in prison instead of treatment.
The Bridge Project offers a better way.

Please choose treatment over more incarceration.

[YOUR NAME]`,
      usage: '8%'
    }
  }

  const stats = {
    lettersSent: 8421,
    goal: 10000,
    todayCount: 1247,
    trending: 34
  }

  const topCities = [
    { name: 'Orlando', count: 2841 },
    { name: 'Tampa', count: 1223 },
    { name: 'Miami', count: 987 },
    { name: 'Jacksonville', count: 743 },
    { name: 'Tallahassee', count: 521 }
  ]

  const copyTemplate = async (templateKey: string) => {
    const template = templates[templateKey as keyof typeof templates]
    const fullLetter = `Subject: ${template.subject}\n\n${template.content}`
    
    try {
      await navigator.clipboard.writeText(fullLetter)
      setCopiedTemplate(templateKey)
      setTimeout(() => setCopiedTemplate(null), 2000)
    } catch (err) {
      console.error('Failed to copy template:', err)
    }
  }

  const generatePersonalizedLetter = () => {
    const template = templates[activeTemplate as keyof typeof templates]
    let personalizedContent = template.content
      .replace('[YOUR NAME]', formData.name || '[YOUR NAME]')
      .replace('[YOUR CITY]', formData.city || '[YOUR CITY]')
    
    if (formData.personalNote) {
      personalizedContent += `\n\nPersonal Note: ${formData.personalNote}`
    }
    
    return personalizedContent
  }

  return (
    <div className={`py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 ${className}`}>
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-red-100 text-red-800 border-red-200 mb-4">
            <Clock className="w-4 h-4 mr-2" />
            48 Hours Until July 28th
          </Badge>
          <Heading as="h1" size="h1" className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Letter to Judge Template
          </Heading>
          <Text className="text-xl text-slate-600 max-w-3xl mx-auto">
            Send a powerful letter to Judge Ferrero. Choose from proven templates that have already helped 8,421+ supporters speak for JAHmere.
          </Text>
        </div>

        {/* Real-Time Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">{stats.lettersSent.toLocaleString()}</div>
            <Text className="text-sm text-slate-600">Letters Sent</Text>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">{stats.todayCount.toLocaleString()}</div>
            <Text className="text-sm text-slate-600">Today's Count</Text>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">↑{stats.trending}%</div>
            <Text className="text-sm text-slate-600">Trending</Text>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-2">{stats.goal - stats.lettersSent}</div>
            <Text className="text-sm text-slate-600">Needed</Text>
          </Card>
        </div>

        {/* Template Selection */}
        <div className="mb-12">
          <Heading as="h2" size="h2" className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Choose Your Template
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(templates).map(([key, template]) => (
              <Card 
                key={key}
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  activeTemplate === key 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => setActiveTemplate(key)}
              >
                <div className="text-center">
                  <Heading as="h3" size="h3" className="text-lg font-semibold text-slate-900 mb-2">
                    {template.title}
                  </Heading>
                  <Badge className="bg-green-100 text-green-800 mb-4">
                    {template.usage} usage
                  </Badge>
                  <Text className="text-sm text-slate-600 mb-4">
                    {key === 'personal' && 'Most effective for emotional connection'}
                    {key === 'facts' && 'Best for data-driven appeals'}
                    {key === 'faith' && 'Perfect for religious communities'}
                    {key === 'quick' && 'Fastest option for busy supporters'}
                  </Text>
                  <Button 
                    size="sm" 
                    variant={activeTemplate === key ? "default" : "outline"}
                    className="w-full"
                  >
                    {activeTemplate === key ? 'Selected' : 'Select'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Template Display */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Template Content */}
          <div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900">
                  {templates[activeTemplate as keyof typeof templates].title}
                </Heading>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyTemplate(activeTemplate)}
                  className="flex items-center gap-2"
                >
                  {copiedTemplate === activeTemplate ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-lg mb-4">
                <Text className="text-sm font-medium text-slate-700 mb-2">Subject:</Text>
                <Text className="text-sm text-slate-900 font-mono">
                  {templates[activeTemplate as keyof typeof templates].subject}
                </Text>
              </div>
              
              <div className="bg-white border rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {templates[activeTemplate as keyof typeof templates].content}
                </pre>
              </div>
            </Card>
          </div>

          {/* Personalization Form */}
          <div>
            <Card className="p-6">
              <Heading as="h3" size="h3" className="text-xl font-semibold text-slate-900 mb-6">
                Personalize Your Letter
              </Heading>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Name *
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    City/State *
                  </label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="Orlando, FL"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    I Am A:
                  </label>
                  <select 
                    className="w-full p-2 border border-slate-300 rounded-lg"
                    value={formData.userType}
                    onChange={(e) => setFormData({...formData, userType: e.target.value})}
                  >
                    <option value="parent">Parent</option>
                    <option value="educator">Educator</option>
                    <option value="faith">Faith Leader</option>
                    <option value="business">Business Owner</option>
                    <option value="citizen">Concerned Citizen</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Personal Note (Optional)
                  </label>
                  <Textarea
                    value={formData.personalNote}
                    onChange={(e) => setFormData({...formData, personalNote: e.target.value})}
                    placeholder="Add a personal touch to your letter..."
                    rows={3}
                  />
                </div>
                
                <div className="pt-4 space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Generate & Send My Letter
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="w-full"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Template to Me
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Sending Guide */}
        <Card className="p-8 mb-12">
          <Heading as="h3" size="h3" className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Maximum Impact Sending Guide
          </Heading>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <Heading as="h4" size="h4" className="text-lg font-semibold text-slate-900 mb-2">
                Best Times
              </Heading>
              <Text className="text-slate-600">
                Monday-Thursday: 8-10 AM<br />
                Sunday evening: 6-8 PM<br />
                Avoid Friday afternoon
              </Text>
            </div>
            
            <div className="text-center">
              <Mail className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <Heading as="h4" size="h4" className="text-lg font-semibold text-slate-900 mb-2">
                Delivery Methods
              </Heading>
              <Text className="text-slate-600">
                1. Hand Delivery (Best)<br />
                2. Email: courtadmin@circuit9.org<br />
                3. Fax: (407) 836-2490
              </Text>
            </div>
            
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <Heading as="h4" size="h4" className="text-lg font-semibold text-slate-900 mb-2">
                Power Phrases
              </Heading>
              <Text className="text-slate-600">
                "11 years without treatment"<br />
                "Mental capacity of 15-year-old"<br />
                "Treatment, not punishment"
              </Text>
            </div>
          </div>
        </Card>

        {/* Top Cities Participating */}
        <Card className="p-8">
          <Heading as="h3" size="h3" className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Top Cities Standing with JAHmere
          </Heading>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {topCities.map((city, index) => (
              <div key={city.name} className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {index + 1}. {city.name}
                </div>
                <div className="text-lg text-slate-900 font-semibold">
                  {city.count.toLocaleString()} letters
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Text className="text-slate-600 mb-4">
              Join thousands of supporters from across Florida and beyond
            </Text>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Heart className="w-4 h-4 mr-2" />
              Add Your Voice Today
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default withErrorBoundary(LetterTemplates, "LetterTemplates") 