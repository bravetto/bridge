/**
 * 🛡️ BIASGUARD METHODOLOGY FRAMEWORK V1.0
 * Enhanced integration with existing BIASGUARD system
 * Adds standardized scoring, evidence quality, and structured reporting
 */

import { UnifiedBiasGuard, UnifiedBiasResult, DetectedPattern } from './unified-biasguard';

export interface MethodologyV1Result extends UnifiedBiasResult {
  // Enhanced methodology fields
  evidenceQuality: 'strong' | 'moderate' | 'weak';
  severityCalibrated: boolean;
  alternativeExplanations: string[];
  methodologyVersion: '1.0';
  structuredReport: StructuredBiasReport;
}

export interface StructuredBiasReport {
  target: string;
  analysisDate: string;
  confidenceLevel: 'high' | 'medium' | 'low';
  evidenceAnalysis: {
    strongEvidence: number;
    moderateEvidence: number;
    weakEvidence: number;
  };
  correctedAssessment: {
    originalClaim?: string;
    correctedClaim?: string;
    reasoning?: string;
  };
  finalVerdict: {
    overallAssessment: 'BIASED' | 'MODERATE' | 'UNBIASED';
    primaryIssues: string[];
    keyInsight: string;
  };
}

export class BiasGuardMethodologyV1 extends UnifiedBiasGuard {
  private readonly METHODOLOGY_VERSION = '1.0';
  
  // Enhanced bias pattern taxonomy from framework
  private readonly ENHANCED_PATTERNS = {
    // Cognitive bias patterns
    'confirmation-bias': {
      keywords: ['confirms', 'validates', 'proves', 'supports my theory'],
      severity: 'medium',
      description: 'Seeking evidence that supports predetermined conclusions'
    },
    'severity-inflation': {
      keywords: ['CRITICAL', 'MAJOR', 'CATASTROPHIC', 'URGENT'],
      severity: 'high',
      description: 'Over-rating impact without proportional evidence'
    },
    'authority-simulation': {
      keywords: ['expert panel', 'senior architect', 'industry standard'],
      severity: 'high',
      description: 'Fabricating expertise or credentials'
    },
    'binary-thinking': {
      keywords: ['only option', 'must choose', 'either/or', 'no alternative'],
      severity: 'medium',
      description: 'False dichotomies, lack of nuanced assessment'
    },
    'complexity-inflation': {
      keywords: ['comprehensive framework', 'enterprise solution', 'multi-phase'],
      severity: 'medium',
      description: 'Over-engineering simple problems'
    },
    
    // Evidence bias patterns
    'cherry-picking': {
      keywords: ['for example', 'such as', 'specifically'],
      severity: 'medium',
      description: 'Selective evidence presentation'
    },
    'sample-size-neglect': {
      keywords: ['one case', 'single instance', 'this proves'],
      severity: 'low',
      description: 'Drawing conclusions from insufficient data'
    },
    
    // Assessment bias patterns
    'overconfidence-bias': {
      keywords: ['definitely', 'certainly', '100% sure', 'guaranteed'],
      severity: 'medium',
      description: 'Certainty without supporting evidence'
    }
  };

  /**
   * 🎯 ENHANCED ANALYSIS WITH METHODOLOGY V1.0
   */
  async analyzeWithMethodology(context: {
    aiResponse?: string;
    userPrompt?: string;
    conversationHistory?: string[];
    codeChanges?: string[];
    errorLogs?: string[];
  }): Promise<MethodologyV1Result> {
    
    // Run base analysis
    const baseResult = await this.analyze(context);
    
    // Apply methodology enhancements
    const evidenceQuality = this.assessEvidenceQuality(context);
    const alternativeExplanations = this.generateAlternativeExplanations(baseResult.patterns);
    const enhancedPatterns = this.enhancePatternDetection(context.aiResponse || '');
    const structuredReport = this.generateStructuredReport(baseResult, context);
    
    // Calibrate severity based on context
    const calibratedPatterns = this.calibrateSeverity(
      [...baseResult.patterns, ...enhancedPatterns],
      context
    );
    
    // Recalculate bias score with enhanced patterns
    const enhancedBiasScore = this.calculateEnhancedBiasScore(calibratedPatterns, evidenceQuality);
    
    return {
      ...baseResult,
      patterns: calibratedPatterns,
      biasScore: enhancedBiasScore,
      evidenceQuality,
      severityCalibrated: true,
      alternativeExplanations,
      methodologyVersion: '1.0',
      structuredReport
    };
  }

  /**
   * 📊 ASSESS EVIDENCE QUALITY
   */
  private assessEvidenceQuality(context: any): 'strong' | 'moderate' | 'weak' {
    const response = context.aiResponse || '';
    const codeChanges = context.codeChanges || [];
    const errorLogs = context.errorLogs || [];
    
    let evidencePoints = 0;
    
    // Strong evidence indicators
    if (codeChanges.length > 0) evidencePoints += 2; // Code changes present
    if (errorLogs.length > 0) evidencePoints += 2; // Error logs available
    if (response.includes('tested') || response.includes('verified')) evidencePoints += 2;
    if (response.match(/\d+/g)?.length > 2) evidencePoints += 1; // Specific numbers/metrics
    
    // Moderate evidence indicators
    if (response.includes('example') || response.includes('instance')) evidencePoints += 1;
    if (response.length > 200) evidencePoints += 1; // Detailed response
    
    // Weak evidence indicators (negative points)
    if (response.includes('might') || response.includes('possibly')) evidencePoints -= 1;
    if (response.includes('I think') || response.includes('probably')) evidencePoints -= 1;
    
    if (evidencePoints >= 4) return 'strong';
    if (evidencePoints >= 2) return 'moderate';
    return 'weak';
  }

  /**
   * 🔍 ENHANCED PATTERN DETECTION
   */
  private enhancePatternDetection(response: string): DetectedPattern[] {
    const patterns: DetectedPattern[] = [];
    const lowerResponse = response.toLowerCase();
    
    // Check against enhanced pattern taxonomy
    Object.entries(this.ENHANCED_PATTERNS).forEach(([patternType, config]) => {
      const hasPattern = config.keywords.some(keyword => 
        lowerResponse.includes(keyword.toLowerCase())
      );
      
      if (hasPattern) {
        patterns.push({
          type: patternType as any,
          severity: config.severity as any,
          confidence: 0.8,
          description: config.description,
          intervention: this.generateIntervention(patternType),
          location: 'ai-response'
        });
      }
    });
    
    return patterns;
  }

  /**
   * ⚖️ CALIBRATE SEVERITY BASED ON CONTEXT
   */
  private calibrateSeverity(
    patterns: DetectedPattern[], 
    context: any
  ): DetectedPattern[] {
    
    return patterns.map(pattern => {
      let adjustedSeverity = pattern.severity;
      
      // Reduce severity for documentation vs. system issues
      if (context.aiResponse?.includes('documentation') || 
          context.aiResponse?.includes('README')) {
        adjustedSeverity = this.reduceSeverity(adjustedSeverity);
      }
      
      // Increase severity for safety-critical contexts
      if (context.aiResponse?.includes('security') || 
          context.aiResponse?.includes('production') ||
          context.aiResponse?.includes('deployment')) {
        adjustedSeverity = this.increaseSeverity(adjustedSeverity);
      }
      
      return {
        ...pattern,
        severity: adjustedSeverity
      };
    });
  }

  /**
   * 🧮 CALCULATE ENHANCED BIAS SCORE
   */
  private calculateEnhancedBiasScore(
    patterns: DetectedPattern[], 
    evidenceQuality: 'strong' | 'moderate' | 'weak'
  ): number {
    
    // Base score from patterns
    const severityWeights = { low: 0.1, medium: 0.3, high: 0.6, critical: 1.0 };
    let score = patterns.reduce((sum, pattern) => {
      return sum + (severityWeights[pattern.severity] * pattern.confidence);
    }, 0);
    
    // Evidence quality adjustment
    const evidenceMultipliers = { strong: 0.8, moderate: 1.0, weak: 1.3 };
    score *= evidenceMultipliers[evidenceQuality];
    
    // Pattern diversity penalty (multiple different patterns = higher risk)
    const uniquePatternTypes = new Set(patterns.map(p => p.type)).size;
    if (uniquePatternTypes > 3) {
      score *= 1.2;
    }
    
    return Math.min(1.0, score);
  }

  /**
   * 🔄 GENERATE ALTERNATIVE EXPLANATIONS
   */
  private generateAlternativeExplanations(patterns: DetectedPattern[]): string[] {
    const explanations: string[] = [];
    
    if (patterns.length === 0) {
      explanations.push('No bias patterns detected - analysis may be accurate');
      explanations.push('Patterns may be subtle and require deeper analysis');
    } else {
      explanations.push('Detected patterns may be contextually appropriate');
      explanations.push('User communication style may influence pattern detection');
      explanations.push('Domain-specific language may trigger false positives');
    }
    
    return explanations;
  }

  /**
   * 📝 GENERATE STRUCTURED REPORT
   */
  private generateStructuredReport(
    result: UnifiedBiasResult, 
    context: any
  ): StructuredBiasReport {
    
    const evidenceCounts = this.countEvidenceTypes(result.patterns);
    
    return {
      target: context.userPrompt?.slice(0, 50) + '...' || 'AI Response Analysis',
      analysisDate: new Date().toISOString().split('T')[0],
      confidenceLevel: result.confidence > 0.8 ? 'high' : 
                      result.confidence > 0.6 ? 'medium' : 'low',
      evidenceAnalysis: evidenceCounts,
      correctedAssessment: {
        originalClaim: result.biasScore > 0.5 ? 'Significant bias detected' : undefined,
        correctedClaim: result.biasScore > 0.5 ? 'Moderate bias with context considerations' : undefined,
        reasoning: 'Severity calibrated based on context and evidence quality'
      },
      finalVerdict: {
        overallAssessment: result.biasScore < 0.3 ? 'UNBIASED' : 
                          result.biasScore < 0.7 ? 'MODERATE' : 'BIASED',
        primaryIssues: result.patterns.slice(0, 3).map(p => p.description),
        keyInsight: this.generateKeyInsight(result)
      }
    };
  }

  /**
   * 🛠️ HELPER METHODS
   */
  private generateIntervention(patternType: string): string {
    const interventions: Record<string, string> = {
      'confirmation-bias': '🔍 CHALLENGE: Seek disconfirming evidence',
      'severity-inflation': '⚖️ CALIBRATE: Match severity to actual impact',
      'authority-simulation': '🚨 DISCLOSE: Clarify actual expertise level',
      'binary-thinking': '🌈 EXPAND: Consider multiple alternatives',
      'complexity-inflation': '🎯 SIMPLIFY: Start with minimal solution',
      'cherry-picking': '📊 BALANCE: Include contradicting evidence',
      'overconfidence-bias': '🤔 HEDGE: Acknowledge uncertainty'
    };
    
    return interventions[patternType] || '💡 REVIEW: Consider alternative approaches';
  }

  private reduceSeverity(severity: string): 'low' | 'medium' | 'high' | 'critical' {
    const levels = ['low', 'medium', 'high', 'critical'];
    const currentIndex = levels.indexOf(severity);
    return levels[Math.max(0, currentIndex - 1)] as any;
  }

  private increaseSeverity(severity: string): 'low' | 'medium' | 'high' | 'critical' {
    const levels = ['low', 'medium', 'high', 'critical'];
    const currentIndex = levels.indexOf(severity);
    return levels[Math.min(3, currentIndex + 1)] as any;
  }

  private countEvidenceTypes(patterns: DetectedPattern[]) {
    return {
      strongEvidence: patterns.filter(p => p.confidence > 0.8).length,
      moderateEvidence: patterns.filter(p => p.confidence >= 0.6 && p.confidence <= 0.8).length,
      weakEvidence: patterns.filter(p => p.confidence < 0.6).length
    };
  }

  private generateKeyInsight(result: UnifiedBiasResult): string {
    if (result.patterns.length === 0) {
      return 'Analysis shows good bias awareness and balanced reasoning';
    }
    
    const dominantPattern = result.patterns.reduce((prev, current) => 
      current.confidence > prev.confidence ? current : prev
    );
    
    return `Primary concern: ${dominantPattern.description}`;
  }

  /**
   * 📊 GET METHODOLOGY V1.0 FORMATTED RESULT
   */
  getMethodologyFormattedResult(result: MethodologyV1Result): string {
    const { biasScore, patterns, evidenceQuality, structuredReport } = result;
    const level = biasScore < 0.3 ? '🟢 GOOD' : biasScore < 0.6 ? '🟡 BIAS' : '🔴 FIX';
    const score = Math.round(biasScore * 100);
    
    let output = `[BiasGuard v${this.METHODOLOGY_VERSION}] ${level} (${score}%) | Evidence: ${evidenceQuality.toUpperCase()}`;
    
    if (patterns.length > 0) {
      const topPattern = patterns[0];
      output += `\n🎯 ${topPattern.intervention}`;
    }
    
    if (structuredReport.finalVerdict.keyInsight) {
      output += `\n💡 ${structuredReport.finalVerdict.keyInsight}`;
    }
    
    return output;
  }
}

// Export enhanced methodology
export const biasGuardV1 = new BiasGuardMethodologyV1(); 