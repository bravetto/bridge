---
ai_tags: ["commands", "july-28-deadline"]
ai_priority: "medium"
ai_context_type: "reference"
verification_status: "unverified"
last_verified: "2025-07-28"
---

# 🏆 Production Design System
**Single Source of Truth - July 28th Mission**

## Quick Start (30 seconds)

```bash
# 1. Generate page inventory
node scripts/page-optimizer.js inventory

# 2. Optimize all pages  
node scripts/page-optimizer.js all

# 3. Build and deploy
npm run build && npm run deploy
```

## System Overview

**One CSS file**: `src/styles/production.css`  
**One script**: `scripts/page-optimizer.js`  
**One goal**: Championship performance for July 28th

### Color System
```css
--primary-600: #2563eb    /* Core brand blue */
--accent-500: #f59e0b     /* Conversion gold */
--neutral-900: #111827    /* Primary text */
```

### Component Classes
```html
<!-- Buttons -->
<button class="btn btn-primary">Primary Action</button>
<button class="btn btn-accent">Call to Action</button>

<!-- Typography -->
<h1 class="heading-1">Page Title</h1>
<p class="text-primary">Body text</p>

<!-- Layout -->
<div class="container">
  <div class="grid grid-3">
    <div class="card">Content</div>
  </div>
</div>

<!-- Forms -->
<input class="input" type="text" placeholder="Enter text">
```

## Page Optimization

### Optimize Single Page
```bash
node scripts/page-optimizer.js /contact
node scripts/page-optimizer.js /people/jordan-dungy
```

### Optimize All Pages
```bash
node scripts/page-optimizer.js all
```

### Check What Needs Work
```bash
node scripts/page-optimizer.js inventory
cat page-inventory.json
```

## Performance Targets
- ✅ Build time: <10s
- ✅ Bundle size: <50KB CSS
- ✅ Mobile-first: 44px touch targets
- ✅ Accessibility: WCAG AA compliance

## File Structure
```
src/styles/production.css     # Single design system
scripts/page-optimizer.js     # Optimization tool
page-inventory.json          # Page status report
README-SYSTEM.md            # This file (only doc needed)
```

**That's it.** No more complex documentation. Just optimize and ship. 🚀 