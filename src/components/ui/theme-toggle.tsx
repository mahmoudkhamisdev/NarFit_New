import { Icon } from './icon';
import { Moon, Sun } from 'lucide-react-native';
import React from 'react';
import { Pressable } from 'react-native';
import { Uniwind, useUniwind } from 'uniwind';

export interface ThemeToggleProps {
  size?: number;
  className?: string;
  iconClassName?: string;
}

export function ThemeToggle({
  size = 20,
  className = 'h-10 w-10 items-center justify-center rounded-2xl bg-card border border-border active:opacity-75',
  iconClassName = 'text-foreground',
}: ThemeToggleProps) {
  const { theme } = useUniwind();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    Uniwind.setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <Pressable
      onPress={toggleTheme}
      hitSlop={8}
      className={className}
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <Icon
        as={isDark ? Sun : Moon}
        size={size}
        className={iconClassName}
      />
    </Pressable>
  );
}

export default ThemeToggle;
