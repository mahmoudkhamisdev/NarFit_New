import {
  Avatar,
  Card,
  Checkbox,
  Icon,
  Tag,
} from '@/components/ui';
import { ClientItem } from '@/constants';
import { ChevronRight, Dumbbell, Moon } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

export interface ClientCardProps {
  item: ClientItem;
  isSelected: boolean;
  isSelectionMode: boolean;
  onPress: (id: string) => void;
  onLongPress: (id: string) => void;
}

/**
 * Client Card component matching Figma 291:2523 and 297:3709
 */
export function ClientCard({
  item,
  isSelected,
  isSelectionMode,
  onPress,
  onLongPress,
}: ClientCardProps) {
  const isAttention = item.status === 'Attention';
  const isRest = item.status === 'Rest' || item.status === 'Rest day';

  const tagVariant = isAttention ? 'error' : isRest ? 'default' : 'brand';

  const tagIcon = isAttention ? (
    <View className="h-2 w-2 rounded-full bg-[#d92d20]" />
  ) : isRest ? (
    <Icon as={Moon} size={11} className="text-[#4b5563] dark:text-[#9ca3af] stroke-[2.5]" />
  ) : (
    <Icon as={Dumbbell} size={11} className="text-[#657b22] dark:text-[#a3e635] stroke-[2.5]" />
  );

  return (
    <Pressable
      onPress={() => onPress(item.id)}
      onLongPress={() => onLongPress(item.id)}
      delayLongPress={220}
      accessibilityRole="button"
      accessibilityLabel={`Client ${item.name}`}
      className="active:opacity-85"
    >
      <Card
        className={`flex-row items-center justify-between rounded-2xl p-3 border transition-colors ${isSelected
            ? 'border-brand bg-card shadow-sm'
            : 'border-border/60 bg-card'
          }`}
      >
        {/* Left Slot: Avatar + Tag & Client Info */}
        <View className="flex-row items-center gap-3 flex-1 min-w-0 pr-2">
          {isSelectionMode && (
            <View className="items-center justify-center">
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onPress(item.id)}
              />
            </View>
          )}

          <View className="relative shrink-0">
            <Avatar
              source={item.avatarSource}
              name={item.name}
              color={item.avatarColor}
              size="xl"
            />
            <Tag
              size="sm"
              variant={tagVariant}
              leftIcon={tagIcon}
              className="absolute -bottom-1 -right-1 h-4 min-w-4 px-1 rounded border-0"
            />
          </View>

          <View className="flex-1 min-w-0">
            <Text
              className="text-base font-bold text-foreground tracking-tight"
              numberOfLines={1}
            >
              {item.name}
            </Text>
            {!isRest && (
              <Text
                className="text-sm font-normal text-foreground-secondary mt-0.5"
                numberOfLines={1}
              >
                {item.program}
              </Text>
            )}
          </View>
        </View>

        {/* Right Slot: Time & Day + Chevron */}
        <View className="flex-row items-center gap-2.5 shrink-0">
          {!isRest && (
            <View className="items-end justify-center">
              <Text className="text-xs font-medium text-muted">
                {item.time}
              </Text>
              <Text className="text-xs font-medium text-muted mt-0.5">
                {item.day ?? 'Tue'}
              </Text>
            </View>
          )}

          {!isSelectionMode && (
            <Icon
              as={ChevronRight}
              size={20}
              className="text-muted/60"
            />
          )}
        </View>
      </Card>
    </Pressable>
  );
}

export default ClientCard;
