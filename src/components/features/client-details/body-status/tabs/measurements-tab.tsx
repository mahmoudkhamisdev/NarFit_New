import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
  ArrowDown,
  Calendar,
  ChevronDown,
  Info,
  Lightbulb,
} from 'lucide-react-native';
import { Icon, TabItem, Tabs, Text } from '@/components/ui';
import { ProgressChart } from '@/components/shared';

export type MeasurementsViewMode = 'Table' | 'Trends';

const MEASUREMENT_TABS: TabItem<MeasurementsViewMode>[] = [
  { id: 'Table', label: 'Table' },
  { id: 'Trends', label: 'Trends' },
];

export interface MeasurementItem {
  id: string;
  label: string;
  value: string;
  delta?: string;
  hasDownArrow?: boolean;
}

const MEASUREMENTS_DATA: MeasurementItem[] = [
  { id: 'weight', label: 'Weight', value: '91 Kg', delta: '1 kg', hasDownArrow: true },
  { id: 'height', label: 'Height', value: '180 cm', delta: '--' },
  { id: 'bmi', label: 'BMI', value: '28.7', delta: '0.3', hasDownArrow: true },
  { id: 'bodyFat', label: 'Body fat', value: '24 %', delta: '2 %', hasDownArrow: true },
  { id: 'waist', label: 'Waist', value: '92 cm', delta: '4 cm', hasDownArrow: true },
  { id: 'chest', label: 'Chest', value: '102 cm', delta: '--' },
];

export interface MeasurementsTabProps {
  selectedRange?: string;
  onPressRange?: () => void;
}

export function MeasurementsTab({
  selectedRange = 'Last 12 weeks',
  onPressRange,
}: MeasurementsTabProps) {
  const [viewMode, setViewMode] = useState<MeasurementsViewMode>('Table');

  return (
    <View className="gap-3.5 w-full">
      {/* Main Card (Weight progress + Table/Trends toggle) */}
      <View className="bg-card rounded-xl p-3.5 border border-border/50 gap-3.5 w-full">
        {/* Header Row */}
        <View className="flex-row items-center justify-between w-full gap-1">
          <Text
            numberOfLines={1}
            className="text-xl font-bold text-foreground w-1/2"
          >
            Weight progress
          </Text>

          <Pressable
            onPress={onPressRange}
            className="bg-card border border-border-strong rounded-xl px-2.5 py-1.5 flex-row items-center gap-1.5 active:opacity-75"
          >
            <Text className="text-xs font-medium text-foreground">
              {selectedRange}
            </Text>
            <Icon as={ChevronDown} size={14} className="text-foreground" />
          </Pressable>
        </View>

        {/* Segmented Control (Table | Trends) using UI Tabs component */}
        <Tabs<MeasurementsViewMode>
          tabs={MEASUREMENT_TABS}
          value={viewMode}
          onValueChange={setViewMode}
          variant="segmented"
          scrollable={false}
        />

        {/* View Mode Content */}
        {viewMode === 'Table' ? (
          <View className="w-full">
            {MEASUREMENTS_DATA.map((row, index) => {
              const isLast = index === MEASUREMENTS_DATA.length - 1;
              return (
                <View
                  key={row.id}
                  className={`flex-row items-center justify-between py-2.5 ${
                    !isLast ? 'border-b border-border/40' : ''
                  }`}
                >
                  {/* Left Icon + Label */}
                  <View className="flex-row items-center gap-2.5 flex-1">
                    <Icon as={Calendar} size={20} className="text-foreground-secondary" />
                    <Text className="text-base text-foreground-secondary font-normal">
                      {row.label}
                    </Text>
                  </View>

                  {/* Center Value */}
                  <Text className="text-base text-foreground font-medium flex-1 text-center">
                    {row.value}
                  </Text>

                  {/* Right Delta */}
                  <View className="flex-row items-center justify-end flex-1 gap-0.5">
                    {row.hasDownArrow && (
                      <Icon as={ArrowDown} size={16} className="text-brand" />
                    )}
                    <Text
                      className={`text-base font-normal ${
                        row.hasDownArrow ? 'text-brand' : 'text-foreground'
                      }`}
                    >
                      {row.delta}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        ) : (
          /* Trends Mode: Progress Chart */
          <ProgressChart />
        )}
      </View>

      {/* Tip Card (Dynamic based on Table or Trends view) */}
      <View className="bg-card rounded-xl p-4 border border-border/50 flex-row items-center gap-3.5 w-full">
        <View className="size-12 rounded-2xl border border-border/70 items-center justify-center bg-surface shrink-0">
          <Icon
            as={viewMode === 'Table' ? Lightbulb : Info}
            size={22}
            className={viewMode === 'Table' ? 'text-brand' : 'text-info'}
          />
        </View>

        {viewMode === 'Table' ? (
          <Text className="text-xs text-foreground-secondary leading-relaxed flex-1">
            You can always adjust this later in the client profile based on progress and results.
          </Text>
        ) : (
          <View className="flex-1 gap-0.5">
            <Text className="text-sm font-medium text-foreground">
              Measurement Tips
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              Take measurements under the same conditions for accurate progress tracking.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
