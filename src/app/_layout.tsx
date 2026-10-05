import { THEME_STORAGE_KEY, ThemeTransitionProvider } from '@/lib/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';

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
            <Stack.Screen name="onboarding/welcome" />
            <Stack.Screen name="onboarding/signup-phone" />
            <Stack.Screen name="onboarding/otp" />
            <Stack.Screen name="onboarding/profile" />
            <Stack.Screen
              name="onboarding/all-set"
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen name="add-client/index" />
            <Stack.Screen
              name="add-client/success"
              options={{ gestureEnabled: false }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </ThemeTransitionProvider>
    </GestureHandlerRootView>
  );
}
