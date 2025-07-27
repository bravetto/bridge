'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { 
  ChevronRight, 
  Home, 
  MoreHorizontal,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Types
interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  showHome?: boolean
  homeHref?: string
  homeIcon?: React.ComponentType<{ className?: string }>
  maxItems?: number
  className?: string
  itemClassName?: string
  currentClassName?: string
  separatorClassName?: string
  collapsible?: boolean
}

/**
 * Breadcrumbs Component
 * Features: Navigation breadcrumbs with home icon, custom separators, mobile responsive
 */
function BreadcrumbsComponent({
  items,
  separator = <ChevronRight className="w-4 h-4" />,
  showHome = true,
  homeHref = '/',
  homeIcon: HomeIcon = Home,
  maxItems = 3,
  className,
  itemClassName,
  currentClassName,
  separatorClassName,
  collapsible = true
}: BreadcrumbsProps) {
  // Process items to handle overflow
  const processedItems = React.useMemo(() => {
    if (!collapsible || items.length <= maxItems) {
      return items
    }

    // If we have more items than maxItems, show first item, ellipsis, and last few items
    const visibleCount = maxItems - 1 // Reserve one spot for ellipsis
    const startItems = items.slice(0, 1)
    const endItems = items.slice(-(visibleCount - 1))
    
    return [
      ...startItems,
      { label: '...', href: undefined, isEllipsis: true } as BreadcrumbItem & { isEllipsis: boolean },
      ...endItems
    ]
  }, [items, maxItems, collapsible])

  // Handle ellipsis click (show dropdown with hidden items)
  const [showDropdown, setShowDropdown] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Get hidden items for dropdown
  const hiddenItems = React.useMemo(() => {
    if (!collapsible || items.length <= maxItems) {
      return []
    }
    const visibleCount = maxItems - 1
    return items.slice(1, -(visibleCount - 1))
  }, [items, maxItems, collapsible])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  // Render breadcrumb item
  const renderItem = (item: BreadcrumbItem & { isEllipsis?: boolean }, index: number) => {
    const isLast = index === processedItems.length - 1
    const isCurrent = item.current || isLast
    const Icon = item.icon

    // Handle ellipsis
    if (item.isEllipsis) {
      return (
        <div key={`ellipsis-${index}`} className="relative" ref={dropdownRef}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDropdown(!showDropdown)}
            className={cn(
              'champion-text-gray-500 hover:champion-text-gray-700 champion-px-2 champion-py-1',
              itemClassName
            )}
            aria-label="Show hidden breadcrumb items"
            aria-expanded={showDropdown}
          >
            <MoreHorizontal className="w-4 h-4" />
            <ChevronDown className="w-3 h-3 champion-ml-1" />
          </Button>

          {/* Dropdown with hidden items */}
          {showDropdown && hiddenItems.length > 0 && (
            <div className="absolute top-full left-0 champion-mt-1 champion-bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[200px]">
              {hiddenItems.map((hiddenItem, hiddenIndex) => (
                <div key={`hidden-${hiddenIndex}`}>
                  {hiddenItem.href ? (
                    <Link
                      href={hiddenItem.href}
                      className="block champion-px-4 champion-py-2 text-sm champion-text-gray-700 hover:champion-bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                      onClick={() => setShowDropdown(false)}
                    >
                      <div className="flex items-center champion-space-x-2">
                        {hiddenItem.icon && (
                          <hiddenItem.icon className="w-4 h-4 champion-text-gray-500" />
                        )}
                        <span>{hiddenItem.label}</span>
                      </div>
                    </Link>
                  ) : (
                    <div className="champion-px-4 champion-py-2 text-sm champion-text-gray-700">
                      <div className="flex items-center champion-space-x-2">
                        {hiddenItem.icon && (
                          <hiddenItem.icon className="w-4 h-4 champion-text-gray-500" />
                        )}
                        <span>{hiddenItem.label}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }

    // Regular breadcrumb item
    const itemContent = (
      <div className="flex items-center champion-space-x-2">
        {Icon && (
          <Icon className={cn(
            'w-4 h-4',
            isCurrent ? 'champion-text-gray-900' : 'champion-text-gray-500'
          )} />
        )}
        <span className="truncate max-w-[150px] sm:max-w-[200px]">
          {item.label}
        </span>
      </div>
    )

    return (
      <div key={`item-${index}`} className="flex items-center">
        {item.href && !isCurrent ? (
          <Link
            href={item.href}
            className={cn(
              'champion-text-gray-500 hover:champion-text-gray-700 transition-colors champion-px-2 champion-py-1 rounded',
              itemClassName
            )}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {itemContent}
          </Link>
        ) : (
          <span
            className={cn(
              'champion-px-2 champion-py-1',
              isCurrent 
                ? cn('champion-text-gray-900 font-medium', currentClassName)
                : cn('champion-text-gray-500', itemClassName)
            )}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {itemContent}
          </span>
        )}

        {/* Separator */}
        {!isLast && (
          <div 
            className={cn(
              'champion-text-gray-400 champion-mx-2 flex-shrink-0',
              separatorClassName
            )}
            aria-hidden="true"
          >
            {separator}
          </div>
        )}
      </div>
    )
  }

  // Generate structured data for SEO
  const structuredData = React.useMemo(() => {
    const itemListElements = []
    
    if (showHome) {
      itemListElements.push({
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: homeHref
      })
    }

    items.forEach((item, index) => {
      if (item.href) {
        itemListElements.push({
          '@type': 'ListItem',
          position: (showHome ? 2 : 1) + index,
          name: item.label,
          item: item.href
        })
      }
    })

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: itemListElements
    }
  }, [items, showHome, homeHref])

  if (items.length === 0 && !showHome) {
    return null
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className={cn(
          'flex items-center champion-space-x-1 champion-py-2 overflow-x-auto',
          className
        )}
      >
        <ol className="flex items-center champion-space-x-1 min-w-0">
          {/* Home Link */}
          {showHome && (
            <li className="flex items-center">
              <Link
                href={homeHref}
                className={cn(
                  'champion-text-gray-500 hover:champion-text-gray-700 transition-colors champion-px-2 champion-py-1 rounded flex items-center',
                  itemClassName
                )}
                aria-label="Go to home page"
              >
                <HomeIcon className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </Link>

              {/* Separator after home */}
              {(items.length > 0 || processedItems.length > 0) && (
                <div 
                  className={cn(
                    'champion-text-gray-400 champion-mx-2 flex-shrink-0',
                    separatorClassName
                  )}
                  aria-hidden="true"
                >
                  {separator}
                </div>
              )}
            </li>
          )}

          {/* Breadcrumb Items */}
          {processedItems.map((item, index) => (
            <li key={`breadcrumb-${index}`} className="flex items-center min-w-0">
              {renderItem(item, index)}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export const Breadcrumbs = withErrorBoundary(BreadcrumbsComponent, "Breadcrumbs")

// Hook for automatic breadcrumb generation from pathname
export const useBreadcrumbs = (pathname: string, customLabels?: Record<string, string>) => {
  return React.useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    
    return segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/')
      const label = customLabels?.[segment] || 
                   segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
      
      return {
        label,
        href,
        current: index === segments.length - 1
      }
    })
  }, [pathname, customLabels])
}

// Example usage
export const ExampleBreadcrumbs = () => {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops', href: '/products/electronics/laptops' },
    { label: 'MacBook Pro', current: true }
  ]

  return (
    <Breadcrumbs
      items={breadcrumbItems}
      showHome={true}
      maxItems={4}
      collapsible={true}
    />
  )
}

export default Breadcrumbs 