import React from 'react';
import { WorkflowFlowSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal, STAGGER_STEP } from '../common/Reveal';
import { DynamicIcon } from '../common/DynamicIcon';
import { ArrowRight } from 'lucide-react';

interface WorkflowFlowSlideProps {
  slide: WorkflowFlowSlideData;
}

export const WorkflowFlowSlide: React.FC<WorkflowFlowSlideProps> = ({ slide }) => {
  const nodes = slide.nodes || (slide as any).steps || [];

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

      {/* Responsive Workflow Nodes */}
      <div className="my-auto py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        {nodes.map((node: any, idx: number) => {
          const isHighlight = node.highlight;
          const isLast = idx === nodes.length - 1;
          const nodeTitle = node.title || node.label || `Étape ${idx + 1}`;
          const nodeDetail = node.detail || node.description;

          return (
            <React.Fragment key={idx}>
              <Reveal delay={0.16 + idx * STAGGER_STEP} className="flex-1 w-full md:w-auto">
                <div
                  className={`flex flex-col items-center justify-center rounded-[12px] border p-4 text-center transition-all ${
                    isHighlight
                      ? 'border-orange-500 bg-[#1a1410] shadow-[0_4px_24px_-4px_rgba(249,115,22,0.3)] ring-1 ring-orange-500/30 scale-105'
                      : 'border-white/10 bg-[#141414] hover:border-white/25 hover:bg-[#181818]'
                  }`}
                >
                  <div
                    className={`mb-2.5 flex h-10 w-10 items-center justify-center rounded-[8px] ${
                      isHighlight
                        ? 'bg-orange-500 text-white shadow-[0_0_10px_rgba(249,115,22,0.5)]'
                        : 'bg-white/10 text-orange-400'
                    }`}
                  >
                    <DynamicIcon name={node.icon || 'sparkles'} className="h-5 w-5" />
                  </div>
                  <h3 className="text-[14px] font-bold text-white">
                    {nodeTitle}
                  </h3>
                  {nodeDetail && (
                    <p className="mt-1 text-[11px] leading-tight text-neutral-400">
                      {nodeDetail}
                    </p>
                  )}
                </div>
              </Reveal>

              {!isLast && (
                <div className="text-neutral-600 rotate-90 md:rotate-0 flex-none py-1 md:py-0">
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </SlideShell>
  );
};
