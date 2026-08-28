import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import JSZip from 'jszip';
import {
  X,
  ExternalLink,
  Github,
  Globe,
  Play,
  Copy,
  Check,
  Sparkles,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Package,
  Layers,
  FileCode,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Filter,
  RefreshCw,
  Search,
  CheckCircle2,
  Database,
  Briefcase,
  Award,
  PieChart as PieIcon,
  Clock,
  Activity,
  Download,
  FileArchive,
  BookOpen,
  Users,
  Lightbulb,
  CheckSquare,
  HelpCircle,
} from 'lucide-react';
import { playSlideTransition, playSwitchClick } from '../../utils/soundEffects';
import { Day3DeliverableContent } from './Day3DeliverableContent';

interface DeliverablePreviewModalProps {
  isOpen: boolean;
  dayNumber: number;
  onClose: () => void;
  onLaunchDay: (dayNumber: number, slideIdx?: number) => void;
  theme?: 'dark' | 'light';
}

export const DeliverablePreviewModal: React.FC<DeliverablePreviewModalProps> = ({
  isOpen,
  dayNumber,
  onClose,
  onLaunchDay,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  // Tabs for modal
  const [activeTab, setActiveTab] = useState<'business' | 'preview' | 'export' | 'prompt'>('preview');
  const [chartViewMode, setChartViewMode] = useState<'all' | 'category' | 'delays'>('all');

  // Interactive filters for Day 1 Dashboard
  const [selectedCenter, setSelectedCenter] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedGitClone, setCopiedGitClone] = useState<boolean>(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);
  const [zipSuccess, setZipSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  // Day 1 Sample Live Dataset
  const rawData = [
    { id: 1, centre: 'Centre 1 - Nord', categorie: 'Vaccins', stock: 128, seuil: 50, rupture: false, delai: '2j', delaiJours: 2, tendance: '+4%' },
    { id: 2, centre: 'Centre 2 - Sud', categorie: 'Médicaments', stock: 140, seuil: 100, rupture: false, delai: '3j', delaiJours: 3, tendance: '+12%' },
    { id: 3, centre: 'Centre 3 - Est', categorie: 'Vaccins', stock: 24, seuil: 60, rupture: true, delai: '7j', delaiJours: 7, tendance: '-35%' },
    { id: 4, centre: 'Centre 4 - Ouest', categorie: 'Matériel', stock: 112, seuil: 40, rupture: false, delai: '1j', delaiJours: 1, tendance: '+8%' },
    { id: 5, centre: 'Centre 1 - Nord', categorie: 'Antibiotiques', stock: 18, seuil: 45, rupture: true, delai: '5j', delaiJours: 5, tendance: '-22%' },
    { id: 6, centre: 'Centre 2 - Sud', categorie: 'Vaccins', stock: 85, seuil: 50, rupture: false, delai: '2j', delaiJours: 2, tendance: '+15%' },
    { id: 7, centre: 'Centre 3 - Est', categorie: 'Matériel', stock: 15, seuil: 30, rupture: true, delai: '6j', delaiJours: 6, tendance: '-18%' },
    { id: 8, centre: 'Centre 4 - Ouest', categorie: 'Antibiotiques', stock: 95, seuil: 40, rupture: false, delai: '2j', delaiJours: 2, tendance: '+5%' },
  ];

  const filteredData = rawData.filter((item) => {
    if (selectedCenter !== 'all' && !item.centre.toLowerCase().includes(selectedCenter.toLowerCase())) return false;
    if (selectedStatus === 'rupture' && !item.rupture) return false;
    if (selectedStatus === 'normal' && item.rupture) return false;
    if (searchFilter && !item.centre.toLowerCase().includes(searchFilter.toLowerCase()) && !item.categorie.toLowerCase().includes(searchFilter.toLowerCase())) return false;
    return true;
  });

  const totalStock = filteredData.reduce((acc, curr) => acc + curr.stock, 0);
  const totalRuptures = filteredData.filter((i) => i.rupture).length;
  const ruptureRate = filteredData.length > 0 ? Math.round((totalRuptures / filteredData.length) * 100) : 0;
  const avgDelayNumber = (filteredData.reduce((acc, c) => acc + c.delaiJours, 0) / (filteredData.length || 1)).toFixed(1);
  const avgDelay = `${avgDelayNumber} jours`;

  // Aggregate by Category
  const categoriesList = ['Vaccins', 'Médicaments', 'Antibiotiques', 'Matériel'];
  const categoryStats = categoriesList.map((cat) => {
    const items = filteredData.filter((i) => i.categorie === cat);
    const sum = items.reduce((acc, curr) => acc + curr.stock, 0);
    const ruptures = items.filter((i) => i.rupture).length;
    return { name: cat, total: sum, count: items.length, ruptures };
  });

  // Aggregate by Centre
  const centersList = ['Centre 1 - Nord', 'Centre 2 - Sud', 'Centre 3 - Est', 'Centre 4 - Ouest'];
  const centerStats = centersList.map((cName) => {
    const items = rawData.filter((i) => i.centre === cName);
    const sum = items.reduce((acc, curr) => acc + curr.stock, 0);
    const ruptures = items.filter((i) => i.rupture).length;
    const avgD = (items.reduce((acc, curr) => acc + curr.delaiJours, 0) / items.length).toFixed(1);
    return { name: cName, stock: sum, ruptures, avgD };
  });

  const gitCloneCommand = 'git clone https://github.com/zayn4data/dashboard-suivi-stocks-j01.git';

  const samplePromptDay1 = `Tu es un Data Analyst et développeur BI expert.
Je dispose d'un jeu de données de stocks pour 4 centres de santé (Centre 1 à 4) avec colonnes : Centre, Catégorie, Stock Actuel, Seuil Minimum, Délai.

1. Nettoie les données (incohérences de casse, formats de dates, doublons).
2. Crée un Dashboard interactif moderne (HTML5 + Tailwind CSS + Vanilla JS) comprenant :
   - 4 Cartes d'indicateurs clés (Total Stock, Taux de Rupture %, Centres en Alerte, Délai Moyen).
   - Un graphique comparatif stocks réels vs seuils critiques par centre.
   - Un graphique de répartition volumétrique par catégorie de produit.
   - Un graphique d'analyse des délais logistiques par centre.
   - Une table filtrable par centre et par statut de stock avec recherche en direct.
   - Une palette de couleurs professionnelle (fond sombre, accents orange #F97316, cyan #06B6D4, émeraude #10B981).
3. Rends le code autonome et prêt à être déployé sur GitHub Pages en un clic.`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(samplePromptDay1);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyGitClone = () => {
    navigator.clipboard.writeText(gitCloneCommand);
    setCopiedGitClone(true);
    setTimeout(() => setCopiedGitClone(false), 2000);
  };

  // Generate and download full project ZIP
  const handleDownloadZip = async () => {
    try {
      setIsDownloadingZip(true);
      const zip = new JSZip();

      // HTML File
      const htmlContent = `<!DOCTYPE html>
<html lang="fr" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Suivi des Stocks - Zayn4data Masterclass</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-mono { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body class="bg-[#090b12] text-slate-100 min-h-screen p-4 sm:p-8">
  <div class="max-w-6xl mx-auto space-y-6">
    <header class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
      <div>
        <span class="text-orange-500 font-mono text-xs font-bold uppercase tracking-wider">Masterclass Data & IA · Livrable J01</span>
        <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Dashboard Suivi des Stocks de Santé</h1>
        <p class="text-slate-400 text-sm">Pilotage opérationnel multi-centres & détection préventive des ruptures</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">● Déployé sur GitHub Pages</span>
      </div>
    </header>

    <!-- KPI Grid -->
    <div id="kpi-grid" class="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono"></div>

    <!-- Filters & Table -->
    <div class="bg-[#0f1424] rounded-2xl border border-white/10 p-5 space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <h2 class="text-lg font-bold text-white">État Détaillé des Stocks</h2>
        <div class="flex items-center gap-2">
          <input id="search-input" type="text" placeholder="Filtrer un médicament..." class="bg-black/60 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500">
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs" id="stocks-table">
          <thead class="border-b border-white/10 text-slate-400 uppercase text-[10px] font-mono">
            <tr>
              <th class="p-3">Centre</th>
              <th class="p-3">Catégorie</th>
              <th class="p-3">Stock Actuel</th>
              <th class="p-3">Seuil Sécurité</th>
              <th class="p-3">Délai Réappro</th>
              <th class="p-3">Statut</th>
            </tr>
          </thead>
          <tbody id="table-body" class="divide-y divide-white/5"></tbody>
        </table>
      </div>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>`;

      // JS File
      const jsContent = `// Données des stocks - Masterclass Data & IA (Zayn4data)
const rawData = ${JSON.stringify(rawData, null, 2)};

function render() {
  const totalStock = rawData.reduce((acc, c) => acc + c.stock, 0);
  const ruptures = rawData.filter(c => c.rupture).length;
  const rate = Math.round((ruptures / rawData.length) * 100);

  document.getElementById('kpi-grid').innerHTML = \`
    <div class="bg-[#0d101a] border border-cyan-500/20 p-4 rounded-xl">
      <div class="text-xs text-slate-400">Stock Total</div>
      <div class="text-2xl font-bold text-cyan-400">\${totalStock} u.</div>
    </div>
    <div class="bg-[#0d101a] border border-rose-500/20 p-4 rounded-xl">
      <div class="text-xs text-slate-400">Taux de Rupture</div>
      <div class="text-2xl font-bold text-rose-400">\${rate}%</div>
    </div>
    <div class="bg-[#0d101a] border border-amber-500/20 p-4 rounded-xl">
      <div class="text-xs text-slate-400">Centres en Alerte</div>
      <div class="text-2xl font-bold text-amber-400">2 / 4</div>
    </div>
    <div class="bg-[#0d101a] border border-emerald-500/20 p-4 rounded-xl">
      <div class="text-xs text-slate-400">Délai Moyen</div>
      <div class="text-2xl font-bold text-emerald-400">2.8 jours</div>
    </div>
  \`;

  const tbody = document.getElementById('table-body');
  tbody.innerHTML = rawData.map(r => \`
    <tr class="hover:bg-white/5">
      <td class="p-3 font-semibold text-white">\${r.centre}</td>
      <td class="p-3 text-slate-400">\${r.categorie}</td>
      <td class="p-3 font-mono font-bold">\${r.stock}</td>
      <td class="p-3 font-mono text-slate-400">\${r.seuil}</td>
      <td class="p-3 font-mono">\${r.delai}</td>
      <td class="p-3">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold \${r.rupture ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}">
          \${r.rupture ? '⚠️ Rupture' : '✅ Conforme'}
        </span>
      </td>
    </tr>
  \`).join('');
}

document.addEventListener('DOMContentLoaded', render);`;

      // Data JSON File
      const dataJsonContent = JSON.stringify(rawData, null, 2);

      // README File
      const readmeContent = `# Dashboard de Suivi des Stocks (Livrable Jour 01)
Masterclass Data & IA — Animée par Zayn4data.

## 📌 Présentation du Projet
Projet de tableau de bord décisionnel conçu pour la surveillance en temps réel des stocks de santé répartis sur 4 centres.

## 🚀 Démarrage Rapide
1. Double-cliquez simplement sur \`index.html\` pour lancer le dashboard dans votre navigateur (aucun serveur requis).
2. Pour modifier les données, éditez le fichier \`data.json\` ou \`app.js\`.

## 🌐 Déploiement gratuit sur GitHub Pages
1. Créez un nouveau dépôt public sur votre compte GitHub nommé \`dashboard-stocks\`.
2. Déposez les fichiers (\`index.html\`, \`app.js\`, \`data.json\`, \`README.md\`).
3. Rendez-vous dans **Settings > Pages > Branch: main > Save**.
4. Votre tableau de bord sera disponible en ligne gratuitement sous 60 secondes !
`;

      zip.file('index.html', htmlContent);
      zip.file('app.js', jsContent);
      zip.file('data.json', dataJsonContent);
      zip.file('README.md', readmeContent);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dashboard-suivi-stocks-j01-zayn4data.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setZipSuccess(true);
      setTimeout(() => setZipSuccess(false), 3000);
    } catch (err) {
      console.error('Erreur téléchargement ZIP:', err);
    } finally {
      setIsDownloadingZip(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto backdrop-blur-md bg-black/80">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className={`relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
            isLight
              ? 'bg-[#ffffff] border-neutral-200 text-neutral-900'
              : 'bg-[#090b12] border-orange-500/30 text-neutral-100 shadow-[0_0_50px_rgba(249,115,22,0.15)]'
          }`}
        >
          {/* Header Bar */}
          <div
            className={`flex items-center justify-between px-5 py-4 border-b shrink-0 ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0f1422] border-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-500">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-500">
                    Livrable Jour 0{dayNumber} · Projet Pratique Clé en Main
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-500">
                    Accessible & Téléchargeable
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold">
                  {dayNumber === 1
                    ? '1er Dashboard Interactif : Suivi des Stocks & Déploiement GitHub'
                    : dayNumber === 2
                    ? 'Audit de Données Réelles & Tableau de Bord Excel / Power BI'
                    : dayNumber === 3
                    ? 'Projet Transversal : Audit Risque de Crédit Microfinance (SQL, Python & R)'
                    : dayNumber === 4
                    ? 'Site Portfolio Data publié + Plan Stratégique Carrière 90 Jours'
                    : 'Certification, Restitution & Démarrage du Plan d\'Action'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {dayNumber === 1 && (
                <button
                  onClick={handleDownloadZip}
                  disabled={isDownloadingZip}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-black font-display text-xs font-bold shadow-md hover:brightness-110 cursor-pointer disabled:opacity-50"
                  title="Télécharger l'ensemble des fichiers HTML, JS, JSON et README au format ZIP"
                >
                  {zipSuccess ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
                  <span>{zipSuccess ? 'ZIP Téléchargé !' : 'Télécharger (.ZIP)'}</span>
                </button>
              )}

              <button
                onClick={onClose}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-600'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* If Day 3, render dedicated Day 3 content */}
          {dayNumber === 3 ? (
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <Day3DeliverableContent theme={theme} onLaunchDay={onLaunchDay} />
            </div>
          ) : (
            <>
              {/* Navigation Bar between Stakeholder view, Live Preview, Export/Clone & Prompt */}
              <div
                className={`px-5 py-3 border-b flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${
                  isLight ? 'bg-neutral-100/70 border-neutral-200' : 'bg-[#07090e] border-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400 text-[11px] uppercase font-bold tracking-wider">
                    Sections du Projet :
                  </span>
                </div>

                {/* 4 Clear Navigation Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                  <button
                    onClick={() => {
                      playSwitchClick(true);
                      setActiveTab('business');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'business'
                        ? 'bg-amber-500 text-black shadow-md'
                        : isLight
                        ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                        : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <Lightbulb className="h-3.5 w-3.5" />
                    <span>1. Cas Métier & Décisions</span>
                  </button>

                  <button
                    onClick={() => {
                      playSwitchClick(true);
                      setActiveTab('preview');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'preview'
                        ? 'bg-orange-500 text-black shadow-md'
                        : isLight
                        ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                        : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <BarChart3 className="h-3.5 w-3.5" />
                    <span>2. Dashboard Live ({filteredData.length} lignes)</span>
                  </button>

                  <button
                    onClick={() => {
                      playSwitchClick(true);
                      setActiveTab('export');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'export'
                        ? 'bg-cyan-500 text-black shadow-md'
                        : isLight
                        ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                        : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <FileArchive className="h-3.5 w-3.5" />
                    <span>3. Télécharger ZIP & Cloner Repo</span>
                  </button>

                  <button
                    onClick={() => {
                      playSwitchClick(true);
                      setActiveTab('prompt');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTab === 'prompt'
                        ? 'bg-purple-500 text-white shadow-md'
                        : isLight
                        ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                        : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>4. Prompt Claude IA</span>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
            {/* TAB 1: Business Case for Stakeholders & Users */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                {/* Executive Summary Card */}
                <div
                  className={`p-5 rounded-2xl border ${
                    isLight
                      ? 'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50/50 border-amber-200 text-amber-950'
                      : 'bg-gradient-to-r from-amber-950/40 via-[#0e1322] to-orange-950/30 border-amber-500/30 text-neutral-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-1">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-500">
                        Étude de Cas Métier · Pour la Direction & les Parties Prenantes
                      </span>
                      <h4 className="font-display text-base sm:text-lg font-bold text-white">
                        Optimisation et Prévention des Ruptures de Stocks Médicaux sur 4 Centres
                      </h4>
                      <p className="font-sans text-xs sm:text-sm leading-relaxed text-neutral-300">
                        Ce projet démontre comment un Data Analyst transforme en <strong>moins de 2 heures</strong> un tableau Excel brut et désorganisé en un outil de pilotage stratégique interactif, permettant aux responsables d'anticiper les ruptures et de réallouer les ressources efficacement.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3 Pillars: Problème Métier, Solution Apportée, Valeur & Décisions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
                  {/* Pillar 1 */}
                  <div
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0d101a] border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      <span>1. La Problématique Métier</span>
                    </div>
                    <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed list-disc list-inside">
                      <li><strong className="text-neutral-200">Visibilité fragmentée :</strong> Les responsables de centres saisissaient les stocks sur des fichiers Excel séparés sans consolidation.</li>
                      <li><strong className="text-neutral-200">Ruptures critiques non anticipées :</strong> Les alertes étaient constatées trop tard (quand le produit était déjà épuisé).</li>
                      <li><strong className="text-neutral-200">Pertes de temps :</strong> 4 heures perdues par semaine pour consolider manuellement les données.</li>
                    </ul>
                  </div>

                  {/* Pillar 2 */}
                  <div
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0d101a] border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-cyan-500 font-bold text-sm">
                      <BarChart3 className="h-4 w-4" />
                      <span>2. La Solution Interactive</span>
                    </div>
                    <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed list-disc list-inside">
                      <li><strong className="text-neutral-200">Dashboard 100% web :</strong> Accessible depuis n'importe quel ordinateur ou tablette sans installer de logiciel lourd.</li>
                      <li><strong className="text-neutral-200">Alertes visuelles immédiates :</strong> Détection automatique dès qu'un stock passe sous le seuil critique (surbrillance rouge).</li>
                      <li><strong className="text-neutral-200">Filtres dynamiques :</strong> Sélection instantanée par centre géographique et par type de médicament.</li>
                    </ul>
                  </div>

                  {/* Pillar 3 */}
                  <div
                    className={`p-5 rounded-2xl border space-y-3 ${
                      isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0d101a] border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>3. Décisions & Valeur ROI</span>
                    </div>
                    <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed list-disc list-inside">
                      <li><strong className="text-neutral-200">Réallocation inter-centres :</strong> Transfert préventif de surplus (ex: Centre 2 vers Centre 3) sans commande coûteuse.</li>
                      <li><strong className="text-neutral-200">Zéro coût d'hébergement :</strong> Publication 100% gratuite et sécurisée sur GitHub Pages.</li>
                      <li><strong className="text-neutral-200">Autonomie des équipes :</strong> Décideurs informés en temps réel sans dépendre du service informatique.</li>
                    </ul>
                  </div>
                </div>

                {/* Practical Takeaway Box */}
                <div
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                    isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0c0f18] border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                    <p className="text-xs text-neutral-300">
                      <strong>Compétence acquise au Jour 01 :</strong> Savoir dialoguer avec une IA (Claude) pour générer l'architecture analytique et publier le projet pour les décideurs.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('preview')}
                    className="px-4 py-2 rounded-xl bg-orange-500 text-black font-display text-xs font-bold shrink-0 hover:bg-orange-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Tester le Dashboard en Direct</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Interactive Live Preview with 3 Rich Graphs */}
            {activeTab === 'preview' && (
              <div className="space-y-6">
                {/* Intro banner */}
                <div
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isLight
                      ? 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 text-orange-950'
                      : 'bg-gradient-to-r from-orange-950/30 to-[#0e121e] border-orange-500/20 text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center shrink-0">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-orange-500">
                        Projet interactif opérationnel
                      </p>
                      <p className="text-xs sm:text-sm font-medium">
                        Testez les filtres ci-dessous : les 4 indicateurs et les 3 graphiques analytiques s'ajustent instantanément.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 font-mono text-xs">
                    <button
                      onClick={() => {
                        setSelectedCenter('all');
                        setSelectedStatus('all');
                        setSearchFilter('');
                      }}
                      className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors cursor-pointer ${
                        isLight
                          ? 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-700'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300'
                      }`}
                    >
                      <RefreshCw className="h-3 w-3" />
                      Réinitialiser
                    </button>
                  </div>
                </div>

                {/* Dashboard Controls / Filters */}
                <div
                  className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                    isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0f1424]/90 border-white/10'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Center Filter */}
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <Filter className="h-3.5 w-3.5 text-orange-500" />
                      <span className={isLight ? 'text-neutral-600 font-semibold' : 'text-neutral-400'}>Centre:</span>
                      <select
                        value={selectedCenter}
                        onChange={(e) => setSelectedCenter(e.target.value)}
                        className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                          isLight
                            ? 'bg-neutral-100 border-neutral-300 text-neutral-800'
                            : 'bg-black/60 border-white/15 text-white'
                        }`}
                      >
                        <option value="all">Tous les centres (4)</option>
                        <option value="centre 1">Centre 1 - Nord</option>
                        <option value="centre 2">Centre 2 - Sud</option>
                        <option value="centre 3">Centre 3 - Est</option>
                        <option value="centre 4">Centre 4 - Ouest</option>
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className={isLight ? 'text-neutral-600 font-semibold' : 'text-neutral-400'}>Statut:</span>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className={`px-2.5 py-1.5 rounded-lg border font-mono text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                          isLight
                            ? 'bg-neutral-100 border-neutral-300 text-neutral-800'
                            : 'bg-black/60 border-white/15 text-white'
                        }`}
                      >
                        <option value="all">Tous statuts</option>
                        <option value="rupture">⚠️ En rupture / Alerte</option>
                        <option value="normal">✅ Stock conforme</option>
                      </select>
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative min-w-[200px]">
                    <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Filtrer médicament, vaccin..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className={`w-full pl-8 pr-3 py-1.5 rounded-lg border text-xs font-sans focus:outline-none focus:ring-1 focus:ring-orange-500 ${
                        isLight
                          ? 'bg-neutral-100 border-neutral-300 text-neutral-800'
                          : 'bg-black/60 border-white/15 text-white'
                      }`}
                    />
                  </div>
                </div>

                {/* 4 Interactive KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono">
                  <div
                    className={`p-4 rounded-2xl border ${
                      isLight
                        ? 'bg-white border-neutral-200 shadow-sm'
                        : 'bg-[#0d101a] border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                      <span>Stock Total Disponible</span>
                      <Package className="h-4 w-4 text-cyan-500" />
                    </div>
                    <div className="text-2xl font-bold font-display text-cyan-500">{totalStock} unités</div>
                    <div className="text-[10px] text-emerald-500 font-sans mt-1">4 catégories surveillées</div>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border ${
                      isLight
                        ? 'bg-white border-neutral-200 shadow-sm'
                        : 'bg-[#0d101a] border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                      <span>Taux de Rupture Global</span>
                      <AlertTriangle className="h-4 w-4 text-rose-500" />
                    </div>
                    <div className="text-2xl font-bold font-display text-rose-500">{ruptureRate}%</div>
                    <div className="text-[10px] text-rose-400 font-sans mt-1">
                      {totalRuptures} produit(s) sous le seuil minimum
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border ${
                      isLight
                        ? 'bg-white border-neutral-200 shadow-sm'
                        : 'bg-[#0d101a] border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                      <span>Centres en Alerte</span>
                      <TrendingUp className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="text-2xl font-bold font-display text-amber-500">
                      {selectedCenter !== 'all' ? (totalRuptures > 0 ? '1' : '0') : '2'} / 4
                    </div>
                    <div className="text-[10px] text-amber-400 font-sans mt-1">Centre 3 (Est) prioritaire</div>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border ${
                      isLight
                        ? 'bg-white border-neutral-200 shadow-sm'
                        : 'bg-[#0d101a] border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-1">
                      <span>Délai Réappro Moyen</span>
                      <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    </div>
                    <div className="text-2xl font-bold font-display text-emerald-500">{avgDelay}</div>
                    <div className="text-[10px] text-emerald-400 font-sans mt-1">Livraisons conformes</div>
                  </div>
                </div>

                {/* 3 Visual Charts Section */}
                <div className="space-y-4">
                  {/* Chart Tabs selector */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase font-bold text-orange-500">
                        Visualisations Analytiques :
                      </span>
                      <div className="flex items-center gap-1 font-mono text-xs">
                        <button
                          onClick={() => setChartViewMode('all')}
                          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                            chartViewMode === 'all'
                              ? 'bg-orange-500 text-black font-bold'
                              : isLight
                              ? 'bg-neutral-100 text-neutral-600 hover:text-black'
                              : 'bg-white/5 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <BarChart3 className="h-3 w-3 inline mr-1" />
                          Vue d'ensemble
                        </button>
                        <button
                          onClick={() => setChartViewMode('category')}
                          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                            chartViewMode === 'category'
                              ? 'bg-cyan-500 text-black font-bold'
                              : isLight
                              ? 'bg-neutral-100 text-neutral-600 hover:text-black'
                              : 'bg-white/5 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <PieIcon className="h-3 w-3 inline mr-1" />
                          Par Catégorie
                        </button>
                        <button
                          onClick={() => setChartViewMode('delays')}
                          className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                            chartViewMode === 'delays'
                              ? 'bg-amber-500 text-black font-bold'
                              : isLight
                              ? 'bg-neutral-100 text-neutral-600 hover:text-black'
                              : 'bg-white/5 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <Clock className="h-3 w-3 inline mr-1" />
                          Délais Logistiques
                        </button>
                      </div>
                    </div>

                    <span className="font-mono text-[11px] text-neutral-400 flex items-center gap-1">
                      <Activity className="h-3 w-3 text-emerald-500" />
                      Calculs réactifs en direct
                    </span>
                  </div>

                  {/* Main Grid of Visualizations */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Graph 1: Stocks Réels vs Seuils Critiques */}
                    <div
                      className={`p-5 rounded-2xl border space-y-3 ${
                        chartViewMode === 'all'
                          ? 'lg:col-span-7'
                          : chartViewMode === 'delays'
                          ? 'lg:col-span-6'
                          : 'lg:col-span-6'
                      } ${isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c0f18] border-white/10'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display font-bold text-xs sm:text-sm flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-orange-500" />
                            Stocks Réels vs Seuils Critiques (Par Ligne)
                          </h4>
                          <p className="text-[11px] text-neutral-400 font-sans">
                            La ligne verticale dorée indique le seuil minimal de sécurité
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-orange-500 font-bold bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                          {filteredData.length} items
                        </span>
                      </div>

                      {/* Bar List */}
                      <div className="space-y-2.5 pt-1">
                        {filteredData.slice(0, 5).map((row) => {
                          const maxVal = 160;
                          const currentPct = Math.min(100, Math.round((row.stock / maxVal) * 100));
                          const seuilPct = Math.min(100, Math.round((row.seuil / maxVal) * 100));

                          return (
                            <div key={row.id} className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-mono">
                                <span className="font-bold font-sans text-[11px] truncate max-w-[200px]">
                                  {row.centre} · <span className="text-neutral-400 font-normal">{row.categorie}</span>
                                </span>
                                <div className="flex items-center gap-2 text-[11px]">
                                  <span className={row.rupture ? 'text-rose-500 font-bold' : 'text-cyan-400 font-bold'}>
                                    {row.stock} u.
                                  </span>
                                  <span className="text-neutral-400 text-[10px]">(Seuil: {row.seuil})</span>
                                </div>
                              </div>

                              <div className="relative w-full h-4 rounded bg-neutral-800/40 overflow-hidden border border-white/5">
                                {/* Seuil Line */}
                                <div
                                  className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10"
                                  style={{ left: `${seuilPct}%` }}
                                  title={`Seuil critique: ${row.seuil} unités`}
                                />

                                {/* Stock bar */}
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${currentPct}%` }}
                                  transition={{ duration: 0.5 }}
                                  className={`h-full rounded ${
                                    row.rupture
                                      ? 'bg-gradient-to-r from-rose-600 to-rose-400'
                                      : 'bg-gradient-to-r from-cyan-600 to-cyan-400'
                                  }`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Graph 2: Volumétrie & Ruptures par Catégorie */}
                    <div
                      className={`p-5 rounded-2xl border space-y-3 ${
                        chartViewMode === 'all'
                          ? 'lg:col-span-5'
                          : chartViewMode === 'category'
                          ? 'lg:col-span-6'
                          : 'lg:col-span-6'
                      } ${isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c0f18] border-white/10'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-display font-bold text-xs sm:text-sm flex items-center gap-2">
                            <PieIcon className="h-4 w-4 text-cyan-500" />
                            Répartition des Volumes par Catégorie
                          </h4>
                          <p className="text-[11px] text-neutral-400 font-sans">
                            Part de stock et détection des alertes par famille
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-cyan-500 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {categoriesList.length} catégories
                        </span>
                      </div>

                      {/* Category horizontal bars with breakdown */}
                      <div className="space-y-3 pt-1 font-mono text-xs">
                        {categoryStats.map((cat) => {
                          const maxCat = Math.max(...categoryStats.map((c) => c.total), 1);
                          const pct = Math.round((cat.total / (totalStock || 1)) * 100);
                          const barWidth = Math.round((cat.total / maxCat) * 100);

                          return (
                            <div key={cat.name} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-sans font-semibold text-[11px] flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
                                  {cat.name}
                                </span>
                                <div className="flex items-center gap-2 text-[11px]">
                                  <span className="font-bold text-cyan-400">{cat.total} u.</span>
                                  <span className="text-neutral-400">({pct}%)</span>
                                  {cat.ruptures > 0 ? (
                                    <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                                      {cat.ruptures} alerte(s)
                                    </span>
                                  ) : (
                                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">
                                      OK
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="w-full h-3 rounded bg-neutral-800/40 overflow-hidden border border-white/5 flex">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${barWidth}%` }}
                                  transition={{ duration: 0.5 }}
                                  className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-teal-400 rounded"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Graph 3: Matrice de Performance & Délais Logistiques par Centre */}
                    <div
                      className={`p-5 rounded-2xl border space-y-3 lg:col-span-12 ${
                        isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c0f18] border-white/10'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h4 className="font-display font-bold text-xs sm:text-sm flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-emerald-500" />
                            Comparatif Logistique Multi-Centres (Capacité & Délais de Livraison)
                          </h4>
                          <p className="text-[11px] text-neutral-400 font-sans">
                            Visualisation croisée du volume global, des alertes et des délais moyens de réapprovisionnement
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          4 Centres Opérationnels
                        </span>
                      </div>

                      {/* 4 Multi-Center Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1 font-mono">
                        {centerStats.map((c) => {
                          const isAlert = c.ruptures > 0;
                          return (
                            <div
                              key={c.name}
                              className={`p-3.5 rounded-xl border transition-all ${
                                isAlert
                                  ? isLight
                                    ? 'bg-rose-50/70 border-rose-200'
                                    : 'bg-[#150e12] border-rose-500/30'
                                  : isLight
                                  ? 'bg-neutral-50 border-neutral-200'
                                  : 'bg-white/[0.02] border-white/10'
                              }`}
                            >
                              <div className="flex items-center justify-between text-xs mb-1.5">
                                <span className="font-sans font-bold text-[12px] truncate">{c.name}</span>
                                {isAlert ? (
                                  <span className="flex items-center gap-1 text-[10px] font-bold text-rose-500">
                                    <AlertTriangle className="h-3 w-3" />
                                    Critique
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Optimal
                                  </span>
                                )}
                              </div>

                              <div className="space-y-1.5 text-xs">
                                <div className="flex items-center justify-between">
                                  <span className="text-neutral-400 text-[11px]">Stock cumulé :</span>
                                  <span className="font-bold">{c.stock} u.</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-neutral-400 text-[11px]">Délai livraison :</span>
                                  <span className="font-bold text-amber-400">{c.avgD} jours</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-neutral-400 text-[11px]">Lignes en rupture :</span>
                                  <span className={c.ruptures > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                                    {c.ruptures} / 2
                                  </span>
                                </div>

                                {/* Mini gauge */}
                                <div className="w-full h-1.5 rounded-full bg-neutral-800 overflow-hidden mt-2">
                                  <div
                                    className={`h-full rounded-full ${
                                      isAlert ? 'bg-rose-500' : 'bg-emerald-500'
                                    }`}
                                    style={{ width: `${Math.min(100, Math.round((c.stock / 230) * 100))}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtered Data Table */}
                <div
                  className={`rounded-2xl border overflow-hidden ${
                    isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c0f18] border-white/10'
                  }`}
                >
                  <div className="px-4 py-3 border-b flex items-center justify-between">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-500">
                      Tableau des Données de Santé ({filteredData.length} lignes)
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400">Recherche instantanée active</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs">
                      <thead
                        className={`font-mono text-[11px] uppercase border-b ${
                          isLight ? 'bg-neutral-50 text-neutral-600 border-neutral-200' : 'bg-white/5 text-neutral-400 border-white/5'
                        }`}
                      >
                        <tr>
                          <th className="p-3">Centre</th>
                          <th className="p-3">Catégorie</th>
                          <th className="p-3">Stock Actuel</th>
                          <th className="p-3">Seuil Sécurité</th>
                          <th className="p-3">Délai Réappro</th>
                          <th className="p-3">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredData.map((item) => (
                          <tr
                            key={item.id}
                            className={`transition-colors ${
                              isLight ? 'hover:bg-neutral-50' : 'hover:bg-white/[0.02]'
                            }`}
                          >
                            <td className="p-3 font-semibold">{item.centre}</td>
                            <td className="p-3 text-neutral-400">{item.categorie}</td>
                            <td className="p-3 font-mono font-bold">{item.stock} unités</td>
                            <td className="p-3 font-mono text-neutral-400">{item.seuil} unités</td>
                            <td className="p-3 font-mono">{item.delai}</td>
                            <td className="p-3 font-mono">
                              {item.rupture ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                                  <AlertTriangle className="h-3 w-3" />
                                  Alerte Rupture
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Conforme
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Claude Analytical Insight Box */}
                <div
                  className={`p-4 rounded-2xl border flex items-start gap-3 font-sans text-xs ${
                    isLight
                      ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                      : 'bg-gradient-to-r from-orange-950/40 to-[#0e121e] border-orange-500/30 text-neutral-300'
                  }`}
                >
                  <div className="h-7 w-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-orange-500 block mb-1">
                      Insight Décisionnel Généré par Claude IA
                    </span>
                    <p className="leading-relaxed">
                      « <strong>Recommandation Opérationnelle :</strong> Le Centre 3 (Est) nécessite un réapprovisionnement d'urgence en vaccins sous 48h (stock critique de 24 unités). Une réaffectation de 30 unités depuis le stock excédentaire du Centre 2 permettrait de combler le déficit immédiatement sans surcoût. »
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: How to Clone & Download ZIP */}
            {activeTab === 'export' && (
              <div className="space-y-6 font-sans">
                {/* Download and Clone Action Card */}
                <div
                  className={`p-6 rounded-2xl border space-y-4 ${
                    isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c0f18] border-white/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-display font-bold text-base flex items-center gap-2 text-white">
                        <FileArchive className="h-5 w-5 text-cyan-400" />
                        Récupérer le Projet Complet (100% Autonome)
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Tous les fichiers (HTML, JS, données JSON, README) prêts à fonctionner sur votre machine ou sur GitHub.
                      </p>
                    </div>

                    {/* Big Download ZIP Button */}
                    <button
                      onClick={handleDownloadZip}
                      disabled={isDownloadingZip}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 text-black font-display text-xs font-extrabold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {zipSuccess ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                      <span>{zipSuccess ? 'ZIP Téléchargé avec Succès !' : 'Télécharger le Pack .ZIP'}</span>
                    </button>
                  </div>

                  {/* Git Clone box with copy button */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-neutral-400 flex items-center gap-1.5">
                        <Terminal className="h-3.5 w-3.5 text-orange-500" />
                        Ou Cloner directement via Git :
                      </span>
                      <button
                        onClick={copyGitClone}
                        className="flex items-center gap-1 text-[11px] font-mono text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                      >
                        {copiedGitClone ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedGitClone ? 'Copié !' : 'Copier la commande'}</span>
                      </button>
                    </div>

                    <div
                      className={`p-3 rounded-xl border font-mono text-xs flex items-center justify-between select-all ${
                        isLight ? 'bg-neutral-100 border-neutral-300 text-neutral-800' : 'bg-black/70 border-white/10 text-neutral-200'
                      }`}
                    >
                      <span className="truncate">{gitCloneCommand}</span>
                    </div>
                  </div>
                </div>

                {/* 3 Step Simple Guide for Participants & Stakeholders */}
                <div className="space-y-3">
                  <h4 className="font-display font-bold text-sm uppercase tracking-wider text-orange-500 font-mono">
                    Guide Débutant : Comment utiliser ce livrable en 3 étapes simples
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Step 1 */}
                    <div
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0f1424] border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-cyan-400">Étape 01</span>
                        <Package className="h-4 w-4 text-cyan-400" />
                      </div>
                      <h5 className="font-bold text-xs text-white">Extraire ou Cloner</h5>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Téléchargez le fichier <strong>.ZIP</strong> et décompressez-le, ou clonez le dépôt dans votre terminal.
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0f1424] border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-amber-400">Étape 02</span>
                        <Play className="h-4 w-4 text-amber-400" />
                      </div>
                      <h5 className="font-bold text-xs text-white">Tester en Local</h5>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Double-cliquez directement sur <strong>index.html</strong>. Le tableau de bord s'ouvre dans votre navigateur sans rien installer.
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div
                      className={`p-4 rounded-2xl border space-y-2 ${
                        isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0f1424] border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs text-emerald-400">Étape 03</span>
                        <Globe className="h-4 w-4 text-emerald-400" />
                      </div>
                      <h5 className="font-bold text-xs text-white">Publier Gratuitement</h5>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Créez un dépôt GitHub, déposez les fichiers et activez <strong>GitHub Pages</strong> dans les paramètres pour obtenir votre lien public.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Structure details */}
                <div
                  className={`p-4 rounded-2xl border space-y-2 font-mono text-xs ${
                    isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-[#090c14] border-white/10'
                  }`}
                >
                  <span className="font-bold text-neutral-300">Fichiers inclus dans l'archive ZIP :</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="flex items-center gap-2 text-neutral-400">
                      <FileCode className="h-3.5 w-3.5 text-orange-400" />
                      <span><strong>index.html</strong> : Interface responsive Tailwind</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400">
                      <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                      <span><strong>app.js</strong> : Logique de calcul & filtres dynamiques</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400">
                      <Database className="h-3.5 w-3.5 text-amber-400" />
                      <span><strong>data.json</strong> : Jeu de données propre des 4 centres</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-400">
                      <Layers className="h-3.5 w-3.5 text-emerald-400" />
                      <span><strong>README.md</strong> : Guide explicatif pas à pas</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Claude Prompt */}
            {activeTab === 'prompt' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase font-bold text-orange-500">
                    Modèle de Prompt Clé en Main (Enseigné au Jour 01)
                  </span>
                  <button
                    onClick={copyPrompt}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 text-black font-bold text-xs cursor-pointer hover:bg-orange-400 transition-colors"
                  >
                    {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedCode ? 'Copié !' : 'Copier le Prompt'}</span>
                  </button>
                </div>

                <div
                  className={`p-4 rounded-2xl border font-mono text-xs leading-relaxed whitespace-pre-wrap ${
                    isLight
                      ? 'bg-neutral-900 text-neutral-100 border-neutral-700'
                      : 'bg-black/80 text-neutral-200 border-white/10'
                  }`}
                >
                  {samplePromptDay1}
                </div>
              </div>
            )}
          </div>
            </>
          )}

          {/* Footer of Modal with direct action */}
          <div
            className={`p-4 px-6 border-t shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0b0e17] border-white/10'
            }`}
          >
            <div className="text-xs text-neutral-400 font-sans text-center sm:text-left">
              {dayNumber === 3
                ? 'Chaque participant repart avec son pipeline SQL + Python reproductible et son analyse R validée à la fin du Jour 03.'
                : `Chaque participant repart avec son propre livrable fonctionnel à la fin du Jour 0${dayNumber}.`}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium border transition-colors cursor-pointer ${
                  isLight
                    ? 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-700'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300'
                }`}
              >
                Fermer
              </button>

              <button
                onClick={() => {
                  playSlideTransition();
                  onClose();
                  onLaunchDay(dayNumber);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 hover:from-orange-400 text-black font-display text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-black" />
                <span>Lancer la Masterclass Jour 0{dayNumber}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

