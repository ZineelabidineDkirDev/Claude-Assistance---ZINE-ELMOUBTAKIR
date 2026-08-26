import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Day } from '../types';
import { readProgress } from '../utils/storage';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  BookOpen,
  Terminal,
  Cpu,
  Database,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  BarChart3,
  Bot,
  ShieldCheck,
  Zap,
  FolderOpen,
  HelpCircle,
  Code2,
  ChevronDown,
  Monitor,
  Lightbulb,
} from 'lucide-react';

interface LandingPageProps {
  days: Day[];
  onSelectDay: (dayNumber: number, slideIdx?: number) => void;
  onNavigateCurriculum: () => void;
  onNavigateResources: () => void;
  onOpenCommandPalette: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  days,
  onSelectDay,
  onNavigateCurriculum,
  onNavigateResources,
  onOpenCommandPalette,
}) => {
  const [progressMap, setProgressMap] = useState<Record<number, number | null>>({});
  const [activeDemoTab, setActiveDemoTab] = useState<'dashboard' | 'terminal' | 'sql' | 'agent'>('dashboard');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const map: Record<number, number | null> = {};
    days.forEach((d) => {
      map[d.day] = readProgress(d.day);
    });
    setProgressMap(map);
  }, [days]);

  const totalSlides = days.reduce((acc, d) => acc + d.slides.length, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  };

  const demoTabs = [
    {
      id: 'dashboard' as const,
      label: 'Artifacts React & Viz',
      icon: Cpu,
      title: 'Dashboard de Ventes Prédictif en temps réel',
      description: 'Génération instantanée de graphiques Recharts interactifs et filtres multi-axes sans installer de dépendances locales.',
      codePreview: `// Claude Artifact généré automatiquement
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export function SalesForecastDashboard({ data }) {
  return (
    <div className="p-6 bg-[#121212] rounded-xl border border-white/10">
      <h3 className="text-lg font-bold text-white">Analyse Prédictive T3/T4</h3>
      <AreaChart data={data} height={240}>
        <Area type="monotone" dataKey="ca_prevu" stroke="#f97316" fill="#f97316" fillOpacity={0.2} />
      </AreaChart>
    </div>
  );
}`,
      outputPreview: {
        metric1: '+28.4%',
        metric1Label: 'Croissance T3',
        metric2: '4.8M €',
        metric2Label: 'CA Prévisionnel',
        metric3: '99.2%',
        metric3Label: 'Précision Modèle',
      },
    },
    {
      id: 'terminal' as const,
      label: 'Claude Code CLI',
      icon: Terminal,
      title: 'Automatisation locale et Pipeline Data en ligne de commande',
      description: 'Exécutez des analyses complètes, inspectez vos fichiers CSV volumineux et refactorisez vos scripts directement depuis votre terminal.',
      codePreview: `$ claude-code analyze-pipeline.py --dataset ./data/ventes_2026.csv
╭────────────────── Claude Code Data Assistant ──────────────────╮
│ 🔍 Chargement dataset : 1,450,200 lignes                       │
│ 🧹 Nettoyage : 3,420 doublons purgés, types normalisés (dates) │
│ 📊 Exportation des matrices de corrélation vers ./reports/     │
│ ✨ Pipeline validé avec succès en 4.2 secondes                 │
╰────────────────────────────────────────────────────────────────╯`,
      outputPreview: {
        metric1: '1.45M',
        metric1Label: 'Lignes traitées',
        metric2: '4.2s',
        metric2Label: 'Temps d\'exécution',
        metric3: '100%',
        metric3Label: 'Automatisation',
      },
    },
    {
      id: 'sql' as const,
      label: 'SQL & Data Cleaning',
      icon: Database,
      title: 'Requêtes analytiques complexes & Cohortes instantanées',
      description: 'Traduisez le langage naturel en SQL optimisé avec Window Functions, CTEs et détection automatique des anomalies de saisie.',
      codePreview: `WITH monthly_cohorts AS (
  SELECT 
    user_id,
    DATE_TRUNC('month', MIN(created_at)) AS cohort_month
  FROM transactions
  GROUP BY user_id
)
SELECT 
  c.cohort_month,
  COUNT(DISTINCT t.user_id) AS active_users,
  ROUND(SUM(t.amount), 2) AS total_ltv
FROM monthly_cohorts c
JOIN transactions t ON c.user_id = t.user_id
GROUP BY 1 ORDER BY 1 DESC;`,
      outputPreview: {
        metric1: '0.04s',
        metric1Label: 'Temps de requête',
        metric2: '12 CTEs',
        metric2Label: 'Optimisées',
        metric3: '0 Erreur',
        metric3Label: 'Syntaxe certifiée',
      },
    },
    {
      id: 'agent' as const,
      label: 'Agents & Workflows',
      icon: Bot,
      title: 'Système multi-agents pour le reporting automatisé',
      description: 'Orchestration d\'agents autonomes pour la veille, l\'extraction de données API, le résumé exécutif et l\'envoi de synthèses PDF.',
      codePreview: `const dataAgent = new ClaudeAgent({
  tools: [sqlExecutor, anomalyDetector, chartGenerator],
  systemPrompt: "Tu es un Data Analyst Senior. Valide chaque métrique avant synthèse."
});

await dataAgent.run("Inspecte la chute de conversion sur le segment B2B et génère l'alerte.");`,
      outputPreview: {
        metric1: '5 Outils',
        metric1Label: 'Tool Calling',
        metric2: 'Autonome',
        metric2Label: 'Multi-étapes',
        metric3: '1 Clic',
        metric3Label: 'Rapport Exécutif',
      },
    },
  ];

  const faqs = [
    {
      q: "À qui s'adresse cette formation de 5 jours ?",
      a: "La formation est conçue pour les data analysts, data scientists, chefs de projet, consultants et professionnels métiers souhaitant décupler leur productivité data grâce à Claude 3.7 Sonnet, Artifacts, et Claude Code.",
    },
    {
      q: "Faut-il payer un abonnement Claude Pro pour suivre les exercices ?",
      a: "Non ! Tous les ateliers ont été calibrés avec des datasets ouverts et gratuits. Vous pouvez utiliser le plan gratuit de Claude, Claude for Desktop ou l'API selon vos préférences.",
    },
    {
      q: "Comment naviguer dans les 130+ slides de présentation ?",
      a: "Vous pouvez utiliser les flèches du clavier (← →), appuyer sur la touche F pour le plein écran, appuyer sur P pour ouvrir les notes du formateur, ou presser ⌘K (ou Ctrl+K) à tout moment pour rechercher n'importe quel concept.",
    },
    {
      q: "Quels sont les livrables concrets à la fin de la semaine ?",
      a: "Chaque jour inclut un livrable validé : un dashboard React déployé en ligne (Jour 1), un pipeline de nettoyage reproductible (Jour 2), des requêtes SQL avancées (Jour 3), des templates de prompt & agents (Jour 4) et un projet fil rouge complet certifié (Jour 5).",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-200 selection:bg-orange-500/30 selection:text-white">
      {/* Sticky Global Top Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070708]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-white text-base tracking-tight">Formations4data</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[9.5px] font-semibold text-neutral-300">
                  Eurêka Services
                </span>
              </div>
              <p className="font-mono text-[10px] text-orange-400">Masterclass Claude pour la Data</p>
            </div>
          </div>

          {/* Center Navigation items */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-neutral-400">
            <a href="#programme" className="transition-colors hover:text-white">Programme 5 Jours</a>
            <a href="#demo" className="transition-colors hover:text-white">Démonstration Live</a>
            <a href="#piliers" className="transition-colors hover:text-white">Pourquoi Claude ?</a>
            <a href="#ressources" className="transition-colors hover:text-white">Ressources & Datasets</a>
            <a href="#faq" className="transition-colors hover:text-white">FAQ</a>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-neutral-300 transition-all hover:border-orange-500/50 hover:text-white cursor-pointer"
              title="Rechercher une slide (⌘K)"
            >
              <Search className="h-3.5 w-3.5 text-orange-400" />
              <span className="hidden sm:inline">Plan</span>
              <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400">⌘K</kbd>
            </button>

            <button
              onClick={() => onSelectDay(1, 0)}
              className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-[0_0_18px_rgba(249,115,22,0.4)] transition-all hover:bg-orange-400 hover:shadow-[0_0_24px_rgba(249,115,22,0.6)] cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Lancer le Deck</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Framer Motion */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-[#0a0a0b] to-[#070708] pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            {/* Top Eyebrow Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1.5 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-orange-400">
                Formation 5 Jours · Claude 3.7 Sonnet & Artifacts
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 max-w-4xl font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
            >
              Maîtrisez l'Analyse des Données avec{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(249,115,22,0.3)]">
                Claude
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-neutral-400"
            >
              Support interactif immersif des 5 jours de masterclass. Explorez les concepts, le code exécutable, les prompts réutilisables et visualisez vos dashboards en direct.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
            >
              <button
                onClick={() => onSelectDay(1, 0)}
                className="group flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(249,115,22,0.45)] transition-all hover:bg-orange-400 hover:scale-[1.02] cursor-pointer"
              >
                <Play className="h-4 w-4 fill-current transition-transform group-hover:scale-110" />
                <span>Démarrer le Jour 01</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onNavigateCurriculum}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-semibold text-neutral-200 transition-all hover:border-white/30 hover:bg-white/10 cursor-pointer"
              >
                <BookOpen className="h-4 w-4 text-orange-400" />
                <span>Programme Détaillé</span>
              </button>

              <button
                onClick={onNavigateResources}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-4 py-3.5 text-sm font-medium text-neutral-400 transition-all hover:border-orange-500/40 hover:text-orange-300 cursor-pointer"
              >
                <FolderOpen className="h-4 w-4" />
                <span>Ressources Gratuites</span>
              </button>
            </motion.div>

            {/* Metric Counters Banner */}
            <motion.div
              variants={itemVariants}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl rounded-2xl border border-white/10 bg-[#0d0d0f]/80 p-5 backdrop-blur-md shadow-2xl"
            >
              <div className="border-r border-white/10 pr-4 text-left last:border-none">
                <span className="block font-display text-2xl sm:text-3xl font-extrabold text-white">5 Jours</span>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">Programme complet</span>
              </div>
              <div className="border-r border-white/10 pr-4 text-left last:border-none">
                <span className="block font-display text-2xl sm:text-3xl font-extrabold text-orange-400">+{totalSlides}</span>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">Slides interactives</span>
              </div>
              <div className="border-r border-white/10 pr-4 text-left last:border-none">
                <span className="block font-display text-2xl sm:text-3xl font-extrabold text-white">100%</span>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">Datasets ouverts</span>
              </div>
              <div className="text-left">
                <span className="block font-display text-2xl sm:text-3xl font-extrabold text-emerald-400">0 €</span>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-wider">Sans compte payant</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Live Demo Section */}
      <section id="demo" className="py-20 border-b border-white/10 bg-[#0a0a0c]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-orange-400">
              <Zap className="h-3.5 w-3.5 text-orange-400" />
              Démonstration Interactive
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Ce que vous allez construire et maîtriser
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base">
              Sélectionnez une fonctionnalité pour visualiser la puissance d'analyse avec l'écosystème Claude.
            </p>
          </div>

          {/* Interactive Simulator Card */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-white/15 bg-[#101014] shadow-2xl">
            {/* Tabs Bar */}
            <div className="flex border-b border-white/10 bg-[#141419] p-2 overflow-x-auto gap-2">
              {demoTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeDemoTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDemoTab(tab.id)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                        : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Content Frame */}
            {(() => {
              const current = demoTabs.find((t) => t.id === activeDemoTab) || demoTabs[0];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 p-6 sm:p-8 gap-8 items-center">
                  {/* Left info & metrics */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full">
                    <div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-400">
                        Cas d'usage concret
                      </span>
                      <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-white">
                        {current.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                        {current.description}
                      </p>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                      <div>
                        <span className="block font-display text-lg font-bold text-orange-400">
                          {current.outputPreview.metric1}
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          {current.outputPreview.metric1Label}
                        </span>
                      </div>
                      <div>
                        <span className="block font-display text-lg font-bold text-white">
                          {current.outputPreview.metric2}
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          {current.outputPreview.metric2Label}
                        </span>
                      </div>
                      <div>
                        <span className="block font-display text-lg font-bold text-emerald-400">
                          {current.outputPreview.metric3}
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          {current.outputPreview.metric3Label}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={() => onSelectDay(activeDemoTab === 'dashboard' ? 1 : activeDemoTab === 'sql' ? 3 : activeDemoTab === 'terminal' ? 3 : 4)}
                        className="flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                      >
                        <span>Voir la slide correspondante dans le cours</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Right code/terminal card */}
                  <div className="lg:col-span-7">
                    <div className="rounded-xl border border-white/10 bg-[#08080a] shadow-inner overflow-hidden">
                      <div className="flex items-center justify-between border-b border-white/10 bg-[#121216] px-4 py-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="h-3 w-3 rounded-full bg-red-500/80" />
                          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                          <span className="ml-2 font-mono text-[11px] text-neutral-400">
                            {activeDemoTab === 'terminal' ? 'terminal-session — bash' : 'claude-artifact.tsx'}
                          </span>
                        </div>
                        <span className="rounded bg-orange-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-orange-400">
                          Claude 3.7
                        </span>
                      </div>
                      <pre className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-neutral-300 overflow-x-auto selection:bg-orange-500/30">
                        {current.codePreview}
                      </pre>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 5-Day Curriculum Roadmap Section */}
      <section id="programme" className="py-20 border-b border-white/10 bg-[#070708]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/30 px-3 py-1 font-mono text-xs uppercase tracking-wider text-orange-400">
                <BookOpen className="h-3.5 w-3.5" />
                Syllabus & Progression
              </div>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Le Programme des 5 Jours en détail
              </h2>
              <p className="mt-2 text-neutral-400 text-sm max-w-xl">
                Un cursus conçu pour transformer votre flux de travail data étape par étape, avec un projet concret validé chaque jour.
              </p>
            </div>

            <button
              onClick={onNavigateCurriculum}
              className="flex items-center gap-2 self-start md:self-auto rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-neutral-200 hover:border-orange-500 hover:text-white transition-all cursor-pointer"
            >
              <span>Afficher la vue liste condensée</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 5 Days Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {days.map((day) => {
              const currentSlide = progressMap[day.day];
              const slideCount = day.slides.length;
              const hasStarted = currentSlide !== null && currentSlide !== undefined;
              const isCompleted = hasStarted && currentSlide >= slideCount;

              return (
                <motion.div
                  key={day.day}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#111115] p-6 shadow-lg transition-all hover:border-orange-500/60 hover:shadow-[0_8px_30px_rgba(249,115,22,0.12)]"
                >
                  <div>
                    {/* Top Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/15 border border-orange-500/30 font-mono text-xs font-bold text-orange-400">
                          0{day.day}
                        </span>
                        <span className="font-mono text-xs text-neutral-400">
                          {slideCount} slides
                        </span>
                      </div>

                      {hasStarted && (
                        <span
                          className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold ${
                            isCompleted
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-orange-500/15 text-orange-400 border border-orange-500/30'
                          }`}
                        >
                          {isCompleted ? '✓ Terminé' : `${currentSlide}/${slideCount}`}
                        </span>
                      )}
                    </div>

                    {/* Day Title */}
                    <h3 className="mt-4 font-display text-lg font-bold text-white line-clamp-2">
                      {day.title}
                    </h3>

                    {/* Objective */}
                    <p className="mt-2.5 text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                      {day.objective}
                    </p>

                    {/* Deliverables preview */}
                    {day.deliverables && day.deliverables.length > 0 && (
                      <div className="mt-4 border-t border-white/10 pt-3">
                        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block mb-1.5">
                          Livrable principal :
                        </span>
                        <p className="text-xs font-medium text-neutral-300 flex items-start gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-orange-400 mt-0.5 flex-none" />
                          <span className="line-clamp-2">{day.deliverables[0]}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => onSelectDay(day.day, 0)}
                      className="group flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3.5 py-2 text-xs font-bold text-white hover:border-orange-500 hover:bg-orange-500 transition-all cursor-pointer w-full justify-center"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>{hasStarted && !isCompleted ? 'Reprendre ce jour' : 'Lancer les slides'}</span>
                      <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.div>
              );
            })}

            {/* Card 6: Resources Portal direct trigger */}
            <motion.div
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between rounded-2xl border border-orange-500/30 bg-gradient-to-br from-neutral-900 via-[#181310] to-[#120e0a] p-6 shadow-lg"
            >
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.4)]">
                    <FolderOpen className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-400">
                    Bonus Inclus
                  </span>
                </div>

                <h3 className="mt-4 font-display text-lg font-bold text-white">
                  Ressources, Cheat-Sheets & Datasets Ouverts
                </h3>

                <p className="mt-2.5 text-xs text-neutral-300 leading-relaxed">
                  Accédez à tous les liens vérifiés : Google Drive partagé du cours, datasets gouvernementaux Open Data, templates de prompt et documentations officielles.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={onNavigateResources}
                  className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-xs font-bold text-white hover:bg-orange-400 transition-all cursor-pointer w-full justify-center shadow-sm"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Ouvrir les Ressources</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section: Why Claude for Data Analytics */}
      <section id="piliers" className="py-20 border-b border-white/10 bg-[#0a0a0d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-orange-400">
              <Lightbulb className="h-3.5 w-3.5" />
              Pourquoi Claude pour la Data ?
            </div>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              4 Piliers qui changent radicalement votre productivité
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-white/10 bg-[#121216] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">Artifacts & Web Viz</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Claude ne se contente pas d'écrire du code : il l'exécute visuellement sous vos yeux avec des interfaces React interactives et des graphiques exploitables.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121216] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">Claude Code & CLI</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Automatisez vos scripts locaux, analysez des volumes massifs de données sans passer par le cloud et intégrez Claude directement dans votre terminal.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121216] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">SQL & Nettoyage Avancé</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Génération de requêtes analytiques avec Window Functions, détection des anomalies métiers et transformation de formats hétérogènes en quelques secondes.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121216] p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400">
                <Bot className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">Agents & Tool Use</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Passez du simple prompt conversationnel à des chaînes d'agents autonomes qui exécutent des outils externes, inspectent et valident vos KPI automatiquement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Speaker & Organization Section */}
      <section className="py-20 border-b border-white/10 bg-[#070708]">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-[#131318] to-[#0d0d10] p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            <div className="flex-none">
              <div className="flex h-32 w-32 sm:h-40 sm:w-40 flex-col items-center justify-center rounded-full border-4 border-orange-500/40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800 via-[#181818] to-[#0d0d0d] text-center shadow-2xl ring-2 ring-orange-500/20">
                <span className="font-display text-3xl font-extrabold text-orange-400">ZD</span>
                <span className="font-mono text-[10px] text-neutral-300 mt-1 font-bold">Data Analyst BI</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="rounded-full bg-orange-500/15 border border-orange-500/30 px-3 py-0.5 font-mono text-[11px] font-bold text-orange-400">
                  Zine El Abidine Dkir · Data Analyst BI
                </span>
                <span className="font-mono text-xs text-neutral-400">
                  Formateur & Consultant BI
                </span>
              </div>

              <h3 className="mt-2.5 font-display text-2xl sm:text-3xl font-bold text-white">
                Pédagogie 100% Pratique & Projets Réels
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                Chaque module combine une immersion conceptuelle avec des ateliers pratiques intensifs. Pas de théorie superflue : vous manipulez directement des jeux de données d'entreprise (Excel, SQL, Power BI, Python) et déployez vos propres livrables avec l'assistance de Claude.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Exercices corrigés
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Support de présentation interactif
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Projets réels & cas pratiques
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 border-b border-white/10 bg-[#0a0a0c]">
        <div className="mx-auto max-w-4xl px-4 sm:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-orange-400">
              <HelpCircle className="h-3.5 w-3.5" />
              Foire Aux Questions
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold text-white tracking-tight">
              Questions fréquentes sur la formation
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-[#121216] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-neutral-400 transition-transform ${
                        isOpen ? 'rotate-180 text-orange-400' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="border-t border-white/5 px-5 pb-5 pt-2 text-xs sm:text-sm leading-relaxed text-neutral-400">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#050506] text-neutral-400 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <span>Formations4data</span>
              <span className="text-neutral-500">·</span>
              <span className="text-neutral-400">Eurêka Services</span>
            </div>
            <p className="mt-1 text-[11px] text-neutral-500">
              Maîtrisez l'Analyse des Données avec Claude — Masterclass 5 Jours.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
            <button onClick={() => onSelectDay(1, 0)} className="hover:text-orange-400 transition-colors cursor-pointer">
              Lancer Slides (J1)
            </button>
            <button onClick={onNavigateCurriculum} className="hover:text-orange-400 transition-colors cursor-pointer">
              Plan des 5 Jours
            </button>
            <button onClick={onNavigateResources} className="hover:text-orange-400 transition-colors cursor-pointer">
              Ressources & Datasets
            </button>
            <button onClick={onOpenCommandPalette} className="hover:text-orange-400 transition-colors cursor-pointer">
              Recherche (⌘K)
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
