import React, { useState, useEffect } from 'react';
import { Search, X, Zap, Code2, ExternalLink, Moon, Sun, Sparkles, FileText, ArrowRight, Bot } from 'lucide-react';
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

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // handled by parent or window
        }
      }
      if (e.key === 'Escape' && isOpen) {
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

  const sections = [
    { name: 'Home', href: '#home', desc: 'Top introduction & Rex AI 2D avatar' },
    { name: 'About', href: '#about', desc: 'Background, values & approach' },
    { name: 'Skills', href: '#skills', desc: 'Programming, web, tools & automation' },
    { name: 'Projects', href: '#projects', desc: 'Explore all 6 deployed live applications' },
    { name: 'Journey', href: '#journey', desc: 'Academic & technical milestones' },
    { name: 'Achievements', href: '#achievements', desc: 'Verified academic highlights' },
    { name: 'Contact', href: '#contact', desc: 'Get in touch via email or message' },
  ].filter((s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.desc.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl bg-zinc-950 dark:bg-[#0a0f1d] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/80 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 gap-3">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search projects, sections, tools..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none font-sans"
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-400 rounded border border-zinc-700">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-1"
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
              className="w-full px-3 py-2.5 rounded-xl hover:bg-cyan-950/40 hover:border-cyan-500/30 border border-transparent flex items-center justify-between text-left transition-all text-white group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-zinc-100 group-hover:text-cyan-300">
                    Ask Rex AI Companion
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Open interactive portfolio assistant
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400" />
            </button>

            <button
              onClick={() => handleSelect(onOpenResume)}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-zinc-900 border border-transparent flex items-center justify-between text-left transition-all text-white group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-zinc-100 group-hover:text-blue-300">
                    Download / View Resume
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Open verified academic credentials &amp; background
                  </div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400" />
            </button>

            <button
              onClick={() => handleSelect(onToggleTheme)}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-zinc-900 border border-transparent flex items-center justify-between text-left transition-all text-white group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <div>
                  <div className="font-semibold text-zinc-100">
                    Toggle Color Theme
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Currently: {isDark ? 'Dark Mode' : 'Light Mode'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Toggle</span>
            </button>

            <button
              onClick={() => handleSelect(onToggleSwarm)}
              className="w-full px-3 py-2.5 rounded-xl hover:bg-zinc-900 border border-transparent flex items-center justify-between text-left transition-all text-white group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-zinc-100">
                    Toggle Antigravity Particle Motion
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Interactive canvas: {swarmActive ? 'Active' : 'Paused'}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Toggle</span>
            </button>
          </div>

          {/* Deployed Live Projects */}
          {filteredProjects.length > 0 && (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                Live Projects ({filteredProjects.length})
              </div>
              {filteredProjects.map((project) => (
                <a
                  key={project.id}
                  href={project.liveUrl || '#projects'}
                  target={project.liveUrl ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="w-full px-3 py-2 rounded-xl hover:bg-zinc-900 flex items-center justify-between text-left transition-all text-white group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
                      {project.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-zinc-100 group-hover:text-cyan-300 flex items-center gap-2">
                        <span>{project.name}</span>
                        {project.status === 'Live' && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-900/60 text-emerald-400 border border-emerald-500/30">
                            LIVE
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-400 line-clamp-1">
                        {project.description}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 shrink-0" />
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
                  className="w-full px-3 py-2 rounded-xl hover:bg-zinc-900 flex items-center justify-between text-left transition-all text-white group"
                >
                  <div>
                    <div className="font-semibold text-zinc-100 group-hover:text-blue-300">
                      {sec.name}
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {sec.desc}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Footer Hint Bar */}
        <div className="px-4 py-2.5 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Press ESC or click outside to dismiss</span>
          <span>Tip: Press ⌘K or Ctrl+K anywhere</span>
        </div>
      </div>
    </div>
  );
};
