import { Metadata } from 'next'
import { PageLayout } from '@/components/layout/site-navigation'

export const metadata: Metadata = {
  title: 'JAHmere Webb Freedom Portal',
  description: 'Supporting JAHmere Webb\'s journey to freedom.',
}

export default function HomePage() {
  return (
    <PageLayout showBreadcrumb={false}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            JAHmere Webb
          </h1>
          <h2 className="text-3xl text-blue-600 mb-8">
            Freedom Portal
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Supporting JAHmere's journey to freedom through community action and advocacy.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Community</h3>
            <p className="text-gray-600">
              Building support for JAHmere's freedom.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Advocacy</h3>
            <p className="text-gray-600">
              Working for justice and fair representation.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">Hope</h3>
            <p className="text-gray-600">
              Supporting transformation and positive change.
            </p>
          </div>
        </div>

        <div className="text-center bg-blue-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Your Voice Matters
          </h2>
          <p className="text-lg mb-6">
            Join the movement supporting JAHmere's freedom.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Take Action
          </a>
        </div>
      </div>
    </PageLayout>
  )
}
