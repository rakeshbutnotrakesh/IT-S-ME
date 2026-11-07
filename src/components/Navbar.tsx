import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Sparkles, Volume2, VolumeX, ArrowUpRight, Search, Bot } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { CommandPalette } from './CommandPalette';

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
  const [soundActive, setSoundActive] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

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

  // Global shortcut: ⌘K or Ctrl+K to open Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'AI Automations', href: '#projects', id: 'projects' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Journey', href: '#journey', id: 'journey' },
  ];

  const handleOpenRex = () => {
    window.dispatchEvent(new CustomEvent('open-rex-chat'));
  };

  return (
    <>
      {/* Floating Island Header Container */}
      <header className="fixed top-0 left-0 right-0 z-40 py-3 sm:py-4 px-3 sm:px-4 pointer-events-none flex justify-center">
        {/* Floating Island Capsule (Targeted UI Element) */}
        <div className="pointer-events-auto w-full max-w-5xl mx-auto px-3 sm:px-5 py-2 rounded-full bg-zinc-950/90 dark:bg-[#070b16]/90 backdrop-blur-2xl border border-zinc-800/80 dark:border-cyan-500/25 shadow-2xl shadow-black/70 flex items-center justify-between gap-2.5 sm:gap-4 transition-all duration-300">
          {/* Left Brand Identity: Avatar Monogram + Name + BCA Badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="#home"
              className="flex items-center gap-2.5 group focus:outline-none"
              title="Rakesh Kumar Mondal"
            >
              {/* Circular Glowing Monogram Pod */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shrink-0 shadow-sm shadow-cyan-500/25 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center font-heading font-extrabold text-[10px] text-cyan-300 tracking-wider">
                  RKM
                </div>
              </div>

              {/* Name Lockup: Rakesh Kumar Mondal */}
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="font-heading font-bold text-xs text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  Rakesh Kumar
                </span>
                <span className="font-heading font-semibold text-[10px] text-cyan-400 tracking-tight">
                  Mondal
                </span>
              </div>
            </a>

            {/* BCA '26 Pill Badge (Matches reference screenshot) */}
            <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-700/60 font-mono text-[10px] text-zinc-300 font-semibold select-none">
              BCA '26
            </span>
          </div>

          {/* Center Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-heading font-medium text-zinc-400">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`py-1 transition-colors relative whitespace-nowrap ${
                    isActive
                      ? 'text-cyan-300 font-semibold'
                      : 'hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400 rounded-full" />
                  )}
                </a>
              );
            })}

            {/* Distinct White Contact Pill Button (Matches reference screenshot) */}
            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-heading font-bold text-xs transition-colors shadow-sm whitespace-nowrap"
            >
              Contact
            </a>
          </nav>

          {/* Right Action Controls: Sound + Command (⌘K) + Rex AI + Settings */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Audio / Sound Ambiance Toggle */}
            <button
              onClick={() => setSoundActive(!soundActive)}
              className="p-1.5 rounded-full text-zinc-400 hover:text-cyan-300 hover:bg-white/5 transition-colors cursor-pointer"
              title={soundActive ? 'Sound active (click to mute)' : 'Sound muted (click to unmute)'}
              aria-label="Toggle audio effects"
            >
              {soundActive ? (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-zinc-500" />
              )}
            </button>

            {/* Command Palette Button (⌘K) */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 text-xs font-mono transition-all shadow-sm cursor-pointer group"
              title="Open Command Palette (⌘K / Ctrl+K)"
              aria-label="Command palette"
            >
              <span className="text-[11px] text-zinc-400 group-hover:text-cyan-300">⌘</span>
              <span className="text-xs font-semibold">K</span>
            </button>

            {/* Rex AI Gradient Pill Button */}
            <button
              onClick={handleOpenRex}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-heading font-bold shadow-md shadow-cyan-500/25 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer whitespace-nowrap"
              title="Open Rex AI Virtual Assistant"
              aria-label="Open Rex AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span className="hidden sm:inline">Rex AI</span>
              <span className="sm:hidden">Rex</span>
            </button>

            {/* Settings & Theme Switcher */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-full text-zinc-400 hover:text-amber-400 hover:bg-white/5 transition-colors cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-400" />
              )}
            </button>

            {/* Mobile Menu Trigger for Phone Screens */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="pointer-events-auto lg:hidden fixed inset-x-4 top-20 bg-zinc-950/95 dark:bg-[#070b16]/95 backdrop-blur-2xl border border-zinc-800 rounded-3xl p-5 shadow-2xl z-50 animate-in fade-in zoom-in-95">
            <nav className="flex flex-col gap-3 text-sm font-heading font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-xl flex items-center justify-between border-b border-zinc-900 ${
                    activeSection === link.id
                      ? 'text-cyan-400 font-bold bg-cyan-950/30'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50" />
                </a>
              ))}

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-white text-zinc-950 font-bold text-center"
              >
                Contact
              </a>

              <div className="pt-2 flex items-center justify-between border-t border-zinc-800 text-xs font-mono text-zinc-400">
                <button
                  onClick={() => {
                    setCommandPaletteOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 text-cyan-400"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Open Command (⌘K)</span>
                </button>
                <button
                  onClick={() => {
                    onOpenResume();
                    setMobileMenuOpen(false);
                  }}
                  className="text-white hover:underline"
                >
                  Resume
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
