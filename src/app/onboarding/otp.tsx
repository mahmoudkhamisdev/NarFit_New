import { Button, Card, OtpInput } from '@/components/ui';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';

const greenBg = require('@/assets/images/on-boarding/green-bg.png');

export default function OtpVerificationScreen() {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = useCallback(
    (code?: string) => {
      if (isVerifying) return;
      setIsVerifying(true);
      // Navigate after OTP verification to profile setup (Figma 39:4259)
      router.push('/onboarding/profile');
    },
    [isVerifying]
  );

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
    }
  };

  return (
    <View className="dark flex-1 bg-[#000000]">
      <StatusBar style="light" />
      <ImageBackground
        source={greenBg}
        resizeMode="cover"
        className="flex-1"
        style={StyleSheet.absoluteFill}
      >
        {/* Subtle dark overlay for contrast */}
        <View
          style={StyleSheet.absoluteFill}
          className="bg-black/25"
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'flex-end',
              paddingTop: insets.top + 24,
              paddingBottom: insets.bottom + 16,
            }}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {/* Top flexible space to push content to bottom */}
            <View className="flex-1" />

            {/* Heading Section directly above the card */}
            <View className="items-center px-6 mb-5">
              <Text
                className="text-center text-[42px] font-extrabold tracking-tight text-[#f2f4f5] dark:text-foreground leading-tight"
                accessibilityLabel="OTP Verification"
              >
                OTP
              </Text>
              <Text className="mt-1 text-center text-base font-medium text-[#d1d5d8] dark:text-muted">
                Enter the 6-digit code sent to your phone
              </Text>
            </View>

            {/* Bottom Card Section */}
            <View className="px-4">
              <Card className="rounded-4xl bg-card p-5 gap-4 border border-border/60 shadow-2xl">
                {/* 6-digit Input Boxes via UI OtpInput component */}
                <OtpInput
                  length={6}
                  value={otp}
                  onChange={setOtp}
                  onComplete={handleVerify}
                />

                {/* Resend Timer Text */}
                <View className="items-center py-1">
                  {timer > 0 ? (
                    <Text className="text-base font-normal text-[#737373] dark:text-muted">
                      Resend OTP after{' '}
                      <Text className="font-semibold text-foreground">{timer} sec</Text>
                    </Text>
                  ) : (
                    <Pressable onPress={handleResend} hitSlop={8}>
                      <Text className="text-base font-bold text-brand underline">
                        Resend OTP now
                      </Text>
                    </Pressable>
                  )}
                </View>

                {/* Sign up Button */}
                <Button
                  title="Sign up"
                  variant="primary"
                  size="lg"
                  className="h-17.5 w-full rounded-2xl shadow-md"
                  textClassName="text-lg font-bold"
                  onPress={() => handleVerify(otp.join(''))}
                />
              </Card>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}
