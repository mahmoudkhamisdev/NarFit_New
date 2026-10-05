export interface ClientGoalOption {
  id: string;
  label: string;
}

export const CLIENT_GOAL_OPTIONS: ClientGoalOption[] = [
  { id: 'lose-weight', label: 'Lose weight' },
  { id: 'eat-healthier', label: 'Eat healthier without losing weight' },
  { id: 'gain-weight', label: 'Gain weight' },
  { id: 'build-muscle', label: 'Build muscle' },
  { id: 'something-else', label: 'Something else' },
];

export interface ClientActivityOption {
  id: string;
  title: string;
  description: string;
}

export const CLIENT_ACTIVITY_OPTIONS: ClientActivityOption[] = [
  { id: 'sedentary', title: 'Sedentary', description: 'Little or no exercise' },
  { id: 'lightly-active', title: 'Lightly Active', description: 'Exercise 1–3 days/week' },
  { id: 'moderately-active', title: 'Moderately Active', description: 'Exercise 3–5 days/week' },
  { id: 'very-active', title: 'Very Active', description: 'Exercise 6–7 days/week' },
  { id: 'extremely-active', title: 'Extremely Active', description: 'Intense training / physical job' },
];
