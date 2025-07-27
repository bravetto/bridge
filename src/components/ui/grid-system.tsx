'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { withErrorBoundary } from '@/components/ui/error-boundary'

// Types
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto' | 'none'
type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full' | 'auto'
type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24

interface ResponsiveValue<T> {
  base?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

interface GridProps {
  children: React.ReactNode
  cols?: GridCols | ResponsiveValue<GridCols>
  gap?: Gap | ResponsiveValue<Gap>
  rowGap?: Gap | ResponsiveValue<Gap>
  colGap?: Gap | ResponsiveValue<Gap>
  autoFit?: boolean
  autoFill?: boolean
  minItemWidth?: string
  className?: string
  as?: React.ElementType
}

interface GridItemProps {
  children: React.ReactNode
  colSpan?: GridSpan | ResponsiveValue<GridSpan>
  rowSpan?: GridSpan | ResponsiveValue<GridSpan>
  colStart?: number | ResponsiveValue<number>
  colEnd?: number | ResponsiveValue<number>
  rowStart?: number | ResponsiveValue<number>
  rowEnd?: number | ResponsiveValue<number>
  className?: string
  as?: React.ElementType
}

interface FlexProps {
  children: React.ReactNode
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse' | ResponsiveValue<'row' | 'col' | 'row-reverse' | 'col-reverse'>
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse' | ResponsiveValue<'wrap' | 'nowrap' | 'wrap-reverse'>
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly' | ResponsiveValue<'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'>
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch' | ResponsiveValue<'start' | 'end' | 'center' | 'baseline' | 'stretch'>
  gap?: Gap | ResponsiveValue<Gap>
  className?: string
  as?: React.ElementType
}

// Utility functions
const getResponsiveClasses = <T extends string | number>(
  value: T | ResponsiveValue<T>,
  prefix: string
): string => {
  if (typeof value === 'object' && value !== null) {
    const classes: string[] = []
    
    if (value.base !== undefined) {
      classes.push(`${prefix}-${value.base}`)
    }
    
    const breakpoints: Array<{ key: keyof ResponsiveValue<T>, prefix: string }> = [
      { key: 'sm', prefix: 'sm:' },
      { key: 'md', prefix: 'md:' },
      { key: 'lg', prefix: 'lg:' },
      { key: 'xl', prefix: 'xl:' },
      { key: '2xl', prefix: '2xl:' }
    ]
    
    breakpoints.forEach(({ key, prefix: bpPrefix }) => {
      if (value[key] !== undefined) {
        classes.push(`${bpPrefix}${prefix}-${value[key]}`)
      }
    })
    
    return classes.join(' ')
  }
  
  return `${prefix}-${value}`
}

/**
 * Grid Component
 * Modern CSS Grid implementation with responsive support
 */
function GridComponent({
  children,
  cols = 12,
  gap = 4,
  rowGap,
  colGap,
  autoFit = false,
  autoFill = false,
  minItemWidth = '250px',
  className,
  as: Component = 'div'
}: GridProps) {
  // Generate grid template columns
  const getGridCols = (value: GridCols): string => {
    if (value === 'auto') return 'auto'
    if (value === 'none') return 'none'
    if (typeof value === 'number') return `repeat(${value}, minmax(0, 1fr))`
    return value
  }

  // Handle auto-fit and auto-fill
  const gridTemplateColumns = React.useMemo(() => {
    if (autoFit) {
      return `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`
    }
    if (autoFill) {
      return `repeat(auto-fill, minmax(${minItemWidth}, 1fr))`
    }
    
    if (typeof cols === 'object') {
      // For responsive values, we'll use CSS classes
      return undefined
    }
    
    return getGridCols(cols)
  }, [cols, autoFit, autoFill, minItemWidth])

  // Generate CSS classes for responsive grid
  const gridClasses = React.useMemo(() => {
    const classes: string[] = ['grid']
    
    // Handle columns
    if (!autoFit && !autoFill) {
      if (typeof cols === 'object') {
        classes.push(getResponsiveClasses(cols, 'grid-cols'))
      } else {
        classes.push(`grid-cols-${cols}`)
      }
    }
    
    // Handle gap
    if (typeof gap === 'object') {
      classes.push(getResponsiveClasses(gap, 'gap'))
    } else {
      classes.push(`gap-${gap}`)
    }
    
    // Handle row gap
    if (rowGap) {
      if (typeof rowGap === 'object') {
        classes.push(getResponsiveClasses(rowGap, 'gap-y'))
      } else {
        classes.push(`gap-y-${rowGap}`)
      }
    }
    
    // Handle column gap
    if (colGap) {
      if (typeof colGap === 'object') {
        classes.push(getResponsiveClasses(colGap, 'gap-x'))
      } else {
        classes.push(`gap-x-${colGap}`)
      }
    }
    
    return classes.join(' ')
  }, [cols, gap, rowGap, colGap, autoFit, autoFill])

  const style = gridTemplateColumns ? { gridTemplateColumns } : undefined

  return (
    <Component 
      className={cn(gridClasses, className)}
      style={style}
    >
      {children}
    </Component>
  )
}

/**
 * GridItem Component
 * Individual grid item with span and positioning controls
 */
function GridItemComponent({
  children,
  colSpan,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  className,
  as: Component = 'div'
}: GridItemProps) {
  const itemClasses = React.useMemo(() => {
    const classes: string[] = []
    
    // Column span
    if (colSpan) {
      if (typeof colSpan === 'object') {
        classes.push(getResponsiveClasses(colSpan, 'col-span'))
      } else {
        classes.push(`col-span-${colSpan}`)
      }
    }
    
    // Row span
    if (rowSpan) {
      if (typeof rowSpan === 'object') {
        classes.push(getResponsiveClasses(rowSpan, 'row-span'))
      } else {
        classes.push(`row-span-${rowSpan}`)
      }
    }
    
    // Column start
    if (colStart) {
      if (typeof colStart === 'object') {
        classes.push(getResponsiveClasses(colStart, 'col-start'))
      } else {
        classes.push(`col-start-${colStart}`)
      }
    }
    
    // Column end
    if (colEnd) {
      if (typeof colEnd === 'object') {
        classes.push(getResponsiveClasses(colEnd, 'col-end'))
      } else {
        classes.push(`col-end-${colEnd}`)
      }
    }
    
    // Row start
    if (rowStart) {
      if (typeof rowStart === 'object') {
        classes.push(getResponsiveClasses(rowStart, 'row-start'))
      } else {
        classes.push(`row-start-${rowStart}`)
      }
    }
    
    // Row end
    if (rowEnd) {
      if (typeof rowEnd === 'object') {
        classes.push(getResponsiveClasses(rowEnd, 'row-end'))
      } else {
        classes.push(`row-end-${rowEnd}`)
      }
    }
    
    return classes.join(' ')
  }, [colSpan, rowSpan, colStart, colEnd, rowStart, rowEnd])

  return (
    <Component className={cn(itemClasses, className)}>
      {children}
    </Component>
  )
}

/**
 * Flex Component
 * Modern Flexbox implementation with responsive support
 */
function FlexComponent({
  children,
  direction = 'row',
  wrap = 'wrap',
  justify = 'start',
  align = 'start',
  gap = 0,
  className,
  as: Component = 'div'
}: FlexProps) {
  const flexClasses = React.useMemo(() => {
    const classes: string[] = ['flex']
    
    // Direction
    if (typeof direction === 'object') {
      classes.push(getResponsiveClasses(direction, 'flex'))
    } else {
      classes.push(`flex-${direction}`)
    }
    
    // Wrap
    if (typeof wrap === 'object') {
      classes.push(getResponsiveClasses(wrap, 'flex'))
    } else {
      classes.push(`flex-${wrap}`)
    }
    
    // Justify
    if (typeof justify === 'object') {
      classes.push(getResponsiveClasses(justify, 'justify'))
    } else {
      classes.push(`justify-${justify}`)
    }
    
    // Align
    if (typeof align === 'object') {
      classes.push(getResponsiveClasses(align, 'items'))
    } else {
      classes.push(`items-${align}`)
    }
    
    // Gap
    if (typeof gap === 'object') {
      classes.push(getResponsiveClasses(gap, 'gap'))
    } else if (gap > 0) {
      classes.push(`gap-${gap}`)
    }
    
    return classes.join(' ')
  }, [direction, wrap, justify, align, gap])

  return (
    <Component className={cn(flexClasses, className)}>
      {children}
    </Component>
  )
}

// Export components with error boundaries
export const Grid = withErrorBoundary(GridComponent, "Grid")
export const GridItem = withErrorBoundary(GridItemComponent, "GridItem")
export const Flex = withErrorBoundary(FlexComponent, "Flex")

// Layout presets for common patterns
export const CardGrid = ({ children, className, ...props }: Omit<GridProps, 'cols' | 'gap'>) => (
  <Grid
    cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}
    gap={6}
    className={cn('champion-py-6', className)}
    {...props}
  >
    {children}
  </Grid>
)

export const ArticleGrid = ({ children, className, ...props }: Omit<GridProps, 'cols' | 'gap'>) => (
  <Grid
    cols={{ base: 1, md: 2, xl: 3 }}
    gap={8}
    className={cn('champion-py-8', className)}
    {...props}
  >
    {children}
  </Grid>
)

export const MasonryGrid = ({ children, className, minItemWidth = "300px", ...props }: GridProps) => (
  <Grid
    autoFit
    minItemWidth={minItemWidth}
    gap={6}
    className={cn('champion-py-6', className)}
    {...props}
  >
    {children}
  </Grid>
)

// Sidebar layouts
export const SidebarLayout = ({ 
  sidebar, 
  children, 
  sidebarWidth = '300px',
  className 
}: {
  sidebar: React.ReactNode
  children: React.ReactNode
  sidebarWidth?: string
  className?: string
}) => (
  <div 
    className={cn('grid gap-6 lg:gap-8 grid-cols-1', `lg:grid-cols-[${sidebarWidth}_minmax(0,1fr)]`, className)}
  >
    <aside className="lg:block hidden">
      {sidebar}
    </aside>
    <main className="min-w-0">
      {children}
    </main>
  </div>
)

// Dashboard layout
export const DashboardLayout = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <Grid
    cols={{ base: 1, md: 2, lg: 3, xl: 4 }}
    gap={{ base: 4, md: 6 }}
    className={cn('champion-py-6', className)}
  >
    {children}
  </Grid>
)

// Example usage components
export const GridExample = () => (
  <div className="champion-space-y-8">
    {/* Basic Grid */}
    <div>
      <h3 className="champion-h3 champion-mb-4">Basic Grid</h3>
      <Grid cols={3} gap={4}>
        <GridItem className="champion-bg-purple champion-text-white champion-p-4 rounded">
          Item 1
        </GridItem>
        <GridItem className="champion-bg-orange champion-text-white champion-p-4 rounded">
          Item 2
        </GridItem>
        <GridItem className="champion-bg-purple champion-text-white champion-p-4 rounded">
          Item 3
        </GridItem>
      </Grid>
    </div>

    {/* Responsive Grid */}
    <div>
      <h3 className="champion-h3 champion-mb-4">Responsive Grid</h3>
      <Grid cols={{ base: 1, sm: 2, lg: 4 }} gap={4}>
        {Array.from({ length: 8 }, (_, i) => (
          <GridItem 
            key={i}
            className="champion-bg-gray-100 champion-p-4 rounded text-center"
          >
            Item {i + 1}
          </GridItem>
        ))}
      </Grid>
    </div>

    {/* Auto-fit Grid */}
    <div>
      <h3 className="champion-h3 champion-mb-4">Auto-fit Grid</h3>
      <Grid autoFit minItemWidth="200px" gap={4}>
        {Array.from({ length: 6 }, (_, i) => (
          <GridItem 
            key={i}
            className="champion-bg-gray-100 champion-p-4 rounded text-center"
          >
            Auto Item {i + 1}
          </GridItem>
        ))}
      </Grid>
    </div>

    {/* Complex Grid Layout */}
    <div>
      <h3 className="champion-h3 champion-mb-4">Complex Layout</h3>
      <Grid cols={4} gap={4}>
        <GridItem colSpan={2} className="champion-bg-purple champion-text-white champion-p-4 rounded">
          Header (spans 2 columns)
        </GridItem>
        <GridItem colSpan={2} className="champion-bg-orange champion-text-white champion-p-4 rounded">
          Navigation (spans 2 columns)
        </GridItem>
        <GridItem rowSpan={2} className="champion-bg-gray-600 champion-text-white champion-p-4 rounded">
          Sidebar (spans 2 rows)
        </GridItem>
        <GridItem colSpan={3} className="champion-bg-gray-100 champion-p-4 rounded">
          Main Content (spans 3 columns)
        </GridItem>
        <GridItem colSpan={3} className="champion-bg-gray-200 champion-p-4 rounded">
          Footer (spans 3 columns)
        </GridItem>
      </Grid>
    </div>
  </div>
)

export default { Grid, GridItem, Flex, CardGrid, ArticleGrid, MasonryGrid } 