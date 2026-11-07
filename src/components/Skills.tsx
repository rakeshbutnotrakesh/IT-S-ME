import React, { useState } from 'react';
import { Code2, Globe, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { TypewriterText } from './TypewriterText';
import { MessageBlockTypewriter } from './MessageBlockTypewriter';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const icons = [Code2, Globe, Wrench, Sparkles];

  const filteredCategories = activeCategory === 'All'
    ? skillCategories
    : skillCategories.filter(c => c.title === activeCategory);

  return (
    <section id="skills" className="py-24 md:py-32 border-t border-zinc-200 dark:border-white/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Header with Message Block Typing Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-white/10">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
              <span>//</span>
              <span>TECHNICAL COMPETENCIES</span>
            </div>
            <MessageBlockTypewriter
              as="h2"
              text="Programming Languages, Web & Automation Stack"
              badgeLabel="SYSTEM // CAPABILITIES"
              className="text-3xl sm:text-5xl font-heading font-bold text-zinc-900 dark:text-white tracking-tight"
              speed={20}
            />
          </div>

          <div className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md font-sans">
            A solid programming core in C, C++, and Python combined with modern web frameworks and workflow automation tools.
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap border ${
              activeCategory === 'All'
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 font-semibold'
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-white/10'
            }`}
          >
            All Skills
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(cat.title)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap border ${
                activeCategory === cat.title
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 font-semibold'
                  : 'bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-white/10'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((cat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={cat.title}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 shadow-sm space-y-5 hover:border-blue-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-zinc-900 dark:text-white">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Skill Badges / Tags */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-white/5 text-zinc-800 dark:text-zinc-200 text-xs font-mono font-medium flex items-center gap-2 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
