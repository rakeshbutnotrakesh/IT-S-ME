import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface MarkdownMessageProps {
  content: string;
}

export const MarkdownMessage: React.FC<MarkdownMessageProps> = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Split by code blocks ```
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let blockCount = 0;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    const textBefore = content.substring(lastIndex, match.index);
    if (textBefore) {
      parts.push(renderFormattedText(textBefore, `text-${lastIndex}`));
    }

    const language = match[1] || 'code';
    const code = match[2];
    const currentIndex = blockCount++;

    parts.push(
      <div key={`code-${currentIndex}`} className="my-2.5 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800 font-mono text-xs shadow-md">
        <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-800 text-[11px] text-zinc-400">
          <span className="uppercase tracking-wider font-semibold text-cyan-400">{language}</span>
          <button
            onClick={() => handleCopy(code, currentIndex)}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
            title="Copy code"
          >
            {copiedIndex === currentIndex ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-3.5 overflow-x-auto text-[11.5px] leading-relaxed text-zinc-200">
          <code>{code}</code>
        </pre>
      </div>
    );

    lastIndex = match.index + match[0].length;
  }

  const remainingText = content.substring(lastIndex);
  if (remainingText) {
    parts.push(renderFormattedText(remainingText, `text-end-${lastIndex}`));
  }

  return <div className="space-y-1.5 text-[12.5px] leading-relaxed">{parts}</div>;
};

// Formats inline markdown (bolding, lists, inline code)
function renderFormattedText(text: string, keyPrefix: string): React.ReactNode {
  const lines = text.split('\n');

  return (
    <div key={keyPrefix} className="space-y-1">
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={`${keyPrefix}-empty-${lIdx}`} className="h-1" />;
        }

        // Bullet point
        if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const bulletContent = trimmed.replace(/^[•\-*]\s*/, '');
          return (
            <div key={`${keyPrefix}-li-${lIdx}`} className="flex items-start gap-2 pl-1">
              <span className="text-cyan-700 dark:text-cyan-400 font-bold shrink-0 mt-0.5">•</span>
              <span className="flex-1">{formatInline(bulletContent)}</span>
            </div>
          );
        }

        // Heading
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={`${keyPrefix}-h-${lIdx}`} className="font-heading font-bold text-sm text-cyan-700 dark:text-cyan-300 pt-1">
              {formatInline(trimmed.replace(/^###\s*/, ''))}
            </h4>
          );
        }

        return <p key={`${keyPrefix}-p-${lIdx}`}>{formatInline(line)}</p>;
      })}
    </div>
  );
}

function formatInline(str: string): React.ReactNode[] {
  // Parse **bold** and `code`
  const regex = /(\*\*.*?\*\*|`.*?`)/g;
  const elements: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(str)) !== null) {
    if (match.index > last) {
      elements.push(str.substring(last, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      elements.push(
        <strong key={`b-${match.index}`} className="font-semibold text-zinc-950 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      elements.push(
        <code
          key={`c-${match.index}`}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700/60 font-mono text-[11px] text-cyan-800 dark:text-cyan-300"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    last = match.index + token.length;
  }

  if (last < str.length) {
    elements.push(str.substring(last));
  }

  return elements;
}
