/**
 * 🏗️ COMPONENT STANDARDS - Unified Interface for 67 Components
 * Ensures consistency, accessibility, and conversion optimization
 */

import React from 'react';
import { withErrorBoundary, ErrorBoundary } from '@/components/ui/error-boundary';
import { biasGuard } from '@/lib/biasguard-integration';
import { conversionOptimizer } from '@/lib/conversion-optimizer';

/**
 * Standard props that all components should accept
 */
export interface StandardComponentProps {
  // Universal props
  className?: string;
  children?: React.ReactNode;
  id?: string;
  
  // Conversion tracking
  trackingId?: string;
  conversionCritical?: boolean;
  testId?: string;
  
  // A/B testing
  variant?: string;
  
  // Accessibility (WCAG 2.1 AA)
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-hidden'?: boolean;
  role?: string;
  
  // Performance
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  
  // Mission context
  missionCritical?: boolean;
  urgency?: 'low' | 'medium' | 'high' | 'critical';
  
  // Error handling
  errorFallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

/**
 * Enhanced component props with conversion optimization
 */
export interface ConversionOptimizedProps extends StandardComponentProps {
  // Conversion tracking
  conversionEvent?: string;
  conversionValue?: number;
  
  // Trust indicators
  trustLevel?: 'basic' | 'verified' | 'premium';
  showTrustBadges?: boolean;
  
  // Social proof
  showSocialProof?: boolean;
  socialProofCount?: number;
  
  // Urgency indicators
  showUrgency?: boolean;
  deadline?: Date;
  
  // User journey
  journeyStage?: 'awareness' | 'consideration' | 'decision' | 'action';
  userType?: 'supporter' | 'advocate' | 'donor' | 'legal' | 'media';
}

/**
 * Performance tracking interface
 */
export interface PerformanceMetrics {
  renderTime: number;
  interactionLatency: number;
  memoryUsage: number;
  errorCount: number;
  conversionRate?: number;
}

/**
 * Component metadata for tracking and optimization
 */
export interface ComponentMetadata {
  name: string;
  version: string;
  category: 'ui' | 'layout' | 'form' | 'display' | 'navigation' | 'specialized';
  complexity: 'simple' | 'medium' | 'complex';
  conversionImpact: 'low' | 'medium' | 'high' | 'critical';
  accessibilityCompliant: boolean;
  performanceOptimized: boolean;
  errorBoundaryWrapped: boolean;
}

/**
 * Higher-order component for standardizing components
 */
export function withStandardization<P extends StandardComponentProps>(
  Component: React.ComponentType<P>,
  metadata: ComponentMetadata
): React.ComponentType<P> {
  
  const StandardizedComponent = (props: P) => {
    const {
      trackingId,
      conversionCritical,
      testId,
      missionCritical,
      urgency,
      ...componentProps
    } = props;
    
    // Performance monitoring
    React.useEffect(() => {
      const startTime = performance.now();
      
      return () => {
        const renderTime = performance.now() - startTime;
        
        // Track performance if component is conversion critical
        if (conversionCritical || missionCritical) {
          trackPerformance(metadata.name, {
            renderTime,
            interactionLatency: 0,
            memoryUsage: getMemoryUsage(),
            errorCount: 0
          });
        }
      };
    }, []);
    
    // Conversion tracking
    React.useEffect(() => {
      if (trackingId || testId) {
        trackComponentView(metadata.name, {
          trackingId,
          testId,
          conversionCritical,
          missionCritical,
          urgency
        });
      }
    }, [trackingId, testId, conversionCritical, missionCritical, urgency]);
    
    // BiasGuard integration for critical components
    React.useEffect(() => {
      if (missionCritical || conversionCritical) {
        biasGuard.analyzeResponse(
          `Component ${metadata.name} rendered`,
          `Rendering ${metadata.name} component`,
          {
            page: window.location.pathname,
            conversionStage: urgency === 'critical' ? 'action' : 'consideration'
          }
        );
      }
    }, [missionCritical, conversionCritical, urgency]);
    
    return <Component {...(componentProps as P)} />;
  };
  
  StandardizedComponent.displayName = `Standardized(${metadata.name})`;
  
  // Wrap with error boundary
  return withErrorBoundary(StandardizedComponent, metadata.name);
}

/**
 * Enhanced error boundary wrapper with conversion optimization
 */
export function withConversionErrorBoundary<P extends StandardComponentProps>(
  Component: React.ComponentType<P>,
  componentName: string,
  conversionFallback?: React.ReactNode
): React.ComponentType<P> {
  
  const WrappedComponent = (props: P) => {
    const fallback = conversionFallback || (
      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg text-center">
        <div className="text-4xl mb-4">⚡</div>
        <h3 className="text-xl font-semibold text-blue-800 mb-2">
          System Optimizing
        </h3>
        <p className="text-blue-600 mb-4">
          We're enhancing your experience for the July 28th mission.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="btn-base bg-primary text-white px-6 py-2"
        >
          Continue Mission
        </button>
      </div>
    );
    
    return (
      <ErrorBoundary 
        componentName={componentName}
        fallback={fallback}
        onError={(error, errorInfo) => {
          // Enhanced error tracking with conversion impact
          biasGuard.analyzeResponse(
            `Error in ${componentName}: ${error.message}`,
            'Component error occurred',
            {
              page: window.location.pathname,
              conversionStage: 'error'
            }
          );
          
          // Track conversion impact of errors
          if (props.conversionCritical || props.missionCritical) {
            trackConversionError(componentName, error, {
              conversionCritical: props.conversionCritical,
              missionCritical: props.missionCritical,
              urgency: props.urgency
            });
          }
        }}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  WrappedComponent.displayName = `withConversionErrorBoundary(${componentName})`;
  return WrappedComponent;
}

/**
 * Performance tracking utilities
 */
function trackPerformance(componentName: string, metrics: PerformanceMetrics): void {
  // Send to analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'component_performance', {
      component_name: componentName,
      render_time: metrics.renderTime,
      memory_usage: metrics.memoryUsage,
      custom_parameter_1: metrics.errorCount
    });
  }
  
  // Log for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${componentName}:`, metrics);
  }
}

/**
 * Component view tracking
 */
function trackComponentView(
  componentName: string,
  context: {
    trackingId?: string;
    testId?: string;
    conversionCritical?: boolean;
    missionCritical?: boolean;
    urgency?: string;
  }
): void {
  // Track with conversion optimizer if test ID provided
  if (context.testId) {
    // Implementation would integrate with conversion optimizer
    console.log(`[Conversion] ${componentName} viewed in test ${context.testId}`);
  }
  
  // Track critical components
  if (context.conversionCritical || context.missionCritical) {
    console.log(`[Critical] ${componentName} viewed with urgency: ${context.urgency}`);
  }
}

/**
 * Conversion error tracking
 */
function trackConversionError(
  componentName: string,
  error: Error,
  context: {
    conversionCritical?: boolean;
    missionCritical?: boolean;
    urgency?: string;
  }
): void {
  // Track conversion-critical errors
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion_error', {
      component_name: componentName,
      error_message: error.message,
      conversion_critical: context.conversionCritical,
      mission_critical: context.missionCritical,
      urgency: context.urgency
    });
  }
  
  // Log for immediate attention
  console.error(`[Conversion Error] ${componentName}:`, error, context);
}

/**
 * Memory usage utility
 */
function getMemoryUsage(): number {
  if (typeof window !== 'undefined' && 'memory' in performance) {
    const memory = (performance as any).memory;
    return memory.usedJSHeapSize / memory.totalJSHeapSize;
  }
  return 0;
}

/**
 * Component registry for tracking all standardized components
 */
export class ComponentRegistry {
  private static components = new Map<string, ComponentMetadata>();
  
  static register(metadata: ComponentMetadata): void {
    this.components.set(metadata.name, metadata);
  }
  
  static getAll(): ComponentMetadata[] {
    return Array.from(this.components.values());
  }
  
  static getByCategory(category: ComponentMetadata['category']): ComponentMetadata[] {
    return this.getAll().filter(c => c.category === category);
  }
  
  static getCritical(): ComponentMetadata[] {
    return this.getAll().filter(c => c.conversionImpact === 'critical');
  }
  
  static getStats(): {
    total: number;
    byCategory: Record<string, number>;
    errorBoundaryCount: number;
    accessibleCount: number;
    performanceOptimizedCount: number;
  } {
    const all = this.getAll();
    
    return {
      total: all.length,
      byCategory: all.reduce((acc, c) => {
        acc[c.category] = (acc[c.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      errorBoundaryCount: all.filter(c => c.errorBoundaryWrapped).length,
      accessibleCount: all.filter(c => c.accessibilityCompliant).length,
      performanceOptimizedCount: all.filter(c => c.performanceOptimized).length
    };
  }
}

/**
 * Utility for creating standardized component metadata
 */
export function createComponentMetadata(
  name: string,
  overrides: Partial<ComponentMetadata> = {}
): ComponentMetadata {
  const metadata: ComponentMetadata = {
    name,
    version: '1.0.0',
    category: 'ui',
    complexity: 'simple',
    conversionImpact: 'low',
    accessibilityCompliant: true,
    performanceOptimized: true,
    errorBoundaryWrapped: true,
    ...overrides
  };
  
  // Register component
  ComponentRegistry.register(metadata);
  
  return metadata;
}

/**
 * Standard component creation helper
 */
export function createStandardComponent<P extends StandardComponentProps>(
  Component: React.ComponentType<P>,
  name: string,
  metadata?: Partial<ComponentMetadata>
): React.ComponentType<P> {
  
  const componentMetadata = createComponentMetadata(name, metadata);
  
  return withStandardization(Component, componentMetadata);
}

/**
 * Mission-critical component wrapper
 */
export function createMissionCriticalComponent<P extends StandardComponentProps>(
  Component: React.ComponentType<P>,
  name: string
): React.ComponentType<P> {
  
  const metadata = createComponentMetadata(name, {
    conversionImpact: 'critical',
    complexity: 'complex',
    category: 'specialized'
  });
  
  return withConversionErrorBoundary(
    withStandardization(Component, metadata),
    name
  );
}

// Error boundary already imported above

// Global type declarations for analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
} 