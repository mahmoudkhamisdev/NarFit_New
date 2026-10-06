import React, { forwardRef, useState } from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      required = false,
      className = '',
      containerClassName = '',
      inputClassName = '',
      labelClassName = '',
      editable = true,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const isError = Boolean(error);
    const isDisabled = editable === false;

    const getFieldStateClasses = () => {
      if (isDisabled) {
        return 'bg-card/50 border-border-subtle opacity-60';
      }
      if (isError) {
        return 'bg-card border-[1.5px] border-error';
      }
      if (isFocused) {
        return 'bg-card border-[1.5px] border-brand';
      }
      return 'bg-card border-[1px] border-border';
    };

    return (
      <View className={`${containerClassName ? containerClassName : 'w-full'}`}>
        {label && (
          <View className="mb-2 flex-row items-center gap-1">
            <Text
              className={`text-sm font-medium ${
                isDisabled ? 'text-disabled' : 'text-foreground'
              } ${labelClassName}`}
            >
              {label}
            </Text>
            {required && <Text className="text-sm font-semibold text-brand">*</Text>}
          </View>
        )}

        <View
          className={`h-14 w-full flex-row items-center rounded-2xl px-4 gap-3 ${getFieldStateClasses()} ${className}`}
        >
          {leftIcon && <View className="items-center justify-center">{leftIcon}</View>}

          <TextInput
            ref={ref}
            editable={editable}
            placeholderTextColor="#737373"
            className={`flex-1 text-base text-foreground ${inputClassName}`}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...rest}
          />

          {rightIcon && <View className="items-center justify-center">{rightIcon}</View>}
        </View>

        {/* {error ? (
          <Text className="mt-1.5 text-xs font-medium text-error">{error}</Text>
        ) : hint ? (
          <Text className="mt-1.5 text-xs text-muted">{hint}</Text>
        ) : null} */}
      </View>
    );
  }
);

Input.displayName = 'Input';
export default Input;
