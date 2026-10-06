import {
  Avatar,
  Card,
  Checkbox,
  Icon,
  Tag,
} from '@/components/ui';
import { ClientItem } from '@/constants';
import { Clock } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export interface ClientCardProps {
  item: ClientItem;
  isSelected: boolean;
  isSelectionMode: boolean;
  onPress: (id: string) => void;
  onLongPress: (id: string) => void;
}

export function ClientCard({
  item,
  isSelected,
  isSelectionMode,
  onPress,
  onLongPress,
}: ClientCardProps) {
  return (
    <Card
      className={`border transition-all ${
        isSelected
          ? 'border-brand bg-card'
          : 'border-border-subtle bg-surface'
      }`}
    >
      <Pressable
        onPress={() => onPress(item.id)}
        onLongPress={() => onLongPress(item.id)}
        delayLongPress={220}
        className="gap-3.5"
      >
        {/* Top Header: Avatar/Checkbox, Name & Program, Status Tag */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1 pr-2">
            {/* Left Slot: Checkbox in selection mode, Avatar otherwise */}
            {isSelectionMode ? (
              <View className="h-11 w-11 items-center justify-center">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onPress(item.id)}
                />
              </View>
            ) : (
              <Avatar
                source={item.avatarSource}
                name={item.name}
                color={item.avatarColor}
                size="xl"
              />
            )}

            <View className="flex-1">
              <Text className="text-base font-bold text-foreground" numberOfLines={1}>
                {item.name}
              </Text>
              <Text className="text-xs text-muted mt-0.5" numberOfLines={1}>
                {item.program}
              </Text>
            </View>
          </View>

          {/* Status Tag */}
          <Tag
            label={item.status}
            variant={item.statusVariant}
            size="sm"
          />
        </View>

        {/* Divider & Bottom Meta (Time & Phase) */}
        <View className="flex-row items-center justify-between pt-3 border-t border-border-subtle">
          <View className="flex-row items-center gap-1.5">
            <Icon as={Clock} size={13} className="text-muted" />
            <Text className="text-xs font-semibold text-foreground">
              {item.time}
            </Text>
          </View>

          <Text className="text-[11px] font-medium text-muted">
            {item.duration}
          </Text>
        </View>
      </Pressable>
    </Card>
  );
}
