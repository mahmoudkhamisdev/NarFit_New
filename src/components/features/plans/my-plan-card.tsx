import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import { Calendar, Clock, Dumbbell } from 'lucide-react-native';
import { Icon } from '@/components/ui';
import { Text } from '@/components/ui/text';
import { PLAN_LOCAL_IMAGES, WorkoutPlanItem } from '@/constants/plans';

export interface MyPlanCardProps {
  item: WorkoutPlanItem;
  onPress?: (item: WorkoutPlanItem) => void;
  className?: string;
}

export function MyPlanCard({ item, onPress, className = '' }: MyPlanCardProps) {
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
      accessibilityLabel={`View plan ${item.title}`}
      className={`flex-row items-center gap-3.5 p-2.5 rounded-3xl border border-border-subtle bg-card active:opacity-85 ${className}`}
    >
      {/* Thumbnail Left with explicit layout */}
      <View className="w-24 h-28 rounded-2xl overflow-hidden bg-surface border border-border-subtle items-center justify-center">
        <Image
          source={resolvedSource}
          contentFit="cover"
          transition={200}
          style={{ width: '100%', height: '100%' }}
          onError={() => setImageError(true)}
        />
      </View>

      {/* Info Column Right */}
      <View className="flex-1 justify-between py-0.5 min-h-[96px]">
        {/* Title and Subtitle */}
        <View>
          <Text
            numberOfLines={1}
            className="text-base font-bold text-foreground tracking-tight"
          >
            {item.title}
          </Text>
          <Text className="text-xs font-medium text-muted mt-0.5">
            {item.category}
          </Text>
        </View>

        {/* Metadata Details */}
        <View className="mt-2 flex-row items-center flex-wrap gap-x-3 gap-y-1">
          {/* Duration */}
          <View className="flex-row items-center gap-1">
            <Icon as={Calendar} size={14} className="text-muted" />
            <Text className="text-xs font-medium text-muted">
              {item.duration}
            </Text>
          </View>

          {/* Frequency */}
          <View className="flex-row items-center gap-1">
            <Icon as={Clock} size={14} className="text-muted" />
            <Text className="text-xs font-medium text-muted">
              {item.frequency}
            </Text>
          </View>

          {/* Level */}
          <View className="flex-row items-center gap-1">
            <Icon as={Dumbbell} size={14} className="text-muted" />
            <Text className="text-xs font-medium text-muted">
              {item.level}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default MyPlanCard;
