import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Flame, Target } from 'lucide-react-native';
import { Icon, Slider, Text } from '@/components/ui';

export interface ClientGoalCardProps {
  goalTitle?: string;
  goalDescription?: string;
  goalIcon?: any;
  startWeight?: number;
  targetWeight?: number;
  estWeeks?: number;
  currentWeight?: number;
  onChangeGoal?: () => void;
}

export function ClientGoalCard({
  goalTitle = 'Weight Loss',
  goalDescription = 'Lose fat and improve overall health',
  goalIcon,
  startWeight = 100,
  targetWeight = 70,
  estWeeks = 24,
  currentWeight = 91,
  onChangeGoal,
}: ClientGoalCardProps) {
  // 30% progress initial value matching Figma 309:7914
  const [sliderRatio, setSliderRatio] = useState(0.3);

  // Lost weight calculation: e.g. 100 - 91 = -9kg
  const lostWeight = startWeight - currentWeight;

  return (
    <View className="rounded-2xl bg-surface border border-border/50 p-3.5 gap-3.5 w-full">
      {/* Header Row */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="size-12 rounded-2xl border border-border/70 items-center justify-center bg-card">
            <Icon as={Target} size={22} className="text-foreground" />
          </View>
          <Text className="text-xl font-bold text-foreground">
            Current goal
          </Text>
        </View>

        {/* Change Button */}
        <Pressable
          onPress={onChangeGoal}
          accessibilityRole="button"
          accessibilityLabel="Change current goal"
          className="h-8 px-3 rounded-xl border border-border-strong bg-card-subtle items-center justify-center active:opacity-70"
        >
          <Text className="text-sm font-medium text-foreground">
            Change
          </Text>
        </Pressable>
      </View>

      {/* Goal Highlight Box */}
      <View className="rounded-xl border border-brand bg-card p-3.5 flex-row items-center gap-3">
        <View className="size-12 rounded-2xl bg-brand/10 items-center justify-center">
          <Icon as={goalIcon || Flame} size={24} className="text-brand" />
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-foreground">
            {goalTitle}
          </Text>
          <Text className="text-sm text-muted">
            {goalDescription}
          </Text>
        </View>
      </View>

      {/* 3-Column Metrics Row */}
      <View className="flex-row items-center justify-between rounded-2xl bg-card border border-border/40 p-3">
        {/* Start Weight */}
        <View className="flex-1 items-center">
          <Text className="text-xs text-muted mb-0.5">Start Weight</Text>
          <View className="flex-row items-baseline gap-1">
            <Text className="text-xl font-bold text-foreground">{startWeight}</Text>
            <Text className="text-sm text-foreground">Kg</Text>
          </View>
        </View>

        {/* Divider */}
        <View className="h-8 w-px bg-border-strong" />

        {/* Target Weight */}
        <View className="flex-1 items-center">
          <Text className="text-xs text-muted mb-0.5">Target Weight</Text>
          <View className="flex-row items-baseline gap-1">
            <Text className="text-xl font-bold text-foreground">{targetWeight}</Text>
            <Text className="text-sm text-foreground">Kg</Text>
          </View>
        </View>

        {/* Divider */}
        <View className="h-8 w-px bg-border-strong" />

        {/* Est. Duration */}
        <View className="flex-1 items-center">
          <Text className="text-xs text-muted mb-0.5">Est. Duration</Text>
          <View className="flex-row items-baseline gap-1">
            <Text className="text-xl font-bold text-foreground">{estWeeks}</Text>
            <Text className="text-sm text-foreground">Weeks</Text>
          </View>
        </View>
      </View>

      {/* Slider Area */}
      <View className="w-full pt-1 pb-1">
        <Slider
          value={sliderRatio}
          onValueChange={setSliderRatio}
          min={0}
          max={1}
          step={0.01}
          trackHeight={10}
          thumbSize={14}
          showPercentage={true}
          trackClassName="bg-muted"
          activeTrackClassName="bg-brand"
          thumbClassName="bg-foreground"
        />

        {/* Min / Delta / Max Weight Labels */}
        <View className="flex-row items-center justify-between pt-1 px-0.5">
          <Text className="text-sm text-foreground">
            {startWeight} kg
          </Text>
          <Text className="text-sm font-bold text-brand">
            {lostWeight > 0 ? `-${lostWeight}k` : `${lostWeight}k`}
          </Text>
          <Text className="text-sm text-foreground">
            80 kg
          </Text>
        </View>
      </View>
    </View>
  );
}

export default ClientGoalCard;
