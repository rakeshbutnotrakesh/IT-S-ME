import React from 'react';
import { ArrowDown, FileText, Send, Sparkles, Zap, Code2, ArrowRight } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { RexHeroCard } from './RexHeroCard';

interface HeroProps {
  onOpenResume: () => void;
  swarmActive: boolean;
  onToggleSwarm: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const openRexChat = () => {
    window.dispatchEvent(new CustomEvent('open-rex-chat'));
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-tech">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Personal Introduction & Actions (Matches reference screenshot) */}
          <div className="lg:col-span-7 space-y-7">
            {/* Top Status Badges Row */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              {/* Badge 1: Location & Mission */}
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-medium shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Building AI Automations &amp; Software in India</span>
              </span>

              {/* Badge 2: Rex AI Companion Active (Clickable to open Rex) */}
              <button
                onClick={openRexChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/50 text-cyan-300 font-medium transition-colors shadow-sm cursor-pointer"
                title="Click to interact with Rex"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Rex AI Companion Active</span>
              </button>
            </div>

            {/* Headline (Featuring Rakesh Kumar Mondal) */}
            <div className="space-y-2">
              <div className="text-xs sm:text-sm font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                <span className="text-blue-500 font-bold">&gt;</span>
                <span className="text-white font-heading tracking-wide">Rakesh Kumar Mondal</span>
                <span className="text-zinc-500">·</span>
                <span className="text-cyan-400 font-mono text-xs">Developer Portfolio</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
                Building Practical AI <br className="hidden sm:inline" />
                Automations <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-300">
                  &amp; Software Solutions.
                </span>
              </h1>
            </div>

            {/* Introduction Copy */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal max-w-2xl font-sans">
              I'm <span className="font-semibold text-white">Rakesh Kumar Mondal</span>, a BCA student exploring Python development, AI-powered workflows, API integrations, and software engineering fundamentals. I build practical projects that automate repetitive tasks and solve real problems.
            </p>

            {/* Action Buttons Row 1 (Matches reference screenshot) */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-3.5">
              {/* White Pill Button: View Projects -> */}
              <a
                href="#projects"
                className="px-6 py-3.5 bg-white text-zinc-950 hover:bg-zinc-100 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 text-xs sm:text-sm font-heading font-bold rounded-full transition-all shadow-lg shadow-white/10 flex items-center gap-2 group hover:scale-[1.02]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Cyan Border Button: ⚡ AI Automation Projects */}
              <a
                href="#projects"
                className="px-5 py-3.5 bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-500/50 hover:border-cyan-400 text-xs sm:text-sm font-heading font-semibold rounded-full transition-all flex items-center gap-2 shadow-sm shadow-cyan-950/40"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>AI Automation Projects</span>
              </a>

              {/* GitHub Button */}
              <a
                href="https://github.com/rakeshbutnotrakesh"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 rounded-full text-xs sm:text-sm font-mono transition-colors flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-zinc-400" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Action Buttons Row 2 (Secondary Actions) */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400">
              <a
                href="#contact"
                className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </a>

              <span>·</span>

              <button
                onClick={onOpenResume}
                className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          {/* Right Column: Rex 2D Floating AI Card (Exact match to reference screenshot) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <RexHeroCard onOpenChat={openRexChat} />
          </div>
        </div>
      </div>
    </section>
  );
};
