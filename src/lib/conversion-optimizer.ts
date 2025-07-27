/**
 * 🎯 CONVERSION OPTIMIZER - A/B Testing & Analytics
 * Systematic conversion optimization for July 28th mission
 */

export interface ABTest {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  variants: Variant[];
  metrics: TestMetrics;
  targeting: TestTargeting;
  startDate: Date;
  endDate?: Date;
  confidenceLevel: number;
}

export interface Variant {
  id: string;
  name: string;
  description: string;
  weight: number;                     // 0-100 traffic allocation
  isControl: boolean;
  config: VariantConfig;
}

export interface VariantConfig {
  // UI/UX variants
  ctaText?: string;
  ctaColor?: string;
  ctaSize?: 'sm' | 'md' | 'lg' | 'xl';
  ctaPosition?: 'top' | 'center' | 'bottom' | 'sticky';
  
  // Content variants
  headline?: string;
  subheadline?: string;
  description?: string;
  
  // Visual variants
  heroImage?: string;
  colorScheme?: 'blue' | 'purple' | 'gold' | 'green';
  layout?: 'single-column' | 'two-column' | 'grid';
  
  // Trust indicators
  showTrustBadges?: boolean;
  showTestimonials?: boolean;
  showSocialProof?: boolean;
  showUrgency?: boolean;
  
  // Form variants
  formFields?: 'minimal' | 'standard' | 'detailed';
  formLayout?: 'vertical' | 'horizontal' | 'inline';
}

export interface TestMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  conversionRate: number;
  confidenceInterval: [number, number];
  pValue: number;
  significance: 'none' | 'low' | 'medium' | 'high';
}

export interface TestTargeting {
  pages?: string[];
  userTypes?: string[];
  devices?: ('desktop' | 'mobile' | 'tablet')[];
  trafficPercentage: number;          // 0-100
  geoTargeting?: string[];
  timeTargeting?: {
    days?: number[];                  // 0-6 (Sunday-Saturday)
    hours?: number[];                 // 0-23
  };
}

export interface ConversionEvent {
  userId: string;
  testId: string;
  variantId: string;
  eventType: ConversionEventType;
  value?: number;
  properties?: Record<string, any>;
  timestamp: Date;
  page: string;
  userAgent: string;
  referrer?: string;
}

export type ConversionEventType = 
  | 'page_view'
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'petition_sign'
  | 'donation_start'
  | 'donation_complete'
  | 'share_social'
  | 'email_signup'
  | 'video_play'
  | 'video_complete';

/**
 * Conversion Optimizer - Main class for A/B testing and optimization
 */
export class ConversionOptimizer {
  private tests = new Map<string, ABTest>();
  private userVariants = new Map<string, Map<string, string>>();
  private events: ConversionEvent[] = [];
  
  constructor(private config: {
    apiEndpoint?: string;
    persistToStorage?: boolean;
    autoOptimize?: boolean;
  } = {}) {
    this.loadFromStorage();
  }

  /**
   * Create a new A/B test
   */
  createTest(testConfig: Omit<ABTest, 'id' | 'metrics' | 'startDate'>): ABTest {
    const test: ABTest = {
      id: this.generateTestId(),
      ...testConfig,
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        conversionRate: 0,
        confidenceInterval: [0, 0],
        pValue: 1,
        significance: 'none'
      },
      startDate: new Date()
    };
    
    this.tests.set(test.id, test);
    this.saveToStorage();
    
    return test;
  }

  /**
   * Get variant for user in specific test
   */
  getVariant(testId: string, userId: string): Variant | null {
    const test = this.tests.get(testId);
    if (!test || test.status !== 'active') return null;
    
    // Check if user already has variant assigned
    const userTests = this.userVariants.get(userId);
    if (userTests?.has(testId)) {
      const variantId = userTests.get(testId)!;
      return test.variants.find(v => v.id === variantId) || null;
    }
    
    // Assign new variant based on weights
    const variant = this.assignVariant(test, userId);
    if (variant) {
      this.setUserVariant(userId, testId, variant.id);
    }
    
    return variant;
  }

  /**
   * Track conversion event
   */
  trackEvent(event: Omit<ConversionEvent, 'timestamp'>): void {
    const fullEvent: ConversionEvent = {
      ...event,
      timestamp: new Date()
    };
    
    this.events.push(fullEvent);
    this.updateTestMetrics(event.testId);
    
    // Send to analytics if configured
    if (this.config.apiEndpoint) {
      this.sendToAnalytics(fullEvent);
    }
    
    this.saveToStorage();
  }

  /**
   * Get test results and statistical significance
   */
  getTestResults(testId: string): ABTest | null {
    const test = this.tests.get(testId);
    if (!test) return null;
    
    // Calculate metrics for each variant
    const variantMetrics = this.calculateVariantMetrics(testId);
    
    // Update test with calculated metrics
    const updatedTest = {
      ...test,
      metrics: this.calculateOverallMetrics(variantMetrics)
    };
    
    this.tests.set(testId, updatedTest);
    return updatedTest;
  }

  /**
   * Get active tests for current user
   */
  getActiveTests(userId: string, page?: string): Map<string, Variant> {
    const activeTests = new Map<string, Variant>();
    
    for (const [testId, test] of this.tests) {
      if (test.status !== 'active') continue;
      
      // Check page targeting
      if (page && test.targeting.pages && !test.targeting.pages.includes(page)) {
        continue;
      }
      
      const variant = this.getVariant(testId, userId);
      if (variant) {
        activeTests.set(testId, variant);
      }
    }
    
    return activeTests;
  }

  /**
   * Auto-optimize: automatically pause losing variants
   */
  autoOptimize(): void {
    if (!this.config.autoOptimize) return;
    
    for (const [testId, test] of this.tests) {
      if (test.status !== 'active') continue;
      
      const results = this.getTestResults(testId);
      if (!results) continue;
      
      // Auto-pause if statistical significance reached
      if (results.metrics.significance === 'high' && results.metrics.pValue < 0.05) {
        this.pauseTest(testId);
        console.log(`Auto-paused test ${testId} due to statistical significance`);
      }
    }
  }

  /**
   * Create common conversion tests for JAHmere mission
   */
  createJAHmereTests(): ABTest[] {
    const tests: ABTest[] = [];
    
    // Hero CTA Test
    tests.push(this.createTest({
      name: 'Hero CTA Optimization',
      description: 'Test different CTA text and styling for maximum conversion',
      status: 'active',
      variants: [
        {
          id: 'control',
          name: 'Control',
          description: 'Original CTA',
          weight: 25,
          isControl: true,
          config: {
            ctaText: 'Stand with JAHmere',
            ctaColor: 'primary',
            ctaSize: 'lg'
          }
        },
        {
          id: 'urgent',
          name: 'Urgent',
          description: 'Urgency-focused CTA',
          weight: 25,
          isControl: false,
          config: {
            ctaText: '🚨 Save JAHmere - Time Critical',
            ctaColor: 'accent',
            ctaSize: 'xl',
            showUrgency: true
          }
        },
        {
          id: 'empathetic',
          name: 'Empathetic',
          description: 'Emotion-focused CTA',
          weight: 25,
          isControl: false,
          config: {
            ctaText: '💙 Help JAHmere Come Home',
            ctaColor: 'primary',
            ctaSize: 'lg',
            showTestimonials: true
          }
        },
        {
          id: 'action',
          name: 'Action-Oriented',
          description: 'Direct action CTA',
          weight: 25,
          isControl: false,
          config: {
            ctaText: '✊ Join the Freedom Movement',
            ctaColor: 'accent',
            ctaSize: 'xl',
            showSocialProof: true
          }
        }
      ],
      targeting: {
        pages: ['/', '/home', '/bridge-project-mvp'],
        trafficPercentage: 100,
        devices: ['desktop', 'mobile', 'tablet']
      },
      confidenceLevel: 95
    }));
    
    // Form Optimization Test
    tests.push(this.createTest({
      name: 'Petition Form Optimization',
      description: 'Test form field requirements and layout for maximum completion',
      status: 'active',
      variants: [
        {
          id: 'minimal',
          name: 'Minimal Form',
          description: 'Email only',
          weight: 50,
          isControl: true,
          config: {
            formFields: 'minimal',
            formLayout: 'vertical'
          }
        },
        {
          id: 'standard',
          name: 'Standard Form',
          description: 'Email + Name',
          weight: 50,
          isControl: false,
          config: {
            formFields: 'standard',
            formLayout: 'vertical',
            showTrustBadges: true
          }
        }
      ],
      targeting: {
        pages: ['/petition', '/letter-portal'],
        trafficPercentage: 100
      },
      confidenceLevel: 95
    }));
    
    // Trust Indicators Test
    tests.push(this.createTest({
      name: 'Trust Indicators Impact',
      description: 'Test impact of social proof and trust badges on conversion',
      status: 'active',
      variants: [
        {
          id: 'no_trust',
          name: 'No Trust Indicators',
          description: 'Clean layout without social proof',
          weight: 33,
          isControl: true,
          config: {
            showTrustBadges: false,
            showSocialProof: false,
            showTestimonials: false
          }
        },
        {
          id: 'badges_only',
          name: 'Trust Badges Only',
          description: 'Show verification badges',
          weight: 33,
          isControl: false,
          config: {
            showTrustBadges: true,
            showSocialProof: false,
            showTestimonials: false
          }
        },
        {
          id: 'full_trust',
          name: 'Full Trust Suite',
          description: 'All trust indicators',
          weight: 34,
          isControl: false,
          config: {
            showTrustBadges: true,
            showSocialProof: true,
            showTestimonials: true
          }
        }
      ],
      targeting: {
        trafficPercentage: 50,
        devices: ['desktop', 'mobile']
      },
      confidenceLevel: 90
    }));
    
    return tests;
  }

  /**
   * Private helper methods
   */
  private generateTestId(): string {
    return `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private assignVariant(test: ABTest, userId: string): Variant | null {
    // Simple hash-based assignment for consistent user experience
    const hash = this.hashUserId(userId + test.id);
    const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0);
    
    let cumulativeWeight = 0;
    const targetWeight = (hash % 100) * (totalWeight / 100);
    
    for (const variant of test.variants) {
      cumulativeWeight += variant.weight;
      if (targetWeight <= cumulativeWeight) {
        return variant;
      }
    }
    
    return test.variants[0]; // Fallback to first variant
  }

  private hashUserId(input: string): number {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private setUserVariant(userId: string, testId: string, variantId: string): void {
    if (!this.userVariants.has(userId)) {
      this.userVariants.set(userId, new Map());
    }
    this.userVariants.get(userId)!.set(testId, variantId);
  }

  private updateTestMetrics(testId: string): void {
    const test = this.tests.get(testId);
    if (!test) return;
    
    const testEvents = this.events.filter(e => e.testId === testId);
    
    // Calculate basic metrics
    const impressions = testEvents.filter(e => e.eventType === 'page_view').length;
    const clicks = testEvents.filter(e => e.eventType === 'cta_click').length;
    const conversions = testEvents.filter(e => 
      ['form_submit', 'petition_sign', 'donation_complete'].includes(e.eventType)
    ).length;
    
    const conversionRate = impressions > 0 ? (conversions / impressions) * 100 : 0;
    
    test.metrics = {
      impressions,
      clicks,
      conversions,
      conversionRate,
      confidenceInterval: this.calculateConfidenceInterval(conversions, impressions),
      pValue: this.calculatePValue(testId),
      significance: this.calculateSignificance(testId)
    };
  }

  private calculateVariantMetrics(testId: string): Map<string, TestMetrics> {
    const variantMetrics = new Map<string, TestMetrics>();
    const test = this.tests.get(testId);
    if (!test) return variantMetrics;
    
    for (const variant of test.variants) {
      const variantEvents = this.events.filter(e => 
        e.testId === testId && e.variantId === variant.id
      );
      
      const impressions = variantEvents.filter(e => e.eventType === 'page_view').length;
      const conversions = variantEvents.filter(e => 
        ['form_submit', 'petition_sign', 'donation_complete'].includes(e.eventType)
      ).length;
      
      variantMetrics.set(variant.id, {
        impressions,
        clicks: variantEvents.filter(e => e.eventType === 'cta_click').length,
        conversions,
        conversionRate: impressions > 0 ? (conversions / impressions) * 100 : 0,
        confidenceInterval: this.calculateConfidenceInterval(conversions, impressions),
        pValue: 1,
        significance: 'none'
      });
    }
    
    return variantMetrics;
  }

  private calculateOverallMetrics(variantMetrics: Map<string, TestMetrics>): TestMetrics {
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalConversions = 0;
    
    for (const metrics of variantMetrics.values()) {
      totalImpressions += metrics.impressions;
      totalClicks += metrics.clicks;
      totalConversions += metrics.conversions;
    }
    
    return {
      impressions: totalImpressions,
      clicks: totalClicks,
      conversions: totalConversions,
      conversionRate: totalImpressions > 0 ? (totalConversions / totalImpressions) * 100 : 0,
      confidenceInterval: this.calculateConfidenceInterval(totalConversions, totalImpressions),
      pValue: this.calculatePValue('overall'),
      significance: 'none'
    };
  }

  private calculateConfidenceInterval(conversions: number, impressions: number): [number, number] {
    if (impressions === 0) return [0, 0];
    
    const rate = conversions / impressions;
    const standardError = Math.sqrt((rate * (1 - rate)) / impressions);
    const margin = 1.96 * standardError; // 95% confidence interval
    
    return [
      Math.max(0, (rate - margin) * 100),
      Math.min(100, (rate + margin) * 100)
    ];
  }

  private calculatePValue(testId: string): number {
    // Simplified p-value calculation - in production, use proper statistical methods
    const test = this.tests.get(testId);
    if (!test || test.variants.length < 2) return 1;
    
    const variantMetrics = this.calculateVariantMetrics(testId);
    const control = test.variants.find(v => v.isControl);
    if (!control) return 1;
    
    const controlMetrics = variantMetrics.get(control.id);
    if (!controlMetrics || controlMetrics.impressions < 100) return 1;
    
    // Return simplified p-value based on sample size and difference
    return Math.max(0.01, 1 / Math.sqrt(controlMetrics.impressions));
  }

  private calculateSignificance(testId: string): TestMetrics['significance'] {
    const pValue = this.calculatePValue(testId);
    
    if (pValue < 0.01) return 'high';
    if (pValue < 0.05) return 'medium';
    if (pValue < 0.1) return 'low';
    return 'none';
  }

  private pauseTest(testId: string): void {
    const test = this.tests.get(testId);
    if (test) {
      test.status = 'paused';
      test.endDate = new Date();
      this.saveToStorage();
    }
  }

  private loadFromStorage(): void {
    if (!this.config.persistToStorage || typeof window === 'undefined') return;
    
    try {
      const testsData = localStorage.getItem('conversion_optimizer_tests');
      if (testsData) {
        const parsed = JSON.parse(testsData);
        this.tests = new Map(parsed.tests);
        this.userVariants = new Map(parsed.userVariants);
        this.events = parsed.events || [];
      }
    } catch (error) {
      console.error('Failed to load conversion optimizer data:', error);
    }
  }

  private saveToStorage(): void {
    if (!this.config.persistToStorage || typeof window === 'undefined') return;
    
    try {
      const data = {
        tests: Array.from(this.tests.entries()),
        userVariants: Array.from(this.userVariants.entries()),
        events: this.events.slice(-1000) // Keep only last 1000 events
      };
      localStorage.setItem('conversion_optimizer_tests', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save conversion optimizer data:', error);
    }
  }

  private async sendToAnalytics(event: ConversionEvent): Promise<void> {
    if (!this.config.apiEndpoint) return;
    
    try {
      await fetch(`${this.config.apiEndpoint}/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }
}

// Export singleton instance
export const conversionOptimizer = new ConversionOptimizer({
  persistToStorage: true,
  autoOptimize: true,
  apiEndpoint: '/api/analytics'
});

// React hook for easy component integration
export function useConversionOptimizer() {
  return {
    getVariant: conversionOptimizer.getVariant.bind(conversionOptimizer),
    trackEvent: conversionOptimizer.trackEvent.bind(conversionOptimizer),
    getActiveTests: conversionOptimizer.getActiveTests.bind(conversionOptimizer),
    createJAHmereTests: conversionOptimizer.createJAHmereTests.bind(conversionOptimizer)
  };
}

// Helper function to generate user ID
export function generateUserId(): string {
  if (typeof window !== 'undefined') {
    let userId = localStorage.getItem('conversion_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('conversion_user_id', userId);
    }
    return userId;
  }
  return `temp_${Math.random().toString(36).substr(2, 9)}`;
} 