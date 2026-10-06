import {
  Avatar,
  Card,
  Icon,
  Tag,
} from '@/components/ui';
import {
  DASHBOARD_RECENT_ACTIVITIES,
  DASHBOARD_TODAY_SESSIONS,
} from '@/constants';
import { StatusBar } from 'expo-status-bar';
import {
  ChevronRight,
  Clock,
  Dumbbell,
  Flame,
  TrendingUp,
} from 'lucide-react-native';
import React from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DashboardHeader, DashboardScrollView } from '@/components/features/dashboard';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const todaySessions = DASHBOARD_TODAY_SESSIONS;
  const recentProgress = DASHBOARD_RECENT_ACTIVITIES;

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      {/* Main Scroll Content */}
      <DashboardScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingHorizontal: 20,
        }}
      >
        {/* Header: Greeting & Quick Profile */}
        <DashboardHeader />

        {/* Metrics Grid (Figma 223:3693) */}
        <View className="mb-6 flex-row gap-3">
          {/* Left KPI Card: Total Clients (fit width) */}
          <Card className="border-border-subtle p-4 justify-between">
            <View>
              <View className="h-12 w-12 items-center justify-center rounded-2xl border border-brand">
                <Icon as={Flame} size={22} className="text-brand" />
              </View>
              <Text className="mt-3 text-4xl font-extrabold tracking-tight text-foreground">
                30
              </Text>
              <Text className="mt-1 text-sm font-medium text-muted">
                Total clients
              </Text>
            </View>

            <View className="flex-row items-center gap-1.5 pt-3">
              <Icon as={TrendingUp} size={15} className="text-brand" />
              <Text className="text-sm font-bold text-brand">3+</Text>
              <Text className="text-xs font-medium text-muted">this month</Text>
            </View>
          </Card>

          {/* Right Column: Training Today KPI Cards */}
          <View className="flex-1 gap-3 justify-between">
            {/* Training Today Card 1 */}
            <Card className="flex-1 border-border-subtle p-3.5 flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-2xl border border-border">
                <Icon as={Dumbbell} size={20} className="text-foreground" />
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-black text-foreground">5</Text>
                <Text className="text-xs font-medium text-muted mt-0.5" numberOfLines={1}>
                  Training Today
                </Text>
              </View>
            </Card>

            {/* Training Today Card 2 */}
            <Card className="flex-1 border-border-subtle p-3.5 flex-row items-center gap-3">
              <View className="h-12 w-12 items-center justify-center rounded-2xl border border-border">
                <Icon as={Dumbbell} size={20} className="text-foreground" />
              </View>
              <View className="flex-1">
                <Text className="text-2xl font-black text-foreground">5</Text>
                <Text className="text-xs font-medium text-muted mt-0.5" numberOfLines={1}>
                  Training Today
                </Text>
              </View>
            </Card>
          </View>
        </View>


        {/* Today Training Section (Figma 223:3390 data) */}
        <View className="mb-6">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <Text className="text-lg font-bold tracking-tight text-foreground">
                Today Training
              </Text>
              <View className="h-5 rounded-full bg-brand/20 px-2 items-center justify-center">
                <Text className="text-[11px] font-bold text-brand">3</Text>
              </View>
            </View>
            <Pressable className="flex-row items-center gap-0.5 active:opacity-75">
              <Text className="text-xs font-semibold text-brand">See All</Text>
              <Icon as={ChevronRight} size={14} className="text-brand" />
            </Pressable>
          </View>

          {/* Horizontal Card Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingRight: 4 }}
          >
            {todaySessions.map((session) => (
              <Card
                key={session.id}
                className="w-56 border-border-subtle bg-surface p-4 justify-between"
              >
                <View>
                  <View className="flex-row items-center justify-between mb-3">
                    <Avatar
                      source={session.avatarSource}
                      name={session.clientName}
                      color={session.avatarColor}
                      size="md"
                    />
                    <Tag
                      label={session.status}
                      variant={session.statusVariant}
                      size="xs"
                    />
                  </View>
                  <Text className="text-sm font-bold text-foreground">
                    {session.clientName}
                  </Text>
                  <Text className="text-xs text-muted mt-0.5" numberOfLines={1}>
                    {session.program}
                  </Text>
                </View>

                <View className="mt-4 flex-row items-center justify-between pt-3 border-t border-border-subtle">
                  <View className="flex-row items-center gap-1.5">
                    <Icon as={Clock} size={13} className="text-muted" />
                    <Text className="text-xs font-semibold text-foreground">
                      {session.time}
                    </Text>
                  </View>
                  <Text className="text-[11px] font-medium text-muted">
                    {session.duration}
                  </Text>
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Recent Activities Feed */}
        <View className="mb-4">
          <Text className="mb-3 text-lg font-bold tracking-tight text-foreground">
            Recent Activities
          </Text>

          <Card className="border-border-subtle bg-surface p-0 overflow-hidden divide-y divide-border-subtle">
            {recentProgress.map((item, index) => (
              <View
                key={item.id}
                className={`p-4 flex-row items-center justify-between ${index !== 0 ? 'border-t border-border-subtle' : ''
                  }`}
              >
                <View className="flex-row items-center gap-3 flex-1 pr-2">
                  <Avatar name={item.name} color={item.color} size="md" />
                  <View className="flex-1">
                    <Text className="text-xs font-bold text-foreground">
                      {item.name}
                    </Text>
                    <Text className="text-xs text-muted mt-0.5" numberOfLines={1}>
                      {item.action}
                    </Text>
                  </View>
                </View>

                <View className="items-end gap-1">
                  <Text className="text-[10px] text-muted">{item.time}</Text>
                  <Tag label={item.badge} variant="brand" size="xs" />
                </View>
              </View>
            ))}
          </Card>
        </View>
      </DashboardScrollView>
    </View>
  );
}
