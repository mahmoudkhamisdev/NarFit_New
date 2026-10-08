import { Popover } from '@/components/shared';
import { Tag } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { CLIENT_ACTIVITY_OPTIONS, CLIENT_GOAL_OPTIONS } from '@/constants/client';
import { AddClientFormValues } from '@/schemas/client';
import {
  Flame,
  Footprints,
  Info,
  Lightbulb,
  Minus,
  Plus,
} from 'lucide-react-native';
import React, { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Pressable, View } from 'react-native';

interface CalorieCalculationStepProps {
  isSubmitting?: boolean;
  submitError?: string | null;
  onSubmit: () => void;
}

export function CalorieCalculationStep({
  isSubmitting = false,
  submitError = null,
  onSubmit,
}: CalorieCalculationStepProps) {
  const form = useFormContext<AddClientFormValues>();

  const weight = Number(form.watch('weight')) || 80;
  const height = Number(form.watch('height')) || 178;
  const age = Number(form.watch('age')) || 26;
  const gender = form.watch('gender') || 'male';
  const activityLevel = form.watch('activityLevel') || 'moderately-active';
  const goal = form.watch('goal') || 'lose-weight';

  // Dynamic BMR calculation (Mifflin-St Jeor)
  const bmr = useMemo(() => {
    return Math.round(
      gender === 'female'
        ? 10 * weight + 6.25 * height - 5 * age - 161
        : 10 * weight + 6.25 * height - 5 * age + 5
    );
  }, [gender, weight, height, age]);

  // Activity multipliers
  const tdee = useMemo(() => {
    const multipliers: Record<string, number> = {
      sedentary: 1.2,
      'lightly-active': 1.375,
      'moderately-active': 1.55,
      'very-active': 1.725,
      'extremely-active': 1.9,
    };
    const mult = multipliers[activityLevel] || 1.55;
    return Math.round(bmr * mult);
  }, [bmr, activityLevel]);

  // Goal adjustment description and tag
  const { goalTag, goalDescription, calculatedTarget } = useMemo(() => {
    let deficit = -500;
    let tag = '-500 kcal deficit';
    let desc =
      'This target is designed for safe and sustainable weight loss (—0.5 kg per week).';

    if (goal === 'build-muscle') {
      deficit = 300;
      tag = '+300 kcal surplus';
      desc =
        'This target provides optimal fuel for lean muscle growth with minimal fat gain.';
    } else if (goal === 'gain-weight') {
      deficit = 500;
      tag = '+500 kcal surplus';
      desc =
        'This target is designed for healthy, steady mass and weight gain.';
    } else if (goal === 'eat-healthier') {
      deficit = 0;
      tag = 'Maintenance';
      desc =
        'This target maintains current weight while focusing on nutrition quality.';
    }

    return {
      goalTag: tag,
      goalDescription: desc,
      calculatedTarget: Math.max(1200, tdee + deficit),
    };
  }, [goal, tdee]);

  const currentCalorieTarget = form.watch('calorieTarget') || calculatedTarget;

  // Active activity label & description
  const selectedActivity =
    CLIENT_ACTIVITY_OPTIONS.find((a) => a.id === activityLevel) ||
    CLIENT_ACTIVITY_OPTIONS[2];

  // Active goal label
  const selectedGoal =
    CLIENT_GOAL_OPTIONS.find((g) => g.id === goal) || CLIENT_GOAL_OPTIONS[0];

  const handleIncrement = () => {
    const nextVal = currentCalorieTarget + 50;
    form.setValue('calorieTarget', nextVal, { shouldValidate: true });
  };

  const handleDecrement = () => {
    const nextVal = Math.max(1000, currentCalorieTarget - 50);
    form.setValue('calorieTarget', nextVal, { shouldValidate: true });
  };

  const handleContinue = async () => {
    if (!form.getValues('calorieTarget')) {
      form.setValue('calorieTarget', calculatedTarget);
    }
    onSubmit();
  };

  return (
    <View className="flex-1 justify-between">
      <View>
        {/* Step Title & Subtitle */}
        <View className="mt-8 mb-6">
          <Text className="text-5xl font-black tracking-tight text-foreground leading-13">
            Calorie{'\n'}Calculation
          </Text>
          <Text className="mt-2 text-base font-medium text-muted">
            Based on the information you provided, here are your client&apos;s estimated calorie needs.
          </Text>
        </View>

        {/* 1. BMR & TDEE KPIs Row */}
        <View className="flex-row gap-3 mb-3">
          {/* BMR Card */}
          <View className="flex-1 bg-card rounded-2xl p-4 border border-border/60">
            <View className="flex-row items-start gap-3">
              <View className="h-11 w-11 rounded-xl items-center justify-center border border-border">
                <Icon as={Flame} size={22} className="text-amber-500" />
              </View>
              <View className="flex-1">
                <Popover
                  title="Basal Metabolic Rate (BMR)"
                  content="The baseline calories burned daily to keep vital organs functioning at complete rest."
                >
                  <View className="flex-row items-center gap-1">
                    <Text className="text-sm font-semibold text-muted">BMR</Text>
                    <Icon as={Info} size={13} className="text-muted" />
                  </View>
                </Popover>
                <Text className="text-2xl font-black text-foreground tracking-tight mt-0.5">
                  {bmr}
                </Text>
                <Text className="text-xs font-medium text-muted mt-0.5">
                  Kcal / day
                </Text>
              </View>
            </View>
          </View>

          {/* TDEE Card */}
          <View className="flex-1 bg-card rounded-2xl p-4 border border-border/60">
            <View className="flex-row items-start gap-3">
              <View className="h-11 w-11 rounded-xl items-center justify-center border border-border">
                <Icon as={Flame} size={22} className="text-amber-500" />
              </View>
              <View className="flex-1">
                <Popover
                  title="Total Daily Energy Expenditure (TDEE)"
                  content="Total calories burned daily factoring in BMR, daily movement, lifestyle, and exercise activity."
                >
                  <View className="flex-row items-center gap-1">
                    <Text className="text-sm font-semibold text-muted">TDEE</Text>
                    <Icon as={Info} size={13} className="text-muted" />
                  </View>
                </Popover>
                <Text className="text-2xl font-black text-foreground tracking-tight mt-0.5">
                  {tdee}
                </Text>
                <Text className="text-xs font-medium text-muted mt-0.5">
                  Kcal / day
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* 2. Activity Level Card */}
        <View className="bg-card rounded-2xl p-4 border border-border/60 flex-row items-center gap-3.5 mb-3">
          <View className="h-11 w-11 rounded-xl bg-card-subtle items-center justify-center border border-border-subtle">
            <Icon as={Footprints} size={20} className="text-brand" />
          </View>
          <View className="flex-1">
            <Popover
              title="Activity Level"
              content="Multiplies BMR based on your client's weekly training sessions and daily physical exertion."
            >
              <View className="flex-row items-center gap-1">
                <Text className="text-xs font-semibold text-muted">Activity level</Text>
                <Icon as={Info} size={12} className="text-muted" />
              </View>
            </Popover>
            <Text className="text-base font-bold text-foreground mt-0.5">
              {selectedActivity.title}
            </Text>
            <Text className="text-xs text-muted mt-0.5" numberOfLines={1}>
              {selectedActivity.description}
            </Text>
          </View>
        </View>

        {/* 3. Goal Card */}
        <View className="bg-card rounded-2xl p-4 border border-border/60 flex-row items-center gap-3.5 mb-5">
          <View className="h-11 w-11 rounded-xl bg-card-subtle items-center justify-center border border-border-subtle">
            <Icon as={Flame} size={20} className="text-brand" />
          </View>
          <View className="flex-1">
            <Popover
              title="Client Goal"
              content="Adjusts daily calories into a deficit for fat loss or a surplus for muscle gain and mass."
            >
              <View className="flex-row items-center gap-1">
                <Text className="text-xs font-semibold text-muted">Goal</Text>
                <Icon as={Info} size={12} className="text-muted" />
              </View>
            </Popover>
            <Text className="text-base font-bold text-foreground mt-0.5">
              {selectedGoal.label}
            </Text>
            <Text className="text-xs text-muted mt-0.5" numberOfLines={1}>
              {goal === 'lose-weight'
                ? 'Lose fat and improve overall health'
                : 'Targeted nutrition for client goal'}
            </Text>
          </View>
        </View>

        {/* 4. Weekly Goal Rate */}
        <View className="mb-5">
          <Popover
            title="Weekly Goal Rate"
            content="The planned caloric deficit or surplus designed for sustainable, safe weekly weight and muscle changes."
          >
            <View className="flex-row items-center gap-1.5 mb-2.5">
              <Text className="text-lg font-bold text-foreground">Weekly Goal Rate</Text>
              <Icon as={Info} size={15} className="text-muted" />
            </View>
          </Popover>

          <View className="bg-card border-[1.5px] border-brand rounded-2xl p-4 flex-row items-start gap-3.5 shadow-sm">
            <View className="h-11 w-11 rounded-xl items-center justify-center border border-border">
              <Icon as={Flame} size={20} className="text-amber-500" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-bold text-foreground">
                  {currentCalorieTarget} kcal / day
                </Text>
                <Tag label={goalTag} size='sm' className='rounded-lg' />
              </View>
              <Text className="text-xs text-muted mt-1 leading-relaxed">
                {goalDescription}
              </Text>
            </View>
          </View>
        </View>

        {/* 5. Calorie Target */}
        <View className="mb-5">
          <Popover
            title="Daily Calorie Target"
            content="The recommended net calorie intake. You can fine-tune it by tapping + or -."
          >
            <View className="flex-row items-center gap-1.5 mb-2.5">
              <Text className="text-lg font-bold text-foreground">Calorie Target</Text>
              <Icon as={Info} size={15} className="text-muted" />
            </View>
          </Popover>

          <View className="flex-row items-center gap-3">
            {/* Stepper Box */}
            <View className="flex-1 bg-card rounded-2xl border border-border/80 flex-row items-center justify-between p-1.5">
              <Pressable
                onPress={handleDecrement}
                className="h-9 w-9 rounded-xl bg-card-subtle items-center justify-center border border-border-subtle active:opacity-70"
                accessibilityRole="button"
                accessibilityLabel="Decrease calorie target"
              >
                <Icon as={Minus} size={16} className="text-foreground" />
              </Pressable>

              <View className="flex-row gap-1 items-center">
                <Text className="text-base font-black text-foreground">
                  {currentCalorieTarget}
                </Text>
                <Text className="text-sm font-medium text-muted">kcal / day</Text>
              </View>

              <Pressable
                onPress={handleIncrement}
                className="h-9 w-9 rounded-xl bg-card-subtle items-center justify-center border border-border-subtle active:opacity-70"
                accessibilityRole="button"
                accessibilityLabel="Increase calorie target"
              >
                <Icon as={Plus} size={16} className="text-foreground" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* 6. Tip Banner */}
        <View className="bg-card rounded-2xl p-4 border border-border/60 flex-row items-center gap-3.5 mb-2">
          <View className="h-10 w-10 rounded-xl items-center justify-center border border-border">
            <Icon as={Lightbulb} size={18} className="text-amber-500" />
          </View>
          <Text className="flex-1 text-xs text-muted leading-relaxed">
            You can always adjust this later in the client profile based on progress and results.
          </Text>
        </View>
      </View>

      {/* Final Submit Button */}
      <View className="pt-8">
        {submitError && (
          <View className="mb-3 items-center justify-center rounded-xl bg-error/10 px-4 py-2.5 border border-error/20">
            <Text className="text-sm font-semibold text-error text-center">
              {submitError}
            </Text>
          </View>
        )}
        <Button
          title="Continue"
          variant="primary"
          size="lg"
          className="h-[74px] w-full rounded-2xl shadow-md"
          textClassName="text-lg font-bold text-inverse"
          loading={isSubmitting}
          disabled={isSubmitting}
          onPress={handleContinue}
        />
      </View>
    </View>
  );
}

export default CalorieCalculationStep;
