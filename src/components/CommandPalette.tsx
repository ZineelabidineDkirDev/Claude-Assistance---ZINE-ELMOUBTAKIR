import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Day, Slide } from '../types';
import { Search, X, ChevronRight, BookOpen, Sparkles } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  allDays: Day[];
  currentDay: number;
  currentSlideIndex: number;
  onSelectSlide: (day: number, slideIndex: number) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  allDays,
  currentDay,
  currentSlideIndex,
  onSelectSlide,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Extract all searchable slides
  const allSlidesList = useMemo(() => {
    const list: Array<{
      dayNum: number;
      dayTitle: string;
      slideIndex: number;
      slide: Slide;
      title: string;
      eyebrow: string;
      type: string;
    }> = [];

    allDays.forEach((day) => {
      day.slides.forEach((slide, sIdx) => {
        let titleStr = '';
        if (typeof (slide as any).title === 'string') {
          titleStr = (slide as any).title;
        } else if (Array.isArray((slide as any).title)) {
          titleStr = (slide as any).title.join(' ');
        } else if ((slide as any).name) {
          titleStr = (slide as any).name;
        } else {
          titleStr = slide.id;
        }

        list.push({
          dayNum: day.day,
          dayTitle: day.title,
          slideIndex: sIdx,
          slide,
          title: titleStr,
          eyebrow: slide.eyebrow || `Jour 0${day.day}`,
          type: slide.type,
        });
      });
    });

    return list;
  }, [allDays]);

  const filteredSlides = useMemo(() => {
    if (!query.trim()) return allSlidesList;
    const q = query.toLowerCase();
    return allSlidesList.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.eyebrow.toLowerCase().includes(q) ||
        item.dayTitle.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
    );
  }, [allSlidesList, query]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md transition-all"
      onClick={onClose}
    >
      <div
        className="relative mt-8 sm:mt-16 flex w-full max-w-2xl flex-col overflow-hidden rounded-[16px] border border-white/15 bg-[#111111] text-neutral-200 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center border-b border-white/10 bg-[#161616] px-4 py-3.5">
          <Search className="h-5 w-5 text-orange-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une slide, un concept, un jour..."
            className="ml-3 flex-1 bg-transparent text-[15px] font-medium text-white placeholder-neutral-500 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="mr-2 text-xs text-neutral-400 hover:text-white"
            >
              Effacer
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] text-neutral-400">
            Échap
          </kbd>
          <button
            onClick={onClose}
            className="ml-2 rounded-full p-1 text-neutral-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredSlides.length === 0 ? (
            <div className="py-12 text-center text-neutral-400">
              <p className="text-sm font-medium">Aucune slide trouvée pour « {query} »</p>
              <p className="text-xs mt-1 text-neutral-500">Essayez un autre mot-clé (ex. SQL, Excel, API, Prompt...)</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {filteredSlides.map((item, idx) => {
                const isCurrent =
                  item.dayNum === currentDay &&
                  item.slideIndex === currentSlideIndex;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectSlide(item.dayNum, item.slideIndex);
                      onClose();
                    }}
                    className={`group flex w-full items-center justify-between rounded-[10px] px-3.5 py-2.5 text-left transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-[#181818] hover:bg-[#222222] border border-white/5 text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`flex h-6 w-6 flex-none items-center justify-center rounded-[6px] font-mono text-[11px] font-bold ${
                          isCurrent
                            ? 'bg-white text-orange-600'
                            : 'bg-white/10 text-neutral-300'
                        }`}
                      >
                        {item.slideIndex + 1}
                      </span>
                      <div className="min-w-0">
                        <p
                          className={`truncate text-[13.5px] font-semibold ${
                            isCurrent ? 'text-white' : 'text-neutral-100'
                          }`}
                        >
                          {item.title}
                        </p>
                        <p
                          className={`truncate text-[11.5px] ${
                            isCurrent ? 'text-white/80' : 'text-neutral-400'
                          }`}
                        >
                          Jour {item.dayNum} · {item.eyebrow}
                        </p>
                      </div>
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 flex-none transition-transform group-hover:translate-x-0.5 ${
                        isCurrent ? 'text-white' : 'text-neutral-500 group-hover:text-orange-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#161616] px-4 py-2 text-[11px] font-mono text-neutral-400">
          <span>{filteredSlides.length} slide{filteredSlides.length > 1 ? 's' : ''} au total</span>
          <span className="hidden sm:inline">↑↓ Naviguer · ↵ Sélectionner · Échap Fermer</span>
        </div>
      </div>
    </div>
  );
};
