'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { withErrorBoundary } from '@/components/ui/error-boundary'

interface BiasAnalysisResult {
  biasScore: number
  evidenceQuality: 'strong' | 'moderate' | 'weak'
  patterns: Array<{
    type: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    intervention: string
  }>
  structuredReport: {
    overallAssessment: 'BIASED' | 'MODERATE' | 'UNBIASED'
    keyInsight: string
  }
}

function ChatBiasGuard() {
  const [analysisText, setAnalysisText] = useState('')
  const [result, setResult] = useState<BiasAnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Simplified bias analysis for chat use
  const analyzeText = async (text: string): Promise<BiasAnalysisResult> => {
    // Enhanced pattern detection
    const patterns: Array<{
      type: string
      severity: 'low' | 'medium' | 'high' | 'critical'
      description: string
      intervention: string
    }> = []
    const lowerText = text.toLowerCase()

    // Bias patterns with interventions
    const biasPatterns = {
      'success-declaration': {
        keywords: ['mission accomplished', 'task complete', 'problem solved', 'working perfectly'],
        severity: 'high' as const,
        description: 'Declaring success without user verification',
        intervention: '🔍 VERIFY: Ask user to confirm the solution works'
      },
      'terminal-worship': {
        keywords: ['build passes', 'no errors', 'tests pass', 'logs show'],
        severity: 'medium' as const,
        description: 'Over-relying on logs instead of user experience',
        intervention: '👤 USER-TEST: Verify actual user experience'
      },
      'pattern-blindness': {
        keywords: ['try again', 'let me fix', 'another approach', 'same issue'],
        severity: 'medium' as const,
        description: 'Repeating similar approaches without exploring alternatives',
        intervention: '🌈 PIVOT: Try fundamentally different approach'
      },
      'confirmation-bias': {
        keywords: ['this confirms', 'as expected', 'proves that', 'validates'],
        severity: 'medium' as const,
        description: 'Seeking evidence that supports predetermined conclusions',
        intervention: '🔍 CHALLENGE: Seek disconfirming evidence'
      },
      'overconfidence': {
        keywords: ['definitely', 'certainly', '100% sure', 'guaranteed', 'always works'],
        severity: 'medium' as const,
        description: 'Expressing certainty without adequate evidence',
        intervention: '🤔 HEDGE: Acknowledge uncertainty and limitations'
      },
      'complexity-inflation': {
        keywords: ['enterprise solution', 'comprehensive framework', 'full implementation'],
        severity: 'low' as const,
        description: 'Over-engineering simple problems',
        intervention: '🎯 SIMPLIFY: Start with minimal viable solution'
      }
    }

    // Check for patterns
    Object.entries(biasPatterns).forEach(([type, config]) => {
      const hasPattern = config.keywords.some(keyword => lowerText.includes(keyword))
      if (hasPattern) {
        patterns.push({
          type,
          severity: config.severity,
          description: config.description,
          intervention: config.intervention
        })
      }
    })

    // Calculate bias score
    const severityWeights: Record<'low' | 'medium' | 'high' | 'critical', number> = { 
      low: 0.2, medium: 0.4, high: 0.7, critical: 1.0 
    }
    const biasScore = Math.min(1.0, patterns.reduce((sum, p) => sum + severityWeights[p.severity], 0))

    // Assess evidence quality
    let evidenceQuality: 'strong' | 'moderate' | 'weak' = 'weak'
    const numberMatches = text.match(/\d+/g)
    if (text.includes('tested') || text.includes('verified') || (numberMatches && numberMatches.length > 2)) {
      evidenceQuality = 'strong'
    } else if (text.length > 200 || text.includes('example')) {
      evidenceQuality = 'moderate'
    }

    // Generate key insight
    let keyInsight = 'Analysis shows good bias awareness'
    if (patterns.length > 0) {
      const dominantPattern = patterns.reduce((prev, current) => 
        severityWeights[current.severity] > severityWeights[prev.severity] ? current : prev
      )
      keyInsight = `Primary concern: ${dominantPattern.description}`
    }

    return {
      biasScore,
      evidenceQuality,
      patterns,
      structuredReport: {
        overallAssessment: biasScore < 0.3 ? 'UNBIASED' : biasScore < 0.7 ? 'MODERATE' : 'BIASED',
        keyInsight
      }
    }
  }

  const handleAnalyze = async () => {
    if (!analysisText.trim()) return

    setIsAnalyzing(true)
    try {
      // Simulate API call delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500))
      const analysis = await analyzeText(analysisText)
      setResult(analysis)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getBiasLevelColor = (score: number) => {
    if (score < 0.3) return 'text-green-400'
    if (score < 0.6) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getBiasLevelText = (score: number) => {
    if (score < 0.3) return '🟢 GOOD'
    if (score < 0.6) return '🟡 BIAS'
    return '🔴 FIX'
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Input Section */}
      <Card className="p-6 bg-gray-900 border-gray-700">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">🛡️ BiasGuard v1.0 Chat Analysis</h3>
            <div className="text-sm text-gray-400">
              Methodology Framework v1.0
            </div>
          </div>
          
          <textarea
            value={analysisText}
            onChange={(e) => setAnalysisText(e.target.value)}
            placeholder="Paste AI response or text to analyze for cognitive bias patterns..."
            className="w-full h-32 p-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
          />
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              {analysisText.length} characters
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={!analysisText.trim() || isAnalyzing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              {isAnalyzing ? '🔍 Analyzing...' : '🔍 Analyze Text'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Section */}
      {result && (
        <Card className="p-6 bg-gray-900 border-gray-700">
          <div className="space-y-4">
            {/* Main Result */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`text-lg font-bold ${getBiasLevelColor(result.biasScore)}`}>
                  {getBiasLevelText(result.biasScore)}
                </span>
                <span className="text-gray-300">
                  ({Math.round(result.biasScore * 100)}% bias score)
                </span>
              </div>
              <div className="text-sm text-gray-400">
                Evidence: {result.evidenceQuality.toUpperCase()}
              </div>
            </div>

            {/* Key Insight */}
            <div className="p-3 bg-gray-800 rounded-md border-l-4 border-blue-500">
              <div className="text-sm text-gray-400 mb-1">💡 Key Insight</div>
              <div className="text-white">{result.structuredReport.keyInsight}</div>
            </div>

            {/* Detected Patterns */}
            {result.patterns.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-300">🚨 Detected Patterns:</div>
                {result.patterns.map((pattern, index) => (
                  <div key={index} className="p-3 bg-gray-800 rounded-md border-l-4 border-red-500">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-red-400">{pattern.type}</div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        pattern.severity === 'high' ? 'bg-red-900 text-red-300' :
                        pattern.severity === 'medium' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {pattern.severity.toUpperCase()}
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">{pattern.description}</div>
                    <div className="text-sm text-blue-400 font-medium">{pattern.intervention}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex space-x-2 pt-2">
              <Button
                onClick={() => setResult(null)}
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-600 hover:bg-gray-800"
              >
                Clear Results
              </Button>
              <Button
                onClick={() => setAnalysisText('')}
                variant="outline"
                size="sm"
                className="text-gray-300 border-gray-600 hover:bg-gray-800"
              >
                Clear Input
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Quick Examples */}
      <Card className="p-4 bg-gray-900 border-gray-700">
        <div className="text-sm text-gray-400 mb-2">💡 Quick Test Examples:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Button
            onClick={() => setAnalysisText("Mission accomplished! The fix is working perfectly and all tests pass.")}
            variant="outline"
            size="sm"
            className="text-left text-gray-300 border-gray-600 hover:bg-gray-800 h-auto p-2"
          >
            Success Declaration Bias
          </Button>
          <Button
            onClick={() => setAnalysisText("The build passes so the solution is definitely correct and will always work.")}
            variant="outline"
            size="sm"
            className="text-left text-gray-300 border-gray-600 hover:bg-gray-800 h-auto p-2"
          >
            Terminal Worship + Overconfidence
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default withErrorBoundary(ChatBiasGuard, "ChatBiasGuard") 