/**
 * 🎯 FRAMER HYBRID GUARD
 * Prevents AI drift and maintains pragmatic Framer Motion hybrid approach
 * 
 * Mission: Keep working patterns working, prevent over-optimization
 */

export interface FramerHybridRule {
  id: string
  principle: string
  enforcement: 'blocking' | 'warning' | 'advisory'
  pattern: RegExp | string
  rationale: string
  examples: {
    good: string[]
    bad: string[]
  }
}

export class FramerHybridGuard {
  private static instance: FramerHybridGuard
  private rules: FramerHybridRule[] = []
  private violations: Array<{
    rule: string
    file: string
    line: number
    severity: 'high' | 'medium' | 'low'
    suggestion: string
  }> = []

  constructor() {
    this.initializeRules()
  }

  static getInstance(): FramerHybridGuard {
    if (!FramerHybridGuard.instance) {
      FramerHybridGuard.instance = new FramerHybridGuard()
    }
    return FramerHybridGuard.instance
  }

  private initializeRules(): void {
    this.rules = [
      {
        id: 'no-perfect-storm-solutions',
        principle: 'Do not create complex solutions for working Framer Motion',
        enforcement: 'blocking',
        pattern: /FrozenRouter|LayoutRouterContext|usePreviousValue/,
        rationale: 'If Framer Motion already works, do not add complexity',
        examples: {
          good: [
            'motion.div with simple animations',
            'AnimatePresence for basic transitions',
            'useScroll for scroll-based animations'
          ],
          bad: [
            'FrozenRouter wrapper components',
            'Complex context preservation patterns',
            'Over-engineered animation systems'
          ]
        }
      },
      {
        id: 'maintain-working-patterns',
        principle: 'If it works, do not "fix" it',
        enforcement: 'blocking',
        pattern: 'existing working Framer Motion components',
        rationale: 'Working code is more valuable than perfect code',
        examples: {
          good: [
            'Keep existing motion.div implementations',
            'Preserve working AnimatePresence patterns',
            'Maintain functional scroll animations'
          ],
          bad: [
            'Refactoring working animations to CSS',
            'Converting functional Framer Motion to "safer" alternatives',
            'Optimizing performance of already fast animations'
          ]
        }
      },
      {
        id: 'hybrid-approach-only',
        principle: 'Use Framer Motion for complex animations, CSS for simple ones',
        enforcement: 'advisory',
        pattern: /className="animate-|transition-|duration-/,
        rationale: 'Leverage strengths of both approaches pragmatically',
        examples: {
          good: [
            'Framer Motion for scroll-triggered animations',
            'CSS transitions for hover effects',
            'Framer Motion for complex orchestrated sequences'
          ],
          bad: [
            'Framer Motion for simple hover states',
            'CSS animations for complex scroll interactions',
            'All-or-nothing approaches'
          ]
        }
      },
      {
        id: 'no-framework-fighting',
        principle: 'Work with Next.js patterns, not against them',
        enforcement: 'warning',
        pattern: /layoutId.*route|AnimatePresence.*router/,
        rationale: 'Route-level animations are problematic in App Router',
        examples: {
          good: [
            'Component-level animations',
            'Page-internal transitions',
            'Content-based AnimatePresence'
          ],
          bad: [
            'Route transition animations',
            'Layout animations across pages',
            'Router-dependent AnimatePresence'
          ]
        }
      },
      {
        id: 'performance-pragmatism',
        principle: 'Optimize when there is an actual performance problem',
        enforcement: 'advisory',
        pattern: 'performance optimization without measurement',
        rationale: 'Premature optimization creates complexity without benefit',
        examples: {
          good: [
            'Measure performance before optimizing',
            'Use React DevTools to identify bottlenecks',
            'Optimize based on real user metrics'
          ],
          bad: [
            'Optimizing animations that are already smooth',
            'Adding complexity for theoretical performance gains',
            'Micro-optimizations without measurement'
          ]
        }
      },
      {
        id: 'component-size-limit',
        principle: 'Keep components under 500 lines',
        enforcement: 'warning',
        pattern: /component.*lines.*[5-9][0-9][0-9]|[1-9][0-9][0-9][0-9]/,
        rationale: 'Large components are hard to maintain and debug',
        examples: {
          good: [
            'Break large components into smaller focused ones',
            'Extract sections into separate components',
            'Use composition over monolithic components'
          ],
          bad: [
            '791-line landing page components',
            'Components handling multiple responsibilities',
            'Inline complex logic without extraction'
          ]
        }
      }
    ]
  }

  /**
   * Analyze code for AI drift patterns
   */
     analyzeCode(code: string, filename: string): {
     violations: Array<{
       rule: string
       severity: 'high' | 'medium' | 'low'
       message: string
       suggestion: string
     }>
     score: number
     recommendation: string
   } {
    const violations: Array<{
      rule: string
      severity: 'high' | 'medium' | 'low'
      message: string
      suggestion: string
    }> = []

    // Check against each rule
    for (const rule of this.rules) {
      const violation = this.checkRule(code, rule, filename)
      if (violation) {
        violations.push(violation)
      }
    }

    // Calculate drift score (0-100, lower is better)
    const score = this.calculateDriftScore(violations, code)
    
    // Generate recommendation
    const recommendation = this.generateRecommendation(violations, score)

    return { violations, score, recommendation }
  }

  private checkRule(
    code: string, 
    rule: FramerHybridRule, 
    filename: string
  ): {
    rule: string
    severity: 'high' | 'medium' | 'low'
    message: string
    suggestion: string
  } | null {
    
    // Special case: Check component size
    if (rule.id === 'component-size-limit') {
      const lines = code.split('\n').length
      if (lines > 500) {
        return {
          rule: rule.id,
          severity: 'medium',
          message: `Component has ${lines} lines (limit: 500)`,
          suggestion: 'Break component into smaller, focused components'
        }
      }
    }

    // Pattern matching rules
    if (rule.pattern instanceof RegExp) {
      if (rule.pattern.test(code)) {
        return {
          rule: rule.id,
          severity: rule.enforcement === 'blocking' ? 'high' : rule.enforcement === 'warning' ? 'medium' : 'low',
          message: `Detected pattern: ${rule.principle}`,
          suggestion: `Consider: ${rule.examples.good[0]}`
        }
      }
    }

    return null
  }

  private calculateDriftScore(violations: any[], code: string): number {
    let score = 0
    
    // Base score from violations
    violations.forEach(violation => {
      switch (violation.severity) {
        case 'high': score += 30; break
        case 'medium': score += 15; break
        case 'low': score += 5; break
      }
    })

    // Complexity indicators
    const complexityIndicators = [
      /FrozenRouter/g,
      /usePreviousValue/g,
      /LayoutRouterContext/g,
      /complex.*animation.*system/gi,
      /over.*engineer/gi
    ]

    complexityIndicators.forEach(indicator => {
      const matches = code.match(indicator)
      if (matches) {
        score += matches.length * 10
      }
    })

    // Component size penalty
    const lines = code.split('\n').length
    if (lines > 500) {
      score += Math.floor((lines - 500) / 100) * 10
    }

    return Math.min(score, 100)
  }

  private generateRecommendation(violations: any[], score: number): string {
    if (score < 20) {
      return '✅ Good hybrid approach - maintain current patterns'
    } else if (score < 50) {
      return '⚠️ Some drift detected - review flagged patterns'
    } else {
      return '🚨 Significant AI drift - simplify and return to working patterns'
    }
  }

  /**
   * Validate a proposed change against hybrid principles
   */
  validateProposal(proposal: string, context: {
    currentlyWorking: boolean
    performanceIssue: boolean
    userRequested: boolean
    deadlineProximity: number
  }): {
    approved: boolean
    reasoning: string
    alternatives: string[]
    conditions: string[]
  } {
    const result = {
      approved: true,
      reasoning: '',
      alternatives: [] as string[],
      conditions: [] as string[]
    }

    // Rule 1: If it's working, don't change it
    if (context.currentlyWorking && !context.userRequested) {
      result.approved = false
      result.reasoning = 'Code is currently working - no changes needed'
      result.alternatives = [
        'Leave existing implementation as-is',
        'Document current patterns for future reference',
        'Focus on new features instead of refactoring'
      ]
      return result
    }

    // Rule 2: Near deadline, only critical fixes
    if (context.deadlineProximity < 7 && !context.performanceIssue) {
      result.approved = false
      result.reasoning = 'Too close to deadline for non-critical changes'
      result.alternatives = [
        'Defer optimization until after deadline',
        'Focus on mission-critical features only',
        'Document improvements for future implementation'
      ]
      return result
    }

    // Rule 3: Performance optimization requires evidence
    if (proposal.includes('optimize') && !context.performanceIssue) {
      result.approved = false
      result.reasoning = 'No evidence of performance problem'
      result.alternatives = [
        'Measure performance first',
        'Use React DevTools to identify bottlenecks',
        'Get user feedback on actual performance issues'
      ]
      return result
    }

    // Conditional approval for complex changes
    if (proposal.includes('refactor') || proposal.includes('rewrite')) {
      result.conditions = [
        'Create backup of working implementation',
        'Implement incrementally with rollback plan',
        'Test thoroughly before deployment',
        'Get user approval for each major change'
      ]
      result.reasoning = 'Complex changes require careful implementation'
    }

    return result
  }

  /**
   * Generate enforcement report
   */
  generateReport(): {
    summary: string
    rules: FramerHybridRule[]
    violations: any[]
    recommendations: string[]
  } {
    return {
      summary: `Framer Hybrid Guard: ${this.rules.length} rules active, ${this.violations.length} violations detected`,
      rules: this.rules,
      violations: this.violations,
      recommendations: [
        'Maintain working Framer Motion patterns',
        'Use hybrid approach: Framer for complex, CSS for simple',
        'Avoid over-optimization without measurement',
        'Break large components into smaller ones',
        'Work with Next.js patterns, not against them'
      ]
    }
  }
}

export default FramerHybridGuard 