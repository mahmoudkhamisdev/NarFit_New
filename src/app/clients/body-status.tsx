import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui';
import {
  BodyStatusHeader,
  BodyStatusTabs,
  BodyStatusTabType,
  MeasurementsTab,
  OverviewTab,
  ProgressPhotosTab,
} from '@/components/features/client-details';

export default function BodyStatusScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<BodyStatusTabType>('Overview');

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      {/* Screen Header Bar */}
      <View
        className="px-4 pb-2 bg-background z-20"
        style={{ paddingTop: insets.top + 8 }}
      >
        <BodyStatusHeader onBack={() => router.back()} />
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: insets.bottom + 96,
          gap: 16,
        }}
      >
        {/* Filter Tabs (Overview, Measurements, Progress photos) */}
        <BodyStatusTabs
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />

        {/* Tab Content */}
        {selectedTab === 'Overview' && <OverviewTab />}
        {selectedTab === 'Measurements' && <MeasurementsTab />}
        {selectedTab === 'Progress photos' && <ProgressPhotosTab />}
      </ScrollView>

      {/* Bottom Sticky Action Button */}
      <View
        className="absolute bottom-0 left-0 right-0 px-4 pt-3 bg-background/95 border-t border-border/30 z-30"
        style={{ paddingBottom: Math.max(insets.bottom + 8, 16) }}
      >
        <Button
          title="Add New measurement"
          variant="primary"
          size="lg"
          fullWidth
          className="h-16 rounded-2xl bg-brand"
          textClassName="text-inverse text-lg font-bold"
          onPress={() => router.push('/clients/add-measurement' as any)}
        />
      </View>
    </View>
  );
}
