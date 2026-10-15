import { Button, Icon } from '@/components/ui';
import { Text } from '@/components/ui/text';
import { RotateCcw } from 'lucide-react-native';
import React from 'react';
import { Modal, View } from 'react-native';

export interface ResumeProgressDialogProps {
  visible: boolean;
  stepNumber: number;
  onResume: () => void;
  onStartFresh: () => void;
}

export function ResumeProgressDialog({
  visible,
  stepNumber,
  onResume,
  onStartFresh,
}: ResumeProgressDialogProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onStartFresh}
    >
      <View className="flex-1 bg-black/70 items-center justify-center p-6">
        <View className="w-full max-w-sm rounded-3xl bg-card border border-border p-6 shadow-2xl items-center">
          <View className="h-14 w-14 rounded-2xl bg-brand/15 items-center justify-center mb-4">
            <Icon as={RotateCcw} size={28} className="text-brand" />
          </View>

          <Text className="text-xl font-bold text-foreground text-center">
            Continue Registration?
          </Text>

          <Text className="text-sm font-medium text-foreground-secondary text-center mt-2 leading-5">
            You have saved progress at Step {stepNumber || 1}. Would you like to continue where you left off or start from the beginning?
          </Text>

          <View className="w-full gap-3 mt-6">
            <Button
              title="Continue"
              variant="primary"
              size="lg"
              className="h-14 rounded-2xl shadow-sm"
              textClassName="text-base font-bold text-inverse"
              fullWidth
              onPress={onResume}
            />
            <Button
              title="Start from beginning"
              variant="outline"
              size="lg"
              className="h-14 rounded-2xl"
              textClassName="text-base font-semibold text-foreground"
              fullWidth
              onPress={onStartFresh}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
