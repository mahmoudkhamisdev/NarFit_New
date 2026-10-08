import { Text } from '@/components/ui/text';
import React, { useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native';

export interface PopoverProps {
  /** Trigger element(s) */
  children: React.ReactNode;
  /** Popover title */
  title?: string;
  /** Popover description or custom node */
  content: string | React.ReactNode;
  /** Preferred placement: 'auto' | 'top' | 'bottom' */
  placement?: 'auto' | 'top' | 'bottom';
  /** Arrow anchor: 'icon' (right-end icon) | 'center' (default: 'icon' if trigger is wide) */
  arrowAnchor?: 'icon' | 'center';
  /** Optional container className for trigger */
  className?: string;
  /** Optional container style for trigger */
  style?: ViewStyle;
  /** Max width of popover card (default: 280) */
  maxWidth?: number;
}

interface PopoverLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  popoverWidth: number;
  arrowLeft: number;
  resolvedPlacement: 'top' | 'bottom';
}

export function Popover({
  children,
  title,
  content,
  placement = 'auto',
  arrowAnchor,
  className = '',
  style,
  maxWidth = 280,
}: PopoverProps) {
  const [visible, setVisible] = useState(false);
  const [layout, setLayout] = useState<PopoverLayout | null>(null);
  const triggerRef = useRef<View>(null);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const handleOpen = () => {
    if (visible) {
      setVisible(false);
      return;
    }

    triggerRef.current?.measureInWindow((x, y, width, height) => {
      // If coordinates are invalid, skip
      if (width === 0 && height === 0) return;


      // Determine placement
      let resolvedPlacement: 'top' | 'bottom' = 'top';
      if (placement === 'auto') {
        const spaceAbove = y;
        const spaceBelow = windowHeight - (y + height);
        // If space above is tight (< 120) or space below is significantly larger, show below
        if (spaceAbove < 120 && spaceBelow > spaceAbove) {
          resolvedPlacement = 'bottom';
        } else {
          resolvedPlacement = 'top';
        }
      } else {
        resolvedPlacement = placement;
      }

      // Calculate the focal point on the trigger:
      // When the trigger contains text + right-aligned icon (width > 28),
      // anchor directly to the icon near the right edge (center of icon is ~8px from right).
      const triggerTargetX =
        arrowAnchor === 'center'
          ? x + width / 2
          : arrowAnchor === 'icon' || width > 28
          ? x + width - 8
          : x + width / 2;

      // Popover width: clamp to maxWidth and windowWidth
      const screenPadding = 16;
      const popoverWidth = Math.min(maxWidth, windowWidth - screenPadding * 2);

      // Horizontal position of the popover card centered near the target
      let targetLeft = triggerTargetX - popoverWidth / 2;
      targetLeft = Math.max(
        screenPadding,
        Math.min(targetLeft, windowWidth - popoverWidth - screenPadding)
      );

      // The arrow is a 12x12 square with transform rotate(45deg).
      // Its visual tip center is at arrowLeft + 6.
      // We align the tip center directly with triggerTargetX.
      const arrowHalfSize = 6;
      const rawArrowLeft = triggerTargetX - targetLeft - arrowHalfSize;
      // Clamp arrow inside the card rounded corners
      const minArrowLeft = 14;
      const maxArrowLeft = popoverWidth - 26;
      const arrowLeft = Math.max(minArrowLeft, Math.min(rawArrowLeft, maxArrowLeft));

      setLayout({
        x: targetLeft,
        y,
        width,
        height,
        popoverWidth,
        arrowLeft,
        resolvedPlacement,
      });
      setVisible(true);
    });
  };

  const handleClose = () => {
    setVisible(false);
  };

  const gap = 8;

  return (
    <>
      <View
        ref={triggerRef}
        collapsable={false}
        className={`self-start ${className}`}
        style={[
          {
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
          },
          style,
        ]}
      >
        <Pressable
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          onPress={handleOpen}
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          accessibilityRole="button"
          accessibilityLabel={title ?? 'Information'}
        >
          {children}
        </Pressable>
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={handleClose}
      >
        {/* Fullscreen touch backdrop to close */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleClose}
          accessibilityRole="button"
          accessibilityLabel="Dismiss popover"
        />

        {/* Popover Bubble */}
        {layout && (
          <View
            style={[
              {
                position: 'absolute',
                left: layout.x,
                width: layout.popoverWidth,
              },
              layout.resolvedPlacement === 'top'
                ? { bottom: windowHeight - layout.y + gap }
                : { top: layout.y + layout.height + gap },
            ]}
            className="bg-card border border-border/80 rounded-2xl p-3.5 shadow-2xl"
          >
            {/* Popover Arrow Indicator */}
            {layout.resolvedPlacement === 'top' ? (
              <View
                style={{
                  position: 'absolute',
                  bottom: -6,
                  left: layout.arrowLeft,
                  width: 12,
                  height: 12,
                  transform: [{ rotate: '45deg' }],
                }}
                className="bg-card border-r border-b border-border/80"
              />
            ) : (
              <View
                style={{
                  position: 'absolute',
                  top: -6,
                  left: layout.arrowLeft,
                  width: 12,
                  height: 12,
                  transform: [{ rotate: '45deg' }],
                }}
                className="bg-card border-l border-t border-border/80"
              />
            )}

            {/* Content */}
            {title ? (
              <Text className="text-sm font-bold text-foreground mb-1">
                {title}
              </Text>
            ) : null}

            {typeof content === 'string' ? (
              <Text className="text-xs font-medium text-muted leading-relaxed">
                {content}
              </Text>
            ) : (
              content
            )}
          </View>
        )}
      </Modal>
    </>
  );
}

export default Popover;
