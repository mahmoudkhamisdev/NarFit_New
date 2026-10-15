import React from 'react';
import { View } from 'react-native';
import { Search } from 'lucide-react-native';
import { FilterTabs } from '@/components/shared';
import { Icon, Input } from '@/components/ui';
import { PlanFilterCategory } from '@/constants/plans';

export interface PlansSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: PlanFilterCategory;
  onFilterChange: (filter: PlanFilterCategory) => void;
  totalCount: number;
  weightLossCount?: number;
  muscleBuildCount?: number;
  strengthCount?: number;
  placeholder?: string;
}

export function PlansSearchFilter({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  totalCount,
  weightLossCount = 0,
  muscleBuildCount = 0,
  strengthCount = 0,
  placeholder = 'Search workout plans...',
}: PlansSearchFilterProps) {
  const filterTabs = [
    { id: 'all' as const, label: 'All plans', count: totalCount },
    { id: 'weight-loss' as const, label: 'Weight loss', count: weightLossCount },
    { id: 'muscle-build' as const, label: 'Muscle building', count: muscleBuildCount },
    { id: 'strength' as const, label: 'Strength', count: strengthCount },
  ];

  return (
    <View className="mt-4 gap-3.5">
      {/* Search Input */}
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={onSearchChange}
        leftIcon={<Icon as={Search} size={20} className="text-muted" />}
        className="h-14"
      />

      {/* Filter Tabs */}
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

export default PlansSearchFilter;
