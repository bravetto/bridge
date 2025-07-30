#!/usr/bin/env node

/**
 * 🕊️ JAHmere Webb Freedom Portal CLI
 * Streamlined deployment tool for August 25th, 2025 mission
 * 80/20 approach: Maximum impact, minimal complexity
 */

const { Command } = require('commander')
const chalk = require('chalk')
const { execSync } = require('child_process')
const { existsSync, readFileSync, writeFileSync } = require('fs')
const { join } = require('path')

const program = new Command()

// Helper functions
function log(message, type = 'info') {
  const colors = {
    success: chalk.green,
    error: chalk.red,
    warning: chalk.yellow,
    info: chalk.blue,
    mission: chalk.magenta.bold
  }
  console.log(colors[type](`[JAHmere CLI] ${message}`))
}

function runCommand(command, options = {}) {
  try {
    log(`Executing: ${command}`, 'info')
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    })
    return result
  } catch (error) {
    log(`Command failed: ${error.message}`, 'error')
    if (!options.allowFailure) process.exit(1)
    return null
  }
}

function checkGitStatus() {
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' })
    return status.trim().length === 0
  } catch {
    return false
  }
}

function getCurrentBranch() {
  try {
    return execSync('git branch --show-current', { encoding: 'utf8' }).trim()
  } catch {
    return 'main'
  }
}

// CLI Configuration
program
  .name('jahmere')
  .description('🕊️ JAHmere Webb Freedom Portal - CLI for Justice')
  .version('1.0.0')

// Deploy command - Main workflow
program
  .command('deploy')
  .description('🚀 Full deployment: build → test → commit → push → vercel')
  .option('-m, --message <msg>', 'Commit message', 'Deploy: JAHmere Webb Freedom Portal updates')
  .option('--skip-build', 'Skip build step')
  .option('--skip-test', 'Skip test step') 
  .option('--force', 'Force deployment even with uncommitted changes')
  .action(async (options) => {
    log('🕊️ Starting JAHmere Webb Freedom Portal deployment', 'mission')
    
    const startTime = Date.now()
    
    // 1. Check git status
    if (!options.force && !checkGitStatus()) {
      log('⚠️ Uncommitted changes detected. Use --force to override.', 'warning')
      process.exit(1)
    }
    
    // 2. Build step
    if (!options.skipBuild) {
      log('📦 Building application...', 'info')
      runCommand('npm run build')
      log('✅ Build completed', 'success')
    }
    
    // 3. Test step  
    if (!options.skipTest) {
      log('🧪 Running tests...', 'info')
      runCommand('npm run type-check')
      log('✅ Tests passed', 'success')
    }
    
    // 4. Git operations
    log('📝 Committing changes...', 'info')
    runCommand('git add .')
    runCommand(`git commit -m "${options.message}"`, { allowFailure: true })
    
    const branch = getCurrentBranch()
    log(`🌿 Pushing to ${branch}...`, 'info')
    runCommand(`git push origin ${branch}`)
    
    // 5. Vercel deployment
    log('🚀 Deploying to Vercel...', 'info')
    runCommand('vercel --prod')
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(1)
    log(`🎉 Deployment completed in ${duration}s`, 'success')
    log('🕊️ Freedom portal is live! August 25th, 2025 mission active.', 'mission')
  })

// API command - Local API management
program
  .command('api')
  .description('🔌 Manage local API development')
  .option('--start', 'Start development server')
  .option('--test', 'Test API endpoints')
  .option('--build', 'Build API for production')
  .action((options) => {
    if (options.start) {
      log('🔌 Starting development server...', 'info')
      runCommand('npm run dev')
    } else if (options.test) {
      log('🧪 Testing API endpoints...', 'info')
      runCommand('npm run test:api')
    } else if (options.build) {
      log('📦 Building API...', 'info')
      runCommand('npm run build')
    } else {
      log('Use --start, --test, or --build', 'info')
    }
  })

// Status command - Quick health check
program
  .command('status')
  .description('📊 Check project status and health')
  .action(() => {
    log('📊 JAHmere Webb Freedom Portal Status', 'mission')
    
    // Git status
    const isClean = checkGitStatus()
    const branch = getCurrentBranch()
    log(`Git: ${branch} ${isClean ? '✅ Clean' : '⚠️ Uncommitted changes'}`, 'info')
    
    // Dependencies
    if (existsSync('package.json')) {
      const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
      log(`Version: ${pkg.version}`, 'info')
    }
    
    // Build status
    const hasBuild = existsSync('.next')
    log(`Build: ${hasBuild ? '✅ Ready' : '❌ Not built'}`, 'info')
    
    // Vercel status
    const hasVercel = existsSync('.vercel')
    log(`Vercel: ${hasVercel ? '✅ Configured' : '❌ Not configured'}`, 'info')
    
    log('🕊️ Fighting for justice until August 25th, 2025', 'mission')
  })

// Quick commands
program
  .command('build')
  .description('📦 Build the application')
  .action(() => {
    log('📦 Building JAHmere Webb Freedom Portal...', 'info')
    runCommand('npm run build')
    log('✅ Build completed', 'success')
  })

program
  .command('dev')
  .description('🔧 Start development server')
  .action(() => {
    log('🔧 Starting development server...', 'info')
    runCommand('npm run dev')
  })

program
  .command('push')
  .description('📤 Quick git push')
  .option('-m, --message <msg>', 'Commit message', 'Update: JAHmere Webb Freedom Portal')
  .action((options) => {
    log('📤 Quick push to git...', 'info')
    runCommand('git add .')
    runCommand(`git commit -m "${options.message}"`, { allowFailure: true })
    runCommand(`git push origin ${getCurrentBranch()}`)
    log('✅ Pushed successfully', 'success')
  })

// Mission command - Motivational
program
  .command('mission')
  .description('🕊️ Display mission statement')
  .action(() => {
    console.log(chalk.magenta.bold(`
    🕊️ JAHmere Webb Freedom Portal 🕊️
    
    Mission: Support JAHmere Webb's freedom through technology
    Deadline: August 25th, 2025, 2025
    Status: ACTIVE - Every commit counts
    
    "Technology in service of justice."
    
    Commands available:
    • jahmere deploy    - Full deployment pipeline
    • jahmere status    - Check system health  
    • jahmere build     - Build application
    • jahmere dev       - Start development
    • jahmere push      - Quick git push
    
    🚀 Let's build freedom together!
    `))
  })

// Error handling
program.on('command:*', () => {
  log('Invalid command. Use --help for available commands.', 'error')
  process.exit(1)
})

// Parse and execute
program.parse()

// Show mission if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp()
  console.log(chalk.magenta.bold('\n🕊️ Use "jahmere mission" to see the full mission statement'))
} 