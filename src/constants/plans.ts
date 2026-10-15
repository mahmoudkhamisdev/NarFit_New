import { ImageSourcePropType } from 'react-native';

export type WorkoutLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type PlanFilterCategory = 'all' | 'weight-loss' | 'muscle-build' | 'strength' | 'endurance';

export const PLAN_LOCAL_IMAGES = {
  workout1: require('@/assets/images/plans/workout-1.jpg'),
  workout2: require('@/assets/images/plans/workout-2.jpg'),
  workout3: require('@/assets/images/plans/workout-3.jpg'),
  workout4: require('@/assets/images/plans/workout-4.jpg'),
};

export interface WorkoutPlanItem {
  id: string;
  title: string;
  category: string;
  categoryKey: PlanFilterCategory;
  duration: string;
  frequency: string;
  level: WorkoutLevel;
  imageUrl: ImageSourcePropType | string;
  description?: string;
  isCustom?: boolean;
}

export const MOCK_EXPLORE_PLANS: WorkoutPlanItem[] = [
  {
    id: 'explore-1',
    title: 'Full Body Split',
    category: 'Weight loss',
    categoryKey: 'weight-loss',
    duration: '8 weeks',
    frequency: '2-3 days',
    level: 'Beginner',
    imageUrl: PLAN_LOCAL_IMAGES.workout1,
    description: 'Designed to torch fat and maintain lean muscle with compound body splits.',
  },
  {
    id: 'explore-2',
    title: 'Upper / Lower Split',
    category: 'Muscle building',
    categoryKey: 'muscle-build',
    duration: '8 weeks',
    frequency: '4 days',
    level: 'Intermediate',
    imageUrl: PLAN_LOCAL_IMAGES.workout2,
    description: 'Classic 4-day split to optimize recovery and build balanced upper/lower strength.',
  },
  {
    id: 'explore-3',
    title: 'Push Pull Legs (PPL)',
    category: 'Muscle building',
    categoryKey: 'muscle-build',
    duration: '12 weeks',
    frequency: '5-6 days',
    level: 'Advanced',
    imageUrl: PLAN_LOCAL_IMAGES.workout3,
    description: 'High-volume hypertrophy routine targeting major muscle groups twice weekly.',
  },
  {
    id: 'explore-4',
    title: 'Metabolic HIIT Burn',
    category: 'Weight loss',
    categoryKey: 'weight-loss',
    duration: '6 weeks',
    frequency: '3 days',
    level: 'Beginner',
    imageUrl: PLAN_LOCAL_IMAGES.workout4,
    description: 'High intensity interval training mixed with dumbbell complexes for maximum burn.',
  },
  {
    id: 'explore-5',
    title: 'Strength & Power',
    category: 'Strength',
    categoryKey: 'strength',
    duration: '10 weeks',
    frequency: '3-4 days',
    level: 'Advanced',
    imageUrl: PLAN_LOCAL_IMAGES.workout1,
    description: 'Focus on progressive overload on bench, squat, deadlift and overhead press.',
  },
  {
    id: 'explore-6',
    title: 'Core & Mobility',
    category: 'Endurance',
    categoryKey: 'endurance',
    duration: '4 weeks',
    frequency: '2-3 days',
    level: 'Beginner',
    imageUrl: PLAN_LOCAL_IMAGES.workout2,
    description: 'Improve mobility, prevent injuries and build rock solid core stability.',
  },
];

export const MOCK_MY_PLANS: WorkoutPlanItem[] = [
  {
    id: 'my-1',
    title: 'Full Body Split',
    category: 'Weight loss',
    categoryKey: 'weight-loss',
    duration: '8 weeks',
    frequency: '2-3 days',
    level: 'Beginner',
    imageUrl: PLAN_LOCAL_IMAGES.workout1,
    isCustom: true,
  },
  {
    id: 'my-2',
    title: 'Full Body Split',
    category: 'Weight loss',
    categoryKey: 'weight-loss',
    duration: '8 weeks',
    frequency: '2-3 days',
    level: 'Beginner',
    imageUrl: PLAN_LOCAL_IMAGES.workout1,
    isCustom: true,
  },
  {
    id: 'my-3',
    title: 'Full Body Split',
    category: 'Weight loss',
    categoryKey: 'weight-loss',
    duration: '8 weeks',
    frequency: '2-3 days',
    level: 'Beginner',
    imageUrl: PLAN_LOCAL_IMAGES.workout1,
    isCustom: true,
  },
  {
    id: 'my-4',
    title: 'Upper Hypertrophy Focus',
    category: 'Muscle building',
    categoryKey: 'muscle-build',
    duration: '10 weeks',
    frequency: '4 days',
    level: 'Intermediate',
    imageUrl: PLAN_LOCAL_IMAGES.workout2,
    isCustom: true,
  },
  {
    id: 'my-5',
    title: 'Power Deadlift & Squat',
    category: 'Strength',
    categoryKey: 'strength',
    duration: '6 weeks',
    frequency: '3 days',
    level: 'Advanced',
    imageUrl: PLAN_LOCAL_IMAGES.workout3,
    isCustom: true,
  },
];
