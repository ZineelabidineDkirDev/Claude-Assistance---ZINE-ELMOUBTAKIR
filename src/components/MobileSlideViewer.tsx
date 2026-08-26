import React, { useEffect, useRef } from 'react';
import { Day } from '../types';
import { SlideRenderer } from './SlideRenderer';
import { ArrowLeft, ChevronUp, ChevronDown } from 'lucide-react';

interface MobileSlideViewerProps {
  day: Day;
  currentSlideIndex: number;
  onNavigateHome: () => void;
  onSelectSlide: (slideIndex: number) => void;
}

export const MobileSlideViewer: React.FC<MobileSlideViewerProps> = ({
  day,
  currentSlideIndex,
  onNavigateHome,
  onSelectSlide,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    slideRefs.current[currentSlideIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [currentSlideIndex]);

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] text-neutral-200">
      {/* Mobile Topbar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#0a0a0a]/95 px-4 py-3 backdrop-blur-md">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-1 text-xs font-semibold text-white hover:text-orange-400"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Plan des 5 jours</span>
        </button>

        <div className="text-center">
          <span className="font-mono text-[11px] font-bold text-orange-400">
            Jour 0{day.day}
          </span>
          <span className="text-[11px] text-neutral-400 ml-1">
            ({day.slides.length} slides)
          </span>
        </div>
      </header>

      {/* Vertical Slide Stream */}
      <div ref={containerRef} className="flex-1 space-y-6 p-4">
        {day.slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            ref={(el) => { slideRefs.current[idx] = el; }}
            className={`overflow-hidden rounded-[16px] border bg-[#0d0d0d] shadow-lg transition-all ${
              idx === currentSlideIndex
                ? 'border-orange-500 ring-2 ring-orange-500/30'
                : 'border-white/10'
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-[#141414] px-4 py-2 text-[11px] font-mono text-neutral-400">
              <span>Slide {idx + 1} / {day.slides.length}</span>
              <span className="text-orange-400">{slide.type}</span>
            </div>
            <div className="min-h-[360px]">
              <SlideRenderer slide={slide} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
