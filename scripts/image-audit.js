#!/usr/bin/env node

/**
 * 🖼️ IMAGE OPTIMIZATION AUDIT SCRIPT
 * Analyzes current image usage and optimization opportunities
 * JAHmere Webb Freedom Portal - August 25th Mission Critical
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🔍 IMAGE OPTIMIZATION AUDIT')
console.log('=' .repeat(50))

// Check for missing OG images
function auditOGImages() {
  console.log('\n📊 Open Graph Images Status:')
  
  const ogImages = [
    'bridge-project-hero.jpg',
    'jahmere-webb-story.jpg', 
    'bridge-project-twitter.jpg',
    'default-person.jpg',
    'campaign-default.jpg',
    'bridge-project-social.jpg'
  ]

  const ogDir = 'public/images/og'
  
  ogImages.forEach(image => {
    const imagePath = path.join(ogDir, image)
    if (fs.existsSync(imagePath)) {
      const stats = fs.statSync(imagePath)
      const sizeKB = (stats.size / 1024).toFixed(1)
      console.log(`  ✅ ${image} (${sizeKB}KB)`)
    } else {
      console.log(`  ❌ ${image} - MISSING`)
    }
  })
}

// Check optimization manifest
function auditOptimizationManifest() {
  console.log('\n🚀 Optimization Manifest Status:')
  
  const manifestPath = 'public/images/optimized/optimization-manifest.json'
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    console.log(`  ✅ Total optimized files: ${manifest.totalFiles}`)
    console.log(`  ✅ Total savings: ${manifest.totalSavings.bytes} bytes (${manifest.totalSavings.percentage}%)`)
    console.log(`  ✅ Generated: ${new Date(manifest.generatedAt).toLocaleDateString()}`)
  } else {
    console.log('  ❌ Optimization manifest not found')
  }
}

// Check for unoptimized images
function auditUnoptimizedImages() {
  console.log('\n🔍 Scanning for unoptimized images:')
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp']
  const excludeDirs = ['node_modules', '.git', '.next', 'optimized']
  
  function scanDirectory(dir, results = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory() && !excludeDirs.includes(entry.name)) {
        scanDirectory(fullPath, results)
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase()
        if (imageExtensions.includes(ext)) {
          const stats = fs.statSync(fullPath)
          const sizeKB = (stats.size / 1024).toFixed(1)
          
          // Check if this image has optimized variants
          const relativePath = path.relative('public/images', fullPath)
          const manifestPath = 'public/images/optimized/optimization-manifest.json'
          let isOptimized = false
          
          if (fs.existsSync(manifestPath)) {
            const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
            isOptimized = manifest.files && manifest.files[relativePath]
          }
          
          results.push({
            path: fullPath,
            size: stats.size,
            sizeKB,
            optimized: isOptimized
          })
        }
      }
    }
    
    return results
  }
  
  const images = scanDirectory('public/images')
  const unoptimized = images.filter(img => !img.optimized && img.size > 10240) // > 10KB
  
  if (unoptimized.length > 0) {
    console.log('  ⚠️  Large unoptimized images found:')
    unoptimized.forEach(img => {
      console.log(`    📁 ${img.path} (${img.sizeKB}KB)`)
    })
  } else {
    console.log('  ✅ No large unoptimized images found')
  }
}

// Check Next.js Image component usage
function auditImageComponentUsage() {
  console.log('\n🖼️  Next.js Image Component Usage:')
  
  try {
    const result = execSync('grep -r "import.*Image.*from.*next/image" src/ || true', { encoding: 'utf8' })
    const usage = execSync('grep -r "<Image" src/ || true', { encoding: 'utf8' })
    
    if (result.trim()) {
      console.log('  ✅ Next.js Image imports found')
      console.log(result.trim().split('\n').map(line => `    ${line}`).join('\n'))
    } else {
      console.log('  ⚠️  No Next.js Image imports found in src/')
    }
    
    if (usage.trim()) {
      console.log('  ✅ Image component usage found')
    } else {
      console.log('  ⚠️  No Image component usage found - consider implementing OptimizedImage')
    }
  } catch (error) {
    console.log('  ❌ Error checking Image component usage')
  }
}

// Performance recommendations
function generateRecommendations() {
  console.log('\n🎯 OPTIMIZATION RECOMMENDATIONS:')
  console.log('=' .repeat(50))
  
  console.log('\n1. 🚀 IMMEDIATE ACTIONS:')
  console.log('   • Replace OG image placeholders with proper 1200x630 designs')
  console.log('   • Implement OptimizedImage component in pages')
  console.log('   • Add priority={true} to above-fold images')
  
  console.log('\n2. 📈 PERFORMANCE IMPROVEMENTS:')
  console.log('   • Enable blur placeholders for smooth loading')
  console.log('   • Implement responsive image sizing')
  console.log('   • Add proper alt text for accessibility')
  
  console.log('\n3. 🔧 TECHNICAL OPTIMIZATIONS:')
  console.log('   • Use AVIF format for modern browsers')
  console.log('   • Implement progressive fallback system')
  console.log('   • Monitor Core Web Vitals metrics')
  
  console.log('\n4. 📱 MOBILE OPTIMIZATION:')
  console.log('   • Create mobile-specific image variants')
  console.log('   • Optimize for different device pixel ratios')
  console.log('   • Test loading performance on slow connections')
}

// Run all audits
async function runAudit() {
  auditOGImages()
  auditOptimizationManifest()
  auditUnoptimizedImages()
  auditImageComponentUsage()
  generateRecommendations()
  
  console.log('\n✅ IMAGE AUDIT COMPLETE')
  console.log('💡 Ready for August 25th court presentation!')
}

runAudit().catch(console.error)