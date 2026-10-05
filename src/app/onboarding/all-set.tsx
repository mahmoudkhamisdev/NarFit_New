import { Card, Icon } from '@/components/ui';
import { parseOnboardingForm } from '@/schemas/onboarding';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowRight } from 'lucide-react-native';
import React from 'react';
import {
  BackHandler,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from './_components/back-button';

const correctMarkImg = require('@/assets/images/all-set/correct-mark.png');
const lensImg = require('@/assets/images/all-set/lens.png');
const addClientImg = require('@/assets/images/all-set/add-client.png');

export default function AllSetScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ formState?: string }>();

  React.useEffect(() => {
    const onBackPress = () => {
      router.replace('/');
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, []);

  React.useEffect(() => {
    if (__DEV__ && params.formState) {
      const data = parseOnboardingForm(params.formState);
      console.log('Completed Onboarding Form:', data);
    }
  }, [params.formState]);

  const handleExploreApp = () => {
    router.replace('/');
  };

  const handleAddFirstClient = () => {
    router.push('/add-client');
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 16,
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Section: Header & Hero */}
        <View className="w-full">
          {/* Header */}
          <BackButton onPress={() => router.replace('/')} />

          {/* Hero Section */}
          <View className="w-full items-center pt-2">
            {/* 3D Check Mark */}
            <View className="w-[240px] h-[190px] items-center justify-center">
              <Image
                source={correctMarkImg}
                className="w-full h-full"
                resizeMode="contain"
                accessibilityLabel="All set checkmark"
              />
            </View>

            {/* Title & Subtitle */}
            <View className="w-full items-center mt-3 px-2">
              <Text className="text-4xl sm:text-5xl font-black tracking-tight text-brand text-center uppercase">
                YOU’RE ALL SET!
              </Text>
              <Text className="text-lg sm:text-xl font-medium text-muted text-center mt-2">
                Welcome to your fitness journey.
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Section: Action Cards */}
        <View className="w-full gap-4 mt-8">
          {/* Card 1: Explore App */}
          <Pressable
            onPress={handleExploreApp}
            className="active:opacity-85"
            accessibilityRole="button"
            accessibilityLabel="Explore app"
          >
            <Card className="flex-row items-center justify-between rounded-2xl border-border-subtle bg-card-subtle px-4 py-5 min-h-[140px]">
              {/* Left 3D Asset */}
              <View className="w-20 h-28 items-center justify-center">
                <Image
                  source={lensImg}
                  className="w-full h-full"
                  resizeMode="contain"
                  accessibilityLabel="Explore app icon"
                />
              </View>

              {/* Title */}
              <View className="flex-1 px-4">
                <Text className="text-2xl font-bold text-foreground">
                  Explore app
                </Text>
              </View>

              {/* Arrow */}
              <View className="w-10 h-10 items-center justify-center">
                <Icon as={ArrowRight} size={28} className="text-foreground" />
              </View>
            </Card>
          </Pressable>

          {/* Card 2: Add First Client */}
          <Pressable
            onPress={handleAddFirstClient}
            className="active:opacity-85"
            accessibilityRole="button"
            accessibilityLabel="Add your first client"
          >
            <Card className="flex-row items-center justify-between rounded-2xl border-border-subtle bg-card-subtle px-4 py-5 min-h-[140px]">
              {/* Left 3D Asset */}
              <View className="w-24 h-28 items-center justify-center">
                <Image
                  source={addClientImg}
                  className="w-full h-full"
                  resizeMode="contain"
                  accessibilityLabel="Add client icon"
                />
              </View>

              {/* Title */}
              <View className="flex-1 px-4">
                <Text className="text-2xl font-bold text-foreground leading-tight">
                  Add your first client
                </Text>
              </View>

              {/* Arrow */}
              <View className="w-10 h-10 items-center justify-center">
                <Icon as={ArrowRight} size={28} className="text-foreground" />
              </View>
            </Card>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
