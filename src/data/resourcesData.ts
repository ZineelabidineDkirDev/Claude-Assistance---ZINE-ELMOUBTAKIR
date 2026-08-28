export interface ResourceItem {
  title: string;
  url: string;
  description: string;
  license: string;
}

export interface ResourceCategory {
  name: string;
  items: ResourceItem[];
}

export interface ResourcesData {
  driveUrl: string;
  driveBadge: string;
  driveTitle: string;
  driveDescription: string;
  categories: ResourceCategory[];
}

export const RESOURCES_DATA: ResourcesData = {
  "driveUrl": "https://drive.google.com/drive/folders/18--EI7VCqUymzEVV3Okb2_U4fy3z38gL?usp=drive_link",
  "driveBadge": "Datasets & Ressources Formation",
  "driveTitle": "Dossier Google Drive — Datasets Économie Marocaine & Exercices",
  "driveDescription": "Retrouvez tous les jeux de données d'exercices (Excel, scripts SQL Server & MySQL, scripts Python/Pandas orientés économie marocaine, modèles Power BI) mis à jour pour la formation.",
  "categories": [
    {
      "name": "Power BI & Modélisation",
      "items": [
        {
          "title": "Échantillons Power BI officiels Microsoft",
          "url": "https://learn.microsoft.com/power-bi/create-reports/sample-datasets",
          "description": "Financial Sample, Retail Analysis, Human Resources — fichiers .pbix et .xlsx prêts à l'emploi pour s'exercer au Jour 2.",
          "license": "Usage interne libre, attribution « obviEnce © » requise (texte officiel Microsoft)"
        }
      ]
    },
    {
      "name": "Bases de Données SQL (SQL Server & MySQL)",
      "items": [
        {
          "title": "AdventureWorks — Base de données Microsoft SQL Server",
          "url": "https://github.com/microsoft/sql-server-samples/tree/master/samples/databases/adventure-works",
          "description": "Base relationnelle d'entreprise complète (ventes, production, achats, clients, RH) pour SQL Server. Standard mondial pour s'entraîner aux requêtes analytiques, CTE, fenêtrages et modélisations BI.",
          "license": "MIT / Licence officielle Microsoft Open Source"
        },
        {
          "title": "Northwind — Base de données MySQL & SQL",
          "url": "https://github.com/dalers/my-wind",
          "description": "Schéma relationnel de gestion commerciale (commandes, stocks, clients, fournisseurs, expéditions) adapté pour MySQL et PostgreSQL. Idéal pour la maîtrise des jointures, agrégations et calculs de KPI.",
          "license": "Open Source / Licence libre"
        }
      ]
    },
    {
      "name": "Python, Data Analysis & Économie Marocaine",
      "items": [
        {
          "title": "HCP Maroc — Données Économiques & Statistiques Officielles (BNDH)",
          "url": "https://bndh.hcp.ma/",
          "description": "Banque Nationale de Données Statistiques du Haut-Commissariat au Plan : séries chronologiques sur le PIB, inflation (IPC), emploi/chômage, démographie et comptes nationaux pour l'analyse sous Python/Pandas.",
          "license": "Open Data Officiel (Royaume du Maroc)"
        },
        {
          "title": "Data.gov.ma — Portail National des Données Ouvertes du Maroc",
          "url": "https://data.gov.ma/",
          "description": "Plateforme centrale d'open data de l'administration marocaine : jeux de données sur le commerce extérieur, transports, agriculture, météo, énergie et finances publiques.",
          "license": "Licence Ouverte Maroc (Usage libre)"
        },
        {
          "title": "Bourse de Casablanca — Données Marchés & Indice MASI",
          "url": "https://www.casablanca-bourse.com/",
          "description": "Historiques des cours de clôture, capitalisations boursières, volumes et rendements sectoriels des entreprises marocaines (Banques, Télécoms, BTP, Agro-alimentaire). Idéal pour analyses financières et visualisations temporelles.",
          "license": "Données Publiques Financières du Marché Marocain"
        },
        {
          "title": "Office des Changes du Maroc — Commerce Extérieur & Échanges",
          "url": "https://www.oc.gov.ma/fr/etudes-et-statistiques",
          "description": "Rapports statistiques et flux de données sur les exportations (automobile, phosphates, textile, agro-industrie), importations, balance commerciale et flux d'investissements.",
          "license": "Statistiques officielles publiques"
        }
      ]
    },
    {
      "name": "Prompts & Méthode IA",
      "items": [
        {
          "title": "Claude Cookbooks (Anthropic)",
          "url": "https://github.com/anthropics/claude-cookbooks",
          "description": "Exemples officiels Anthropic pour intégrer Claude dans les flux d'analyse de données, automatisation et reporting BI.",
          "license": "MIT"
        },
        {
          "title": "Bibliothèque de prompts officielle Claude",
          "url": "https://platform.claude.com/docs/en/prompt-library/library",
          "description": "Prompts prêts à l'emploi organisés par cas d'usage analytique, publiés par Anthropic.",
          "license": "Contenu officiel Anthropic"
        },
        {
          "title": "Prompt Engineering Guide (dair-ai)",
          "url": "https://github.com/dair-ai/Prompt-Engineering-Guide",
          "description": "Guide complet de prompt engineering pour structurer des requêtes analytiques rigoureuses et reproductibles.",
          "license": "MIT"
        }
      ]
    }
  ]
};

