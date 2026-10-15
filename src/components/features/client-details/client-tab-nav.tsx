import React from 'react';
import { TabItem, Tabs } from '@/components/ui';

export type ClientTabType = 'Overview' | 'Plans' | 'Progess' | 'Measurements' | 'Notes';

export const CLIENT_TABS: ClientTabType[] = [
  'Overview',
  'Plans',
  'Progess',
  'Measurements',
  'Notes',
];

const tabItems: TabItem<ClientTabType>[] = CLIENT_TABS.map((tab) => ({
  id: tab,
  label: tab,
}));

export interface ClientTabNavProps {
  selectedTab: ClientTabType;
  onTabChange: (tab: ClientTabType) => void;
}

export function ClientTabNav({ selectedTab, onTabChange }: ClientTabNavProps) {
  return (
    <Tabs<ClientTabType>
      tabs={tabItems}
      value={selectedTab}
      onValueChange={onTabChange}
      variant="underline"
      scrollable
      contentContainerStyle={{ gap: 16 }}
    />
  );
}

export default ClientTabNav;
