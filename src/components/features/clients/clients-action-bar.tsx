import { Button, Icon } from '@/components/ui';
import { Trash2, X } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { FadeSlideIn } from 'react-native-animation-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ClientsActionBarProps {
  visible: boolean;
  selectedCount: number;
  totalVisibleCount: number;
  onCancel: () => void;
  onDeleteSelected: () => void;
}

export function ClientsActionBar({
  visible,
  selectedCount,
  totalVisibleCount,
  onCancel,
  onDeleteSelected,
}: ClientsActionBarProps) {
  const insets = useSafeAreaInsets();

  if (!visible) return null;

  return (
    <View
      pointerEvents="box-none"
      className="absolute bottom-0 left-0 right-0 px-5"
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}
    >
      <FadeSlideIn direction="up" distance={45} duration={280}>
        <View className="flex-row items-center justify-between rounded-3xl border border-border bg-card/95 p-3.5 shadow-2xl backdrop-blur-md">
          {/* Left: Close icon + Selected counter */}
          <View className="flex-row items-center gap-2.5">
            <Button
              variant="ghost"
              size="sm"
              accessibilityLabel="Cancel selection mode"
              onPress={onCancel}
              className="w-9 h-9 px-0 rounded-full bg-card-subtle border border-border-subtle"
              leftIcon={<Icon as={X} size={16} className="text-muted" />}
            />
            <View>
              <Text className="text-sm font-bold text-foreground">
                {selectedCount} Selected
              </Text>
              <Text className="text-[10px] text-muted">
                {selectedCount === totalVisibleCount && totalVisibleCount > 0
                  ? 'All clients selected'
                  : `${totalVisibleCount - selectedCount} remaining`}
              </Text>
            </View>
          </View>

          {/* Right: Delete UI Button */}
          <View className="flex-row items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              accessibilityLabel="Delete selected"
              disabled={selectedCount === 0}
              onPress={onDeleteSelected}
              className={`w-11 h-11 px-0 rounded-full ${
                selectedCount === 0
                  ? 'border-border-subtle bg-surface/50 opacity-40'
                  : 'border-error/40 bg-error/15'
              }`}
              leftIcon={
                <Icon
                  as={Trash2}
                  size={18}
                  className={
                    selectedCount === 0 ? 'text-disabled' : 'text-error'
                  }
                />
              }
            />
          </View>
        </View>
      </FadeSlideIn>
    </View>
  );
}
