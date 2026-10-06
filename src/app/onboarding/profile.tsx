import { BackButton } from '@/components/shared';
import { Form } from '@/components/ui';
import {
  defaultOnboardingValues,
  onboardingFormSchema,
  OnboardingFormValues,
  parseOnboardingForm,
  serializeOnboardingForm,
} from '@/schemas/onboarding';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { FadeSlideIn } from 'react-native-animation-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ClientsStep,
  CoachPhotoStep,
  ExperienceStep,
  ProfileStep,
  SpecializationStep,
} from '@/components/features/onboarding/steps';

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ formState?: string }>();
  const initialValues = parseOnboardingForm(params.formState);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Single centralized form instance holding state across all 5 steps
  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      ...defaultOnboardingValues,
      ...initialValues,
    },
    mode: 'onBlur',
  });

  // Handle back button on screen and Android hardware back button
  const handleBack = () => {
    if (currentStep > 1) {
      setDirection('left');
      setCurrentStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  useEffect(() => {
    const onBackPress = () => {
      if (currentStep > 1) {
        setDirection('left');
        setCurrentStep((prev) => prev - 1);
        return true; // Prevent exiting the screen
      }
      return false; // Default back navigation on step 1
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [currentStep]);

  // Step transition handlers
  const handleGoToStep2 = () => {
    setDirection('right');
    setCurrentStep(2);
  };

  const handleGoToStep3 = () => {
    setDirection('right');
    setCurrentStep(3);
  };

  const handleGoToStep4 = () => {
    setDirection('right');
    setCurrentStep(4);
  };

  const handleGoToStep5 = () => {
    setDirection('right');
    setCurrentStep(5);
  };

  // Final submission on Step 5 (Coach Profile Photo)
  const handleFinalSubmit = form.handleSubmit(async (formData) => {
    try {
      setIsSubmitting(true);
      // Navigate to All Set screen, replacing the onboarding wizard in history
      router.replace({
        pathname: '/onboarding/all-set',
        params: { formState: serializeOnboardingForm(formData) },
      });
    } catch (error) {
      console.error('Error submitting onboarding:', error);
    } finally {
      setIsSubmitting(false);
    }
  });

  // Switch statement to render the active onboarding step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ProfileStep onContinue={handleGoToStep2} />;
      case 2:
        return <ExperienceStep onContinue={handleGoToStep3} />;
      case 3:
        return <SpecializationStep onContinue={handleGoToStep4} />;
      case 4:
        return <ClientsStep onContinue={handleGoToStep5} />;
      case 5:
        return (
          <CoachPhotoStep
            onSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

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
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 20,
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Top Bar with Back Button */}
          <View className="flex-row items-center justify-between pb-1">
            <BackButton onPress={handleBack} />
            <View className="h-12 w-12" />
          </View>

          {/* Form Context wrapper around animated Step view */}
          <Form {...form}>
            <FadeSlideIn
              key={currentStep}
              direction={direction}
              duration={500}
              distance={25}
              style={{ flex: 1 }}
            >
              {renderCurrentStep()}
            </FadeSlideIn>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
