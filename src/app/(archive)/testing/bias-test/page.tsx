import React from 'react'
import { Metadata } from 'next'
import ChatBiasGuard from '@/components/bias-detection/chat-biasguard'
import { withErrorBoundary } from '@/components/ui/error-boundary'

export const metadata: Metadata = {
  title: 'BiasGuard Chat Analysis | JAHmere Webb Freedom Portal',
  description: 'Real-time bias detection and analysis for AI conversations using Methodology Framework v1.0',
}

function BiasTestPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">🛡️ BiasGuard Chat Analysis</h1>
              <p className="text-gray-400 mt-1">
                Real-time cognitive bias detection using Methodology Framework v1.0
              </p>
            </div>
            <div className="text-sm text-gray-400">
              <div>JAHmere Webb Freedom Portal</div>
              <div>AI Bias Detection System</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <ChatBiasGuard />
      </div>

      {/* Footer Info */}
      <div className="border-t border-gray-800 bg-gray-900 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
            <div>
              <h3 className="font-semibold text-white mb-2">🎯 How to Use</h3>
              <ul className="space-y-1">
                <li>• Paste AI responses or text to analyze</li>
                <li>• Click quick examples to test</li>
                <li>• Review bias patterns and interventions</li>
                <li>• Use insights to improve AI interactions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">🔍 Detection Patterns</h3>
              <ul className="space-y-1">
                <li>• Success Declaration Bias</li>
                <li>• Terminal Worship</li>
                <li>• Pattern Blindness</li>
                <li>• Confirmation Bias</li>
                <li>• Overconfidence</li>
                <li>• Complexity Inflation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">📊 Methodology v1.0</h3>
              <ul className="space-y-1">
                <li>• Evidence quality assessment</li>
                <li>• Context-aware severity scoring</li>
                <li>• Structured bias reporting</li>
                <li>• Actionable interventions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withErrorBoundary(BiasTestPage, "BiasTestPage") 