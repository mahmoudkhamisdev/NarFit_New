import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';
import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { Plus, X } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BottomSheetModal,
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
import { Text } from '@/components/ui/text';
import {
  PLAN_LOCAL_IMAGES,
  PlanFilterCategory,
  WorkoutLevel,
  WorkoutPlanItem,
} from '@/constants/plans';
import {
  createWorkoutPlanSchema,
  CreateWorkoutPlanFormValues,
  defaultCreateWorkoutPlanValues,
} from '@/schemas/plan';

export interface CreatePlanSheetProps {
  onPlanCreated?: (plan: WorkoutPlanItem) => void;
  onClose?: () => void;
}

const CATEGORY_OPTIONS = [
  { label: 'Weight loss', value: 'weight-loss' },
  { label: 'Muscle building', value: 'muscle-build' },
  { label: 'Strength', value: 'strength' },
  { label: 'Endurance', value: 'endurance' },
];

const LEVEL_OPTIONS = [
  { label: 'Beginner', value: 'Beginner' },
  { label: 'Intermediate', value: 'Intermediate' },
  { label: 'Advanced', value: 'Advanced' },
];

export const CreatePlanSheet = forwardRef<
  GorhomBottomSheetModal,
  CreatePlanSheetProps
>(({ onPlanCreated, onClose }, ref) => {
  const form = useForm<CreateWorkoutPlanFormValues>({
    resolver: zodResolver(createWorkoutPlanSchema),
    defaultValues: defaultCreateWorkoutPlanValues,
    mode: 'onBlur',
  });

  const onSubmit = (data: CreateWorkoutPlanFormValues) => {
    const selectedCategoryOption = CATEGORY_OPTIONS.find(
      (c) => c.value === data.category
    );

    const newPlan: WorkoutPlanItem = {
      id: `my-${Date.now()}`,
      title: data.title.trim(),
      category: selectedCategoryOption?.label || 'Custom plan',
      categoryKey: (data.category as PlanFilterCategory) || 'weight-loss',
      duration: data.duration.trim(),
      frequency: data.frequency.trim(),
      level: data.level as WorkoutLevel,
      imageUrl: PLAN_LOCAL_IMAGES.workout1,
      isCustom: true,
    };

    onPlanCreated?.(newPlan);
    form.reset(defaultCreateWorkoutPlanValues);
    (ref as any)?.current?.dismiss();
  };

  const handleDismiss = () => {
    form.reset(defaultCreateWorkoutPlanValues);
    onClose?.();
  };

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      onDismiss={handleDismiss}
      contentClassName="p-5 pb-8"
    >
      {/* Header */}
      <View className="flex-row items-center justify-between pb-3 border-b border-border-subtle">
        <View>
          <Text className="text-xl font-bold text-foreground">
            Custom Workout Plan
          </Text>
          <Text className="text-xs text-muted mt-0.5">
            Configure routine details for your client
          </Text>
        </View>

        <Pressable
          onPress={() => (ref as any)?.current?.dismiss()}
          className="size-9 rounded-full bg-surface border border-border-subtle items-center justify-center active:opacity-75"
        >
          <Icon as={X} size={18} className="text-foreground" />
        </Pressable>
      </View>

      {/* Form Content */}
      <Form {...form}>
        <View className="mt-4 gap-3">
          {/* Title Input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <FormItem className="mb-0">
                <FormControl>
                  <Input
                    label="Plan Title"
                    placeholder="e.g. Full Body Strength Split"
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    error={fieldState.error?.message}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category / Goal */}
          <FormField
            control={form.control}
            name="category"
            render={({ field, fieldState }) => (
              <FormItem className="mb-0">
                <FormControl>
                  <Select
                    label="Category / Goal"
                    options={CATEGORY_OPTIONS}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Level */}
          <FormField
            control={form.control}
            name="level"
            render={({ field, fieldState }) => (
              <FormItem className="mb-0">
                <FormControl>
                  <Select
                    label="Fitness Level"
                    options={LEVEL_OPTIONS}
                    value={field.value}
                    onValueChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Duration & Frequency Inputs */}
          <View className="flex-row gap-3">
            <View className="flex-1">
              <FormField
                control={form.control}
                name="duration"
                render={({ field, fieldState }) => (
                  <FormItem className="mb-0">
                    <FormControl>
                      <Input
                        label="Duration"
                        placeholder="e.g. 8 weeks"
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </View>

            <View className="flex-1">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field, fieldState }) => (
                  <FormItem className="mb-0">
                    <FormControl>
                      <Input
                        label="Frequency"
                        placeholder="e.g. 3-4 days"
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                        error={fieldState.error?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </View>
          </View>

          {/* Submit Button */}
          <Button
            variant="primary"
            size="md"
            fullWidth
            leftIcon={<Icon as={Plus} size={20} className="text-inverse" />}
            title="Create Workout Plan"
            onPress={form.handleSubmit(onSubmit)}
            className="mt-3"
          />
        </View>
      </Form>
    </BottomSheetModal>
  );
});

CreatePlanSheet.displayName = 'CreatePlanSheet';
export default CreatePlanSheet;
