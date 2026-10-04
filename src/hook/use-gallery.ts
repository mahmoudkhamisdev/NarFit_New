import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

export interface UseGalleryOptions {
  aspect?: [number, number];
  quality?: number;
  allowsEditing?: boolean;
  onImageSelected?: (uri: string) => void;
}

export function useGallery(options: UseGalleryOptions = {}) {
  const {
    aspect = [3, 4],
    quality = 0.85,
    allowsEditing = true,
    onImageSelected,
  } = options;

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const pickFromGallery = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      await ImagePicker.getMediaLibraryPermissionsAsync();

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing,
        aspect,
        quality,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setPhotoUri(selectedUri);
        onImageSelected?.(selectedUri);
        setIsLoading(false);
        return selectedUri;
      }

      setIsLoading(false);
      return null;
    } catch (err) {
      const errMsg =
        err instanceof Error
          ? err.message
          : "Failed to select image from gallery";
      setError(errMsg);
      Alert.alert("Gallery Error", errMsg);
      setIsLoading(false);
      return null;
    }
  }, [allowsEditing, aspect, quality, onImageSelected]);

  const clearPhoto = useCallback(() => {
    setPhotoUri(null);
    setError(null);
  }, []);

  return {
    photoUri,
    setPhotoUri,
    pickFromGallery,
    isLoading,
    error,
    clearPhoto,
  };
}

export default useGallery;
