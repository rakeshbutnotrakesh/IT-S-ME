import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioConfig } from '../config/portfolioConfig';

export const Preloader: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    try {
      if (sessionStorage.getItem('rkm_editorial_intro') === '1') return;
    } catch {
      // Ignore storage access errors
    }

    setVisible(true);

    const timer = window.setTimeout(() => {
      dismiss();
    }, 1050);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        dismiss();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem('rkm_editorial_intro', '1');
    } catch {
      // Ignore storage access errors
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={dismiss}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0b0c] text-[#f5f5f3] px-6 select-none cursor-pointer"
          role="dialog"
          aria-label="Portfolio intro reveal"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-4"
          >
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#ff6b4a]">
              {portfolioConfig.profile.initials}
            </div>
            <div className="font-heading font-extrabold text-2xl sm:text-4xl tracking-tight">
              {portfolioConfig.profile.name}
            </div>
            <div className="w-44 h-[2px] mx-auto bg-white/10 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="h-full origin-left accent-gradient-bg"
              />
            </div>
          </motion.div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              dismiss();
            }}
            className="mt-8 min-h-[44px] px-4 py-2 text-xs font-mono text-[#8e8e98] hover:text-white transition-colors cursor-pointer"
          >
            Skip intro &rarr;
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
