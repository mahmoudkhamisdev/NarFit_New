import { BackButton } from '@/components/shared';
import { Form } from '@/components/ui';
import {
  AddClientFormValues,
  addClientFormSchema,
  defaultAddClientValues,
  serializeClientForm,
} from '@/schemas/client';
import { useAddClientStore } from '@/store';
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
import {
  AddClientStepper,
  ResumeProgressDialog,
  ActivityStep,
  BodyInfoStep,
  CalorieCalculationStep,
  GoalStep,
  GoalTargetStep,
  PersonalInfoStep,
  WorkoutRoutineStep,
} from '@/components/features/add-client';
import { Text } from '@/components/ui/text';

export default function AddClientScreen() {
  const insets = useSafeAreaInsets();

  const storedStep = useAddClientStore((s) => s.currentStep);
  const setStepInStore = useAddClientStore((s) => s.setStep);
  const setFormDataInStore = useAddClientStore((s) => s.setFormData);
  const resetProgressInStore = useAddClientStore((s) => s.resetProgress);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Resume dialog state
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);
  const [hasCheckedResume, setHasCheckedResume] = useState<boolean>(false);

  // Single centralized form instance holding state across all steps
  const form = useForm<AddClientFormValues>({
    resolver: zodResolver(addClientFormSchema),
    defaultValues: defaultAddClientValues,
    mode: 'onBlur',
  });

  // Check saved progress from store on initial load
  useEffect(() => {
    const checkResume = () => {
      const state = useAddClientStore.getState();
      const hasProgress =
        (state.currentStep && state.currentStep > 1) ||
        Boolean(state.formData?.name && state.formData.name.trim().length > 0);

      if (hasProgress && !hasCheckedResume) {
        setHasCheckedResume(true);
        setShowResumeModal(true);
      }
    };

    if (useAddClientStore.persist.hasHydrated()) {
      checkResume();
    } else {
      const unsub = useAddClientStore.persist.onFinishHydration(() => {
        checkResume();
      });
      return () => unsub();
    }
  }, [hasCheckedResume]);

  // Keep store in sync with form changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      setFormDataInStore(value as Partial<AddClientFormValues>);
    });
    return () => subscription.unsubscribe();
  }, [form, setFormDataInStore]);

  // Handle resume dialog actions
  const handleResume = () => {
    const state = useAddClientStore.getState();
    form.reset({
      ...defaultAddClientValues,
      ...state.formData,
    });
    const targetStep = state.currentStep > 0 ? state.currentStep : 1;
    setCurrentStep(targetStep);
    setShowResumeModal(false);
  };

  const handleStartFresh = () => {
    resetProgressInStore();
    form.reset(defaultAddClientValues);
    setCurrentStep(1);
    setStepInStore(1);
    setShowResumeModal(false);
  };

  // Step navigation helper
  const goToStep = (stepNumber: number) => {
    const values = form.getValues();
    setFormDataInStore(values);
    setStepInStore(stepNumber);
    setDirection('right');
    setCurrentStep(stepNumber);
  };

  // Handle hardware back on Android and BackButton click
  const handleBack = React.useCallback(() => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      const values = form.getValues();
      setFormDataInStore(values);
      setStepInStore(prevStep);
      setDirection('left');
      setCurrentStep(prevStep);
    } else {
      router.back();
    }
  }, [currentStep, form, setFormDataInStore, setStepInStore]);

  useEffect(() => {
    const onBackPress = () => {
      if (currentStep > 1) {
        handleBack();
        return true; // Prevent exiting the screen
      }
      return false; // Default back navigation on step 1
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [currentStep, handleBack]);

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

      // Reset stored draft on successful submission
      resetProgressInStore();

      // TODO: API - Create new client: POST /api/clients (payload: completeData)

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
        return <PersonalInfoStep onContinue={() => goToStep(2)} />;
      case 2:
        return <BodyInfoStep onContinue={() => goToStep(3)} />;
      case 3:
        return <GoalStep onContinue={() => goToStep(4)} />;
      case 4:
        return <ActivityStep onContinue={() => goToStep(5)} />;
      case 5:
        return <WorkoutRoutineStep onContinue={() => goToStep(6)} />;
      case 6:
        return (
          <CalorieCalculationStep
            isSubmitting={isSubmitting}
            submitError={submitError}
            onSubmit={() => goToStep(7)}
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
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Fixed Header & Stepper on top */}
        <View
          style={{ paddingTop: insets.top + 12 }}
          className="px-4 bg-background z-20"
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
        </View>

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingTop: 8,
            paddingBottom: insets.bottom + 24,
            paddingHorizontal: 16,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
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

      {/* Resume Progress Dialog */}
      <ResumeProgressDialog
        visible={showResumeModal}
        stepNumber={storedStep || 1}
        onResume={handleResume}
        onStartFresh={handleStartFresh}
      />
    </View>
  );
}
