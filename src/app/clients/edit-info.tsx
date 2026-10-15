import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Calendar, User } from 'lucide-react-native';
import Svg, { ClipPath, Defs, Image as SvgImage, Path } from 'react-native-svg';
import {
  BackButton,
  GenderSelect,
  LocationSelect,
  PhoneInput,
} from '@/components/shared';
import { Button, Icon, Input, Text } from '@/components/ui';
import { AvatarSelectionSheet, AvatarSelectionSheetRef } from '@/components/features/add-client';
import { COACH_AVATARS } from '@/constants/avatars';
import { BRUSH_PATH } from '@/constants/brush-path';
import { Country, DEFAULT_COUNTRY } from '@/constants/countries';

export default function EditClientInfoScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    initialName?: string;
    initialGender?: string;
    initialAge?: string;
    initialPhone?: string;
    initialLocation?: string;
    initialAvatarId?: string;
    initialPhotoUri?: string;
  }>();

  const clientId = params.id;
  void clientId;
  const avatarSheetRef = useRef<AvatarSelectionSheetRef>(null);

  // TODO: API - Fetch client personal info: GET /api/clients/${clientId}
  // Form states initialized with client's current data
  const [name, setName] = useState<string>(params.initialName || 'Mahmoud khamis');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>(
    (params.initialGender as any) || 'male'
  );
  const [age, setAge] = useState<string>(params.initialAge || '24');
  const [phoneNumber, setPhoneNumber] = useState<string>(
    params.initialPhone || '+201017130116'
  );
  const [location, setLocation] = useState<string>(
    params.initialLocation || 'Cairo, Egypt'
  );
  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [avatarId, setAvatarId] = useState<string>(params.initialAvatarId || '7');
  const [photoUri, setPhotoUri] = useState<string>(params.initialPhotoUri || '');

  // Validation errors
  const [errors, setErrors] = useState<{ name?: string; age?: string }>({});

  const handleOpenAvatarPicker = () => {
    avatarSheetRef.current?.present();
  };

  const currentAvatarSource = photoUri
    ? { uri: photoUri }
    : COACH_AVATARS.find((a) => a.id === avatarId)?.image || COACH_AVATARS[6].image;

  const handleSave = () => {
    const newErrors: { name?: string; age?: string } = {};
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    const numericAge = parseInt(age, 10);
    if (!age.trim() || isNaN(numericAge) || numericAge <= 0) {
      newErrors.age = 'Please enter a valid age';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    // TODO: API - Update client personal info: PATCH /api/clients/${clientId}
    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header Bar */}
        <View
          style={{ paddingTop: insets.top + 8 }}
          className="px-4 pb-2 bg-background z-20 flex-row items-center justify-between"
        >
          <BackButton onPress={() => router.back()} />

          <Text className="text-2xl font-bold tracking-tight text-foreground">
            Personal information
          </Text>

          <View className="h-12 w-12" />
        </View>

        {/* Scrollable Form Content */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: insets.bottom + 24,
            gap: 16,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar Section with Brush-Path SVG Clip and Tooltip */}
          <View className="items-center justify-center py-4">
            <View className="relative items-center justify-center">
              <Pressable
                onPress={handleOpenAvatarPicker}
                className="h-44 w-44 items-center justify-center active:opacity-85"
                accessibilityRole="button"
                accessibilityLabel="Client avatar. Tap to change"
              >
                <Svg width="100%" height="100%" viewBox="0 0 345 347">
                  <Defs>
                    <ClipPath id="clientBrushClipEdit">
                      <Path d={BRUSH_PATH} />
                    </ClipPath>
                  </Defs>

                  <SvgImage
                    href={currentAvatarSource}
                    width={345}
                    height={347}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#clientBrushClipEdit)"
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
                <View className="mr-5 -mt-1.5 h-2.5 w-2.5 rotate-45 border-b border-r border-border/80 bg-card-subtle" />
              </Pressable>
            </View>
          </View>

          {/* Form Fields */}
          <View className="gap-3.5">
            {/* 1. Name */}
            <Input
              value={name}
              onChangeText={(val) => {
                setName(val);
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Name"
              autoCapitalize="words"
              className="h-[74px]"
              inputClassName="text-base font-semibold text-foreground"
              leftIcon={<Icon as={User} size={22} className="text-muted" />}
              error={errors.name}
            />

            {/* 2. Gender Select */}
            <GenderSelect
              value={gender}
              onValueChange={setGender}
            />

            {/* 3. Age Input */}
            <Input
              value={age}
              onChangeText={(text) => {
                const clean = text.replace(/[^0-9]/g, '');
                setAge(clean);
                if (errors.age) setErrors((prev) => ({ ...prev, age: undefined }));
              }}
              placeholder="Age"
              keyboardType="number-pad"
              className="h-[74px]"
              inputClassName="text-base font-semibold text-foreground"
              leftIcon={<Icon as={Calendar} size={22} className="text-muted" />}
              error={errors.age}
              rightIcon={
                <Text className="text-base font-medium text-muted">Years</Text>
              }
            />

            {/* 4. Phone Input */}
            <PhoneInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
            />

            {/* 5. Location Select */}
            <LocationSelect
              value={location}
              onValueChange={setLocation}
            />
          </View>

          {/* Save Button */}
          <View className="pt-4">
            <Button
              title="Save changes"
              variant="primary"
              size="lg"
              className="h-[74px] w-full rounded-2xl shadow-md"
              textClassName="text-lg font-bold text-inverse"
              onPress={handleSave}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Avatar Selection Sheet */}
      <AvatarSelectionSheet
        ref={avatarSheetRef}
        selectedAvatarId={avatarId}
        hasCustomPhoto={Boolean(photoUri)}
        onSelectAvatar={(id) => {
          setAvatarId(id);
          setPhotoUri('');
        }}
        onPhotoSelected={(uri) => {
          setPhotoUri(uri);
          setAvatarId('');
        }}
      />
    </View>
  );
}
