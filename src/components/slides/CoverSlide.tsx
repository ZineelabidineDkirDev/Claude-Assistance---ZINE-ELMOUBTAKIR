import React from 'react';
import { CoverSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal } from '../common/Reveal';

interface CoverSlideProps {
  slide: CoverSlideData;
}

export const CoverSlide: React.FC<CoverSlideProps> = ({ slide }) => {
  const lines = Array.isArray(slide.title) ? slide.title : [slide.title];

  const renderTitleLine = (line: string, highlight?: string) => {
    if (!highlight || !line.includes(highlight)) {
      return <span>{line}</span>;
    }
    const parts = line.split(highlight);
    return (
      <span>
        {parts[0]}
        <span className="text-orange-400 font-bold">{highlight}</span>
        {parts[1]}
      </span>
    );
  };

  return (
    <SlideShell tone="cover" className="justify-center">
      {slide.eyebrow && (
        <Reveal>
          <EyebrowLabel tone="signal">{slide.eyebrow}</EyebrowLabel>
        </Reveal>
      )}

      <Reveal delay={0.15} className="mt-4">
        <h1 className="font-display text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.15] tracking-tight text-white max-w-3xl">
          {lines.map((line, idx) => (
            <React.Fragment key={idx}>
              {renderTitleLine(line, slide.highlight)}
              {idx < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>
      </Reveal>

      {slide.subtitle && (
        <Reveal delay={0.35} className="mt-5 max-w-2xl text-[15px] sm:text-[16.5px] leading-relaxed text-neutral-300">
          <p>{slide.subtitle}</p>
        </Reveal>
      )}

      {slide.meta && (
        <Reveal delay={0.5} className="mt-auto pt-8 font-mono text-[12px] sm:text-[13px] text-neutral-400">
          {slide.metaHighlight && slide.meta.includes(slide.metaHighlight) ? (
            <span>
              {slide.meta.split(slide.metaHighlight)[0]}
              <span className="font-medium text-orange-400">{slide.metaHighlight}</span>
              {slide.meta.split(slide.metaHighlight)[1]}
            </span>
          ) : (
            slide.meta
          )}
        </Reveal>
      )}
    </SlideShell>
  );
};
