'use client'

import React, { useState, useCallback, useRef } from 'react'
import { cn } from '@/lib/utils'
import { withErrorBoundary } from '@/components/ui/error-boundary'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive,
  File,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  Mail,
  Eye,
  Share2,
  Calendar,
  User
} from 'lucide-react'

// Types
interface DownloadableFile {
  id: string
  name: string
  url: string
  size: number
  type: string
  category?: string
  description?: string
  thumbnail?: string
  createdAt?: string
  author?: string
  downloads?: number
  tags?: string[]
  requiresEmail?: boolean
}

interface DownloadProgress {
  fileId: string
  progress: number
  status: 'pending' | 'downloading' | 'completed' | 'error'
  error?: string
}

interface DownloadSystemProps {
  files: DownloadableFile[]
  title?: string
  description?: string
  requireEmail?: boolean
  allowBatchDownload?: boolean
  showPreview?: boolean
  showStats?: boolean
  categories?: string[]
  onDownload?: (file: DownloadableFile, email?: string) => void
  onEmailCapture?: (email: string, files: DownloadableFile[]) => void
  className?: string
}

interface EmailCaptureProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string) => void
  fileName: string
  loading?: boolean
}

// Utility functions
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return Image
  if (type.startsWith('video/')) return Video
  if (type.startsWith('audio/')) return Music
  if (type.includes('pdf') || type.includes('document')) return FileText
  if (type.includes('zip') || type.includes('rar')) return Archive
  return File
}

const getFileCategory = (type: string): string => {
  if (type.startsWith('image/')) return 'Images'
  if (type.startsWith('video/')) return 'Videos'
  if (type.startsWith('audio/')) return 'Audio'
  if (type.includes('pdf') || type.includes('document')) return 'Documents'
  if (type.includes('zip') || type.includes('rar')) return 'Archives'
  return 'Other'
}

// Email Capture Modal
function EmailCaptureModal({ isOpen, onClose, onSubmit, fileName, loading }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [isValid, setIsValid] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setIsValid(validateEmail(value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValid && !loading) {
      onSubmit(email)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 champion-bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md champion-p-6">
        <div className="flex items-center justify-between champion-mb-4">
          <h3 className="champion-h3">Download {fileName}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <p className="champion-text-gray-600 champion-mb-6">
          Please provide your email address to download this file. We'll send you updates about similar content.
        </p>

        <form onSubmit={handleSubmit} className="champion-space-y-4">
          <div>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={handleEmailChange}
              required
              disabled={loading}
              className={cn(
                !isValid && email.length > 0 && 'border-red-500'
              )}
            />
            {!isValid && email.length > 0 && (
              <p className="text-sm text-red-600 champion-mt-1">
                Please enter a valid email address
              </p>
            )}
          </div>

          <div className="flex champion-space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isValid || loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 champion-mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 champion-mr-2" />
                  Download
                </>
              )}
            </Button>
          </div>
        </form>

        <p className="text-xs champion-text-gray-500 champion-mt-4">
          We respect your privacy. Your email will only be used for content updates and won't be shared with third parties.
        </p>
      </Card>
    </div>
  )
}

// File Card Component
function FileCard({ 
  file, 
  onDownload, 
  onPreview, 
  isSelected, 
  onToggleSelect,
  downloadProgress,
  showStats = true
}: {
  file: DownloadableFile
  onDownload: (file: DownloadableFile) => void
  onPreview?: (file: DownloadableFile) => void
  isSelected?: boolean
  onToggleSelect?: (file: DownloadableFile) => void
  downloadProgress?: DownloadProgress
  showStats?: boolean
}) {
  const FileIcon = getFileIcon(file.type)
  const isDownloading = downloadProgress?.status === 'downloading'
  const isCompleted = downloadProgress?.status === 'completed'
  const hasError = downloadProgress?.status === 'error'

  return (
    <Card className={cn(
      'champion-p-4 transition-all hover:shadow-md',
      isSelected && 'ring-2 ring-purple-500',
      hasError && 'border-red-200'
    )}>
      {/* Selection checkbox */}
      {onToggleSelect && (
        <div className="flex items-center champion-mb-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggleSelect(file)}
            className="champion-mr-3"
          />
          <span className="text-sm champion-text-gray-600">Select for batch download</span>
        </div>
      )}

      {/* File thumbnail or icon */}
      <div className="flex items-start champion-space-x-4 champion-mb-4">
        <div className="flex-shrink-0">
          {file.thumbnail ? (
            <img
              src={file.thumbnail}
              alt={file.name}
              className="w-12 h-12 object-cover rounded"
            />
          ) : (
            <div className="w-12 h-12 champion-bg-gray-100 rounded flex items-center justify-center">
              <FileIcon className="w-6 h-6 champion-text-gray-600" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-medium champion-text-gray-900 truncate">
            {file.name}
          </h4>
          <p className="text-sm champion-text-gray-500">
            {formatFileSize(file.size)} • {getFileCategory(file.type)}
          </p>
          {file.description && (
            <p className="text-sm champion-text-gray-600 champion-mt-1 line-clamp-2">
              {file.description}
            </p>
          )}
        </div>
      </div>

      {/* Tags */}
      {file.tags && file.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 champion-mb-4">
          {file.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {file.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{file.tags.length - 3} more
            </Badge>
          )}
        </div>
      )}

      {/* Stats */}
      {showStats && (
        <div className="flex items-center justify-between text-xs champion-text-gray-500 champion-mb-4">
          <div className="flex items-center champion-space-x-4">
            {file.author && (
              <div className="flex items-center champion-space-x-1">
                <User className="w-3 h-3" />
                <span>{file.author}</span>
              </div>
            )}
            {file.createdAt && (
              <div className="flex items-center champion-space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(file.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          {file.downloads && (
            <div className="flex items-center champion-space-x-1">
              <Download className="w-3 h-3" />
              <span>{file.downloads.toLocaleString()} downloads</span>
            </div>
          )}
        </div>
      )}

      {/* Download Progress */}
      {downloadProgress && isDownloading && (
        <div className="champion-mb-4">
          <div className="flex items-center justify-between champion-mb-1">
            <span className="text-sm champion-text-gray-600">Downloading...</span>
            <span className="text-sm champion-text-gray-600">
              {Math.round(downloadProgress.progress)}%
            </span>
          </div>
          <div className="w-full champion-bg-gray-200 rounded-full h-2">
            <div
              className="champion-bg-purple h-2 rounded-full transition-all"
              style={{ width: `${downloadProgress.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Error message */}
      {hasError && downloadProgress?.error && (
        <div className="champion-mb-4 champion-p-3 champion-bg-red-50 border border-red-200 rounded">
          <div className="flex items-center champion-space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-700">{downloadProgress.error}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex champion-space-x-2">
        <Button
          onClick={() => onDownload(file)}
          disabled={isDownloading}
          className="flex-1"
          size="sm"
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 champion-mr-2 animate-spin" />
              Downloading...
            </>
          ) : isCompleted ? (
            <>
              <CheckCircle className="w-4 h-4 champion-mr-2" />
              Downloaded
            </>
          ) : (
            <>
              <Download className="w-4 h-4 champion-mr-2" />
              Download
            </>
          )}
        </Button>

        {onPreview && file.type.startsWith('image/') && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(file)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: file.name,
                url: file.url
              })
            } else {
              navigator.clipboard.writeText(file.url)
            }
          }}
        >
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}

/**
 * Download System Component
 * Comprehensive file download system with blob storage integration
 */
function DownloadSystemComponent({
  files,
  title = 'Available Downloads',
  description,
  requireEmail = false,
  allowBatchDownload = true,
  showPreview = true,
  showStats = true,
  categories,
  onDownload,
  onEmailCapture,
  className
}: DownloadSystemProps) {
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [downloadProgress, setDownloadProgress] = useState<Map<string, DownloadProgress>>(new Map())
  const [emailModal, setEmailModal] = useState<{ isOpen: boolean; file?: DownloadableFile }>({ isOpen: false })
  const [emailLoading, setEmailLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [sortBy, setSortBy] = useState<'name' | 'size' | 'date' | 'downloads'>('name')

  // Filter and sort files
  const filteredFiles = React.useMemo(() => {
    let filtered = files

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(file => getFileCategory(file.type) === selectedCategory)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'size':
          return b.size - a.size
        case 'date':
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        case 'downloads':
          return (b.downloads || 0) - (a.downloads || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [files, searchTerm, selectedCategory, sortBy])

  // Get unique categories
  const availableCategories = React.useMemo(() => {
    const cats = categories || [...new Set(files.map(file => getFileCategory(file.type)))]
    return cats.sort()
  }, [files, categories])

  // Handle file download
  const handleDownload = useCallback(async (file: DownloadableFile, email?: string) => {
    if (file.requiresEmail && !email) {
      setEmailModal({ isOpen: true, file })
      return
    }

    // Set downloading state
    setDownloadProgress(prev => new Map(prev).set(file.id, {
      fileId: file.id,
      progress: 0,
      status: 'downloading'
    }))

    try {
      // Simulate download progress
      const response = await fetch(file.url)
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`)
      }

      const contentLength = response.headers.get('content-length')
      const total = contentLength ? parseInt(contentLength, 10) : 0
      let loaded = 0

      const reader = response.body?.getReader()
      const chunks: Uint8Array[] = []

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          
          if (done) break
          
          chunks.push(value)
          loaded += value.length

          // Update progress
          const progress = total > 0 ? (loaded / total) * 100 : 50
          setDownloadProgress(prev => new Map(prev).set(file.id, {
            fileId: file.id,
            progress,
            status: 'downloading'
          }))
        }
      }

             // Create blob and download
       const blob = new Blob(chunks as BlobPart[], { type: file.type })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      // Set completed state
      setDownloadProgress(prev => new Map(prev).set(file.id, {
        fileId: file.id,
        progress: 100,
        status: 'completed'
      }))

      // Call callback
      onDownload?.(file, email)

    } catch (error) {
      // Set error state
      setDownloadProgress(prev => new Map(prev).set(file.id, {
        fileId: file.id,
        progress: 0,
        status: 'error',
        error: error instanceof Error ? error.message : 'Download failed'
      }))
    }
  }, [onDownload])

  // Handle email submission
  const handleEmailSubmit = useCallback(async (email: string) => {
    if (!emailModal.file) return

    setEmailLoading(true)
    
    try {
      // Call email capture callback
      onEmailCapture?.(email, [emailModal.file])
      
      // Proceed with download
      await handleDownload(emailModal.file, email)
      
      setEmailModal({ isOpen: false })
    } catch (error) {
      console.error('Email capture failed:', error)
    } finally {
      setEmailLoading(false)
    }
  }, [emailModal.file, onEmailCapture, handleDownload])

  // Handle batch download
  const handleBatchDownload = useCallback(async () => {
    const filesToDownload = files.filter(file => selectedFiles.has(file.id))
    
    if (requireEmail) {
      // For batch downloads with email requirement, you might want to show a different modal
      // For now, we'll download each file individually
      for (const file of filesToDownload) {
        await handleDownload(file)
      }
    } else {
      for (const file of filesToDownload) {
        await handleDownload(file)
      }
    }
    
    setSelectedFiles(new Set())
  }, [files, selectedFiles, requireEmail, handleDownload])

  // Toggle file selection
  const toggleFileSelection = useCallback((file: DownloadableFile) => {
    setSelectedFiles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(file.id)) {
        newSet.delete(file.id)
      } else {
        newSet.add(file.id)
      }
      return newSet
    })
  }, [])

  return (
    <div className={cn('champion-space-y-6', className)}>
      {/* Header */}
      <div>
        <h2 className="champion-h2 champion-mb-2">{title}</h2>
        {description && (
          <p className="champion-text-gray-600">{description}</p>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="champion-form-select"
          >
            <option value="">All Categories</option>
            {availableCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="champion-form-select"
          >
            <option value="name">Sort by Name</option>
            <option value="size">Sort by Size</option>
            <option value="date">Sort by Date</option>
            <option value="downloads">Sort by Downloads</option>
          </select>
        </div>
      </div>

      {/* Batch Actions */}
      {allowBatchDownload && selectedFiles.size > 0 && (
        <div className="champion-p-4 champion-bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm champion-text-gray-600">
              {selectedFiles.size} file{selectedFiles.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFiles(new Set())}
              >
                Clear Selection
              </Button>
              <Button
                size="sm"
                onClick={handleBatchDownload}
              >
                <Download className="w-4 h-4 champion-mr-2" />
                Download Selected
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Files Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredFiles.map(file => (
          <FileCard
            key={file.id}
            file={file}
            onDownload={handleDownload}
            isSelected={selectedFiles.has(file.id)}
            onToggleSelect={allowBatchDownload ? toggleFileSelection : undefined}
            downloadProgress={downloadProgress.get(file.id)}
            showStats={showStats}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <div className="text-center champion-py-12">
          <FileText className="w-12 h-12 champion-text-gray-400 mx-auto champion-mb-4" />
          <h3 className="champion-h3 champion-text-gray-900 champion-mb-2">No files found</h3>
          <p className="champion-text-gray-600">
            {searchTerm || selectedCategory 
              ? 'Try adjusting your search or filter criteria'
              : 'No files are available for download at this time'
            }
          </p>
        </div>
      )}

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={emailModal.isOpen}
        onClose={() => setEmailModal({ isOpen: false })}
        onSubmit={handleEmailSubmit}
        fileName={emailModal.file?.name || ''}
        loading={emailLoading}
      />
    </div>
  )
}

export const DownloadSystem = withErrorBoundary(DownloadSystemComponent, "DownloadSystem")

// Example usage
export const ExampleDownloadSystem = () => {
  const sampleFiles: DownloadableFile[] = [
    {
      id: '1',
      name: 'Project Proposal.pdf',
      url: '/files/proposal.pdf',
      size: 2048000,
      type: 'application/pdf',
      description: 'Comprehensive project proposal document',
      author: 'John Doe',
      createdAt: '2024-01-15',
      downloads: 1234,
      tags: ['proposal', 'business', 'pdf'],
      requiresEmail: true
    },
    {
      id: '2',
      name: 'Design Assets.zip',
      url: '/files/assets.zip',
      size: 15728640,
      type: 'application/zip',
      description: 'Complete design asset package',
      author: 'Design Team',
      createdAt: '2024-01-10',
      downloads: 856,
      tags: ['design', 'assets', 'zip']
    }
  ]

  return (
    <DownloadSystem
      files={sampleFiles}
      title="Project Resources"
      description="Download project files and documentation"
      requireEmail={false}
      allowBatchDownload={true}
      showPreview={true}
      showStats={true}
      onDownload={(file, email) => {
        console.log('Downloaded:', file.name, email ? `with email: ${email}` : '')
      }}
      onEmailCapture={(email, files) => {
        console.log('Email captured:', email, 'for files:', files.map(f => f.name))
      }}
    />
  )
}

export default DownloadSystem 