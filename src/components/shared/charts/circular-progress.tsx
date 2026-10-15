import React from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useResolveClassNames } from 'uniwind';
import { Text } from '@/components/ui';

export interface CircularProgressProps {
  /**
   * Value from 0 to 100
   */
  percentage: number;
  /**
   * Diameter in pixels (default 138)
   */
  size?: number;
  /**
   * Ring thickness in pixels (default 13)
   */
  strokeWidth?: number;
  /**
   * Angle in degrees where the progress starts (default 0: center right)
   */
  startAngle?: number;
  /**
   * Style of the start cap ('butt' | 'round', default 'butt')
   */
  startCap?: 'butt' | 'round';
  /**
   * Style of the end cap ('butt' | 'round', default 'round')
   */
  endCap?: 'butt' | 'round';
  /**
   * Custom progress stroke color (defaults to dynamic text-brand token)
   */
  progressColor?: string;
  /**
   * Custom background track color (defaults to border-border-strong token)
   */
  trackColor?: string;
  /**
   * Primary label in center (e.g. "84%")
   */
  centerLabel?: string;
  /**
   * Sub-label in center (e.g. "of target")
   */
  centerSublabel?: string;
  /**
   * Optional custom children to render in center
   */
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function CircularProgress({
  percentage,
  size = 138,
  strokeWidth = 13,
  startAngle = 0,
  startCap = 'butt',
  endCap = 'round',
  progressColor,
  trackColor,
  centerLabel,
  centerSublabel,
  children,
  className = '',
  style,
}: CircularProgressProps) {
  // Resolve theme colors dynamically using uniwind
  const brandStyle = useResolveClassNames('text-brand');
  const borderStyle = useResolveClassNames('border-border-strong');

  const resolvedProgressColor =
    progressColor ??
    (brandStyle?.color as string) ??
    (brandStyle?.backgroundColor as string) ??
    '#caff2e';

  const resolvedTrackColor =
    trackColor ??
    (borderStyle?.borderColor as string) ??
    (borderStyle?.backgroundColor as string) ??
    '#333333';

  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const visibleLength = (clampedPercentage / 100) * circumference;

  const center = size / 2;

  // Calculate cap coordinates
  const startAngleRad = (startAngle * Math.PI) / 180;
  const startX = center + radius * Math.cos(startAngleRad);
  const startY = center + radius * Math.sin(startAngleRad);

  const endAngleDeg = startAngle + (clampedPercentage / 100) * 360;
  const endAngleRad = (endAngleDeg * Math.PI) / 180;
  const endX = center + radius * Math.cos(endAngleRad);
  const endY = center + radius * Math.sin(endAngleRad);

  return (
    <View
      className={`items-center justify-center relative ${className}`}
      style={[{ width: size, height: size }, style]}
    >
      <Svg width={size} height={size}>
        {/* Track circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={resolvedTrackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress arc */}
        {clampedPercentage > 0 && (
          <>
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke={resolvedProgressColor}
              strokeWidth={strokeWidth}
              strokeDasharray={[visibleLength, circumference]}
              strokeDashoffset={0}
              strokeLinecap="butt"
              fill="none"
              origin={`${center}, ${center}`}
              rotation={startAngle}
            />

            {/* Optional round start cap */}
            {startCap === 'round' && (
              <Circle
                cx={startX}
                cy={startY}
                r={strokeWidth / 2}
                fill={resolvedProgressColor}
              />
            )}

            {/* Round end cap */}
            {endCap === 'round' && (
              <Circle
                cx={endX}
                cy={endY}
                r={strokeWidth / 2}
                fill={resolvedProgressColor}
              />
            )}
          </>
        )}
      </Svg>

      {/* Centered content */}
      <View className="absolute inset-0 items-center justify-center pointer-events-none px-2">
        {children ? (
          children
        ) : (
          <>
            {centerLabel ? (
              <Text className="text-3xl font-black text-foreground text-center tracking-tight leading-tight">
                {centerLabel}
              </Text>
            ) : null}
            {centerSublabel ? (
              <Text className="text-sm font-medium text-muted text-center leading-tight">
                {centerSublabel}
              </Text>
            ) : null}
          </>
        )}
      </View>
    </View>
  );
}

export default CircularProgress;
