---
ai_tags: []
ai_priority: "medium"
ai_context_type: "reference"
verification_status: "unverified"
last_verified: "2025-07-28"
---

# Design System
**Working patterns from actual code**

## Colors
```css
/* Primary gradient - used in 50+ components */
bg-gradient-to-r from-purple-600 to-blue-600

/* Background - standard page background */  
bg-gradient-to-br from-slate-50 via-white to-blue-50/30

/* Text gradient - headings */
bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent
```

## Glass Effects
```css
/* Light glass - cards */
bg-white/60 backdrop-blur-xl border border-white/30

/* Medium glass - interactive elements */
bg-white/80 backdrop-blur-sm border border-white/20

/* Heavy glass - overlays */
bg-white/10 backdrop-blur-3xl border border-white/20
```

## Components
```typescript
// Working imports
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Heading, Text } from '@/components/ui/typography'
import { withErrorBoundary } from '@/components/ui/error-boundary'

// Basic pattern
export default function MyComponent() {
  return (
    <Container className="py-20">
      <Card className="p-8 bg-white/60 backdrop-blur-xl">
        <Heading as="h1">Title</Heading>
        <Text>Content</Text>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
          Action
        </Button>
      </Card>
    </Container>
  )
}

export default withErrorBoundary(MyComponent, "MyComponent")
```

## CSS Files
```css
/* Use this */
@import '../styles/design-system-unified.css';

/* Avoid legacy files */
```

Source: Extracted from working components, July 2025 