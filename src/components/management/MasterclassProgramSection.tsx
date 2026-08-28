import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Day } from '../../types';
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Play,
  FileCode,
  BarChart2,
  Database,
  Globe,
  Sliders,
  ChevronDown,
  ChevronUp,
  Cpu,
  Target,
  Award,
} from 'lucide-react';
import { playSwitchClick, playSlideTransition } from '../../utils/soundEffects';

interface MasterclassProgramSectionProps {
  days: Day[];
  progressMap: Record<number, number | null>;
  onSelectDay: (dayNumber: number, slideIdx?: number) => void;
  theme?: 'dark' | 'light';
}

export const MasterclassProgramSection: React.FC<MasterclassProgramSectionProps> = ({
  days,
  progressMap,
  onSelectDay,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  // 0 = Compact View, 1 = Detailed Chapters View
  const [detailMode, setDetailMode] = useState<boolean>(true);
  const [selectedDayTab, setSelectedDayTab] = useState<number | 'all'>('all');
  const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
  });

  const handleToggleDetailMode = () => {
    const next = !detailMode;
    playSwitchClick(next);
    setDetailMode(next);
    setExpandedDays({
      1: next,
      2: next,
      3: next,
      4: next,
      5: next,
    });
  };

  const toggleDayAccordion = (dayNum: number) => {
    const current = expandedDays[dayNum] ?? detailMode;
    const next = !current;
    playSwitchClick(next);
    setExpandedDays((prev) => {
      const updated = { ...prev, [dayNum]: next };
      // If all are open or all are closed, sync detailMode
      const allOpen = [1, 2, 3, 4, 5].every((d) => updated[d]);
      const allClosed = [1, 2, 3, 4, 5].every((d) => !updated[d]);
      if (allOpen) setDetailMode(true);
      if (allClosed) setDetailMode(false);
      return updated;
    });
  };

  const filteredDays =
    selectedDayTab === 'all'
      ? days
      : days.filter((d) => d.day === selectedDayTab);

  // Day theme accents for dark vs light
  const dayColors: Record<
    number,
    { text: string; bgDark: string; bgLight: string; borderDark: string; borderLight: string; badgeDark: string; badgeLight: string }
  > = {
    1: {
      text: isLight ? 'text-orange-600' : 'text-orange-400',
      bgDark: 'from-orange-950/30 to-[#0c0908]',
      bgLight: 'from-orange-50/90 to-white',
      borderDark: 'border-orange-500/30 hover:border-orange-500/60',
      borderLight: 'border-orange-200 hover:border-orange-400',
      badgeDark: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
      badgeLight: 'bg-orange-100 text-orange-700 border-orange-200',
    },
    2: {
      text: isLight ? 'text-cyan-700' : 'text-cyan-400',
      bgDark: 'from-cyan-950/30 to-[#070b0e]',
      bgLight: 'from-cyan-50/90 to-white',
      borderDark: 'border-cyan-500/30 hover:border-cyan-500/60',
      borderLight: 'border-cyan-200 hover:border-cyan-400',
      badgeDark: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      badgeLight: 'bg-cyan-100 text-cyan-700 border-cyan-200',
    },
    3: {
      text: isLight ? 'text-purple-700' : 'text-purple-400',
      bgDark: 'from-purple-950/30 to-[#0b080f]',
      bgLight: 'from-purple-50/90 to-white',
      borderDark: 'border-purple-500/30 hover:border-purple-500/60',
      borderLight: 'border-purple-200 hover:border-purple-400',
      badgeDark: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      badgeLight: 'bg-purple-100 text-purple-700 border-purple-200',
    },
    4: {
      text: isLight ? 'text-emerald-700' : 'text-emerald-400',
      bgDark: 'from-emerald-950/30 to-[#070d0a]',
      bgLight: 'from-emerald-50/90 to-white',
      borderDark: 'border-emerald-500/30 hover:border-emerald-500/60',
      borderLight: 'border-emerald-200 hover:border-emerald-400',
      badgeDark: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      badgeLight: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    },
    5: {
      text: isLight ? 'text-amber-700' : 'text-amber-400',
      bgDark: 'from-amber-950/30 to-[#0e0c07]',
      bgLight: 'from-amber-50/90 to-white',
      borderDark: 'border-amber-500/30 hover:border-amber-500/60',
      borderLight: 'border-amber-200 hover:border-amber-400',
      badgeDark: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      badgeLight: 'bg-amber-100 text-amber-700 border-amber-200',
    },
  };

  const daySummaries: Record<number, { duration: string; focus: string; project: string }> = {
    1: {
      duration: '1h45',
      focus: "Écosystème Claude, Prompt Engineering Analytique & Sécurité des Données",
      project: "1er Dashboard Interactif déployé en ligne avec GitHub",
    },
    2: {
      duration: '2h00',
      focus: "Nettoyage de Données, Excel Moderne (RECHERCHEX, TCD) & Cas Audit ONG",
      project: "Audit de Données Réelles & Tableau de Bord Excel / Power BI",
    },
    3: {
      duration: '2h15',
      focus: "Coding Data : Requêtes SQL complexes, Scripts Python & Analyse Statistique",
      project: "Pipeline Analytique complet SQL + Python assisté par Claude",
    },
    4: {
      duration: '2h00',
      focus: "Visualisation Décisionnelle, Storytelling & Portfolio Professionnel",
      project: "Site Portfolio Data publié + Plan Stratégique Carrière 90 Jours",
    },
    5: {
      duration: '1h30',
      focus: "Présentation des Projets, Pitch Décisionnel & Lancement Opérationnel",
      project: "Certification, Restitution & Démarrage du Plan d'Action",
    },
  };

  return (
    <section id="programme" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header with 0 / I Mode Toggle */}
      <div
        className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b transition-colors ${
          isLight ? 'border-neutral-200' : 'border-white/10'
        }`}
      >
        <div>
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs mb-3 shadow-sm ${
              isLight
                ? 'bg-orange-100 text-orange-700 border border-orange-200'
                : 'bg-orange-500/10 border border-orange-500/30 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span className="font-semibold uppercase tracking-wider">Curriculum 5 Jours · Zayn4Data</span>
          </div>
          <h2
            className={`font-display text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors ${
              isLight ? 'text-neutral-900' : 'text-white'
            }`}
          >
            Programme Complet de la Formation
          </h2>
          <p
            className={`text-sm sm:text-base mt-2 max-w-2xl font-normal transition-colors ${
              isLight ? 'text-neutral-600' : 'text-neutral-300'
            }`}
          >
            5 jours intensifs conçus par Zine El Abidine Dkir pour maîtriser l'analyse de données, l'intégration de Claude et la Business Intelligence décisionnelle.
          </p>
        </div>

        {/* 0 / I Interactive Switch & Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Day Filter Pills */}
          <div
            className={`flex items-center p-1 rounded-xl border font-mono text-xs transition-colors ${
              isLight
                ? 'bg-neutral-100 border-neutral-200 text-neutral-700'
                : 'bg-[#090b10] border-white/10 text-neutral-300'
            }`}
          >
            <button
              onClick={() => setSelectedDayTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedDayTab === 'all'
                  ? 'bg-orange-500 text-black font-bold shadow-sm'
                  : isLight
                  ? 'text-neutral-600 hover:text-black'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Tous (5)
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setSelectedDayTab(num)}
                className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedDayTab === num
                    ? 'bg-orange-500 text-black font-bold shadow-sm'
                    : isLight
                    ? 'text-neutral-600 hover:text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                J0{num}
              </button>
            ))}
          </div>

          {/* Interactive 0 / I Switch (Detail Mode) */}
          <div
            onClick={handleToggleDetailMode}
            className={`cursor-pointer select-none rounded-xl p-1.5 px-3 backdrop-blur-xl border transition-all flex items-center gap-2.5 ${
              isLight
                ? detailMode
                  ? 'bg-amber-500/10 border-amber-400 text-amber-900 shadow-sm'
                  : 'bg-neutral-100 border-neutral-200 text-neutral-600'
                : detailMode
                ? 'bg-[#0e121e] border-orange-500/40 text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                : 'bg-[#0a0a0f] border-white/10 text-neutral-400'
            }`}
            title="Basculer l'affichage détaillé des chapitres"
          >
            <span className="font-mono text-[11px] font-bold">
              {detailMode ? 'I · CHAPITRES' : '0 · SYNTHÈSE'}
            </span>

            <div
              className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-colors ${
                isLight
                  ? detailMode
                    ? 'bg-amber-200 border border-amber-400'
                    : 'bg-neutral-300'
                  : detailMode
                  ? 'bg-orange-950/80 border border-orange-500/50'
                  : 'bg-neutral-800'
              }`}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`h-4 w-4 rounded-full flex items-center justify-center font-mono text-[8px] font-black ${
                  isLight
                    ? detailMode
                      ? 'bg-amber-500 text-white'
                      : 'bg-neutral-500 text-white'
                    : detailMode
                    ? 'bg-orange-400 text-black shadow-[0_0_8px_#F97316]'
                    : 'bg-neutral-500 text-neutral-200'
                }`}
                style={{ marginLeft: detailMode ? 'auto' : '0' }}
              >
                {detailMode ? 'I' : '0'}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Days Cards Grid */}
      <div className="mt-8 space-y-4">
        {filteredDays.map((day) => {
          const colors = dayColors[day.day] || dayColors[1];
          const summary = daySummaries[day.day] || { duration: '2h00', focus: '', project: '' };
          const currentSlide = progressMap[day.day] || 0;
          const slideCount = day.slides.length;
          const isCompleted = currentSlide >= slideCount && slideCount > 0;
          const hasStarted = currentSlide > 0 && !isCompleted;
          const isExpanded = expandedDays[day.day] ?? detailMode;

          return (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-2xl backdrop-blur-xl bg-gradient-to-r ${
                isLight ? colors.bgLight : colors.bgDark
              } border ${
                isLight ? colors.borderLight : colors.borderDark
              } p-5 sm:p-6 transition-all duration-300 ${
                isLight
                  ? 'shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
                  : 'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]'
              }`}
            >
              {/* Top Row: Day Number, Badges, Title, Action Button */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  {/* Big Day Disc */}
                  <div
                    className={`flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl font-mono text-base sm:text-lg font-black border shadow-lg ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-600 border-emerald-500/40 shadow-sm'
                        : isLight
                        ? colors.badgeLight
                        : colors.badgeDark
                    }`}
                  >
                    0{day.day}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`font-mono text-xs font-semibold ${
                          isLight ? 'text-neutral-500' : 'text-neutral-400'
                        }`}
                      >
                        JOUR 0{day.day} · {slideCount} SLIDES
                      </span>
                      <span className={isLight ? 'text-neutral-300' : 'text-neutral-600'}>•</span>
                      <span
                        className={`font-mono text-xs flex items-center gap-1 ${
                          isLight ? 'text-neutral-500' : 'text-neutral-400'
                        }`}
                      >
                        <Clock className="h-3 w-3" />
                        {summary.duration}
                      </span>
                      {hasStarted && (
                        <span
                          className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                            isLight
                              ? 'bg-orange-100 text-orange-700 border border-orange-300'
                              : 'bg-orange-500/20 border border-orange-500/40 text-orange-300'
                          }`}
                        >
                          Slide {currentSlide}/{slideCount}
                        </span>
                      )}
                      {isCompleted && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 font-mono text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Terminé
                        </span>
                      )}
                    </div>

                    <h3
                      className={`font-display text-xl sm:text-2xl font-bold transition-colors ${
                        isLight ? 'text-neutral-900' : 'text-white'
                      }`}
                    >
                      {day.title}
                    </h3>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2.5 sm:self-end lg:self-center">
                  <button
                    onClick={() => toggleDayAccordion(day.day)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isLight
                        ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200'
                        : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                    }`}
                  >
                    <span>{isExpanded ? 'Masquer détails' : 'Voir les chapitres'}</span>
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  <button
                    onClick={() => {
                      playSlideTransition();
                      onSelectDay(day.day);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 hover:from-orange-400 hover:to-amber-400 text-black font-display text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-black" />
                    <span>{hasStarted ? `Reprendre (Slide ${currentSlide})` : `Lancer Jour 0${day.day}`}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Focus & Project Preview Chips */}
              <div
                className={`mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-2 gap-3 font-sans text-xs ${
                  isLight ? 'border-neutral-200/80 text-neutral-700' : 'border-white/5 text-neutral-300'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-orange-500 shrink-0">Objectif:</span>
                  <span className="leading-snug">{summary.focus}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-cyan-600 shrink-0">Livrable:</span>
                  <span className="font-semibold leading-snug">{summary.project}</span>
                </div>
              </div>

              {/* Collapsible Chapters List */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div
                      className={`mt-5 pt-4 border-t space-y-2 font-mono text-xs ${
                        isLight ? 'border-neutral-200' : 'border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-1">
                        <span
                          className={`text-[10px] uppercase tracking-wider font-bold ${
                            isLight ? 'text-neutral-500' : 'text-neutral-400'
                          }`}
                        >
                          Chapitres & Slides Clés
                        </span>
                        <span
                          className={`text-[10px] ${
                            isLight ? 'text-neutral-500' : 'text-neutral-400'
                          }`}
                        >
                          Cliquer pour ouvrir directement
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {day.slides.map((slide, idx) => {
                          let titleText = `Slide ${idx + 1}`;
                          let subtitleText: string | undefined = undefined;
                          const anySlide = slide as any;

                          if (anySlide.type === 'speaker-intro') {
                            titleText = anySlide.name || 'Formateur : Zine El Abidine Dkir';
                            subtitleText = 'Présentation & Parcours';
                          } else if (Array.isArray(anySlide.title)) {
                            titleText = anySlide.title.join(' ');
                          } else if (typeof anySlide.title === 'string') {
                            titleText = anySlide.title;
                          }

                          if (typeof anySlide.subtitle === 'string') {
                            subtitleText = anySlide.subtitle;
                          } else if (typeof anySlide.eyebrow === 'string') {
                            subtitleText = anySlide.eyebrow;
                          }

                          return (
                            <button
                              key={idx}
                              onClick={() => {
                                playSlideTransition();
                                onSelectDay(day.day, idx);
                              }}
                              className={`p-2.5 rounded-xl border text-left transition-all group flex items-start gap-2.5 cursor-pointer ${
                                isLight
                                  ? 'bg-white hover:bg-orange-50/70 border-neutral-200 hover:border-orange-300 text-neutral-800 shadow-sm'
                                  : 'bg-[#06080e]/90 hover:bg-[#0f1422] border-white/5 hover:border-orange-500/30 text-neutral-300'
                              }`}
                            >
                              <span
                                className={`shrink-0 h-5 w-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold transition-colors ${
                                  isLight
                                    ? 'bg-neutral-100 text-neutral-700 group-hover:bg-orange-500 group-hover:text-white'
                                    : 'bg-white/5 text-neutral-400 group-hover:bg-orange-500 group-hover:text-black'
                                }`}
                              >
                                {idx + 1}
                              </span>
                              <div className="min-w-0">
                                <p
                                  className={`text-xs font-sans font-medium truncate transition-colors ${
                                    isLight
                                      ? 'group-hover:text-orange-600'
                                      : 'group-hover:text-orange-400'
                                  }`}
                                >
                                  {titleText}
                                </p>
                                {subtitleText && (
                                  <p
                                    className={`text-[10px] truncate ${
                                      isLight ? 'text-neutral-500' : 'text-neutral-400'
                                    }`}
                                  >
                                    {subtitleText}
                                  </p>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
