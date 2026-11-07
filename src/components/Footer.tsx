import React from 'react';
import { ArrowUp, Bot, Sparkles, Github, Globe } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { Logo } from './Logo';

interface FooterProps {
  onToggleSwarm: () => void;
  swarmActive: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onToggleSwarm, swarmActive }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090b] text-xs font-mono text-zinc-500 dark:text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand & Title */}
          <div>
            <a href="#home" className="block focus:outline-none">
              <Logo size="md" />
            </a>
          </div>

          {/* Quick Actions & Links */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onToggleSwarm}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Swarm Motion: {swarmActive ? 'ON' : 'OFF'}</span>
            </button>

            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>

            <a
              href={personalInfo.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">·</span>

            <button
              onClick={scrollToTop}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-blue-500" />
            </button>
          </div>
        </div>

        {/* Bottom Baseline Row */}
        <div className="pt-6 border-t border-zinc-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Built with React 19, TypeScript, Tailwind CSS &amp; Rex AI Companion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
