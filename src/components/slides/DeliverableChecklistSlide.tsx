import React, { useState } from 'react';
import { DeliverableChecklistSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal, STAGGER_STEP } from '../common/Reveal';
import { Check } from 'lucide-react';

interface DeliverableChecklistSlideProps {
  slide: DeliverableChecklistSlideData;
}

export const DeliverableChecklistSlide: React.FC<DeliverableChecklistSlideProps> = ({ slide }) => {
  const [checkedState, setCheckedState] = useState<boolean[]>(() =>
    slide.items.map(() => false)
  );

  const toggleItem = (index: number) => {
    setCheckedState((prev) =>
      prev.map((val, idx) => (idx === index ? !val : val))
    );
  };

  const completedCount = checkedState.filter(Boolean).length;
  const totalCount = slide.items.length;

  return (
    <SlideShell tone="light">
      {slide.eyebrow && (
        <Reveal>
          <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
        </Reveal>
      )}

      <div className="flex items-center justify-between mt-3">
        <Reveal delay={0.08}>
          <h2 className="font-display text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
            {slide.title}
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <span className="rounded-full bg-orange-500/15 border border-orange-500/30 px-3 py-1 font-mono text-[11px] font-bold text-orange-400">
            {completedCount} / {totalCount} validé{completedCount > 1 ? 's' : ''}
          </span>
        </Reveal>
      </div>

      <div className="mt-5 flex max-w-[650px] flex-col gap-3">
        {slide.items.map((item, idx) => {
          const title = typeof item === 'string' ? item : item.title;
          const description = typeof item === 'string' ? undefined : item.description;
          const isChecked = checkedState[idx];

          return (
            <Reveal key={idx} delay={0.16 + idx * STAGGER_STEP}>
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className={`group flex w-full items-start gap-3.5 rounded-[12px] border p-4 text-left transition-all cursor-pointer ${
                  isChecked
                    ? 'border-orange-500/50 bg-[#1a1410] shadow-sm'
                    : 'border-white/10 bg-[#141414] hover:border-white/20 hover:bg-[#181818]'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-[5px] border transition-colors ${
                    isChecked
                      ? 'border-orange-500 bg-orange-500 text-white shadow-[0_0_8px_rgba(249,115,22,0.5)]'
                      : 'border-white/20 bg-white/5 group-hover:border-orange-400'
                  }`}
                >
                  {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1">
                  <span
                    className={`text-[14px] font-semibold transition-colors ${
                      isChecked ? 'text-neutral-400 line-through opacity-70' : 'text-white'
                    }`}
                  >
                    {title}
                  </span>
                  {description && (
                    <p className="mt-1 text-[12.5px] leading-relaxed text-neutral-400">
                      {description}
                    </p>
                  )}
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </SlideShell>
  );
};
