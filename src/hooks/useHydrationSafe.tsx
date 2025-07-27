'use client';

import { useEffect, useState } from 'react';
import React from 'react';

/**
 * Enhanced hydration-safe hook that ensures client-only code runs after hydration
 * Prevents hydration mismatches by deferring client-specific logic
 */
export function useHydrationSafe() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted immediately
    setIsMounted(true);
    
    // Use requestIdleCallback for better performance
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => {
        setIsHydrated(true);
      });
      
      return () => {
        if ('cancelIdleCallback' in window) {
          cancelIdleCallback(id);
        }
      };
    } else {
      // Fallback for browsers without requestIdleCallback
      const timer = setTimeout(() => {
        setIsHydrated(true);
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return { isHydrated, isMounted };
}

/**
 * Simple client-side detection hook
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Safe localStorage hook that prevents hydration errors
 */
export function useLocalStorageSafe<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(defaultValue);
  const { isHydrated } = useHydrationSafe();

  useEffect(() => {
    if (!isHydrated) return;

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key, isHydrated]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/**
 * Hydration-safe date hook to prevent SSR/client date mismatches
 */
export function useHydrationSafeDate(staticDate?: string): Date {
  const { isHydrated } = useHydrationSafe();
  const serverDate = staticDate ? new Date(staticDate) : new Date('2025-01-28T00:00:00Z');
  const [date, setDate] = useState(serverDate);

  useEffect(() => {
    if (isHydrated) {
      setDate(new Date());
    }
  }, [isHydrated]);

  return date;
}

/**
 * Higher-order component that wraps components to be hydration-safe
 */
export function withHydrationSafe<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
): React.ComponentType<P> {
  return function HydrationSafeComponent(props: P) {
    const { isHydrated } = useHydrationSafe();
    
    if (!isHydrated) {
      return fallback ? <>{fallback}</> : null;
    }
    
    return <Component {...props} />;
  };
} 