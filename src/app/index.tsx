import { BottomSheetModal as GorhomBottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Dumbbell,
  Flame,
  Phone,
  Sliders,
  Sparkles,
  User,
  X,
} from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Avatar,
  AvatarGroup,
  BottomSheetModal,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Select,
  Tag,
  Textarea,
  ThemeToggle,
} from '@/components/ui';
import { useTheme } from '@/lib/theme';

export default function Index() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const bottomSheetModalRef = useRef<GorhomBottomSheetModal>(null);


  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [checkboxChecked, setCheckboxChecked] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [selectedWorkout, setSelectedWorkout] = useState('hypertrophy');
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleOpenBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const workoutOptions = [
    { label: 'Hypertrophy Muscle Building', value: 'hypertrophy' },
    { label: 'Strength & Powerlifting', value: 'strength' },
    { label: 'HIIT & Functional Cardio', value: 'hiit' },
    { label: 'Mobility & Active Recovery', value: 'mobility' },
    { label: 'Calisthenics & Bodyweight', value: 'calisthenics' },
  ];

  return (
    <View className="flex-1" >
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 40,
          paddingHorizontal: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-3xl font-extrabold tracking-tight text-brand">
                NAR-FITttt
              </Text>
              <Text className="mt-1 text-sm font-medium text-muted">
                Design System UI Components
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <ThemeToggle transition='fade' />
              <Avatar name="Nar Fit" color="primary" size="lg" />
            </View>
          </View>
        </View>

        {/* Figma Onboarding Screens */}
        <Card className="mb-8 border-2 border-brand/50 bg-brand/5">
          <CardHeader>
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <CardTitle>Figma Onboarding Screens</CardTitle>
                <CardDescription>
                  Implemented designs from Figma (72:6844, 72:6850, 72:6849)
                </CardDescription>
              </View>
              <View className="rounded-full bg-brand px-3 py-1">
                <Text className="text-xs font-bold text-inverse">10 Screens</Text>
              </View>
            </View>
          </CardHeader>
          <CardContent className="gap-3">
            <Button
              title="1. Welcome Screen (72:6844)"
              variant="default"
              size="md"
              rightIcon={<Icon as={ArrowRight} size={18} className="text-foreground" />}
              onPress={() => router.push('/onboarding/welcome')}
            />
            <Button
              title="2. Signup Phone Screen (72:6850)"
              variant="default"
              size="md"
              rightIcon={<Icon as={ArrowRight} size={18} className="text-foreground" />}
              onPress={() => router.push('/onboarding/signup-phone')}
            />
            <Button
              title="3. OTP Verification Screen (72:6849)"
              variant="default"
              size="md"
              rightIcon={<Icon as={ArrowRight} size={18} className="text-foreground" />}
              onPress={() => router.push('/onboarding/otp')}
            />
            <Button
              title="4. Onboarding Flow (5 Steps Wizard)"
              variant="default"
              size="md"
              rightIcon={<Icon as={ArrowRight} size={18} className="text-foreground" />}
              onPress={() => router.push('/onboarding/profile')}
            />
            <Button
              title="5. You're All Set (39:3209)"
              variant="primary"
              size="md"
              rightIcon={<Icon as={ArrowRight} size={18} className="text-inverse" />}
              onPress={() => router.push('/onboarding/all-set')}
            />
            <Button
              title="1. Dashboard Screen (72:6844)"
              variant="default"
              size="md"
              rightIcon={<Icon as={ArrowRight} size={18} className="text-foreground" />}
              onPress={() => router.push('/dashboard')}
            />
          </CardContent>
        </Card>

        {/* Client Management Screens */}
        <Card className="mb-8 border-2 border-brand/50 bg-brand/5">
          <CardHeader>
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <CardTitle>Client Management</CardTitle>
                <CardDescription>
                  Reusable Client Flow (Figma node 39:2894)
                </CardDescription>
              </View>
              <View className="rounded-full bg-brand px-3 py-1">
                <Text className="text-xs font-bold text-inverse">New</Text>
              </View>
            </View>
          </CardHeader>
          <CardContent className="gap-3">
            <Button
              title="Add Client Screen (39:2894)"
              variant="primary"
              size="md"
              rightIcon={<Icon as={ArrowRight} size={18} className="text-inverse" />}
              onPress={() => router.push('/add-client')}
            />
            <Button
              title="Notifications Screen (New)"
              variant="default"
              size="md"
              rightIcon={<Icon as={ArrowRight} size={18} className="text-foreground" />}
              onPress={() => router.push('/notifications' as any)}
            />
            <Button
              title="Clients Screen (New)"
              variant="default"
              size="md"
              rightIcon={<Icon as={ArrowRight} size={18} className="text-foreground" />}
              onPress={() => router.push('/dashboard/clients' as any)}
            />
          </CardContent>
        </Card>

        {/* Circle Theme Transition card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Circle Theme Transition</CardTitle>
            <CardDescription>
              Circular reveal powered by @shopify/react-native-skia & react-native-theme-transition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <View className="flex-row items-center justify-between rounded-2xl border border-border bg-card p-4">
              <View className='flex-1'>
                <Text className="text-sm font-bold text-foreground">
                  Current: {theme.name.toUpperCase()}
                </Text>
                <Text className="text-xs text-muted">
                  Tap the button to trigger circular Skia transition
                </Text>
              </View>
              <ThemeToggle
                transition="circularReveal"
                duration={900}
                size={18}
                className="h-10 w-10 rounded-full bg-brand"
              />
            </View>
          </CardContent>
        </Card>

        {/* 2. Bottom Sheet (gorhom/bottom-sheet) */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bottom Sheet (gorhom/bottom-sheet)</CardTitle>
            <CardDescription>
              60FPS gesture-driven bottom sheet modal with snap points and backdrop
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              title="Open Bottom Sheet Modal"
              variant="primary"
              fullWidth
              rightIcon={<Icon as={Sliders} size={18} className="text-inverse" />}
              onPress={handleOpenBottomSheet}
            />
          </CardContent>
        </Card>

        {/* 2. Tags & Badges (Figma 0:1) */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tags & Badges (Figma 0:1)</CardTitle>
            <CardDescription>Styles: Brand, Default, Error, Success, Warning, Info</CardDescription>
          </CardHeader>
          <CardContent>
            <Text className="text-xs font-medium text-muted">Variants (md):</Text>
            <View className="flex-row flex-wrap gap-2">
              <Tag label="Brand Pro" variant="brand" leftIcon={<Icon as={Sparkles} size={14} className="text-brand" />} />
              <Tag label="Default" variant="default" />
              <Tag label="Active" variant="success" />
              <Tag label="Paused" variant="warning" />
              <Tag label="Declined" variant="error" />
              <Tag label="Info" variant="info" />
            </View>

            <Text className="mt-2 text-xs font-medium text-muted">Sizes (xs, sm, md):</Text>
            <View className="flex-row items-center gap-2">
              <Tag label="XS Tag" size="xs" variant="brand" />
              <Tag label="SM Tag" size="sm" variant="brand" />
              <Tag label="MD Tag" size="md" variant="brand" />
            </View>
          </CardContent>
        </Card>

        {/* 3. Select Dropdown (Figma 24:1401) */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Dropdown (Figma 24:1401)</CardTitle>
            <CardDescription>Native dropdown overlay with active check state</CardDescription>
          </CardHeader>
          <CardContent>
            <Select
              label="Workout Program"
              placeholder="Choose training discipline..."
              options={workoutOptions}
              value={selectedWorkout}
              onValueChange={setSelectedWorkout}
              leftIcon={<Icon as={Dumbbell} size={18} className="text-brand" />}
              required
              hint="Program determines your automated set distribution"
            />
          </CardContent>
        </Card>

        {/* 4. Buttons */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Buttons (Figma 19:15715)</CardTitle>
            <CardDescription>Primary, Secondary, Default, Outline, with Lucide Icons</CardDescription>
          </CardHeader>
          <CardContent>
            <View className="gap-3">
              <Button
                title="Primary Button"
                variant="primary"
                size="lg"
                fullWidth
                leftIcon={<Icon as={ArrowLeft} size={20} className="text-inverse" />}
                rightIcon={<Icon as={ArrowRight} size={20} className="text-inverse" />}
                onPress={() => {
                  setButtonLoading(true);
                  setTimeout(() => setButtonLoading(false), 1500);
                }}
                loading={buttonLoading}
              />
              <Button
                title="Secondary Button"
                variant="secondary"
                size="md"
                fullWidth
                rightIcon={<Icon as={ChevronRight} size={18} className="text-brand" />}
              />
              <View className="flex-row gap-3">
                <Button
                  title="Default"
                  variant="default"
                  size="sm"
                  className="flex-1"
                />
                <Button
                  title="Outline"
                  variant="outline"
                  size="sm"
                  className="flex-1"
                />
                <Button
                  title="Disabled"
                  variant="primary"
                  size="sm"
                  disabled
                  className="flex-1"
                />
              </View>
            </View>
          </CardContent>
        </Card>

        {/* 5. Input Fields */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Input Fields (Figma 19:11420)</CardTitle>
            <CardDescription>Floating label, hint, error, left/right icon slots</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              label="Full Name"
              placeholder="e.g. Alex Johnson"
              value={inputValue}
              onChangeText={setInputValue}
              required
              leftIcon={<Icon as={User} size={18} className="text-muted" />}
              rightIcon={
                inputValue ? (
                  <Pressable onPress={() => setInputValue('')}>
                    <Icon as={X} size={18} className="text-muted" />
                  </Pressable>
                ) : null
              }
              hint="Enter your legal full name for registration"
            />

            <Input
              label="Phone with Error State"
              placeholder="+1 (555) 000-0000"
              error="Please enter a valid phone number"
              leftIcon={<Icon as={Phone} size={18} className="text-error" />}
            />
          </CardContent>
        </Card>

        {/* 6. Text Area */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Text Area (Figma 23:1306)</CardTitle>
            <CardDescription>Multiline textarea with live character counter</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              label="Fitness Goals & Notes"
              placeholder="Describe your training regimen, injuries, or dietary requirements..."
              value={textareaValue}
              onChangeText={setTextareaValue}
              maxLength={250}
              showCount
              hint="Provide any additional details for your trainer"
            />
          </CardContent>
        </Card>

        {/* 7. Checkbox */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Checkbox (Figma 24:1364)</CardTitle>
            <CardDescription>Lucide Check icon with semantic Tailwind colors</CardDescription>
          </CardHeader>
          <CardContent>
            <Checkbox
              label="Agree to Membership Terms"
              description="I accept gym rules and privacy policy"
              checked={checkboxChecked}
              onCheckedChange={setCheckboxChecked}
            />
            <Checkbox
              label="Opt-in to SMS Workout Reminders"
              description="Receive automated schedules directly to mobile"
            />
            <Checkbox
              label="Disabled Option"
              description="Feature not available for current tier"
              disabled
            />
          </CardContent>
        </Card>

        {/* 8. Radio Buttons */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Radio Buttons (Figma 24:2571)</CardTitle>
            <CardDescription>Single-choice selection with animated inner circle</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
              <Radio
                value="basic"
                label="Standard Gym Access"
                description="$29 / month - Access to main floor"
              />
              <Radio
                value="pro"
                label="Pro Athlete Pass"
                description="$59 / month - All classes, sauna, and pool"
              />
              <Radio
                value="elite"
                label="Elite VIP Coaching"
                description="$99 / month - Dedicated 1-on-1 personal trainer"
              />
            </RadioGroup>
          </CardContent>
        </Card>

        {/* 9. Avatars & Bundles */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Avatars & Bundles (Figma 24:1420)</CardTitle>
            <CardDescription>Sizes xxs through xxl with Lucide User icon fallback</CardDescription>
          </CardHeader>
          <CardContent>
            <Text className="mb-1 text-xs font-medium text-muted">Color Variants:</Text>
            <View className="mb-3 flex-row flex-wrap gap-2">
              <Avatar name="Primary Brand" color="primary" size="md" />
              <Avatar name="Neutral User" color="neutral" size="md" />
              <Avatar name="Green Active" color="green" size="md" />
              <Avatar name="Red Alert" color="red" size="md" />
              <Avatar name="Orange Warm" color="orange" size="md" />
              <Avatar name="Blue Cool" color="blue" size="md" />
            </View>

            <Text className="mb-1 text-xs font-medium text-muted">Sizes (xxs to xxl):</Text>
            <View className="mb-3 flex-row items-center gap-2">
              <Avatar name="A" color="primary" size="xxs" />
              <Avatar name="B" color="primary" size="xs" />
              <Avatar name="C" color="primary" size="sm" />
              <Avatar name="D" color="primary" size="md" />
              <Avatar name="E" color="primary" size="lg" />
              <Avatar name="F" color="primary" size="xl" />
              <Avatar name="G" color="primary" size="xxl" />
            </View>

            <Text className="mb-1 text-xs font-medium text-muted">Avatar Bundle / Stack:</Text>
            <AvatarGroup max={4} size="lg">
              <Avatar name="Sarah Connor" color="primary" />
              <Avatar name="John Doe" color="neutral" />
              <Avatar name="Emily Davis" color="green" />
              <Avatar name="Michael Scott" color="orange" />
              <Avatar name="Bruce Wayne" color="blue" />
              <Avatar name="Clark Kent" color="red" />
            </AvatarGroup>
          </CardContent>
        </Card>

        {/* Modal Bottom Sheet */}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={['38%', '65%']}
        >
          <View className="gap-3 pb-6">
            <View className="flex-row items-start justify-between pb-2 border-b border-border-subtle">
              <View>
                <Text className="text-lg font-bold text-foreground">
                  Training Quick Actions
                </Text>
                <Text className="text-xs text-muted">
                  Gorhom Bottom Sheet Modal in action
                </Text>
              </View>
              <Pressable
                onPress={() => bottomSheetModalRef.current?.dismiss()}
                className="h-8 w-8 items-center justify-center rounded-full bg-card-subtle"
              >
                <Icon as={X} size={16} className="text-muted" />
              </Pressable>
            </View>

            <Text className="text-sm leading-5 text-foreground">
              Gesture-controlled bottom sheet powered by Reanimated 4 and Gesture Handler, styled with Narfit dark/light theme tokens.
            </Text>

            <View className="mt-2 flex-row gap-3">
              <Button
                title="Log Workout"
                variant="primary"
                className="flex-1"
                rightIcon={<Icon as={Flame} size={16} className="text-inverse" />}
                onPress={() => bottomSheetModalRef.current?.dismiss()}
              />
              <Button
                title="Cancel"
                variant="outline"
                className="flex-1"
                onPress={() => bottomSheetModalRef.current?.dismiss()}
              />
            </View>
          </View>
        </BottomSheetModal>
      </ScrollView>
    </View>
  );
}
