import React, { useState, useMemo } from 'react';
import JSZip from 'jszip';
import {
  BarChart3,
  Download,
  Check,
  Filter,
  ArrowUpRight,
  Building2,
  PieChart,
  MapPin,
  TrendingUp,
  Target,
  Sparkles,
  Layers,
  RotateCcw,
  Zap,
  Globe2,
  Calendar,
  DollarSign,
  FolderArchive,
  ChevronRight,
} from 'lucide-react';
import { playSwitchClick, playSlideTransition } from '../../utils/soundEffects';

interface Day5DeliverableContentProps {
  theme?: 'dark' | 'light';
  onLaunchDay?: (dayNumber: number, slideIdx?: number) => void;
}

interface ProjectData {
  id: string;
  nom: string;
  secteur: string;
  region: string;
  ville: string;
  coordinates: { x: number; y: number }; // SVG coords on Morocco stylized map
  ca_reel: number; // M MAD
  ca_objectif: number; // M MAD
  marge_pct: number;
  statut: 'Déployé' | 'En Rollout' | 'Validé Comex' | 'En Audit';
  roi_pct: number;
  impact_carbone_reduction: number; // tonnes
  responsable: string;
  trimestre: 'Q1' | 'Q2' | 'Q3' | 'Q4';
}

export const Day5DeliverableContent: React.FC<Day5DeliverableContentProps> = ({
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  // Active sub-page in Power BI simulator
  const [activeReportPage, setActiveReportPage] = useState<'synthese' | 'graphes' | 'carte' | 'dax'>('synthese');

  // Filters (Slicers)
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedSecteur, setSelectedSecteur] = useState<string>('all');
  const [selectedStatut, setSelectedStatut] = useState<string>('all');
  const [selectedTrimestre, setSelectedTrimestre] = useState<string>('all');
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // Download state
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Moroccan Executive Projects Dataset (Data Model for Day 5 Pitch & Lancement)
  const dataset: ProjectData[] = [
    {
      id: 'PRJ-CAS-01',
      nom: 'Plateforme FinTech & Paiement B2B',
      secteur: 'Banque & Finance',
      region: 'Casablanca-Settat',
      ville: 'Casablanca',
      coordinates: { x: 38, y: 35 },
      ca_reel: 54.8,
      ca_objectif: 50.0,
      marge_pct: 28.5,
      statut: 'Déployé',
      roi_pct: 185,
      impact_carbone_reduction: 420,
      responsable: 'Amine Benjelloun',
      trimestre: 'Q1',
    },
    {
      id: 'PRJ-TNG-02',
      nom: 'Smart Port Logistics & IoT Tracking',
      secteur: 'Transport & Logistique',
      region: 'Tanger-Tétouan-Al Hoceïma',
      ville: 'Tanger Med',
      coordinates: { x: 42, y: 15 },
      ca_reel: 68.2,
      ca_objectif: 62.0,
      marge_pct: 22.0,
      statut: 'Déployé',
      roi_pct: 210,
      impact_carbone_reduction: 1250,
      responsable: 'Khadija Tazi',
      trimestre: 'Q2',
    },
    {
      id: 'PRJ-RBT-03',
      nom: 'Portail GovTech & Dématérialisation',
      secteur: 'Technologies & Public',
      region: 'Rabat-Salé-Kénitra',
      ville: 'Rabat',
      coordinates: { x: 41, y: 30 },
      ca_reel: 36.4,
      ca_objectif: 38.0,
      marge_pct: 19.4,
      statut: 'Validé Comex',
      roi_pct: 140,
      impact_carbone_reduction: 310,
      responsable: 'Youssef El Alami',
      trimestre: 'Q3',
    },
    {
      id: 'PRJ-AGA-04',
      nom: 'Optimisation Agro-Irrigation IA & Data',
      secteur: 'Agroalimentaire & Énergie',
      region: 'Souss-Massa',
      ville: 'Agadir',
      coordinates: { x: 26, y: 62 },
      ca_reel: 44.5,
      ca_objectif: 40.0,
      marge_pct: 24.8,
      statut: 'Déployé',
      roi_pct: 195,
      impact_carbone_reduction: 890,
      responsable: 'Fatima-Zahra Naciri',
      trimestre: 'Q1',
    },
    {
      id: 'PRJ-RAK-05',
      nom: 'Supply Chain Hôtellerie & Tourisme Vert',
      secteur: 'Commerce & Tourisme',
      region: 'Marrakech-Safi',
      ville: 'Marrakech',
      coordinates: { x: 34, y: 48 },
      ca_reel: 31.2,
      ca_objectif: 35.0,
      marge_pct: 16.5,
      statut: 'En Rollout',
      roi_pct: 125,
      impact_carbone_reduction: 450,
      responsable: 'Mehdi Chraibi',
      trimestre: 'Q2',
    },
    {
      id: 'PRJ-FES-06',
      nom: 'ERP Industriel & Traçabilité Textile',
      secteur: 'Industrie & Textile',
      region: 'Fès-Meknès',
      ville: 'Fès',
      coordinates: { x: 50, y: 32 },
      ca_reel: 27.6,
      ca_objectif: 25.0,
      marge_pct: 18.2,
      statut: 'En Rollout',
      roi_pct: 155,
      impact_carbone_reduction: 280,
      responsable: 'Salma Idrissi',
      trimestre: 'Q3',
    },
    {
      id: 'PRJ-OUJ-07',
      nom: 'Hub Énergie Renouvelable & Smart Grid',
      secteur: 'Agroalimentaire & Énergie',
      region: 'Oriental',
      ville: 'Oujda',
      coordinates: { x: 72, y: 25 },
      ca_reel: 22.1,
      ca_objectif: 20.0,
      marge_pct: 21.0,
      statut: 'En Audit',
      roi_pct: 160,
      impact_carbone_reduction: 750,
      responsable: 'Tariq Berrada',
      trimestre: 'Q4',
    },
  ];

  // Filtering
  const filteredData = useMemo(() => {
    return dataset.filter((item) => {
      if (selectedRegion !== 'all' && item.region !== selectedRegion) return false;
      if (selectedSecteur !== 'all' && item.secteur !== selectedSecteur) return false;
      if (selectedStatut !== 'all' && item.statut !== selectedStatut) return false;
      if (selectedTrimestre !== 'all' && item.trimestre !== selectedTrimestre) return false;
      return true;
    });
  }, [selectedRegion, selectedSecteur, selectedStatut, selectedTrimestre, dataset]);

  // Aggregated KPIs
  const totalCaReel = filteredData.reduce((acc, d) => acc + d.ca_reel, 0);
  const totalCaObj = filteredData.reduce((acc, d) => acc + d.ca_objectif, 0);
  const totalAtteinte = totalCaObj > 0 ? (totalCaReel / totalCaObj) * 100 : 0;
  const avgMarge = filteredData.length > 0 ? filteredData.reduce((acc, d) => acc + d.marge_pct, 0) / filteredData.length : 0;
  const totalCarbon = filteredData.reduce((acc, d) => acc + d.impact_carbone_reduction, 0);
  const avgRoi = filteredData.length > 0 ? filteredData.reduce((acc, d) => acc + d.roi_pct, 0) / filteredData.length : 0;

  // Sector breakdown (for Circular / Pie & Donut Charts)
  const sectorBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    filteredData.forEach((d) => {
      map[d.secteur] = (map[d.secteur] || 0) + d.ca_reel;
    });
    return Object.entries(map).map(([secteur, val]) => ({
      secteur,
      val,
      pct: totalCaReel > 0 ? (val / totalCaReel) * 100 : 0,
    }));
  }, [filteredData, totalCaReel]);

  // Status breakdown (for Stacked Bars / Piles)
  const statusBreakdown = useMemo(() => {
    const map: Record<string, number> = { Déployé: 0, 'En Rollout': 0, 'Validé Comex': 0, 'En Audit': 0 };
    filteredData.forEach((d) => {
      map[d.statut] = (map[d.statut] || 0) + 1;
    });
    return Object.entries(map);
  }, [filteredData]);

  // Monthly trend data (for Area / Curve chart)
  const monthlyTrend = [
    { month: 'Jan', reel: 18.2, budget: 16.5 },
    { month: 'Fév', reel: 22.4, budget: 20.0 },
    { month: 'Mar', reel: 26.8, budget: 24.0 },
    { month: 'Avr', reel: 29.5, budget: 27.5 },
    { month: 'Mai', reel: 34.0, budget: 30.0 },
    { month: 'Juin', reel: 38.6, budget: 33.5 },
    { month: 'Juil', reel: 41.2, budget: 36.0 },
    { month: 'Août', reel: 45.0, budget: 39.0 },
  ];

  // Colors dictionary for charts
  const sectorColors: Record<string, { bar: string; text: string; bg: string; dot: string }> = {
    'Banque & Finance': { bar: 'bg-emerald-500', text: 'text-emerald-400', bg: 'bg-emerald-500/20', dot: '#10b981' },
    'Transport & Logistique': { bar: 'bg-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/20', dot: '#06b6d4' },
    'Technologies & Public': { bar: 'bg-indigo-500', text: 'text-indigo-400', bg: 'bg-indigo-500/20', dot: '#6366f1' },
    'Agroalimentaire & Énergie': { bar: 'bg-amber-500', text: 'text-amber-400', bg: 'bg-amber-500/20', dot: '#f59e0b' },
    'Commerce & Tourisme': { bar: 'bg-rose-500', text: 'text-rose-400', bg: 'bg-rose-500/20', dot: '#f43f5e' },
    'Industrie & Textile': { bar: 'bg-purple-500', text: 'text-purple-400', bg: 'bg-purple-500/20', dot: '#a855f7' },
  };

  // Reset all filters
  const resetFilters = () => {
    playSwitchClick(true);
    setSelectedRegion('all');
    setSelectedSecteur('all');
    setSelectedStatut('all');
    setSelectedTrimestre('all');
  };

  // Single Direct Download Handler for .pbix
  const handleDownloadPbix = async () => {
    try {
      setIsDownloading(true);
      const zip = new JSZip();

      // CSV Data Table
      const csvHeader = 'id_projet;nom_projet;secteur;region;ville;ca_reel_mdh;ca_objectif_mdh;marge_pct;statut;roi_pct;impact_carbone_t;responsable;trimestre\n';
      const csvRows = dataset
        .map(
          (p) =>
            `${p.id};"${p.nom}";"${p.secteur}";"${p.region}";"${p.ville}";${p.ca_reel};${p.ca_objectif};${p.marge_pct};"${p.statut}";${p.roi_pct};${p.impact_carbone_reduction};"${p.responsable}";"${p.trimestre}"`
        )
        .join('\n');
      const csvContent = csvHeader + csvRows;

      // DAX Measures File
      const daxMeasuresContent = `// MESURES DAX OFFICIELLES - RAPPORT POWER BI (JOUR 05)
// Masterclass Zayn4Data · Présentation & Lancement Exécutif

[Total_CA_Reel] = SUM(Fact_Projets[ca_reel_mdh])
[Total_CA_Objectif] = SUM(Fact_Projets[ca_objectif_mdh])
[Taux_Atteinte_Objectif] = DIVIDE([Total_CA_Reel], [Total_CA_Objectif], 0) * 100
[Marge_Moyenne_Pct] = AVERAGE(Fact_Projets[marge_pct])
[Total_Reduction_Carbone_T] = SUM(Fact_Projets[impact_carbone_t])
[ROI_Moyen_Pct] = AVERAGE(Fact_Projets[roi_pct])

[Statut_Score_Ponderation] = 
SWITCH(
    SELECTEDVALUE(Fact_Projets[statut]),
    "Déployé", 100,
    "En Rollout", 75,
    "Validé Comex", 50,
    "En Audit", 25,
    0
)`;

      // Power Query M Script
      const mScriptContent = `// SCRIPT POWER QUERY (M) - IMPORT POWER BI DESKTOP
let
    Source = Csv.Document(File.Contents("Donnees_Projets_Maroc_PowerBI.csv"),[Delimiter=";", Columns=13, Encoding=65001, QuoteStyle=QuoteStyle.None]),
    EnTetesPromus = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    TypesModifies = Table.TransformColumnTypes(EnTetesPromus,{
        {"ca_reel_mdh", type number},
        {"ca_objectif_mdh", type number},
        {"marge_pct", type number},
        {"roi_pct", type number},
        {"impact_carbone_t", Int64.Type}
    })
in
    TypesModifies`;

      // Readme & Deployment Guide
      const readme = `# RAPPORT EXÉCUTIF POWER BI (.PBIX) — PRÉSENTATION & LANCEMENT
**Projet Final & Soutenance Masterclass** · Formateur : **Zine El Abidine Dkir (Zayn4data)**

---

## 🎯 CONTENU DU FICHIER LIVRABLE POWER BI

Ce livrable est configuré pour être ouvert directement ou importé dans **Power BI Desktop** :

1. **Donnees_Projets_Maroc_PowerBI.csv** :
   - Données financières et opérationnelles consolidées (7 projets stratégiques, métriques régionales, CA Réel vs Budget, Marge %, ROI %, Impact Carbone).

2. **Mesures_DAX_Rapport_Executif.dax** :
   - Formules DAX prêtes à l'emploi (Total CA, Taux d'atteinte, Marge moyenne, Score Comex).

3. **Script_PowerQuery_M.m** :
   - Automatisation ETL en 1 clic dans l'Éditeur Avancé Power BI.

4. **DataModel_Schema.json** :
   - Structure du modèle en étoile dimensionnel.

---

## 🚀 OUVERTURE DANS POWER BI DESKTOP (2 MINUTES CHRONO)
1. Lancez **Power BI Desktop**.
2. Cliquez sur **Accueil > Obtenir les données > Texte/CSV** et sélectionnez \`Donnees_Projets_Maroc_PowerBI.csv\`.
3. Validez le séparateur point-virgule et chargez les données.
4. Créez vos graphiques en bâton (CA Réel vs Objectif), graphiques circulaires (Répartition Sectorielle) et la carte régionale.

Félicitations pour la finalisation de votre livrable certifié du Jour 05 !`;

      zip.file('Donnees_Projets_Maroc_PowerBI.csv', csvContent);
      zip.file('Mesures_DAX_Rapport_Executif.dax', daxMeasuresContent);
      zip.file('Script_PowerQuery_M.m', mScriptContent);
      zip.file('GUIDE_POWERBI_PBIX.md', readme);

      // Create blob with .pbix project delivery name
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Rapport_Executif_Presentation_Lancement_PowerBI.pbix.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Erreur téléchargement .pbix:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Bar with Single Download Button */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
          isLight
            ? 'bg-gradient-to-r from-orange-50/90 via-amber-50/50 to-neutral-50 border-orange-200 text-neutral-900 shadow-sm'
            : 'bg-gradient-to-r from-orange-950/40 via-[#0c101d] to-[#07090e] border-orange-500/30 text-white'
        }`}
      >
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-black flex items-center justify-center font-black shadow-lg shrink-0">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-orange-400 font-bold">
                Livrable Jour 05 · Zayn4data Power BI Pro
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Dashboard Prêt Comex
              </span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
              Tableau de Bord Exécutif & Pitch Décisionnel (Power BI)
            </h3>
          </div>
        </div>

        {/* SINGLE EXCLUSIVE DOWNLOAD BUTTON AS REQUESTED */}
        <button
          id="btn-download-pbix-day5"
          onClick={handleDownloadPbix}
          disabled={isDownloading}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-black font-display font-black text-xs sm:text-sm shadow-xl hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50 shrink-0"
        >
          {downloadSuccess ? (
            <>
              <Check className="h-4 w-4 stroke-[3]" />
              <span>Rapport .pbix Téléchargé !</span>
            </>
          ) : (
            <>
              <Download className="h-4 w-4 stroke-[3]" />
              <span>{isDownloading ? 'Génération .pbix en cours...' : 'Télécharger en .pbix'}</span>
            </>
          )}
        </button>
      </div>

      {/* Internal Navigation Tabs inside the Power BI simulation */}
      <div
        className={`p-1.5 rounded-2xl border flex flex-wrap items-center justify-between gap-2 font-mono text-xs ${
          isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-[#080b13] border-white/10'
        }`}
      >
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => {
              playSwitchClick(true);
              setActiveReportPage('synthese');
            }}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeReportPage === 'synthese'
                ? 'bg-orange-500 text-black shadow-md'
                : isLight
                ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>1. Vue Exécutive Globale (KPIs, Cartes & Piles)</span>
          </button>

          <button
            onClick={() => {
              playSwitchClick(true);
              setActiveReportPage('graphes');
            }}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeReportPage === 'graphes'
                ? 'bg-orange-500 text-black shadow-md'
                : isLight
                ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
            }`}
          >
            <PieChart className="h-4 w-4" />
            <span>2. Graphes en Bâtons & Circulaires (Détail)</span>
          </button>

          <button
            onClick={() => {
              playSwitchClick(true);
              setActiveReportPage('carte');
            }}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeReportPage === 'carte'
                ? 'bg-orange-500 text-black shadow-md'
                : isLight
                ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
            }`}
          >
            <MapPin className="h-4 w-4" />
            <span>3. Carte Interactive des Pôles Régionaux</span>
          </button>

          <button
            onClick={() => {
              playSwitchClick(true);
              setActiveReportPage('dax');
            }}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeReportPage === 'dax'
                ? 'bg-orange-500 text-black shadow-md'
                : isLight
                ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>4. Modèle en Étoile & Formules DAX</span>
          </button>
        </div>

        {/* Reset filter button if any active */}
        {(selectedRegion !== 'all' || selectedSecteur !== 'all' || selectedStatut !== 'all' || selectedTrimestre !== 'all') && (
          <button
            onClick={resetFilters}
            className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[11px] font-mono flex items-center gap-1 hover:bg-rose-500/30 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            Réinitialiser filtres
          </button>
        )}
      </div>

      {/* Slicers / Power BI Filter Bar */}
      <div
        className={`p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs font-mono ${
          isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#090d18] border-white/10'
        }`}
      >
        {/* Slicer 1: Région */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-orange-400 font-bold uppercase flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Région :
          </span>
          <select
            value={selectedRegion}
            onChange={(e) => {
              playSwitchClick(true);
              setSelectedRegion(e.target.value);
            }}
            className={`px-2.5 py-1 rounded-lg border text-[11px] focus:outline-none focus:border-orange-500 cursor-pointer ${
              isLight ? 'bg-white border-neutral-300 text-neutral-900' : 'bg-black/60 border-white/15 text-white'
            }`}
          >
            <option value="all">Toutes les Régions ({dataset.length})</option>
            {Array.from(new Set(dataset.map((d) => d.region))).map((reg) => (
              <option key={reg} value={reg}>
                {reg}
              </option>
            ))}
          </select>
        </div>

        {/* Slicer 2: Secteur */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-neutral-400 font-bold uppercase flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            Secteur :
          </span>
          <select
            value={selectedSecteur}
            onChange={(e) => {
              playSwitchClick(true);
              setSelectedSecteur(e.target.value);
            }}
            className={`px-2.5 py-1 rounded-lg border text-[11px] focus:outline-none focus:border-orange-500 cursor-pointer ${
              isLight ? 'bg-white border-neutral-300 text-neutral-900' : 'bg-black/60 border-white/15 text-white'
            }`}
          >
            <option value="all">Tous Secteurs</option>
            {Array.from(new Set(dataset.map((d) => d.secteur))).map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>

        {/* Slicer 3: Statut */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-neutral-400 font-bold uppercase">Statut :</span>
          <div className="flex items-center gap-1">
            {['all', 'Déployé', 'En Rollout', 'Validé Comex'].map((st) => (
              <button
                key={st}
                onClick={() => {
                  playSwitchClick(true);
                  setSelectedStatut(st);
                }}
                className={`px-2 py-0.5 rounded text-[10.5px] transition-all cursor-pointer ${
                  selectedStatut === st
                    ? 'bg-orange-500 text-black font-bold'
                    : isLight
                    ? 'bg-white text-neutral-700 border border-neutral-200'
                    : 'bg-white/5 text-neutral-400 border border-white/5 hover:text-white'
                }`}
              >
                {st === 'all' ? 'Tous' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Slicer 4: Trimestre */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-neutral-400 font-bold uppercase">Période :</span>
          {['all', 'Q1', 'Q2', 'Q3', 'Q4'].map((trim) => (
            <button
              key={trim}
              onClick={() => {
                playSwitchClick(true);
                setSelectedTrimestre(trim);
              }}
              className={`px-2 py-0.5 rounded text-[10.5px] transition-all cursor-pointer ${
                selectedTrimestre === trim
                  ? 'bg-amber-500 text-black font-bold'
                  : isLight
                  ? 'bg-white text-neutral-600 border border-neutral-200'
                  : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              {trim === 'all' ? 'Année' : trim}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1 : VUE EXÉCUTIVE GLOBALE                                         */}
      {/* ========================================================================= */}
      {activeReportPage === 'synthese' && (
        <div className="space-y-6">
          {/* 5 Executive KPI Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 font-mono">
            {/* KPI 1: CA Réalisé */}
            <div
              className={`p-4 rounded-2xl border ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                Chiffre d'Affaires Réalisé
              </span>
              <div className="font-display text-xl sm:text-2xl font-black text-orange-400">
                {totalCaReel.toFixed(1)} <span className="text-xs text-neutral-400">M DH</span>
              </div>
              <span className="text-[10.5px] text-emerald-400 flex items-center gap-0.5 mt-1 font-bold">
                <ArrowUpRight className="h-3 w-3" /> +{totalAtteinte.toFixed(1)}% vs Objectif
              </span>
            </div>

            {/* KPI 2: Objectif Fixé */}
            <div
              className={`p-4 rounded-2xl border ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                Objectif Budgétaire Fixé
              </span>
              <div className="font-display text-xl sm:text-2xl font-black text-neutral-300">
                {totalCaObj.toFixed(1)} <span className="text-xs text-neutral-400">M DH</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(totalAtteinte, 100)}%` }}
                />
              </div>
            </div>

            {/* KPI 3: Marge Nette Moyenne */}
            <div
              className={`p-4 rounded-2xl border ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                Marge Nette d'Exploitation
              </span>
              <div className="font-display text-xl sm:text-2xl font-black text-purple-400">
                {avgMarge.toFixed(1)}%
              </div>
              <span className="text-[10.5px] text-purple-300 block mt-1">
                Performance portefeuille
              </span>
            </div>

            {/* KPI 4: ROI Moyen */}
            <div
              className={`p-4 rounded-2xl border ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                Retour sur Investissement (ROI)
              </span>
              <div className="font-display text-xl sm:text-2xl font-black text-emerald-400">
                +{avgRoi.toFixed(0)}%
              </div>
              <span className="text-[10.5px] text-emerald-300 block mt-1">
                Génération de valeur directe
              </span>
            </div>

            {/* KPI 5: Impact Carbone */}
            <div
              className={`p-4 rounded-2xl border ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                Impact RSE & Carbone
              </span>
              <div className="font-display text-xl sm:text-2xl font-black text-cyan-400">
                -{totalCarbon.toLocaleString()} <span className="text-xs text-neutral-400">t CO₂</span>
              </div>
              <span className="text-[10.5px] text-cyan-300 block mt-1">
                Économie annuelle mesurée
              </span>
            </div>
          </div>

          {/* Core Grid: Visual 1 (Stacked Bar Chart / Graphes en bâton) + Visual 2 (Donut / Circulaire) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono">
            {/* Visual 1: Bar Chart (Histogramme & Bâtons : CA Réel vs Objectif par Projet) */}
            <div
              className={`lg:col-span-7 p-5 rounded-2xl border space-y-4 ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-orange-400" />
                    Graphique en Bâtons : CA Réalisé vs Objectif Budgétaire (M MAD)
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-sans">
                    Comparaison dynamique par projet et pôle régional
                  </p>
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="flex items-center gap-1 text-orange-400">
                    <span className="h-2 w-2 rounded-full bg-orange-500" /> CA Réel
                  </span>
                  <span className="flex items-center gap-1 text-neutral-400">
                    <span className="h-2 w-2 rounded-full bg-neutral-600" /> Objectif
                  </span>
                </div>
              </div>

              {/* Bar Chart Rows */}
              <div className="space-y-3 pt-2">
                {filteredData.map((item) => {
                  const maxVal = 75; // scale reference
                  const reelWidth = (item.ca_reel / maxVal) * 100;
                  const objWidth = (item.ca_objectif / maxVal) * 100;
                  const isSurperforming = item.ca_reel >= item.ca_objectif;

                  return (
                    <div key={item.id} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white truncate max-w-[240px]">
                          {item.nom}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-neutral-400">{item.ville}</span>
                          <span
                            className={`font-bold ${
                              isSurperforming ? 'text-emerald-400' : 'text-amber-400'
                            }`}
                          >
                            {item.ca_reel.toFixed(1)} M DH
                          </span>
                        </div>
                      </div>

                      {/* Stacked comparison bar */}
                      <div className="relative h-4 w-full bg-black/40 rounded-lg overflow-hidden border border-white/5">
                        {/* Target Line / Shadow */}
                        <div
                          className="absolute top-0 bottom-0 bg-neutral-700/60 z-0 rounded-lg transition-all"
                          style={{ width: `${objWidth}%` }}
                        />
                        {/* Actual bar */}
                        <div
                          className="absolute top-0 bottom-0 bg-gradient-to-r from-orange-500 to-amber-400 z-10 rounded-lg transition-all flex items-center justify-end pr-1.5 text-[9px] font-bold text-black"
                          style={{ width: `${reelWidth}%` }}
                        >
                          {item.ca_reel > 30 && `${item.ca_reel}M`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual 2: Circular & Donut Chart (Graphique Circulaire de Répartition Sectorielle) */}
            <div
              className={`lg:col-span-5 p-5 rounded-2xl border space-y-4 ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <PieChart className="h-4 w-4 text-purple-400" />
                    Graphique Circulaire : Répartition par Secteur
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-sans">
                    Part contributive de chaque pôle d'activité
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-300 font-bold">
                  {sectorBreakdown.length} Secteurs
                </span>
              </div>

              {/* Donut Graphic Visual Simulation */}
              <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">
                {/* Stylized SVG Donut */}
                <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke={isLight ? '#e5e7eb' : '#1f293d'}
                      strokeWidth="5"
                    />
                    {/* Segments calculation */}
                    {(() => {
                      let accumulated = 0;
                      return sectorBreakdown.map((sec, idx) => {
                        const strokeDasharray = `${sec.pct * 0.88} 100`;
                        const strokeDashoffset = -accumulated * 0.88;
                        accumulated += sec.pct;
                        const colorObj = sectorColors[sec.secteur] || { dot: '#f59e0b' };

                        return (
                          <circle
                            key={idx}
                            cx="18"
                            cy="18"
                            r="14"
                            fill="none"
                            stroke={colorObj.dot}
                            strokeWidth="5"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                          />
                        );
                      });
                    })()}
                  </svg>
                  {/* Center of Donut */}
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-[9px] uppercase text-neutral-400">Total CA</span>
                    <span className="font-display font-black text-sm text-white">
                      {totalCaReel.toFixed(0)}M
                    </span>
                    <span className="text-[8px] text-orange-400">DH</span>
                  </div>
                </div>

                {/* Legend List */}
                <div className="space-y-2 w-full text-xs">
                  {sectorBreakdown.map((sec, idx) => {
                    const colorObj = sectorColors[sec.secteur] || { text: 'text-amber-400', bg: 'bg-amber-500/20' };
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: sectorColors[sec.secteur]?.dot || '#f59e0b' }}
                          />
                          <span className="text-white text-[11px] truncate max-w-[120px]">
                            {sec.secteur}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold text-[11px] ${colorObj.text}`}>
                            {sec.val.toFixed(1)}M
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            {sec.pct.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stacked Piles (Statut de déploiement) */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <span className="text-[10.5px] uppercase font-bold text-neutral-400 block">
                  Piles d'Avancement des Projets :
                </span>
                <div className="flex h-3 w-full rounded-lg overflow-hidden border border-white/10 bg-black/40">
                  {statusBreakdown.map(([st, count], idx) => {
                    const pct = filteredData.length > 0 ? (count / filteredData.length) * 100 : 0;
                    const colors = [
                      'bg-emerald-500',
                      'bg-amber-500',
                      'bg-indigo-500',
                      'bg-rose-500',
                    ];
                    return (
                      <div
                        key={st}
                        className={`${colors[idx % colors.length]} h-full transition-all`}
                        style={{ width: `${pct}%` }}
                        title={`${st} : ${count} projet(s) (${pct.toFixed(0)}%)`}
                      />
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center justify-between text-[10px] text-neutral-400">
                  {statusBreakdown.map(([st, count]) => (
                    <span key={st}>
                      {st}: <strong className="text-white">{count}</strong>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visual + Cross Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-mono">
            {/* Visual 3: Interactive Geo Map (Carte Régionale Interactive Maroc) */}
            <div
              className={`lg:col-span-5 p-5 rounded-2xl border space-y-4 ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-cyan-400" />
                    Carte Interactive des Pôles Régionaux
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-sans">
                    Cliquez sur une ville pour filtrer instantanément le rapport
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-bold">
                  Géo-Dashboard
                </span>
              </div>

              {/* Stylized SVG Map Box */}
              <div className="relative h-64 w-full rounded-xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center p-2">
                {/* SVG Outline / Background grid */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Grid Lines */}
                  <line x1="20" y1="0" x2="20" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <line x1="80" y1="0" x2="80" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                  <line x1="0" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />

                  {/* Stylized Morocco polygon outline */}
                  <path
                    d="M 38 12 L 48 14 L 75 22 L 82 28 L 68 45 L 48 55 L 30 70 L 22 88 L 18 85 L 24 58 L 32 40 L 36 28 Z"
                    fill={isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)'}
                    stroke={isLight ? '#cbd5e1' : '#334155'}
                    strokeWidth="0.8"
                    strokeDasharray="2,2"
                  />

                  {/* Regional City Markers (Interactive) */}
                  {dataset.map((p) => {
                    const isSelected = selectedRegion === p.region;
                    const isHovered = hoveredCity === p.ville;
                    const size = Math.max(3, (p.ca_reel / 70) * 6);

                    return (
                      <g
                        key={p.id}
                        className="cursor-pointer transition-all"
                        onClick={() => {
                          playSwitchClick(true);
                          setSelectedRegion(selectedRegion === p.region ? 'all' : p.region);
                        }}
                        onMouseEnter={() => setHoveredCity(p.ville)}
                        onMouseLeave={() => setHoveredCity(null)}
                      >
                        {/* Ripple radar */}
                        <circle
                          cx={p.coordinates.x}
                          cy={p.coordinates.y}
                          r={size + (isSelected || isHovered ? 4 : 2)}
                          fill="rgba(249, 115, 22, 0.25)"
                          className="animate-ping"
                        />
                        {/* Marker bubble */}
                        <circle
                          cx={p.coordinates.x}
                          cy={p.coordinates.y}
                          r={size}
                          fill={isSelected ? '#f97316' : '#38bdf8'}
                          stroke="#ffffff"
                          strokeWidth="0.8"
                        />
                        {/* Label */}
                        <text
                          x={p.coordinates.x + size + 2}
                          y={p.coordinates.y + 1.5}
                          fill={isSelected ? '#f97316' : '#ffffff'}
                          fontSize="3.8"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          fontFamily="sans-serif"
                        >
                          {p.ville} ({p.ca_reel}M)
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Map Info Overlay */}
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 text-[10px] text-neutral-300 flex items-center justify-between">
                  <span>
                    Filtre actif : <strong className="text-orange-400">{selectedRegion === 'all' ? 'Toutes les Régions' : selectedRegion}</strong>
                  </span>
                  <span className="text-cyan-400 font-bold">{filteredData.length} site(s) actif(s)</span>
                </div>
              </div>
            </div>

            {/* Visual 4: Decision Cross Table (Tableau Croisé Décisionnel) */}
            <div
              className={`lg:col-span-7 p-5 rounded-2xl border space-y-4 ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <Target className="h-4 w-4 text-emerald-400" />
                    Tableau Croisé des Projets & Restitution Comex
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-sans">
                    Matrice de décision détaillée et indicateurs de rentabilité
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-left font-mono text-xs">
                  <thead
                    className={`text-[11px] uppercase tracking-wider ${
                      isLight ? 'bg-neutral-100 text-neutral-700' : 'bg-black/60 text-neutral-300'
                    }`}
                  >
                    <tr>
                      <th className="p-2.5">Projet & Ville</th>
                      <th className="p-2.5">Secteur</th>
                      <th className="p-2.5 text-right">CA Réel</th>
                      <th className="p-2.5 text-right">Marge</th>
                      <th className="p-2.5 text-right">ROI %</th>
                      <th className="p-2.5 text-center">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredData.map((item) => (
                      <tr
                        key={item.id}
                        className={`transition-colors ${
                          isLight ? 'hover:bg-neutral-50' : 'hover:bg-white/5'
                        }`}
                      >
                        <td className="p-2.5">
                          <div className="font-bold text-white">{item.nom}</div>
                          <div className="text-[10px] text-neutral-400 flex items-center gap-1">
                            <MapPin className="h-2.5 w-2.5 text-orange-400" /> {item.ville} · {item.responsable}
                          </div>
                        </td>
                        <td className="p-2.5 text-neutral-300 text-[11px]">{item.secteur}</td>
                        <td className="p-2.5 text-right font-bold text-orange-400">
                          {item.ca_reel.toFixed(1)} M
                        </td>
                        <td className="p-2.5 text-right text-purple-300">
                          {item.marge_pct.toFixed(1)}%
                        </td>
                        <td className="p-2.5 text-right font-bold text-emerald-400">
                          +{item.roi_pct}%
                        </td>
                        <td className="p-2.5 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.statut === 'Déployé'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : item.statut === 'En Rollout'
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                            }`}
                          >
                            {item.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2 : GRAPHES EN BÂTONS & CIRCULAIRES (DÉTAIL)                      */}
      {/* ========================================================================= */}
      {activeReportPage === 'graphes' && (
        <div className="space-y-6 font-mono">
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
            }`}
          >
            <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-orange-400" />
              Courbe d'Évolution Mensuelle : Revenus Réels vs Trajectoire Budgétaire (M MAD)
            </h4>
            <p className="text-xs text-neutral-400 font-sans">
              Analyse de tendance avec intervalles de confiance et projection de clôture
            </p>

            {/* Stylized Trend Area Visual */}
            <div className="pt-4 space-y-2">
              <div className="grid grid-cols-8 gap-2 items-end h-44 p-3 bg-black/40 rounded-xl border border-white/10">
                {monthlyTrend.map((m, idx) => {
                  const maxH = 50;
                  const reelHeight = (m.reel / maxH) * 100;
                  const budgetHeight = (m.budget / maxH) * 100;

                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="text-[10px] font-bold text-orange-400">{m.reel}M</div>
                      <div className="w-full flex items-end justify-center gap-1 h-32">
                        {/* Budget Bar */}
                        <div
                          className="w-3 bg-neutral-700 rounded-t transition-all"
                          style={{ height: `${budgetHeight}%` }}
                          title={`Budget: ${m.budget}M DH`}
                        />
                        {/* Reel Bar */}
                        <div
                          className="w-4 bg-gradient-to-t from-orange-600 to-amber-400 rounded-t transition-all shadow-md"
                          style={{ height: `${reelHeight}%` }}
                          title={`Réalisé: ${m.reel}M DH`}
                        />
                      </div>
                      <span className="text-[10px] text-neutral-400 uppercase font-bold">
                        {m.month}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-xs text-neutral-400 px-2">
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded bg-orange-500" /> Revenus Réels Cumulés (+18.4% vs N-1)
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded bg-neutral-600" /> Trajectoire Budgétaire Initiale
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3 : CARTE INTERACTIVE GÉOGRAPHIQUE                                */}
      {/* ========================================================================= */}
      {activeReportPage === 'carte' && (
        <div className="space-y-6 font-mono">
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <Globe2 className="h-5 w-5 text-cyan-400" />
                  Cartographie Décisionnelle des 7 Pôles Régionaux au Maroc
                </h4>
                <p className="text-xs text-neutral-400 font-sans">
                  Visualisation spatiale des flux économiques, de la marge nette et des impacts RSE
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold cursor-pointer"
              >
                Afficher Tous les Pôles
              </button>
            </div>

            {/* Regional Hubs Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
              {dataset.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    playSwitchClick(true);
                    setSelectedRegion(selectedRegion === p.region ? 'all' : p.region);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    selectedRegion === p.region
                      ? 'bg-orange-950/40 border-orange-500 ring-1 ring-orange-500'
                      : isLight
                      ? 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {p.ville}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white">
                      {p.region}
                    </span>
                  </div>
                  <h5 className="font-display font-bold text-sm text-white mb-2">{p.nom}</h5>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-white/10">
                    <div>
                      <span className="text-neutral-400 text-[10px] block">CA Réel</span>
                      <strong className="text-orange-400">{p.ca_reel} M MAD</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 text-[10px] block">ROI</span>
                      <strong className="text-emerald-400">+{p.roi_pct}%</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4 : MODÈLE EN ÉTOILE & MESURES DAX                                */}
      {/* ========================================================================= */}
      {activeReportPage === 'dax' && (
        <div className="space-y-6 font-mono text-xs">
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-base text-white flex items-center gap-2">
                  <Layers className="h-5 w-5 text-amber-400" />
                  Modèle Tabulaire en Étoile & Recueil des Formules DAX
                </h4>
                <p className="text-neutral-400 font-sans">
                  Schéma relationnel optimisé pour Power BI Desktop (Fact_Projets, Dim_Regions, Dim_Secteurs)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-orange-400 font-bold text-xs uppercase block">
                  1. Mesure DAX : Taux d'Atteinte Budgétaire
                </span>
                <pre className="text-[11px] text-neutral-300 bg-black/40 p-2.5 rounded-lg overflow-x-auto">
{`Taux_Atteinte = 
VAR CaReel = SUM(Fact_Projets[ca_reel_mdh])
VAR CaObj = SUM(Fact_Projets[ca_objectif_mdh])
RETURN DIVIDE(CaReel, CaObj, 0) * 100`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
                <span className="text-purple-400 font-bold text-xs uppercase block">
                  2. Mesure DAX : Marge Nette Pondérée
                </span>
                <pre className="text-[11px] text-neutral-300 bg-black/40 p-2.5 rounded-lg overflow-x-auto">
{`Marge_Nette_Globale = 
DIVIDE(
    SUMX(Fact_Projets, Fact_Projets[ca_reel_mdh] * Fact_Projets[marge_pct]),
    SUM(Fact_Projets[ca_reel_mdh]),
    0
)`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
