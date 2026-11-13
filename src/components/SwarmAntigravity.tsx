import React, { useEffect, useRef, useState } from 'react';
import { Sliders, X, Zap } from 'lucide-react';

export type SwarmMode = 'orbit' | 'repel' | 'ambient' | 'constellation';

interface SwarmProps {
  isActive: boolean;
  onToggle: () => void;
  accentColor?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

export const SwarmAntigravity: React.FC<SwarmProps> = ({
  isActive,
  onToggle,
  accentColor = '#3b82f6',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<SwarmMode>('orbit');
  const [particleCount, setParticleCount] = useState<number>(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 90
  );
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  const [showControls, setShowControls] = useState<boolean>(false);

  const mousePos = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const shockwaves = useRef<{ x: number; y: number; radius: number; maxRadius: number; strength: number }[]>([]);

  useEffect(() => {
    if (!isActive) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let isPaused = document.hidden;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [accentColor, accentColor, '#94a3b8', '#60a5fa'];
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2 * speedMultiplier,
        vy: (Math.random() - 0.5) * 1.2 * speedMultiplier,
        radius: Math.random() * 2.0 + 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.4 + 0.25,
      });
    }

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      mousePos.current.x = clientX;
      mousePos.current.y = clientY;
      mousePos.current.active = true;
    };

    const handlePointerLeave = () => {
      mousePos.current.active = false;
    };

    const handlePointerDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.closest('.swarm-controls-panel')) return;
      shockwaves.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 220,
        strength: 18,
      });
    };

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused) {
        animationId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const maxDist = mode === 'constellation' ? 90 : 60;
    const maxDistSq = maxDist * maxDist;

    const render = () => {
      if (isPaused) return;
      ctx.clearRect(0, 0, width, height);

      // Process and render shockwaves
      for (let s = shockwaves.current.length - 1; s >= 0; s--) {
        const sw = shockwaves.current[s];
        sw.radius += 8;
        const fade = 1 - sw.radius / sw.maxRadius;

        if (fade <= 0) {
          shockwaves.current.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = accentColor;
        ctx.globalAlpha = fade * 0.35;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const mActive = mousePos.current.active;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        for (let s = 0; s < shockwaves.current.length; s++) {
          const sw = shockwaves.current[s];
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0 && Math.abs(dist - sw.radius) < 40) {
            const push = (sw.strength / (dist * 0.1 + 1)) * 1.4;
            p.vx += (dx / dist) * push;
            p.vy += (dy / dist) * push;
          }
        }

        if (mActive) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const distSq = dx * dx + dy * dy;

          if (mode === 'orbit' && distSq > 225 && distSq < 202500) {
            const dist = Math.sqrt(distSq);
            const force = (450 - dist) / 450;
            const invDist = 1 / dist;
            const cosA = dx * invDist;
            const sinA = dy * invDist;
            p.vx += cosA * force * 0.4 * speedMultiplier - sinA * force * 0.55 * speedMultiplier;
            p.vy += sinA * force * 0.4 * speedMultiplier + cosA * force * 0.55 * speedMultiplier;
          } else if (mode === 'repel' && distSq > 0 && distSq < 48400) {
            const dist = Math.sqrt(distSq);
            const force = (220 - dist) / 220;
            p.vx -= (dx / dist) * force * 1.6 * speedMultiplier;
            p.vy -= (dy / dist) * force * 1.6 * speedMultiplier;
          } else if (mode === 'constellation' && distSq > 1600 && distSq < 90000) {
            const dist = Math.sqrt(distSq);
            const force = (300 - dist) / 300;
            p.vx += (dx / dist) * force * 0.2 * speedMultiplier;
            p.vy += (dy / dist) * force * 0.2 * speedMultiplier;
          }
        }

        p.vx *= 0.965;
        p.vy *= 0.965;
        p.vx += (Math.random() - 0.5) * 0.12 * speedMultiplier;
        p.vy += (Math.random() - 0.5) * 0.12 * speedMultiplier;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      if (mode === 'constellation' || mode === 'orbit') {
        ctx.lineWidth = 0.7;
        ctx.strokeStyle = accentColor;
        for (let i = 0; i < particles.length; i++) {
          const pi = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const pj = particles[j];
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistSq) {
              const dist = Math.sqrt(distSq);
              ctx.globalAlpha = (1 - dist / maxDist) * 0.14;
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.stroke();
            }
          }
        }
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerMove);
      window.removeEventListener('touchend', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive, mode, particleCount, speedMultiplier, accentColor]);

  if (!isActive) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-20 transition-opacity duration-500"
      />

      {/* Compact Floating Motion Control */}
      <div className="fixed bottom-4 left-4 z-40 flex flex-col items-start gap-2">
        {showControls && (
          <div className="swarm-controls-panel glass-panel bg-white/95 dark:bg-[#121212]/95 border border-zinc-200 dark:border-white/10 rounded-xl p-4 shadow-2xl backdrop-blur-xl w-64 sm:w-72 text-xs text-zinc-900 dark:text-[#f2efeb] space-y-3 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-white/10">
              <div className="flex items-center gap-1.5 font-medium tracking-wide">
                <Zap className="w-3.5 h-3.5 text-blue-500" />
                <span className="uppercase text-[11px] font-mono">Swarm Motion</span>
              </div>
              <button
                type="button"
                onClick={() => setShowControls(false)}
                className="p-1 hover:text-zinc-500 dark:hover:text-white/60 transition-colors cursor-pointer"
                aria-label="Close swarm controls"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase text-zinc-500 dark:text-white/50 tracking-wider font-mono">
                Behavior Mode
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {(['orbit', 'repel', 'ambient', 'constellation'] as SwarmMode[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`px-2.5 py-1.5 rounded-md text-[11px] capitalize text-left transition-colors font-medium border cursor-pointer ${
                      mode === m
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-white/80 border-zinc-200 dark:border-white/5 hover:bg-zinc-200 dark:hover:bg-white/10'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase text-zinc-500 dark:text-white/50 tracking-wider font-mono">
                <label htmlFor="swarm-particle-range">Particles</label>
                <span className="tabular-nums">{particleCount}</span>
              </div>
              <input
                id="swarm-particle-range"
                type="range"
                min="30"
                max="180"
                step="10"
                value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-zinc-200 dark:bg-white/10 rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase text-zinc-500 dark:text-white/50 tracking-wider font-mono">
                <label htmlFor="swarm-speed-range">Velocity</label>
                <span className="tabular-nums">{speedMultiplier.toFixed(1)}x</span>
              </div>
              <input
                id="swarm-speed-range"
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={speedMultiplier}
                onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-zinc-200 dark:bg-white/10 rounded-lg"
              />
            </div>

            <div className="pt-1 flex items-center justify-between text-[10px] text-zinc-500 dark:text-white/50 font-mono">
              <span>Click screen for pulse</span>
              <button
                type="button"
                onClick={onToggle}
                className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Disable Motion
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1.5 bg-white/90 dark:bg-[#121212]/90 border border-zinc-200 dark:border-white/15 px-2.5 py-1.5 rounded-full shadow-lg backdrop-blur-md">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-800 dark:text-white/90 hidden sm:inline pl-1">
            Motion
          </span>
          <button
            type="button"
            onClick={() => setShowControls(!showControls)}
            className="p-1 text-zinc-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full cursor-pointer"
            title="Adjust Swarm Physics"
            aria-label="Adjust Swarm Physics"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onToggle}
            className="p-1 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-full cursor-pointer"
            title="Turn Off Motion"
            aria-label="Turn Off Motion"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </>
  );
};
