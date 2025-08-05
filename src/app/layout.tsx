import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './accessibility.css'
import SiteNavigation from '@/components/layout/site-navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'August 25th Freedom Portal - JAHmere Webb',
  description: 'Divine Freedom Portal for JAHmere Webb - August 25th Freedom Movement',
  keywords: 'JAHmere Webb, freedom, justice, advocacy, August 25th',
  openGraph: {
    title: 'August 25th Freedom Portal - JAHmere Webb',
    description: 'Join the movement supporting JAHmere Webb\'s freedom',
    type: 'website'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Skip Link for Keyboard Navigation */}
        <a 
          href="#main-content" 
          className="skip-link"
        >
          Skip to main content
        </a>
        
        <SiteNavigation />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  )
}
