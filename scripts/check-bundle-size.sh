#!/bin/bash

# Simple Bundle Size Check for Next.js
# Run after build to monitor bundle growth

echo "📦 Checking Bundle Sizes..."
echo "=========================="

# Check if .next directory exists
if [ ! -d ".next" ]; then
    echo "❌ Build directory not found. Run 'npm run build' first."
    exit 1
fi

# Get total size of JS chunks
TOTAL_SIZE=$(du -sh .next/static/chunks/*.js 2>/dev/null | awk '{sum+=$1} END {print sum}')
LARGEST_CHUNK=$(du -sh .next/static/chunks/*.js 2>/dev/null | sort -hr | head -1)

echo "📊 Bundle Statistics:"
echo "• Total JS chunks: $(find .next/static/chunks -name "*.js" | wc -l) files"
echo "• Largest chunk: $LARGEST_CHUNK"

# Check against threshold (500KB warning)
LARGEST_SIZE=$(echo $LARGEST_CHUNK | awk '{print $1}' | sed 's/K//')
if [ "${LARGEST_SIZE%.*}" -gt 500 ]; then
    echo "⚠️  WARNING: Largest chunk exceeds 500KB threshold!"
    echo "   Consider code splitting or lazy loading."
else
    echo "✅ Bundle sizes within acceptable range"
fi

# Show top 5 largest chunks
echo ""
echo "🔍 Top 5 Largest Chunks:"
du -sh .next/static/chunks/*.js 2>/dev/null | sort -hr | head -5 | nl

# Optional: Save to file for tracking
echo ""
echo "💾 Saving report to bundle-report.txt..."
{
    echo "Bundle Size Report - $(date)"
    echo "========================"
    du -sh .next/static/chunks/*.js 2>/dev/null | sort -hr
} > bundle-report.txt

echo "✅ Done! Check bundle-report.txt for full details." 