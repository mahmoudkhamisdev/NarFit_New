import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Icon,
  Input,
} from '@/components/ui';
import { CLIENT_GOAL_OPTIONS } from '@/constants/client';
import { AddClientFormValues, defaultAddClientValues } from '@/schemas/client';
import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { FadeSlideIn } from 'react-native-animation-kit';

const PREDEFINED_GOAL_IDS = [
  'lose-weight',
  'eat-healthier',
  'gain-weight',
  'build-muscle',
];

interface GoalStepProps {
  onContinue: () => void;
}

export function GoalStep({ onContinue }: GoalStepProps) {
  const form = useFormContext<AddClientFormValues>();
  const currentGoal = form.getValues('goal');

  const isInitialCustom =
    currentGoal && !PREDEFINED_GOAL_IDS.includes(currentGoal);

  const [isOtherSelected, setIsOtherSelected] = useState<boolean>(
    Boolean(isInitialCustom || currentGoal === 'something-else')
  );

  const handleContinue = async () => {
    const val = form.getValues('goal')?.trim() || '';
    if (!val || val === 'something-else') {
      form.setError('goal', { message: 'Please write client goal' });
      return;
    }
    form.clearErrors('goal');
    onContinue();
  };

  return (
    <View className="flex-1">
      {/* Page Title & Subtitle */}
      <View className="mt-8 mb-6">
        <Text className="text-5xl font-black tracking-tight text-foreground leading-[52px]">
          Client goal
        </Text>
        <Text className="mt-2 text-base font-medium text-muted">
          What’s client goal
        </Text>
      </View>

      {/* Options List */}
      <FormField
        control={form.control}
        name="goal"
        render={({ field, fieldState }) => (
          <FormItem className="gap-3">
            <FormControl>
              <View className="gap-3">
                {CLIENT_GOAL_OPTIONS.map((option) => {
                  const isSomethingElse = option.id === 'something-else';
                  const isSelected = isSomethingElse
                    ? isOtherSelected
                    : !isOtherSelected && field.value === option.id;

                  if (isSomethingElse && isOtherSelected) {
                    return (
                      <FadeSlideIn
                        key={option.id}
                        duration={300}
                        distance={15}
                        direction="right"
                        style={{ width: '100%' }}
                      >
                        <Input
                          value={
                            field.value === 'something-else'
                              ? ''
                              : field.value
                          }
                          onChangeText={(text) => {
                            field.onChange(text.trim() === '' ? 'something-else' : text);
                          }}
                          onBlur={field.onBlur}
                          placeholder="Write client goal"
                          className="h-[74px] px-5 border-2 border-brand"
                          style={{ height: 74 }}
                          inputClassName="text-base font-semibold text-foreground"
                          error={fieldState.error?.message}
                          autoFocus
                          rightIcon={
                            <Pressable
                              hitSlop={12}
                              onPress={() => {
                                setIsOtherSelected(false);
                                field.onChange(defaultAddClientValues.goal);
                              }}
                              accessibilityRole="button"
                              accessibilityLabel="Clear goal"
                              className="p-1"
                            >
                              <Icon as={X} size={20} className="text-muted" />
                            </Pressable>
                          }
                        />
                      </FadeSlideIn>
                    );
                  }

                  return (
                    <Pressable
                      key={option.id}
                      onPress={() => {
                        if (isSomethingElse) {
                          setIsOtherSelected(true);
                          if (PREDEFINED_GOAL_IDS.includes(field.value)) {
                            field.onChange('something-else');
                          }
                        } else {
                          setIsOtherSelected(false);
                          field.onChange(option.id);
                        }
                      }}
                      className={`h-[74px] w-full flex-row items-center rounded-2xl px-5 border ${
                        isSelected
                          ? 'border-2 border-brand bg-card'
                          : 'border border-border/80 bg-card active:bg-card-subtle'
                      }`}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: isSelected }}
                      accessibilityLabel={option.label}
                    >
                      <Text
                        className={`text-lg ${
                          isSelected
                            ? 'font-semibold text-foreground'
                            : 'font-medium text-muted'
                        }`}
                      >
                        {option.label}
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

      {/* Continue Button */}
      <View className="pt-4">
        <Button
          title="Continue"
          variant="primary"
          size="lg"
          className="h-[74px] w-full rounded-2xl shadow-md"
          textClassName="text-lg font-bold text-inverse"
          onPress={handleContinue}
        />
      </View>
    </View>
  );
}
