import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-11 h-11' : 'w-9 h-9';
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Representative Developer Emblem Pod (RKM) */}
      <div className={`relative ${iconSize} shrink-0`}>
        {/* Soft Ambient Cyan/Blue Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-500 rounded-xl blur-md opacity-35 group-hover:opacity-75 transition-all duration-500 animate-pulse" />

        {/* Outer Hex/Squircle Cyber Container */}
        <div className="relative w-full h-full rounded-xl bg-zinc-950 border border-cyan-500/30 group-hover:border-cyan-400 p-1 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105">
          <svg
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="rkmCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>

              <linearGradient id="rkmCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              <filter id="rkmGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Circuit Grid Marks */}
            <path
              d="M 6 14 L 14 6 M 38 30 L 30 38 M 22 4 L 22 8 M 22 36 L 22 40"
              stroke="rgba(6, 182, 212, 0.25)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Left Bracket < (Code / Web Developer Identity) */}
            <path
              d="M 11 15 L 7 22 L 11 29"
              stroke="url(#rkmCyanGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Right Bracket > (Code / Web Developer Identity) */}
            <path
              d="M 33 15 L 37 22 L 33 29"
              stroke="url(#rkmCyanGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Central Stylized Monogram: Interlocking 'R' and 'M' */}
            {/* The 'R' Stem and Loop */}
            <path
              d="M 15 13 L 15 31 M 15 14 L 22 14 C 24.5 14 25.5 15.8 25.5 18 C 25.5 20.2 24.5 22 22 22 L 15 22"
              stroke="url(#rkmCyanGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* The Diagonal Leg bridging into 'K' / 'M' */}
            <path
              d="M 20.5 22 L 26.5 31"
              stroke="url(#rkmCyanGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* Right 'M' Crest Accent */}
            <path
              d="M 23 15 L 26.5 22 L 29 17 L 29 31"
              stroke="url(#rkmCyanGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Active Live Energy Node (Top Right) */}
            <circle
              cx="33"
              cy="10"
              r="2.5"
              fill="url(#rkmCoreGrad)"
              filter="url(#rkmGlow)"
              className="animate-pulse"
            />
            <circle cx="33" cy="10" r="1.2" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* Brand Typographic Lockup (Rakesh Kumar Mondal) */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`font-heading font-extrabold tracking-tight text-zinc-900 dark:text-white uppercase transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:via-cyan-400 group-hover:to-teal-300 ${textSize}`}
            >
              RAKESH
            </span>
            <span
              className={`font-heading font-bold tracking-tight text-cyan-500 dark:text-cyan-400 uppercase ${textSize}`}
            >
              KUMAR MONDAL
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1 text-cyan-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
              <span>BCA</span>
            </span>
            <span>·</span>
            <span>Software &amp; Automation Developer</span>
          </div>
        </div>
      )}
    </div>
  );
};
