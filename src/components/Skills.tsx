import React from 'react';
import { Terminal, Code2, Wrench, Compass } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { ScrollReveal } from './ScrollReveal';

export const Skills: React.FC = () => {
  const iconMap = {
    programming: Terminal,
    web: Code2,
    tools: Wrench,
    interests: Compass,
  };

  return (
    <section
      id="skills"
      className="py-20 sm:py-24 border-b border-[var(--border)] scroll-mt-20"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2 max-w-2xl">
          <div className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--accent)] font-medium">
            03 / TECHNOLOGIES
          </div>
          <h2 className="heading-section font-bold text-[var(--text-primary)]">
            Tools I work with.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.key];
            return (
              <ScrollReveal key={category.title} delay={index * 50} direction="up">
                <div className="h-full rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[var(--accent)] shrink-0" />
                      <h3 className="font-heading font-semibold text-lg text-[var(--text-primary)]">
                        {category.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <ul className="flex flex-wrap gap-2 pt-1">
                    {category.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--bg-canvas)] font-mono text-xs text-[var(--text-primary)]"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
