import { DateInput, GenderSelect } from '@/components/shared';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Icon,
  Input,
} from '@/components/ui';
import { OnboardingFormValues } from '@/schemas/onboarding';
import { User } from 'lucide-react-native';
import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

interface ProfileStepProps {
  onContinue: () => void;
}

export function ProfileStep({ onContinue }: ProfileStepProps) {
  const form = useFormContext<OnboardingFormValues>();
  const dateInputRef = useRef<TextInput>(null);

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
                    dateInputRef.current?.focus();
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

        {/* Masked Date of Birth Input */}
        <FormField
          control={form.control}
          name="dob"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <DateInput
                  ref={dateInputRef}
                  value={field.value}
                  onChange={field.onChange}
                  returnKeyType="done"
                  error={fieldState.error?.message}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
