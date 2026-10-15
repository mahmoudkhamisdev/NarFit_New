import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';
import { CircularProgress } from '@/components/shared';

export interface NutritionTargetKpiCardProps {
  consumed?: number;
  dailyTarget?: number;
  percentage?: number;
}

export function NutritionTargetKpiCard({
  consumed = 1800,
  dailyTarget = 2150,
  percentage,
}: NutritionTargetKpiCardProps) {
  const calculatedPercentage =
    percentage ?? Math.round((consumed / dailyTarget) * 100);

  return (
    <View className="w-full rounded-2xl bg-card border border-border/50 p-4 flex-row items-center justify-between">
      {/* Left Column: Consumed & Daily Target Metrics */}
      <View className="flex-1 justify-between py-1">
        {/* Consumed */}
        <View>
          <Text className="text-3xl font-black text-foreground tracking-tight">
            {consumed}
          </Text>
          <Text className="text-sm font-normal text-muted mt-0.5">
            Consumed
          </Text>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-border-subtle my-3 w-[90%]" />

        {/* Daily Target */}
        <View>
          <Text className="text-3xl font-black text-foreground tracking-tight">
            {dailyTarget}
          </Text>
          <Text className="text-sm font-normal text-muted mt-0.5">
            Daily target
          </Text>
        </View>
      </View>

      {/* Middle Vertical Divider */}
      <View className="w-[1px] bg-border/40 self-stretch my-1 mx-2" />

      {/* Right Column: Circular Progress Chart */}
      <View className="items-center justify-center pl-2">
        <CircularProgress
          percentage={calculatedPercentage}
          size={138}
          strokeWidth={13}
          startAngle={0}
          centerLabel={`${calculatedPercentage}%`}
          centerSublabel="of target"
        />
      </View>
    </View>
  );
}

export default NutritionTargetKpiCard;
