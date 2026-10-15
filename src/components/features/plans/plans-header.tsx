import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';

export interface PlansHeaderProps {
  title?: string;
  subtitle?: string;
}

export function PlansHeader({
  title = 'Plans',
  subtitle = 'Workout routines and nutrition guides',
}: PlansHeaderProps) {
  return (
    <View className="min-h-12 justify-center">
      <Text className="text-3xl font-black tracking-tight text-foreground">
        {title}
      </Text>
      <Text className="text-sm font-medium text-muted mt-0.5">
        {subtitle}
      </Text>
    </View>
  );
}


