import {
  Apple,
  BicepsFlexed,
  Flame,
  Sparkles,
  TrendingUp,
} from "lucide-react-native";

export interface ClientGoalOption {
  id: string;
  label: string;
}

export const CLIENT_GOAL_OPTIONS: ClientGoalOption[] = [
  { id: "lose-weight", label: "Lose weight" },
  { id: "eat-healthier", label: "Eat healthier without losing weight" },
  { id: "gain-weight", label: "Gain weight" },
  { id: "build-muscle", label: "Build muscle" },
  { id: "something-else", label: "Something else" },
];

export const GOAL_ICONS: Record<string, any> = {
  "lose-weight": Flame,
  "eat-healthier": Apple,
  "gain-weight": TrendingUp,
  "build-muscle": BicepsFlexed,
  "something-else": Sparkles,
};

export const CLIENT_GOAL_DETAILS: Record<
  string,
  { title: string; description: string }
> = {
  "lose-weight": {
    title: "Weight Loss",
    description: "Lose fat and improve overall health",
  },
  "eat-healthier": {
    title: "Eat Healthier",
    description: "Eat healthier without losing weight",
  },
  "gain-weight": {
    title: "Weight Gain",
    description: "Increase healthy body mass and weight",
  },
  "build-muscle": {
    title: "Muscle Building",
    description: "Gain lean muscle and overall strength",
  },
};

export function getClientGoalInfo(goalId?: string) {
  if (!goalId || goalId === "lose-weight") {
    return {
      id: "lose-weight",
      title: "Weight Loss",
      description: "Lose fat and improve overall health",
      icon: Flame,
    };
  }
  if (CLIENT_GOAL_DETAILS[goalId]) {
    return {
      id: goalId,
      ...CLIENT_GOAL_DETAILS[goalId],
      icon: GOAL_ICONS[goalId] || Sparkles,
    };
  }
  return {
    id: goalId,
    title: goalId,
    description: "Custom client fitness goal",
    icon: Sparkles,
  };
}

export interface ClientActivityOption {
  id: string;
  title: string;
  description: string;
}

export const CLIENT_ACTIVITY_OPTIONS: ClientActivityOption[] = [
  { id: "sedentary", title: "Sedentary", description: "Little or no exercise" },
  {
    id: "lightly-active",
    title: "Lightly Active",
    description: "Exercise 1–3 days/week",
  },
  {
    id: "moderately-active",
    title: "Moderately Active",
    description: "Exercise 3–5 days/week",
  },
  {
    id: "very-active",
    title: "Very Active",
    description: "Exercise 6–7 days/week",
  },
  {
    id: "extremely-active",
    title: "Extremely Active",
    description: "Intense training / physical job",
  },
];
