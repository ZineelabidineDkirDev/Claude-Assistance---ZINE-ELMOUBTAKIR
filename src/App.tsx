import React, { useState, useEffect, useCallback } from 'react';
import { DAYS_DATA } from './data/daysData';
import { LandingPage } from './components/LandingPage';
import { HomePage } from './components/HomePage';
import { ResourcesPage } from './components/ResourcesPage';
import { SlideDeck } from './components/SlideDeck';
import { CommandPalette } from './components/CommandPalette';
import { readProgress, readTheme, saveTheme } from './utils/storage';

type ViewType = 'landing' | 'home' | 'resources' | 'deck';

export default function App() {
  const [view, setView] = useState<ViewType>('landing');
  const [activeDayNum, setActiveDayNum] = useState<number>(1);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = readTheme();
    setTheme(savedTheme);
  }, []);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      saveTheme(next);
      return next;
    });
  }, []);

  // Parse path on initial load & popstate
  const syncFromUrl = useCallback(() => {
    const path = window.location.pathname;

    if (path.startsWith('/ressources')) {
      setView('resources');
      return;
    }

    if (path.startsWith('/programme') || path.startsWith('/curriculum')) {
      setView('home');
      return;
    }

    const jourMatch = path.match(/^\/jour\/(\d+)(?:\/(\d+))?/);
    if (jourMatch) {
      const day = parseInt(jourMatch[1], 10);
      const slide = jourMatch[2] ? parseInt(jourMatch[2], 10) - 1 : null;

      if (day >= 1 && day <= 5) {
        setActiveDayNum(day);
        const dayObj = DAYS_DATA.find((d) => d.day === day);
        const maxSlides = dayObj ? dayObj.slides.length : 1;

        if (slide !== null && slide >= 0 && slide < maxSlides) {
          setActiveSlideIndex(slide);
        } else {
          // Resume from saved progress or start at 0
          const saved = readProgress(day);
          const resumeIdx = saved !== null && saved > 0 && saved <= maxSlides ? saved - 1 : 0;
          setActiveSlideIndex(resumeIdx);
        }
        setView('deck');
        return;
      }
    }

    setView('landing');
  }, []);

  useEffect(() => {
    syncFromUrl();
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, [syncFromUrl]);

  // Global shortcut for Command Palette (⌘K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateLanding = useCallback(() => {
    setView('landing');
    window.history.pushState(null, '', '/');
  }, []);

  const navigateCurriculum = useCallback(() => {
    setView('home');
    window.history.pushState(null, '', '/programme');
  }, []);

  const navigateResources = useCallback(() => {
    setView('resources');
    window.history.pushState(null, '', '/ressources');
  }, []);

  const navigateDay = useCallback((dayNum: number, slideIdx?: number) => {
    const dayObj = DAYS_DATA.find((d) => d.day === dayNum);
    if (!dayObj) return;

    let targetSlide = 0;
    if (slideIdx !== undefined && slideIdx >= 0 && slideIdx < dayObj.slides.length) {
      targetSlide = slideIdx;
    } else {
      const saved = readProgress(dayNum);
      targetSlide = saved !== null && saved > 0 && saved <= dayObj.slides.length ? saved - 1 : 0;
    }

    setActiveDayNum(dayNum);
    setActiveSlideIndex(targetSlide);
    setView('deck');
    window.history.pushState(null, '', `/jour/${dayNum}/${targetSlide + 1}`);
  }, []);

  const navigateSlide = useCallback((dayNum: number, slideIdx: number) => {
    setActiveDayNum(dayNum);
    setActiveSlideIndex(slideIdx);
    setView('deck');
    window.history.pushState(null, '', `/jour/${dayNum}/${slideIdx + 1}`);
  }, []);

  const activeDay = DAYS_DATA.find((d) => d.day === activeDayNum) || DAYS_DATA[0];

  return (
    <div
      className={`min-h-full font-sans transition-colors duration-300 ${
        theme === 'light' ? 'bg-[#f8fafc] text-neutral-900' : 'bg-[#070708] text-neutral-200'
      }`}
    >
      {view === 'landing' && (
        <LandingPage
          days={DAYS_DATA}
          onSelectDay={navigateDay}
          onNavigateCurriculum={navigateCurriculum}
          onNavigateResources={navigateResources}
          onOpenCommandPalette={() => setIsGlobalSearchOpen(true)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      )}

      {view === 'home' && (
        <HomePage
          days={DAYS_DATA}
          onSelectDay={navigateDay}
          onNavigateLanding={navigateLanding}
          onNavigateResources={navigateResources}
          onOpenSearch={() => setIsGlobalSearchOpen(true)}
        />
      )}

      {view === 'resources' && (
        <ResourcesPage onNavigateHome={navigateLanding} />
      )}

      {view === 'deck' && (
        <SlideDeck
          day={activeDay}
          slideIndex={activeSlideIndex}
          allDays={DAYS_DATA}
          onNavigateSlide={navigateSlide}
          onNavigateHome={navigateLanding}
          onNavigateResources={navigateResources}
        />
      )}

      {/* Global Command Palette Search Modal */}
      <CommandPalette
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        allDays={DAYS_DATA}
        currentDay={activeDayNum}
        currentSlideIndex={activeSlideIndex}
        onSelectSlide={(day, slide) => {
          navigateSlide(day, slide);
          setIsGlobalSearchOpen(false);
        }}
      />
    </div>
  );
}
