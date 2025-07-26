/**
 * LAZY LOADING UTILITIES
 * Simple patterns for loading heavy components on-demand
 */

import dynamic from 'next/dynamic';
import React from 'react';

/**
 * Simple loading spinner component
 */
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

/**
 * Skeleton loader for content areas
 */
export const ContentSkeleton = ({ height = 200 }: { height?: number }) => (
  <div 
    className="animate-pulse bg-gray-200 rounded-lg" 
    style={{ height: `${height}px` }}
  />
);

/**
 * Create a lazy-loaded component with error handling
 * Usage: const MyComponent = createLazyComponent(() => import('./MyComponent'))
 */
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  loadingComponent: React.ComponentType = LoadingSpinner
) {
  return dynamic(importFn, {
    loading: () => React.createElement(loadingComponent),
    ssr: false // Client-side only for heavy components
  });
}

/**
 * Hook to check if component is in viewport
 * Useful for triggering lazy loads
 */
export function useInViewport(ref: React.RefObject<HTMLElement>, rootMargin = '100px') {
  const [isInViewport, setIsInViewport] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
          observer.disconnect(); // Only load once
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isInViewport;
}

/**
 * Example usage in a component:
 * 
 * const HeavyChart = createLazyComponent(() => import('./HeavyChart'));
 * 
 * function MyPage() {
 *   const chartRef = useRef(null);
 *   const shouldLoadChart = useInViewport(chartRef);
 * 
 *   return (
 *     <div ref={chartRef}>
 *       {shouldLoadChart && <HeavyChart />}
 *     </div>
 *   );
 * }
 */ 