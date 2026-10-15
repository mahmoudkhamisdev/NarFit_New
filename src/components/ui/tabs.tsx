import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  Pressable,
  PressableProps,
  ScrollView,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { Text } from '@/components/ui/text';

export type TabsVariant = 'underline' | 'pill' | 'segmented' | 'default';

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: TabsVariant;
  registerTabLayout: (id: string, layout: { x: number; width: number }) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be rendered within a Tabs provider');
  }
  return context;
}

export interface TabsProps<T extends string = string> {
  /** Tab items array (for data-driven usage) */
  tabs?: TabItem<T>[];
  /** Currently active tab id */
  value?: T;
  /** Initial tab id if uncontrolled */
  defaultValue?: T;
  /** Callback fired when active tab changes */
  onValueChange?: (value: T) => void;
  /** Visual style variant (default: 'underline') */
  variant?: TabsVariant;
  /** Enable horizontal scrollview */
  scrollable?: boolean;
  /** Outer container className */
  className?: string;
  /** Scroll / content container className */
  contentContainerClassName?: string;
  /** Content container style */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Tab trigger extra className */
  tabClassName?: string;
  /** Children for compound component usage */
  children?: React.ReactNode;
}

export function Tabs<T extends string = string>({
  tabs,
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = 'underline',
  scrollable = true,
  className = '',
  contentContainerClassName = '',
  contentContainerStyle,
  tabClassName = '',
  children,
}: TabsProps<T>) {
  const [internalValue, setInternalValue] = useState<string>(
    controlledValue ?? defaultValue ?? tabs?.[0]?.id ?? ''
  );

  const activeValue = controlledValue ?? internalValue;

  const handleValueChange = useCallback(
    (nextVal: string) => {
      setInternalValue(nextVal);
      onValueChange?.(nextVal as T);
    },
    [onValueChange]
  );

  const layoutsRef = useRef<Record<string, { x: number; width: number }>>({});
  const [isReady, setIsReady] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const [translateX] = useState(() => new Animated.Value(0));
  const [indicatorWidth] = useState(() => new Animated.Value(0));

  const animateToTab = useCallback(
    (tabId: string, animated: boolean = true) => {
      const layout = layoutsRef.current[tabId];
      if (!layout) return;

      if (!animated) {
        translateX.setValue(layout.x);
        indicatorWidth.setValue(layout.width);
        setIsReady(true);
        return;
      }

      setIsReady(true);
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: layout.x,
          useNativeDriver: false,
          bounciness: 4,
          speed: 16,
        }),
        Animated.spring(indicatorWidth, {
          toValue: layout.width,
          useNativeDriver: false,
          bounciness: 4,
          speed: 16,
        }),
      ]).start();

      if (scrollable && scrollRef.current && layout.x > 0) {
        scrollRef.current.scrollTo({
          x: Math.max(0, layout.x - 24),
          animated: true,
        });
      }
    },
    [indicatorWidth, scrollable, translateX]
  );

  const registerTabLayout = useCallback(
    (id: string, layout: { x: number; width: number }) => {
      layoutsRef.current[id] = layout;
      if (id === activeValue && !isReady) {
        animateToTab(activeValue, false);
      }
    },
    [activeValue, animateToTab, isReady]
  );

  useEffect(() => {
    if (layoutsRef.current[activeValue]) {
      animateToTab(activeValue, true);
    }
  }, [activeValue, animateToTab]);

  const contextValue = React.useMemo<TabsContextValue>(
    () => ({
      value: activeValue,
      onValueChange: handleValueChange,
      variant,
      registerTabLayout,
    }),
    [activeValue, handleValueChange, registerTabLayout, variant]
  );

  // If children provided, render compound structure
  if (children) {
    return (
      <TabsContext.Provider value={contextValue}>
        <View className={className}>{children}</View>
      </TabsContext.Provider>
    );
  }

  // Render direct tabs prop
  if (!tabs || tabs.length === 0) {
    return null;
  }

  const indicatorElement = isReady && (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          transform: [{ translateX }],
          width: indicatorWidth,
        },
        variant === 'underline' && {
          bottom: 0,
          height: 2,
        },
        variant === 'pill' && {
          top: 0,
          bottom: 0,
        },
        variant === 'segmented' && {
          top: 2,
          bottom: 2,
        },
        variant === 'default' && {
          top: 2,
          bottom: 2,
        },
      ]}
      className={
        variant === 'underline'
          ? 'bg-brand'
          : variant === 'pill'
          ? 'rounded-full bg-brand/20 border border-brand/40'
          : variant === 'segmented'
          ? 'rounded-lg bg-foreground shadow-sm'
          : 'rounded-xl bg-card border border-border'
      }
    />
  );

  const tabsContent = (
    <View
      className={`relative flex-row items-center ${!scrollable ? 'w-full' : ''} ${
        variant === 'underline'
          ? 'border-b border-border/60 pb-0.5'
          : variant === 'segmented'
          ? 'w-full border border-border/60 bg-surface rounded-xl p-0.5'
          : ''
      } ${!scrollable ? contentContainerClassName : ''}`}
      style={!scrollable ? contentContainerStyle : undefined}
    >
      {indicatorElement}

      {tabs.map((tab) => {
        const isActive = activeValue === tab.id;
        return (
          <Pressable
            key={tab.id}
            disabled={tab.disabled}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            onLayout={(e: LayoutChangeEvent) => {
              const { x, width } = e.nativeEvent.layout;
              registerTabLayout(tab.id, { x, width });
            }}
            onPress={() => handleValueChange(tab.id)}
            className={`flex-row items-center justify-center active:opacity-75 ${
              variant === 'underline'
                ? 'py-2.5 px-3 min-w-[48px]'
                : variant === 'pill'
                ? 'h-8 px-3.5 rounded-full'
                : variant === 'segmented'
                ? 'flex-1 h-8 rounded-lg'
                : 'h-9 px-4 rounded-xl'
            } ${tab.disabled ? 'opacity-40' : ''} ${tabClassName}`}
          >
            {tab.icon && <View className="mr-1.5">{tab.icon}</View>}
            <Text
              className={`text-base ${
                variant === 'segmented'
                  ? isActive
                    ? 'text-inverse font-bold text-sm'
                    : 'text-muted font-medium text-sm'
                  : isActive
                  ? variant === 'underline'
                    ? 'text-brand font-medium'
                    : 'text-brand font-semibold'
                  : 'text-disabled font-normal'
              }`}
            >
              {tab.label}
            </Text>
            {tab.count !== undefined && tab.count > 0 && (
              <View
                className={`ml-1.5 h-4 min-w-[18px] px-1 rounded-full items-center justify-center ${
                  isActive ? 'bg-brand/25' : 'bg-surface'
                }`}
              >
                <Text
                  className={`text-[10px] font-bold ${
                    isActive ? 'text-brand' : 'text-muted'
                  }`}
                >
                  {tab.count}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );

  if (scrollable) {
    return (
      <View className={`w-full ${className}`}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}
          className={contentContainerClassName}
        >
          {tabsContent}
        </ScrollView>
      </View>
    );
  }

  return <View className={`w-full ${className}`}>{tabsContent}</View>;
}

// ---------------------------------------------------------------------------
// Compound Components: TabsList, TabsTrigger, TabsContent
// ---------------------------------------------------------------------------

export interface TabsListProps extends ViewProps {
  scrollable?: boolean;
  contentContainerClassName?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export function TabsList({
  children,
  className = '',
  scrollable = false,
  contentContainerClassName = '',
  contentContainerStyle,
  style,
  ...props
}: TabsListProps) {
  const { variant } = useTabsContext();

  const containerClasses = `flex-row items-center ${
    variant === 'underline'
      ? 'border-b border-border/60'
      : variant === 'pill'
      ? 'gap-2'
      : variant === 'segmented'
      ? 'w-full border border-border/60 bg-surface rounded-xl p-0.5'
      : 'bg-surface p-1 rounded-2xl border border-border/60'
  } ${className}`;

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        className={contentContainerClassName}
      >
        <View className={containerClasses} style={style} {...props}>
          {children}
        </View>
      </ScrollView>
    );
  }

  return (
    <View className={containerClasses} style={style} {...props}>
      {children}
    </View>
  );
}

export interface TabsTriggerProps extends Omit<PressableProps, 'children'> {
  value: string;
  label?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  count?: number;
  className?: string;
  textClassName?: string;
}

export function TabsTrigger({
  value,
  label,
  children,
  icon,
  count,
  className = '',
  textClassName = '',
  onPress,
  disabled,
  style,
  ...props
}: TabsTriggerProps) {
  const { value: activeValue, onValueChange, variant, registerTabLayout } = useTabsContext();
  const isActive = activeValue === value;

  const handlePress = (e: any) => {
    if (!disabled) {
      onValueChange(value);
      onPress?.(e);
    }
  };

  const getVariantStyles = () => {
    if (variant === 'underline') {
      return {
        container: `py-2.5 px-3 border-b-2 ${
          isActive ? 'border-brand' : 'border-transparent'
        }`,
        text: isActive ? 'text-brand font-medium' : 'text-disabled font-normal',
      };
    }
    if (variant === 'pill') {
      return {
        container: `h-8 px-3.5 rounded-full ${
          isActive ? 'bg-brand/20 border border-brand/40' : 'bg-transparent'
        }`,
        text: isActive ? 'text-brand font-semibold' : 'text-muted font-medium',
      };
    }
    if (variant === 'segmented') {
      return {
        container: `flex-1 h-8 rounded-lg ${
          isActive ? 'bg-foreground' : 'bg-transparent'
        }`,
        text: isActive ? 'text-inverse font-bold text-sm' : 'text-muted font-medium text-sm',
      };
    }
    return {
      container: `h-9 px-4 rounded-xl ${
        isActive ? 'bg-card border border-border' : 'bg-transparent'
      }`,
      text: isActive ? 'text-foreground font-semibold' : 'text-muted font-medium',
    };
  };

  const styles = getVariantStyles();

  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      onLayout={(e: LayoutChangeEvent) => {
        const { x, width } = e.nativeEvent.layout;
        registerTabLayout(value, { x, width });
      }}
      onPress={handlePress}
      className={`flex-row items-center justify-center active:opacity-75 ${styles.container} ${
        disabled ? 'opacity-40' : ''
      } ${className}`}
      style={style}
      {...props}
    >
      {icon && <View className="mr-1.5">{icon}</View>}
      {label ? (
        <Text className={`text-base ${styles.text} ${textClassName}`}>{label}</Text>
      ) : (
        children
      )}
      {count !== undefined && count > 0 && (
        <View
          className={`ml-1.5 h-4 min-w-[18px] px-1 rounded-full items-center justify-center ${
            isActive ? 'bg-brand/25' : 'bg-surface'
          }`}
        >
          <Text className={`text-[10px] font-bold ${isActive ? 'text-brand' : 'text-muted'}`}>
            {count}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export interface TabsContentProps extends ViewProps {
  value: string;
}

export function TabsContent({ value, children, className = '', ...props }: TabsContentProps) {
  const { value: activeValue } = useTabsContext();
  if (activeValue !== value) return null;

  return (
    <View className={`w-full ${className}`} {...props}>
      {children}
    </View>
  );
}

export default Tabs;
