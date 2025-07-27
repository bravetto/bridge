import { useState, useEffect } from 'react'

/**
 * Battle-tested hydration-safe hook to prevent SSR/client mismatches
 * Ensures consistent rendering between server and client
 */
export function useHydrationSafe<T>(
  getClientValue: () => T,
  getServerValue: () => T
): T {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return isHydrated ? getClientValue() : getServerValue()
}

/**
 * Hydration-safe localStorage hook with error handling
 */
export function useLocalStorageSafe<T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(defaultValue)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key)
        if (item) {
          setStoredValue(JSON.parse(item))
        }
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      setStoredValue(defaultValue)
    }
  }, [key, defaultValue])

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [isHydrated ? storedValue : defaultValue, setValue]
}

/**
 * Simple client-side detection hook
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

/**
 * Hydration-safe date hook to prevent SSR/client date mismatches
 */
export function useHydrationSafeDate(): Date {
  return useHydrationSafe(
    () => new Date(), // Client value
    () => new Date('2025-01-28T00:00:00Z') // Server value (July 28th target date)
  )
} 