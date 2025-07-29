#!/usr/bin/env node

/**
 * 🔬 SURGICAL BIAS ANALYSIS - ZERO DRIFT METHODOLOGY
 * Human-in-the-loop bias analysis for JAHmere Webb Freedom Portal
 *
 * Methodology:
 * 1. Intelligent file prioritization
 * 2. One-by-one analysis with human validation
 * 3. Context engineering documentation
 * 4. Zero-drift validation checkpoints
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

class SurgicalBiasAnalyzer {
  constructor() {
    this.analysisLog = []
    this.criticalFiles = []
    this.completedFiles = new Set()
    this.biasPatterns = new Map()
    this.humanValidations = []

    // Zero-drift validation checkpoints
    this.driftCheckpoints = {
      confidence: 0.85, // Minimum confidence threshold
      humanAgreement: 0.9, // Human-AI agreement threshold
      patternConsistency: 0.8, // Pattern detection consistency
    }

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
  }

  /**
   * PHASE 1: INTELLIGENT FILE PRIORITIZATION
   * Identify high-risk files based on bias potential
   */
  async prioritizeFiles() {
    console.log('\n🎯 PHASE 1: INTELLIGENT FILE PRIORITIZATION\n')

    const allFiles = this.getAllSourceFiles()
    const prioritizedFiles = this.categorizeFilesByBiasRisk(allFiles)

    console.log('📊 File Prioritization Results:')
    console.log(`🔴 Critical Risk: ${prioritizedFiles.critical.length} files`)
    console.log(`🟡 High Risk: ${prioritizedFiles.high.length} files`)
    console.log(`🟢 Medium Risk: ${prioritizedFiles.medium.length} files`)
    console.log(`⚪ Low Risk: ${prioritizedFiles.low.length} files`)

    return prioritizedFiles
  }

  /**
   * PHASE 2: SURGICAL ANALYSIS WITH HUMAN VALIDATION
   */
  async performSurgicalAnalysis(prioritizedFiles) {
    console.log('\n🔬 PHASE 2: SURGICAL ANALYSIS WITH HUMAN VALIDATION\n')

    // Start with critical files
    const analysisOrder = [
      ...prioritizedFiles.critical,
      ...prioritizedFiles.high,
      ...prioritizedFiles.medium,
      ...prioritizedFiles.low,
    ]

    for (let i = 0; i < analysisOrder.length; i++) {
      const file = analysisOrder[i]
      console.log(`\n📁 Analyzing File ${i + 1}/${analysisOrder.length}: ${file}`)

      await this.analyzeFileWithHumanLoop(file, i + 1, analysisOrder.length)

      // Zero-drift checkpoint every 10 files
      if ((i + 1) % 10 === 0) {
        await this.performZeroDriftCheck()
      }
    }
  }

  /**
   * SINGLE FILE ANALYSIS WITH HUMAN VALIDATION
   */
  async analyzeFileWithHumanLoop(filePath, current, total) {
    try {
      // 1. Read file content
      const content = fs.readFileSync(filePath, 'utf8')

      // 2. AI Analysis
      const aiAnalysis = await this.performAIAnalysis(filePath, content)

      // 3. Present findings to human
      console.log('\n🤖 AI ANALYSIS RESULTS:')
      console.log('─'.repeat(50))
      console.log(`File: ${filePath}`)
      console.log(`Risk Level: ${aiAnalysis.riskLevel}`)
      console.log(`Confidence: ${aiAnalysis.confidence}%`)

      if (aiAnalysis.patterns.length > 0) {
        console.log('\n🚨 BIAS PATTERNS DETECTED:')
        aiAnalysis.patterns.forEach((pattern, idx) => {
          console.log(`${idx + 1}. ${pattern.type} (${pattern.severity})`)
          console.log(`   Description: ${pattern.description}`)
          console.log(`   Confidence: ${pattern.confidence}%`)
        })
      } else {
        console.log('\n✅ No bias patterns detected')
      }

      // 4. Human validation
      const humanValidation = await this.getHumanValidation(aiAnalysis)

      // 5. Document results
      this.documentAnalysis(filePath, aiAnalysis, humanValidation)

      // 6. Update progress
      this.completedFiles.add(filePath)
      console.log(`\n📊 Progress: ${current}/${total} files analyzed`)
    } catch (error) {
      console.error(`❌ Error analyzing ${filePath}:`, error.message)
      await this.handleAnalysisError(filePath, error)
    }
  }

  /**
   * AI ANALYSIS ENGINE
   */
  async performAIAnalysis(filePath, content) {
    const patterns = []
    let riskLevel = 'low'
    let confidence = 0

    // Pattern detection based on file type and content
    const fileType = this.getFileType(filePath)

    // 1. Success Declaration Bias
    if (this.detectSuccessDeclaration(content)) {
      patterns.push({
        type: 'success-declaration',
        severity: 'high',
        confidence: 90,
        description: 'Code declares success before validation',
        location: this.findPatternLocation(content, /success|complete|done|finished/gi),
      })
    }

    // 2. Complexity Inflation Bias
    if (this.detectComplexityInflation(content, filePath)) {
      patterns.push({
        type: 'complexity-inflation',
        severity: 'medium',
        confidence: 75,
        description: 'Unnecessarily complex implementation detected',
        location: this.findComplexityIndicators(content),
      })
    }

    // 3. Authority Simulation Bias
    if (this.detectAuthoritySimulation(content)) {
      patterns.push({
        type: 'authority-simulation',
        severity: 'high',
        confidence: 85,
        description: 'Code simulates expertise without backing',
        location: this.findAuthorityPatterns(content),
      })
    }

    // 4. Binary Thinking Bias
    if (this.detectBinaryThinking(content)) {
      patterns.push({
        type: 'binary-thinking',
        severity: 'medium',
        confidence: 70,
        description: 'Code uses binary logic where nuance needed',
        location: this.findBinaryPatterns(content),
      })
    }

    // Calculate overall risk and confidence
    if (patterns.length > 0) {
      riskLevel = this.calculateRiskLevel(patterns)
      confidence = this.calculateOverallConfidence(patterns)
    } else {
      confidence = 95 // High confidence in clean code
    }

    return {
      filePath,
      riskLevel,
      confidence,
      patterns,
      fileType,
      analysisTimestamp: new Date().toISOString(),
    }
  }

  /**
   * HUMAN VALIDATION INTERFACE
   */
  async getHumanValidation(aiAnalysis) {
    console.log('\n👤 HUMAN VALIDATION REQUIRED:')
    console.log('─'.repeat(50))

    const validation = {
      agreesWithAI: null,
      confidence: null,
      additionalPatterns: [],
      corrections: [],
      notes: '',
      timestamp: new Date().toISOString(),
    }

    // 1. Overall agreement
    const agreement = await this.askQuestion(
      `Do you agree with the AI analysis? (y/n/p for partial): `,
    )
    validation.agreesWithAI = agreement.toLowerCase()

    // 2. Human confidence
    const humanConfidence = await this.askQuestion(`Your confidence in this analysis (0-100): `)
    validation.confidence = parseInt(humanConfidence)

    // 3. Additional patterns
    if (aiAnalysis.patterns.length === 0) {
      const additionalPatterns = await this.askQuestion(
        `Do you see any bias patterns the AI missed? (describe or 'none'): `,
      )
      if (additionalPatterns.toLowerCase() !== 'none') {
        validation.additionalPatterns.push(additionalPatterns)
      }
    }

    // 4. Corrections
    if (validation.agreesWithAI === 'n' || validation.agreesWithAI === 'p') {
      const corrections = await this.askQuestion(`What corrections are needed? (describe): `)
      validation.corrections.push(corrections)
    }

    // 5. Notes
    const notes = await this.askQuestion(`Any additional notes? (optional): `)
    validation.notes = notes

    return validation
  }

  /**
   * ZERO-DRIFT VALIDATION CHECKPOINT
   */
  async performZeroDriftCheck() {
    console.log('\n🎯 ZERO-DRIFT VALIDATION CHECKPOINT')
    console.log('─'.repeat(50))

    const recentAnalyses = this.analysisLog.slice(-10)
    const driftMetrics = this.calculateDriftMetrics(recentAnalyses)

    console.log(`📊 Drift Metrics:`)
    console.log(`   AI Confidence Avg: ${driftMetrics.avgConfidence}%`)
    console.log(`   Human Agreement: ${driftMetrics.humanAgreement}%`)
    console.log(`   Pattern Consistency: ${driftMetrics.patternConsistency}%`)

    // Check thresholds
    const driftDetected =
      driftMetrics.avgConfidence < this.driftCheckpoints.confidence * 100 ||
      driftMetrics.humanAgreement < this.driftCheckpoints.humanAgreement * 100 ||
      driftMetrics.patternConsistency < this.driftCheckpoints.patternConsistency * 100

    if (driftDetected) {
      console.log('🚨 DRIFT DETECTED - Recalibration needed')
      await this.performRecalibration()
    } else {
      console.log('✅ No drift detected - Analysis quality maintained')
    }
  }

  /**
   * CONTEXT ENGINEERING DOCUMENTATION
   */
  documentAnalysis(filePath, aiAnalysis, humanValidation) {
    const analysisRecord = {
      timestamp: new Date().toISOString(),
      filePath,
      aiAnalysis,
      humanValidation,
      agreement: this.calculateAgreementScore(aiAnalysis, humanValidation),
      contextEngineering: {
        biasRiskLevel: aiAnalysis.riskLevel,
        humanConfidence: humanValidation.confidence,
        aiConfidence: aiAnalysis.confidence,
        patternsDetected: aiAnalysis.patterns.length,
        humanCorrections: humanValidation.corrections.length,
      },
    }

    this.analysisLog.push(analysisRecord)

    // Save to file for persistent documentation
    this.saveAnalysisRecord(analysisRecord)
  }

  /**
   * UTILITY METHODS
   */
  getAllSourceFiles() {
    const extensions = ['.ts', '.tsx', '.js', '.jsx', '.md']
    const excludeDirs = ['node_modules', '.next', '.git', 'dist', 'build']

    const files = []

    const scanDir = (dir) => {
      try {
        const items = fs.readdirSync(dir)

        for (const item of items) {
          const fullPath = path.join(dir, item)
          const stat = fs.statSync(fullPath)

          if (stat.isDirectory() && !excludeDirs.includes(item)) {
            scanDir(fullPath)
          } else if (stat.isFile() && extensions.some((ext) => item.endsWith(ext))) {
            files.push(fullPath)
          }
        }
      } catch (error) {
        // Skip inaccessible directories
      }
    }

    scanDir('.')
    return files
  }

  categorizeFilesByBiasRisk(files) {
    const categories = {
      critical: [],
      high: [],
      medium: [],
      low: [],
    }

    files.forEach((file) => {
      const risk = this.assessFileBiasRisk(file)
      categories[risk].push(file)
    })

    return categories
  }

  assessFileBiasRisk(filePath) {
    // Critical: AI agents, bias detection, analysis tools
    if (
      filePath.includes('bias-detection') ||
      filePath.includes('agents/') ||
      filePath.includes('ai-') ||
      filePath.includes('analysis')
    ) {
      return 'critical'
    }

    // High: API routes, core components, orchestration
    if (
      filePath.includes('api/') ||
      filePath.includes('orchestrator') ||
      filePath.includes('core/') ||
      filePath.includes('lib/')
    ) {
      return 'high'
    }

    // Medium: UI components, pages
    if (
      filePath.includes('components/') ||
      filePath.includes('app/') ||
      filePath.includes('pages/')
    ) {
      return 'medium'
    }

    // Low: Config, tests, docs
    return 'low'
  }

  // Pattern detection methods
  detectSuccessDeclaration(content) {
    const patterns = [
      /success.*complete/gi,
      /perfectly.*working/gi,
      /done.*finished/gi,
      /ready.*deploy/gi,
    ]

    return patterns.some((pattern) => pattern.test(content))
  }

  detectComplexityInflation(content, filePath) {
    const complexityIndicators = [
      /class.*extends.*extends/gi, // Multiple inheritance
      /interface.*extends.*extends.*extends/gi, // Deep interface chains
      /async.*await.*async.*await.*async/gi, // Excessive async chaining
      /\.then\(.*\.then\(.*\.then\(/gi, // Promise chaining
    ]

    const lineCount = content.split('\n').length
    const complexityScore = complexityIndicators.filter((pattern) => pattern.test(content)).length

    // Simple heuristic: complexity inflation if high complexity in small files
    return lineCount < 200 && complexityScore > 2
  }

  detectAuthoritySimulation(content) {
    const authorityPatterns = [
      /expert.*panel/gi,
      /senior.*architect/gi,
      /proven.*methodology/gi,
      /industry.*standard/gi,
      /best.*practice.*guaranteed/gi,
    ]

    return authorityPatterns.some((pattern) => pattern.test(content))
  }

  detectBinaryThinking(content) {
    const binaryPatterns = [
      /always.*never/gi,
      /must.*should.*must/gi,
      /only.*way/gi,
      /right.*wrong.*only/gi,
    ]

    return binaryPatterns.some((pattern) => pattern.test(content))
  }

  // Helper methods
  async askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer)
      })
    })
  }

  calculateAgreementScore(aiAnalysis, humanValidation) {
    if (humanValidation.agreesWithAI === 'y') return 1.0
    if (humanValidation.agreesWithAI === 'p') return 0.5
    return 0.0
  }

  saveAnalysisRecord(record) {
    const logFile = 'bias-analysis-log.json'
    let existingLog = []

    try {
      if (fs.existsSync(logFile)) {
        existingLog = JSON.parse(fs.readFileSync(logFile, 'utf8'))
      }
    } catch (error) {
      console.warn('Could not read existing log file')
    }

    existingLog.push(record)
    fs.writeFileSync(logFile, JSON.stringify(existingLog, null, 2))
  }

  // Main execution
  async run() {
    try {
      console.log('🔬 SURGICAL BIAS ANALYSIS - ZERO DRIFT METHODOLOGY')
      console.log('═'.repeat(60))

      const prioritizedFiles = await this.prioritizeFiles()
      await this.performSurgicalAnalysis(prioritizedFiles)

      console.log('\n✅ SURGICAL BIAS ANALYSIS COMPLETE')
      console.log(`📊 Total files analyzed: ${this.completedFiles.size}`)
      console.log(`📋 Analysis log saved to: bias-analysis-log.json`)
    } catch (error) {
      console.error('❌ Analysis failed:', error)
    } finally {
      this.rl.close()
    }
  }
}

// Execute if run directly
if (require.main === module) {
  const analyzer = new SurgicalBiasAnalyzer()
  analyzer.run()
}

module.exports = SurgicalBiasAnalyzer
