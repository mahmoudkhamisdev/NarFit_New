import { Image, ImageSource } from 'expo-image';
import { User } from 'lucide-react-native';
import React, { Children, cloneElement, isValidElement, useState } from 'react';
import {
  Text,
  View,
  ViewProps,
} from 'react-native';

import { Icon } from './icon';

export type AvatarSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type AvatarColor = 'neutral' | 'primary' | 'red' | 'green' | 'orange' | 'blue';

export interface AvatarProps extends ViewProps {
  source?: string | ImageSource | number;
  name?: string;
  fallback?: string;
  size?: AvatarSize;
  color?: AvatarColor;
  className?: string;
  textClassName?: string;
}

const sizeConfig: Record<
  AvatarSize,
  { container: string; text: string; iconSize: number; overlap: string }
> = {
  xxs: { container: 'w-6 h-6', text: 'text-[9px] font-bold', iconSize: 12, overlap: '-ml-1.5' },
  xs: { container: 'w-7 h-7', text: 'text-[11px] font-semibold', iconSize: 14, overlap: '-ml-2' },
  sm: { container: 'w-8 h-8', text: 'text-xs font-semibold', iconSize: 16, overlap: '-ml-2.5' },
  md: { container: 'w-9 h-9', text: 'text-sm font-semibold', iconSize: 18, overlap: '-ml-2.5' },
  lg: { container: 'w-10 h-10', text: 'text-base font-semibold', iconSize: 20, overlap: '-ml-3' },
  xl: { container: 'w-11 h-11', text: 'text-lg font-semibold', iconSize: 22, overlap: '-ml-3.5' },
  xxl: { container: 'w-12 h-12', text: 'text-xl font-bold', iconSize: 24, overlap: '-ml-4' },
};

const colorConfig: Record<
  AvatarColor,
  { bg: string; border: string; text: string; iconClass: string }
> = {
  neutral: {
    bg: 'bg-card-subtle',
    border: 'border-border',
    text: 'text-foreground',
    iconClass: 'text-muted',
  },
  primary: {
    bg: 'bg-brand/20',
    border: 'border-brand/40',
    text: 'text-brand',
    iconClass: 'text-brand',
  },
  red: {
    bg: 'bg-error-bg',
    border: 'border-error/30',
    text: 'text-error',
    iconClass: 'text-error',
  },
  green: {
    bg: 'bg-success-bg',
    border: 'border-success/30',
    text: 'text-success',
    iconClass: 'text-success',
  },
  orange: {
    bg: 'bg-warning-bg',
    border: 'border-warning/30',
    text: 'text-warning',
    iconClass: 'text-warning',
  },
  blue: {
    bg: 'bg-info-bg',
    border: 'border-info/30',
    text: 'text-info',
    iconClass: 'text-info',
  },
};

export function Avatar({
  source,
  name,
  fallback,
  size = 'md',
  color = 'neutral',
  className = '',
  textClassName = '',
  style,
  ...rest
}: AvatarProps) {
  const [prevSource, setPrevSource] = useState(source);
  const [imageError, setImageError] = useState(false);

  if (source !== prevSource) {
    setPrevSource(source);
    setImageError(false);
  }

  const { container: sizeClass, text: textSizeClass, iconSize } = sizeConfig[size];
  const { bg, border, text: textColorClass, iconClass } = colorConfig[color];

  const getInitials = (text?: string) => {
    if (!text) return '';
    const parts = text.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const displayText = fallback || getInitials(name);
  const hasValidImage = Boolean(source) && !imageError;

  return (
    <View
      className={`items-center justify-center overflow-hidden rounded-full border ${sizeClass} ${bg} ${border} ${className}`}
      style={style}
      {...rest}
    >
      {hasValidImage ? (
        <Image
          source={source}
          style={{ width: '100%', height: '100%' }}
          contentFit="cover"
          onError={() => setImageError(true)}
        />
      ) : displayText ? (
        <Text className={`${textSizeClass} ${textColorClass} ${textClassName}`}>
          {displayText}
        </Text>
      ) : (
        <Icon as={User} size={iconSize} className={iconClass} />
      )}
    </View>
  );
}

export interface AvatarGroupProps extends ViewProps {
  max?: number;
  size?: AvatarSize;
  children: React.ReactNode;
  className?: string;
}

export function AvatarGroup({
  max,
  size = 'md',
  children,
  className = '',
  ...rest
}: AvatarGroupProps) {
  const childrenArray = Children.toArray(children);
  const total = childrenArray.length;
  const visibleCount = max ? Math.min(max, total) : total;
  const excess = total - visibleCount;

  const { container: sizeClass, text: textSizeClass, overlap } = sizeConfig[size];

  return (
    <View className={`flex-row items-center ${className}`} {...rest}>
      {childrenArray.slice(0, visibleCount).map((child, index) => {
        if (!isValidElement(child)) return null;

        return (
          <View
            key={index}
            className={`border-2 border-background rounded-full ${index > 0 ? overlap : ''}`}
            style={{ zIndex: total - index }}
          >
            {cloneElement(child as React.ReactElement<AvatarProps>, {
              size,
            })}
          </View>
        );
      })}

      {excess > 0 && (
        <View
          className={`border-2 border-background rounded-full ${overlap}`}
          style={{ zIndex: 0 }}
        >
          <View
            className={`items-center justify-center rounded-full border border-border bg-card-subtle ${sizeClass}`}
          >
            <Text className={`font-semibold text-brand ${textSizeClass}`}>
              +{excess}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default Avatar;
