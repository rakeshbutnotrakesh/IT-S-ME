import React, { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

interface MessageBlockTypewriterProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  className?: string;
  speed?: number;
  delay?: number;
  badgeLabel?: string;
  cursorChar?: string;
  childrenAfter?: React.ReactNode;
}

export const MessageBlockTypewriter: React.FC<MessageBlockTypewriterProps> = ({
  text,
  as: Component = 'div',
  className = '',
  speed = 22,
  delay = 120,
  badgeLabel = 'TRANSMISSION',
  cursorChar = '▋',
  childrenAfter,
}) => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [displayText, setDisplayText] = useState(prefersReduced ? text : '');
  const [isTyping, setIsTyping] = useState(prefersReduced);
  const [isComplete, setIsComplete] = useState(prefersReduced);
  const [isDissolved, setIsDissolved] = useState(prefersReduced);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasTriggeredRef = useRef(prefersReduced);
  const startTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          startTimerRef.current = setTimeout(() => {
            setIsTyping(true);
          }, delay);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (startTimerRef.current) clearTimeout(startTimerRef.current);
    };
  }, [delay, prefersReduced]);

  useEffect(() => {
    if (prefersReduced || !isTyping || isComplete) return;

    if (displayText.length < text.length) {
      const charTimer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, Math.max(12, speed - Math.random() * 8));

      return () => clearTimeout(charTimer);
    } else {
      setIsComplete(true);
      const dissolveTimer = setTimeout(() => {
        setIsDissolved(true);
      }, 500);

      return () => clearTimeout(dissolveTimer);
    }
  }, [isTyping, isComplete, displayText, text, speed, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-500 ease-out ${
        !isDissolved && isTyping
          ? 'p-4 sm:p-5 my-2 rounded-2xl bg-white/95 dark:bg-[#070b16]/90 border border-blue-500/30 dark:border-cyan-500/40 shadow-lg backdrop-blur-md'
          : !isDissolved && !isTyping
          ? 'opacity-0 min-h-[36px]'
          : 'p-0 my-0 bg-transparent border-transparent shadow-none'
      }`}
    >
      {!isDissolved && isTyping && (
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-500/20 dark:border-cyan-500/20 text-[10px] font-mono text-blue-600 dark:text-cyan-400">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold uppercase tracking-wider">{badgeLabel}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            {isComplete ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Rendered</span>
              </span>
            ) : (
              <span>typing...</span>
            )}
          </div>
        </div>
      )}

      <Component className={`${className} transition-colors duration-300`}>
        <span>{displayText}</span>

        {!isComplete && isTyping && (
          <span className="inline-block text-blue-600 dark:text-cyan-400 font-bold ml-1 animate-pulse">
            {cursorChar}
          </span>
        )}
      </Component>

      {isComplete && childrenAfter && (
        <div className="animate-in fade-in duration-500">
          {childrenAfter}
        </div>
      )}
    </div>
  );
};
