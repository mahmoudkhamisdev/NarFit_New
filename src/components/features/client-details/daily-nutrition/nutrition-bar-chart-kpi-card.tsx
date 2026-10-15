import React from 'react';
import { Pressable, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';
import { BarChart, BarChartItem } from '@/components/shared';

export interface NutritionBarChartItem {
  day: string;
  value: number;
}

const DEFAULT_CHART_DATA: NutritionBarChartItem[] = [
  { day: 'Mon', value: 1950 },
  { day: 'Tue', value: 2100 },
  { day: 'Wed', value: 1750 },
  { day: 'Thu', value: 2000 },
  { day: 'Fri', value: 1650 },
  { day: 'Sat', value: 1800 },
];

export interface NutritionBarChartKpiCardProps {
  title?: string;
  timeframe?: string;
  data?: NutritionBarChartItem[];
  yTicks?: number[];
  onPressTimeframe?: () => void;
}

export function NutritionBarChartKpiCard({
  title = 'Today’s details',
  timeframe = 'Last week',
  data = DEFAULT_CHART_DATA,
  yTicks,
  onPressTimeframe,
}: NutritionBarChartKpiCardProps) {
  const chartData: BarChartItem[] = data.map((d) => ({
    label: d.day,
    value: d.value,
  }));

  return (
    <View className="w-full rounded-2xl bg-card border border-border/50 p-4 gap-3">
      {/* Header Row: Title & Timeframe Tag */}
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-foreground">
          {title}
        </Text>

        <Pressable
          onPress={onPressTimeframe}
          className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-xl border border-border-strong bg-card active:opacity-75"
        >
          <Text className="text-xs font-semibold text-foreground">
            {timeframe}
          </Text>
          <Icon as={ChevronDown} size={12} className="text-muted" />
        </Pressable>
      </View>

      {/* Bar Chart Area using reusable shared BarChart */}
      <View className="w-full pt-2">
        <BarChart
          data={chartData}
          yTicks={yTicks}
          height={140}
        />
      </View>
    </View>
  );
}

export default NutritionBarChartKpiCard;
