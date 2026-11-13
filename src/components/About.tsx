import React from 'react';
import { portfolioConfig } from '../config/portfolioConfig';

export const About: React.FC = () => {
  const details = [
    { label: 'Name', value: portfolioConfig.profile.name },
    { label: 'Education', value: portfolioConfig.education.degree },
    { label: 'Academic Achievement', value: portfolioConfig.education.academicAchievement },
    { label: 'Focus', value: portfolioConfig.education.focus },
    { label: 'Location', value: portfolioConfig.education.location },
  ];

  return (
    <section
      id="about"
      className="py-20 sm:py-24 border-b border-[var(--border)] scroll-mt-20"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-2">
          <div className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--accent)] font-medium">
            01 / ABOUT
          </div>
          <h2 className="heading-section font-bold text-[var(--text-primary)]">
            A little about me.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Narrative Bio */}
          <div className="lg:col-span-7 space-y-4 text-base text-[var(--text-secondary)] leading-relaxed">
            {portfolioConfig.profile.aboutParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? 'text-[var(--text-primary)] font-medium' : ''}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right: Compact Information Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] px-6 py-2">
              <dl className="divide-y divide-[var(--border)]">
                {details.map((item) => (
                  <div
                    key={item.label}
                    className="py-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4"
                  >
                    <dt className="font-mono text-xs text-[var(--text-muted)] shrink-0">
                      {item.label}
                    </dt>
                    <dd className="text-sm font-medium text-[var(--text-primary)] sm:text-right">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
