'use client'

import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { withErrorBoundary } from '@/components/ui/error-boundary'

function Navigation() {
  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <Container className="flex items-center justify-between py-4">
        <Link href="/bridge-project-mvp" className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-blue-600" />
          <span className="font-bold text-slate-900">JAHmere Freedom</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/bridge-project-mvp" className="text-slate-600 hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/character-witnesses" className="text-slate-600 hover:text-blue-600 transition-colors">
            Witnesses
          </Link>
          <Link href="/the-case" className="text-slate-600 hover:text-blue-600 transition-colors">
            The Case
          </Link>
        </div>
        
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
          Take Action
        </Button>
      </Container>
    </nav>
  )
}

export default withErrorBoundary(Navigation, "Navigation") 