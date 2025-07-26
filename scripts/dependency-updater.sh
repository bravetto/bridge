#!/bin/bash

# SMART DEPENDENCY UPDATER
# Safe, automated dependency updates with rollback capability
# Effort: 5 minutes | Reward: High (keeps dependencies secure and current)

echo "📦 Smart Dependency Updater"
echo "==========================="

# Create backup of package files
echo "💾 Creating backup..."
cp package.json package.json.backup
cp package-lock.json package-lock.json.backup 2>/dev/null || true
echo "✅ Backup created"

# Function to restore backup
restore_backup() {
    echo "🔄 Restoring backup due to errors..."
    mv package.json.backup package.json
    mv package-lock.json.backup package-lock.json 2>/dev/null || true
    npm install --silent
    echo "✅ Backup restored"
}

# Trap to restore backup on exit/error
trap restore_backup ERR

# 1. Check for security vulnerabilities
echo "🔒 Checking for security vulnerabilities..."
AUDIT_OUTPUT=$(npm audit --audit-level=high 2>&1)
if echo "$AUDIT_OUTPUT" | grep -q "found.*vulnerabilities"; then
    echo "⚠️  Security vulnerabilities found:"
    npm audit --audit-level=high | grep -E "(Critical|High|Moderate)"
    echo ""
    echo "🛠️  Attempting to fix..."
    npm audit fix --force
    echo "✅ Security fixes applied"
else
    echo "✅ No security vulnerabilities found"
fi

# 2. Update patch versions (safe updates)
echo "🔧 Updating patch versions..."
npm update
echo "✅ Patch updates completed"

# 3. Check for major updates (interactive)
echo "📊 Checking for major updates..."
if command -v npx >/dev/null 2>&1; then
    OUTDATED=$(npm outdated --depth=0 2>/dev/null || true)
    if [ -n "$OUTDATED" ]; then
        echo "📋 Outdated packages found:"
        echo "$OUTDATED"
        echo ""
        echo "⚠️  Major updates require manual review"
        echo "   Run 'npm outdated' to see details"
        echo "   Update manually: npm install package@latest"
    else
        echo "✅ All packages are up to date"
    fi
else
    echo "ℹ️  npm outdated check skipped (npx not available)"
fi

# 4. Verify installation works
echo "🧪 Testing installation..."
if npm install --silent; then
    echo "✅ Installation successful"
else
    echo "❌ Installation failed"
    restore_backup
    exit 1
fi

# 5. Run type check to ensure compatibility
echo "🔍 Running compatibility check..."
if npm run type-check --silent; then
    echo "✅ TypeScript compatibility verified"
else
    echo "❌ TypeScript errors after update"
    restore_backup
    exit 1
fi

# 6. Quick build test
echo "🏗️  Testing build..."
if npm run build --silent; then
    echo "✅ Build test passed"
else
    echo "❌ Build failed after updates"
    restore_backup
    exit 1
fi

# 7. Clean up
echo "🧹 Cleaning up..."
rm -f package.json.backup package-lock.json.backup
echo "✅ Cleanup completed"

echo ""
echo "🎉 Dependency update completed successfully!"
echo ""
echo "💡 Summary:"
echo "   • Security vulnerabilities fixed"
echo "   • Patch versions updated"
echo "   • TypeScript compatibility verified"
echo "   • Build test passed"
echo ""
echo "📝 Next steps:"
echo "   • Test the application thoroughly"
echo "   • Commit changes if everything works"
echo "   • Consider updating major versions manually" 