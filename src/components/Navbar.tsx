import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight, Mail } from 'lucide-react';
import { portfolioConfig } from '../config/portfolioConfig';
import { CommandPalette } from './CommandPalette';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Timeline', href: '#timeline', id: 'timeline' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  onToggleTheme,
  onOpenResume,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'timeline', 'contact'];
      const scrollPosition = window.scrollY + 130;

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

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleOpenRex = () => {
    window.dispatchEvent(new CustomEvent('open-rex-chat'));
  };

  const bookingHref =
    portfolioConfig.contact.bookingUrl && !portfolioConfig.contact.bookingUrl.includes('[')
      ? portfolioConfig.contact.bookingUrl
      : `mailto:${portfolioConfig.contact.email}?subject=Interview%20%2F%20Call%20Request`;

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b border-[var(--border-hairline)] backdrop-blur-xl transition-colors duration-200"
        style={{ backgroundColor: 'var(--nav-bg)' }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Clean 1-line Brand Wordmark */}
          <a
            href="#home"
            className="min-h-[44px] inline-flex items-center gap-2.5 font-heading font-bold text-base sm:text-lg tracking-tight text-[var(--text-primary)] hover:text-[var(--accent-text)] transition-colors duration-200 whitespace-nowrap shrink-0"
          >
            <span className="w-2 h-2 rounded-full accent-gradient-bg shrink-0" aria-hidden="true" />
            <span>{portfolioConfig.profile.shortName}</span>
          </a>

          {/* Zone 2: 5 Single-Line Navigation Links with Animated Underlines */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`nav-link-underline min-h-[44px] inline-flex items-center text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Theme Toggle, Always-Visible Email CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onToggleTheme}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors duration-200 cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href={bookingHref}
              target={bookingHref.startsWith('http') ? '_blank' : undefined}
              rel={bookingHref.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="min-h-[44px] px-4 py-2 rounded-lg accent-gradient-bg text-xs sm:text-sm font-semibold text-white inline-flex items-center gap-1.5 shadow-sm hover:opacity-95 transition-opacity whitespace-nowrap shrink-0"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Email me</span>
              <span className="sm:hidden">Email</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors duration-200 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Smooth Slide-In Mobile Menu Drawer */}
        <div
          className={`lg:hidden overflow-hidden border-t border-[var(--border-hairline)] transition-all duration-200 ease-out ${
            mobileMenuOpen ? 'max-h-[420px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 pointer-events-none border-t-transparent'
          }`}
          style={{ backgroundColor: 'var(--bg-canvas)' }}
        >
          <nav aria-label="Mobile Navigation" className="max-w-[1200px] mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[44px] px-3 rounded-lg flex items-center justify-between text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-[var(--accent-tint)] text-[var(--accent-text)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-60" />
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenRex={handleOpenRex}
        onOpenResume={onOpenResume}
        onToggleTheme={onToggleTheme}
        isDark={isDark}
      />
    </>
  );
};
