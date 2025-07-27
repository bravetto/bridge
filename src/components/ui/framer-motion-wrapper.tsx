'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useSelectedLayoutSegment } from 'next/navigation'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useContext, useEffect, useRef } from 'react'
import { withErrorBoundary } from '@/components/ui/error-boundary'

// Custom hook to retain previous value - prevents router context disruption
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

// FrozenRouter prevents component unmounting during animations
function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext)
  const prevContext = usePreviousValue(context) || null

  const segment = useSelectedLayoutSegment()
  const prevSegment = usePreviousValue(segment)

  const changed = segment !== prevSegment && segment !== undefined && prevSegment !== undefined

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {props.children}
    </LayoutRouterContext.Provider>
  )
}

// Safe page transition wrapper
interface PageTransitionProps {
  children: React.ReactNode
  className?: string
  initial?: any
  animate?: any
  exit?: any
  transition?: any
}

export function PageTransition({
  children,
  className,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: -20 },
  transition = { duration: 0.3, ease: 'easeInOut' }
}: PageTransitionProps) {
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
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}

// Safe motion component wrappers for Server Components
export const MotionDiv = motion.div
export const MotionSection = motion.section
export const MotionArticle = motion.article
export const MotionHeader = motion.header
export const MotionMain = motion.main
export const MotionFooter = motion.footer
export const MotionAside = motion.aside
export const MotionNav = motion.nav

// Pre-built animation variants for common use cases
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
  }

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
}

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
  }

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 }
  }

// Stagger animation for lists
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
}

// Safe hover animations (no layout disruption)
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 400, damping: 10 }
}

export const hoverLift = {
  whileHover: { y: -5, scale: 1.02 },
  whileTap: { y: 0, scale: 0.98 },
  transition: { type: 'spring', stiffness: 400, damping: 10 }
}

// Component for safe shared layout animations (limited scope)
interface SharedLayoutProps {
  children: React.ReactNode
  layoutId: string
  className?: string
  transition?: any
}

export function SharedLayout({ 
  children, 
  layoutId, 
  className,
  transition = { type: 'spring', stiffness: 500, damping: 30 }
}: SharedLayoutProps) {
  return (
    <motion.div
      layoutId={layoutId}
      className={className}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

export default withErrorBoundary(PageTransition, "PageTransition") 