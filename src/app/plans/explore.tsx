import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BackButton } from '@/components/shared';
import { ExploreCard, PlansSearchFilter } from '@/components/features/plans';
import { Card, Icon } from '@/components/ui';
import { Text } from '@/components/ui/text';
import { MOCK_EXPLORE_PLANS, PlanFilterCategory, WorkoutPlanItem } from '@/constants/plans';
import { SearchX } from 'lucide-react-native';

export default function ExplorePlansScreen() {
  const insets = useSafeAreaInsets();
  const [plans] = useState<WorkoutPlanItem[]>(MOCK_EXPLORE_PLANS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<PlanFilterCategory>('all');

  // Counts by category
  const weightLossCount = useMemo(
    () => plans.filter((p) => p.categoryKey === 'weight-loss').length,
    [plans]
  );
  const muscleBuildCount = useMemo(
    () => plans.filter((p) => p.categoryKey === 'muscle-build').length,
    [plans]
  );
  const strengthCount = useMemo(
    () => plans.filter((p) => p.categoryKey === 'strength').length,
    [plans]
  );

  // Filtered plans
  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      // Category filter
      if (selectedFilter !== 'all' && plan.categoryKey !== selectedFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = plan.title.toLowerCase().includes(q);
        const matchesCat = plan.category.toLowerCase().includes(q);
        const matchesLevel = plan.level.toLowerCase().includes(q);
        return matchesTitle || matchesCat || matchesLevel;
      }

      return true;
    });
  }, [plans, selectedFilter, searchQuery]);

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      {/* Screen Header Area */}
      <View
        className="px-4 pb-3"
        style={{ paddingTop: insets.top + 12 }}
      >
        <View className="flex-row items-center gap-3">
          <BackButton />

          <Text className="text-2xl font-black tracking-tight text-foreground">
            Explore Plans
          </Text>
        </View>

        {/* Search & Filter identical to Clients page */}
        <PlansSearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          totalCount={plans.length}
          weightLossCount={weightLossCount}
          muscleBuildCount={muscleBuildCount}
          strengthCount={strengthCount}
          placeholder="Search explore plans..."
        />
      </View>

      {/* Plans List */}
      <FlatList
        data={filteredPlans}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: 8,
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 40,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Card className="items-center justify-center p-8 mt-6 border-dashed border-border-subtle bg-surface/50">
            <View className="w-14 h-14 rounded-full bg-card items-center justify-center mb-3">
              <Icon as={SearchX} size={28} className="text-muted" />
            </View>
            <Text className="text-base font-bold text-foreground text-center">
              No plans found
            </Text>
            <Text className="text-xs text-muted text-center mt-1">
              Try adjusting your search query or filter to find workout routines.
            </Text>
          </Card>
        }
        renderItem={({ item }) => (
          <ExploreCard
            item={item}
            width="100%"
            className="w-full"
          />
        )}
      />
    </View>
  );
}
