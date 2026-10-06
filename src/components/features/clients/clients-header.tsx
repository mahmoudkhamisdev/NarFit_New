import { BackButton } from '@/components/shared';
import { Checkbox } from '@/components/ui';
import React from 'react';
import { Text, View } from 'react-native';

export interface ClientsHeaderProps {
  isSelectionMode: boolean;
  isAllSelected: boolean;
  onBackOrCancel?: () => void;
  onToggleSelectAll: () => void;
}

export function ClientsHeader({
  isSelectionMode,
  isAllSelected,
  onBackOrCancel,
  onToggleSelectAll,
}: ClientsHeaderProps) {
  return (
    <View className="relative flex-row items-center justify-between min-h-[48px]">
      {/* Left slot: Back Button */}
      <BackButton onPress={onBackOrCancel} />

      {/* Center: Title */}
      <Text className="text-2xl font-bold tracking-tight text-foreground text-center">
        Clients
      </Text>

      {/* Right slot: Select all Checkbox in selection mode, or symmetrical spacer */}
      {isSelectionMode ? (
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={onToggleSelectAll}
          boxClassName="size-7"
        />
      ) : (
        <View className="h-7 w-7" />
      )}
    </View>
  );
}
