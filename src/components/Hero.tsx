import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, User } from 'lucide-react';
import { portfolioConfig } from '../config/portfolioConfig';

export const Hero: React.FC = () => {
  const [hasResumePdf, setHasResumePdf] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(portfolioConfig.contact.resumePdfPath, { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        if (active && res.ok && contentType.includes('pdf')) {
          setHasResumePdf(true);
        }
      })
      .catch(() => {
        // Only display Download Resume when an actual static PDF file exists
      });
    return () => {
      active = false;
    };
  }, []);

  const showPhoto = Boolean(portfolioConfig.profile.avatarUrl) && !imgFailed;

  return (
    <section
      id="home"
      className="border-b border-[var(--border)] scroll-mt-20"
    >
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Side: Introductory Label, Headline, Description, Role & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-[var(--accent)] font-medium">
              {portfolioConfig.profile.heroKicker}
            </p>

            <h1 className="heading-hero font-extrabold text-[var(--text-primary)]">
              {portfolioConfig.profile.heroHeadlinePrefix}{' '}
              <span className="text-[var(--accent)]">
                {portfolioConfig.profile.heroHeadlineAccent}
              </span>
              {portfolioConfig.profile.heroHeadlineSuffix}
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
              {portfolioConfig.profile.heroDescription}
            </p>

            <p className="text-sm font-medium text-[var(--text-primary)]">
              {portfolioConfig.profile.roleLine}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <a
                href="#projects"
                className="min-h-[46px] px-6 py-3 rounded-lg text-sm font-medium inline-flex items-center gap-2 transition-colors duration-150 whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--accent-btn-bg, var(--accent))',
                  color: 'var(--accent-fg)',
                }}
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="min-h-[46px] px-6 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-sm font-medium text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors duration-150 inline-flex items-center whitespace-nowrap"
              >
                Get In Touch
              </a>

              {hasResumePdf && (
                <a
                  href={portfolioConfig.contact.resumePdfPath}
                  download="Rakesh_Kumar_Mondal_Resume.pdf"
                  className="min-h-[46px] px-5 py-3 rounded-lg border border-[var(--border)] bg-transparent text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap"
                >
                  <Download className="w-4 h-4 text-[var(--accent)]" />
                  <span>Download Resume</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Side: Profile Presentation + Minimal Geometric Details + Tech Labels */}
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 sm:p-6 space-y-5">
              {showPhoto ? (
                <div className="space-y-3.5">
                  <div className="relative aspect-[5/5] rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] overflow-hidden">
                    <img
                      src={portfolioConfig.profile.avatarUrl}
                      alt={`${portfolioConfig.profile.name} portrait`}
                      width={640}
                      height={640}
                      decoding="async"
                      fetchPriority="high"
                      referrerPolicy="no-referrer"
                      onError={() => setImgFailed(true)}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-heading font-semibold text-base text-[var(--text-primary)]">
                      {portfolioConfig.profile.name}
                    </span>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {portfolioConfig.education.location}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  className="relative aspect-[4/3] rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] bg-grid-architect flex flex-col items-center justify-center p-6 text-center"
                  role="img"
                  aria-label={`Profile photo placeholder for ${portfolioConfig.profile.name}`}
                >
                  <span aria-hidden="true" className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[var(--border-strong)]" />
                  <span aria-hidden="true" className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[var(--border-strong)]" />
                  <span aria-hidden="true" className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[var(--border-strong)]" />
                  <span aria-hidden="true" className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[var(--border-strong)]" />

                  <div className="w-20 h-20 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] flex items-center justify-center text-[var(--accent)] mb-3">
                    <User className="w-8 h-8 stroke-[1.75]" />
                  </div>

                  <div className="font-heading font-semibold text-base text-[var(--text-primary)]">
                    {portfolioConfig.profile.name}
                  </div>
                  <div className="font-mono text-[11px] text-[var(--text-muted)] mt-1">
                    {portfolioConfig.profile.avatarPlaceholderLabel}
                  </div>
                </div>
              )}

              {/* Clean Subtle Technology Labels */}
              <div className="pt-2 border-t border-[var(--border)] space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
                  <span>Core Stack</span>
                  <span>{portfolioConfig.education.degree.includes('Bachelor') ? 'BCA' : ''}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {portfolioConfig.profile.heroTechLabels.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--bg-canvas)] font-mono text-xs text-[var(--text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
