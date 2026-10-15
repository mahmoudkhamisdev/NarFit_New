import { z } from 'zod';

export const createWorkoutPlanSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, 'Plan title must be at least 2 characters')
    .max(50, 'Plan title must be under 50 characters'),
  category: z.enum(['weight-loss', 'muscle-build', 'strength', 'endurance'] as const, {
    message: 'Please select a valid category',
  }),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced'] as const, {
    message: 'Please select a fitness level',
  }),
  duration: z
    .string()
    .trim()
    .min(1, 'Duration is required'),
  frequency: z
    .string()
    .trim()
    .min(1, 'Frequency is required'),
});

export type CreateWorkoutPlanFormValues = z.infer<typeof createWorkoutPlanSchema>;

export const defaultCreateWorkoutPlanValues: CreateWorkoutPlanFormValues = {
  title: '',
  category: 'weight-loss',
  level: 'Beginner',
  duration: '8 weeks',
  frequency: '3-4 days',
};
