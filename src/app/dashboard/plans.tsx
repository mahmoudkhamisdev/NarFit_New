import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  CreatePlanSheet,
  NutritionTab,
  PlansHeader,
  WorkoutTab,
} from '@/components/features/plans';
import { Tabs } from '@/components/ui';
import {
  MOCK_EXPLORE_PLANS,
  MOCK_MY_PLANS,
  WorkoutPlanItem,
} from '@/constants/plans';

type PlansTab = 'workout' | 'nutrition';

export default function DashboardPlansScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const createPlanSheetRef = useRef<BottomSheetModal>(null);

  const [activeTab, setActiveTab] = useState<PlansTab>('workout');
  const [explorePlans] = useState<WorkoutPlanItem[]>(MOCK_EXPLORE_PLANS);
  const [myPlans, setMyPlans] = useState<WorkoutPlanItem[]>(MOCK_MY_PLANS);

  const planTabs = [
    { id: 'workout' as const, label: 'Workout plans' },
    { id: 'nutrition' as const, label: 'Nutrition plan' },
  ];

  const handleOpenCreatePlan = () => {
    createPlanSheetRef.current?.present();
  };

  const handlePlanCreated = (newPlan: WorkoutPlanItem) => {
    setMyPlans((prev) => [newPlan, ...prev]);
  };

  const handleNavigateExploreAll = () => {
    router.push('/plans/explore');
  };

  const handleNavigateMyPlansAll = () => {
    router.push('/plans/my-plans');
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      {/* Screen Header Area */}
      <View
        className="px-4 pb-1"
        style={{ paddingTop: insets.top + 12 }}
      >
        {/* Main Header (Plans & Subtitle without plus button) */}
        <PlansHeader />

        {/* Tab Navigation (Workout plans / Nutrition plan) */}
        <View className="mt-2">
          <Tabs
            tabs={planTabs}
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as PlansTab)}
            variant="underline"
            scrollable={false}
            tabClassName="flex-1"
          />
        </View>
      </View>

      {/* Main Content Area */}
      {activeTab === 'workout' ? (
        <WorkoutTab
          explorePlans={explorePlans}
          myPlans={myPlans}
          onNavigateExploreAll={handleNavigateExploreAll}
          onNavigateMyPlansAll={handleNavigateMyPlansAll}
          onOpenCreatePlan={handleOpenCreatePlan}
          bottomInset={insets.bottom}
        />
      ) : (
        <NutritionTab bottomInset={insets.bottom} />
      )}

      {/* Create Plan Bottom Sheet Modal */}
      <CreatePlanSheet
        ref={createPlanSheetRef}
        onPlanCreated={handlePlanCreated}
      />
    </View>
  );
}
