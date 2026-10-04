import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui';
import { COACH_AVATARS } from '@/constants/avatars';
import {
  defaultOnboardingValues,
  onboardingFormSchema,
  parseOnboardingForm,
  serializeOnboardingForm,
} from '@/schemas/onboarding';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from './_components/back-button';

const avatarStepSchema = onboardingFormSchema.pick({
  avatarId: true,
});

type AvatarStepValues = {
  avatarId?: string;
};

export default function ChooseAvatarScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ formState?: string }>();
  const initialValues = parseOnboardingForm(params.formState);

  const form = useForm<AvatarStepValues>({
    resolver: zodResolver(avatarStepSchema),
    defaultValues: {
      avatarId: initialValues.avatarId || defaultOnboardingValues.avatarId,
    },
  });

  const handleContinue = form.handleSubmit((stepData) => {
    const selectedAvatarId = stepData.avatarId || '1';
    const selectedAvatar = COACH_AVATARS.find((a) => a.id === selectedAvatarId);
    const resolvedUri = selectedAvatar
      ? Image.resolveAssetSource(selectedAvatar.image).uri
      : '';

    const updatedForm = {
      ...initialValues,
      avatarId: selectedAvatarId,
      photoUri: resolvedUri || `avatar-${selectedAvatarId}`,
    };

    // Return to Coach Profile Photo screen with chosen avatar
    router.replace({
      pathname: '/onboarding/coach-photo',
      params: { formState: serializeOnboardingForm(updatedForm) },
    });
  });

  return (
    <View
      className="flex-1 bg-card px-4"
      style={{
        paddingTop: insets.top + 12,
        paddingBottom: insets.bottom + 16,
      }}
    >
      <StatusBar style="auto" />

      {/* 1. Fixed Top Header with Back Button */}
      <View className="w-full">
        <BackButton />
      </View>

      {/* 2. Fixed Page Title */}
      <View className="w-full mt-4 mb-2">
        <Text className="text-5xl font-black tracking-tight text-foreground leading-[52px]">
          Choose{'\n'}Avatar
        </Text>
      </View>

      {/* 3. Scrollable Avatar Grid Container */}
      <ScrollView
        className="flex-1 p-1"
        contentContainerStyle={{
          paddingVertical: 8,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Form {...form}>
          <FormField
            control={form.control}
            name="avatarId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <View className="w-full flex-row flex-wrap justify-between gap-y-3.5">
                    {COACH_AVATARS.map((avatar) => {
                      const isSelected = (field.value || '1') === avatar.id;
                      return (
                        <Pressable
                          key={avatar.id}
                          onPress={() => field.onChange(avatar.id)}
                          className={`w-[22.5%] h-[105px] rounded-2xl overflow-hidden active:opacity-85 transition-all ${
                            isSelected
                              ? 'border-2 border-brand shadow-md scale-[1.03]'
                              : 'border border-border'
                          }`}
                          accessibilityRole="radio"
                          accessibilityState={{ selected: isSelected }}
                          accessibilityLabel={avatar.name}
                        >
                          <Image
                            source={avatar.image}
                            className="w-full h-full"
                            resizeMode="cover"
                          />
                        </Pressable>
                      );
                    })}
                  </View>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </ScrollView>

      {/* 4. Fixed Continue Button */}
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
    </View>
  );
}
