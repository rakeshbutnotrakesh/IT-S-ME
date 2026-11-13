import React, { useState, useEffect } from 'react';
import { ArrowRight, Download, Github, Mail, MessageSquare } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

interface HeroProps {
  onOpenResume: () => void;
}

const ROTATING_ROLES = [
  'Web Applications',
  'Workflow Automation',
  'Security Utilities',
];

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, []);

  const openRexChat = () => {
    window.dispatchEvent(new CustomEvent('open-rex-chat'));
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-grid-architect border-b border-[var(--border-hairline)] scroll-mt-20"
    >
      {/* Subtle Top Radial Accent Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[780px] h-[360px] rounded-full blur-3xl opacity-60"
        style={{ background: 'radial-gradient(closest-side, var(--accent-glow), transparent)' }}
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Subtitle, Dual CTAs & Social Icons */}
          <div className="lg:col-span-7 space-y-6">
            {/* Subtle Animated Code-Style Role Line */}
            <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-[var(--accent-text)] font-medium">
              <span>Software Developer</span>
              <span aria-hidden="true" className="text-[var(--text-muted)]">·</span>
              <span className="transition-opacity duration-300">{ROTATING_ROLES[roleIndex]}</span>
            </div>

            <h1 className="heading-hero font-bold text-[var(--text-primary)]">
              I build fast web apps and practical workflow automation.
            </h1>

            <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Designing React &amp; TypeScript interfaces, Python utilities, and Docker + n8n automation pipelines—supported by a BCA degree (9.65 SGPA).
            </p>

            {/* Primary & Secondary Action Buttons (>= 44px touch targets) */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="min-h-[44px] px-6 py-3 rounded-lg font-medium text-sm text-[var(--accent-fg)] transition-all duration-200 inline-flex items-center gap-2 shadow-sm hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="min-h-[44px] px-6 py-3 rounded-lg font-medium text-sm border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[var(--accent-text)]" />
                <span>Download Resume</span>
              </button>
            </div>

            {/* Social Icons & Interactive Assistant */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rakesh Kumar Mondal GitHub Profile"
                title="GitHub (@rakeshbutnotrakesh)"
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors duration-200"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.contact.email}`}
                aria-label={`Email ${personalInfo.contact.email}`}
                title={personalInfo.contact.email}
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={openRexChat}
                className="min-h-[44px] px-3.5 inline-flex items-center gap-2 rounded-lg text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors duration-200 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[var(--accent-text)]" />
                <span>Ask Rex Assistant</span>
              </button>
            </div>
          </div>

          {/* Right Column: Clean Code-Style Profile Summary Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[var(--border-hairline)] font-mono text-xs text-[var(--text-secondary)]">
                <span>developer.config.ts</span>
                <span className="text-[var(--accent-text)] tabular-nums">7 Live Apps</span>
              </div>

              <pre className="font-mono text-xs sm:text-[13px] leading-6 text-[var(--text-secondary)] overflow-x-auto no-scrollbar">
                <code>
                  <span className="text-[var(--accent-text)]">export const</span>{' '}
                  <span className="text-[var(--text-primary)] font-medium">developer</span> = {'{\n'}
                  {'  '}name: <span className="text-[var(--text-primary)]">&quot;Rakesh Kumar Mondal&quot;</span>,{'\n'}
                  {'  '}focus: <span className="text-[var(--text-primary)]">&quot;Web Apps &amp; Automation&quot;</span>,{'\n'}
                  {'  '}stack: [<span className="text-[var(--text-primary)]">&quot;React&quot;</span>, <span className="text-[var(--text-primary)]">&quot;TypeScript&quot;</span>, <span className="text-[var(--text-primary)]">&quot;Python&quot;</span>],{'\n'}
                  {'  '}tooling: [<span className="text-[var(--text-primary)]">&quot;Docker&quot;</span>, <span className="text-[var(--text-primary)]">&quot;n8n&quot;</span>, <span className="text-[var(--text-primary)]">&quot;Git&quot;</span>],{'\n'}
                  {'  '}degree: <span className="text-[var(--text-primary)]">&quot;BCA (9.65 SGPA)&quot;</span>,{'\n'}
                  {'  '}location: <span className="text-[var(--text-primary)]">&quot;India&quot;</span>,{'\n'}
                  {'}'};
                </code>
              </pre>

              <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-mono">
                <span>Press <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-subtle)] text-[var(--text-primary)]">⌘K</kbd> to navigate</span>
                <a
                  href="#contact"
                  className="text-[var(--accent-text)] hover:underline font-medium"
                >
                  Open to roles &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
