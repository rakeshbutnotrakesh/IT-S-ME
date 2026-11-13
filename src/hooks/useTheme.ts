import { useState, useEffect } from 'react';

export function useTheme() {
  // Match initial SSR light canvas (#F8F8F5) to prevent hydration mismatches
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rkm_theme');
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
      } else {
        setTheme('light');
      }
    } catch {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('rkm_theme', theme);
    } catch {
      // Ignore storage restrictions
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
