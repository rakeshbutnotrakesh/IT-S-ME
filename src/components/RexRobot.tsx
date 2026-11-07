import React, { useState, useEffect } from 'react';

interface RexRobotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showParticles?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const RexRobot: React.FC<RexRobotProps> = ({
  size = 'lg',
  showParticles = true,
  interactive = true,
  className = '',
  onClick,
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Periodic cute eye blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4200);

    return () => clearInterval(blinkInterval);
  }, []);

  // Size configurations
  const dimensions = {
    sm: { width: 56, height: 68, scale: 'scale-90' },
    md: { width: 84, height: 100, scale: 'scale-100' },
    lg: { width: 220, height: 260, scale: 'scale-100' },
    xl: { width: 280, height: 320, scale: 'scale-110' },
  }[size];

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center select-none ${
        interactive ? 'cursor-pointer' : ''
      } ${className}`}
      style={{ width: dimensions.width, height: dimensions.height }}
      role={onClick ? 'button' : undefined}
      aria-label="Rex AI Companion"
    >
      {/* Floating Syntax Particles (matches reference screenshot) */}
      {showParticles && size !== 'sm' && (
        <div className="absolute inset-0 pointer-events-none font-mono text-cyan-400 font-semibold">
          {/* < ! > particle (top left) */}
          <div
            className="absolute top-10 left-3 text-xs opacity-75 animate-bounce"
            style={{ animationDuration: '3.5s', animationDelay: '0.2s' }}
          >
            &lt; ! &gt;
          </div>

          {/* 0101 particle (middle right) */}
          <div
            className="absolute top-14 right-2 text-[11px] opacity-80 animate-pulse"
            style={{ animationDuration: '2.4s' }}
          >
            0101
          </div>

          {/* { } particle (bottom right) */}
          <div
            className="absolute bottom-12 right-6 text-xs opacity-75 animate-bounce"
            style={{ animationDuration: '4s', animationDelay: '0.8s' }}
          >
            &#123; &#125;
          </div>
        </div>
      )}

      {/* Subtle Ambient Soft Aura Glow behind Robot (Toned down) */}
      <div
        className={`absolute rounded-full pointer-events-none transition-all duration-500 ${
          isHovered ? 'opacity-35 scale-110' : 'opacity-20 scale-100'
        }`}
        style={{
          width: dimensions.width * 0.75,
          height: dimensions.height * 0.65,
          background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(14,165,233,0.1) 50%, transparent 75%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Main Animated Robot SVG (Soft, crisp drop shadow) */}
      <div
        className="w-full h-full relative z-10 flex items-center justify-center transition-transform duration-300"
        style={{
          animation: 'rexFloat 3.8s ease-in-out infinite',
          filter: isHovered
            ? 'drop-shadow(0 2px 8px rgba(6, 182, 212, 0.35))'
            : 'drop-shadow(0 2px 5px rgba(6, 182, 212, 0.2))',
        }}
      >
        <svg
          viewBox="0 0 200 240"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="rexHeadGrad" x1="50" y1="50" x2="150" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="50%" stopColor="#030712" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="rexCyanBorder" x1="40" y1="40" x2="160" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <linearGradient id="rexEarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>

            <linearGradient id="rexBodyGrad" x1="70" y1="135" x2="130" y2="210" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>

            <radialGradient id="rexCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#22d3ee" />
              <stop offset="80%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#030712" />
            </radialGradient>

            <radialGradient id="rexBaseShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            {/* Neon Glow Filters */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="eyeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Floating Base Glow / Thruster pool beneath robot */}
          <ellipse cx="100" cy="225" rx="38" ry="7" fill="url(#rexBaseShadow)" />
          <ellipse cx="100" cy="225" rx="20" ry="3.5" fill="#22d3ee" opacity="0.6" />

          {/* --- ANTENNA --- */}
          {/* Stem */}
          <rect x="97" y="24" width="6" height="24" rx="3" fill="#0891b2" />
          <rect x="98.5" y="24" width="3" height="24" rx="1.5" fill="#38bdf8" />
          {/* Top glowing antenna orb */}
          <circle cx="100" cy="20" r="10" fill="#06b6d4" filter="url(#neonGlow)" />
          <circle cx="100" cy="20" r="6" fill="#67e8f9" />
          <circle cx="98" cy="18" r="2.5" fill="#ffffff" />

          {/* --- EARS / HEADPHONES --- */}
          {/* Left Ear */}
          <rect x="30" y="70" width="16" height="34" rx="8" fill="url(#rexEarGrad)" stroke="#06b6d4" strokeWidth="2.5" />
          <rect x="33" y="76" width="4" height="22" rx="2" fill="#22d3ee" opacity="0.8" />

          {/* Right Ear */}
          <rect x="154" y="70" width="16" height="34" rx="8" fill="url(#rexEarGrad)" stroke="#06b6d4" strokeWidth="2.5" />
          <rect x="163" y="76" width="4" height="22" rx="2" fill="#22d3ee" opacity="0.8" />

          {/* --- HEAD --- */}
          {/* Outer glowing head shell */}
          <rect
            x="42"
            y="44"
            width="116"
            height="86"
            rx="32"
            fill="url(#rexHeadGrad)"
            stroke="url(#rexCyanBorder)"
            strokeWidth="3.5"
          />

          {/* Inner Face Screen (dark visor) */}
          <rect
            x="50"
            y="52"
            width="100"
            height="70"
            rx="24"
            fill="#030712"
            stroke="#083344"
            strokeWidth="1.5"
          />

          {/* Subtle visor reflection */}
          <path
            d="M 58 60 Q 100 54 142 60"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* --- EYES --- */}
          {isBlinking ? (
            // Blinking horizontal neon line
            <g filter="url(#eyeGlow)">
              <line x1="68" y1="86" x2="88" y2="86" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
              <line x1="112" y1="86" x2="132" y2="86" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
            </g>
          ) : (
            // Cute smiling arc eyes (exact match to screenshot: ^ ^ / ◠ ◠)
            <g filter="url(#eyeGlow)">
              {/* Left Eye */}
              <path
                d="M 68 90 Q 78 76 88 90"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 70 89 Q 78 78 86 89"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.75"
              />

              {/* Right Eye */}
              <path
                d="M 112 90 Q 122 76 132 90"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 114 89 Q 122 78 130 89"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.75"
              />
            </g>
          )}

          {/* --- NECK --- */}
          <rect x="88" y="130" width="24" height="10" rx="4" fill="#082f49" stroke="#06b6d4" strokeWidth="1.5" />

          {/* --- ARMS --- */}
          {/* Left Arm */}
          <path
            d="M 54 150 C 44 155 40 170 42 186 C 44 194 50 196 54 192 C 58 186 58 174 58 162 Z"
            fill="url(#rexEarGrad)"
            stroke="#06b6d4"
            strokeWidth="2.5"
          />

          {/* Right Arm */}
          <path
            d="M 146 150 C 156 155 160 170 158 186 C 156 194 150 196 146 192 C 142 186 142 174 142 162 Z"
            fill="url(#rexEarGrad)"
            stroke="#06b6d4"
            strokeWidth="2.5"
          />

          {/* --- BODY / TORSO --- */}
          <rect
            x="58"
            y="138"
            width="84"
            height="72"
            rx="24"
            fill="url(#rexBodyGrad)"
            stroke="url(#rexCyanBorder)"
            strokeWidth="3"
          />

          {/* Chest Reactor Core with concentric glowing rings (Matches screenshot) */}
          {/* Outer ring */}
          <circle cx="100" cy="174" r="19" fill="#020617" stroke="#06b6d4" strokeWidth="2.5" />
          {/* Middle ring */}
          <circle cx="100" cy="174" r="13" stroke="#38bdf8" strokeWidth="1.8" opacity="0.9" />
          {/* Glowing Center Core */}
          <circle
            cx="100"
            cy="174"
            r="8"
            fill="url(#rexCoreGlow)"
            filter="url(#neonGlow)"
            className="animate-pulse"
          />
          <circle cx="98" cy="172" r="3" fill="#ffffff" />

          {/* Lower Base Thruster Ring */}
          <rect x="76" y="206" width="48" height="6" rx="3" fill="#0891b2" />
        </svg>
      </div>

      {/* Floating animation keyframes embedded */}
      <style>{`
        @keyframes rexFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-9px);
          }
        }
      `}</style>
    </div>
  );
};
