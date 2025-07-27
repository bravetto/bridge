'use client'

import { 
  motion, 
  AnimatePresence,
  type HTMLMotionProps,
  type Variants 
} from 'framer-motion'
import { 
  useContext, 
  useEffect, 
  useRef, 
  forwardRef,
  type ReactNode 
} from 'react'
import { 
  useSelectedLayoutSegment 
} from 'next/navigation'
import { 
  LayoutRouterContext 
} from 'next/dist/shared/lib/app-router-context.shared-runtime'

// ============================================================================
// FROZEN ROUTER - Prevents context switching during animations
// ============================================================================

function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T>()

  useEffect(() => {
    prevValue.current = value
    return () => {
      prevValue.current = undefined
    }
  })

  return prevValue.current
}

function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext)
  const prevContext = usePreviousValue(context) || null

  const segment = useSelectedLayoutSegment()
  const prevSegment = usePreviousValue(segment)

  const changed = 
    segment !== prevSegment && 
    segment !== undefined && 
    prevSegment !== undefined

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {children}
    </LayoutRouterContext.Provider>
  )
}

// ============================================================================
// LAYOUT TRANSITION - Main animation wrapper
// ============================================================================

interface LayoutTransitionProps {
  children: ReactNode
  className?: string
  initial?: HTMLMotionProps<'div'>['initial']
  animate?: HTMLMotionProps<'div'>['animate']
  exit?: HTMLMotionProps<'div'>['exit']
  transition?: HTMLMotionProps<'div'>['transition']
  variants?: Variants
}

export function LayoutTransition({
  children,
  className,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: -20 },
  transition = { duration: 0.3, ease: 'easeInOut' },
  variants
}: LayoutTransitionProps) {
  const segment = useSelectedLayoutSegment()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={segment}
        className={className}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        variants={variants}
      >
        <FrozenRouter>
          {children}
        </FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================================================
// SAFE MOTION COMPONENTS - Wrapped for Server Component compatibility
// ============================================================================

type MotionDivProps = HTMLMotionProps<'div'>
type MotionH1Props = HTMLMotionProps<'h1'>
type MotionH2Props = HTMLMotionProps<'h2'>
type MotionSectionProps = HTMLMotionProps<'section'>

export const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  function MotionDiv(props, ref) {
    return <motion.div ref={ref} {...props} />
  }
)

export const MotionH1 = forwardRef<HTMLHeadingElement, MotionH1Props>(
  function MotionH1(props, ref) {
    return <motion.h1 ref={ref} {...props} />
  }
)

export const MotionH2 = forwardRef<HTMLHeadingElement, MotionH2Props>(
  function MotionH2(props, ref) {
    return <motion.h2 ref={ref} {...props} />
  }
)

export const MotionSection = forwardRef<HTMLElement, MotionSectionProps>(
  function MotionSection(props, ref) {
    return <motion.section ref={ref} {...props} />
  }
)

// ============================================================================
// COMMON ANIMATION VARIANTS
// ============================================================================

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// ============================================================================
// BIAS DETECTION HOOK - Monitor Perfect Storm patterns
// ============================================================================

export function usePerfectStormDetector() {
  const segment = useSelectedLayoutSegment()
  const prevSegment = usePreviousValue(segment)
  const renderCount = useRef(0)
  const lastRenderTime = useRef(Date.now())

  useEffect(() => {
    renderCount.current++
    const now = Date.now()
    const timeDiff = now - lastRenderTime.current
    lastRenderTime.current = now

    // Detect rapid re-renders (potential Perfect Storm)
    if (timeDiff < 50 && renderCount.current > 3) {
      console.warn('🌪️ Perfect Storm detected: Rapid re-renders', {
        segment,
        prevSegment,
        renderCount: renderCount.current,
        timeDiff
      })
    }

    // Reset counter after successful render
    const resetTimer = setTimeout(() => {
      renderCount.current = 0
    }, 1000)

    return () => clearTimeout(resetTimer)
  }, [segment, prevSegment])

  return {
    segment,
    prevSegment,
    renderCount: renderCount.current,
    isStormDetected: renderCount.current > 3
  }
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export { motion, AnimatePresence } from 'framer-motion'
export type { Variants, HTMLMotionProps } from 'framer-motion' 