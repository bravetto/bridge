/**
 * 🛡️ BIASGUARD WEB INTERFACE
 * Professional bias detection and analysis platform
 * URL: https://www.transformationagents.ai/biasagent
 */

'use client';

import { useState, useCallback, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, AlertTriangle, CheckCircle, Copy, BarChart3, Zap, Activity } from 'lucide-react';
import { withErrorBoundary } from '@/components/ui/error-boundary';
import { BiasGuardContextManager } from '@/lib/biasguard-context-manager';

interface BiasResult {
  level: string;
  score: number;
  issues: string[];
  contextWarning?: string;
  confidence?: number;
  patterns?: string[];
  health?: {
    aiReliability: number;
    conversationFlow: number;
    solutionEffectiveness: number;
  };
  actions?: {
    immediate: string[];
    preventive: string[];
  };
}

function BiasAgentPage() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<BiasResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState<Array<{text: string, result: BiasResult, timestamp: Date}>>([]);
  const [contextManager] = useState(() => BiasGuardContextManager.getInstance());
  const [sessionInsights, setSessionInsights] = useState<any>(null);

  // Subscribe to context updates
  useEffect(() => {
    const unsubscribe = contextManager.subscribe((state) => {
      // Update session insights when context changes
      const insights = contextManager.getContextInsights();
      setSessionInsights(insights);
    });

    return unsubscribe;
  }, [contextManager]);

  const analyzeText = useCallback(async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    try {
      // Use unified BiasGuard system
      const analysis = await contextManager.analyzeWithContext({
        aiResponse: inputText,
        source: 'web'
      });
      
      // Convert to display format
      const displayResult: BiasResult = {
        level: analysis.biasScore < 0.3 ? '🟢 GOOD' : analysis.biasScore < 0.6 ? '🟡 BIAS' : '🔴 FIX',
        score: Math.round(analysis.biasScore * 100),
        issues: analysis.immediateActions,
        contextWarning: analysis.contextWarning,
        confidence: analysis.confidence,
        patterns: analysis.patterns.map(p => p.type),
        health: analysis.health,
        actions: {
          immediate: analysis.immediateActions,
          preventive: analysis.preventiveActions
        }
      };
      
      setResult(displayResult);
      
      // Add to history
      setHistory(prev => [
        { text: inputText, result: displayResult, timestamp: new Date() },
        ...prev.slice(0, 9) // Keep last 10
      ]);
      
    } catch (error) {
      console.error('Analysis error:', error);
      // Fallback to simple analysis
      const fallbackResult = quickBiasCheck(inputText);
      setResult(fallbackResult);
    }
    
    setIsAnalyzing(false);
  }, [inputText, contextManager]);

  const copyResult = useCallback(() => {
    if (!result) return;
    
    const output = `[BiasGuard] ${result.level} (${result.score}%)${result.contextWarning ? ' ' + result.contextWarning : ''}${result.issues.length ? '\n' + result.issues.join(' | ') : ''}`;
    
    navigator.clipboard.writeText(output);
  }, [result]);

  const loadExample = useCallback((example: string) => {
    setInputText(example);
    setResult(null);
  }, []);

  const clearHistory = useCallback(() => {
    contextManager.clearHistory();
    setHistory([]);
    setSessionInsights(null);
  }, [contextManager]);

  const examples = [
    "We need a comprehensive 3-phase implementation framework with enterprise-grade standards and mandatory approval workflows.",
    "This is clearly the best solution and should obviously be implemented immediately.",
    "The system must enforce these standards across all teams and departments without exception.",
    "Just add a simple configuration file and the problem will be easily resolved.",
    "Mission accomplished! The build passes and everything is working perfectly now.",
    "The terminal shows no errors, so the deployment was successful and ready for production."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Container className="py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-12 h-12 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">BiasGuard</h1>
            <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded">Unified v2.0</span>
          </div>
          <p className="text-xl text-gray-300 mb-2">AI Bias Detection & Analysis Platform</p>
          <p className="text-gray-400">Real-time cognitive bias detection with context awareness</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Section */}
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Text Analysis
                </h2>
                
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste AI response, chat message, or any text to analyze for cognitive biases..."
                  className="w-full h-40 bg-gray-900 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                />
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-400">
                    {inputText.length} characters • {inputText.split(' ').filter(w => w).length} words
                    {sessionInsights && (
                      <span className="ml-4 text-blue-400">
                        Session: {sessionInsights.currentSession.analyses} analyses
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setInputText('')}
                      variant="outline"
                      size="sm"
                      className="text-gray-300 border-gray-600 hover:bg-gray-700"
                    >
                      Clear
                    </Button>
                    <Button
                      onClick={analyzeText}
                      disabled={!inputText.trim() || isAnalyzing}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Bias'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Results Section */}
            {result && (
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Analysis Results
                      {result.confidence && (
                        <span className="text-sm text-gray-400">
                          (Confidence: {Math.round(result.confidence * 100)}%)
                        </span>
                      )}
                    </h3>
                    <Button
                      onClick={copyResult}
                      size="sm"
                      variant="outline"
                      className="text-gray-300 border-gray-600 hover:bg-gray-700"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>

                  {/* Score Display */}
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl">{result.level}</span>
                      <span className="text-xl font-bold text-white">({result.score}%)</span>
                      {result.contextWarning && (
                        <span className="text-orange-400 text-sm">{result.contextWarning}</span>
                      )}
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          result.score < 30 ? 'bg-green-500' : 
                          result.score < 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                  </div>

                  {/* System Health (if available) */}
                  {result.health && (
                    <div className="mb-6 p-4 bg-gray-900/50 rounded-lg">
                      <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        System Health
                      </h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">AI Reliability</div>
                          <div className="text-white">{Math.round(result.health.aiReliability * 100)}%</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Conversation Flow</div>
                          <div className="text-white">{Math.round(result.health.conversationFlow * 100)}%</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Solution Effectiveness</div>
                          <div className="text-white">{Math.round(result.health.solutionEffectiveness * 100)}%</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Issues List */}
                  {result.issues.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-white mb-3">Immediate Actions:</h4>
                      <div className="space-y-2">
                        {result.issues.map((issue, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-gray-900/50 rounded-lg">
                            <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preventive Actions */}
                  {result.actions?.preventive && result.actions.preventive.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-white mb-3">Preventive Actions:</h4>
                      <div className="space-y-2">
                        {result.actions.preventive.map((action, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span className="text-blue-300 text-sm">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.issues.length === 0 && (
                    <div className="flex items-center gap-2 p-4 bg-green-900/20 border border-green-700 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-green-300">No significant bias patterns detected!</span>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session Insights */}
            {sessionInsights && (
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Session Insights
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Analyses:</span>
                      <span className="text-white">{sessionInsights.currentSession.analyses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Avg Bias:</span>
                      <span className="text-white">{Math.round(sessionInsights.currentSession.averageBias * 100)}%</span>
                    </div>
                    {sessionInsights.currentSession.patterns.length > 0 && (
                      <div>
                        <div className="text-gray-400 mb-1">Common Patterns:</div>
                        <div className="text-xs text-blue-400">
                          {sessionInsights.currentSession.patterns.join(', ')}
                        </div>
                      </div>
                    )}
                    {sessionInsights.recommendations.length > 0 && (
                      <div className="pt-2 border-t border-gray-700">
                        <div className="text-gray-400 mb-1">Recommendations:</div>
                        {sessionInsights.recommendations.slice(0, 2).map((rec: string, i: number) => (
                          <div key={i} className="text-xs text-yellow-400 mb-1">{rec}</div>
                        ))}
                      </div>
                    )}
                    <Button
                      onClick={clearHistory}
                      size="sm"
                      variant="outline"
                      className="w-full text-gray-300 border-gray-600 hover:bg-gray-700 mt-3"
                    >
                      Clear Session
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Examples */}
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Try Examples</h3>
                <div className="space-y-2">
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => loadExample(example)}
                      className="w-full text-left p-3 bg-gray-900/50 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
                    >
                      {example.substring(0, 60)}...
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Recent Analysis */}
            {history.length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Analysis</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {history.map((item, index) => (
                      <div key={index} className="p-3 bg-gray-900/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm">{item.result.level}</span>
                          <span className="text-xs text-gray-400">
                            {item.timestamp.toLocaleTimeString()}
                          </span>
                          {item.result.confidence && (
                            <span className="text-xs text-blue-400">
                              {Math.round(item.result.confidence * 100)}%
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 truncate">
                          {item.text.substring(0, 50)}...
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}

            {/* Info Panel */}
            <Card className="bg-gray-800/50 border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <div>
                    <strong className="text-white">🟢 GOOD:</strong> No significant bias detected
                  </div>
                  <div>
                    <strong className="text-white">🟡 BIAS:</strong> Moderate bias patterns found
                  </div>
                  <div>
                    <strong className="text-white">🔴 FIX:</strong> High bias, needs attention
                  </div>
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-xs text-gray-400">
                      Unified system detects success declaration, terminal worship, pattern blindness, planning fallacy, feature creep, and authority bias patterns.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Legacy fallback function (for compatibility)
function quickBiasCheck(text: string): BiasResult {
  let score = 0;
  const problems: string[] = [];
  
  // Detect bias patterns
  if (/phase \d+|roadmap|timeline|sprint/i.test(text)) {
    score += 30;
    problems.push('Planning Fallacy: Remove timeline language');
  }
  if (/comprehensive|framework|system|enterprise/i.test(text)) {
    score += 25;
    problems.push('Feature Creep: Simplify approach');
  }
  if (/standards|enforcement|approval|mandatory/i.test(text)) {
    score += 20;
    problems.push('Authority Bias: Use normal language');
  }
  if (/obviously|clearly|simply|just|easily/i.test(text)) {
    score += 15;
    problems.push('Assumption Bias: Avoid absolute language');
  }
  if (/should|must|need to|have to/i.test(text)) {
    score += 10;
    problems.push('Directive Bias: Use suggestion language');
  }
  
  // Context penalties
  const words = text.split(' ').length;
  let contextWarning = '';
  if (words > 200) {
    score += 20;
    problems.push('Context Waste: Shorten response');
    contextWarning = '📊 CONTEXT-HEAVY';
  } else if (words > 100) {
    contextWarning = '📈 CONTEXT-WATCH';
  }
  
  // Generate level
  const level = score < 30 ? '🟢 GOOD' : score < 60 ? '🟡 BIAS' : '🔴 FIX';
  
  return {
    level,
    score: Math.min(score, 100),
    issues: problems,
    contextWarning
  };
}

export default withErrorBoundary(BiasAgentPage, "BiasAgentPage"); 