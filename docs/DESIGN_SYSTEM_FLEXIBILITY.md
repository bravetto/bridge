---
ai_tags: ["typescript", "commands"]
ai_priority: "medium"
ai_context_type: "reference"
verification_status: "unverified"
last_verified: "2025-07-28"
---

# 🎚️ Design System Flexibility Guide

**How to work with the Championship Design System at different constraint levels**

## Quick Start: Taking Control

If you need immediate flexibility, you can:

1. **Use Design Mode Context** (Recommended)
   ```tsx
   import { DesignModeProvider } from '@/components/ui/design-mode-context'
   
   // Wrap your component/page with flexible mode
   <DesignModeProvider defaultMode="flexible">
     <YourComponent />
   </DesignModeProvider>
   ```

2. **Override with Custom Classes** (Quick Fix)
   ```tsx
   // Instead of fighting the system, extend it
   <Button className="bg-custom-blue hover:bg-custom-blue-dark">
     Custom Button
   </Button>
   ```

3. **Use Tailwind Arbitrary Values** (Escape Hatch)
   ```tsx
   // For one-off customizations
   <div className="bg-[#your-exact-color] p-[17px] text-[14.5px]">
     Completely custom styling
   </div>
   ```

## The Four Flexibility Modes

### 🔒 **Mode 1: Championship Strict**
**When to use**: Production pages, user-facing content, brand consistency
**Constraints**: All design tokens must be used exactly as specified
**Override**: Not recommended, but possible with `!important` or custom CSS

```tsx
// Strict mode - follows all design system rules
<DesignModeProvider defaultMode="strict">
  <HomePage />
</DesignModeProvider>
```

### 🎯 **Mode 2: Championship Guided** (Default)
**When to use**: Most development work, prototyping, testing
**Constraints**: Core brand colors required, spacing/typography flexible
**Override**: Easy with custom Tailwind classes

```tsx
// Guided mode - reasonable flexibility
<DesignModeProvider defaultMode="guided">
  <div className="bg-champion-purple-600 p-8 text-lg"> {/* System colors */}
    <div className="mt-7 text-[15px]"> {/* Custom spacing/typography */}
      Content with mixed constraints
    </div>
  </div>
</DesignModeProvider>
```

### 🔓 **Mode 3: Championship Flexible**
**When to use**: Admin tools, one-off pages, experimental features
**Constraints**: Only accessibility and performance rules apply
**Override**: Full control with any styling approach

```tsx
// Flexible mode - maximum creative freedom
<DesignModeProvider defaultMode="flexible">
  <div className="bg-gradient-to-r from-pink-500 to-violet-500 p-12">
    <h1 className="font-comic-sans text-7xl">
      Completely custom design
    </h1>
  </div>
</DesignModeProvider>
```

### 🚪 **Mode 4: Championship Minimal** (Escape Hatch)
**When to use**: Emergency fixes, rapid prototyping, edge cases
**Constraints**: Only technical requirements (TypeScript, accessibility)
**Override**: Anything goes as long as it works

```tsx
// Minimal mode - emergency escape hatch
<DesignModeProvider defaultMode="minimal">
  <div style={{ backgroundColor: '#whatever', padding: '13px' }}>
    Emergency styling with inline styles if needed
  </div>
</DesignModeProvider>
```

## Practical Override Techniques

### 1. **Component-Level Overrides**
```tsx
import { useCanCustomize } from '@/components/ui/design-mode-context'

function MyComponent() {
  const canCustomize = useCanCustomize()
  
  return (
    <div className={`
      ${canCustomize.colors ? 'bg-custom-green' : 'bg-champion-green-500'}
      ${canCustomize.spacing ? 'p-7' : 'p-6'}
    `}>
      Adaptive component based on design mode
    </div>
  )
}
```

### 2. **Page-Level Mode Setting**
```tsx
// pages/experimental/page.tsx
import { DesignModeProvider } from '@/components/ui/design-mode-context'

export default function ExperimentalPage() {
  return (
    <DesignModeProvider defaultMode="flexible">
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500">
        <h1 className="text-6xl font-bold text-white pt-20 text-center">
          Experimental Design
        </h1>
        {/* Full creative freedom here */}
      </div>
    </DesignModeProvider>
  )
}
```

### 3. **Development Toggle**
```tsx
// Add to your layout for easy mode switching during development
import { DesignModeToggle } from '@/components/ui/design-mode-context'

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <DesignModeToggle /> {/* Shows in development only */}
      </body>
    </html>
  )
}
```

## Working with AI Assistant Context

### Tell the AI Your Preferred Mode
When working with the AI assistant, you can specify your constraint preference:

```
"I'm working in Championship Flexible mode, so I want more creative freedom with colors and spacing while maintaining accessibility."
```

### Override System Suggestions
```
"Ignore the design system constraints for this component - I need complete custom styling for this prototype."
```

### Request Specific Flexibility
```
"Use the design system as a starting point, but I want to customize the colors and spacing for this specific use case."
```

## Non-Negotiable Elements

Regardless of flexibility mode, these remain enforced:

- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: <100ms render times
- **TypeScript**: Proper typing
- **Error Boundaries**: Graceful failure handling
- **Mobile Responsiveness**: Touch-friendly interfaces

## Quick Reference Commands

```bash
# Check current design system usage
npm run design:audit

# Generate custom color palette
npm run design:colors

# Validate accessibility compliance
npm run a11y:check

# Performance impact assessment
npm run perf:measure
```

## Common Escape Patterns

### 1. **Custom Color Palette**
```css
/* Add to your component CSS */
.my-custom-theme {
  --custom-primary: #your-color;
  --custom-secondary: #another-color;
}
```

### 2. **Arbitrary Tailwind Values**
```tsx
<div className="bg-[#ff6b35] text-[17px] leading-[1.3] tracking-[0.02em]">
  Precise custom styling
</div>
```

### 3. **CSS-in-JS Override**
```tsx
<div style={{
  background: 'linear-gradient(45deg, #your-color 30%, #another-color 90%)',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
}}>
  Complete style override
</div>
```

## When to Use Each Approach

| Situation | Recommended Mode | Override Method |
|-----------|------------------|-----------------|
| Production homepage | Strict | None - follow system |
| Feature prototyping | Guided | Tailwind arbitrary values |
| Admin dashboard | Flexible | Custom CSS classes |
| Emergency bug fix | Minimal | Inline styles if needed |
| A/B testing | Guided/Flexible | Component-level overrides |
| Third-party integration | Flexible/Minimal | CSS-in-JS or custom CSS |

Remember: **The design system is here to help, not hinder. Use the flexibility modes to match your needs while maintaining quality standards.** 