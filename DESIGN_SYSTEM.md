# NARFIT Mobile Design System & UI Specification

> **Target AI Prompt Directive**:  
> This document specifies the complete Design System, UI guidelines, design tokens, typography, component API catalog, and layout conventions for the **Narfit** mobile application (Expo SDK 57, React Native 0.86, React 19, Uniwind / Tailwind CSS v4, Lucide Icons).  
> **Feed this file directly to any AI / LLM** as a system prompt or style context to generate new screens, widgets, and components that 100% seamlessly match the Narfit design language.

---

## 1. Design Philosophy & Visual Language

- **Brand Personality**: High-energy, elite fitness, athletic performance, sleek, modern, and confident.
- **Theme Paradigm**: **Dark-First Architecture** with obsidian blacks (`#000000`), dark surfaces (`#161616`), and striking **Electric Neon Lime** accents (`#caff2e` / `#bfff00`). Fully supports seamless **Light Mode** transition using Olive Lime (`#759900`) and soft grays.
- **Card & Geometry Style**: Soft, organic rounded geometries. Cards use `rounded-3xl` (24px) or `rounded-4xl` (32px). Buttons are pill-shaped (`rounded-full`) or modern rounded squares (`rounded-2xl`).
- **Iconography**: Clean, 2px stroke vector icons from `lucide-react-native`, always encapsulated in the project's `<Icon as={...} />` component.
- **Styling Architecture**: **Uniwind** (Tailwind CSS v4 for React Native). All colors must reference theme token classes (`bg-background`, `bg-card`, `text-brand`, `border-border`, etc.) instead of hardcoded hex values.

---

## 2. Color Palette & Theme Tokens

### 2.1 Color Tokens Table

| Token Variable | Dark Mode Hex | Light Mode Hex | Tailwind / Uniwind Class | Usage / Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `--color-background` | `#000000` | `#ffffff` | `bg-background`, `text-background` | Root screen background |
| `--color-surface` | `#161616` | `#f9fafb` | `bg-surface`, `border-surface` | Secondary background, input containers |
| `--color-card` | `#1a1a1a` | `#f2f4f5` | `bg-card`, `border-card` | Main cards, modals, sheet headers |
| `--color-card-subtle` | `#262626` | `#e5e7e9` | `bg-card-subtle` | Nested cards, inactive chips, pill backgrounds |
| `--color-foreground` | `#f2f4f5` | `#1a1a1a` | `text-foreground` | Primary text, active icons, prominent headers |
| `--color-foreground-secondary`| `#d1d5d8` | `#4d4d4d` | `text-foreground-secondary` | Secondary text, sub-labels |
| `--color-muted` | `#737373` | `#737373` | `text-muted` | Captions, hints, placeholders, inactive icons |
| `--color-disabled` | `#4d4d4d` | `#9ca3a7` | `text-disabled` | Disabled text, inactive buttons |
| `--color-inverse` | `#1a1a1a` | `#ffffff` | `text-inverse`, `bg-inverse` | High-contrast text on top of Brand background |
| `--color-border` | `#333333` | `#d1d5d8` | `border-border` | Standard card and input borders |
| `--color-border-subtle` | `#262626` | `#e5e7e9` | `border-border-subtle` | Dividers, subtle item borders |
| `--color-border-strong` | `#4d4d4d` | `#9ca3a7` | `border-border-strong` | Active, hover, or pressed borders |
| `--color-brand` | `#caff2e` (Neon) | `#759900` (Olive) | `bg-brand`, `text-brand`, `border-brand` | Primary CTA, active tab, brand highlights |
| `--color-brand-neon` | `#bfff00` | `#caff2e` | `text-brand-neon`, `bg-brand-neon` | Glowing badges, high-impact numbers |
| `--color-brand-disabled`| `#394c00` | `#e4f2b3` | `bg-brand-disabled` | Inactive/disabled primary button container |
| `--color-brand-text-disabled`| `#526b00` | `#96b342` | `text-brand-text-disabled` | Text inside disabled primary button |

### 2.2 Semantic Status Tokens

| Semantic Role | Dark Base | Dark Background | Light Base | Light Background | Tailwind Text Class | Tailwind Container Class |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Error** | `#b42318` | `#381212` | `#b42318` | `#fee4e2` | `text-error` | `bg-error-bg border-error/30` |
| **Success** | `#027a48` | `#0b2b1a` | `#027a48` | `#d1fadf` | `text-success` | `bg-success-bg border-success/30` |
| **Warning** | `#b54708` | `#3d2307` | `#b54708` | `#fef0c7` | `text-warning` | `bg-warning-bg border-warning/30` |
| **Info** | `#026aa2` | `#0a2538` | `#026aa2` | `#e0f2fe` | `text-info` | `bg-info-bg border-info/30` |

### 2.3 Opacity & Tint Conventions

- Brand Glow / Soft fill: `bg-brand/15` or `bg-brand/20`
- Subtle Brand Border: `border-brand/40` or `border-brand/50`
- Backdrop Mask: `bg-black/60` or `bg-black/25`
- Disabled Elements: `opacity-50` or `opacity-60`
- Active / Pressed State: `active:opacity-75` or `active:opacity-85`

---

## 3. Typography Scale & Hierarchy

Use standard sans-serif system fonts with expressive weights and tight tracking for an athletic look.

| Hierarchy Level | Font Size | Font Weight | Tailwind Classes | Typical Use Case |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | 42px – 58px | `font-extrabold` / `font-black` | `text-[42px] font-extrabold tracking-tight leading-tight` | Welcome splash, onboarding punchlines |
| **Screen Title** | 28px – 32px | `font-black` / `font-extrabold` | `text-3xl font-extrabold tracking-tight text-foreground` | Dashboard greeting, main screen headings |
| **Section Title** | 20px – 24px | `font-bold` | `text-xl font-bold tracking-tight text-foreground` | Group titles, section headers ("Today's Sessions") |
| **Card Title** | 16px – 18px | `font-bold` | `text-lg font-bold tracking-tight text-foreground` | Inside Card headers, dialog titles |
| **Body Large** | 16px | `font-medium` / `font-semibold` | `text-base font-medium text-foreground` | Main input text, button labels, list items |
| **Body Regular** | 14px | `font-normal` / `font-medium` | `text-sm font-normal text-foreground-secondary` | Descriptions, explanatory paragraphs |
| **Form Labels** | 14px | `font-medium` / `font-semibold` | `text-sm font-semibold text-foreground` | Form inputs, select dropdown titles |
| **Captions / Hints** | 12px | `font-medium` | `text-xs text-muted` | Input hints, timestamps, progress subtitle |
| **Badges / Micro** | 10px – 11px | `font-bold` / `font-semibold` | `text-[10px] font-bold uppercase tracking-wider` | Pill tags, notification badges, session duration |

---

## 4. Spacing, Radii, and Geometries

### 4.1 Border Radii
- **Pill / Circular (`rounded-full`)**:
  - Buttons (`<Button>`)
  - Status Tags (`<Tag>`)
  - Avatars (`<Avatar>`)
  - Icon action buttons (`h-11 w-11 rounded-full`)
- **Large Container (`rounded-3xl` = 24px, `rounded-4xl` = 32px)**:
  - Standard cards (`<Card>`)
  - Bottom sheet dialogs
  - Large modal containers
- **Interactive Controls (`rounded-2xl` = 16px)**:
  - Text inputs (`<Input>`)
  - Textarea (`<Textarea>`)
  - Select trigger buttons (`<Select>`)
  - Back buttons (`<BackButton>`)
- **Small Controls (`rounded-lg` = 8px, `rounded-md` = 6px)**:
  - Checkboxes (`h-6 w-6 rounded-lg`)

### 4.2 Heights & Sizing Standards
- **Primary Buttons**:
  - `sm`: `h-11 px-4` (44px)
  - `md`: `h-14 px-5` (56px) - **Standard default**
  - `lg`: `h-16 px-6` (64px) or `h-[72px]` (Hero onboarding)
- **Input Fields & Selectors**:
  - Standard Input: `h-14` (56px)
  - Segmented Phone/Country Input: `h-[74px]`
  - Multiline Textarea: `min-h-[140px]`
- **Avatars**:
  - `xxs`: 24x24 (`w-6 h-6`)
  - `xs`: 28x28 (`w-7 h-7`)
  - `sm`: 32x32 (`w-8 h-8`)
  - `md`: 36x36 (`w-9 h-9`) - **Standard default**
  - `lg`: 40x40 (`w-10 h-10`)
  - `xl`: 44x44 (`w-11 h-11`)
  - `xxl`: 48x48 (`w-12 h-12`)
- **Tags**:
  - `xs`: `h-5 px-2 text-[10px]`
  - `sm`: `h-6 px-2.5 text-xs`
  - `md`: `h-8 px-3 text-sm`

### 4.3 Padding & Margins
- **Screen horizontal margin**: `px-5` (20px) or `px-4` (16px)
- **Screen top content inset**: `paddingTop: insets.top + 16`
- **Screen bottom content inset**: `paddingBottom: insets.bottom + 40` (or `+ 90` if floating bottom bar exists)
- **Card internal padding**: `p-4` (16px) or `p-5` (20px)
- **Item gaps**: `gap-2` (8px), `gap-3` (12px), `gap-4` (16px), `gap-6` (24px)

---

## 5. Component Catalog & Exact Usage

All components are imported from `@/components/ui` and `@/components/shared`.

### 5.1 `<Icon />` Wrapper
Used for all Lucide icons. Enables Uniwind class colors and standard sizing.
```tsx
import { Icon } from '@/components/ui';
import { Dumbbell, Flame, Check } from 'lucide-react-native';

<Icon as={Dumbbell} size={20} className="text-brand" />
<Icon as={Flame} size={16} className="text-warning" />
```

### 5.2 `<Button />`
Pill-shaped interactive button with variants, loading spinners, and icon slots.
```tsx
import { Button, Icon } from '@/components/ui';
import { ArrowRight, Plus } from 'lucide-react-native';

// Primary CTA (Solid Brand Neon Lime)
<Button
  title="Continue"
  variant="primary"
  size="md"
  fullWidth
  rightIcon={<Icon as={ArrowRight} size={18} className="text-inverse" />}
  onPress={() => {}}
/>

// Secondary (Brand border outline)
<Button
  title="View Details"
  variant="secondary"
  size="md"
/>

// Default (Dark Card subtle background)
<Button
  title="Schedule"
  variant="default"
  size="md"
  leftIcon={<Icon as={Plus} size={18} className="text-foreground" />}
/>

// Outline & Ghost
<Button title="Cancel" variant="outline" size="sm" />
<Button title="Skip" variant="ghost" size="sm" />

// Loading & Disabled
<Button title="Saving..." variant="primary" loading />
<Button title="Locked" variant="primary" disabled />
```

### 5.3 `<Card />` System
Structured card wrapper with header, title, description, content, and footer.
```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui';

<Card className="border-border-subtle bg-surface p-5">
  <CardHeader>
    <CardTitle>Weekly Workouts</CardTitle>
    <CardDescription>Track your active sessions</CardDescription>
  </CardHeader>
  <CardContent>
    <Text className="text-sm text-foreground">Completed 60% of goal</Text>
  </CardContent>
  <CardFooter>
    <Text className="text-xs text-muted">Target: 84</Text>
    <Text className="text-xs font-bold text-brand">+12% vs last wk</Text>
  </CardFooter>
</Card>
```

### 5.4 `<Input />`
Text input with focus border color transitions, left/right icon slots, error, and hints.
```tsx
import { Input, Icon } from '@/components/ui';
import { User, Phone } from 'lucide-react-native';

<Input
  label="Client Full Name"
  placeholder="e.g. Alex Johnson"
  value={name}
  onChangeText={setName}
  required
  leftIcon={<Icon as={User} size={18} className="text-muted" />}
  hint="Enter the client's official name"
/>

// Error State
<Input
  label="Phone Number"
  placeholder="+1 000-000-0000"
  error="Invalid phone number provided"
  leftIcon={<Icon as={Phone} size={18} className="text-error" />}
/>
```

### 5.5 `<Tag />` / `<Badge />`
Colored pills used for categories, status flags, and micro metrics.
```tsx
import { Tag, Icon } from '@/components/ui';
import { Sparkles, Users } from 'lucide-react-native';

// Variants: 'brand' | 'default' | 'error' | 'success' | 'warning' | 'info'
// Sizes: 'xs' | 'sm' | 'md'
<Tag label="24 Active Clients" variant="brand" size="md" leftIcon={<Icon as={Users} size={14} className="text-brand" />} />
<Tag label="Completed" variant="success" size="xs" />
<Tag label="In Progress" variant="warning" size="xs" />
<Tag label="Declined" variant="error" size="xs" />
<Tag label="Pro Coach" variant="default" size="sm" />
```

### 5.6 `<Avatar />` & `<AvatarGroup />`
Image or initials fallback avatar with colored borders.
```tsx
import { Avatar, AvatarGroup } from '@/components/ui';

// Sizes: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
// Colors: 'neutral' | 'primary' | 'red' | 'green' | 'orange' | 'blue'
<Avatar name="Coach Alex" color="primary" size="xl" />
<Avatar source={{ uri: 'https://example.com/pic.jpg' }} size="md" />

// Avatar Stack with excess counter
<AvatarGroup max={4} size="md">
  <Avatar name="Sarah Jenkins" color="green" />
  <Avatar name="Marcus Vance" color="primary" />
  <Avatar name="Elena Rostova" color="orange" />
  <Avatar name="David King" color="blue" />
  <Avatar name="Chloe Bennet" color="red" />
</AvatarGroup>
```

### 5.7 `<Select />` Dropdown
Native-styled modal select with active checkmark item indicators.
```tsx
import { Select, Icon } from '@/components/ui';
import { Dumbbell } from 'lucide-react-native';

const workoutOptions = [
  { label: 'Hypertrophy Muscle Building', value: 'hypertrophy' },
  { label: 'Strength & Powerlifting', value: 'strength' },
  { label: 'HIIT Cardio Burn', value: 'hiit' },
];

<Select
  label="Workout Program"
  placeholder="Choose training discipline..."
  options={workoutOptions}
  value={selectedOption}
  onValueChange={setSelectedOption}
  leftIcon={<Icon as={Dumbbell} size={18} className="text-brand" />}
  required
  hint="Select client's main training focus"
/>
```

### 5.8 `<RadioGroup />` & `<Radio />`
Single-choice option list with concentric rings.
```tsx
import { RadioGroup, Radio } from '@/components/ui';

<RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
  <Radio
    value="basic"
    label="Standard Gym Access"
    description="$29/month - Floor access only"
  />
  <Radio
    value="pro"
    label="Pro Athlete Pass"
    description="$59/month - All classes and amenities"
  />
</RadioGroup>
```

### 5.9 `<Checkbox />`
Square checkbox with checkmark icon and optional descriptions.
```tsx
import { Checkbox } from '@/components/ui';

<Checkbox
  label="Agree to Terms & Conditions"
  description="I accept the fitness liability terms"
  checked={agreed}
  onCheckedChange={setAgreed}
/>
```

### 5.10 `<Textarea />`
Multiline text input with live character counter.
```tsx
import { Textarea } from '@/components/ui';

<Textarea
  label="Fitness Notes"
  placeholder="Any injuries, allergies, or notes..."
  value={notes}
  onChangeText={setNotes}
  maxLength={250}
  showCount
  hint="Shared with the trainer"
/>
```

### 5.11 `<OtpInput />`
Segmented 6-digit or 4-digit code verification input.
```tsx
import { OtpInput } from '@/components/ui';

<OtpInput
  length={6}
  value={otp}
  onChange={setOtp}
  onComplete={(code) => handleVerify(code)}
/>
```

### 5.12 `<BottomSheetModal />` & `<BottomSheet />`
Powered by `@gorhom/bottom-sheet` and Reanimated.
```tsx
import { BottomSheetModal, Button } from '@/components/ui';
import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef } from 'react';

const sheetRef = useRef<GorhomBottomSheetModal>(null);

// Open trigger: sheetRef.current?.present();
<BottomSheetModal ref={sheetRef} snapPoints={['40%', '70%']}>
  <View className="gap-4 pb-6">
    <Text className="text-lg font-bold text-foreground">Quick Action</Text>
    <Button title="Confirm" variant="primary" onPress={() => sheetRef.current?.dismiss()} />
  </View>
</BottomSheetModal>
```

### 5.13 Shared Domain Components
Located in `@/components/shared`:
- `<BackButton onPress={...} />`: Standard circular back button with Lucide `ArrowLeft`.
- `<PhoneInput value={...} onChangeText={...} />`: Integrated country code picker modal + phone digits input.
- `<GenderSelect value={...} onValueChange={...} />`: Gender picker with Mars/Venus icons.
- `<AddClientStepper currentStep={1} totalSteps={3} />`: Thin horizontal progress capsules.

---

## 6. Standard Screen Layout Template

When creating a new screen for Narfit, follow this exact structure:

```tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Avatar,
  Tag,
  Icon,
  ThemeToggle,
} from '@/components/ui';
import { BackButton } from '@/components/shared';
import { Dumbbell, Bell, ChevronRight } from 'lucide-react-native';

export default function ExampleScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      {/* Main Scrollable Canvas */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 32,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Header Bar */}
        <View className="mb-6 flex-row items-center justify-between">
          <BackButton />
          <Text className="text-xl font-bold tracking-tight text-foreground">
            Screen Title
          </Text>
          <ThemeToggle transition="circularReveal" size={18} className="h-10 w-10 rounded-full bg-card border border-border" />
        </View>

        {/* Highlight Card */}
        <Card className="mb-6 border-border-subtle bg-surface p-5">
          <View className="flex-row items-center justify-between mb-3">
            <Tag label="Active Program" variant="brand" size="sm" />
            <Text className="text-xs text-muted">Week 3 of 12</Text>
          </View>
          <Text className="text-xl font-extrabold text-foreground">
            Hypertrophy Upper Body
          </Text>
          <Text className="mt-1 text-sm text-muted">
            Focus: Chest, Delts & Triceps
          </Text>

          {/* Action inside Card */}
          <Button
            title="Start Session"
            variant="primary"
            size="md"
            fullWidth
            className="mt-4"
            rightIcon={<Icon as={ChevronRight} size={18} className="text-inverse" />}
            onPress={() => {}}
          />
        </Card>

        {/* Section List / Feed */}
        <View className="mb-4">
          <Text className="mb-3 text-lg font-bold tracking-tight text-foreground">
            Today's Exercises
          </Text>

          <Card className="border-border-subtle bg-card p-0 overflow-hidden divide-y divide-border-subtle">
            <View className="p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 rounded-2xl bg-brand/15 items-center justify-center">
                  <Icon as={Dumbbell} size={20} className="text-brand" />
                </View>
                <View>
                  <Text className="text-sm font-bold text-foreground">Incline Barbell Bench</Text>
                  <Text className="text-xs text-muted">4 sets × 8-10 reps</Text>
                </View>
              </View>
              <Tag label="100 kg" variant="default" size="xs" />
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
```

---

## 7. AI Code Generation Rules (Strict Instructions)

When an AI generates code based on this Design System, it **MUST adhere to the following rules**:

1. **Use Semantic Tokens Only**: Never use random colors like `bg-gray-800`, `text-blue-500`, or raw hex codes like `#121212`. Use `bg-background`, `bg-surface`, `bg-card`, `bg-card-subtle`, `text-foreground`, `text-muted`, and `text-brand`.
2. **Always Wrap Icons**: Never render raw `<Dumbbell />` from lucide. Always use `<Icon as={Dumbbell} size={...} className="text-..." />`.
3. **Use Official Component Library**: Before writing a raw `Pressable` button or custom input box, use `<Button>`, `<Input>`, `<Select>`, `<Card>`, `<Tag>`, or `<Avatar>`.
4. **Safe Area Insets**: Always apply `useSafeAreaInsets` for `paddingTop: insets.top + ...` and `paddingBottom: insets.bottom + ...`.
5. **No Broken Mobile Navigation**: Use Expo Router (`router.push('/...')`, `router.back()`, `router.replace('/...')`).
6. **Form Animations**: For multi-step wizard screens, wrap steps with `<FadeSlideIn direction="right" duration={500} distance={25}>` from `react-native-animation-kit`.
7. **Pill Buttons & Rounded Corners**: Buttons are `rounded-full` with sizes `sm` (h-11), `md` (h-14), or `lg` (h-16). Cards are `rounded-3xl` (24px) or `rounded-4xl` (32px).
8. **Brand Accent Restraint**: Do not overuse the neon lime `#caff2e`. It is an **accent** for primary buttons, active states, progress indicators, and key numbers. Backgrounds should remain deep dark (`bg-background` and `bg-card`).
