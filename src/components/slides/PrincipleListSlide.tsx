import React from 'react';
import { PrincipleListSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal, STAGGER_STEP } from '../common/Reveal';

interface PrincipleListSlideProps {
  slide: PrincipleListSlideData;
}

export const PrincipleListSlide: React.FC<PrincipleListSlideProps> = ({ slide }) => {
  const items = slide.items || [];

  return (
    <SlideShell tone="light">
      {slide.eyebrow && (
        <Reveal>
          <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2 className="mt-3 max-w-2xl font-display text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
          {slide.title}
        </h2>
      </Reveal>

      {slide.lead && (
        <Reveal delay={0.14} className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-neutral-400">
          <p>{slide.lead}</p>
        </Reveal>
      )}

      <div className="mt-5 flex flex-col gap-2.5 max-w-3xl">
        {items.map((item: any, idx: number) => {
          const description = item.description || item.detail;

          return (
            <Reveal key={idx} delay={0.2 + idx * STAGGER_STEP}>
              <div
                className={`flex items-start gap-4 rounded-[12px] border px-5 py-4 transition-all ${
                  item.highlight
                    ? 'border-orange-500 bg-[#1a1410] shadow-[0_4px_24px_-4px_rgba(249,115,22,0.25)] ring-1 ring-orange-500/30'
                    : 'border-white/10 bg-[#141414] hover:bg-[#181818] hover:border-white/20'
                }`}
              >
                {item.num !== undefined && (
                  <div
                    className={`flex h-6 w-6 flex-none items-center justify-center rounded-full font-mono text-[11px] font-bold ${
                      item.highlight
                        ? 'bg-orange-500 text-white shadow-[0_0_8px_rgba(249,115,22,0.6)]'
                        : 'bg-white/10 text-neutral-300'
                    }`}
                  >
                    {item.num}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-[14.5px] font-bold text-white">
                    {item.title || item.label}
                  </h3>
                  {description && (
                    <p className="mt-1 text-[13px] leading-relaxed text-neutral-400">
                      {description}
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
