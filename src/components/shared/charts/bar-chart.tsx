import React, { useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useResolveClassNames } from 'uniwind';
import { Text } from '@/components/ui';

export interface BarChartItem {
  label: string;
  value: number;
}

export interface BarChartProps {
  data?: BarChartItem[];
  yTicks?: number[];
  height?: number;
  barColor?: string;
  barWidth?: number;
  showValueLabels?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_BAR_DATA: BarChartItem[] = [
  { label: 'Mon', value: 1950 },
  { label: 'Tue', value: 2100 },
  { label: 'Wed', value: 1750 },
  { label: 'Thu', value: 2000 },
  { label: 'Fri', value: 1650 },
  { label: 'Sat', value: 1800 },
];

export function BarChart({
  data = DEFAULT_BAR_DATA,
  yTicks: customYTicks,
  height = 140,
  barColor,
  barWidth = 14,
  showValueLabels = true,
  className = '',
  style,
}: BarChartProps) {
  // Resolve brand color dynamically using uniwind
  const brandStyle = useResolveClassNames('text-brand');
  const resolvedBarColor =
    barColor ??
    (brandStyle?.color as string) ??
    (brandStyle?.backgroundColor as string) ??
    '#caff2e';

  // Compute yTicks dynamically from data values if not provided
  const yTicks = useMemo(() => {
    if (customYTicks && customYTicks.length > 0) {
      return customYTicks;
    }

    const values = data && data.length > 0 ? data.map((d) => d.value) : [1000];
    const maxVal = Math.max(...values, 0);

    if (maxVal <= 0) {
      return [1000, 800, 600, 400, 200, 0];
    }

    // Round up to sensible ceiling based on magnitude
    const step =
      maxVal >= 2000
        ? 500
        : maxVal >= 1000
        ? 250
        : maxVal >= 500
        ? 100
        : maxVal >= 100
        ? 20
        : 5;

    const top = Math.ceil((maxVal * 1.15) / step) * step;
    const tickCount = 6;
    const tickStep = top / tickCount;

    const ticks: number[] = [];
    for (let i = tickCount; i >= 0; i--) {
      ticks.push(Math.round(i * tickStep));
    }
    return ticks;
  }, [customYTicks, data]);

  const maxY = yTicks[0] || 3000;

  return (
    <View className={`w-full ${className}`} style={style}>
      <View className="flex-row items-stretch" style={{ height }}>
        {/* Y-Axis Labels */}
        <View className="justify-between items-end pr-2.5">
          {yTicks.map((tick, index) => (
            <Text
              key={`tick-${tick}-${index}`}
              className="text-[10px] text-muted font-medium"
            >
              {tick}
            </Text>
          ))}
        </View>

        {/* Chart Grid & Bars Container */}
        <View className="flex-1 relative">
          {/* Horizontal Grid Lines */}
          <View className="absolute inset-0 justify-between pointer-events-none">
            {yTicks.map((tick, index) => (
              <View
                key={`grid-line-${tick}-${index}`}
                className="w-full border-b border-border/30 border-dashed"
              />
            ))}
          </View>

          {/* Bars Row */}
          <View className="flex-row items-end justify-between px-1 h-full">
            {data.map((item, index) => {
              const barHeight = Math.max(
                6,
                Math.round((item.value / maxY) * (height - 24))
              );

              return (
                <View
                  key={`bar-${item.label}-${index}`}
                  className="flex-1 items-center justify-end h-full"
                >
                  {/* Value Label */}
                  {showValueLabels && (
                    <Text className="text-[10px] text-foreground font-semibold mb-1 text-center">
                      {item.value}
                    </Text>
                  )}

                  {/* Bar Pillar */}
                  <View
                    className="rounded-t-[4px]"
                    style={{
                      width: barWidth,
                      height: barHeight,
                      backgroundColor: resolvedBarColor,
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* X-Axis Labels */}
      <View className="flex-row items-center justify-between pl-8 pr-1 pt-2">
        {data.map((item, index) => (
          <View key={`x-label-${item.label}-${index}`} className="flex-1 items-center">
            <Text className="text-[11px] text-muted font-medium">
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default BarChart;
