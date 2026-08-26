import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Day, Slide } from '../types';
import { SlideRenderer } from './SlideRenderer';
import { CommandPalette } from './CommandPalette';
import { PresenterNotesModal } from './PresenterNotesModal';
import { MobileSlideViewer } from './MobileSlideViewer';
import { saveProgress } from '../utils/storage';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Search,
  ListOrdered,
  BookOpen,
} from 'lucide-react';

interface SlideDeckProps {
  day: Day;
  slideIndex: number;
  allDays: Day[];
  onNavigateSlide: (day: number, slideIndex: number) => void;
  onNavigateHome: () => void;
  onNavigateResources: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 44 : -44,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -44 : 44,
  }),
};

export const SlideDeck: React.FC<SlideDeckProps> = ({
  day,
  slideIndex,
  allDays,
  onNavigateSlide,
  onNavigateHome,
  onNavigateResources,
}) => {
  const reducedMotion = useReducedMotion();
  const [direction, setDirection] = useState<number>(1);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const deckContainerRef = useRef<HTMLDivElement>(null);

  // Check mobile width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Save progress whenever day or slide changes
  useEffect(() => {
    saveProgress(day.day, slideIndex + 1);
  }, [day.day, slideIndex]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const totalSlides = day.slides.length;
  const currentSlide: Slide = day.slides[slideIndex] || day.slides[0];

  const goToSlide = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0) {
        // Go to previous day's last slide
        const prevDay = allDays.find((d) => d.day === day.day - 1);
        if (prevDay) {
          setDirection(-1);
          onNavigateSlide(prevDay.day, prevDay.slides.length - 1);
        }
        return;
      }

      if (targetIndex >= totalSlides) {
        // Go to next day's first slide
        const nextDay = allDays.find((d) => d.day === day.day + 1);
        if (nextDay) {
          setDirection(1);
          onNavigateSlide(nextDay.day, 0);
        }
        return;
      }

      setDirection(targetIndex > slideIndex ? 1 : -1);
      onNavigateSlide(day.day, targetIndex);
    },
    [allDays, day.day, slideIndex, totalSlides, onNavigateSlide]
  );

  const goNext = useCallback(() => goToSlide(slideIndex + 1), [goToSlide, slideIndex]);
  const goPrev = useCallback(() => goToSlide(slideIndex - 1), [goToSlide, slideIndex]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      deckContainerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInputActive = ['INPUT', 'TEXTAREA', 'SELECT'].includes(
        (e.target as HTMLElement)?.tagName
      );

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
        return;
      }

      if (e.key === 'Escape') {
        if (isCommandPaletteOpen) {
          setIsCommandPaletteOpen(false);
          return;
        }
        if (isNotesOpen) {
          setIsNotesOpen(false);
          return;
        }
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }

      if (isInputActive || isCommandPaletteOpen) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goPrev();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setIsNotesOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, toggleFullscreen, isCommandPaletteOpen, isNotesOpen]);

  if (isMobile) {
    return (
      <MobileSlideViewer
        day={day}
        currentSlideIndex={slideIndex}
        onNavigateHome={onNavigateHome}
        onSelectSlide={(idx) => onNavigateSlide(day.day, idx)}
      />
    );
  }

  // Progress percentage
  const progressPercent = ((slideIndex + 1) / totalSlides) * 100;

  return (
    <div
      ref={deckContainerRef}
      className="relative flex h-screen w-full flex-col bg-[#050505] text-[#e4e4e7] select-none overflow-hidden"
    >
      {/* Top Thin Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 h-[3px] bg-white/10">
        <motion.div
          className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Top Header Navigation */}
      <header className="z-30 flex h-14 flex-none items-center justify-between border-b border-white/10 bg-[#0a0a0a]/95 px-6 backdrop-blur-md">
        {/* Left: Back & Breadcrumb */}
        <div className="flex items-center gap-4">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:border-orange-500 hover:bg-orange-500 cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Plan des 5 jours</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>/</span>
            <span className="font-bold text-orange-400">Jour 0{day.day}</span>
            <span>:</span>
            <span className="truncate max-w-sm text-neutral-200">{day.title}</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center gap-1.5 rounded-[8px] border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-neutral-300 transition-all hover:border-orange-500/60 hover:text-white cursor-pointer"
            title="Plan complet (Ctrl+K)"
          >
            <Search className="h-3.5 w-3.5 text-orange-400" />
            <span className="hidden sm:inline">Plan</span>
            <kbd className="hidden sm:inline rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => setIsNotesOpen((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-[8px] border px-2.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
              isNotesOpen
                ? 'border-orange-500 bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                : 'border-white/10 bg-white/5 text-neutral-300 hover:border-orange-500/60 hover:text-white'
            }`}
            title="Notes formateur (Touche P)"
          >
            <FileText className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Notes</span>
            <kbd className="hidden sm:inline rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">
              P
            </kbd>
          </button>

          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 rounded-[8px] border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-neutral-300 transition-all hover:border-orange-500/60 hover:text-white cursor-pointer"
            title="Plein écran (Touche F)"
          >
            {isFullscreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
            <kbd className="hidden sm:inline rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">
              F
            </kbd>
          </button>
        </div>
      </header>

      {/* Main Slide Presentation Stage (16:9 responsive frame) */}
      <main className="relative flex flex-1 items-center justify-center p-3 sm:p-6 overflow-hidden">
        <div className="relative aspect-[16/9.5] w-full max-w-[1240px] max-h-[82vh] overflow-hidden rounded-[16px] border border-white/10 bg-[#0d0d0d] text-neutral-200 shadow-[0_0_50px_-10px_rgba(0,0,0,0.8)]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={`${day.day}-${slideIndex}`}
              custom={direction}
              variants={reducedMotion ? undefined : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 0.9, 0.28, 1] }}
              className="h-full w-full"
            >
              <SlideRenderer slide={currentSlide} />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Control Bar */}
      <footer className="z-30 flex h-14 flex-none items-center justify-between border-t border-white/10 bg-[#0a0a0a]/95 px-6 backdrop-blur-md">
        {/* Left: Day & Slide selector */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[12px] font-medium text-neutral-400">
            Slide <strong className="text-white">{slideIndex + 1}</strong> sur{' '}
            <strong className="text-white">{totalSlides}</strong>
          </span>

          <span className="hidden lg:inline text-white/20">|</span>

          {/* Quick jump slide buttons */}
          <div className="hidden lg:flex items-center gap-1">
            {Array.from({ length: Math.min(totalSlides, 22) }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === slideIndex
                    ? 'w-6 bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]'
                    : 'w-2 bg-white/20 hover:bg-white/50'
                }`}
                title={`Aller à la slide ${i + 1}`}
              />
            ))}
            {totalSlides > 22 && (
              <span className="text-[10px] font-mono text-neutral-500 ml-1">
                +{totalSlides - 22}
              </span>
            )}
          </div>
        </div>

        {/* Center: Keyboard hint */}
        <div className="hidden md:flex items-center gap-3 text-[11px] font-mono text-neutral-500">
          <span>← → Navigation</span>
          <span>·</span>
          <span>P Notes</span>
          <span>·</span>
          <span>F Plein écran</span>
          <span>·</span>
          <span>Échap Plan</span>
        </div>

        {/* Right: Navigation arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            disabled={day.day === 1 && slideIndex === 0}
            className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-white/15 disabled:opacity-25 disabled:hover:bg-white/5 cursor-pointer"
            title="Précédent (←)"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Précédent</span>
          </button>

          <button
            onClick={goNext}
            disabled={day.day === 5 && slideIndex === totalSlides - 1}
            className="flex items-center gap-1 rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold text-white transition-all hover:bg-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.3)] disabled:opacity-25 cursor-pointer"
            title="Suivant (→)"
          >
            <span className="hidden sm:inline">Suivant</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </footer>

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        allDays={allDays}
        currentDay={day.day}
        currentSlideIndex={slideIndex}
        onSelectSlide={(d, sIdx) => onNavigateSlide(d, sIdx)}
      />

      {/* Presenter Notes Modal */}
      <PresenterNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        slide={currentSlide}
        slideNumber={slideIndex + 1}
        totalSlides={totalSlides}
        dayNumber={day.day}
      />
    </div>
  );
};
