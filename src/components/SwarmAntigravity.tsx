import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Sliders, X, RefreshCw, Zap } from 'lucide-react';

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
  originalAlpha: number;
  alpha: number;
  mass: number;
}

export const SwarmAntigravity: React.FC<SwarmProps> = ({
  isActive,
  onToggle,
  accentColor = '#e32b3c',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<SwarmMode>('orbit');
  const [particleCount, setParticleCount] = useState<number>(140);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.2);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [isHoveredOverControls, setIsHoveredOverControls] = useState<boolean>(false);

  const mousePos = useRef<{ x: number; y: number; active: boolean; isDown: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
    isDown: false,
  });

  const shockwaves = useRef<{ x: number; y: number; radius: number; maxRadius: number; strength: number }[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particles: Particle[] = [];
    const colors = [
      accentColor,
      accentColor,
      '#f2efeb',
      '#ffffff',
      '#a09c9a',
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5 * speedMultiplier,
        vy: (Math.random() - 0.5) * 1.5 * speedMultiplier,
        radius: Math.random() * 2.4 + 1.0,
        color: colors[Math.floor(Math.random() * colors.length)],
        originalAlpha: Math.random() * 0.5 + 0.35,
        alpha: Math.random() * 0.5 + 0.35,
        mass: Math.random() * 1.5 + 0.5,
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
      // Don't trigger shockwave if clicking inside the control panel
      if ((e.target as HTMLElement)?.closest('.swarm-controls-panel')) return;
      
      mousePos.current.isDown = true;
      // Add shockwave pulse on click (Antigravity Burst)
      shockwaves.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 260,
        strength: 22,
      });
    };

    const handlePointerUp = () => {
      mousePos.current.isDown = false;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchstart', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerLeave);

    // Animation loop
    const render = () => {
      // Clear with slight trailing fade in orbit mode or clean clear
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

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = accentColor;
        ctx.globalAlpha = fade * 0.45;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const mActive = mousePos.current.active;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply shockwave force
        for (let s = 0; s < shockwaves.current.length; s++) {
          const sw = shockwaves.current[s];
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0 && Math.abs(dist - sw.radius) < 40) {
            const push = (sw.strength / (dist * 0.1 + 1)) * 1.5;
            p.vx += (dx / dist) * push;
            p.vy += (dy / dist) * push;
          }
        }

        // Swarm mode physics
        if (mActive) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (mode === 'orbit') {
            // Gravitational pull + perpendicular orbital velocity
            if (dist > 15 && dist < 450) {
              const force = (450 - dist) / 450;
              const angle = Math.atan2(dy, dx);
              // Gravitate inward
              p.vx += Math.cos(angle) * force * 0.45 * speedMultiplier;
              p.vy += Math.sin(angle) * force * 0.45 * speedMultiplier;

              // Tangential swirl (Swarm Antigravity vortex)
              p.vx += -Math.sin(angle) * force * 0.65 * speedMultiplier;
              p.vy += Math.cos(angle) * force * 0.65 * speedMultiplier;
            }
          } else if (mode === 'repel') {
            // Magnetic repulsion field
            if (dist < 220 && dist > 0) {
              const force = (220 - dist) / 220;
              const angle = Math.atan2(dy, dx);
              p.vx -= Math.cos(angle) * force * 1.8 * speedMultiplier;
              p.vy -= Math.sin(angle) * force * 1.8 * speedMultiplier;
            }
          } else if (mode === 'constellation') {
            // Subtle attraction towards pointer
            if (dist < 300 && dist > 40) {
              const force = (300 - dist) / 300;
              p.vx += (dx / dist) * force * 0.2 * speedMultiplier;
              p.vy += (dy / dist) * force * 0.2 * speedMultiplier;
            }
          }
        }

        // Ambient fluid drift & damping
        p.vx *= 0.965;
        p.vy *= 0.965;

        // Ambient gentle noise
        p.vx += (Math.random() - 0.5) * 0.15 * speedMultiplier;
        p.vy += (Math.random() - 0.5) * 0.15 * speedMultiplier;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges smoothly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = p.color === accentColor ? 8 : 2;
        ctx.shadowColor = p.color === accentColor ? accentColor : 'transparent';
        ctx.fill();
        ctx.restore();
      }

      // Draw constellation threads if in constellation or orbit mode
      if (mode === 'constellation' || mode === 'orbit') {
        const maxDist = mode === 'constellation' ? 95 : 65;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const pi = particles[i];
            const pj = particles[j];
            const dx = pi.x - pj.x;
            const dy = pi.y - pj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const lineAlpha = (1 - dist / maxDist) * 0.18;
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(pi.x, pi.y);
              ctx.lineTo(pj.x, pj.y);
              ctx.strokeStyle = pi.color === accentColor || pj.color === accentColor ? accentColor : '#f2efeb';
              ctx.globalAlpha = lineAlpha;
              ctx.lineWidth = 0.75;
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchstart', handlePointerMove);
      window.removeEventListener('touchend', handlePointerLeave);
    };
  }, [isActive, mode, particleCount, speedMultiplier, accentColor]);

  if (!isActive) return null;

  return (
    <>
      {/* Interactive Fullscreen Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-500"
        style={{ pointerEvents: 'none' }}
      />

      {/* Floating Motion Indicator & Quick Control Trigger (Bottom Left to avoid Chatbot overlap) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
        {showControls && (
          <div
            className="swarm-controls-panel glass-panel bg-white/95 dark:bg-[#121212]/95 border border-zinc-200 dark:border-white/10 rounded-xl p-4 shadow-2xl backdrop-blur-xl w-72 text-xs text-zinc-900 dark:text-[#f2efeb] space-y-3 transition-all animate-in fade-in slide-in-from-bottom-2"
            onMouseEnter={() => setIsHoveredOverControls(true)}
            onMouseLeave={() => setIsHoveredOverControls(false)}
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-white/10">
              <div className="flex items-center gap-1.5 font-medium tracking-wide">
                <Zap className="w-3.5 h-3.5 text-blue-500" />
                <span className="uppercase text-[11px] font-mono">Swarm Antigravity</span>
              </div>
              <button
                onClick={() => setShowControls(false)}
                className="p-1 hover:text-zinc-500 dark:hover:text-white/60 transition-colors"
                aria-label="Close controls"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mode Selector */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-zinc-400 dark:text-white/50 tracking-wider font-mono">Behavior Mode</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['orbit', 'repel', 'ambient', 'constellation'] as SwarmMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-2.5 py-1.5 rounded-md text-[11px] capitalize text-left transition-colors font-medium border ${
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

            {/* Particle Density */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase text-zinc-400 dark:text-white/50 tracking-wider font-mono">
                <span>Particles</span>
                <span>{particleCount}</span>
              </div>
              <input
                type="range"
                min="50"
                max="260"
                step="10"
                value={particleCount}
                onChange={(e) => setParticleCount(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-zinc-200 dark:bg-white/10 rounded-lg"
              />
            </div>

            {/* Speed Multiplier */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase text-zinc-400 dark:text-white/50 tracking-wider font-mono">
                <span>Velocity</span>
                <span>{speedMultiplier.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={speedMultiplier}
                onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-zinc-200 dark:bg-white/10 rounded-lg"
              />
            </div>

            <div className="pt-1 flex items-center justify-between text-[10px] text-zinc-400 dark:text-white/50 font-mono">
              <span>Click screen for pulse</span>
              <button
                onClick={onToggle}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Disable Motion
              </button>
            </div>
          </div>
        )}

        {/* Floating Quick Action Pill */}
        <div className="flex items-center gap-2 bg-white/90 dark:bg-[#121212]/90 border border-zinc-200 dark:border-white/15 px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-800 dark:text-white/90">
              Swarm Motion
            </span>
          </div>
          <button
            onClick={() => setShowControls(!showControls)}
            className="p-1 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full"
            title="Adjust Swarm Physics"
            aria-label="Adjust Swarm Physics"
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onToggle}
            className="p-1 text-zinc-500 hover:text-zinc-800 dark:hover:text-white/60 transition-colors rounded-full"
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
