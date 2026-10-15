import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Pressable, View } from 'react-native';
import { Calendar, ChevronDown, Flame, X } from 'lucide-react-native';
import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetModal,
  Button,
  Icon,
  Input,
  Text,
  Textarea,
} from '@/components/ui';
import { DatePickerSheet, DatePickerSheetRef } from '@/components/shared';

export interface AddCaloriesData {
  date: Date;
  calories: number;
  note?: string;
}

export interface AddCaloriesSheetProps {
  initialDate?: Date;
  initialCalories?: number;
  initialNote?: string;
  onAdd?: (data: AddCaloriesData) => void;
}

export interface AddCaloriesSheetRef {
  present: (
    customDate?: Date,
    customCalories?: number,
    customNote?: string,
    title?: string
  ) => void;
  dismiss: () => void;
}

export function formatCaloriesDateDisplay(date: Date): string {
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

export const AddCaloriesSheet = forwardRef<
  AddCaloriesSheetRef,
  AddCaloriesSheetProps
>(({ initialDate = new Date(), initialCalories, initialNote = '', onAdd }, ref) => {
  const insets = useSafeAreaInsets();
  const modalRef = useRef<GorhomBottomSheetModal>(null);
  const datePickerRef = useRef<DatePickerSheetRef>(null);

  const [date, setDate] = useState<Date>(initialDate);
  const [calories, setCalories] = useState<string>(
    initialCalories ? String(initialCalories) : ''
  );
  const [note, setNote] = useState<string>(initialNote);
  const [sheetTitle, setSheetTitle] = useState<string>('Today’s details');

  useImperativeHandle(ref, () => ({
    present: (
      customDate?: Date,
      customCalories?: number,
      customNote?: string,
      title?: string
    ) => {
      setDate(customDate || initialDate);
      setCalories(
        customCalories !== undefined
          ? String(customCalories)
          : initialCalories
          ? String(initialCalories)
          : ''
      );
      setNote(customNote !== undefined ? customNote : initialNote);
      setSheetTitle(title || 'Today’s details');
      modalRef.current?.present();
    },
    dismiss: () => {
      modalRef.current?.dismiss();
    },
  }));

  const handleOpenDatePicker = () => {
    datePickerRef.current?.present();
  };

  const handleAdd = () => {
    const numericCalories = parseInt(calories, 10);
    onAdd?.({
      date,
      calories: isNaN(numericCalories) ? 500 : numericCalories,
      note,
    });
    modalRef.current?.dismiss();
  };

  return (
    <>
      <BottomSheetModal
        ref={modalRef}
        enableDynamicSizing
        stackBehavior="push"
        contentClassName="px-5 pt-2 pb-6 gap-5"
        style={{ paddingBottom: insets.bottom }}
      >
        {/* Header Row: Title & Close Button */}
        <View className="flex-row items-center justify-between pb-1">
          <Text className="text-2xl font-bold text-foreground">
            {sheetTitle}
          </Text>

          <Pressable
            onPress={() => modalRef.current?.dismiss()}
            hitSlop={8}
            className="p-1 rounded-full active:opacity-60"
          >
            <Icon as={X} size={22} className="text-foreground" />
          </Pressable>
        </View>

        {/* 1. Date Field */}
        <View className="gap-2 w-full">
          <Text className="text-sm font-semibold text-foreground">
            Date
          </Text>

          <Pressable
            onPress={handleOpenDatePicker}
            className="h-16 w-full flex-row items-center justify-between rounded-2xl px-4 bg-card border-2 border-border active:opacity-85"
          >
            <View className="flex-row items-center gap-3 flex-1">
              <Icon as={Calendar} size={20} className="text-muted" />
              <Text className="text-base font-semibold text-foreground">
                {formatCaloriesDateDisplay(date)}
              </Text>
            </View>

            <Icon as={ChevronDown} size={18} className="text-muted" />
          </Pressable>
        </View>

        {/* 2. Calories Consumed Field */}
        <Input
          label="Calories Consumed"
          asBottomSheetInput
          value={calories}
          onChangeText={setCalories}
          placeholder="500"
          placeholderTextColor="#737373"
          keyboardType="numeric"
          leftIcon={<Icon as={Flame} size={20} className="text-muted" />}
          rightIcon={<Text className="text-sm font-medium text-muted">Kcal</Text>}
          className="h-16"
          inputClassName="text-base font-semibold text-foreground"
        />

        {/* 3. Note Field */}
        <Textarea
          label="Note"
          asBottomSheetInput
          value={note}
          onChangeText={setNote}
          placeholder="Lunch"
          placeholderTextColor="#737373"
          maxLength={200}
          showCount
          countPosition="bottom"
          className="h-36"
          inputClassName="text-base text-foreground"
        />

        {/* 4. Add Button */}
        <View className="pt-2">
          <Button
            title={sheetTitle.toLowerCase().includes('edit') ? 'Save' : 'Add'}
            variant="primary"
            size="lg"
            fullWidth
            className="h-16 rounded-2xl bg-brand"
            textClassName="text-inverse text-lg font-bold"
            onPress={handleAdd}
          />
        </View>
      </BottomSheetModal>

      {/* Date Picker Sheet */}
      <DatePickerSheet
        ref={datePickerRef}
        selectedDate={date}
        title="Select date"
        onSelectDate={setDate}
      />
    </>
  );
});

AddCaloriesSheet.displayName = 'AddCaloriesSheet';

export default AddCaloriesSheet;
