import React from 'react';
import { ComparisonSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal, STAGGER_STEP } from '../common/Reveal';
import { Check } from 'lucide-react';

interface ComparisonSlideProps {
  slide: ComparisonSlideData;
}

export const ComparisonSlide: React.FC<ComparisonSlideProps> = ({ slide }) => {
  const columns = slide.columns || [];

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

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {columns.map((col: any, idx: number) => {
          const isHighlight = col.highlight || col.winner;
          const points: string[] = col.points || col.items || [];

          return (
            <Reveal key={idx} delay={0.16 + idx * STAGGER_STEP}>
              <div
                className={`flex h-full flex-col rounded-[12px] border p-5 transition-all ${
                  isHighlight
                    ? 'border-orange-500 bg-[#1a1410] shadow-[0_4px_24px_-4px_rgba(249,115,22,0.25)] ring-1 ring-orange-500/30'
                    : 'border-white/10 bg-[#141414] hover:bg-[#181818]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${
                      isHighlight ? 'text-orange-400' : 'text-neutral-400'
                    }`}
                  >
                    {col.label}
                  </span>
                  {isHighlight && (
                    <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      Recommandé
                    </span>
                  )}
                </div>

                {col.title && (
                  <h3 className="mt-2 text-[17px] font-bold text-white">
                    {col.title}
                  </h3>
                )}

                <ul className="mt-4 flex flex-col gap-2.5">
                  {points.map((point: string, pIdx: number) => (
                    <li key={pIdx} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-neutral-300">
                      <Check
                        className={`mt-0.5 h-3.5 w-3.5 flex-none ${
                          isHighlight ? 'text-orange-400' : 'text-neutral-500'
                        }`}
                        strokeWidth={2.5}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SlideShell>
  );
};
