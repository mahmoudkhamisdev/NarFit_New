import React, { forwardRef } from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';

export interface TextProps extends RNTextProps {
  className?: string;
  weight?: 'regular' | 'medium' | 'bold' | 'black';
}

function resolveFontFamily(className: string, weight?: string): string {
  if (weight === 'black' || className.includes('font-black')) {
    return 'RightGrotesk-Black';
  }
  if (
    weight === 'bold' ||
    className.includes('font-bold') ||
    className.includes('font-extrabold') ||
    className.includes('font-semibold')
  ) {
    return 'RightGrotesk-Bold';
  }
  if (weight === 'medium' || className.includes('font-medium')) {
    return 'RightGrotesk-Medium';
  }
  return 'RightGrotesk-Regular';
}

export const Text = forwardRef<RNText, TextProps>(
  ({ className = '', style, weight, children, ...props }, ref) => {
    const fontFamily = resolveFontFamily(className, weight);

    return (
      <RNText
        ref={ref}
        className={className}
        style={[{ fontFamily }, style]}
        {...props}
      >
        {children}
      </RNText>
    );
  }
);

Text.displayName = 'Text';
