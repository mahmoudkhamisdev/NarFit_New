import { Avatar, AvatarProps, Icon } from '@/components/ui';
import { router } from 'expo-router';
import { Bell } from 'lucide-react-native';
import React from 'react';
import {
  Pressable,
  View,
} from 'react-native';
import { Text } from '@/components/ui/text';

export interface DashboardHeaderProps {
  coachName?: string;
  greeting?: string;
  avatarSource?: AvatarProps['source'];
  hasUnreadNotifications?: boolean;
  onProfilePress?: () => void;
  onNotificationsPress?: () => void;
  className?: string;
}

export function DashboardHeader({
  coachName = 'Coach Alex',
  greeting = 'Good morning,',
  avatarSource = require('@/assets/images/avatars/avatar-2.png'),
  hasUnreadNotifications = true,
  onProfilePress,
  onNotificationsPress,
  className = '',
}: DashboardHeaderProps) {
  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      router.push('/onboarding/profile');
    }
  };

  const handleNotificationsPress = () => {
    if (onNotificationsPress) {
      onNotificationsPress();
    } else {
      router.push('/notifications' as any);
    }
  };

  return (
    <View className={`mb-6 flex-row items-center justify-between ${className}`}>
      {/* Profile & Greeting Trigger */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="View profile"
        onPress={handleProfilePress}
        className="flex-row items-center gap-3 active:opacity-80"
      >
        <Avatar
          source={avatarSource}
          name={coachName}
          color="primary"
          size="xxl"
        />
        <View>
          <Text className="text-xs font-semibold text-muted uppercase tracking-wider">
            {greeting}
          </Text>
          <Text className="text-2xl font-black tracking-tight text-foreground">
            {coachName}
          </Text>
        </View>
      </Pressable>

      {/* Notifications Button */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        onPress={handleNotificationsPress}
        className="relative h-11 w-11 items-center justify-center rounded-full border border-border bg-card active:opacity-75"
      >
        <Icon as={Bell} size={20} className="text-foreground" />
        {hasUnreadNotifications && (
          <View className="absolute top-2 right-2 h-2 w-2 rounded-full bg-brand" />
        )}
      </Pressable>
    </View>
  );
}
