---
ai_tags: ["typescript", "next-js", "commands", "july-28-deadline"]
ai_priority: "medium"
ai_context_type: "reference"
verification_status: "unverified"
last_verified: "2025-07-28"
---

# 🎯 Framer Motion Hybrid Approach - Proven Patterns for Next.js 15

## Executive Summary

**Status**: ✅ WORKING - Framer Motion successfully operates with Next.js 15.4.2
**Evidence**: `landing-page-2025.tsx` (791 lines) runs without Perfect Storm issues
**Approach**: Hybrid - Framer Motion for complex animations, CSS for simple ones
**Guard**: AI drift prevention system active to maintain working patterns

## The Reality Check

### What We Discovered
1. **Framer Motion WORKS** with our current Next.js 15.4.2 setup
2. **The "Perfect Storm" was overblown** - existing implementation proves compatibility
3. **Complex wrappers are unnecessary** - direct Framer Motion usage is functional
4. **AI drift was creating solutions for non-existent problems**

### Current Working Implementation
- **File**: `src/components/ui/landing-page-2025.tsx`
- **Size**: 791 lines
- **Framer Motion Usage**: Extensive (motion.div, AnimatePresence, useScroll, etc.)
- **Status**: Functional, no runtime errors
- **Performance**: Acceptable for production use

## Proven Patterns That Work

### ✅ Safe Framer Motion Patterns

```typescript
// 1. Basic motion components
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  Content
</motion.div>

// 2. Scroll-triggered animations
const { scrollYProgress } = useScroll()
const yTransform = useTransform(scrollYProgress, [0, 1], [0, -50])

// 3. Hover interactions
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive element
</motion.div>

// 4. Staggered animations
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ staggerChildren: 0.1 }}
>
  {items.map((item, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>

// 5. AnimatePresence for conditional rendering
<AnimatePresence mode="wait">
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      Conditional content
    </motion.div>
  )}
</AnimatePresence>
```

### ⚠️ Patterns to Avoid

```typescript
// DON'T: Route-level animations (problematic with App Router)
<AnimatePresence>
  <motion.div layoutId="page-transition">
    {/* Route content */}
  </motion.div>
</AnimatePresence>

// DON'T: Complex router context manipulation
const frozenRouterContext = usePreviousValue(routerContext)

// DON'T: Over-engineered animation systems
<ComplexAnimationWrapper>
  <NestedAnimationProvider>
    <OverEngineeredComponent />
  </NestedAnimationProvider>
</ComplexAnimationWrapper>
```

## Hybrid Approach Guidelines

### When to Use Framer Motion
- **Scroll-triggered animations** (useScroll, useTransform)
- **Complex orchestrated sequences** (staggered animations)
- **Interactive feedback** (drag, hover with physics)
- **Conditional animations** (AnimatePresence)
- **Custom easing and spring physics**

### When to Use CSS Animations
- **Simple hover effects** (transition: transform 0.2s)
- **Loading spinners** (CSS keyframes)
- **Basic fade in/out** (opacity transitions)
- **Simple scale/rotate effects**

### Component Size Guidelines
- **Maximum**: 500 lines per component
- **Current violation**: `landing-page-2025.tsx` (791 lines)
- **Solution**: Break into smaller, focused components
- **Priority**: Low (working code trumps perfect structure)

## AI Drift Prevention Rules

### 1. If It Works, Don't "Fix" It
- **Current Status**: Framer Motion is working
- **Action**: Maintain existing patterns
- **Forbidden**: Refactoring working animations to CSS

### 2. No Perfect Storm Solutions
- **Forbidden Patterns**: FrozenRouter, LayoutRouterContext wrappers
- **Reason**: Adding complexity to solve non-existent problems
- **Evidence**: Current implementation works without these

### 3. Performance Pragmatism
- **Rule**: Only optimize when there's evidence of performance issues
- **Current State**: No performance problems detected
- **Action**: Monitor, don't preemptively optimize

### 4. Mission-First Approach
- **Deadline**: July 28th court date
- **Priority**: Functional delivery over technical perfection
- **Risk Tolerance**: Low for working features

## Implementation Standards

### File Organization
```
src/
├── components/
│   ├── ui/
│   │   ├── landing-page-2025.tsx (WORKING - maintain)
│   │   └── framer-motion-wrapper.tsx (OPTIONAL - only if needed)
│   └── animations/
│       ├── scroll-animations.tsx
│       └── interaction-animations.tsx
├── agents/
│   ├── framer-hybrid-guard.ts (AI drift prevention)
│   └── framer-hybrid-guard-cli.ts (testing tool)
```

### Development Workflow
1. **Before making changes**: Run hybrid guard analysis
2. **For new animations**: Use proven patterns from this document
3. **For performance issues**: Measure first, optimize second
4. **For complex changes**: Get user approval before implementation

## Testing and Validation

### Automated Checks
```bash
# Run hybrid guard analysis
npx tsx src/agents/framer-hybrid-guard-cli.ts

# Check TypeScript compliance
npm run type-check

# Verify build success
npm run build
```

### Manual Validation
1. **Visual Testing**: Animations work as expected
2. **Performance Testing**: No janky animations
3. **User Experience**: Smooth interactions
4. **Error Monitoring**: No console errors

## Current Status Report

### Analysis Results (Latest)
- **Drift Score**: 40/100 (Some drift detected)
- **Primary Issue**: Component size (791 lines)
- **Secondary Issue**: Mixed animation approaches
- **Recommendation**: Break component down, maintain Framer Motion patterns

### Violations Detected
1. **Component Size**: 791 lines (limit: 500) - MEDIUM severity
2. **Mixed Patterns**: Some CSS classes detected - LOW severity

### Proposal Validation Results
- ❌ **Refactor to CSS**: BLOCKED (working code protection)
- ❌ **Add FrozenRouter**: BLOCKED (unnecessary complexity)
- ✅ **Performance optimization**: APPROVED (with evidence)

## Maintenance Guidelines

### Regular Tasks
- **Weekly**: Run hybrid guard analysis
- **Before major changes**: Validate against guard rules
- **After updates**: Verify Framer Motion compatibility
- **Monthly**: Review component sizes and break down if needed

### Emergency Protocols
- **If animations break**: Revert to last working state
- **If performance degrades**: Use guard analysis to identify issues
- **If deadline approaches**: Freeze non-critical animation changes

## Conclusion

The Framer Motion hybrid approach is **WORKING** and **PROVEN** in our Next.js 15.4.2 environment. The AI drift prevention system is in place to maintain this success by:

1. **Protecting working patterns** from unnecessary "optimization"
2. **Preventing over-engineering** of animation solutions
3. **Maintaining pragmatic focus** on mission delivery
4. **Enforcing component size limits** for maintainability

**Key Principle**: Working code is more valuable than perfect code, especially with mission-critical deadlines. 