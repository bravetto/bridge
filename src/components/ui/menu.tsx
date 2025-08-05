'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { withErrorBoundary } from '@/components/ui/error-boundary'

// Menu Item Interface
export interface MenuItem {
  id: string
  label: string
  href?: string
  icon?: React.ReactNode
  description?: string
  badge?: string
  onClick?: () => void
  children?: MenuItem[]
}

export interface MenuProps {
  items: MenuItem[]
  trigger?: React.ReactNode
  className?: string
  onItemClick?: (item: MenuItem) => void
}

function MenuComponent({
  items,
  trigger,
  className,
  onItemClick
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [, setIsHydrated] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleItemClick = (item: MenuItem) => {
    setIsOpen(false)
    onItemClick?.(item)
    item.onClick?.()
  }

  const defaultTrigger = (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      <MenuIcon className="w-5 h-5" />
    </button>
  )

  return (
    <div className={cn("relative inline-block", className)}>
      {trigger ? (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
          className="w-full"
        >
          {trigger}
        </button>
      ) : (
        defaultTrigger
      )}

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute z-50 top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="py-2">
            {items.map((item) => (
              <div key={item.id}>
                {item.href ? (
                  <Link href={item.href} className="block">
                    <div className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleItemClick(item)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export interface NavBarProps {
  title?: string
  logo?: React.ReactNode
  menuItems: MenuItem[]
  className?: string
}

export function NavBar({ 
  title: _title, 
  logo, 
  menuItems, 
  className = '' 
}: NavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  // Handle hydration to prevent SSR/client mismatch
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
    
    return undefined
  }, [isMobileMenuOpen])

  return (
    <nav className={`sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm ${className}`} suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div>
            {logo}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {menuItems.map((item) => (
              <div key={item.id} className="relative">
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 text-gray-700 hover:text-blue-700 hover:bg-blue-50 ${
                      isHydrated && pathname === item.href
                        ? 'text-blue-700 bg-blue-50'
                        : ''
                    }`}
                  >
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={item.onClick}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-150"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-button inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-150"
              aria-label="Toggle mobile menu"
              aria-expanded={isHydrated ? isMobileMenuOpen : false}
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && isHydrated && (
          <div className="md:hidden" ref={menuRef}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {menuItems.map((item) => (
                <div key={item.id}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 text-base font-medium rounded-lg transition-all duration-150 text-gray-700 hover:text-blue-700 hover:bg-blue-50 ${
                        isHydrated && pathname === item.href
                          ? 'text-blue-700 bg-blue-50'
                          : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        item.onClick?.()
                        setIsMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-150"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Icon Components
function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}



// Export wrapped components
export const Menu = withErrorBoundary(MenuComponent, "Menu")
export const NavBarComponent = withErrorBoundary(NavBar, "NavBarComponent") 