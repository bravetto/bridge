#!/usr/bin/env node

/**
 * 🛡️ BUILD HEALTH MONITOR
 * Divine Engineer's Defensive Architecture Protocol
 * Prevents build corruption, monitors system health, ensures deployment readiness
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// ANSI color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
}

const log = (msg, color = 'reset') => {
  console.log(`${colors[color]}${msg}${colors.reset}`)
}

const logSection = (title) => {
  log(`\n${colors.bold}=== ${title} ===${colors.reset}`, 'cyan')
}

/**
 * 🔍 SYSTEM HEALTH DIAGNOSTICS
 */
class BuildHealthMonitor {
  constructor() {
    this.projectRoot = process.cwd()
    this.healthReport = {
      timestamp: new Date().toISOString(),
      overall: 'unknown',
      checks: {},
    }
  }

  /**
   * Execute complete health check
   */
  async runHealthCheck() {
    logSection('🛡️ BUILD HEALTH MONITOR ACTIVATED')
    log('Running comprehensive system diagnostics...', 'blue')

    try {
      await this.checkFileSystemPermissions()
      await this.checkNextJsConfiguration()
      await this.checkBuildDirectory()
      await this.checkNodeModules()
      await this.checkPortAvailability()
      await this.checkImageAssets()
      await this.checkTypeScriptHealth()

      this.generateHealthReport()
      return this.healthReport
    } catch (error) {
      log(`❌ HEALTH CHECK FAILED: ${error.message}`, 'red')
      this.healthReport.overall = 'critical'
      throw error
    }
  }

  /**
   * Check file system permissions
   */
  async checkFileSystemPermissions() {
    log('🔒 Checking file system permissions...', 'yellow')

    const criticalDirectories = ['.next', 'public', 'src', 'node_modules']

    const permissionIssues = []

    for (const dir of criticalDirectories) {
      const fullPath = path.join(this.projectRoot, dir)

      if (fs.existsSync(fullPath)) {
        try {
          fs.accessSync(fullPath, fs.constants.W_OK)
          log(`  ✅ ${dir}/ - writable`, 'green')
        } catch (err) {
          log(`  ❌ ${dir}/ - permission denied`, 'red')
          permissionIssues.push(dir)
        }
      } else {
        log(`  ⚠️  ${dir}/ - does not exist`, 'yellow')
      }
    }

    this.healthReport.checks.filePermissions = {
      status: permissionIssues.length === 0 ? 'healthy' : 'critical',
      issues: permissionIssues,
    }
  }

  /**
   * Check Next.js configuration
   */
  async checkNextJsConfiguration() {
    log('⚙️ Checking Next.js configuration...', 'yellow')

    const configFiles = ['next.config.js', 'next.config.ts', 'next.config.mjs']
    let configExists = false

    for (const configFile of configFiles) {
      if (fs.existsSync(path.join(this.projectRoot, configFile))) {
        configExists = true
        log(`  ✅ Found ${configFile}`, 'green')
        break
      }
    }

    if (!configExists) {
      log('  ⚠️  No Next.js config found', 'yellow')
    }

    // Check for Turbopack configuration
    if (configExists) {
      try {
        const packageJson = JSON.parse(
          fs.readFileSync(path.join(this.projectRoot, 'package.json'), 'utf8'),
        )

        const devScript = packageJson.scripts?.dev || ''
        const usesTurbopack = devScript.includes('--turbo')

        log(
          `  ${usesTurbopack ? '✅' : '⚠️'} Turbopack: ${usesTurbopack ? 'enabled' : 'disabled'}`,
          usesTurbopack ? 'green' : 'yellow',
        )
      } catch (err) {
        log('  ❌ Error reading package.json', 'red')
      }
    }

    this.healthReport.checks.nextConfig = {
      status: configExists ? 'healthy' : 'warning',
      configExists,
    }
  }

  /**
   * Check build directory health
   */
  async checkBuildDirectory() {
    log('🏗️ Checking build directory health...', 'yellow')

    const nextDir = path.join(this.projectRoot, '.next')
    let buildHealthy = true
    const issues = []

    if (fs.existsSync(nextDir)) {
      // Check for critical build files
      const criticalFiles = [
        'BUILD_ID',
        'static/development/_buildManifest.js',
        'server/app/page/server-reference-manifest.json',
      ]

      for (const file of criticalFiles) {
        const filePath = path.join(nextDir, file)
        if (!fs.existsSync(filePath)) {
          log(`  ❌ Missing: ${file}`, 'red')
          issues.push(`Missing ${file}`)
          buildHealthy = false
        } else {
          log(`  ✅ Present: ${file}`, 'green')
        }
      }

      // Check for temporary files that might indicate corruption
      const tempFiles = this.findTempFiles(nextDir)
      if (tempFiles.length > 0) {
        log(`  ⚠️  Found ${tempFiles.length} .tmp files (potential corruption)`, 'yellow')
        issues.push(`${tempFiles.length} temp files found`)
      }

      // Check build directory size
      const buildSize = this.calculateDirectorySize(nextDir)
      log(`  📊 Build directory size: ${this.formatBytes(buildSize)}`, 'blue')
    } else {
      log('  ⚠️  .next directory not found (clean state)', 'yellow')
      buildHealthy = false
      issues.push('No build directory')
    }

    this.healthReport.checks.buildDirectory = {
      status: buildHealthy ? 'healthy' : 'warning',
      issues,
    }
  }

  /**
   * Check node_modules health
   */
  async checkNodeModules() {
    log('📦 Checking node_modules health...', 'yellow')

    const nodeModulesPath = path.join(this.projectRoot, 'node_modules')
    let healthy = true

    if (fs.existsSync(nodeModulesPath)) {
      // Check for Next.js installation
      const nextPath = path.join(nodeModulesPath, 'next')
      if (fs.existsSync(nextPath)) {
        try {
          const packageJson = JSON.parse(
            fs.readFileSync(path.join(nextPath, 'package.json'), 'utf8'),
          )
          log(`  ✅ Next.js version: ${packageJson.version}`, 'green')
        } catch (err) {
          log('  ❌ Next.js installation corrupted', 'red')
          healthy = false
        }
      } else {
        log('  ❌ Next.js not installed', 'red')
        healthy = false
      }

      // Check .cache directory
      const cacheDir = path.join(nodeModulesPath, '.cache')
      if (fs.existsSync(cacheDir)) {
        const cacheSize = this.calculateDirectorySize(cacheDir)
        log(`  📊 Cache directory size: ${this.formatBytes(cacheSize)}`, 'blue')
      }
    } else {
      log('  ❌ node_modules not found', 'red')
      healthy = false
    }

    this.healthReport.checks.nodeModules = {
      status: healthy ? 'healthy' : 'critical',
    }
  }

  /**
   * Check port availability
   */
  async checkPortAvailability() {
    log('🌐 Checking port availability...', 'yellow')

    const preferredPorts = [4242, 1437, 3000, 3001, 4000]
    const availablePorts = []

    for (const port of preferredPorts) {
      try {
        execSync(`lsof -ti:${port}`, { stdio: 'ignore' })
        log(`  ❌ Port ${port}: in use`, 'red')
      } catch (err) {
        log(`  ✅ Port ${port}: available`, 'green')
        availablePorts.push(port)
      }
    }

    this.healthReport.checks.portAvailability = {
      status: availablePorts.length > 0 ? 'healthy' : 'warning',
      availablePorts,
      recommendedPort: availablePorts[0] || null,
    }
  }

  /**
   * Check image assets
   */
  async checkImageAssets() {
    log('🖼️ Checking image assets...', 'yellow')

    const criticalImages = [
      'public/images/people/tony-dungy/tony-dungy-profile.jpg',
      'public/images/people/jahmere-webb/jahmere-webb-profile.jpg',
    ]

    const missingImages = []

    for (const imagePath of criticalImages) {
      const fullPath = path.join(this.projectRoot, imagePath)
      if (fs.existsSync(fullPath)) {
        log(`  ✅ ${imagePath}`, 'green')
      } else {
        log(`  ❌ ${imagePath} - missing`, 'red')
        missingImages.push(imagePath)
      }
    }

    this.healthReport.checks.imageAssets = {
      status: missingImages.length === 0 ? 'healthy' : 'warning',
      missingImages,
    }
  }

  /**
   * Check TypeScript health
   */
  async checkTypeScriptHealth() {
    log('🔤 Checking TypeScript health...', 'yellow')

    try {
      execSync('npx tsc --noEmit', { stdio: 'pipe' })
      log('  ✅ TypeScript compilation successful', 'green')

      this.healthReport.checks.typescript = {
        status: 'healthy',
      }
    } catch (error) {
      log('  ❌ TypeScript errors found', 'red')

      this.healthReport.checks.typescript = {
        status: 'warning',
        error: error.message,
      }
    }
  }

  /**
   * Generate comprehensive health report
   */
  generateHealthReport() {
    logSection('📋 HEALTH REPORT SUMMARY')

    const checks = Object.values(this.healthReport.checks)
    const healthyCount = checks.filter((c) => c.status === 'healthy').length
    const warningCount = checks.filter((c) => c.status === 'warning').length
    const criticalCount = checks.filter((c) => c.status === 'critical').length

    // Overall health determination
    if (criticalCount > 0) {
      this.healthReport.overall = 'critical'
      log('🚨 OVERALL HEALTH: CRITICAL', 'red')
    } else if (warningCount > 0) {
      this.healthReport.overall = 'warning'
      log('⚠️  OVERALL HEALTH: WARNING', 'yellow')
    } else {
      this.healthReport.overall = 'healthy'
      log('✅ OVERALL HEALTH: EXCELLENT', 'green')
    }

    log(`\n📊 Status Summary:`, 'blue')
    log(`   ✅ Healthy: ${healthyCount}`, 'green')
    log(`   ⚠️  Warning: ${warningCount}`, 'yellow')
    log(`   🚨 Critical: ${criticalCount}`, 'red')

    // Recommended actions
    if (this.healthReport.overall !== 'healthy') {
      log(`\n🔧 RECOMMENDED ACTIONS:`, 'cyan')

      if (this.healthReport.checks.buildDirectory?.status !== 'healthy') {
        log('   • Run: rm -rf .next && npm run build', 'yellow')
      }

      if (this.healthReport.checks.nodeModules?.status !== 'healthy') {
        log('   • Run: rm -rf node_modules && npm install', 'yellow')
      }

      if (this.healthReport.checks.imageAssets?.missingImages?.length > 0) {
        log('   • Fix missing images or implement fallbacks', 'yellow')
      }

      if (this.healthReport.checks.typescript?.status !== 'healthy') {
        log('   • Fix TypeScript errors before deployment', 'yellow')
      }
    }

    // Save health report
    const reportPath = path.join(this.projectRoot, 'health-report.json')
    fs.writeFileSync(reportPath, JSON.stringify(this.healthReport, null, 2))
    log(`\n📁 Health report saved to: health-report.json`, 'blue')
  }

  /**
   * Utility: Find temporary files
   */
  findTempFiles(dir) {
    const tempFiles = []

    const walkDir = (currentDir) => {
      try {
        const files = fs.readdirSync(currentDir)
        for (const file of files) {
          const filePath = path.join(currentDir, file)
          const stat = fs.statSync(filePath)

          if (stat.isDirectory()) {
            walkDir(filePath)
          } else if (file.includes('.tmp.') || file.endsWith('.tmp')) {
            tempFiles.push(filePath)
          }
        }
      } catch (err) {
        // Skip directories we can't read
      }
    }

    walkDir(dir)
    return tempFiles
  }

  /**
   * Utility: Calculate directory size
   */
  calculateDirectorySize(dirPath) {
    let size = 0

    const walkDir = (currentDir) => {
      try {
        const files = fs.readdirSync(currentDir)
        for (const file of files) {
          const filePath = path.join(currentDir, file)
          const stat = fs.statSync(filePath)

          if (stat.isDirectory()) {
            walkDir(filePath)
          } else {
            size += stat.size
          }
        }
      } catch (err) {
        // Skip directories we can't read
      }
    }

    walkDir(dirPath)
    return size
  }

  /**
   * Utility: Format bytes
   */
  formatBytes(bytes) {
    const sizes = ['B', 'KB', 'MB', 'GB']
    if (bytes === 0) return '0 B'
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
  }
}

/**
 * 🚀 EMERGENCY RECOVERY PROTOCOLS
 */
class EmergencyRecovery {
  static async executeFullRecovery() {
    logSection('🚨 EMERGENCY RECOVERY PROTOCOL')
    log('Executing full system recovery...', 'red')

    try {
      // Kill all processes
      log('🔥 Killing all Node.js processes...', 'yellow')
      try {
        execSync('pkill -f "next dev" || pkill -f "node" || true', {
          stdio: 'inherit',
        })
      } catch (err) {
        // Ignore errors - processes might not exist
      }

      // Clear all caches
      log('🧹 Clearing all build caches...', 'yellow')
      execSync('rm -rf .next node_modules/.cache', { stdio: 'inherit' })

      // Reinstall dependencies if needed
      if (!fs.existsSync('node_modules')) {
        log('📦 Reinstalling dependencies...', 'yellow')
        execSync('npm install', { stdio: 'inherit' })
      }

      // Rebuild project
      log('🏗️ Rebuilding project...', 'yellow')
      execSync('npm run build', { stdio: 'inherit' })

      log('✅ EMERGENCY RECOVERY COMPLETED', 'green')
    } catch (error) {
      log(`❌ RECOVERY FAILED: ${error.message}`, 'red')
      throw error
    }
  }
}

// Main execution
if (require.main === module) {
  const command = process.argv[2]

  if (command === 'emergency') {
    EmergencyRecovery.executeFullRecovery().catch(console.error)
  } else {
    const monitor = new BuildHealthMonitor()
    monitor.runHealthCheck().catch(console.error)
  }
}

module.exports = { BuildHealthMonitor, EmergencyRecovery }
