import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui';
import { COACH_AVATARS } from '@/constants/avatars';
import { BRUSH_PATH } from '@/constants/brush-path';
import { useCamera, useGallery } from '@/hook';
import {
  defaultOnboardingValues,
  onboardingFormSchema,
  parseOnboardingForm,
  serializeOnboardingForm,
} from '@/schemas/onboarding';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Trash2 } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  ImageSourcePropType,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { ClipPath, Defs, G, Path, Image as SvgImage } from 'react-native-svg';
import { useResolveClassNames } from 'uniwind';
import BackButton from './_components/back-button';

const coachPhotoStepSchema = onboardingFormSchema.pick({
  photoUri: true,
  avatarId: true,
});

type CoachPhotoStepValues = {
  photoUri: string;
  avatarId?: string;
};

export default function CoachPhotoScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ formState?: string }>();
  const initialValues = parseOnboardingForm(params.formState);

  const form = useForm<CoachPhotoStepValues>({
    resolver: zodResolver(coachPhotoStepSchema),
    defaultValues: {
      photoUri: initialValues.photoUri || defaultOnboardingValues.photoUri,
      avatarId: initialValues.avatarId || defaultOnboardingValues.avatarId,
    },
    mode: 'onChange',
  });

  // Keep form in sync when returning from avatar selection or route params update
  useEffect(() => {
    if (params.formState) {
      const parsed = parseOnboardingForm(params.formState);
      if (parsed.photoUri) {
        form.setValue('photoUri', parsed.photoUri, { shouldValidate: true });
      }
      if (parsed.avatarId) {
        form.setValue('avatarId', parsed.avatarId);
      }
    }
  }, [params.formState, form]);

  // Dynamic variable colors resolved from global.css via Uniwind
  const brandResolved = useResolveClassNames('text-brand');
  const cardSubtleResolved = useResolveClassNames('text-card-subtle');
  const fgResolved = useResolveClassNames('text-foreground');
  const errorResolved = useResolveClassNames('text-error');

  const brandColor = (brandResolved?.color as string) || '#759900';
  const cardSubtleColor = (cardSubtleResolved?.color as string) || '#e5e7e9';
  const fgColor = (fgResolved?.color as string) || '#1a1a1a';
  const errorColor = (errorResolved?.color as string) || '#b42318';

  // Hook logic from @/hook
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

  // Continue proceeds directly to the completion screen (All Set)
  const handleContinue = form.handleSubmit((stepData) => {
    const updatedForm = {
      ...initialValues,
      ...stepData,
    };
    router.push({
      pathname: '/onboarding/all-set',
      params: { formState: serializeOnboardingForm(updatedForm) },
    });
  });

  // Navigate to Choose Avatar picker screen
  const handleChooseAvatar = () => {
    const currentValues = form.getValues();
    const updatedForm = {
      ...initialValues,
      photoUri: currentValues.photoUri,
      avatarId: currentValues.avatarId,
    };
    router.replace({
      pathname: '/onboarding/avatar',
      params: { formState: serializeOnboardingForm(updatedForm) },
    });
  };

  const handleClearImage = () => {
    form.setValue('photoUri', '', { shouldValidate: true });
    form.setValue('avatarId', '');
  };

  return (
    <View className="flex-1 bg-card">
      <StatusBar style="auto" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 16,
          },
        ]}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Back Button (Figma node 39:4739) */}
        <BackButton />

        {/* Page Title (Figma node 39:5972) */}
        <View className="w-full mt-4">
          <Text className="text-5xl font-black tracking-tight text-foreground leading-[52px]">
            Coach Profile{'\n'}Photo
          </Text>
        </View>

        {/* Selection Container with Form */}
        <Form {...form}>
          <FormField
            control={form.control}
            name="photoUri"
            render={({ field }) => {
              const currentAvatarId = form.getValues('avatarId');
              const avatarMatch = currentAvatarId
                ? COACH_AVATARS.find((a) => a.id === currentAvatarId)
                : null;

              let imageSource: ImageSourcePropType | null = null;
              if (avatarMatch) {
                imageSource = avatarMatch.image;
              } else if (field.value) {
                imageSource = { uri: field.value };
              }

              const hasImage = Boolean(imageSource);

              return (
                <FormItem className="flex-1 items-center justify-center py-3">
                  <FormControl>
                    <View className="items-center justify-center">
                      {/* Options Container (Figma node 39:6074) */}
                      <View style={styles.optionsContainer}>
                        {/* 1. Choose Avatar (Center/lower, Figma node 39:6075) */}
                        <View style={styles.avatarOptionWrapper}>
                          <Pressable
                            onPress={handleChooseAvatar}
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

                        {/* 2. Open Camera (Right, rotated 10.65deg, Figma node 39:6079) */}
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

                        {/* 3. Choose From Gallery (Left, rotated -11.82deg, Figma node 39:6083) */}
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

                      {/* Coach Image Container (Figma node 39:6087 - 209x272, rounded 24px) */}
                      <View className="size-80 items-center justify-center">
                        <Svg width="100%" height="100%" viewBox="0 0 345 347">
                          <Defs>
                            <ClipPath id="brushClip">
                              <Path d={BRUSH_PATH} />
                            </ClipPath>
                          </Defs>

                          {hasImage && imageSource ? (
                            <SvgImage
                              href={imageSource}
                              width={345}
                              height={347}
                              preserveAspectRatio="xMidYMid meet"
                              clipPath="url(#brushClip)"
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
              );
            }}
          />
        </Form>

        {/* Continue Button (Figma node 39:5969 - h: 72px, rounded: 16px) */}
        <View className="w-full pt-2">
          <Button
            title="Continue"
            variant="primary"
            size="lg"
            className="h-[72px] w-full rounded-2xl"
            textClassName="text-lg font-bold"
            onPress={handleContinue}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
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
