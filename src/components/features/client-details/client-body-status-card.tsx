import React from 'react';
import { Pressable, View } from 'react-native';
import {
  ArrowDown,
  BarChart2,
  ChevronRight,
  Dumbbell,
  Ruler,
  Scale,
} from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';

export interface ClientBodyStatusCardProps {
  weight?: string;
  weightDelta?: string;
  height?: string;
  bmi?: string;
  bmiDelta?: string;
  bodyFat?: string;
  onPressHeader?: () => void;
}

export function ClientBodyStatusCard({
  weight = '91 Kg',
  weightDelta = '3+',
  height = '178 cm',
  bmi = '28.7',
  bmiDelta = '3+',
  bodyFat = '--',
  onPressHeader,
}: ClientBodyStatusCardProps) {
  const metrics = [
    {
      id: 'weight',
      label: 'Weight',
      value: weight,
      delta: weightDelta,
      icon: Dumbbell,
      valueClassName: 'text-base font-bold text-foreground',
    },
    {
      id: 'height',
      label: 'Heigh',
      value: height,
      icon: Ruler,
      valueClassName: 'text-sm font-bold text-foreground',
    },
    {
      id: 'bmi',
      label: 'BMI',
      value: bmi,
      delta: bmiDelta,
      icon: BarChart2,
      valueClassName: 'text-base font-bold text-foreground',
    },
    {
      id: 'bodyFat',
      label: 'Body fat',
      value: bodyFat,
      extra: 'Not added',
      icon: Scale,
      valueClassName: 'text-base font-bold text-foreground',
    },
  ];

  return (
    <View className="rounded-2xl bg-surface border border-border/50 p-3.5 gap-3.5 w-full">
      {/* Header */}
      <Pressable
        onPress={onPressHeader}
        className="flex-row items-center justify-between active:opacity-75"
      >
        <View className="flex-row items-center gap-3">
          <View className="size-12 rounded-2xl border border-border/70 items-center justify-center bg-card">
            <Icon as={Scale} size={22} className="text-foreground" />
          </View>
          <Text className="text-xl font-bold text-foreground">
            Body status
          </Text>
        </View>
        <Icon as={ChevronRight} size={20} className="text-muted" />
      </Pressable>

      {/* 4 Mini Metrics Cards Row */}
      <View className="flex-row items-stretch gap-2.5 w-full">
        {metrics.map((item) => (
          <View
            key={item.id}
            className="flex-1 rounded-xl border border-border-strong bg-card py-2.5 px-1.5 items-center justify-between h-fit"
          >
            <Icon as={item.icon} size={20} className="text-muted" />
            <View className="items-center">
              <Text className="text-xs text-muted mb-0.5">{item.label}</Text>
              <Text className={item.valueClassName}>{item.value}</Text>
            </View>
            {item.delta ? (
              <View className="flex-row items-center gap-0.5">
                <Icon as={ArrowDown} size={13} className="text-brand" />
                <Text className="text-xs font-bold text-brand">{item.delta}</Text>
              </View>
            ) : item.extra ? (
              <Text className="text-[10px] text-muted text-center">{item.extra}</Text>
            ) : null}
          </View>
        ))}
      </View>
    </View>
  );
}

export default ClientBodyStatusCard;
