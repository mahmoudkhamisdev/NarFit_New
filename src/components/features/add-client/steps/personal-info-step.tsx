import { GenderSelect, LocationSelect, PhoneInput } from '@/components/shared';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Icon,
  Input,
} from '@/components/ui';
import { COACH_AVATARS } from '@/constants/avatars';
import { BRUSH_PATH } from '@/constants/brush-path';
import { Country, DEFAULT_COUNTRY } from '@/constants/countries';
import { AddClientFormValues } from '@/schemas/client';
import { Calendar, User } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import {
  ImageSourcePropType,
  Pressable,
  View,
} from 'react-native';
import Svg, { ClipPath, Defs, Image as SvgImage, Path } from 'react-native-svg';
import {
  AvatarSelectionSheet,
  AvatarSelectionSheetRef,
} from '../avatar-selection-sheet';
import { Text } from '@/components/ui/text';

interface PersonalInfoStepProps {
  onContinue: () => void;
}

export function PersonalInfoStep({ onContinue }: PersonalInfoStepProps) {
  const form = useFormContext<AddClientFormValues>();
  const avatarSheetRef = useRef<AvatarSelectionSheetRef>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY);

  const avatarId = useWatch({ control: form.control, name: 'avatarId' });
  const photoUri = useWatch({ control: form.control, name: 'photoUri' });

  const handleOpenAvatarPicker = () => {
    avatarSheetRef.current?.present();
  };

  const handleContinue = async () => {
    const isValid = await form.trigger([
      'name',
      'gender',
      'countryCode',
      'phoneNumber',
      'location',
      'age',
    ]);
    if (isValid) {
      onContinue();
    }
  };

  // Resolve current avatar image source
  const currentAvatarSource: ImageSourcePropType = photoUri
    ? { uri: photoUri }
    : COACH_AVATARS.find((a) => a.id === (avatarId || '1'))?.image || COACH_AVATARS[0].image;

  return (
    <View className="flex-1">
      {/* Avatar Section with Brush-Path SVG Clip and "Tap to change" tooltip */}
      <View className="items-center justify-center py-6">
        <View className="relative items-center justify-center">
          <Pressable
            onPress={handleOpenAvatarPicker}
            className="h-44 w-44 items-center justify-center active:opacity-85"
            accessibilityRole="button"
            accessibilityLabel="Client avatar. Tap to change"
          >
            <Svg width="100%" height="100%" viewBox="0 0 345 347">
              <Defs>
                <ClipPath id="clientBrushClip">
                  <Path d={BRUSH_PATH} />
                </ClipPath>
              </Defs>

              <SvgImage
                href={currentAvatarSource}
                width={345}
                height={347}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clientBrushClip)"
              />
            </Svg>
          </Pressable>

          {/* Tooltip speech bubble */}
          <Pressable
            onPress={handleOpenAvatarPicker}
            className="absolute -top-3.5 -right-5 items-end active:opacity-80 rotate-12 z-10"
            accessibilityRole="button"
            accessibilityLabel="Tap to change avatar"
          >
            <View className="rounded-2xl border border-border/80 bg-card-subtle px-3.5 py-2.5 shadow-md">
              <Text className="text-xs font-semibold text-foreground">
                Tap to change
              </Text>
            </View>
            {/* Pointer beak attached underneath */}
            <View className="mr-5 -mt-1.5 h-2.5 w-2.5 rotate-45 border-b border-r border-border/80 bg-card-subtle" />
          </Pressable>
        </View>
      </View>

      {/* Form Fields Container */}
      <View className="gap-3.5 pt-2">
        {/* 1. Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Name"
                  autoCapitalize="words"
                  className="h-[74px]"
                  inputClassName="text-base font-semibold text-foreground"
                  leftIcon={<Icon as={User} size={22} className="text-muted" />}
                  error={fieldState.error?.message}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 2. Gender Select Component */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <GenderSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  error={fieldState.error?.message}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 3. Phone Input Component */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <PhoneInput
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  selectedCountry={selectedCountry}
                  error={fieldState.error?.message}
                  onSelectCountry={(country) => {
                    setSelectedCountry(country);
                    form.setValue('countryCode', country.code);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 4. Age Input (Numbers only) */}
        <FormField
          control={form.control}
          name="age"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  value={field.value !== undefined && field.value !== null ? String(field.value) : ''}
                  onChangeText={(text) => {
                    const clean = text.replace(/[^0-9]/g, '');
                    field.onChange(clean);
                  }}
                  onBlur={field.onBlur}
                  placeholder="Age"
                  keyboardType="number-pad"
                  className="h-[74px]"
                  inputClassName="text-base font-semibold text-foreground"
                  leftIcon={<Icon as={Calendar} size={22} className="text-muted" />}
                  error={fieldState.error?.message}
                  rightIcon={
                    <Text className="text-base font-medium text-muted">Years</Text>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 5. Location Select Component */}
        <FormField
          control={form.control}
          name="location"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <LocationSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  error={fieldState.error?.message}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </View>

      {/* Continue Button */}
      <View className="pt-4">
        <Button
          title="Continue"
          variant="primary"
          size="lg"
          className="h-[74px] w-full rounded-2xl shadow-md"
          textClassName="text-lg font-bold text-inverse"
          onPress={handleContinue}
        />
      </View>

      {/* Avatar Selection Sheet */}
      <AvatarSelectionSheet
        ref={avatarSheetRef}
        selectedAvatarId={avatarId}
        hasCustomPhoto={Boolean(photoUri)}
        onSelectAvatar={(id) => {
          form.setValue('avatarId', id);
          form.setValue('photoUri', undefined);
        }}
        onPhotoSelected={(uri) => {
          form.setValue('photoUri', uri);
          form.setValue('avatarId', undefined);
        }}
      />
    </View>
  );
}
