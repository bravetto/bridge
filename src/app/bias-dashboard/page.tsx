/**
 * 🎯 BIASGUARD ANALYTICS DASHBOARD PAGE
 * Comprehensive bias detection analytics and team insights
 */

'use client';

import { useState } from 'react';
import { BiasDetectionDashboard } from '@/components/bias-detection/dashboard-integration';
import { Container } from '@/components/ui/container';

export default function BiasAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  return (
    <div className="min-h-screen bg-gray-900">
      <Container className="py-8">
        <BiasDetectionDashboard
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
      </Container>
    </div>
  );
} 