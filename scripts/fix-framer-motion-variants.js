#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Fix Framer Motion variant type conflicts
 * Removes transition properties with ease arrays/strings from variants
 */

const componentsDir = path.join(__dirname, '../src/components');

function fixFramerMotionVariants(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Pattern 1: Remove transition objects with ease arrays like [0.16, 1, 0.3, 1]
  const easeArrayPattern = /transition:\s*\{\s*[^}]*ease:\s*\[[^\]]+\][^}]*\}\s*,?/g;
  if (easeArrayPattern.test(content)) {
    content = content.replace(easeArrayPattern, '');
    modified = true;
  }

  // Pattern 2: Remove transition objects with string ease values
  const easeStringPattern = /transition:\s*\{\s*[^}]*ease:\s*["'][^"']+["'][^}]*\}\s*,?/g;
  if (easeStringPattern.test(content)) {
    content = content.replace(easeStringPattern, '');
    modified = true;
  }

  // Pattern 3: Fix default role values from "default" to "lightworker"
  const defaultRolePattern = /role\s*=\s*["']default["']/g;
  if (defaultRolePattern.test(content)) {
    content = content.replace(defaultRolePattern, 'role = "lightworker"');
    modified = true;
  }

  // Clean up any extra commas left behind
  content = content.replace(/,(\s*[}\]])/g, '$1');

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed: ${filePath}`);
    return true;
  }
  return false;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let totalFixed = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      totalFixed += processDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (fixFramerMotionVariants(filePath)) {
        totalFixed++;
      }
    }
  }

  return totalFixed;
}

console.log('🔧 Fixing Framer Motion variant type conflicts...');
const fixedCount = processDirectory(componentsDir);
console.log(`✅ Fixed ${fixedCount} files`); 