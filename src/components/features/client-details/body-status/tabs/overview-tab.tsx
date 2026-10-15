import React from 'react';
import { View } from 'react-native';
import { BodyStatusMetricsRow } from '../body-status-metrics-row';
import { BodyStatusChartCard } from '../body-status-chart-card';
import { BodyStatusSummaryRow } from '../body-status-summary-row';
import { BodyStatusMeasurementsCard } from '../body-status-measurements-card';

export function OverviewTab() {
  return (
    <View className="gap-3.5 w-full">
      {/* Top 4 Metrics (BMR, TDEE, Daily target, Body fat) */}
      <BodyStatusMetricsRow />

      {/* Weight Progress Chart Card */}
      <BodyStatusChartCard />

      {/* 3 Summary Cards (Total change, Goal progress, Tracking) */}
      <BodyStatusSummaryRow />

      {/* Detailed Weight Progress & Measurements List */}
      <BodyStatusMeasurementsCard />
    </View>
  );
}
