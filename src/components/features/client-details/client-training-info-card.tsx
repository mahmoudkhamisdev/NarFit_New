import React from 'react';
import { Pressable, View } from 'react-native';
import {
  Activity,
  Calendar,
  ChevronRight,
  Dumbbell,
  MapPin,
} from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';

export interface ClientTrainingInfoCardProps {
  daysPerWeek?: string;
  location?: string;
  activityLevel?: string;
  onPressHeader?: () => void;
}

export function ClientTrainingInfoCard({
  daysPerWeek = '4 days',
  location = 'Gym',
  activityLevel = 'Modetate',
  onPressHeader,
}: ClientTrainingInfoCardProps) {
  const metrics = [
    {
      id: 'daysPerWeek',
      label: 'Days per week',
      value: daysPerWeek,
      icon: Calendar,
    },
    {
      id: 'location',
      label: 'Location',
      value: location,
      icon: MapPin,
    },
    {
      id: 'activityLevel',
      label: 'Activity level',
      value: activityLevel,
      icon: Activity,
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
            <Icon as={Dumbbell} size={22} className="text-foreground" />
          </View>
          <Text className="text-xl font-bold text-foreground">
            Training Info
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
              <Text className="text-base font-bold text-foreground">{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export default ClientTrainingInfoCard;
