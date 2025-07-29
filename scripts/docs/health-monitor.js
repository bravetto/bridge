#!/usr/bin/env node

/**
 * 📊 DOCUMENTATION HEALTH MONITOR
 * Continuous monitoring and alerting for documentation quality
 *
 * Features:
 * - Real-time health scoring
 * - Performance metrics tracking
 * - Regression detection
 * - Automated alerts and notifications
 * - Historical trend analysis
 */

const fs = require('fs')
const path = require('path')

class HealthMonitor {
  constructor() {
    this.rootDir = process.cwd()
    this.docsDir = path.join(this.rootDir, 'docs')
    this.metricsFile = path.join(this.rootDir, 'docs', 'health-metrics.json')
    this.alertsFile = path.join(this.rootDir, 'docs', 'health-alerts.json')

    // Health thresholds
    this.thresholds = {
      excellent: { min: 95, max: 100 },
      good: { min: 85, max: 94 },
      fair: { min: 70, max: 84 },
      poor: { min: 0, max: 69 },
    }

    // Performance benchmarks (from our optimization)
    this.benchmarks = {
      maxActiveFiles: 25,
      maxTotalSizeMB: 10,
      maxBrokenLinks: 0,
      maxMissingFiles: 0,
      targetSearchTime: 30, // seconds
      optimizationLevel: 89, // percentage reduction achieved
    }
  }

  /**
   * 🔍 Monitor documentation health
   */
  async monitor() {
    console.log('📊 Starting documentation health monitoring...\n')

    try {
      const metrics = await this.collectMetrics()
      const healthScore = await this.calculateHealthScore(metrics)
      const alerts = await this.checkForAlerts(metrics)

      await this.saveMetrics(metrics, healthScore)
      await this.generateHealthReport(metrics, healthScore, alerts)

      if (alerts.length > 0) {
        await this.handleAlerts(alerts)
      }

      console.log('✅ Health monitoring complete!\n')
      return { metrics, healthScore, alerts }
    } catch (error) {
      console.error('❌ Health monitoring failed:', error.message)
      process.exit(1)
    }
  }

  /**
   * 📈 Collect comprehensive metrics
   */
  async collectMetrics() {
    console.log('📈 Collecting metrics...')

    const markdownFiles = await this.findMarkdownFiles()
    const activeFiles = markdownFiles.filter(
      (file) =>
        !file.includes('archive/') &&
        !file.includes('node_modules/') &&
        !file.includes('.documentation-backup/'),
    )

    // File metrics
    let totalSize = 0
    let totalLines = 0
    let emptyFiles = 0
    let largeFiles = 0

    for (const file of activeFiles) {
      const stats = fs.statSync(file)
      const content = fs.readFileSync(file, 'utf-8')
      const lines = content.split('\n').length

      totalSize += stats.size
      totalLines += lines

      if (content.trim().length < 100) emptyFiles++
      if (stats.size > 100 * 1024) largeFiles++ // > 100KB
    }

    // Link validation
    const brokenLinks = await this.findBrokenLinks(activeFiles)
    const outdatedReferences = await this.findOutdatedReferences(activeFiles)

    // Content quality metrics
    const contentQuality = await this.assessContentQuality(activeFiles)

    // Performance metrics
    const performance = {
      totalSizeMB: (totalSize / (1024 * 1024)).toFixed(2),
      averageFileSize: Math.round(totalSize / activeFiles.length / 1024), // KB
      totalLines,
      averageLinesPerFile: Math.round(totalLines / activeFiles.length),
    }

    const metrics = {
      timestamp: new Date().toISOString(),
      files: {
        total: markdownFiles.length,
        active: activeFiles.length,
        archived: markdownFiles.length - activeFiles.length,
        empty: emptyFiles,
        large: largeFiles,
      },
      size: performance,
      quality: {
        brokenLinks: brokenLinks.length,
        outdatedReferences: outdatedReferences.length,
        contentQuality,
      },
      optimization: {
        fileReduction: (((192 - activeFiles.length) / 192) * 100).toFixed(1),
        meetsBenchmark: activeFiles.length <= this.benchmarks.maxActiveFiles,
      },
    }

    console.log(`   📊 Active files: ${metrics.files.active}`)
    console.log(`   📊 Total size: ${performance.totalSizeMB}MB`)
    console.log(`   📊 Broken links: ${metrics.quality.brokenLinks}`)

    return metrics
  }

  /**
   * 🔗 Find broken links
   */
  async findBrokenLinks(files) {
    const brokenLinks = []

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf-8')
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
      let match

      while ((match = linkRegex.exec(content)) !== null) {
        const [, linkText, linkUrl] = match

        // Skip external links
        if (linkUrl.startsWith('http') || linkUrl.startsWith('mailto:')) {
          continue
        }

        // Check if internal link exists
        const targetPath = path.resolve(path.dirname(filePath), linkUrl)
        if (!fs.existsSync(targetPath)) {
          brokenLinks.push({
            file: path.relative(this.rootDir, filePath),
            link: linkUrl,
            text: linkText,
          })
        }
      }
    }

    return brokenLinks
  }

  /**
   * 📚 Find outdated references
   */
  async findOutdatedReferences(files) {
    const outdatedRefs = []
    const deletedPatterns = [
      'COMPONENT_PATTERNS.md',
      'technical.md',
      'scope.md',
      'QUICK_START_GUIDE.md',
      'BUILD_.*\\.md',
      'PROJECT_RECOVERY.md',
    ]

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf-8')

      deletedPatterns.forEach((pattern) => {
        const regex = new RegExp(pattern, 'gi')
        if (regex.test(content)) {
          outdatedRefs.push({
            file: path.relative(this.rootDir, filePath),
            pattern,
          })
        }
      })
    }

    return outdatedRefs
  }

  /**
   * 📝 Assess content quality
   */
  async assessContentQuality(files) {
    let totalScore = 0
    let assessedFiles = 0

    for (const filePath of files) {
      const content = fs.readFileSync(filePath, 'utf-8')
      let fileScore = 100

      // Deduct points for quality issues
      if (content.trim().length < 500) fileScore -= 20 // Too short
      if (!content.includes('# ')) fileScore -= 10 // No main heading
      if (content.includes('TODO') || content.includes('FIXME')) fileScore -= 5
      if (!content.includes('\n## ')) fileScore -= 5 // No subheadings

      // Add points for good practices
      if (content.includes('**Status**:')) fileScore += 5
      if (content.includes('**Last Updated**:')) fileScore += 5
      if (content.includes('## Table of Contents') || content.includes('## 📚 TABLE OF CONTENTS'))
        fileScore += 10

      totalScore += Math.max(0, fileScore)
      assessedFiles++
    }

    return Math.round(totalScore / assessedFiles)
  }

  /**
   * 🎯 Calculate overall health score
   */
  async calculateHealthScore(metrics) {
    let score = 100

    // File count penalty (regression detection)
    if (metrics.files.active > this.benchmarks.maxActiveFiles) {
      const excess = metrics.files.active - this.benchmarks.maxActiveFiles
      score -= excess * 2 // 2 points per excess file
    }

    // Size penalty
    if (metrics.size.totalSizeMB > this.benchmarks.maxTotalSizeMB) {
      score -= 10
    }

    // Quality penalties
    score -= metrics.quality.brokenLinks * 5 // 5 points per broken link
    score -= metrics.quality.outdatedReferences * 2 // 2 points per outdated ref
    score -= Math.max(0, (100 - metrics.quality.contentQuality) * 0.3) // Content quality impact

    // Empty files penalty
    score -= metrics.files.empty * 3 // 3 points per empty file

    // Bonuses for maintaining optimization
    if (metrics.files.active <= this.benchmarks.maxActiveFiles) score += 5
    if (metrics.quality.brokenLinks === 0) score += 10
    if (metrics.size.totalSizeMB <= this.benchmarks.maxTotalSizeMB) score += 5

    return Math.max(0, Math.min(100, Math.round(score)))
  }

  /**
   * 🚨 Check for alerts
   */
  async checkForAlerts(metrics) {
    const alerts = []

    // Critical alerts
    if (metrics.files.active > this.benchmarks.maxActiveFiles + 5) {
      alerts.push({
        level: 'critical',
        type: 'file_count_regression',
        message: `Active file count (${metrics.files.active}) significantly exceeds optimized limit (${this.benchmarks.maxActiveFiles})`,
        action: 'Review and consolidate or archive excess files',
      })
    }

    if (metrics.quality.brokenLinks > 5) {
      alerts.push({
        level: 'critical',
        type: 'broken_links',
        message: `High number of broken links (${metrics.quality.brokenLinks}) detected`,
        action: 'Run automated link repair system',
      })
    }

    // Warning alerts
    if (metrics.files.active > this.benchmarks.maxActiveFiles) {
      alerts.push({
        level: 'warning',
        type: 'file_count_increase',
        message: `Active file count (${metrics.files.active}) exceeds optimized limit (${this.benchmarks.maxActiveFiles})`,
        action: 'Consider consolidating or archiving files',
      })
    }

    if (metrics.size.totalSizeMB > this.benchmarks.maxTotalSizeMB) {
      alerts.push({
        level: 'warning',
        type: 'size_increase',
        message: `Documentation size (${metrics.size.totalSizeMB}MB) exceeds limit (${this.benchmarks.maxTotalSizeMB}MB)`,
        action: 'Review large files and optimize content',
      })
    }

    if (metrics.quality.outdatedReferences > 10) {
      alerts.push({
        level: 'warning',
        type: 'outdated_references',
        message: `Many outdated references (${metrics.quality.outdatedReferences}) found`,
        action: 'Update references to current documentation',
      })
    }

    // Info alerts
    if (metrics.files.empty > 0) {
      alerts.push({
        level: 'info',
        type: 'empty_files',
        message: `${metrics.files.empty} empty or minimal files detected`,
        action: 'Review and either populate or remove empty files',
      })
    }

    return alerts
  }

  /**
   * 💾 Save metrics for historical tracking
   */
  async saveMetrics(metrics, healthScore) {
    const record = {
      ...metrics,
      healthScore,
      healthLevel: this.getHealthLevel(healthScore),
    }

    let history = []
    if (fs.existsSync(this.metricsFile)) {
      history = JSON.parse(fs.readFileSync(this.metricsFile, 'utf-8'))
    }

    history.push(record)

    // Keep last 30 records
    if (history.length > 30) {
      history = history.slice(-30)
    }

    fs.writeFileSync(this.metricsFile, JSON.stringify(history, null, 2))
  }

  /**
   * 📊 Get health level from score
   */
  getHealthLevel(score) {
    if (score >= this.thresholds.excellent.min) return 'excellent'
    if (score >= this.thresholds.good.min) return 'good'
    if (score >= this.thresholds.fair.min) return 'fair'
    return 'poor'
  }

  /**
   * 📋 Generate health report
   */
  async generateHealthReport(metrics, healthScore, alerts) {
    const healthLevel = this.getHealthLevel(healthScore)
    const healthEmoji = {
      excellent: '🟢',
      good: '🟡',
      fair: '🟠',
      poor: '🔴',
    }

    const report = `# 📊 Documentation Health Report
**Generated**: ${new Date().toLocaleString()}  
**Health Score**: ${healthScore}/100 ${healthEmoji[healthLevel]} (${healthLevel.toUpperCase()})  
**Optimization Level**: ${metrics.optimization.fileReduction}% file reduction maintained  

## 📈 Key Metrics
- **Active Files**: ${metrics.files.active} / ${this.benchmarks.maxActiveFiles} (benchmark)
- **Total Size**: ${metrics.size.totalSizeMB}MB / ${this.benchmarks.maxTotalSizeMB}MB (limit)
- **Broken Links**: ${metrics.quality.brokenLinks}
- **Content Quality**: ${metrics.quality.contentQuality}/100
- **Archived Files**: ${metrics.files.archived}

## 🎯 Performance vs Benchmarks
- **File Count**: ${metrics.files.active <= this.benchmarks.maxActiveFiles ? '✅' : '❌'} ${metrics.files.active <= this.benchmarks.maxActiveFiles ? 'Within limit' : 'Exceeds limit'}
- **Size**: ${metrics.size.totalSizeMB <= this.benchmarks.maxTotalSizeMB ? '✅' : '❌'} ${metrics.size.totalSizeMB <= this.benchmarks.maxTotalSizeMB ? 'Within limit' : 'Exceeds limit'}
- **Links**: ${metrics.quality.brokenLinks === 0 ? '✅' : '❌'} ${metrics.quality.brokenLinks === 0 ? 'All links working' : `${metrics.quality.brokenLinks} broken links`}
- **Optimization**: ${metrics.optimization.meetsBenchmark ? '✅' : '❌'} ${metrics.optimization.fileReduction}% reduction from original 192 files

${
  alerts.length > 0
    ? `
## 🚨 Active Alerts (${alerts.length})
${alerts
  .map(
    (alert) => `
### ${alert.level.toUpperCase()}: ${alert.type.replace(/_/g, ' ')}
- **Issue**: ${alert.message}
- **Action**: ${alert.action}
`,
  )
  .join('\n')}
`
    : '## ✅ No Active Alerts - Documentation health is optimal!'
}

## 📊 Detailed Breakdown
### File Statistics
- **Total Files**: ${metrics.files.total}
- **Active Files**: ${metrics.files.active}
- **Archived Files**: ${metrics.files.archived}
- **Empty Files**: ${metrics.files.empty}
- **Large Files (>100KB)**: ${metrics.files.large}

### Size Statistics  
- **Total Size**: ${metrics.size.totalSizeMB}MB
- **Average File Size**: ${metrics.size.averageFileSize}KB
- **Total Lines**: ${metrics.size.totalLines.toLocaleString()}
- **Average Lines/File**: ${metrics.size.averageLinesPerFile}

### Quality Statistics
- **Content Quality Score**: ${metrics.quality.contentQuality}/100
- **Broken Links**: ${metrics.quality.brokenLinks}
- **Outdated References**: ${metrics.quality.outdatedReferences}

## 💡 Recommendations
${this.generateRecommendations(metrics, healthScore, alerts)}

## 📈 Trend Analysis
${await this.generateTrendAnalysis()}

---
*Automated monitoring by The Bridge Project Documentation System*
`

    const reportPath = path.join(this.rootDir, 'docs', 'HEALTH_REPORT.md')
    fs.writeFileSync(reportPath, report)

    console.log(`📄 Health report saved to: ${reportPath}`)
    console.log(`📊 Health Score: ${healthScore}/100 (${healthLevel.toUpperCase()})`)
  }

  /**
   * 💡 Generate recommendations
   */
  generateRecommendations(metrics, healthScore, alerts) {
    const recommendations = []

    if (healthScore >= 95) {
      recommendations.push('🏆 Excellent! Your documentation is in perfect condition.')
      recommendations.push('🔄 Continue regular monitoring to maintain this high standard.')
    } else if (healthScore >= 85) {
      recommendations.push('👍 Good documentation health with minor areas for improvement.')
      if (metrics.quality.brokenLinks > 0) {
        recommendations.push('🔗 Run link repair system to fix broken links.')
      }
    } else if (healthScore >= 70) {
      recommendations.push('⚠️ Documentation needs attention in several areas.')
      recommendations.push('📊 Focus on addressing critical and warning alerts first.')
    } else {
      recommendations.push('🔴 Documentation health is poor and needs immediate attention.')
      recommendations.push('🚨 Address all critical alerts as priority.')
    }

    // Specific recommendations based on metrics
    if (metrics.files.active > this.benchmarks.maxActiveFiles) {
      recommendations.push(
        `📁 Consider consolidating or archiving ${metrics.files.active - this.benchmarks.maxActiveFiles} excess files.`,
      )
    }

    if (metrics.files.empty > 0) {
      recommendations.push(`📝 Review and populate or remove ${metrics.files.empty} empty files.`)
    }

    if (metrics.quality.outdatedReferences > 5) {
      recommendations.push('📚 Update outdated references to maintain accuracy.')
    }

    return recommendations.map((rec) => `- ${rec}`).join('\n')
  }

  /**
   * 📈 Generate trend analysis
   */
  async generateTrendAnalysis() {
    if (!fs.existsSync(this.metricsFile)) {
      return 'No historical data available yet. Run monitoring regularly to build trends.'
    }

    const history = JSON.parse(fs.readFileSync(this.metricsFile, 'utf-8'))

    if (history.length < 2) {
      return 'Insufficient data for trend analysis. Need at least 2 monitoring runs.'
    }

    const current = history[history.length - 1]
    const previous = history[history.length - 2]

    const trends = []

    // File count trend
    const fileDiff = current.files.active - previous.files.active
    if (fileDiff > 0) {
      trends.push(`📈 File count increased by ${fileDiff} files`)
    } else if (fileDiff < 0) {
      trends.push(`📉 File count decreased by ${Math.abs(fileDiff)} files`)
    } else {
      trends.push('➡️ File count stable')
    }

    // Health score trend
    const scoreDiff = current.healthScore - previous.healthScore
    if (scoreDiff > 0) {
      trends.push(`📈 Health score improved by ${scoreDiff} points`)
    } else if (scoreDiff < 0) {
      trends.push(`📉 Health score declined by ${Math.abs(scoreDiff)} points`)
    } else {
      trends.push('➡️ Health score stable')
    }

    // Size trend
    const sizeDiff = parseFloat(current.size.totalSizeMB) - parseFloat(previous.size.totalSizeMB)
    if (sizeDiff > 0.1) {
      trends.push(`📈 Documentation size increased by ${sizeDiff.toFixed(2)}MB`)
    } else if (sizeDiff < -0.1) {
      trends.push(`📉 Documentation size decreased by ${Math.abs(sizeDiff).toFixed(2)}MB`)
    }

    return trends.length > 0
      ? trends.map((t) => `- ${t}`).join('\n')
      : 'No significant trends detected.'
  }

  /**
   * 🚨 Handle alerts
   */
  async handleAlerts(alerts) {
    console.log(`🚨 ${alerts.length} alerts detected:`)

    alerts.forEach((alert) => {
      const emoji = {
        critical: '🔴',
        warning: '🟡',
        info: '🔵',
      }

      console.log(`   ${emoji[alert.level]} ${alert.level.toUpperCase()}: ${alert.message}`)
    })

    // Save alerts
    fs.writeFileSync(this.alertsFile, JSON.stringify(alerts, null, 2))

    // Check if we should auto-fix
    const autoFixableAlerts = alerts.filter(
      (alert) => alert.type === 'broken_links' && alert.level !== 'critical',
    )

    if (autoFixableAlerts.length > 0) {
      console.log('💡 Some alerts can be auto-fixed. Run: npm run docs:fix-links')
    }
  }

  /**
   * 📁 Find all markdown files
   */
  async findMarkdownFiles() {
    const files = []

    const scanDirectory = (dir) => {
      const entries = fs.readdirSync(dir)

      for (const entry of entries) {
        const fullPath = path.join(dir, entry)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
          if (!['node_modules', '.git', '.next', 'coverage'].includes(entry)) {
            scanDirectory(fullPath)
          }
        } else if (entry.endsWith('.md')) {
          files.push(fullPath)
        }
      }
    }

    scanDirectory(this.rootDir)
    return files
  }
}

// CLI execution
if (require.main === module) {
  const monitor = new HealthMonitor()

  const args = process.argv.slice(2)

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
📊 Documentation Health Monitor

Usage:
  node health-monitor.js [options]

Options:
  --continuous    Run in continuous monitoring mode
  --alert-only    Only show alerts without full report
  --help, -h      Show this help message

Examples:
  node health-monitor.js              # Single health check
  node health-monitor.js --continuous # Continuous monitoring
  node health-monitor.js --alert-only # Show only alerts
`)
    process.exit(0)
  }

  if (args.includes('--continuous')) {
    console.log('🔄 Starting continuous monitoring...')
    setInterval(() => {
      monitor.monitor().catch(console.error)
    }, 60000) // Every minute
  } else {
    monitor.monitor().catch(console.error)
  }
}

module.exports = HealthMonitor
