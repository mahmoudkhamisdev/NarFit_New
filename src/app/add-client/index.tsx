import { BackButton } from '@/components/shared';
import { Form } from '@/components/ui';
import {
  AddClientFormValues,
  addClientFormSchema,
  defaultAddClientValues,
  serializeClientForm,
} from '@/schemas/client';
import { useClientStore } from '@/store';
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
  Text,
  View,
} from 'react-native';
import { FadeSlideIn } from 'react-native-animation-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AddClientStepper } from './_components/stepper';
import {
  ActivityStep,
  GoalStep,
  PersonalInfoStep,
} from './_components/steps';

export default function AddClientScreen() {
  const insets = useSafeAreaInsets();
  const addClient = useClientStore((state) => state.addClient);

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

  // Final submission handler on step 3
  const handleFinalSubmit = form.handleSubmit(async (formData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const completeData: AddClientFormValues = {
        ...formData,
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
      };

      const savedClient = await addClient(completeData);

      // Navigate to success screen, replacing the add-client wizard in the history stack
      router.replace({
        pathname: '/add-client/success',
        params: {
          formState: serializeClientForm(completeData),
          clientId: savedClient.id,
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
        return <GoalStep onContinue={handleGoToStep3} />;
      case 3:
        return (
          <ActivityStep
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
