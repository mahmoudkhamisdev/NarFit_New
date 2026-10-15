import { AvatarColor, TagStyle } from '@/components/ui';

export type ClientStatusFilter = 'all' | 'training' | 'rest' | 'attention';

export type ClientStatusType = 'Training' | 'Rest' | 'Attention' | 'Rest day';

export interface ClientItem {
  id: string;
  name: string;
  program: string;
  time: string;
  day?: string;
  duration?: string;
  status: ClientStatusType;
  statusVariant?: TagStyle;
  avatarColor: AvatarColor;
  avatarSource?: any;
}

/**
 * Mock clients for development/testing matching Figma designs (291:2523 & 297:3709).
 */
export const MOCK_CLIENTS: ClientItem[] = [
  {
    id: '1',
    name: 'Anwar Hosney',
    program: 'Chest & triceps',
    time: '10:00',
    day: 'Tue',
    duration: 'Phase 01 | Week 3',
    status: 'Training',
    statusVariant: 'brand',
    avatarColor: 'primary',
    avatarSource: require('@/assets/images/avatars/avatar-7.png'),
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    program: 'Leg Day & Glutes',
    time: '11:30',
    day: 'Wed',
    duration: 'Phase 02 | Week 1',
    status: 'Attention',
    statusVariant: 'error',
    avatarColor: 'green',
    avatarSource: require('@/assets/images/avatars/avatar-2.png'),
  },
  {
    id: '3',
    name: 'Marcus Vance',
    program: 'Active Recovery & Mobility',
    time: '01:00',
    day: 'Thu',
    duration: 'Phase 01 | Week 4',
    status: 'Rest',
    statusVariant: 'default',
    avatarColor: 'neutral',
    avatarSource: require('@/assets/images/avatars/avatar-4.png'),
  },
  {
    id: '4',
    name: 'Elena Rostova',
    program: 'Back & Core Hypertrophy',
    time: '03:30',
    day: 'Fri',
    duration: 'Phase 01 | Week 2',
    status: 'Training',
    statusVariant: 'brand',
    avatarColor: 'orange',
    avatarSource: require('@/assets/images/avatars/avatar-8.png'),
  },
  {
    id: '5',
    name: 'Tarek Zaid',
    program: 'Metabolic Conditioning',
    time: '09:00',
    day: 'Mon',
    duration: 'Phase 03 | Week 1',
    status: 'Attention',
    statusVariant: 'error',
    avatarColor: 'red',
    avatarSource: require('@/assets/images/avatars/avatar-5.png'),
  },
];
