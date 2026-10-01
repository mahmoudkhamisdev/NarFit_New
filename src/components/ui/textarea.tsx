import React, { forwardRef, useState } from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

export interface TextareaProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  showCount?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export const Textarea = forwardRef<TextInput, TextareaProps>(
  (
    {
      label,
      hint,
      error,
      required = false,
      showCount = false,
      maxLength,
      value,
      defaultValue,
      containerClassName = '',
      inputClassName = '',
      labelClassName = '',
      editable = true,
      onFocus,
      onBlur,
      onChangeText,
      ...rest
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [currentText, setCurrentText] = useState(value || defaultValue || '');

    const isError = Boolean(error);
    const isDisabled = editable === false;

    const getFieldStateClasses = () => {
      if (isDisabled) {
        return 'bg-card/50 border-border-subtle opacity-60';
      }
      if (isError) {
        return 'bg-card border-error ring-1 ring-error';
      }
      if (isFocused) {
        return 'bg-card border-brand ring-1 ring-brand/40';
      }
      return 'bg-card border-border';
    };

    const handleTextChange = (text: string) => {
      setCurrentText(text);
      onChangeText?.(text);
    };

    const characterCount = typeof value === 'string' ? value.length : currentText.length;

    return (
      <View className={`w-full ${containerClassName}`}>
        {label && (
          <View className="mb-2 flex-row items-center justify-between">
            <View className="flex-row items-center gap-1">
              <Text
                className={`text-sm font-medium ${
                  isDisabled ? 'text-disabled' : 'text-foreground'
                } ${labelClassName}`}
              >
                {label}
              </Text>
              {required && <Text className="text-sm font-semibold text-brand">*</Text>}
            </View>
            {showCount && maxLength && (
              <Text className="text-xs text-muted">
                {characterCount}/{maxLength}
              </Text>
            )}
          </View>
        )}

        <View className={`min-h-35 w-full rounded-2xl border px-4 py-2 ${getFieldStateClasses()}`}>
          <TextInput
            ref={ref}
            multiline
            editable={editable}
            maxLength={maxLength}
            textAlignVertical="top"
            placeholderTextColor="#737373"
            className={`flex-1 text-base leading-6 text-foreground ${inputClassName}`}
            value={value}
            defaultValue={defaultValue}
            onChangeText={handleTextChange}
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
        </View>

        {error ? (
          <Text className="mt-1.5 text-xs font-medium text-error">{error}</Text>
        ) : hint ? (
          <Text className="mt-1.5 text-xs text-muted">{hint}</Text>
        ) : null}
      </View>
    );
  }
);

Textarea.displayName = 'Textarea';
export default Textarea;
