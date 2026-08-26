import React from 'react';
import { DecisionTableSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal, STAGGER_STEP } from '../common/Reveal';
import { ArrowRight } from 'lucide-react';

interface DecisionTableSlideProps {
  slide: DecisionTableSlideData;
}

export const DecisionTableSlide: React.FC<DecisionTableSlideProps> = ({ slide }) => {
  const rows = slide.rows || [];

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

      {slide.lead && (
        <Reveal delay={0.12} className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-neutral-400">
          <p>{slide.lead}</p>
        </Reveal>
      )}

      <div className="mt-5 flex flex-col gap-2.5 max-w-3xl">
        {rows.map((row: any, idx: number) => {
          const recommendation = row.use || row.tool || row.recommendation;

          return (
            <Reveal key={idx} delay={0.16 + idx * STAGGER_STEP}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-[12px] border border-white/10 bg-[#141414] px-5 py-4 transition-all hover:border-orange-500/50 hover:bg-[#181818]">
                <div className="flex-1">
                  <span className="font-mono text-[10.5px] uppercase tracking-wider text-neutral-500">
                    Situation
                  </span>
                  <p className="text-[14px] font-semibold text-white mt-0.5">
                    {row.want || row.situation}
                  </p>
                </div>

                <div className="hidden sm:flex text-neutral-600">
                  <ArrowRight className="h-4 w-4" />
                </div>

                <div className="flex-1 flex flex-col sm:items-start">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-orange-400">
                      Recommandation
                    </span>
                    {row.badge && (
                      <span className="rounded-full bg-orange-500/15 border border-orange-500/30 px-2 py-0.5 font-mono text-[9.5px] font-semibold text-orange-400">
                        {row.badge}
                      </span>
                    )}
                  </div>
                  {recommendation && (
                    <p className="text-[14px] font-bold text-white mt-0.5">
                      {recommendation}
                    </p>
                  )}
                  {row.why && (
                    <p className="text-[12px] text-neutral-400 mt-0.5">
                      {row.why}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SlideShell>
  );
};
