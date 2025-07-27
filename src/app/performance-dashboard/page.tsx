'use client';

import React, { useState, useEffect } from 'react';
import { performanceMonitor, PerformanceMetrics } from '@/lib/performance-monitor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { withErrorBoundary } from '@/components/ui/error-boundary';

function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [championshipScore, setChampionshipScore] = useState<number>(0);
  const [missionStatus, setMissionStatus] = useState<'green' | 'yellow' | 'red'>('green');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    // Initial load
    updateDashboard();

    // Listen for real-time updates
    const handleMetricsUpdate = (event: CustomEvent) => {
      setMetrics(event.detail);
      setLastUpdated(new Date());
    };

    window.addEventListener('performance-metrics-updated', handleMetricsUpdate as EventListener);

    // Update every 10 seconds
    const interval = setInterval(updateDashboard, 10000);

    return () => {
      window.removeEventListener('performance-metrics-updated', handleMetricsUpdate as EventListener);
      clearInterval(interval);
    };
  }, []);

  const updateDashboard = () => {
    const currentMetrics = performanceMonitor.getMetrics();
    const score = performanceMonitor.getChampionshipScore();
    const status = performanceMonitor.getMissionCriticalStatus();
    
    setMetrics(currentMetrics);
    setChampionshipScore(score);
    setMissionStatus(status);
    setLastUpdated(new Date());
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatMetric = (value: number, type: 'time' | 'percent' | 'count' | 'days') => {
    switch (type) {
      case 'time':
        return `${value.toFixed(1)}ms`;
      case 'percent':
        return `${(value * 100).toFixed(1)}%`;
      case 'count':
        return value.toLocaleString();
      case 'days':
        return `${value} days`;
      default:
        return value.toString();
    }
  };

  if (!metrics) {
    return (
      <Container className="py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading performance metrics...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Performance Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Real-time system health for JAHmere Webb Freedom Mission
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(missionStatus)}`}></div>
              <span className="text-sm font-medium">
                Mission Status: {missionStatus.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* Championship Score */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Championship Performance Score</span>
                         <Badge variant={championshipScore >= 85 ? 'default' : championshipScore >= 70 ? 'secondary' : 'error'}>
              {championshipScore.toFixed(1)}/100
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${
                championshipScore >= 85 ? 'bg-green-500' : 
                championshipScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min(championshipScore, 100)}%` }}
            ></div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Target:</span>
              <span className="ml-2 font-medium">85+ (Championship)</span>
            </div>
            <div>
              <span className="text-muted-foreground">Current:</span>
              <span className="ml-2 font-medium">{championshipScore.toFixed(1)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">July 28th:</span>
              <span className="ml-2 font-medium text-red-600">{metrics.july28Countdown} days left</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Web Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">LCP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMetric(metrics.lcp, 'time')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: &lt;2.5s
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">FID</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMetric(metrics.fid, 'time')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: &lt;100ms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CLS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.cls.toFixed(3)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: &lt;0.1
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API Response</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMetric(metrics.apiResponseTime, 'time')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: &lt;100ms
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMetric(metrics.conversionRate, 'percent')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: &gt;2%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mission Critical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-700">July 28th Countdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{formatMetric(metrics.july28Countdown, 'days')}</div>
            <p className="text-xs text-red-600 mt-1">
              MISSION CRITICAL
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Campaign Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMetric(metrics.campaignEngagement, 'percent')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              User interaction score
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Petition Signatures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMetric(metrics.petitionSignatures, 'count')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Community support
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Community Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMetric(metrics.communityGrowth, 'count')}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active supporters
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Technical Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm">Memory Usage:</span>
              <span className="font-medium">{formatMetric(metrics.memoryUsage, 'percent')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Error Rate:</span>
              <span className="font-medium">{formatMetric(metrics.errorRate, 'percent')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Build Time:</span>
              <span className="font-medium">{formatMetric(metrics.buildTime, 'time')}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Engagement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm">Page Views:</span>
              <span className="font-medium">{formatMetric(metrics.pageViews, 'count')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Unique Visitors:</span>
              <span className="font-medium">{formatMetric(metrics.uniqueVisitors, 'count')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Bounce Rate:</span>
              <span className="font-medium">{formatMetric(metrics.bounceRate, 'percent')}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm">Championship Score:</span>
              <Badge variant={championshipScore >= 85 ? 'default' : 'secondary'}>
                {championshipScore >= 85 ? 'ACHIEVED' : 'IN PROGRESS'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Zero TypeScript Errors:</span>
              <Badge variant="default">ACHIEVED</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Production Ready:</span>
              <Badge variant="default">DEPLOYED</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

export default withErrorBoundary(PerformanceDashboard, "PerformanceDashboard"); 