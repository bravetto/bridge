#!/bin/bash

# SMART DEVELOPMENT STARTUP
# Intelligent dev environment setup with health checks
# Effort: 5 minutes | Reward: High (eliminates daily setup friction)

echo "🚀 Smart Development Startup"
echo "============================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project root directory"
    exit 1
fi

# 1. Quick health check
echo "🏥 Running quick health check..."
if [ -f ".next" ]; then
    echo "✅ Previous build found"
else
    echo "ℹ️  No previous build - will build fresh"
fi

# 2. Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js version $NODE_VERSION detected. Recommended: 18+"
else
    echo "✅ Node.js version OK ($NODE_VERSION)"
fi

# 3. Install dependencies if needed
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules" ]; then
    echo "📦 Installing/updating dependencies..."
    npm install --silent
    echo "✅ Dependencies updated"
else
    echo "✅ Dependencies up to date"
fi

# 4. Clear any stale caches
echo "🧹 Clearing development caches..."
rm -rf .next/cache 2>/dev/null
echo "✅ Caches cleared"

# 5. Run type check before starting
echo "🔍 Quick type check..."
if npm run type-check --silent; then
    echo "✅ TypeScript check passed"
else
    echo "⚠️  TypeScript errors found - starting anyway (will show in dev)"
fi

# 6. Start development server with optimal settings
echo ""
echo "🎯 Starting development server..."
echo "   URL: http://localhost:1437"
echo "   Press Ctrl+C to stop"
echo ""

# Use Turbopack if available, fallback to regular dev
if npm run dev:turbo >/dev/null 2>&1; then
    echo "⚡ Using Turbopack for faster development"
    npm run dev:turbo
else
    echo "🔧 Using standard Next.js dev server"
    npm run dev
fi 