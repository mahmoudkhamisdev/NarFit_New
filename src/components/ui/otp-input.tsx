import React, { useCallback, useRef, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import { Input } from './input';

export interface OtpInputProps {
  length?: number;
  value: string[];
  onChange: (otp: string[]) => void;
  onComplete?: (code: string) => void;
  disabled?: boolean;
  className?: string;
  boxClassName?: string;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  className = '',
  boxClassName = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChangeText = useCallback(
    (text: string, index: number) => {
      const cleanText = text.replace(/[^0-9]/g, '');
      const newOtp = [...value];

      if (cleanText.length > 1) {
        // Handle paste of multiple digits
        const digits = cleanText.slice(0, length).split('');
        for (let i = 0; i < length; i++) {
          newOtp[i] = digits[i] || '';
        }
        onChange(newOtp);

        const nextIdx = Math.min(digits.length, length - 1);
        inputRefs.current[nextIdx]?.focus();
        setActiveIndex(nextIdx);

        if (digits.length === length && onComplete) {
          setTimeout(() => {
            onComplete(newOtp.join(''));
          }, 150);
        }
        return;
      }

      newOtp[index] = cleanText;
      onChange(newOtp);

      if (cleanText && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        setActiveIndex(index + 1);
      }

      // Check if all digits are filled
      const isComplete =
        newOtp.every((d) => d && d.trim() !== '') && newOtp.join('').length === length;
      if (isComplete && onComplete) {
        setTimeout(() => {
          onComplete(newOtp.join(''));
        }, 150);
      }
    },
    [value, length, onChange, onComplete]
  );

  const handleKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
      if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setActiveIndex(index - 1);
      }
    },
    [value]
  );

  return (
    <View className={`my-1 flex-row justify-between gap-2.5 ${className}`}>
      {Array.from({ length }).map((_, idx) => {
        const digit = value[idx] || '';
        const isFocused = activeIndex === idx;

        return (
          <Input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el;
            }}
            value={digit}
            onChangeText={(t) => handleChangeText(t, idx)}
            onKeyPress={(e) => handleKeyPress(e, idx)}
            onFocus={() => setActiveIndex(idx)}
            editable={!disabled}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            autoFocus={idx === 0}
            containerClassName="flex-1"
            className={`h-[55px] px-0 justify-center border-2 ${
              isFocused || digit ? 'border-brand' : 'border-border/80'
            } ${boxClassName}`}
            inputClassName="h-full w-full text-center text-2xl font-bold text-foreground p-0"
          />
        );
      })}
    </View>
  );
};

export default OtpInput;
