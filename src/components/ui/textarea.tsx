import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { PenLine } from 'lucide-react-native';
import { Icon } from './icon';
import { Text } from './text';

export interface TextareaProps extends TextInputProps {
  label?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  showCount?: boolean;
  countPosition?: 'top' | 'bottom';
  asBottomSheetInput?: boolean;
  className?: string;
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
      countPosition = 'top',
      asBottomSheetInput = false,
      maxLength,
      value,
      defaultValue,
      className = '',
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
    const Component = asBottomSheetInput ? BottomSheetTextInput : TextInput;
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
                className={`text-sm font-medium ${isDisabled ? 'text-disabled' : 'text-foreground'
                  } ${labelClassName}`}
              >
                {label}
              </Text>
              {required && <Text className="text-sm font-semibold text-brand">*</Text>}
            </View>
            {showCount && maxLength && countPosition === 'top' && (
              <Text className="text-xs text-muted">
                {characterCount}/{maxLength}
              </Text>
            )}
          </View>
        )}

        <View
          className={`${className.includes('h-') || className.includes('min-h-') ? '' : 'min-h-35'
            } w-full rounded-2xl border px-4 py-3 justify-between ${getFieldStateClasses()} ${className}`}
        >
          <Component
            ref={ref as any}
            multiline
            editable={editable}
            maxLength={maxLength}
            textAlignVertical="top"
            placeholderTextColor="#737373"
            className={`flex-1 text-base leading-6 text-foreground ${inputClassName}`}
            style={[{ fontFamily: 'RightGrotesk-Regular' }, rest.style]}
            value={value}
            defaultValue={defaultValue}
            onChangeText={handleTextChange}
            onFocus={(e: any) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e: any) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...(rest as any)}
          />

          {showCount && maxLength && countPosition === 'bottom' && (
            <View className="flex-row items-center justify-end gap-1 pt-1">
              <Text className="text-xs text-muted">
                {characterCount}/{maxLength}
              </Text>
              <Icon as={PenLine} size={12} className="text-muted" />
            </View>
          )}
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
