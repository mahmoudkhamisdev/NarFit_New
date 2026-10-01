import { Moon, Sun } from 'lucide-react-native';
import React, { useRef } from 'react';
import { Pressable, View } from 'react-native';
import { Easing } from 'react-native-reanimated';
import type { TransitionType } from 'react-native-theme-transition';
import { useTheme } from '@/lib/theme';

export interface ThemeToggleProps {
  duration?: number;
  transition?: TransitionType;
  size?: number;
  children?: React.ReactNode | ((isDark: boolean) => React.ReactNode);
  className?: string;
}

export function ThemeToggle({
  duration = 900,
  transition = 'circularReveal',
  size = 22,
  children,
  className = 'h-12 w-12 rounded-2xl bg-brand',
}: ThemeToggleProps) {
  const { theme, setTheme, isTransitioning } = useTheme();
  const isDark = theme.scheme === 'dark';
  const ref = useRef<View>(null);

  const onPress = () => {
    if (isTransitioning) return;
    setTheme(isDark ? 'light' : 'dark', {
      transition,
      origin: ref as React.RefObject<View | null>,
      duration,
      inverted: isDark,
      easing: Easing.inOut(Easing.cubic),
    });
  };

  return (
    <Pressable
      ref={ref}
      onPress={onPress}
      disabled={isTransitioning}
      style={{ opacity: 1 }}
      className={`items-center justify-center ${className}`}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {typeof children === 'function'
        ? children(isDark)
        : children ?? (isDark
            ? <Sun size={size} color="#000000" strokeWidth={2} />
            : <Moon size={size} color="#ffffff" strokeWidth={2} />)}
    </Pressable>
  );
}
