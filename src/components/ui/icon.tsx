import type { LucideIcon, LucideProps } from 'lucide-react-native';
import React from 'react';
import { useResolveClassNames } from 'uniwind';

type IconProps = LucideProps & {
  as: LucideIcon;
  className?: string;
};

/**
 * A wrapper component for Lucide icons with Uniwind `className` support.
 *
 * @component
 * @example
 * ```tsx
 * import { ArrowRight } from 'lucide-react-native';
 * import { Icon } from '@/components/ui/icon';
 *
 * <Icon as={ArrowRight} className="text-red-500 w-4 h-4" />
 * ```
 */
function Icon({ as: IconComponent, className, size, color, ...props }: IconProps) {
  const resolvedStyle = useResolveClassNames(`text-foreground ${className ?? ''}`);

  const resolvedSize = size ?? (resolvedStyle?.height as number) ?? (resolvedStyle?.width as number) ?? 24;
  const resolvedColor = color ?? (resolvedStyle?.color as string) ?? 'black';

  return (
    <IconComponent
      size={resolvedSize}
      color={resolvedColor}
      {...props}
    />
  );
}

export { Icon };
