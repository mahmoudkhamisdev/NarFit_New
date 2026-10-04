import { ImageSourcePropType } from 'react-native';

export interface AvatarItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

export const COACH_AVATARS: AvatarItem[] = [
  { id: '1', name: 'Max', image: require('@/assets/images/avatars/avatar-1.png') },
  { id: '2', name: 'Alex', image: require('@/assets/images/avatars/avatar-2.png') },
  { id: '3', name: 'Sam', image: require('@/assets/images/avatars/avatar-3.png') },
  { id: '4', name: 'Leo', image: require('@/assets/images/avatars/avatar-4.png') },
  { id: '5', name: 'Maya', image: require('@/assets/images/avatars/avatar-5.png') },
  { id: '6', name: 'Zoe', image: require('@/assets/images/avatars/avatar-6.png') },
  { id: '7', name: 'Emma', image: require('@/assets/images/avatars/avatar-7.png') },
  { id: '8', name: 'Mia', image: require('@/assets/images/avatars/avatar-8.png') },
  { id: '9', name: 'Kai', image: require('@/assets/images/avatars/avatar-9.png') },
  { id: '10', name: 'Rowan', image: require('@/assets/images/avatars/avatar-10.png') },
  { id: '11', name: 'Harper', image: require('@/assets/images/avatars/avatar-11.png') },
  { id: '12', name: 'Jordan', image: require('@/assets/images/avatars/avatar-12.png') },
  { id: '13', name: 'Taylor', image: require('@/assets/images/avatars/avatar-13.png') },
  { id: '14', name: 'Morgan', image: require('@/assets/images/avatars/avatar-14.png') },
  { id: '15', name: 'Casey', image: require('@/assets/images/avatars/avatar-15.png') },
  { id: '16', name: 'Riley', image: require('@/assets/images/avatars/avatar-16.png') },
];
