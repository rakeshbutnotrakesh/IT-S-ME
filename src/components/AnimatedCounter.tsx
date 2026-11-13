import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  label: string;
}

/**
 * Counts up smoothly when scrolled into view using tabular numerals.
 * Starts at the real target value in SSR HTML so crawlers always index accurate counts.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  label,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState<number>(target);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(target);
      hasAnimatedRef.current = true;
      return;
    }

    hasAnimatedRef.current = true;
    const controls = animate(0, target, {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, target]);

  return (
    <div ref={ref} className="space-y-1">
      <div className="font-heading font-bold text-3xl sm:text-4xl accent-gradient-text tabular-nums">
        {displayValue}
        {suffix}
      </div>
      <div className="text-xs sm:text-sm text-[var(--text-secondary)]">
        {label}
      </div>
    </div>
  );
};
