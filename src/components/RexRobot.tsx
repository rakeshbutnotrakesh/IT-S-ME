import React, { useState, useEffect, useId } from 'react';

interface RexRobotProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showParticles?: boolean;
  interactive?: boolean;
  className?: string;
  onClick?: () => void;
  expression?: 'normal' | 'love' | 'happy';
}

export const RexRobot: React.FC<RexRobotProps> = ({
  size = 'lg',
  showParticles = true,
  interactive = true,
  className = '',
  onClick,
  expression = 'normal',
}) => {
  const uid = useId().replace(/:/g, '');
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Periodic cute eye blink
  useEffect(() => {
    if (expression === 'love') return;
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4200);

    return () => clearInterval(blinkInterval);
  }, [expression]);

  // Size configurations
  const dimensions = {
    sm: { width: 56, height: 68, scale: 'scale-90' },
    md: { width: 84, height: 100, scale: 'scale-100' },
    lg: { width: 220, height: 260, scale: 'scale-100' },
    xl: { width: 280, height: 320, scale: 'scale-110' },
  }[size];

  const isLove = expression === 'love';

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
      {/* Floating Syntax Particles (Maintains Cyan/Blue Palette) */}
      {showParticles && size !== 'sm' && (
        <div className="absolute inset-0 pointer-events-none font-mono text-cyan-400 font-semibold">
          {/* < ! > particle (top left) */}
          <div
            className={`absolute top-10 left-3 text-xs transition-opacity animate-bounce ${
              isLove ? 'opacity-95 text-cyan-200' : 'opacity-75'
            }`}
            style={{ animationDuration: '3.5s', animationDelay: '0.2s' }}
          >
            {isLove ? '♥ ! ♥' : '< ! >'}
          </div>

          {/* 0101 particle (middle right) */}
          <div
            className={`absolute top-14 right-2 text-[11px] transition-opacity animate-pulse ${
              isLove ? 'opacity-95 text-cyan-200' : 'opacity-80'
            }`}
            style={{ animationDuration: '2.4s' }}
          >
            {isLove ? '+1 ♡' : '0101'}
          </div>

          {/* { } particle (bottom right) */}
          <div
            className={`absolute bottom-12 right-6 text-xs transition-opacity animate-bounce ${
              isLove ? 'opacity-95 text-cyan-200' : 'opacity-75'
            }`}
            style={{ animationDuration: '4s', animationDelay: '0.8s' }}
          >
            {isLove ? 'ღ(◕‿◕)ღ' : '{ }'}
          </div>
        </div>
      )}

      {/* Super Glow-Up Ambient Aura (Pure Cyan/Electric Blue Brilliance) */}
      <div
        className={`absolute rounded-full pointer-events-none transition-all duration-500 ${
          isLove
            ? 'opacity-65 scale-125'
            : isHovered
            ? 'opacity-35 scale-110'
            : 'opacity-20 scale-100'
        }`}
        style={{
          width: dimensions.width * 0.8,
          height: dimensions.height * 0.7,
          background: isLove
            ? 'radial-gradient(circle, rgba(34,211,238,0.55) 0%, rgba(6,182,212,0.35) 45%, rgba(14,165,233,0.15) 65%, transparent 80%)'
            : 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(14,165,233,0.1) 50%, transparent 75%)',
          filter: isLove ? 'blur(16px)' : 'blur(10px)',
        }}
      />

      {/* Secondary Concentric Super Glow Ring when Glow-Up Active */}
      {isLove && (
        <div
          className="absolute rounded-full pointer-events-none animate-ping"
          style={{
            width: dimensions.width * 0.9,
            height: dimensions.height * 0.75,
            background: 'radial-gradient(circle, rgba(56,189,248,0.35) 0%, transparent 70%)',
            filter: 'blur(12px)',
            animationDuration: '2.2s',
          }}
        />
      )}

      {/* Main Animated Robot SVG (Glow-Up drop shadows in electric cyan & sky blue) */}
      <div
        className="w-full h-full relative z-10 flex items-center justify-center transition-all duration-300"
        style={{
          animation: isLove
            ? 'rexLoveJoy 0.8s ease-in-out infinite'
            : 'rexFloat 3.8s ease-in-out infinite',
          filter: isLove
            ? 'drop-shadow(0 0 16px rgba(6, 182, 212, 0.9)) drop-shadow(0 0 32px rgba(56, 189, 248, 0.6)) brightness(1.1)'
            : isHovered
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
            {/* Head Gradients - Remains Deep Tech Obsidian */}
            <linearGradient id={`${uid}-head`} x1="50" y1="50" x2="150" y2="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="50%" stopColor="#030712" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            {/* Glowing Border - Pure Electric Cyan / Azure Blue */}
            <linearGradient id={`${uid}-border`} x1="40" y1="40" x2="160" y2="140" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={isLove ? '#bae6fd' : '#38bdf8'} />
              <stop offset="50%" stopColor={isLove ? '#38bdf8' : '#06b6d4'} />
              <stop offset="100%" stopColor={isLove ? '#0284c7' : '#0369a1'} />
            </linearGradient>

            {/* Ears / Headphone Accents */}
            <linearGradient id={`${uid}-ear`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={isLove ? '#38bdf8' : '#0284c7'} />
              <stop offset="100%" stopColor="#082f49" />
            </linearGradient>

            <linearGradient id={`${uid}-body`} x1="70" y1="135" x2="130" y2="210" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>

            {/* Reactor Core Glow - Ultra Radiant White-to-Cyan Core */}
            <radialGradient id={`${uid}-core`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#67e8f9" />
              <stop offset="70%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#082f49" />
            </radialGradient>

            {/* Heart Eyes Gradient - Electric Cyan to Sky Blue (No Pink!) */}
            <linearGradient id={`${uid}-heart`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="40%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>

            <radialGradient id={`${uid}-base`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={isLove ? '#22d3ee' : '#06b6d4'} stopOpacity={isLove ? '0.95' : '0.8'} />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>

            {/* Neon Glow Filters */}
            <filter id={`${uid}-neon`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation={isLove ? '4.5' : '3.5'} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id={`${uid}-eye`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation={isLove ? '3.5' : '2'} result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id={`${uid}-super`} x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Floating Base Glow / Thruster pool beneath robot */}
          <ellipse cx="100" cy="225" rx={isLove ? 44 : 38} ry={isLove ? 9 : 7} fill={`url(#${uid}-base)`} />
          <ellipse cx="100" cy="225" rx={isLove ? 26 : 20} ry={isLove ? 4.5 : 3.5} fill="#38bdf8" opacity="0.8" />

          {/* --- ANTENNA --- */}
          {/* Stem */}
          <rect x="97" y="24" width="6" height="24" rx="3" fill="#0891b2" />
          <rect x="98.5" y="24" width="3" height="24" rx="1.5" fill={isLove ? '#bae6fd' : '#38bdf8'} />
          {/* Top glowing antenna orb (Super cyan bloom) */}
          <circle
            cx="100"
            cy="20"
            r={isLove ? 12 : 10}
            fill="#06b6d4"
            filter={`url(#${uid}-neon)`}
            className={isLove ? 'animate-pulse' : ''}
          />
          <circle cx="100" cy="20" r={isLove ? 7 : 6} fill="#a5f3fc" />
          <circle cx="98" cy="18" r="3" fill="#ffffff" />

          {/* --- EARS / HEADPHONES --- */}
          {/* Left Ear */}
          <rect
            x="30"
            y="70"
            width="16"
            height="34"
            rx="8"
            fill={`url(#${uid}-ear)`}
            stroke={isLove ? '#38bdf8' : '#06b6d4'}
            strokeWidth="2.5"
          />
          <rect x="33" y="76" width="4" height="22" rx="2" fill="#22d3ee" opacity="0.9" />

          {/* Right Ear */}
          <rect
            x="154"
            y="70"
            width="16"
            height="34"
            rx="8"
            fill={`url(#${uid}-ear)`}
            stroke={isLove ? '#38bdf8' : '#06b6d4'}
            strokeWidth="2.5"
          />
          <rect x="163" y="76" width="4" height="22" rx="2" fill="#22d3ee" opacity="0.9" />

          {/* --- HEAD --- */}
          {/* Outer glowing head shell */}
          <rect
            x="42"
            y="44"
            width="116"
            height="86"
            rx="32"
            fill={`url(#${uid}-head)`}
            stroke={`url(#${uid}-border)`}
            strokeWidth={isLove ? 4 : 3.5}
          />

          {/* Inner Face Screen (dark visor) */}
          <rect
            x="50"
            y="52"
            width="100"
            height="70"
            rx="24"
            fill="#030712"
            stroke={isLove ? '#0e7490' : '#083344'}
            strokeWidth="1.5"
          />

          {/* Subtle visor reflection */}
          <path
            d="M 58 60 Q 100 54 142 60"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={isLove ? 0.6 : 0.35}
          />

          {/* --- EYES & EXPRESSION --- */}
          {isLove ? (
            // Adorable Glowing Electric Cyan Heart Eyes (♥ ♥) with pure white highlights (No Pink!)
            <g filter={`url(#${uid}-super)`}>
              {/* Left Heart Eye */}
              <path
                d="M 78 95 C 75 92 68 85 68 80 C 68 75.5 71.5 72 75.5 72 C 77.8 72 78 74 78 74 C 78 74 78.2 72 80.5 72 C 84.5 72 88 75.5 88 80 C 88 85 81 92 78 95 Z"
                fill={`url(#${uid}-heart)`}
                stroke="#ffffff"
                strokeWidth="1.4"
                className="animate-pulse"
              />
              <circle cx="75" cy="76" r="1.8" fill="#ffffff" />

              {/* Right Heart Eye */}
              <path
                d="M 122 95 C 119 92 112 85 112 80 C 112 75.5 115.5 72 119.5 72 C 121.8 72 122 74 122 74 C 122 74 122.2 72 124.5 72 C 128.5 72 132 75.5 132 80 C 132 85 125 92 122 95 Z"
                fill={`url(#${uid}-heart)`}
                stroke="#ffffff"
                strokeWidth="1.4"
                className="animate-pulse"
              />
              <circle cx="119" cy="76" r="1.8" fill="#ffffff" />

              {/* Cute Glowing Electric Cyan Cheeks (Rosy in tech cyan glow) */}
              <ellipse cx="63" cy="99" rx="8" ry="4" fill="#06b6d4" opacity="0.6" />
              <ellipse cx="137" cy="99" rx="8" ry="4" fill="#06b6d4" opacity="0.6" />
              {/* Cheek sparkle dashes */}
              <line x1="59" y1="99" x2="67" y2="99" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="133" y1="99" x2="141" y2="99" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" />

              {/* Cute Happy Smiling Mouth */}
              <path
                d="M 94 100 Q 100 106 106 100"
                fill="none"
                stroke="#67e8f9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </g>
          ) : isBlinking ? (
            // Blinking horizontal neon line
            <g filter={`url(#${uid}-eye)`}>
              <line x1="68" y1="86" x2="88" y2="86" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
              <line x1="112" y1="86" x2="132" y2="86" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
            </g>
          ) : (
            // Cute smiling arc eyes
            <g filter={`url(#${uid}-eye)`}>
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
          <rect
            x="88"
            y="130"
            width="24"
            height="10"
            rx="4"
            fill="#082f49"
            stroke={isLove ? '#38bdf8' : '#06b6d4'}
            strokeWidth="1.5"
          />

          {/* --- ARMS --- */}
          {/* Left Arm */}
          <path
            d="M 54 150 C 44 155 40 170 42 186 C 44 194 50 196 54 192 C 58 186 58 174 58 162 Z"
            fill={`url(#${uid}-ear)`}
            stroke={isLove ? '#38bdf8' : '#06b6d4'}
            strokeWidth="2.5"
          />

          {/* Right Arm */}
          <path
            d="M 146 150 C 156 155 160 170 158 186 C 156 194 150 196 146 192 C 142 186 142 174 142 162 Z"
            fill={`url(#${uid}-ear)`}
            stroke={isLove ? '#38bdf8' : '#06b6d4'}
            strokeWidth="2.5"
          />

          {/* --- BODY / TORSO --- */}
          <rect
            x="58"
            y="138"
            width="84"
            height="72"
            rx="24"
            fill={`url(#${uid}-body)`}
            stroke={`url(#${uid}-border)`}
            strokeWidth="3"
          />

          {/* Chest Reactor Core with concentric glowing rings */}
          {/* Outer ring */}
          <circle
            cx="100"
            cy="174"
            r="19"
            fill="#020617"
            stroke={isLove ? '#38bdf8' : '#06b6d4'}
            strokeWidth="2.5"
          />
          {/* Middle ring */}
          <circle
            cx="100"
            cy="174"
            r="13"
            stroke={isLove ? '#7dd3fc' : '#38bdf8'}
            strokeWidth={isLove ? 2.2 : 1.8}
            opacity="0.95"
          />
          {/* Glowing Center Core */}
          <circle
            cx="100"
            cy="174"
            r={isLove ? 9 : 8}
            fill={`url(#${uid}-core)`}
            filter={`url(#${uid}-neon)`}
            className={isLove ? 'animate-pulse' : ''}
          />
          <circle cx="98" cy="172" r="3.5" fill="#ffffff" />

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
        @keyframes rexLoveJoy {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1.05);
          }
          25% {
            transform: translateY(-11px) rotate(-3deg) scale(1.07);
          }
          75% {
            transform: translateY(-6px) rotate(3deg) scale(1.07);
          }
        }
      `}</style>
    </div>
  );
};
