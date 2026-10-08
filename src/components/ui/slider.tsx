import React, { useRef, useState } from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  View,
  ViewStyle,
} from 'react-native';

export interface SliderProps {
  /** Current value */
  value: number;
  /** Callback fired continuously while dragging */
  onValueChange: (value: number) => void;
  /** Callback fired when user releases the slider */
  onSlidingComplete?: (value: number) => void;
  /** Minimum value (default: 0) */
  min?: number;
  /** Maximum value (default: 1) */
  max?: number;
  /** Step increment (e.g. 0.1) */
  step?: number;
  /** Disable interactions */
  disabled?: boolean;
  /** Container className */
  className?: string;
  /** Track height in px (default: 16) */
  trackHeight?: number;
  /** Thumb diameter in px (default: 28) */
  thumbSize?: number;
  /** Track background className (default: 'bg-card-subtle border border-border/80') */
  trackClassName?: string;
  /** Active filled bar className (default: 'bg-brand') */
  activeTrackClassName?: string;
  /** Thumb className (default: 'bg-foreground') */
  thumbClassName?: string;
  /** Active fill color override (e.g. custom hex if not using Tailwind class) */
  activeColor?: string;
  /** Optional custom node rendered directly above the thumb (follows thumb horizontally) */
  renderAboveThumb?: (props: { value: number; ratio: number }) => React.ReactNode;
  /** Optional custom thumb node */
  renderThumb?: (props: { value: number; ratio: number }) => React.ReactNode;
  /** Additional container style */
  style?: ViewStyle;
}

export function Slider({
  value,
  onValueChange,
  onSlidingComplete,
  min = 0,
  max = 1,
  step = 0.1,
  disabled = false,
  className = '',
  trackHeight = 16,
  thumbSize = 28,
  trackClassName = '',
  activeTrackClassName = '',
  thumbClassName = '',
  activeColor,
  renderAboveThumb,
  renderThumb,
  style,
}: SliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackRef = useRef<View>(null);
  const trackLayoutRef = useRef<{ pageX: number; width: number }>({ pageX: 0, width: 0 });

  const updateValueFromPageX = (pageX: number) => {
    const { pageX: trackX, width } = trackLayoutRef.current;
    if (width <= 0) return;

    const relativeX = pageX - trackX;
    const ratio = Math.max(0, Math.min(1, relativeX / width));
    const rawVal = min + ratio * (max - min);

    let finalVal = rawVal;
    if (step && step > 0) {
      finalVal = Math.round(rawVal / step) * step;
      const decimals = (step.toString().split('.')[1] || '').length;
      finalVal = parseFloat(finalVal.toFixed(decimals));
    }

    finalVal = Math.max(min, Math.min(max, finalVal));
    onValueChange(finalVal);
  };

  const handleTouch = (evt: GestureResponderEvent) => {
    if (disabled) return;
    updateValueFromPageX(evt.nativeEvent.pageX);
  };

  const handleGrant = (evt: GestureResponderEvent) => {
    if (disabled) return;
    trackRef.current?.measure((_x, _y, width, _height, pageX) => {
      if (width > 0) {
        trackLayoutRef.current = { pageX, width };
        setTrackWidth(width);
      }
    });
    updateValueFromPageX(evt.nativeEvent.pageX);
  };

  const handleRelease = () => {
    if (disabled) return;
    onSlidingComplete?.(value);
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setTrackWidth(w);
    trackRef.current?.measure((_x, _y, width, _height, pageX) => {
      trackLayoutRef.current = { pageX, width: width || w };
    });
  };

  // Safe normalized ratio for visual rendering
  const clampedValue = Math.max(min, Math.min(max, value));
  const ratio = max > min ? (clampedValue - min) / (max - min) : 0;

  // Available horizontal travel distance for thumb
  const travelWidth = Math.max(0, trackWidth - thumbSize);
  const thumbLeft = trackWidth > 0 ? ratio * travelWidth : 0;

  return (
    <View className={`w-full ${className}`} style={style}>
      {/* Optional above-thumb node (e.g. tooltip, tag) */}
      {renderAboveThumb && trackWidth > 0 && (
        <View
          style={{
            position: 'absolute',
            left: thumbLeft + thumbSize / 2,
            top: 0,
            transform: [{ translateX: -thumbSize / 2 }],
            zIndex: 10,
          }}
          pointerEvents="none"
        >
          {renderAboveThumb({ value: clampedValue, ratio })}
        </View>
      )}

      {/* Touch Interaction Container */}
      <View
        ref={trackRef}
        collapsable={false}
        onLayout={handleLayout}
        onStartShouldSetResponder={() => !disabled}
        onMoveShouldSetResponder={() => !disabled}
        onResponderGrant={handleGrant}
        onResponderMove={handleTouch}
        onResponderRelease={handleRelease}
        onResponderTerminate={handleRelease}
        style={{
          width: '100%',
          height: Math.max(thumbSize, trackHeight) + 8,
          justifyContent: 'center',
        }}
        accessibilityRole="adjustable"
        accessibilityValue={{ min, max, now: clampedValue }}
      >
        {/* Inactive Track Background: uses global.css tokens --color-card-subtle and --color-border */}
        <View
          style={{
            width: '100%',
            height: trackHeight,
            borderRadius: trackHeight / 2,
          }}
          className={`bg-card-subtle border border-border/80 overflow-hidden ${trackClassName}`}
        >
          {/* Active Filled Bar: uses global.css token --color-brand */}
          <View
            style={[
              {
                width: `${Math.round(ratio * 100)}%`,
                height: '100%',
                borderRadius: trackHeight / 2,
              },
              activeColor ? { backgroundColor: activeColor } : undefined,
            ]}
            className={!activeColor ? `bg-brand ${activeTrackClassName}` : activeTrackClassName}
          />
        </View>

        {/* Thumb: uses global.css token --color-foreground */}
        {trackWidth > 0 && (
          <View
            className={`absolute bg-foreground rounded-full shadow-lg ${thumbClassName}`}
            style={{
              left: thumbLeft,
              width: thumbSize,
              height: thumbSize,
            }}
          >
            {renderThumb ? renderThumb({ value: clampedValue, ratio }) : null}
          </View>
        )}
      </View>
    </View>
  );
}

export default Slider;
