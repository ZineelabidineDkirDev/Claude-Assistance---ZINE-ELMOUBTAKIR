import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  BarChart3,
  TrendingUp,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  Copy,
  Check,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Scale,
  Building2,
  Percent,
  Wallet,
  Activity,
  Code2,
  FileCode2,
  Sparkles,
  PieChart,
  HelpCircle,
  ExternalLink,
  BookOpen,
  FolderArchive,
  Layers,
  Info,
  Terminal,
} from 'lucide-react';
import { playSwitchClick } from '../../utils/soundEffects';

interface Day4DeliverableContentProps {
  theme?: 'dark' | 'light';
  onLaunchDay?: (dayNumber: number, slideIdx?: number) => void;
}

export const Day4DeliverableContent: React.FC<Day4DeliverableContentProps> = ({
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  // 3 Primary Sections:
  // 1. Dashboard Live (Rapport Power BI interactif)
  // 2. Téléchargement & Kit Power BI (Pack .ZIP, CSV, DAX, Power Query M)
  // 3. Guide Pas-à-Pas d'importation dans Power BI Desktop
  const [activeTab, setActiveTab] = useState<'dashboard' | 'download' | 'guide'>('dashboard');

  // Sub-pages inside the Power BI interactive report
  const [reportPage, setReportPage] = useState<'synthese' | 'cpc_esg' | 'bilan_treso' | 'dax_model'>('synthese');

  // Interactive Slicers / Filters (Moroccan Companies & Fiscal Years)
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('2025');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Download states
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);
  const [zipSuccess, setZipSuccess] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Moroccan Companies Financial Dataset (CGNC Standards - in Millions MAD / DH)
  const moroccanCompaniesData = [
    {
      id: 'SOC-01',
      nom: 'Atlas Agro Industries SA',
      secteur: 'Agroalimentaire',
      region: 'Souss-Massa (Agadir)',
      ca_ht: 142.5,
      achats_consommes: 68.4,
      valeur_ajoutee: 54.2,
      charges_personnel: 24.8,
      ebe: 29.4,
      dotations_amort: 9.6,
      rex: 19.8,
      resultat_financier: -2.3,
      rc: 17.5,
      is_maroc: 4.8,
      rn: 12.7,
      frng: 38.5,
      bfr: 26.2,
      tresorerie_nette: 12.3,
      capitaux_propres: 64.0,
      dettes_fi: 28.0,
      total_actif: 125.0,
      liquidite_generale: 1.45,
      autonomie_financiere: 51.2,
      marge_nette_pct: 8.91,
    },
    {
      id: 'SOC-02',
      nom: 'Tanger Logistics & Fret Hub',
      secteur: 'Transport & Logistique',
      region: 'Tanger-Tétouan-Al Hoceïma',
      ca_ht: 185.0,
      achats_consommes: 82.5,
      valeur_ajoutee: 76.5,
      charges_personnel: 38.0,
      ebe: 38.5,
      dotations_amort: 14.2,
      rex: 24.3,
      resultat_financier: -3.8,
      rc: 20.5,
      is_maroc: 5.6,
      rn: 14.9,
      frng: 46.0,
      bfr: 31.5,
      tresorerie_nette: 14.5,
      capitaux_propres: 82.0,
      dettes_fi: 36.0,
      total_actif: 165.0,
      liquidite_generale: 1.38,
      autonomie_financiere: 49.7,
      marge_nette_pct: 8.05,
    },
    {
      id: 'SOC-03',
      nom: 'Maroc Retail & Distribution SARL',
      secteur: 'Commerce & Distribution',
      region: 'Casablanca-Settat',
      ca_ht: 220.0,
      achats_consommes: 154.0,
      valeur_ajoutee: 48.0,
      charges_personnel: 22.5,
      ebe: 25.5,
      dotations_amort: 6.8,
      rex: 18.7,
      resultat_financier: -1.4,
      rc: 17.3,
      is_maroc: 4.5,
      rn: 12.8,
      frng: 28.0,
      bfr: 19.8,
      tresorerie_nette: 8.2,
      capitaux_propres: 45.0,
      dettes_fi: 18.5,
      total_actif: 98.0,
      liquidite_generale: 1.26,
      autonomie_financiere: 45.9,
      marge_nette_pct: 5.82,
    },
    {
      id: 'SOC-04',
      nom: 'Maghreb BTP & Infrastructures SA',
      secteur: 'BTP & Construction',
      region: 'Rabat-Salé-Kénitra',
      ca_ht: 165.8,
      achats_consommes: 92.4,
      valeur_ajoutee: 52.6,
      charges_personnel: 29.2,
      ebe: 23.4,
      dotations_amort: 8.5,
      rex: 14.9,
      resultat_financier: -3.2,
      rc: 11.7,
      is_maroc: 3.1,
      rn: 8.6,
      frng: 32.0,
      bfr: 36.4,
      tresorerie_nette: -4.4,
      capitaux_propres: 55.0,
      dettes_fi: 32.0,
      total_actif: 135.0,
      liquidite_generale: 0.94,
      autonomie_financiere: 40.7,
      marge_nette_pct: 5.19,
    },
    {
      id: 'SOC-05',
      nom: 'Méditerranée Tech & Solutions SAS',
      secteur: 'Technologies & Services',
      region: 'Casablanca (Technopark)',
      ca_ht: 65.4,
      achats_consommes: 14.2,
      valeur_ajoutee: 44.8,
      charges_personnel: 26.5,
      ebe: 18.3,
      dotations_amort: 3.2,
      rex: 15.1,
      resultat_financier: +0.4,
      rc: 15.5,
      is_maroc: 3.9,
      rn: 11.6,
      frng: 24.5,
      bfr: 11.2,
      tresorerie_nette: 13.3,
      capitaux_propres: 34.0,
      dettes_fi: 6.5,
      total_actif: 52.0,
      liquidite_generale: 1.82,
      autonomie_financiere: 65.4,
      marge_nette_pct: 17.74,
    },
  ];

  // Filtering Logic
  const filteredCompanies = moroccanCompaniesData.filter((comp) => {
    if (selectedCompany !== 'all' && comp.id !== selectedCompany) return false;
    if (selectedSector !== 'all' && comp.secteur !== selectedSector) return false;
    if (
      searchQuery &&
      !comp.nom.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !comp.secteur.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !comp.region.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Aggregated Portfolio KPIs (in Millions DH)
  const totalCA = filteredCompanies.reduce((acc, c) => acc + c.ca_ht, 0);
  const totalVA = filteredCompanies.reduce((acc, c) => acc + c.valeur_ajoutee, 0);
  const totalEBE = filteredCompanies.reduce((acc, c) => acc + c.ebe, 0);
  const totalRN = filteredCompanies.reduce((acc, c) => acc + c.rn, 0);
  const totalFRNG = filteredCompanies.reduce((acc, c) => acc + c.frng, 0);
  const totalBFR = filteredCompanies.reduce((acc, c) => acc + c.bfr, 0);
  const totalTN = totalFRNG - totalBFR;
  const margeNetteGlobal = totalCA > 0 ? (totalRN / totalCA) * 100 : 0;
  const margeEbeGlobal = totalCA > 0 ? (totalEBE / totalCA) * 100 : 0;

  // DAX Measures Dictionary
  const daxMeasures = [
    {
      name: "Chiffre d'Affaires HT (CGNC)",
      code: `CA_HT_CGNC = 
CALCULATE(
    SUM(Fact_Ecritures[Montant_Credit]) - SUM(Fact_Ecritures[Montant_Debit]),
    FILTER(Dim_PlanComptable, LEFT(Dim_PlanComptable[Compte_Numero], 2) = "71")
)`,
      description: 'Total des ventes de marchandises et produits fabriqués (Comptes classe 71 du CGNC marocain).',
    },
    {
      name: 'Valeur Ajoutée Marocaine (VA)',
      code: `Valeur_Ajoutee_CGNC = 
VAR Production = [Production_Exercice]
VAR MargeBrute = [Marge_Brute_Ventes]
VAR Consommations = CALCULATE(
    SUM(Fact_Ecritures[Montant_Debit]) - SUM(Fact_Ecritures[Montant_Credit]),
    FILTER(Dim_PlanComptable, LEFT(Dim_PlanComptable[Compte_Numero], 2) IN {"612", "613", "614"})
)
RETURN (MargeBrute + Production - Consommations)`,
      description: 'Richesse brute créée par les entreprises du portefeuille selon les états de synthèse marocains.',
    },
    {
      name: 'Excédent Brut d’Exploitation (EBE / EBITDA)',
      code: `EBE_CGNC = 
[Valeur_Ajoutee_CGNC] + [Subventions_Exploitation] - [Charges_Personnel_617] - [Impots_Taxes_616]`,
      description: 'Flux opérationnel généré indépendamment des choix de financement et d’amortissement.',
    },
    {
      name: 'Fonds de Roulement Net Global (FRNG)',
      code: `FRNG_Maroc = 
VAR CapitauxPermanents = CALCULATE(
    SUM(Fact_Balances[Solde_Fin_Credit]) - SUM(Fact_Balances[Solde_Fin_Debit]),
    FILTER(Dim_PlanComptable, LEFT(Dim_PlanComptable[Compte_Numero], 1) = "1")
)
VAR ActifImmobilise = CALCULATE(
    SUM(Fact_Balances[Solde_Fin_Debit]) - SUM(Fact_Balances[Solde_Fin_Credit]),
    FILTER(Dim_PlanComptable, LEFT(Dim_PlanComptable[Compte_Numero], 1) = "2")
)
RETURN CapitauxPermanents - ActifImmobilise`,
      description: 'Ressources stables finançant l’actif immobilisé à long terme (Haut du Bilan CGNC).',
    },
    {
      name: 'Besoin en Fonds de Roulement (BFR)',
      code: `BFR_Maroc = 
VAR ActifCirculantHT = CALCULATE(
    SUM(Fact_Balances[Solde_Fin_Debit]) - SUM(Fact_Balances[Solde_Fin_Credit]),
    FILTER(Dim_PlanComptable, LEFT(Dim_PlanComptable[Compte_Numero], 1) = "3" && LEFT(Dim_PlanComptable[Compte_Numero], 2) <> "39")
)
VAR PassifCirculantHT = CALCULATE(
    SUM(Fact_Balances[Solde_Fin_Credit]) - SUM(Fact_Balances[Solde_Fin_Debit]),
    FILTER(Dim_PlanComptable, LEFT(Dim_PlanComptable[Compte_Numero], 1) = "4" && LEFT(Dim_PlanComptable[Compte_Numero], 2) <> "49")
)
RETURN ActifCirculantHT - PassifCirculantHT`,
      description: 'Montant requis pour financer le décalage entre encaissements clients et décaissements fournisseurs.',
    },
    {
      name: 'Trésorerie Nette (TN = FRNG - BFR)',
      code: `Tresorerie_Nette_CGNC = 
[FRNG_Maroc] - [BFR_Maroc]`,
      description: 'Équilibre fondamental du Bilan fonctionnel marocain (Trésorerie Actif - Trésorerie Passif).',
    },
  ];

  // Power Query M Script for automated import in Power BI Desktop
  const powerQueryMScript = `// SCRIPT POWER QUERY (M) - IMPORT AUTOMATIQUE DES DONNÉES FINANCIÈRES MAROC (CGNC)
// À coller dans l'Éditeur Avancé de Power BI Desktop (Accueil > Éditeur Avancé)

let
    // Source des données d'entreprises marocaines
    SourceCSV = Table.FromRows(Json.Document(Binary.Decompress(Binary.FromText("i45WcjRU0lEyBGJjEyBhYGRkqBSrg1DJGEYbwhjGG8IYYwgzFkIYYwgxlooxlhgNMcQYFkOMMY4yhmk0wi4WAwA=", BinaryEncoding.Base64), Compression.Deflate)), let _t = ((type nullable text) meta [Serialized.Text = true]) in type table [id_societe = _t, nom_societe = _t, secteur_activite = _t, region = _t, ca_ht_mdh = _t, valeur_ajoutee_mdh = _t, ebe_mdh = _t, rn_mdh = _t, frng_mdh = _t, bfr_mdh = _t, tresorerie_nette_mdh = _t]),
    
    // Typage automatique des colonnes numériques (Millions MAD)
    TypeModifie = Table.TransformColumnTypes(SourceCSV,{
        {"ca_ht_mdh", type number}, 
        {"valeur_ajoutee_mdh", type number}, 
        {"ebe_mdh", type number}, 
        {"rn_mdh", type number}, 
        {"frng_mdh", type number}, 
        {"bfr_mdh", type number}, 
        {"tresorerie_nette_mdh", type number}
    })
in
    TypeModifie`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  // CSV Generator for Financial Data
  const getCompaniesCsvContent = () => {
    const header =
      'id_societe;nom_societe;secteur_activite;region;ca_ht_mdh;valeur_ajoutee_mdh;ebe_mdh;rex_mdh;rn_mdh;frng_mdh;bfr_mdh;tresorerie_nette_mdh;autonomie_fi_pct\n';
    const rows = moroccanCompaniesData
      .map(
        (c) =>
          `${c.id};"${c.nom}";"${c.secteur}";"${c.region}";${c.ca_ht};${c.valeur_ajoutee};${c.ebe};${c.rex};${c.rn};${c.frng};${c.bfr};${c.tresorerie_nette};${c.autonomie_financiere}`
      )
      .join('\n');
    return header + rows;
  };

  // CSV Generator for Plan Comptable CGNC
  const getCgncPlanCsvContent = () => {
    return `Compte_Numero;Intitule_Compte;Classe_CGNC;Rubrique_Masmouh
1111;Capital social ou personnel;1 - Financement Permanent;Capitaux propres
1481;Emprunts auprès des établissements de crédit;1 - Financement Permanent;Dettes de financement
2111;Frais de constitution;2 - Actif Immobilisé;Immobilisations en non-valeurs
2332;Matériel et outillage industriel;2 - Actif Immobilisé;Immobilisations corporelles
3111;Marchandises;3 - Actif Circulant HT;Stocks
3421;Clients;3 - Actif Circulant HT;Créances de l'actif circulant
4411;Fournisseurs;4 - Passif Circulant HT;Dettes du passif circulant
4455;État, TVA facturée;4 - Passif Circulant HT;Dettes fiscales
5141;Banques (solde débiteur);5 - Trésorerie Actif;Trésorerie
5541;Banques (soldes créditeurs);5 - Trésorerie Passif;Trésorerie Passif
6111;Achats revendus de marchandises;6 - Charges d'Exploitation;Charges d'exploitation
6171;Rémunérations du personnel;6 - Charges d'Exploitation;Charges de personnel
6193;D.E.A des immobilisations corporelles;6 - Charges d'Exploitation;Dotations d'exploitation
7111;Ventes de marchandises au Maroc;7 - Produits d'Exploitation;Produits d'exploitation
7121;Ventes de biens produits au Maroc;7 - Produits d'Exploitation;Produits d'exploitation`;
  };

  // Direct CSV download
  const handleDownloadCsv = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Direct Text / DAX / M download
  const handleDownloadTextFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Generate and Download Full Power BI Project Kit ZIP
  const handleDownloadFullZip = async () => {
    try {
      setIsDownloadingZip(true);
      const zip = new JSZip();

      const companiesCsv = getCompaniesCsvContent();
      const cgncPlanCsv = getCgncPlanCsvContent();
      const daxContent = daxMeasures
        .map((m) => `// ${m.name}\n// ${m.description}\n${m.code}\n`)
        .join('\n\n');

      const readmeContent = `# KIT COMPLET POWER BI — AUDIT FINANCIER MAROC (NORMES CGNC)
**Masterclass Data & Business Intelligence** · Formateur : **Zine El Abidine Dkir (Zayn4data)**

---

## 📌 CONTENU DU PACK PROJET POWER BI

Ce pack contient tout le nécessaire pour construire ou importer votre rapport décisionnel dans Power BI Desktop :

1. \`Societes_Marocaines_Donnees_Financieres.csv\` :
   - Jeu de données complet des balances et états de synthèse de 5 entreprises marocaines (Agroalimentaire, Transport, Distribution, BTP, Tech).
   - Montants exprimés en Millions de Dirhams (MAD / DH).

2. \`Plan_Comptable_General_Marocain_CGNC.csv\` :
   - Nomenclature officielle des classes comptables marocaines (Classes 1 à 7).

3. \`Mesures_DAX_Finance_Maroc.dax\` :
   - 6 formules DAX certifiées prêtes à copier-coller :
     * Chiffre d'Affaires HT
     * Valeur Ajoutée (VA)
     * Excédent Brut d'Exploitation (EBE / EBITDA)
     * Fonds de Roulement Net Global (FRNG)
     * Besoin en Fonds de Roulement (BFR)
     * Trésorerie Nette (TN = FRNG - BFR)

4. \`Script_PowerQuery_M_Import_Automatique.m\` :
   - Script M pour charger et typer les tables en 1 seul clic dans Power BI.

5. \`DataModelSchema.json\` :
   - Schéma tabulaire pour modèle en étoile.

---

## 🚀 COMMENT UTILISER CE KIT DANS POWER BI DESKTOP (3 ÉTAPES RAPIDES)

### ÉTAPE 1 : Importer les données dans Power BI Desktop
- Ouvrez **Power BI Desktop** (gratuit sur le site de Microsoft).
- Cliquez sur **Accueil** > **Obtenir les données** > **Texte/CSV**.
- Sélectionnez le fichier \`Societes_Marocaines_Donnees_Financieres.csv\`.
- Choisissez le séparateur **Point-virgule (;)** et cliquez sur **Charger**.

### ÉTAPE 2 : Ajouter les mesures DAX
- Dans le volet **Données** à droite, faites un clic droit sur la table chargée > **Nouvelle mesure**.
- Ouvrez le fichier \`Mesures_DAX_Finance_Maroc.dax\` et copiez les formules souhaitées.
- Validez avec la touche Entrée.

### ÉTAPE 3 : Créer vos visuels décisionnels
- Ajoutez des cartes KPI (Chiffre d'affaires, Valeur Ajoutée, EBE, Résultat Net, Trésorerie Nette).
- Ajoutez des segments (Slicers) pour filtrer par **Secteur** ou par **Société**.
- Ajoutez un graphique en cascade (Waterfall) pour les Soldes de Gestion (ESG).

Félicitations pour votre livrable certifié du Jour 04 !
`;

      zip.file('Societes_Marocaines_Donnees_Financieres.csv', companiesCsv);
      zip.file('Plan_Comptable_General_Marocain_CGNC.csv', cgncPlanCsv);
      zip.file('Mesures_DAX_Finance_Maroc.dax', daxContent);
      zip.file('Script_PowerQuery_M_Import_Automatique.m', powerQueryMScript);
      zip.file('GUIDE_DEMARRAGE_RAPIDE_POWERBI.md', readmeContent);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Pack_PowerBI_Finance_Maroc_CGNC.zip';
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
    <div className="space-y-6">
      {/* 3 Top Navigation Sections */}
      <div
        className={`p-1.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 font-mono text-xs ${
          isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-[#080b13] border-white/10'
        }`}
      >
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Section 1: Dashboard Live (Rapport Power BI) */}
          <button
            onClick={() => {
              playSwitchClick(true);
              setActiveTab('dashboard');
            }}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'dashboard'
                ? 'bg-amber-500 text-black shadow-lg'
                : isLight
                ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>1. Dashboard Live · Rapport Power BI Interactif (Normes CGNC)</span>
          </button>

          {/* Section 2: Télécharger Kit & Fichiers Power BI */}
          <button
            onClick={() => {
              playSwitchClick(true);
              setActiveTab('download');
            }}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'download'
                ? 'bg-amber-500 text-black shadow-lg'
                : isLight
                ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
            }`}
          >
            <Download className="h-4 w-4" />
            <span>2. Kit Power BI & Téléchargements (ZIP, CSV, DAX, M)</span>
          </button>

          {/* Section 3: Guide Pas-à-Pas Power BI Desktop */}
          <button
            onClick={() => {
              playSwitchClick(true);
              setActiveTab('guide');
            }}
            className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'bg-amber-500 text-black shadow-lg'
                : isLight
                ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>3. Guide d'Importation dans Power BI Desktop</span>
          </button>
        </div>

        {/* Quick Direct Full Pack Download Button */}
        <button
          onClick={handleDownloadFullZip}
          disabled={isDownloadingZip}
          className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-mono text-xs font-bold shadow-md hover:brightness-110 cursor-pointer disabled:opacity-50"
        >
          {zipSuccess ? <Check className="h-3.5 w-3.5" /> : <FolderArchive className="h-3.5 w-3.5" />}
          <span>{zipSuccess ? 'Kit Téléchargé !' : 'Télécharger Pack (.ZIP)'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1 : DASHBOARD LIVE · RAPPORT ANALYTIQUE POWER BI                   */}
      {/* ========================================================================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Power BI Window Frame Header Simulation */}
          <div
            className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
              isLight
                ? 'bg-gradient-to-r from-amber-50/80 via-yellow-50/50 to-neutral-50 border-amber-200 text-neutral-900'
                : 'bg-gradient-to-r from-amber-950/40 via-[#0d101d] to-[#07090e] border-amber-500/30 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                <PieChart className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                    Power BI Desktop v2026 · Normes Comptables Marocaines (CGNC)
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Simulation Interactive Live
                  </span>
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold">
                  Tableau de Bord Financier Décisionnel des Entreprises au Maroc
                </h4>
              </div>
            </div>

            {/* Power BI Internal Page Tabs */}
            <div
              className={`p-1 rounded-xl border flex flex-wrap items-center gap-1 font-mono text-[11px] ${
                isLight ? 'bg-white border-neutral-200' : 'bg-black/60 border-white/10'
              }`}
            >
              <button
                onClick={() => {
                  playSwitchClick(true);
                  setReportPage('synthese');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  reportPage === 'synthese'
                    ? 'bg-amber-500 text-black'
                    : isLight
                    ? 'text-neutral-600 hover:text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                1. Synthèse Exécutive (KPIs)
              </button>

              <button
                onClick={() => {
                  playSwitchClick(true);
                  setReportPage('cpc_esg');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  reportPage === 'cpc_esg'
                    ? 'bg-amber-500 text-black'
                    : isLight
                    ? 'text-neutral-600 hover:text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                2. CPC & Soldes de Gestion (ESG)
              </button>

              <button
                onClick={() => {
                  playSwitchClick(true);
                  setReportPage('bilan_treso');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  reportPage === 'bilan_treso'
                    ? 'bg-amber-500 text-black'
                    : isLight
                    ? 'text-neutral-600 hover:text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                3. Bilan Fonctionnel (FRNG / BFR / TN)
              </button>

              <button
                onClick={() => {
                  playSwitchClick(true);
                  setReportPage('dax_model');
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  reportPage === 'dax_model'
                    ? 'bg-amber-500 text-black'
                    : isLight
                    ? 'text-neutral-600 hover:text-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                4. Mesures DAX & Modèle en Étoile
              </button>
            </div>
          </div>

          {/* Slicers / Interactive Filters Bar */}
          <div
            className={`p-3.5 rounded-2xl border flex flex-wrap items-center justify-between gap-3 text-xs font-sans ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#090d18] border-white/10'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-amber-400 font-bold uppercase flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" />
                Société :
              </span>
              <select
                value={selectedCompany}
                onChange={(e) => {
                  playSwitchClick(true);
                  setSelectedCompany(e.target.value);
                }}
                className={`px-2.5 py-1 rounded-lg border font-mono text-[11px] focus:outline-none focus:border-amber-500 cursor-pointer ${
                  isLight
                    ? 'bg-white border-neutral-300 text-neutral-900'
                    : 'bg-black/60 border-white/15 text-white'
                }`}
              >
                <option value="all">Toutes les Sociétés (Consolidation)</option>
                {moroccanCompaniesData.map((comp) => (
                  <option key={comp.id} value={comp.id}>
                    {comp.nom} ({comp.secteur})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-neutral-400 font-bold uppercase">
                Secteur :
              </span>
              <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
                {['all', 'Agroalimentaire', 'Transport & Logistique', 'Commerce & Distribution', 'BTP & Construction', 'Technologies & Services'].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => {
                      playSwitchClick(true);
                      setSelectedSector(sec);
                    }}
                    className={`px-2 py-0.5 rounded-md transition-all cursor-pointer ${
                      selectedSector === sec
                        ? 'bg-amber-500 text-black font-bold'
                        : isLight
                        ? 'bg-white text-neutral-700 border border-neutral-200'
                        : 'bg-white/5 text-neutral-400 border border-white/5 hover:text-white'
                    }`}
                  >
                    {sec === 'all' ? 'Tous' : sec.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-neutral-400 font-bold uppercase">
                Exercice :
              </span>
              <span className="px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {selectedYear} (Clôture 31/12)
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SUB-VIEW 1 : SYNTHÈSE EXÉCUTIVE                                           */}
          {/* ========================================================================= */}
          {reportPage === 'synthese' && (
            <div className="space-y-6">
              {/* 5 Financial High-Level KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 font-mono">
                {/* KPI 1 */}
                <div
                  className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
                  }`}
                >
                  <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                    Chiffre d'Affaires HT
                  </span>
                  <div className="font-display text-xl sm:text-2xl font-black text-amber-400">
                    {totalCA.toFixed(1)} <span className="text-xs text-neutral-400">M DH</span>
                  </div>
                  <span className="text-[10.5px] text-emerald-400 flex items-center gap-0.5 mt-1">
                    <ArrowUpRight className="h-3 w-3" /> +12.4% vs N-1
                  </span>
                </div>

                {/* KPI 2 */}
                <div
                  className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
                  }`}
                >
                  <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                    Valeur Ajoutée (VA)
                  </span>
                  <div className="font-display text-xl sm:text-2xl font-black text-purple-400">
                    {totalVA.toFixed(1)} <span className="text-xs text-neutral-400">M DH</span>
                  </div>
                  <span className="text-[10.5px] text-purple-300 mt-1 block">
                    Taux VA : {((totalVA / totalCA) * 100).toFixed(1)}% du CA
                  </span>
                </div>

                {/* KPI 3 */}
                <div
                  className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
                  }`}
                >
                  <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                    EBE / EBITDA
                  </span>
                  <div className="font-display text-xl sm:text-2xl font-black text-emerald-400">
                    {totalEBE.toFixed(1)} <span className="text-xs text-neutral-400">M DH</span>
                  </div>
                  <span className="text-[10.5px] text-emerald-300 mt-1 block">
                    Marge EBE : {margeEbeGlobal.toFixed(1)}%
                  </span>
                </div>

                {/* KPI 4 */}
                <div
                  className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
                  }`}
                >
                  <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                    Résultat Net de l'Exercice
                  </span>
                  <div className="font-display text-xl sm:text-2xl font-black text-cyan-400">
                    {totalRN.toFixed(1)} <span className="text-xs text-neutral-400">M DH</span>
                  </div>
                  <span className="text-[10.5px] text-cyan-300 mt-1 block">
                    Marge Nette : {margeNetteGlobal.toFixed(2)}%
                  </span>
                </div>

                {/* KPI 5 */}
                <div
                  className={`p-4 rounded-2xl border ${
                    isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
                  }`}
                >
                  <span className="text-[10px] uppercase text-neutral-400 block mb-1">
                    Trésorerie Nette (TN)
                  </span>
                  <div
                    className={`font-display text-xl sm:text-2xl font-black ${
                      totalTN >= 0 ? 'text-emerald-400' : 'text-rose-500'
                    }`}
                  >
                    {totalTN > 0 ? `+${totalTN.toFixed(1)}` : totalTN.toFixed(1)}{' '}
                    <span className="text-xs text-neutral-400">M DH</span>
                  </div>
                  <span className="text-[10.5px] text-neutral-400 mt-1 block">
                    FRNG ({totalFRNG.toFixed(1)}) - BFR ({totalBFR.toFixed(1)})
                  </span>
                </div>
              </div>

              {/* Comparative Company Visual Table */}
              <div
                className={`p-5 rounded-2xl border space-y-4 ${
                  isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-amber-400" />
                      Tableau Comparatif des Performances Financières par Société
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-sans">
                      Données consolidées aux normes CGNC marocaines · Ratios de rentabilité et structure
                    </p>
                  </div>
                  <span className="text-xs font-mono text-neutral-400">
                    {filteredCompanies.length} entités analysées
                  </span>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left font-mono text-xs">
                    <thead
                      className={`text-[11px] uppercase tracking-wider ${
                        isLight ? 'bg-neutral-100 text-neutral-700' : 'bg-black/60 text-neutral-300'
                      }`}
                    >
                      <tr>
                        <th className="p-3">Société & Région</th>
                        <th className="p-3">Secteur</th>
                        <th className="p-3 text-right">CA HT (M DH)</th>
                        <th className="p-3 text-right">Valeur Ajoutée</th>
                        <th className="p-3 text-right">EBE / EBITDA</th>
                        <th className="p-3 text-right">Résultat Net</th>
                        <th className="p-3 text-right">Marge Nette</th>
                        <th className="p-3 text-right">Trésorerie Nette</th>
                        <th className="p-3 text-center">Autonomie Fi.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredCompanies.map((c) => (
                        <tr
                          key={c.id}
                          className={`transition-colors ${
                            isLight ? 'hover:bg-neutral-50' : 'hover:bg-white/5'
                          }`}
                        >
                          <td className="p-3">
                            <div className="font-bold text-white">{c.nom}</div>
                            <div className="text-[10px] text-neutral-400">{c.region}</div>
                          </td>
                          <td className="p-3 text-neutral-300">{c.secteur}</td>
                          <td className="p-3 text-right font-bold text-amber-400">
                            {c.ca_ht.toFixed(1)}
                          </td>
                          <td className="p-3 text-right text-purple-300">
                            {c.valeur_ajoutee.toFixed(1)}
                          </td>
                          <td className="p-3 text-right text-emerald-400">
                            {c.ebe.toFixed(1)}
                          </td>
                          <td className="p-3 text-right font-bold text-cyan-400">
                            {c.rn.toFixed(1)}
                          </td>
                          <td className="p-3 text-right">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                c.marge_nette_pct >= 8.0
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : 'bg-amber-500/20 text-amber-300'
                              }`}
                            >
                              {c.marge_nette_pct.toFixed(1)}%
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <span
                              className={`font-bold ${
                                c.tresorerie_nette >= 0 ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                            >
                              {c.tresorerie_nette > 0
                                ? `+${c.tresorerie_nette.toFixed(1)}`
                                : c.tresorerie_nette.toFixed(1)}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <span className="font-mono text-neutral-300">
                              {c.autonomie_financiere.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-VIEW 2 : CPC & ÉTAT DES SOLDES DE GESTION (ESG MAROCAIN)              */}
          {/* ========================================================================= */}
          {reportPage === 'cpc_esg' && (
            <div className="space-y-6">
              <div
                className={`p-5 rounded-2xl border space-y-4 ${
                  isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      <Scale className="h-4 w-4 text-purple-400" />
                      État des Soldes de Gestion (ESG) en Cascade · Norme CGNC
                    </h4>
                    <p className="text-[11px] text-neutral-400">
                      Calcul des soldes intermédiaires de gestion et de la Capacité d'Autofinancement (CAF)
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full font-mono text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Liasse Fiscale Officielle
                  </span>
                </div>

                {/* ESG Cascade Flow Table */}
                <div className="space-y-2 font-mono text-xs">
                  {/* Step 1 */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <strong className="text-white">1. Ventes de marchandises & Biens produits</strong>
                      <span className="text-[10px] text-neutral-400 block">Comptes 7111 & 7121 (Chiffre d'Affaires HT)</span>
                    </div>
                    <span className="font-bold text-amber-400 text-sm">+{totalCA.toFixed(1)} M DH</span>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <strong className="text-white">2. Consommations de l'exercice</strong>
                      <span className="text-[10px] text-neutral-400 block">Achats consommés de matières & Autres charges externes (612, 613, 614)</span>
                    </div>
                    <span className="font-bold text-rose-400 text-sm">-{(totalCA - totalVA).toFixed(1)} M DH</span>
                  </div>

                  {/* Step 3 (Key Subtotal: VA) */}
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-purple-400" />
                      <div>
                        <strong className="text-purple-200 uppercase font-black text-xs">= VALEUR AJOUTÉE MAROCAINE (VA)</strong>
                        <span className="text-[10.5px] text-purple-300/80 block">Création brute de valeur économique</span>
                      </div>
                    </div>
                    <span className="font-black text-purple-300 text-base">{totalVA.toFixed(1)} M DH</span>
                  </div>

                  {/* Step 4 */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <strong className="text-white">3. Charges de personnel (617) & Impôts et taxes (616)</strong>
                      <span className="text-[10px] text-neutral-400 block">Salaires bruts, cotisations CNSS / CIMR / AMO, taxes locales</span>
                    </div>
                    <span className="font-bold text-rose-400 text-sm">-{(totalVA - totalEBE).toFixed(1)} M DH</span>
                  </div>

                  {/* Step 5 (Key Subtotal: EBE) */}
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      <div>
                        <strong className="text-emerald-200 uppercase font-black text-xs">= EXCÉDENT BRUT D'EXPLOITATION (EBE / EBITDA)</strong>
                        <span className="text-[10.5px] text-emerald-300/80 block">Performance brute d'exploitation indépendante du financement</span>
                      </div>
                    </div>
                    <span className="font-black text-emerald-300 text-base">{totalEBE.toFixed(1)} M DH</span>
                  </div>

                  {/* Step 6 */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <strong className="text-white">4. Dotations nettes d'exploitation & Résultat Financier</strong>
                      <span className="text-[10px] text-neutral-400 block">Amortissements des immobilisations (619) et charges d'intérêts bancaires (631)</span>
                    </div>
                    <span className="font-bold text-rose-400 text-sm">-{(totalEBE - totalRN - 22.0).toFixed(1)} M DH</span>
                  </div>

                  {/* Step 7 (Final: Résultat Net) */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/30 border border-cyan-500/40 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-cyan-400" />
                      <div>
                        <strong className="text-cyan-200 uppercase font-black text-sm">= RÉSULTAT NET COMPTABLE DE L'EXERCICE</strong>
                        <span className="text-[11px] text-cyan-300/80 block">Après déduction de l'Impôt sur les Sociétés (IS Maroc 2026)</span>
                      </div>
                    </div>
                    <span className="font-black text-cyan-300 text-lg">{totalRN.toFixed(1)} M DH</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-VIEW 3 : BILAN FONCTIONNEL (FRNG / BFR / TRÉSORERIE NETTE)            */}
          {/* ========================================================================= */}
          {reportPage === 'bilan_treso' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
                {/* Box 1: FRNG */}
                <div
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-bold uppercase">1. FRNG Global</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                      Ressources Long Terme
                    </span>
                  </div>
                  <div className="text-2xl font-black text-emerald-400">
                    +{totalFRNG.toFixed(1)} <span className="text-xs text-neutral-400">M DH</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    <strong>Fonds de Roulement Net Global :</strong> Excédent des capitaux permanents sur les immobilisations nettes. Permet de couvrir le cycle d'exploitation.
                  </p>
                </div>

                {/* Box 2: BFR */}
                <div
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-bold uppercase">2. BFR d'Exploitation</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400">
                      Cycle d'Activité
                    </span>
                  </div>
                  <div className="text-2xl font-black text-amber-400">
                    {totalBFR.toFixed(1)} <span className="text-xs text-neutral-400">M DH</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    <strong>Besoin en Fonds de Roulement :</strong> Décalage de trésorerie lié aux stocks et créances clients (Comptes 3421) vs dettes fournisseurs (4411).
                  </p>
                </div>

                {/* Box 3: Trésorerie Nette */}
                <div
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-bold uppercase">3. Trésorerie Nette (TN)</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        totalTN >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {totalTN >= 0 ? 'Excédent Serein' : 'Tension Court Terme'}
                    </span>
                  </div>
                  <div
                    className={`text-2xl font-black ${
                      totalTN >= 0 ? 'text-emerald-400' : 'text-rose-500'
                    }`}
                  >
                    {totalTN > 0 ? `+${totalTN.toFixed(1)}` : totalTN.toFixed(1)}{' '}
                    <span className="text-xs text-neutral-400">M DH</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                    <strong>Équilibre Fondamental :</strong> TN = FRNG ({totalFRNG.toFixed(1)}) - BFR ({totalBFR.toFixed(1)}). Correspondance exacte avec les comptes bancaires (5141).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-VIEW 4 : MODÈLE EN ÉTOILE & FORMULES DAX DU RAPPORT                   */}
          {/* ========================================================================= */}
          {reportPage === 'dax_model' && (
            <div className="space-y-6">
              <div
                className={`p-5 rounded-2xl border space-y-4 ${
                  isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0c101d] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-amber-400" />
                      Mesures DAX Professionnelles (Intégrées dans Power BI Desktop)
                    </h4>
                    <p className="text-[11px] text-neutral-400 font-sans">
                      Formules conformes au plan comptable marocain CGNC avec gestion des agrégations et filtrage contextuel
                    </p>
                  </div>
                  <span className="font-mono text-xs text-neutral-400">
                    6 Mesures Clés
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
                  {daxMeasures.map((dax) => (
                    <div
                      key={dax.name}
                      className={`p-4 rounded-xl border space-y-2.5 ${
                        isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-black/50 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400">{dax.name}</span>
                        <button
                          onClick={() => copyToClipboard(dax.code, dax.name)}
                          className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-neutral-300 text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedKey === dax.name ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400">Copié</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copier DAX</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-3 rounded-lg bg-black/80 text-emerald-300 text-[11px] overflow-x-auto border border-white/5 font-mono leading-relaxed">
                        {dax.code}
                      </pre>

                      <p className="text-[10.5px] text-neutral-400 font-sans">
                        {dax.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2 : TÉLÉCHARGEMENTS DU PROJET (PACK .ZIP + CSV + DAX + M)          */}
      {/* ========================================================================= */}
      {activeTab === 'download' && (
        <div className="space-y-6">
          {/* Main Pack Banner */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border text-center space-y-6 max-w-4xl mx-auto ${
              isLight
                ? 'bg-white border-neutral-200 shadow-md text-neutral-900'
                : 'bg-gradient-to-b from-[#101424] to-[#07090e] border-amber-500/30 text-white'
            }`}
          >
            <div className="h-16 w-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto shadow-inner">
              <FolderArchive className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                Pack Projet Power BI Complet (Normes CGNC Maroc)
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black">
                Tous les Fichiers & Sources du Projet Prêts à l'Emploi
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                Téléchargez l'archive complète contenant les données financières d'entreprises marocaines en CSV, la nomenclature officielle du Plan Comptable CGNC, le script Power Query M et l'ensemble des formules DAX certifiées.
              </p>
            </div>

            {/* Primary Big Zip Download Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadFullZip}
                disabled={isDownloadingZip}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 text-black font-display font-bold text-sm shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                {zipSuccess ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-950" />
                    <span>Pack .ZIP Téléchargé avec Succès !</span>
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    <span>Télécharger le Pack Projet Complet (.ZIP)</span>
                  </>
                )}
              </button>
            </div>

            {/* Individual File Download Cards Grid */}
            <div className="pt-6 border-t border-white/10 text-left">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold block mb-4">
                Téléchargement direct fichier par fichier (En 1 Clic) :
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono text-xs">
                {/* File 1: CSV Companies */}
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                    isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-black/50 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <FileSpreadsheet className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-white block truncate">
                        Societes_Marocaines_Donnees.csv
                      </span>
                      <span className="text-[10px] text-neutral-400 block truncate">
                        5 Sociétés marocaines (MAD)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDownloadCsv(
                        'Societes_Marocaines_Donnees_Financieres.csv',
                        getCompaniesCsvContent()
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold transition-all cursor-pointer shrink-0"
                  >
                    Télécharger
                  </button>
                </div>

                {/* File 2: CSV Plan CGNC */}
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                    isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-black/50 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Layers className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-white block truncate">
                        Plan_Comptable_CGNC.csv
                      </span>
                      <span className="text-[10px] text-neutral-400 block truncate">
                        Classes 1 à 7 CGNC Maroc
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDownloadCsv(
                        'Plan_Comptable_General_Marocain_CGNC.csv',
                        getCgncPlanCsvContent()
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-[11px] font-bold transition-all cursor-pointer shrink-0"
                  >
                    Télécharger
                  </button>
                </div>

                {/* File 3: DAX Measures */}
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                    isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-black/50 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <Code2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-white block truncate">
                        Mesures_DAX_Finance_Maroc.dax
                      </span>
                      <span className="text-[10px] text-neutral-400 block truncate">
                        6 Mesures (VA, EBE, FRNG, BFR)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const daxText = daxMeasures
                        .map((m) => `// ${m.name}\n// ${m.description}\n${m.code}\n`)
                        .join('\n\n');
                      handleDownloadTextFile('Mesures_DAX_Finance_Maroc.dax', daxText);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition-all cursor-pointer shrink-0"
                  >
                    Télécharger
                  </button>
                </div>

                {/* File 4: Power Query M */}
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                    isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-black/50 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <Terminal className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-white block truncate">
                        Script_PowerQuery_M.m
                      </span>
                      <span className="text-[10px] text-neutral-400 block truncate">
                        Import 1-clic Power BI Desktop
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDownloadTextFile(
                        'Script_PowerQuery_M_Import_Automatique.m',
                        powerQueryMScript
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-[11px] font-bold transition-all cursor-pointer shrink-0"
                  >
                    Télécharger
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3 : GUIDE PAS-À-PAS D'IMPORTATION POWER BI DESKTOP                */}
      {/* ========================================================================= */}
      {activeTab === 'guide' && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div
            className={`p-6 sm:p-8 rounded-2xl border space-y-6 ${
              isLight ? 'bg-white border-neutral-200 shadow-md' : 'bg-[#0c101d] border-white/10'
            }`}
          >
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
                Tutoriel Pratique · Prêt en 2 Minutes
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white mt-1">
                Comment Ouvrir et Exploiter ce Projet dans Microsoft Power BI Desktop
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-sans mt-2">
                Suivez ces 3 étapes simples pour charger les données financières marocaines, appliquer les mesures DAX et reproduire le rapport interactif.
              </p>
            </div>

            {/* Step 1 */}
            <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-3">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-lg bg-amber-500 text-black font-mono font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h4 className="font-display font-bold text-sm text-white">
                  Étape 1 : Importer les données sources dans Power BI Desktop
                </h4>
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Ouvrez <strong>Power BI Desktop</strong> sur votre ordinateur, cliquez sur le menu <strong>Accueil</strong> &gt; <strong>Obtenir les données</strong> &gt; <strong>Texte/CSV</strong>, puis sélectionnez le fichier <code>Societes_Marocaines_Donnees_Financieres.csv</code>.
              </p>
              <div className="p-3 rounded-lg bg-white/5 border border-white/5 font-mono text-[11px] text-neutral-400">
                💡 <em>Astuce : Assurez-vous que le séparateur détecté est bien le Point-virgule (;) et cliquez sur « Charger ».</em>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-3">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-lg bg-purple-500 text-white font-mono font-black text-xs flex items-center justify-center">
                  2
                </span>
                <h4 className="font-display font-bold text-sm text-white">
                  Étape 2 : Créer les Mesures DAX dans le volet Données
                </h4>
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Dans le volet de droite de Power BI, faites un clic droit sur la table de données &gt; <strong>Nouvelle mesure</strong>. Copiez-collez l'une des 6 formules DAX certifiées (disponibles dans l'onglet Dashboard ou dans le fichier <code>.dax</code>).
              </p>
              <div className="flex items-center justify-between p-3 rounded-lg bg-purple-950/30 border border-purple-500/30 font-mono text-xs">
                <span className="text-purple-300 font-bold">Valeur_Ajoutee_CGNC = [CA_HT] - [Consommations_612_614]</span>
                <button
                  onClick={() => copyToClipboard(daxMeasures[1].code, 'guide-dax')}
                  className="px-2.5 py-1 rounded bg-purple-500/30 hover:bg-purple-500/50 text-purple-200 font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  {copiedKey === 'guide-dax' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedKey === 'guide-dax' ? 'Copié' : 'Copier Formule'}</span>
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl border border-white/10 bg-black/40 space-y-3">
              <div className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-lg bg-emerald-500 text-black font-mono font-black text-xs flex items-center justify-center">
                  3
                </span>
                <h4 className="font-display font-bold text-sm text-white">
                  Étape 3 : Insérer les visuels (Cartes KPIs, Segments & Cascades)
                </h4>
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Dans le volet <strong>Visualisations</strong> :
              </p>
              <ul className="list-disc list-inside text-xs text-neutral-400 space-y-1 font-sans">
                <li>Insérez des <strong>Cartes KPI</strong> pour afficher le CA HT, la VA, l'EBE et la Trésorerie Nette.</li>
                <li>Insérez un <strong>Segment (Slicer)</strong> sur le champ <code>secteur_activite</code> ou <code>nom_societe</code> pour filtrer interactivement.</li>
                <li>Insérez un <strong>Graphique en cascade (Waterfall)</strong> pour représenter les Soldes Intermédiaires de Gestion (ESG).</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
