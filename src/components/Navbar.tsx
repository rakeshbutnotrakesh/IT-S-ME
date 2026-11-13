import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, FileText } from 'lucide-react';
import { CommandPalette } from './CommandPalette';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);

      const sections = ['home', 'about', 'projects', 'skills', 'timeline', 'contact'];
      const scrollPosition = window.scrollY + 130;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section === 'timeline' ? 'skills' : section);
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

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 ${
          scrolled
            ? 'border-b border-[var(--border)] backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
        style={{ backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent' }}
      >
        <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Left: Minimal Monogram Logo */}
          <a
            href="#home"
            className="min-h-[44px] inline-flex items-center font-heading font-extrabold text-lg sm:text-xl tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0"
            aria-label="Rakesh Kumar Mondal — Home"
          >
            <span>RKM</span>
            <span className="text-[var(--accent)]">.</span>
          </a>

          {/* Center / Right: Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`nav-link-underline min-h-[44px] inline-flex items-center text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-[var(--text-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Resume Button, Theme Switcher & Mobile Menu */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenResume}
              className="hidden sm:inline-flex min-h-[40px] px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-xs font-medium text-[var(--text-primary)] hover:border-[var(--accent)] transition-colors duration-150 items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>Resume</span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors duration-150 cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors duration-150 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Responsive Mobile Navigation Drawer */}
        <div
          className={`md:hidden overflow-hidden border-t border-[var(--border)] transition-all duration-200 ease-out ${
            mobileMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none border-t-transparent'
          }`}
          style={{ backgroundColor: 'var(--bg-canvas)' }}
        >
          <nav aria-label="Mobile Navigation" className="max-w-[1120px] mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-[44px] px-3 rounded-lg flex items-center text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-[var(--accent-tint)] text-[var(--accent)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="mt-2 min-h-[44px] px-3 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[var(--accent)]" />
              <span>Resume</span>
            </button>
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
