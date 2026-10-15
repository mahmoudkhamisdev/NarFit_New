import React, { useRef } from 'react';
import { Pressable, View } from 'react-native';
import { Calendar, ChevronDown } from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';
import { DatePickerSheet, DatePickerSheetRef } from '@/components/shared';

export interface AddMeasurementDateCardProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function formatDateDisplay(date: Date): string {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Add ordinal suffix: 1st, 2nd, 3rd, 4th...
  const suffix =
    day === 1 || day === 21 || day === 31
      ? 'st'
      : day === 2 || day === 22
      ? 'nd'
      : day === 3 || day === 23
      ? 'rd'
      : 'th';

  return `${month} ${day}${suffix}, ${year}`;
}

export function AddMeasurementDateCard({
  selectedDate,
  onDateChange,
}: AddMeasurementDateCardProps) {
  const sheetRef = useRef<DatePickerSheetRef>(null);

  const handleOpenSheet = () => {
    sheetRef.current?.present();
  };

  return (
    <>
      <View className="bg-card rounded-xl p-3.5 border border-border/50 gap-2.5 w-full">
        <Text className="text-xl font-bold text-foreground">Date</Text>

        <Pressable
          onPress={handleOpenSheet}
          className="h-14! rounded-xl border border-border-strong bg-surface flex-row items-center justify-between px-3.5 active:opacity-75"
        >
          <View className="flex-row items-center gap-2.5">
            <Icon as={Calendar} size={20} className="text-muted" />
            <Text className="text-base font-semibold text-foreground">
              {formatDateDisplay(selectedDate)}
            </Text>
          </View>
          <Icon as={ChevronDown} size={18} className="text-muted" />
        </Pressable>
      </View>

      {/* Date Picker BottomSheet */}
      <DatePickerSheet
        ref={sheetRef}
        selectedDate={selectedDate}
        onSelectDate={onDateChange}
      />
    </>
  );
}
