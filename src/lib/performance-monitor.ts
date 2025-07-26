/**
 * SIMPLE PERFORMANCE MONITORING
 * Lightweight performance tracking without external dependencies
 */

/**
 * Measure component render time
 * Usage: const endMeasure = measureRenderTime('MyComponent');
 *        // ... render logic
 *        endMeasure();
 */
export function measureRenderTime(componentName: string) {
  if (process.env.NODE_ENV !== 'development') return () => {};
  
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (duration > 16) { // Longer than one frame (60fps)
      console.warn(
        `⚠️ Slow render: ${componentName} took ${duration.toFixed(2)}ms`
      );
    }
  };
}

/**
 * Track Core Web Vitals
 * Reports to console in development
 */
export function trackWebVitals() {
  if (typeof window === 'undefined') return;
  
  // First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        // console.log(`📊 FCP: ${entry.startTime.toFixed(2)}ms`);
      }
    }
  });
  
  observer.observe({ entryTypes: ['paint'] });
  
  // Largest Contentful Paint
  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    // console.log(`📊 LCP: ${lastEntry.startTime.toFixed(2)}ms`);
  });
  
  lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
}

/**
 * Simple API call timer
 * Usage: const timer = apiTimer('fetchUserData');
 *        const data = await fetch(...);
 *        timer.end();
 */
export function apiTimer(operationName: string) {
  const start = performance.now();
  
  return {
    end: () => {
      const duration = performance.now() - start;
      if (process.env.NODE_ENV === 'development') {
        // console.log(`🌐 API ${operationName}: ${duration.toFixed(2)}ms`);
      }
      
      // Log slow API calls
      if (duration > 1000) {
        console.warn(`⚠️ Slow API: ${operationName} took ${duration.toFixed(2)}ms`);
      }
    }
  };
} 