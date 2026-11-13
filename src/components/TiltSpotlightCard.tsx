import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface TiltSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
}

export const TiltSpotlightCard: React.FC<TiltSpotlightCardProps> = ({
  children,
  className = '',
  enableTilt = true,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, active: false });

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 24 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    setSpot({ x: px, y: py, active: true });

    if (enableTilt && !reduced) {
      const rx = ((py - rect.height / 2) / rect.height) * -5;
      const ry = ((px - rect.width / 2) / rect.width) * 5;
      rotateXRaw.set(rx);
      rotateYRaw.set(ry);
    }
  };

  const handleMouseLeave = () => {
    setSpot((prev) => ({ ...prev, active: false }));
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      data-cursor="card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className={`group relative rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] transition-colors duration-200 hover:border-[var(--accent)] ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300"
        style={{
          opacity: spot.active ? 1 : 0,
          background: `radial-gradient(340px circle at ${spot.x}px ${spot.y}px, var(--accent-tint), var(--secondary-tint) 45%, transparent 75%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
