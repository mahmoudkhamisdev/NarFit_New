import React from 'react';
import { View } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';

export interface SummaryCardItem {
  id: string;
  label: string;
  value: string;
  icon: typeof Calendar;
  progressPercent?: number;
}

export interface BodyStatusSummaryRowProps {
  totalChange?: string;
  goalProgressPercent?: number;
  trackingDuration?: string;
}

export function BodyStatusSummaryRow({
  totalChange = '-9 Kg',
  goalProgressPercent = 30,
  trackingDuration = '12 weeks',
}: BodyStatusSummaryRowProps) {
  const cards: SummaryCardItem[] = [
    {
      id: 'totalChange',
      label: 'Total change',
      value: totalChange,
      icon: Calendar,
    },
    {
      id: 'goalProgress',
      label: 'Goal progress',
      value: `${goalProgressPercent}%`,
      icon: MapPin,
      progressPercent: goalProgressPercent,
    },
    {
      id: 'tracking',
      label: 'Tracking',
      value: trackingDuration,
      icon: Calendar,
    },
  ];

  return (
    <View className="flex-row items-stretch gap-3 w-full">
      {cards.map((item) => (
        <View
          key={item.id}
          className="flex-1 bg-card rounded-xl p-3 items-center justify-between border border-border/50 min-h-[105px]"
        >
          {/* Top Icon */}
          <Icon as={item.icon} size={22} className="text-foreground-secondary" />

          {/* Label + Value */}
          <View className="items-center w-full gap-1">
            <Text className="text-xs text-foreground-secondary text-center">
              {item.label}
            </Text>
            <Text className="text-base font-bold text-foreground text-center">
              {item.value}
            </Text>

            {/* Mini Progress Bar for Goal Progress */}
            {item.progressPercent !== undefined ? (
              <View className="w-full h-2 rounded-full bg-border-strong overflow-hidden mt-1">
                <View
                  className="h-full rounded-full bg-brand"
                  style={{ width: `${Math.min(100, Math.max(0, item.progressPercent))}%` }}
                />
              </View>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}
