import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeSlideIn } from 'react-native-animation-kit';
import { Sparkles, X } from 'lucide-react-native';
import { BackButton } from '@/components/shared';
import { Button, Icon, Input, Text } from '@/components/ui';
import {
  CLIENT_GOAL_OPTIONS,
  GOAL_ICONS,
} from '@/constants/client';

const PREDEFINED_GOAL_IDS = [
  'lose-weight',
  'eat-healthier',
  'gain-weight',
  'build-muscle',
];

export default function ClientGoalScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id, initialGoal } = useLocalSearchParams<{
    id?: string;
    initialGoal?: string;
  }>();
  const clientId = id;
  void clientId;
  // TODO: API - Fetch current client goal: GET /api/clients/${clientId}/goal
  const startingGoal = initialGoal || 'lose-weight';

  const isInitialCustom = useMemo(
    () => startingGoal && !PREDEFINED_GOAL_IDS.includes(startingGoal),
    [startingGoal]
  );

  const [selectedGoal, setSelectedGoal] = useState<string>(startingGoal);
  const [customGoalText, setCustomGoalText] = useState<string>(
    isInitialCustom ? startingGoal : ''
  );
  const [isOtherSelected, setIsOtherSelected] = useState<boolean>(
    Boolean(isInitialCustom || startingGoal === 'something-else')
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectPredefined = (goalId: string) => {
    setIsOtherSelected(false);
    setSelectedGoal(goalId);
    setErrorMessage(null);
  };

  const handleSelectOther = () => {
    setIsOtherSelected(true);
    setSelectedGoal(customGoalText.trim() || 'something-else');
    setErrorMessage(null);
  };

  const handleCustomTextChange = (text: string) => {
    setCustomGoalText(text);
    setSelectedGoal(text.trim() === '' ? 'something-else' : text);
    if (text.trim().length > 0) {
      setErrorMessage(null);
    }
  };

  const handleClearOther = () => {
    setIsOtherSelected(false);
    setCustomGoalText('');
    setSelectedGoal('lose-weight');
    setErrorMessage(null);
  };

  const handleSaveGoal = () => {
    const finalValue = isOtherSelected
      ? customGoalText.trim()
      : selectedGoal.trim();

    if (!finalValue || finalValue === 'something-else') {
      setErrorMessage('Please write client goal');
      return;
    }

    // TODO: API - Update client goal: PATCH /api/clients/${clientId}/goal { goal: finalValue }
    router.back();
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header Bar */}
        <View
          style={{ paddingTop: insets.top + 8 }}
          className="px-4 pb-2 bg-background z-20 flex-row items-center justify-between"
        >
          <BackButton onPress={() => router.back()} />

          <Text className="text-2xl font-bold tracking-tight text-foreground">
            Client goal
          </Text>

          {/* Symmetrical placeholder */}
          <View className="h-12 w-12" />
        </View>

        {/* Content ScrollView */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: insets.bottom + 24,
            flexGrow: 1,
            justifyContent: 'space-between',
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/* Title & Subtitle */}
            <View className="mt-6 mb-6">
              <Text className="text-5xl font-black tracking-tight text-foreground leading-13">
                Client goal
              </Text>
              <Text className="mt-2 text-base font-medium text-muted">
                What’s client goal
              </Text>
            </View>

            {/* Options List */}
            <View className="gap-3">
              {CLIENT_GOAL_OPTIONS.map((option) => {
                const isSomethingElse = option.id === 'something-else';
                const isSelected = isSomethingElse
                  ? isOtherSelected
                  : !isOtherSelected && selectedGoal === option.id;

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
                        value={customGoalText}
                        onChangeText={handleCustomTextChange}
                        placeholder="Write client goal"
                        className="h-[74px] px-5 border-2 border-brand"
                        style={{ height: 74 }}
                        inputClassName="text-base font-semibold text-foreground"
                        leftIcon={
                          <Icon as={Sparkles} size={22} className="text-brand" />
                        }
                        error={errorMessage || undefined}
                        autoFocus
                        rightIcon={
                          <Pressable
                            hitSlop={12}
                            onPress={handleClearOther}
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

                const GoalIcon = GOAL_ICONS[option.id] || Sparkles;

                return (
                  <Pressable
                    key={option.id}
                    onPress={() => {
                      if (isSomethingElse) {
                        handleSelectOther();
                      } else {
                        handleSelectPredefined(option.id);
                      }
                    }}
                    className={`h-[74px] w-full flex-row items-center rounded-2xl px-5 gap-3.5 border ${
                      isSelected
                        ? 'border-2 border-brand bg-card'
                        : 'border border-border/80 bg-card active:bg-card-subtle'
                    }`}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: isSelected }}
                    accessibilityLabel={option.label}
                  >
                    <View className="items-center justify-center">
                      <Icon
                        as={GoalIcon}
                        size={22}
                        className={isSelected ? 'text-brand' : 'text-muted'}
                      />
                    </View>
                    <Text
                      numberOfLines={1}
                      className={`flex-1 text-base ${
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
          </View>

          {/* Save Goal Button */}
          <View className="pt-6">
            <Button
              title="Save goal"
              variant="primary"
              size="lg"
              className="h-[74px] w-full rounded-2xl shadow-md"
              textClassName="text-lg font-bold text-inverse"
              onPress={handleSaveGoal}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
