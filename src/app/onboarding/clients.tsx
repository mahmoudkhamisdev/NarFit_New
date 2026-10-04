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
import { CLIENT_OPTIONS } from '@/constants';
import BackButton from './_components/back-button';

const clientsStepSchema = onboardingFormSchema.pick({
  clientsCount: true,
});

type ClientsStepValues = {
  clientsCount: string;
};

export default function NumberOfClientsScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ formState?: string }>();
  const initialValues = parseOnboardingForm(params.formState);

  const form = useForm<ClientsStepValues>({
    resolver: zodResolver(clientsStepSchema),
    defaultValues: {
      clientsCount: initialValues.clientsCount || defaultOnboardingValues.clientsCount,
    },
  });

  const handleContinue = form.handleSubmit((stepData) => {
    const updatedForm = {
      ...initialValues,
      ...stepData,
    };
    // Navigate to next onboarding step: Coach Profile Photo (Figma 39:5969)
    router.push({
      pathname: '/onboarding/coach-photo',
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
          Number of Clients
        </Text>
        <Text className="mt-2 text-xl font-bold text-foreground/80">
          How many clients do you currently coach?
        </Text>

        {/* 2-Column Selection Grid wrapped with Form */}
        <Form {...form}>
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
