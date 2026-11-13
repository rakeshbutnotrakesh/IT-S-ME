import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

/**
 * SSR-safe IntersectionObserver scroll reveal.
 * Renders opacity: 1 in server-rendered HTML so search engines and initial paint
 * are never blocked, and reveals lower sections smoothly on scroll.
 */
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
    if (rect.top > window.innerHeight * 0.94) {
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
      ? 'translate3d(0, 18px, 0)'
      : direction === 'down'
      ? 'translate3d(0, -18px, 0)'
      : direction === 'left'
      ? 'translate3d(18px, 0, 0)'
      : direction === 'right'
      ? 'translate3d(-18px, 0, 0)'
      : 'translate3d(0, 0, 0)';

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: state === 'visible' ? 1 : 0,
        transform: state === 'visible' ? 'translate3d(0, 0, 0)' : hiddenTransform,
        transition: `opacity 450ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 450ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};
