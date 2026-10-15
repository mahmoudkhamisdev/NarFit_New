import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Pressable, View } from 'react-native';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react-native';
import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeSlideIn, ScalePop } from 'react-native-animation-kit';
import { BottomSheetModal, Button, Icon, Text } from '@/components/ui';

export interface DatePickerSheetProps {
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
  title?: string;
  stackBehavior?: 'push' | 'replace';
}

export interface DatePickerSheetRef {
  present: () => void;
  dismiss: () => void;
}

type PickerViewMode = 'days' | 'months' | 'years';

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const MONTH_NAMES = [
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

export const DatePickerSheet = forwardRef<DatePickerSheetRef, DatePickerSheetProps>(
  (
    {
      selectedDate = new Date(),
      onSelectDate,
      title = 'Select date',
      stackBehavior = 'push',
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const sheetRef = useRef<GorhomBottomSheetModal>(null);

    const [tempDate, setTempDate] = useState<Date>(selectedDate);
    const [viewYear, setViewYear] = useState<number>(selectedDate.getFullYear());
    const [viewMonth, setViewMonth] = useState<number>(selectedDate.getMonth());
    const [viewMode, setViewMode] = useState<PickerViewMode>('days');
    const [yearRangeStart, setYearRangeStart] = useState<number>(
      Math.floor(selectedDate.getFullYear() / 12) * 12
    );

    useImperativeHandle(ref, () => ({
      present: () => {
        setTempDate(selectedDate);
        setViewYear(selectedDate.getFullYear());
        setViewMonth(selectedDate.getMonth());
        setViewMode('days');
        setYearRangeStart(Math.floor(selectedDate.getFullYear() / 12) * 12);
        sheetRef.current?.present();
      },
      dismiss: () => {
        sheetRef.current?.dismiss();
      },
    }));

    // Month navigation in days view
    const handlePrevMonth = () => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    };

    const handleNextMonth = () => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    };

    // Calculate calendar days
    const calendarDays = useMemo(() => {
      const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

      const days: { date: Date; isCurrentMonth: boolean }[] = [];

      // Prev month trailing days
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        days.push({
          date: new Date(viewYear, viewMonth - 1, daysInPrevMonth - i),
          isCurrentMonth: false,
        });
      }

      // Current month days
      for (let i = 1; i <= daysInMonth; i++) {
        days.push({
          date: new Date(viewYear, viewMonth, i),
          isCurrentMonth: true,
        });
      }

      // Next month leading days to complete grid (multiples of 7)
      const remaining = 7 - (days.length % 7);
      if (remaining < 7) {
        for (let i = 1; i <= remaining; i++) {
          days.push({
            date: new Date(viewYear, viewMonth + 1, i),
            isCurrentMonth: false,
          });
        }
      }

      return days;
    }, [viewYear, viewMonth]);

    // Generate years for year selection (12 years)
    const years = useMemo(() => {
      return Array.from({ length: 12 }, (_, i) => yearRangeStart + i);
    }, [yearRangeStart]);

    const handleConfirm = useCallback(() => {
      onSelectDate(tempDate);
      sheetRef.current?.dismiss();
    }, [onSelectDate, tempDate]);

    const isSameDay = (d1: Date, d2: Date) =>
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear();

    return (
      <BottomSheetModal
        ref={sheetRef}
        enablePanDownToClose
        stackBehavior={stackBehavior}
      >
        <View
          className="w-full gap-4"
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        >
          {/* Top Title - Large, no X, no border */}
          <Text className="text-2xl font-bold text-foreground">
            {title}
          </Text>

          {/* DAYS VIEW */}
          {viewMode === 'days' && (
            <FadeSlideIn direction="left" distance={15} duration={200}>
              <View className="gap-3.5 w-full">
                {/* Month / Year Navigator Row */}
                <View className="flex-row items-center justify-between py-1 px-1">
                  <Pressable
                    onPress={() => setViewMode('months')}
                    className="flex-row items-center gap-1 active:opacity-70"
                  >   
                    <Text className="text-lg font-bold text-foreground">
                      {MONTH_NAMES[viewMonth]} {viewYear}
                    </Text>
                    <Icon as={ChevronRight} size={18} className="text-muted" />
                  </Pressable>

                  {/* Ghost Previous / Next Buttons */}
                  <View className="flex-row items-center gap-1">
                    <Pressable
                      onPress={handlePrevMonth}
                      className="p-2 rounded-full active:opacity-60"
                      accessibilityLabel="Previous month"
                    >
                      <Icon as={ChevronLeft} size={20} className="text-foreground" />
                    </Pressable>
                    <Pressable
                      onPress={handleNextMonth}
                      className="p-2 rounded-full active:opacity-60"
                      accessibilityLabel="Next month"
                    >
                      <Icon as={ChevronRight} size={20} className="text-foreground" />
                    </Pressable>
                  </View>
                </View>

                {/* Days of Week Row */}
                <View className="flex-row items-center justify-between w-full px-1">
                  {DAYS_OF_WEEK.map((day) => (
                    <View key={day} className="w-[13%] items-center">
                      <Text className="text-xs font-medium text-muted">{day}</Text>
                    </View>
                  ))}
                </View>

                {/* Calendar Days Grid */}
                <View className="flex-row flex-wrap justify-between w-full px-1 gap-y-2">
                  {calendarDays.map((item, index) => {
                    const isSelected = isSameDay(item.date, tempDate);

                    return (
                      <Pressable
                        key={`day-${item.date.toISOString()}-${index}`}
                        onPress={() => {
                          setTempDate(item.date);
                          if (!item.isCurrentMonth) {
                            setViewMonth(item.date.getMonth());
                            setViewYear(item.date.getFullYear());
                          }
                        }}
                        className="w-[13%] items-center justify-center h-10"
                      >
                        {isSelected ? (
                          <ScalePop>
                            <View className="size-9 rounded-full bg-brand items-center justify-center shadow-sm">
                              <Text className="text-sm font-bold text-inverse">
                                {item.date.getDate()}
                              </Text>
                            </View>
                          </ScalePop>
                        ) : (
                          <View className="size-9 rounded-full items-center justify-center">
                            <Text
                              className={`text-sm ${
                                item.isCurrentMonth
                                  ? 'font-medium text-foreground'
                                  : 'font-normal text-disabled'
                              }`}
                            >
                              {item.date.getDate()}
                            </Text>
                          </View>
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </FadeSlideIn>
          )}

          {/* MONTHS VIEW */}
          {viewMode === 'months' && (
            <FadeSlideIn direction="right" distance={20} duration={220}>
              <View className="gap-3.5 w-full">
                {/* Year Navigator Row */}
                <View className="flex-row items-center justify-between py-1 px-1">
                  <Pressable
                    onPress={() => setViewMode('years')}
                    className="flex-row items-center gap-1 active:opacity-70"
                  >
                    <Text className="text-lg font-bold text-foreground">
                      {viewYear}
                    </Text>
                    <Icon as={ChevronRight} size={18} className="text-muted" />
                  </Pressable>

                  {/* Ghost Previous / Next Year Buttons */}
                  <View className="flex-row items-center gap-1">
                    <Pressable
                      onPress={() => setViewYear((y) => y - 1)}
                      className="p-2 rounded-full active:opacity-60"
                      accessibilityLabel="Previous year"
                    >
                      <Icon as={ChevronLeft} size={20} className="text-foreground" />
                    </Pressable>
                    <Pressable
                      onPress={() => setViewYear((y) => y + 1)}
                      className="p-2 rounded-full active:opacity-60"
                      accessibilityLabel="Next year"
                    >
                      <Icon as={ChevronRight} size={20} className="text-foreground" />
                    </Pressable>
                  </View>
                </View>

                {/* 12 Months Grid */}
                <View className="flex-row flex-wrap justify-between gap-y-2.5 py-1">
                  {MONTH_NAMES.map((name, idx) => {
                    const isSelectedMonth = idx === viewMonth;

                    return (
                      <Pressable
                        key={name}
                        onPress={() => {
                          setViewMonth(idx);
                          setViewMode('days');
                        }}
                        className={`w-[31%] h-12 rounded-xl items-center justify-center active:opacity-75 ${
                          isSelectedMonth
                            ? 'bg-brand shadow-sm'
                            : 'bg-surface border border-border/60'
                        }`}
                      >
                        <Text
                          className={`text-sm ${
                            isSelectedMonth
                              ? 'font-bold text-inverse'
                              : 'font-medium text-foreground'
                          }`}
                        >
                          {name.slice(0, 3)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </FadeSlideIn>
          )}

          {/* YEARS VIEW */}
          {viewMode === 'years' && (
            <FadeSlideIn direction="right" distance={20} duration={220}>
              <View className="gap-3.5 w-full">
                {/* Year Range Navigator Row */}
                <View className="flex-row items-center justify-between py-1 px-1">
                  <Text className="text-lg font-bold text-foreground">
                    {yearRangeStart} – {yearRangeStart + 11}
                  </Text>

                  {/* Ghost Previous / Next Range Buttons */}
                  <View className="flex-row items-center gap-1">
                    <Pressable
                      onPress={() => setYearRangeStart((y) => y - 12)}
                      className="p-2 rounded-full active:opacity-60"
                    >
                      <Icon as={ChevronLeft} size={20} className="text-foreground" />
                    </Pressable>
                    <Pressable
                      onPress={() => setYearRangeStart((y) => y + 12)}
                      className="p-2 rounded-full active:opacity-60"
                    >
                      <Icon as={ChevronRight} size={20} className="text-foreground" />
                    </Pressable>
                  </View>
                </View>

                {/* 12 Years Grid */}
                <View className="flex-row flex-wrap justify-between gap-y-2.5 py-1">
                  {years.map((y) => {
                    const isSelectedYear = y === viewYear;

                    return (
                      <Pressable
                        key={y}
                        onPress={() => {
                          setViewYear(y);
                          setViewMode('months');
                        }}
                        className={`w-[31%] h-12 rounded-xl items-center justify-center active:opacity-75 ${
                          isSelectedYear
                            ? 'bg-brand shadow-sm'
                            : 'bg-surface border border-border/60'
                        }`}
                      >
                        <Text
                          className={`text-sm ${
                            isSelectedYear
                              ? 'font-bold text-inverse'
                              : 'font-medium text-foreground'
                          }`}
                        >
                          {y}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </FadeSlideIn>
          )}

          {/* Confirm Button */}
          <View className="pt-2">
            <Button
              title="Apply Date"
              variant="primary"
              size="md"
              fullWidth
              onPress={handleConfirm}
            />
          </View>
        </View>
      </BottomSheetModal>
    );
  }
);

DatePickerSheet.displayName = 'DatePickerSheet';
