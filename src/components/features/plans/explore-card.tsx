import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { Calendar, Clock, Dumbbell } from 'lucide-react-native';
import { Icon } from '@/components/ui';
import { Text } from '@/components/ui/text';
import { PLAN_LOCAL_IMAGES, WorkoutPlanItem } from '@/constants/plans';

export interface ExploreCardProps {
  item: WorkoutPlanItem;
  onPress?: (item: WorkoutPlanItem) => void;
  className?: string;
  width?: number | string;
}

export function ExploreCard({
  item,
  onPress,
  className = '',
  width = 280,
}: ExploreCardProps) {
  const [imageError, setImageError] = useState(false);

  // Normalize image source for expo-image (supports local require or remote uri string)
  const resolvedSource = React.useMemo(() => {
    if (!item.imageUrl || imageError) {
      return PLAN_LOCAL_IMAGES.workout1;
    }
    if (typeof item.imageUrl === 'string') {
      return { uri: item.imageUrl };
    }
    return item.imageUrl;
  }, [item.imageUrl, imageError]);

  return (
    <Pressable
      onPress={() => onPress?.(item)}
      accessibilityRole="button"
      accessibilityLabel={`Explore plan ${item.title}`}
      className={`relative h-[162px] rounded-3xl overflow-hidden border border-border-subtle bg-card active:scale-[0.98] ${className}`}
      style={typeof width === 'number' ? { width } : { width: '100%' }}
    >
      {/* Background Image with Explicit Absolute Dimensions */}
      <Image
        source={resolvedSource}
        contentFit="cover"
        transition={200}
        style={StyleSheet.absoluteFill}
        onError={() => setImageError(true)}
      />

      {/* Dark Legibility Overlay Gradient */}
      <View
        pointerEvents="none"
        style={StyleSheet.absoluteFill}
        className="bg-black/45"
      />
      <View
        pointerEvents="none"
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
      />

      {/* Card Content Aligned to Bottom */}
      <View className="absolute inset-x-0 bottom-0 p-3.5 justify-end">
        {/* Plan Title */}
        <Text
          numberOfLines={1}
          className="text-lg font-bold text-white tracking-tight leading-6"
        >
          {item.title}
        </Text>

        {/* Metadata Badges Row (Figma 419:4963) */}
        <View className="mt-2 flex-row items-center flex-wrap gap-x-3 gap-y-1">
          {/* Duration */}
          <View className="flex-row items-center gap-1">
            <Icon as={Calendar} size={14} className="text-zinc-300" />
            <Text className="text-xs font-medium text-zinc-300">
              {item.duration}
            </Text>
          </View>

          {/* Frequency */}
          <View className="flex-row items-center gap-1">
            <Icon as={Clock} size={14} className="text-zinc-300" />
            <Text className="text-xs font-medium text-zinc-300">
              {item.frequency}
            </Text>
          </View>

          {/* Difficulty Level */}
          <View className="flex-row items-center gap-1">
            <Icon as={Dumbbell} size={14} className="text-zinc-300" />
            <Text className="text-xs font-medium text-zinc-300">
              {item.level}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default ExploreCard;
