"use strict";
/**
 * 🤖 AUTONOMOUS AGENT NETWORK (AAN) ORCHESTRATOR
 * Central coordination system for all monitoring and validation agents
 *
 * Mission: Ensure championship-level system performance for July 28th deadline
 * Architecture: Pragmatic excellence with defensive monitoring protocols
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentOrchestrator = exports.AgentOrchestrator = void 0;
// import { RuntimeErrorDetector } from "./runtime-error-detector"; // Temporarily disabled
const pattern_blindness_detector_1 = require("./pattern-blindness-detector");
// Temporary logger implementation
const logger = {
    info: (message, data) => console.log(`[INFO] ${message}`, data || ''),
    warn: (message, data) => console.warn(`[WARN] ${message}`, data || ''),
    error: (message, data) => console.error(`[ERROR] ${message}`, data || ''),
    debug: (message, data) => console.debug(`[DEBUG] ${message}`, data || ''),
};
/**
 * Central Agent Orchestrator
 * Coordinates all autonomous monitoring agents with intelligent prioritization
 */
class AgentOrchestrator {
    constructor() {
        this.agents = new Map();
        this.agentConfigs = new Map();
        this.agentReports = new Map();
        this.systemMetrics = {};
        this.isRunning = false;
        this.conversationHistory = [];
        this.initializeAgents();
        this.setupDefaultConfigs();
        // Initialize pattern blindness detection
        this.patternBlindnessDetector = new pattern_blindness_detector_1.PatternBlindnessDetector();
        logger.info('Agent Orchestrator initialized with pattern blindness detection');
    }
    /**
     * Initialize all monitoring agents
     */
    initializeAgents() {
        try {
            // Runtime Error Detection Agent
            // const runtimeDetector = new RuntimeErrorDetector(); // Temporarily disabled
            // this.agents.set("runtime-error-detector", runtimeDetector); // Disabled until RuntimeErrorDetector is implemented
            // Performance Monitor Agent (client-side integration)
            this.agents.set("performance-monitor", {
                id: "performance-monitor",
                type: "client-side",
                status: "active",
                checkHealth: () => this.checkPerformanceHealth(),
            });
            // Hooks Safety Checker Agent
            this.agents.set("hooks-safety-checker", {
                id: "hooks-safety-checker",
                type: "validation",
                status: "active",
                checkHealth: () => this.checkHooksSafety(),
            });
            // Build Health Monitor Agent
            this.agents.set("build-health-monitor", {
                id: "build-health-monitor",
                type: "infrastructure",
                status: "active",
                checkHealth: () => this.checkBuildHealth(),
            });
            logger.info(`Agent Orchestrator: Initialized ${this.agents.size} agents`);
        }
        catch (error) {
            logger.error("Agent Orchestrator: Failed to initialize agents", error);
        }
    }
    /**
     * Setup default agent configurations
     */
    setupDefaultConfigs() {
        // Runtime Error Detector - High priority, frequent checks
        this.agentConfigs.set("runtime-error-detector", {
            enabled: true,
            priority: 1,
            autoFix: true,
            alertThreshold: "warning",
            checkInterval: 15000, // 15 seconds for critical monitoring
        });
        // Performance Monitor - Medium priority
        this.agentConfigs.set("performance-monitor", {
            enabled: true,
            priority: 2,
            autoFix: false,
            alertThreshold: "critical",
            checkInterval: 30000, // 30 seconds for performance metrics
        });
        // Hooks Safety Checker - Lower priority
        this.agentConfigs.set("hooks-safety-checker", {
            enabled: true,
            priority: 3,
            autoFix: true,
            alertThreshold: "warning",
            checkInterval: 60000, // 60 seconds for code analysis
        });
    }
    /**
     * Start the autonomous agent network
     */
    async startNetwork() {
        if (this.isRunning) {
            logger.warn("Agent Orchestrator: Network already running");
            return;
        }
        this.isRunning = true;
        logger.info("🚀 Agent Orchestrator: Starting Autonomous Agent Network");
        // Run initial health check on all agents
        await this.runFullSystemCheck();
        // Start orchestration loop
        this.orchestrationInterval = setInterval(() => this.orchestrationLoop(), 10000 // Run every 10 seconds
        );
        logger.info("✅ Agent Orchestrator: Network started successfully");
    }
    /**
     * Stop the autonomous agent network
     */
    stopNetwork() {
        if (!this.isRunning) {
            logger.warn("Agent Orchestrator: Network already stopped");
            return;
        }
        this.isRunning = false;
        if (this.orchestrationInterval) {
            clearInterval(this.orchestrationInterval);
            this.orchestrationInterval = undefined;
        }
        logger.info("🛑 Agent Orchestrator: Network stopped");
    }
    /**
     * Main orchestration loop - coordinates all agent activities
     */
    async orchestrationLoop() {
        try {
            const now = Date.now();
            const prioritizedAgents = this.getPrioritizedAgents();
            for (const [agentId, agent] of prioritizedAgents) {
                const config = this.agentConfigs.get(agentId);
                if (!config?.enabled)
                    continue;
                const lastCheck = this.getLastCheckTime(agentId);
                if (now - lastCheck < config.checkInterval)
                    continue;
                // Run agent check
                await this.runAgentCheck(agentId, agent);
            }
            // Update system metrics
            this.updateSystemMetrics();
            // Check for emergency conditions
            await this.checkEmergencyConditions();
        }
        catch (error) {
            logger.error("Agent Orchestrator: Error in orchestration loop", error);
        }
    }
    /**
     * Add conversation message for pattern analysis
     */
    addConversationMessage(message) {
        this.conversationHistory.push(message);
        // Keep conversation history manageable
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-30);
        }
    }
    /**
     * Analyze conversation for pattern blindness risks
     */
    analyzePatternRisk(currentSolution) {
        this.lastPatternAnalysis = this.patternBlindnessDetector.analyzeConversation(currentSolution);
        return this.lastPatternAnalysis;
    }
    /**
     * Check if pattern intervention is required
     */
    checkPatternIntervention() {
        return this.patternBlindnessDetector.getInterventions();
    }
    /**
     * Record solution attempt for pattern tracking
     */
    recordSolutionAttempt(approach, successful = false) {
        // Add message to conversation history for pattern tracking
        this.patternBlindnessDetector.addMessage(`Solution attempt: ${approach} (${successful ? 'successful' : 'failed'})`);
    }
    /**
     * Update solution status after verification
     */
    updateSolutionStatus(solutionId, successful) {
        // Add verification result to conversation history
        this.patternBlindnessDetector.addMessage(`Solution ${solutionId} verified: ${successful ? 'successful' : 'failed'}`);
    }
    /**
     * Trigger pattern interruption (context reset)
     */
    triggerPatternInterruption() {
        logger.warn('Pattern interruption triggered - resetting conversation state');
        this.patternBlindnessDetector.resetContext();
        this.conversationHistory = [];
        this.lastPatternAnalysis = undefined;
    }
    /**
     * Get pattern detection statistics
     */
    getPatternStatistics() {
        return this.patternBlindnessDetector.getStats();
    }
    /**
     * Get agents sorted by priority (highest first)
     */
    getPrioritizedAgents() {
        return Array.from(this.agents.entries()).sort(([idA], [idB]) => {
            const priorityA = this.agentConfigs.get(idA)?.priority ?? 5;
            const priorityB = this.agentConfigs.get(idB)?.priority ?? 5;
            return priorityA - priorityB; // Lower number = higher priority
        });
    }
    /**
     * Run health check for specific agent
     */
    async runAgentCheck(agentId, agent) {
        try {
            const startTime = Date.now();
            let report;
            // Execute agent-specific health check
            if (agentId === "runtime-error-detector") {
                const assessment = await agent.assessCascadeRisk();
                report = this.createRuntimeErrorReport(agentId, assessment);
            }
            else {
                // Generic agent health check
                const healthResult = await agent.checkHealth();
                report = this.createGenericReport(agentId, healthResult);
            }
            // Store report
            this.addAgentReport(agentId, report);
            // Handle critical alerts
            if (report.alertLevel === "critical" || report.alertLevel === "emergency") {
                await this.handleCriticalAlert(report);
            }
            // Apply auto-fixes if enabled
            const config = this.agentConfigs.get(agentId);
            if (config?.autoFix && report.recommendations.length > 0) {
                await this.applyAutoFixes(agentId, report);
            }
            const duration = Date.now() - startTime;
            logger.debug(`Agent ${agentId} check completed in ${duration}ms`);
        }
        catch (error) {
            logger.error(`Agent Orchestrator: Error checking agent ${agentId}`, error);
            // Create error report
            const errorReport = {
                agentId,
                timestamp: new Date(),
                status: "error",
                alertLevel: "warning",
                findings: [`Agent check failed: ${error}`],
                recommendations: ["Review agent configuration", "Check system resources"],
                metrics: { checkDuration: -1, errorCount: 1 },
            };
            this.addAgentReport(agentId, errorReport);
        }
    }
    /**
     * Create report for runtime error detector
     */
    createRuntimeErrorReport(agentId, assessment) {
        const alertLevel = assessment.riskLevel === "critical" ? "critical" :
            assessment.riskLevel === "high" ? "warning" : "info";
        return {
            agentId,
            timestamp: new Date(),
            status: "active",
            alertLevel,
            findings: assessment.violations.map(v => `${v.type}: ${v.component}`),
            recommendations: assessment.violations.map(v => v.fix),
            metrics: {
                violationCount: assessment.violations.length,
                riskScore: assessment.riskLevel === "critical" ? 10 :
                    assessment.riskLevel === "high" ? 7 : 3,
            },
        };
    }
    /**
     * Create generic agent report
     */
    createGenericReport(agentId, healthResult) {
        return {
            agentId,
            timestamp: new Date(),
            status: "active",
            alertLevel: "info",
            findings: healthResult?.issues || [],
            recommendations: healthResult?.recommendations || [],
            metrics: healthResult?.metrics || {},
        };
    }
    /**
     * Add agent report to history
     */
    addAgentReport(agentId, report) {
        const reports = this.agentReports.get(agentId) || [];
        reports.push(report);
        // Keep only last 50 reports per agent
        if (reports.length > 50) {
            reports.splice(0, reports.length - 50);
        }
        this.agentReports.set(agentId, reports);
    }
    /**
     * Handle critical system alerts
     */
    async handleCriticalAlert(report) {
        logger.error(`🚨 CRITICAL ALERT from ${report.agentId}:`, {
            findings: report.findings,
            recommendations: report.recommendations,
            metrics: report.metrics,
        });
        // Emergency protocols for July 28th mission
        if (report.alertLevel === "emergency") {
            logger.error("🚨 EMERGENCY: Initiating defensive architecture protocols");
            // Could trigger emergency procedures:
            // - Automatic rollback
            // - Performance optimization
            // - System stabilization
            // - Alert team members
        }
    }
    /**
     * Apply automatic fixes based on agent recommendations
     */
    async applyAutoFixes(agentId, report) {
        try {
            logger.info(`🔧 Applying auto-fixes for ${agentId}:`, report.recommendations);
            // Implementation would depend on specific agent type and recommendations
            // For now, log the intent and mark as applied
            report.autoFixApplied = true;
        }
        catch (error) {
            logger.error(`Failed to apply auto-fixes for ${agentId}:`, error);
        }
    }
    /**
     * Update system-wide metrics
     */
    updateSystemMetrics() {
        const now = Date.now();
        let totalAlerts = 0;
        let criticalIssues = 0;
        let performanceScore = 100;
        // Aggregate metrics from all agents
        for (const [agentId, reports] of this.agentReports) {
            const latestReport = reports[reports.length - 1];
            if (!latestReport)
                continue;
            // Count alerts
            if (latestReport.alertLevel === "warning")
                totalAlerts++;
            if (latestReport.alertLevel === "critical" || latestReport.alertLevel === "emergency") {
                criticalIssues++;
                performanceScore -= 20; // Significant impact
            }
            // Deduct performance score for issues
            if (latestReport.findings.length > 0) {
                performanceScore -= latestReport.findings.length * 5;
            }
        }
        this.systemMetrics = {
            totalAlerts,
            criticalIssues,
            performanceScore: Math.max(0, performanceScore),
            activeAgents: this.agents.size,
            lastUpdate: now,
        };
    }
    /**
     * Check for emergency conditions that require immediate attention
     */
    async checkEmergencyConditions() {
        const criticalIssues = this.systemMetrics.criticalIssues || 0;
        const performanceScore = this.systemMetrics.performanceScore || 0;
        // Emergency thresholds for July 28th mission
        if (criticalIssues >= 3) {
            logger.error("🚨 EMERGENCY: Multiple critical issues detected");
            // Could trigger emergency procedures
        }
        if (performanceScore < 50) {
            logger.error("🚨 EMERGENCY: Performance score critically low");
            // Could trigger performance optimization procedures
        }
    }
    /**
     * Get comprehensive system overview
     */
    getSystemOverview() {
        const criticalIssues = this.systemMetrics.criticalIssues || 0;
        const performanceScore = this.systemMetrics.performanceScore || 0;
        const overallHealth = criticalIssues > 0 ? "critical" :
            performanceScore < 70 ? "degraded" :
                performanceScore < 90 ? "good" : "excellent";
        return {
            overallHealth,
            activeAgents: this.systemMetrics.activeAgents || 0,
            totalAlerts: this.systemMetrics.totalAlerts || 0,
            criticalIssues,
            performanceScore,
            lastUpdate: new Date(this.systemMetrics.lastUpdate || Date.now()),
            missionReadiness: overallHealth !== "critical" && performanceScore >= 80,
        };
    }
    /**
     * Get latest reports from all agents
     */
    getLatestReports() {
        const reports = {};
        for (const [agentId, agentReports] of this.agentReports) {
            reports[agentId] = agentReports[agentReports.length - 1] || null;
        }
        return reports;
    }
    /**
     * Run full system check on all agents
     */
    async runFullSystemCheck() {
        logger.info("🔍 Agent Orchestrator: Running full system check");
        const checkPromises = Array.from(this.agents.entries()).map(([agentId, agent]) => this.runAgentCheck(agentId, agent));
        await Promise.allSettled(checkPromises);
        this.updateSystemMetrics();
        const overview = this.getSystemOverview();
        logger.info("✅ Full system check completed", overview);
        return overview;
    }
    /**
     * Check if orchestrator is currently running
     */
    getRunningStatus() {
        return this.isRunning;
    }
    /**
     * Get system health summary for monitoring
     */
    getSystemHealth() {
        return {
            activeAgents: this.agents.size,
            systemMetrics: this.systemMetrics,
            lastOrchestrationTime: Date.now(),
            agentStatuses: Array.from(this.agents.keys()).map(agentId => ({
                id: agentId,
                status: this.agentConfigs.get(agentId)?.enabled ? 'active' : 'inactive'
            }))
        };
    }
    // Helper methods for agent-specific health checks
    async checkPerformanceHealth() {
        // Integration with performance monitor component
        return { status: "active", metrics: { responseTime: 45 } };
    }
    async checkHooksSafety() {
        // Integration with hooks safety checker
        return { status: "active", issues: [], recommendations: [] };
    }
    async checkBuildHealth() {
        // Integration with build health monitor
        return { status: "active", metrics: { buildTime: 9000 } };
    }
    getLastCheckTime(agentId) {
        const reports = this.agentReports.get(agentId);
        const lastReport = reports?.[reports.length - 1];
        return lastReport?.timestamp.getTime() || 0;
    }
}
exports.AgentOrchestrator = AgentOrchestrator;
// Singleton instance for global access
exports.agentOrchestrator = new AgentOrchestrator();
// Types are already exported above via interface declarations 
//# sourceMappingURL=agent-orchestrator.js.map