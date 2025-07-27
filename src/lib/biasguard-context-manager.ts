/**
 * 🎯 BIASGUARD CONTEXT MANAGER
 * Unified conversation history and context synchronization
 * Eliminates fragmentation across components
 */

import { UnifiedBiasGuard, UnifiedBiasResult } from '@/agents/bias-detection/unified-biasguard';

export interface ContextSnapshot {
  conversationHistory: string[];
  currentSession: string;
  lastAnalysis?: UnifiedBiasResult;
  sessionStartTime: number;
  analysisCount: number;
}

export interface BiasGuardContextState {
  isActive: boolean;
  currentSession: string;
  conversationHistory: string[];
  lastAnalysis?: UnifiedBiasResult;
  sessionMetrics: {
    totalAnalyses: number;
    averageBiasScore: number;
    commonPatterns: string[];
    sessionDuration: number;
  };
}

export class BiasGuardContextManager {
  private static instance: BiasGuardContextManager;
  private biasGuard: UnifiedBiasGuard;
  private state: BiasGuardContextState;
  private listeners: Set<(state: BiasGuardContextState) => void> = new Set();
  private sessionHistory: ContextSnapshot[] = [];

  private constructor() {
    this.biasGuard = new UnifiedBiasGuard();
    this.state = this.initializeState();
  }

  static getInstance(): BiasGuardContextManager {
    if (!BiasGuardContextManager.instance) {
      BiasGuardContextManager.instance = new BiasGuardContextManager();
    }
    return BiasGuardContextManager.instance;
  }

  /**
   * 🎯 UNIFIED ANALYSIS INTERFACE
   * Single entry point for all bias analysis
   */
  async analyzeWithContext(context: {
    aiResponse?: string;
    userPrompt?: string;
    codeChanges?: string[];
    errorLogs?: string[];
    source?: 'extension' | 'web' | 'api' | 'agent';
  }): Promise<UnifiedBiasResult> {
    
    // Update conversation history
    if (context.userPrompt) {
      this.addToHistory('USER', context.userPrompt);
    }
    if (context.aiResponse) {
      this.addToHistory('AI', context.aiResponse);
    }

    // Perform analysis with full context
    const result = await this.biasGuard.analyze({
      aiResponse: context.aiResponse,
      userPrompt: context.userPrompt,
      conversationHistory: this.state.conversationHistory,
      codeChanges: context.codeChanges,
      errorLogs: context.errorLogs
    });

    // Update state
    this.updateStateWithAnalysis(result, context.source);
    
    // Notify listeners
    this.notifyListeners();

    return result;
  }

  /**
   * 📝 CONVERSATION HISTORY MANAGEMENT
   */
  private addToHistory(role: 'USER' | 'AI', message: string) {
    const entry = `${role}: ${message}`;
    this.state.conversationHistory.push(entry);
    
    // Keep history manageable (last 50 entries)
    if (this.state.conversationHistory.length > 50) {
      this.state.conversationHistory = this.state.conversationHistory.slice(-50);
    }
  }

  /**
   * 📊 STATE MANAGEMENT
   */
  private updateStateWithAnalysis(result: UnifiedBiasResult, source?: string) {
    this.state.lastAnalysis = result;
    this.state.sessionMetrics.totalAnalyses++;
    
    // Update average bias score
    const currentAvg = this.state.sessionMetrics.averageBiasScore;
    const totalAnalyses = this.state.sessionMetrics.totalAnalyses;
    this.state.sessionMetrics.averageBiasScore = 
      (currentAvg * (totalAnalyses - 1) + result.biasScore) / totalAnalyses;
    
    // Update common patterns
    result.patterns.forEach(pattern => {
      if (!this.state.sessionMetrics.commonPatterns.includes(pattern.type)) {
        this.state.sessionMetrics.commonPatterns.push(pattern.type);
      }
    });
    
    // Update session duration
    this.state.sessionMetrics.sessionDuration = 
      Date.now() - parseInt(this.state.currentSession);
  }

  /**
   * 🔄 SESSION MANAGEMENT
   */
  startNewSession(): string {
    // Save current session to history
    if (this.state.conversationHistory.length > 0) {
      this.sessionHistory.push({
        conversationHistory: [...this.state.conversationHistory],
        currentSession: this.state.currentSession,
        lastAnalysis: this.state.lastAnalysis,
        sessionStartTime: parseInt(this.state.currentSession),
        analysisCount: this.state.sessionMetrics.totalAnalyses
      });
    }

    // Reset state for new session
    this.state = this.initializeState();
    this.notifyListeners();
    
    return this.state.currentSession;
  }

  /**
   * 📈 CONTEXT INSIGHTS
   */
  getContextInsights() {
    const recentAnalyses = this.sessionHistory
      .slice(-5)
      .map(s => s.lastAnalysis)
      .filter(Boolean);

    const avgBiasScore = recentAnalyses.length > 0 
      ? recentAnalyses.reduce((sum, a) => sum + a!.biasScore, 0) / recentAnalyses.length
      : 0;

    const mostCommonPatterns = this.getMostCommonPatterns();
    const trendDirection = this.getBiasTrend();

    return {
      currentSession: {
        duration: this.state.sessionMetrics.sessionDuration,
        analyses: this.state.sessionMetrics.totalAnalyses,
        averageBias: this.state.sessionMetrics.averageBiasScore,
        patterns: this.state.sessionMetrics.commonPatterns
      },
      historical: {
        totalSessions: this.sessionHistory.length,
        recentAverageBias: avgBiasScore,
        mostCommonPatterns,
        trendDirection
      },
      recommendations: this.generateContextRecommendations()
    };
  }

  /**
   * 🎯 FORMATTED OUTPUT FOR UI
   */
  getFormattedAnalysis(): string {
    return this.biasGuard.getFormattedResult();
  }

  /**
   * 👂 EVENT LISTENERS
   */
  subscribe(listener: (state: BiasGuardContextState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  /**
   * 📊 ANALYTICS HELPERS
   */
  private getMostCommonPatterns(): string[] {
    const patternCounts = new Map<string, number>();
    
    this.sessionHistory.forEach(session => {
      session.lastAnalysis?.patterns.forEach(pattern => {
        const count = patternCounts.get(pattern.type) || 0;
        patternCounts.set(pattern.type, count + 1);
      });
    });

    return Array.from(patternCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([pattern]) => pattern);
  }

  private getBiasTrend(): 'improving' | 'stable' | 'declining' {
    if (this.sessionHistory.length < 3) return 'stable';
    
    const recent = this.sessionHistory.slice(-3);
    const scores = recent.map(s => s.lastAnalysis?.biasScore || 0);
    
    const trend = scores[2] - scores[0];
    
    if (trend < -0.1) return 'improving';
    if (trend > 0.1) return 'declining';
    return 'stable';
  }

  private generateContextRecommendations(): string[] {
    const recommendations: string[] = [];
    
    // Use direct state access instead of calling getContextInsights()
    if (this.state.sessionMetrics.averageBiasScore > 0.6) {
      recommendations.push('High bias detected - consider shorter, more focused responses');
    }
    
    if (this.state.sessionMetrics.commonPatterns.includes('pattern-blindness')) {
      recommendations.push('Pattern blindness detected - try alternative approaches');
    }
    
    if (this.state.sessionMetrics.sessionDuration > 30 * 60 * 1000) { // 30 minutes
      recommendations.push('Long session - consider taking a break to reset context');
    }
    
    const trendDirection = this.getBiasTrend();
    if (trendDirection === 'declining') {
      recommendations.push('Bias trend declining - review recent changes in approach');
    }
    
    return recommendations;
  }

  /**
   * 🔧 UTILITY METHODS
   */
  private initializeState(): BiasGuardContextState {
    return {
      isActive: true,
      currentSession: Date.now().toString(),
      conversationHistory: [],
      sessionMetrics: {
        totalAnalyses: 0,
        averageBiasScore: 0,
        commonPatterns: [],
        sessionDuration: 0
      }
    };
  }

  getState(): BiasGuardContextState {
    return { ...this.state };
  }

  getConversationHistory(): string[] {
    return [...this.state.conversationHistory];
  }

  clearHistory(): void {
    this.state.conversationHistory = [];
    this.notifyListeners();
  }

  /**
   * 🧹 CLEANUP
   */
  dispose(): void {
    this.biasGuard.dispose();
    this.listeners.clear();
    this.sessionHistory = [];
  }
} 