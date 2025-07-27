import { NextRequest, NextResponse } from "next/server";

/**
 * 🏥 STANDALONE HEALTH CHECK
 * No agent dependencies - pure health monitoring
 */

export async function GET(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const url = new URL(request.url);
    const includeAgents = url.searchParams.get('agents') === 'true';
    
    const healthStatus = {
      status: "healthy" as const,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development",
      server: {
        port: 1437,
        framework: "Next.js 15.4.2",
        turbopack: process.env.NODE_ENV === 'development'
      }
    };
    
    // If agents are requested, add basic status without importing
    if (includeAgents) {
      const agentStatus = {
        patternDetection: {
          status: "available",
          description: "ARIA Protocol ready for activation",
          features: [
            "Neural howlround detection",
            "Context amnesia prevention", 
            "Anchoring bias alerts",
            "Vibe coding entropy monitoring"
          ]
        },
        orchestrator: {
          status: "ready",
          description: "Agent orchestrator available for on-demand activation"
        }
      };
      
      return NextResponse.json({
        ...healthStatus,
        agents: agentStatus,
        responseTime: `${Date.now() - startTime}ms`,
        message: "✅ System healthy - Pattern detection ready for activation"
      });
    }
    
    return NextResponse.json({
      ...healthStatus,
      responseTime: `${Date.now() - startTime}ms`,
      message: "✅ System healthy"
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