import React from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { Camera, ChevronRight, Lightbulb, Plus } from 'lucide-react-native';
import { Button, Icon, Text } from '@/components/ui';

export type BodyPhotoViewType = 'front' | 'side' | 'back';

export interface ProgressPhotoItem {
  id: string;
  date: string;
  url?: string;
  viewType: BodyPhotoViewType;
}

export interface ProgressPhotosTabProps {
  photos?: ProgressPhotoItem[];
  onAddPhotos?: () => void;
  onPressSection?: (viewType: BodyPhotoViewType) => void;
  onPressPhoto?: (photo: ProgressPhotoItem) => void;
}

const DEFAULT_PHOTOS: ProgressPhotoItem[] = [
  // Front view slots
  { id: 'f-1', date: 'Feb 1 ,2026', viewType: 'front' },
  { id: 'f-2', date: 'Feb 1 ,2026', viewType: 'front' },
  { id: 'f-3', date: 'Feb 1 ,2026', viewType: 'front' },
  { id: 'f-4', date: 'Feb 1 ,2026', viewType: 'front' },
  // Side view slots
  { id: 's-1', date: 'Feb 1 ,2026', viewType: 'side' },
  { id: 's-2', date: 'Feb 1 ,2026', viewType: 'side' },
  { id: 's-3', date: 'Feb 1 ,2026', viewType: 'side' },
  { id: 's-4', date: 'Feb 1 ,2026', viewType: 'side' },
  // Back view slots
  { id: 'b-1', date: 'Feb 1 ,2026', viewType: 'back' },
  { id: 'b-2', date: 'Feb 1 ,2026', viewType: 'back' },
  { id: 'b-3', date: 'Feb 1 ,2026', viewType: 'back' },
  { id: 'b-4', date: 'Feb 1 ,2026', viewType: 'back' },
];

export function ProgressPhotosTab({
  photos = DEFAULT_PHOTOS,
  onAddPhotos,
  onPressSection,
  onPressPhoto,
}: ProgressPhotosTabProps) {
  // If no photos at all, show empty message
  if (!photos || photos.length === 0) {
    return (
      <View className="gap-3.5 w-full">
        <View className="bg-card rounded-xl p-8 border border-border/50 items-center justify-center gap-3.5 w-full min-h-65">
          <View className="size-16 rounded-2xl border border-border/70 items-center justify-center bg-surface">
            <Icon as={Camera} size={28} className="text-muted" />
          </View>

          <View className="items-center gap-1">
            <Text className="text-lg font-bold text-foreground text-center">
              No progress photos yet
            </Text>
            <Text className="text-xs text-muted text-center max-w-[260px] leading-relaxed">
              Add photos regularly to track visual transformation alongside measurements.
            </Text>
          </View>

          <Button
            title="Add photos"
            variant="primary"
            size="sm"
            leftIcon={<Icon as={Plus} size={16} className="text-inverse" />}
            onPress={onAddPhotos}
            className="mt-2"
          />
        </View>
      </View>
    );
  }

  const sections: { key: BodyPhotoViewType; label: string }[] = [
    { key: 'front', label: 'Front view' },
    { key: 'side', label: 'Side view' },
    { key: 'back', label: 'Back view' },
  ];

  return (
    <View className="gap-3.5 w-full">
      {/* Main Progress Photos Card */}
      <View className="bg-card rounded-xl p-3.5 border border-border/50 gap-4 w-full">
        {/* Card Header */}
        <View className="flex-row items-center justify-between w-full">
          <Text className="text-xl font-bold text-foreground">
            Progress photos
          </Text>

          <Pressable
            onPress={onAddPhotos}
            className="bg-card border border-border-strong rounded-xl px-2.5 py-1.5 flex-row items-center gap-1 active:opacity-75"
          >
            <Icon as={Plus} size={14} className="text-foreground" />
            <Text className="text-xs font-medium text-foreground">
              Add photos
            </Text>
          </Pressable>
        </View>

        {/* 3 View Rows (Front, Side, Back) */}
        {sections.map((sec) => {
          const sectionPhotos = photos.filter((p) => p.viewType === sec.key);

          return (
            <View key={sec.key} className="gap-2.5 w-full">
              {/* Row Header */}
              <Pressable
                onPress={() => onPressSection?.(sec.key)}
                className="flex-row items-center justify-between active:opacity-75"
              >
                <Text className="text-base font-medium text-foreground">
                  {sec.label}
                </Text>
                <Icon as={ChevronRight} size={18} className="text-muted" />
              </Pressable>

              {/* Photos Horizontal List / Grid */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
              >
                {sectionPhotos.map((item) => (
                  <Pressable
                    key={item.id}
                    onPress={() => onPressPhoto?.(item)}
                    className="w-[76px] h-[132px] rounded-xl border border-border/70 bg-surface items-center justify-center relative overflow-hidden active:opacity-80"
                  >
                    {item.url ? (
                      <Image
                        source={{ uri: item.url }}
                        className="w-full h-full rounded-xl"
                        resizeMode="cover"
                      />
                    ) : (
                      <View></View>
                    )}

                    {/* Date Tag Pill */}
                    <View className="bg-card/90 border border-border/80 px-1.5 py-0.5 rounded-full absolute bottom-1.5 items-center justify-center">
                      <Text className="text-[9px] text-foreground font-medium text-center">
                        {item.date}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          );
        })}
      </View>

      {/* Photo Tips Card */}
      <View className="bg-card rounded-xl p-4 border border-border/50 flex-row items-start gap-3.5 w-full">
        <View className="size-12 rounded-2xl border border-border/70 items-center justify-center bg-surface shrink-0">
          <Icon as={Lightbulb} size={22} className="text-brand" />
        </View>

        <View className="flex-1 gap-1.5">
          <Text className="text-sm font-medium text-foreground">
            Photo tips
          </Text>
          <View className="gap-1">
            <Text className="text-xs text-muted leading-relaxed">
              • Use the same location, lighting and clothing
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              • Take photos periodically (e.g. every 2—4 weeks)
            </Text>
            <Text className="text-xs text-muted leading-relaxed">
              • Keep the same angles (front, side, back)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
