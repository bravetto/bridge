#!/bin/bash

# Simple Environment Variable Security Check
# Ensures no sensitive data is exposed in client-side code

echo "🔒 Checking Environment Variable Security..."
echo "========================================"

# Check for exposed env vars in built files
echo "🔍 Scanning for exposed environment variables..."

# Common patterns for sensitive data
PATTERNS=(
    "API_KEY"
    "SECRET"
    "PASSWORD"
    "TOKEN"
    "PRIVATE"
    "DATABASE_URL"
    "JWT"
)

FOUND_ISSUES=0

# Check if .next directory exists
if [ -d ".next" ]; then
    for pattern in "${PATTERNS[@]}"; do
        echo -n "Checking for $pattern... "
        if grep -r "$pattern" .next/static --include="*.js" 2>/dev/null | grep -v "NEXT_PUBLIC_" > /dev/null; then
            echo "⚠️  WARNING: Found potential exposure!"
            FOUND_ISSUES=$((FOUND_ISSUES + 1))
        else
            echo "✅ Clear"
        fi
    done
else
    echo "ℹ️  No build directory found. Run 'npm run build' first."
fi

echo ""
echo "🔍 Checking source files for proper prefixing..."

# Check for env vars without NEXT_PUBLIC_ in client components
if grep -r "process\.env\." src --include="*.tsx" --include="*.ts" | grep -v "NEXT_PUBLIC_" | grep -v "server" > /dev/null; then
    echo "⚠️  WARNING: Found process.env usage without NEXT_PUBLIC_ prefix in client code!"
    echo "   Only NEXT_PUBLIC_ prefixed variables should be used in client components."
    FOUND_ISSUES=$((FOUND_ISSUES + 1))
else
    echo "✅ All client-side env vars properly prefixed"
fi

echo ""
if [ $FOUND_ISSUES -eq 0 ]; then
    echo "✅ Security check passed! No environment variable exposures detected."
else
    echo "❌ Found $FOUND_ISSUES potential security issues. Please review!"
fi 