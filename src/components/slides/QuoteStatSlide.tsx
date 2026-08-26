import React from 'react';
import { QuoteStatSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal } from '../common/Reveal';
import { CountUp } from '../common/CountUp';

interface QuoteStatSlideProps {
  slide: QuoteStatSlideData;
}

export const QuoteStatSlide: React.FC<QuoteStatSlideProps> = ({ slide }) => {
  const rawVal = (slide as any).value ?? (slide as any).stat ?? (slide as any).number ?? '';
  const statFormatted = `${rawVal}${slide.suffix || ''}`;
  const label = slide.label || (slide as any).quote || (slide as any).title || '';

  return (
    <SlideShell tone="dark" className="items-center justify-center text-center">
      {slide.eyebrow && (
        <Reveal>
          <EyebrowLabel tone="signal">{slide.eyebrow}</EyebrowLabel>
        </Reveal>
      )}

      <Reveal delay={0.12}>
        <div className="mt-4 font-display text-[clamp(56px,10vw,110px)] font-extrabold leading-none tracking-tight text-orange-400 drop-shadow-[0_0_35px_rgba(249,115,22,0.4)]">
          <CountUp value={statFormatted} durationMs={1400} />
        </div>
      </Reveal>

      {label && (
        <Reveal delay={0.28} className="mt-5 max-w-lg">
          <p className="text-[17px] sm:text-[20px] font-semibold text-white leading-snug">
            {label}
          </p>
        </Reveal>
      )}

      {slide.context && (
        <Reveal delay={0.42} className="mt-3 max-w-md text-[13.5px] leading-relaxed text-neutral-300">
          <p>{slide.context}</p>
        </Reveal>
      )}
    </SlideShell>
  );
};
