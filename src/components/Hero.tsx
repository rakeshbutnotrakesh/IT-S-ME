import React from 'react';
import { FileText, Send, Code2, ArrowRight, GraduationCap } from 'lucide-react';
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
    <section id="home" className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 md:pt-36 md:pb-28 overflow-hidden bg-grid-tech">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Clear Developer Identity & Working CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Compact Profile Strip (5-second clarity + professional avatar monogram) */}
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white font-heading font-extrabold text-sm tracking-tight flex items-center justify-center shadow-md shadow-blue-600/20 shrink-0"
                aria-hidden="true"
              >
                {personalInfo.displayInitials}
              </div>
              <div className="min-w-0">
                <div className="text-lg sm:text-xl font-heading font-bold text-zinc-900 dark:text-white tracking-tight truncate">
                  {personalInfo.name}
                </div>
                <div className="text-xs sm:text-sm font-mono text-blue-600 dark:text-cyan-400 font-medium flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="inline-flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                    <span>BCA Student · SGPA {personalInfo.academic.sgpa}</span>
                  </span>
                  <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">·</span>
                  <span className="text-zinc-600 dark:text-zinc-400">{personalInfo.contact.location}</span>
                </div>
              </div>
            </div>

            {/* Professional Title & Main Headline */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400 tracking-wide">
                {personalInfo.title}
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] text-balance">
                Building Practical Web Apps{' '}
                <span className="text-blue-600 dark:text-cyan-400">
                  &amp; Automation Software.
                </span>
              </h1>
            </div>

            {/* Concise Introduction */}
            <p className="text-sm sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl font-sans">
              I&apos;m <strong className="font-semibold text-zinc-900 dark:text-white">{personalInfo.name}</strong>, a Bachelor of Computer Applications student exploring Python, full-stack web engineering, cybersecurity, and n8n workflow automation to turn practical ideas into reliable tools.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs sm:text-sm font-heading font-bold rounded-full transition-colors shadow-md flex items-center gap-2 group"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>

              <a
                href="#contact"
                className="px-5 py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 text-xs sm:text-sm font-heading font-semibold rounded-full transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>Contact Me</span>
              </a>

              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-white hover:bg-zinc-100 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 rounded-full text-xs sm:text-sm font-mono transition-colors flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Utility Actions Row */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm font-mono text-zinc-600 dark:text-zinc-400">
              <button
                type="button"
                onClick={onOpenResume}
                className="hover:text-blue-600 dark:hover:text-cyan-400 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </button>

              <span aria-hidden="true">·</span>

              <button
                type="button"
                onClick={openRexChat}
                className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer"
              >
                Ask Rex Assistant
              </button>
            </div>
          </div>

          {/* Right Column: Rex Interactive 2D Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <RexHeroCard onOpenChat={openRexChat} />
          </div>
        </div>
      </div>
    </section>
  );
};
