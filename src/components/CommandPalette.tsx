import React, { useState, useEffect } from 'react';
import { Search, X, ExternalLink, Moon, Sun, FileText, ArrowRight, Bot } from 'lucide-react';
import { projectsData } from '../data/projects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRex: () => void;
  onOpenResume: () => void;
  onToggleTheme: () => void;
  isDark: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenRex,
  onOpenResume,
  onToggleTheme,
  isDark,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = projectsData.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const completedCount = projectsData.filter((p) => p.status === 'Completed').length;

  const sections = [
    { name: 'Home', href: '#home', desc: 'Hero introduction & developer overview' },
    { name: 'About', href: '#about', desc: 'Bio, highlights & BCA degree (SGPA 9.65)' },
    { name: 'Skills', href: '#skills', desc: 'Languages, Frameworks & Tools' },
    { name: 'Projects', href: '#projects', desc: `Explore ${completedCount} live web apps & automation work` },
    { name: 'Education & Timeline', href: '#timeline', desc: 'BCA performance & development progression' },
    { name: 'Contact', href: '#contact', desc: 'Copy email, social links & contact form' },
  ].filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4 bg-black/65 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[var(--bg-canvas)] border border-[var(--border-strong)] rounded-2xl shadow-2xl overflow-hidden z-10">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[var(--border-hairline)] gap-3">
          <Search className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, sections, or actions..."
            autoFocus
            aria-label="Search portfolio commands"
            className="min-h-[44px] flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none font-sans"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-[var(--bg-surface)] text-[var(--text-muted)] rounded border border-[var(--border-hairline)]">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-4 text-xs font-sans">
          {/* Quick Actions */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              Quick Actions
            </div>

            <button
              type="button"
              onClick={() => handleSelect(onOpenRex)}
              className="w-full min-h-[44px] px-3 py-2.5 rounded-xl hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-hairline)] flex items-center justify-between text-left transition-colors text-[var(--text-primary)] group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-tint)] text-[var(--accent-text)] flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold group-hover:text-[var(--accent-text)]">
                    Ask Rex Portfolio Assistant
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)]">
                    Open interactive Q&amp;A assistant
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-text)]" />
            </button>

            <button
              type="button"
              onClick={() => handleSelect(onOpenResume)}
              className="w-full min-h-[44px] px-3 py-2.5 rounded-xl hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-hairline)] flex items-center justify-between text-left transition-colors text-[var(--text-primary)] group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-tint)] text-[var(--accent-text)] flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold group-hover:text-[var(--accent-text)]">
                    View / Print Resume
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)]">
                    BCA coursework (SGPA 9.65), skills &amp; projects
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-text)]" />
            </button>

            <button
              type="button"
              onClick={() => handleSelect(onToggleTheme)}
              className="w-full min-h-[44px] px-3 py-2.5 rounded-xl hover:bg-[var(--bg-surface)] border border-transparent hover:border-[var(--border-hairline)] flex items-center justify-between text-left transition-colors text-[var(--text-primary)] group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-secondary)] flex items-center justify-center shrink-0">
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-semibold">Toggle Color Theme</div>
                  <div className="text-[11px] text-[var(--text-muted)]">
                    Currently: {isDark ? 'Dark Mode' : 'Light Mode'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">Switch</span>
            </button>
          </div>

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                Projects ({filteredProjects.length})
              </div>
              {filteredProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.liveUrl || '#projects'}
                  target={project.liveUrl ? '_blank' : undefined}
                  rel={project.liveUrl ? 'noopener noreferrer' : undefined}
                  onClick={onClose}
                  className="w-full min-h-[44px] px-3 py-2 rounded-xl hover:bg-[var(--bg-surface)] flex items-center justify-between text-left transition-colors text-[var(--text-primary)] group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-tint)] text-[var(--accent-text)] flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {project.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold group-hover:text-[var(--accent-text)] flex items-center gap-2 flex-wrap">
                        <span>{project.name}</span>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">
                          · {project.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] line-clamp-1">
                        {project.description}
                      </div>
                    </div>
                  </div>
                  {project.liveUrl ? (
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-text)] shrink-0 ml-2" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-text)] shrink-0 ml-2" />
                  )}
                </a>
              ))}
            </div>
          )}

          {/* Section Navigation */}
          {sections.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                Jump to Section
              </div>
              {sections.map((sec) => (
                <a
                  key={sec.name}
                  href={sec.href}
                  onClick={onClose}
                  className="w-full min-h-[44px] px-3 py-2 rounded-xl hover:bg-[var(--bg-surface)] flex items-center justify-between text-left transition-colors text-[var(--text-primary)] group"
                >
                  <div>
                    <div className="font-semibold group-hover:text-[var(--accent-text)]">
                      {sec.name}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">
                      {sec.desc}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent-text)] shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Footer Hint Bar */}
        <div className="px-4 py-2.5 bg-[var(--bg-surface)] border-t border-[var(--border-hairline)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
          <span>Press ESC to dismiss</span>
          <span>Shortcut: ⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
};
