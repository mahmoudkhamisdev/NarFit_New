import { FilterTabs } from '@/components/shared';
import React from 'react';
import { View } from 'react-native';

export interface NotificationsFilterProps {
  selectedFilter: 'all' | 'unread';
  onSelectFilter: (filter: 'all' | 'unread') => void;
  totalCount: number;
  unreadCount: number;
}

export function NotificationsFilter({
  selectedFilter,
  onSelectFilter,
  totalCount,
  unreadCount,
}: NotificationsFilterProps) {
  const filterTabs = [
    { id: 'all' as const, label: 'All', count: totalCount },
    { id: 'unread' as const, label: 'Unread', count: unreadCount },
  ];

  return (
    <View className="mt-4">
      <FilterTabs
        tabs={filterTabs}
        activeTab={selectedFilter}
        onTabChange={onSelectFilter}
        scrollable={false}
      />
    </View>
  );
}

