'use client'

import React, { createContext, useContext, useState } from 'react'

export type DesignMode = 'strict' | 'guided' | 'flexible' | 'minimal'

interface DesignModeContextType {
  mode: DesignMode
  setMode: (mode: DesignMode) => void
  overrides: {
    allowCustomColors: boolean
    allowCustomSpacing: boolean
    allowCustomTypography: boolean
    enforceAccessibility: boolean
    enforcePerformance: boolean
  }
}

const DesignModeContext = createContext<DesignModeContextType | undefined>(undefined)

export function DesignModeProvider({ 
  children, 
  defaultMode = 'guided' 
}: { 
  children: React.ReactNode
  defaultMode?: DesignMode 
}) {
  const [mode, setMode] = useState<DesignMode>(defaultMode)

  const overrides = React.useMemo(() => {
    switch (mode) {
      case 'strict':
        return {
          allowCustomColors: false,
          allowCustomSpacing: false,
          allowCustomTypography: false,
          enforceAccessibility: true,
          enforcePerformance: true,
        }
      case 'guided':
        return {
          allowCustomColors: true,
          allowCustomSpacing: true,
          allowCustomTypography: false,
          enforceAccessibility: true,
          enforcePerformance: true,
        }
      case 'flexible':
        return {
          allowCustomColors: true,
          allowCustomSpacing: true,
          allowCustomTypography: true,
          enforceAccessibility: true,
          enforcePerformance: true,
        }
      case 'minimal':
        return {
          allowCustomColors: true,
          allowCustomSpacing: true,
          allowCustomTypography: true,
          enforceAccessibility: true, // Never compromise on accessibility
          enforcePerformance: true,   // Never compromise on performance
        }
      default:
        return {
          allowCustomColors: true,
          allowCustomSpacing: true,
          allowCustomTypography: false,
          enforceAccessibility: true,
          enforcePerformance: true,
        }
    }
  }, [mode])

  return (
    <DesignModeContext.Provider value={{ mode, setMode, overrides }}>
      {children}
    </DesignModeContext.Provider>
  )
}

export function useDesignMode() {
  const context = useContext(DesignModeContext)
  if (context === undefined) {
    throw new Error('useDesignMode must be used within a DesignModeProvider')
  }
  return context
}

// Utility hook for components to check if they can use custom styling
export function useCanCustomize() {
  const { overrides } = useDesignMode()
  return {
    colors: overrides.allowCustomColors,
    spacing: overrides.allowCustomSpacing,
    typography: overrides.allowCustomTypography,
  }
}

// Development helper component
export function DesignModeToggle() {
  const { mode, setMode } = useDesignMode()
  
  if (process.env.NODE_ENV === 'production') {
    return null // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-300 rounded-lg p-2 shadow-lg">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Design Mode
      </label>
      <select 
        value={mode} 
        onChange={(e) => setMode(e.target.value as DesignMode)}
        className="block w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="strict">Strict</option>
        <option value="guided">Guided</option>
        <option value="flexible">Flexible</option>
        <option value="minimal">Minimal</option>
      </select>
    </div>
  )
} 