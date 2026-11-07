import React, { useState, useEffect, useRef } from 'react';
import { Terminal, RotateCcw, Sparkles, Check, Play, Pause, Code2 } from 'lucide-react';

interface ConsoleScript {
  title: string;
  tabLabel: string;
  lines: string[];
}

const scripts: ConsoleScript[] = [
  {
    title: "Developer Manifesto",
    tabLabel: "manifesto.ts",
    lines: [
      "// Developer Profile: Rakesh Kumar Mondal",
      "import { Curiosity, Logic, Automation } from '@rakesh/core';",
      "",
      "const developer = new SoftwareDeveloper({",
      "  mission: 'Building Ideas Into Digital Reality',",
      "  focus: ['Web Development', 'Python', 'Docker & n8n', 'Cybersecurity'],",
      "  mindset: 'Practical solutions driven by first-principles logic'",
      "});",
      "",
      "await developer.initializeFutureProjects();",
      "console.log('✓ System active and ready for collaboration.');"
    ]
  },
  {
    title: "Automation Pipeline",
    tabLabel: "automation.workflow.sh",
    lines: [
      "#!/bin/bash",
      "# Initializing Docker & n8n Workflow Automation",
      "docker run -d --name n8n_worker -p 5678:5678 n8nio/n8n",
      "> Connecting webhook listener to automated event queue...",
      "> Trigger received: New digital project initialized.",
      "> Transforming raw data -> validating schema -> executing tasks.",
      "echo '✓ Automation pipeline executed successfully.'"
    ]
  },
  {
    title: "Problem Solving Logic",
    tabLabel: "algorithm.cpp",
    lines: [
      "#include <iostream>",
      "// Continuous learning in Data Structures & Core Logic",
      "int solveProblem(const Problem& realWorldIssue) {",
      "    auto architecture = designCleanSystem(realWorldIssue);",
      "    return deployReliableSolution(architecture);",
      "}",
      "// Output: Useful, reliable, and well-designed digital products."
    ]
  }
];

export const AnimatedConsoleBox: React.FC = () => {
  const [selectedScriptIndex, setSelectedScriptIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeScript = scripts[selectedScriptIndex];

  // IntersectionObserver: trigger when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  // Typing engine
  useEffect(() => {
    if (!hasStarted || isPaused) return;

    if (currentLineIndex >= activeScript.lines.length) {
      setIsFinished(true);
      return;
    }

    const targetLine = activeScript.lines[currentLineIndex];

    if (currentText.length < targetLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(targetLine.slice(0, currentText.length + 1));
      }, Math.max(12, 28 - Math.random() * 8));

      return () => clearTimeout(timeout);
    } else {
      // Completed line, advance to next line after brief pause
      const pauseDuration = targetLine === '' ? 50 : 120;
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentText('');
      }, pauseDuration);

      return () => clearTimeout(timeout);
    }
  }, [hasStarted, isPaused, currentLineIndex, currentText, activeScript]);

  const restartTyping = (newIndex = selectedScriptIndex) => {
    setSelectedScriptIndex(newIndex);
    setCurrentLineIndex(0);
    setCurrentText('');
    setIsFinished(false);
    setIsPaused(false);
    setHasStarted(true);
  };

  return (
    <div
      ref={containerRef}
      className="w-full relative group rounded-2xl overflow-hidden bg-zinc-950 text-white border border-zinc-800 shadow-2xl transition-all duration-300 hover:border-blue-500/50"
    >
      {/* Subtle ambient animated glow behind border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-2xl opacity-15 group-hover:opacity-30 blur-sm transition duration-500 pointer-events-none" />

      {/* Console Top Header Bar */}
      <div className="relative z-10 px-4 py-3 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between gap-3">
        {/* Window dots & active tab */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {scripts.map((script, idx) => (
              <button
                key={script.tabLabel}
                onClick={() => restartTyping(idx)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                  selectedScriptIndex === idx
                    ? 'bg-zinc-800 text-blue-400 font-semibold border-b-2 border-blue-500'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                <Code2 className="w-3 h-3" />
                <span>{script.tabLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Console Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title={isPaused ? "Resume typing" : "Pause typing"}
            aria-label={isPaused ? "Resume typing" : "Pause typing"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => restartTyping()}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Replay typing animation"
            aria-label="Replay typing animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Typing Text Box Content */}
      <div className="relative z-10 p-5 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[260px] sm:min-h-[290px] flex flex-col justify-between">
        <div className="space-y-1">
          {/* Completed Lines */}
          {activeScript.lines.slice(0, currentLineIndex).map((line, idx) => {
            const isComment = line.startsWith('//') || line.startsWith('#');
            const isCommand = line.startsWith('>') || line.startsWith('echo') || line.startsWith('docker');
            const isKeyword = line.startsWith('const') || line.startsWith('import') || line.startsWith('await');

            return (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-zinc-600 select-none w-5 text-right shrink-0 text-[11px]">
                  {idx + 1}
                </span>
                <span
                  className={
                    isComment
                      ? 'text-zinc-500 italic'
                      : isCommand
                      ? 'text-cyan-400'
                      : isKeyword
                      ? 'text-purple-400'
                      : 'text-zinc-200'
                  }
                >
                  {line || '\u00A0'}
                </span>
              </div>
            );
          })}

          {/* Currently Typing Line with Active Blinking Cursor */}
          {!isFinished && currentLineIndex < activeScript.lines.length && (
            <div className="flex items-start gap-3">
              <span className="text-zinc-600 select-none w-5 text-right shrink-0 text-[11px]">
                {currentLineIndex + 1}
              </span>
              <span className="text-zinc-100 flex items-center">
                <span>{currentText}</span>
                <span className="inline-block w-2 h-4 bg-blue-500 ml-0.5 animate-pulse shadow-sm shadow-blue-500" />
              </span>
            </div>
          )}

          {/* Finished Idle Cursor */}
          {isFinished && (
            <div className="pt-2 flex items-center gap-2 text-emerald-400 text-xs">
              <Check className="w-3.5 h-3.5" />
              <span>Program executed. Cursor standing by...</span>
              <span className="inline-block w-1.5 h-3.5 bg-emerald-400 animate-pulse ml-1" />
            </div>
          )}
        </div>

        {/* Bottom Status Ticker */}
        <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Typewriter Box</span>
          </div>
          <span className="text-zinc-400">
            {isFinished ? "100% Written" : "Typing in real-time..."}
          </span>
        </div>
      </div>
    </div>
  );
};
