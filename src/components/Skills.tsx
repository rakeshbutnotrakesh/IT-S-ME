import React from 'react';
import { Terminal, Layers, Wrench } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { ScrollReveal } from './ScrollReveal';

export const Skills: React.FC = () => {
  const icons = [Terminal, Layers, Wrench];

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 border-b border-[var(--border-hairline)] scroll-mt-20"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="font-mono text-xs text-[var(--accent-text)] font-medium">
              Skills
            </div>
            <h2 className="heading-section font-bold text-[var(--text-primary)]">
              Languages, Frameworks &amp; Developer Tools
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md">
            Core technologies applied across computer science coursework, deployed web interfaces, and workflow automation experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = icons[index % icons.length];
            return (
              <ScrollReveal key={category.title} delay={index * 80} direction="up">
                <div className="h-full rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 flex flex-col justify-between space-y-6 hover:border-[var(--border-strong)] transition-colors duration-200">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--accent-text)] shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-[var(--text-primary)]">
                        {category.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {category.description}
                    </p>

                    <ul className="flex flex-wrap gap-2 pt-1">
                      {category.skills.map((skill) => (
                        <li
                          key={skill.name}
                          className="px-3 py-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-xs font-mono font-medium text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors duration-150"
                        >
                          {skill.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-hairline)] font-mono text-xs text-[var(--text-muted)] tabular-nums">
                    {category.skills.length} technologies
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
