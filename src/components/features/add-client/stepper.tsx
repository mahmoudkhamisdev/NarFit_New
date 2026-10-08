import React from 'react';
import { View } from 'react-native';

export interface AddClientStepperProps {
  currentStep: number;
  totalSteps?: number;
}

export function AddClientStepper({ currentStep, totalSteps = 7 }: AddClientStepperProps) {
  return (
    <View className="flex-row items-center gap-2.5 pt-4 pb-2">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isActive = index < currentStep;
        return (
          <View
            key={index}
            className={`h-1.5 flex-1 rounded-full ${
              isActive ? 'bg-brand' : 'bg-card-subtle'
            }`}
          />
        );
      })}
    </View>
  );
}

export default AddClientStepper;
