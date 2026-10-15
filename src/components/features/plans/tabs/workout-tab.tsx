import React from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import { Button, Icon } from '@/components/ui';
import { ExploreCard } from '../explore-card';
import { MyPlanCard } from '../my-plan-card';
import { PlansSectionHeader } from '../plans-section-header';
import { WorkoutPlanItem } from '@/constants/plans';

export interface WorkoutTabProps {
  explorePlans: WorkoutPlanItem[];
  myPlans: WorkoutPlanItem[];
  onNavigateExploreAll?: () => void;
  onNavigateMyPlansAll?: () => void;
  onOpenCreatePlan?: () => void;
  bottomInset?: number;
}

export function WorkoutTab({
  explorePlans,
  myPlans,
  onNavigateExploreAll,
  onNavigateMyPlansAll,
  onOpenCreatePlan,
  bottomInset,
}: WorkoutTabProps) {
  const insets = useSafeAreaInsets();
  const effectiveBottom = bottomInset ?? insets.bottom;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 16,
        paddingBottom: effectiveBottom + 110,
      }}
    >
      {/* 1. Explore Section (Figma 419:6170) */}
      <View className="mb-6">
        <View className="px-4 mb-3.5">
          <PlansSectionHeader
            title="Explore"
            onSeeAllPress={onNavigateExploreAll}
          />
        </View>

        {/* Horizontal Explore Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            gap: 12,
          }}
        >
          {explorePlans.map((item) => (
            <ExploreCard
              key={item.id}
              item={item}
              width={280}
              onPress={onNavigateExploreAll}
            />
          ))}
        </ScrollView>
      </View>

      {/* 2. My Plans Section (Figma 419:6171) */}
      <View className="px-4">
        <PlansSectionHeader
          title="My plans"
          onSeeAllPress={onNavigateMyPlansAll}
          className="mb-3.5"
        />

        {/* Custom Workout Plan Action Button */}
        <Button
          variant="primary"
          size="md"
          fullWidth
          leftIcon={<Icon as={Plus} size={20} className="text-inverse" />}
          title="Custom workout plan"
          onPress={onOpenCreatePlan}
          className="mb-4 shadow-sm active:scale-[0.99]"
        />

        {/* My Plans Vertical Cards List */}
        <View className="gap-3">
          {myPlans.map((item) => (
            <MyPlanCard
              key={item.id}
              item={item}
              onPress={onNavigateMyPlansAll}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
