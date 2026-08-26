import React from 'react';
import { EcosystemGridSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal, STAGGER_STEP } from '../common/Reveal';
import { DynamicIcon } from '../common/DynamicIcon';

interface EcosystemGridSlideProps {
  slide: EcosystemGridSlideData;
}

export const EcosystemGridSlide: React.FC<EcosystemGridSlideProps> = ({ slide }) => {
  const items = slide.items || [];

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

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item: any, idx: number) => {
          const description = item.description || item.detail;

          return (
            <Reveal key={idx} delay={0.16 + idx * STAGGER_STEP}>
              <div className="group flex h-full flex-col rounded-[12px] border border-white/10 bg-[#141414] p-4 transition-all hover:-translate-y-0.5 hover:border-orange-500/60 hover:bg-[#181818] hover:shadow-[0_4px_20px_-4px_rgba(249,115,22,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-white/10 text-orange-400 transition-colors group-hover:bg-orange-500 group-hover:text-white">
                    <DynamicIcon name={item.icon || 'sparkles'} className="h-4.5 w-4.5" />
                  </div>
                  {item.badge && (
                    <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 font-mono text-[9.5px] font-semibold uppercase text-neutral-400">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-[14.5px] font-semibold text-white">
                  {item.title || item.label}
                </h3>
                {description && (
                  <p className="mt-1.5 text-[12px] leading-relaxed text-neutral-400">
                    {description}
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </SlideShell>
  );
};
