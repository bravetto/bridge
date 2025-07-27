/**
 * 🎯 BIASGUARD DASHBOARD INTEGRATION
 * Extends existing dashboard system with bias detection metrics and team analytics
 * 
 * Integrates with DivineImpactDashboard and existing monitoring infrastructure
 * Provides comprehensive bias analytics and team collaboration insights
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Brain, TrendingUp, Users, AlertTriangle, Target, Eye, BarChart3 } from 'lucide-react';
import { BiasDetectionResult, BiasPattern, BiasType } from '@/agents/bias-detection/cursor-extension-core';

interface BiasMetrics {
  totalDetections: number;
  criticalDetections: number;
  biasTypeDistribution: Record<BiasType, number>;
  averageBiasScore: number;
  interventionAcceptanceRate: number;
  teamCollaborationScore: number;
  timeSeriesData: BiasTimeSeriesPoint[];
  topPatterns: BiasPatternSummary[];
}

interface BiasTimeSeriesPoint {
  timestamp: Date;
  biasScore: number;
  detectionCount: number;
  interventions: number;
}

interface BiasPatternSummary {
  type: BiasType;
  frequency: number;
  averageConfidence: number;
  lastSeen: Date;
  trend: 'increasing' | 'decreasing' | 'stable';
}

interface TeamMember {
  id: string;
  name: string;
  biasScore: number;
  improvementRate: number;
  strongestBias: BiasType;
  collaborationScore: number;
}

interface BiasDetectionDashboardProps {
  timeRange: '1h' | '24h' | '7d' | '30d';
  teamId?: string;
  onTimeRangeChange: (range: '1h' | '24h' | '7d' | '30d') => void;
}

/**
 * Bias metrics overview cards
 */
function BiasMetricsCards({ metrics }: { metrics: BiasMetrics }) {
  const cards = [
    {
      title: 'Total Detections',
      value: metrics.totalDetections,
      change: '+12%',
      icon: <Eye className="w-5 h-5" />,
      color: 'blue'
    },
    {
      title: 'Critical Issues',
      value: metrics.criticalDetections,
      change: '-8%',
      icon: <AlertTriangle className="w-5 h-5" />,
      color: 'red'
    },
    {
      title: 'Avg Bias Score',
      value: `${Math.round(metrics.averageBiasScore * 100)}%`,
      change: '-15%',
      icon: <BarChart3 className="w-5 h-5" />,
      color: metrics.averageBiasScore > 0.7 ? 'red' : metrics.averageBiasScore > 0.4 ? 'orange' : 'green'
    },
    {
      title: 'Intervention Rate',
      value: `${Math.round(metrics.interventionAcceptanceRate * 100)}%`,
      change: '+5%',
      icon: <Target className="w-5 h-5" />,
      color: 'green'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-400',
    red: 'bg-red-500/20 text-red-400',
    orange: 'bg-orange-500/20 text-orange-400',
    green: 'bg-green-500/20 text-green-400'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg ${colorClasses[card.color as keyof typeof colorClasses]}`}>
              {card.icon}
            </div>
            <span className="text-xs text-green-400">{card.change}</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{card.value}</div>
          <div className="text-sm text-gray-400">{card.title}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * Bias pattern distribution chart
 */
function BiasPatternChart({ distribution }: { distribution: Record<BiasType, number> }) {
  const patterns = Object.entries(distribution)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6);

  const maxValue = Math.max(...patterns.map(([,count]) => count));

  const patternColors: Record<string, string> = {
    'success-declaration': 'bg-red-500',
    'terminal-worship': 'bg-orange-500',
    'pattern-blindness': 'bg-yellow-500',
    'confirmation-bias': 'bg-blue-500',
    'anchoring-bias': 'bg-purple-500',
    'context-amnesia': 'bg-pink-500'
  };

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5" />
        Bias Pattern Distribution
      </h3>
      <div className="space-y-3">
        {patterns.map(([type, count]) => (
          <div key={type} className="flex items-center gap-3">
            <div className="w-24 text-sm text-gray-300 capitalize">
              {type.replace('-', ' ')}
            </div>
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${patternColors[type] || 'bg-gray-500'}`}
                style={{ width: `${(count / maxValue) * 100}%` }}
              />
            </div>
            <div className="w-8 text-sm text-gray-400 text-right">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Team collaboration insights
 */
function TeamCollaborationInsights({ teamMembers }: { teamMembers: TeamMember[] }) {
  const topPerformers = teamMembers
    .sort((a, b) => b.collaborationScore - a.collaborationScore)
    .slice(0, 5);

  const needsAttention = teamMembers
    .filter(member => member.biasScore > 0.7)
    .sort((a, b) => b.biasScore - a.biasScore)
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Top Performers */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          Top Performers
        </h3>
        <div className="space-y-3">
          {topPerformers.map((member, index) => (
            <div key={member.id} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-sm font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{member.name}</div>
                <div className="text-xs text-gray-400">
                  Collaboration: {Math.round(member.collaborationScore * 100)}% 
                  • Improvement: +{Math.round(member.improvementRate * 100)}%
                </div>
              </div>
              <div className="text-sm text-green-400">
                {Math.round(member.biasScore * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Needs Attention */}
      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          Needs Attention
        </h3>
        <div className="space-y-3">
          {needsAttention.length > 0 ? (
            needsAttention.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{member.name}</div>
                  <div className="text-xs text-gray-400 capitalize">
                    Strongest bias: {member.strongestBias.replace('-', ' ')}
                  </div>
                </div>
                <div className="text-sm text-orange-400">
                  {Math.round(member.biasScore * 100)}%
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-4">
              <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <div className="text-sm">All team members performing well!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Bias trends timeline
 */
function BiasTimelineChart({ data }: { data: BiasTimeSeriesPoint[] }) {
  const maxScore = Math.max(...data.map(d => d.biasScore));
  const maxDetections = Math.max(...data.map(d => d.detectionCount));

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5" />
        Bias Trends Over Time
      </h3>
      
      <div className="h-48 flex items-end gap-1">
        {data.map((point, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1">
            {/* Bias Score Bar */}
            <div className="w-full bg-gray-700 rounded-t relative" style={{ height: '120px' }}>
              <div
                className="w-full bg-gradient-to-t from-red-500 to-orange-400 rounded-t absolute bottom-0"
                style={{ height: `${(point.biasScore / maxScore) * 100}%` }}
              />
            </div>
            
            {/* Detection Count Bar */}
            <div className="w-full bg-gray-700 rounded-b relative" style={{ height: '40px' }}>
              <div
                className="w-full bg-blue-500 rounded-b absolute bottom-0"
                style={{ height: `${(point.detectionCount / maxDetections) * 100}%` }}
              />
            </div>
            
            {/* Time Label */}
            <div className="text-xs text-gray-400 mt-1">
              {point.timestamp.getHours()}:00
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-4 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-400 rounded" />
          Bias Score
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded" />
          Detection Count
        </div>
      </div>
    </div>
  );
}

/**
 * Main bias detection dashboard component
 */
export function BiasDetectionDashboard({ 
  timeRange, 
  teamId,
  onTimeRangeChange 
}: BiasDetectionDashboardProps) {
  const [metrics, setMetrics] = useState<BiasMetrics | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data fetching - replace with real API calls
  useEffect(() => {
    const fetchBiasMetrics = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Generate mock data based on timeRange
      const mockMetrics: BiasMetrics = {
        totalDetections: Math.floor(Math.random() * 100) + 50,
        criticalDetections: Math.floor(Math.random() * 10) + 2,
        biasTypeDistribution: {
          'success-declaration': Math.floor(Math.random() * 20) + 10,
          'terminal-worship': Math.floor(Math.random() * 15) + 8,
          'pattern-blindness': Math.floor(Math.random() * 12) + 5,
          'confirmation-bias': Math.floor(Math.random() * 10) + 3,
          'anchoring-bias': Math.floor(Math.random() * 8) + 2,
          'availability-heuristic': Math.floor(Math.random() * 6) + 1,
          'premature-optimization': Math.floor(Math.random() * 5) + 1,
          'context-amnesia': Math.floor(Math.random() * 4) + 1
        },
        averageBiasScore: Math.random() * 0.6 + 0.2,
        interventionAcceptanceRate: Math.random() * 0.4 + 0.6,
        teamCollaborationScore: Math.random() * 0.3 + 0.7,
        timeSeriesData: Array.from({ length: 24 }, (_, i) => ({
          timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
          biasScore: Math.random() * 0.8,
          detectionCount: Math.floor(Math.random() * 10),
          interventions: Math.floor(Math.random() * 5)
        })),
        topPatterns: []
      };

      const mockTeamMembers: TeamMember[] = [
        {
          id: '1',
          name: 'Michael Mataluni',
          biasScore: 0.3,
          improvementRate: 0.15,
          strongestBias: 'success-declaration',
          collaborationScore: 0.9
        },
        {
          id: '2',
          name: 'AI Assistant',
          biasScore: 0.8, // High bias score for demonstration
          improvementRate: -0.05,
          strongestBias: 'terminal-worship',
          collaborationScore: 0.6
        },
        {
          id: '3',
          name: 'Team Lead',
          biasScore: 0.4,
          improvementRate: 0.08,
          strongestBias: 'confirmation-bias',
          collaborationScore: 0.85
        }
      ];

      setMetrics(mockMetrics);
      setTeamMembers(mockTeamMembers);
      setIsLoading(false);
    };

    fetchBiasMetrics();
  }, [timeRange, teamId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400" />
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center text-gray-400 py-8">
        <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <div>No bias detection data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-white">BiasGuard Analytics</h2>
            <p className="text-gray-400">Real-time bias detection and team insights</p>
          </div>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex bg-gray-800 rounded-lg p-1">
          {(['1h', '24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Overview */}
      <BiasMetricsCards metrics={metrics} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BiasPatternChart distribution={metrics.biasTypeDistribution} />
        <BiasTimelineChart data={metrics.timeSeriesData} />
      </div>

      {/* Team Insights */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Team Collaboration Insights
        </h3>
        <TeamCollaborationInsights teamMembers={teamMembers} />
      </div>
    </div>
  );
}

export default BiasDetectionDashboard; 