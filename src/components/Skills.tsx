import React from 'react';
import { Terminal, Layers, Wrench, Cpu } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { ScrollReveal } from './ScrollReveal';
import { TiltSpotlightCard } from './TiltSpotlightCard';

export const Skills: React.FC = () => {
  const icons = [Terminal, Layers, Wrench];
  const allSkills = skillCategories.flatMap((cat) => cat.skills.map((s) => s.name));

  return (
    <section
      id="skills"
      className="py-20 sm:py-28 border-b border-[var(--border-hairline)] scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="font-mono text-xs text-[var(--accent-text)] font-medium">
              02 &middot; Technical Stack
            </div>
            <h2 className="heading-section font-bold text-[var(--text-primary)]">
              Languages, Frameworks &amp; Automation Tools
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md">
            Core tools applied daily across client-side cryptography, interactive UI engineering, and Dockerized workflow automation.
          </p>
        </div>

        {/* Smooth Infinite Horizontal Tech Marquee (pauses on hover, static wrap under reduced-motion) */}
        <div
          className="marquee-wrapper relative overflow-hidden rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] py-3.5"
          aria-label="Scrolling technology stack ribbon"
        >
          <div className="animate-marquee items-center gap-6 px-4">
            {[...allSkills, ...allSkills].map((tech, idx) => (
              <div
                key={`${tech}-${idx}`}
                className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono font-medium text-[var(--text-primary)] whitespace-nowrap shrink-0"
              >
                <Cpu className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                <span>{tech}</span>
                <span aria-hidden="true" className="text-[var(--text-muted)] pl-3">&middot;</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Column Grouped Tech Grid (No Fake Percentage Bars) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = icons[index % icons.length];
            return (
              <ScrollReveal key={category.title} delay={index * 70} direction="up">
                <TiltSpotlightCard className="h-full" enableTilt={false}>
                  <div className="h-full p-6 flex flex-col justify-between space-y-6">
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
                            className="px-3 py-1.5 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-xs font-mono font-medium text-[var(--text-primary)] hover:border-[var(--accent)]/60 hover:-translate-y-0.5 transition-all duration-150"
                          >
                            {skill.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[var(--border-hairline)] font-mono text-xs text-[var(--text-muted)] tabular-nums">
                      {category.skills.length} core technologies
                    </div>
                  </div>
                </TiltSpotlightCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
