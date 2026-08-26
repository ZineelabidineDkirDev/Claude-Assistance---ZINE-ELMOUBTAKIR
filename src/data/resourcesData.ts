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
  "driveBadge": "Ressources importantes de la formation",
  "driveTitle": "Toutes les ressources de la semaine, au même endroit",
  "driveDescription": "Retrouve tous les fichiers nécessaires — supports, exercices, modèles — dans ce dossier partagé, mis à jour au fil de la semaine.",
  "categories": [
    {
      "name": "Power BI",
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
      "name": "SQL",
      "items": [
        {
          "title": "Chinook — base de données SQL d'exemple",
          "url": "https://github.com/lerocha/chinook-database",
          "description": "Base relationnelle (artistes, albums, clients, factures) largement utilisée pour l'apprentissage des jointures SQL.",
          "license": "MIT"
        },
        {
          "title": "Sakila — base de données SQL d'exemple",
          "url": "https://dev.mysql.com/doc/sakila/en/",
          "description": "Base de location de films (MySQL), utile pour pratiquer des requêtes plus complexes et des vues.",
          "license": "New BSD (schéma et données ; la documentation associée suit une licence distincte)"
        }
      ]
    },
    {
      "name": "Python & R",
      "items": [
        {
          "title": "Palmer Penguins",
          "url": "https://allisonhorst.github.io/palmerpenguins/",
          "description": "Jeu de données R/Python compact, parfait pour une première analyse descriptive et des visualisations simples.",
          "license": "CC0"
        },
        {
          "title": "Gapminder",
          "url": "https://www.gapminder.org/data/",
          "description": "Données socio-économiques par pays et par année — bon support pour des visualisations d'évolution temporelle.",
          "license": "CC0 (package R) — vérifier la mention de licence propre au jeu de données téléchargé"
        },
        {
          "title": "UCI Machine Learning Repository",
          "url": "https://archive.ics.uci.edu",
          "description": "Des centaines de jeux de données tabulaires réels (santé, commerce, énergie) avec licences précisées par dataset.",
          "license": "Licence par dataset (généralement CC-BY 4.0)"
        }
      ]
    },
    {
      "name": "Prompts & méthode",
      "items": [
        {
          "title": "Claude Cookbooks",
          "url": "https://github.com/anthropics/claude-cookbooks",
          "description": "Exemples officiels Anthropic pour construire avec Claude — utile pour aller plus loin après la formation.",
          "license": "MIT"
        },
        {
          "title": "Bibliothèque de prompts officielle Claude",
          "url": "https://platform.claude.com/docs/en/prompt-library/library",
          "description": "Prompts prêts à l'emploi organisés par cas d'usage, publiés par Anthropic.",
          "license": "Contenu du site officiel Anthropic"
        },
        {
          "title": "Prompt Engineering Guide (dair-ai)",
          "url": "https://github.com/dair-ai/Prompt-Engineering-Guide",
          "description": "Guide généraliste de prompt engineering, complémentaire à la méthode Claude enseignée en formation.",
          "license": "MIT"
        }
      ]
    }
  ]
};
