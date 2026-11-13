import React, { useState, useEffect } from 'react';
import { Search, X, ExternalLink, Moon, Sun, Sparkles, FileText, ArrowRight, Bot } from 'lucide-react';
import { projectsData } from '../data/projects';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRex: () => void;
  onOpenResume: () => void;
  onToggleTheme: () => void;
  onToggleSwarm: () => void;
  isDark: boolean;
  swarmActive: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenRex,
  onOpenResume,
  onToggleTheme,
  onToggleSwarm,
  isDark,
  swarmActive,
}) => {
  const [query, setQuery] = useState('');

  // Close on Escape
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

  const filteredProjects = projectsData.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const completedCount = projectsData.filter((p) => p.status === 'Completed').length;

  const sections = [
    { name: 'Home', href: '#home', desc: 'Top introduction & Rex interactive companion' },
    { name: 'About', href: '#about', desc: 'BCA education, SGPA 9.65 & core interests' },
    { name: 'Skills', href: '#skills', desc: 'Programming, Web Development & Tools' },
    { name: 'Projects', href: '#projects', desc: `Explore ${completedCount} completed apps & automation work` },
    { name: 'Journey', href: '#journey', desc: 'Academic & technical milestones' },
    { name: 'Achievements', href: '#achievements', desc: 'Verified academic & developer records' },
    { name: 'Contact', href: '#contact', desc: 'Get in touch via email or message draft' },
  ].filter((s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.desc.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white dark:bg-[#0a0f1d] border border-zinc-200 dark:border-cyan-500/30 rounded-2xl shadow-2xl shadow-black/25 dark:shadow-cyan-950/80 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-200 dark:border-zinc-800 gap-3">
          <Search className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, sections, tools, or actions..."
            autoFocus
            aria-label="Search portfolio commands"
            className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none font-sans"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded border border-zinc-200 dark:border-zinc-700">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-4 text-xs font-sans">
          {/* Quick Actions */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
              Quick Actions
            </div>
            <button
              onClick={() => handleSelect(onOpenRex)}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-blue-50 dark:hover:bg-cyan-950/40 border border-transparent flex items-center justify-between text-left transition-all text-zinc-900 dark:text-white group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold group-hover:text-blue-600 dark:group-hover:text-cyan-300">
                    Ask Rex Portfolio Assistant
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Open interactive chat assistant
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400" />
            </button>

            <button
              onClick={() => handleSelect(onOpenResume)}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent flex items-center justify-between text-left transition-all text-zinc-900 dark:text-white group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-300">
                    View / Print Resume
                  </div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    BCA coursework (SGPA 9.65), skills &amp; projects
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
            </button>

            <button
              onClick={() => handleSelect(onToggleTheme)}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent flex items-center justify-between text-left transition-all text-zinc-900 dark:text-white group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-semibold">Toggle Color Theme</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Currently: {isDark ? 'Dark Mode' : 'Light Mode'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Switch</span>
            </button>

            <button
              onClick={() => handleSelect(onToggleSwarm)}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-transparent flex items-center justify-between text-left transition-all text-zinc-900 dark:text-white group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold">Toggle Particle Motion</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Background canvas: {swarmActive ? 'Active' : 'Paused'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Switch</span>
            </button>
          </div>

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Projects ({filteredProjects.length})
              </div>
              {filteredProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.liveUrl || '#projects'}
                  target={project.liveUrl ? '_blank' : undefined}
                  rel={project.liveUrl ? 'noopener noreferrer' : undefined}
                  onClick={onClose}
                  className="w-full px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-between text-left transition-all text-zinc-900 dark:text-white group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {project.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold group-hover:text-blue-600 dark:group-hover:text-cyan-300 flex items-center gap-2 flex-wrap">
                        <span>{project.name}</span>
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                            project.status === 'Completed'
                              ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-400'
                              : 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-400'
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                        {project.description}
                      </div>
                    </div>
                  </div>
                  {project.liveUrl ? (
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 shrink-0 ml-2" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 shrink-0 ml-2" />
                  )}
                </a>
              ))}
            </div>
          )}

          {/* Section Navigation */}
          {sections.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Jump to Section
              </div>
              {sections.map((sec) => (
                <a
                  key={sec.name}
                  href={sec.href}
                  onClick={onClose}
                  className="w-full px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-between text-left transition-all text-zinc-900 dark:text-white group"
                >
                  <div>
                    <div className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-300">
                      {sec.name}
                    </div>
                    <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {sec.desc}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Footer Hint Bar */}
        <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Press ESC to dismiss</span>
          <span>Shortcut: ⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
};
