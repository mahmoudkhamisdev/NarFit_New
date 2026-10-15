import React, { useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Plus, SearchX } from 'lucide-react-native';
import { BackButton } from '@/components/shared';
import {
  CreatePlanSheet,
  MyPlanCard,
  PlansSearchFilter,
} from '@/components/features/plans';
import { Button, Card, Icon } from '@/components/ui';
import { Text } from '@/components/ui/text';
import {
  MOCK_MY_PLANS,
  PlanFilterCategory,
  WorkoutPlanItem,
} from '@/constants/plans';

export default function MyPlansScreen() {
  const insets = useSafeAreaInsets();
  const createPlanSheetRef = useRef<BottomSheetModal>(null);

  const [plans, setPlans] = useState<WorkoutPlanItem[]>(MOCK_MY_PLANS);
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

  const handleOpenCreatePlan = () => {
    createPlanSheetRef.current?.present();
  };

  const handlePlanCreated = (newPlan: WorkoutPlanItem) => {
    setPlans((prev) => [newPlan, ...prev]);
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      {/* Screen Header Area */}
      <View
        className="px-4 pb-3"
        style={{ paddingTop: insets.top + 12 }}
      >
        <View className="flex-row items-center justify-between">
          <BackButton />

          <Text className="text-2xl font-black tracking-tight text-foreground">
            My Plans
          </Text>

          {/* Quick Add Custom Plan Button */}
          <Button
            variant="default"
            size="sm"
            className='w-12 h-12 rounded-2xl'
            leftIcon={<Icon as={Plus} size={18} />}
            onPress={handleOpenCreatePlan}
          />
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
          placeholder="Search my custom plans..."
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
          gap: 12,
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
            <Text className="text-xs text-muted text-center mt-1 mb-4">
              Try adjusting your search query or create a new custom plan.
            </Text>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Icon as={Plus} size={16} className="text-foreground" />}
              title="Create Custom Plan"
              onPress={handleOpenCreatePlan}
            />
          </Card>
        }
        renderItem={({ item }) => (
          <MyPlanCard
            item={item}
          />
        )}
      />

      {/* Create Plan Bottom Sheet */}
      <CreatePlanSheet
        ref={createPlanSheetRef}
        onPlanCreated={handlePlanCreated}
      />
    </View>
  );
}
