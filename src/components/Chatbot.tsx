import React, { useState, useRef, useEffect, useMemo } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, RotateCcw, Move, Compass } from 'lucide-react';
import { quickQuestions } from '../data/chatbotResponses';
import { getChatbotResponse } from '../utils/chatbotEngine';
import { RexRobot } from './RexRobot';

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
      text: "Hi there! I'm Rex, Rakesh's AI companion. I can answer questions about his BCA coursework, Python & automation projects, cybersecurity tools, and technical skills. You can also drag me anywhere across your screen! How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

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

  // Initialize position in bottom-right corner
  useEffect(() => {
    const initX = Math.max(16, window.innerWidth - 110);
    const initY = Math.max(16, window.innerHeight - 130);
    setPosition({ x: initX, y: initY });

    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return { x: window.innerWidth - 110, y: window.innerHeight - 130 };
        return {
          x: Math.max(12, Math.min(window.innerWidth - 96, prev.x)),
          y: Math.max(12, Math.min(window.innerHeight - 116, prev.y)),
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

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('open-rex-chat', handleOpenChat);
    return () => window.removeEventListener('open-rex-chat', handleOpenChat);
  }, []);

  // Pointer dragging handlers (handles Mouse, Touch, and Pen)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary click
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    const currentPos = position || {
      x: window.innerWidth - 110,
      y: window.innerHeight - 130,
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

      // Constrain within viewport boundaries
      const nextX = Math.max(12, Math.min(window.innerWidth - 96, dragRef.current.originX + dx));
      const nextY = Math.max(12, Math.min(window.innerHeight - 116, dragRef.current.originY + dy));

      setPosition({ x: nextX, y: nextY });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);

      // Only toggle chat if user clicked without dragging
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
      x: Math.max(16, window.innerWidth - 110),
      y: Math.max(16, window.innerHeight - 130),
    });
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Realistic typing latency without external APIs
    setTimeout(() => {
      const reply = getChatbotResponse(query);
      const botMessage: Message = {
        id: `rex-${Date.now()}`,
        sender: 'rex',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'rex',
        text: "Conversation reset! What would you like to know from Rex about Rakesh's work, skills, or projects?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Compute smart positioning for chat window so it floats comfortably beside Rex
  const chatCoords = useMemo(() => {
    if (!position) return { left: undefined, top: undefined, right: '24px', bottom: '110px' };

    const chatWidth = Math.min(420, window.innerWidth - 24);
    const chatHeight = Math.min(540, window.innerHeight - 80);

    let left = position.x - chatWidth + 80;
    // If overflowing on left, place on right of Rex
    if (left < 16) {
      left = Math.min(position.x, window.innerWidth - chatWidth - 16);
    }
    // If overflowing right
    if (left + chatWidth > window.innerWidth - 16) {
      left = window.innerWidth - chatWidth - 16;
    }
    left = Math.max(12, left);

    let top = position.y - chatHeight - 14;
    // If overflowing above, place below Rex
    if (top < 16) {
      top = Math.min(position.y + 110, window.innerHeight - chatHeight - 16);
    }
    top = Math.max(12, top);

    return {
      left: `${left}px`,
      top: `${top}px`,
      right: 'auto',
      bottom: 'auto',
    };
  }, [position]);

  return (
    <>
      {/* Chat Window: dynamically placed near Rex */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            left: chatCoords.left,
            top: chatCoords.top,
            right: chatCoords.right,
            bottom: chatCoords.bottom,
            width: 'min(420px, 92vw)',
            height: 'min(540px, 80vh)',
            zIndex: 60,
          }}
          className="flex flex-col bg-white dark:bg-[#0c1222] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/90 overflow-hidden animate-in fade-in slide-in-from-bottom-3 transition-all"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-zinc-950 text-white flex items-center justify-between border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-md shadow-cyan-500/25 flex items-center justify-center">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                  <Bot className="w-5 h-5" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-semibold text-sm tracking-wide text-white">Rex</h3>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AI Companion
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 font-mono">Draggable Virtual Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetRexPosition}
                title="Reset Rex to corner"
                className="p-1.5 text-zinc-400 hover:text-cyan-400 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <Compass className="w-4 h-4" />
              </button>
              <button
                onClick={resetChat}
                title="Reset conversation"
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chatbot"
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Question Buttons Strip */}
          <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/60 border-b border-zinc-200 dark:border-white/5 overflow-x-auto no-scrollbar flex items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase text-zinc-400 shrink-0">Suggestions:</span>
            {quickQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSendMessage(q.question)}
                className="px-2.5 py-1 text-xs font-mono bg-white dark:bg-white/5 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 border border-zinc-200 dark:border-white/10 hover:border-cyan-400/50 rounded-full whitespace-nowrap text-zinc-700 dark:text-zinc-300 transition-colors shrink-0 cursor-pointer"
              >
                {q.question}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-100 dark:bg-zinc-800 border border-cyan-500/20 text-cyan-400'
                  }`}
                >
                  {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl space-y-1 ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-zinc-100 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 border border-zinc-200/80 dark:border-white/5 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed text-[12.5px]">{m.text}</div>
                  <div
                    className={`text-[9.5px] font-mono text-right ${
                      m.sender === 'user' ? 'text-blue-100' : 'text-zinc-400'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-white/10 text-cyan-400 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 bg-zinc-100 dark:bg-zinc-800/90 rounded-2xl rounded-tl-none border border-zinc-200 dark:border-white/5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Rex about projects, skills, tech stack..."
              className="flex-1 px-3.5 py-2 text-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-40 text-white rounded-xl transition-all shadow-sm shadow-cyan-500/25 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Draggable Rex Launcher (Can be placed in ANY location on screen with mouse) */}
      <div
        style={{
          position: 'fixed',
          left: position ? `${position.x}px` : undefined,
          top: position ? `${position.y}px` : undefined,
          right: position ? 'auto' : '24px',
          bottom: position ? 'auto' : '24px',
          zIndex: 70,
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        className={`group flex flex-col items-center select-none transition-transform duration-150 ${
          isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab hover:scale-105'
        }`}
        title="Rex AI Companion • Click to chat • Drag anywhere"
      >
        {/* Subtle, soft ambient rim light (toned down per user request) */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 rounded-full blur-md pointer-events-none transition-opacity duration-300 ${
            isDragging ? 'opacity-25' : 'opacity-10 group-hover:opacity-20'
          }`}
        />

        {/* Floating Robot Clickable & Draggable Pod (No text hovering over Rex) */}
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
