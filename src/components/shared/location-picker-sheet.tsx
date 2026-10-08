import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
  Icon,
} from '@/components/ui';
import { LocationItem, LOCATIONS } from '@/constants/locations';
import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { Check, MapPin, Search, X } from 'lucide-react-native';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface LocationPickerSheetProps {
  selectedLocation?: string;
  onSelectLocation: (location: LocationItem) => void;
  onDismiss?: () => void;
}

export interface LocationPickerSheetRef {
  present: () => void;
  dismiss: () => void;
}

export const LocationPickerSheet = forwardRef<LocationPickerSheetRef, LocationPickerSheetProps>(
  ({ selectedLocation, onSelectLocation, onDismiss }, ref) => {
    const insets = useSafeAreaInsets();
    const sheetRef = useRef<GorhomBottomSheetModal>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useImperativeHandle(ref, () => ({
      present: () => {
        setSearchQuery('');
        setIsSearchFocused(false);
        sheetRef.current?.present();
      },
      dismiss: () => {
        setIsSearchFocused(false);
        sheetRef.current?.dismiss();
      },
    }));

    const handleSelectLocation = useCallback(
      (location: LocationItem) => {
        onSelectLocation(location);
        setIsSearchFocused(false);
        sheetRef.current?.dismiss();
      },
      [onSelectLocation]
    );

    const handleSheetDismiss = useCallback(() => {
      setIsSearchFocused(false);
      onDismiss?.();
    }, [onDismiss]);

    const filteredLocations = useMemo(() => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return LOCATIONS;
      return LOCATIONS.filter((loc) => loc.name.toLowerCase().includes(q));
    }, [searchQuery]);

    const renderLocationItem = useCallback(
      ({ item }: { item: LocationItem }) => {
        const isSelected =
          Boolean(selectedLocation) &&
          (selectedLocation || '').trim().toLowerCase() === item.name.toLowerCase();

        return (
          <Pressable
            onPress={() => handleSelectLocation(item)}
            className={`mx-5 mb-2 flex-row items-center justify-between rounded-2xl px-4 py-3.5 border ${
              isSelected
                ? 'border-brand bg-brand/10'
                : 'border-border/40 bg-card active:bg-muted/10'
            }`}
          >
            <View className="flex-row items-center gap-3 flex-1 pr-2">
              <Icon
                as={MapPin}
                size={20}
                className={isSelected ? 'text-brand' : 'text-muted'}
              />
              <Text
                className={`text-base font-semibold ${
                  isSelected ? 'text-brand' : 'text-foreground'
                }`}
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </View>

            {isSelected && <Icon as={Check} size={18} className="text-brand" />}
          </Pressable>
        );
      },
      [selectedLocation, handleSelectLocation]
    );

    return (
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={['75%', '92%']}
        noBottomSheetView={true}
        onDismiss={handleSheetDismiss}
      >
        <View className="flex-1 pt-2 pb-6">
          {/* Header */}
          <View className="px-5 pt-1 pb-3 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-foreground">Select Location</Text>
            <Pressable
              onPress={() => {
                setIsSearchFocused(false);
                sheetRef.current?.dismiss();
              }}
              className="w-8 h-8 rounded-full bg-card items-center justify-center border border-border/50 active:opacity-70"
              hitSlop={8}
            >
              <Icon as={X} size={16} className="text-muted" />
            </Pressable>
          </View>

          {/* Search Input */}
          <View
            className={`mx-5 mb-3 h-12 flex-row items-center rounded-2xl border px-3.5 gap-2.5 bg-card ${
              isSearchFocused
                ? 'border-2 border-brand'
                : 'border-border/80'
            }`}
          >
            <Icon
              as={Search}
              size={18}
              className={isSearchFocused ? 'text-brand' : 'text-muted'}
            />
            <BottomSheetTextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search city..."
              placeholderTextColor="#888888"
              className="flex-1 text-base text-foreground"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')} hitSlop={10}>
                <Icon as={X} size={16} className="text-muted" />
              </Pressable>
            )}
          </View>

          {/* Locations List */}
          <BottomSheetFlatList
            data={filteredLocations}
            keyExtractor={(item) => item.id}
            renderItem={renderLocationItem}
            contentContainerStyle={{
              paddingBottom: insets.bottom + 20,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={
              <View className="py-12 items-center justify-center px-6">
                <Text className="text-base font-medium text-muted text-center">
                  No locations found matching &quot;{searchQuery}&quot;
                </Text>
              </View>
            }
          />
        </View>
      </BottomSheetModal>
    );
  }
);

LocationPickerSheet.displayName = 'LocationPickerSheet';

export default LocationPickerSheet;
