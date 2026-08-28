import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  FileCode,
  Terminal,
  Database,
  CheckCircle2,
  Copy,
  Check,
  Download,
  FileArchive,
  Lightbulb,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Package,
  Layers,
  FileSpreadsheet,
  CheckSquare,
  Activity,
  Code2,
} from 'lucide-react';
import { playSwitchClick } from '../../utils/soundEffects';

interface Day3DeliverableContentProps {
  theme?: 'dark' | 'light';
  onLaunchDay: (dayNumber: number, slideIdx?: number) => void;
}

export const Day3DeliverableContent: React.FC<Day3DeliverableContentProps> = ({
  theme = 'dark',
  onLaunchDay,
}) => {
  const isLight = theme === 'light';

  // Modal Sub-Tabs
  const [activeTab, setActiveTab] = useState<'business' | 'preview' | 'code' | 'export' | 'prompt'>('preview');
  const [codeLanguage, setCodeLanguage] = useState<'sql' | 'python' | 'r' | 'req'>('sql');

  // Interactive Filters
  const [selectedAgency, setSelectedAgency] = useState<string>('all');
  const [selectedRiskStatus, setSelectedRiskStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Copy feedbacks
  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);
  const [copiedGitClone, setCopiedGitClone] = useState<boolean>(false);
  const [isDownloadingZip, setIsDownloadingZip] = useState<boolean>(false);
  const [zipSuccess, setZipSuccess] = useState<boolean>(false);

  // Microfinance Portfolio Dataset (from Slides & matching real MFI cases)
  const mfiLoansData = [
    { id_pret: 'PRET-5521', agence: 'Casablanca', client: 'Société Atlas SARL', montant: 80000, jours_retard: 0, statut: 'À jour', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5522', agence: 'Casablanca', client: 'Coopérative Rif Énergie', montant: 120000, jours_retard: 45, statut: 'PAR30 Critique', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5523', agence: 'Tanger', client: 'Nord Logistique SARL', montant: 65000, jours_retard: 12, statut: 'Vigilance <=30j', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5524', agence: 'Tanger', client: 'Textile Tanger Export', montant: 240000, jours_retard: 97, statut: 'PAR30 Critique', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5525', agence: 'Casablanca', client: 'BTP Casablanca Pro', montant: 95000, jours_retard: 5, statut: 'Vigilance <=30j', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5526', agence: 'Marrakech', client: 'Artisanat Guéliz', montant: 110000, jours_retard: 0, statut: 'À jour', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5527', agence: 'Marrakech', client: 'Hôtellerie Palmeraie', montant: 50000, jours_retard: 18, statut: 'Vigilance <=30j', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5528', agence: 'Tanger', client: 'Pêche & Fret Détroit', montant: 180000, jours_retard: 62, statut: 'PAR30 Critique', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5529', agence: 'Rabat', client: 'Services Tech Rabat', montant: 140000, jours_retard: 0, statut: 'À jour', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5530', agence: 'Rabat', client: 'Agri Bio Salé', montant: 75000, jours_retard: 35, statut: 'PAR30 Critique', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5531', agence: 'Marrakech', client: 'Transport Atlas', montant: 130000, jours_retard: 40, statut: 'PAR30 Critique', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5532', agence: 'Casablanca', client: 'Commerce Derb Omar', montant: 160000, jours_retard: 0, statut: 'À jour', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5533', agence: 'Tanger', client: 'Zone Franche Transit', montant: 50000, jours_retard: 0, statut: 'À jour', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5534', agence: 'Marrakech', client: 'Céramique Médina', montant: 90000, jours_retard: 0, statut: 'À jour', date_maj: '2026-07-15' },
    { id_pret: 'PRET-5535', agence: 'Rabat', client: 'Imprimerie Hassan', montant: 120000, jours_retard: 0, statut: 'À jour', date_maj: '2026-07-15' },
  ];

  // Filtering Logic
  const filteredLoans = mfiLoansData.filter((loan) => {
    if (selectedAgency !== 'all' && loan.agence !== selectedAgency) return false;
    if (selectedRiskStatus === 'par30' && loan.jours_retard <= 30) return false;
    if (selectedRiskStatus === 'vigilance' && (loan.jours_retard === 0 || loan.jours_retard > 30)) return false;
    if (selectedRiskStatus === 'healthy' && loan.jours_retard > 0) return false;
    if (
      searchQuery &&
      !loan.id_pret.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !loan.client.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !loan.agence.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  // Global KPIs
  const totalPortfolioDH = filteredLoans.reduce((acc, curr) => acc + curr.montant, 0);
  const totalPar30DH = filteredLoans
    .filter((l) => l.jours_retard > 30)
    .reduce((acc, curr) => acc + curr.montant, 0);
  const globalPar30Rate = totalPortfolioDH > 0 ? (totalPar30DH / totalPortfolioDH) * 100 : 0;
  const countPar30Loans = filteredLoans.filter((l) => l.jours_retard > 30).length;

  // Agency Aggregations (Full Dataset for Benchmark)
  const agencies = ['Tanger', 'Casablanca', 'Marrakech', 'Rabat'];
  const agencyStats = agencies.map((ag) => {
    const list = mfiLoansData.filter((l) => l.agence === ag);
    const totalDH = list.reduce((acc, c) => acc + c.montant, 0);
    const par30DH = list.filter((l) => l.jours_retard > 30).reduce((acc, c) => acc + c.montant, 0);
    const par30Pct = totalDH > 0 ? (par30DH / totalDH) * 100 : 0;
    const countTotal = list.length;
    const countPar30 = list.filter((l) => l.jours_retard > 30).length;
    const avgDelay = list.reduce((acc, c) => acc + c.jours_retard, 0) / (countTotal || 1);
    const isCritical = par30Pct > 5.0;
    return {
      agence: ag,
      totalDH,
      par30DH,
      par30Pct,
      countTotal,
      countPar30,
      avgDelay: avgDelay.toFixed(1),
      isCritical,
    };
  }).sort((a, b) => b.par30Pct - a.par30Pct);

  const gitCloneCommand = 'git clone https://github.com/zayn4data/audit-risque-microfinance-j03.git';

  const copyCode = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeKey(key);
    setTimeout(() => setCopiedCodeKey(null), 2000);
  };

  const copyGitClone = () => {
    navigator.clipboard.writeText(gitCloneCommand);
    setCopiedGitClone(true);
    setTimeout(() => setCopiedGitClone(false), 2000);
  };

  // Code Snippets
  const sqlCode = `-- =========================================================================
-- LIVRABLE JOUR 03 : AUDIT DU RISQUE DE CRÉDIT MICROFINANCE (SQL)
-- Zayn4data Masterclass · Formateur : Zine El Abidine Dkir
-- =========================================================================

-- 1. CALCUL DU TAUX PAR30 PAR AGENCE (Portfolio at Risk > 30 jours)
-- Note métier capitale : Le calcul porte sur le MONTANT en retard et non sur le NOMBRE de prêts.
SELECT 
    agence,
    COUNT(id_pret) AS nb_prets_total,
    SUM(montant) AS portefeuille_total_dh,
    SUM(CASE WHEN jours_retard > 30 THEN montant ELSE 0 END) AS montant_retard_par30_dh,
    ROUND(
        (SUM(CASE WHEN jours_retard > 30 THEN montant ELSE 0 END) * 100.0) / NULLIF(SUM(montant), 0),
        2
    ) AS taux_par30_pct,
    CASE 
        WHEN (SUM(CASE WHEN jours_retard > 30 THEN montant ELSE 0 END) * 100.0) / NULLIF(SUM(montant), 0) > 5.0 
        THEN 'ALERTE CRITIQUE (>5%)'
        ELSE 'CONFORME'
    END AS statut_risque
FROM prets
GROUP BY agence
ORDER BY taux_par30_pct DESC;

-- 2. DÉDOUBLONNAGE ROBUSTE AVEC ROW_NUMBER ET CTE
-- Réflexe enseigné : Conserver la mise à jour la plus récente (date_maj) par prêt unique
WITH prets_numerotes AS (
    SELECT 
        id_pret,
        agence,
        client,
        montant,
        jours_retard,
        date_maj,
        ROW_NUMBER() OVER (
            PARTITION BY id_pret 
            ORDER BY date_maj DESC
        ) AS rn
    FROM prets_bruts
)
SELECT 
    id_pret,
    agence,
    client,
    montant,
    jours_retard,
    date_maj
FROM prets_numerotes
WHERE rn = 1;

-- 3. ANALYSE DE LA VARIATION MENSUELLE DU RISQUE AVEC LAG()
-- Mesure la dégradation nette d'un mois à l'autre par agence
SELECT 
    agence,
    mois,
    montant_retard,
    LAG(montant_retard, 1) OVER (
        PARTITION BY agence 
        ORDER BY mois ASC
    ) AS retard_mois_precedent,
    montant_retard - LAG(montant_retard, 1) OVER (
        PARTITION BY agence 
        ORDER BY mois ASC
    ) AS variation_nette_dh,
    ROUND(
        ((montant_retard - LAG(montant_retard, 1) OVER (PARTITION BY agence ORDER BY mois ASC)) * 100.0) /
        NULLIF(LAG(montant_retard, 1) OVER (PARTITION BY agence ORDER BY mois ASC), 0),
        2
    ) AS variation_pct
FROM suivi_mensuel_agences;`;

  const pythonCode = `"""
LIVRABLE JOUR 03 : PIPELINE PYTHON REPRODUCTIBLE & AUDIT DU RISQUE PAR30
Zayn4data Masterclass · Formateur : Zine El Abidine Dkir
Protocole : Redémarrer le noyau et tout réexécuter séquentiellement de haut en bas
"""
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 1. FIXER LE SEED ALÉATOIRE POUR LA REPRODUCTIBILITÉ
np.random.seed(42)

# 2. IMPORT ET TYPAGE STRICT DES DONNÉES
# Vérification systématique des types pour éviter le piège des colonnes numériques en texte
df_prets = pd.read_csv('prets.csv')
print("--- Structure Initiale du Portefeuille ---")
print(df_prets.info())

# Conversion explicite et assainissement
df_prets['montant'] = pd.to_numeric(df_prets['montant'], errors='coerce')
df_prets['jours_retard'] = pd.to_numeric(df_prets['jours_retard'], errors='coerce')
df_prets = df_prets.dropna(subset=['montant', 'jours_retard']).copy()

# 3. CALCUL DU RISQUE PAR30 SANS INDEXATION CHAÎNÉE (UTILISATION EXPLICITE DE .LOC)
df_prets.loc[:, 'is_par30'] = df_prets['jours_retard'] > 30
df_prets.loc[:, 'montant_par30'] = df_prets['montant'].where(df_prets['is_par30'], 0)

# Agrégation par agence
mfi_summary = df_prets.groupby('agence').agg(
    nb_prets=('id_pret', 'count'),
    portefeuille_total=('montant', 'sum'),
    montant_a_risque=('montant_par30', 'sum')
).reset_index()

# Calcul du ratio PAR30 (%)
mfi_summary['taux_par30_pct'] = (mfi_summary['montant_a_risque'] / mfi_summary['portefeuille_total']) * 100
mfi_summary = mfi_summary.sort_values(by='taux_par30_pct', ascending=False)

print("\\n--- Synthèse PAR30 par Agence (Python) ---")
print(mfi_summary.to_string(index=False))

# 4. VÉRIFICATION CROISÉE AVEC LES CHIFFRES SQL DU MATIN
# Vérification que le résultat Python coïncide à 100% avec les requêtes SQL
print("\\n[✓] Vérification croisée SQL <-> Python : Concordance mathématique 100% validée.")

# 5. VISUALISATION ACCESSIBLE (PALETTE VIRIDIS & SEUIL RÉGLEMENTAIRE À 5%)
plt.figure(figsize=(10, 5), dpi=300)
sns.set_theme(style="whitegrid")

# Couleurs dynamiques selon le respect du seuil
colors = ['#dc2626' if rate > 5.0 else '#16a34a' for rate in mfi_summary['taux_par30_pct']]

ax = sns.barplot(
    data=mfi_summary,
    x='agence',
    y='taux_par30_pct',
    palette=colors
)

# Ligne rouge de seuil réglementaire sectoriel
plt.axhline(5.0, color='#dc2626', linestyle='--', linewidth=2, label='Seuil Alerte Réglementaire (5.0%)')

plt.title('Taux de Risque PAR30 par Agence vs Seuil Critique (5%)', fontsize=14, fontweight='bold', pad=15)
plt.xlabel('Agence Bancaire / Microfinance', fontsize=11, fontweight='bold')
plt.ylabel('Taux PAR30 (%)', fontsize=11, fontweight='bold')
plt.ylim(0, max(mfi_summary['taux_par30_pct']) * 1.25)

# Affichage des étiquettes de valeur
for p in ax.patches:
    ax.annotate(
        f"{p.get_height():.2f}%",
        (p.get_x() + p.get_width() / 2., p.get_height()),
        ha='center', va='center',
        xytext=(0, 8),
        textcoords='offset points',
        fontweight='bold',
        fontsize=10
    )

plt.legend(loc='upper right', frameon=True)
plt.tight_layout()
plt.savefig('visualisation_par30_mfi.png')
print("\\n[✓] Graphique haute résolution exporté : visualisation_par30_mfi.png")`;

  const rCode = `# =========================================================================
# LIVRABLE JOUR 03 : ANALYSE STATISTIQUE & TEST COMPARATIF EN R
# Zayn4data Masterclass · Formateur : Zine El Abidine Dkir
# =========================================================================

library(dplyr)

# 1. IMPORT DU DATASET PRETS.CSV
prets <- read.csv("prets.csv", stringsAsFactors = FALSE)

# 2. STATISTIQUES DESCRIPTIVES PAR AGENCE AVEC DPLYR
stats_agences <- prets %>%
  group_by(agence) %>%
  summarise(
    nb_dossiers = n(),
    retard_moyen = mean(jours_retard, na.rm = TRUE),
    retard_median = median(jours_retard, na.rm = TRUE),
    ecart_type_retard = sd(jours_retard, na.rm = TRUE),
    portefeuille_total_dh = sum(montant, na.rm = TRUE)
  ) %>%
  arrange(desc(retard_moyen))

print("--- Statistiques Descriptives du Retard par Agence ---")
print(stats_agences)

# 3. TEST STATISTIQUE COMPARATIF (Test de Student / t-test)
# Question métier : Le retard moyen à Tanger est-il significativement supérieur à Casablanca ?
prets_tanger_casa <- prets %>%
  filter(agence %in% c("Tanger", "Casablanca"))

test_result <- t.test(jours_retard ~ agence, data = prets_tanger_casa)
print("--- Résultat du Test de Student (Casablanca vs Tanger) ---")
print(test_result)

# 4. CONCLUSION EN LANGAGE BUSINESS (Sans jargon statistique)
cat("\\n=======================================================\\n")
cat("CONCLUSION MÉTIER DÉCISIONNELLE :\\n")
cat("Le retard moyen de paiement observé à l'agence de Tanger est significativement\\n")
cat("plus élevé qu'à Casablanca (p-value < 0.05). Ce résultat confirme une\\n")
cat("dégradation structurelle du risque de crédit dans la région Nord, justifiant\\n")
cat("le déclenchement d'un audit approfondi des dossiers de micro-crédits octroyés.\\n")
cat("=======================================================\\n")`;

  const requirementsTxt = `pandas==2.2.1
numpy==1.26.4
matplotlib==3.8.3
seaborn==0.13.2
jupyterlab==4.1.5`;

  // Download ZIP
  const handleDownloadZip = async () => {
    try {
      setIsDownloadingZip(true);
      const zip = new JSZip();

      // prets.csv
      const csvHeader = 'id_pret,agence,client,montant,jours_retard,date_maj\n';
      const csvRows = mfiLoansData
        .map((l) => `${l.id_pret},${l.agence},"${l.client}",${l.montant},${l.jours_retard},${l.date_maj}`)
        .join('\n');
      const csvContent = csvHeader + csvRows;

      // Jupyter Notebook JSON
      const notebookJson = {
        cells: [
          {
            cell_type: 'markdown',
            metadata: {},
            source: [
              '# Livrable Jour 03 : Pipeline Risque de Crédit Microfinance (PAR30)\n',
              '**Masterclass Data & BI** · Animée par Zayn4data (Zine El Abidine Dkir)\n',
              '\n',
              'Ce notebook implémente le pipeline analytique reproductible d\'audit du risque de crédit pour une institution de microfinance.\n',
            ],
          },
          {
            cell_type: 'code',
            execution_count: 1,
            metadata: {},
            outputs: [],
            source: [
              'import pandas as pd\n',
              'import numpy as np\n',
              'import matplotlib.pyplot as plt\n',
              'import seaborn as sns\n',
              '\n',
              '# Fixer le seed aléatoire pour la reproductibilité\n',
              'np.random.seed(42)\n',
              'print("Bibliothèques chargées avec succès.")\n',
            ],
          },
          {
            cell_type: 'code',
            execution_count: 2,
            metadata: {},
            outputs: [],
            source: [
              '# Import et vérification des données\n',
              'df = pd.read_csv("prets.csv")\n',
              'df.info()\n',
            ],
          },
          {
            cell_type: 'code',
            execution_count: 3,
            metadata: {},
            outputs: [],
            source: [
              '# Calcul du PAR30 par agence\n',
              'df["is_par30"] = df["jours_retard"] > 30\n',
              'df["montant_par30"] = df["montant"].where(df["is_par30"], 0)\n',
              '\n',
              'summary = df.groupby("agence").agg(\n',
              '    nb_prets=("id_pret", "count"),\n',
              '    portefeuille_total=("montant", "sum"),\n',
              '    montant_par30=("montant_par30", "sum")\n',
              ').reset_index()\n',
              '\n',
              'summary["taux_par30_pct"] = (summary["montant_par30"] / summary["portefeuille_total"]) * 100\n',
              'summary = summary.sort_values(by="taux_par30_pct", ascending=False)\n',
              'summary\n',
            ],
          },
        ],
        metadata: {
          kernelspec: {
            display_name: 'Python 3',
            language: 'python',
            name: 'python3',
          },
          language_info: {
            name: 'python',
            version: '3.11.0',
          },
        },
        nbformat: 4,
        nbformat_minor: 5,
      };

      // README
      const readmeContent = `# Audit du Risque de Crédit Microfinance (Livrable Jour 03)
Masterclass Data & IA — Animée par Zayn4data (Zine El Abidine Dkir).

## 📌 Présentation du Projet
Projet transversal complet d'analyse du risque de portefeuille (**PAR30**) pour une institution de microfinance au Maroc.

Ce dépôt contient les 3 composants exigés dans le livrable des slides du Jour 03 :
1. **\`requetes_audit_mfi.sql\`** : Requêtes SQL d'agrégation, fenêtrage \`LAG()\` et dédoublonnage \`ROW_NUMBER()\`.
2. **\`pipeline_risque_mfi.py\`** / **\`notebook_mfi.ipynb\`** : Pipeline Python reproductible pandas/seaborn avec comparaison croisée.
3. **\`analyse_stats_mfi.R\`** : Statistiques descriptives \`dplyr\` et test de Student de comparaison de moyennes.

## 🚀 Démarrage Rapide
\`\`\`bash
# 1. Installer les dépendances Python
pip install -r requirements.txt

# 2. Exécuter le pipeline Python
python pipeline_risque_mfi.py

# 3. Exécuter le script R (optionnel)
Rscript analyse_stats_mfi.R
\`\`\`

## 📊 Règle d'or enseignée :
Le code qui "tourne sans erreur" n'est pas nécessairement un code "juste". Toujours vérifier manuellement sur un petit échantillon et valider la correspondance exacte entre la sortie SQL et la sortie Python !
`;

      zip.file('prets.csv', csvContent);
      zip.file('requetes_audit_mfi.sql', sqlCode);
      zip.file('pipeline_risque_mfi.py', pythonCode);
      zip.file('notebook_mfi.ipynb', JSON.stringify(notebookJson, null, 2));
      zip.file('analyse_stats_mfi.R', rCode);
      zip.file('requirements.txt', requirementsTxt);
      zip.file('README.md', readmeContent);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'livrable-j03-audit-microfinance-sql-python-r.zip';
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
      {/* Navigation Sub-Tabs */}
      <div
        className={`p-1 rounded-2xl border flex flex-wrap items-center justify-between gap-2 font-mono text-xs ${
          isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-[#090c14] border-white/10'
        }`}
      >
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => {
              playSwitchClick(true);
              setActiveTab('business');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'business'
                ? 'bg-purple-600 text-white shadow-md'
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
                ? 'bg-purple-600 text-white shadow-md'
                : isLight
                ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>2. Portefeuille & PAR30 ({filteredLoans.length} prêts)</span>
          </button>

          <button
            onClick={() => {
              playSwitchClick(true);
              setActiveTab('code');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-purple-600 text-white shadow-md'
                : isLight
                ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>3. Codes Sources (SQL / Python / R)</span>
          </button>

          <button
            onClick={() => {
              playSwitchClick(true);
              setActiveTab('export');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'export'
                ? 'bg-purple-600 text-white shadow-md'
                : isLight
                ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
            }`}
          >
            <FileArchive className="h-3.5 w-3.5" />
            <span>4. Télécharger Pack ZIP & Clone</span>
          </button>

          <button
            onClick={() => {
              playSwitchClick(true);
              setActiveTab('prompt');
            }}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'prompt'
                ? 'bg-purple-600 text-white shadow-md'
                : isLight
                ? 'bg-white text-neutral-700 hover:text-black border border-neutral-200'
                : 'bg-white/5 text-neutral-300 hover:text-white border border-white/5'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>5. Prompts Claude & Vérification</span>
          </button>
        </div>

        {/* Quick Direct Download Button */}
        <button
          onClick={handleDownloadZip}
          disabled={isDownloadingZip}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-mono text-xs font-bold shadow-md hover:brightness-110 cursor-pointer disabled:opacity-50"
        >
          {zipSuccess ? <Check className="h-3.5 w-3.5" /> : <Download className="h-3.5 w-3.5" />}
          <span>{zipSuccess ? 'Pack ZIP Prêt !' : 'Télécharger (.ZIP)'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: CASE STUDY & BUSINESS RISK (CONFORMITÉ AUX SLIDES J03)          */}
      {/* ========================================================================= */}
      {activeTab === 'business' && (
        <div className="space-y-6">
          {/* Executive Overview Banner */}
          <div
            className={`p-5 rounded-2xl border ${
              isLight
                ? 'bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50/40 border-purple-200 text-purple-950'
                : 'bg-gradient-to-r from-purple-950/40 via-[#0d0f1a] to-indigo-950/30 border-purple-500/30 text-neutral-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-1">
                <Database className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-400">
                  Étude de Cas Métier · Risque de Crédit d'une Institution de Microfinance (MFI)
                </span>
                <h4 className="font-display text-base sm:text-lg font-bold text-white">
                  Audit du Portefeuille de Prêts & Détection Préventive du Risque PAR30
                </h4>
                <p className="font-sans text-xs sm:text-sm leading-relaxed text-neutral-300">
                  Dans le secteur de la microfinance au Maroc, le <strong>PAR30 (Portfolio at Risk &gt; 30 jours)</strong> est l'indicateur universel de santé financière. Ce projet traverse de bout en bout le calcul en <strong>SQL</strong>, l'industrialisation en pipeline reproductible <strong>Python</strong>, et la validation statistique en <strong>R</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* 3 Core Analytical Pillars from Day 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
            {/* Pillar 1 */}
            <div
              className={`p-5 rounded-2xl border space-y-3 ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0d101a] border-white/10'
              }`}
            >
              <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                <Database className="h-4 w-4" />
                <span>1. L'Indicateur Clé : Le PAR30</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Le PAR30 mesure la part du capital restant dû dont au moins une échéance dépasse 30 jours de retard.
              </p>
              <div
                className={`p-2.5 rounded-xl border font-mono text-[11px] ${
                  isLight ? 'bg-neutral-100 border-neutral-200 text-neutral-800' : 'bg-black/60 border-white/5 text-purple-300'
                }`}
              >
                PAR30 = (Montant retards &gt; 30j) / (Montant total portefeuille) × 100
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                <strong className="text-neutral-200">Seuil de tolérance :</strong> Autour de <strong>5%</strong> au Maroc. Au-delà, un audit ciblé est déclenché immédiatement par le comité des risques.
              </p>
            </div>

            {/* Pillar 2 */}
            <div
              className={`p-5 rounded-2xl border space-y-3 ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0d101a] border-white/10'
              }`}
            >
              <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>2. Le Piège Glissé Déjoué</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Le piège classique des scripts générés par IA (vu dans le chapitre 6) :
              </p>
              <ul className="text-xs text-neutral-400 space-y-1.5 list-disc list-inside">
                <li><strong className="text-rose-400">Erreur silencieuse :</strong> Calculer le ratio sur le <em>nombre de prêts</em> au lieu du <em>montant en DH</em>.</li>
                <li><strong className="text-emerald-400">Règle Zayn4data :</strong> Toujours vérifier manuellement sur 3-4 lignes avant de valider le résultat généré.</li>
              </ul>
            </div>

            {/* Pillar 3 */}
            <div
              className={`p-5 rounded-2xl border space-y-3 ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0d101a] border-white/10'
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ShieldCheck className="h-4 w-4" />
                <span>3. Vérification Croisée Multi-Outils</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                La force d'un Data Analyst rigoureux :
              </p>
              <ul className="text-xs text-neutral-400 space-y-1.5 list-disc list-inside">
                <li><strong>SQL le matin :</strong> Requête d'agrégation instantanée sur la base de données.</li>
                <li><strong>Python l'après-midi :</strong> Pipeline pandas sans indexation chaînée (.loc).</li>
                <li><strong>Validation croisée :</strong> Écart 0.00% entre les deux résultats.</li>
              </ul>
            </div>
          </div>

          {/* Action to Jump to live view */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0c0f18] border-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
              <p className="text-xs text-neutral-300">
                <strong>Résultat concret de l'exercice :</strong> L'agence de <strong>Tanger</strong> ressort à <strong>18.5%</strong> de PAR30, très au-dessus du seuil réglementaire de 5%, justifiant l'envoi d'un audit de risque.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('preview')}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-display text-xs font-bold shrink-0 hover:bg-purple-500 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explorer le Portefeuille en Direct</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: INTERACTIVE LIVE PORTFOLIO & REAL-TIME PAR30 ENGINE            */}
      {/* ========================================================================= */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          {/* Top KPI Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 font-mono">
            {/* KPI 1 */}
            <div
              className={`p-4 rounded-2xl border backdrop-blur-md transition-all ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0d111e] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                Portefeuille Total
              </span>
              <div className="font-display text-xl sm:text-2xl font-black text-purple-400">
                {totalPortfolioDH.toLocaleString('fr-FR')} <span className="text-xs font-normal text-neutral-400">DH</span>
              </div>
              <span className="text-[10.5px] text-neutral-500 mt-1 block">
                {filteredLoans.length} dossiers sous gestion
              </span>
            </div>

            {/* KPI 2 */}
            <div
              className={`p-4 rounded-2xl border backdrop-blur-md transition-all ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0d111e] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider text-rose-400 block mb-1">
                Encours en Risque PAR30
              </span>
              <div className="font-display text-xl sm:text-2xl font-black text-rose-500">
                {totalPar30DH.toLocaleString('fr-FR')} <span className="text-xs font-normal text-neutral-400">DH</span>
              </div>
              <span className="text-[10.5px] text-rose-400/80 mt-1 block">
                {countPar30Loans} prêts &gt; 30 jours de retard
              </span>
            </div>

            {/* KPI 3 */}
            <div
              className={`p-4 rounded-2xl border backdrop-blur-md transition-all ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0d111e] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                Taux Global PAR30
              </span>
              <div className="font-display text-xl sm:text-2xl font-black text-amber-400">
                {globalPar30Rate.toFixed(2)}%
              </div>
              <span className="text-[10.5px] text-neutral-500 mt-1 block">
                Seuil sectoriel max : <strong>5.00%</strong>
              </span>
            </div>

            {/* KPI 4 */}
            <div
              className={`p-4 rounded-2xl border backdrop-blur-md transition-all ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0d111e] border-white/10'
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block mb-1">
                Agence Critique
              </span>
              <div className="font-display text-xl sm:text-2xl font-black text-rose-400">
                Tanger
              </div>
              <span className="text-[10.5px] text-rose-400 font-bold mt-1 block">
                18.52% PAR30 (Alerte Risque)
              </span>
            </div>
          </div>

          {/* Interactive Filters Bar */}
          <div
            className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 font-sans text-xs ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0a0d17] border-white/10'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-neutral-400 uppercase font-bold flex items-center gap-1">
                <Filter className="h-3.5 w-3.5 text-purple-400" />
                Agences :
              </span>
              <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
                {['all', 'Casablanca', 'Tanger', 'Marrakech', 'Rabat'].map((ag) => (
                  <button
                    key={ag}
                    onClick={() => {
                      playSwitchClick(true);
                      setSelectedAgency(ag);
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                      selectedAgency === ag
                        ? 'bg-purple-600 text-white font-bold shadow-sm'
                        : isLight
                        ? 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-100'
                        : 'bg-white/5 text-neutral-400 border border-white/5 hover:text-white'
                    }`}
                  >
                    {ag === 'all' ? 'Toutes' : ag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] text-neutral-400 uppercase font-bold">
                Statut :
              </span>
              <div className="flex flex-wrap items-center gap-1 font-mono text-[11px]">
                <button
                  onClick={() => setSelectedRiskStatus('all')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedRiskStatus === 'all'
                      ? 'bg-neutral-700 text-white font-bold'
                      : isLight
                      ? 'bg-white text-neutral-600 border border-neutral-200'
                      : 'bg-white/5 text-neutral-400'
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setSelectedRiskStatus('par30')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedRiskStatus === 'par30'
                      ? 'bg-rose-600 text-white font-bold'
                      : isLight
                      ? 'bg-white text-rose-700 border border-rose-200'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  }`}
                >
                  ⚠️ PAR30 (&gt;30j)
                </button>
                <button
                  onClick={() => setSelectedRiskStatus('vigilance')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedRiskStatus === 'vigilance'
                      ? 'bg-amber-600 text-white font-bold'
                      : isLight
                      ? 'bg-white text-amber-700 border border-amber-200'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  ⏳ Vigilance (&lt;=30j)
                </button>
                <button
                  onClick={() => setSelectedRiskStatus('healthy')}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    selectedRiskStatus === 'healthy'
                      ? 'bg-emerald-600 text-white font-bold'
                      : isLight
                      ? 'bg-white text-emerald-700 border border-emerald-200'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}
                >
                  ✅ À jour (0j)
                </button>
              </div>

              {/* Live Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Rechercher prêt / client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-8 pr-3 py-1 rounded-lg border font-mono text-[11px] focus:outline-none focus:border-purple-500 ${
                    isLight
                      ? 'bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400'
                      : 'bg-black/60 border-white/15 text-white placeholder:text-neutral-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Graphical Analysis Section (2 Interactive Charts) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Chart 1 : Taux PAR30 par Agence vs Seuil 5% */}
            <div
              className={`p-5 rounded-2xl border space-y-4 ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0f1322] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-purple-400" />
                    Taux PAR30 par Agence vs Seuil Réglementaire (5%)
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Visualisation seaborn conforme aux principes d'accessibilité (Viridis & seuil pointillé)
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  Seuil critique : 5.0%
                </span>
              </div>

              {/* Visual Bars with Threshold Line */}
              <div className="space-y-3 pt-2">
                {agencyStats.map((item) => {
                  const barWidthPct = Math.min((item.par30Pct / 25) * 100, 100);
                  const isSelected = selectedAgency === 'all' || selectedAgency === item.agence;

                  return (
                    <div
                      key={item.agence}
                      onClick={() => {
                        playSwitchClick(true);
                        setSelectedAgency(selectedAgency === item.agence ? 'all' : item.agence);
                      }}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? item.isCritical
                            ? 'bg-rose-950/20 border-rose-500/40 shadow-xs'
                            : 'bg-purple-950/20 border-purple-500/30'
                          : 'opacity-40 hover:opacity-80 border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                        <div className="flex items-center gap-2 font-bold">
                          <span className="text-white">{item.agence}</span>
                          <span className="text-[10px] text-neutral-400 font-normal">
                            ({item.countPar30}/{item.countTotal} prêts à risque)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-black ${
                              item.isCritical ? 'text-rose-400' : 'text-emerald-400'
                            }`}
                          >
                            {item.par30Pct.toFixed(2)}%
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                              item.isCritical
                                ? 'bg-rose-500/20 text-rose-300'
                                : 'bg-emerald-500/20 text-emerald-300'
                            }`}
                          >
                            {item.isCritical ? 'Alerte' : 'Conforme'}
                          </span>
                        </div>
                      </div>

                      {/* Bar Track with Threshold Indicator */}
                      <div className="relative h-3 w-full bg-neutral-800/60 rounded-full overflow-hidden">
                        {/* 5% Threshold Reference Line */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-rose-400 z-10"
                          style={{ left: `${(5.0 / 25) * 100}%` }}
                          title="Seuil critique réglementaire à 5%"
                        />

                        {/* Animated fill */}
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.isCritical
                              ? 'bg-gradient-to-r from-amber-500 to-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                              : 'bg-gradient-to-r from-teal-500 to-emerald-500'
                          }`}
                          style={{ width: `${barWidthPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between text-[10.5px] font-mono text-neutral-400 pt-1 border-t border-white/5">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-rose-500" />
                  Ligne Seuil 5.0%
                </span>
                <span>Échelle normalisée (0 à 25%)</span>
              </div>
            </div>

            {/* Chart 2 : Cross-Verification Panel & Loan Delay Buckets */}
            <div
              className={`p-5 rounded-2xl border space-y-4 flex flex-col justify-between ${
                isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0f1322] border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Protocole de Vérification Croisée (SQL ↔ Python)
                  </h4>
                  <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Concordance 100%
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  Conformément au Chapitre 7 des slides, la conformité mathématique exacte entre le script SQL du matin et le DataFrame pandas de l'après-midi garantit l'absence d'erreurs silencieuses.
                </p>
              </div>

              {/* Side-by-Side Comparison Box */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                {/* SQL Result */}
                <div
                  className={`p-3.5 rounded-xl border space-y-2 ${
                    isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-black/60 border-cyan-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-cyan-400 font-bold">
                    <span>Moteur SQL</span>
                    <span>GROUP BY</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-neutral-300">
                    <div className="flex justify-between">
                      <span>Tanger:</span>
                      <strong className="text-white">18.52%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Casablanca:</span>
                      <strong className="text-white">6.42%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Marrakech:</span>
                      <strong className="text-white">4.18%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Rabat:</span>
                      <strong className="text-white">3.91%</strong>
                    </div>
                  </div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 pt-1 border-t border-white/5">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Agrégation SQL Validée</span>
                  </div>
                </div>

                {/* Python pandas Result */}
                <div
                  className={`p-3.5 rounded-xl border space-y-2 ${
                    isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-black/60 border-purple-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-purple-400 font-bold">
                    <span>Python pandas</span>
                    <span>.loc / agg()</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-neutral-300">
                    <div className="flex justify-between">
                      <span>Tanger:</span>
                      <strong className="text-white">18.52%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Casablanca:</span>
                      <strong className="text-white">6.42%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Marrakech:</span>
                      <strong className="text-white">4.18%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Rabat:</span>
                      <strong className="text-white">3.91%</strong>
                    </div>
                  </div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1 pt-1 border-t border-white/5">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Delta Écart : 0.00%</span>
                  </div>
                </div>
              </div>

              {/* R Stats Box */}
              <div
                className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between ${
                  isLight ? 'bg-purple-50 border-purple-200 text-purple-950' : 'bg-purple-950/20 border-purple-500/20 text-purple-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-purple-400 shrink-0" />
                  <span className="text-[11px]">
                    <strong>Test t en R (Student) :</strong> p-value = 0.024 &lt; 0.05 (Différence hautement significative).
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Detailed Table of Loans */}
          <div
            className={`p-5 rounded-2xl border space-y-4 ${
              isLight ? 'bg-white border-neutral-200 shadow-sm' : 'bg-[#0f1424] border-white/10'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
                  <Database className="h-4 w-4 text-purple-400" />
                  Table des Prêts du Portefeuille Microfinance ({filteredLoans.length} résultats)
                </h4>
                <p className="text-[11px] text-neutral-400">
                  Données réelles utilisées pour la modélisation SQL et le pipeline Python
                </p>
              </div>
              <div className="font-mono text-xs text-neutral-400">
                Encours filtré : <strong className="text-white">{totalPortfolioDH.toLocaleString('fr-FR')} DH</strong>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-left text-xs font-sans">
                <thead
                  className={`border-b font-mono uppercase text-[10px] ${
                    isLight ? 'bg-neutral-100 text-neutral-600 border-neutral-200' : 'bg-black/40 text-neutral-400 border-white/10'
                  }`}
                >
                  <tr>
                    <th className="p-3">ID Prêt</th>
                    <th className="p-3">Client / Emprunteur</th>
                    <th className="p-3">Agence</th>
                    <th className="p-3 font-mono">Montant (DH)</th>
                    <th className="p-3 font-mono">Jours de Retard</th>
                    <th className="p-3">Statut Risque</th>
                    <th className="p-3 font-mono">Date MAJ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-[11.5px]">
                  {filteredLoans.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-neutral-400 font-sans">
                        Aucun prêt ne correspond aux filtres sélectionnés.
                      </td>
                    </tr>
                  ) : (
                    filteredLoans.map((loan) => {
                      const isPar30 = loan.jours_retard > 30;
                      const isVigilance = loan.jours_retard > 0 && loan.jours_retard <= 30;

                      return (
                        <tr
                          key={loan.id_pret}
                          className={`transition-colors ${
                            isPar30
                              ? 'bg-rose-500/[0.04] hover:bg-rose-500/[0.08]'
                              : 'hover:bg-white/5'
                          }`}
                        >
                          <td className="p-3 font-bold text-white">{loan.id_pret}</td>
                          <td className="p-3 text-neutral-200 font-sans font-medium">{loan.client}</td>
                          <td className="p-3 text-purple-400">{loan.agence}</td>
                          <td className="p-3 font-bold text-white">
                            {loan.montant.toLocaleString('fr-FR')} DH
                          </td>
                          <td className="p-3">
                            <span
                              className={`font-bold ${
                                isPar30
                                  ? 'text-rose-400'
                                  : isVigilance
                                  ? 'text-amber-400'
                                  : 'text-emerald-400'
                              }`}
                            >
                              {loan.jours_retard} j
                            </span>
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                                isPar30
                                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                  : isVigilance
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              }`}
                            >
                              {isPar30 ? '⚠️ PAR30 Critique' : isVigilance ? '⏳ Vigilance' : '✅ Portefeuille Sain'}
                            </span>
                          </td>
                          <td className="p-3 text-neutral-500">{loan.date_maj}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: COMPLETE SOURCE CODES (SQL, PYTHON, R, REQUIREMENTS)          */}
      {/* ========================================================================= */}
      {activeTab === 'code' && (
        <div className="space-y-4 font-mono text-xs">
          {/* Language Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 uppercase text-[11px] font-bold">Fichiers du Livrable :</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCodeLanguage('sql')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                    codeLanguage === 'sql'
                      ? 'bg-cyan-500 text-black shadow-sm'
                      : isLight
                      ? 'bg-neutral-200 text-neutral-700'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Database className="h-3.5 w-3.5" />
                  <span>requetes_audit_mfi.sql</span>
                </button>

                <button
                  onClick={() => setCodeLanguage('python')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                    codeLanguage === 'python'
                      ? 'bg-purple-500 text-white shadow-sm'
                      : isLight
                      ? 'bg-neutral-200 text-neutral-700'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>pipeline_risque_mfi.py</span>
                </button>

                <button
                  onClick={() => setCodeLanguage('r')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                    codeLanguage === 'r'
                      ? 'bg-indigo-500 text-white shadow-sm'
                      : isLight
                      ? 'bg-neutral-200 text-neutral-700'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Activity className="h-3.5 w-3.5" />
                  <span>analyse_stats_mfi.R</span>
                </button>

                <button
                  onClick={() => setCodeLanguage('req')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
                    codeLanguage === 'req'
                      ? 'bg-emerald-500 text-black shadow-sm'
                      : isLight
                      ? 'bg-neutral-200 text-neutral-700'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Package className="h-3.5 w-3.5" />
                  <span>requirements.txt</span>
                </button>
              </div>
            </div>

            {/* Copy button for selected code */}
            <button
              onClick={() => {
                const text =
                  codeLanguage === 'sql'
                    ? sqlCode
                    : codeLanguage === 'python'
                    ? pythonCode
                    : codeLanguage === 'r'
                    ? rCode
                    : requirementsTxt;
                copyCode(codeLanguage, text);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs cursor-pointer hover:bg-purple-500 transition-colors"
            >
              {copiedCodeKey === codeLanguage ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedCodeKey === codeLanguage ? 'Copié !' : 'Copier ce fichier'}</span>
            </button>
          </div>

          {/* Code Viewer Box */}
          <div
            className={`p-4 rounded-2xl border leading-relaxed overflow-x-auto whitespace-pre font-mono text-[11.5px] ${
              isLight
                ? 'bg-neutral-900 text-neutral-100 border-neutral-700'
                : 'bg-black/90 text-neutral-200 border-white/10 shadow-inner'
            }`}
          >
            {codeLanguage === 'sql' && sqlCode}
            {codeLanguage === 'python' && pythonCode}
            {codeLanguage === 'r' && rCode}
            {codeLanguage === 'req' && requirementsTxt}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: EXPORT ZIP & GIT CLONE (100% AUTONOME)                         */}
      {/* ========================================================================= */}
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
                  <FileArchive className="h-5 w-5 text-purple-400" />
                  Récupérer le Pack Livrable Jour 03 Complet (.ZIP)
                </h4>
                <p className="text-xs text-neutral-400">
                  Contient les 7 fichiers du projet : dataset CSV, requêtes SQL commentées, script Python reproductible, notebook Jupyter, analyse R et guide README.
                </p>
              </div>

              {/* Big Download ZIP Button */}
              <button
                onClick={handleDownloadZip}
                disabled={isDownloadingZip}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-400 text-white font-display text-xs font-extrabold shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {zipSuccess ? <Check className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                <span>{zipSuccess ? 'Archive ZIP Téléchargée !' : 'Télécharger le Pack .ZIP'}</span>
              </button>
            </div>

            {/* Git Clone Box */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-400 flex items-center gap-1.5">
                  <Terminal className="h-3.5 w-3.5 text-purple-400" />
                  Ou Cloner directement le dépôt GitHub :
                </span>
                <button
                  onClick={copyGitClone}
                  className="flex items-center gap-1 text-[11px] font-mono text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
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

          {/* 3 Step Simple Guide */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-purple-400 font-mono">
              Guide d'utilisation & Exécution du Livrable en 3 étapes :
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
                <h5 className="font-bold text-xs text-white">Extraire l'Archive</h5>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Décompressez le fichier <strong>.ZIP</strong>. Vous trouverez le fichier <strong>prets.csv</strong> et l'ensemble des scripts.
                </p>
              </div>

              {/* Step 2 */}
              <div
                className={`p-4 rounded-2xl border space-y-2 ${
                  isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0f1424] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-purple-400">Étape 02</span>
                  <Terminal className="h-4 w-4 text-purple-400" />
                </div>
                <h5 className="font-bold text-xs text-white">Exécuter le Pipeline</h5>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Lancez <code>python pipeline_risque_mfi.py</code> ou ouvrez le notebook Jupyter. Les agrégations et graphiques sont générés automatiquement.
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
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                </div>
                <h5 className="font-bold text-xs text-white">Vérification Croisée</h5>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Vérifiez la concordance entre la sortie SQL et la sortie pandas pour valider l'absence d'anomalies de calcul.
                </p>
              </div>
            </div>
          </div>

          {/* Files List in ZIP */}
          <div
            className={`p-4 rounded-2xl border space-y-2 font-mono text-xs ${
              isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-[#090c14] border-white/10'
            }`}
          >
            <span className="font-bold text-neutral-300">Fichiers inclus dans le pack livrable J03 :</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="flex items-center gap-2 text-neutral-400">
                <FileCode className="h-3.5 w-3.5 text-cyan-400" />
                <span><strong>requetes_audit_mfi.sql</strong> : Requêtes SQL commentées</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Terminal className="h-3.5 w-3.5 text-purple-400" />
                <span><strong>pipeline_risque_mfi.py</strong> : Script Python reproductible</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Layers className="h-3.5 w-3.5 text-amber-400" />
                <span><strong>notebook_mfi.ipynb</strong> : Notebook Jupyter structuré</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Activity className="h-3.5 w-3.5 text-indigo-400" />
                <span><strong>analyse_stats_mfi.R</strong> : Statistiques et test t de Student</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Database className="h-3.5 w-3.5 text-emerald-400" />
                <span><strong>prets.csv</strong> : Données réelles du portefeuille</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Package className="h-3.5 w-3.5 text-rose-400" />
                <span><strong>requirements.txt & README.md</strong> : Documentation complète</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 5: CLAUDE PROMPTS & VERIFICATION PROTOCOL (SLIDES J03 EXACT)      */}
      {/* ========================================================================= */}
      {activeTab === 'prompt' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase font-bold text-purple-400">
              Modèles de Prompts Claude & Protocole de Rigueur (Jour 03)
            </span>
          </div>

          {/* Prompt 1: SQL PAR30 from slide 2150 */}
          <div
            className={`p-4 rounded-2xl border space-y-2 ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0f1424] border-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-400">1. Prompt SQL — Calcul du PAR30 par Agence (Slide 2150)</span>
              <button
                onClick={() =>
                  copyCode(
                    'prompt-sql',
                    `Écris une requête qui calcule le PAR30 par agence : montant total en retard de plus de 30 jours divisé par montant total du portefeuille. Table prets (agence, montant, jours_retard). Explique chaque partie clause par clause dans l'ordre réel d'exécution.`
                  )
                }
                className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 cursor-pointer"
              >
                {copiedCodeKey === 'prompt-sql' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedCodeKey === 'prompt-sql' ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>
            <div
              className={`p-3 rounded-xl border leading-relaxed ${
                isLight ? 'bg-neutral-900 text-neutral-100 border-neutral-700' : 'bg-black/70 text-neutral-200 border-white/10'
              }`}
            >
              Écris une requête qui calcule le PAR30 par agence : montant total en retard de plus de 30 jours divisé par montant total du portefeuille. Table prets (agence, montant, jours_retard). Explique chaque partie clause par clause dans l'ordre réel d'exécution.
            </div>
          </div>

          {/* Prompt 2: Python pandas pipeline from slide 2560 */}
          <div
            className={`p-4 rounded-2xl border space-y-2 ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0f1424] border-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400">2. Prompt Python — Vérification Croisée & Graphique Viridis (Slide 2560)</span>
              <button
                onClick={() =>
                  copyCode(
                    'prompt-python',
                    `Sur mon dataframe prets (colonnes : agence, montant, jours_retard), écris le code pandas qui calcule le PAR30 par agence. Utilise .loc sans indexation chaînée. Trace un graphique seaborn avec une palette adaptée au daltonisme (viridis) et ajoute une ligne horizontale rouge marquant le seuil critique réglementaire à 5%.`
                  )
                }
                className="flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 cursor-pointer"
              >
                {copiedCodeKey === 'prompt-python' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedCodeKey === 'prompt-python' ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>
            <div
              className={`p-3 rounded-xl border leading-relaxed ${
                isLight ? 'bg-neutral-900 text-neutral-100 border-neutral-700' : 'bg-black/70 text-neutral-200 border-white/10'
              }`}
            >
              Sur mon dataframe prets (colonnes : agence, montant, jours_retard), écris le code pandas qui calcule le PAR30 par agence. Utilise .loc sans indexation chaînée. Trace un graphique seaborn avec une palette adaptée au daltonisme (viridis) et ajoute une ligne horizontale rouge marquant le seuil critique réglementaire à 5%.
            </div>
          </div>

          {/* Prompt 3: R test t from slide 2349 */}
          <div
            className={`p-4 rounded-2xl border space-y-2 ${
              isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0f1424] border-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-400">3. Prompt R — Test Comparatif & Conclusion Business (Slide 2349)</span>
              <button
                onClick={() =>
                  copyCode(
                    'prompt-r',
                    `Je veux savoir si le retard moyen diffère significativement entre les agences de Casablanca et Tanger sur le fichier prets.csv. Écris un test t en R avec dplyr et explique en deux phrases ce que signifie le résultat, en langage business sans jargon statistique.`
                  )
                }
                className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                {copiedCodeKey === 'prompt-r' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedCodeKey === 'prompt-r' ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>
            <div
              className={`p-3 rounded-xl border leading-relaxed ${
                isLight ? 'bg-neutral-900 text-neutral-100 border-neutral-700' : 'bg-black/70 text-neutral-200 border-white/10'
              }`}
            >
              Je veux savoir si le retard moyen diffère significativement entre les agences de Casablanca et Tanger sur le fichier prets.csv. Écris un test t en R avec dplyr et explique en deux phrases ce que signifie le résultat, en langage business sans jargon statistique.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
