import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Tag,
} from '@/components/ui';
import {
  defaultOnboardingValues,
  onboardingFormSchema,
  parseOnboardingForm,
  serializeOnboardingForm,
} from '@/schemas/onboarding';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPECIALIZATION_TAGS } from '@/constants';
import BackButton from './_components/back-button';

const specializationStepSchema = onboardingFormSchema.pick({
  specializations: true,
});

type SpecializationStepValues = {
  specializations: string[];
};

export default function SpecializationScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ formState?: string }>();
  const initialValues = parseOnboardingForm(params.formState);

  const form = useForm<SpecializationStepValues>({
    resolver: zodResolver(specializationStepSchema),
    defaultValues: {
      specializations:
        initialValues.specializations && initialValues.specializations.length > 0
          ? initialValues.specializations
          : defaultOnboardingValues.specializations,
    },
  });

  const handleContinue = form.handleSubmit((stepData) => {
    const updatedForm = {
      ...initialValues,
      ...stepData,
    };
    // Navigate to next onboarding step: Number of Clients (Figma 39:5742)
    router.push({
      pathname: '/onboarding/clients',
      params: { formState: serializeOnboardingForm(updatedForm) },
    });
  });

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 16,
          paddingHorizontal: 20,
        }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Bar with Back Button */}
        <BackButton />

        {/* Heading */}
        <Text className="mt-8 text-[40px] font-black tracking-tight text-foreground leading-[48px]">
          Specialization
        </Text>
        <Text className="mt-2 text-xl font-bold text-foreground/80">
          What do you specialize in?
        </Text>

        {/* Selectable Tags Container wrapped with Form */}
        <Form {...form}>
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
        </Form>

        {/* Flexible Space */}
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
      </ScrollView>
    </View>
  );
}
