import {
  Avatar,
  Card,
  Checkbox,
} from '@/components/ui';
import { NotificationItem } from '@/constants';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export interface NotificationCardProps {
  item: NotificationItem;
  isSelected: boolean;
  isSelectionMode: boolean;
  onPress: (id: string) => void;
  onLongPress: (id: string) => void;
}

export function NotificationCard({
  item,
  isSelected,
  isSelectionMode,
  onPress,
  onLongPress,
}: NotificationCardProps) {
  return (
    <Card
      className={`border transition-all ${
        isSelected
          ? 'border-brand bg-card'
          : item.read
          ? 'border-border-subtle bg-surface/60'
          : 'border-border bg-card'
      }`}
    >
      <Pressable
        onPress={() => onPress(item.id)}
        onLongPress={() => onLongPress(item.id)}
        delayLongPress={220}
        className="flex-row items-start gap-3.5"
      >
        {/* Left slot: Checkbox in selection mode, Avatar otherwise */}
        {isSelectionMode ? (
          <View className="h-10 w-10 items-center justify-center">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onPress(item.id)}
            />
          </View>
        ) : (
          <Avatar
            source={item.avatarSource}
            name={item.clientName}
            color={item.avatarColor}
            size="lg"
          />
        )}

        {/* Content: Title & Time at top, Description below */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between gap-2">
            <Text
              className={`text-sm tracking-tight flex-1 ${
                item.read
                  ? 'font-medium text-foreground-secondary'
                  : 'font-bold text-foreground'
              }`}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text className="text-[11px] font-medium text-muted shrink-0">
              {item.time}
            </Text>
          </View>

          <Text
            className={`mt-1 text-xs leading-relaxed ${
              item.read ? 'text-muted' : 'text-foreground-secondary'
            }`}
          >
            {item.message}
          </Text>
        </View>
      </Pressable>
    </Card>
  );
}
