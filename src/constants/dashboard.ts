import { AvatarColor, TagStyle } from '@/components/ui';

export interface TodaySessionItem {
  id: string;
  clientName: string;
  program: string;
  time: string;
  avatarColor: AvatarColor;
  avatarSource?: any;
  status: string;
  statusVariant: TagStyle;
  duration: string;
}

export interface RecentActivityItem {
  id: string;
  name: string;
  action: string;
  time: string;
  color: AvatarColor;
  badge: string;
}

/**
 * Temporary mock data for dashboard sessions and activity feed.
 * Replace with backend/database queries when ready.
 */
export const DASHBOARD_TODAY_SESSIONS: TodaySessionItem[] = [
  {
    id: '1',
    clientName: 'Anwar hosney',
    program: 'Chest & triceps',
    time: '10:00',
    avatarColor: 'primary',
    avatarSource: require('@/assets/images/avatars/avatar-7.png'),
    status: 'Training',
    statusVariant: 'brand',
    duration: 'Phase 01 | Week 3',
  },
  {
    id: '2',
    clientName: 'Anwar hosney',
    program: 'Chest & triceps',
    time: '10:00',
    avatarColor: 'green',
    avatarSource: require('@/assets/images/avatars/avatar-7.png'),
    status: 'Training',
    statusVariant: 'brand',
    duration: 'Phase 01 | Week 3',
  },
  {
    id: '3',
    clientName: 'Anwar hosney',
    program: 'Chest & triceps',
    time: '10:00',
    avatarColor: 'neutral',
    avatarSource: require('@/assets/images/avatars/avatar-7.png'),
    status: 'Rest day',
    statusVariant: 'default',
    duration: 'Phase 01 | Week 3',
  },
];

export const DASHBOARD_RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    action: 'completed Leg Day PR: Squat 110kg',
    time: '2m ago',
    color: 'green',
    badge: 'New PR',
  },
  {
    id: '2',
    name: 'Marcus Vance',
    action: 'logged daily protein intake (185g)',
    time: '18m ago',
    color: 'primary',
    badge: 'Nutrition',
  },
  {
    id: '3',
    name: 'Elena Rostova',
    action: 'achieved 7-day workout streak',
    time: '1h ago',
    color: 'orange',
    badge: 'Streak',
  },
];
