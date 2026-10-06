import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';

export interface FilterTabItem<T extends string = string> {
  id: T;
  label: string;
  count?: number;
}

export interface FilterTabsProps<T extends string = string> {
  tabs: FilterTabItem<T>[];
  activeTab: T;
  onTabChange: (tabId: T) => void;
  className?: string;
  contentContainerClassName?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollable?: boolean;
}

export function FilterTabs<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  className = '',
  contentContainerClassName = '',
  contentContainerStyle,
  scrollable = true,
}: FilterTabsProps<T>) {
  const layoutsRef = useRef<Record<string, { x: number; width: number }>>({});
  const [isReady, setIsReady] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);

  const [translateX] = useState(() => new Animated.Value(0));
  const [indicatorWidth] = useState(() => new Animated.Value(0));

  // Animate indicator to target tab layout
  const animateToTab = useCallback(
    (tabId: string, animated: boolean = true) => {
      const layout = layoutsRef.current[tabId];
      if (!layout) return;

      if (!animated) {
        translateX.setValue(layout.x);
        indicatorWidth.setValue(layout.width);
        setIsReady(true);
        return;
      }

      setIsReady(true);
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: layout.x,
          useNativeDriver: false,
          bounciness: 4,
          speed: 16,
        }),
        Animated.spring(indicatorWidth, {
          toValue: layout.width,
          useNativeDriver: false,
          bounciness: 4,
          speed: 16,
        }),
      ]).start();

      // Scroll to active tab if needed
      if (scrollable && scrollRef.current && layout.x > 0) {
        scrollRef.current.scrollTo({
          x: Math.max(0, layout.x - 20),
          animated: true,
        });
      }
    },
    [indicatorWidth, scrollable, translateX]
  );

  const handleTabLayout = (tabId: string, e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    layoutsRef.current[tabId] = { x, width };

    // Initial positioning once active tab layout is measured
    if (tabId === activeTab && !isReady) {
      animateToTab(activeTab, false);
    }
  };

  useEffect(() => {
    if (layoutsRef.current[activeTab]) {
      animateToTab(activeTab, true);
    }
  }, [activeTab, animateToTab]);

  const tabsContent = (
    <View className="relative flex-row items-center">
      {/* Sliding Active Indicator (Brand Tag styled capsule) */}
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          transform: [{ translateX }],
          width: indicatorWidth,
          opacity: isReady ? 1 : 0,
        }}
        className="rounded-full bg-brand/20 border border-brand/40"
      />

      {/* Tab Buttons */}
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="button"
            accessibilityLabel={`Filter ${tab.label}`}
            onLayout={(e) => handleTabLayout(tab.id, e)}
            onPress={() => onTabChange(tab.id)}
            className="z-10 h-8 flex-row items-center justify-center gap-1.5 px-3.5 rounded-full active:opacity-75"
          >
            <Text
              className={`text-sm ${
                isActive
                  ? 'font-semibold text-brand'
                  : 'font-medium text-muted'
              }`}
            >
              {tab.label}
            </Text>

            {tab.count !== undefined && tab.count > 0 && (
              <View
                className={`h-4 min-w-[18px] px-1 rounded-full items-center justify-center ${
                  isActive ? 'bg-brand/25' : 'bg-surface'
                }`}
              >
                <Text
                  className={`text-[10px] font-bold ${
                    isActive ? 'text-brand' : 'text-muted'
                  }`}
                >
                  {tab.count}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );

  if (scrollable) {
    return (
      <View className={className}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}
          className={contentContainerClassName}
        >
          {tabsContent}
        </ScrollView>
      </View>
    );
  }

  return <View className={className}>{tabsContent}</View>;
}

export default FilterTabs;
