import React from 'react';
import { View } from 'react-native';
import { Input, Text } from '@/components/ui';

export interface BodyMetricsFormState {
  weight: string;
  height: string;
  bodyFat: string;
  bmi: string;
  waist: string;
  chest: string;
}

export interface AddMeasurementMetricsCardProps {
  metrics: BodyMetricsFormState;
  onChangeMetric: (field: keyof BodyMetricsFormState, value: string) => void;
}

export function AddMeasurementMetricsCard({
  metrics,
  onChangeMetric,
}: AddMeasurementMetricsCardProps) {
  const rows: {
    left: { field: keyof BodyMetricsFormState; label: string; unit?: string };
    right: { field: keyof BodyMetricsFormState; label: string; unit?: string };
  }[] = [
    {
      left: { field: 'weight', label: 'Weight', unit: 'Kg' },
      right: { field: 'height', label: 'Height', unit: 'Cm' },
    },
    {
      left: { field: 'bodyFat', label: 'Body fat', unit: '%' },
      right: { field: 'bmi', label: 'BMI' },
    },
    {
      left: { field: 'waist', label: 'Waist', unit: 'Cm' },
      right: { field: 'chest', label: 'Chest', unit: 'Cm' },
    },
  ];

  return (
    <View className="bg-card rounded-xl p-3.5 border border-border/50 gap-3.5 w-full">
      <Text className="text-xl font-bold text-foreground">Body metrics</Text>

      <View className="gap-3 w-full">
        {rows.map((row, index) => (
          <View key={`row-${index}`} className="flex-row items-center gap-3 w-full">
            {/* Left Column Field */}
            <Input
              label={row.left.label}
              value={metrics[row.left.field]}
              onChangeText={(val) => onChangeMetric(row.left.field, val)}
              placeholder="--"
              keyboardType="decimal-pad"
              containerClassName="flex-1"
              className="h-14! rounded-xl bg-surface px-3"
              inputClassName="text-base font-bold text-foreground py-0"
              rightIcon={
                row.left.unit ? (
                  <Text className="text-sm text-disabled font-medium">
                    {row.left.unit}
                  </Text>
                ) : undefined
              }
            />

            {/* Right Column Field */}
            <Input
              label={row.right.label}
              value={metrics[row.right.field]}
              onChangeText={(val) => onChangeMetric(row.right.field, val)}
              placeholder="--"
              keyboardType="decimal-pad"
              containerClassName="flex-1"
              className="h-14! rounded-xl bg-surface px-3"
              inputClassName="text-base font-bold text-foreground py-0"
              rightIcon={
                row.right.unit ? (
                  <Text className="text-sm text-disabled font-medium">
                    {row.right.unit}
                  </Text>
                ) : undefined
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
}
