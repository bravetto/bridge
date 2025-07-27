/**
 * 🧠 PATTERN BLINDNESS DETECTOR
 * Pragmatic detection and prevention of AI failure modes
 */

import { ARIAProtocol, ConversationAnalysis, InterventionAction, PatternRisk } from './aria-protocol';

export type { ConversationAnalysis, InterventionAction };

export class PatternBlindnessDetector {
  private aria: ARIAProtocol;
  private conversationHistory: string[] = [];
  private lastAnalysis?: ConversationAnalysis;

  constructor() {
    this.aria = new ARIAProtocol();
  }

  /**
   * Add a conversation message for analysis
   */
  addMessage(message: string): void {
    this.conversationHistory.push(message);
    
    // Keep history manageable (last 50 messages)
    if (this.conversationHistory.length > 50) {
      this.conversationHistory = this.conversationHistory.slice(-30);
    }
  }

  /**
   * Analyze current conversation for pattern risks
   */
  analyzeConversation(currentSolution?: string): ConversationAnalysis {
    this.lastAnalysis = this.aria.analyzeConversation(
      this.conversationHistory,
      currentSolution
    );
    return this.lastAnalysis;
  }

  /**
   * Check if intervention is needed
   */
  requiresIntervention(): boolean {
    if (!this.lastAnalysis) {
      this.analyzeConversation();
    }
    return this.lastAnalysis?.interventionRequired || false;
  }

  /**
   * Get intervention recommendations
   */
  getInterventions(): InterventionAction[] {
    if (!this.lastAnalysis) {
      this.analyzeConversation();
    }
    return this.aria.generateInterventions(this.lastAnalysis!);
  }

  /**
   * Get current risk assessment
   */
  getCurrentRisks(): PatternRisk[] {
    if (!this.lastAnalysis) {
      this.analyzeConversation();
    }
    return this.lastAnalysis?.risks || [];
  }

  /**
   * Reset conversation history (useful for context resets)
   */
  resetContext(): void {
    this.conversationHistory = [];
    this.lastAnalysis = undefined;
  }

  /**
   * Get conversation statistics
   */
  getStats(): {
    messageCount: number;
    repetitionScore: number;
    topicDiversity: number;
    riskLevel: string;
  } {
    if (!this.lastAnalysis) {
      this.analyzeConversation();
    }

    const highestRisk = this.lastAnalysis?.risks
      .reduce((max, risk) => risk.level === 'critical' ? risk : 
               risk.level === 'high' && max.level !== 'critical' ? risk : max, 
               { level: 'low' } as PatternRisk);

    return {
      messageCount: this.lastAnalysis?.messageCount || 0,
      repetitionScore: this.lastAnalysis?.repetitionScore || 0,
      topicDiversity: this.lastAnalysis?.topicDiversity || 1,
      riskLevel: highestRisk?.level || 'low'
    };
  }

  /**
   * Simple health check
   */
  isHealthy(): boolean {
    const stats = this.getStats();
    return stats.riskLevel !== 'critical' && stats.repetitionScore < 0.8;
  }
}

export default PatternBlindnessDetector; 