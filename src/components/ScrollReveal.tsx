import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

// SSR-safe IntersectionObserver fade/slide-up reveal with stagger support and reduced-motion opt-out
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<'visible' | 'hidden'>('visible');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setState('visible');
      return;
    }

    const rect = el.getBoundingClientRect();
    // Only hide elements that start well below the initial viewport so SSR & above-the-fold never flash
    if (rect.top > window.innerHeight * 0.92) {
      setState('hidden');
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenTransform =
    direction === 'up'
      ? 'translateY(16px)'
      : direction === 'down'
      ? 'translateY(-16px)'
      : direction === 'left'
      ? 'translateX(16px)'
      : direction === 'right'
      ? 'translateX(-16px)'
      : 'none';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: state === 'visible' ? 1 : 0,
        transform: state === 'visible' ? 'translate3d(0,0,0)' : hiddenTransform,
        transition: `opacity 420ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 420ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
