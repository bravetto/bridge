/**
 * 🎯 BIASGUARD INTEGRATION ADAPTER
 * Simplified integration layer using unified system
 * Maintains compatibility while eliminating complexity
 */

import { BiasGuardContextManager } from '@/lib/biasguard-context-manager';
import { UnifiedBiasResult } from './unified-biasguard';

export interface LegacyBiasDetectionResult {
  hasBias: boolean;
  biasScore: number;
  detectedPatterns: Array<{
    type: string;
    confidence: number;
    severity: string;
    description: string;
    suggestedFix: string;
  }>;
  interventions: Array<{
    type: string;
    message: string;
    priority: string;
  }>;
  contextualFactors: Array<{
    factor: string;
    impact: number;
    description: string;
  }>;
}

export interface ComprehensiveBiasAnalysis {
  basicDetection: LegacyBiasDetectionResult;
  enhancedDetection: {
    overallRisk: number;
    detectedPatterns: any[];
    recommendedActions: string[];
    systemHealth: {
      aiReliability: number;
      technicalStability: number;
      solutionEffectiveness: number;
    };
  };
  unifiedRecommendations: Array<{
    priority: string;
    category: string;
    title: string;
    description: string;
    immediateAction: string;
    strategicAction: string;
    preventiveAction: string;
    estimatedImpact: number;
  }>;
  systemStatus: {
    overallHealth: number;
    criticalAlerts: string[];
    immediateActions: string[];
    preventiveActions: string[];
  };
}

export class BiasGuardIntegration {
  private contextManager: BiasGuardContextManager;

  constructor() {
    this.contextManager = BiasGuardContextManager.getInstance();
  }

  /**
   * 🎯 SIMPLIFIED COMPREHENSIVE ANALYSIS
   * Uses unified system under the hood
   */
  async performComprehensiveAnalysis(context: {
    aiResponse?: string;
    userPrompt?: string;
    conversationHistory: string[];
    codeChanges?: string[];
    errorLogs?: string[];
    frameworkVersions?: Record<string, string>;
    solutionAttempts?: string[];
    problemEvolution?: string[];
  }): Promise<ComprehensiveBiasAnalysis> {

    // Use unified analysis
    const result = await this.contextManager.analyzeWithContext({
      aiResponse: context.aiResponse,
      userPrompt: context.userPrompt,
      codeChanges: context.codeChanges,
      errorLogs: context.errorLogs,
      source: 'agent'
    });

    // Convert to legacy format for compatibility
    return this.convertToLegacyFormat(result);
  }

  /**
   * 🔄 CONVERT UNIFIED RESULT TO LEGACY FORMAT
   * Maintains backward compatibility
   */
  private convertToLegacyFormat(result: UnifiedBiasResult): ComprehensiveBiasAnalysis {
    // Convert patterns to legacy format
    const legacyPatterns = result.patterns.map(pattern => ({
      type: pattern.type,
      confidence: pattern.confidence,
      severity: pattern.severity,
      description: pattern.description,
      suggestedFix: pattern.intervention
    }));

    // Convert to legacy interventions
    const interventions = result.immediateActions.map(action => ({
      type: 'immediate',
      message: action,
      priority: 'high'
    }));

    // Create contextual factors
    const contextualFactors = [
      {
        factor: 'conversation-length',
        impact: Math.min(result.biasScore, 0.8),
        description: `Bias score: ${Math.round(result.biasScore * 100)}%`
      },
      {
        factor: 'pattern-count',
        impact: Math.min(result.patterns.length * 0.2, 1.0),
        description: `${result.patterns.length} bias patterns detected`
      }
    ];

    // Create legacy detection result
    const basicDetection: LegacyBiasDetectionResult = {
      hasBias: result.hasBias,
      biasScore: result.biasScore,
      detectedPatterns: legacyPatterns,
      interventions,
      contextualFactors
    };

    // Create enhanced detection result
    const enhancedDetection = {
      overallRisk: result.biasScore,
      detectedPatterns: result.patterns,
      recommendedActions: result.immediateActions,
      systemHealth: {
        aiReliability: result.health.aiReliability,
        technicalStability: result.health.conversationFlow,
        solutionEffectiveness: result.health.solutionEffectiveness
      }
    };

    // Create unified recommendations
    const unifiedRecommendations = result.patterns.map(pattern => ({
      priority: pattern.severity,
      category: this.getCategoryForPattern(pattern.type),
      title: this.formatPatternTitle(pattern.type),
      description: pattern.description,
      immediateAction: pattern.intervention,
      strategicAction: this.getStrategicAction(pattern.type),
      preventiveAction: this.getPreventiveAction(pattern.type),
      estimatedImpact: pattern.confidence
    }));

    // Create system status
    const systemStatus = {
      overallHealth: (result.health.aiReliability + result.health.conversationFlow + result.health.solutionEffectiveness) / 3,
      criticalAlerts: result.patterns
        .filter(p => p.severity === 'critical')
        .map(p => `🚨 ${p.description}`),
      immediateActions: result.immediateActions,
      preventiveActions: result.preventiveActions
    };

    return {
      basicDetection,
      enhancedDetection,
      unifiedRecommendations,
      systemStatus
    };
  }

  /**
   * 🛡️ REAL-TIME MONITORING (SIMPLIFIED)
   */
  async startRealTimeMonitoring(callback: (analysis: ComprehensiveBiasAnalysis) => void) {
    console.log('🛡️ BiasGuard Real-Time Monitoring Started (Unified System)');
    
    // Subscribe to context manager updates
    const unsubscribe = this.contextManager.subscribe(async (state) => {
      if (state.lastAnalysis) {
        const legacyFormat = this.convertToLegacyFormat(state.lastAnalysis);
        callback(legacyFormat);
      }
    });
    
    return {
      stop: () => {
        console.log('🛡️ BiasGuard Real-Time Monitoring Stopped');
        unsubscribe();
      }
    };
  }

  /**
   * 📈 GET ANALYSIS TRENDS (SIMPLIFIED)
   */
  getAnalysisTrends() {
    const insights = this.contextManager.getContextInsights();
    
    return {
      trend: insights.historical.trendDirection,
      healthTrend: insights.currentSession.averageBias,
      recentAvgHealth: 1 - insights.currentSession.averageBias,
      commonPatterns: insights.historical.mostCommonPatterns,
      recommendations: insights.recommendations
    };
  }

  /**
   * 🔧 HELPER METHODS
   */
  private getCategoryForPattern(type: string): string {
    const categoryMap: Record<string, string> = {
      'success-declaration': 'ai-behavior',
      'terminal-worship': 'ai-behavior',
      'pattern-blindness': 'solution-strategy',
      'planning-fallacy': 'solution-strategy',
      'feature-creep': 'technical-architecture',
      'authority-bias': 'ai-behavior'
    };
    return categoryMap[type] || 'ai-behavior';
  }

  private formatPatternTitle(type: string): string {
    return type
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private getStrategicAction(type: string): string {
    const strategicMap: Record<string, string> = {
      'success-declaration': 'Implement success validation protocols',
      'terminal-worship': 'Establish user experience verification standards',
      'pattern-blindness': 'Create alternative approach exploration framework',
      'planning-fallacy': 'Focus on iterative development cycles',
      'feature-creep': 'Implement minimal viable solution methodology',
      'authority-bias': 'Establish collaborative communication guidelines'
    };
    return strategicMap[type] || 'Implement systematic bias prevention';
  }

  private getPreventiveAction(type: string): string {
    const preventiveMap: Record<string, string> = {
      'success-declaration': 'Always ask for user confirmation before declaring success',
      'terminal-worship': 'Include user experience validation in all solutions',
      'pattern-blindness': 'Regularly challenge current approach with alternatives',
      'planning-fallacy': 'Focus on immediate next steps, avoid long-term planning',
      'feature-creep': 'Start with minimal viable solution, iterate',
      'authority-bias': 'Use collaborative language, avoid mandates'
    };
    return preventiveMap[type] || 'Monitor for this pattern in future interactions';
  }

  /**
   * 🧹 CLEANUP
   */
  dispose() {
    // Context manager handles its own cleanup
    console.log('🧹 BiasGuard Integration disposed');
  }
} 