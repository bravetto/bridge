'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Home,
  User,
  Settings,
  LogOut,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

// Types
interface MenuItem {
  id: string
  label: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  children?: MenuItem[]
  external?: boolean
  onClick?: () => void
  badge?: string | number
  disabled?: boolean
}

interface MobileMenuProps {
  items: MenuItem[]
  className?: string
  onItemClick?: (item: MenuItem) => void
  logo?: React.ReactNode
  userSection?: React.ReactNode
  isOpen?: boolean
  onToggle?: (isOpen: boolean) => void
}

/**
 * Mobile Menu Component
 * Features: Hamburger menu, slide-out navigation, accessibility, keyboard support
 */
function MobileMenuComponent({
  items,
  className,
  onItemClick,
  logo,
  userSection,
  isOpen: controlledIsOpen,
  onToggle
}: MobileMenuProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [focusedIndex, setFocusedIndex] = useState(-1)
  
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  // Use controlled or internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = onToggle || setInternalIsOpen

  // Handle menu toggle
  const toggleMenu = useCallback(() => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setFocusedIndex(-1)
      setExpandedItems(new Set())
    }
  }, [isOpen, setIsOpen])

  // Handle item expansion
  const toggleExpanded = useCallback((itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }, [])

  // Handle item click
  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.disabled) return
    
    if (item.children) {
      toggleExpanded(item.id)
    } else {
      if (item.onClick) {
        item.onClick()
      }
      onItemClick?.(item)
      setIsOpen(false) // Close menu after navigation
    }
  }, [toggleExpanded, onItemClick, setIsOpen])

  // Flatten menu items for keyboard navigation
  const getFlattenedItems = useCallback((items: MenuItem[], level = 0): Array<MenuItem & { level: number }> => {
    const result: Array<MenuItem & { level: number }> = []
    
    for (const item of items) {
      result.push({ ...item, level })
      
      if (item.children && expandedItems.has(item.id)) {
        result.push(...getFlattenedItems(item.children, level + 1))
      }
    }
    
    return result
  }, [expandedItems])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return

    const flatItems = getFlattenedItems(items)
    const enabledItems = flatItems.filter(item => !item.disabled)

    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        triggerRef.current?.focus()
        break
        
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => 
          prev < enabledItems.length - 1 ? prev + 1 : 0
        )
        break
        
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : enabledItems.length - 1
        )
        break
        
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < enabledItems.length) {
          handleItemClick(enabledItems[focusedIndex])
        }
        break
        
      case 'ArrowRight':
        if (focusedIndex >= 0 && focusedIndex < enabledItems.length) {
          const item = enabledItems[focusedIndex]
          if (item.children && !expandedItems.has(item.id)) {
            e.preventDefault()
            toggleExpanded(item.id)
          }
        }
        break
        
      case 'ArrowLeft':
        if (focusedIndex >= 0 && focusedIndex < enabledItems.length) {
          const item = enabledItems[focusedIndex]
          if (item.children && expandedItems.has(item.id)) {
            e.preventDefault()
            toggleExpanded(item.id)
          }
        }
        break
    }
  }, [isOpen, items, getFlattenedItems, focusedIndex, handleItemClick, expandedItems, toggleExpanded, setIsOpen])

  // Handle click outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (isOpen && 
        menuRef.current && 
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)) {
      setIsOpen(false)
    }
  }, [isOpen, setIsOpen])

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      setIsOpen(false)
    }
  }, [setIsOpen])

  // Setup event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('mousedown', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown, handleClickOutside])

  // Focus management
  useEffect(() => {
    if (isOpen && menuRef.current) {
      // Focus first menu item when opened
      const firstFocusable = menuRef.current.querySelector('[role="menuitem"]') as HTMLElement
      firstFocusable?.focus()
    }
  }, [isOpen])

  // Render menu item
  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.has(item.id)
    const Icon = item.icon
    
    const flatItems = getFlattenedItems(items)
    const enabledItems = flatItems.filter(i => !i.disabled)
    const itemIndex = enabledItems.findIndex(i => i.id === item.id)
    const isFocused = focusedIndex === itemIndex

    const itemContent = (
      <div
        className={cn(
          'flex items-center justify-between w-full champion-py-3 champion-px-4 text-left transition-colors',
          'hover:champion-bg-gray-100 focus:champion-bg-gray-100 focus:outline-none',
          level > 0 && 'champion-pl-8',
          item.disabled && 'opacity-50 cursor-not-allowed',
          isFocused && 'champion-bg-gray-100'
        )}
        style={{ paddingLeft: `${1 + level * 1.5}rem` }}
      >
        <div className="flex items-center champion-space-x-3">
          {Icon && (
            <Icon className={cn(
              'w-5 h-5',
              item.disabled ? 'champion-text-gray-400' : 'champion-text-gray-600'
            )} />
          )}
          <span className={cn(
            'champion-body-text',
            item.disabled ? 'champion-text-gray-400' : 'champion-text-gray-900'
          )}>
            {item.label}
          </span>
          {item.badge && (
            <span className="champion-bg-orange champion-text-white text-xs px-2 py-1 rounded-full">
              {item.badge}
            </span>
          )}
        </div>
        
        <div className="flex items-center champion-space-x-2">
          {item.external && (
            <ExternalLink className="w-4 h-4 champion-text-gray-400" />
          )}
          {hasChildren && (
            <ChevronRight 
              className={cn(
                'w-4 h-4 champion-text-gray-400 transition-transform',
                isExpanded && 'transform rotate-90'
              )} 
            />
          )}
        </div>
      </div>
    )

    return (
      <div key={item.id}>
        {item.href && !hasChildren ? (
          <Link
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className="block"
            onClick={() => handleItemClick(item)}
            role="menuitem"
            aria-disabled={item.disabled}
            tabIndex={isFocused ? 0 : -1}
          >
            {itemContent}
          </Link>
        ) : (
          <button
            type="button"
            className="block w-full"
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
            role="menuitem"
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-disabled={item.disabled}
            tabIndex={isFocused ? 0 : -1}
          >
            {itemContent}
          </button>
        )}
        
        {hasChildren && isExpanded && (
          <div className="champion-bg-gray-50">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Menu Trigger */}
      <Button
        ref={triggerRef}
        variant="ghost"
        size="sm"
        onClick={toggleMenu}
        className={cn('md:hidden', className)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          ref={backdropRef}
          className="fixed inset-0 champion-bg-black/50 z-40 md:hidden"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Menu Panel */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={cn(
          'fixed top-0 left-0 h-full w-80 max-w-[85vw] champion-bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="menu"
        aria-label="Mobile navigation menu"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between champion-p-4 champion-border-b border-gray-200">
          {logo && (
            <div className="flex items-center">
              {logo}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto champion-py-2">
          {items.map(item => renderMenuItem(item))}
        </div>

        {/* User Section */}
        {userSection && (
          <div className="champion-border-t border-gray-200 champion-p-4">
            {userSection}
          </div>
        )}
      </div>
    </>
  )
}

export const MobileMenu = withErrorBoundary(MobileMenuComponent, "MobileMenu")

// Example usage and default menu items
export const defaultMenuItems: MenuItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: Home
  },
  {
    id: 'about',
    label: 'About',
    href: '/about',
    children: [
      {
        id: 'team',
        label: 'Team',
        href: '/about/team'
      },
      {
        id: 'mission',
        label: 'Mission',
        href: '/about/mission'
      }
    ]
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: User,
    badge: 'New'
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: Settings
  },
  {
    id: 'external',
    label: 'External Link',
    href: 'https://example.com',
    icon: ExternalLink,
    external: true
  },
  {
    id: 'logout',
    label: 'Logout',
    icon: LogOut,
    onClick: () => {
      // Handle logout
      console.log('Logout clicked')
    }
  }
]

export default MobileMenu 