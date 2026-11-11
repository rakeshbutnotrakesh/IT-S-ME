import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Activity, MessageSquare, Heart, Mic, MicOff, Volume2, VolumeX, Radio, CornerDownLeft } from 'lucide-react';
import { RexRobot } from './RexRobot';
import { rexVoice, chimeEngine } from '../utils/rexVoice';
import { getChatbotResponse } from '../utils/chatbotEngine';

interface RexHeroCardProps {
  onOpenChat?: () => void;
}

interface FloatingLove {
  id: number;
  x: number;
  text: string;
}

export const RexHeroCard: React.FC<RexHeroCardProps> = ({ onOpenChat }) => {
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [isLoving, setIsLoving] = useState(false);
  const [loveCount, setLoveCount] = useState<number>(0);
  const [floatingHearts, setFloatingHearts] = useState<FloatingLove[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);
  const activeListenerRef = useRef<{ stop: () => void } | null>(null);

  // Subscribe to Rex's speech synthesis state
  useEffect(() => {
    const unsubscribe = rexVoice.subscribeSpeaking((speaking) => {
      setIsSpeaking(speaking);
    });
    return () => unsubscribe();
  }, []);

  const cuteLoveSpokenLines = [
    "Aww! Rex loves you so much! Plus one love received!",
    "Affection received! My happiness circuits are at 100 percent!",
    "You made Rex smile! Sending virtual hugs and good vibes right back!",
    "Circuits blushing in electric cyan! Thank you human friend!",
    "Warm feelings detected! Rex's core is happy and glowing!",
  ];

  // Handle direct click on Rex
  const handleRobotClick = () => {
    // 1. Increment love count
    setLoveCount((prev) => prev + 1);

    // 2. Set cute love expression on Rex
    setIsLoving(true);

    // 3. Play harmonic love chime
    chimeEngine.playLoveChime();

    // 4. Pick a cute love line and speak it clearly with cute undistorted voice
    const randomSpeech = cuteLoveSpokenLines[Math.floor(Math.random() * cuteLoveSpokenLines.length)];
    setBubbleText(`+1 ❤️ Rex: "${randomSpeech}"`);

    if (!isMuted) {
      rexVoice.speak(randomSpeech, {
        customPitch: 1.25, // cute & warm, undistorted
        customRate: 1.04,
      });
    }

    // 5. Spawn floating love signs (+1 ❤️)
    const newHeart: FloatingLove = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 80,
      text: Math.random() > 0.4 ? '+1 ❤️' : '+1 💖',
    };
    setFloatingHearts((prev) => [...prev.slice(-6), newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1800);

    setTimeout(() => {
      setIsLoving(false);
    }, 3500);
  };

  // Toggle Voice Command Listening
  const handleToggleVoiceCommand = () => {
    if (isListening) {
      activeListenerRef.current?.stop();
      setIsListening(false);
      setVoiceFeedback(null);
      return;
    }

    // Stop speaking if currently speaking
    rexVoice.stopSpeaking();
    setVoiceFeedback("Rex is listening... Speak your command!");

    const listener = rexVoice.startListening(
      (transcript) => {
        setIsListening(false);
        handleVoiceCommandResult(transcript);
      },
      (listeningState) => {
        setIsListening(listeningState);
      },
      (error) => {
        setIsListening(false);
        setVoiceFeedback(error === 'not-allowed' ? 'Microphone permission denied.' : 'Try saying: "Show projects" or "Who is Rakesh"');
        setTimeout(() => setVoiceFeedback(null), 4000);
      }
    );

    activeListenerRef.current = listener;
  };

  // Process user speech command
  const handleVoiceCommandResult = async (command: string) => {
    const lower = command.toLowerCase();
    setVoiceFeedback(`You said: "${command}"`);

    // Command Intent matching:
    if (lower.includes('project') || lower.includes('portfolio') || lower.includes('work')) {
      const reply = "Here are Rakesh's projects, including CyberSafe, LifeOS, FileForge, and Vault!";
      setBubbleText(`Rex: "${reply}"`);
      rexVoice.speak(reply);
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (lower.includes('who') || lower.includes('rakesh') || lower.includes('about')) {
      const reply = "Rakesh Kumar Mondal is a BCA student and software developer building AI automations and digital tools!";
      setBubbleText(`Rex: "${reply}"`);
      rexVoice.speak(reply);
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (lower.includes('skill') || lower.includes('stack') || lower.includes('technolog') || lower.includes('language')) {
      const reply = "Rakesh works with Python, C++, React, TypeScript, and Docker automation workflows!";
      setBubbleText(`Rex: "${reply}"`);
      rexVoice.speak(reply);
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (lower.includes('contact') || lower.includes('email') || lower.includes('hire') || lower.includes('reach')) {
      const reply = "You can email Rakesh at rakeshkumarmondal51@gmail.com, or reach out through GitHub!";
      setBubbleText(`Rex: "${reply}"`);
      rexVoice.speak(reply);
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (lower.includes('love') || lower.includes('cute') || lower.includes('like you') || lower.includes('heart')) {
      handleRobotClick();
      return;
    }

    if (lower.includes('joke') || lower.includes('funny')) {
      const reply = "Why do programmers always prefer dark mode? Because light attracts bugs! Hehe!";
      setBubbleText(`Rex: "${reply}"`);
      rexVoice.speak(reply);
      return;
    }

    // Generate clean local response without any external API
    const rawAnswer = getChatbotResponse(command);
    const firstSentence = rawAnswer.split('\n')[0].replace(/[*#`•]/g, '').trim();
    setBubbleText(`Rex: "${firstSentence}"`);
    rexVoice.speak(firstSentence);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    rexVoice.setMuted(nextMuted);
  };

  return (
    <div className="w-full max-w-[460px] mx-auto relative group">
      {/* Ambient Backlight Glow */}
      <div
        className={`absolute -inset-1 rounded-3xl blur-2xl transition-all duration-700 pointer-events-none ${
          isLoving
            ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 opacity-60 scale-105'
            : isListening
            ? 'bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 opacity-50 scale-105 animate-pulse'
            : 'bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-15 group-hover:opacity-25'
        }`}
      />

      {/* Main Glassmorphic Container Card */}
      <div
        className={`relative z-10 w-full rounded-3xl bg-zinc-950/90 dark:bg-[#0a0f1d]/95 backdrop-blur-xl p-5 sm:p-7 flex flex-col items-center transition-all duration-300 shadow-xl ${
          isLoving || isListening
            ? 'border-cyan-400/70 shadow-2xl shadow-cyan-950/80 ring-1 ring-cyan-400/40'
            : 'border-cyan-500/20 hover:border-cyan-400/40 shadow-cyan-950/40'
        } border`}
      >
        {/* Card Header Bar */}
        <div className="w-full flex items-center justify-between pb-3.5 border-b border-zinc-800/80 font-mono text-xs">
          {/* Left: Title + Mode */}
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isLoving || isListening ? 'bg-cyan-300 animate-ping' : 'bg-cyan-400 animate-pulse'
              }`}
            />
            <span
              className={`font-semibold tracking-wider transition-colors ${
                isLoving
                  ? 'text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                  : isListening
                  ? 'text-emerald-300'
                  : 'text-cyan-400'
              }`}
            >
              REX // {isLoving ? 'SUPER GLOW-UP' : isListening ? 'LISTENING TO YOU' : isSpeaking ? 'CUTE VOICE ACTIVE' : '2D AI COMPANION'}
            </span>
          </div>

          {/* Right: Sound Controls + Love Count */}
          <div className="flex items-center gap-2">
            {loveCount > 0 && (
              <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/50 text-cyan-200 shadow-sm shadow-cyan-500/30 animate-in fade-in zoom-in-95">
                <Heart className="w-3 h-3 text-cyan-400 fill-cyan-400" />
                <span>{loveCount}</span>
              </span>
            )}

            {/* Mute/Unmute Rex Voice Button */}
            <button
              onClick={toggleMute}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                isMuted
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                  : 'bg-cyan-950/50 border-cyan-500/30 text-cyan-400 hover:bg-cyan-900/60'
              }`}
              title={isMuted ? 'Unmute Rex Voice' : 'Mute Rex Voice'}
              aria-label="Toggle Rex speech audio"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <div className="hidden sm:flex items-center gap-1 text-emerald-400 font-semibold tracking-wide text-[11px]">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>60FPS</span>
            </div>
          </div>
        </div>

        {/* Floating Interactive Robot Canvas */}
        <div className="w-full py-6 sm:py-8 flex flex-col items-center justify-center relative min-h-[290px]">
          {/* Floating Love Particles (+1 ❤️) */}
          {floatingHearts.map((heart) => (
            <div
              key={heart.id}
              style={{
                left: `calc(50% + ${heart.x}px)`,
                top: '40%',
              }}
              className="absolute pointer-events-none z-30 font-mono font-bold text-xs sm:text-sm px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-500/50 flex items-center gap-1.5 animate-loveFloat border border-cyan-300/40"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-white animate-pulse" />
              <span>{heart.text}</span>
            </div>
          ))}

          {/* Voice Command Banner / Soundwave pill */}
          {isSpeaking && (
            <div className="absolute top-1 z-20 animate-in fade-in zoom-in-90 duration-200">
              <div className="px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/60 text-cyan-200 font-mono text-[11px] font-semibold flex items-center gap-2 shadow-lg shadow-cyan-950/80">
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-bounce" />
                </div>
                <span>Rex is talking...</span>
              </div>
            </div>
          )}

          {isListening && (
            <div className="absolute top-1 z-20 animate-in fade-in zoom-in-90 duration-200">
              <div className="px-3.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/60 text-emerald-200 font-mono text-[11px] font-semibold flex items-center gap-2 shadow-lg shadow-emerald-950/80">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Listening... Speak clearly!</span>
              </div>
            </div>
          )}

          {/* Rex Robot Canvas */}
          <RexRobot
            size="lg"
            showParticles={true}
            interactive={true}
            expression={isLoving ? 'love' : 'normal'}
            onClick={handleRobotClick}
          />
        </div>

        {/* Voice Command Interactive Control Strip */}
        <div className="w-full mb-3 p-2.5 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-between gap-2 text-xs font-mono">
          <button
            onClick={handleToggleVoiceCommand}
            className={`flex-1 py-2 px-3.5 rounded-xl font-heading font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
              isListening
                ? 'bg-emerald-500 text-zinc-950 animate-pulse shadow-emerald-500/30'
                : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-cyan-500/25 active:scale-98'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 animate-bounce" />
                <span>Listening... (Tap to Cancel)</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 text-cyan-200" />
                <span>Voice Command (Talk to Rex)</span>
              </>
            )}
          </button>

          {isSpeaking && (
            <button
              onClick={() => rexVoice.stopSpeaking()}
              className="py-2 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 text-[11px] font-mono transition-colors"
            >
              Stop
            </button>
          )}
        </div>

        {/* Quick Voice Command Suggestion Chips */}
        <div className="w-full pb-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] font-mono text-zinc-400">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider shrink-0">Try saying:</span>
          {['Show projects', 'Who is Rakesh', 'Skills', 'Tell a joke', 'Give me love'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleVoiceCommandResult(cmd)}
              className="px-2.5 py-0.5 rounded-full bg-zinc-900/90 hover:bg-cyan-950/60 border border-zinc-800 hover:border-cyan-500/40 text-zinc-300 hover:text-cyan-300 transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              "{cmd}"
            </button>
          ))}
        </div>

        {/* Bottom Interactive Ticker with Rex's Cute Comment & Love Sign */}
        <div className="w-full pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-400 gap-3">
          <div className="flex items-center gap-1.5 truncate flex-1">
            {isLoving ? (
              <Heart className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400 shrink-0 animate-ping" />
            ) : isListening ? (
              <Radio className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            )}
            <span
              className={`truncate transition-colors ${
                isLoving
                  ? 'text-cyan-300 font-medium'
                  : isListening
                  ? 'text-emerald-300 font-medium'
                  : 'text-zinc-300'
              }`}
            >
              {voiceFeedback || bubbleText || 'Click Rex to glow up or tap Voice Command to talk!'}
            </span>
          </div>

          {/* Open Chat Dialog Action */}
          <button
            onClick={onOpenChat}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 hover:underline transition-colors cursor-pointer shrink-0"
            title="Open full Rex chatbot conversation"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat</span>
          </button>
        </div>
      </div>

      {/* Floating Love Animation Style */}
      <style>{`
        @keyframes loveFloat {
          0% {
            opacity: 0;
            transform: translate(-50%, 0) scale(0.6);
          }
          20% {
            opacity: 1;
            transform: translate(-50%, -20px) scale(1.1);
          }
          60% {
            opacity: 0.95;
            transform: translate(-50%, -60px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -100px) scale(0.85);
          }
        }
        .animate-loveFloat {
          animation: loveFloat 1.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
