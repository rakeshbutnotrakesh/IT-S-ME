import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Sparkles, Check } from 'lucide-react';

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
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isDissolved, setIsDissolved] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasTriggeredRef = useRef(false);

  // IntersectionObserver to detect when user scrolls to this element
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          // Start delay
          setTimeout(() => {
            setIsTyping(true);
          }, delay);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  // Character by character typing loop
  useEffect(() => {
    if (!isTyping || isComplete) return;

    if (displayText.length < text.length) {
      const charTimer = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, Math.max(12, speed - Math.random() * 8));

      return () => clearTimeout(charTimer);
    } else {
      // Typing finished!
      setIsComplete(true);

      // Graceful dissolve delay: message block disappears after completion, leaving words
      const dissolveTimer = setTimeout(() => {
        setIsDissolved(true);
      }, 550);

      return () => clearTimeout(dissolveTimer);
    }
  }, [isTyping, isComplete, displayText, text, speed]);

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-700 ease-out ${
        !isDissolved && isTyping
          ? 'p-4 sm:p-5 my-2 rounded-2xl bg-zinc-950/85 dark:bg-[#070b16]/90 border border-cyan-500/40 shadow-xl shadow-cyan-950/40 backdrop-blur-md'
          : !isDissolved && !isTyping
          ? 'opacity-0 min-h-[36px]'
          : 'p-0 my-0 bg-transparent border-transparent shadow-none'
      }`}
    >
      {/* Temporary Message Block Header (Disappears when typing completes) */}
      {!isDissolved && isTyping && (
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-cyan-500/20 text-[10px] font-mono text-cyan-400 animate-in fade-in duration-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold uppercase tracking-wider">{badgeLabel}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            {isComplete ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Rendered</span>
              </span>
            ) : (
              <span>typing message...</span>
            )}
          </div>
        </div>
      )}

      {/* The Animated Text (Remains permanently standing after message block dissolves) */}
      <Component className={`${className} transition-colors duration-500`}>
        <span>{displayText}</span>

        {/* Active Typing Cursor */}
        {!isComplete && isTyping && (
          <span className="inline-block text-cyan-400 font-bold ml-1 animate-pulse">
            {cursorChar}
          </span>
        )}
      </Component>

      {/* Any supplementary children elements (e.g. subtitles or actions) */}
      {isComplete && childrenAfter && (
        <div className="animate-in fade-in duration-500">
          {childrenAfter}
        </div>
      )}
    </div>
  );
};
