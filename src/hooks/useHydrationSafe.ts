import { useState, useEffect, useRef } from 'react';

/**
 * Research-backed hydration safety hooks
 * Prevents hydration mismatches by ensuring consistent server/client rendering
 * 
 * Based on React team recommendations and useSyncExternalStore pattern
 */

/**
 * Hook to safely detect if we're in a client environment
 * Prevents hydration mismatches by returning false on server, true after hydration
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
}

/**
 * Hook for hydration-safe timestamps
 * Returns null on server, actual timestamp after hydration
 */
export function useHydrationSafeTimestamp(): number | null {
  const [timestamp, setTimestamp] = useState<number | null>(null);
  
  useEffect(() => {
    setTimestamp(Date.now());
  }, []);
  
  return timestamp;
}

/**
 * Hook for hydration-safe dates
 * Returns null on server, actual date after hydration
 */
export function useHydrationSafeDate(initialDate?: Date): Date | null {
  const [date, setDate] = useState<Date | null>(null);
  
  useEffect(() => {
    setDate(initialDate || new Date());
  }, [initialDate]);
  
  return date;
}

/**
 * Hook for hydration-safe random values
 * Returns 0 on server, actual random value after hydration
 */
export function useHydrationSafeRandom(): number {
  const [random, setRandom] = useState(0);
  
  useEffect(() => {
    setRandom(Math.random());
  }, []);
  
  return random;
}

/**
 * Hook for hydration-safe dynamic IDs
 * Returns predictable ID on server, unique ID after hydration
 */
export function useHydrationSafeId(prefix = 'id'): string {
  const [id, setId] = useState(`${prefix}-server`);
  
  useEffect(() => {
    setId(`${prefix}-${Math.random().toString(36).substr(2, 9)}`);
  }, [prefix]);
  
  return id;
}

/**
 * Hook for hydration-safe conditional rendering
 * Renders fallback on server, actual content after hydration
 */
export function useHydrationSafeRender<T>(
  serverContent: T,
  clientContent: T
): T {
  const isClient = useIsClient();
  return isClient ? clientContent : serverContent;
}

/**
 * Hook for hydration-safe state with server fallback
 */
export function useHydrationSafeState<T>(
  serverValue: T,
  getClientValue: () => T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(serverValue);
  const hasHydrated = useRef(false);
  
  useEffect(() => {
    if (!hasHydrated.current) {
      setValue(getClientValue());
      hasHydrated.current = true;
    }
  }, [getClientValue]);
  
  return [value, setValue];
} 