import { AvatarSelectionSheet, AvatarSelectionSheetRef } from '@/components/features/add-client/avatar-selection-sheet';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui';
import { COACH_AVATARS } from '@/constants/avatars';
import { BRUSH_PATH } from '@/constants/brush-path';
import { useCamera, useGallery } from '@/hook';
import { OnboardingFormValues } from '@/schemas/onboarding';
import { Trash2 } from 'lucide-react-native';
import React, { useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { ClipPath, Defs, G, Image as SvgImage, Path } from 'react-native-svg';
import { useResolveClassNames } from 'uniwind';

interface CoachPhotoStepProps {
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function CoachPhotoStep({ onSubmit, isSubmitting = false }: CoachPhotoStepProps) {
  const form = useFormContext<OnboardingFormValues>();
  const avatarSheetRef = useRef<AvatarSelectionSheetRef>(null);

  const photoUri = useWatch({ control: form.control, name: 'photoUri' });
  const avatarId = useWatch({ control: form.control, name: 'avatarId' });

  // Dynamic variable colors resolved from global.css via Uniwind
  const brandResolved = useResolveClassNames('text-brand');
  const cardSubtleResolved = useResolveClassNames('text-card-subtle');
  const fgResolved = useResolveClassNames('text-foreground');
  const errorResolved = useResolveClassNames('text-error');

  const brandColor = (brandResolved?.color as string) || '#759900';
  const cardSubtleColor = (cardSubtleResolved?.color as string) || '#e5e7e9';
  const fgColor = (fgResolved?.color as string) || '#1a1a1a';
  const errorColor = (errorResolved?.color as string) || '#b42318';

  // Camera & Gallery hooks from @/hook
  const { takePhoto, isLoading: isCameraLoading } = useCamera({
    onPhotoCaptured: (uri) => {
      form.setValue('avatarId', '');
      form.setValue('photoUri', uri, { shouldValidate: true });
    },
  });

  const { pickFromGallery, isLoading: isGalleryLoading } = useGallery({
    onImageSelected: (uri) => {
      form.setValue('avatarId', '');
      form.setValue('photoUri', uri, { shouldValidate: true });
    },
  });

  const handleOpenAvatarPicker = () => {
    avatarSheetRef.current?.present();
  };

  const handleClearImage = () => {
    form.setValue('photoUri', '', { shouldValidate: true });
    form.setValue('avatarId', '');
  };

  const handleContinue = async () => {
    const isValid = await form.trigger(['photoUri']);
    if (isValid) {
      onSubmit();
    }
  };

  // Determine current image preview source
  let imageSource: ImageSourcePropType | null = null;
  if (photoUri) {
    imageSource = { uri: photoUri };
  } else if (avatarId) {
    const found = COACH_AVATARS.find((a) => a.id === avatarId);
    if (found) imageSource = found.image;
  }

  const hasImage = Boolean(imageSource);

  return (
    <View className="flex-1 justify-between">
      {/* Top Header / Heading */}
      <View className="pt-2">
        <Text className="text-[40px] font-black tracking-tight text-foreground leading-[48px]">
          Coach profile{'\n'}photo
        </Text>
        <Text className="mt-2 text-xl font-bold text-foreground/80">
          Upload real photo or pick an avatar
        </Text>
      </View>

      {/* Center Interactive Options & Brush Canvas */}
      <FormField
        control={form.control}
        name="photoUri"
        render={() => (
          <FormItem className="flex-1 items-center justify-center py-4">
            <FormControl>
              <View className="items-center justify-center">
                {/* Options Container (Speech bubbles) */}
                <View style={styles.optionsContainer}>
                  {/* 1. Choose Avatar (Center/lower) */}
                  <View style={styles.avatarOptionWrapper}>
                    <Pressable
                      onPress={handleOpenAvatarPicker}
                      className="w-full h-13.5 bg-card-subtle rounded-2xl items-center justify-center px-3 border border-border"
                      accessibilityRole="button"
                      accessibilityLabel="Choose avatar"
                    >
                      <Text className="text-base font-medium text-foreground-secondary text-center">
                        Choose avatar
                      </Text>
                    </Pressable>
                    {/* Tail pointing down touching top of photo frame */}
                    <View style={styles.avatarTail}>
                      <Svg width={21.64} height={14.44} viewBox="0 0 21.64 14.44" fill="none">
                        <Path d="M10.82 14.44L0 0H21.64L10.82 14.44Z" fill={cardSubtleColor} />
                      </Svg>
                    </View>
                  </View>

                  {/* 2. Open Camera (Right, rotated 10.65deg) */}
                  <View style={styles.cameraOptionWrapper}>
                    <View style={{ transform: [{ rotate: '10.65deg' }] }}>
                      <Pressable
                        onPress={takePhoto}
                        disabled={isCameraLoading}
                        className="w-full h-13.5 bg-brand border border-border rounded-2xl items-center justify-center px-3 relative"
                        accessibilityRole="button"
                        accessibilityLabel="Open camera"
                      >
                        <Text className="text-base font-semibold text-inverse text-center">
                          Open camera
                        </Text>
                        {/* Tail pointing down */}
                        <View style={styles.cameraTail}>
                          <Svg width={21.64} height={14.44} viewBox="0 0 21.64 14.44" fill="none">
                            <Path d="M10.82 14.44L0 0H21.64L10.82 14.44Z" fill={brandColor} />
                          </Svg>
                        </View>
                      </Pressable>
                    </View>
                  </View>

                  {/* 3. Choose From Gallery (Left, rotated -11.82deg) */}
                  <View style={styles.galleryOptionWrapper}>
                    <View style={{ transform: [{ rotate: '-11.82deg' }] }}>
                      <Pressable
                        onPress={pickFromGallery}
                        disabled={isGalleryLoading}
                        className="w-full h-13.5 bg-card-subtle rounded-2xl items-center justify-center px-3 border border-border relative"
                        accessibilityRole="button"
                        accessibilityLabel="Choose from gallery"
                      >
                        <Text className="text-base font-medium text-foreground text-center">
                          Choose from gallery
                        </Text>
                        {/* Tail pointing down */}
                        <View style={styles.galleryTail}>
                          <Svg width={24.9} height={16.62} viewBox="0 0 24.9 16.62" fill="none">
                            <Path d="M12.45 16.62L0 0H24.9L12.45 16.62Z" fill={cardSubtleColor} />
                          </Svg>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                </View>

                {/* Coach Image Container */}
                <View className="size-80 items-center justify-center">
                  <Svg width="100%" height="100%" viewBox="0 0 345 347">
                    <Defs>
                      <ClipPath id="onboardingBrushClip">
                        <Path d={BRUSH_PATH} />
                      </ClipPath>
                    </Defs>

                    {hasImage && imageSource ? (
                      <SvgImage
                        href={imageSource}
                        width={345}
                        height={347}
                        preserveAspectRatio="xMidYMid slice"
                        clipPath="url(#onboardingBrushClip)"
                      />
                    ) : (
                      <G>
                        <Path
                          d={BRUSH_PATH}
                          fill={fgColor}
                          opacity={0.08}
                        />
                      </G>
                    )}
                  </Svg>

                  {hasImage && (
                    <Pressable
                      onPress={handleClearImage}
                      className="absolute bottom-10 right-4 w-9 h-9 rounded-full bg-card/90 border border-border items-center justify-center shadow-sm"
                      accessibilityLabel="Remove photo"
                    >
                      <Trash2 size={16} color={errorColor} />
                    </Pressable>
                  )}
                </View>
              </View>
            </FormControl>
            <FormMessage className="justify-center mt-2" />
          </FormItem>
        )}
      />

      {/* Continue Button */}
      <View className="w-full pt-4">
        <Button
          title="Continue"
          variant="primary"
          size="lg"
          className="h-[72px] w-full rounded-2xl shadow-md"
          textClassName="text-lg font-bold"
          loading={isSubmitting}
          disabled={isSubmitting}
          onPress={handleContinue}
        />
      </View>

      {/* Avatar Selection Bottom Sheet */}
      <AvatarSelectionSheet
        ref={avatarSheetRef}
        selectedAvatarId={avatarId || '1'}
        hasCustomPhoto={Boolean(photoUri && !avatarId)}
        onSelectAvatar={(id) => {
          const selected = COACH_AVATARS.find((a) => a.id === id);
          const uri = selected ? Image.resolveAssetSource(selected.image).uri : '';
          form.setValue('avatarId', id);
          form.setValue('photoUri', uri, { shouldValidate: true });
        }}
        onPhotoSelected={(uri) => {
          form.setValue('avatarId', '');
          form.setValue('photoUri', uri, { shouldValidate: true });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    width: 350,
    height: 105,
    position: 'relative',
    alignItems: 'flex-start',
  },
  avatarOptionWrapper: {
    position: 'absolute',
    left: 78,
    top: 57.58,
    width: 194.5,
    zIndex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  avatarTail: {
    position: 'absolute',
    top: 53.5,
    left: 86.43,
    width: 21.639,
    height: 14.441,
  },
  cameraOptionWrapper: {
    position: 'absolute',
    right: 10,
    top: 15,
    zIndex: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.16,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  cameraTail: {
    position: 'absolute',
    bottom: -13.5,
    right: 20,
    width: 21.639,
    height: 14.441,
  },
  galleryOptionWrapper: {
    position: 'absolute',
    left: 5,
    top: 10,
    zIndex: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.16,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  galleryTail: {
    position: 'absolute',
    bottom: -15.5,
    left: 33.31,
    width: 24.906,
    height: 16.621,
  },
});
