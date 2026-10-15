import React from 'react';
import { View } from 'react-native';
import { Pencil } from 'lucide-react-native';
import { Button, Icon, Text } from '@/components/ui';
import { BackButton } from '@/components/shared';

export interface ClientDetailsHeaderProps {
  title?: string;
  onBack?: () => void;
  onEdit?: () => void;
}

export function ClientDetailsHeader({
  title = 'Clients',
  onBack,
  onEdit,
}: ClientDetailsHeaderProps) {
  return (
    <View className="flex-row items-center justify-between py-2">
      {/* Back Button */}
      <BackButton onPress={onBack} />

      {/* Title */}
      <Text className="text-2xl font-medium tracking-tight text-foreground text-center">
        {title}
      </Text>

      {/* Edit Button */}
      <Button
        variant="outline"
        size="sm"
        className="h-12 w-12 px-0 rounded-2xl border-border-subtle bg-card"
        leftIcon={<Icon as={Pencil} size={19} className="text-foreground" />}
        onPress={onEdit}
        accessibilityLabel="Edit client"
      />
    </View>
  );
}

export default ClientDetailsHeader;
