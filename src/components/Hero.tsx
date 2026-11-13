import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail, MessageSquare, Cpu, ShieldCheck, Layers, ArrowUpRight } from 'lucide-react';
import { portfolioConfig } from '../config/portfolioConfig';
import { MagneticButton } from './MagneticButton';
import { AnimatedCounter } from './AnimatedCounter';
import { downloadResumeOffline } from '../utils/resumeDownload';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Subtle GPU parallax offsets for floating editorial spec tags on scroll
  const chipFloatA = useTransform(scrollYProgress, [0, 1], [0, -26]);
  const chipFloatB = useTransform(scrollYProgress, [0, 1], [0, 22]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % portfolioConfig.profile.rotatingRoles.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  const openRexChat = () => {
    window.dispatchEvent(new CustomEvent('open-rex-chat'));
  };

  const handleResumeAction = async () => {
    await downloadResumeOffline();
    onOpenResume();
    setDownloadFeedback('Resume saved & summary opened');
    window.setTimeout(() => setDownloadFeedback(null), 3000);
  };

  const headlineWords = portfolioConfig.profile.heroHeadline.split(' ');

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden bg-grid-architect border-b border-[var(--border-hairline)] scroll-mt-20"
    >
      {/* Subtle Paper / Film Grain Overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-noise-overlay" />

      {/* Warm Editorial Vermilion-to-Amber Ambient Light */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.42, 0.65, 0.42], scale: [1, 1.03, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-40 right-[-10%] w-[780px] h-[420px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side at 40% 45%, var(--accent-glow), transparent 72%), radial-gradient(closest-side at 72% 55%, var(--secondary-tint), transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-14 sm:pt-22 sm:pb-20 lg:pt-24 lg:pb-24 relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Split-Text Headline Reveal, Rotating Focus, Magnetic CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm text-[var(--accent-text)] font-medium">
              <span className="inline-block w-5 h-[2px] accent-gradient-bg" aria-hidden="true" />
              <span>{portfolioConfig.profile.name}</span>
              <span aria-hidden="true" className="text-[var(--text-muted)]">&middot;</span>
              <span className="text-[var(--text-secondary)]">
                {portfolioConfig.profile.rotatingRoles[roleIndex]}
              </span>
            </div>

            <h1 className="heading-hero font-extrabold text-[var(--text-primary)]">
              {headlineWords.map((word, idx) => {
                const lower = word.toLowerCase();
                const isAccent = lower.includes('fast') || lower.includes('automated');
                return (
                  <motion.span
                    key={`${word}-${idx}`}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                    className={`inline-block mr-[0.26em] ${isAccent ? 'accent-gradient-text' : ''}`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
              {portfolioConfig.profile.heroSubheadline}
            </p>

            {/* Primary & Secondary Magnetic CTAs (>= 44px) */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <MagneticButton>
                <a
                  href="#projects"
                  className="min-h-[48px] px-6 py-3 rounded-xl accent-gradient-bg font-semibold text-sm text-white inline-flex items-center gap-2 shadow-md hover:opacity-95 transition-opacity whitespace-nowrap"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <button
                  type="button"
                  onClick={handleResumeAction}
                  className="min-h-[48px] px-6 py-3 rounded-xl font-medium text-sm border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4 text-[var(--accent-text)]" />
                  <span>Download Resume</span>
                </button>
              </MagneticButton>
            </div>

            {downloadFeedback && (
              <p role="status" className="text-xs font-mono text-[var(--accent-text)]">
                {downloadFeedback}
              </p>
            )}

            {/* Direct Social Links & Rex Assistant */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href={portfolioConfig.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${portfolioConfig.profile.name} GitHub Profile`}
                title={`GitHub (@${portfolioConfig.contact.githubUsername})`}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={portfolioConfig.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${portfolioConfig.profile.name} LinkedIn Profile`}
                title="LinkedIn Profile"
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${portfolioConfig.contact.email}`}
                aria-label={`Email ${portfolioConfig.contact.email}`}
                title={portfolioConfig.contact.email}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={openRexChat}
                className="min-h-[44px] px-3.5 inline-flex items-center gap-2 rounded-xl text-xs font-mono border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                <span>Ask Rex</span>
              </button>
            </div>
          </div>

          {/* Right Column: Swiss-Editorial Studio Dossier Card + Parallax Spec Chips */}
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ y: chipFloatA }}
              className="hidden sm:flex items-center gap-2 absolute -top-4 -left-4 z-20 px-3.5 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] shadow-lg text-xs font-mono text-[var(--text-primary)]"
            >
              <Cpu className="w-3.5 h-3.5 text-[var(--accent-text)]" />
              <span>n8n · Docker</span>
            </motion.div>

            <motion.div
              style={{ y: chipFloatB }}
              className="hidden sm:flex items-center gap-2 absolute -bottom-4 -right-3 z-20 px-3.5 py-2 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] shadow-lg text-xs font-mono text-[var(--text-primary)]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-end)]" />
              <span>Web Crypto · Canvas</span>
            </motion.div>

            <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[var(--border-hairline)] bg-[var(--bg-subtle)]/50 flex items-center justify-between">
                <span className="font-mono text-xs font-medium text-[var(--text-primary)]">
                  Engineering Dossier
                </span>
                <span className="font-mono text-xs text-[var(--accent-text)] tabular-nums">
                  {portfolioConfig.education.expectedGraduation} Cohort
                </span>
              </div>

              <dl className="divide-y divide-[var(--border-hairline)] px-6 text-sm">
                <div className="py-4 flex items-start justify-between gap-4">
                  <dt className="font-mono text-xs text-[var(--text-muted)] shrink-0 pt-0.5">
                    Degree
                  </dt>
                  <dd className="text-right font-medium text-[var(--text-primary)]">
                    BCA · {portfolioConfig.education.college}
                  </dd>
                </div>

                <div className="py-4 flex items-start justify-between gap-4">
                  <dt className="font-mono text-xs text-[var(--text-muted)] shrink-0 pt-0.5">
                    Primary Stack
                  </dt>
                  <dd className="text-right font-mono text-xs sm:text-sm text-[var(--text-primary)]">
                    React · TypeScript · Python
                  </dd>
                </div>

                <div className="py-4 flex items-start justify-between gap-4">
                  <dt className="font-mono text-xs text-[var(--text-muted)] shrink-0 pt-0.5">
                    Automation
                  </dt>
                  <dd className="text-right font-mono text-xs sm:text-sm text-[var(--text-primary)]">
                    Docker · n8n · Webhooks
                  </dd>
                </div>

                <div className="py-4 flex items-start justify-between gap-4">
                  <dt className="font-mono text-xs text-[var(--text-muted)] shrink-0 pt-0.5">
                    Focus
                  </dt>
                  <dd className="text-right text-[var(--text-secondary)]">
                    Zero-upload security &amp; practical UIs
                  </dd>
                </div>

                <div className="py-4 flex items-center justify-between gap-4">
                  <dt className="font-mono text-xs text-[var(--text-muted)]">
                    Availability
                  </dt>
                  <dd className="font-mono text-xs font-semibold text-emerald-500">
                    Open to internships &amp; roles
                  </dd>
                </div>
              </dl>

              <div className="px-6 py-4 border-t border-[var(--border-hairline)] bg-[var(--bg-subtle)]/35 flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                  <span>
                    Quick menu{' '}
                    <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-elevated)] text-[var(--text-primary)]">
                      ⌘K
                    </kbd>
                  </span>
                </span>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-[var(--accent-text)] hover:underline font-medium"
                >
                  <span>Start a conversation</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Key Proof Counters Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[var(--border-hairline)]">
          {portfolioConfig.stats.map((stat) => (
            <AnimatedCounter
              key={stat.id}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
