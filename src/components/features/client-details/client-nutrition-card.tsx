import React from 'react';
import { Pressable, View } from 'react-native';
import {
  Apple,
  BarChart2,
  ChevronRight,
  Flame,
  Target,
} from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';

export interface ClientNutritionCardProps {
  bmr?: string;
  tdee?: string;
  dailyTarget?: string;
  deficit?: string;
  onPressHeader?: () => void;
}

export function ClientNutritionCard({
  bmr = '1,780',
  tdee = '2,650',
  dailyTarget = '2,150',
  deficit = '-500 deficit',
  onPressHeader,
}: ClientNutritionCardProps) {
  const metrics = [
    {
      id: 'bmr',
      label: 'BMR',
      value: bmr,
      unit: 'Kcal / day',
      icon: Flame,
    },
    {
      id: 'tdee',
      label: 'TDEE',
      value: tdee,
      unit: 'Kcal / day',
      icon: BarChart2,
    },
    {
      id: 'dailyTarget',
      label: 'Daily target',
      value: dailyTarget,
      unit: 'Kcal / day',
      icon: Target,
      extra: deficit,
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
            <Icon as={Apple} size={22} className="text-foreground" />
          </View>
          <Text className="text-xl font-bold text-foreground">
            Daily nutrition target
          </Text>
        </View>
        <Icon as={ChevronRight} size={20} className="text-muted" />
      </Pressable>

      {/* 3 Mini Metrics Cards Row */}
      <View className="flex-row items-stretch gap-2.5 w-full">
        {metrics.map((item) => (
          <View
            key={item.id}
            className="flex-1 rounded-xl border border-border-strong bg-card py-2.5 px-2 items-center justify-between h-fit"
          >
            <Icon as={item.icon} size={20} className="text-muted" />
            <View className="items-center">
              <Text className="text-xs text-muted mb-0.5">{item.label}</Text>
              <Text className="text-lg font-bold text-foreground">{item.value}</Text>
              {item.unit && <Text className="text-[11px] text-muted">{item.unit}</Text>}
            </View>
            {item.extra && (
              <Text className="text-[10px] text-muted text-center">{item.extra}</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

export default ClientNutritionCard;
