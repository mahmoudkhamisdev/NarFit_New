import { Check } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Pressable,
  PressableProps,
  View,
} from 'react-native';
import { Text } from '@/components/ui/text';

import { Icon } from './icon';

export interface CheckboxProps extends Omit<PressableProps, 'children'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  boxClassName?: string;
  labelClassName?: string;
}

export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  label,
  description,
  disabled = false,
  className = '',
  boxClassName = '',
  labelClassName = '',
  ...rest
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const nextValue = !isChecked;
    if (!isControlled) {
      setInternalChecked(nextValue);
    }
    onCheckedChange?.(nextValue);
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handleToggle}
      className={`flex-row items-center gap-3 ${disabled ? 'opacity-50' : 'active:opacity-80'} ${className}`}
      {...rest}
    >
      <View
        className={`h-6 w-6 items-center justify-center rounded-lg border transition-colors ${
          isChecked
            ? 'border-brand bg-brand'
            : 'border-border bg-card'
        } ${boxClassName}`}
      >
        {isChecked && <Icon as={Check} size={16} className="text-inverse" />}
      </View>

      {(label || description) && (
        <View className="flex-1 justify-center">
          {label && (
            <Text
              className={`text-base font-medium ${
                disabled ? 'text-disabled' : 'text-foreground'
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

export default Checkbox;
