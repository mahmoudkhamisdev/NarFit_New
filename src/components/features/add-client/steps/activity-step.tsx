import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui';
import { CLIENT_ACTIVITY_OPTIONS } from '@/constants/client';
import { AddClientFormValues } from '@/schemas/client';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

interface ActivityStepProps {
  isSubmitting: boolean;
  submitError: string | null;
  onSubmit: () => void;
}

export function ActivityStep({
  isSubmitting,
  submitError,
  onSubmit,
}: ActivityStepProps) {
  const form = useFormContext<AddClientFormValues>();

  const handleContinue = async () => {
    const isValid = await form.trigger(['activityLevel']);
    if (isValid) {
      onSubmit();
    }
  };

  return (
    <View className="flex-1">
      {/* Page Title & Subtitle */}
      <View className="mt-8 mb-6">
        <Text className="text-5xl font-black tracking-tight text-foreground leading-[52px]">
          Client Activity{'\n'}Level
        </Text>
        <Text className="mt-2 text-base font-medium text-muted">
          How active are client?
        </Text>
      </View>

      {/* Options List */}
      <FormField
        control={form.control}
        name="activityLevel"
        render={({ field }) => (
          <FormItem className="gap-3">
            <FormControl>
              <View className="gap-3">
                {CLIENT_ACTIVITY_OPTIONS.map((option) => {
                  const isSelected = field.value === option.id;
                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => field.onChange(option.id)}
                      className={`h-[74px] w-full justify-center rounded-2xl px-5 border ${isSelected
                          ? 'border-2 border-brand bg-card'
                          : 'border border-border/80 bg-card active:bg-card-subtle'
                        }`}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: isSelected }}
                      accessibilityLabel={`${option.title}, ${option.description}`}
                    >
                      <Text
                        className={`text-lg leading-tight ${isSelected
                            ? 'font-semibold text-foreground'
                            : 'font-medium text-foreground-secondary'
                          }`}
                      >
                        {option.title}
                      </Text>
                      <Text className="text-sm text-muted mt-0.5" numberOfLines={1}>
                        {option.description}
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



      {/* Continue Button */}
      <View className="pt-4">
        {submitError && (
          <View className="mb-3 items-center justify-center rounded-xl bg-error/10 px-4 py-2.5 border border-error/20">
            <Text className="text-sm font-semibold text-error text-center">
              {submitError}
            </Text>
          </View>
        )}
        <Button
          title="Continue"
          variant="primary"
          size="lg"
          className="h-[74px] w-full rounded-2xl shadow-md"
          textClassName="text-lg font-bold text-inverse"
          loading={isSubmitting}
          disabled={isSubmitting}
          onPress={handleContinue}
        />
      </View>
    </View>
  );
}
