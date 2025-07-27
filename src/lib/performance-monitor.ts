/**
 * 🚀 PERFORMANCE MONITOR - Real-time System Health Dashboard
 * Championship-level monitoring for July 28th mission
 */

export interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number;                    // Largest Contentful Paint
  fid: number;                    // First Input Delay
  cls: number;                    // Cumulative Layout Shift
  fcp: number;                    // First Contentful Paint
  ttfb: number;                   // Time to First Byte
  
  // Business Metrics
  conversionRate: number;         // Current conversion %
  bounceRate: number;            // User bounce %
  averageSessionTime: number;    // Session duration
  pageViews: number;             // Total page views
  uniqueVisitors: number;        // Unique users
  
  // Technical Metrics
  apiResponseTime: number;       // Average API response
  buildTime: number;             // Latest build duration
  errorRate: number;             // Error percentage
  memoryUsage: number;           // Memory consumption
  cpuUsage: number;              // CPU utilization
  
  // Mission-Critical Metrics
  july28Countdown: number;       // Days remaining
  campaignEngagement: number;    // Social engagement
  petitionSignatures: number;    // Petition count
  communityGrowth: number;       // Community size
}

export interface AlertThreshold {
  metric: keyof PerformanceMetrics;
  threshold: number;
  severity: 'info' | 'warning' | 'critical';
  action: string;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics;
  private alerts: AlertThreshold[];
  private observers: PerformanceObserver[];
  
  constructor() {
    this.metrics = this.initializeMetrics();
    this.alerts = this.getDefaultThresholds();
    this.observers = [];
    this.startMonitoring();
  }
  
  private initializeMetrics(): PerformanceMetrics {
    return {
      lcp: 0,
      fid: 0,
      cls: 0,
      fcp: 0,
      ttfb: 0,
      conversionRate: 0,
      bounceRate: 0,
      averageSessionTime: 0,
      pageViews: 0,
      uniqueVisitors: 0,
      apiResponseTime: 0,
      buildTime: 0,
      errorRate: 0,
      memoryUsage: 0,
      cpuUsage: 0,
      july28Countdown: this.calculateJuly28Countdown(),
      campaignEngagement: 0,
      petitionSignatures: 0,
      communityGrowth: 0
    };
  }
  
  private getDefaultThresholds(): AlertThreshold[] {
    return [
      { metric: 'lcp', threshold: 2500, severity: 'warning', action: 'Optimize images and fonts' },
      { metric: 'fid', threshold: 100, severity: 'warning', action: 'Reduce JavaScript execution time' },
      { metric: 'cls', threshold: 0.1, severity: 'warning', action: 'Fix layout shifts' },
      { metric: 'apiResponseTime', threshold: 100, severity: 'critical', action: 'Scale API infrastructure' },
      { metric: 'errorRate', threshold: 0.01, severity: 'critical', action: 'Investigate errors immediately' },
      { metric: 'conversionRate', threshold: 0.02, severity: 'warning', action: 'A/B test CTA optimization' },
      { metric: 'july28Countdown', threshold: 7, severity: 'critical', action: 'MISSION CRITICAL: Final sprint mode' }
    ];
  }
  
  private startMonitoring(): void {
    // Core Web Vitals monitoring
    this.observeWebVitals();
    
    // Performance API monitoring
    this.observeNavigation();
    this.observeResources();
    
    // Custom metrics monitoring
    this.startCustomMetrics();
    
    // Real-time updates every 30 seconds
    setInterval(() => this.updateMetrics(), 30000);
  }
  
  private observeWebVitals(): void {
    // LCP Observer
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      this.checkAlert('lcp');
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.push(lcpObserver);
    
    // FID Observer
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-input') {
          const fidEntry = entry as any; // FID entries have custom properties
          this.metrics.fid = fidEntry.processingStart - entry.startTime;
          this.checkAlert('fid');
        }
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
    this.observers.push(fidObserver);
    
    // CLS Observer
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const clsEntry = entry as any; // Layout shift entries have custom properties
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
        }
      }
      this.metrics.cls = clsValue;
      this.checkAlert('cls');
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });
    this.observers.push(clsObserver);
  }
  
  private observeNavigation(): void {
    const navigationObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          this.metrics.fcp = navEntry.responseStart - navEntry.fetchStart;
          this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
        }
      });
    });
    navigationObserver.observe({ entryTypes: ['navigation'] });
    this.observers.push(navigationObserver);
  }
  
  private observeResources(): void {
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      let totalResponseTime = 0;
      let apiCallCount = 0;
      
      entries.forEach((entry) => {
        if (entry.name.includes('/api/')) {
          totalResponseTime += entry.duration;
          apiCallCount++;
        }
      });
      
      if (apiCallCount > 0) {
        this.metrics.apiResponseTime = totalResponseTime / apiCallCount;
        this.checkAlert('apiResponseTime');
      }
    });
    resourceObserver.observe({ entryTypes: ['resource'] });
    this.observers.push(resourceObserver);
  }
  
  private startCustomMetrics(): void {
    // Monitor memory usage if available
    if ('memory' in performance) {
      const memoryInfo = (performance as any).memory;
      this.metrics.memoryUsage = memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit;
    }
    
    // Track page views and user engagement
    this.trackUserEngagement();
  }
  
  private trackUserEngagement(): void {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.metrics.pageViews++;
      }
    });
    
    // Track user interactions
    let interactionCount = 0;
    ['click', 'scroll', 'keydown'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        interactionCount++;
        // Calculate engagement score based on interactions
        this.metrics.campaignEngagement = Math.min(interactionCount / 10, 1);
      });
    });
  }
  
  private updateMetrics(): void {
    // Update mission-critical countdown
    this.metrics.july28Countdown = this.calculateJuly28Countdown();
    this.checkAlert('july28Countdown');
    
    // Simulate petition signatures growth (replace with real API)
    this.metrics.petitionSignatures += Math.floor(Math.random() * 5);
    
    // Update community growth
    this.metrics.communityGrowth = this.calculateCommunityGrowth();
    
    // Broadcast updated metrics
    this.broadcastMetrics();
  }
  
  private calculateJuly28Countdown(): number {
    const july28 = new Date('2025-07-28');
    const now = new Date();
    const diffTime = july28.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  
  private calculateCommunityGrowth(): number {
    // Calculate based on page views, engagement, and time
    const baseGrowth = this.metrics.pageViews * 0.1;
    const engagementBonus = this.metrics.campaignEngagement * 50;
    return Math.floor(baseGrowth + engagementBonus);
  }
  
  private checkAlert(metric: keyof PerformanceMetrics): void {
    const threshold = this.alerts.find(alert => alert.metric === metric);
    if (!threshold) return;
    
    const value = this.metrics[metric];
    const isExceeded = metric === 'july28Countdown' ? value <= threshold.threshold : value >= threshold.threshold;
    
    if (isExceeded) {
      this.triggerAlert(threshold, value);
    }
  }
  
  private triggerAlert(threshold: AlertThreshold, value: number): void {
    const alert = {
      timestamp: new Date().toISOString(),
      metric: threshold.metric,
      value,
      threshold: threshold.threshold,
      severity: threshold.severity,
      action: threshold.action
    };
    
    // Log to console for development
    console.warn('🚨 Performance Alert:', alert);
    
    // Send to monitoring service (implement as needed)
    this.sendToMonitoringService(alert);
    
    // Show user notification for critical alerts
    if (threshold.severity === 'critical') {
      this.showCriticalAlert(alert);
    }
  }
  
  private sendToMonitoringService(alert: any): void {
    // Implementation for external monitoring service
    fetch('/api/monitoring/alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert)
    }).catch(console.error);
  }
  
  private showCriticalAlert(alert: any): void {
    // Show in-app notification for critical issues
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`Critical Alert: ${alert.metric}`, {
        body: alert.action,
        icon: '/favicon.ico'
      });
    }
  }
  
  private broadcastMetrics(): void {
    // Broadcast to dashboard components
    window.dispatchEvent(new CustomEvent('performance-metrics-updated', {
      detail: this.metrics
    }));
  }
  
  // Public API
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }
  
  public getChampionshipScore(): number {
    // Calculate overall performance score (0-100)
    const weights = {
      lcp: 0.25,      // 25% weight
      fid: 0.15,      // 15% weight
      cls: 0.15,      // 15% weight
      apiResponseTime: 0.20,  // 20% weight
      conversionRate: 0.25    // 25% weight
    };
    
    const scores = {
      lcp: Math.max(0, 100 - (this.metrics.lcp / 25)),
      fid: Math.max(0, 100 - this.metrics.fid),
      cls: Math.max(0, 100 - (this.metrics.cls * 1000)),
      apiResponseTime: Math.max(0, 100 - this.metrics.apiResponseTime),
      conversionRate: this.metrics.conversionRate * 5000  // Scale to 0-100
    };
    
    return Object.entries(weights).reduce((total, [metric, weight]) => {
      return total + (scores[metric as keyof typeof scores] * weight);
    }, 0);
  }
  
  public getMissionCriticalStatus(): 'green' | 'yellow' | 'red' {
    const daysLeft = this.metrics.july28Countdown;
    const championshipScore = this.getChampionshipScore();
    
    if (daysLeft <= 3 || championshipScore < 70) return 'red';
    if (daysLeft <= 7 || championshipScore < 85) return 'yellow';
    return 'green';
  }
  
  public destroy(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Global instance
export const performanceMonitor = new PerformanceMonitor(); 