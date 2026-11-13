import React from 'react';
import { journeyMilestones } from '../data/journey';
import { ScrollReveal } from './ScrollReveal';

export const Timeline: React.FC = () => {
  return (
    <section
      id="timeline"
      className="py-20 sm:py-24 border-b border-[var(--border)] scroll-mt-20"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-3">
            <div className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--accent)] font-medium">
              04 / LEARNING
            </div>
            <h2 className="heading-section font-bold text-[var(--text-primary)]">
              Always learning. Always building.
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              A steady progression from foundational programming concepts to modern web engineering and workflow automation.
            </p>
          </div>

          {/* Right Vertical Timeline */}
          <div className="lg:col-span-8 relative pl-7 sm:pl-9 space-y-5">
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-3 bottom-3 w-px bg-[var(--border-strong)]"
            />

            {journeyMilestones.map((milestone, index) => (
              <ScrollReveal
                key={milestone.title}
                delay={Math.min(index, 4) * 40}
                direction="up"
              >
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-7 sm:-left-9 top-6 w-[15px] h-[15px] rounded-full border-2 border-[var(--accent)] bg-[var(--bg-canvas)]"
                  />

                  <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 sm:p-6 space-y-2 transition-colors duration-150 hover:border-[var(--border-strong)]">
                    <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                      <span className="text-[var(--accent)] font-medium tabular-nums">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{milestone.category}</span>
                    </div>

                    <h3 className="font-heading font-semibold text-base sm:text-lg text-[var(--text-primary)]">
                      {milestone.title}
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {milestone.summary}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
