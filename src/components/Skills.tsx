import React, { useState } from 'react';
import { Code2, Globe, Wrench } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { MessageBlockTypewriter } from './MessageBlockTypewriter';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const icons = [Code2, Globe, Wrench];

  const filteredCategories = activeCategory === 'All'
    ? skillCategories
    : skillCategories.filter(c => c.title === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-zinc-200 dark:border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header with Message Block Typing Animation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-white/10">
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-semibold">
              Technical Skills
            </div>
            <MessageBlockTypewriter
              as="h2"
              text="Programming, Web Development & Developer Tools"
              badgeLabel="SYSTEM // CAPABILITIES"
              className="text-2xl sm:text-4xl lg:text-5xl font-heading font-bold text-zinc-900 dark:text-white tracking-tight text-balance"
              speed={20}
            />
          </div>

          <div className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md font-sans">
            Core programming languages, modern frontend engineering technologies, and workflow tools used across coursework and practical builds.
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1" role="tablist" aria-label="Skill categories">
          <button
            role="tab"
            aria-selected={activeCategory === 'All'}
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 border cursor-pointer ${
              activeCategory === 'All'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-semibold'
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-white/10'
            }`}
          >
            All Categories
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.title}
              role="tab"
              aria-selected={activeCategory === cat.title}
              onClick={() => setActiveCategory(cat.title)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 border cursor-pointer ${
                activeCategory === cat.title
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm font-semibold'
                  : 'bg-zinc-100 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:bg-zinc-200 dark:hover:bg-white/10'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Consistent Categorized Skills Grid */}
        <div className={`grid gap-6 ${activeCategory === 'All' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 max-w-2xl'}`}>
          {filteredCategories.map((cat) => {
            const categoryIndex = skillCategories.findIndex(c => c.title === cat.title);
            const Icon = icons[categoryIndex % icons.length];
            return (
              <div
                key={cat.title}
                className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/10 shadow-sm flex flex-col justify-between space-y-5 hover:border-blue-500/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-zinc-900 dark:text-white">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans mt-1 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Skill Items */}
                  <ul className="flex flex-wrap gap-2 pt-1">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/70 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-zinc-200 text-xs font-mono font-medium"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-zinc-100 dark:border-white/5 text-[11px] font-mono text-zinc-500 dark:text-zinc-400 tabular-nums">
                  {cat.skills.length} verified technologies
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
