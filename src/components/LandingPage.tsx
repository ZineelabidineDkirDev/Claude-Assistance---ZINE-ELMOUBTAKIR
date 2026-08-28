import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Day } from '../types';
import { readProgress } from '../utils/storage';
import { ZaynLogo } from './ZaynLogo';
import { HeroVideoMesh } from './management/HeroVideoMesh';
import { SystemNavbar } from './management/SystemNavbar';
import { MasterclassProgramSection } from './management/MasterclassProgramSection';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  BookOpen,
  FolderOpen,
  Search,
  Zap,
  BarChart3,
  Bot,
  ShieldCheck,
  ChevronDown,
  Database,
  Code2,
  Layers,
  Award,
  GraduationCap,
  Sliders,
  FileSpreadsheet,
  Briefcase,
} from 'lucide-react';
import { playSwitchClick, playNeonPowerUp } from '../utils/soundEffects';

interface LandingPageProps {
  days: Day[];
  onSelectDay: (dayNumber: number, slideIdx?: number) => void;
  onNavigateCurriculum: () => void;
  onNavigateResources: () => void;
  onOpenCommandPalette: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  days,
  onSelectDay,
  onNavigateCurriculum,
  onNavigateResources,
  onOpenCommandPalette,
  theme = 'dark',
  onToggleTheme,
}) => {
  const [progressMap, setProgressMap] = useState<Record<number, number | null>>({});
  const [heroModeSwitch, setHeroModeSwitch] = useState<boolean>(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const isLight = theme === 'light';

  useEffect(() => {
    const map: Record<number, number | null> = {};
    days.forEach((d) => {
      map[d.day] = readProgress(d.day);
    });
    setProgressMap(map);
  }, [days]);

  const totalSlides = days.reduce((acc, d) => acc + d.slides.length, 0);

  const handleHeroToggle = () => {
    const next = !heroModeSwitch;
    playSwitchClick(next);
    setHeroModeSwitch(next);
  };

  return (
    <div
      className={`relative min-h-screen selection:bg-orange-500 selection:text-black overflow-x-hidden transition-colors duration-300 ${
        isLight ? 'bg-[#f8fafc] text-neutral-800' : 'bg-[#050508] text-neutral-200'
      }`}
    >
      {/* Top Glassmorphic Navigation Bar */}
      <SystemNavbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        onOpenCommandPalette={onOpenCommandPalette}
        onNavigateResources={onNavigateResources}
        onSelectDay={(dayNum) => onSelectDay(dayNum)}
      />

      {/* ========================================================================= */}
      {/* HERO SECTION : AIRY, ELEGANT, HIGH-TECH WITH MESH & VIDEO OVERLAY        */}
      {/* ========================================================================= */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-6 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Visual Mesh Canvas (discretely tuned in light mode) */}
        <div className={isLight ? 'opacity-30' : 'opacity-100'}>
          <HeroVideoMesh />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 font-mono text-xs mb-6 backdrop-blur-xl transition-colors ${
              isLight
                ? ' text-orange-700 '
                : ' text-orange-300 '
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <span className="tracking-wider uppercase font-semibold">
              Masterclass Data & BI · 5 Jours Intensifs
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] transition-colors ${
              isLight ? 'text-neutral-900' : 'text-white'
            }`}
          >
            Maîtrisez l'Analyse des Données <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-cyan-500 drop-shadow-[0_0_35px_rgba(249,115,22,0.25)]">
              avec Claude & la Business Intelligence
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`mt-6 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-normal transition-colors ${
              isLight ? 'text-neutral-600' : 'text-neutral-300'
            }`}
          >
            Le parcours complet animé par{' '}
            <strong className={isLight ? 'text-neutral-900 font-semibold' : 'text-white font-semibold'}>
              Zine El Abidine Dkir
            </strong>
            . Du nettoyage de données et prompt engineering analytique jusqu'à la création de dashboards interactifs et la stratégie de carrière.
          </motion.p>

          {/* Call to Actions & Interactive 0 / I Switch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            {/* Primary Action Button */}
            <button
              onClick={() => {
                playNeonPowerUp();
                onSelectDay(1);
              }}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 hover:from-orange-400 hover:to-amber-400 text-black font-display text-base font-extrabold tracking-tight shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all transform hover:scale-105 flex items-center gap-2.5 cursor-pointer"
            >
              <Play className="h-5 w-5 fill-black" />
              <span>Démarrer le Jour 01</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Jump to Program Anchor */}
            <a
              href="#programme"
              className={`px-6 py-3.5 rounded-2xl border font-display text-base font-bold tracking-tight transition-all flex items-center gap-2 ${
                isLight
                  ? 'bg-white hover:bg-neutral-50 border-neutral-300 text-neutral-800 shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
              }`}
            >
              <BookOpen className="h-4 w-4 text-orange-500" />
              <span>Voir les 5 Jours</span>
            </a>

            {/* Micro 0 / I Toggle Capsule */}
            <div
              onClick={handleHeroToggle}
              className={`cursor-pointer select-none rounded-2xl p-2 px-3.5 backdrop-blur-xl border transition-all duration-300 flex items-center gap-2.5 ${
                isLight
                  ? heroModeSwitch
                    ? 'bg-amber-50 border-amber-300 shadow-sm text-amber-900'
                    : 'bg-white border-neutral-200 text-neutral-500'
                  : heroModeSwitch
                  ? 'bg-[#120d0a]/90 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.2)]'
                  : 'bg-[#0e1015]/80 border-white/10 text-neutral-400'
              }`}
            >
              <span className="font-mono text-xs font-bold">
                MODE 0 / I
              </span>
              <div
                className={`relative flex items-center p-0.5 rounded-full border ${
                  isLight ? 'bg-neutral-100 border-neutral-300' : 'bg-[#07080c] border-white/15'
                }`}
              >
                <div
                  className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-colors ${
                    isLight
                      ? heroModeSwitch
                        ? 'bg-amber-200 border border-amber-400'
                        : 'bg-neutral-300'
                      : heroModeSwitch
                      ? 'bg-orange-950/70 border border-orange-500/40'
                      : 'bg-neutral-800'
                  }`}
                >
                  <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`h-4 w-4 rounded-full flex items-center justify-center font-mono text-[8px] font-black ${
                      isLight
                        ? heroModeSwitch
                          ? 'bg-amber-500 text-white'
                          : 'bg-neutral-500 text-white'
                        : heroModeSwitch
                        ? 'bg-orange-400 text-black shadow-[0_0_10px_#F97316]'
                        : 'bg-neutral-600 text-neutral-300'
                    }`}
                    style={{ marginLeft: heroModeSwitch ? 'auto' : '0' }}
                  >
                    {heroModeSwitch ? 'I' : '0'}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Metrics Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`mt-12 pt-8 border-t grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-4xl mx-auto font-mono text-left transition-colors ${
              isLight ? 'border-neutral-200' : 'border-white/10'
            }`}
          >
            <div
              className={`p-3.5 rounded-2xl border backdrop-blur-md transition-colors ${
                isLight ? 'bg-white/80 border-neutral-200 shadow-sm' : 'bg-white/[0.03] border-white/5'
              }`}
            >
              <span className={`text-[10px] uppercase tracking-wider block ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Durée Totale
              </span>
              <span className="text-orange-500 font-display text-xl sm:text-2xl font-bold">5 Jours</span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border backdrop-blur-md transition-colors ${
                isLight ? 'bg-white/80 border-neutral-200 shadow-sm' : 'bg-white/[0.03] border-white/5'
              }`}
            >
              <span className={`text-[10px] uppercase tracking-wider block ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Slides Interactives
              </span>
              <span className="text-amber-500 font-display text-xl sm:text-2xl font-bold">{totalSlides} Slides</span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border backdrop-blur-md transition-colors ${
                isLight ? 'bg-white/80 border-neutral-200 shadow-sm' : 'bg-white/[0.03] border-white/5'
              }`}
            >
              <span className={`text-[10px] uppercase tracking-wider block ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Projets Concrets
              </span>
              <span className="text-cyan-600 font-display text-xl sm:text-2xl font-bold">4 Livrables</span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border backdrop-blur-md transition-colors ${
                isLight ? 'bg-white/80 border-neutral-200 shadow-sm' : 'bg-white/[0.03] border-white/5'
              }`}
            >
              <span className={`text-[10px] uppercase tracking-wider block ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Approche
              </span>
              <span className="text-emerald-600 font-display text-xl sm:text-2xl font-bold">100% Pratique</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. LE PROGRAMME DES 5 JOURS (FRONT & CENTER, CLAIR & ACCESSIBLE)          */}
      {/* ========================================================================= */}
      <MasterclassProgramSection
        days={days}
        progressMap={progressMap}
        onSelectDay={onSelectDay}
        theme={theme}
      />

      {/* ========================================================================= */}
      {/* 2. LES 3 PILIERS DE LA MÉTHODE (GLASSMORPHIC CARDS - SANS SURCHARGE)     */}
      {/* ========================================================================= */}
      <section id="methode" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs mb-3 ${
              isLight
                ? 'bg-cyan-50 border border-cyan-200 text-cyan-700'
                : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Pédagogie & Outils Modernes</span>
          </div>
          <h2
            className={`font-display text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${
              isLight ? 'text-neutral-900' : 'text-white'
            }`}
          >
            Une Approche Axée sur les Résultats Réels
          </h2>
          <p className={`text-sm sm:text-base mt-2 transition-colors ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
            Pas de théorie abstraite : chaque journée produit un livrable concret utilisable immédiatement en entreprise ou dans votre portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div
            className={`p-6 rounded-2xl backdrop-blur-xl border transition-all group ${
              isLight
                ? 'bg-white border-neutral-200 hover:border-cyan-400 shadow-sm'
                : 'bg-[#090b14]/80 border-cyan-500/20 hover:border-cyan-500/50'
            }`}
          >
            <div className="h-11 w-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-500 mb-4 group-hover:scale-105 transition-transform">
              <Bot className="h-6 w-6" />
            </div>
            <h3 className={`font-display text-lg font-bold mb-2 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
              Claude pour la Data
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Comprenez comment utiliser Claude (Haiku, Sonnet, Opus) pour nettoyer des données, concevoir des requêtes SQL sans erreur et traduire les chiffres en insights business percutants.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className={`p-6 rounded-2xl backdrop-blur-xl border transition-all group ${
              isLight
                ? 'bg-white border-neutral-200 hover:border-purple-400 shadow-sm'
                : 'bg-[#0e0a14]/80 border-purple-500/20 hover:border-purple-500/50'
            }`}
          >
            <div className="h-11 w-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-500 mb-4 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="h-6 w-6" />
            </div>
            <h3 className={`font-display text-lg font-bold mb-2 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
              Excel, Power BI & SQL
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Maîtrisez les formules modernes (RECHERCHEX, SOMME.SI.ENS), les Tableaux Croisés Dynamiques et le requêtage de bases relationnelles pour auditer des fichiers terrain complexes.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className={`p-6 rounded-2xl backdrop-blur-xl border transition-all group ${
              isLight
                ? 'bg-white border-neutral-200 hover:border-orange-400 shadow-sm'
                : 'bg-[#140e08]/80 border-orange-500/20 hover:border-orange-500/50'
            }`}
          >
            <div className="h-11 w-11 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-4 group-hover:scale-105 transition-transform">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className={`font-display text-lg font-bold mb-2 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
              Portfolio & Plan 90 Jours
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-400'}`}>
              Publiez votre propre dashboard interactif en ligne, constituez un portfolio de projets concrets et démarrez votre plan d'accélération professionnelle de 90 jours.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION FORMATEUR                                                      */}
      {/* ========================================================================= */}
      <section id="formateur" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10 relative">
        <div
          className={`rounded-3xl p-6 sm:p-8 backdrop-blur-xl border flex flex-col sm:flex-row items-center gap-6 sm:gap-8 transition-colors ${
            isLight
              ? 'bg-white border-neutral-200 shadow-md'
              : 'bg-[#0a0a0e]/90 border-white/10'
          }`}
        >
          <div
            className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl p-2 transition-colors ${
              isLight
                ? 'bg-orange-50 border border-orange-300 shadow-sm'
                : 'bg-[#121420] border border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
            }`}
          >
            <ZaynLogo className="h-full w-full" color="#F97316" />
          </div>

          <div className="text-center sm:text-left">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">
              <GraduationCap className="h-4 w-4" />
              <span>Votre Formateur</span>
            </div>
            <h3 className={`font-display text-2xl font-bold ${isLight ? 'text-neutral-900' : 'text-white'}`}>
              Zine El Abidine Dkir
            </h3>
            <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isLight ? 'text-neutral-600' : 'text-neutral-300'}`}>
              Data Analyst & Consultant BI. Expert en Business Intelligence, SQL, Power BI, Python et intégration de l'IA (Claude) dans les flux d'analyse de données d'entreprise.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-4 font-mono text-[11px]">
              <span className={`px-2.5 py-1 rounded-lg border ${isLight ? 'bg-neutral-100 border-neutral-200 text-neutral-700' : 'bg-white/5 border-white/10 text-neutral-400'}`}>
                SQL & Power BI
              </span>
              <span className={`px-2.5 py-1 rounded-lg border ${isLight ? 'bg-neutral-100 border-neutral-200 text-neutral-700' : 'bg-white/5 border-white/10 text-neutral-400'}`}>
                Prompt Engineering Data
              </span>
              <span className={`px-2.5 py-1 rounded-lg border ${isLight ? 'bg-neutral-100 border-neutral-200 text-neutral-700' : 'bg-white/5 border-white/10 text-neutral-400'}`}>
                Cas Pratiques Terrain
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FAQ ACCORDION                                                          */}
      {/* ========================================================================= */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10 relative">
        <h3 className={`font-display text-2xl font-bold tracking-tight text-center mb-6 ${isLight ? 'text-neutral-900' : 'text-white'}`}>
          Questions Fréquentes
        </h3>
        <div className="space-y-3 font-sans">
          {[
            {
              q: "À qui s'adresse cette formation de 5 jours ?",
              a: "Cette formation s'adresse aux débutants motivés, aux professionnels en reconversion (étudiants, managers, consultants, marketeurs) ainsi qu'aux analystes souhaitant intégrer l'Intelligence Artificielle (Claude) et les outils modernes de Business Intelligence (Power BI, SQL, Python) dans leur travail quotidien.",
            },
            {
              q: "Comment naviguer dans les 180+ slides de présentation ?",
              a: "Cliquez sur l'un des boutons J1 à J5 depuis la barre de navigation ou directement dans le programme pour lancer la présentation. Utilisez les flèches du clavier (Gauche / Droite), les raccourcis à l'écran, le mode plein écran (F) ou le raccourci ⌘K pour trouver instantanément un slide ou un concept précis.",
            },
            {
              q: "Quels sont les livrables concrets à la fin de la semaine ?",
              a: "À l'issue des 5 jours, vous aurez : 1) Votre premier dashboard interactif déployé en ligne, 2) Un audit complet de données réelles avec nettoyage et visualisations, 3) Des pipelines de requêtage SQL et scripts Python assistés par Claude, 4) Un portfolio professionnel hébergé sur GitHub Pages et 5) Un plan d'action stratégique sur 90 jours.",
            },
            {
              q: "Ma progression est-elle sauvegardée ?",
              a: "Oui, votre progression est automatiquement mémorisée dans votre navigateur pour chacun des 5 jours. Vous pouvez reprendre à tout moment exactement là où vous vous étiez arrêté.",
            },
            {
              q: "Où trouver les fichiers d'exercices et les scripts SQL ?",
              a: "Rendez-vous dans l'onglet 'Ressources' depuis la barre de navigation supérieure pour télécharger librement les datasets, requêtes SQL, notebooks et modèles de prompts.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-4 transition-all ${
                isLight
                  ? 'bg-white border-neutral-200 shadow-sm'
                  : 'bg-[#090b12] border-white/10'
              }`}
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className={`w-full flex items-center justify-between text-left font-display font-semibold text-sm sm:text-base cursor-pointer ${
                  isLight ? 'text-neutral-900' : 'text-white'
                }`}
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-orange-500 transition-transform duration-300 shrink-0 ml-2 ${
                    openFaqIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaqIndex === idx && (
                <p className={`mt-3 text-xs sm:text-sm font-sans leading-relaxed pt-2 border-t ${
                  isLight ? 'border-neutral-100 text-neutral-600' : 'border-white/5 text-neutral-300'
                }`}>
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER                                                                    */}
      {/* ========================================================================= */}
      <footer
        className={`py-10 border-t text-xs relative z-10 transition-colors ${
          isLight
            ? 'bg-neutral-100 border-neutral-200 text-neutral-600'
            : 'bg-[#030305] border-white/10 text-neutral-400'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl p-1 ${
                isLight
                  ? 'bg-white border border-orange-300 shadow-sm'
                  : 'bg-[#0a0c14] border border-orange-500/40 ring-1 ring-orange-500/20'
              }`}
            >
              <ZaynLogo className="h-full w-full" color="#F97316" />
            </div>
            <div>
              <div className={`flex items-center gap-2 font-bold text-sm ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                <span>Zayn4Data</span>
                <span className="text-neutral-400">·</span>
                <span className="text-orange-500">Formation Data & BI avec Claude</span>
              </div>
              <p className={`mt-0.5 text-[11px] ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>
                Par Zine El Abidine Dkir — 5 Jours de Masterclass Interactive.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
            <a href="#programme" className="hover:text-orange-500 transition-colors">
              Programme 5 Jours
            </a>
            <a href="#methode" className="hover:text-cyan-600 transition-colors">
              Méthode
            </a>
            <button onClick={onNavigateResources} className="hover:text-amber-600 transition-colors cursor-pointer">
              Ressources & SQL
            </button>
            <span className={isLight ? 'text-neutral-400' : 'text-neutral-600'}>© 2026 Zayn4Data</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
