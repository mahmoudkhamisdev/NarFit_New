import React from 'react';
import { View } from 'react-native';
import { BarChart2, Flame, Target } from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  sub: string;
  deficit?: string;
  icon: typeof Flame;
}

export interface BodyStatusMetricsRowProps {
  bmr?: string;
  tdee?: string;
  dailyTarget?: string;
  dailyTargetDeficit?: string;
  bodyFat?: string;
  bodyFatSub?: string;
  bodyFatDeficit?: string;
}

export function BodyStatusMetricsRow({
  bmr = '1,780',
  tdee = '2,650',
  dailyTarget = '2,150',
  dailyTargetDeficit = '-500 deficit',
  bodyFat = 'ـــــــــ',
  bodyFatSub = 'Not added',
  bodyFatDeficit = '-500 deficit',
}: BodyStatusMetricsRowProps) {
  const metrics: MetricItem[] = [
    {
      id: 'bmr',
      label: 'BMR',
      value: bmr,
      sub: 'Kcal / day',
      icon: Flame,
    },
    {
      id: 'tdee',
      label: 'TDEE',
      value: tdee,
      sub: 'Kcal / day',
      icon: BarChart2,
    },
    {
      id: 'dailyTarget',
      label: 'Daily target',
      value: dailyTarget,
      sub: 'Kcal / day',
      deficit: dailyTargetDeficit,
      icon: Target,
    },
    {
      id: 'bodyFat',
      label: 'Body fat',
      value: bodyFat,
      sub: bodyFatSub,
      deficit: bodyFatDeficit,
      icon: Target,
    },
  ];

  return (
    <View className="flex-row items-stretch gap-2.5 w-full">
      {metrics.map((item) => (
        <View
          key={item.id}
          className="flex-1 bg-card rounded-xl p-2.5 items-center justify-between border border-border/50 min-h-[148px]"
        >
          {/* Top Icon */}
          <Icon as={item.icon} size={22} className="text-foreground-secondary mt-1" />

          {/* Center Info */}
          <View className="items-center w-full my-1">
            <Text className="text-xs text-foreground-secondary font-normal mb-1 text-center">
              {item.label}
            </Text>
            <Text className="text-lg font-bold text-foreground text-center">
              {item.value}
            </Text>
            <Text className="text-xs text-foreground-secondary text-center">
              {item.sub}
            </Text>
          </View>

          {/* Bottom Deficit / Extra */}
          {item.deficit ? (
            <Text className="text-[10px] text-foreground-secondary text-center">
              {item.deficit}
            </Text>
          ) : (
            <View className="h-3" />
          )}
        </View>
      ))}
    </View>
  );
}
