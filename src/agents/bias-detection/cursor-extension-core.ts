/**
 * 🎯 BIASGUARD CURSOR EXTENSION CORE
 * Real-time AI bias detection and intervention system for Cursor IDE
 * 
 * Integrates with existing ARIAProtocol and AgentOrchestrator
 * Provides context-aware bias detection with visual feedback
 */

import { ARIAProtocol, ConversationAnalysis, PatternRisk } from '../core/aria-protocol';
import { AgentOrchestrator } from '../core/agent-orchestrator';

export interface BiasDetectionResult {
  hasBias: boolean;
  biasScore: number;
  detectedPatterns: BiasPattern[];
  interventions: BiasIntervention[];
  contextualFactors: ContextualFactor[];
}

export interface BiasPattern {
  type: BiasType;
  confidence: number;
  location: CodeLocation;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  suggestedFix: string;
}

export interface BiasIntervention {
  type: 'visual-alert' | 'suggestion' | 'learning-prompt' | 'team-notification';
  message: string;
  actionable: boolean;
  priority: number;
}

export interface ContextualFactor {
  factor: string;
  impact: number;
  description: string;
}

export interface CodeLocation {
  file: string;
  line: number;
  column: number;
  range: [number, number];
}

export type BiasType = 
  | 'confirmation-bias'
  | 'anchoring-bias' 
  | 'availability-heuristic'
  | 'premature-optimization'
  | 'pattern-blindness'
  | 'success-declaration'
  | 'terminal-worship'
  | 'context-amnesia';

/**
 * Core bias detection engine for Cursor IDE
 */
export class CursorBiasDetector {
  private aria: ARIAProtocol;
  private orchestrator: AgentOrchestrator;
  private conversationHistory: string[] = [];
  private codeContext: Map<string, string> = new Map();
  private userBehaviorPatterns: Map<string, number> = new Map();
  
  // Real-time monitoring state
  private isMonitoring: boolean = false;
  private detectionInterval?: NodeJS.Timeout;
  private lastDetectionResult?: BiasDetectionResult;

  constructor() {
    this.aria = new ARIAProtocol();
    this.orchestrator = new AgentOrchestrator();
    this.initializeMonitoring();
  }

  /**
   * Initialize real-time bias monitoring
   */
  private initializeMonitoring(): void {
    this.isMonitoring = true;
    this.detectionInterval = setInterval(() => {
      this.performPeriodicAnalysis();
    }, 5000); // Check every 5 seconds
  }

  /**
   * Analyze current context for bias patterns
   */
  async detectBias(context: {
    aiResponse?: string;
    userPrompt?: string;
    codeChanges?: string[];
    conversationHistory?: string[];
  }): Promise<BiasDetectionResult> {
    
    // Update conversation history
    if (context.conversationHistory) {
      this.conversationHistory = context.conversationHistory;
    }
    
    if (context.userPrompt) {
      this.conversationHistory.push(`USER: ${context.userPrompt}`);
    }
    
    if (context.aiResponse) {
      this.conversationHistory.push(`AI: ${context.aiResponse}`);
    }

    // Perform ARIA analysis
    const ariaAnalysis = this.aria.analyzeConversation(
      this.conversationHistory,
      context.aiResponse
    );

    // Detect specific bias patterns
    const detectedPatterns = await this.detectSpecificPatterns(context, ariaAnalysis);
    
    // Generate contextual factors
    const contextualFactors = this.analyzeContextualFactors(context);
    
    // Generate interventions
    const interventions = this.generateInterventions(detectedPatterns, ariaAnalysis);
    
    // Calculate overall bias score
    const biasScore = this.calculateBiasScore(detectedPatterns, ariaAnalysis);

    const result: BiasDetectionResult = {
      hasBias: detectedPatterns.length > 0 || ariaAnalysis.interventionRequired,
      biasScore,
      detectedPatterns,
      interventions,
      contextualFactors
    };

    this.lastDetectionResult = result;
    return result;
  }

  /**
   * Detect specific bias patterns in AI responses and user behavior
   */
  private async detectSpecificPatterns(
    context: any,
    ariaAnalysis: ConversationAnalysis
  ): Promise<BiasPattern[]> {
    const patterns: BiasPattern[] = [];

    // Success Declaration Bias (from our conversation analysis)
    if (this.detectSuccessDeclarationBias(context.aiResponse)) {
      patterns.push({
        type: 'success-declaration',
        confidence: 0.9,
        location: { file: 'ai-response', line: 0, column: 0, range: [0, 0] },
        description: 'AI declaring success without user confirmation',
        severity: 'high',
        suggestedFix: 'Wait for user verification before declaring success'
      });
    }

    // Terminal Worship Bias
    if (this.detectTerminalWorshipBias(context.aiResponse)) {
      patterns.push({
        type: 'terminal-worship',
        confidence: 0.8,
        location: { file: 'ai-response', line: 0, column: 0, range: [0, 0] },
        description: 'Over-reliance on terminal output as proof of success',
        severity: 'medium',
        suggestedFix: 'Verify actual user experience, not just terminal logs'
      });
    }

    // Pattern Blindness from ARIA
    ariaAnalysis.risks.forEach(risk => {
      if (risk.type === 'neural_howlround') {
        patterns.push({
          type: 'pattern-blindness',
          confidence: risk.confidence,
          location: { file: 'conversation', line: 0, column: 0, range: [0, 0] },
          description: risk.description,
          severity: risk.level as any,
          suggestedFix: risk.recommendation
        });
      }
    });

    return patterns;
  }

  /**
   * Detect success declaration bias pattern
   */
  private detectSuccessDeclarationBias(aiResponse?: string): boolean {
    if (!aiResponse) return false;
    
    const successPhrases = [
      'mission accomplished',
      'success',
      'resolved',
      'working',
      'fixed',
      'complete'
    ];
    
    const lowerResponse = aiResponse.toLowerCase();
    return successPhrases.some(phrase => lowerResponse.includes(phrase));
  }

  /**
   * Detect terminal worship bias pattern
   */
  private detectTerminalWorshipBias(aiResponse?: string): boolean {
    if (!aiResponse) return false;
    
    const terminalPhrases = [
      'terminal shows',
      'server logs',
      'compilation successful',
      'build passes',
      'curl response'
    ];
    
    const lowerResponse = aiResponse.toLowerCase();
    return terminalPhrases.some(phrase => lowerResponse.includes(phrase));
  }

  /**
   * Analyze contextual factors that influence bias
   */
  private analyzeContextualFactors(context: any): ContextualFactor[] {
    const factors: ContextualFactor[] = [];

    // Time pressure factor
    if (this.conversationHistory.length > 20) {
      factors.push({
        factor: 'conversation-length',
        impact: 0.7,
        description: 'Long conversation may increase pressure to declare success'
      });
    }

    // Repetition factor
    const repetitionScore = this.calculateRepetitionInConversation();
    if (repetitionScore > 0.5) {
      factors.push({
        factor: 'repetitive-patterns',
        impact: repetitionScore,
        description: 'Repetitive conversation patterns detected'
      });
    }

    return factors;
  }

  /**
   * Generate appropriate interventions based on detected patterns
   */
  private generateInterventions(
    patterns: BiasPattern[],
    ariaAnalysis: ConversationAnalysis
  ): BiasIntervention[] {
    const interventions: BiasIntervention[] = [];

    patterns.forEach(pattern => {
      switch (pattern.type) {
        case 'success-declaration':
          interventions.push({
            type: 'visual-alert',
            message: '⚠️ Consider waiting for user confirmation before declaring success',
            actionable: true,
            priority: 8
          });
          break;
          
        case 'terminal-worship':
          interventions.push({
            type: 'suggestion',
            message: '💡 Remember: Terminal logs ≠ User experience. Verify actual functionality.',
            actionable: true,
            priority: 6
          });
          break;
          
        case 'pattern-blindness':
          interventions.push({
            type: 'learning-prompt',
            message: '🔄 Pattern repetition detected. Consider alternative approaches.',
            actionable: true,
            priority: 7
          });
          break;
      }
    });

    return interventions.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Calculate overall bias score
   */
  private calculateBiasScore(
    patterns: BiasPattern[],
    ariaAnalysis: ConversationAnalysis
  ): number {
    if (patterns.length === 0) return 0;

    const patternScore = patterns.reduce((sum, pattern) => {
      const severityWeight = {
        'low': 0.25,
        'medium': 0.5,
        'high': 0.75,
        'critical': 1.0
      };
      return sum + (pattern.confidence * severityWeight[pattern.severity]);
    }, 0) / patterns.length;

    const ariaScore = ariaAnalysis.repetitionScore * 0.3 + 
                    (1 - ariaAnalysis.topicDiversity) * 0.3;

    return Math.min(1.0, (patternScore * 0.7) + (ariaScore * 0.3));
  }

  /**
   * Calculate repetition in conversation
   */
  private calculateRepetitionInConversation(): number {
    if (this.conversationHistory.length < 5) return 0;
    
    const recentMessages = this.conversationHistory.slice(-10);
    const uniqueMessages = new Set(recentMessages);
    
    return 1 - (uniqueMessages.size / recentMessages.length);
  }

  /**
   * Perform periodic analysis for real-time monitoring
   */
  private performPeriodicAnalysis(): void {
    if (this.conversationHistory.length === 0) return;
    
    // Analyze current state
    this.detectBias({
      conversationHistory: this.conversationHistory
    }).then(result => {
      if (result.hasBias && result.biasScore > 0.7) {
        this.triggerHighPriorityAlert(result);
      }
    });
  }

  /**
   * Trigger high priority alert for critical bias detection
   */
  private triggerHighPriorityAlert(result: BiasDetectionResult): void {
    const criticalPatterns = result.detectedPatterns.filter(p => p.severity === 'critical');
    
    if (criticalPatterns.length > 0) {
      // Integrate with existing monitoring system
      console.warn('🚨 CRITICAL BIAS DETECTED:', criticalPatterns);
      
      // Could integrate with existing alert systems here
      // this.orchestrator.triggerAlert('bias-detection', result);
    }
  }

  /**
   * Get current monitoring status
   */
  getMonitoringStatus(): {
    isActive: boolean;
    lastDetection?: BiasDetectionResult;
    conversationLength: number;
    overallRiskLevel: string;
  } {
    const riskLevel = this.lastDetectionResult?.biasScore || 0;
    
    return {
      isActive: this.isMonitoring,
      lastDetection: this.lastDetectionResult,
      conversationLength: this.conversationHistory.length,
      overallRiskLevel: riskLevel > 0.7 ? 'high' : riskLevel > 0.4 ? 'medium' : 'low'
    };
  }

  /**
   * Stop monitoring and cleanup
   */
  dispose(): void {
    this.isMonitoring = false;
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
    }
  }
}

export default CursorBiasDetector; 