/**
 * 🎯 BIASGUARD VISUAL OVERLAY
 * Real-time visual feedback system for bias detection in Cursor IDE
 * 
 * Provides non-intrusive visual alerts and actionable suggestions
 * Integrates with existing UI components and dashboard systems
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AlertTriangle, Brain, Target, TrendingUp, Eye, Shield } from 'lucide-react';
import { BiasDetectionResult, BiasPattern, BiasIntervention } from '@/agents/bias-detection/cursor-extension-core';

interface VisualOverlayProps {
  detectionResult?: BiasDetectionResult;
  isVisible: boolean;
  onDismiss: () => void;
  onAcceptSuggestion: (intervention: BiasIntervention) => void;
  position?: 'top-right' | 'bottom-right' | 'floating';
}

interface BiasAlertProps {
  pattern: BiasPattern;
  onAcceptFix: (fix: string) => void;
}

/**
 * Individual bias alert component
 */
function BiasAlert({ pattern, onAcceptFix }: BiasAlertProps) {
  const severityColors = {
    low: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-200',
    medium: 'bg-orange-500/20 border-orange-500/40 text-orange-200', 
    high: 'bg-red-500/20 border-red-500/40 text-red-200',
    critical: 'bg-red-700/30 border-red-700/60 text-red-100'
  };

  const severityIcons = {
    low: <Eye className="w-4 h-4" />,
    medium: <AlertTriangle className="w-4 h-4" />,
    high: <AlertTriangle className="w-4 h-4" />,
    critical: <Shield className="w-4 h-4" />
  };

  return (
    <div className={`p-3 rounded-lg border ${severityColors[pattern.severity]} mb-2`}>
      <div className="flex items-start gap-2">
        {severityIcons[pattern.severity]}
        <div className="flex-1">
          <div className="font-medium text-sm capitalize">
            {pattern.type.replace('-', ' ')}
          </div>
          <div className="text-xs opacity-90 mt-1">
            {pattern.description}
          </div>
          <div className="text-xs opacity-75 mt-1">
            Confidence: {Math.round(pattern.confidence * 100)}%
          </div>
        </div>
      </div>
      
      {pattern.suggestedFix && (
        <div className="mt-2 pt-2 border-t border-current/20">
          <div className="text-xs font-medium mb-1">Suggested Fix:</div>
          <div className="text-xs opacity-90 mb-2">{pattern.suggestedFix}</div>
          <button
            onClick={() => onAcceptFix(pattern.suggestedFix)}
            className="text-xs px-2 py-1 bg-current/20 hover:bg-current/30 rounded transition-colors"
          >
            Apply Fix
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Intervention suggestion component
 */
function InterventionSuggestion({ 
  intervention, 
  onAccept 
}: { 
  intervention: BiasIntervention;
  onAccept: (intervention: BiasIntervention) => void;
}) {
  const typeColors = {
    'visual-alert': 'bg-blue-500/20 border-blue-500/40 text-blue-200',
    'suggestion': 'bg-green-500/20 border-green-500/40 text-green-200',
    'learning-prompt': 'bg-purple-500/20 border-purple-500/40 text-purple-200',
    'team-notification': 'bg-yellow-500/20 border-yellow-500/40 text-yellow-200'
  };

  const typeIcons = {
    'visual-alert': <AlertTriangle className="w-4 h-4" />,
    'suggestion': <Target className="w-4 h-4" />,
    'learning-prompt': <Brain className="w-4 h-4" />,
    'team-notification': <TrendingUp className="w-4 h-4" />
  };

  return (
    <div className={`p-3 rounded-lg border ${typeColors[intervention.type]} mb-2`}>
      <div className="flex items-start gap-2">
        {typeIcons[intervention.type]}
        <div className="flex-1">
          <div className="text-sm">{intervention.message}</div>
          <div className="text-xs opacity-75 mt-1">
            Priority: {intervention.priority}/10
          </div>
        </div>
      </div>
      
      {intervention.actionable && (
        <div className="mt-2 pt-2 border-t border-current/20">
          <button
            onClick={() => onAccept(intervention)}
            className="text-xs px-2 py-1 bg-current/20 hover:bg-current/30 rounded transition-colors"
          >
            Take Action
          </button>
        </div>
      )}
    </div>
  );
}

/**
 * Bias score visualization component
 */
function BiasScoreIndicator({ score }: { score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'text-red-400';
    if (score >= 0.4) return 'text-orange-400';
    return 'text-green-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 0.7) return 'High Risk';
    if (score >= 0.4) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="text-sm font-medium text-gray-300">Bias Risk:</div>
      <div className={`text-sm font-bold ${getScoreColor(score)}`}>
        {getScoreLabel(score)} ({Math.round(score * 100)}%)
      </div>
      <div className="flex-1 bg-gray-700 rounded-full h-2 ml-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            score >= 0.7 ? 'bg-red-500' : 
            score >= 0.4 ? 'bg-orange-500' : 'bg-green-500'
          }`}
          style={{ width: `${score * 100}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Main visual overlay component
 */
export function BiasDetectionOverlay({
  detectionResult,
  isVisible,
  onDismiss,
  onAcceptSuggestion,
  position = 'top-right'
}: VisualOverlayProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dismissedPatterns, setDismissedPatterns] = useState<Set<string>>(new Set());

  // Auto-expand for high-risk detections
  useEffect(() => {
    if (detectionResult?.biasScore && detectionResult.biasScore > 0.7) {
      setIsExpanded(true);
    }
  }, [detectionResult?.biasScore]);

  const handleAcceptFix = useCallback((fix: string) => {
    // In a real implementation, this would apply the fix to the code
    console.log('Applying bias fix:', fix);
    
    // For now, just show a notification
    // This could integrate with Cursor's command system
  }, []);

  const handleDismissPattern = useCallback((patternType: string) => {
    setDismissedPatterns(prev => new Set([...prev, patternType]));
  }, []);

  if (!isVisible || !detectionResult?.hasBias) {
    return null;
  }

  const visiblePatterns = detectionResult.detectedPatterns.filter(
    pattern => !dismissedPatterns.has(pattern.type)
  );

  const positionClasses = {
    'top-right': 'fixed top-4 right-4 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'floating': 'fixed top-1/2 right-4 transform -translate-y-1/2 z-50'
  };

  return (
    <div className={`${positionClasses[position]} max-w-md`}>
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl">
        {/* Header */}
        <div className="p-3 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-400" />
              <span className="font-medium text-white">BiasGuard</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {isExpanded ? '−' : '+'}
              </button>
              <button
                onClick={onDismiss}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          </div>
          
          <BiasScoreIndicator score={detectionResult.biasScore} />
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="p-3 max-h-96 overflow-y-auto">
            {/* Detected Patterns */}
            {visiblePatterns.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-300 mb-2">
                  Detected Patterns ({visiblePatterns.length})
                </div>
                {visiblePatterns.map((pattern, index) => (
                  <div key={`${pattern.type}-${index}`} className="relative">
                    <BiasAlert 
                      pattern={pattern} 
                      onAcceptFix={handleAcceptFix}
                    />
                    <button
                      onClick={() => handleDismissPattern(pattern.type)}
                      className="absolute top-1 right-1 text-xs text-gray-500 hover:text-gray-300"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Interventions */}
            {detectionResult.interventions.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-300 mb-2">
                  Recommended Actions ({detectionResult.interventions.length})
                </div>
                {detectionResult.interventions.slice(0, 3).map((intervention, index) => (
                  <InterventionSuggestion
                    key={index}
                    intervention={intervention}
                    onAccept={onAcceptSuggestion}
                  />
                ))}
              </div>
            )}

            {/* Contextual Factors */}
            {detectionResult.contextualFactors.length > 0 && (
              <div>
                <div className="text-sm font-medium text-gray-300 mb-2">
                  Context Factors
                </div>
                {detectionResult.contextualFactors.map((factor, index) => (
                  <div key={index} className="text-xs text-gray-400 mb-1">
                    <span className="font-medium">{factor.factor}:</span> {factor.description}
                    <span className="ml-2 text-gray-500">
                      (Impact: {Math.round(factor.impact * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Collapsed Summary */}
        {!isExpanded && (
          <div className="p-3 text-sm text-gray-300">
            {visiblePatterns.length} bias pattern{visiblePatterns.length !== 1 ? 's' : ''} detected
            {detectionResult.interventions.length > 0 && (
              <span className="ml-2 text-blue-400">
                • {detectionResult.interventions.length} suggestion{detectionResult.interventions.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Minimalist bias indicator for status bar
 */
export function BiasStatusIndicator({ 
  biasScore, 
  onClick 
}: { 
  biasScore: number;
  onClick: () => void;
}) {
  const getIndicatorColor = (score: number) => {
    if (score >= 0.7) return 'bg-red-500';
    if (score >= 0.4) return 'bg-orange-500';
    return 'bg-green-500';
  };

  if (biasScore === 0) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        BiasGuard
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 px-2 py-1 text-xs text-white bg-gray-800 hover:bg-gray-700 rounded transition-colors"
    >
      <div className={`w-2 h-2 ${getIndicatorColor(biasScore)} rounded-full animate-pulse`} />
      BiasGuard: {Math.round(biasScore * 100)}%
    </button>
  );
}

export default BiasDetectionOverlay; 