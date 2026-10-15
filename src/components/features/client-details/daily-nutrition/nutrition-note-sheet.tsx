import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Pressable, View } from 'react-native';
import { X } from 'lucide-react-native';
import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetModal,
  Button,
  Icon,
  Text,
  Textarea,
} from '@/components/ui';

export interface NutritionNoteSheetProps {
  onSave?: (note: string) => void;
}

export interface NutritionNoteSheetRef {
  present: (initialNote?: string, dateLabel?: string) => void;
  dismiss: () => void;
}

export const NutritionNoteSheet = forwardRef<
  NutritionNoteSheetRef,
  NutritionNoteSheetProps
>(({ onSave }, ref) => {
  const insets = useSafeAreaInsets();
  const modalRef = useRef<GorhomBottomSheetModal>(null);
  const [note, setNote] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');

  useImperativeHandle(ref, () => ({
    present: (initialNote = '', dateLabel = '') => {
      setNote(initialNote);
      setSubtitle(dateLabel);
      modalRef.current?.present();
    },
    dismiss: () => {
      modalRef.current?.dismiss();
    },
  }));

  const handleSave = () => {
    onSave?.(note);
    modalRef.current?.dismiss();
  };

  return (
    <BottomSheetModal
      ref={modalRef}
      enableDynamicSizing
      stackBehavior="push"
      contentClassName="px-5 pt-2 pb-6 gap-5"
      style={{ paddingBottom: insets.bottom }}
    >
      {/* Header Row */}
      <View className="flex-row items-center justify-between pb-1">
        <View className="flex-1 pr-3">
          <Text className="text-2xl font-bold text-foreground">
            Nutrition Note
          </Text>
          {subtitle ? (
            <Text className="text-xs text-muted mt-0.5" numberOfLines={1}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        <Pressable
          onPress={() => modalRef.current?.dismiss()}
          hitSlop={8}
          className="p-1 rounded-full active:opacity-60"
        >
          <Icon as={X} size={22} className="text-foreground" />
        </Pressable>
      </View>

      {/* Note Input */}
      <Textarea
        label="Day Note"
        asBottomSheetInput
        value={note}
        onChangeText={setNote}
        placeholder="Write nutrition notes, adherence, or observations for this day..."
        maxLength={300}
        showCount
        countPosition="bottom"
        className="h-40"
        inputClassName="text-base text-foreground"
      />

      {/* Save Button */}
      <View className="pt-2">
        <Button
          title="Save Note"
          variant="primary"
          size="lg"
          fullWidth
          className="h-16 rounded-2xl bg-brand"
          textClassName="text-inverse text-lg font-bold"
          onPress={handleSave}
        />
      </View>
    </BottomSheetModal>
  );
});

NutritionNoteSheet.displayName = 'NutritionNoteSheet';

export default NutritionNoteSheet;
