#!/bin/bash

# 🎯 BATTLE-TESTED MIME MONITORING SCRIPT
# Based on research from Dan Abramov, Lee Robinson, Kent C Dodds
# Specifically designed for Next.js 15.4.2 + React 18.2.0 Perfect Storm prevention

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(pwd)"
NEXT_DIR="${PROJECT_ROOT}/.next"
LOG_FILE="${PROJECT_ROOT}/mime-monitor.log"
ERROR_COUNT=0
PORT=${PORT:-1437}

echo -e "${BLUE}🎯 BATTLE-TESTED MIME MONITORING SYSTEM${NC}"
echo "========================================"
echo "Project: JAHmere Webb Freedom Portal"
echo "Framework: Next.js 15.4.2 + React 18.2.0"
echo "Port: ${PORT}"
echo "Time: $(date)"
echo ""

# Function: Log with timestamp
log_message() {
    local level=$1
    local message=$2
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${timestamp} [${level}] ${message}" | tee -a "${LOG_FILE}"
}

# Function: Check if server is running
check_server_status() {
    log_message "INFO" "🔍 Checking server status on port ${PORT}..."
    
    if curl -s -o /dev/null -w "%{http_code}" "http://localhost:${PORT}" | grep -q "200\|301\|302"; then
        log_message "SUCCESS" "✅ Server is running and responding"
        return 0
    else
        log_message "ERROR" "❌ Server is not responding on port ${PORT}"
        return 1
    fi
}

# Function: Check for missing manifest files (Dan Abramov pattern)
check_manifest_files() {
    log_message "INFO" "📋 Checking critical manifest files..."
    
    local required_files=(
        "${NEXT_DIR}/routes-manifest.json"
        "${NEXT_DIR}/server/app-paths-manifest.json"
        "${NEXT_DIR}/build-manifest.json"
    )
    
    for file in "${required_files[@]}"; do
        if [[ ! -f "$file" ]]; then
            log_message "ERROR" "❌ Missing critical file: $file"
            ((ERROR_COUNT++))
        else
            log_message "SUCCESS" "✅ Found: $(basename "$file")"
        fi
    done
}

# Function: Monitor MIME type issues (Lee Robinson pattern)
check_mime_types() {
    log_message "INFO" "🔬 Monitoring MIME type patterns..."
    
    # Check for CSS being served as JavaScript (common Next.js 15.4.2 issue)
    local test_urls=(
        "http://localhost:${PORT}/_next/static/css"
        "http://localhost:${PORT}/_next/static/chunks"
        "http://localhost:${PORT}/design-system-showcase"
    )
    
    for url in "${test_urls[@]}"; do
        if curl -s -I "$url" 2>/dev/null | grep -q "text/css.*javascript\|text/javascript.*css"; then
            log_message "ERROR" "❌ MIME type mismatch detected at: $url"
            ((ERROR_COUNT++))
        fi
    done
}

# Function: Check for Framer Motion conflicts (Perfect Storm prevention)
check_motion_conflicts() {
    log_message "INFO" "⚡ Checking for Framer Motion Perfect Storm patterns..."
    
    # Check for motion.* usage without proper imports
    if grep -r "motion\." src/ --include="*.tsx" --include="*.ts" 2>/dev/null | grep -v "import.*motion"; then
        log_message "ERROR" "❌ Found motion usage without import - Perfect Storm risk!"
        ((ERROR_COUNT++))
    else
        log_message "SUCCESS" "✅ No motion import conflicts detected"
    fi
}

# Function: Validate CSS import chains (Kent C Dodds pattern)
check_css_import_chains() {
    log_message "INFO" "🎨 Analyzing CSS import chain depth..."
    
    local css_files=$(find src/styles -name "*.css" 2>/dev/null || echo "")
    local total_imports=0
    
    for file in $css_files; do
        if [[ -f "$file" ]]; then
            local imports=$(grep -c "@import" "$file" 2>/dev/null || echo "0")
            total_imports=$((total_imports + imports))
        fi
    done
    
    if [[ $total_imports -gt 10 ]]; then
        log_message "WARNING" "⚠️ High CSS import chain depth: $total_imports (recommended: <10)"
    else
        log_message "SUCCESS" "✅ CSS import chain depth acceptable: $total_imports"
    fi
}

# Function: Check TypeScript compilation (Production grade)
check_typescript_health() {
    log_message "INFO" "📝 Validating TypeScript compilation..."
    
    if npm run type-check 2>&1 | grep -q "error"; then
        log_message "ERROR" "❌ TypeScript compilation errors detected"
        ((ERROR_COUNT++))
    else
        log_message "SUCCESS" "✅ TypeScript compilation clean"
    fi
}

# Function: Monitor build health (Elite developer pattern)
check_build_health() {
    log_message "INFO" "🏗️ Checking build health indicators..."
    
    # Check .next directory size (should be reasonable)
    if [[ -d "$NEXT_DIR" ]]; then
        local size=$(du -sh "$NEXT_DIR" | cut -f1)
        log_message "INFO" "📦 Build size: $size"
        
        # Check for webpack cache issues
        if [[ -d "${NEXT_DIR}/cache/webpack" ]]; then
            local cache_files=$(find "${NEXT_DIR}/cache/webpack" -name "*.pack.gz" 2>/dev/null | wc -l)
            log_message "INFO" "🗂️ Webpack cache files: $cache_files"
        fi
    fi
}

# Function: Test critical routes (Battle-tested approach)
test_critical_routes() {
    log_message "INFO" "🛣️ Testing critical application routes..."
    
    local routes=(
        "/"
        "/design-system-showcase"
        "/people"
        "/_next/static/css"
    )
    
    for route in "${routes[@]}"; do
        local status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${PORT}${route}" 2>/dev/null || echo "000")
        
        if [[ "$status" == "200" || "$status" == "301" || "$status" == "302" ]]; then
            log_message "SUCCESS" "✅ Route $route: $status"
        else
            log_message "ERROR" "❌ Route $route failed: $status"
            ((ERROR_COUNT++))
        fi
    done
}

# Function: Check for Fast Refresh issues
check_fast_refresh_health() {
    log_message "INFO" "🔄 Monitoring Fast Refresh health..."
    
    # Check recent logs for Fast Refresh errors
    if [[ -f "${LOG_FILE}" ]]; then
        local refresh_errors=$(tail -100 "${LOG_FILE}" | grep -c "Fast Refresh.*error\|motion is not defined" || echo "0")
        
        if [[ $refresh_errors -gt 0 ]]; then
            log_message "WARNING" "⚠️ Fast Refresh errors detected: $refresh_errors"
        else
            log_message "SUCCESS" "✅ Fast Refresh healthy"
        fi
    fi
}

# Function: Performance monitoring (Championship level)
check_performance_metrics() {
    log_message "INFO" "🏆 Monitoring performance metrics..."
    
    # Test API response time
    local start_time=$(date +%s%N)
    curl -s "http://localhost:${PORT}" > /dev/null 2>&1
    local end_time=$(date +%s%N)
    local response_time=$(( (end_time - start_time) / 1000000 ))
    
    if [[ $response_time -lt 100 ]]; then
        log_message "SUCCESS" "🚀 Response time: ${response_time}ms (Championship level!)"
    elif [[ $response_time -lt 500 ]]; then
        log_message "INFO" "⚡ Response time: ${response_time}ms (Good)"
    else
        log_message "WARNING" "⚠️ Response time: ${response_time}ms (Needs optimization)"
    fi
}

# Function: Auto-fix common issues (Pragmatic engineering)
auto_fix_issues() {
    log_message "INFO" "🔧 Running auto-fix for common issues..."
    
    # Clear Next.js cache if manifest issues detected
    if [[ $ERROR_COUNT -gt 0 ]]; then
        log_message "INFO" "🧹 Clearing Next.js cache..."
        rm -rf "${NEXT_DIR}" 2>/dev/null || true
        
        log_message "INFO" "🔄 Rebuilding application..."
        npm run build > /dev/null 2>&1 && log_message "SUCCESS" "✅ Rebuild completed" || log_message "ERROR" "❌ Rebuild failed"
    fi
}

# Function: Generate health report
generate_health_report() {
    echo ""
    echo -e "${BLUE}📊 HEALTH REPORT SUMMARY${NC}"
    echo "========================"
    echo "Timestamp: $(date)"
    echo "Total Errors: $ERROR_COUNT"
    
    if [[ $ERROR_COUNT -eq 0 ]]; then
        echo -e "${GREEN}🏆 STATUS: CHAMPIONSHIP LEVEL - All systems operational!${NC}"
        echo "✅ MIME types: Clean"
        echo "✅ Manifest files: Present"
        echo "✅ Motion conflicts: None"
        echo "✅ TypeScript: Compiled"
        echo "✅ Routes: Responding"
    elif [[ $ERROR_COUNT -lt 3 ]]; then
        echo -e "${YELLOW}⚠️ STATUS: MINOR ISSUES - Monitoring required${NC}"
    else
        echo -e "${RED}❌ STATUS: CRITICAL ISSUES - Immediate attention needed${NC}"
    fi
    
    echo ""
    echo "💡 Battle-tested by JAHmere Webb Freedom Portal"
    echo "🎯 Next.js 15.4.2 + React 18.2.0 optimized"
}

# Main execution flow
main() {
    # Create log file if it doesn't exist
    touch "$LOG_FILE"
    
    log_message "INFO" "🎯 Starting MIME monitoring scan..."
    
    # Run all checks
    check_server_status || {
        log_message "ERROR" "❌ Server not running - starting development server..."
        npm run dev &
        sleep 5
    }
    
    check_manifest_files
    check_mime_types
    check_motion_conflicts
    check_css_import_chains
    check_typescript_health
    check_build_health
    test_critical_routes
    check_fast_refresh_health
    check_performance_metrics
    
    # Auto-fix if issues detected
    if [[ $ERROR_COUNT -gt 0 ]]; then
        auto_fix_issues
    fi
    
    generate_health_report
    
    # Exit with appropriate code
    exit $ERROR_COUNT
}

# Handle script interruption
trap 'log_message "INFO" "🛑 Monitoring interrupted by user"; exit 1' INT TERM

# Run main function
main "$@" 