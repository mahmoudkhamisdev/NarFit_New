import { Icon } from '@/components/ui';
import { Text } from '@/components/ui/text';
import { LocationItem } from '@/constants/locations';
import { ChevronDown, MapPin } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  LocationPickerSheet,
  LocationPickerSheetRef,
} from './location-picker-sheet';

export interface LocationSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export function LocationSelect({
  value,
  onValueChange,
  placeholder = 'Select location',
  error,
  className = 'h-[74px]',
  disabled = false,
}: LocationSelectProps) {
  const sheetRef = useRef<LocationPickerSheetRef>(null);
  const [isOpen, setIsOpen] = useState(false);

  const isError = Boolean(error);

  const handleOpen = () => {
    if (disabled) return;
    setIsOpen(true);
    sheetRef.current?.present();
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  const handleSelect = (item: LocationItem) => {
    onValueChange(item.name);
    setIsOpen(false);
  };

  const getTriggerStateClasses = () => {
    if (disabled) {
      return 'bg-card/50 border-border-subtle opacity-60';
    }
    if (isError) {
      return 'bg-card border-2 border-error';
    }
    if (isOpen) {
      return 'bg-card border-2 border-brand';
    }
    return 'bg-card border-border';
  };

  return (
    <View className="w-full">
      <Pressable
        disabled={disabled}
        onPress={handleOpen}
        className={`w-full flex-row items-center justify-between rounded-2xl border px-4 gap-3 ${getTriggerStateClasses()} ${className}`}
        accessibilityRole="button"
        accessibilityLabel={`Location selection: ${value || placeholder}`}
      >
        <View className="flex-1 flex-row items-center gap-3">
          <View className="items-center justify-center">
            <Icon as={MapPin} size={22} className="text-muted" />
          </View>
          <Text
            numberOfLines={1}
            className={`text-base ${
              value ? 'text-foreground font-semibold' : 'text-muted'
            }`}
          >
            {value || placeholder}
          </Text>
        </View>

        <Icon
          as={ChevronDown}
          size={20}
          className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </Pressable>

      <LocationPickerSheet
        ref={sheetRef}
        selectedLocation={value}
        onSelectLocation={handleSelect}
        onDismiss={handleDismiss}
      />
    </View>
  );
}

export default LocationSelect;
