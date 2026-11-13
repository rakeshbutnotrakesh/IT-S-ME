import React from 'react';
import { journeyMilestones } from '../data/journey';
import { achievementsData } from '../data/achievements';
import { ScrollReveal } from './ScrollReveal';

export const Timeline: React.FC = () => {
  return (
    <section
      id="timeline"
      className="py-20 sm:py-28 border-b border-[var(--border-hairline)] scroll-mt-20"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="font-mono text-xs text-[var(--accent-text)] font-medium">
              Education &amp; Achievements
            </div>
            <h2 className="heading-section font-bold text-[var(--text-primary)]">
              Academic Foundation &amp; Technical Progression
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] max-w-md">
            Verified BCA performance (9.65 SGPA), live Vercel deployments, and my step-by-step progression into full-stack web apps and automation.
          </p>
        </div>

        {/* Highlighted Verified Records Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievementsData.slice(0, 3).map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 70} direction="up">
              <div className="h-full rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-heading font-bold text-2xl sm:text-3xl text-[var(--accent-text)] tabular-nums">
                    {item.metric}
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-base text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Clean Vertical Progression Timeline */}
        <div className="relative pl-7 sm:pl-9 space-y-6">
          <span
            aria-hidden="true"
            className="absolute left-[7px] top-3 bottom-3 w-px bg-[var(--border-hairline)]"
          />

          {journeyMilestones.map((milestone, index) => (
            <ScrollReveal key={milestone.title} delay={Math.min(index, 4) * 50} direction="up">
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-7 sm:-left-9 top-6 w-3.5 h-3.5 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-canvas)]"
                />

                <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 sm:p-6 space-y-3 hover:border-[var(--border-strong)] transition-colors duration-200">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                    <span className="text-[var(--accent-text)] font-medium tabular-nums">
                      Step {String(index + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{milestone.category}</span>
                  </div>

                  <h3 className="font-heading font-semibold text-lg text-[var(--text-primary)]">
                    {milestone.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {milestone.summary}
                  </p>

                  {milestone.keyLearnings.length > 0 && (
                    <ul className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-xs text-[var(--text-muted)]">
                      {milestone.keyLearnings.map((learning) => (
                        <li key={learning} className="flex items-start gap-2">
                          <span aria-hidden="true" className="text-[var(--accent-text)]">&rarr;</span>
                          <span>{learning}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
