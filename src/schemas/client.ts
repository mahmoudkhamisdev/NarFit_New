import { z } from 'zod';

const numericField = (label: string) =>
  z.union([
    z
      .number({ error: `${label} accepts numbers only, not string` })
      .positive(`${label} must be greater than 0`),
    z
      .string({ error: `${label} accepts numbers only, not string` })
      .trim()
      .min(1, `${label} is required`)
      .regex(/^\d+(\.\d+)?$/, `${label} accepts numbers only, not string`)
      .refine((val) => Number(val) > 0, {
        message: `${label} must be greater than 0`,
      }),
  ]);

/* ================= ADD CLIENT FORM SCHEMA ================= */
export const addClientFormSchema = z.object({
  // Step 1: Client Personal Info (39:2894)
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters'),
  gender: z.enum(['male', 'female', 'other']),
  countryCode: z.string().min(1, 'Country code is required'),
  phoneNumber: z
    .string()
    .trim()
    .min(6, 'Please enter a valid phone number'),
  age: numericField('Age'),
  weight: numericField('Weight'),
  height: numericField('Height'),
  avatarId: z.string().optional(),
  photoUri: z.string().optional(),

  // Step 2: Client Goal (39:3013)
  goal: z
    .string()
    .trim()
    .min(1, 'Please select or enter client goal'),

  // Step 3: Client Activity Level (39:3055)
  activityLevel: z
    .string()
    .min(1, 'Please select client activity level'),
});

export type AddClientFormValues = z.infer<typeof addClientFormSchema>;

export const defaultAddClientValues: AddClientFormValues = {
  name: '',
  gender: 'male',
  countryCode: '+20',
  phoneNumber: '',
  age: '',
  weight: '',
  height: '',
  avatarId: '1',
  photoUri: '',
  goal: 'lose-weight',
  activityLevel: 'sedentary',
};

/**
 * Safely parse serialized form data from Expo Router query params.
 */
export function parseClientForm(raw?: string | string[]): AddClientFormValues {
  if (!raw) return { ...defaultAddClientValues };

  try {
    const jsonStr = Array.isArray(raw) ? raw[0] : raw;
    const parsed = JSON.parse(decodeURIComponent(jsonStr));
    return {
      ...defaultAddClientValues,
      ...parsed,
    };
  } catch (e) {
    console.warn('Failed to parse client form params:', e);
    return { ...defaultAddClientValues };
  }
}

/**
 * Safely serialize form values for transmission via Expo Router query params.
 */
export function serializeClientForm(data: Partial<AddClientFormValues>): string {
  return encodeURIComponent(JSON.stringify(data));
}
