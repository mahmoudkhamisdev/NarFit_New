import { Button, Icon } from '@/components/ui';
import { BellOff, RotateCcw } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

export interface NotificationsEmptyStateProps {
  filter: 'all' | 'unread';
  hasNoNotifications: boolean;
  onRestoreDemoData: () => void;
}

export function NotificationsEmptyState({
  filter,
  hasNoNotifications,
  onRestoreDemoData,
}: NotificationsEmptyStateProps) {
  return (
    <View className="items-center justify-center py-20 px-6">
      <View className="h-20 w-20 items-center justify-center rounded-full border border-border-subtle bg-card-subtle mb-4">
        <Icon as={BellOff} size={36} className="text-muted" />
      </View>
      <Text className="text-lg font-bold text-foreground text-center">
        No notifications found
      </Text>
      <Text className="mt-1 text-sm text-muted text-center max-w-[260px]">
        {filter === 'unread'
          ? 'You have caught up with all notifications.'
          : 'No notifications available at this moment.'}
      </Text>

      {hasNoNotifications && (
        <Button
          variant="outline"
          size="sm"
          title="Restore Demo Data"
          leftIcon={<Icon as={RotateCcw} size={16} className="text-foreground" />}
          className="mt-6"
          onPress={onRestoreDemoData}
        />
      )}
    </View>
  );
}
