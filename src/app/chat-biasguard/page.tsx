import React from 'react'
import { Metadata } from 'next'
import BiasGuardChatAgent from '@/components/bias-detection/biasguard-chat-agent'
import { withErrorBoundary } from '@/components/ui/error-boundary'

export const metadata: Metadata = {
  title: 'Chat with BiasGuard | JAHmere Webb Freedom Portal',
  description: 'Have a conversation with BiasGuard AI agent for real-time bias detection and cognitive improvement',
}

function ChatBiasGuardPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">💬 Chat with BiasGuard</h1>
              <p className="text-gray-400 mt-1">
                Have a conversation with your AI bias detection assistant
              </p>
            </div>
            <div className="text-sm text-gray-400">
              <div>JAHmere Webb Freedom Portal</div>
              <div>Conversational AI Agent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <BiasGuardChatAgent />
      </div>

      {/* Footer Info */}
      <div className="border-t border-gray-800 bg-gray-900 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
            <div>
              <h3 className="font-semibold text-white mb-2">💬 How to Chat</h3>
              <ul className="space-y-1">
                <li>• Type naturally to BiasGuard</li>
                <li>• Ask for text analysis: "Analyze this: [text]"</li>
                <li>• Learn about biases: "What is confirmation bias?"</li>
                <li>• Get improvement tips: "How can I improve?"</li>
                <li>• Use quick command buttons</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">🎯 Example Commands</h3>
              <ul className="space-y-1">
                <li>• "Analyze this: Mission accomplished!"</li>
                <li>• "What biases should I watch for?"</li>
                <li>• "What is success declaration bias?"</li>
                <li>• "How do I avoid overconfidence?"</li>
                <li>• "Check this text for patterns"</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">🛡️ BiasGuard Features</h3>
              <ul className="space-y-1">
                <li>• Real-time bias pattern detection</li>
                <li>• Educational explanations</li>
                <li>• Personalized interventions</li>
                <li>• Conversational interface</li>
                <li>• Evidence-based scoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withErrorBoundary(ChatBiasGuardPage, "ChatBiasGuardPage") 