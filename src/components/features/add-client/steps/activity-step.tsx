import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Icon,
} from '@/components/ui';
import { CLIENT_ACTIVITY_OPTIONS } from '@/constants/client';
import { AddClientFormValues } from '@/schemas/client';
import {
  Armchair,
  Bike,
  Dumbbell,
  Footprints,
  Zap,
} from 'lucide-react-native';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

const ACTIVITY_ICONS: Record<string, any> = {
  sedentary: Armchair,
  'lightly-active': Footprints,
  'moderately-active': Bike,
  'very-active': Dumbbell,
  'extremely-active': Zap,
};

interface ActivityStepProps {
  onContinue: () => void;
}

export function ActivityStep({ onContinue }: ActivityStepProps) {
  const form = useFormContext<AddClientFormValues>();

  const handleContinue = async () => {
    const isValid = await form.trigger(['activityLevel']);
    if (isValid) {
      onContinue();
    }
  };

  return (
    <View className="flex-1 justify-between">
      <View>
        {/* Page Title & Subtitle */}
        <View className="mt-8 mb-6">
          <Text className="text-5xl font-black tracking-tight text-foreground leading-[52px]">
            Client Activity{'\n'}Level
          </Text>
          <Text className="mt-2 text-base font-medium text-muted">
            How active is the client?
          </Text>
        </View>

        {/* Options List */}
        <FormField
          control={form.control}
          name="activityLevel"
          render={({ field }) => (
            <FormItem className="gap-3">
              <FormControl>
                <View className="gap-3">
                  {CLIENT_ACTIVITY_OPTIONS.map((option) => {
                    const isSelected = field.value === option.id;
                    const ActivityIcon = ACTIVITY_ICONS[option.id] || Dumbbell;

                    return (
                      <Pressable
                        key={option.id}
                        onPress={() => field.onChange(option.id)}
                        className={`h-[74px] w-full flex-row items-center rounded-2xl px-5 gap-3.5 border ${isSelected
                            ? 'border-2 border-brand bg-card'
                            : 'border border-border/80 bg-card active:bg-card-subtle'
                          }`}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: isSelected }}
                        accessibilityLabel={`${option.title}, ${option.description}`}
                      >
                        <View className="items-center justify-center">
                          <Icon
                            as={ActivityIcon}
                            size={22}
                            className={isSelected ? 'text-brand' : 'text-muted'}
                          />
                        </View>
                        <View className="flex-1 justify-center">
                          <Text
                            className={`text-lg leading-tight ${isSelected
                                ? 'font-semibold text-foreground'
                                : 'font-medium text-foreground-secondary'
                              }`}
                          >
                            {option.title}
                          </Text>
                          <Text className="text-sm text-muted mt-0.5" numberOfLines={1}>
                            {option.description}
                          </Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </View>

      {/* Continue Button */}
      <View className="pt-8">
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

export default ActivityStep;
