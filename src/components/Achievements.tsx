import React from 'react';
import { Award, CheckCircle, ShieldCheck, Cpu, Code2, Globe } from 'lucide-react';
import { achievementsData } from '../data/achievements';
import { TypewriterText } from './TypewriterText';
import { MessageBlockTypewriter } from './MessageBlockTypewriter';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 md:py-32 border-t border-zinc-200 dark:border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header with Message Block Typing Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-white/10">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <span>//</span>
              <span>VERIFIED RECORDS</span>
            </div>
            <MessageBlockTypewriter
              as="h2"
              text="Academic & Developer Milestones"
              badgeLabel="VERIFICATION // CREDENTIALS"
              className="text-3xl sm:text-5xl font-heading font-bold text-zinc-900 dark:text-white tracking-tight"
              speed={20}
            />
          </div>

          <div className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md font-sans">
            Grounded strictly in verifiable academic records and hands-on technical milestones without fabricated accolades.
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
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-heading font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
                    {item.metric}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40">
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

              <div className="pt-3 border-t border-zinc-100 dark:border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Verified student record</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
