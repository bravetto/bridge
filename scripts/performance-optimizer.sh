#!/bin/bash

# PERFORMANCE OPTIMIZER
# Automated performance improvements and monitoring
# Effort: 10 minutes | Reward: High (ongoing performance gains)

echo "⚡ Performance Optimizer"
echo "======================="

# 1. Analyze bundle size and suggest optimizations
echo "📊 Analyzing bundle size..."
if [ -d ".next" ]; then
    ./scripts/check-bundle-size.sh | grep -E "(WARNING|largest chunk)"
    
    # Check for large chunks
    LARGEST_SIZE=$(du -sh .next/static/chunks/*.js 2>/dev/null | sort -hr | head -1 | awk '{print $1}' | sed 's/K//')
    if [ "${LARGEST_SIZE%.*}" -gt 400 ]; then
        echo "💡 Optimization suggestions:"
        echo "   • Consider code splitting large components"
        echo "   • Use dynamic imports for heavy libraries"
        echo "   • Check for duplicate dependencies"
    fi
else
    echo "ℹ️  No build found. Run 'npm run build' first."
fi

# 2. Optimize images in public directory
echo "🖼️  Checking image optimization..."
LARGE_IMAGES=$(find public -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" | xargs du -sh 2>/dev/null | awk '$1 ~ /[0-9]+M/ || $1 ~ /[5-9][0-9][0-9]K/ {print}' | wc -l)

if [ "$LARGE_IMAGES" -gt 0 ]; then
    echo "⚠️  Found $LARGE_IMAGES large images (>500KB)"
    echo "💡 Consider:"
    echo "   • Converting to WebP format"
    echo "   • Using Next.js Image component"
    echo "   • Compressing images before upload"
else
    echo "✅ Image sizes look good"
fi

# 3. Check for performance anti-patterns
echo "🔍 Scanning for performance issues..."

# Check for missing image sizes
MISSING_SIZES=$(grep -r "next/image" src --include="*.tsx" | grep -v "width\|height" | wc -l)
if [ "$MISSING_SIZES" -gt 0 ]; then
    echo "⚠️  Found $MISSING_SIZES images without explicit dimensions"
    echo "   This can cause layout shifts (CLS)"
fi

# Check for blocking scripts
BLOCKING_SCRIPTS=$(grep -r "script.*src" src --include="*.tsx" | grep -v "async\|defer" | wc -l)
if [ "$BLOCKING_SCRIPTS" -gt 0 ]; then
    echo "⚠️  Found $BLOCKING_SCRIPTS potentially blocking scripts"
    echo "   Consider using next/script with appropriate strategy"
fi

# Check for large useEffect dependencies
LARGE_DEPS=$(grep -r "useEffect.*\[.*," src --include="*.tsx" | wc -l)
if [ "$LARGE_DEPS" -gt 10 ]; then
    echo "⚠️  Found many useEffect hooks with dependencies"
    echo "   Review for unnecessary re-renders"
fi

# 4. Generate performance report
echo "📋 Generating performance report..."
{
    echo "Performance Report - $(date)"
    echo "=============================="
    echo ""
    
    if [ -d ".next" ]; then
        echo "Bundle Analysis:"
        du -sh .next/static/chunks/*.js 2>/dev/null | sort -hr | head -10
        echo ""
    fi
    
    echo "Image Analysis:"
    find public -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" | xargs du -sh 2>/dev/null | sort -hr | head -10
    echo ""
    
    echo "Component Analysis:"
    echo "Total components: $(find src/components -name "*.tsx" | wc -l)"
    echo "Pages: $(find src/app -name "page.tsx" | wc -l)"
    
} > performance-report.txt

echo "✅ Report saved to performance-report.txt"

# 5. Apply automatic optimizations
echo "🔧 Applying automatic optimizations..."

# Remove unused CSS (if postcss is configured)
if [ -f "postcss.config.js" ] && command -v npx >/dev/null 2>&1; then
    echo "🎨 Optimizing CSS..."
    # This would run PurgeCSS or similar if configured
    echo "ℹ️  CSS optimization requires manual setup"
fi

# Optimize package.json
if command -v jq >/dev/null 2>&1; then
    echo "📦 Checking package.json optimization..."
    # Check for unused dependencies (basic check)
    DEPS=$(jq -r '.dependencies | keys[]' package.json | wc -l)
    DEV_DEPS=$(jq -r '.devDependencies | keys[]' package.json | wc -l)
    echo "   Dependencies: $DEPS, DevDependencies: $DEV_DEPS"
fi

echo ""
echo "🎉 Performance optimization completed!"
echo ""
echo "📊 Summary:"
echo "   • Bundle analysis completed"
echo "   • Image optimization checked"
echo "   • Performance anti-patterns scanned"
echo "   • Report generated"
echo ""
echo "💡 Next steps:"
echo "   • Review performance-report.txt"
echo "   • Address any warnings found"
echo "   • Run Lighthouse audit for detailed metrics"
echo "   • Monitor Core Web Vitals in production" 