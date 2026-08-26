import React from 'react';
import { DayMapSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal, STAGGER_STEP } from '../common/Reveal';

interface DayMapSlideProps {
  slide: DayMapSlideData;
}

export const DayMapSlide: React.FC<DayMapSlideProps> = ({ slide }) => {
  return (
    <SlideShell tone="light">
      {slide.eyebrow && (
        <Reveal>
          <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2 className="mt-3 font-display text-[26px] sm:text-[32px] font-bold text-white tracking-tight">
          {slide.title}
        </h2>
      </Reveal>

      {/* Progress Timeline bar */}
      <Reveal delay={0.15} className="mt-6 flex items-center gap-2">
        {slide.days.map((d, idx) => {
          const dayNum = parseInt(d.num, 10);
          const isActive = dayNum === slide.activeDay;
          const isPast = dayNum < slide.activeDay;
          return (
            <div
              key={idx}
              className={`relative h-[6px] flex-1 rounded-full transition-all ${
                isActive || isPast ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]' : 'bg-white/10'
              } ${isPast ? 'opacity-40' : ''}`}
            >
              {isActive && (
                <span className="absolute -top-1 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#0e0e10] bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)] animate-pulse" />
              )}
            </div>
          );
        })}
      </Reveal>

      {/* Day Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-5 gap-3">
        {slide.days.map((day, idx) => {
          const dayNum = parseInt(day.num, 10);
          const isActive = dayNum === slide.activeDay;
          return (
            <Reveal key={idx} delay={0.2 + idx * STAGGER_STEP}>
              <div
                className={`flex h-full flex-col rounded-[12px] border p-4 transition-all ${
                  isActive
                    ? 'border-orange-500 bg-[#1a1410] shadow-[0_4px_24px_-4px_rgba(249,115,22,0.25)] ring-1 ring-orange-500/30 scale-[1.02]'
                    : 'border-white/10 bg-[#141414] hover:bg-[#181818] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[13px] font-bold ${
                      isActive ? 'text-orange-400' : 'text-neutral-400'
                    }`}
                  >
                    Jour {day.num}
                  </span>
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
                  )}
                </div>
                <h3 className="mt-2.5 text-[14px] font-semibold text-white leading-snug">
                  {day.title}
                </h3>
                <p className="mt-auto pt-2 text-[11.5px] leading-tight text-neutral-400">
                  {day.subtitle}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </SlideShell>
  );
};
