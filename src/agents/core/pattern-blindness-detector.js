"use strict";
/**
 * 🧠 PATTERN BLINDNESS DETECTOR
 * Pragmatic detection and prevention of AI failure modes
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternBlindnessDetector = void 0;
const aria_protocol_1 = require("./aria-protocol");
class PatternBlindnessDetector {
    constructor() {
        this.conversationHistory = [];
        this.aria = new aria_protocol_1.ARIAProtocol();
    }
    /**
     * Add a conversation message for analysis
     */
    addMessage(message) {
        this.conversationHistory.push(message);
        // Keep history manageable (last 50 messages)
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-30);
        }
    }
    /**
     * Analyze current conversation for pattern risks
     */
    analyzeConversation(currentSolution) {
        this.lastAnalysis = this.aria.analyzeConversation(this.conversationHistory, currentSolution);
        return this.lastAnalysis;
    }
    /**
     * Check if intervention is needed
     */
    requiresIntervention() {
        if (!this.lastAnalysis) {
            this.analyzeConversation();
        }
        return this.lastAnalysis?.interventionRequired || false;
    }
    /**
     * Get intervention recommendations
     */
    getInterventions() {
        if (!this.lastAnalysis) {
            this.analyzeConversation();
        }
        return this.aria.generateInterventions(this.lastAnalysis);
    }
    /**
     * Get current risk assessment
     */
    getCurrentRisks() {
        if (!this.lastAnalysis) {
            this.analyzeConversation();
        }
        return this.lastAnalysis?.risks || [];
    }
    /**
     * Reset conversation history (useful for context resets)
     */
    resetContext() {
        this.conversationHistory = [];
        this.lastAnalysis = undefined;
    }
    /**
     * Get conversation statistics
     */
    getStats() {
        if (!this.lastAnalysis) {
            this.analyzeConversation();
        }
        const highestRisk = this.lastAnalysis?.risks
            .reduce((max, risk) => risk.level === 'critical' ? risk :
            risk.level === 'high' && max.level !== 'critical' ? risk : max, { level: 'low' });
        return {
            messageCount: this.lastAnalysis?.messageCount || 0,
            repetitionScore: this.lastAnalysis?.repetitionScore || 0,
            topicDiversity: this.lastAnalysis?.topicDiversity || 1,
            riskLevel: highestRisk?.level || 'low'
        };
    }
    /**
     * Simple health check
     */
    isHealthy() {
        const stats = this.getStats();
        return stats.riskLevel !== 'critical' && stats.repetitionScore < 0.8;
    }
}
exports.PatternBlindnessDetector = PatternBlindnessDetector;
exports.default = PatternBlindnessDetector;
//# sourceMappingURL=pattern-blindness-detector.js.map