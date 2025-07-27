/**
 * 🛡️ BIASGUARD API ENDPOINT
 * Provides bias analysis as a service
 */

import { NextRequest, NextResponse } from 'next/server';
import { UnifiedBiasGuard } from '@/agents/bias-detection/unified-biasguard';

interface BiasAnalysisRequest {
  text: string;
  context?: {
    conversationHistory?: string[];
    codeChanges?: string[];
    userPrompt?: string;
  };
}

interface BiasAnalysisResponse {
  level: string;
  score: number;
  issues: string[];
  contextWarning?: string;
  analysis: {
    wordCount: number;
    characterCount: number;
    patterns: string[];
    confidence: number;
    health: {
      aiReliability: number;
      conversationFlow: number;
      solutionEffectiveness: number;
    };
  };
  actions: {
    immediate: string[];
    preventive: string[];
  };
  timestamp: string;
}

// Global instance for performance (with proper cleanup)
let globalBiasGuard: UnifiedBiasGuard | null = null;

function getBiasGuard(): UnifiedBiasGuard {
  if (!globalBiasGuard) {
    globalBiasGuard = new UnifiedBiasGuard();
  }
  return globalBiasGuard;
}

export async function POST(request: NextRequest) {
  try {
    const body: BiasAnalysisRequest = await request.json();
    
    if (!body.text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Use unified BiasGuard system
    const biasGuard = getBiasGuard();
    const result = await biasGuard.analyze({
      aiResponse: body.text,
      userPrompt: body.context?.userPrompt,
      conversationHistory: body.context?.conversationHistory || [],
      codeChanges: body.context?.codeChanges || []
    });

    // Convert to API response format
    const level = result.biasScore < 0.3 ? '🟢 GOOD' : result.biasScore < 0.6 ? '🟡 BIAS' : '🔴 FIX';
    
    const response: BiasAnalysisResponse = {
      level,
      score: Math.round(result.biasScore * 100),
      issues: result.immediateActions,
      contextWarning: result.contextWarning,
      analysis: {
        wordCount: body.text.split(' ').length,
        characterCount: body.text.length,
        patterns: result.patterns.map(p => p.type),
        confidence: result.confidence,
        health: result.health
      },
      actions: {
        immediate: result.immediateActions,
        preventive: result.preventiveActions
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('BiasGuard analysis error:', error);
    return NextResponse.json(
      { error: 'Analysis failed' },
      { status: 500 }
    );
  }
}

// Legacy fallback function (for compatibility)
function analyzeBias(text: string): BiasAnalysisResponse {
  let score = 0;
  const problems: string[] = [];
  const patterns: string[] = [];
  
  // Detect bias patterns
  if (/phase \d+|roadmap|timeline|sprint/i.test(text)) {
    score += 30;
    problems.push('Planning Fallacy: Remove timeline language');
    patterns.push('Planning Fallacy');
  }
  if (/comprehensive|framework|system|enterprise/i.test(text)) {
    score += 25;
    problems.push('Feature Creep: Simplify approach');
    patterns.push('Feature Creep');
  }
  if (/standards|enforcement|approval|mandatory/i.test(text)) {
    score += 20;
    problems.push('Authority Bias: Use normal language');
    patterns.push('Authority Bias');
  }
  if (/obviously|clearly|simply|just|easily/i.test(text)) {
    score += 15;
    problems.push('Assumption Bias: Avoid absolute language');
    patterns.push('Assumption Bias');
  }
  if (/should|must|need to|have to/i.test(text)) {
    score += 10;
    problems.push('Directive Bias: Use suggestion language');
    patterns.push('Directive Bias');
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
    contextWarning,
    analysis: {
      wordCount: words,
      characterCount: text.length,
      patterns,
      confidence: 0.8, // Default confidence for legacy
      health: {
        aiReliability: Math.max(0, 1 - score / 100),
        conversationFlow: 0.8,
        solutionEffectiveness: 0.7
      }
    },
    actions: {
      immediate: problems,
      preventive: ['Use unified BiasGuard system for better analysis']
    },
    timestamp: new Date().toISOString()
  };
}

// Cleanup on process exit
if (typeof process !== 'undefined') {
  process.on('exit', () => {
    if (globalBiasGuard) {
      globalBiasGuard.dispose();
      globalBiasGuard = null;
    }
  });
}

export async function GET() {
  return NextResponse.json({
    service: 'BiasGuard Analysis API',
    version: '1.0.0',
    endpoints: {
      analyze: 'POST /api/biasagent/analyze',
      usage: 'Send JSON with "text" field'
    },
    example: {
      text: 'Your text to analyze for cognitive biases'
    }
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 