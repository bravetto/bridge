/**
 * 🎯 ENHANCED BIASGUARD PATTERN DETECTOR
 * Comprehensive solution for the identified pattern detection challenges
 * 
 * Addresses:
 * 1. AI Meta-Learning Bias Patterns
 * 2. Technical Debt Detection
 * 3. Solution Cascade Pattern Recognition
 */

import { ARIAProtocol, ConversationAnalysis, PatternRisk } from '../core/aria-protocol';

export interface EnhancedBiasPattern {
  type: 'ai-meta-learning' | 'technical-debt' | 'solution-cascade';
  subtype: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  context: {
    conversationTurn: number;
    codeContext?: string;
    previousAttempts?: number;
  };
  intervention: {
    immediate: string;
    strategic: string;
    preventive: string;
  };
}

export interface PatternDetectionResult {
  overallRisk: number;
  detectedPatterns: EnhancedBiasPattern[];
  recommendedActions: string[];
  systemHealth: {
    aiReliability: number;
    technicalStability: number;
    solutionEffectiveness: number;
  };
}

export class EnhancedPatternDetector {
  private aria: ARIAProtocol;
  private conversationHistory: string[] = [];
  private technicalContext: Map<string, any> = new Map();
  private solutionAttempts: Map<string, number> = new Map();

  constructor() {
    this.aria = new ARIAProtocol();
  }

  /**
   * 🧠 AI META-LEARNING BIAS DETECTION
   * Detects the 4 critical AI bias patterns identified
   */
  private detectAIMetaLearningBias(context: {
    aiResponse?: string;
    conversationHistory: string[];
    codeChanges?: string[];
  }): EnhancedBiasPattern[] {
    const patterns: EnhancedBiasPattern[] = [];

    // 1. SUCCESS DECLARATION BIAS
    if (this.detectSuccessDeclarationBias(context.aiResponse)) {
      patterns.push({
        type: 'ai-meta-learning',
        subtype: 'success-declaration-bias',
        confidence: 0.9,
        severity: 'high',
        description: 'AI declaring victory before user confirmation - premature success claims',
        context: {
          conversationTurn: context.conversationHistory.length,
          codeContext: context.codeChanges?.join('\n')
        },
        intervention: {
          immediate: '⚠️ HOLD: Wait for user verification before declaring success',
          strategic: 'Implement success validation checkpoints in AI responses',
          preventive: 'Train AI to ask "Does this work as expected?" instead of declaring success'
        }
      });
    }

    // 2. TERMINAL WORSHIP BIAS
    if (this.detectTerminalWorshipBias(context.aiResponse)) {
      patterns.push({
        type: 'ai-meta-learning',
        subtype: 'terminal-worship-bias',
        confidence: 0.8,
        severity: 'medium',
        description: 'Over-reliance on logs vs actual user experience verification',
        context: {
          conversationTurn: context.conversationHistory.length
        },
        intervention: {
          immediate: '💡 VERIFY: Check actual user experience, not just terminal output',
          strategic: 'Prioritize functional testing over log analysis',
          preventive: 'Always include user experience validation in problem-solving'
        }
      });
    }

    // 3. PATTERN BLINDNESS
    const ariaAnalysis = this.aria.analyzeConversation(context.conversationHistory);
    if (ariaAnalysis.repetitionScore > 0.7) {
      patterns.push({
        type: 'ai-meta-learning',
        subtype: 'pattern-blindness',
        confidence: ariaAnalysis.repetitionScore,
        severity: 'high',
        description: 'Repetitive solution approaches without exploring alternatives',
        context: {
          conversationTurn: context.conversationHistory.length,
          previousAttempts: this.countSimilarAttempts(context.conversationHistory)
        },
        intervention: {
          immediate: '🔄 PIVOT: Try a completely different approach',
          strategic: 'Force alternative solution exploration after 3 similar attempts',
          preventive: 'Implement solution diversity requirements in AI training'
        }
      });
    }

    // 4. CONTEXT AMNESIA
    if (this.detectContextAmnesia(context.conversationHistory)) {
      patterns.push({
        type: 'ai-meta-learning',
        subtype: 'context-amnesia',
        confidence: 0.85,
        severity: 'medium',
        description: 'Losing track of important conversation context and previous decisions',
        context: {
          conversationTurn: context.conversationHistory.length
        },
        intervention: {
          immediate: '📝 CONTEXT: Review previous decisions and constraints',
          strategic: 'Implement conversation summary checkpoints',
          preventive: 'Maintain persistent context tracking across conversation turns'
        }
      });
    }

    return patterns;
  }

  /**
   * ⚡ TECHNICAL DEBT PATTERN DETECTION
   * Identifies framework conflicts and architectural issues
   */
  private detectTechnicalDebtPatterns(context: {
    codeChanges?: string[];
    errorLogs?: string[];
    frameworkVersions?: Record<string, string>;
  }): EnhancedBiasPattern[] {
    const patterns: EnhancedBiasPattern[] = [];

    // 1. PERFECT STORM RESOLVED (Framer Motion removed - conflicts resolved)
    if (this.detectPerfectStorm(context)) {
      patterns.push({
        type: 'technical-debt',
        subtype: 'perfect-storm-resolved',
        confidence: 0.95,
        severity: 'low',
        description: 'Framework conflicts resolved - Framer Motion successfully removed',
        context: {
          conversationTurn: 0,
          codeContext: 'Clean CSS-only animation system implemented'
        },
        intervention: {
          immediate: '🚨 FRAMEWORK: Implement conflict-resistant patterns immediately',
          strategic: 'Create framework compatibility matrix and testing protocols',
          preventive: 'Version lock critical dependencies and test combinations'
        }
      });
    }

    // 2. LOADING STATE CASCADE
    if (this.detectLoadingStateCascade(context.codeChanges)) {
      patterns.push({
        type: 'technical-debt',
        subtype: 'loading-state-cascade',
        confidence: 0.8,
        severity: 'high',
        description: 'Multiple loading systems interfering with each other',
        context: {
          conversationTurn: 0,
          codeContext: 'Multiple loading.tsx + setTimeout + SSR conflicts'
        },
        intervention: {
          immediate: '🔧 CONSOLIDATE: Remove conflicting loading implementations',
          strategic: 'Standardize on single loading state management approach',
          preventive: 'Create loading state architecture guidelines'
        }
      });
    }

    // 3. SSR BAILOUT CHAIN
    if (this.detectSSRBailoutChain(context.codeChanges)) {
      patterns.push({
        type: 'technical-debt',
        subtype: 'ssr-bailout-chain',
        confidence: 0.9,
        severity: 'high',
        description: 'Server components with client-side dependencies causing hydration issues',
        context: {
          conversationTurn: 0,
          codeContext: 'Server Component + client hooks without "use client"'
        },
        intervention: {
          immediate: '⚡ COMPONENT: Add "use client" or refactor to server-compatible',
          strategic: 'Audit all components for SSR/client boundary violations',
          preventive: 'Implement automated SSR compatibility checking'
        }
      });
    }

    return patterns;
  }

  /**
   * 🌊 SOLUTION CASCADE PATTERN DETECTION
   * Identifies fix→problem cycles and progressive complexity
   */
  private detectSolutionCascadePatterns(context: {
    conversationHistory: string[];
    solutionAttempts: string[];
    problemEvolution: string[];
  }): EnhancedBiasPattern[] {
    const patterns: EnhancedBiasPattern[] = [];

    // 1. FIX → NEW PROBLEM CYCLE
    if (this.detectFixNewProblemCycle(context.conversationHistory)) {
      patterns.push({
        type: 'solution-cascade',
        subtype: 'fix-new-problem-cycle',
        confidence: 0.85,
        severity: 'high',
        description: 'Each solution creating new hydration/framework issues',
        context: {
          conversationTurn: context.conversationHistory.length,
          previousAttempts: this.countFixAttempts(context.conversationHistory)
        },
        intervention: {
          immediate: '🛑 PAUSE: Assess if current approach is fundamentally flawed',
          strategic: 'Implement solution impact assessment before applying fixes',
          preventive: 'Create fix validation protocols to prevent cascade failures'
        }
      });
    }

    // 2. LAYER REVELATION
    if (this.detectLayerRevelation(context.problemEvolution)) {
      patterns.push({
        type: 'solution-cascade',
        subtype: 'layer-revelation',
        confidence: 0.9,
        severity: 'medium',
        description: 'Problems existing at multiple abstraction levels being discovered progressively',
        context: {
          conversationTurn: context.conversationHistory.length
        },
        intervention: {
          immediate: '🔍 DEEP DIVE: Perform comprehensive system analysis before proceeding',
          strategic: 'Implement multi-layer problem analysis methodology',
          preventive: 'Create system health checks that reveal hidden layer issues'
        }
      });
    }

    // 3. PROGRESSIVE DISCOVERY
    if (this.detectProgressiveDiscovery(context.conversationHistory)) {
      patterns.push({
        type: 'solution-cascade',
        subtype: 'progressive-discovery',
        confidence: 0.8,
        severity: 'medium',
        description: 'Issues only visible after previous fixes, indicating systemic complexity',
        context: {
          conversationTurn: context.conversationHistory.length
        },
        intervention: {
          immediate: '📊 HOLISTIC: Map entire system before making additional changes',
          strategic: 'Develop comprehensive testing protocols for complex systems',
          preventive: 'Implement system-wide impact analysis for all changes'
        }
      });
    }

    return patterns;
  }

  /**
   * 🎯 MAIN DETECTION ENGINE
   * Comprehensive pattern analysis with actionable interventions
   */
  async analyzePatterns(context: {
    aiResponse?: string;
    userPrompt?: string;
    conversationHistory: string[];
    codeChanges?: string[];
    errorLogs?: string[];
    frameworkVersions?: Record<string, string>;
    solutionAttempts?: string[];
    problemEvolution?: string[];
  }): Promise<PatternDetectionResult> {
    
    // Detect all pattern types
    const aiMetaLearningPatterns = this.detectAIMetaLearningBias(context);
    const technicalDebtPatterns = this.detectTechnicalDebtPatterns(context);
    const solutionCascadePatterns = this.detectSolutionCascadePatterns({
      conversationHistory: context.conversationHistory,
      solutionAttempts: context.solutionAttempts || [],
      problemEvolution: context.problemEvolution || []
    });

    const allPatterns = [
      ...aiMetaLearningPatterns,
      ...technicalDebtPatterns,
      ...solutionCascadePatterns
    ];

    // Calculate system health metrics
    const systemHealth = this.calculateSystemHealth(allPatterns);
    
    // Generate prioritized recommendations
    const recommendedActions = this.generatePrioritizedActions(allPatterns);

    // Calculate overall risk score
    const overallRisk = this.calculateOverallRisk(allPatterns);

    return {
      overallRisk,
      detectedPatterns: allPatterns,
      recommendedActions,
      systemHealth
    };
  }

  // Helper methods for specific pattern detection
  private detectSuccessDeclarationBias(response?: string): boolean {
    if (!response) return false;
    const successPatterns = [
      /mission accomplished/i,
      /success!/i,
      /everything is fixed/i,
      /ready to deploy/i,
      /working perfectly/i,
      /problem solved/i
    ];
    return successPatterns.some(pattern => pattern.test(response));
  }

  private detectTerminalWorshipBias(response?: string): boolean {
    if (!response) return false;
    const terminalPatterns = [
      /terminal shows no errors/i,
      /build passes/i,
      /no console errors/i,
      /logs look good/i,
      /output indicates success/i
    ];
    return terminalPatterns.some(pattern => pattern.test(response));
  }

  private detectContextAmnesia(history: string[]): boolean {
    if (history.length < 10) return false;
    
    // Check for repeated questions or loss of context
    const recentMessages = history.slice(-5);
    const earlierMessages = history.slice(0, -5);
    
    return recentMessages.some(recent => 
      earlierMessages.some(earlier => 
        this.calculateSimilarity(recent, earlier) > 0.8
      )
    );
  }

  private detectPerfectStorm(context: any): boolean {
    // Perfect storm resolved - Framer Motion removed, conflicts eliminated
    const versions = context.frameworkVersions || {};
    return false; // Always return false since Framer Motion has been removed
  }

  private detectLoadingStateCascade(codeChanges?: string[]): boolean {
    if (!codeChanges) return false;
    const loadingPatterns = [
      /loading\.tsx/,
      /setTimeout.*loading/i,
      /SIMULATE_LOADING_DELAY/,
      /ssr:\s*false/
    ];
    return loadingPatterns.filter(pattern => 
      codeChanges.some(change => pattern.test(change))
    ).length >= 2;
  }

  private detectSSRBailoutChain(codeChanges?: string[]): boolean {
    if (!codeChanges) return false;
    return codeChanges.some(change => 
      change.includes('useState') || change.includes('useEffect')
    ) && !codeChanges.some(change => change.includes("'use client'"));
  }

  private detectFixNewProblemCycle(history: string[]): boolean {
    // Look for pattern of fix followed by new error
    const fixWords = ['fixed', 'resolved', 'solved', 'corrected'];
    const errorWords = ['error', 'issue', 'problem', 'bug', 'failing'];
    
    let fixCount = 0;
    let errorAfterFix = 0;
    
    for (let i = 0; i < history.length - 1; i++) {
      const current = history[i].toLowerCase();
      const next = history[i + 1].toLowerCase();
      
      if (fixWords.some(word => current.includes(word))) {
        fixCount++;
        if (errorWords.some(word => next.includes(word))) {
          errorAfterFix++;
        }
      }
    }
    
    return fixCount >= 3 && (errorAfterFix / fixCount) > 0.6;
  }

  private detectLayerRevelation(problemEvolution?: string[]): boolean {
    if (!problemEvolution || problemEvolution.length < 3) return false;
    
    // Check for increasing complexity and abstraction levels
    const complexityKeywords = [
      ['surface', 'ui', 'display'],
      ['state', 'component', 'props'],
      ['hydration', 'ssr', 'framework'],
      ['architecture', 'system', 'design']
    ];
    
    let layerCount = 0;
    complexityKeywords.forEach(layer => {
      if (problemEvolution.some(problem => 
        layer.some(keyword => problem.toLowerCase().includes(keyword))
      )) {
        layerCount++;
      }
    });
    
    return layerCount >= 3;
  }

  private detectProgressiveDiscovery(history: string[]): boolean {
    // Look for pattern where issues are only revealed after fixes
    const discoveryPatterns = [
      /only visible after/i,
      /revealed when/i,
      /discovered that/i,
      /turns out/i,
      /actually the problem/i
    ];
    
    return history.filter(message => 
      discoveryPatterns.some(pattern => pattern.test(message))
    ).length >= 2;
  }

  private countSimilarAttempts(history: string[]): number {
    // Count repeated solution attempts
    const solutionKeywords = ['try', 'attempt', 'fix', 'solve', 'implement'];
    return history.filter(message => 
      solutionKeywords.some(keyword => message.toLowerCase().includes(keyword))
    ).length;
  }

  private countFixAttempts(history: string[]): number {
    return history.filter(message => 
      /fix|solve|resolve|correct/i.test(message)
    ).length;
  }

  private calculateSimilarity(str1: string, str2: string): number {
    // Simple similarity calculation
    const words1 = str1.toLowerCase().split(/\s+/);
    const words2 = str2.toLowerCase().split(/\s+/);
    const intersection = words1.filter(word => words2.includes(word));
    return intersection.length / Math.max(words1.length, words2.length);
  }

  private calculateSystemHealth(patterns: EnhancedBiasPattern[]) {
    const aiPatterns = patterns.filter(p => p.type === 'ai-meta-learning');
    const techPatterns = patterns.filter(p => p.type === 'technical-debt');
    const cascadePatterns = patterns.filter(p => p.type === 'solution-cascade');

    return {
      aiReliability: Math.max(0, 1 - (aiPatterns.length * 0.2)),
      technicalStability: Math.max(0, 1 - (techPatterns.length * 0.3)),
      solutionEffectiveness: Math.max(0, 1 - (cascadePatterns.length * 0.25))
    };
  }

  private generatePrioritizedActions(patterns: EnhancedBiasPattern[]): string[] {
    const actions = patterns
      .sort((a, b) => {
        const severityWeight = { critical: 4, high: 3, medium: 2, low: 1 };
        return severityWeight[b.severity] - severityWeight[a.severity];
      })
      .slice(0, 5) // Top 5 priorities
      .map(pattern => pattern.intervention.immediate);

    return actions;
  }

  private calculateOverallRisk(patterns: EnhancedBiasPattern[]): number {
    if (patterns.length === 0) return 0;
    
    const severityScores = { critical: 1.0, high: 0.8, medium: 0.5, low: 0.3 };
    const totalScore = patterns.reduce((sum, pattern) => 
      sum + (pattern.confidence * severityScores[pattern.severity]), 0
    );
    
    return Math.min(1.0, totalScore / patterns.length);
  }
} 