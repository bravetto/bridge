"use client";

/**
 * 🎨 ULTRA MODERN 2025 ANIMATION UTILITIES
 * Simplified, performance-optimized animation helpers
 * Based on proven patterns from ultra-modern-2025-final
 */

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useReducedMotion } from "framer-motion";
import { ultraModernAnimations } from "@/lib/design-system";
import type { Transition } from "framer-motion";

/**
 * Device performance tiers for animation scaling
 */
export type DeviceTier = "low" | "medium" | "high";

/**
 * Ultra Modern Animation Presets - Proven Patterns
 */
export const ultraModernPresets = {
  // FADE ANIMATIONS
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  },

  // SLIDE ANIMATIONS  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: "easeOut" }
  },

  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.5, ease: "easeOut" }
  },

  // SCALE ANIMATIONS
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
    transition: { duration: 0.5, ease: "easeOut" }
  },

  // HOVER ANIMATIONS
  hoverScale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2, ease: "easeOut" }
  },

  hoverLift: {
    whileHover: { y: -4, scale: 1.02 },
    transition: { duration: 0.3, ease: "easeOut" }
  },

  // STAGGER ANIMATIONS
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  }
} as const;

/**
 * Performance monitoring hook
 */
export function usePerformanceMonitor() {
  const [deviceTier, setDeviceTier] = useState<DeviceTier>("medium");
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Simple device detection
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    
    if (cores >= 8 && memory >= 8) {
      setDeviceTier("high");
    } else if (cores >= 4 && memory >= 4) {
      setDeviceTier("medium");
    } else {
      setDeviceTier("low");
      setIsLowPerformance(true);
    }
  }, []);

  return { deviceTier, isLowPerformance };
}

/**
 * Reduced motion aware animation hook
 */
export function useUltraModernAnimation(animationKey: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'scaleIn' | 'staggerItem') {
  const shouldReduceMotion = useReducedMotion();
  const { isLowPerformance } = usePerformanceMonitor();
  
  const animation = ultraModernPresets[animationKey];
  
  // Return simplified animation for reduced motion or low performance
  if (shouldReduceMotion || isLowPerformance) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.1 }
    };
  }
  
  return animation;
}

/**
 * Intersection observer animation hook
 */
export function useInViewAnimation(animationKey: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'scaleIn' | 'staggerItem', options = {}) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    ...options
  });
  
  const animation = useUltraModernAnimation(animationKey);
  
  return {
    ref,
    ...animation,
    animate: inView ? animation.animate : animation.initial
  };
}

/**
 * Stagger animation utilities
 */
export function createStaggerAnimation(itemCount: number, staggerDelay = 0.1) {
  return {
    container: {
      animate: {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.2
        }
      }
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
}

/**
 * Ultra Modern CSS Animation Classes
 * For use with Tailwind CSS
 */
export const ultraModernCSSAnimations = {
  // SPINNING ANIMATIONS (from ultra-modern-2025-final)
  spinSlow: "animate-spin-slow", // 20s
  spinReverse: "animate-spin-reverse", // 15s reverse
  
  // FLOATING ANIMATIONS
  floatGentle: "animate-float-gentle", // 4s float
  pulseSoft: "animate-pulse-soft", // 4s pulse
  
  // BASIC ANIMATIONS
  bounce: "animate-bounce",
  pulse: "animate-pulse",
  spin: "animate-spin",
  
  // TRANSITIONS
  transition: "transition-all duration-300 ease-out",
  transitionFast: "transition-all duration-150 ease-out",
  transitionSlow: "transition-all duration-500 ease-out"
} as const;

/**
 * Performance-optimized animation config
 */
export const ultraModernConfig = {
  // GPU acceleration
  transform: { 
    willChange: "transform",
    backfaceVisibility: "hidden" as const,
    perspective: 1000
  },
  
  // Reduced motion fallbacks
  reducedMotion: {
    duration: 0.1,
    ease: "linear" as const
  },
  
  // Performance thresholds
  maxAnimations: 10,
  frameRate: 60,
  
  // Timing functions
  easings: {
    ultraModern: [0.16, 1, 0.3, 1] as const,
    gentle: [0.4, 0, 0.2, 1] as const,
    bounce: [0.34, 1.56, 0.64, 1] as const
  }
} as const;

/**
 * Animation state management
 */
export function useAnimationState() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationCount, setAnimationCount] = useState(0);
  
  const startAnimation = useCallback(() => {
    setIsAnimating(true);
    setAnimationCount(prev => prev + 1);
  }, []);
  
  const endAnimation = useCallback(() => {
    setAnimationCount(prev => {
      const newCount = prev - 1;
      if (newCount <= 0) {
        setIsAnimating(false);
        return 0;
      }
      return newCount;
    });
  }, []);
  
  return {
    isAnimating,
    animationCount,
    startAnimation,
    endAnimation,
    isOverloaded: animationCount > ultraModernConfig.maxAnimations
  };
}

/**
 * Export commonly used animations
 */
export const fadeIn = ultraModernPresets.fadeIn;
export const slideUp = ultraModernPresets.slideUp;
export const slideInLeft = ultraModernPresets.slideInLeft;
export const scaleIn = ultraModernPresets.scaleIn;
export const hoverScale = ultraModernPresets.hoverScale;
export const hoverLift = ultraModernPresets.hoverLift;
export const staggerContainer = ultraModernPresets.staggerContainer;
export const staggerItem = ultraModernPresets.staggerItem;

/**
 * Ultra modern easing for CSS
 */
export const ultraModernEase = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Default export for convenience
 */
export default {
  presets: ultraModernPresets,
  css: ultraModernCSSAnimations,
  config: ultraModernConfig,
  hooks: {
    useUltraModernAnimation,
    useInViewAnimation,
    useAnimationState,
    usePerformanceMonitor
  }
};
