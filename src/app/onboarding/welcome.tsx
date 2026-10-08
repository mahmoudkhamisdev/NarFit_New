import { Button } from '@/components/ui';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    ImageBackground,
    StyleSheet,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';

const greenBg = require('@/assets/images/on-boarding/green-bg.png');

export default function WelcomeScreen() {
    const insets = useSafeAreaInsets();

    const handleGetStarted = () => {
        router.push('/onboarding/signup-phone');
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
                {/* Subtle dark gradient overlay to ensure perfect contrast */}
                <View
                    style={StyleSheet.absoluteFill}
                    className="bg-black/25"
                />

                <View
                    className="flex-1 justify-between px-6 items-center"
                    style={{
                        paddingTop: insets.top + 40,
                        paddingBottom: insets.bottom + 24,
                    }}
                >
                    <View className="h-10" />

                    {/* Center Heading */}
                    <View className="items-center px-4">
                        <Text
                            className="text-center font-extrabold tracking-tighter text-[#f2f4f5] dark:text-foreground leading-[68px] pb-3"
                            style={{
                                fontSize: 58,
                                letterSpacing: -1.8,
                            }}
                        >
                            Connect{'\n'}with your{'\n'}client{'\n'}easy
                        </Text>
                    </View>

                    {/* Bottom CTA & Subtitle */}
                    <View className="w-full items-center gap-9">
                        <Button
                            title="Get started"
                            variant="default"
                            size="lg"
                            className="h-[72px] w-[217px] rounded-2xl bg-[#1a1a1a] dark:bg-card border border-[#333333] dark:border-border shadow-2xl active:opacity-90"
                            textClassName="text-[#f2f4f5] dark:text-foreground text-lg font-bold tracking-tight"
                            onPress={handleGetStarted}
                        />

                        {/* Terms of use & Privacy Notice */}
                        <Text className="px-6 text-center text-[15px] leading-6 text-[#9ca3a7] dark:text-muted">
                            By continuing {`you're`} accepting our{' '}
                            <Text className="font-semibold text-[#f2f4f5] dark:text-foreground underline">
                                Terms of use
                            </Text>{' '}
                            and{' '}
                            <Text className="font-semibold text-[#f2f4f5] dark:text-foreground underline">
                                Privacy Notice
                            </Text>
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
