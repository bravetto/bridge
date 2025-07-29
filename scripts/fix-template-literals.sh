#!/bin/bash

# Fix Template Literal Syntax Errors
# Converts className="...${...}" to className={`...${...}`}

echo "🔧 Fixing template literal syntax errors..."

# Find all files with template literal syntax errors
files=$(find src/app -name "*.tsx" -exec grep -l 'className=".*\${' {} \;)

for file in $files; do
    echo "Fixing: $file"
    
    # Use sed to fix the pattern
    # This converts className="...${...}" to className={`...${...}`}
    sed -i '' 's/className="\([^"]*\${\)/className={`\1/g' "$file"
    sed -i '' 's/\${\([^}]*\)}\([^"]*\)"/\${\1}\2`}/g' "$file"
done

echo "✅ Template literal syntax errors fixed!"
echo "🚀 Ready for championship build!" 