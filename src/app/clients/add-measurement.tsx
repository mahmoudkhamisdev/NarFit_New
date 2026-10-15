import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui';
import {
  AddMeasurementDateCard,
  AddMeasurementHeader,
  AddMeasurementMetricsCard,
  AddMeasurementOptionalCard,
  AddMeasurementTipCard,
  BodyMetricsFormState,
  OptionalMeasurementsFormState,
} from '@/components/features/client-details';

export default function AddMeasurementScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Date state
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date(2026, 0, 22));

  // Body metrics form state (matching Figma defaults)
  const [metrics, setMetrics] = useState<BodyMetricsFormState>({
    weight: '91',
    height: '178',
    bodyFat: '24',
    bmi: '28.7',
    waist: '92',
    chest: '102',
  });

  // Optional measurements form state
  const [optionalMetrics, setOptionalMetrics] = useState<OptionalMeasurementsFormState>({
    neck: '',
    arms: '',
    thighs: '',
    calves: '',
  });

  const handleMetricChange = (field: keyof BodyMetricsFormState, value: string) => {
    setMetrics((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionalMetricChange = (
    field: keyof OptionalMeasurementsFormState,
    value: string
  ) => {
    setOptionalMetrics((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: API - Save client body measurements: POST /api/clients/${clientId}/measurements
    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      {/* Screen Header Bar */}
      <View
        className="px-4 pb-2 bg-background z-20"
        style={{ paddingTop: insets.top + 8 }}
      >
        <AddMeasurementHeader onBack={() => router.back()} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : "height"}
        className="flex-1"
      >
        {/* Main Scrollable Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 24,
            gap: 16,
          }}
          className="flex-1"
        >
          {/* Top Tip Card */}
          <AddMeasurementTipCard />

          {/* Date Field Card (opens DatePickerSheet) */}
          <AddMeasurementDateCard
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />

          {/* Body Metrics Form Card */}
          <AddMeasurementMetricsCard
            metrics={metrics}
            onChangeMetric={handleMetricChange}
          />

          {/* Optional Measurements Form Card */}
          <AddMeasurementOptionalCard
            metrics={optionalMetrics}
            onChangeMetric={handleOptionalMetricChange}
          />
        </ScrollView>

        {/* Bottom Sticky Action Button */}
        <View
          className="px-4 pt-3 bg-background border-t border-border/30"
          style={{ paddingBottom: Math.max(insets.bottom + 8, 16) }}
        >
          <Button
            title="Save measurement"
            variant="primary"
            size="lg"
            fullWidth
            className="h-16 rounded-2xl bg-brand"
            textClassName="text-inverse text-lg font-bold"
            onPress={handleSave}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
