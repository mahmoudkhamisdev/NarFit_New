import { Icon, Input } from '@/components/ui';
import { Country, DEFAULT_COUNTRY } from '@/constants/countries';
import { ChevronsUpDown } from 'lucide-react-native';
import React, { forwardRef, useRef, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  CountryPickerSheet,
  CountryPickerSheetRef,
} from './country-picker-sheet';

export interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  selectedCountry?: Country;
  onSelectCountry?: (country: Country) => void;
  error?: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  editable?: boolean;
}

export const PhoneInput = forwardRef<TextInput, PhoneInputProps>(
  (
    {
      value,
      onChangeText,
      onBlur,
      selectedCountry: controlledCountry,
      onSelectCountry,
      error,
      placeholder = 'Phone number',
      className = 'h-[74px]',
      inputClassName = 'text-base font-semibold text-foreground',
      editable = true,
    },
    ref
  ) => {
    const countryPickerRef = useRef<CountryPickerSheetRef>(null);
    const [internalCountry, setInternalCountry] = useState<Country>(DEFAULT_COUNTRY);

    const activeCountry = controlledCountry || internalCountry;

    const handleSelectCountry = (country: Country) => {
      if (!controlledCountry) {
        setInternalCountry(country);
      }
      onSelectCountry?.(country);
    };

    const handleOpenPicker = () => {
      if (!editable) return;
      countryPickerRef.current?.present();
    };

    const handleTextChange = (text: string) => {
      // Only digits allowed
      const cleanDigits = text.replace(/[^0-9]/g, '');
      onChangeText(cleanDigits);
    };

    return (
      <View className="w-full">
        <Input
          ref={ref}
          value={value}
          onChangeText={handleTextChange}
          onBlur={onBlur}
          placeholder={placeholder}
          keyboardType="phone-pad"
          multiline={false}
          numberOfLines={1}
          editable={editable}
          error={error}
          className={className}
          inputClassName={inputClassName}
          leftIcon={
            <Pressable
              onPress={handleOpenPicker}
              className="h-9 flex-row items-center gap-1.5 pr-2.5 border-r border-border active:opacity-70"
              accessibilityRole="button"
              accessibilityLabel={`Selected country ${activeCountry.name}, ${activeCountry.code}. Tap to change country.`}
            >
              <Text className="text-2xl leading-none">{activeCountry.flag}</Text>
              <Text className="text-base font-bold text-foreground">
                {activeCountry.code}
              </Text>
              <Icon as={ChevronsUpDown} size={15} className="text-muted ml-0.5" />
            </Pressable>
          }
        />

        <CountryPickerSheet
          ref={countryPickerRef}
          selectedCountry={activeCountry}
          onSelectCountry={handleSelectCountry}
        />
      </View>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
