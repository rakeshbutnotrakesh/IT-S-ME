import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, Sliders, ArrowUpRight } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeaderProps {
  config: SiteConfig;
  swarmActive: boolean;
  onToggleSwarm: () => void;
  onOpenBuilder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  swarmActive,
  onToggleSwarm,
  onOpenBuilder,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    ...(config.preferences.showExperience ? [{ label: 'Experience', href: '#experience' }] : []),
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090909]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Display Face, Single Text Element) */}
        <a
          href="#"
          className="text-2xl sm:text-3xl font-display tracking-wider text-[#f2efeb] hover:text-[#e32b3c] transition-colors whitespace-nowrap shrink-0"
        >
          {config.identity.displayName}
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#a09c9a]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#f2efeb] transition-colors whitespace-nowrap shrink-0 relative py-1 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e32b3c] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Action Controls (Motion Button + Builder) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Prompt specified: Include a "Motion" button at the top that triggers the animation when clicked */}
          <button
            onClick={onToggleSwarm}
            className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-md transition-all flex items-center gap-2 whitespace-nowrap shrink-0 border ${
              swarmActive
                ? 'bg-[#e32b3c] text-white border-[#e32b3c] shadow-md shadow-[#e32b3c]/20'
                : 'bg-white/5 text-[#f2efeb] border-white/15 hover:bg-white/10 hover:border-white/30'
            }`}
            title="Toggle Swarm Antigravity interactive motion effect"
            aria-label="Toggle Swarm motion animation"
          >
            <Sparkles className={`w-3.5 h-3.5 ${swarmActive ? 'animate-spin' : 'text-[#e32b3c]'}`} />
            <span>Motion {swarmActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Builder Customizer Toggle */}
          <button
            onClick={onOpenBuilder}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#a09c9a] hover:text-[#f2efeb] hover:bg-white/5 rounded-md border border-transparent hover:border-white/10 transition-colors whitespace-nowrap shrink-0"
            title="Customize Portfolio Configuration"
          >
            <Sliders className="w-3.5 h-3.5 text-[#e32b3c]" />
            <span>Customize</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#f2efeb] hover:text-[#e32b3c] transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-[#090909]/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 shadow-2xl transition-all">
          <nav className="flex flex-col gap-5 text-lg font-medium text-[#f2efeb]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-[#e32b3c] transition-colors flex items-center justify-between border-b border-white/5"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#a09c9a]" />
              </a>
            ))}
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => {
                  onToggleSwarm();
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-3 text-xs font-mono uppercase tracking-wider rounded-md border text-center transition-all ${
                  swarmActive
                    ? 'bg-[#e32b3c] text-white border-[#e32b3c]'
                    : 'bg-white/5 text-[#f2efeb] border-white/20'
                }`}
              >
                Swarm Motion: {swarmActive ? 'Active' : 'Off'}
              </button>
              <button
                onClick={() => {
                  onOpenBuilder();
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-3 text-xs font-mono uppercase tracking-wider rounded-md bg-white/10 text-white border border-white/20 text-center"
              >
                Customize Site
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
