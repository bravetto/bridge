/**
 * IMAGE OPTIMIZATION UTILITIES
 * Low-burden, high-reward image optimization for Next.js
 */

/**
 * Get optimized sizes attribute based on image type
 * Prevents downloading desktop-sized images on mobile
 */
export function getOptimizedSizes(type: 'hero' | 'card' | 'avatar' | 'full' = 'full'): string {
  switch (type) {
    case 'hero':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px';
    case 'card':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px';
    case 'avatar':
      return '(max-width: 640px) 80px, 120px';
    case 'full':
    default:
      return '100vw';
  }
}

/**
 * Image loading priority rules
 * Only prioritize above-the-fold images
 */
export function shouldPrioritize(
  position: 'hero' | 'above-fold' | 'below-fold',
  index?: number
): boolean {
  if (position === 'hero') return true;
  if (position === 'above-fold' && (index === undefined || index < 3)) return true;
  return false;
}

/**
 * Get image quality based on importance
 * Balance between quality and performance
 */
export function getImageQuality(type: 'hero' | 'content' | 'thumbnail' = 'content'): number {
  switch (type) {
    case 'hero':
      return 85; // High quality for hero images
    case 'content':
      return 75; // Good quality for content
    case 'thumbnail':
      return 60; // Lower quality for thumbnails
    default:
      return 75;
  }
} 