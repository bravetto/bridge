#!/usr/bin/env node

/**
 * 🚀 RAPID PAGE OPTIMIZER
 * Optimize any page in seconds with production design system
 * Usage: node scripts/page-optimizer.js [page-path]
 */

const fs = require('fs')
const path = require('path')

// Page optimization rules
const OPTIMIZATIONS = {
  // Replace old CSS classes with production system
  classReplacements: {
    // Buttons
    'bg-blue-600 hover:bg-blue-700': 'btn btn-primary',
    'bg-orange-500 hover:bg-orange-600': 'btn btn-accent',
    'bg-gray-100 hover:bg-gray-200': 'btn btn-secondary',

    // Typography
    'text-5xl font-bold': 'heading-1',
    'text-4xl font-bold': 'heading-2',
    'text-3xl font-semibold': 'heading-3',
    'text-2xl font-semibold': 'heading-4',
    'text-gray-900': 'text-primary',
    'text-gray-600': 'text-secondary',
    'text-blue-600': 'text-accent',

    // Layout
    'max-w-7xl mx-auto px-4': 'container',
    'grid grid-cols-2': 'grid grid-2',
    'grid grid-cols-3': 'grid grid-3',
    'grid grid-cols-4': 'grid grid-4',
    'flex items-center justify-center': 'flex-center',

    // Cards
    'bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md': 'card',
    'bg-white rounded-lg shadow-sm p-6': 'card',

    // Forms
    'w-full px-3 py-2 border border-gray-300 rounded-md': 'input',
  },

  // Add production CSS import
  addProductionCSS: true,

  // Remove old design system imports
  removeOldImports: [
    'championship-unified-system.css',
    'optimized-design-system.css',
    'design-system-unified.css',
    'clean-design-system.css',
    '2025-blue-color-system.css',
  ],
}

function optimizePage(filePath) {
  console.log(`🎯 Optimizing: ${filePath}`)

  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`)
    return false
  }

  let content = fs.readFileSync(filePath, 'utf8')
  let changes = 0

  // 1. Replace CSS classes
  Object.entries(OPTIMIZATIONS.classReplacements).forEach(([old, new_]) => {
    const regex = new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
    const matches = content.match(regex)
    if (matches) {
      content = content.replace(regex, new_)
      changes += matches.length
      console.log(`   ✅ Replaced "${old}" → "${new_}" (${matches.length} times)`)
    }
  })

  // 2. Add production CSS import (for TSX files)
  if (filePath.endsWith('.tsx') && !content.includes('production.css')) {
    const importRegex = /import.*from.*['"]@\/styles\/.*['"];?\n/g
    const hasStyleImports = importRegex.test(content)

    if (hasStyleImports) {
      // Replace existing style imports
      content = content.replace(importRegex, '')
      changes++
    }

    // Add production CSS import after other imports
    const lastImportMatch = content.match(/import.*from.*['"].*['"];?\n(?=\n|$)/g)
    if (lastImportMatch) {
      const lastImport = lastImportMatch[lastImportMatch.length - 1]
      const insertAfter = content.indexOf(lastImport) + lastImport.length
      content =
        content.slice(0, insertAfter) +
        "import '@/styles/production.css'\n" +
        content.slice(insertAfter)
      changes++
      console.log(`   ✅ Added production.css import`)
    }
  }

  // 3. Remove old design system imports
  OPTIMIZATIONS.removeOldImports.forEach((oldImport) => {
    const regex = new RegExp(`import.*['"]@/styles/${oldImport}['"];?\n`, 'g')
    if (regex.test(content)) {
      content = content.replace(regex, '')
      changes++
      console.log(`   ✅ Removed old import: ${oldImport}`)
    }
  })

  // 4. Optimize component structure (basic)
  const structureOptimizations = [
    // Remove redundant className props
    [/className={cn\("([^"]+)"\)}/g, 'className="$1"'],
    // Simplify simple conditional classes
    [/className={`([^`]+)`}/g, 'className="$1"'],
  ]

  structureOptimizations.forEach(([regex, replacement]) => {
    const matches = content.match(regex)
    if (matches) {
      content = content.replace(regex, replacement)
      changes += matches.length
    }
  })

  if (changes > 0) {
    fs.writeFileSync(filePath, content)
    console.log(`✅ Optimized ${filePath} (${changes} changes)`)
    return true
  } else {
    console.log(`ℹ️  No optimizations needed for ${filePath}`)
    return false
  }
}

function generatePageInventory() {
  console.log('📋 Generating page inventory...')

  const pagesDir = 'src/app'
  const pages = []

  function scanDirectory(dir) {
    const items = fs.readdirSync(dir)

    items.forEach((item) => {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory() && !item.startsWith('.') && !item.startsWith('_')) {
        scanDirectory(fullPath)
      } else if (item === 'page.tsx') {
        const relativePath = fullPath.replace('src/app/', '').replace('/page.tsx', '')
        const route = relativePath === '' ? '/' : `/${relativePath}`

        // Check if page needs optimization
        const content = fs.readFileSync(fullPath, 'utf8')
        const needsOptimization =
          Object.keys(OPTIMIZATIONS.classReplacements).some((old) => content.includes(old)) ||
          OPTIMIZATIONS.removeOldImports.some((old) => content.includes(old))

        pages.push({
          route,
          file: fullPath,
          needsOptimization,
          size: Math.round(stat.size / 1024) + 'KB',
        })
      }
    })
  }

  scanDirectory(pagesDir)

  // Generate inventory report
  const inventory = {
    total: pages.length,
    needsOptimization: pages.filter((p) => p.needsOptimization).length,
    pages: pages.sort((a, b) => a.route.localeCompare(b.route)),
  }

  fs.writeFileSync('page-inventory.json', JSON.stringify(inventory, null, 2))

  console.log(`\n📊 PAGE INVENTORY COMPLETE:`)
  console.log(`   Total pages: ${inventory.total}`)
  console.log(`   Need optimization: ${inventory.needsOptimization}`)
  console.log(`   Report saved: page-inventory.json\n`)

  // Show pages that need optimization
  const needsWork = pages.filter((p) => p.needsOptimization)
  if (needsWork.length > 0) {
    console.log('🎯 PAGES READY FOR OPTIMIZATION:')
    needsWork.forEach((page) => {
      console.log(`   ${page.route} (${page.size})`)
    })
    console.log('\n💡 Run: node scripts/page-optimizer.js [route] to optimize\n')
  }

  return inventory
}

function optimizeAllPages() {
  console.log('🚀 OPTIMIZING ALL PAGES...\n')

  const inventory = JSON.parse(fs.readFileSync('page-inventory.json', 'utf8'))
  const needsWork = inventory.pages.filter((p) => p.needsOptimization)

  let optimized = 0
  needsWork.forEach((page) => {
    if (optimizePage(page.file)) {
      optimized++
    }
  })

  console.log(`\n🏆 OPTIMIZATION COMPLETE:`)
  console.log(`   Pages optimized: ${optimized}/${needsWork.length}`)
  console.log(`   Ready for production! 🚀\n`)
}

// CLI Interface
const args = process.argv.slice(2)
const command = args[0]

switch (command) {
  case 'inventory':
    generatePageInventory()
    break

  case 'all':
    if (!fs.existsSync('page-inventory.json')) {
      generatePageInventory()
    }
    optimizeAllPages()
    break

  default:
    if (command) {
      // Optimize specific page
      const pagePath = command.startsWith('src/')
        ? command
        : `src/app${command === '/' ? '' : command}/page.tsx`
      optimizePage(pagePath)
    } else {
      // Show help
      console.log(`
🚀 RAPID PAGE OPTIMIZER

Usage:
  node scripts/page-optimizer.js inventory     # Generate page inventory
  node scripts/page-optimizer.js all          # Optimize all pages
  node scripts/page-optimizer.js /route       # Optimize specific route
  node scripts/page-optimizer.js src/app/...  # Optimize specific file

Examples:
  node scripts/page-optimizer.js /
  node scripts/page-optimizer.js /contact
  node scripts/page-optimizer.js /people/jordan-dungy
      `)
    }
}
