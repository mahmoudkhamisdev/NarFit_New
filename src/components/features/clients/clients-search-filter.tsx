import { FilterTabs } from '@/components/shared';
import { Icon, Input } from '@/components/ui';
import { ClientStatusFilter } from '@/constants';
import { Search } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

export interface ClientsSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: ClientStatusFilter;
  onFilterChange: (filter: ClientStatusFilter) => void;
  totalCount: number;
  trainingCount: number;
  restCount: number;
}

export function ClientsSearchFilter({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  totalCount,
  trainingCount,
  restCount,
}: ClientsSearchFilterProps) {
  const filterTabs = [
    { id: 'all' as const, label: 'All clients', count: totalCount },
    { id: 'training' as const, label: 'Training today', count: trainingCount },
    { id: 'rest' as const, label: 'Rest day', count: restCount },
  ];

  return (
    <View className="mt-4 gap-3.5">
      {/* Full-width Search Input */}
      <Input
        placeholder="Search clients..."
        value={searchQuery}
        onChangeText={onSearchChange}
        leftIcon={<Icon as={Search} size={20} className="text-muted" />}
        className="h-14"
      />

      {/* Shared Animated Filter Tabs */}
      <FilterTabs
        tabs={filterTabs}
        activeTab={selectedFilter}
        onTabChange={onFilterChange}
        scrollable
        contentContainerStyle={{ gap: 4 }}
      />
    </View>
  );
}
