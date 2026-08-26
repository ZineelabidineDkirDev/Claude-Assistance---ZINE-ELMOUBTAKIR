import React, { useMemo, useState } from 'react';
import { CodeCardSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal } from '../common/Reveal';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeCardSlideProps {
  slide: CodeCardSlideData;
}

interface ParsedToken {
  text: string;
  tone: 'plain' | 'key' | 'value';
}

export const CodeCardSlide: React.FC<CodeCardSlideProps> = ({ slide }) => {
  const [copied, setCopied] = useState(false);

  const tokens = useMemo<ParsedToken[]>(() => {
    const raw = slide.code || '';
    const regex = /<(k|v)>(.*?)<\/\1>/g;
    const result: ParsedToken[] = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(raw)) !== null) {
      if (match.index > lastIndex) {
        result.push({
          text: raw.slice(lastIndex, match.index),
          tone: 'plain',
        });
      }
      result.push({
        text: match[2],
        tone: match[1] === 'k' ? 'key' : 'value',
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < raw.length) {
      result.push({
        text: raw.slice(lastIndex),
        tone: 'plain',
      });
    }

    return result;
  }, [slide.code]);

  const rawPlainText = useMemo(() => {
    return tokens.map((t) => t.text).join('');
  }, [tokens]);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawPlainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SlideShell tone="light">
      {slide.eyebrow && (
        <Reveal>
          <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2 className="mt-3 font-display text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
          {slide.title}
        </h2>
      </Reveal>

      <Reveal delay={0.16} className="mt-4 flex-1 flex flex-col min-h-0">
        <div className="flex flex-1 flex-col overflow-hidden rounded-[12px] border border-white/10 bg-[#080808] text-neutral-200 shadow-2xl">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#121212] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              {slide.filename && (
                <span className="ml-2 font-mono text-[12px] text-neutral-400">
                  {slide.filename}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {slide.previewLabel && (
                <span className="rounded-full bg-orange-500/15 border border-orange-500/30 px-2 py-0.5 font-mono text-[10px] font-medium text-orange-400">
                  {slide.previewLabel}
                </span>
              )}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-[6px] border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-neutral-300 transition-colors hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white cursor-pointer"
                title="Copier le code"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Code Content */}
          <div className="flex-1 overflow-auto p-4 sm:p-5 font-mono text-[12.5px] sm:text-[13px] leading-relaxed whitespace-pre-wrap selection:bg-orange-500/30">
            {tokens.map((token, idx) => {
              if (token.tone === 'key') {
                return (
                  <span key={idx} className="font-semibold text-orange-400">
                    {token.text}
                  </span>
                );
              }
              if (token.tone === 'value') {
                return (
                  <span key={idx} className="text-orange-300">
                    {token.text}
                  </span>
                );
              }
              return <span key={idx} className="text-neutral-300">{token.text}</span>;
            })}
          </div>
        </div>
      </Reveal>
    </SlideShell>
  );
};
