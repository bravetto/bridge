import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
  quality?: number
}

/**
 * Optimized Image Component
 * Leverages Next.js Image with fallback handling and performance optimization
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  fill = false,
  quality = 85,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  // Progressive fallback system
  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      
      // Try different formats in order of preference
      if (imgSrc.includes('.avif')) {
        setImgSrc(imgSrc.replace('.avif', '.webp'))
      } else if (imgSrc.includes('.webp')) {
        setImgSrc(imgSrc.replace('.webp', '.jpg'))
      } else if (imgSrc.includes('.jpg') || imgSrc.includes('.jpeg')) {
        setImgSrc('/images/fallbacks/default-fallback.jpg')
      } else {
        setImgSrc('/images/fallbacks/default-profile.svg')
      }
    }
  }

  const baseProps = {
    src: imgSrc,
    alt,
    className,
    quality,
    onError: handleError,
    ...props
  }

  if (fill) {
    return (
      <Image
        {...baseProps}
        fill
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        priority={priority}
      />
    )
  }

  return (
    <Image
      {...baseProps}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
    />
  )
}

/**
 * Profile Image Component
 * Optimized for character witness and founder profiles
 */
export function ProfileImage({
  src,
  alt,
  size = 'md',
  priority = false,
  className = '',
}: {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  priority?: boolean
  className?: string
}) {
  const sizeMap = {
    sm: { width: 80, height: 80 },
    md: { width: 120, height: 120 },
    lg: { width: 200, height: 200 },
    xl: { width: 300, height: 300 }
  }

  const { width, height } = sizeMap[size]

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-full object-cover ${className}`}
      priority={priority}
      sizes="(max-width: 768px) 120px, 200px"
    />
  )
}

/**
 * Hero Image Component
 * Optimized for above-the-fold hero sections
 */
export function HeroImage({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1200}
      height={630}
      className={`w-full h-auto ${className}`}
      priority={true}
      sizes="(max-width: 768px) 100vw, 1200px"
      quality={90}
    />
  )
}