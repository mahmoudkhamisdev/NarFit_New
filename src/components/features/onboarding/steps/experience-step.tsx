import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui';
import { EXPERIENCE_OPTIONS } from '@/constants';
import { OnboardingFormValues } from '@/schemas/onboarding';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

interface ExperienceStepProps {
  onContinue: () => void;
}

export function ExperienceStep({ onContinue }: ExperienceStepProps) {
  const form = useFormContext<OnboardingFormValues>();

  const handleContinue = async () => {
    const isValid = await form.trigger(['experience']);
    if (isValid) {
      onContinue();
    }
  };

  return (
    <View className="flex-1">
      {/* Heading */}
      <Text className="mt-8 text-[40px] font-black tracking-tight text-foreground leading-[48px]">
        Experience
      </Text>

      {/* Selection Cards */}
      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem className="mt-8">
            <FormControl>
              <View className="gap-4">
                {EXPERIENCE_OPTIONS.map((item) => {
                  const isSelected = field.value === item.id;
                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => field.onChange(item.id)}
                      className={`h-[74px] w-full flex-row items-center px-5 rounded-2xl border-2 transition-all ${
                        isSelected
                          ? 'border-brand bg-card shadow-sm'
                          : 'border-border/80 bg-card/60 active:bg-card'
                      }`}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: isSelected }}
                    >
                      <Text
                        className={`text-lg font-bold ${
                          isSelected ? 'text-foreground' : 'text-muted'
                        }`}
                      >
                        {item.label}
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
