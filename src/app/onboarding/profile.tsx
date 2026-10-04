import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Icon,
  Input,
  Select,
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
import { ArrowLeft, User, Users } from 'lucide-react-native';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GENDER_OPTIONS } from '@/constants';
import DateInput from './_components/date-input';

const profileStepSchema = onboardingFormSchema.pick({
  name: true,
  dob: true,
  gender: true,
});

type ProfileStepValues = {
  name: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
};

export default function ProfileSetupScreen() {
  const insets = useSafeAreaInsets();
  const dateInputRef = useRef<TextInput>(null);

  const params = useLocalSearchParams<{ formState?: string }>();
  const initialValues = parseOnboardingForm(params.formState);

  const form = useForm<ProfileStepValues>({
    resolver: zodResolver(profileStepSchema),
    defaultValues: {
      name: initialValues.name || defaultOnboardingValues.name,
      dob: initialValues.dob || defaultOnboardingValues.dob,
      gender: (initialValues.gender as 'male' | 'female' | 'other') || defaultOnboardingValues.gender,
    },
    mode: 'onBlur',
  });

  const handleContinue = form.handleSubmit((stepData) => {
    const updatedForm = {
      ...initialValues,
      ...stepData,
    };
    // Navigate to next onboarding step: Experience screen (Figma node 39:5307)
    router.push({
      pathname: '/onboarding/experience',
      params: { formState: serializeOnboardingForm(updatedForm) },
    });
  });

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 16,
            paddingHorizontal: 20,
          }}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Bar with Back Button */}
          <View className="flex-row items-center">
            <Pressable
              onPress={() => router.back()}
              className="w-12 h-12 rounded-2xl bg-card border border-border/80 items-center justify-center active:opacity-70 shadow-sm"
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Icon as={ArrowLeft} size={22} className="text-foreground" />
            </Pressable>
          </View>

          {/* Heading (Tell us about yourself) */}
          <Text className="mt-8 text-[40px] font-black tracking-tight text-foreground leading-[48px]">
            Tell us about{'\n'}yourself
          </Text>

          {/* Form Fields wrapped with react-hook-form */}
          <Form {...form}>
            <View className="mt-8 gap-3">
              {/* Name Input */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
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
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DateInput
                        ref={dateInputRef}
                        value={field.value}
                        onChange={field.onChange}
                        returnKeyType="done"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender Select using UI Select Component */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        options={GENDER_OPTIONS}
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Select gender"
                        leftIcon={<Icon as={Users} size={22} className="text-muted" />}
                        className="h-[74px] border-2 border-border/80"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </View>
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
      </KeyboardAvoidingView>
    </View>
  );
}
