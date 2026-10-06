import {
  BottomSheetFlatList,
  BottomSheetModal,
  Icon,
} from '@/components/ui';
import { COACH_AVATARS } from '@/constants/avatars';
import { useCamera, useGallery } from '@/hook';
import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { Camera, Image as ImageIcon, X } from 'lucide-react-native';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface AvatarSelectionSheetRef {
  present: () => void;
  dismiss: () => void;
}

export interface AvatarSelectionSheetProps {
  selectedAvatarId?: string;
  hasCustomPhoto?: boolean;
  onSelectAvatar: (avatarId: string) => void;
  onPhotoSelected: (photoUri: string) => void;
}

export const AvatarSelectionSheet = forwardRef<
  AvatarSelectionSheetRef,
  AvatarSelectionSheetProps
>(({ selectedAvatarId = '1', hasCustomPhoto = false, onSelectAvatar, onPhotoSelected }, ref) => {
  const insets = useSafeAreaInsets();
  const sheetRef = useRef<GorhomBottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    present: () => {
      sheetRef.current?.present();
    },
    dismiss: () => {
      sheetRef.current?.dismiss();
    },
  }));

  // Camera & Gallery hooks from @/hook
  const { takePhoto, isLoading: isCameraLoading } = useCamera({
    aspect: [1, 1],
    quality: 0.8,
    onPhotoCaptured: (uri) => {
      onPhotoSelected(uri);
      sheetRef.current?.dismiss();
    },
  });

  const { pickFromGallery, isLoading: isGalleryLoading } = useGallery({
    aspect: [1, 1],
    quality: 0.8,
    onImageSelected: (uri) => {
      onPhotoSelected(uri);
      sheetRef.current?.dismiss();
    },
  });

  const handleSelectAvatarItem = (id: string) => {
    onSelectAvatar(id);
    sheetRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={sheetRef}
      snapPoints={['65%', '85%']}
      noBottomSheetView={true}
    >
      <View className="flex-1 px-5 pt-2 pb-6">
        {/* Header */}
        <View className="flex-row items-center justify-between pb-3">
          <Text className="text-xl font-bold text-foreground">Select Avatar</Text>
          <Pressable
            onPress={() => sheetRef.current?.dismiss()}
            className="h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-card active:opacity-70"
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Close avatar picker"
          >
            <Icon as={X} size={16} className="text-muted" />
          </Pressable>
        </View>

        {/* Camera / Gallery Quick Actions */}
        <View className="flex-row gap-3 pb-4">
          <Pressable
            onPress={() => pickFromGallery()}
            disabled={isGalleryLoading}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3.5 active:opacity-70"
            accessibilityRole="button"
            accessibilityLabel="Choose photo from gallery"
          >
            <Icon as={ImageIcon} size={18} className="text-foreground" />
            <Text className="text-sm font-semibold text-foreground">
              {isGalleryLoading ? 'Loading...' : 'Gallery'}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => takePhoto()}
            disabled={isCameraLoading}
            className="flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3.5 active:opacity-70"
            accessibilityRole="button"
            accessibilityLabel="Take photo with camera"
          >
            <Icon as={Camera} size={18} className="text-foreground" />
            <Text className="text-sm font-semibold text-foreground">
              {isCameraLoading ? 'Loading...' : 'Camera'}
            </Text>
          </Pressable>
        </View>

        {/* Avatars Grid */}
        <BottomSheetFlatList
          data={COACH_AVATARS}
          keyExtractor={(item) => item.id}
          numColumns={4}
          columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 20,
          }}
          renderItem={({ item }) => {
            const isSelected = !hasCustomPhoto && selectedAvatarId === item.id;
            return (
              <Pressable
                onPress={() => handleSelectAvatarItem(item.id)}
                className={`h-20 flex-1 overflow-hidden rounded-2xl active:opacity-85 ${
                  isSelected
                    ? 'border-2 border-brand shadow-md'
                    : 'border border-border'
                }`}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={item.name}
              >
                <Image
                  source={item.image}
                  className="h-full w-full"
                  resizeMode="cover"
                />
              </Pressable>
            );
          }}
        />
      </View>
    </BottomSheetModal>
  );
});

AvatarSelectionSheet.displayName = 'AvatarSelectionSheet';

export default AvatarSelectionSheet;
