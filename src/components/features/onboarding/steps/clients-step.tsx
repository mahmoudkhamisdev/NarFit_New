import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui';
import { CLIENT_OPTIONS } from '@/constants';
import { OnboardingFormValues } from '@/schemas/onboarding';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

interface ClientsStepProps {
  onContinue: () => void;
}

export function ClientsStep({ onContinue }: ClientsStepProps) {
  const form = useFormContext<OnboardingFormValues>();

  const handleContinue = async () => {
    const isValid = await form.trigger(['clientsCount']);
    if (isValid) {
      onContinue();
    }
  };

  return (
    <View className="flex-1">
      {/* Heading */}
      <Text className="mt-8 text-[40px] font-black tracking-tight text-foreground leading-[48px]">
        Number of Clients
      </Text>
      <Text className="mt-2 text-xl font-bold text-foreground/80">
        How many clients do you currently coach?
      </Text>

      {/* 2-Column Selection Grid */}
      <FormField
        control={form.control}
        name="clientsCount"
        render={({ field }) => (
          <FormItem className="mt-8">
            <FormControl>
              <View className="gap-3.5">
                {CLIENT_OPTIONS.map((row, rowIdx) => (
                  <View key={rowIdx} className="flex-row gap-3.5">
                    {row.map((item) => {
                      const isSelected = field.value === item.id;
                      return (
                        <Pressable
                          key={item.id}
                          onPress={() => field.onChange(item.id)}
                          className={`h-[74px] flex-1 items-center justify-center rounded-2xl border-2 transition-all ${
                            isSelected
                              ? 'border-brand bg-card shadow-sm'
                              : 'border-border/80 bg-card/60 active:bg-card'
                          }`}
                          accessibilityRole="radio"
                          accessibilityState={{ selected: isSelected }}
                        >
                          <Text
                            className={`text-lg font-bold text-center ${
                              isSelected ? 'text-foreground' : 'text-muted'
                            }`}
                          >
                            {item.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                ))}
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
