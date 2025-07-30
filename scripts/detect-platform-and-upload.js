#!/usr/bin/env node

/**
 * 🔍 SMART PLATFORM DETECTION & ENVIRONMENT UPLOAD
 * Automatically selects the correct upload script for the current platform
 */

const { spawn } = require('child_process')
const path = require('path')
const os = require('os')

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`
}

function championshipLog(message, level = 'INFO') {
  const timestamp = new Date().toTimeString().split(' ')[0]
  const prefix =
    {
      ERROR: '❌',
      WARN: '⚠️ ',
      SUCCESS: '✅',
      INFO: 'ℹ️ ',
    }[level] || '📋'

  const color =
    {
      ERROR: 'red',
      WARN: 'yellow',
      SUCCESS: 'green',
      INFO: 'blue',
    }[level] || 'white'

  console.log(colorize(`[${timestamp}] ${prefix} ${message}`, color))
}

async function detectPlatformAndUpload(args = []) {
  championshipLog('🚀 Smart Platform Detection & Environment Upload', 'INFO')
  championshipLog('🌟 The Bridge Project - Championship Environment Management', 'INFO')
  console.log('')

  // Detect platform
  const platform = os.platform()
  const isWindows = platform === 'win32'

  championshipLog(`🔍 Detected platform: ${platform}`, 'INFO')
  championshipLog(`🖥️  Operating system: ${os.type()} ${os.release()}`, 'INFO')
  championshipLog(`💻 Architecture: ${os.arch()}`, 'INFO')
  console.log('')

  // Select appropriate script
  let scriptPath
  let command
  let scriptArgs = []

  if (isWindows) {
    // Windows PowerShell script
    scriptPath = path.join(__dirname, 'upload-env-to-vercel.ps1')
    command = 'powershell'
    scriptArgs = ['-ExecutionPolicy', 'Bypass', '-File', scriptPath, ...args]
    championshipLog('🔧 Using PowerShell script for Windows', 'SUCCESS')
  } else {
    // Unix/Mac bash script
    scriptPath = path.join(__dirname, 'upload-env-to-vercel.sh')
    command = 'bash'
    scriptArgs = [scriptPath, ...args]
    championshipLog('🔧 Using Bash script for Unix/Mac', 'SUCCESS')
  }

  // Verify script exists
  const fs = require('fs')
  if (!fs.existsSync(scriptPath)) {
    championshipLog(`❌ Upload script not found: ${scriptPath}`, 'ERROR')
    championshipLog('💡 Run "npm run env:setup" to generate all scripts', 'WARN')
    process.exit(1)
  }

  championshipLog(`📋 Executing: ${command} ${scriptArgs.join(' ')}`, 'INFO')
  console.log('')

  // Execute the appropriate script
  return new Promise((resolve, reject) => {
    const child = spawn(command, scriptArgs, {
      stdio: 'inherit',
      shell: isWindows, // Use shell on Windows for better compatibility
      cwd: process.cwd(),
    })

    child.on('close', (code) => {
      console.log('')
      if (code === 0) {
        championshipLog('✅ Environment upload completed successfully!', 'SUCCESS')
        championshipLog("🌟 JAHmere's August 25th, 2025 Freedom Portal is ready!", 'SUCCESS')
        resolve(code)
      } else {
        championshipLog(`❌ Environment upload failed with exit code: ${code}`, 'ERROR')
        championshipLog('💡 Check the error messages above and try again', 'WARN')
        reject(new Error(`Script exited with code ${code}`))
      }
    })

    child.on('error', (error) => {
      championshipLog(`❌ Failed to execute upload script: ${error.message}`, 'ERROR')

      if (isWindows && error.code === 'ENOENT') {
        championshipLog('💡 PowerShell might not be available. Try:', 'WARN')
        championshipLog('   npm run env:upload:bash', 'WARN')
      } else if (!isWindows && error.code === 'ENOENT') {
        championshipLog('💡 Bash might not be available. Try:', 'WARN')
        championshipLog('   npm run env:upload:windows', 'WARN')
      }

      reject(error)
    })
  })
}

// Handle command line arguments
const args = process.argv.slice(2)

// Show help if requested
if (args.includes('--help') || args.includes('-h')) {
  console.log(colorize('🔐 Smart Environment Upload Tool', 'cyan'))
  console.log('')
  console.log('Usage: node detect-platform-and-upload.js [options]')
  console.log('')
  console.log('Options:')
  console.log('  --validate    Run validation before upload')
  console.log('  --dry-run     Show what would be uploaded without actually uploading')
  console.log('  --env <env>   Target specific environment (production, preview, development)')
  console.log('  --help, -h    Show this help message')
  console.log('')
  console.log('Examples:')
  console.log('  npm run env:upload                    # Upload all variables')
  console.log('  npm run env:upload -- --validate     # Validate before upload')
  console.log('  npm run env:upload -- --dry-run      # Test run without uploading')
  console.log('  npm run env:upload -- --env production  # Upload only to production')
  console.log('')
  process.exit(0)
}

// Execute the upload
if (require.main === module) {
  detectPlatformAndUpload(args)
    .then(() => {
      process.exit(0)
    })
    .catch((error) => {
      championshipLog(`❌ Upload failed: ${error.message}`, 'ERROR')
      process.exit(1)
    })
}

module.exports = { detectPlatformAndUpload }
