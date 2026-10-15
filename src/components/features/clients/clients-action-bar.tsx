import { Checkbox, Icon } from '@/components/ui';
import { Text } from '@/components/ui/text';
import {
  Activity,
  Apple,
  Dumbbell,
  Trash2,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { FadeSlideIn } from 'react-native-animation-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ClientsActionBarProps {
  visible: boolean;
  selectedCount: number;
  totalVisibleCount?: number;
  isAllSelected?: boolean;
  onToggleSelectAll?: () => void;
  onCancel: () => void;
  onDeleteSelected: () => void;
  onAssignWorkoutPlan?: () => void;
  onAssignDietPlan?: () => void;
  onChangeStatus?: () => void;
}

export function ClientsActionBar({
  visible,
  selectedCount,
  totalVisibleCount,
  isAllSelected: propIsAllSelected,
  onToggleSelectAll,
  onCancel,
  onDeleteSelected,
  onAssignWorkoutPlan,
  onAssignDietPlan,
  onChangeStatus,
}: ClientsActionBarProps) {
  const insets = useSafeAreaInsets();

  const isAllSelected =
    propIsAllSelected ??
    (totalVisibleCount !== undefined &&
      totalVisibleCount > 0 &&
      selectedCount >= totalVisibleCount);

  if (!visible) return null;

  return (
    <View
      pointerEvents="box-none"
      className="absolute bottom-0 left-0 right-0 px-4 z-999"
      style={{ paddingBottom: Math.max(insets.bottom, 10) }}
    >
      <FadeSlideIn direction="up" distance={40} duration={260}>
        {/* Bulk Action Panel (Figma 302:6248) */}
        <View className="rounded-3xl border border-border bg-card p-4 shadow-2xl gap-3.5">
          {/* Top Row: Checkbox Icon + Selected count + Clear button */}
          <View className="flex-row items-center justify-between">
            {/* Checkbox Select All + Selected Count Text */}
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={onToggleSelectAll}
              label={
                isAllSelected
                  ? 'All clients selected'
                  : `${selectedCount} Client${selectedCount === 1 ? '' : 's'} selected`
              }
              boxClassName="h-5 w-5 rounded-md"
              labelClassName="text-sm font-bold text-foreground"
              className="gap-2.5 flex-1"
            />

            {/* Clear Action Link */}
            <Pressable
              onPress={onCancel}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Clear selection"
              className="active:opacity-70"
            >
              <Text className="text-sm font-semibold text-foreground underline decoration-foreground">
                Clear
              </Text>
            </Pressable>
          </View>

          {/* Bottom Row: 4 Bulk Action Buttons */}
          <View className="flex-row items-center gap-2">
            {/* 1. Workout Plan */}
            <Pressable
              onPress={onAssignWorkoutPlan}
              accessibilityRole="button"
              accessibilityLabel="Assign workout plan"
              className="flex-1 items-center justify-center py-3 px-1.5 rounded-2xl bg-card-subtle shadow-xs active:scale-95 active:opacity-80"
            >
              <View className="h-6 w-6 items-center justify-center">
                <Icon as={Dumbbell} size={20} className="text-foreground" />
              </View>
              <Text
                numberOfLines={1}
                className="text-[10px] font-medium text-foreground-secondary text-center mt-1"
              >
                workout plan
              </Text>
            </Pressable>

            {/* 2. Diet Plan */}
            <Pressable
              onPress={onAssignDietPlan}
              accessibilityRole="button"
              accessibilityLabel="Assign diet plan"
              className="flex-1 items-center justify-center py-3 px-1.5 rounded-2xl bg-card-subtle shadow-xs active:scale-95 active:opacity-80"
            >
              <View className="h-6 w-6 items-center justify-center">
                <Icon as={Apple} size={20} className="text-foreground" />
              </View>
              <Text
                numberOfLines={1}
                className="text-[10px] font-medium text-foreground-secondary text-center mt-1"
              >
                diet plan
              </Text>
            </Pressable>

            {/* 3. Change Status */}
            <Pressable
              onPress={onChangeStatus}
              accessibilityRole="button"
              accessibilityLabel="Change status"
              className="flex-1 items-center justify-center py-3 px-1.5 rounded-2xl bg-card-subtle shadow-xs active:scale-95 active:opacity-80"
            >
              <View className="h-6 w-6 items-center justify-center">
                <Icon as={Activity} size={20} className="text-foreground" />
              </View>
              <Text
                numberOfLines={1}
                className="text-[10px] font-medium text-foreground-secondary text-center mt-1"
              >
                Change status
              </Text>
            </Pressable>

            {/* 4. Delete User */}
            <Pressable
              onPress={onDeleteSelected}
              accessibilityRole="button"
              accessibilityLabel="Delete selected clients"
              className="flex-1 items-center justify-center py-3 px-1.5 rounded-2xl bg-card-subtle shadow-xs active:scale-95 active:opacity-80"
            >
              <View className="h-6 w-6 items-center justify-center">
                <Icon as={Trash2} size={20} className="text-foreground" />
              </View>
              <Text
                numberOfLines={1}
                className="text-[10px] font-medium text-foreground-secondary text-center mt-1"
              >
                Delete user
              </Text>
            </Pressable>
          </View>
        </View>
      </FadeSlideIn>
    </View>
  );
}

export default ClientsActionBar;
