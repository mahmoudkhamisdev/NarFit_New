import { BackButton } from '@/components/shared';
import { Form } from '@/components/ui';
import {
  AddClientFormValues,
  addClientFormSchema,
  defaultAddClientValues,
  serializeClientForm,
} from '@/schemas/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
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
import { AddClientStepper } from '@/components/features/add-client/stepper';
import { Text } from '@/components/ui/text';
import { ActivityStep, BodyInfoStep, CalorieCalculationStep, GoalStep, GoalTargetStep, PersonalInfoStep, WorkoutRoutineStep } from '@/components/features/add-client/steps';

export default function AddClientScreen() {
  const insets = useSafeAreaInsets();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Single centralized form instance holding state across all steps
  const form = useForm<AddClientFormValues>({
    resolver: zodResolver(addClientFormSchema),
    defaultValues: defaultAddClientValues,
    mode: 'onBlur',
  });

  // Handle hardware back on Android and BackButton click
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

  // Step navigation handlers
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

  const handleGoToStep6 = () => {
    setDirection('right');
    setCurrentStep(6);
  };

  const handleGoToStep7 = () => {
    setDirection('right');
    setCurrentStep(7);
  };

  // Final submission handler
  const handleFinalSubmit = form.handleSubmit(async (formData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const completeData: AddClientFormValues = {
        ...formData,
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
        workoutDays: Number(formData.workoutDays),
        calorieTarget: Number(formData.calorieTarget || 2150),
        targetWeight: formData.targetWeight ? String(formData.targetWeight) : undefined,
        weeklyGoalRate: Number(formData.weeklyGoalRate || 0.5),
      };

      // Navigate to success screen, replacing the add-client wizard in the history stack
      router.replace({
        pathname: '/add-client/success',
        params: {
          formState: serializeClientForm(completeData),
        },
      });
    } catch (error: any) {
      console.error('Failed to submit client:', error);
      setSubmitError(error?.message || 'Failed to submit client. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  });

  // Switch statement to render the active step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep onContinue={handleGoToStep2} />;
      case 2:
        return <BodyInfoStep onContinue={handleGoToStep3} />;
      case 3:
        return <GoalStep onContinue={handleGoToStep4} />;
      case 4:
        return <ActivityStep onContinue={handleGoToStep5} />;
      case 5:
        return <WorkoutRoutineStep onContinue={handleGoToStep6} />;
      case 6:
        return (
          <CalorieCalculationStep
            isSubmitting={isSubmitting}
            submitError={submitError}
            onSubmit={handleGoToStep7}
          />
        );
      case 7:
        return (
          <GoalTargetStep
            isSubmitting={isSubmitting}
            submitError={submitError}
            onSubmit={handleFinalSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" hidden />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : "height"}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 24,
            paddingHorizontal: 16,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Bar */}
          <View className="flex-row items-center justify-between">
            <BackButton onPress={handleBack} />

            <Text className="text-2xl font-bold tracking-tight text-foreground">
              Add client
            </Text>

            {/* Symmetrical placeholder for centered title */}
            <View className="h-12 w-12" />
          </View>

          {/* Stepper / Progress Bar (updates with currentStep) */}
          <AddClientStepper currentStep={currentStep} />

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
