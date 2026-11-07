import React from 'react';
import { GitBranch, Terminal, Globe, Code2, Cpu, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { journeyMilestones } from '../data/journey';
import { TypewriterText } from './TypewriterText';
import { MessageBlockTypewriter } from './MessageBlockTypewriter';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-24 md:py-32 border-t border-zinc-200 dark:border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Section Header with Message Block Typing Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-white/10">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <span>//</span>
              <span>LEARNING ROAD &amp; PROGRESSION</span>
            </div>
            <MessageBlockTypewriter
              as="h2"
              text="Development Journey & Technical Evolution"
              badgeLabel="LOGS // CHRONOLOGY"
              className="text-3xl sm:text-5xl font-heading font-bold text-zinc-900 dark:text-white tracking-tight"
              speed={20}
            />
          </div>

          <div className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md font-sans">
            A continuous trajectory of building foundations in low-level programming, exploring modern frontend stacks, and mastering workflow automation.
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-blue-500/30 dark:border-blue-500/20 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-10">
          {journeyMilestones.map((milestone, index) => (
            <div key={milestone.title} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-blue-600 dark:border-blue-400 group-hover:scale-125 transition-transform" />

              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 shadow-sm space-y-3 group-hover:border-blue-500/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">
                    Step {String(index + 1).padStart(2, '0')} · {milestone.category}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-zinc-900 dark:text-white">
                  {milestone.title}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 font-sans leading-relaxed">
                  {milestone.summary}
                </p>

                {milestone.keyLearnings && milestone.keyLearnings.length > 0 && (
                  <div className="pt-2 border-t border-zinc-100 dark:border-white/5 space-y-1.5">
                    <div className="text-[11px] font-mono uppercase text-zinc-400">
                      Core Topics Explored:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                      {milestone.keyLearnings.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">&rarr;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
