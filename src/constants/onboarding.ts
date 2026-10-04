import { SelectOption } from '@/components/ui';

/* ================= 1. GENDER OPTIONS (Profile Screen) ================= */
export const GENDER_OPTIONS: SelectOption[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

/* ================= 2. EXPERIENCE OPTIONS (Experience Screen) ================= */
export interface ExperienceOption {
  id: string;
  label: string;
}

export const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  { id: 'beginner', label: 'Beginner — Less than 1 year' },
  { id: 'intermediate', label: 'Intermediate — 1–3 years' },
  { id: 'advanced', label: 'Advanced — 3–5 years' },
  { id: 'expert', label: 'Expert — 5+ years' },
];

/* ================= 3. SPECIALIZATION TAGS (Specialization Screen) ================= */
export const SPECIALIZATION_TAGS: string[] = [
  'Personal Training',
  'Weight Loss',
  'Muscle Building',
  'Strength Training',
  'Bodybuilding',
  'Fitness',
  'Nutrition',
];

/* ================= 4. CLIENT OPTIONS (Number of Clients Screen) ================= */
export interface ClientOption {
  id: string;
  label: string;
}

export const CLIENT_OPTIONS: ClientOption[][] = [
  [
    { id: 'just-starting', label: 'Just starting' },
    { id: '1-10', label: '1–10' },
  ],
  [
    { id: '11-30', label: '11–30' },
    { id: '31-50', label: '31–50' },
  ],
  [
    { id: '50+', label: '+50' },
    { id: 'other', label: 'Other' },
  ],
];
