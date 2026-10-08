import React from 'react';
import { View } from 'react-native';
import { useFormContext } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Icon,
  Input,
} from '@/components/ui';
import { Text } from '@/components/ui/text';
import { AddClientFormValues } from '@/schemas/client';
import { Ruler, Scale } from 'lucide-react-native';

interface BodyInfoStepProps {
  onContinue: () => void;
}

export function BodyInfoStep({ onContinue }: BodyInfoStepProps) {
  const form = useFormContext<AddClientFormValues>();

  const handleContinue = async () => {
    const isValid = await form.trigger(['weight', 'height']);
    if (isValid) {
      onContinue();
    }
  };

  return (
    <View className="flex-1 justify-between">
      <View className="pt-2">
        {/* Step Title & Subtitle */}
        <View className="mt-8 mb-6">
          <Text className="text-5xl font-black tracking-tight text-foreground leading-13">
            Body Information
          </Text>
          <Text className="mt-2 text-base font-medium text-muted">
            Enter the basic body details to calculate calories and build the plan.
          </Text>
        </View>

        {/* Inputs Stack */}
        <View className="gap-5">
          {/* Weight Input */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input
                    value={field.value !== undefined && field.value !== null ? String(field.value) : ''}
                    onChangeText={(text) => {
                      const clean = text.replace(/[^0-9.]/g, '');
                      field.onChange(clean);
                    }}
                    onBlur={field.onBlur}
                    placeholder="Weight"
                    keyboardType="numeric"
                    className="h-[74px]"
                    inputClassName="text-base font-semibold text-foreground"
                    leftIcon={<Icon as={Scale} size={22} className="text-muted" />}
                    error={fieldState.error?.message}
                    rightIcon={
                      <Text className="text-base font-medium text-muted">Kg</Text>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Height Input */}
          <FormField
            control={form.control}
            name="height"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Input
                    value={field.value !== undefined && field.value !== null ? String(field.value) : ''}
                    onChangeText={(text) => {
                      const clean = text.replace(/[^0-9.]/g, '');
                      field.onChange(clean);
                    }}
                    onBlur={field.onBlur}
                    placeholder="Height"
                    keyboardType="numeric"
                    className="h-[74px]"
                    inputClassName="text-base font-semibold text-foreground"
                    leftIcon={<Icon as={Ruler} size={22} className="text-muted" />}
                    error={fieldState.error?.message}
                    rightIcon={
                      <Text className="text-base font-medium text-muted">Cm</Text>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
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

export default BodyInfoStep;
