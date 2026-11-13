import React from 'react';
import { CheckCircle } from 'lucide-react';
import { achievementsData } from '../data/achievements';
import { MessageBlockTypewriter } from './MessageBlockTypewriter';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-20 md:py-28 border-t border-zinc-200 dark:border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header with Message Block Typing Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-white/10">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-semibold">
              Verified Records
            </div>
            <MessageBlockTypewriter
              as="h2"
              text="Academic & Developer Milestones"
              badgeLabel="VERIFICATION // CREDENTIALS"
              className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-zinc-900 dark:text-white tracking-tight text-balance"
              speed={20}
            />
          </div>

          <div className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md font-sans">
            Grounded strictly in actual academic performance (SGPA 9.65) and deployed technical work without fabricated accolades.
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementsData.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 shadow-sm space-y-4 hover:border-blue-500/40 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-3xl sm:text-4xl font-heading font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
                    {item.metric}
                  </span>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {item.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    {item.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Verified portfolio record</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
