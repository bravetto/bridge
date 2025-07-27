'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heading, Text } from '@/components/ui/typography'
import { Badge } from '@/components/ui/badge'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { 
  Heart, 
  ArrowRight, 
  Clock, 
  Users,
  Mail,
  Share2,
  Heart as PrayIcon,
  Calendar,
  ExternalLink,
  Star
} from 'lucide-react'

/**
 * 🎯 THE BRIDGE PROJECT - MVP HOMEPAGE
 * Hydration-safe, static design for July 28th deadline
 */
function BridgeProjectMVP() {
  const [activeAction, setActiveAction] = useState('pray')

  // Static countdown - no dynamic values
  const timeLeft = { days: 1, hours: 18, minutes: 42 }

  const actions = [
    { id: 'pray', label: 'PRAY', icon: PrayIcon, color: 'from-purple-500 to-indigo-600' },
    { id: 'advocate', label: 'ADVOCATE', icon: Mail, color: 'from-blue-500 to-cyan-600' },
    { id: 'share', label: 'SHARE', icon: Share2, color: 'from-green-500 to-emerald-600' }
  ]

  const witnesses = [
    { name: 'Tony Dungy', role: 'NFL Hall of Fame Coach', quote: 'JAHmere has the purest heart' },
    { name: 'Jordan Dungy', role: 'Best Friend', quote: 'He deserves treatment, not punishment' },
    { name: 'Dr. Martinez', role: 'Clinical Psychologist', quote: 'He needed treatment, not prison' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      
      {/* Urgency Header - Completely static */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 sticky top-0 z-50">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <Clock className="w-4 h-4" />
            <span>URGENT: {timeLeft.days} DAY, {timeLeft.hours} HOURS until July 28th</span>
          </div>
        </div>
      </div>

      {/* Hero Section - Static */}
      <section className="py-24">
        <div className="mx-auto max-w-screen-xl px-6 text-center space-y-8">
          
          {/* Main Headline */}
          <div className="space-y-4">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-sm px-3 py-1">
              <Heart className="w-4 h-4 mr-2" />
              Two Sons. Two Battles. One Prayer.
            </Badge>
            
            <Heading as="h1" size="h1" className="text-6xl font-bold text-slate-900 leading-tight px-2">
              JAHmere entered the system at 21 with the mind of a <span className="text-blue-600">15-year-old</span>
            </Heading>
            
            <Text className="text-xl text-slate-600 max-w-3xl mx-auto px-2">
              Now 32, still trapped. Jordan faces surgery #81.
              <br />
              <strong className="text-red-600">July 28th - Both fight for their lives.</strong>
            </Text>
          </div>

          {/* Primary CTA */}
          <div className="space-y-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <PrayIcon className="w-5 h-5 mr-2" />
              JOIN THE PRAYER MOVEMENT
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div>
              <Button variant="outline" size="lg" className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                <Mail className="w-4 h-4 mr-2" />
                EMAIL JUDGE NOW
              </Button>
            </div>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center justify-center gap-6 text-slate-600">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-medium">8,421 supporters</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">47 character witnesses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tony Dungy's Call */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-screen-xl px-6">
          <Card className="p-8 bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto">
                TD
              </div>
              <div className="flex-1 text-center">
                <div className="flex flex-col items-center gap-3 mb-4">
                  <Heading as="h2" size="h2" className="text-2xl font-bold text-slate-900">
                    Tony Dungy's Call to Action
                  </Heading>
                  <Badge className="bg-blue-100 text-blue-800 text-sm w-fit">@TonyDungy</Badge>
                </div>
                <Text className="text-lg text-slate-700 leading-relaxed mb-6">
                  "My son Jordan undergoes life-threatening surgery July 28. His best friend JAHmere—who has developmental delays—faces prison the same day after 11 years in the system. Join me for prayer vigil tomorrow 7PM EST on Twitter. God can move mountains. #PrayForBoth #BridgeProject"
                </Text>
                <div className="flex flex-col gap-3">
                  <Button className="bg-blue-500 hover:bg-blue-600 transform hover:scale-105 transition-all duration-200">
                    <Share2 className="w-4 h-4 mr-2" />
                    RETWEET NOW
                  </Button>
                  <Button variant="outline" className="border-2 hover:bg-slate-50">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    SHARE
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center mb-12">
            <Heading as="h2" size="h2" className="text-3xl font-bold text-slate-900 mb-4">
              The Urgency
            </Heading>
            <div className="text-5xl font-bold text-red-600 mb-2 animate-pulse">48 HOURS</div>
            <Text className="text-xl text-slate-600">Until July 28th</Text>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* JAHmere's Story */}
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:shadow-lg transition-shadow duration-300">
              <Heading as="h3" size="h3" className="text-2xl font-bold text-blue-900 mb-6">
                JAHmere Webb
              </Heading>
              <div className="space-y-4 text-slate-700">
                <div className="flex justify-between">
                  <span className="font-medium">Entered system:</span>
                  <strong className="text-blue-800">Age 21 (mind of 15)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Now:</span>
                  <strong className="text-blue-800">Age 32 (still developmentally delayed)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Wasted:</span>
                  <strong className="text-red-600">11 years without treatment</strong>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Facing:</span>
                  <strong className="text-red-600">More prison instead of help</strong>
                </div>
              </div>
            </Card>

            {/* Jordan's Battle */}
            <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:shadow-lg transition-shadow duration-300">
              <Heading as="h3" size="h3" className="text-2xl font-bold text-purple-900 mb-6">
                Jordan Dungy
              </Heading>
              <div className="space-y-4 text-slate-700">
                <div className="flex justify-between">
                  <span className="font-medium">Condition:</span>
                  <strong className="text-purple-800">Cannot feel pain (CIPA)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Battle:</span>
                  <strong className="text-purple-800">Surgery #81</strong>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Risk:</span>
                  <strong className="text-red-600">Life-threatening procedure</strong>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Faith:</span>
                  <strong className="text-green-600">"God's not done with us"</strong>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Prayer Vigil */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <div className="space-y-6">
            <Heading as="h2" size="h2" className="text-3xl font-bold">
              Tomorrow: Twitter Prayer Vigil
            </Heading>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto">
              <div className="space-y-4">
                <div className="text-2xl font-bold">July 27 @ 7PM EST</div>
                <div className="text-xl">@TonyDungy Twitter/X Live</div>
                <div className="text-lg opacity-90">
                  Tony Dungy leads 30-minute prayer for both sons
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50">
                <Calendar className="w-5 h-5 mr-2" />
                SET REMINDER
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <ExternalLink className="w-5 h-5 mr-2" />
                FOLLOW @TONYDUNGY
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Three Ways to Act */}
      <section className="py-16">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center mb-12">
            <Heading as="h2" size="h2" className="text-3xl font-bold text-slate-900">
              Three Ways to Act Now
            </Heading>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {actions.map((action, index) => (
              <Card 
                key={action.id}
                className={`p-8 text-center cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  activeAction === action.id 
                    ? 'ring-2 ring-blue-500 shadow-xl bg-blue-50' 
                    : 'hover:shadow-lg hover:bg-slate-50'
                }`}
                onClick={() => setActiveAction(action.id)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <Heading as="h3" size="h3" className="text-xl font-bold text-slate-900 mb-4">
                  {index + 1}. {action.label}
                </Heading>
                <Text className="text-slate-600 mb-6 leading-relaxed">
                  {action.id === 'pray' && "Join Tony's Twitter vigil tomorrow 7PM EST"}
                  {action.id === 'advocate' && "Email Judge Ferrero - 11 years is enough"}
                  {action.id === 'share' && "Spread the story - every voice matters"}
                </Text>
                <Button className="w-full font-semibold py-3 transform hover:scale-105 transition-all duration-200">
                  {action.id === 'pray' && 'JOIN PRAYER'}
                  {action.id === 'advocate' && 'EMAIL TEMPLATE'}
                  {action.id === 'share' && 'SHARE KIT'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Character Witnesses Preview */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center mb-12">
            <Heading as="h2" size="h2" className="text-3xl font-bold text-slate-900 mb-4">
              47 Character Witnesses
            </Heading>
            <Text className="text-xl text-slate-600">
              Voices Standing with JAHmere
            </Text>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {witnesses.map((witness, index) => (
              <Card key={index} className="p-6 bg-white">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {witness.name.charAt(0)}
                  </div>
                  <Heading as="h4" size="h4" className="text-lg font-bold text-slate-900 mb-2">
                    {witness.name}
                  </Heading>
                  <Text className="text-sm text-slate-500 mb-4">{witness.role}</Text>
                  <Text className="text-slate-700 italic">"{witness.quote}"</Text>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline">
              READ ALL LETTERS
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* The Bridge Project */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <div className="space-y-8">
            <Heading as="h2" size="h2" className="text-3xl font-bold">
              The Bridge Project
            </Heading>
            
            <Text className="text-xl max-w-3xl mx-auto opacity-90">
              When JAHmere walks free and Jordan heals,<br />
              we launch to transform 10,000 lives.
            </Text>

            <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <Text className="font-semibold">Michael Mataluni</Text>
                <Text className="text-sm opacity-75">(Built $25M from trauma)</Text>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <Text className="font-semibold">Jordan Dungy</Text>
                <Text className="text-sm opacity-75">(Prophetic voice)</Text>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <Text className="font-semibold">JAHmere Webb</Text>
                <Text className="text-sm opacity-75">(From prisoner to protector)</Text>
              </div>
            </div>

            <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-50">
              LEARN MORE
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Mobile Floating CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white z-40">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="text-xs font-medium">48 HOURS LEFT</div>
            <div className="text-sm">Help JAHmere & Jordan</div>
          </div>
          <Button size="sm" className="bg-white text-purple-600 hover:bg-gray-50 font-semibold px-4 py-2 transform hover:scale-105 transition-all duration-200">
            <PrayIcon className="w-4 h-4 mr-1" />
            PRAY NOW
          </Button>
        </div>
      </div>

      {/* Add padding to prevent content being hidden behind floating CTA */}
      <div className="h-20"></div>
    </div>
  )
}

export default withErrorBoundary(BridgeProjectMVP, "BridgeProjectMVP") 