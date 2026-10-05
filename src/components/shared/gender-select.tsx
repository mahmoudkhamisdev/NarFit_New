import { Icon, Select } from '@/components/ui';
import { GENDER_OPTIONS } from '@/constants/onboarding';
import { Mars, Venus, VenusAndMars } from 'lucide-react-native';
import React from 'react';

export interface GenderSelectProps {
  value?: string;
  onValueChange: (value: 'male' | 'female' | 'other') => void;
  placeholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
}

export function GenderSelect({
  value = 'male',
  onValueChange,
  placeholder = 'Select gender',
  error,
  className = 'h-[74px]',
  disabled = false,
}: GenderSelectProps) {
  const renderLeftIcon = () => {
    if (value === 'female') {
      return <Icon as={Venus} size={22} className="text-muted" />;
    }
    if (value === 'other') {
      return <Icon as={VenusAndMars} size={22} className="text-muted" />;
    }
    return <Icon as={Mars} size={22} className="text-muted" />;
  };

  return (
    <Select
      options={GENDER_OPTIONS}
      value={value}
      onValueChange={(val) => onValueChange(val as 'male' | 'female' | 'other')}
      placeholder={placeholder}
      error={error}
      disabled={disabled}
      className={className}
      leftIcon={renderLeftIcon()}
    />
  );
}

export default GenderSelect;
