import React, { forwardRef } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface DashboardScrollViewProps extends ScrollViewProps {
  /**
   * Additional clearance padding above the floating footer (default: 24)
   */
  extraBottomClearance?: number;
}

/**
 * Calculates the dynamic bottom padding needed so content can scroll
 * completely behind the floating dashboard footer and clear it with
 * comfortable spacing at the bottom of the scroll.
 */
export function useDashboardBottomPadding(extraClearance: number = 24): number {
  const insets = useSafeAreaInsets();
  // Floating footer FAB height is 68px, container inset is Math.max(insets.bottom, 12)
  return Math.max(insets.bottom, 12) + 68 + extraClearance;
}

/**
 * A drop-in replacement for ScrollView across any dashboard screen.
 * - Allows content to scroll full-bleed behind the floating footer.
 * - Automatically injects the exact bottom padding so the last item is never hidden.
 */
export const DashboardScrollView = forwardRef<ScrollView, DashboardScrollViewProps>(
  ({ contentContainerStyle, extraBottomClearance = 10, children, ...props }, ref) => {
    const bottomPadding = useDashboardBottomPadding(extraBottomClearance);

    const mergedContentContainerStyle: StyleProp<ViewStyle> = [
      contentContainerStyle,
      { paddingBottom: bottomPadding },
    ];

    return (
      <ScrollView
        ref={ref}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        {...props}
        contentContainerStyle={mergedContentContainerStyle}
      >
        {children}
      </ScrollView>
    );
  }
);

DashboardScrollView.displayName = 'DashboardScrollView';
