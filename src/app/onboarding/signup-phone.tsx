import { Button, Card, Icon, Input } from '@/components/ui';
import { Country, DEFAULT_COUNTRY } from '@/constants/countries';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ChevronDown } from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CountryPickerSheet, {
  CountryPickerSheetRef,
} from './_components/country-picker-sheet';

const greenBg = require('@/assets/images/on-boarding/green-bg.png');

export default function SignupPhoneScreen() {
  const insets = useSafeAreaInsets();
  const countryPickerRef = useRef<CountryPickerSheetRef>(null);

  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleOpenCountryPicker = () => {
    countryPickerRef.current?.present();
  };

  const handleSignUp = () => {
    // Navigate to OTP verification screen (Figma node 72:6849)
    router.push('/onboarding/otp');
  };

  return (
    <View className="dark flex-1 bg-[#000000]">
      <StatusBar style="light" />
      <ImageBackground
        source={greenBg}
        resizeMode="cover"
        className="flex-1"
        style={StyleSheet.absoluteFill}
      >
        {/* Subtle dark overlay for contrast */}
        <View
          style={StyleSheet.absoluteFill}
          className="bg-black/25"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              paddingTop: insets.top + 24,
              paddingBottom: insets.bottom + 16,
            }}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {/* Top flexible space to push content to bottom */}
            <View className="flex-1" />

            {/* Heading Section directly above the card */}
            <View className="items-center px-6 mb-5">
              <Text
                className="text-center text-[42px] font-extrabold tracking-tight text-[#f2f4f5] dark:text-foreground leading-tight"
              >
                Login or Sign up
              </Text>
              <Text className="mt-1 text-center text-base font-medium text-[#d1d5d8] dark:text-muted">
                Enter your phone number to continue
              </Text>
            </View>

            {/* Bottom Card Section directly below heading */}
            <View className="px-4">
              <Card className="rounded-4xl bg-card p-5 gap-4 border border-border/60 shadow-2xl">
                {/* Unified Country Picker & Phone Input in ONE Section */}
                <Input
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="010 1234 5678"
                  placeholderTextColor="#9ca3a7"
                  keyboardType="phone-pad"
                  multiline={false}
                  numberOfLines={1}
                  className="h-17.5 border-2"
                  inputClassName="text-lg font-semibold text-foreground"
                  leftIcon={
                    <Pressable
                      onPress={handleOpenCountryPicker}
                      className="h-9 flex-row items-center gap-2 pr-2 border-r border-border active:opacity-70"
                      accessibilityRole="button"
                      accessibilityLabel={`Selected country ${selectedCountry.name}, ${selectedCountry.code}. Tap to change country.`}
                    >
                      <Text className="text-2xl leading-none">{selectedCountry.flag}</Text>
                      <Text className="text-lg font-bold text-foreground">
                        {selectedCountry.code}
                      </Text>
                      <Icon as={ChevronDown} size={16} className="text-muted ml-0.5" />
                    </Pressable>
                  }
                />

                {/* Continue Button for both Login and Sign up */}
                <Button
                  title="Continue"
                  variant="primary"
                  size="lg"
                  className="h-17.5 w-full rounded-2xl shadow-md"
                  textClassName="text-lg font-bold"
                  onPress={handleSignUp}
                />
              </Card>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>

      {/* Country Selection Bottom Sheet (separated component) */}
      <CountryPickerSheet
        ref={countryPickerRef}
        selectedCountry={selectedCountry}
        onSelectCountry={setSelectedCountry}
      />
    </View>
  );
}
