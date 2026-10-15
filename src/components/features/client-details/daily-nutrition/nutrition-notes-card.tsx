import React from 'react';
import { Pressable, View } from 'react-native';
import { ChevronRight, FileText } from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';

export interface NutritionNotesCardProps {
  title?: string;
  description?: string;
  onPress?: () => void;
}

export function NutritionNotesCard({
  title = 'Nutrition Notes',
  description = "General notes about the client's nutrition, adherence or any observations.",
  onPress,
}: NutritionNotesCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full rounded-2xl bg-card border border-border/50 p-4 flex-row items-center justify-between active:opacity-75"
    >
      {/* Left Icon and Text */}
      <View className="flex-row items-center gap-3.5 flex-1 pr-2">
        <View className="size-12 rounded-2xl border border-border items-center justify-center bg-card shrink-0">
          <Icon as={FileText} size={22} className="text-brand" />
        </View>

        <View className="flex-1">
          <Text className="text-base font-bold text-foreground">
            {title}
          </Text>
          <Text className="text-xs text-muted leading-snug mt-0.5">
            {description}
          </Text>
        </View>
      </View>

      {/* Right Chevron */}
      <Icon as={ChevronRight} size={20} className="text-muted shrink-0" />
    </Pressable>
  );
}

export default NutritionNotesCard;
