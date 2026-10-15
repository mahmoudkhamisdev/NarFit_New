import { Button, Icon } from '@/components/ui';
import { SlidersHorizontal } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';

export interface ClientsHeaderProps {
  isSelectionMode?: boolean;
  isAllSelected?: boolean;
  onBackOrCancel?: () => void;
  onToggleSelectAll?: () => void;
  onOpenFilterSheet?: () => void;
}

export function ClientsHeader({
  isSelectionMode = false,
  onOpenFilterSheet,
}: ClientsHeaderProps) {
  return (
    <View className="flex-row items-center justify-between min-h-[48px]">
      {/* Left: Title (prominent on the left) */}
      <View>
        <Text className="text-xs font-semibold uppercase tracking-wider text-muted">
          Details & Statistics
        </Text>
        <Text className="text-3xl font-black tracking-tight text-foreground">
          Clients
        </Text>
      </View>

      {/* Right slot: Filter Button */}
      {!isSelectionMode && (
        <Button
          variant="outline"
          size="sm"
          className="h-12 w-12 px-0 rounded-2xl border-border-subtle bg-card"
          leftIcon={<Icon as={SlidersHorizontal} size={19} className="text-foreground" />}
          onPress={onOpenFilterSheet}
          accessibilityLabel="Open filter options"
        />
      )}
    </View>
  );
}
