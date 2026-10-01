import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';
import { THEME_STORAGE_KEY, ThemeTransitionProvider } from '@/lib/theme';
import * as SecureStore from 'expo-secure-store';

export default function RootLayout() {
  let theme;
  try {
    theme = SecureStore.getItem(THEME_STORAGE_KEY) as any
  } catch (error) {
    console.log(error)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeTransitionProvider initialTheme={theme ?? "system"}>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </BottomSheetModalProvider>
      </ThemeTransitionProvider>
    </GestureHandlerRootView>
  );
}
