import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  LayoutChangeEvent,
  PanResponder,
  Text,
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
  /** Track background className (default: 'bg-card border border-border/80') */
  trackClassName?: string;
  /** Active filled bar className (default: 'bg-brand') */
  activeTrackClassName?: string;
  /** Thumb className (default: 'bg-foreground') */
  thumbClassName?: string;
  /** Active fill color override (e.g. custom hex if not using Tailwind class) */
  activeColor?: string;
  /** Whether to show a percentage badge above the thumb (matching Figma design) */
  showPercentage?: boolean;
  /** Custom formatter for the percentage badge */
  formatPercentage?: (value: number, ratio: number) => string;
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
  showPercentage = false,
  formatPercentage,
  renderAboveThumb,
  renderThumb,
  style,
}: SliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);

  const stateRef = useRef({
    min,
    max,
    step,
    value,
    disabled,
    onValueChange,
    onSlidingComplete,
    trackWidth: 0,
    sliderPageX: 0,
  });

  useEffect(() => {
    stateRef.current.min = min;
    stateRef.current.max = max;
    stateRef.current.step = step;
    stateRef.current.value = value;
    stateRef.current.disabled = disabled;
    stateRef.current.onValueChange = onValueChange;
    stateRef.current.onSlidingComplete = onSlidingComplete;
  }, [min, max, step, value, disabled, onValueChange, onSlidingComplete]);

  const panResponder = useMemo(
    () =>
      // eslint-disable-next-line react-hooks/refs
      PanResponder.create({
        onStartShouldSetPanResponder: () => !stateRef.current.disabled,
        onStartShouldSetPanResponderCapture: () => !stateRef.current.disabled,
        onMoveShouldSetPanResponder: () => !stateRef.current.disabled,
        onMoveShouldSetPanResponderCapture: () => !stateRef.current.disabled,
        onPanResponderTerminationRequest: () => false,
        onPanResponderGrant: (evt) => {
          if (stateRef.current.disabled) return;
          const { pageX, locationX } = evt.nativeEvent;
          stateRef.current.sliderPageX = pageX - locationX;

          const { trackWidth: width, min: minVal, max: maxVal, step: stepVal, onValueChange: onChange } = stateRef.current;
          if (width <= 0) return;

          const ratio = Math.max(0, Math.min(1, locationX / width));
          const rawVal = minVal + ratio * (maxVal - minVal);
          let finalVal = rawVal;
          if (stepVal && stepVal > 0) {
            finalVal = Math.round(rawVal / stepVal) * stepVal;
            const decimals = (stepVal.toString().split('.')[1] || '').length;
            finalVal = parseFloat(finalVal.toFixed(decimals));
          }
          onChange(Math.max(minVal, Math.min(maxVal, finalVal)));
        },
        onPanResponderMove: (evt) => {
          if (stateRef.current.disabled) return;
          const { pageX } = evt.nativeEvent;
          const currentX = pageX - stateRef.current.sliderPageX;

          const { trackWidth: width, min: minVal, max: maxVal, step: stepVal, onValueChange: onChange } = stateRef.current;
          if (width <= 0) return;

          const ratio = Math.max(0, Math.min(1, currentX / width));
          const rawVal = minVal + ratio * (maxVal - minVal);
          let finalVal = rawVal;
          if (stepVal && stepVal > 0) {
            finalVal = Math.round(rawVal / stepVal) * stepVal;
            const decimals = (stepVal.toString().split('.')[1] || '').length;
            finalVal = parseFloat(finalVal.toFixed(decimals));
          }
          onChange(Math.max(minVal, Math.min(maxVal, finalVal)));
        },
        onPanResponderRelease: () => {
          if (stateRef.current.disabled) return;
          stateRef.current.onSlidingComplete?.(stateRef.current.value);
        },
        onPanResponderTerminate: () => {
          if (stateRef.current.disabled) return;
          stateRef.current.onSlidingComplete?.(stateRef.current.value);
        },
      }),
    []
  );

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0) {
      setTrackWidth(w);
      stateRef.current.trackWidth = w;
    }
  };

  const clampedValue = Math.max(min, Math.min(max, value));
  const ratio = max > min ? (clampedValue - min) / (max - min) : 0;

  const travelWidth = Math.max(0, trackWidth - thumbSize);
  const thumbLeft = trackWidth > 0 ? ratio * travelWidth : 0;
  const activeWidth = trackWidth > 0 ? thumbLeft + thumbSize / 2 : 0;
  const containerHeight = Math.max(thumbSize, trackHeight) + 12;

  return (
    <View className={`w-full ${showPercentage && !renderAboveThumb ? 'pt-6' : ''} ${className}`} style={style}>
      {/* Optional above-thumb node (e.g. tooltip, tag, percentage badge) */}
      {(renderAboveThumb || showPercentage) && trackWidth > 0 && (
        <View
          style={{
            position: 'absolute',
            left: thumbLeft + thumbSize / 2,
            top: showPercentage && !renderAboveThumb ? 0 : 0,
            transform: [{ translateX: -18 }],
            zIndex: 10,
          }}
          pointerEvents="none"
        >
          {renderAboveThumb ? (
            renderAboveThumb({ value: clampedValue, ratio })
          ) : (
            <View
              className="items-center"
              style={{
                transform: [{ rotate: '-8.7deg' }],
              }}
            >
              <View className="bg-brand px-1.5 py-0.5 rounded-[5px] items-center justify-center min-w-[34px] shadow-sm">
                <Text className="text-[10px] font-bold text-inverse text-center">
                  {formatPercentage
                    ? formatPercentage(clampedValue, ratio)
                    : `${Math.round(ratio * 100)}%`}
                </Text>
              </View>
              <View
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: 3.5,
                  borderRightWidth: 3.5,
                  borderTopWidth: 4.5,
                  borderStyle: 'solid',
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                }}
                className="border-t-brand"
              />
            </View>
          )}
        </View>
      )}

      {/* Touch Interaction Container with Global Pan Tracking */}
      <View
        collapsable={false}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
        style={{
          width: '100%',
          height: containerHeight,
          justifyContent: 'center',
        }}
        accessibilityRole="adjustable"
        accessibilityValue={{ min, max, now: clampedValue }}
      >
        {/* Track Background */}
        <View
          pointerEvents="none"
          style={{
            width: '100%',
            height: trackHeight,
            borderRadius: trackHeight / 2,
          }}
          className={`bg-card border border-border/80 overflow-hidden ${trackClassName}`}
        >
          {/* Active Filled Bar */}
          <View
            style={[
              {
                width: trackWidth > 0 ? activeWidth : `${Math.round(ratio * 100)}%`,
                height: '100%',
              },
              activeColor ? { backgroundColor: activeColor } : undefined,
            ]}
            className={!activeColor ? `bg-brand ${activeTrackClassName}` : activeTrackClassName}
          />
        </View>

        {/* Thumb */}
        {trackWidth > 0 && (
          <View
            pointerEvents="none"
            className={`absolute bg-foreground rounded-full shadow-lg ${thumbClassName}`}
            style={{
              left: thumbLeft,
              top: (containerHeight - thumbSize) / 2,
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
