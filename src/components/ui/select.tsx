import { Check, ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Icon } from './icon';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

export function Select({
  label,
  placeholder = 'Select an option...',
  hint,
  error,
  required = false,
  disabled = false,
  leftIcon,
  options,
  value: controlledValue,
  defaultValue,
  onValueChange,
  className = '',
  containerClassName = '',
  labelClassName = '',
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const isError = Boolean(error);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    if (!isControlled) {
      setInternalValue(option.value);
    }
    onValueChange?.(option.value);
    setIsOpen(false);
  };

  const getTriggerStateClasses = () => {
    if (disabled) {
      return 'bg-card/50 border-border-subtle opacity-60';
    }
    if (isError) {
      return 'bg-card border-error ring-1 ring-error';
    }
    if (isOpen) {
      return 'bg-card border-brand ring-1 ring-brand/40';
    }
    return 'bg-card border-border';
  };

  return (
    <View className={`w-full ${containerClassName}`}>
      {label && (
        <View className="mb-2 flex-row items-center gap-1">
          <Text
            className={`text-sm font-medium ${
              disabled ? 'text-disabled' : 'text-foreground'
            } ${labelClassName}`}
          >
            {label}
          </Text>
          {required && <Text className="text-sm font-semibold text-brand">*</Text>}
        </View>
      )}

      {/* Trigger Button */}
      <Pressable
        disabled={disabled}
        onPress={() => setIsOpen(true)}
        className={`h-14 w-full flex-row items-center justify-between rounded-2xl border px-4 gap-3 ${getTriggerStateClasses()} ${className}`}
      >
        <View className="flex-1 flex-row items-center gap-3">
          {leftIcon && <View className="items-center justify-center">{leftIcon}</View>}
          <Text
            numberOfLines={1}
            className={`text-base ${
              selectedOption ? 'text-foreground font-medium' : 'text-muted'
            }`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
        </View>

        <Icon
          as={ChevronDown}
          size={20}
          className={`text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </Pressable>

      {error ? (
        <Text className="mt-1.5 text-xs font-medium text-error">{error}</Text>
      ) : hint ? (
        <Text className="mt-1.5 text-xs text-muted">{hint}</Text>
      ) : null}

      {/* Options Overlay */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View className="flex-1 items-center justify-center bg-black/60 px-5">
            <TouchableWithoutFeedback>
              <View className="w-full max-h-[420px] rounded-3xl border border-border bg-card p-4 shadow-2xl">
                {label && (
                  <View className="mb-3 border-b border-border-subtle pb-2.5">
                    <Text className="text-sm font-bold text-foreground">{label}</Text>
                  </View>
                )}

                <ScrollView showsVerticalScrollIndicator={false}>
                  <View className="gap-1.5">
                    {options.map((option) => {
                      const isSelected = option.value === selectedValue;
                      return (
                        <Pressable
                          key={option.value}
                          disabled={option.disabled}
                          onPress={() => handleSelect(option)}
                          className={`flex-row items-center justify-between rounded-2xl px-4 py-3.5 ${
                            isSelected
                              ? 'bg-brand/15 border border-brand/30'
                              : 'active:bg-card-subtle'
                          } ${option.disabled ? 'opacity-40' : ''}`}
                        >
                          <Text
                            className={`text-base ${
                              isSelected
                                ? 'font-semibold text-brand'
                                : 'font-medium text-foreground'
                            }`}
                          >
                            {option.label}
                          </Text>

                          {isSelected && (
                            <Icon as={Check} size={18} className="text-brand" />
                          )}
                        </Pressable>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default Select;
