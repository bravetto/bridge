# AI Context - DO NOT DELETE

## What This Project Is
- **Production advocacy site** for JAHmere Webb's July 28th court date (STABLE - DO NOT BREAK)
- Next.js 15.4.2 App Router architecture
- ~482 TypeScript files, 0 errors maintained
- Deployed on Vercel: july28freedom.vercel.app

## Critical Paths (DO NOT CHANGE WITHOUT TESTING)
1. `/src/app` - App Router pages (97 routes)
2. `/src/components/ui` - Shared components (52 files)
3. `/src/lib` - Core utilities and actions
4. `next.config.js` - Production optimizations configured

## Existing Patterns to Follow
- **Error Boundaries**: `withErrorBoundary(Component, "ComponentName")` - STRING ONLY
- **Server Components**: Default, see `/src/app/page.tsx`
- **Client Components**: Add 'use client', see `/src/components/ui/button.tsx`
- **Styling**: Tailwind CSS only - no CSS modules or styled-components
- **Imports**: Use @/ path aliases

## Recent Optimizations (Already Applied)
- Console.log removal in production ✅
- Error boundary v2 with reset capability ✅
- Common utilities extracted to `/src/lib/common-utils.ts` ✅
- TypeScript strict mode with 0 errors ✅

## If AI Suggests Breaking Changes
1. Ask: "Will this break the July 28th deadline functionality?"
2. Test with `npm run build` and `npm run type-check`
3. Make changes one file at a time
4. Never change package versions without explicit approval

## Performance Baselines (Don't Degrade)
- Build time: ~20s (target: <25s)
- TypeScript errors: 0 (must maintain)
- Bundle size: Largest chunk 392KB
- API response: 27-131ms 