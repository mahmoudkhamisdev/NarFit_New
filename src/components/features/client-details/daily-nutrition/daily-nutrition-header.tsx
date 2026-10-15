import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';
import { BackButton } from '@/components/shared';

export interface DailyNutritionHeaderProps {
  title?: string;
  onBack?: () => void;
}

export function DailyNutritionHeader({
  title = 'Daily nutrition',
  onBack,
}: DailyNutritionHeaderProps) {
  return (
    <View className="flex-row items-center justify-between w-full">
      <BackButton onPress={onBack} />
      <Text className="flex-1 text-2xl font-bold text-foreground text-left ml-3">
        {title}
      </Text>
    </View>
  );
}

export default DailyNutritionHeader;
