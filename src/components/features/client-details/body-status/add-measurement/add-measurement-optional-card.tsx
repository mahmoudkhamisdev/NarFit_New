import React from 'react';
import { View } from 'react-native';
import { Input, Text } from '@/components/ui';

export interface OptionalMeasurementsFormState {
  neck: string;
  arms: string;
  thighs: string;
  calves: string;
}

export interface AddMeasurementOptionalCardProps {
  metrics: OptionalMeasurementsFormState;
  onChangeMetric: (field: keyof OptionalMeasurementsFormState, value: string) => void;
}

export function AddMeasurementOptionalCard({
  metrics,
  onChangeMetric,
}: AddMeasurementOptionalCardProps) {
  const rows: {
    left: { field: keyof OptionalMeasurementsFormState; label: string; unit: string };
    right: { field: keyof OptionalMeasurementsFormState; label: string; unit: string };
  }[] = [
    {
      left: { field: 'neck', label: 'Neck', unit: 'Cm' },
      right: { field: 'arms', label: 'Arms', unit: 'Cm' },
    },
    {
      left: { field: 'thighs', label: 'Thighs', unit: 'Cm' },
      right: { field: 'calves', label: 'Calves', unit: 'Cm' },
    },
  ];

  return (
    <View className="bg-card rounded-xl p-3.5 border border-border/50 gap-3.5 w-full">
      <Text className="text-xl font-bold text-foreground">
        Optional Measurements
      </Text>

      <View className="gap-3 w-full">
        {rows.map((row, index) => (
          <View key={`opt-row-${index}`} className="flex-row items-center gap-3 w-full">
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
                <Text className="text-sm text-disabled font-medium">
                  {row.left.unit}
                </Text>
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
                <Text className="text-sm text-disabled font-medium">
                  {row.right.unit}
                </Text>
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
}
