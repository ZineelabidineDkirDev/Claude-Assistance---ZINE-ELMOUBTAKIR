import React from 'react';
import { StepListSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal, STAGGER_STEP } from '../common/Reveal';

interface StepListSlideProps {
  slide: StepListSlideData;
}

export const StepListSlide: React.FC<StepListSlideProps> = ({ slide }) => {
  const steps = slide.steps || [];

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

      <div className="mt-5 flex flex-col gap-3 max-w-3xl">
        {steps.map((step: any, idx: number) => {
          const stepNum = step.num !== undefined ? step.num : idx + 1;
          const description = step.description || step.detail;

          return (
            <Reveal key={idx} delay={0.16 + idx * STAGGER_STEP}>
              <div className="flex items-start gap-4 rounded-[12px] border border-white/10 bg-[#141414] px-5 py-4 transition-all hover:border-orange-500/50 hover:bg-[#181818]">
                <div className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-orange-500 font-mono text-[12px] font-bold text-white shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                  {stepNum}
                </div>
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-white">
                    {step.title || step.label}
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
