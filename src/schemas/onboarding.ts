import { z } from 'zod';

/* ================= ONBOARDING SCHEMA ================= */
export const onboardingFormSchema = z.object({
  // 1. Profile Setup Screen (39:4259)
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters'),
  dob: z
    .string()
    .min(8, 'Please enter a complete date (DD/MM/YYYY)'),
  gender: z.enum(['male', 'female', 'other']),

  // 2. Experience Screen (39:5307)
  experience: z
    .string()
    .min(1, 'Please select an experience level'),

  // 3. Specialization Screen (39:5389)
  specializations: z
    .array(z.string())
    .min(1, 'Please select at least one specialization'),

  // 4. Clients Count Screen (39:5742)
  clientsCount: z
    .string()
    .min(1, 'Please select number of clients'),

  // 5. Coach Photo Screen (39:5969)
  photoUri: z
    .string({ message: 'Coach photo or avatar is required' })
    .min(1, 'Please take a photo, choose from gallery, or select an avatar'),

  // 6. Avatar Screen (optional metadata)
  avatarId: z.string().optional(),
});

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;

export const defaultOnboardingValues: OnboardingFormValues = {
  name: '',
  dob: '',
  gender: 'male',
  experience: 'beginner',
  specializations: ['Personal Training'],
  clientsCount: 'just-starting',
  photoUri: '',
  avatarId: '',
};

/**
 * Safely parse serialized form data from Expo Router query params.
 */
export function parseOnboardingForm(raw?: string | string[]): OnboardingFormValues {
  if (!raw) return { ...defaultOnboardingValues };

  try {
    const jsonStr = Array.isArray(raw) ? raw[0] : raw;
    const parsed = JSON.parse(decodeURIComponent(jsonStr));
    return {
      ...defaultOnboardingValues,
      ...parsed,
    };
  } catch (e) {
    console.warn('Failed to parse onboarding form params:', e);
    return { ...defaultOnboardingValues };
  }
}

/**
 * Safely serialize form values for transmission via Expo Router query params.
 */
export function serializeOnboardingForm(data: Partial<OnboardingFormValues>): string {
  return encodeURIComponent(JSON.stringify(data));
}
