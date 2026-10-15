import React from 'react';
import { Pressable, View } from 'react-native';
import { ArrowDown, Calendar, ChevronRight } from 'lucide-react-native';
import { Icon, Text } from '@/components/ui';

export interface MeasurementRowItem {
  id: string;
  label: string;
  value: string;
  delta?: string;
  hasDownArrow?: boolean;
}

export interface BodyStatusMeasurementsCardProps {
  title?: string;
  date?: string;
  onPressHeader?: () => void;
}

const DEFAULT_MEASUREMENTS: MeasurementRowItem[] = [
  { id: 'weight', label: 'Weight', value: '91 Kg', delta: '1 kg', hasDownArrow: true },
  { id: 'height', label: 'Height', value: '180 cm', delta: '--' },
  { id: 'bmi', label: 'BMI', value: '28.7', delta: '0.3', hasDownArrow: true },
  { id: 'bodyFat', label: 'Body fat', value: '24 %', delta: '2 %', hasDownArrow: true },
  { id: 'waist', label: 'Waist', value: '92 cm', delta: '4 cm', hasDownArrow: true },
  { id: 'chest', label: 'Chest', value: '102 cm', delta: '--' },
];

export function BodyStatusMeasurementsCard({
  title = 'Weight progress',
  date = 'January 22nd, 2026',
  onPressHeader,
}: BodyStatusMeasurementsCardProps) {
  return (
    <View className="bg-card rounded-xl p-3.5 border border-border/50 gap-2 w-full">
      {/* Header */}
      <Pressable
        onPress={onPressHeader}
        className="flex-row items-center justify-between pb-1.5 gap-1 active:opacity-75"
      >
        <Text className="text-xl font-bold text-foreground max-w-[50%]" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center gap-1.5 max-w-[50%]">
          <Text className="text-sm text-disabled font-normal">
            {date}
          </Text>
          <Icon as={ChevronRight} size={18} className="text-disabled" />
        </View>
      </Pressable>

      {/* Measurement Rows List */}
      <View className="w-full">
        {DEFAULT_MEASUREMENTS.map((row, index) => {
          const isLast = index === DEFAULT_MEASUREMENTS.length - 1;
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
    </View>
  );
}
