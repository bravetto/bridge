'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavBarComponent as NavBar, MenuItem } from '@/components/ui/menu'
import { withErrorBoundary } from '@/components/ui/error-boundary'

const navigationItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    description: 'JAHmere Webb Portal'
  },
  {
    id: 'the-case',
    label: 'The Case',
    href: '/the-case',
    description: 'Legal facts',
    badge: 'Key Facts'
  },
  {
    id: 'witnesses',
    label: 'Witnesses',
    href: '/witnesses',
    description: 'Community support'
  },
  {
    id: 'write-letter',
    label: 'Write Letter',
    href: '/write-letter',
    description: 'Take action',
    badge: 'Action'
  },
  {
    id: 'founders',
    label: 'The Bridge',
    href: '/founders',
    description: 'Meet the team',
    badge: 'Trinity'
  }
]

interface SiteNavigationProps {
  className?: string
}

function SiteNavigation({ className }: SiteNavigationProps) {
  const logo = (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
        J
      </div>
    </Link>
  )

  return (
    <NavBar
      title="JAHmere Webb Portal"
      logo={logo}
      menuItems={navigationItems}
      className={className}
    />
  )
}

function Breadcrumb({ className }: { className?: string }) {
  const pathname = usePathname()
  const [isHydrated, setIsHydrated] = React.useState(false)
  
  React.useEffect(() => {
    setIsHydrated(true)
  }, [])
  
  if (pathname === '/' || !isHydrated) {
    return null
  }

  const getPageName = () => {
    switch (pathname) {
      case '/the-case': return 'The Case'
      case '/witnesses': return 'Witnesses'
      case '/founders': return 'Founders'
      case '/jordan-dungy': return 'Jordan Dungy'
      case '/michael-mataluni': return 'Michael Mataluni'
      case '/write-letter': return 'Write Letter'
      default: return 'Page'
    }
  }

  return (
    <nav className={`py-4 px-4 bg-gray-50 border-b border-gray-200 ${className || ''}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-500">{getPageName()}</span>
        </div>
      </div>
    </nav>
  )
}

interface PageLayoutProps {
  children: React.ReactNode
  showBreadcrumb?: boolean
  className?: string
}

function PageLayout({ children, showBreadcrumb = true, className }: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${className || ''}`}>
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