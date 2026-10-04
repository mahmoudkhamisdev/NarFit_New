import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
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
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EXPERIENCE_OPTIONS } from '@/constants';
import BackButton from './_components/back-button';

const experienceStepSchema = onboardingFormSchema.pick({
  experience: true,
});

type ExperienceStepValues = {
  experience: string;
};

export default function ExperienceScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ formState?: string }>();
  const initialValues = parseOnboardingForm(params.formState);

  const form = useForm<ExperienceStepValues>({
    resolver: zodResolver(experienceStepSchema),
    defaultValues: {
      experience: initialValues.experience || defaultOnboardingValues.experience,
    },
  });

  const handleContinue = form.handleSubmit((stepData) => {
    const updatedForm = {
      ...initialValues,
      ...stepData,
    };
    // Navigate to next onboarding step: Specialization (Figma 39:5389)
    router.push({
      pathname: '/onboarding/specialization',
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
          Experience
        </Text>

        {/* Selection Cards wrapped with Form */}
        <Form {...form}>
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
