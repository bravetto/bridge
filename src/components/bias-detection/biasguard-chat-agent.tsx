'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { withErrorBoundary } from '@/components/ui/error-boundary'

interface ChatMessage {
  id: string
  type: 'user' | 'biasguard'
  content: string
  timestamp: Date
  biasAnalysis?: {
    score: number
    patterns: string[]
    interventions: string[]
  }
}

function BiasGuardChatAgent() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'biasguard',
      content: '🛡️ **BiasGuard v1.0 Online**\n\nHello! I\'m BiasGuard, your AI bias detection assistant. I can:\n\n• Analyze text for cognitive bias patterns\n• Provide real-time bias feedback\n• Suggest interventions and improvements\n• Help you develop bias-aware thinking\n\nTry asking me things like:\n- "Analyze this text: [paste text]"\n- "What biases should I watch for?"\n- "How can I improve my reasoning?"\n\nWhat would you like to explore?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // BiasGuard's personality and responses
  const generateBiasGuardResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase()

    // Command patterns
    if (lowerMessage.includes('analyze this') || lowerMessage.includes('check this')) {
      const textToAnalyze = userMessage.replace(/analyze this:?|check this:?/i, '').trim()
      if (textToAnalyze) {
        return await analyzeTextAndRespond(textToAnalyze)
      }
      return '🔍 **Ready to Analyze**\n\nPlease provide the text you\'d like me to analyze for bias patterns. Just say "Analyze this: [your text]" and I\'ll give you a detailed assessment.'
    }

    // Help and guidance
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return '🛡️ **BiasGuard Capabilities**\n\n**Analysis Commands:**\n• "Analyze this: [text]" - Detect bias patterns\n• "Check this: [text]" - Quick bias assessment\n\n**Learning:**\n• "What biases should I watch for?" - Common patterns\n• "How can I improve my reasoning?" - Best practices\n• "What is [bias type]?" - Explain specific biases\n\n**Examples:**\n• "Analyze this: The solution is definitely working perfectly"\n• "What is confirmation bias?"\n• "How do I avoid overconfidence?"\n\nWhat would you like to explore?'
    }

    // Bias education
    if (lowerMessage.includes('what biases') || lowerMessage.includes('common bias')) {
      return '🧠 **Common Cognitive Biases to Watch For:**\n\n**🎯 Success Declaration Bias**\nDeclaring victory before user confirmation\n*Watch for: "Mission accomplished", "Working perfectly"*\n\n**📊 Terminal Worship**\nOver-relying on logs vs. user experience\n*Watch for: "Build passes", "No errors shown"*\n\n**🔄 Pattern Blindness**\nRepeating same approaches without alternatives\n*Watch for: "Try again", "Same solution"*\n\n**✅ Confirmation Bias**\nSeeking evidence that supports existing beliefs\n*Watch for: "This proves", "As expected"*\n\n**💯 Overconfidence Bias**\nExpressing certainty without adequate evidence\n*Watch for: "Definitely", "100% sure", "Always"*\n\nWant me to analyze some text for these patterns?'
    }

    // Specific bias explanations
    if (lowerMessage.includes('what is confirmation bias')) {
      return '🔍 **Confirmation Bias Explained**\n\nConfirmation bias is the tendency to search for, interpret, and recall information that confirms our pre-existing beliefs.\n\n**In AI Development:**\n• Looking only for evidence that supports your current approach\n• Ignoring contradictory test results\n• Interpreting ambiguous outcomes as positive\n\n**Red Flag Phrases:**\n• "This proves my theory"\n• "As I suspected"\n• "This validates our approach"\n\n**🛡️ Prevention:**\n• Actively seek disconfirming evidence\n• Ask "What would prove me wrong?"\n• Consider alternative explanations\n\nWant me to analyze some text for confirmation bias?'
    }

    if (lowerMessage.includes('what is success declaration') || lowerMessage.includes('success bias')) {
      return '🎯 **Success Declaration Bias Explained**\n\nThis is when AI (or humans) declare victory or completion before getting user confirmation that the solution actually works.\n\n**Common in AI Development:**\n• "Mission accomplished!"\n• "The fix is working perfectly"\n• "Problem solved, ready to deploy"\n\n**Why It\'s Dangerous:**\n• User hasn\'t verified the solution\n• May create false confidence\n• Can lead to premature deployment\n\n**🛡️ Better Approach:**\n• "Please test this solution"\n• "Let me know if this resolves the issue"\n• "Can you confirm this works for you?"\n\nWant me to analyze some text for this pattern?'
    }

    // Improvement advice
    if (lowerMessage.includes('how can i improve') || lowerMessage.includes('better reasoning')) {
      return '🚀 **Improving Bias-Aware Reasoning**\n\n**🔍 Before Concluding:**\n• Ask "What evidence do I have?"\n• Consider "What could prove me wrong?"\n• Check "Am I being overconfident?"\n\n**📊 When Analyzing Results:**\n• Distinguish logs from user experience\n• Seek multiple perspectives\n• Question your first interpretation\n\n**🎯 Communication Tips:**\n• Use hedging language: "appears to", "might", "seems"\n• Ask for user confirmation\n• Acknowledge uncertainty\n\n**🛡️ Daily Practice:**\n• Review decisions for bias patterns\n• Ask others to challenge your reasoning\n• Use tools like me to check your thinking!\n\nWant to practice with some examples?'
    }

    // General conversation
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return '👋 **Hello!**\n\nGreat to meet you! I\'m BiasGuard, your cognitive bias detection assistant.\n\nI can help you identify and overcome common thinking traps in AI development and decision-making.\n\nTry asking me to analyze some text, or ask about specific bias types. What\'s on your mind?'
    }

    // Default response
    return '🤔 **Interesting!**\n\nI\'m not sure I caught that. I\'m specialized in bias detection and analysis.\n\nTry:\n• "Analyze this: [your text]"\n• "What biases should I watch for?"\n• "What is [specific bias type]?"\n• "How can I improve my reasoning?"\n\nOr just paste some text and ask me to check it for bias patterns!'
  }

  const analyzeTextAndRespond = async (text: string): Promise<string> => {
    // Quick bias analysis
    const patterns: string[] = []
    const lowerText = text.toLowerCase()

    const biasChecks = {
      'success-declaration': ['mission accomplished', 'working perfectly', 'problem solved', 'task complete'],
      'terminal-worship': ['build passes', 'no errors', 'tests pass', 'logs show'],
      'overconfidence': ['definitely', 'certainly', '100% sure', 'guaranteed', 'always works'],
      'confirmation-bias': ['this proves', 'as expected', 'validates', 'confirms'],
      'pattern-blindness': ['try again', 'same approach', 'one more time'],
      'complexity-inflation': ['enterprise solution', 'comprehensive framework', 'full implementation']
    }

    Object.entries(biasChecks).forEach(([bias, keywords]) => {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        patterns.push(bias)
      }
    })

    const biasScore = Math.min(100, patterns.length * 25)

    if (patterns.length === 0) {
      return `✅ **Clean Analysis**\n\n**Text:** "${text.slice(0, 100)}${text.length > 100 ? '...' : ''}"\n\n**Result:** No major bias patterns detected! This looks like balanced, evidence-based communication.\n\n**Bias Score:** ${biasScore}% (🟢 Low Risk)\n\nGood job maintaining objectivity! Want me to analyze more text?`
    }

    let response = `🚨 **Bias Detected**\n\n**Text:** "${text.slice(0, 100)}${text.length > 100 ? '...' : ''}"\n\n**Bias Score:** ${biasScore}% ${biasScore > 70 ? '🔴' : biasScore > 40 ? '🟡' : '🟢'}\n\n**Detected Patterns:**\n`

    patterns.forEach(pattern => {
      const interventions: Record<string, string> = {
        'success-declaration': '🔍 VERIFY: Ask user to confirm the solution works',
        'terminal-worship': '👤 USER-TEST: Verify actual user experience',
        'overconfidence': '🤔 HEDGE: Acknowledge uncertainty and limitations',
        'confirmation-bias': '🔍 CHALLENGE: Seek disconfirming evidence',
        'pattern-blindness': '🌈 PIVOT: Try fundamentally different approach',
        'complexity-inflation': '🎯 SIMPLIFY: Start with minimal solution'
      }

      response += `• **${pattern.replace('-', ' ').toUpperCase()}**\n  ${interventions[pattern] || '💡 Consider alternative approaches'}\n`
    })

    response += `\n**💡 Key Insight:** ${patterns.length > 1 ? 'Multiple bias patterns detected - consider stepping back and reassessing' : 'Single bias pattern - easy to correct with awareness'}\n\nWant me to suggest specific improvements?`

    return response
  }

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(async () => {
      const response = await generateBiasGuardResponse(userMessage.content)
      
      const biasGuardMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'biasguard',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, biasGuardMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000) // 1-2 second delay
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickCommands = [
    "Analyze this: Mission accomplished! The fix is working perfectly.",
    "What biases should I watch for?",
    "What is confirmation bias?",
    "How can I improve my reasoning?"
  ]

  return (
    <div className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      {/* Chat Header */}
      <Card className="bg-gray-900 border-gray-700 rounded-b-none">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                🛡️
              </div>
              <div>
                <h3 className="font-semibold text-white">BiasGuard v1.0</h3>
                <p className="text-sm text-gray-400">Cognitive Bias Detection Agent</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-400">Online</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Chat Messages */}
      <Card className="flex-1 bg-gray-900 border-gray-700 rounded-none overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-100 border border-gray-700'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </div>
                  <div className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                    <span className="text-sm text-gray-400">BiasGuard is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </Card>

      {/* Quick Commands */}
      <Card className="bg-gray-900 border-gray-700 rounded-none border-t-0">
        <div className="p-3">
          <div className="text-xs text-gray-400 mb-2">Quick Commands:</div>
          <div className="flex flex-wrap gap-2">
            {quickCommands.map((command, index) => (
              <Button
                key={index}
                onClick={() => setInput(command)}
                variant="outline"
                size="sm"
                className="text-xs border-gray-600 text-gray-300 hover:bg-gray-800 h-7"
              >
                {command.slice(0, 30)}...
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Input Area */}
      <Card className="bg-gray-900 border-gray-700 rounded-t-none">
        <div className="p-4">
          <div className="flex space-x-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message to BiasGuard... (Press Enter to send)"
              className="flex-1 bg-gray-800 border border-gray-600 rounded-md p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
              rows={2}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default withErrorBoundary(BiasGuardChatAgent, "BiasGuardChatAgent") 