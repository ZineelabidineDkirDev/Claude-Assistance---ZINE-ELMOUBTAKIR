import React, { useState } from 'react';
import { BeforeAfterSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal } from '../common/Reveal';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface BeforeAfterSlideProps {
  slide: BeforeAfterSlideData;
}

export const BeforeAfterSlide: React.FC<BeforeAfterSlideProps> = ({ slide }) => {
  const before = slide.before || { label: 'Avant', rows: [] };
  const after = slide.after || { label: 'Après', rows: [] };
  const beforeRows: string[] = before.rows || (before as any).items || (before as any).points || [];
  const afterRows: string[] = after.rows || (after as any).items || (after as any).points || [];

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

      {/* Side by side comparison */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* BEFORE */}
        <Reveal delay={0.16}>
          <div className="flex h-full flex-col rounded-[12px] border border-white/10 bg-[#141414] p-5 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-[6px] border border-red-500/30 bg-red-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-wide text-red-400">
                <AlertCircle className="h-3.5 w-3.5" />
                {before.label || 'Avant'}
              </span>
            </div>

            <div className="flex flex-col gap-2 font-mono text-[12px]">
              {beforeRows.map((row: any, idx: number) => {
                const isObj = typeof row === 'object' && row !== null;
                return (
                  <div
                    key={idx}
                    className="rounded-[6px] bg-red-950/20 border border-red-500/20 px-3 py-2 text-red-300/90 leading-relaxed break-words"
                  >
                    {isObj ? (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-medium text-white">{row.primary || row.title}</span>
                        {row.secondary && (
                          <span className="text-red-400 font-mono text-[11px]">{row.secondary}</span>
                        )}
                      </div>
                    ) : (
                      String(row)
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* AFTER */}
        <Reveal delay={0.24}>
          <div className="flex h-full flex-col rounded-[12px] border border-orange-500/40 bg-[#161210] p-5 shadow-lg ring-1 ring-orange-500/20">
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-[6px] border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-bold tracking-wide text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {after.label || 'Après'}
              </span>
            </div>

            <div className="flex flex-col gap-2 font-mono text-[12px]">
              {afterRows.map((row: any, idx: number) => {
                const isObj = typeof row === 'object' && row !== null;
                return (
                  <div
                    key={idx}
                    className="rounded-[6px] bg-emerald-950/20 border border-emerald-500/20 px-3 py-2 text-emerald-300 leading-relaxed break-words"
                  >
                    {isObj ? (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className="font-medium text-white">{row.primary || row.title}</span>
                        {row.secondary && (
                          <span className="text-emerald-400 font-mono text-[11px] font-bold">{row.secondary}</span>
                        )}
                      </div>
                    ) : (
                      String(row)
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
};
