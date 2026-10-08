import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text, TextProps } from './text';

export interface CardProps extends ViewProps {
  className?: string;
}

export function Card({ className = '', style, children, ...props }: CardProps) {
  return (
    <View
      className={`rounded-3xl border border-border bg-surface p-5 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}

export interface CardHeaderProps extends ViewProps {
  className?: string;
}

export function CardHeader({ className = '', style, children, ...props }: CardHeaderProps) {
  return (
    <View className={`mb-4 flex-col gap-1 ${className}`} style={style} {...props}>
      {children}
    </View>
  );
}

export interface CardTitleProps extends TextProps {
  className?: string;
}

export function CardTitle({ className = '', style, children, ...props }: CardTitleProps) {
  return (
    <Text
      className={`text-lg font-bold tracking-tight text-foreground ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
}

export interface CardDescriptionProps extends TextProps {
  className?: string;
}

export function CardDescription({
  className = '',
  style,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <Text
      className={`text-xs font-medium text-muted ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Text>
  );
}

export interface CardContentProps extends ViewProps {
  className?: string;
}

export function CardContent({ className = '', style, children, ...props }: CardContentProps) {
  return (
    <View className={`gap-3 ${className}`} style={style} {...props}>
      {children}
    </View>
  );
}

export interface CardFooterProps extends ViewProps {
  className?: string;
}

export function CardFooter({ className = '', style, children, ...props }: CardFooterProps) {
  return (
    <View
      className={`mt-4 flex-row items-center justify-between border-t border-border-subtle pt-3 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}

export default Card;
