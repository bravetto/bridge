#!/bin/bash

# Weekly 2-Minute Health Check for JAHmere Webb Freedom Portal
# Run this every Monday to ensure stability

echo "🏥 Running Weekly Health Check..."
echo "================================"

# 1. Check if build still works
echo "✓ Checking build..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "❌ Build failed - investigate immediately"
    exit 1
fi

# 2. Check TypeScript errors
echo "✓ Checking TypeScript..."
if npm run type-check > /dev/null 2>&1; then
    echo "✅ TypeScript: 0 errors"
else
    echo "❌ TypeScript errors detected"
    exit 1
fi

# 3. Check for unexpected changes
echo "✓ Checking git status..."
if [ -z "$(git status --porcelain)" ]; then
    echo "✅ Working directory clean"
else
    echo "⚠️  Uncommitted changes detected:"
    git status --short
fi

# 4. Quick performance check
echo "✓ Checking bundle sizes..."
largest_chunk=$(du -sh .next/static/chunks/*.js 2>/dev/null | sort -hr | head -1 | awk '{print $1}')
echo "✅ Largest chunk: $largest_chunk (baseline: 392K)"

echo ""
echo "🎉 Health check complete! All systems operational."
echo "Next check due: $(date -v +7d '+%B %d, %Y' 2>/dev/null || date -d '+7 days' '+%B %d, %Y' 2>/dev/null || echo 'in 7 days')" 