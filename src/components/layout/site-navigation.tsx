'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavBar, MenuItem } from '@/components/ui/menu'
import { withErrorBoundary } from '@/components/ui/error-boundary'

// Navigation menu items based on live pages and strategic structure
// Note: Design system accessible at /design-system for development (not in main nav)
const navigationItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    description: 'JAHmere Webb Freedom Portal'
  },
  {
    id: 'the-case',
    label: 'The Case',
    href: '/the-case',
    description: 'Legal facts and evidence',
    badge: 'Key Facts'
  },
  {
    id: 'witnesses',
    label: 'Character Witnesses',
    href: '/witnesses',
    description: '14 community testimonials'
  },
  {
    id: 'write-letter',
    label: 'Write Letter',
    href: '/write-letter',
    description: 'Take action for JAHmere',
    badge: 'Take Action'
  }
]

interface SiteNavigationProps {
  variant?: 'default' | 'glass' | 'minimal'
  className?: string
}

function SiteNavigation({ variant = 'default', className }: SiteNavigationProps) {
  const pathname = usePathname()
  
  // Logo component
  const logo = (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
        J
      </div>
    </Link>
  )

  return (
    <NavBar
      title="JAHmere Webb Portal"
      logo={logo}
      menuItems={navigationItems}
      variant={variant}
      className={className}
    />
  )
}

// Breadcrumb component for better navigation context
interface BreadcrumbProps {
  className?: string
}

function Breadcrumb({ className }: BreadcrumbProps) {
  const pathname = usePathname()
  
  const getBreadcrumbItems = () => {
    const items = [{ label: 'Home', href: '/' }]
    
    switch (pathname) {
      case '/the-case':
        items.push({ label: 'The Case', href: '/the-case' })
        break
      case '/witnesses':
        items.push({ label: 'Character Witnesses', href: '/witnesses' })
        break
      case '/write-letter':
        items.push({ label: 'Write Letter', href: '/write-letter' })
        break
      case '/design-system':
        items.push({ label: 'Design System', href: '/design-system' })
        break
      default:
        break
    }
    
    return items
  }

  const breadcrumbItems = getBreadcrumbItems()
  
  // Don't show breadcrumb on homepage
  if (pathname === '/') {
    return null
  }

  return (
    <nav className={`py-4 px-4 bg-gray-50 border-b border-gray-200 ${className || ''}`}>
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                                 <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                   <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                 </svg>
              )}
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-gray-500 font-medium">{item.label}</span>
              ) : (
                <Link 
                  href={item.href}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

// Page wrapper component that includes navigation and breadcrumbs
interface PageLayoutProps {
  children: React.ReactNode
  showBreadcrumb?: boolean
  navVariant?: 'default' | 'glass' | 'minimal'
  className?: string
}

function PageLayout({ 
  children, 
  showBreadcrumb = true, 
  navVariant = 'default',
  className 
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${className || ''}`}>
      <SiteNavigation variant={navVariant} />
      {showBreadcrumb && <Breadcrumb />}
      <main>
        {children}
      </main>
    </div>
  )
}

export default withErrorBoundary(SiteNavigation, "SiteNavigation")
export { Breadcrumb, PageLayout }
export const WrappedBreadcrumb = withErrorBoundary(Breadcrumb, "Breadcrumb")
export const WrappedPageLayout = withErrorBoundary(PageLayout, "PageLayout") 