import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';
import { BackButton } from '@/components/shared';

export interface AddMeasurementHeaderProps {
  title?: string;
  onBack?: () => void;
}

export function AddMeasurementHeader({
  title = 'Add measurement',
  onBack,
}: AddMeasurementHeaderProps) {
  return (
    <View className="flex-row items-center justify-between w-full">
      <BackButton onPress={onBack} />
      <Text className="flex-1 text-2xl font-bold text-foreground text-left ml-3">
        {title}
      </Text>
      <View className="w-12 h-12" />
    </View>
  );
}
