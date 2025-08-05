#!/bin/bash
# deploy.sh - JAHmere Webb Freedom Portal deployment

echo "Starting deployment..."

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print status
print_status() {
    local status=$1
    local message=$2
    case $status in
        "success") echo "✅ $message" ;;
        "error") echo "❌ $message" ;;
        "warning") echo "⚠️  $message" ;;
        "info") echo "ℹ️  $message" ;;
    esac
}

# Check prerequisites
print_status "info" "Checking prerequisites..."

if ! command_exists node; then
    print_status "error" "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command_exists npm; then
    print_status "error" "npm is not installed. Please install npm first."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_status "error" "Node.js version should be 18+. Current: $(node -v)"
    exit 1
fi

print_status "success" "Prerequisites check passed"

# Install dependencies
print_status "info" "Installing dependencies..."
npm install || { print_status "error" "Failed to install dependencies"; exit 1; }
print_status "success" "Dependencies installed"

# Run type checking
print_status "info" "Running type checks..."
npm run type-check || { print_status "error" "Type errors detected"; exit 1; }

# Build the project
print_status "info" "Building project..."
npm run build || { print_status "error" "Build failed"; exit 1; }
print_status "success" "Build completed"

# Check Vercel CLI
if ! command_exists vercel; then
    print_status "info" "Installing Vercel CLI..."
    npm i -g vercel
fi

print_status "success" "Ready for deployment"
echo ""
echo "Next steps:"
echo "  vercel          # Preview deployment"
echo "  vercel --prod   # Production deployment"
echo "" 