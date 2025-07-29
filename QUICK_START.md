---
ai_tags: ["typescript", "commands"]
ai_priority: "medium"
ai_context_type: "reference"
verification_status: "unverified"
last_verified: "2025-07-28"
---

# Quick Start Guide
**JAHmere Webb Freedom Portal - Developer Setup**

## Setup (2 minutes)

```bash
# Clone and install
git clone [repo-url]
cd transformation-mvp-static
npm install

# Start development
npm run dev
# → http://localhost:1437
```

## Verify Setup
```bash
npm run type-check  # Should show 0 errors
npm run build      # Should complete successfully
npm test           # Should pass
```

## Development Workflow
```bash
# Create branch
git checkout -b feature/your-feature

# Make changes, then validate
npm run type-check && npm run build

# Commit
git add .
git commit -m "feat: description"
git push origin feature/your-feature
```

## Essential Commands
```bash
npm run dev        # Development server
npm run build      # Production build
npm run type-check # TypeScript validation
npm test          # Run tests
```

## Quality Guidelines
- TypeScript: Aim for zero errors (strict mode)
- Tests: Consider running before commit
- Build: Verify completion
- Performance: Target <3s load time

## Troubleshooting
```bash
# Port conflict
lsof -ti:1437 | xargs kill -9

# Dependency issues
rm -rf node_modules package-lock.json
npm install

# Build problems
npm run type-check  # Check TypeScript
npm run lint       # Check style
```

Ready to contribute to JAHmere's freedom case. 