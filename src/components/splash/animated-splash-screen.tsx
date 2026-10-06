import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import {
  FadeSlideIn,
  ZoomFadeIn,
  Pulse,
} from 'react-native-animation-kit';

const greenBg = require('@/assets/images/on-boarding/green-bg.png');
const splashIcon = require('@/assets/images/splash-icon.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Check if running inside Expo Go or standard dev mode
const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient ||
  (Constants as any).appOwnership === 'expo';

interface AnimatedSplashScreenProps {
  onFinish?: () => void;
}

export function AnimatedSplashScreen({ onFinish }: AnimatedSplashScreenProps) {
  const insets = useSafeAreaInsets();
  const [screenFadeAnim] = useState(() => new Animated.Value(1));
  const [progressAnim] = useState(() => new Animated.Value(0));

  // Track expo-updates lifecycle
  const updates = Updates.useUpdates();

  // Startup lifecycle state
  const [initMessage, setInitMessage] = useState<string>('Checking for updates...');
  const [initPercent, setInitPercent] = useState<number>(10);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  // Derive live OTA download state during render without cascading setState
  let statusMessage = initMessage;
  let progressPercent = initPercent;

  if (updates.isDownloading && typeof updates.downloadProgress === 'number') {
    const pct = Math.min(100, Math.max(0, Math.round(updates.downloadProgress * 100)));
    progressPercent = pct;
    statusMessage = `Downloading update... ${pct}%`;
  } else if (updates.isUpdatePending) {
    progressPercent = 100;
    statusMessage = 'Update applied! Restarting...';
  }

  // Ref to hold onFinish so effect doesn't re-trigger
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  // Sync real expo-updates progress animation when OTA download occurs
  useEffect(() => {
    if (updates.isDownloading && typeof updates.downloadProgress === 'number') {
      Animated.timing(progressAnim, {
        toValue: updates.downloadProgress,
        duration: 150,
        useNativeDriver: false,
      }).start();
    } else if (updates.isUpdatePending) {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();

      const timer = setTimeout(() => {
        Updates.reloadAsync().catch(() => {});
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [
    updates.isDownloading,
    updates.downloadProgress,
    updates.isUpdatePending,
    progressAnim,
  ]);

  // Main startup initialization flow — runs first thing when app opens
  useEffect(() => {
    let isCancelled = false;

    const runInitFlow = async () => {
      try {
        // 1. Hide native OS splash screen immediately so custom animated splash displays seamlessly
        await SplashScreen.hideAsync().catch(() => {});

        // 2. Check and load updates
        const canCheckOTA = Updates.isEnabled && !isExpoGo && !__DEV__;

        if (canCheckOTA) {
          // --- PRODUCTION OTA UPDATES PATH (Standalone / EAS Build) ---
          setInitMessage('Checking for updates...');
          Animated.timing(progressAnim, {
            toValue: 0.25,
            duration: 400,
            useNativeDriver: false,
          }).start();
          setInitPercent(25);

          const checkResult = await Updates.checkForUpdateAsync();

          if (checkResult.isAvailable) {
            if (isCancelled) return;
            setInitMessage('New update found. Downloading...');

            const fetchResult = await Updates.fetchUpdateAsync();
            if (fetchResult.isNew) {
              if (isCancelled) return;
              setInitMessage('Update ready! Reloading...');
              setInitPercent(100);
              Animated.timing(progressAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
              }).start();

              setTimeout(async () => {
                await Updates.reloadAsync().catch(() => {});
              }, 600);
              return;
            }
          }

          // No pending update
          if (isCancelled) return;
          setInitMessage('All systems up to date');
          setInitPercent(100);
          Animated.timing(progressAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          }).start();
          await new Promise((r) => setTimeout(r, 600));
        } else {
          // --- LOCAL / DEV MODE STARTUP PATH ---
          // Smoothly verifies bundle & shows loading progress sequence on launch
          setInitMessage('Checking for updates...');
          Animated.timing(progressAnim, {
            toValue: 0.35,
            duration: 550,
            useNativeDriver: false,
          }).start();
          setInitPercent(35);
          await new Promise((r) => setTimeout(r, 700));

          if (isCancelled) return;
          setInitMessage('Loading app assets...');
          Animated.timing(progressAnim, {
            toValue: 0.75,
            duration: 650,
            useNativeDriver: false,
          }).start();
          setInitPercent(75);
          await new Promise((r) => setTimeout(r, 800));

          if (isCancelled) return;
          setInitMessage('All systems ready');
          Animated.timing(progressAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          }).start();
          setInitPercent(100);
          await new Promise((r) => setTimeout(r, 500));
        }

        // 3. Smooth exit transition to reveal the app
        if (isCancelled) return;
        setIsFadingOut(true);

        Animated.timing(screenFadeAnim, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }).start(() => {
          if (!isCancelled && onFinishRef.current) {
            onFinishRef.current();
          }
        });
      } catch (err) {
        if (!__DEV__ && !isExpoGo) {
          console.warn('Splash init notice:', err);
        }
        if (isCancelled) return;
        setIsFadingOut(true);
        Animated.timing(screenFadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => {
          if (!isCancelled && onFinishRef.current) {
            onFinishRef.current();
          }
        });
      }
    };

    runInitFlow();

    return () => {
      isCancelled = true;
    };
  }, [progressAnim, screenFadeAnim]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, SCREEN_WIDTH * 0.65],
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          opacity: screenFadeAnim,
          zIndex: 999999,
          elevation: 999999,
          backgroundColor: '#0B1E16',
        },
      ]}
      pointerEvents={isFadingOut ? 'none' : 'auto'}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <ImageBackground
        source={greenBg}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      >
        {/* Subtle dark vignette overlay for enhanced contrast */}
        <View
          style={StyleSheet.absoluteFill}
          className="bg-black/35"
        />

        <View
          className="flex-1 justify-between items-center"
          style={{
            paddingTop: insets.top + 60,
            paddingBottom: insets.bottom + 36,
          }}
        >
          {/* Top spacer */}
          <View className="h-6" />

          {/* Center Brand & Animation Section */}
          <View className="items-center px-6">
            {/* Logo Icon with ZoomFadeIn and Pulse from react-native-animation-kit */}
            <ZoomFadeIn fromScale={0.7} duration={700}>
              <Pulse minScale={0.96} maxScale={1.04} duration={2200}>
                <View className="h-24 w-24 rounded-3xl bg-white/10 border border-white/20 items-center justify-center shadow-2xl backdrop-blur-md mb-6">
                  <Image
                    source={splashIcon}
                    className="h-12 w-12"
                    resizeMode="contain"
                    style={{ tintColor: '#ffffff' }}
                  />
                </View>
              </Pulse>
            </ZoomFadeIn>

            {/* App Name with FadeSlideIn from react-native-animation-kit */}
            <FadeSlideIn direction="up" distance={30} duration={650} delay={220}>
              <Text
                className="text-center font-extrabold tracking-tight text-white pb-1"
                style={{
                  fontSize: 44,
                  letterSpacing: -1.2,
                  textShadowColor: 'rgba(0, 0, 0, 0.45)',
                  textShadowOffset: { width: 0, height: 4 },
                  textShadowRadius: 12,
                }}
              >
                NARFIT
              </Text>
            </FadeSlideIn>

            {/* Subtitle / Tagline Badge with FadeSlideIn from react-native-animation-kit */}
            <FadeSlideIn direction="up" distance={20} duration={500} delay={380}>
              <View className="flex-row items-center gap-2 mt-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15">
                <View className="h-2 w-2 rounded-full bg-brand" />
                <Text className="text-xs font-semibold tracking-wider text-white/85 uppercase">
                  Personal Coaching & Fitness
                </Text>
              </View>
            </FadeSlideIn>
          </View>

          {/* Bottom Updates & Loading Progress */}
          <View className="w-full items-center px-8">
            <FadeSlideIn direction="up" distance={20} duration={500} delay={450}>
              <View className="items-center gap-2.5">
                {/* Live Progress Bar for expo-updates */}
                <View className="w-64 h-2 rounded-full bg-white/20 overflow-hidden">
                  <Animated.View
                    style={{
                      height: '100%',
                      width: progressWidth,
                    }}
                    className="bg-brand rounded-full"
                  />
                </View>

                {/* Progress percentage & status */}
                <View className="flex-row items-center justify-between w-64 px-1">
                  <Text className="text-xs font-medium text-white/75">
                    {statusMessage}
                  </Text>
                  <Text className="text-xs font-bold text-white">
                    {progressPercent}%
                  </Text>
                </View>

                {/* Build & Runtime Info */}
                <Text className="text-[10px] text-white/35 mt-1 font-mono">
                  {Updates.channel ? `Channel: ${Updates.channel} • ` : ''}
                  v1.0.0
                </Text>
              </View>
            </FadeSlideIn>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
}

export default AnimatedSplashScreen;
