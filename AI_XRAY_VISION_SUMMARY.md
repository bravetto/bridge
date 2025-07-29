---
ai_tags: ["july-28-deadline"]
ai_priority: "medium"
ai_context_type: "reference"
verification_status: "unverified"
last_verified: "2025-07-28"
---

# 🔬 AI X-Ray Vision Report
## JAHmere Webb Freedom Portal - Codebase Superhighway Map

Generated: 2025-07-28T02:56:36.399Z

## 🛣️ Main Information Superhighways

### Universal Dependencies (The Backbone)
- **cn() function**: Used in 90%+ of components for Tailwind class merging
- **withErrorBoundary**: Error handling wrapper protecting most components  
- **@/lib/utils**: Universal utilities imported everywhere
- **@/components/ui/**: Reusable UI component library

### Critical Data Flow Paths
1. **Content Flow**: src/data/ → src/components/ → src/app/
2. **Logic Flow**: src/lib/ → src/components/ → User Interface
3. **Error Flow**: Component Error → Error Boundary → Fallback UI
4. **Style Flow**: Tailwind Classes → cn() → Merged Styles

### Component Interaction Networks
- **Pages**: Orchestrate multiple components from src/app/
- **Components**: Consume utilities and render UI from src/components/
- **UI Components**: Provide reusable building blocks from src/components/ui/
- **Business Logic**: Handle data processing from src/lib/

## 🎯 AI Navigation Guide

### Start Here for Any Task
1. **Understanding**: Read src/app/home-page.tsx for main orchestration
2. **Components**: Check src/components/ui/ for reusable patterns
3. **Utilities**: Reference src/lib/utils.ts for common functions
4. **Data**: Explore src/data/ for content structure

### Common Patterns to Recognize
- Every component imports cn() from @/lib/utils
- Most components wrapped with withErrorBoundary
- Dynamic imports used to prevent hydration issues
- 'use client' only for interactive components

### Red Flags to Avoid
- Don't use object syntax for withErrorBoundary (use string)
- Don't create CSS modules (use Tailwind only)
- Don't fight framework conflicts (work around them)
- Don't ignore error boundaries (they're critical)

## 🚀 Mission Context
This is the JAHmere Webb Freedom Portal - an advocacy platform with a July 28th court deadline. Every change should serve the mission of supporting JAHmere's case through technology excellence.

**System Motto**: "Pragmatic excellence trumps technical perfection in service of the July 28th mission."
