import React, { useEffect, useState } from 'react';
import { Day } from '../types';
import { readProgress } from '../utils/storage';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, CheckCircle2, Play, Search, Sparkles } from 'lucide-react';
import { ZaynLogo } from './ZaynLogo';

interface HomePageProps {
  days: Day[];
  onSelectDay: (dayNumber: number) => void;
  onNavigateLanding: () => void;
  onNavigateResources: () => void;
  onOpenSearch?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  days,
  onSelectDay,
  onNavigateLanding,
  onNavigateResources,
  onOpenSearch,
}) => {
  const [progressMap, setProgressMap] = useState<Record<number, number | null>>({});

  useEffect(() => {
    const map: Record<number, number | null> = {};
    days.forEach((d) => {
      map[d.day] = readProgress(d.day);
    });
    setProgressMap(map);
  }, [days]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      {/* Top Header Bar */}
      <div className="border-b border-white/10 bg-[#0c0c0e] px-6 py-4 sm:px-16">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <button
            onClick={onNavigateLanding}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-orange-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Accueil & Découverte</span>
          </button>

          <div className="flex items-center gap-3">
            {onOpenSearch && (
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-neutral-300 hover:border-orange-500/40 hover:text-white cursor-pointer"
              >
                <Search className="h-3.5 w-3.5 text-orange-400" />
                <span className="hidden sm:inline">Plan (⌘K)</span>
              </button>
            )}
            <button
              onClick={onNavigateResources}
              className="text-xs font-medium text-orange-400 hover:text-orange-300 cursor-pointer"
            >
              Ressources
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-[#0a0a0a] to-[#050505] px-6 py-12 sm:px-16 text-white">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2.5 font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-orange-400">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#18181b] border border-orange-500/30 p-0.5 shadow-[0_0_8px_rgba(249,115,22,0.4)]">
              <ZaynLogo className="h-full w-full" color="#F97316" />
            </div>
            <span>Zayn4Data · Zine El Abidine Dkir</span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(28px,5vw,44px)] font-bold leading-tight text-white tracking-tight">
            Programme des 5 Jours de Formation
          </h1>

          <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-neutral-400">
            Support de présentation interactif des 5 jours. Choisissez un jour pour reprendre depuis le début ou depuis la dernière slide consultée.
          </p>
        </div>
      </div>

      {/* Main 5-Day Curriculum Content */}
      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-16">
        <div className="flex flex-col gap-3">
          {days.map((day) => {
            const currentSlide = progressMap[day.day];
            const slideCount = day.slides.length;
            const hasStarted = currentSlide !== null && currentSlide !== undefined;
            const isCompleted = hasStarted && currentSlide >= slideCount;

            return (
              <button
                key={day.day}
                onClick={() => onSelectDay(day.day)}
                className="group flex w-full items-center justify-between gap-5 rounded-[14px] border border-white/10 bg-[#121212] px-6 py-5 text-left transition-all hover:border-orange-500/50 hover:bg-[#181818] hover:shadow-[0_4px_24px_-4px_rgba(249,115,22,0.15)] cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`flex h-10 w-10 flex-none items-center justify-center rounded-full font-mono text-[13px] font-bold transition-all ${
                      isCompleted
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : hasStarted
                        ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                        : 'bg-white/5 text-neutral-400 border border-white/10 group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white'
                    }`}
                  >
                    0{day.day}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] font-medium text-neutral-400">
                        Jour 0{day.day} · {slideCount} slides
                      </span>
                      {hasStarted && (
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold ${
                            isCompleted
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                          }`}
                        >
                          {isCompleted ? '✓ Terminé' : `Reprendre : slide ${currentSlide}/${slideCount}`}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-0.5 text-[16px] font-bold text-white group-hover:text-orange-400 transition-colors truncate">
                      {day.title}
                    </h2>

                    {day.subtitle && (
                      <p className="mt-0.5 text-[13px] text-neutral-400 truncate">
                        {day.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-orange-400">
                  <span className="hidden sm:inline text-xs font-semibold">Ouvrir</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Navigation Information */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="font-mono text-[11px] text-neutral-400">
            ↵ Ouvre un jour · à l'intérieur, Échap ou Ctrl/⌘+K pour le plan de navigation complet
          </p>

          <button
            onClick={onNavigateResources}
            className="flex items-center gap-1 font-mono text-[12px] font-medium text-orange-400 transition-colors hover:text-orange-300 cursor-pointer"
          >
            <span>Ressources</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
