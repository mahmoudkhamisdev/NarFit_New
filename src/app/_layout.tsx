import { useEffect } from 'react';
import { THEME_STORAGE_KEY, ThemeTransitionProvider } from '@/lib/theme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { isExpoGo, useAppFonts, useAppUpdates } from '@/hook';
import '../global.css';
import { useResolveClassNames } from 'uniwind';

// Keep native splash screen visible until initialization and updates check complete
SplashScreen.preventAutoHideAsync().catch(() => { });

// Configure smooth fade transition for standalone/production builds
if (!isExpoGo) {
  SplashScreen.setOptions({
    duration: 400,
    fade: true,
  });
}

function RootLayoutContent({ theme }: { theme: any }) {
  const resolvedStyle = useResolveClassNames('text-background');
  const backgroundColor =
    (resolvedStyle?.backgroundColor as string) ??
    (resolvedStyle?.color as string) ??
    '#000000';

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor }}>
      <ThemeTransitionProvider initialTheme={theme ?? 'system'}>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'fade',
              animationDuration: 250,
              contentStyle: { backgroundColor },
            }}
          >
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
            <Stack.Screen name="notifications/index" />
          </Stack>
        </BottomSheetModalProvider>
      </ThemeTransitionProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  const { fontsLoaded, fontError } = useAppFonts();
  const { checkForUpdates } = useAppUpdates();

  let theme;
  try {
    theme = SecureStore.getItem(THEME_STORAGE_KEY) as any;
  } catch (error) {
    console.log(error);
  }

  useEffect(() => {
    async function prepareApp() {
      try {
        await checkForUpdates();
      } catch (error) {
        console.warn('Error during app updates check:', error);
      } finally {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync().catch(() => { });
        }
      }
    }

    if (fontsLoaded || fontError) {
      prepareApp();
    }
  }, [fontsLoaded, fontError, checkForUpdates]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <RootLayoutContent theme={theme} />;
}
