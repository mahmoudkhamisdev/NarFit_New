import { Button, Icon } from '@/components/ui';
import { router } from 'expo-router';
import {
  Apple,
  Home,
  LucideIcon,
  Plus,
  Users,
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type DashboardTab = 'home' | 'clients' | 'plans';

interface TabItem {
  id: DashboardTab;
  label: string;
  icon: LucideIcon;
}

const TABS: TabItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'plans', label: 'Plans', icon: Apple },
];

export interface DashboardFooterProps {
  initialTab?: DashboardTab;
  onTabChange?: (tab: DashboardTab) => void;
  onAddPress?: () => void;
}

export function DashboardFooter({
  initialTab = 'home',
  onTabChange,
  onAddPress,
}: DashboardFooterProps) {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const initialIndex = Math.max(
    0,
    TABS.findIndex((t) => t.id === initialTab)
  );
  const [slideAnim] = useState(() => new Animated.Value(initialIndex));

  const handleTabPress = (tab: DashboardTab, index: number) => {
    setActiveTab(tab);
    Animated.spring(slideAnim, {
      toValue: index,
      useNativeDriver: true,
      bounciness: 4,
      speed: 14,
    }).start();
    if (onTabChange) {
      onTabChange(tab);
    } else if (tab === 'clients') {
      router.push('/clients' as any);
    }
  };

  const handlePlusPress = () => {
    if (onAddPress) {
      onAddPress();
    } else {
      router.push('/add-client');
    }
  };

  const onContainerLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    setContainerWidth(width);
  };

  // 6px padding on left and right (p-1.5 = 6px)
  const innerWidth = containerWidth > 12 ? containerWidth - 12 : 0;
  const itemWidth = innerWidth > 0 ? innerWidth / TABS.length : 0;

  return (
    <View
      pointerEvents="box-none"
      className="absolute bottom-0 left-0 right-0 items-center px-4"
      style={{ paddingBottom: Math.max(insets.bottom, 12) }}
    >
      <View className="w-full max-w-[375px] flex-row items-center gap-2.5">
        {/* Main Navigation Pill Bar (Figma 198:2277) */}
        <View
          onLayout={onContainerLayout}
          className="relative flex-1 flex-row items-center justify-between rounded-full border border-border-subtle bg-card p-1.5 shadow-sm overflow-hidden"
        >
          {/* Animated Sliding Active Indicator */}
          {itemWidth > 0 && (
            <Animated.View
              style={{
                position: 'absolute',
                top: 6,
                bottom: 6,
                left: 6,
                width: itemWidth,
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: TABS.map((_, i) => i),
                      outputRange: TABS.map((_, i) => i * itemWidth),
                    }),
                  },
                ],
              }}
              className="rounded-full bg-brand shadow-sm"
            />
          )}

          {/* Render Tabs Array */}
          {TABS.map((tab, index) => {
            const isActive = activeTab === tab.id;
            return (
              <Pressable
                key={tab.id}
                accessibilityRole="button"
                accessibilityLabel={tab.label}
                onPress={() => handleTabPress(tab.id, index)}
                className="z-10 flex-1 items-center justify-center rounded-full py-2 active:opacity-75"
              >
                <Icon
                  as={tab.icon}
                  size={20}
                  className={isActive ? 'text-inverse' : 'text-muted'}
                />
                <Text
                  className={`mt-0.5 text-[11px] ${
                    isActive ? 'font-bold text-inverse' : 'font-medium text-muted'
                  }`}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Circular Action Button / FAB with UI Button (Figma 198:2786) */}
        <Button
          variant="primary"
          accessibilityLabel="Add client"
          onPress={handlePlusPress}
          className="size-15 px-0 gap-0 items-center justify-center rounded-full shadow-md active:scale-95"
        >
          <Icon as={Plus} size={30} className="text-inverse" />
        </Button>
      </View>
    </View>
  );
}
