import React from 'react';
import { ArrowUp, Github } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 bg-[var(--bg-canvas)] text-xs font-mono text-[var(--text-muted)]">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          &copy; {new Date().getFullYear()} {personalInfo.name}.
        </div>

        <div className="flex items-center gap-4">
          <a
            href={personalInfo.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-2 inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="min-h-[44px] px-2 inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors duration-150 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[var(--accent-text)]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
