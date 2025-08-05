# 🔍 AI X-Ray Codebase Map
## JAHmere Webb Freedom Portal - August 25th Mission

## 🎯 Essential Files Every AI Should Know

### **Universal Dependencies (Import These First)**
- `src/lib/utils.ts` - **cn()** function used in 90%+ components
- `src/components/ui/error-boundary.tsx` - **withErrorBoundary** wrapper
- `src/app/layout.tsx` - Global layout and providers
- `src/app/page.tsx` - Main entry point

### **Most Imported Components**
1. `@/lib/utils` - Universal utilities (cn function)
2. `@/components/ui/card` - Card component
3. `@/components/ui/typography` - Text components  
4. `@/components/ui/container` - Layout containers
5. `@/components/ui/button` - Button component

## 🗂️ File Structure Guide

### **Pages** (`src/app/`)
- `page.tsx` - Homepage
- `the-case/page.tsx` - Legal case information
- `witnesses/page.tsx` - Character witnesses
- `write-letter/page.tsx` - Letter writing tool
- `contact/page.tsx` - Contact form
- `design-system/page.tsx` - Component showcase

### **UI Components** (`src/components/ui/`)
All components use:
- `withErrorBoundary(Component, "ComponentName")` - STRING parameter only
- `cn()` from `@/lib/utils` for Tailwind class merging
- TypeScript interfaces for props

### **Core Patterns**
- **Error Boundaries**: Wrap all components
- **Dynamic Imports**: Used to prevent hydration issues
- **Client Components**: Only when `'use client'` needed
- **Tailwind Only**: No CSS modules, use `cn()` for styling

## 🚀 Quick Start for AI

1. **Check `src/lib/utils.ts`** - Universal utilities
2. **Review `src/app/page.tsx`** - Main page structure  
3. **Examine `src/components/ui/`** - Reusable components
4. **Follow import patterns** - `@/` aliases, cn() usage

## ⚡ Performance Notes
- Build time: ~10s (championship level)
- API responses: <100ms
- Error boundary coverage: 90%+
- All components TypeScript strict mode

**Mission**: Every change serves JAHmere Webb's August 25th court date through pragmatic excellence over technical perfection. 