import { BackButton } from '@/components/shared';
import { Button } from '@/components/ui';
import { parseClientForm } from '@/schemas/client';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  BackHandler,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const clientSuccessImg = require('@/assets/images/all-set/client-added.png');

export default function ClientAddedSuccessScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ formState?: string }>();

  useEffect(() => {
    const onBackPress = () => {
      router.replace('/');
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (__DEV__ && params.formState) {
      const clientData = parseClientForm(params.formState);
      console.log('Client successfully created:', clientData);
    }
  }, [params.formState]);

  const handleExplore = () => {
    // Navigate to Home screen as requested
    router.replace('/');
  };

  const handleAddAnotherClient = () => {
    // Navigate to add new client screen
    router.replace('/add-client');
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="light" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top + 12,
          paddingBottom: insets.bottom + 24,
          paddingHorizontal: 20,
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Header: Back Button */}
        <View className="w-full flex-row items-center justify-between">
          <BackButton onPress={() => router.replace('/')} />
        </View>

        {/* Center Content: 3D Illustration & Headlines */}
        <View className="w-full items-center justify-center py-4">
          {/* 3D Character Illustration (Figma node 39:3203) */}
          <View className="w-[280px] h-[300px] max-w-full items-center justify-center">
            <Image
              source={clientSuccessImg}
              className="w-full h-full"
              resizeMode="contain"
              accessibilityLabel="Client added illustration"
            />
          </View>

          {/* Text Container (Figma node 39:3204) */}
          <View className="w-full items-center mt-5 px-4">
            <Text className="text-[44px] leading-[52px] sm:text-[48px] sm:leading-[56px] font-black tracking-tight text-brand text-center">
              Client added
            </Text>
            <Text className="mt-3 text-xl sm:text-2xl font-medium text-foreground text-center">
              Welcome to your fitness journey.
            </Text>
          </View>
        </View>

        {/* Bottom CTAs: Add Another Client (Secondary) & Explore (Primary) */}
        <View className="w-full pt-4 gap-3">
          <Button
            title="Add another client"
            variant="secondary"
            size="lg"
            className="h-[74px] w-full rounded-full"
            textClassName="text-lg font-bold"
            onPress={handleAddAnotherClient}
          />
          <Button
            title="Explore"
            variant="primary"
            size="lg"
            className="h-[74px] w-full rounded-full shadow-lg"
            textClassName="text-lg font-bold text-inverse"
            onPress={handleExplore}
          />
        </View>
      </ScrollView>
    </View>
  );
}
