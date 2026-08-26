import React from 'react';
import { SpeakerIntroSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal } from '../common/Reveal';

interface SpeakerIntroSlideProps {
  slide: SpeakerIntroSlideData;
}

export const SpeakerIntroSlide: React.FC<SpeakerIntroSlideProps> = ({ slide }) => {
  const initials = slide.name
    ? slide.name
        .split(' ')
        .filter(Boolean)
        .map((w) => w[0].toUpperCase())
        .slice(0, 2)
        .join('')
    : 'ZD';

  return (
    <SlideShell tone="light" row className="items-center justify-between">
      <div className="flex-[1.3] flex flex-col">
        {slide.eyebrow && (
          <Reveal>
            <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
          </Reveal>
        )}

        <Reveal delay={0.08}>
          <h2 className="mt-3 font-display text-[28px] sm:text-[36px] font-bold text-white tracking-tight">
            {slide.name}
          </h2>
        </Reveal>

        <Reveal delay={0.16} className="mt-3.5 max-w-[500px] text-[14px] sm:text-[15px] leading-relaxed text-neutral-300">
          <p>{slide.bio}</p>
        </Reveal>

        {slide.stats && slide.stats.length > 0 && (
          <Reveal delay={0.24} className="mt-6 flex flex-wrap gap-3">
            {slide.stats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-[10px] border border-white/10 bg-[#141414] px-4 py-2.5 shadow-xs"
              >
                <span className="block font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                  {stat.label}
                </span>
                <span className="text-[13.5px] font-semibold text-white">
                  {stat.value}
                </span>
              </div>
            ))}
          </Reveal>
        )}
      </div>

      <div className="mt-6 sm:mt-0 flex-1 flex items-center justify-center">
        <Reveal delay={0.2} className="relative">
          {slide.photo ? (
            <img
              src={slide.photo}
              alt={slide.name}
              className="h-44 w-44 sm:h-56 sm:w-56 rounded-full border-4 border-orange-500/40 object-cover shadow-2xl ring-2 ring-orange-500/20"
            />
          ) : (
            <div className="flex h-44 w-44 sm:h-56 sm:w-56 flex-col items-center justify-center rounded-full border-4 border-orange-500/30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-[#181818] to-[#0d0d0d] p-5 text-center text-[13px] font-medium text-neutral-300 shadow-2xl ring-1 ring-orange-500/20">
              <span className="text-[32px] font-display font-bold text-orange-400 mb-1 tracking-wider">{initials}</span>
              <span className="font-medium text-white">{slide.photoPlaceholder || slide.name}</span>
            </div>
          )}
        </Reveal>
      </div>
    </SlideShell>
  );
};
