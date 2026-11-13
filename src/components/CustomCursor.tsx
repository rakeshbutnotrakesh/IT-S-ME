import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<'default' | 'link' | 'card'>('default');
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const smoothX = useSpring(mouseX, { stiffness: 360, damping: 28, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 360, damping: 28, mass: 0.4 });
  const glowX = useSpring(mouseX, { stiffness: 160, damping: 26, mass: 0.8 });
  const glowY = useSpring(mouseY, { stiffness: 160, damping: 26, mass: 0.8 });

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReduced) return;

    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) {
        setVariant('default');
        return;
      }

      if (target.closest('a, button, [role="tab"], input, textarea')) {
        setVariant('link');
      } else if (target.closest('[data-cursor="card"]')) {
        setVariant('card');
      } else {
        setVariant('default');
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  const scale = variant === 'card' ? 2.1 : variant === 'link' ? 1.55 : 1;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
          background:
            'radial-gradient(circle, var(--accent-tint) 0%, var(--secondary-tint) 38%, transparent 72%)',
        }}
        className="w-[420px] h-[420px] rounded-full transition-opacity duration-300"
      />

      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
        className={`w-5 h-5 rounded-full border transition-colors duration-150 ${
          variant === 'card'
            ? 'border-[var(--accent)] bg-[var(--accent-tint)]'
            : variant === 'link'
            ? 'border-[var(--accent-end)] bg-[var(--secondary-tint)]'
            : 'border-[var(--border-strong)]'
        }`}
      />
    </div>
  );
};
