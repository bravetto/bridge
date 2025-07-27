'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { people } from '@/data/people'

interface WitnessSliderProps {
  className?: string
}

function WitnessesSlider({ className = '' }: WitnessSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Filter to get the 14 character witnesses (excluding JAHmere as he's the subject)
  const witnesses = people.filter(person => 
    person.id !== 'jahmere-webb' && 
    person.id !== 'jay-forte' && // Not a character witness
    person.testimony?.quote // Must have testimony
  )

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % witnesses.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, witnesses.length])

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + witnesses.length) % witnesses.length)
    setIsAutoPlaying(false)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % witnesses.length)
    setIsAutoPlaying(false)
  }

  const currentWitness = witnesses[currentIndex]

  if (!currentWitness) return null

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
          CHARACTER WITNESSES
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {witnesses.length} Voices Speaking Truth
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          From NFL Hall of Famers to community leaders, these voices unite in support of mercy and transformation.
        </p>
      </div>

      {/* Main Slider */}
      <div className="witnesses-slider-card bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-center"
          >
            {/* Witness Image */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-orange-400">
              <img
                src={currentWitness.heroImage || '/images/fallbacks/person-placeholder.jpg'}
                alt={currentWitness.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/images/fallbacks/person-placeholder.jpg'
                }}
              />
            </div>

            {/* Witness Info */}
            <h3 className="text-2xl font-bold text-orange-400 mb-2">
              {currentWitness.name}
            </h3>
            <p className="text-lg font-semibold text-white/90 mb-6">
              {currentWitness.title}
            </p>

            {/* Testimony Quote */}
            {currentWitness.testimony && (
              <blockquote className="text-xl italic text-white/95 mb-6 leading-relaxed max-w-3xl mx-auto">
                "{currentWitness.testimony.quote}"
              </blockquote>
            )}

            {/* Impact Stats */}
            {currentWitness.impact?.stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {currentWitness.impact.stats.slice(0, 4).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-orange-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="witnesses-nav-btn absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
          aria-label="Previous witness"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="witnesses-nav-btn absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white transition-all"
          aria-label="Next witness"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Witness Counter & Dots */}
      <div className="flex items-center justify-center mt-6 space-x-4">
        <div className="text-white/80 text-sm font-medium">
          {currentIndex + 1} of {witnesses.length}
        </div>
        <div className="flex space-x-2">
          {witnesses.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setIsAutoPlaying(false)
              }}
              className={`witnesses-dot w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-orange-400'
                  : 'bg-white/40'
              }`}
              aria-label={`Go to witness ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Auto-play Toggle */}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="witnesses-toggle text-sm text-white/70 transition-all"
        >
          {isAutoPlaying ? '⏸️ Pause' : '▶️ Auto-play'}
        </button>
      </div>
    </div>
  )
}

export default withErrorBoundary(WitnessesSlider, "WitnessesSlider") 