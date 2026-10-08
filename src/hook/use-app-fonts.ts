import { useFonts } from 'expo-font';

export function useAppFonts() {
  const [fontsLoaded, fontError] = useFonts({
    'RightGrotesk-Regular': require('../../assets/fonts/RightGrotesk-Regular.otf'),
    'RightGrotesk-Medium': require('../../assets/fonts/RightGrotesk-Medium.otf'),
    'RightGrotesk-Bold': require('../../assets/fonts/RightGrotesk-Bold.otf'),
    'RightGrotesk-Black': require('../../assets/fonts/RightGrotesk-Black.otf'),
  });

  return { fontsLoaded, fontError };
}
