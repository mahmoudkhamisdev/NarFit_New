import { AvatarColor, TagStyle } from '@/components/ui';
import { Dumbbell, Flame, TrendingUp, Trophy } from 'lucide-react-native';

export type NotificationCategory = 'all' | 'unread' | 'workouts' | 'clients' | 'plans';

export interface NotificationItem {
  id: string;
  category: 'workouts' | 'clients' | 'plans';
  title: string;
  message: string;
  time: string;
  read: boolean;
  clientName: string;
  avatarColor: AvatarColor;
  avatarSource?: any;
  tag: string;
  tagVariant: TagStyle;
  icon: any;
}

/**
 * Temporary mock notifications for development/testing (3-4 items).
 * Replace with backend/database queries when ready.
 */
export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    category: 'workouts',
    title: 'New Personal Record! 🏆',
    message: 'Sarah smashed her Deadlift PR with 140kg (+10kg vs last week)!',
    time: '5m ago',
    read: false,
    clientName: 'Sarah Jenkins',
    avatarColor: 'green',
    avatarSource: require('@/assets/images/avatars/avatar-7.png'),
    tag: 'PR Broken',
    tagVariant: 'brand',
    icon: Trophy,
  },
  {
    id: '2',
    category: 'workouts',
    title: 'Upcoming Training Session',
    message: 'Chest & Triceps session (Phase 01 | Week 3) with Anwar at 10:00 AM.',
    time: '25m ago',
    read: false,
    clientName: 'Anwar Hosney',
    avatarColor: 'primary',
    avatarSource: require('@/assets/images/avatars/avatar-7.png'),
    tag: 'Today 10:00 AM',
    tagVariant: 'info',
    icon: Dumbbell,
  },
  {
    id: '3',
    category: 'clients',
    title: 'Daily Nutrition Target Hit 🥗',
    message: 'Liam logged 3,100 kcal and hit his 190g target protein intake.',
    time: '1h ago',
    read: false,
    clientName: 'Liam Cooper',
    avatarColor: 'orange',
    avatarSource: require('@/assets/images/avatars/avatar-4.png'),
    tag: 'Nutrition Goal',
    tagVariant: 'success',
    icon: Flame,
  },
  {
    id: '4',
    category: 'plans',
    title: 'VIP Coaching Plan Renewed 💳',
    message: 'Monthly subscription ($199/mo) processed successfully.',
    time: '3h ago',
    read: true,
    clientName: 'Elena Rostova',
    avatarColor: 'primary',
    avatarSource: require('@/assets/images/avatars/avatar-8.png'),
    tag: 'Payment $199',
    tagVariant: 'brand',
    icon: TrendingUp,
  },
];
