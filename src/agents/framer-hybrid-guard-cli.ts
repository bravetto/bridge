#!/usr/bin/env node

/**
 * 🎯 FRAMER HYBRID GUARD CLI
 * Test the hybrid guard against current codebase
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import FramerHybridGuard from './framer-hybrid-guard'

function main() {
  console.log('🎯 FRAMER HYBRID GUARD - AI Drift Prevention Analysis\n')
  
  const guard = FramerHybridGuard.getInstance()
  
  // Test against the current landing page
  const landingPagePath = join(process.cwd(), 'src/components/ui/landing-page-2025.tsx')
  
  try {
    const code = readFileSync(landingPagePath, 'utf-8')
    console.log(`📁 Analyzing: ${landingPagePath}`)
    console.log(`📏 File size: ${code.split('\n').length} lines\n`)
    
    const analysis = guard.analyzeCode(code, 'landing-page-2025.tsx')
    
    console.log('📊 ANALYSIS RESULTS:')
    console.log(`   Drift Score: ${analysis.score}/100`)
    console.log(`   Recommendation: ${analysis.recommendation}\n`)
    
    if (analysis.violations.length > 0) {
      console.log('⚠️  VIOLATIONS DETECTED:')
      analysis.violations.forEach((violation, index) => {
        console.log(`   ${index + 1}. [${violation.severity.toUpperCase()}] ${violation.rule}`)
        console.log(`      Message: ${violation.message}`)
        console.log(`      Suggestion: ${violation.suggestion}\n`)
      })
    } else {
      console.log('✅ No violations detected!\n')
    }
    
    // Test proposal validation
    console.log('🧪 TESTING PROPOSAL VALIDATION:')
    
    const testProposals = [
      {
        proposal: 'Refactor landing-page-2025.tsx to use CSS animations instead of Framer Motion',
        context: { currentlyWorking: true, performanceIssue: false, userRequested: false, deadlineProximity: 5 }
      },
      {
        proposal: 'Add FrozenRouter wrapper to fix Perfect Storm issues',
        context: { currentlyWorking: true, performanceIssue: false, userRequested: false, deadlineProximity: 30 }
      },
      {
        proposal: 'Optimize animation performance based on user feedback',
        context: { currentlyWorking: true, performanceIssue: true, userRequested: true, deadlineProximity: 30 }
      }
    ]
    
    testProposals.forEach((test, index) => {
      console.log(`\n   Test ${index + 1}: "${test.proposal}"`)
      const validation = guard.validateProposal(test.proposal, test.context)
      console.log(`   Approved: ${validation.approved ? '✅' : '❌'}`)
      console.log(`   Reasoning: ${validation.reasoning}`)
      
      if (validation.alternatives.length > 0) {
        console.log(`   Alternatives:`)
        validation.alternatives.forEach(alt => console.log(`     - ${alt}`))
      }
      
      if (validation.conditions.length > 0) {
        console.log(`   Conditions:`)
        validation.conditions.forEach(cond => console.log(`     - ${cond}`))
      }
    })
    
    // Generate full report
    console.log('\n📋 FULL GUARD REPORT:')
    const report = guard.generateReport()
    console.log(`   ${report.summary}`)
    console.log(`\n   Active Rules: ${report.rules.length}`)
    report.rules.forEach(rule => {
      console.log(`     - ${rule.id}: ${rule.principle} [${rule.enforcement}]`)
    })
    
    console.log('\n   Key Recommendations:')
    report.recommendations.forEach(rec => console.log(`     - ${rec}`))
    
  } catch (error) {
    console.error('❌ Error analyzing file:', error)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
} 