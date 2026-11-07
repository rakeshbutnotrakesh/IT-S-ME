import React, { useState } from 'react';
import { Sparkles, Activity, MessageSquare } from 'lucide-react';
import { RexRobot } from './RexRobot';

interface RexHeroCardProps {
  onOpenChat?: () => void;
}

export const RexHeroCard: React.FC<RexHeroCardProps> = ({ onOpenChat }) => {
  const [bubbleText, setBubbleText] = useState<string | null>(null);

  const greetings = [
    "Hello human! I'm Rex, Rakesh's AI companion.",
    "Ready to explore automated Python workflows?",
    "Check out CyberSafe, FileForge, or LifeOS!",
    "Ask me anything about Rakesh's tech stack!"
  ];

  const handleRobotClick = () => {
    const random = greetings[Math.floor(Math.random() * greetings.length)];
    setBubbleText(random);
    setTimeout(() => {
      setBubbleText(null);
    }, 4500);

    if (onOpenChat) {
      onOpenChat();
    }
  };

  return (
    <div className="w-full max-w-[460px] mx-auto relative group">
      {/* Subtle Ambient Backlight Glow (Toned down) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-3xl blur-lg opacity-15 group-hover:opacity-25 transition duration-500 pointer-events-none" />

      {/* Main Glassmorphic Container Card */}
      <div className="relative z-10 w-full rounded-3xl bg-zinc-950/80 dark:bg-[#0a0f1d]/90 border border-cyan-500/20 hover:border-cyan-400/40 shadow-xl shadow-cyan-950/40 backdrop-blur-xl p-6 sm:p-7 flex flex-col items-center transition-all duration-300">
        {/* Card Header Bar (Exact match to reference screenshot) */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-zinc-800/80 font-mono text-xs">
          {/* Left: Title */}
          <div className="flex items-center gap-2 text-cyan-400 font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>REX // 2D FLOATING AI</span>
          </div>

          {/* Right: Status */}
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold tracking-wide text-[11px]">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>ONLINE 60FPS</span>
          </div>
        </div>

        {/* Floating Interactive Robot Canvas (Clean: no text over Rex) */}
        <div className="w-full py-8 sm:py-10 flex flex-col items-center justify-center relative min-h-[300px]">
          {/* Glowing Rex Robot Avatar */}
          <RexRobot
            size="lg"
            showParticles={true}
            interactive={true}
            onClick={handleRobotClick}
          />
        </div>

        {/* Bottom Interactive Ticker & Chat Trigger */}
        <div className="w-full pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{bubbleText || 'Hover or click Rex to chat'}</span>
          </div>

          <button
            onClick={handleRobotClick}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 hover:underline transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Open Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};
