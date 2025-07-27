"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { withSafeUI } from "./with-safe-ui";

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: 'fade' | 'slide' | 'scale';
  className?: string;
}

/**
 * 🎨 ULTRA MODERN 2025 PAGE TRANSITION
 * Simplified, performance-optimized page transitions
 * Based on proven patterns from ultra-modern-2025-final
 */
function PageTransition({ 
  children, 
  variant = 'fade', 
  className = "" 
}: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  // Simple, proven animation variants
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.3 }
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.3 }
    }
  };

  // Use reduced motion if user prefers it
  if (shouldReduceMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.div>
    );
  }

  const animation = variants[variant];

  return (
    <motion.div
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={animation.transition}
    >
      {children}
    </motion.div>
  );
}

export default withSafeUI(PageTransition);

// Simple reveal on scroll component for compatibility
interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function RevealOnScroll({ children, delay = 0, className }: RevealOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
