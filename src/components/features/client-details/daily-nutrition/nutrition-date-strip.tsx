import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';

export interface DateStripItem {
  id: string;
  month: string;
  day: number;
  weekday: string;
  fullDate: string;
  dateObj?: Date;
}

const DEFAULT_DAYS: DateStripItem[] = [
  { id: '1', month: 'Mar', day: 11, weekday: 'Mon', fullDate: '2026-03-11' },
  { id: '2', month: 'Mar', day: 12, weekday: 'Tue', fullDate: '2026-03-12' },
  { id: '3', month: 'Mar', day: 13, weekday: 'Wed', fullDate: '2026-03-13' },
  { id: '4', month: 'Mar', day: 14, weekday: 'Thu', fullDate: '2026-03-14' },
  { id: '5', month: 'Mar', day: 15, weekday: 'Fri', fullDate: '2026-03-15' },
  { id: '6', month: 'Mar', day: 16, weekday: 'Sat', fullDate: '2026-03-16' },
  { id: '7', month: 'Mar', day: 17, weekday: 'Sun', fullDate: '2026-03-17' },
];

export interface NutritionDateStripProps {
  days?: DateStripItem[];
  selectedDateId?: string;
  onSelectDate?: (item: DateStripItem) => void;
  weekLabel?: string;
  onPrevWeek?: () => void;
  onNextWeek?: () => void;
  onPressCalendar?: () => void;
}

export function NutritionDateStrip({
  days = DEFAULT_DAYS,
  selectedDateId = '3',
  onSelectDate,
  weekLabel,
  onPrevWeek,
  onNextWeek,
  onPressCalendar,
}: NutritionDateStripProps) {
  return (
    <View className="w-full gap-2">
      {/* Week Navigator & Pick Date Bar */}
      {(weekLabel || onPrevWeek || onNextWeek || onPressCalendar) && (
        <View className="flex-row items-center justify-between px-0.5">
          {/* Week switcher */}
          <View className="flex-row items-center gap-1">
            {onPrevWeek && (
              <Pressable
                onPress={onPrevWeek}
                hitSlop={8}
                className="active:opacity-70"
                accessibilityRole="button"
                accessibilityLabel="Previous week"
              >
                <Icon as={ChevronLeft} size={22} className="text-foreground" />
              </Pressable>
            )}

            <Text className="text-sm font-bold text-foreground px-1">
              {weekLabel || 'Last week'}
            </Text>

            {onNextWeek && (
              <Pressable
                onPress={onNextWeek}
                hitSlop={8}
                className="active:opacity-70"
                accessibilityRole="button"
                accessibilityLabel="Next week"
              >
                <Icon as={ChevronRight} size={22} className="text-foreground" />
              </Pressable>
            )}
          </View>

          {/* Pick Date Button */}
          {onPressCalendar && (
            <Pressable
              onPress={onPressCalendar}
              className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card active:opacity-70"
              accessibilityRole="button"
              accessibilityLabel="Select date"
            >
              <Icon as={Calendar} size={15} className="text-brand" />
              <Text className="text-xs font-semibold text-foreground">
                Pick date
              </Text>
            </Pressable>
          )}
        </View>
      )}

      {/* Horizontal Day Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 8,
          paddingHorizontal: 0,
        }}
        className="w-full"
      >
        {days.map((item) => {
          const isSelected = item.id === selectedDateId;

          return (
            <Pressable
              key={item.id}
              onPress={() => onSelectDate?.(item)}
              className={`w-[69px] h-fit rounded-2xl items-center justify-between py-2 px-1 ${isSelected
                  ? 'bg-brand shadow-sm'
                  : 'bg-card border border-border/40'
                }`}
            >
              {/* Month */}
              <Text
                className={`text-xs ${isSelected ? 'text-inverse/70 font-semibold' : 'text-muted'
                  }`}
              >
                {item.month}
              </Text>

              {/* Day Number */}
              <Text
                className={`text-xl ${isSelected
                    ? 'text-inverse font-black'
                    : 'text-foreground font-bold'
                  }`}
              >
                {item.day}
              </Text>

              {/* Weekday */}
              <Text
                className={`text-xs ${isSelected ? 'text-inverse/70 font-semibold' : 'text-muted'
                  }`}
              >
                {item.weekday}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default NutritionDateStrip;
