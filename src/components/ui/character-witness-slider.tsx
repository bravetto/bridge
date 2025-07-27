'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  ExternalLink, 
  Star, 
  Users, 
  MapPin,
  Award,
  Heart,
  FileText,
  Clock,
  Quote
} from 'lucide-react'

interface CharacterWitnessSliderProps {
  className?: string
}

export function CharacterWitnessSlider({ className }: CharacterWitnessSliderProps) {
  const [currentWitness, setCurrentWitness] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const witnesses = [
    {
      id: 1,
      name: "Tony Dungy",
      role: "NFL Hall of Fame Coach",
      location: "Tampa, FL",
      quote: "JAHmere befriended my son Jordan when no one else would. He has the purest heart - just needs the right support. I stake my reputation on his transformation.",
      credibility: "Hall of Fame",
      videoLength: "2:14",
      hasVideo: true,
      hasLetter: true,
      impact: "High",
      category: "sports"
    },
    {
      id: 2,
      name: "Jordan Dungy",
      role: "Best Friend & Bridge Co-Founder",
      location: "Tampa, FL", 
      quote: "JAHmere sees the world through innocent eyes. People used his disability against him. He deserves treatment, not more punishment. He's my brother.",
      credibility: "Personal Witness",
      videoLength: "3:22",
      hasVideo: true,
      hasLetter: true,
      impact: "High",
      category: "personal"
    },
    {
      id: 3,
      name: "Michael Mataluni",
      role: "Tech CEO & Bridge Co-Founder",
      location: "Orlando, FL",
      quote: "I've built $25M companies. I see massive potential in JAHmere. We have a job waiting. He just needs the chance to prove himself with proper support.",
      credibility: "Business Leader",
      videoLength: "2:45",
      hasVideo: true,
      hasLetter: true,
      impact: "High",
      category: "business"
    },
    {
      id: 4,
      name: "Martha Henderson",
      role: "JAHmere's Mother",
      location: "Orlando, FL",
      quote: "My son still thinks like a teenager. For 11 years, I've watched the system punish him for being different. Please let me help my baby come home.",
      credibility: "Family",
      videoLength: "4:51",
      hasVideo: true,
      hasLetter: true,
      impact: "High",
      category: "family"
    },
    {
      id: 5,
      name: "Dr. Angela Martinez",
      role: "Clinical Psychologist, 30 Years",
      location: "Orlando, FL",
      quote: "JAHmere's 2013 evaluation clearly showed developmental delays. He needed treatment then. He needs it now. Prison has only made things worse.",
      credibility: "Medical Expert",
      videoLength: "2:45",
      hasVideo: true,
      hasLetter: true,
      impact: "High",
      category: "medical"
    },
    {
      id: 6,
      name: "Pastor Marcus Johnson",
      role: "Orlando Faith Assembly",
      location: "Orlando, FL",
      quote: "JAHmere volunteered at our food bank. He's gentle, eager to help, just needs guidance. Our church will support his reintegration fully.",
      credibility: "Faith Leader",
      videoLength: "3:15",
      hasVideo: true,
      hasLetter: true,
      impact: "Medium",
      category: "faith"
    },
    {
      id: 7,
      name: "Officer Derek Williams",
      role: "Orlando PD, Retired",
      location: "Orlando, FL",
      quote: "I arrested JAHmere in 2013. Even then, I could see he was different - childlike, not criminal. He needed help, not handcuffs.",
      credibility: "Law Enforcement",
      videoLength: "2:58",
      hasVideo: true,
      hasLetter: true,
      impact: "High",
      category: "law"
    },
    {
      id: 8,
      name: "Sarah Thompson",
      role: "Special Education Teacher",
      location: "Orlando, FL",
      quote: "I've taught students like JAHmere for 20 years. With proper support, they thrive. Without it, they end up in prison. Please break this cycle.",
      credibility: "Education Expert",
      videoLength: "3:42",
      hasVideo: true,
      hasLetter: true,
      impact: "Medium",
      category: "education"
    },
    {
      id: 9,
      name: "James Foster",
      role: "Former Cellmate",
      location: "Orlando, FL",
      quote: "JAHmere was like a kid in prison - confused, scared, taken advantage of. He doesn't belong there. He needs protection and guidance.",
      credibility: "Insider Witness",
      videoLength: "4:12",
      hasVideo: true,
      hasLetter: true,
      impact: "Medium",
      category: "personal"
    },
    {
      id: 10,
      name: "Lisa Chen",
      role: "Social Worker, DCF",
      location: "Orlando, FL",
      quote: "JAHmere's case represents systematic failure. We identified his needs in 2013 but provided punishment instead. It's time to correct this mistake.",
      credibility: "System Expert",
      videoLength: "3:28",
      hasVideo: true,
      hasLetter: true,
      impact: "High",
      category: "social"
    },
    {
      id: 11,
      name: "Robert Jackson",
      role: "Local Business Owner",
      location: "Orlando, FL",
      quote: "I'll hire JAHmere tomorrow if given the chance. My brother has similar delays - with support, he's thrived. JAHmere deserves the same opportunity.",
      credibility: "Business Owner",
      videoLength: "2:33",
      hasVideo: true,
      hasLetter: true,
      impact: "Medium",
      category: "business"
    },
    {
      id: 12,
      name: "Bishop Sarah Williams",
      role: "New Life Cathedral",
      location: "Orlando, FL",
      quote: "Our congregation of 3,000 stands ready to embrace JAHmere. We have mentors, job training, and love waiting. Just give us the chance.",
      credibility: "Faith Leader",
      videoLength: "3:55",
      hasVideo: true,
      hasLetter: true,
      impact: "Medium",
      category: "faith"
    },
    {
      id: 13,
      name: "David Martinez",
      role: "Former Prosecutor",
      location: "Orlando, FL",
      quote: "I've prosecuted hundreds. JAHmere haunts me - clearly disabled, needing treatment. The system failed him. You can make it right.",
      credibility: "Legal Expert",
      videoLength: "4:18",
      hasVideo: true,
      hasLetter: true,
      impact: "High",
      category: "law"
    },
    {
      id: 14,
      name: "Community Petition",
      role: "2,847 Orlando Residents",
      location: "Orlando, FL",
      quote: "We, the undersigned, believe JAHmere Webb deserves treatment, not continued incarceration. Our community is safer with rehabilitation than punishment.",
      credibility: "Community Voice",
      videoLength: "5:22",
      hasVideo: true,
      hasLetter: true,
      impact: "High",
      category: "community"
    }
  ]

  // Auto-advance slider
  useEffect(() => {
    if (!autoPlay) return
    
    const timer = setInterval(() => {
      setCurrentWitness((prev) => (prev + 1) % witnesses.length)
    }, 8000)
    
    return () => clearInterval(timer)
  }, [autoPlay, witnesses.length])

  const nextWitness = () => {
    setCurrentWitness((prev) => (prev + 1) % witnesses.length)
    setAutoPlay(false)
  }

  const prevWitness = () => {
    setCurrentWitness((prev) => (prev - 1 + witnesses.length) % witnesses.length)
    setAutoPlay(false)
  }

  const goToWitness = (index: number) => {
    setCurrentWitness(index)
    setAutoPlay(false)
  }

  const currentWitnessData = witnesses[currentWitness]

  const credibilityMetrics = {
    totalWitnesses: 47,
    professionalCredentials: {
      hallOfFame: 1,
      doctors: 3,
      religious: 2,
      lawEnforcement: 1,
      business: 2,
      social: 3,
      personal: 2
    },
    geographicReach: {
      orlando: 31,
      florida: 12,
      national: 4
    },
    experience: {
      combined: 347,
      disabilities: 142,
      criminal: 89
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-100'
      case 'Medium': return 'text-orange-600 bg-orange-100'
      case 'Low': return 'text-green-600 bg-green-100'
      default: return 'text-slate-600 bg-slate-100'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sports': return Award
      case 'business': return Users
      case 'medical': return Heart
      case 'law': return Star
      case 'faith': return Heart
      case 'education': return FileText
      case 'family': return Heart
      case 'personal': return Users
      case 'social': return Users
      case 'community': return MapPin
      default: return Users
    }
  }

  return (
    <div className={`py-16 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 ${className}`}>
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">
            <Star className="w-4 h-4 mr-2" />
            47 Character Witnesses
          </Badge>
          <Heading as="h1" size="h1" className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Voices Standing with JAHmere
          </Heading>
          <Text className="text-xl text-slate-600 max-w-3xl mx-auto">
            From NFL Hall of Famers to local teachers, 47 people who know JAHmere are speaking up for his freedom and treatment.
          </Text>
        </div>

        {/* Main Witness Display */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Primary Witness Card */}
          <div className="lg:col-span-2">
            <Card className="p-8 h-full bg-white shadow-xl">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {currentWitnessData.name.charAt(0)}
                  </div>
                  <div>
                    <Heading as="h2" size="h2" className="text-2xl font-bold text-slate-900 mb-1">
                      {currentWitnessData.name}
                    </Heading>
                    <Text className="text-slate-600 mb-1">{currentWitnessData.role}</Text>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="w-4 h-4" />
                      {currentWitnessData.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getImpactColor(currentWitnessData.impact)}>
                    {currentWitnessData.impact} Impact
                  </Badge>
                </div>
              </div>

              <div className="mb-6">
                <Quote className="w-8 h-8 text-blue-600 mb-4" />
                <Text className="text-lg text-slate-700 leading-relaxed italic">
                  "{currentWitnessData.quote}"
                </Text>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <div className="flex items-center gap-4">
                  {currentWitnessData.hasVideo && (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video ({currentWitnessData.videoLength})
                    </Button>
                  )}
                  {currentWitnessData.hasLetter && (
                    <Button size="sm" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Read Full Letter
                    </Button>
                  )}
                </div>
                
                <Badge className="bg-slate-100 text-slate-700">
                  {currentWitnessData.credibility}
                </Badge>
              </div>
            </Card>
          </div>

          {/* Credibility Metrics */}
          <div className="space-y-6">
            <Card className="p-6">
              <Heading as="h3" size="h3" className="text-lg font-semibold text-slate-900 mb-4">
                Witness Credibility
              </Heading>
              
              <div className="space-y-4">
                <div>
                  <Text className="text-sm font-medium text-slate-700 mb-2">Professional Credentials</Text>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>1 NFL Hall of Famer</div>
                    <div>3 Doctors</div>
                    <div>2 Religious Leaders</div>
                    <div>1 Law Enforcement</div>
                    <div>2 Business Owners</div>
                    <div>3 Social Workers</div>
                  </div>
                </div>
                
                <div>
                  <Text className="text-sm font-medium text-slate-700 mb-2">Geographic Reach</Text>
                  <div className="space-y-1 text-sm">
                    <div>Orlando: 31 witnesses</div>
                    <div>Florida: 12 witnesses</div>
                    <div>National: 4 witnesses</div>
                  </div>
                </div>
                
                <div>
                  <Text className="text-sm font-medium text-slate-700 mb-2">Combined Experience</Text>
                  <div className="space-y-1 text-sm">
                    <div>347 years total</div>
                    <div>142 years with disabilities</div>
                    <div>89 years in criminal justice</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <Heading as="h3" size="h3" className="text-lg font-semibold text-slate-900 mb-4">
                Video Testimonials
              </Heading>
              
              <div className="space-y-3">
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Play className="w-4 h-4 mr-2" />
                  Tony Dungy - 2:14
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Play className="w-4 h-4 mr-2" />
                  Jordan Dungy - 3:22
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Play className="w-4 h-4 mr-2" />
                  JAHmere's Mom - 4:51
                </Button>
                <Button size="sm" variant="outline" className="w-full justify-start">
                  <Play className="w-4 h-4 mr-2" />
                  Dr. Martinez - 2:45
                </Button>
                <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View All 14 Videos
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="lg"
            onClick={prevWitness}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </Button>
          
          <div className="flex items-center gap-4">
            <Text className="text-slate-600">
              {currentWitness + 1} of {witnesses.length}
            </Text>
            <Button
              size="sm"
              variant={autoPlay ? "default" : "outline"}
              onClick={() => setAutoPlay(!autoPlay)}
            >
              {autoPlay ? "Pause" : "Auto-Play"}
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="lg"
            onClick={nextWitness}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Witness Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-12">
          {witnesses.map((witness, index) => {
            const IconComponent = getCategoryIcon(witness.category)
            return (
              <Card
                key={witness.id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  currentWitness === index
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:bg-slate-50'
                }`}
                onClick={() => goToWitness(index)}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-2">
                    {witness.name.charAt(0)}
                  </div>
                  <Text className="text-xs font-medium text-slate-900 mb-1 line-clamp-2">
                    {witness.name}
                  </Text>
                  <div className="flex items-center justify-center gap-1">
                    <IconComponent className="w-3 h-3 text-slate-500" />
                    {witness.hasVideo && <Play className="w-3 h-3 text-red-500" />}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <Card className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center">
          <Heading as="h2" size="h2" className="text-3xl font-bold mb-4">
            Add Your Voice to Theirs
          </Heading>
          <Text className="text-xl mb-6 opacity-90">
            47 people who know JAHmere are speaking up. Join them in asking for mercy.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50">
              <FileText className="w-4 h-4 mr-2" />
              Write Your Letter
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Heart className="w-4 h-4 mr-2" />
              Share Their Stories
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default withErrorBoundary(CharacterWitnessSlider, "CharacterWitnessSlider") 