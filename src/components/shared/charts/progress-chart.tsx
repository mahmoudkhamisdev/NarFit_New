import React, { useMemo, useState } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  Circle,
} from 'react-native-svg';
import { useResolveClassNames } from 'uniwind';
import { Text } from '@/components/ui';

export interface ProgressChartPoint {
  label: string;
  value: number;
}

export type WeightProgressPoint = ProgressChartPoint;

export interface ProgressChartProps {
  data?: ProgressChartPoint[];
  yTicks?: number[];
  activePointIndex?: number;
  height?: number;
  lineColor?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export type WeightProgressChartProps = ProgressChartProps;

const DEFAULT_DATA: ProgressChartPoint[] = [
  { label: 'W1', value: 108 },
  { label: 'W3', value: 104 },
  { label: 'W5', value: 102 },
  { label: 'W7', value: 92 },
  { label: 'W9', value: 86 },
];

export function ProgressChart({
  data = DEFAULT_DATA,
  yTicks: customYTicks,
  activePointIndex = 3,
  height = 160,
  lineColor,
  className = '',
  style,
}: ProgressChartProps) {
  const [plotWidth, setPlotWidth] = useState(0);

  // Resolve brand color dynamically using uniwind
  const brandStyle = useResolveClassNames('text-brand');
  const resolvedBrandColor =
    (brandStyle?.color as string) ??
    (brandStyle?.backgroundColor as string) ??
    '#caff2e';
  const strokeColor = lineColor ?? resolvedBrandColor;

  // Compute yTicks dynamically from data values if not provided
  const yTicks = useMemo(() => {
    if (customYTicks && customYTicks.length > 0) {
      return customYTicks;
    }
    if (!data || data.length === 0) {
      return [110, 100, 90, 80, 70];
    }

    const values = data.map((d) => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);

    // Round max up to nearest 10, min down to nearest 10 with margin
    const top = Math.ceil((maxVal + 2) / 10) * 10;
    const bottom = Math.max(0, Math.floor((minVal - 10) / 10) * 10);
    const diff = top - bottom || 40;
    const step = diff / 4;

    return [
      top,
      Math.round(top - step),
      Math.round(top - step * 2),
      Math.round(top - step * 3),
      bottom,
    ];
  }, [customYTicks, data]);

  const yMax = yTicks[0];
  const yMin = yTicks[yTicks.length - 1];
  const yRange = yMax - yMin || 1;

  const handleLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0 && width !== plotWidth) {
      setPlotWidth(width);
    }
  };

  // Compute (x, y) coordinates for each data point
  const points = useMemo(() => {
    if (plotWidth <= 0 || data.length === 0) return [];
    const count = data.length;
    const padX = 8;
    const availableWidth = plotWidth - padX * 2;
    const padY = 8;
    const availableHeight = height - padY * 2;

    return data.map((item, index) => {
      const x = padX + (index / (count - 1)) * availableWidth;
      const normalizedY = (yMax - item.value) / yRange;
      const clampedY = Math.max(0, Math.min(1, normalizedY));
      const y = padY + clampedY * availableHeight;
      return { x, y, value: item.value, label: item.label };
    });
  }, [plotWidth, data, height, yMax, yRange]);

  // Generate smooth cubic bezier SVG path
  const { linePath, areaPath } = useMemo(() => {
    if (points.length < 2) return { linePath: '', areaPath: '' };

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const cpX = (current.x + next.x) / 2;
      d += ` C ${cpX} ${current.y}, ${cpX} ${next.y}, ${next.x} ${next.y}`;
    }

    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    const bottomY = height;
    const aPath = `${d} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;

    return { linePath: d, areaPath: aPath };
  }, [points, height]);

  const activePoint = points[activePointIndex] ?? null;

  return (
    <View className={`w-full ${className}`} style={style}>
      {/* Main chart row: Y-axis + Plot area */}
      <View className="flex-row items-stretch w-full" style={{ height }}>
        {/* Y-axis Labels on Left */}
        <View className="justify-between pr-2 py-1 items-end min-w-[28px]">
          {yTicks.map((tick, idx) => (
            <Text
              key={`ytick-${tick}-${idx}`}
              className="text-xs text-muted leading-tight font-medium"
            >
              {tick}
            </Text>
          ))}
        </View>

        {/* Graph & Grid Area */}
        <View className="flex-1 relative" onLayout={handleLayout}>
          {/* Horizontal Grid Lines */}
          <View className="absolute inset-0 justify-between py-1 pointer-events-none">
            {yTicks.map((tick, i) => (
              <View
                key={`grid-${tick}-${i}`}
                className="w-full border-b border-border/40 border-dashed"
              />
            ))}
          </View>

          {/* SVG Curve & Dots */}
          {plotWidth > 0 && points.length > 0 && (
            <Svg width={plotWidth} height={height} className="absolute inset-0">
              <Defs>
                <LinearGradient id="progressChartGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor={strokeColor} stopOpacity="0.32" />
                  <Stop offset="80%" stopColor={strokeColor} stopOpacity="0.04" />
                  <Stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
                </LinearGradient>
              </Defs>

              {/* Area fill */}
              {areaPath ? (
                <Path d={areaPath} fill="url(#progressChartGradient)" />
              ) : null}

              {/* Stroke line */}
              {linePath ? (
                <Path
                  d={linePath}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={2}
                />
              ) : null}

              {/* Data points dots */}
              {points.map((pt, i) => (
                <Circle
                  key={`dot-${i}`}
                  cx={pt.x}
                  cy={pt.y}
                  r={3}
                  fill={strokeColor}
                />
              ))}
            </Svg>
          )}

          {/* Active Tooltip Badge (e.g. 92 at W7) */}
          {activePoint && (
            <View
              pointerEvents="none"
              style={{
                position: 'absolute',
                left: activePoint.x - 17,
                top: Math.max(0, activePoint.y - 28),
                alignItems: 'center',
                zIndex: 10,
              }}
            >
              <View className="bg-brand px-1.5 py-0.5 rounded-[5px] items-center justify-center min-w-[34px] shadow-sm">
                <Text className="text-[10px] font-bold text-inverse text-center">
                  {activePoint.value}
                </Text>
              </View>
              <View
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: 3.5,
                  borderRightWidth: 3.5,
                  borderTopWidth: 4.5,
                  borderStyle: 'solid',
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderTopColor: strokeColor,
                }}
              />
            </View>
          )}
        </View>
      </View>

      {/* X-axis Labels Row */}
      <View className="flex-row items-center justify-between pl-9 pr-2 pt-2.5">
        {data.map((item, idx) => (
          <Text
            key={`x-${item.label}-${idx}`}
            className="text-xs text-muted font-medium text-center"
          >
            {item.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

// Backwards compatibility alias
export const WeightProgressChart = ProgressChart;
export default ProgressChart;
