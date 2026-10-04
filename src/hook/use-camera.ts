import * as ImagePicker from 'expo-image-picker';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export interface UseCameraOptions {
  aspect?: [number, number];
  quality?: number;
  allowsEditing?: boolean;
  onPhotoCaptured?: (uri: string) => void;
}

export function useCamera(options: UseCameraOptions = {}) {
  const {
    aspect = [3, 4],
    quality = 0.85,
    allowsEditing = true,
    onPhotoCaptured,
  } = options;

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const takePhoto = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Check current permission status first
       await ImagePicker.getCameraPermissionsAsync();

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing,
        aspect,
        quality,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const capturedUri = result.assets[0].uri;
        setPhotoUri(capturedUri);
        onPhotoCaptured?.(capturedUri);
        setIsLoading(false);
        return capturedUri;
      }

      setIsLoading(false);
      return null;
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Failed to capture photo';
      setError(errMsg);
      Alert.alert('Camera Error', errMsg);
      setIsLoading(false);
      return null;
    }
  }, [allowsEditing, aspect, quality, onPhotoCaptured]);

  const clearPhoto = useCallback(() => {
    setPhotoUri(null);
    setError(null);
  }, []);

  return {
    photoUri,
    setPhotoUri,
    takePhoto,
    isLoading,
    error,
    clearPhoto,
  };
}

export default useCamera;
