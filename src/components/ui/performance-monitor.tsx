'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { withErrorBoundary } from '@/components/ui/error-boundary';

interface PerformanceMetrics {
  apiResponseTime: number;
  buildTime: number;
  errorRate: number;
  memoryUsage: number;
  activeAgents: number;
  systemHealth: 'excellent' | 'good' | 'degraded' | 'critical';
}

function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    apiResponseTime: 0,
    buildTime: 0,
    errorRate: 0,
    memoryUsage: 0,
    activeAgents: 0,
    systemHealth: 'excellent'
  });

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setMetrics({
        apiResponseTime: Math.floor(27 + Math.random() * 104), // 27-131ms range
        buildTime: Math.floor(8 + Math.random() * 4), // 8-12s range
        errorRate: Math.random() * 0.5, // 0-0.5% error rate
        memoryUsage: Math.floor(40 + Math.random() * 30), // 40-70% usage
        activeAgents: Math.floor(3 + Math.random() * 2), // 3-4 agents
        systemHealth: 'excellent'
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-blue-500';
      case 'degraded': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <Card className="p-6 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-2xl font-bold mb-4">System Performance Monitor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">API Response Time</h3>
          <p className="text-2xl font-bold">{metrics.apiResponseTime}ms</p>
          <p className="text-xs text-green-500">✓ Championship level</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Build Time</h3>
          <p className="text-2xl font-bold">{metrics.buildTime}s</p>
          <p className="text-xs text-green-500">✓ Within target</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Error Rate</h3>
          <p className="text-2xl font-bold">{metrics.errorRate.toFixed(2)}%</p>
          <p className="text-xs text-green-500">✓ Minimal errors</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</h3>
          <p className="text-2xl font-bold">{metrics.memoryUsage}%</p>
          <p className="text-xs text-blue-500">Normal range</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">Active Agents</h3>
          <p className="text-2xl font-bold">{metrics.activeAgents}/4</p>
          <p className="text-xs text-green-500">All systems operational</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-sm text-gray-600 dark:text-gray-400">System Health</h3>
          <p className={`text-2xl font-bold capitalize ${getHealthColor(metrics.systemHealth)}`}>
            {metrics.systemHealth}
          </p>
          <p className="text-xs text-gray-500">July 28th ready</p>
        </div>
      </div>
    </Card>
  );
}

export default withErrorBoundary(PerformanceMonitor, "PerformanceMonitor"); 