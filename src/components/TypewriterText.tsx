import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per character
  delay?: number; // initial delay before typing starts
  triggerOnScroll?: boolean; // wait until element is scrolled into view
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  cursorChar?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  onComplete?: () => void;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speed = 30,
  delay = 200,
  triggerOnScroll = true,
  className = '',
  cursorClassName = '',
  showCursor = true,
  cursorChar = '▋',
  as: Component = 'span',
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!triggerOnScroll) {
      startTyping();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          startTyping();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerOnScroll]);

  const startTyping = () => {
    setIsTyping(true);
    let currentIndex = 0;

    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
          setIsDone(true);
          if (onComplete) onComplete();
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timeoutId);
  };

  return (
    <Component ref={containerRef as any} className={`inline-block ${className}`}>
      <span>{displayedText}</span>
      {showCursor && (
        <span
          className={`inline-block ml-0.5 text-blue-500 font-mono select-none animate-pulse ${
            isDone ? 'opacity-70' : 'opacity-100'
          } ${cursorClassName}`}
        >
          {cursorChar}
        </span>
      )}
    </Component>
  );
};
