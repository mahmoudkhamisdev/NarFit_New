import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { Text } from '@/components/ui/text';

export type TagStyle = 'brand' | 'default' | 'error' | 'success' | 'warning' | 'info';
export type TagSize = 'xs' | 'sm' | 'md';

export interface TagProps extends Omit<PressableProps, 'children' | 'style'> {
  label?: string;
  children?: React.ReactNode;
  variant?: TagStyle;
  size?: TagSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  textClassName?: string;
  style?: StyleProp<ViewStyle>;
}

const styleConfig: Record<TagStyle, { container: string; text: string }> = {
  brand: {
    container: 'bg-brand/20 border border-brand/40',
    text: 'text-brand font-semibold',
  },
  default: {
    container: 'bg-card-subtle border border-border',
    text: 'text-foreground font-medium',
  },
  error: {
    container: 'bg-error-bg border border-error/30',
    text: 'text-error font-semibold',
  },
  success: {
    container: 'bg-success-bg border border-success/30',
    text: 'text-success font-semibold',
  },
  warning: {
    container: 'bg-warning-bg border border-warning/30',
    text: 'text-warning font-semibold',
  },
  info: {
    container: 'bg-info-bg border border-info/30',
    text: 'text-info font-semibold',
  },
};

const sizeConfig: Record<TagSize, { container: string; text: string; gap: string }> = {
  xs: {
    container: 'h-5 px-2 rounded-full',
    text: 'text-[10px]',
    gap: 'gap-1',
  },
  sm: {
    container: 'h-6 px-2.5 rounded-full',
    text: 'text-xs',
    gap: 'gap-1.5',
  },
  md: {
    container: 'h-8 px-3 rounded-full',
    text: 'text-sm',
    gap: 'gap-2',
  },
};

export function Tag({
  label,
  children,
  variant = 'brand',
  size = 'md',
  leftIcon,
  rightIcon,
  className = '',
  textClassName = '',
  onPress,
  disabled,
  style,
  ...props
}: TagProps) {
  const isPressable = Boolean(onPress) && !disabled;
  const { container: styleContainer, text: styleText } = styleConfig[variant];
  const { container: sizeContainer, text: sizeText, gap } = sizeConfig[size];

  const innerContent = (
    <>
      {leftIcon && <View className="items-center justify-center">{leftIcon}</View>}
      {label ? (
        <Text className={`${sizeText} ${styleText} ${textClassName}`}>{label}</Text>
      ) : (
        children
      )}
      {rightIcon && <View className="items-center justify-center">{rightIcon}</View>}
    </>
  );

  const containerClasses = `flex-row items-center justify-center ${sizeContainer} ${styleContainer} ${gap} ${
    isPressable ? 'active:opacity-75' : ''
  } ${disabled ? 'opacity-50' : ''} ${className}`;

  if (isPressable) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className={containerClasses}
        style={style}
        {...props}
      >
        {innerContent}
      </Pressable>
    );
  }

  return (
    <View className={containerClasses} style={style}>
      {innerContent}
    </View>
  );
}

export const Badge = Tag;
export default Tag;
