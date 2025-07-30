'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
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

// Main Menu Component
export interface MenuProps {
  items: MenuItem[]
  trigger?: React.ReactNode
  variant?: 'default' | 'glass' | 'minimal'
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
  className?: string
  onItemClick?: (item: MenuItem) => void
}

function MenuComponent({
  items,
  trigger,
  variant = 'default',
  position = 'bottom-left',
  className,
  onItemClick
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Prevent hydration mismatch by only showing animations after hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setActiveSubmenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close menu on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setActiveSubmenu(null)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      setActiveSubmenu(activeSubmenu === item.id ? null : item.id)
    } else {
      setIsOpen(false)
      setActiveSubmenu(null)
      onItemClick?.(item)
      item.onClick?.()
    }
  }

  const menuVariants = {
    default: 'bg-white border border-gray-200 shadow-xl',
    glass: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl',
    minimal: 'bg-white border-0 shadow-lg'
  }

  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2'
  }

  const defaultTrigger = (
    <button
      type="button"
      ref={triggerRef}
      onClick={() => setIsOpen(!isOpen)}
      className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      <MenuIcon className={cn("w-5 h-5 transition-transform duration-200", isOpen && "rotate-90")} />
    </button>
  )

  return (
    <div className={cn("relative inline-block", className)}>
      {trigger ? (
        <div 
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
          role="button"
          tabIndex={0}
        >
          {trigger}
        </div>
      ) : (
        defaultTrigger
      )}

      {/* Menu Overlay */}
      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            "absolute z-50 min-w-[240px] rounded-xl overflow-hidden",
            isHydrated && "animate-in fade-in-0 zoom-in-95 duration-200",
            menuVariants[variant],
            positionClasses[position]
          )}
        >
          <div className="py-2">
            {items.map((item, index) => (
              <MenuItem
                key={item.id}
                item={item}
                isActive={activeSubmenu === item.id}
                onItemClick={handleItemClick}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Individual Menu Item Component
interface MenuItemProps {
  item: MenuItem
  isActive: boolean
  onItemClick: (item: MenuItem) => void
  index: number
}

function MenuItem({ item, isActive, onItemClick, index }: MenuItemProps) {
  const hasChildren = item.children && item.children.length > 0
  const Component = item.href ? Link : 'button'

  const itemContent = (
          <button
        type="button"
        className={cn(
          "flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-150",
          "hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 focus:outline-none",
          "group animate-in slide-in-from-left-1 duration-200",
          isActive && "bg-blue-50 text-blue-700"
        )}
        onClick={() => onItemClick(item)}
    >
      <div className="flex items-center space-x-3 flex-1">
        {item.icon && (
          <div className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors">
            {item.icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
            {item.label}
          </div>
          {item.description && (
            <div className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors truncate">
              {item.description}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {item.badge && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronRightIcon className={cn(
            "w-4 h-4 text-gray-400 transition-transform duration-200",
            isActive && "rotate-90"
          )} />
        )}
      </div>
    </button>
  )

  return (
    <>
      {item.href ? (
        <Link href={item.href} className="block">
          {itemContent}
        </Link>
      ) : (
        itemContent
      )}
      
      {/* Submenu */}
      {hasChildren && isActive && (
        <div className="bg-gray-50 border-t border-gray-100 animate-in slide-in-from-top-1 duration-200">
          {item.children!.map((child, childIndex) => (
            <div
              key={child.id}
              className="pl-12 animate-in slide-in-from-left-1 duration-200"
            >
              {child.href ? (
                <Link href={child.href} className="block">
                  <div className="flex items-center justify-between py-2 px-4 text-sm text-gray-600 hover:text-blue-700 hover:bg-white transition-all duration-150 rounded-md mx-2">
                    <span>{child.label}</span>
                    {child.badge && (
                      <span className="text-xs text-gray-400">{child.badge}</span>
                    )}
                  </div>
                </Link>
              ) : (
                <button
                  onClick={() => onItemClick(child)}
                  className="w-full flex items-center justify-between py-2 px-4 text-sm text-gray-600 hover:text-blue-700 hover:bg-white transition-all duration-150 rounded-md mx-2 text-left"
                >
                  <span>{child.label}</span>
                  {child.badge && (
                    <span className="text-xs text-gray-400">{child.badge}</span>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

// Navigation Bar Component
export interface NavBarProps {
  title?: string
  logo?: React.ReactNode
  menuItems: MenuItem[]
  className?: string
  variant?: 'default' | 'glass' | 'minimal'
}

function NavBarComponent({
  title = "JAHmere Webb Portal",
  logo,
  menuItems,
  className,
  variant = 'default'
}: NavBarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  // Prevent hydration mismatch by only showing animations after hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const navVariants = {
    default: 'bg-white border-b border-gray-200',
    glass: 'bg-white/80 backdrop-blur-md border-b border-white/20',
    minimal: 'bg-transparent'
  }

  return (
    <nav className={cn("sticky top-0 z-40", navVariants[variant], className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex items-center space-x-3">
            {logo && <div className="flex-shrink-0">{logo}</div>}
            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-150"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
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
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-150"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={cn(
            "md:hidden",
            isHydrated && "animate-in slide-in-from-top-1 duration-200"
          )}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {menuItems.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    isHydrated && "animate-in slide-in-from-left-1 duration-200"
                  )}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-150"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        item.onClick?.()
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-150"
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
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
  )
}

// Export wrapped components
export const Menu = withErrorBoundary(MenuComponent, "Menu")
export const NavBar = withErrorBoundary(NavBarComponent, "NavBar") 