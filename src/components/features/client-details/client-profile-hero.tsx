import React from 'react';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import { Cake, Dumbbell, MapPin, Phone, User } from 'lucide-react-native';
import { Icon, Tag, Text } from '@/components/ui';
import { BRUSH_PATH } from '@/constants/brush-path';
import Svg, { ClipPath, Defs, Image as SvgImage, Path } from 'react-native-svg';

export interface ClientProfileHeroProps {
  name?: string;
  age?: string;
  gender?: string;
  phone?: string;
  location?: string;
  status?: string;
  locationType?: string;
  frequency?: string;
  avatarSource?: ImageSourcePropType;
}

export function ClientProfileHero({
  name = 'Mahmoud khamis',
  age = '24 years',
  gender = 'Male',
  phone = '+201017130116',
  location = 'Cairo, Egypt',
  status = 'Active',
  locationType = 'Gym',
  frequency = '3 days/week',
  avatarSource,
}: ClientProfileHeroProps) {
  const resolvedAvatar = avatarSource ?? require('@/assets/images/avatars/avatar-7.png');

  const normalizedStatus = status.toLowerCase();
  const isAttention = normalizedStatus.includes('attention');
  const isRest = normalizedStatus.includes('rest');

  const statusVariant = isAttention ? 'error' : isRest ? 'default' : 'brand';

  const statusDot = isAttention ? (
    <View className="size-2 rounded-full bg-error mr-0.5" />
  ) : isRest ? (
    <View className="size-2 rounded-full bg-muted mr-0.5" />
  ) : (
    <View className="size-2 rounded-full bg-brand mr-0.5" />
  );

  return (
    <View className="gap-3 w-full">
      {/* Top Profile Card: Avatar + Metadata */}
      <View className="flex-row items-center gap-3 w-full">
        {/* Avatar Image */}
        <View className="size-32 overflow-hidden">
          {/* <Image
            source={resolvedAvatar}
            className="size-full"
            resizeMode="cover"
          /> */}
          <Svg width="100%" height="100%" viewBox="0 0 345 347">
            <Defs>
              <ClipPath id="clientBrushClip">
                <Path d={BRUSH_PATH} />
              </ClipPath>
            </Defs>

            <SvgImage
              href={resolvedAvatar}
              width={345}
              height={347}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clientBrushClip)"
            />
          </Svg>
        </View>

        {/* Info Column */}
        <View className="flex-1 justify-center gap-2">
          {/* Name */}
          <Text className="text-2xl font-bold text-foreground tracking-tight">
            {name}
          </Text>

          {/* Age & Gender */}
          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center gap-1">
              <Icon as={Cake} size={15} className="text-foreground" />
              <Text className="text-sm text-foreground">{age}</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Icon as={User} size={15} className="text-foreground" />
              <Text className="text-sm text-foreground">{gender}</Text>
            </View>
          </View>

          {/* Contact & Location */}
          <View className="gap-1">
            <View className="flex-row items-center gap-1.5">
              <Icon as={Phone} size={15} className="text-foreground" />
              <Text className="text-sm text-foreground">{phone}</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Icon as={MapPin} size={15} className="text-foreground" />
              <Text className="text-sm text-foreground">{location}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tags Row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, paddingVertical: 2 }}
        className="mt-1"
      >
        {/* Status Tag */}
        <Tag
          variant={statusVariant}
          size="md"
          leftIcon={statusDot}
          label={status}
          className="rounded-xl"
        />

        {/* Gym Tag */}
        <Tag
          variant="default"
          size="md"
          leftIcon={<Icon as={Dumbbell} size={14} className="text-foreground-secondary mr-0.5" />}
          label={locationType}
          className="rounded-xl"
        />

        {/* Frequency Tag */}
        <Tag
          variant="default"
          size="md"
          leftIcon={<Icon as={Dumbbell} size={14} className="text-foreground-secondary mr-0.5" />}
          label={frequency}
          className="rounded-xl"
        />
      </ScrollView>
    </View>
  );
}

export default ClientProfileHero;
