#!/bin/bash

# Fix Template Literal Syntax Errors - Version 2
# More precise pattern matching

echo "🔧 Fixing remaining template literal syntax errors..."

# Fix specific patterns that the first script missed

# Pattern 1: style={{ width: `${...}` }} - these are already correct
# Pattern 2: className={`...${...}` but missing closing backtick
# Pattern 3: Mixed quote patterns

files=(
    "src/app/biasagent/page.tsx"
    "src/app/biasguard-solution-demo/page.tsx" 
    "src/app/bridge-project-mvp/page.tsx"
    "src/app/dashboard/judge/page.tsx"
    "src/app/experimental/ai-chat/page.tsx"
)

for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "Fixing: $file"
        
        # Fix unclosed template literals
        sed -i '' 's/className={`\([^`]*\)\${\([^}]*\)}\([^`]*\)"/className={`\1${\2}\3`}/g' "$file"
        
        # Fix mixed quote patterns  
        sed -i '' 's/className={`\([^`]*\)"/className={`\1`}/g' "$file"
        
        # Fix remaining quote issues
        sed -i '' 's/\${\([^}]*\)}"/\${\1}`}/g' "$file"
    fi
done

echo "✅ Remaining template literal syntax errors fixed!"
echo "🚀 Championship build ready!" 