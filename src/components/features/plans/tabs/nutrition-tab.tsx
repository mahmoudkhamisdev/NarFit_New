import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Apple, Utensils } from 'lucide-react-native';
import { Button, Card, Icon } from '@/components/ui';
import { Text } from '@/components/ui/text';

export interface NutritionTabProps {
  onCreateNutritionPlan?: () => void;
  bottomInset?: number;
}

export function NutritionTab({
  onCreateNutritionPlan,
  bottomInset,
}: NutritionTabProps) {
  const insets = useSafeAreaInsets();
  const effectiveBottom = bottomInset ?? insets.bottom;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 24,
        paddingHorizontal: 16,
        paddingBottom: effectiveBottom + 110,
      }}
    >
      <Card className="items-center justify-center p-8 border-dashed border-border-subtle bg-surface/40">
        <View className="w-16 h-16 rounded-3xl bg-brand/15 items-center justify-center mb-4">
          <Icon as={Utensils} size={30} className="text-brand" />
        </View>
        <Text className="text-lg font-bold text-foreground text-center">
          Nutrition Plans
        </Text>
        <Text className="text-xs text-muted text-center mt-1.5 max-w-[260px] leading-5">
          Personalized meal recommendations, macro calculations, and dietary guidelines for your athletes.
        </Text>
        <Button
          variant="primary"
          size="sm"
          leftIcon={<Icon as={Apple} size={16} className="text-inverse" />}
          title="Create Nutrition Plan"
          className="mt-5"
          onPress={onCreateNutritionPlan}
        />
      </Card>
    </ScrollView>
  );
}
