#!/usr/bin/env node

/**
 * 🔗 BIASGUARD INTEGRATION - SURGICAL ANALYSIS BRIDGE
 * Connects surgical bias analyzer with existing BiasGuard system
 * Enables real-time bias analysis with human validation loops
 */

const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

class BiasGuardIntegrationBridge {
  constructor() {
    this.biasGuardEndpoint = '/api/biasagent/analyze'
    this.analysisQueue = []
    this.realTimeResults = new Map()
    this.contextEngineeringLog = []
  }

  /**
   * INTEGRATION WITH EXISTING BIASGUARD API
   */
  async analyzeSingleFileWithBiasGuard(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8')

      // Call existing BiasGuard API
      const response = await fetch(`http://localhost:3000${this.biasGuardEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: content,
          context: {
            source: 'surgical-analysis',
            filePath,
            analysisType: 'file-content',
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`BiasGuard API error: ${response.status}`)
      }

      const biasAnalysis = await response.json()
      return this.enhanceWithFileContext(biasAnalysis, filePath, content)
    } catch (error) {
      console.error(`Error analyzing ${filePath}:`, error)
      return this.createFallbackAnalysis(filePath, error)
    }
  }

  /**
   * ENHANCE BIASGUARD RESULTS WITH FILE CONTEXT
   */
  enhanceWithFileContext(biasAnalysis, filePath, content) {
    const fileMetrics = this.calculateFileMetrics(content)
    const contextualRisk = this.assessContextualRisk(filePath, content)

    return {
      ...biasAnalysis,
      fileContext: {
        path: filePath,
        type: this.getFileType(filePath),
        metrics: fileMetrics,
        contextualRisk,
        analysisTimestamp: new Date().toISOString(),
      },
      enhancedPatterns: this.addFileSpecificPatterns(
        biasAnalysis.patterns || [],
        content,
        filePath,
      ),
    }
  }

  /**
   * HUMAN-IN-THE-LOOP VALIDATION INTERFACE
   */
  async presentAnalysisForValidation(analysis, fileIndex, totalFiles) {
    console.clear()
    console.log('🔬 SURGICAL BIAS ANALYSIS - HUMAN VALIDATION')
    console.log('═'.repeat(60))
    console.log(`📁 File ${fileIndex}/${totalFiles}: ${analysis.fileContext.path}`)
    console.log(`📊 File Type: ${analysis.fileContext.type}`)
    console.log(
      `⏰ Analysis Time: ${new Date(analysis.fileContext.analysisTimestamp).toLocaleTimeString()}`,
    )
    console.log('─'.repeat(60))

    // Display BiasGuard results
    if (analysis.biasScore) {
      console.log(
        `🎯 BiasGuard Score: ${analysis.biasScore}% (${this.interpretBiasScore(analysis.biasScore)})`,
      )
    }

    if (analysis.patterns && analysis.patterns.length > 0) {
      console.log('\n🚨 BIAS PATTERNS DETECTED:')
      analysis.patterns.forEach((pattern, idx) => {
        console.log(`${idx + 1}. ${pattern.type} - ${pattern.severity}`)
        console.log(`   📝 ${pattern.description}`)
        console.log(`   🎯 Confidence: ${pattern.confidence}%`)
        if (pattern.intervention) {
          console.log(`   💡 ${pattern.intervention}`)
        }
      })
    } else {
      console.log('\n✅ No bias patterns detected by BiasGuard')
    }

    // File-specific context
    console.log('\n📋 FILE CONTEXT:')
    console.log(`   Lines of Code: ${analysis.fileContext.metrics.lineCount}`)
    console.log(`   Complexity Score: ${analysis.fileContext.metrics.complexityScore}`)
    console.log(`   Contextual Risk: ${analysis.fileContext.contextualRisk}`)

    // Human validation prompts
    const validation = await this.getHumanValidation(analysis)

    return {
      analysis,
      validation,
      agreement: this.calculateAgreement(analysis, validation),
    }
  }

  /**
   * ZERO-DRIFT METHODOLOGY IMPLEMENTATION
   */
  async performZeroDriftValidation(recentResults) {
    console.log('\n🎯 ZERO-DRIFT VALIDATION CHECKPOINT')
    console.log('─'.repeat(50))

    const driftMetrics = this.calculateDriftMetrics(recentResults)

    console.log('📊 Drift Analysis:')
    console.log(`   AI-Human Agreement: ${driftMetrics.agreement}%`)
    console.log(`   Pattern Consistency: ${driftMetrics.consistency}%`)
    console.log(`   Confidence Stability: ${driftMetrics.stability}%`)

    const driftThreshold = 85 // 85% threshold for drift detection

    if (driftMetrics.agreement < driftThreshold) {
      console.log('🚨 DRIFT DETECTED: Low AI-Human agreement')
      await this.performRecalibration('agreement', driftMetrics)
    }

    if (driftMetrics.consistency < driftThreshold) {
      console.log('🚨 DRIFT DETECTED: Pattern detection inconsistency')
      await this.performRecalibration('consistency', driftMetrics)
    }

    if (driftMetrics.stability < driftThreshold) {
      console.log('🚨 DRIFT DETECTED: Confidence score instability')
      await this.performRecalibration('stability', driftMetrics)
    }

    if (
      driftMetrics.agreement >= driftThreshold &&
      driftMetrics.consistency >= driftThreshold &&
      driftMetrics.stability >= driftThreshold
    ) {
      console.log('✅ No drift detected - Analysis quality maintained')
    }

    return driftMetrics
  }

  /**
   * CONTEXT ENGINEERING DOCUMENTATION
   */
  documentContextEngineering(result) {
    const contextRecord = {
      timestamp: new Date().toISOString(),
      filePath: result.analysis.fileContext.path,
      biasGuardResults: {
        score: result.analysis.biasScore,
        patterns: result.analysis.patterns?.length || 0,
        confidence: result.analysis.confidence,
      },
      humanValidation: {
        agreement: result.validation.agreesWithAI,
        confidence: result.validation.confidence,
        additionalPatterns: result.validation.additionalPatterns.length,
        corrections: result.validation.corrections.length,
      },
      contextEngineering: {
        aiHumanAlignment: result.agreement,
        biasRiskLevel: this.assessOverallRisk(result.analysis),
        qualityScore: this.calculateQualityScore(result),
        driftRisk: this.assessDriftRisk(result),
      },
    }

    this.contextEngineeringLog.push(contextRecord)
    this.saveContextEngineeringRecord(contextRecord)

    return contextRecord
  }

  /**
   * UTILITY METHODS
   */
  calculateFileMetrics(content) {
    const lines = content.split('\n')
    const lineCount = lines.length
    const nonEmptyLines = lines.filter((line) => line.trim().length > 0).length
    const commentLines = lines.filter(
      (line) => line.trim().startsWith('//') || line.trim().startsWith('*'),
    ).length

    // Simple complexity heuristic
    const complexityIndicators = [
      /if\s*\(/g,
      /for\s*\(/g,
      /while\s*\(/g,
      /switch\s*\(/g,
      /catch\s*\(/g,
      /function\s+\w+/g,
      /=>\s*{/g,
    ]

    const complexityScore = complexityIndicators.reduce((score, pattern) => {
      const matches = content.match(pattern)
      return score + (matches ? matches.length : 0)
    }, 0)

    return {
      lineCount,
      nonEmptyLines,
      commentLines,
      commentRatio: commentLines / lineCount,
      complexityScore,
      complexityPerLine: complexityScore / lineCount,
    }
  }

  assessContextualRisk(filePath, content) {
    let riskScore = 0

    // File type risk
    if (filePath.includes('bias-detection') || filePath.includes('ai-')) {
      riskScore += 30 // High risk for AI/bias files
    }

    if (filePath.includes('api/') || filePath.includes('route.ts')) {
      riskScore += 20 // Medium-high risk for API files
    }

    // Content risk indicators
    const riskPatterns = [
      /expert.*panel/gi,
      /proven.*methodology/gi,
      /guaranteed.*success/gi,
      /always.*works/gi,
      /never.*fails/gi,
    ]

    riskPatterns.forEach((pattern) => {
      if (pattern.test(content)) {
        riskScore += 15
      }
    })

    // Normalize to 0-100 scale
    riskScore = Math.min(riskScore, 100)

    if (riskScore >= 70) return 'high'
    if (riskScore >= 40) return 'medium'
    return 'low'
  }

  getFileType(filePath) {
    const ext = path.extname(filePath)
    const dir = path.dirname(filePath)

    if (ext === '.md') return 'documentation'
    if (ext === '.json') return 'configuration'
    if (dir.includes('api/')) return 'api-route'
    if (dir.includes('components/')) return 'component'
    if (dir.includes('lib/')) return 'utility'
    if (dir.includes('agents/')) return 'ai-agent'

    return 'source-code'
  }

  interpretBiasScore(score) {
    if (score >= 80) return 'HIGH BIAS RISK'
    if (score >= 60) return 'MODERATE BIAS RISK'
    if (score >= 40) return 'LOW BIAS RISK'
    return 'MINIMAL BIAS RISK'
  }

  async getHumanValidation(analysis) {
    const readline = require('readline')
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const askQuestion = (question) => {
      return new Promise((resolve) => {
        rl.question(question, (answer) => {
          resolve(answer)
        })
      })
    }

    console.log('\n👤 HUMAN VALIDATION REQUIRED:')
    console.log('─'.repeat(50))

    const validation = {
      agreesWithAI: await askQuestion('Do you agree with BiasGuard analysis? (y/n/p): '),
      confidence: parseInt(await askQuestion('Your confidence (0-100): ')),
      additionalPatterns: [],
      corrections: [],
      notes: await askQuestion('Additional notes (optional): '),
    }

    if (validation.agreesWithAI.toLowerCase() !== 'y') {
      const corrections = await askQuestion('What corrections are needed? ')
      validation.corrections.push(corrections)
    }

    if (!analysis.patterns || analysis.patterns.length === 0) {
      const additionalPatterns = await askQuestion('Any patterns BiasGuard missed? (or "none"): ')
      if (additionalPatterns.toLowerCase() !== 'none') {
        validation.additionalPatterns.push(additionalPatterns)
      }
    }

    rl.close()
    return validation
  }

  calculateAgreement(analysis, validation) {
    const agreementMap = { y: 1.0, p: 0.5, n: 0.0 }
    return agreementMap[validation.agreesWithAI.toLowerCase()] || 0.0
  }

  calculateDriftMetrics(results) {
    if (results.length === 0) return { agreement: 100, consistency: 100, stability: 100 }

    const agreements = results.map((r) => r.agreement)
    const avgAgreement = (agreements.reduce((a, b) => a + b, 0) / agreements.length) * 100

    const biasScores = results.map((r) => r.analysis.biasScore || 0)
    const scoreVariance = this.calculateVariance(biasScores)
    const stability = Math.max(0, 100 - scoreVariance)

    const patternCounts = results.map((r) => r.analysis.patterns?.length || 0)
    const patternVariance = this.calculateVariance(patternCounts)
    const consistency = Math.max(0, 100 - patternVariance * 10)

    return {
      agreement: Math.round(avgAgreement),
      consistency: Math.round(consistency),
      stability: Math.round(stability),
    }
  }

  calculateVariance(numbers) {
    if (numbers.length === 0) return 0
    const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length
    const variance = numbers.reduce((acc, num) => acc + (num - mean) ** 2, 0) / numbers.length
    return Math.sqrt(variance)
  }

  saveContextEngineeringRecord(record) {
    const logFile = 'context-engineering-log.json'
    let existingLog = []

    try {
      if (fs.existsSync(logFile)) {
        existingLog = JSON.parse(fs.readFileSync(logFile, 'utf8'))
      }
    } catch (error) {
      console.warn('Could not read existing context engineering log')
    }

    existingLog.push(record)
    fs.writeFileSync(logFile, JSON.stringify(existingLog, null, 2))
  }

  createFallbackAnalysis(filePath, error) {
    return {
      biasScore: 0,
      patterns: [],
      confidence: 0,
      error: error.message,
      fileContext: {
        path: filePath,
        type: this.getFileType(filePath),
        metrics: { lineCount: 0, complexityScore: 0 },
        contextualRisk: 'unknown',
        analysisTimestamp: new Date().toISOString(),
      },
    }
  }

  /**
   * MAIN EXECUTION METHOD
   */
  async runIntegratedAnalysis(filePaths) {
    console.log('🔗 BIASGUARD INTEGRATION - SURGICAL ANALYSIS')
    console.log('═'.repeat(60))

    const results = []

    for (let i = 0; i < filePaths.length; i++) {
      const filePath = filePaths[i]
      console.log(`\n🔍 Analyzing ${i + 1}/${filePaths.length}: ${filePath}`)

      try {
        const analysis = await this.analyzeSingleFileWithBiasGuard(filePath)
        const result = await this.presentAnalysisForValidation(analysis, i + 1, filePaths.length)

        // Document for context engineering
        const contextRecord = this.documentContextEngineering(result)
        results.push(result)

        console.log(`✅ Analysis completed for ${filePath}`)

        // Zero-drift check every 10 files
        if ((i + 1) % 10 === 0) {
          await this.performZeroDriftValidation(results.slice(-10))
        }
      } catch (error) {
        console.error(`❌ Failed to analyze ${filePath}:`, error)
      }
    }

    console.log('\n🎯 INTEGRATED ANALYSIS COMPLETE')
    console.log(`📊 Files analyzed: ${results.length}`)
    console.log(`📋 Context engineering log: context-engineering-log.json`)

    return results
  }
}

module.exports = BiasGuardIntegrationBridge

// CLI execution
if (require.main === module) {
  const bridge = new BiasGuardIntegrationBridge()

  // Get file paths from command line arguments
  const filePaths = process.argv.slice(2)

  if (filePaths.length === 0) {
    console.log('Usage: node bias-analysis-integration.js <file1> <file2> ...')
    console.log(
      'Example: node bias-analysis-integration.js src/agents/bias-detection/unified-biasguard.ts',
    )
    process.exit(1)
  }

  bridge
    .runIntegratedAnalysis(filePaths)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Integration failed:', error)
      process.exit(1)
    })
}
