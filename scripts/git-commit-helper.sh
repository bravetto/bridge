#!/bin/bash

# SMART GIT COMMIT HELPER
# Automated pre-commit checks and conventional commits
# Effort: 5 minutes | Reward: High (prevents broken commits)

echo "📝 Smart Git Commit Helper"
echo "========================="

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Error: Not in a git repository"
    exit 1
fi

# 1. Check for staged changes
if git diff --cached --quiet; then
    echo "❌ No staged changes found. Use 'git add' first."
    exit 1
fi

echo "✅ Found staged changes"

# 2. Run quick checks
echo "🔍 Running pre-commit checks..."

# Type check
if npm run type-check --silent; then
    echo "✅ TypeScript check passed"
else
    echo "❌ TypeScript errors found. Fix before committing."
    exit 1
fi

# Security check
if ./scripts/check-env-security.sh | grep -q "security issues"; then
    echo "⚠️  Security issues detected. Review before committing."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 3. Suggest commit message based on changes
echo ""
echo "📋 Analyzing changes..."

CHANGED_FILES=$(git diff --cached --name-only)
echo "Modified files:"
echo "$CHANGED_FILES" | sed 's/^/  • /'

# Suggest commit type based on changes
if echo "$CHANGED_FILES" | grep -q "package.json\|package-lock.json"; then
    SUGGESTED_TYPE="deps"
elif echo "$CHANGED_FILES" | grep -q "\.test\.\|\.spec\.\|cypress/"; then
    SUGGESTED_TYPE="test"
elif echo "$CHANGED_FILES" | grep -q "\.md$\|docs/"; then
    SUGGESTED_TYPE="docs"
elif echo "$CHANGED_FILES" | grep -q "scripts/"; then
    SUGGESTED_TYPE="build"
else
    SUGGESTED_TYPE="feat"
fi

echo ""
echo "💡 Suggested commit type: $SUGGESTED_TYPE"
echo ""

# 4. Interactive commit message creation
echo "📝 Create commit message:"
echo "Format: type(scope): description"
echo "Examples:"
echo "  feat: add image optimization utilities"
echo "  fix: resolve security header configuration"
echo "  docs: update development setup guide"
echo ""

read -p "Enter commit message: " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    echo "❌ Empty commit message. Aborting."
    exit 1
fi

# 5. Commit with message
echo ""
echo "🚀 Committing changes..."
git commit -m "$COMMIT_MSG"

if [ $? -eq 0 ]; then
    echo "✅ Commit successful!"
    echo ""
    echo "💡 Next steps:"
    echo "   • git push origin $(git branch --show-current)"
    echo "   • Or continue working and commit more changes"
else
    echo "❌ Commit failed"
    exit 1
fi 