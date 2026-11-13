import React from 'react';
import { ArrowUp, Github, Linkedin } from 'lucide-react';
import { portfolioConfig } from '../config/portfolioConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 bg-[var(--bg-canvas)] text-xs text-[var(--text-muted)]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 text-center sm:text-left">
          <span className="font-medium text-[var(--text-primary)]">
            RKM<span className="text-[var(--accent)]">.</span> &copy; 2026 {portfolioConfig.profile.name}.
          </span>
          <span aria-hidden="true" className="hidden sm:inline">&middot;</span>
          <span>Designed with curiosity. Built with code.</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={portfolioConfig.contact.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-2 inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href={portfolioConfig.contact.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-2 inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="min-h-[44px] px-2 inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[var(--accent)]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
