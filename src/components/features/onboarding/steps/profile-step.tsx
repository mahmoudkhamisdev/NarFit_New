import { DatePickerSheet, DatePickerSheetRef, GenderSelect } from '@/components/shared';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Icon,
  Input,
  Text
} from '@/components/ui';
import { OnboardingFormValues } from '@/schemas/onboarding';
import { Calendar, User } from 'lucide-react-native';
import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Pressable, View } from 'react-native';

interface ProfileStepProps {
  onContinue: () => void;
}

function parseDobString(dobStr?: string): Date {
  if (!dobStr) return new Date(2000, 0, 1);
  const parts = dobStr.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  const timestamp = Date.parse(dobStr);
  if (!isNaN(timestamp)) {
    return new Date(timestamp);
  }
  return new Date(2000, 0, 1);
}

export function ProfileStep({ onContinue }: ProfileStepProps) {
  const form = useFormContext<OnboardingFormValues>();
  const datePickerRef = useRef<DatePickerSheetRef>(null);

  const handleContinue = async () => {
    const isValid = await form.trigger(['name', 'dob', 'gender']);
    if (isValid) {
      onContinue();
    }
  };

  return (
    <View className="flex-1">
      {/* Heading (Tell us about yourself) */}
      <Text className="mt-8 text-[40px] font-black tracking-tight text-foreground leading-[48px]">
        Tell us about{'\n'}yourself
      </Text>

      {/* Form Fields */}
      <View className="mt-8 gap-3">
        {/* Name Input */}
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  value={field.value}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  placeholder="Your name"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    datePickerRef.current?.present();
                  }}
                  blurOnSubmit={false}
                  leftIcon={<Icon as={User} size={22} className="text-muted" />}
                  className="h-18.5 border-2"
                  inputClassName="text-lg font-semibold text-foreground"
                  error={fieldState.error?.message}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date of Birth Picker */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field, fieldState }) => {
            const selectedDate = parseDobString(field.value);

            return (
              <FormItem>
                <FormControl>
                  <Pressable
                    onPress={() => datePickerRef.current?.present()}
                    accessibilityRole="button"
                    accessibilityLabel="Date of birth"
                    className={`h-18.5 w-full flex-row items-center rounded-2xl border-2 px-4 gap-3 bg-card ${
                      fieldState.error ? 'border-error' : 'border-border'
                    }`}
                  >
                    <View className="items-center justify-center pb-1">
                      <Icon as={Calendar} size={22} className="text-muted" />
                    </View>
                    <Text
                      className={`flex-1 text-lg font-semibold ${
                        field.value ? 'text-foreground' : 'text-muted'
                      }`}
                    >
                      {field.value || 'DD/MM/YYYY'}
                    </Text>
                  </Pressable>
                </FormControl>
                <FormMessage />

                <DatePickerSheet
                  ref={datePickerRef}
                  selectedDate={selectedDate}
                  title="Date of birth"
                  onSelectDate={(date) => {
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    field.onChange(`${day}/${month}/${year}`);
                  }}
                />
              </FormItem>
            );
          }}
        />

        {/* Gender Selection */}
        <FormField
          control={form.control}
          name="gender"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <GenderSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  error={fieldState.error?.message}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </View>

      {/* Flexible Spacer */}
      <View className="flex-1 min-h-[40px]" />

      {/* Continue Button */}
      <View className="pt-4">
        <Button
          title="Continue"
          variant="primary"
          size="lg"
          className="h-17.5 w-full rounded-2xl shadow-md"
          textClassName="text-lg font-bold"
          onPress={handleContinue}
        />
      </View>
    </View>
  );
}
