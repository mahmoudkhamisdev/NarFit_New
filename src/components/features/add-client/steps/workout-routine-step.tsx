import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Icon,
} from '@/components/ui';
import { AddClientFormValues } from '@/schemas/client';
import { Dumbbell, House, Layers } from 'lucide-react-native';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

const WORKOUT_DAYS_OPTIONS = [2, 3, 4, 5, 6, 7];

const TRAINING_LOCATION_OPTIONS = [
  { id: 'gym', label: 'Gym', icon: Dumbbell },
  { id: 'home', label: 'Home', icon: House },
  { id: 'both', label: 'Both', icon: Layers },
] as const;

interface WorkoutRoutineStepProps {
  onContinue: () => void;
}

export function WorkoutRoutineStep({ onContinue }: WorkoutRoutineStepProps) {
  const form = useFormContext<AddClientFormValues>();

  const handleContinue = async () => {
    const isValid = await form.trigger(['workoutDays', 'trainingLocation']);
    if (isValid) {
      onContinue();
    }
  };

  return (
    <View className="flex-1 justify-between">
      <View>
        {/* Step Title & Subtitle */}
        <View className="mt-8 mb-6">
          <Text className="text-5xl font-black tracking-tight text-foreground leading-[52px]">
            Workout{'\n'}routine
          </Text>
          <Text className="mt-2 text-base font-medium text-muted">
            Select training frequency and preferred location.
          </Text>
        </View>

        {/* Section 1: How many days per week? */}
        <View className="mb-7">
          <Text className="text-lg font-bold text-foreground mb-3.5">
            How many days per week?
          </Text>

          <FormField
            control={form.control}
            name="workoutDays"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <View className="flex-row items-center justify-between gap-2.5">
                    {WORKOUT_DAYS_OPTIONS.map((days) => {
                      const isSelected = field.value === days;
                      return (
                        <Pressable
                          key={days}
                          onPress={() => field.onChange(days)}
                          className={`flex-1 h-[60px] items-center justify-center rounded-2xl border ${isSelected
                              ? 'border-2 border-brand bg-card shadow-sm'
                              : 'border border-border/80 bg-card active:bg-card-subtle'
                            }`}
                          accessibilityRole="radio"
                          accessibilityState={{ selected: isSelected }}
                          accessibilityLabel={`${days} days per week`}
                        >
                          <Text
                            className={`text-2xl ${isSelected
                                ? 'font-black text-foreground'
                                : 'font-bold text-muted'
                              }`}
                          >
                            {days}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        {/* Section 2: Training location */}
        <View className="mb-6">
          <Text className="text-lg font-bold text-foreground mb-3.5">
            Training location
          </Text>

          <FormField
            control={form.control}
            name="trainingLocation"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <View className="flex-row items-center justify-between gap-3">
                    {TRAINING_LOCATION_OPTIONS.map((loc) => {
                      const isSelected = field.value === loc.id;
                      return (
                        <Pressable
                          key={loc.id}
                          onPress={() => field.onChange(loc.id)}
                          className={`flex-1 h-24 items-center justify-center rounded-2xl border px-2 gap-2 ${isSelected
                              ? 'border-2 border-brand bg-card shadow-sm'
                              : 'border border-border/80 bg-card active:bg-card-subtle'
                            }`}
                          accessibilityRole="radio"
                          accessibilityState={{ selected: isSelected }}
                          accessibilityLabel={loc.label}
                        >
                          <Icon
                            as={loc.icon}
                            size={24}
                            className={isSelected ? 'text-brand' : 'text-muted'}
                          />
                          <Text
                            className={`text-base ${isSelected
                                ? 'font-bold text-foreground'
                                : 'font-medium text-muted'
                              }`}
                          >
                            {loc.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
      </View>

      {/* Continue Button */}
      <View className="pt-8">
        <Button
          title="Continue"
          variant="primary"
          size="lg"
          className="h-[74px] w-full rounded-2xl shadow-md"
          textClassName="text-lg font-bold text-inverse"
          onPress={handleContinue}
        />
      </View>
    </View>
  );
}

export default WorkoutRoutineStep;
