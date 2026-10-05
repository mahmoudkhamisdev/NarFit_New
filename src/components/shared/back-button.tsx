import { Icon } from '@/components/ui';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, PressableProps, View } from 'react-native';

export interface BackButtonProps extends Omit<PressableProps, 'children'> {
  onPress?: () => void;
  className?: string;
  iconSize?: number;
  wrapperClassName?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  className = '',
  iconSize = 22,
  wrapperClassName = '',
  ...props
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <View className={`flex-row items-center ${wrapperClassName}`}>
      <Pressable
        onPress={handlePress}
        className={`w-12 h-12 rounded-2xl bg-card border border-border/80 items-center justify-center active:opacity-70 shadow-sm ${className}`}
        accessibilityRole="button"
        accessibilityLabel="Go back"
        hitSlop={8}
        {...props}
      >
        <Icon as={ArrowLeft} size={iconSize} className="text-foreground" />
      </Pressable>
    </View>
  );
};

export default BackButton;
