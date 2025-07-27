'use client'

import { Button } from '@/components/ui/button'
import { Heart, ArrowRight } from 'lucide-react'
import { withErrorBoundary } from '@/components/ui/error-boundary'

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:block">
      <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-xl">
        <Heart className="w-4 h-4 mr-2" />
        Help JAHmere
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}

export function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white z-50 md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <div className="text-xs font-medium">48 HOURS LEFT</div>
          <div className="text-sm">Help JAHmere & Jordan</div>
        </div>
        <Button size="sm" className="bg-white text-purple-600 hover:bg-gray-50 font-semibold px-4 py-2">
          <Heart className="w-4 h-4 mr-1" />
          ACT NOW
        </Button>
      </div>
    </div>
  )
}

export function DivineFAB() {
  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:block">
      <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl">
        <Heart className="w-4 h-4 mr-2" />
        Support JAHmere
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  )
}

export default withErrorBoundary(FloatingCTA, "FloatingCTA") 