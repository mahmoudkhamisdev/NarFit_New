import { Button, Icon } from '@/components/ui';
import { RotateCcw, Users } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

export interface ClientsEmptyStateProps {
  hasNoClients: boolean;
  onRestoreDemoData: () => void;
}

export function ClientsEmptyState({
  hasNoClients,
  onRestoreDemoData,
}: ClientsEmptyStateProps) {
  return (
    <View className="items-center justify-center py-20 px-6">
      <View className="h-20 w-20 items-center justify-center rounded-full border border-border-subtle bg-card-subtle mb-4">
        <Icon as={Users} size={36} className="text-muted" />
      </View>
      <Text className="text-lg font-bold text-foreground text-center">
        No clients found
      </Text>
      <Text className="mt-1 text-sm text-muted text-center max-w-[260px]">
        Try adjusting your search query or filter criteria.
      </Text>

      {hasNoClients && (
        <Button
          variant="outline"
          size="sm"
          title="Restore Demo Clients"
          leftIcon={<Icon as={RotateCcw} size={16} className="text-foreground" />}
          className="mt-6"
          onPress={onRestoreDemoData}
        />
      )}
    </View>
  );
}
