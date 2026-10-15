import React, { useMemo, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@/components/ui';
import { DatePickerSheet, DatePickerSheetRef } from '@/components/shared';
import {
  AddCaloriesSheet,
  AddCaloriesSheetRef,
  DailyNutritionHeader,
  DateStripItem,
  NutritionBarChartKpiCard,
  NutritionDateStrip,
  NutritionNoteSheet,
  NutritionNoteSheetRef,
  NutritionNotesCard,
  NutritionTargetKpiCard,
  NutritionTodayDetailsCard,
} from '@/components/features/client-details';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatCurrentTime(): string {
  const d = new Date();
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${String(hours).padStart(2, '0')}:${minutes}${ampm}`;
}

function getMonday(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const result = new Date(date.setDate(diff));
  result.setHours(0, 0, 0, 0);
  return result;
}

function buildWeekDays(baseDate: Date): DateStripItem[] {
  const monday = getMonday(baseDate);
  const days: DateStripItem[] = [];

  for (let i = 0; i < 7; i++) {
    const cur = new Date(monday);
    cur.setDate(monday.getDate() + i);
    const key = formatDateKey(cur);

    days.push({
      id: key,
      month: MONTH_NAMES[cur.getMonth()],
      day: cur.getDate(),
      weekday: WEEKDAY_NAMES[cur.getDay()],
      fullDate: key,
      dateObj: cur,
    });
  }

  return days;
}

interface DayNutritionRecord {
  consumed: number;
  dailyTarget: number;
  time: string;
  note: string;
}

const INITIAL_RECORDS: Record<string, DayNutritionRecord> = {
  '2026-03-09': {
    consumed: 1950,
    dailyTarget: 2150,
    time: '08:00PM',
    note: 'Standard diet followed.',
  },
  '2026-03-10': {
    consumed: 2100,
    dailyTarget: 2150,
    time: '07:45PM',
    note: 'Met daily protein target.',
  },
  '2026-03-11': {
    consumed: 1750,
    dailyTarget: 2150,
    time: '08:15PM',
    note: 'Low carb day.',
  },
  '2026-03-12': {
    consumed: 2000,
    dailyTarget: 2150,
    time: '09:00PM',
    note: 'Post workout dinner.',
  },
  '2026-03-13': {
    consumed: 1800,
    dailyTarget: 2150,
    time: '08:30PM',
    note: "Note: Client reported today's total intake.",
  },
  '2026-03-14': {
    consumed: 1650,
    dailyTarget: 2150,
    time: '06:30PM',
    note: 'Rest day calorie deficit.',
  },
  '2026-03-15': {
    consumed: 1850,
    dailyTarget: 2150,
    time: '08:45PM',
    note: 'Weekend meal plan.',
  },
};

export default function DailyNutritionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // Stable anchor date matching design (Mar 13, 2026)
  const anchorDate = useMemo(() => new Date(2026, 2, 13), []);

  // Week offset: -1 = "Last week", 0 = "This week", -2 = "2 weeks ago"
  const [weekOffset, setWeekOffset] = useState<number>(-1);

  // Active selected date
  const [selectedDateObj, setSelectedDateObj] = useState<Date>(
    new Date(2026, 2, 13)
  );
  const [selectedDateId, setSelectedDateId] = useState<string>('2026-03-13');

  // Nutrition entries per date key (YYYY-MM-DD)
  const [records, setRecords] =
    useState<Record<string, DayNutritionRecord>>(INITIAL_RECORDS);

  // Sheet references
  const addCaloriesSheetRef = useRef<AddCaloriesSheetRef>(null);
  const noteSheetRef = useRef<NutritionNoteSheetRef>(null);
  const calendarPickerRef = useRef<DatePickerSheetRef>(null);

  // Compute days for current week
  const weekDays = useMemo(() => {
    const d = new Date(anchorDate);
    // Base reference week: -1 represents the week of Mar 9-15
    d.setDate(anchorDate.getDate() + (weekOffset + 1) * 7);
    return buildWeekDays(d);
  }, [anchorDate, weekOffset]);

  // Dynamic week label
  const weekLabel = useMemo(() => {
    if (weekOffset === -1) return 'Last week';
    if (weekOffset === 0) return 'This week';
    if (weekOffset < -1) return `${Math.abs(weekOffset)} weeks ago`;
    return `In ${weekOffset} week(s)`;
  }, [weekOffset]);

  // TODO: API - Fetch daily nutrition record: GET /api/clients/${clientId}/nutrition?date=${selectedDateId}
  // Current active date data
  const currentRecord = useMemo(() => {
    return (
      records[selectedDateId] || {
        consumed: 0,
        dailyTarget: 2150,
        time: '--:--',
        note: '',
      }
    );
  }, [records, selectedDateId]);

  // Chart data matching the active week days
  const chartData = useMemo(() => {
    return weekDays.map((d) => ({
      day: d.weekday,
      value: records[d.id]?.consumed || 0,
    }));
  }, [weekDays, records]);

  // Handle selecting a day from the top strip
  const handleSelectDay = (item: DateStripItem) => {
    // TODO: API - Fetch nutrition details for selected day: GET /api/clients/${clientId}/nutrition?date=${item.id}
    setSelectedDateId(item.id);
    setSelectedDateObj(item.dateObj || new Date(item.fullDate));
  };

  // Handle picking a custom date from calendar
  const handleCalendarPick = (pickedDate: Date) => {
    const key = formatDateKey(pickedDate);
    setSelectedDateId(key);
    setSelectedDateObj(pickedDate);

    // Calculate week difference from anchor date
    const mondayAnchor = getMonday(anchorDate);
    const mondayPicked = getMonday(pickedDate);
    const diffMs = mondayPicked.getTime() - mondayAnchor.getTime();
    const diffWeeks = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));
    setWeekOffset(diffWeeks - 1);
    // TODO: API - Fetch nutrition records for picked week: GET /api/clients/${clientId}/nutrition/week?date=${key}
  };

  // Handle adding or updating calories
  const handleAddCalories = (data: {
    date: Date;
    calories: number;
    note?: string;
  }) => {
    const key = formatDateKey(data.date);
    const currentTime = formatCurrentTime();

    // TODO: API - Add / update client daily calories: POST /api/clients/${clientId}/nutrition
    setRecords((prev) => {
      const existing = prev[key];
      return {
        ...prev,
        [key]: {
          consumed: data.calories,
          dailyTarget: existing?.dailyTarget || 2150,
          time: currentTime,
          note: data.note !== undefined ? data.note : existing?.note || '',
        },
      };
    });

    // Make sure view syncs to the chosen date
    setSelectedDateId(key);
    setSelectedDateObj(data.date);
  };

  // Handle saving a note
  const handleSaveNote = (newNote: string) => {
    // TODO: API - Save client daily nutrition note: POST /api/clients/${clientId}/nutrition/notes
    setRecords((prev) => {
      const existing = prev[selectedDateId] || {
        consumed: 0,
        dailyTarget: 2150,
        time: '--:--',
        note: '',
      };
      return {
        ...prev,
        [selectedDateId]: {
          ...existing,
          note: newNote,
        },
      };
    });
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      {/* Screen Header Bar */}
      <View
        className="px-4 pb-2 bg-background z-20"
        style={{ paddingTop: insets.top + 8 }}
      >
        <DailyNutritionHeader onBack={() => router.back()} />
      </View>

      {/* Main Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: insets.bottom + 96,
          gap: 16,
        }}
      >
        {/* Horizontal Date Selector with week navigation and calendar button */}
        <NutritionDateStrip
          days={weekDays}
          selectedDateId={selectedDateId}
          onSelectDate={handleSelectDay}
          weekLabel={weekLabel}
          onPrevWeek={() => setWeekOffset((prev) => prev - 1)}
          onNextWeek={() => setWeekOffset((prev) => prev + 1)}
          onPressCalendar={() => calendarPickerRef.current?.present()}
        />

        {/* 1. Nutrition Target KPI Card */}
        <NutritionTargetKpiCard
          consumed={currentRecord.consumed}
          dailyTarget={currentRecord.dailyTarget}
        />

        {/* 2. Today's Details Calories KPI Card with Edit button */}
        <NutritionTodayDetailsCard
          totalCalories={currentRecord.consumed}
          time={currentRecord.time}
          note={
            currentRecord.note ||
            "Note: Client reported today's total intake."
          }
          onPressEdit={() =>
            addCaloriesSheetRef.current?.present(
              selectedDateObj,
              currentRecord.consumed,
              currentRecord.note,
              'Edit details'
            )
          }
        />

        {/* 3. Bar Chart KPI Card with "Last week" timeframe */}
        <NutritionBarChartKpiCard
          title="Today’s details"
          timeframe={weekLabel}
          data={chartData}
          onPressTimeframe={() =>
            setWeekOffset((prev) => (prev === -1 ? 0 : -1))
          }
        />

        {/* 4. Nutrition Notes Card */}
        <NutritionNotesCard
          title="Nutrition Notes"
          description={
            currentRecord.note && currentRecord.note.trim().length > 0
              ? currentRecord.note
              : "General notes about the client's nutrition, adherence or any observations."
          }
          onPress={() =>
            noteSheetRef.current?.present(
              currentRecord.note,
              selectedDateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })
            )
          }
        />
      </ScrollView>

      {/* Bottom Sticky Action Button */}
      <View
        className="absolute bottom-0 left-0 right-0 px-4 pt-3 bg-background/95 border-t border-border/30 z-30"
        style={{ paddingBottom: Math.max(insets.bottom + 8, 16) }}
      >
        <Button
          title="Add Calories"
          variant="primary"
          size="lg"
          fullWidth
          className="h-16 rounded-2xl bg-brand"
          textClassName="text-inverse text-lg font-bold"
          onPress={() =>
            addCaloriesSheetRef.current?.present(
              selectedDateObj,
              undefined,
              '',
              'Add Calories'
            )
          }
        />
      </View>

      {/* Add Calories Bottom Sheet */}
      <AddCaloriesSheet
        ref={addCaloriesSheetRef}
        initialDate={selectedDateObj}
        onAdd={handleAddCalories}
      />

      {/* Day Note Bottom Sheet */}
      <NutritionNoteSheet
        ref={noteSheetRef}
        onSave={handleSaveNote}
      />

      {/* Pick Date Calendar Sheet */}
      <DatePickerSheet
        ref={calendarPickerRef}
        selectedDate={selectedDateObj}
        title="Select date"
        onSelectDate={handleCalendarPick}
      />
    </View>
  );
}
