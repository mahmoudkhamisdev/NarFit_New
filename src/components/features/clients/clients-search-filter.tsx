import { FilterTabs } from '@/components/shared';
import { Button, Icon, Input } from '@/components/ui';
import { ClientStatusFilter } from '@/constants';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { View } from 'react-native';

export interface ClientsSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: ClientStatusFilter;
  onFilterChange: (filter: ClientStatusFilter) => void;
  onOpenFilterSheet?: () => void;
  totalCount: number;
  trainingCount: number;
  restCount: number;
}

export function ClientsSearchFilter({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
  onOpenFilterSheet,
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
      {/* Search Input Row with Filter Button */}
      <View className="flex-row items-center gap-2.5">
        <View className="flex-1">
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChangeText={onSearchChange}
            leftIcon={<Icon as={Search} size={20} className="text-muted" />}
            className="h-14"
          />
        </View>

        {/* Filter Trigger Button */}
        <Button
          variant="outline"
          size="sm"
          className="h-14 w-14 px-0 rounded-2xl border-border-subtle bg-card"
          leftIcon={<Icon as={SlidersHorizontal} size={20} className="text-foreground" />}
          onPress={onOpenFilterSheet}
          accessibilityLabel="Open filter options"
        />
      </View>

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
