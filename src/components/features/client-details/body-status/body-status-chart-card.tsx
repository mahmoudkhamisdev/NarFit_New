import React from 'react';
import { Pressable, View } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';
import { ProgressChart } from '@/components/shared';

export interface BodyStatusChartCardProps {
  title?: string;
  selectedRange?: string;
  onPressRange?: () => void;
}

export function BodyStatusChartCard({
  title = 'Weight progress',
  selectedRange = 'Last 12 weeks',
  onPressRange,
}: BodyStatusChartCardProps) {
  return (
    <View className="bg-card rounded-xl p-3.5 border border-border/50 gap-3.5 w-full">
      {/* Header Row */}
      <View className="flex-row items-center justify-between w-full gap-1">
        <Text className="text-xl font-bold text-foreground w-1/2" numberOfLines={1}>
          {title}
        </Text>

        <Pressable
          onPress={onPressRange}
          className="bg-card border border-border-strong rounded-xl px-2.5 py-1.5 flex-row items-center gap-1.5 active:opacity-75"
        >
          <Text className="text-xs font-medium text-foreground">
            {selectedRange}
          </Text>
          <Icon as={ChevronDown} size={14} className="text-foreground" />
        </Pressable>
      </View>

      {/* Reusable Chart */}
      <ProgressChart />
    </View>
  );
}
