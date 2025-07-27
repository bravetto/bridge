"use strict";
/**
 * 🎯 BIASGUARD CURSOR EXTENSION CORE
 * Real-time AI bias detection and intervention system for Cursor IDE
 *
 * Integrates with existing ARIAProtocol and AgentOrchestrator
 * Provides context-aware bias detection with visual feedback
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorBiasDetector = void 0;
const aria_protocol_1 = require("../core/aria-protocol");
const agent_orchestrator_1 = require("../core/agent-orchestrator");
/**
 * Core bias detection engine for Cursor IDE
 */
class CursorBiasDetector {
    constructor() {
        this.conversationHistory = [];
        this.codeContext = new Map();
        this.userBehaviorPatterns = new Map();
        // Real-time monitoring state
        this.isMonitoring = false;
        this.aria = new aria_protocol_1.ARIAProtocol();
        this.orchestrator = new agent_orchestrator_1.AgentOrchestrator();
        this.initializeMonitoring();
    }
    /**
     * Initialize real-time bias monitoring
     */
    initializeMonitoring() {
        this.isMonitoring = true;
        this.detectionInterval = setInterval(() => {
            this.performPeriodicAnalysis();
        }, 5000); // Check every 5 seconds
    }
    /**
     * Analyze current context for bias patterns
     */
    async detectBias(context) {
        // Update conversation history
        if (context.conversationHistory) {
            this.conversationHistory = context.conversationHistory;
        }
        if (context.userPrompt) {
            this.conversationHistory.push(`USER: ${context.userPrompt}`);
        }
        if (context.aiResponse) {
            this.conversationHistory.push(`AI: ${context.aiResponse}`);
        }
        // Perform ARIA analysis
        const ariaAnalysis = this.aria.analyzeConversation(this.conversationHistory, context.aiResponse);
        // Detect specific bias patterns
        const detectedPatterns = await this.detectSpecificPatterns(context, ariaAnalysis);
        // Generate contextual factors
        const contextualFactors = this.analyzeContextualFactors(context);
        // Generate interventions
        const interventions = this.generateInterventions(detectedPatterns, ariaAnalysis);
        // Calculate overall bias score
        const biasScore = this.calculateBiasScore(detectedPatterns, ariaAnalysis);
        const result = {
            hasBias: detectedPatterns.length > 0 || ariaAnalysis.interventionRequired,
            biasScore,
            detectedPatterns,
            interventions,
            contextualFactors
        };
        this.lastDetectionResult = result;
        return result;
    }
    /**
     * Detect specific bias patterns in AI responses and user behavior
     */
    async detectSpecificPatterns(context, ariaAnalysis) {
        const patterns = [];
        // Success Declaration Bias (from our conversation analysis)
        if (this.detectSuccessDeclarationBias(context.aiResponse)) {
            patterns.push({
                type: 'success-declaration',
                confidence: 0.9,
                location: { file: 'ai-response', line: 0, column: 0, range: [0, 0] },
                description: 'AI declaring success without user confirmation',
                severity: 'high',
                suggestedFix: 'Wait for user verification before declaring success'
            });
        }
        // Terminal Worship Bias
        if (this.detectTerminalWorshipBias(context.aiResponse)) {
            patterns.push({
                type: 'terminal-worship',
                confidence: 0.8,
                location: { file: 'ai-response', line: 0, column: 0, range: [0, 0] },
                description: 'Over-reliance on terminal output as proof of success',
                severity: 'medium',
                suggestedFix: 'Verify actual user experience, not just terminal logs'
            });
        }
        // Pattern Blindness from ARIA
        ariaAnalysis.risks.forEach(risk => {
            if (risk.type === 'neural_howlround') {
                patterns.push({
                    type: 'pattern-blindness',
                    confidence: risk.confidence,
                    location: { file: 'conversation', line: 0, column: 0, range: [0, 0] },
                    description: risk.description,
                    severity: risk.level,
                    suggestedFix: risk.recommendation
                });
            }
        });
        return patterns;
    }
    /**
     * Detect success declaration bias pattern
     */
    detectSuccessDeclarationBias(aiResponse) {
        if (!aiResponse)
            return false;
        const successPhrases = [
            'mission accomplished',
            'success',
            'resolved',
            'working',
            'fixed',
            'complete'
        ];
        const lowerResponse = aiResponse.toLowerCase();
        return successPhrases.some(phrase => lowerResponse.includes(phrase));
    }
    /**
     * Detect terminal worship bias pattern
     */
    detectTerminalWorshipBias(aiResponse) {
        if (!aiResponse)
            return false;
        const terminalPhrases = [
            'terminal shows',
            'server logs',
            'compilation successful',
            'build passes',
            'curl response'
        ];
        const lowerResponse = aiResponse.toLowerCase();
        return terminalPhrases.some(phrase => lowerResponse.includes(phrase));
    }
    /**
     * Analyze contextual factors that influence bias
     */
    analyzeContextualFactors(context) {
        const factors = [];
        // Time pressure factor
        if (this.conversationHistory.length > 20) {
            factors.push({
                factor: 'conversation-length',
                impact: 0.7,
                description: 'Long conversation may increase pressure to declare success'
            });
        }
        // Repetition factor
        const repetitionScore = this.calculateRepetitionInConversation();
        if (repetitionScore > 0.5) {
            factors.push({
                factor: 'repetitive-patterns',
                impact: repetitionScore,
                description: 'Repetitive conversation patterns detected'
            });
        }
        return factors;
    }
    /**
     * Generate appropriate interventions based on detected patterns
     */
    generateInterventions(patterns, ariaAnalysis) {
        const interventions = [];
        patterns.forEach(pattern => {
            switch (pattern.type) {
                case 'success-declaration':
                    interventions.push({
                        type: 'visual-alert',
                        message: '⚠️ Consider waiting for user confirmation before declaring success',
                        actionable: true,
                        priority: 8
                    });
                    break;
                case 'terminal-worship':
                    interventions.push({
                        type: 'suggestion',
                        message: '💡 Remember: Terminal logs ≠ User experience. Verify actual functionality.',
                        actionable: true,
                        priority: 6
                    });
                    break;
                case 'pattern-blindness':
                    interventions.push({
                        type: 'learning-prompt',
                        message: '🔄 Pattern repetition detected. Consider alternative approaches.',
                        actionable: true,
                        priority: 7
                    });
                    break;
            }
        });
        return interventions.sort((a, b) => b.priority - a.priority);
    }
    /**
     * Calculate overall bias score
     */
    calculateBiasScore(patterns, ariaAnalysis) {
        if (patterns.length === 0)
            return 0;
        const patternScore = patterns.reduce((sum, pattern) => {
            const severityWeight = {
                'low': 0.25,
                'medium': 0.5,
                'high': 0.75,
                'critical': 1.0
            };
            return sum + (pattern.confidence * severityWeight[pattern.severity]);
        }, 0) / patterns.length;
        const ariaScore = ariaAnalysis.repetitionScore * 0.3 +
            (1 - ariaAnalysis.topicDiversity) * 0.3;
        return Math.min(1.0, (patternScore * 0.7) + (ariaScore * 0.3));
    }
    /**
     * Calculate repetition in conversation
     */
    calculateRepetitionInConversation() {
        if (this.conversationHistory.length < 5)
            return 0;
        const recentMessages = this.conversationHistory.slice(-10);
        const uniqueMessages = new Set(recentMessages);
        return 1 - (uniqueMessages.size / recentMessages.length);
    }
    /**
     * Perform periodic analysis for real-time monitoring
     */
    performPeriodicAnalysis() {
        if (this.conversationHistory.length === 0)
            return;
        // Analyze current state
        this.detectBias({
            conversationHistory: this.conversationHistory
        }).then(result => {
            if (result.hasBias && result.biasScore > 0.7) {
                this.triggerHighPriorityAlert(result);
            }
        });
    }
    /**
     * Trigger high priority alert for critical bias detection
     */
    triggerHighPriorityAlert(result) {
        const criticalPatterns = result.detectedPatterns.filter(p => p.severity === 'critical');
        if (criticalPatterns.length > 0) {
            // Integrate with existing monitoring system
            console.warn('🚨 CRITICAL BIAS DETECTED:', criticalPatterns);
            // Could integrate with existing alert systems here
            // this.orchestrator.triggerAlert('bias-detection', result);
        }
    }
    /**
     * Get current monitoring status
     */
    getMonitoringStatus() {
        const riskLevel = this.lastDetectionResult?.biasScore || 0;
        return {
            isActive: this.isMonitoring,
            lastDetection: this.lastDetectionResult,
            conversationLength: this.conversationHistory.length,
            overallRiskLevel: riskLevel > 0.7 ? 'high' : riskLevel > 0.4 ? 'medium' : 'low'
        };
    }
    /**
     * Stop monitoring and cleanup
     */
    dispose() {
        this.isMonitoring = false;
        if (this.detectionInterval) {
            clearInterval(this.detectionInterval);
        }
    }
}
exports.CursorBiasDetector = CursorBiasDetector;
exports.default = CursorBiasDetector;
//# sourceMappingURL=cursor-extension-core.js.map