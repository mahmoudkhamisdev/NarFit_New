import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetTextInput,
  Icon,
} from '@/components/ui';
import { COUNTRIES, Country } from '@/constants/countries';
import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { Check, Search, X } from 'lucide-react-native';
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface CountryPickerSheetProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
}

export interface CountryPickerSheetRef {
  present: () => void;
  dismiss: () => void;
}

const CountryPickerSheet = forwardRef<CountryPickerSheetRef, CountryPickerSheetProps>(
  ({ selectedCountry, onSelectCountry }, ref) => {
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

    const handleSelectCountry = useCallback(
      (country: Country) => {
        onSelectCountry(country);
        setIsSearchFocused(false);
        sheetRef.current?.dismiss();
      },
      [onSelectCountry]
    );

    const filteredCountries = useMemo(() => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) return COUNTRIES;
      return COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.iso.toLowerCase().includes(q)
      );
    }, [searchQuery]);

    const renderCountryItem = useCallback(
      ({ item }: { item: Country }) => {
        const isSelected =
          selectedCountry.iso === item.iso && selectedCountry.code === item.code;
        return (
          <Pressable
            onPress={() => handleSelectCountry(item)}
            className={`mx-5 mb-1.5 flex-row items-center justify-between rounded-2xl px-4 py-3.5 border ${isSelected
                ? 'border-brand bg-brand/10'
                : 'border-border/40 bg-card active:bg-muted/10'
              }`}
          >
            <View className="flex-row items-center gap-3.5 flex-1 pr-2">
              <Text className="text-2xl leading-none">{item.flag}</Text>
              <Text
                className={`text-base font-semibold ${isSelected ? 'text-brand' : 'text-foreground'
                  }`}
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text
                className={`text-base font-bold ${isSelected ? 'text-brand' : 'text-muted'
                  }`}
              >
                {item.code}
              </Text>
              {isSelected && <Icon as={Check} size={18} className="text-brand" />}
            </View>
          </Pressable>
        );
      },
      [selectedCountry, handleSelectCountry]
    );

    return (
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={['75%', '92%']}
        noBottomSheetView={true}
        onDismiss={() => setIsSearchFocused(false)}
      >
        <View className="flex-1 pt-2 pb-6">
          {/* Header */}
          <View className="px-5 pt-1 pb-3 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-foreground">Select Country</Text>
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

          {/* Search Input with Brand Border on Focus */}
          <View
            className={`mx-5 mb-3 h-12 flex-row items-center rounded-2xl border px-3.5 gap-2.5 bg-card ${isSearchFocused
                ? 'border-brand ring-1 ring-brand/40'
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
              placeholder="Search country or dial code..."
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

          {/* Countries List */}
          <BottomSheetFlatList
            data={filteredCountries}
            keyExtractor={(item) => `${item.iso}-${item.code}`}
            renderItem={renderCountryItem}
            contentContainerStyle={{
              paddingBottom: insets.bottom + 20,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
            ListEmptyComponent={
              <View className="py-12 items-center justify-center px-6">
                <Text className="text-base font-medium text-muted text-center">
                  No countries found matching &quot;{searchQuery}&quot;
                </Text>
              </View>
            }
          />
        </View>
      </BottomSheetModal>
    );
  }
);

CountryPickerSheet.displayName = 'CountryPickerSheet';

export default CountryPickerSheet;
