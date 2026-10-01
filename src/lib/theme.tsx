import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useRef } from 'react';
import { Appearance } from 'react-native';
import { Easing } from 'react-native-reanimated';
import { createThemeTransition } from 'react-native-theme-transition';
import { Uniwind } from 'uniwind';


export const THEME_STORAGE_KEY = 'narfit_heme';

// createThemeTransition needs token objects — we use a single 'name' token
// since actual colors come from Uniwind CSS variables in global.css
const { ThemeTransitionProvider: _Provider, useTheme } = createThemeTransition({
  themes: {
    light: { name: 'light' },
    dark: { name: 'dark' },
  },
  darkThemes: ['dark'],
  transition: 'circularReveal',
  onThemeChange: (name) => {
    // Keep Uniwind CSS variables and AsyncStorage in sync
    Uniwind.setTheme(name as 'light' | 'dark');
    SecureStore.setItemAsync(THEME_STORAGE_KEY, name).catch(() => null);
  },
});

export type { SetThemeOptions } from 'react-native-theme-transition';
export { Easing, useTheme };

// Read saved theme once at module load — cache for synchronous access
let _cache: 'light' | 'dark' | 'system' | null = null;

SecureStore.getItemAsync(THEME_STORAGE_KEY)
  .then((v) => { _cache = v === 'light' || v === 'dark' ? v : 'system'; })
  .catch(() => { _cache = 'system'; });

export function getInitialTheme(): 'light' | 'dark' | 'system' {
  if (_cache !== null) return _cache;
  return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
}

// Syncs Uniwind whenever theme changes — must render inside _Provider
function UniwindSync() {
  const { theme } = useTheme();
  const prev = useRef<string | null>(null);
  useEffect(() => {
    if (prev.current !== theme.name) {
      prev.current = theme.name;
      Uniwind.setTheme(theme.name as 'light' | 'dark');
    }
  }, [theme.name]);
  return null;
}

export function ThemeTransitionProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: 'light' | 'dark' | 'system';
}) {
  return (
    <_Provider initialTheme={initialTheme ?? getInitialTheme()}>
      <UniwindSync />
      {children}
    </_Provider>
  );
}
