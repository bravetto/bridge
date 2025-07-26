/**
 * IMPROVED ERROR BOUNDARY - Production-Ready with Reset Capability
 * Battle-tested error handling with user-friendly recovery options
 */
'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  isolate?: boolean; // If true, only shows error for this component, not full page
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // Update state with error details
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    const { hasError, error, errorCount } = this.state;
    const { children, fallback, isolate } = this.props;

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return <>{fallback(error, this.resetErrorBoundary)}</>;
      }

      // Default fallback UI
      const containerClass = isolate 
        ? "p-4 bg-red-50 border border-red-200 rounded-lg"
        : "min-h-screen flex items-center justify-center bg-gray-50 p-4";

      return (
        <div className={containerClass}>
          <div className="max-w-md w-full space-y-4">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">
                Oops! Something went wrong
              </h2>
            </div>
            
            <p className="text-gray-600">
              We encountered an unexpected error. This has been logged and our team will look into it.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 p-4 bg-gray-100 rounded-md">
                <summary className="cursor-pointer text-sm font-medium text-gray-700">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 text-xs text-gray-600 overflow-auto">
                  {error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="flex space-x-3">
              <Button
                onClick={this.resetErrorBoundary}
                className="flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </Button>
              
              {!isolate && (
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                >
                  Go Home
                </Button>
              )}
            </div>

            {errorCount > 2 && (
              <p className="text-sm text-amber-600 mt-2">
                Multiple errors detected. Consider refreshing the page.
              </p>
            )}
          </div>
        </div>
      );
    }

    return children;
  }
}

// HOC wrapper with improved signature
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

// Feature-specific error boundary for isolated error handling
export const FeatureErrorBoundary: React.FC<{
  children: ReactNode;
  feature: string;
}> = ({ children, feature }) => (
  <ErrorBoundary
    isolate
    fallback={(error, reset) => (
      <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
        <h3 className="text-lg font-medium text-amber-900 mb-2">
          {feature} temporarily unavailable
        </h3>
        <p className="text-sm text-amber-700 mb-4">
          This feature encountered an issue. You can continue using other parts of the application.
        </p>
        <Button size="sm" variant="outline" onClick={reset}>
          Retry {feature}
        </Button>
      </div>
    )}
  >
    {children}
  </ErrorBoundary>
);

export default ErrorBoundary; 