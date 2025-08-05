#!/usr/bin/env node

/**
 * 🔍 Simple Codebase Mapper
 * Essential file relationships for AI context
 * JAHmere Webb Freedom Portal - August 25th Mission
 */

const fs = require('fs').promises
const path = require('path')

class SimpleCodebaseMapper {
  constructor() {
    this.fileMap = new Map()
  }

  async mapCodebase() {
    console.log('🔍 Mapping codebase...')
    
    const files = await this.getSourceFiles()
    const relationships = await this.buildRelationships(files)
    const essentials = this.findEssentials(relationships)
    
    await this.saveMap({ files, relationships, essentials })
    console.log('✅ Codebase mapped')
    
    return { files, relationships, essentials }
  }

  async getSourceFiles() {
    const files = []
    await this.scanDir('./src', files)
    return files
  }

  async scanDir(dir, files) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory() && !entry.name.startsWith('.')) {
        await this.scanDir(fullPath, files)
      } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
        files.push(fullPath)
      }
    }
  }

  async buildRelationships(files) {
    const relationships = {}
    
    for (const file of files) {
      try {
        const content = await fs.readFile(file, 'utf-8')
        const imports = this.extractImports(content)
        
        relationships[file] = {
          imports,
          type: this.getFileType(file),
          hasErrorBoundary: content.includes('withErrorBoundary'),
          usesCn: content.includes('cn(')
        }
      } catch (error) {
        console.warn(`Skipping ${file}: ${error.message}`)
      }
    }
    
    return relationships
  }

  extractImports(content) {
    const importRegex = /import.*from ['"]([^'"]+)['"]/g
    const imports = []
    let match
    
    match = importRegex.exec(content)
    while (match !== null) {
      imports.push(match[1])
      match = importRegex.exec(content)
    }
    
    return imports
  }

  getFileType(file) {
    if (file.includes('/app/') && file.endsWith('page.tsx')) return 'page'
    if (file.includes('/components/ui/')) return 'ui'
    if (file.includes('/components/')) return 'component'
    if (file.includes('/lib/')) return 'utility'
    return 'other'
  }

  findEssentials(relationships) {
    const essentials = {
      universalUtils: 'src/lib/utils.ts',
      errorBoundary: 'src/components/ui/error-boundary.tsx',
      mainPage: 'src/app/page.tsx',
      layout: 'src/app/layout.tsx'
    }
    
    // Find most imported files
    const importCounts = {}
    Object.values(relationships).forEach(rel => {
      rel.imports.forEach(imp => {
        if (imp.startsWith('@/')) {
          importCounts[imp] = (importCounts[imp] || 0) + 1
        }
      })
    })
    
    essentials.mostImported = Object.entries(importCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([path]) => path)
    
    return essentials
  }

  async saveMap(data) {
    await fs.writeFile('./codebase-map.json', JSON.stringify(data, null, 2))
  }
}

// Run if called directly
if (require.main === module) {
  new SimpleCodebaseMapper()
    .mapCodebase()
    .then(() => console.log('🎯 Mission-focused mapping complete'))
    .catch(console.error)
}

module.exports = { SimpleCodebaseMapper }
