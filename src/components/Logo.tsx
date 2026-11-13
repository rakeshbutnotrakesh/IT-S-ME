import React, { useId } from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon';
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  showText = true,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const emblemGradId = `rkmEmblemGrad-${uid}`;
  const coreGlowId = `rkmCoreGlow-${uid}`;
  const ringGradId = `rkmRingGrad-${uid}`;
  const bloomFilterId = `bloomFilter-${uid}`;

  // Determine dimensions based on size prop
  const iconDimensions = {
    xs: 'w-7 h-7',
    sm: 'w-8 h-8 sm:w-9 sm:h-9',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const primaryTextSize = {
    xs: 'text-xs',
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
    xl: 'text-lg sm:text-xl',
  }[size];

  const subTextSize = {
    xs: 'text-[9px]',
    sm: 'text-[10px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-xs font-medium',
  }[size];

  const shouldRenderText = variant === 'full' && showText;

  return (
    <div className={`flex items-center gap-3 group select-none cursor-pointer ${className}`}>
      {/* Representative Emblem Mark */}
      <div className={`relative ${iconDimensions} shrink-0`}>
        {/* Subtle Backlight Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-500 rounded-full blur-md opacity-25 group-hover:opacity-55 transition-opacity duration-300" />

        {/* Outer Circular Cyber Emblem Frame */}
        <div className="relative w-full h-full rounded-full bg-[#070b16] border border-cyan-500/40 group-hover:border-cyan-300 p-[2px] flex items-center justify-center shadow-md shadow-cyan-950/40 transition-transform duration-300 group-hover:scale-105">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={emblemGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="45%" stopColor="#22d3ee" />
                <stop offset="80%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>

              <radialGradient id={coreGlowId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#38bdf8" />
                <stop offset="75%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#082f49" />
              </radialGradient>

              <linearGradient id={ringGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
              </linearGradient>

              <filter id={bloomFilterId} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <circle
              cx="50"
              cy="50"
              r="46"
              stroke={`url(#${ringGradId})`}
              strokeWidth="1.6"
              strokeDasharray="9 4 3 4"
              className="opacity-70 group-hover:rotate-45 transition-transform duration-700"
              style={{ transformOrigin: '50px 50px' }}
            />

            <circle cx="50" cy="50" r="41" fill="#080d1a" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" />

            <path
              d="M 20 50 L 26 50 M 74 50 L 80 50 M 50 20 L 50 26 M 50 74 L 50 80"
              stroke="rgba(6, 182, 212, 0.35)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            <path
              d="M 22 41 L 16 50 L 22 59"
              stroke={`url(#${emblemGradId})`}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60 group-hover:opacity-100 transition-opacity"
            />

            <path
              d="M 78 41 L 84 50 L 78 59"
              stroke={`url(#${emblemGradId})`}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60 group-hover:opacity-100 transition-opacity"
            />

            <path
              d="M 28 26 C 28 24.5 29.2 23.5 30.8 23.5 L 36.5 23.5 C 38 23.5 39 24.5 39 26 L 39 74 C 39 75.5 38 76.5 36.5 76.5 L 30.8 76.5 C 29.2 76.5 28 75.5 28 74 Z"
              fill={`url(#${emblemGradId})`}
            />

            <path
              d="M 39 24 L 54 24 C 63.5 24 70.5 30.5 70.5 39.5 C 70.5 47.8 64.2 54 55 54.5 L 39 54.5 Z M 48 33.5 L 48 45.5 L 53.5 45.5 C 57.5 45.5 60.5 43 60.5 39.5 C 60.5 36 57.5 33.5 53.5 33.5 Z"
              fill={`url(#${emblemGradId})`}
            />

            <path
              d="M 48 51.5 L 61 74 C 61.8 75.5 63.5 76.5 65.5 76.5 L 71 76.5 C 72.8 76.5 73.8 74.8 72.8 73.2 L 60.8 51.5 Z"
              fill={`url(#${emblemGradId})`}
            />

            <path
              d="M 60 55 L 67 43.5 C 68 42 70 42 71 43.5 L 78 55 L 78 74 C 78 75.5 76.8 76.5 75.2 76.5 L 71.5 76.5 C 70 76.5 69 75.5 69 74 L 69 57 L 65.5 51.5 Z"
              fill={`url(#${emblemGradId})`}
            />

            <circle
              cx="70.5"
              cy="39.5"
              r="3.5"
              fill={`url(#${coreGlowId})`}
              filter={`url(#${bloomFilterId})`}
            />
            <circle cx="70.5" cy="39.5" r="1.5" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* Brand Typographic Lockup (Rakesh Kumar Mondal) */}
      {shouldRenderText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`font-heading font-extrabold tracking-tight text-zinc-900 dark:text-white uppercase transition-colors duration-300 ${primaryTextSize}`}
            >
              Rakesh Kumar
            </span>
            <span
              className={`font-heading font-bold tracking-tight text-blue-600 dark:text-cyan-400 uppercase ${primaryTextSize}`}
            >
              Mondal
            </span>
          </div>

          <div className={`flex items-center gap-1.5 ${subTextSize} font-mono text-zinc-600 dark:text-zinc-400`}>
            <span className="text-blue-700 dark:text-cyan-400 font-semibold">
              BCA · SGPA 9.65
            </span>
            <span aria-hidden="true">·</span>
            <span>Software &amp; Automation</span>
          </div>
        </div>
      )}
    </div>
  );
};
