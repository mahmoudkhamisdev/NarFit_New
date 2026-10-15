import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui';
import { getClientGoalInfo, MOCK_CLIENTS } from '@/constants';
import {
  ClientBodyStatusCard,
  ClientDetailsHeader,
  ClientGoalCard,
  ClientNutritionCard,
  ClientProfileHero,
  ClientTabNav,
  ClientTabType,
  ClientTrainingInfoCard,
} from '@/components/features/client-details';

export default function ClientDetailsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const clientId = id || '1';
  const [selectedTab, setSelectedTab] = useState<ClientTabType>('Overview');

  // TODO: API - Fetch client details: GET /api/clients/${clientId}
  const clientData = useMemo(() => {
    const found = MOCK_CLIENTS.find((c) => c.id === id);
    if (found) {
      return {
        name: found.name,
        age: '24 years',
        gender: 'Male',
        phone: '+201017130116',
        location: 'Cairo, Egypt',
        status: found.status === 'Attention' ? 'Need attention' : found.status,
        locationType: 'Gym',
        frequency: '3 days/week',
        avatarSource: found.avatarSource,
      };
    }
    return {
      name: 'Mahmoud khamis',
      age: '24 years',
      gender: 'Male',
      phone: '+201017130116',
      location: 'Cairo, Egypt',
      status: 'Active',
      locationType: 'Gym',
      frequency: '3 days/week',
      avatarSource: require('@/assets/images/avatars/avatar-7.png'),
    };
  }, [id]);

  // TODO: API - Fetch current client goal: GET /api/clients/${clientId}/goal
  const goalMeta = useMemo(() => getClientGoalInfo('lose-weight'), []);

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      {/* Screen Header Area */}
      <View
        className="px-4 pb-2 bg-background z-20"
        style={{ paddingTop: insets.top + 8 }}
      >
        <ClientDetailsHeader
          title="Clients"
          onBack={() => router.back()}
          onEdit={() =>
            router.push({
              pathname: '/clients/edit-info',
              params: { id: clientId },
            } as any)
          }
        />
      </View>

      {/* Main Content ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: insets.bottom + 96,
          gap: 16,
        }}
      >
        {/* Profile Hero (Avatar, Name, Age, Contact, Tags) */}
        <ClientProfileHero
          name={clientData.name}
          age={clientData.age}
          gender={clientData.gender}
          phone={clientData.phone}
          location={clientData.location}
          status={clientData.status}
          locationType={clientData.locationType}
          frequency={clientData.frequency}
          avatarSource={clientData.avatarSource}
        />

        {/* Underlined Horizontal Tab Navigation */}
        <ClientTabNav
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
        />

        {/* Tab Content */}
        {selectedTab === 'Overview' && (
          <View className="gap-4 w-full">
            {/* Current Goal Card with Interactive Slider */}
            <ClientGoalCard
              goalTitle={goalMeta.title}
              goalDescription={goalMeta.description}
              goalIcon={goalMeta.icon}
              onChangeGoal={() =>
                router.push({
                  pathname: '/clients/goal',
                  params: { id: clientId },
                } as any)
              }
            />

            {/* Body Status Section (Weight, Height, BMI, Body Fat) */}
            <ClientBodyStatusCard
              onPressHeader={() =>
                router.push({
                  pathname: '/clients/body-status',
                  params: { id },
                } as any)
              }
            />

            {/* Daily Nutrition Target Section (BMR, TDEE, Daily Target) */}
            <ClientNutritionCard
              onPressHeader={() =>
                router.push({
                  pathname: '/clients/daily-nutrition',
                  params: { id },
                } as any)
              }
            />

            {/* Training Info Section (Days/week, Location, Activity Level) */}
            <ClientTrainingInfoCard />
          </View>
        )}
      </ScrollView>

      {/* Bottom Sticky Action Button */}
      <View
        className="absolute bottom-0 left-0 right-0 px-4 pt-3 bg-background/95 border-t border-border/30 z-30"
        style={{ paddingBottom: Math.max(insets.bottom + 8, 16) }}
      >
        <Button
          title="Assign"
          variant="ghost"
          size="lg"
          fullWidth
          className="h-16 rounded-2xl bg-foreground"
          textClassName="text-inverse text-lg font-bold"
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}
