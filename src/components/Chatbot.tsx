import React, { useState, useRef, useEffect, useMemo } from 'react';
import { X, Send, Bot, User, RotateCcw, Compass, Mic, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { quickQuestions } from '../data/chatbotResponses';
import { getChatbotResponse } from '../utils/chatbotEngine';
import { RexRobot } from './RexRobot';
import { rexVoice } from '../utils/rexVoice';
import { MarkdownMessage } from './MarkdownMessage';

interface Message {
  id: string;
  sender: 'rex' | 'user';
  text: string;
  timestamp: string;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'rex',
      text: "Hello! I'm Rex, Rakesh's portfolio companion. Ask me about his BCA SGPA (9.65), skills, live projects, development journey, or contact details!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(() => !rexVoice.getMuted());
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const activeListenerRef = useRef<{ stop: () => void } | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Freeform dragging state
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originX: number;
    originY: number;
    hasMoved: boolean;
  }>({ startX: 0, startY: 0, originX: 0, originY: 0, hasMoved: false });

  // Sync voice mute state globally
  useEffect(() => {
    return rexVoice.subscribeMuted((muted) => {
      setVoiceEnabled(!muted);
      if (muted) setSpeakingMessageId(null);
    });
  }, []);

  // Initialize position in bottom-right corner safely for mobile (320px+) and desktop
  useEffect(() => {
    const computeDefault = () => ({
      x: Math.max(12, window.innerWidth - 96),
      y: Math.max(12, window.innerHeight - 116),
    });

    setPosition(computeDefault());

    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return computeDefault();
        return {
          x: Math.max(12, Math.min(window.innerWidth - 92, prev.x)),
          y: Math.max(12, Math.min(window.innerHeight - 112, prev.y)),
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  // Listen for custom open trigger & Escape key to close
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 60);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        rexVoice.stopSpeaking();
        activeListenerRef.current?.stop();
        setIsOpen(false);
      }
    };

    window.addEventListener('open-rex-chat', handleOpenChat);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-rex-chat', handleOpenChat);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Pointer dragging handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    const currentPos = position || {
      x: Math.max(12, window.innerWidth - 96),
      y: Math.max(12, window.innerHeight - 116),
    };

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: currentPos.x,
      originY: currentPos.y,
      hasMoved: false,
    };

    setIsDragging(true);

    const handlePointerMove = (moveEvt: PointerEvent) => {
      const dx = moveEvt.clientX - dragRef.current.startX;
      const dy = moveEvt.clientY - dragRef.current.startY;

      if (Math.hypot(dx, dy) > 4) {
        dragRef.current.hasMoved = true;
      }

      const nextX = Math.max(12, Math.min(window.innerWidth - 92, dragRef.current.originX + dx));
      const nextY = Math.max(12, Math.min(window.innerHeight - 112, dragRef.current.originY + dy));

      setPosition({ x: nextX, y: nextY });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      if (!dragRef.current.hasMoved) {
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const resetRexPosition = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPosition({
      x: Math.max(12, window.innerWidth - 96),
      y: Math.max(12, window.innerHeight - 116),
    });
  };

  const handleSpeakMessage = (msgId: string, text: string) => {
    if (speakingMessageId === msgId) {
      rexVoice.stopSpeaking();
      setSpeakingMessageId(null);
      return;
    }

    if (rexVoice.getMuted()) {
      rexVoice.setMuted(false);
    }

    setSpeakingMessageId(msgId);
    rexVoice.speak(text, {
      onEnd: () => setSpeakingMessageId(null),
    });
  };

  // 100% Client-Side Rule-Based Chat Engine (zero API keys)
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend ?? inputText).trim();
    if (!query) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);
    setVoiceError(null);

    setTimeout(() => {
      const reply = getChatbotResponse(query);
      const botMessageId = `rex-${Date.now()}`;
      const botMessage: Message = {
        id: botMessageId,
        sender: 'rex',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);

      if (voiceEnabled && !rexVoice.getMuted()) {
        setSpeakingMessageId(botMessageId);
        rexVoice.speak(reply, {
          onEnd: () => setSpeakingMessageId(null),
        });
      }
    }, 240);
  };

  // Mic voice input button in chat
  const handleToggleMic = () => {
    if (isListening) {
      activeListenerRef.current?.stop();
      rexVoice.stopListening();
      setIsListening(false);
      return;
    }

    setVoiceError(null);
    rexVoice.stopSpeaking();
    setSpeakingMessageId(null);

    const listener = rexVoice.startListening(
      (transcript) => {
        setIsListening(false);
        setInputText(transcript);
        handleSendMessage(transcript);
      },
      (listeningState) => {
        setIsListening(listeningState);
      },
      (errorMsg) => {
        setIsListening(false);
        setVoiceError(errorMsg || 'Voice recognition unavailable in this browser.');
        setTimeout(() => setVoiceError(null), 4000);
      }
    );

    activeListenerRef.current = listener;
  };

  const resetChat = () => {
    rexVoice.stopSpeaking();
    setSpeakingMessageId(null);
    setVoiceError(null);
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'rex',
        text: "Conversation reset! Ask me about Rakesh's BCA SGPA (9.65), skills, projects, or journey.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
    ]);
  };

  // Responsive viewport-clamped positioning (works safely from 320px to 1920px)
  const chatCoords = useMemo(() => {
    if (typeof window === 'undefined' || !position) {
      return { left: undefined, top: undefined, right: '16px', bottom: '104px' };
    }

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const chatWidth = Math.min(420, viewportW - 24);
    const chatHeight = Math.min(520, viewportH - 108);

    if (viewportW < 640) {
      return {
        left: '12px',
        top: `${Math.max(12, viewportH - chatHeight - 96)}px`,
        right: '12px',
        bottom: 'auto',
      };
    }

    let left = position.x - chatWidth + 80;
    if (left < 16) left = Math.min(position.x, viewportW - chatWidth - 16);
    if (left + chatWidth > viewportW - 16) left = viewportW - chatWidth - 16;
    left = Math.max(12, left);

    let top = position.y - chatHeight - 14;
    if (top < 16) top = Math.min(position.y + 104, viewportH - chatHeight - 16);
    top = Math.max(12, top);

    return {
      left: `${left}px`,
      top: `${top}px`,
      right: 'auto',
      bottom: 'auto',
    };
  }, [position, isOpen]);

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Rex Portfolio Assistant"
          style={{
            position: 'fixed',
            left: chatCoords.left,
            top: chatCoords.top,
            right: chatCoords.right,
            bottom: chatCoords.bottom,
            width: 'min(420px, calc(100vw - 24px))',
            height: 'min(520px, calc(100dvh - 108px))',
            zIndex: 60,
          }}
          className="flex flex-col bg-white dark:bg-[#0c1222] border border-zinc-200 dark:border-cyan-500/30 rounded-2xl shadow-2xl shadow-black/25 dark:shadow-cyan-950/90 overflow-hidden animate-in fade-in slide-in-from-bottom-3 transition-all"
        >
          {/* Minimalist Header */}
          <div className="px-4 sm:px-5 py-3.5 bg-zinc-950 text-white flex items-center justify-between border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 p-[1.5px] flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                  <Bot className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="font-heading font-semibold text-sm tracking-wide text-white">Rex</h3>
                <span className="text-[10px] font-mono text-emerald-400">Offline Ready</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  const nextEnabled = !voiceEnabled;
                  rexVoice.setMuted(!nextEnabled);
                }}
                title={voiceEnabled ? 'Mute Rex voice readout' : 'Enable Rex voice readout'}
                aria-label={voiceEnabled ? 'Mute Rex voice readout' : 'Enable Rex voice readout'}
                className="p-1.5 text-zinc-400 hover:text-cyan-400 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
              </button>
              <button
                type="button"
                onClick={resetRexPosition}
                title="Reset Rex launcher to corner"
                aria-label="Reset Rex launcher to corner"
                className="p-1.5 text-zinc-400 hover:text-cyan-400 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={resetChat}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  rexVoice.stopSpeaking();
                  activeListenerRef.current?.stop();
                  setIsOpen(false);
                }}
                title="Close chatbot"
                aria-label="Close chatbot"
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Question Buttons Strip */}
          <div className="px-3.5 py-2 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-white/5 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
            <span className="text-[10px] font-mono uppercase text-zinc-500 shrink-0">Quick ask:</span>
            {quickQuestions.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => handleSendMessage(q.question)}
                className="px-2.5 py-1 text-xs font-mono bg-white dark:bg-white/5 hover:bg-blue-50 dark:hover:bg-cyan-950/40 border border-zinc-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-cyan-400/50 rounded-full whitespace-nowrap text-zinc-700 dark:text-zinc-300 transition-colors shrink-0 cursor-pointer"
              >
                {q.question}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4 text-xs font-sans">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-cyan-500/20 text-blue-600 dark:text-cyan-400'
                  }`}
                >
                  {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`max-w-[85%] p-3 rounded-2xl space-y-1 relative ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-zinc-100 dark:bg-zinc-800/95 text-zinc-900 dark:text-zinc-100 border border-zinc-200/80 dark:border-white/5 rounded-tl-none shadow-sm'
                  }`}
                >
                  {m.sender === 'user' ? (
                    <div className="whitespace-pre-line leading-relaxed text-[12.5px]">{m.text}</div>
                  ) : (
                    <MarkdownMessage content={m.text} />
                  )}

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-zinc-200/60 dark:border-white/5 mt-1.5">
                    {m.sender === 'rex' && (
                      <button
                        type="button"
                        onClick={() => handleSpeakMessage(m.id, m.text)}
                        className={`text-[10px] font-mono flex items-center gap-1 transition-colors cursor-pointer ${
                          speakingMessageId === m.id
                            ? 'text-blue-600 dark:text-cyan-400 font-semibold animate-pulse'
                            : 'text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-300'
                        }`}
                        title="Hear Rex speak this message"
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>{speakingMessageId === m.id ? 'Speaking...' : 'Play Voice'}</span>
                      </button>
                    )}
                    <div
                      className={`text-[9.5px] font-mono text-right ml-auto ${
                        m.sender === 'user' ? 'text-blue-100' : 'text-zinc-500 dark:text-zinc-400'
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-white/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 bg-zinc-100 dark:bg-zinc-800/90 rounded-2xl rounded-tl-none border border-zinc-200 dark:border-white/5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-cyan-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {voiceError && (
            <div className="px-3.5 py-1.5 bg-amber-50 dark:bg-amber-950/60 border-t border-amber-200 dark:border-amber-800/50 text-[11px] text-amber-800 dark:text-amber-300 font-sans flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{voiceError}</span>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-white/10 flex items-center gap-2 shrink-0"
          >
            <button
              type="button"
              onClick={handleToggleMic}
              className={`p-2 rounded-xl transition-all border cursor-pointer shrink-0 ${
                isListening
                  ? 'bg-emerald-500 text-zinc-950 border-emerald-400 animate-pulse'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-white/10 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-blue-400 dark:hover:border-cyan-400/50'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Speak to Rex by voice'}
              aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isListening ? 'Listening to your voice...' : 'Ask Rex about projects, SGPA, skills...'}
              aria-label="Message to Rex"
              className="flex-1 min-w-0 px-3 py-2 text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition-colors font-sans"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Draggable Rex Launcher */}
      <div
        style={{
          position: 'fixed',
          left: position ? `${position.x}px` : undefined,
          top: position ? `${position.y}px` : undefined,
          right: position ? 'auto' : '16px',
          bottom: position ? 'auto' : '16px',
          zIndex: 70,
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
        aria-label={isOpen ? 'Close Rex Chat Assistant' : 'Open Rex Chat Assistant'}
        className={`group flex flex-col items-center select-none transition-transform duration-150 rounded-full ${
          isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab hover:scale-105'
        }`}
        title="Rex Companion • Click to chat or drag anywhere"
      >
        <div className="relative p-1 rounded-full">
          <RexRobot
            size="md"
            showParticles={false}
            interactive={false}
          />
        </div>
      </div>
    </>
  );
};
