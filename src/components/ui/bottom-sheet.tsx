import GorhomBottomSheet, {
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModalProps,
  BottomSheetProps,
  BottomSheetScrollView,
  BottomSheetSectionList,
  BottomSheetTextInput,
  BottomSheetView,
  BottomSheetBackdrop as GorhomBottomSheetBackdrop,
  BottomSheetModal as GorhomBottomSheetModal,
  useBottomSheet,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback } from 'react';
import { useUniwind } from 'uniwind';

export interface CustomBottomSheetModalProps extends BottomSheetModalProps {
  children: React.ReactNode;
  contentClassName?: string;
  enableBackdrop?: boolean;
}

export const BottomSheetModal = forwardRef<GorhomBottomSheetModal, CustomBottomSheetModalProps>(
  (
    {
      children,
      contentClassName = '',
      enableBackdrop = true,
      backgroundStyle,
      handleIndicatorStyle,
      ...props
    },
    ref
  ) => {
    const { theme } = useUniwind();
    const isDark = theme === 'dark';

    const renderBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => {
        if (!enableBackdrop) return null;
        return (
          <GorhomBottomSheetBackdrop
            {...backdropProps}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            opacity={0.65}
          />
        );
      },
      [enableBackdrop]
    );

    return (
      <GorhomBottomSheetModal
        ref={ref}
        backdropComponent={renderBackdrop}
        backgroundStyle={[
          {
            backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            borderWidth: 1,
            borderColor: isDark ? '#333333' : '#e5e7e9',
          },
          backgroundStyle,
        ]}
        handleIndicatorStyle={[
          {
            backgroundColor: isDark ? '#4d4d4d' : '#d1d5d8',
            width: 44,
            height: 5,
            borderRadius: 999,
          },
          handleIndicatorStyle,
        ]}
        {...props}
      >
        <BottomSheetView className={`p-5 ${contentClassName}`}>
          {children}
        </BottomSheetView>
      </GorhomBottomSheetModal>
    );
  }
);

BottomSheetModal.displayName = 'BottomSheetModal';

export interface CustomBottomSheetProps extends BottomSheetProps {
  children: React.ReactNode;
  contentClassName?: string;
}

export const BottomSheet = forwardRef<GorhomBottomSheet, CustomBottomSheetProps>(
  ({ children, contentClassName = '', backgroundStyle, handleIndicatorStyle, ...props }, ref) => {
    const { theme } = useUniwind();
    const isDark = theme === 'dark';

    return (
      <GorhomBottomSheet
        ref={ref}
        backgroundStyle={[
          {
            backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            borderWidth: 1,
            borderColor: isDark ? '#333333' : '#e5e7e9',
          },
          backgroundStyle,
        ]}
        handleIndicatorStyle={[
          {
            backgroundColor: isDark ? '#4d4d4d' : '#d1d5d8',
            width: 44,
            height: 5,
            borderRadius: 999,
          },
          handleIndicatorStyle,
        ]}
        {...props}
      >
        <BottomSheetView className={`p-5 ${contentClassName}`}>
          {children}
        </BottomSheetView>
      </GorhomBottomSheet>
    );
  }
);

BottomSheet.displayName = 'BottomSheet';

export {
  GorhomBottomSheetBackdrop as BottomSheetBackdrop, BottomSheetFlatList, BottomSheetScrollView, BottomSheetSectionList,
  BottomSheetTextInput, BottomSheetView, useBottomSheet,
  useBottomSheetModal
};

