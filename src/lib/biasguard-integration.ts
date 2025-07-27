/**
 * 🛡️ BIASGUARD INTEGRATION - Real-time AI Bias Detection
 * Prevents AI drift and optimizes conversion through systematic bias monitoring
 */

export interface BiasDetectionResult {
  biasScore: number;                    // 0-1 risk score
  patterns: BiasPattern[];              // Detected bias patterns
  conversionImpact: ConversionImpact;   // Business impact assessment
  recommendations: string[];            // Actionable improvements
  confidence: number;                   // Detection confidence
}

export interface BiasPattern {
  type: BiasType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  evidence: string[];
  intervention: string;
}

export type BiasType = 
  | 'success_declaration'     // AI declaring victory prematurely
  | 'terminal_worship'        // Over-reliance on logs vs UX
  | 'pattern_blindness'       // Repetitive solution approaches
  | 'confirmation_bias'       // Seeking confirming information only
  | 'context_amnesia'         // Losing conversation context
  | 'severity_inflation'      // Over-rating impact without evidence
  | 'conversion_neglect'      // Ignoring business/conversion impact
  | 'technical_tunnel';       // Over-focus on tech vs user needs

export interface ConversionImpact {
  userExperience: 'positive' | 'neutral' | 'negative';
  businessValue: 'high' | 'medium' | 'low';
  missionAlignment: 'aligned' | 'partial' | 'misaligned';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Enhanced BiasGuard class with conversion optimization
 */
export class BiasGuardIntegration {
  private conversationHistory: string[] = [];
  private detectionThreshold = 0.3;
  private conversionFocus = true;
  
  constructor(config?: {
    sensitivity?: 'low' | 'medium' | 'high';
    conversionFocus?: boolean;
  }) {
    if (config?.sensitivity) {
      this.detectionThreshold = {
        low: 0.5,
        medium: 0.3,
        high: 0.1
      }[config.sensitivity];
    }
    
    this.conversionFocus = config?.conversionFocus ?? true;
  }

  /**
   * Analyze AI response for bias patterns
   */
  async analyzeResponse(
    aiResponse: string,
    userPrompt?: string,
    context?: {
      page?: string;
      userType?: string;
      conversionStage?: string;
    }
  ): Promise<BiasDetectionResult> {
    // Add to conversation history
    if (userPrompt) this.conversationHistory.push(`USER: ${userPrompt}`);
    this.conversationHistory.push(`AI: ${aiResponse}`);
    
    // Keep only last 10 exchanges
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20);
    }

    const patterns = await this.detectBiasPatterns(aiResponse, userPrompt);
    const conversionImpact = this.assessConversionImpact(patterns, context);
    const biasScore = this.calculateBiasScore(patterns);
    
    return {
      biasScore,
      patterns,
      conversionImpact,
      recommendations: this.generateRecommendations(patterns, conversionImpact),
      confidence: this.calculateConfidence(patterns)
    };
  }

  /**
   * Detect specific bias patterns in AI response
   */
  private async detectBiasPatterns(
    aiResponse: string,
    userPrompt?: string
  ): Promise<BiasPattern[]> {
    const patterns: BiasPattern[] = [];
    const lowerResponse = aiResponse.toLowerCase();
    const lowerPrompt = userPrompt?.toLowerCase() || '';

    // Success Declaration Bias
    if (this.detectSuccessDeclaration(lowerResponse)) {
      patterns.push({
        type: 'success_declaration',
        severity: 'high',
        description: 'AI prematurely declaring task completion without verification',
        evidence: this.extractSuccessDeclarationEvidence(aiResponse),
        intervention: 'Request specific validation steps and success criteria'
      });
    }

    // Terminal Worship
    if (this.detectTerminalWorship(lowerResponse)) {
      patterns.push({
        type: 'terminal_worship',
        severity: 'medium',
        description: 'Over-reliance on terminal output vs user experience validation',
        evidence: this.extractTerminalWorshipEvidence(aiResponse),
        intervention: 'Focus on user testing and experience validation'
      });
    }

    // Pattern Blindness
    if (this.detectPatternBlindness(lowerResponse)) {
      patterns.push({
        type: 'pattern_blindness',
        severity: 'medium',
        description: 'Repeating same solution approaches without variation',
        evidence: this.extractPatternBlindnessEvidence(aiResponse),
        intervention: 'Explore alternative approaches and solutions'
      });
    }

    // Context Amnesia
    if (this.detectContextAmnesia(lowerResponse)) {
      patterns.push({
        type: 'context_amnesia',
        severity: 'critical',
        description: 'Losing important conversation context or mission focus',
        evidence: this.extractContextAmnesiaEvidence(aiResponse),
        intervention: 'Explicitly reference July 28th mission and previous context'
      });
    }

    // Conversion Neglect
    if (this.conversionFocus && this.detectConversionNeglect(lowerResponse, lowerPrompt)) {
      patterns.push({
        type: 'conversion_neglect',
        severity: 'high',
        description: 'Ignoring business value and conversion optimization',
        evidence: this.extractConversionNeglectEvidence(aiResponse),
        intervention: 'Consider user journey, conversion funnel, and business impact'
      });
    }

    return patterns;
  }

  /**
   * Detect success declaration bias
   */
  private detectSuccessDeclaration(response: string): boolean {
    const successIndicators = [
      'completed successfully',
      'task is done',
      'implementation complete',
      'ready to deploy',
      'fully functional',
      'working perfectly'
    ];
    
    const verificationIndicators = [
      'test',
      'verify',
      'validate',
      'check',
      'confirm',
      'ensure'
    ];
    
    const hasSuccessDeclaration = successIndicators.some(indicator => 
      response.includes(indicator)
    );
    
    const hasVerification = verificationIndicators.some(indicator => 
      response.includes(indicator)
    );
    
    return hasSuccessDeclaration && !hasVerification;
  }

  /**
   * Detect terminal worship bias
   */
  private detectTerminalWorship(response: string): boolean {
    const terminalIndicators = [
      'terminal output',
      'console shows',
      'log indicates',
      'build successful',
      'no errors in terminal'
    ];
    
    const uxIndicators = [
      'user experience',
      'user testing',
      'user feedback',
      'usability',
      'user journey'
    ];
    
    const hasTerminalFocus = terminalIndicators.some(indicator => 
      response.includes(indicator)
    );
    
    const hasUXFocus = uxIndicators.some(indicator => 
      response.includes(indicator)
    );
    
    return hasTerminalFocus && !hasUXFocus;
  }

  /**
   * Detect pattern blindness
   */
  private detectPatternBlindness(response: string): boolean {
    // Check if response is very similar to recent responses
    const recentResponses = this.conversationHistory
      .filter(msg => msg.startsWith('AI:'))
      .slice(-3)
      .map(msg => msg.substring(3));
    
    if (recentResponses.length < 2) return false;
    
    // Simple similarity check - in production, use more sophisticated NLP
    const similarity = this.calculateSimilarity(response, recentResponses.join(' '));
    return similarity > 0.8;
  }

  /**
   * Detect context amnesia
   */
  private detectContextAmnesia(response: string): boolean {
    const missionKeywords = [
      'jahmere',
      'july 28',
      'court date',
      'freedom',
      'mission',
      'deadline'
    ];
    
    const hasRecentMissionContext = this.conversationHistory
      .slice(-5)
      .some(msg => 
        missionKeywords.some(keyword => 
          msg.toLowerCase().includes(keyword)
        )
      );
    
    const responseHasMissionContext = missionKeywords.some(keyword => 
      response.includes(keyword)
    );
    
    return hasRecentMissionContext && !responseHasMissionContext;
  }

  /**
   * Detect conversion neglect
   */
  private detectConversionNeglect(response: string, prompt: string): boolean {
    const businessKeywords = [
      'conversion',
      'user',
      'business',
      'roi',
      'impact',
      'value',
      'engagement',
      'experience'
    ];
    
    const technicalKeywords = [
      'code',
      'implementation',
      'function',
      'component',
      'technical',
      'architecture'
    ];
    
    const promptHasBusinessContext = businessKeywords.some(keyword => 
      prompt.includes(keyword)
    );
    
    const responseHasTechnicalFocus = technicalKeywords.some(keyword => 
      response.includes(keyword)
    );
    
    const responseHasBusinessFocus = businessKeywords.some(keyword => 
      response.includes(keyword)
    );
    
    return promptHasBusinessContext && responseHasTechnicalFocus && !responseHasBusinessFocus;
  }

  /**
   * Assess conversion impact of detected biases
   */
  private assessConversionImpact(
    patterns: BiasPattern[],
    context?: {
      page?: string;
      userType?: string;
      conversionStage?: string;
    }
  ): ConversionImpact {
    const criticalPatterns = patterns.filter(p => p.severity === 'critical').length;
    const highPatterns = patterns.filter(p => p.severity === 'high').length;
    
    let userExperience: ConversionImpact['userExperience'] = 'positive';
    let businessValue: ConversionImpact['businessValue'] = 'high';
    let missionAlignment: ConversionImpact['missionAlignment'] = 'aligned';
    let riskLevel: ConversionImpact['riskLevel'] = 'low';
    
    // Assess user experience impact
    if (criticalPatterns > 0 || highPatterns > 2) {
      userExperience = 'negative';
      riskLevel = 'critical';
    } else if (highPatterns > 0) {
      userExperience = 'neutral';
      riskLevel = 'medium';
    }
    
    // Assess business value impact
    const hasConversionNeglect = patterns.some(p => p.type === 'conversion_neglect');
    if (hasConversionNeglect) {
      businessValue = 'low';
    }
    
    // Assess mission alignment
    const hasContextAmnesia = patterns.some(p => p.type === 'context_amnesia');
    if (hasContextAmnesia) {
      missionAlignment = 'misaligned';
      riskLevel = 'critical';
    }
    
    return {
      userExperience,
      businessValue,
      missionAlignment,
      riskLevel
    };
  }

  /**
   * Calculate overall bias score
   */
  private calculateBiasScore(patterns: BiasPattern[]): number {
    if (patterns.length === 0) return 0;
    
    const severityWeights = {
      low: 0.2,
      medium: 0.5,
      high: 0.8,
      critical: 1.0
    };
    
    const totalWeight = patterns.reduce((sum, pattern) => 
      sum + severityWeights[pattern.severity], 0
    );
    
    return Math.min(totalWeight / patterns.length, 1.0);
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(
    patterns: BiasPattern[],
    conversionImpact: ConversionImpact
  ): string[] {
    const recommendations: string[] = [];
    
    if (conversionImpact.riskLevel === 'critical') {
      recommendations.push('🚨 CRITICAL: Refocus on July 28th mission and user experience');
    }
    
    if (conversionImpact.businessValue === 'low') {
      recommendations.push('💼 Consider business impact and conversion optimization');
    }
    
    if (conversionImpact.userExperience === 'negative') {
      recommendations.push('👥 Prioritize user experience and usability testing');
    }
    
    // Pattern-specific recommendations
    patterns.forEach(pattern => {
      recommendations.push(`🎯 ${pattern.type}: ${pattern.intervention}`);
    });
    
    return recommendations;
  }

  /**
   * Calculate detection confidence
   */
  private calculateConfidence(patterns: BiasPattern[]): number {
    // Simple confidence calculation - in production, use more sophisticated methods
    const baseConfidence = 0.7;
    const patternBonus = Math.min(patterns.length * 0.1, 0.3);
    return Math.min(baseConfidence + patternBonus, 1.0);
  }

  /**
   * Helper methods for evidence extraction
   */
  private extractSuccessDeclarationEvidence(response: string): string[] {
    const lines = response.split('\n');
    return lines.filter(line => 
      line.toLowerCase().includes('completed') ||
      line.toLowerCase().includes('successful') ||
      line.toLowerCase().includes('done')
    ).slice(0, 3);
  }

  private extractTerminalWorshipEvidence(response: string): string[] {
    const lines = response.split('\n');
    return lines.filter(line => 
      line.toLowerCase().includes('terminal') ||
      line.toLowerCase().includes('console') ||
      line.toLowerCase().includes('log')
    ).slice(0, 3);
  }

  private extractPatternBlindnessEvidence(response: string): string[] {
    return ['Similar response pattern detected in recent conversation'];
  }

  private extractContextAmnesiaEvidence(response: string): string[] {
    return ['Missing reference to July 28th mission context'];
  }

  private extractConversionNeglectEvidence(response: string): string[] {
    return ['Technical focus without business/conversion consideration'];
  }

  /**
   * Simple text similarity calculation
   */
  private calculateSimilarity(text1: string, text2: string): number {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const intersection = words1.filter(word => words2.includes(word));
    const union = [...new Set([...words1, ...words2])];
    
    return intersection.length / union.length;
  }

  /**
   * Get real-time monitoring status
   */
  getMonitoringStatus() {
    return {
      isActive: true,
      conversationLength: this.conversationHistory.length,
      detectionThreshold: this.detectionThreshold,
      conversionFocus: this.conversionFocus,
      lastAnalysis: new Date().toISOString()
    };
  }

  /**
   * Reset conversation history
   */
  resetContext() {
    this.conversationHistory = [];
  }
}

// Export singleton instance
export const biasGuard = new BiasGuardIntegration({
  sensitivity: 'high',
  conversionFocus: true
});

// Export for React hooks
export function useBiasGuard() {
  return {
    analyzeResponse: biasGuard.analyzeResponse.bind(biasGuard),
    getStatus: biasGuard.getMonitoringStatus.bind(biasGuard),
    resetContext: biasGuard.resetContext.bind(biasGuard)
  };
} 