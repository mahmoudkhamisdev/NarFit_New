import React from 'react';
import { View } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';

export function AddMeasurementTipCard() {
  return (
    <View className="bg-card rounded-xl p-4 border border-border/50 flex-row items-center gap-3.5 w-full">
      <View className="size-12 rounded-2xl border border-border/70 items-center justify-center bg-surface shrink-0">
        <Icon as={Lightbulb} size={22} className="text-brand" />
      </View>
      <Text className="text-xs text-foreground-secondary leading-relaxed flex-1">
        You can always adjust this later in the client profile based on progress and results.
      </Text>
    </View>
  );
}
