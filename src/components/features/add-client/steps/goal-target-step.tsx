import { Popover } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Slider } from '@/components/ui/slider';
import { Text } from '@/components/ui/text';
import { CLIENT_GOAL_OPTIONS } from '@/constants/client';
import { AddClientFormValues } from '@/schemas/client';
import {
  Flame,
  Flag,
  Info,
  Scale,
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Pressable,
  TextInput,
  View,
} from 'react-native';

interface GoalTargetStepProps {
  isSubmitting?: boolean;
  submitError?: string | null;
  onSubmit: () => void;
}

export function GoalTargetStep({
  isSubmitting = false,
  submitError = null,
  onSubmit,
}: GoalTargetStepProps) {
  const form = useFormContext<AddClientFormValues>();

  const currentWeight = Number(form.watch('weight')) || 110;
  const initialTargetWeight = form.watch('targetWeight')
    ? Number(form.watch('targetWeight'))
    : Math.max(50, Math.round(currentWeight - 25));
  const goal = form.watch('goal') || 'lose-weight';

  const [targetWeight, setTargetWeight] = useState<number>(initialTargetWeight);
  const [weeklyRate, setWeeklyRate] = useState<number>(
    form.watch('weeklyGoalRate') || 0.5
  );

  // Active goal label
  const selectedGoal =
    CLIENT_GOAL_OPTIONS.find((g) => g.id === goal) || CLIENT_GOAL_OPTIONS[0];

  const isGaining = goal === 'gain-weight' || goal === 'build-muscle';

  // Dynamic calculation of weeks to reach target
  const estimatedWeeks = useMemo(() => {
    const diff = Math.abs(currentWeight - targetWeight);
    if (diff === 0 || weeklyRate <= 0) return 1;
    return Math.max(1, Math.round(diff / weeklyRate));
  }, [currentWeight, targetWeight, weeklyRate]);

  const handleWeeklyRateChange = (val: number) => {
    setWeeklyRate(val);
    form.setValue('weeklyGoalRate', val);
  };

  const handleTargetWeightChange = (val: string) => {
    const cleaned = val.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleaned);
    if (!isNaN(num)) {
      setTargetWeight(num);
      form.setValue('targetWeight', cleaned);
    } else if (cleaned === '') {
      setTargetWeight(0);
      form.setValue('targetWeight', '');
    }
  };

  const handleContinue = () => {
    form.setValue('targetWeight', String(targetWeight));
    form.setValue('weeklyGoalRate', weeklyRate);
    onSubmit();
  };

  return (
    <View className="flex-1 justify-between">
      <View>
        {/* Step Title & Subtitle */}
        <View className="mt-8 mb-6">
          <Text className="text-5xl font-black tracking-tight text-foreground leading-13">
            Goal{'\n'}target
          </Text>
          <Text className="mt-2 text-base font-medium text-muted">
            Based on the information you provided, here are your client&apos;s estimated calorie needs.
          </Text>
        </View>

        {/* 1. Goal KPI Card */}
        <View className="bg-card rounded-2xl p-4 border border-border/60 flex-row gap-3.5 mb-4">
          <View className="h-11 w-11 rounded-xl items-center justify-center border border-border">
            <Icon as={Flame} size={22} className="text-amber-500" />
          </View>
          <View className="flex-1 items-start">
            <Popover
              title="Goal"
              content="Primary fitness objective set for your client to steer timeline and caloric balance."
            >
              <View className="flex-row items-center gap-1">
                <Text className="text-xs font-semibold text-muted">Goal</Text>
                <Icon as={Info} size={12} className="text-muted" />
              </View>
            </Popover>
            <Text className="text-lg font-bold text-foreground mt-0.5">
              {selectedGoal.label === 'Lose weight' ? 'Weight Loss' : selectedGoal.label}
            </Text>
            <Text className="text-xs text-muted mt-0.5" numberOfLines={1}>
              {goal === 'lose-weight'
                ? 'Lose fat and improve overall health'
                : 'Targeted nutrition for client goal'}
            </Text>
          </View>
        </View>

        {/* 2. Current Weight & Target Weight Row */}
        <View className="flex-row gap-3 mb-5">
          {/* Current Weight */}
          <View className="flex-1">
            <Text className="text-base font-semibold text-foreground mb-1.5">
              Current Weight
            </Text>
            <View className="h-[74px] bg-card rounded-2xl border border-border/80 flex-row items-center justify-between px-3.5">
              <View className="flex-row items-center gap-2.5">
                <Icon as={Scale} size={22} className="text-muted" />
                <Text className="text-xl font-bold text-foreground">
                  {currentWeight}
                </Text>
              </View>
              <Text className="text-sm font-semibold text-muted">Kg</Text>
            </View>
          </View>

          {/* Target Weight */}
          <View className="flex-1">
            <Text className="text-base font-semibold text-foreground mb-1.5">
              Target Weight
            </Text>
            <View className="h-[74px] bg-card rounded-2xl border border-border/80 flex-row items-center justify-between px-3.5">
              <View className="flex-row items-center gap-2.5 flex-1">
                <Icon as={Scale} size={22} className="text-muted" />
                <TextInput
                  value={targetWeight > 0 ? String(targetWeight) : ''}
                  onChangeText={handleTargetWeightChange}
                  keyboardType="decimal-pad"
                  className="text-xl font-bold text-foreground flex-1 p-0"
                  placeholder="80"
                  placeholderTextColor="#71717a"
                  accessibilityLabel="Target weight in kilograms"
                />
              </View>
              <Text className="text-sm font-semibold text-muted">Kg</Text>
            </View>
          </View>
        </View>

        {/* 3. Weekly Goal Rate Section */}
        <View className="mb-2">
          <Popover
            title="Weekly Goal Rate"
            content="Controls how fast your client targets change. 0.5 kg/week is optimal for sustainable long-term results."
          >
            <View className="flex-row items-center gap-1.5">
              <Text className="text-xl font-bold text-foreground">Weekly Goal Rate</Text>
              <Icon as={Info} size={15} className="text-muted" />
            </View>
          </Popover>
          <Text className="text-xs text-muted mt-0.5">
            Choose how fast you want your client to reach the target.
          </Text>
        </View>

        {/* 4. Weight loss/gain display & Interactive Slider */}
        <View className="items-center justify-center mt-3 mb-2">
          <Text className="text-sm font-medium text-foreground">
            {isGaining ? 'Weight gain per week' : 'Weight loss per week'}
          </Text>
          <Text className="text-6xl font-black text-foreground tracking-tight mt-1">
            {weeklyRate.toFixed(1)}
          </Text>
        </View>

        {/* Recommended Tooltip & Slider Container */}
        <View className="w-full my-2">
          {/* Tilted Recommended Tag aligned with Optimal mark */}
          <View className="items-center mb-1 -rotate-[13.75deg]">
            <View className="bg-brand px-3 py-1 rounded-xl shadow-md">
              <Text className="text-xs font-bold text-inverse">
                Recommended
              </Text>
            </View>
            {/* Arrow triangle pointing downward */}
            <View
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: 5,
                borderRightWidth: 5,
                borderTopWidth: 6,
                borderStyle: 'solid',
                backgroundColor: 'transparent',
                alignSelf: 'center',
              }}
              className="border-t-brand border-l-transparent border-r-transparent"
            />
          </View>

          {/* Smooth Touch & Drag Slider from UI components */}
          <Slider
            value={weeklyRate}
            onValueChange={handleWeeklyRateChange}
            min={0.2}
            max={1.0}
            step={0.1}
            trackHeight={17}
            thumbSize={28}
          />

          {/* Slider Labels */}
          <View className="flex-row justify-between items-center mt-2 px-1">
            <Pressable
              onPress={() => handleWeeklyRateChange(0.3)}
              hitSlop={8}
            >
              <Text
                className={`text-sm ${weeklyRate <= 0.3 ? 'font-bold text-foreground' : 'font-medium text-muted'}`}
              >
                Slow
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleWeeklyRateChange(0.5)}
              hitSlop={8}
            >
              <Text
                className={`text-sm ${Math.abs(weeklyRate - 0.5) < 0.05 ? 'font-black text-brand' : 'font-semibold text-muted'}`}
              >
                Optimal
              </Text>
            </Pressable>

            <Pressable
              onPress={() => handleWeeklyRateChange(0.8)}
              hitSlop={8}
            >
              <Text
                className={`text-sm ${weeklyRate >= 0.8 ? 'font-bold text-foreground' : 'font-medium text-muted'}`}
              >
                Fast
              </Text>
            </Pressable>
          </View>
        </View>

        {/* 5. Estimated Time to Reach Goal Card */}
        <View className="bg-card rounded-2xl p-4 border border-border/60 flex-row items-start gap-3.5 mt-4 mb-2">
          <View className="h-11 w-11 rounded-xl items-center justify-center border border-border">
            <Icon as={Flag} size={20} className="text-foreground" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-black text-foreground">
              {estimatedWeeks} weeks
            </Text>
            <Text className="text-xs font-semibold text-muted mt-0.5">
              Estimated time to reach goal
            </Text>
            <Text className="text-xs text-muted mt-1 leading-relaxed">
              At a rate of {weeklyRate.toFixed(1)} kg per week, your client can reach {targetWeight} kg in approximately {estimatedWeeks} weeks.
            </Text>
          </View>
        </View>
      </View>

      {/* Final Submit Button */}
      <View className="pt-6">
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

export default GoalTargetStep;
