import React from 'react';
import { Pressable, View } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { Icon } from '@/components/ui';
import { Text } from '@/components/ui/text';

export interface PlansSectionHeaderProps {
  title: string;
  onSeeAllPress?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export function PlansSectionHeader({
  title,
  onSeeAllPress,
  rightAction,
  className = '',
}: PlansSectionHeaderProps) {
  return (
    <View
      className={`flex-row items-center justify-between min-h-[32px] ${className}`}
    >
      {/* Left: Section Title */}
      <Text className="text-xl font-bold tracking-tight text-foreground">
        {title}
      </Text>

      {/* Right: Custom Action or See All */}
      <View className="flex-row items-center gap-3">
        {rightAction}

        {onSeeAllPress && (
          <Pressable
            onPress={onSeeAllPress}
            accessibilityRole="button"
            accessibilityLabel={`See all ${title}`}
            className="flex-row items-center gap-1.5 active:opacity-70 py-1"
          >
            <Text className="text-sm font-semibold text-foreground">
              See All
            </Text>
            <Icon as={ArrowRight} size={16} className="text-foreground" />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export default PlansSectionHeader;
