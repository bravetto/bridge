'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

/**
 * 🎮 KONAMI CODE SECRET
 * Classic cheat code: ↑↑↓↓←→←→BA
 * Triggers epic visual effects then redirects to agents page
 */

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
]

interface KonamiCodeProps {
  onActivate?: () => void
}

export function KonamiCode({ onActivate }: KonamiCodeProps) {
  const [sequence, setSequence] = useState<string[]>([])
  const [isActivated, setIsActivated] = useState(false)
  const [showEffect, setShowEffect] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isActivated) return

      const newSequence = [...sequence, event.code].slice(-KONAMI_SEQUENCE.length)
      setSequence(newSequence)

      // Check if sequence matches Konami code
      if (newSequence.length === KONAMI_SEQUENCE.length) {
        const isMatch = newSequence.every((key, index) => key === KONAMI_SEQUENCE[index])
        
        if (isMatch) {
          activateKonamiCode()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sequence, isActivated])

  const activateKonamiCode = () => {
    setIsActivated(true)
    setShowEffect(true)
    
    // Trigger callback if provided
    onActivate?.()
    
    // Play epic effect sequence
    setTimeout(() => {
      // Navigate to agents page after effect
      router.push('/agents/performance')
    }, 3000)
  }

  if (!showEffect) return null

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Matrix rain effect background */}
      <div className="absolute inset-0 bg-black/90 animate-pulse" />
      
      {/* Central explosion effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Pulsing rings */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute inset-0 rounded-full border-4 border-cyan-400/50 animate-ping`}
              style={{
                width: `${(i + 1) * 100}px`,
                height: `${(i + 1) * 100}px`,
                left: `${-((i + 1) * 50)}px`,
                top: `${-((i + 1) * 50)}px`,
                animationDelay: `${i * 200}ms`,
                animationDuration: '1s'
              }}
            />
          ))}
          
          {/* Central glow */}
          <div className="w-20 h-20 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_50px_cyan]" />
        </div>
      </div>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random()}s`
          }}
        />
      ))}
      
      {/* Success message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center mt-40">
          <div className="text-6xl font-bold text-cyan-400 animate-pulse mb-4">
            🎮 KONAMI CODE ACTIVATED! 🎮
          </div>
          <div className="text-2xl text-white animate-bounce">
            Accessing Agent Control Center...
          </div>
          <div className="text-lg text-cyan-300 mt-4 animate-pulse">
            ↑↑↓↓←→←→BA
          </div>
        </div>
      </div>
      
      {/* Matrix-style code rain */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 font-mono text-sm animate-pulse"
            style={{
              left: `${i * 10}%`,
              top: '-20px',
              animation: `matrix-rain 3s linear infinite`,
              animationDelay: `${i * 300}ms`
            }}
          >
            {Array.from({ length: 20 }, () => 
              String.fromCharCode(33 + Math.floor(Math.random() * 94))
            ).join('')}
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes matrix-rain {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// Hook for easy integration
export function useKonamiCode(callback?: () => void) {
  const [isActivated, setIsActivated] = useState(false)
  
  const handleActivation = () => {
    setIsActivated(true)
    callback?.()
  }
  
  return {
    isActivated,
    KonamiCodeComponent: () => <KonamiCode onActivate={handleActivation} />
  }
} 