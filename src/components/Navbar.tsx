import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Sparkles, Volume2, VolumeX, ArrowUpRight, Search } from 'lucide-react';
import { CommandPalette } from './CommandPalette';
import { Logo } from './Logo';
import { rexVoice } from '../utils/rexVoice';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  swarmActive: boolean;
  onToggleSwarm: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  swarmActive,
  onToggleSwarm,
  onOpenResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(!rexVoice.getMuted());
  const [activeSection, setActiveSection] = useState('home');

  // Sync mute state with rexVoice engine
  useEffect(() => {
    const unsubscribe = rexVoice.subscribeMuted((muted) => {
      setSoundActive(!muted);
    });
    return () => unsubscribe();
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'journey', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global keyboard shortcuts: ⌘K / Ctrl+K & Escape to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Achievements', href: '#achievements', id: 'achievements' },
  ];

  const handleOpenRex = () => {
    window.dispatchEvent(new CustomEvent('open-rex-chat'));
  };

  const handleToggleSound = () => {
    const nextSoundActive = !soundActive;
    rexVoice.setMuted(!nextSoundActive);
  };

  return (
    <>
      {/* Floating Island Header Container */}
      <header className="fixed top-0 left-0 right-0 z-40 py-2.5 sm:py-4 px-2.5 sm:px-4 pointer-events-none flex justify-center">
        <div className="pointer-events-auto w-full max-w-5xl mx-auto px-3 sm:px-5 py-2 rounded-full bg-white/95 dark:bg-[#070b16]/90 backdrop-blur-2xl border border-zinc-200 dark:border-cyan-500/25 shadow-xl shadow-black/10 dark:shadow-black/70 flex items-center justify-between gap-2 sm:gap-4 transition-colors duration-300">
          {/* Left Brand Identity */}
          <div className="flex items-center gap-2 shrink-0 min-w-0">
            <a
              href="#home"
              className="flex items-center gap-2 group focus:outline-none"
              title="Rakesh Kumar Mondal"
              aria-label="Rakesh Kumar Mondal Home"
            >
              <Logo size="sm" variant="icon" />

              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-heading font-bold text-xs text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors whitespace-nowrap">
                  Rakesh Kumar
                </span>
                <span className="font-heading font-semibold text-[10px] text-blue-600 dark:text-cyan-400 tracking-tight whitespace-nowrap">
                  Mondal
                </span>
              </div>
            </a>

            <span className="hidden md:inline-block font-mono text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold whitespace-nowrap select-none">
              · BCA · SGPA 9.65
            </span>
          </div>

          {/* Center Nav Links (Desktop) */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-5 text-xs font-heading font-medium text-zinc-600 dark:text-zinc-400">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`py-1 transition-colors relative whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-blue-600 dark:text-cyan-300 font-semibold'
                      : 'hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 dark:bg-cyan-400 rounded-full" />
                  )}
                </a>
              );
            })}

            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 font-heading font-bold text-xs transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-300 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title={soundActive ? 'Rex voice active (click to mute)' : 'Rex voice muted (click to unmute)'}
              aria-label={soundActive ? 'Mute Rex voice audio' : 'Unmute Rex voice audio'}
              aria-pressed={!soundActive}
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              )}
            </button>

            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900/90 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-zinc-200 dark:border-zinc-700/60 text-xs font-mono transition-all shadow-sm cursor-pointer group"
              title="Open Command Palette (⌘K / Ctrl+K)"
              aria-label="Open command palette"
            >
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-cyan-300">⌘</span>
              <span className="text-xs font-semibold">K</span>
            </button>

            <button
              onClick={handleOpenRex}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-heading font-bold shadow-sm shadow-cyan-500/20 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer whitespace-nowrap"
              title="Open Rex Assistant"
              aria-label="Open Rex Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-100" />
              <span className="hidden sm:inline">Rex Chat</span>
              <span className="sm:hidden">Rex</span>
            </button>

            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto lg:hidden fixed inset-x-3 top-[68px] bg-white/95 dark:bg-[#070b16]/95 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in zoom-in-95">
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-2 text-sm font-heading font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2.5 px-3 rounded-xl flex items-center justify-between border-b border-zinc-100 dark:border-zinc-900 ${
                    activeSection === link.id
                      ? 'text-blue-600 dark:text-cyan-400 font-bold bg-blue-50 dark:bg-cyan-950/30'
                      : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold text-center mt-1"
              >
                Contact Me
              </a>

              <div className="pt-2.5 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <button
                  onClick={() => {
                    setCommandPaletteOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 text-blue-600 dark:text-cyan-400 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Command (⌘K)</span>
                </button>
                <button
                  onClick={() => {
                    onOpenResume();
                    setMobileMenuOpen(false);
                  }}
                  className="text-zinc-900 dark:text-white hover:underline font-semibold cursor-pointer"
                >
                  View Resume
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Command Palette Spotlight Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenRex={handleOpenRex}
        onOpenResume={onOpenResume}
        onToggleTheme={onToggleTheme}
        onToggleSwarm={onToggleSwarm}
        isDark={isDark}
        swarmActive={swarmActive}
      />
    </>
  );
};
