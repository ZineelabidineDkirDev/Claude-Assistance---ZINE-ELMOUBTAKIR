import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AgentBoxesSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal } from '../common/Reveal';

interface AgentBoxesSlideProps {
  slide: AgentBoxesSlideData;
}

export const AgentBoxesSlide: React.FC<AgentBoxesSlideProps> = ({ slide }) => {
  const reducedMotion = useReducedMotion();
  const boxes = slide.boxes || [];

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

      <div
        className={`my-auto py-6 grid grid-cols-1 ${
          boxes.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'
        } gap-4`}
        style={{ perspective: 1200 }}
      >
        {boxes.map((box: any, idx: number) => {
          const description = box.description || box.detail;

          return (
            <motion.div
              key={idx}
              className={`flex flex-col rounded-[12px] border p-5 transition-all ${
                box.highlight
                  ? 'border-orange-500 bg-[#1a1410] shadow-[0_6px_24px_-6px_rgba(249,115,22,0.25)] ring-1 ring-orange-500/30'
                  : 'border-white/10 bg-[#141414] hover:border-white/20 hover:bg-[#181818]'
              }`}
              initial={reducedMotion ? false : { opacity: 0, rotateY: -35 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.16 + idx * 0.12,
                ease: [0.22, 0.9, 0.28, 1],
              }}
            >
              {box.badge && (
                <div className="w-fit rounded-full bg-orange-500/15 border border-orange-500/30 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-orange-400">
                  {box.badge}
                </div>
              )}

              <h3 className="mt-3 text-[17px] font-bold text-white">
                {box.title || box.label}
              </h3>

              {description && (
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-400">
                  {description}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </SlideShell>
  );
};
