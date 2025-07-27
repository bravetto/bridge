'use client'

import React, { useState, useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  SortAsc,
  SortDesc
} from 'lucide-react'

// Types
interface Column<T> {
  key: keyof T
  header: string
  sortable?: boolean
  filterable?: boolean
  render?: (value: any, row: T) => React.ReactNode
  width?: string
  mobileHidden?: boolean
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  pageSize?: number
  searchable?: boolean
  filterable?: boolean
  loading?: boolean
  emptyMessage?: string
  className?: string
  onRowClick?: (row: T) => void
  actions?: (row: T) => React.ReactNode
}

type SortDirection = 'asc' | 'desc' | null

interface SortState<T> {
  column: keyof T | null
  direction: SortDirection
}

/**
 * Comprehensive Data Table Component
 * Features: Sorting, filtering, pagination, search, mobile responsive
 */
function DataTableComponent<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  searchable = true,
  filterable = true,
  loading = false,
  emptyMessage = 'No data available',
  className,
  onRowClick,
  actions
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortState, setSortState] = useState<SortState<T>>({
    column: null,
    direction: null
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Handle sorting
  const handleSort = useCallback((column: keyof T) => {
    setSortState(prev => {
      if (prev.column === column) {
        // Cycle through: asc -> desc -> null
        const direction = prev.direction === 'asc' ? 'desc' : 
                         prev.direction === 'desc' ? null : 'asc'
        return { column: direction ? column : null, direction }
      }
      return { column, direction: 'asc' }
    })
    setCurrentPage(1) // Reset to first page when sorting
  }, [])

  // Handle search
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term)
    setCurrentPage(1) // Reset to first page when searching
  }, [])

  // Handle filter change
  const handleFilterChange = useCallback((column: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [column]: value
    }))
    setCurrentPage(1) // Reset to first page when filtering
  }, [])

  // Process data (filter, search, sort)
  const processedData = useMemo(() => {
    let result = [...data]

    // Apply search
    if (searchTerm) {
      result = result.filter(row =>
        columns.some(column =>
          String(row[column.key])
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      )
    }

    // Apply filters
    Object.entries(filters).forEach(([columnKey, filterValue]) => {
      if (filterValue) {
        result = result.filter(row =>
          String(row[columnKey])
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        )
      }
    })

    // Apply sorting
    if (sortState.column && sortState.direction) {
      result.sort((a, b) => {
        const aValue = a[sortState.column!]
        const bValue = b[sortState.column!]
        
        // Handle different data types
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortState.direction === 'asc' ? aValue - bValue : bValue - aValue
        }
        
        if (aValue && bValue && 
            typeof aValue === 'object' && typeof bValue === 'object' &&
            'getTime' in aValue && 'getTime' in bValue) {
          return sortState.direction === 'asc' 
            ? (aValue as Date).getTime() - (bValue as Date).getTime()
            : (bValue as Date).getTime() - (aValue as Date).getTime()
        }
        
        // Check if values are date strings
        const aDate = new Date(aValue)
        const bDate = new Date(bValue)
        if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime()) && 
            (typeof aValue === 'string' && typeof bValue === 'string') &&
            (aValue.includes('-') || aValue.includes('/'))) {
          return sortState.direction === 'asc' 
            ? aDate.getTime() - bDate.getTime()
            : bDate.getTime() - aDate.getTime()
        }
        
        // String comparison
        const aStr = String(aValue).toLowerCase()
        const bStr = String(bValue).toLowerCase()
        
        if (sortState.direction === 'asc') {
          return aStr.localeCompare(bStr)
        }
        return bStr.localeCompare(aStr)
      })
    }

    return result
  }, [data, columns, searchTerm, filters, sortState])

  // Pagination
  const totalPages = Math.ceil(processedData.length / pageSize)
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return processedData.slice(startIndex, startIndex + pageSize)
  }, [processedData, currentPage, pageSize])

  // Get unique values for filters
  const getFilterOptions = useCallback((column: Column<T>) => {
    const values = data.map(row => String(row[column.key]))
    return [...new Set(values)].filter(Boolean).sort()
  }, [data])

  // Render sort icon
  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null
    
    const isActive = sortState.column === column.key
    
    if (isActive) {
      return sortState.direction === 'asc' ? (
        <ChevronUp className="w-4 h-4 champion-text-purple" />
      ) : (
        <ChevronDown className="w-4 h-4 champion-text-purple" />
      )
    }
    
    return <SortAsc className="w-4 h-4 champion-text-gray-400" />
  }

  // Loading state
  if (loading) {
    return (
      <div className="champion-container champion-py-8">
        <div className="animate-pulse">
          <div className="champion-bg-gray-200 h-12 rounded champion-mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="champion-bg-gray-100 h-16 rounded champion-mb-2"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('champion-data-table', className)}>
      {/* Search and Filters Bar */}
      {(searchable || filterable) && (
        <div className="champion-mb-6 champion-space-y-4 md:champion-space-y-0 md:flex md:items-center md:justify-between">
          {/* Search */}
          {searchable && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 champion-text-gray-400" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {/* Mobile Filter Toggle */}
          {filterable && (
            <div className="md:hidden">
              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="w-full justify-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          )}

          {/* Desktop Filters */}
          {filterable && (
            <div className="hidden md:flex md:items-center md:space-x-4">
              {columns
                .filter(column => column.filterable)
                .slice(0, 3) // Limit to 3 filters on desktop
                .map(column => (
                  <div key={String(column.key)} className="min-w-[150px]">
                    <Select
                      value={filters[String(column.key)] || ''}
                      onValueChange={(value) => handleFilterChange(String(column.key), value)}
                    >
                      <option value="">All {column.header}</option>
                      {getFilterOptions(column).map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </Select>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Mobile Filters */}
      {filterable && showMobileFilters && (
        <div className="md:hidden champion-mb-6 champion-p-4 champion-bg-gray-50 rounded-lg champion-space-y-4">
          {columns
            .filter(column => column.filterable)
            .map(column => (
              <div key={String(column.key)}>
                <label className="block text-sm font-medium champion-text-gray-700 champion-mb-2">
                  {column.header}
                </label>
                <Select
                  value={filters[String(column.key)] || ''}
                  onValueChange={(value) => handleFilterChange(String(column.key), value)}
                >
                  <option value="">All {column.header}</option>
                  {getFilterOptions(column).map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
            ))}
        </div>
      )}

      {/* Table */}
      <div className="champion-bg-white rounded-lg shadow overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="champion-bg-gray-50">
              <tr>
                {columns.map(column => (
                  <th
                    key={String(column.key)}
                    className={cn(
                      'px-6 py-3 text-left text-xs font-medium champion-text-gray-500 uppercase tracking-wider',
                      column.sortable && 'cursor-pointer hover:champion-bg-gray-100',
                      column.width && `w-${column.width}`
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.header}</span>
                      {renderSortIcon(column)}
                    </div>
                  </th>
                ))}
                {actions && (
                  <th className="px-6 py-3 text-right text-xs font-medium champion-text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="champion-bg-white divide-y divide-gray-200">
              {paginatedData.length === 0 ? (
                <tr>
                  <td 
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className={cn(
                      'hover:champion-bg-gray-50 transition-colors',
                      onRowClick && 'cursor-pointer'
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {columns.map(column => (
                      <td
                        key={String(column.key)}
                        className="px-6 py-4 whitespace-nowrap text-sm champion-text-gray-900"
                      >
                        {column.render 
                          ? column.render(row[column.key], row)
                          : String(row[column.key] || '')
                        }
                      </td>
                    ))}
                    {actions && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {actions(row)}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {paginatedData.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              {emptyMessage}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {paginatedData.map((row, index) => (
                <div
                  key={index}
                  className={cn(
                    'p-6 champion-space-y-3',
                    onRowClick && 'cursor-pointer hover:champion-bg-gray-50'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns
                    .filter(column => !column.mobileHidden)
                    .map(column => (
                      <div key={String(column.key)} className="flex justify-between">
                        <span className="text-sm font-medium champion-text-gray-500">
                          {column.header}:
                        </span>
                        <span className="text-sm champion-text-gray-900 text-right">
                          {column.render 
                            ? column.render(row[column.key], row)
                            : String(row[column.key] || '')
                          }
                        </span>
                      </div>
                    ))}
                  {actions && (
                    <div className="flex justify-end champion-pt-2 champion-border-t border-gray-200">
                      {actions(row)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="champion-mt-6 flex items-center justify-between">
          <div className="text-sm champion-text-gray-700">
            Showing {((currentPage - 1) * pageSize) + 1} to{' '}
            {Math.min(currentPage * pageSize, processedData.length)} of{' '}
            {processedData.length} results
          </div>
          
          <div className="flex items-center champion-space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline champion-ml-1">Previous</span>
            </Button>
            
            {/* Page Numbers */}
            <div className="hidden sm:flex items-center champion-space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = i + 1
                return (
                  <Button
                    key={pageNumber}
                    variant={currentPage === pageNumber ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                )
              })}
              
              {totalPages > 5 && (
                <>
                  <span className="champion-text-gray-500">...</span>
                  <Button
                    variant={currentPage === totalPages ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <span className="hidden sm:inline champion-mr-1">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export const DataTable = withErrorBoundary(DataTableComponent, "DataTable")

// Example usage and types
export interface ExampleData {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createdAt: Date
}

export const exampleColumns: Column<ExampleData>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    render: (value, row) => (
      <div className="flex items-center">
        <div className="w-8 h-8 champion-bg-purple rounded-full flex items-center justify-center champion-text-white text-sm font-medium champion-mr-3">
          {value.charAt(0).toUpperCase()}
        </div>
        {value}
      </div>
    )
  },
  {
    key: 'email',
    header: 'Email',
    sortable: true,
    mobileHidden: true
  },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
    filterable: true,
    render: (value) => (
      <span className={cn(
        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
        value === 'admin' && 'champion-bg-purple champion-text-white',
        value === 'user' && 'champion-bg-gray-100 champion-text-gray-800',
        value === 'moderator' && 'champion-bg-orange champion-text-white'
      )}>
        {value}
      </span>
    )
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    filterable: true,
    render: (value) => (
      <span className={cn(
        'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
        value === 'active' && 'champion-bg-green-100 champion-text-green-800',
        value === 'inactive' && 'champion-bg-red-100 champion-text-red-800'
      )}>
        {value}
      </span>
    )
  },
  {
    key: 'createdAt',
    header: 'Created',
    sortable: true,
    render: (value) => new Date(value).toLocaleDateString()
  }
]

export default DataTable 