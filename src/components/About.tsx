import React from 'react';
import { User } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export const About: React.FC = () => {
  const highlights = [
    { value: '7', label: 'Deployed Web Apps' },
    { value: personalInfo.academic.sgpa, label: 'BCA SGPA' },
    { value: '3', label: 'Core Technical Domains' },
    { value: 'n8n + Docker', label: 'Automation Practice' },
  ];

  return (
    <section
      id="about"
      className="py-20 sm:py-28 border-b border-[var(--border-hairline)] scroll-mt-20"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-2 max-w-2xl">
          <div className="font-mono text-xs text-[var(--accent-text)] font-medium">
            About
          </div>
          <h2 className="heading-section font-bold text-[var(--text-primary)]">
            Practical software engineering backed by strong fundamentals.
          </h2>
        </div>

        {/* Two-Column Split: Short Bio + Portrait Photo Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-5 text-[var(--text-secondary)] text-base leading-relaxed">
            {personalInfo.aboutText.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? 'text-lg font-medium text-[var(--text-primary)]' : ''}
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-4 border-t border-[var(--border-hairline)] space-y-2">
              <div className="font-mono text-xs text-[var(--text-muted)]">
                Technical Focus Areas
              </div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-sm font-mono text-[var(--text-primary)]">
                {personalInfo.interests.map((interest, idx) => (
                  <React.Fragment key={interest}>
                    <span>{interest}</span>
                    {idx < personalInfo.interests.length - 1 && (
                      <span aria-hidden="true" className="text-[var(--accent-text)]">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Photo Placeholder Frame (ready to swap for real portrait photo) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] overflow-hidden">
              <div
                className="aspect-[4/3] bg-grid-architect flex flex-col items-center justify-center p-6 text-center relative border-b border-[var(--border-hairline)]"
                role="img"
                aria-label="Portrait photo placeholder for Rakesh Kumar Mondal"
              >
                <div className="w-20 h-20 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--accent-text)] mb-3">
                  <User className="w-9 h-9" />
                </div>
                <div className="font-heading font-semibold text-base text-[var(--text-primary)]">
                  {personalInfo.name}
                </div>
                <div className="font-mono text-xs text-[var(--text-muted)] mt-1">
                  [ADD YOUR PROFILE PHOTO]
                </div>
              </div>

              <div className="p-6 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[var(--text-muted)] font-mono text-xs">Degree</span>
                  <span className="font-medium text-[var(--text-primary)] text-right">
                    {personalInfo.academic.degree}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[var(--text-muted)] font-mono text-xs">Institution</span>
                  <span className="font-mono text-xs text-[var(--text-secondary)] text-right">
                    {personalInfo.academic.college}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[var(--text-muted)] font-mono text-xs">Location</span>
                  <span className="font-medium text-[var(--text-primary)] text-right">
                    {personalInfo.contact.location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Quick Verified Stats / Highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[var(--border-hairline)]">
          {highlights.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="font-heading font-bold text-2xl sm:text-3xl text-[var(--text-primary)] tabular-nums">
                {item.value}
              </div>
              <div className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
