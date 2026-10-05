import { Icon } from '@/components/ui';
import { Calendar } from 'lucide-react-native';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  Pressable,
  ReturnKeyTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export interface DateInputProps {
  value: string;
  onChange: (digits: string) => void;
  error?: string;
  className?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
}

export function getMaskedDate(digits: string) {
  const clean = digits.replace(/\D/g, '').slice(0, 8);

  const mTyped = clean.slice(0, 2);
  const mRemaining = 'MM'.slice(mTyped.length);

  const hasSlash1 = clean.length >= 2;

  const dTyped = clean.slice(2, 4);
  const dRemaining = 'DD'.slice(dTyped.length);

  const hasSlash2 = clean.length >= 4;

  const yTyped = clean.slice(4, 8);
  const yRemaining = 'YYYY'.slice(yTyped.length);

  return {
    clean,
    mTyped,
    mRemaining,
    hasSlash1,
    dTyped,
    dRemaining,
    hasSlash2,
    yTyped,
    yRemaining,
    isComplete: clean.length === 8,
  };
}

export const DateInput = forwardRef<TextInput, DateInputProps>(
  (
    {
      value,
      onChange,
      error,
      className = '',
      returnKeyType = 'done',
      onSubmitEditing,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => inputRef.current as TextInput);

    const {
      clean,
      mTyped,
      mRemaining,
      hasSlash1,
      dTyped,
      dRemaining,
      hasSlash2,
      yTyped,
      yRemaining,
    } = getMaskedDate(value);

    const handleContainerPress = () => {
      inputRef.current?.focus();
    };

    const handleTextChange = (text: string) => {
      const raw = text.replace(/\D/g, '').slice(0, 8);
      onChange(raw);
    };

    const isError = Boolean(error);

    return (
      <Pressable
        onPress={handleContainerPress}
        accessibilityRole="none"
        className={`h-[74px] w-full flex-row items-center rounded-2xl border px-4 gap-3 bg-card ${
          isError
            ? 'border-2 border-error'
            : isFocused
            ? 'border-2 border-brand'
            : 'border-border/80'
        } ${className}`}
      >
        {/* Calendar Icon */}
        <View className="items-center justify-center">
          <Icon
            as={Calendar}
            size={22}
            className={'text-muted'}
          />
        </View>

        {/* Visual Masked Date Output */}
        <View className="flex-1 flex-row items-center">
          {/* Month */}
          {mTyped.length > 0 && (
            <Text className="text-lg font-semibold text-foreground">{mTyped}</Text>
          )}
          {mRemaining.length > 0 && (
            <Text className="text-lg font-semibold text-muted">{mRemaining}</Text>
          )}

          {/* Separator 1 */}
          <Text
            className={`text-lg font-semibold mx-1 ${
              hasSlash1 ? 'text-foreground' : 'text-muted/40'
            }`}
          >
            /
          </Text>

          {/* Day */}
          {dTyped.length > 0 && (
            <Text className="text-lg font-semibold text-foreground">{dTyped}</Text>
          )}
          {dRemaining.length > 0 && (
            <Text className="text-lg font-semibold text-muted">{dRemaining}</Text>
          )}

          {/* Separator 2 */}
          <Text
            className={`text-lg font-semibold mx-1 ${
              hasSlash2 ? 'text-foreground' : 'text-muted/40'
            }`}
          >
            /
          </Text>

          {/* Year */}
          {yTyped.length > 0 && (
            <Text className="text-lg font-semibold text-foreground">{yTyped}</Text>
          )}
          {yRemaining.length > 0 && (
            <Text className="text-lg font-semibold text-muted">{yRemaining}</Text>
          )}
        </View>

        {/* Invisible Real TextInput that handles keystrokes and native input */}
        <TextInput
          ref={inputRef}
          value={clean}
          onChangeText={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType="number-pad"
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          maxLength={8}
          style={StyleSheet.absoluteFill}
          className="opacity-0"
          caretHidden={true}
        />
      </Pressable>
    );
  }
);

DateInput.displayName = 'DateInput';

export default DateInput;
