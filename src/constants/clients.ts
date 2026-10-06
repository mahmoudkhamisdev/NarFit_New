import { AvatarColor, TagStyle } from '@/components/ui';

export type ClientStatusFilter = 'all' | 'training' | 'rest';

export interface ClientItem {
  id: string;
  name: string;
  program: string;
  time: string;
  duration: string;
  status: 'Training' | 'Rest day';
  statusVariant: TagStyle;
  avatarColor: AvatarColor;
  avatarSource?: any;
}

/**
 * Temporary mock clients for development/testing (4 items).
 * Ready to be connected to external database.
 */
export const MOCK_CLIENTS: ClientItem[] = [
  {
    id: '1',
    name: 'Anwar Hosney',
    program: 'Chest & Triceps',
    time: '10:00 AM',
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
    time: '11:30 AM',
    duration: 'Phase 02 | Week 1',
    status: 'Training',
    statusVariant: 'brand',
    avatarColor: 'green',
    avatarSource: require('@/assets/images/avatars/avatar-2.png'),
  },
  {
    id: '3',
    name: 'Marcus Vance',
    program: 'Active Recovery & Mobility',
    time: '01:00 PM',
    duration: 'Phase 01 | Week 4',
    status: 'Rest day',
    statusVariant: 'default',
    avatarColor: 'neutral',
    avatarSource: require('@/assets/images/avatars/avatar-4.png'),
  },
  {
    id: '4',
    name: 'Elena Rostova',
    program: 'Back & Core Hypertrophy',
    time: '03:30 PM',
    duration: 'Phase 01 | Week 2',
    status: 'Training',
    statusVariant: 'brand',
    avatarColor: 'orange',
    avatarSource: require('@/assets/images/avatars/avatar-8.png'),
  },
];
