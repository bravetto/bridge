import { NextRequest, NextResponse } from "next/server";

/**
 * 🏥 SIMPLE HEALTH CHECK ENDPOINT
 * Minimal health monitoring without complex dependencies
 */

interface SimpleHealthStatus {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
  agents?: {
    patternDetection: {
      status: string;
      available: boolean;
    };
  };
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Check if agents parameter is requested
    const url = new URL(request.url);
    const includeAgents = url.searchParams.get('agents') === 'true';
    
    const healthStatus: SimpleHealthStatus = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development"
    };
    
    // If agents are requested, add minimal agent status
    if (includeAgents) {
      try {
        // Lazy load pattern detection to test availability
        const { PatternBlindnessDetector } = await import('@/agents/core/pattern-blindness-detector');
        const detector = new PatternBlindnessDetector();
        
        healthStatus.agents = {
          patternDetection: {
            status: "active",
            available: true
          }
        };
        
        // Test basic functionality
        detector.addMessage("Health check test message");
        const analysis = detector.analyzeConversation();
        
      } catch (error) {
        healthStatus.agents = {
          patternDetection: {
            status: "error",
            available: false
          }
        };
        healthStatus.status = "degraded";
      }
    }
    
    const responseTime = Date.now() - startTime;
    
    return NextResponse.json({
      ...healthStatus,
      responseTime: `${responseTime}ms`
    });
    
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
        responseTime: `${Date.now() - startTime}ms`
      },
      { status: 500 }
    );
  }
} 