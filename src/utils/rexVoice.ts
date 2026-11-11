// Rex Cute Voice Engine & Voice Command System
// Engineered for crystal-clear, clean, undistorted speech synthesis and voice recognition

export interface VoiceState {
  isSpeaking: boolean;
  isListening: boolean;
  isMuted: boolean;
  supported: boolean;
  lastTranscript: string;
}

// Gentle audio chime synthesizer using Web Audio API (zero distortion, pure harmonic sine chime)
class RexChimeEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Cute upbeat double-chime (D5 -> A5)
  playChirp() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine'; // pure harmonic, zero distortion
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.23);
    } catch {
      // AudioContext failure gracefully ignored
    }
  }

  // Cute affection chime for love reaction
  playLoveChime() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.06;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.1, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // Ignore
    }
  }
}

export const chimeEngine = new RexChimeEngine();

class RexVoiceSystem {
  private isMuted: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private recognitionInstance: any = null;
  private onSpeakingChangeCallbacks: Set<(speaking: boolean) => void> = new Set();
  private bestVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoiceSelector();
    }
  }

  private initVoiceSelector() {
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices || voices.length === 0) return;

      // Select the cleanest, friendliest English voice
      // Prefer clear natural voices (Google US English, Samantha, Victoria, Natural, Karen)
      const preferred = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Google') ||
            v.name.includes('Natural') ||
            v.name.includes('Samantha') ||
            v.name.includes('Victoria') ||
            v.name.includes('Karen') ||
            v.name.includes('Jenny') ||
            v.name.includes('Zira'))
      );

      this.bestVoice = preferred || voices.find((v) => v.lang.startsWith('en')) || voices[0];
    };

    pickVoice();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = pickVoice;
    }
  }

  public subscribeSpeaking(cb: (speaking: boolean) => void): () => void {
    this.onSpeakingChangeCallbacks.add(cb);
    return () => {
      this.onSpeakingChangeCallbacks.delete(cb);
    };
  }

  private notifySpeaking(speaking: boolean) {
    this.onSpeakingChangeCallbacks.forEach((cb) => cb(speaking));
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopSpeaking();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.notifySpeaking(false);
    }
  }

  // Clean, crisp voice speaking - optimized for zero distortion
  public speak(
    text: string,
    options?: {
      onEnd?: () => void;
      customPitch?: number;
      customRate?: number;
    }
  ) {
    if (this.isMuted) {
      options?.onEnd?.();
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      options?.onEnd?.();
      return;
    }

    // Cancel any previous utterance to avoid queue overlap distortion
    window.speechSynthesis.cancel();

    // Clean text: strip markdown characters, urls, bullet points for clean speech articulation
    const cleanText = text
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[*_#`~[\]]/g, '')
      .replace(/•/g, ', ')
      .replace(/[-]{2,}/g, ' ')
      .replace(/([0-9]+)\./g, '$1,')
      .replace(/[^\w\s.,!?'"()\-+:;]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      options?.onEnd?.();
      return;
    }

    // Rex's Cute Voice Profile:
    // pitch 1.25: Sweet, cheerful and cute companion tone without helium distortion
    // rate 1.05: Energetic, clear, and perfectly articulate
    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.bestVoice) {
      utterance.voice = this.bestVoice;
    }
    utterance.pitch = options?.customPitch ?? 1.25;
    utterance.rate = options?.customRate ?? 1.04;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.notifySpeaking(true);
    };

    utterance.onend = () => {
      this.notifySpeaking(false);
      options?.onEnd?.();
    };

    utterance.onerror = () => {
      this.notifySpeaking(false);
      options?.onEnd?.();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  // Speech Recognition (Voice Command System)
  public startListening(
    onResult: (transcript: string) => void,
    onStatusChange?: (listening: boolean) => void,
    onError?: (error: string) => void
  ): { stop: () => void } {
    if (typeof window === 'undefined') {
      onError?.('Voice recognition not supported in this environment.');
      return { stop: () => {} };
    }

    const SpeechRec =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      onError?.('Speech recognition is not supported in this browser. Please try Chrome or Edge.');
      return { stop: () => {} };
    }

    try {
      if (this.recognitionInstance) {
        this.recognitionInstance.abort();
      }

      const recognition = new SpeechRec();
      this.recognitionInstance = recognition;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      chimeEngine.playChirp();

      recognition.onstart = () => {
        onStatusChange?.(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0]?.[0]?.transcript || '';
        onStatusChange?.(false);
        if (transcript.trim()) {
          onResult(transcript.trim());
        }
      };

      recognition.onerror = (event: any) => {
        onStatusChange?.(false);
        if (event.error !== 'no-speech') {
          onError?.(event.error || 'Voice input interrupted.');
        }
      };

      recognition.onend = () => {
        onStatusChange?.(false);
      };

      recognition.start();

      return {
        stop: () => {
          try {
            recognition.stop();
          } catch {
            // Ignore
          }
        },
      };
    } catch (err: any) {
      onStatusChange?.(false);
      onError?.(err?.message || 'Could not start microphone.');
      return { stop: () => {} };
    }
  }
}

export const rexVoice = new RexVoiceSystem();
