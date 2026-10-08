import React, { createContext, useContext, useState } from 'react';
import {
  Pressable,
  PressableProps,
  View,
} from 'react-native';
import { Text } from '@/components/ui/text';

interface RadioGroupContextType {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  children,
  className = '',
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleSelect = (nextValue: string) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  return (
    <RadioGroupContext.Provider
      value={{
        value,
        onValueChange: handleSelect,
        disabled,
      }}
    >
      <View className={`gap-3 ${className}`}>{children}</View>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps extends Omit<PressableProps, 'children'> {
  value: string;
  checked?: boolean;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  circleClassName?: string;
  labelClassName?: string;
}

export function Radio({
  value,
  checked: individualChecked,
  label,
  description,
  disabled: individualDisabled,
  className = '',
  circleClassName = '',
  labelClassName = '',
  onPress,
  ...rest
}: RadioProps) {
  const context = useContext(RadioGroupContext);

  const isChecked =
    individualChecked !== undefined
      ? individualChecked
      : context
      ? context.value === value
      : false;

  const isDisabled = individualDisabled || context?.disabled || false;

  const handlePress = (e: any) => {
    if (isDisabled) return;
    if (context?.onValueChange) {
      context.onValueChange(value);
    }
    onPress?.(e);
  };

  return (
    <Pressable
      disabled={isDisabled}
      onPress={handlePress}
      className={`flex-row items-center gap-3 ${isDisabled ? 'opacity-50' : 'active:opacity-80'} ${className}`}
      {...rest}
    >
      <View
        className={`h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
          isChecked
            ? 'border-brand bg-card'
            : 'border-border bg-card'
        } ${circleClassName}`}
      >
        {isChecked && <View className="h-3 w-3 rounded-full bg-brand" />}
      </View>

      {(label || description) && (
        <View className="flex-1 justify-center">
          {label && (
            <Text
              className={`text-base font-medium ${
                isDisabled ? 'text-disabled' : 'text-foreground'
              } ${labelClassName}`}
            >
              {label}
            </Text>
          )}
          {description && (
            <Text className="mt-0.5 text-xs text-muted">{description}</Text>
          )}
        </View>
      )}
    </Pressable>
  );
}

export default Radio;
