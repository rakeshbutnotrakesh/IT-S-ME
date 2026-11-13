import React from 'react';
import { User, GraduationCap, MapPin, Wrench } from 'lucide-react';
import { portfolioConfig } from '../config/portfolioConfig';

export const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 border-b border-[var(--border-hairline)] scroll-mt-20"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2 max-w-2xl">
          <div className="font-mono text-xs text-[var(--accent-text)] font-medium">
            01 &middot; About
          </div>
          <h2 className="heading-section font-bold text-[var(--text-primary)]">
            Practical software engineering backed by shipped builds.
          </h2>
        </div>

        {/* Two-Column Split: Narrative Bio + Framed Editorial Portrait Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 text-[var(--text-secondary)] text-base leading-relaxed">
            <div className="space-y-5">
              {portfolioConfig.profile.aboutParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0 ? 'text-lg font-medium text-[var(--text-primary)]' : ''}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Clean Education Block — Degree, College, Expected Graduation Year (Zero Scores) */}
            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--accent-text)] font-medium">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>Education</span>
              </div>
              <p className="text-sm sm:text-base font-medium text-[var(--text-primary)]">
                {portfolioConfig.education.degree} &middot; {portfolioConfig.education.college} &middot; Expected Graduation: {portfolioConfig.education.expectedGraduation}
              </p>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                Focus: {portfolioConfig.education.focus}
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <div className="font-mono text-xs text-[var(--text-muted)]">
                Engineering Focus Areas
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-sm font-mono text-[var(--text-primary)]">
                {portfolioConfig.profile.interests.map((interest, idx) => (
                  <React.Fragment key={interest}>
                    <span>{interest}</span>
                    {idx < portfolioConfig.profile.interests.length - 1 && (
                      <span aria-hidden="true" className="text-[var(--accent-text)]">&middot;</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Studio Portrait Placeholder Card */}
          <div className="lg:col-span-5">
            <div className="h-full rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden flex flex-col justify-between">
              <div
                className="flex-1 min-h-[260px] bg-grid-architect flex flex-col items-center justify-center p-8 text-center relative border-b border-[var(--border-hairline)]"
                role="img"
                aria-label={`Portrait placeholder for ${portfolioConfig.profile.name}`}
              >
                <div className="w-24 h-24 rounded-full border-2 border-[var(--accent)]/40 bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--accent-text)] mb-4 shadow-md">
                  <User className="w-10 h-10" />
                </div>
                <div className="font-heading font-semibold text-lg text-[var(--text-primary)]">
                  {portfolioConfig.profile.name}
                </div>
                <div className="font-mono text-xs text-[var(--text-muted)] mt-1">
                  {portfolioConfig.profile.avatarPlaceholderLabel}
                </div>
              </div>

              <div className="p-6 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[var(--text-muted)] font-mono text-xs inline-flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                    <span>Primary Track</span>
                  </span>
                  <span className="font-medium text-[var(--text-primary)] text-right">
                    Web Apps &amp; Automation
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[var(--text-muted)] font-mono text-xs inline-flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                    <span>Location</span>
                  </span>
                  <span className="font-medium text-[var(--text-primary)] text-right">
                    {portfolioConfig.education.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
