import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  View,
} from 'react-native';
import { Text } from './text';

export type ButtonVariant = 'primary' | 'secondary' | 'default' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  title?: string;
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
}

export function Button({
  title,
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  textClassName = '',
  style,
  onPress,
  ...rest
}: ButtonProps) {
  const isInteractive = !disabled && !loading;

  const sizeContainerClasses = {
    sm: 'h-11 px-4 gap-2',
    md: 'h-14 px-5 gap-2.5',
    lg: 'h-16 px-6 gap-3',
  }[size];

  const sizeTextClasses = {
    sm: 'text-sm font-medium',
    md: 'text-base font-semibold',
    lg: 'text-lg font-semibold',
  }[size];

  const getVariantStyles = (pressed: boolean) => {
    if (disabled) {
      switch (variant) {
        case 'primary':
          return {
            container: 'bg-brand-disabled border-transparent',
            text: 'text-brand-text-disabled',
            spinner: '#526b00',
          };
        case 'secondary':
          return {
            container: 'bg-transparent border-2 border-brand-text-disabled',
            text: 'text-brand-text-disabled',
            spinner: '#526b00',
          };
        case 'default':
          return {
            container: 'bg-card-subtle border-transparent',
            text: 'text-disabled',
            spinner: '#737373',
          };
        case 'outline':
          return {
            container: 'bg-transparent border border-border-subtle',
            text: 'text-disabled',
            spinner: '#737373',
          };
        case 'ghost':
        default:
          return {
            container: 'bg-transparent',
            text: 'text-disabled',
            spinner: '#737373',
          };
      }
    }

    switch (variant) {
      case 'primary':
        return {
          container: pressed
            ? 'bg-brand/85 border-transparent'
            : 'bg-brand border-transparent',
          text: 'text-inverse',
          spinner: '#1a1a1a',
        };
      case 'secondary':
        return {
          container: pressed
            ? 'bg-brand/15 border-2 border-brand'
            : 'bg-transparent border-2 border-brand',
          text: 'text-brand',
          spinner: '#caff2e',
        };
      case 'default':
        return {
          container: pressed
            ? 'bg-card-subtle border border-border'
            : 'bg-card border border-border',
          text: 'text-foreground',
          spinner: '#737373',
        };
      case 'outline':
        return {
          container: pressed
            ? 'bg-card-subtle border border-border-strong'
            : 'bg-transparent border border-border',
          text: 'text-foreground',
          spinner: '#f2f4f5',
        };
      case 'ghost':
      default:
        return {
          container: pressed ? 'bg-card-subtle' : 'bg-transparent',
          text: 'text-foreground',
          spinner: '#f2f4f5',
        };
    }
  };

  const handlePress = (e: GestureResponderEvent) => {
    if (isInteractive && onPress) {
      onPress(e);
    }
  };

  return (
    <Pressable
      disabled={!isInteractive}
      onPress={handlePress}
      style={style}
      {...rest}
    >
      {({ pressed }) => {
        const styles = getVariantStyles(pressed && isInteractive);
        return (
          <View
            className={`flex-row items-center justify-center rounded-full ${sizeContainerClasses} ${styles.container} ${fullWidth ? 'w-full' : 'self-start'
              } ${className}`}
          >
            {loading ? (
              <ActivityIndicator color={styles.spinner} size="small" />
            ) : (
              <>
                {leftIcon && <View className="items-center justify-center">{leftIcon}</View>}
                {title ? (
                  <Text className={`${sizeTextClasses} ${styles.text} ${textClassName}`}>
                    {title}
                  </Text>
                ) : (
                  children
                )}
                {rightIcon && <View className="items-center justify-center">{rightIcon}</View>}
              </>
            )}
          </View>
        );
      }}
    </Pressable>
  );
}

export default Button;
