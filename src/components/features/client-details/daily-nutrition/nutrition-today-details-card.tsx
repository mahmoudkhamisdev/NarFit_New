import React from 'react';
import { Pressable, View } from 'react-native';
import { Flame, Info, PenLine } from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';

export interface NutritionTodayDetailsCardProps {
  totalCalories?: number;
  time?: string;
  note?: string;
  onPressEdit?: () => void;
}

export function NutritionTodayDetailsCard({
  totalCalories = 2150,
  time = '08:30PM',
  note = "Note: Client reported today's total intake.",
  onPressEdit,
}: NutritionTodayDetailsCardProps) {
  return (
    <View className="w-full rounded-2xl bg-card border border-border/50 p-4 gap-3.5">
      {/* Header Row: Title & Edit Tag */}
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-bold text-foreground">
          Today’s details
        </Text>

        <Pressable
          onPress={onPressEdit}
          className="flex-row items-center gap-1.5 px-3 py-1 rounded-xl border border-border-strong bg-card active:opacity-75"
        >
          <Icon as={PenLine} size={12} className="text-foreground" />
          <Text className="text-xs font-semibold text-foreground">
            Edit
          </Text>
        </Pressable>
      </View>

      {/* Body Row: Icon & Nutrition Info */}
      <View className="flex-row items-start gap-3 w-full">
        {/* Left Icon Container */}
        <View className="size-12 rounded-2xl border border-border items-center justify-center bg-card shrink-0">
          <Icon as={Flame} size={22} className="text-brand" />
        </View>

        {/* Right Details */}
        <View className="flex-1">
          {/* Top Row: Total calories & Time */}
          <View className="flex-row items-center justify-between">
            <Text className="text-base text-muted font-normal">
              Total calories
            </Text>
            <Text className="text-sm text-muted font-normal">
              {time}
            </Text>
          </View>

          {/* Large Calorie Value */}
          <Text className="text-2xl font-black text-foreground mt-1">
            {totalCalories}
          </Text>

          {/* Divider */}
          <View className="h-[1px] bg-border/60 my-2.5" />

          {/* Info Note Row */}
          <View className="flex-row items-center gap-1.5">
            <Icon as={Info} size={13} className="text-muted shrink-0" />
            <Text className="text-xs text-muted leading-tight flex-1">
              {note}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default NutritionTodayDetailsCard;
