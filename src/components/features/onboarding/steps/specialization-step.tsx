import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Tag,
} from '@/components/ui';
import { SPECIALIZATION_TAGS } from '@/constants';
import { OnboardingFormValues } from '@/schemas/onboarding';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Text, View } from 'react-native';

interface SpecializationStepProps {
  onContinue: () => void;
}

export function SpecializationStep({ onContinue }: SpecializationStepProps) {
  const form = useFormContext<OnboardingFormValues>();

  const handleContinue = async () => {
    const isValid = await form.trigger(['specializations']);
    if (isValid) {
      onContinue();
    }
  };

  return (
    <View className="flex-1">
      {/* Heading */}
      <Text className="mt-8 text-[40px] font-black tracking-tight text-foreground leading-[48px]">
        Specialization
      </Text>
      <Text className="mt-2 text-xl font-bold text-foreground/80">
        What do you specialize in?
      </Text>

      {/* Selectable Tags Container */}
      <FormField
        control={form.control}
        name="specializations"
        render={({ field }) => {
          const currentTags = field.value || [];
          const toggleTag = (tag: string) => {
            const next = currentTags.includes(tag)
              ? currentTags.filter((t) => t !== tag)
              : [...currentTags, tag];
            field.onChange(next);
          };

          return (
            <FormItem className="mt-8">
              <FormControl>
                <View className="flex-row flex-wrap gap-2.5">
                  {SPECIALIZATION_TAGS.map((tag) => {
                    const isSelected = currentTags.includes(tag);
                    return (
                      <Tag
                        key={tag}
                        label={tag}
                        variant={isSelected ? 'brand' : 'default'}
                        size="md"
                        onPress={() => toggleTag(tag)}
                        className={`h-11 px-4 rounded-xl border ${
                          isSelected
                            ? 'border-brand bg-brand/20'
                            : 'border-border/80 bg-card active:bg-card-subtle'
                        }`}
                        textClassName={`text-base font-semibold ${
                          isSelected ? 'text-brand' : 'text-foreground'
                        }`}
                      />
                    );
                  })}
                </View>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
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
