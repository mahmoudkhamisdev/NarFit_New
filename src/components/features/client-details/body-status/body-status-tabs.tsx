import React from 'react';
import { View } from 'react-native';
import { TabItem, Tabs } from '@/components/ui';

export type BodyStatusTabType = 'Overview' | 'Measurements' | 'Progress photos';

const BODY_STATUS_TABS: TabItem<BodyStatusTabType>[] = [
  { id: 'Overview', label: 'Overview' },
  { id: 'Measurements', label: 'Measurements' },
  { id: 'Progress photos', label: 'Progress photos' },
];

export interface BodyStatusTabsProps {
  selectedTab: BodyStatusTabType;
  onTabChange: (tab: BodyStatusTabType) => void;
}

export function BodyStatusTabs({
  selectedTab,
  onTabChange,
}: BodyStatusTabsProps) {
  return (
    <View className="w-full">
      <Tabs<BodyStatusTabType>
        tabs={BODY_STATUS_TABS}
        value={selectedTab}
        onValueChange={onTabChange}
        variant="pill"
      />
    </View>
  );
}
