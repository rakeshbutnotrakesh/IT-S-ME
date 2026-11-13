import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { journeyMilestones } from '../data/journey';
import { achievementsData } from '../data/achievements';
import { ScrollReveal } from './ScrollReveal';
import { TiltSpotlightCard } from './TiltSpotlightCard';

export const Timeline: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 75%', 'end 75%'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="timeline"
      className="py-20 sm:py-28 border-b border-[var(--border-hairline)] scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Part A: Certifications & Hands-On Achievements (No Scores / Marks) */}
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <div className="font-mono text-xs text-[var(--accent-text)] font-medium">
                04 &middot; Certifications &amp; Proof
              </div>
              <h2 className="heading-section font-bold text-[var(--text-primary)]">
                Hands-On Engineering Achievements
              </h2>
            </div>
            <p className="text-sm text-[var(--text-secondary)] max-w-md">
              Demonstrated capability through deployed applications, client-side security implementations, and self-hosted automation systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievementsData.map((item, idx) => {
              const hasRealUrl =
                item.credentialUrl && !item.credentialUrl.includes('[');

              return (
                <ScrollReveal key={item.id} delay={idx * 65} direction="up">
                  <TiltSpotlightCard enableTilt={false} className="h-full">
                    <div className="h-full p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-heading font-bold text-xl sm:text-2xl accent-gradient-text tabular-nums">
                            {item.metric}
                          </span>
                          <span className="font-mono text-xs text-[var(--text-muted)]">
                            {item.badge} &middot; {item.year}
                          </span>
                        </div>

                        <h3 className="font-heading font-semibold text-base sm:text-lg text-[var(--text-primary)]">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between gap-3 font-mono text-xs text-[var(--text-muted)]">
                        <span className="inline-flex items-center gap-1.5 truncate">
                          <Award className="w-3.5 h-3.5 text-[var(--accent-text)] shrink-0" />
                          <span className="truncate">{item.issuer}</span>
                        </span>
                        {hasRealUrl ? (
                          <a
                            href={item.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[var(--accent-text)] hover:underline shrink-0"
                          >
                            <span>Verify</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : item.credentialUrl ? (
                          <span className="text-[var(--text-muted)] shrink-0">
                            {item.credentialUrl}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </TiltSpotlightCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Part B: Sticky Split Chronology + Self-Drawing Vermilion-to-Amber Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-3">
            <div className="font-mono text-xs text-[var(--accent-text)] font-medium">
              05 &middot; Engineering Chronology
            </div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[var(--text-primary)]">
              Technical Progression
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              From foundational C/C++ memory discipline and algorithmic problem-solving to self-hosted Docker automation and browser-local security utilities.
            </p>
          </div>

          <div ref={trackRef} className="lg:col-span-8 relative pl-7 sm:pl-10 space-y-6">
            {/* Static background hairline rail */}
            <span
              aria-hidden="true"
              className="absolute left-[7px] top-3 bottom-3 w-[2px] bg-[var(--border-hairline)] rounded-full"
            />
            {/* Self-drawing scroll-linked vermilion-to-amber rail */}
            <motion.span
              aria-hidden="true"
              style={{ scaleY }}
              className="absolute left-[7px] top-3 bottom-3 w-[2px] origin-top accent-gradient-bg rounded-full"
            />

            {journeyMilestones.map((milestone, index) => (
              <ScrollReveal key={milestone.title} delay={Math.min(index, 4) * 45} direction="up">
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-7 sm:-left-10 top-6 w-4 h-4 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-canvas)] shadow-sm"
                  />

                  <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 sm:p-6 space-y-3 hover:border-[var(--accent)]/50 transition-colors duration-200">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                      <span className="text-[var(--accent-text)] font-semibold tabular-nums">
                        Step {String(index + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true">&middot;</span>
                      <span>{milestone.category}</span>
                    </div>

                    <h4 className="font-heading font-semibold text-lg text-[var(--text-primary)]">
                      {milestone.title}
                    </h4>

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
      </div>
    </section>
  );
};
