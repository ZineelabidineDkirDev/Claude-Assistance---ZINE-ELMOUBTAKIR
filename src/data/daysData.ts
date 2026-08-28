import { Day } from "../types";

export const DAYS_DATA: Day[] = [
  {
    "day": 1,
    "title": "Chapitre 1. (Modifié) : Découverte complète de l'écosystème Claude",
    "date": "2026-07-13",
    "objective": "Faire le tour complet de l'écosystème Claude, comprendre pourquoi il est pertinent pour la data, et publier un premier dashboard en ligne avant la fin de la session.",
    "deliverables": [
      "Lien vers ton repository GitHub contenant les fichiers du dashboard",
      "Lien Github fonctionnel, le dashboard déployé et accessible en ligne",
      "Une trace de personnalisation qui montre que c'est le tien"
    ],
    "chapters": [
      {
        "title": "Ouverture",
        "minutes": 3,
        "firstSlideId": "cover"
      },
      {
        "title": "Ton formateur cette semaine",
        "minutes": 3,
        "firstSlideId": "formateur"
      },
      {
        "title": "Le programme de la semaine",
        "minutes": 3,
        "firstSlideId": "programme"
      },
      {
        "title": "Chapitre 1 — Claude & Anthropic",
        "minutes": 8,
        "firstSlideId": "claude-anthropic"
      },
      {
        "title": "Chapitre 2 — Pourquoi Claude pour la data",
        "minutes": 8,
        "firstSlideId": "pourquoi-claude-data"
      },
      {
        "title": "Chapitre 3 — L'écosystème Claude",
        "minutes": 8,
        "firstSlideId": "ecosysteme"
      },
      {
        "title": "Chapitre 4 — Où accéder à Claude",
        "minutes": 5,
        "firstSlideId": "ou-acceder"
      },
      {
        "title": "Chapitre 5 — Accès selon les pays",
        "minutes": 4,
        "firstSlideId": "acces-pays"
      },
      {
        "title": "Chapitre 6 — Sécurité et confidentialité des données",
        "minutes": 10,
        "firstSlideId": "securite-confidentialite-intro"
      },
      {
        "title": "Chapitre 7 — Le workflow, avant et après Claude",
        "minutes": 15,
        "firstSlideId": "workflow-manuel"
      },
      {
        "title": "Chapitre 8 — Construire ton dashboard (démo live)",
        "minutes": 20,
        "firstSlideId": "dashboard-demo"
      },
      {
        "title": "Chapitre 9 — Agents & MCP",
        "minutes": 6,
        "firstSlideId": "agents-mcp"
      },
      {
        "title": "Chapitre 10 — Vérifier une réponse de Claude",
        "minutes": 10,
        "firstSlideId": "verifier-reponse-ia"
      },
      {
        "title": "Chapitre 11 — Publier ton travail en ligne",
        "minutes": 8,
        "firstSlideId": "publication"
      },
      {
        "title": "Livrables du jour",
        "minutes": 3,
        "firstSlideId": "livrables"
      },
      {
        "title": "Clôture",
        "minutes": 2,
        "firstSlideId": "cloture"
      }
    ],
    "slides": [
      {
        "id": "cover",
        "type": "cover",
        "eyebrow": "Jour 01 · Zayn4Data",
        "title": [
          "Découverte complète de",
          "l'écosystème Claude"
        ],
        "highlight": "l'écosystème Claude",
        "subtitle": "Aujourd'hui, on fait le tour du propriétaire. À la fin de cette vidéo, tu auras un dashboard en ligne, avec un vrai lien à partager.",
        "meta": "MAÎTRISEZ L'ANALYSE DES DONNÉES AVEC CLAUDE · 13 JUILLET 2026",
        "metaHighlight": "13 JUILLET 2026",
        "presenterNotes": "Accueil. Annoncer la promesse concrète de la session : un dashboard publié en ligne, avec un lien réel à partager, avant la fin de la vidéo."
      },
      {
        "id": "formateur",
        "type": "speaker-intro",
        "eyebrow": "Ton formateur cette semaine",
        "name": "Zine El Abidine Dkir",
        "bio": "Data Analyst & Consultant BI. Expert en Business Intelligence, SQL, Power BI, Python et intégration de l'IA (Claude) dans les flux d'analyse de données d'entreprise. Accompagne professionnels et organisations vers la maîtrise décisionnelle.",
        "stats": [
          {
            "value": "Data & BI",
            "label": "EXPERTISE ANALYTIQUE"
          },
          {
            "value": "5 JOURS",
            "label": "ACCOMPAGNEMENT INTENSIF"
          },
          {
            "value": "100% PRATIQUE",
            "label": "CAS RÉELS & PROJETS"
          }
        ],
        "photoPlaceholder": "Zine El Abidine Dkir · Data Analyst BI",
        "presenterNotes": "Se présenter brièvement : parcours en Data & Business Intelligence, compétences clés et objectifs d'excellence pour cette semaine de formation."
      },
      {
        "id": "programme",
        "type": "day-map",
        "eyebrow": "Notre semaine ensemble",
        "title": "Le programme complet",
        "activeDay": 1,
        "days": [
          {
            "num": "01",
            "title": "Découverte de l'écosystème Claude",
            "subtitle": "Aujourd'hui — dashboard publié en ligne"
          },
          {
            "num": "02",
            "title": "Excel & Power BI boostés par Claude",
            "subtitle": "2 projets portfolio"
          },
          {
            "num": "03",
            "title": "Coding : SQL, Python, R",
            "subtitle": "1 projet transversal"
          },
          {
            "num": "04",
            "title": "Portfolio complet + stratégie carrière",
            "subtitle": "Site en ligne + plan 90 jours"
          },
          {
            "num": "05",
            "title": "Présentation & lancement",
            "subtitle": "Ton plan des 90 jours démarre"
          }
        ],
        "presenterNotes": "Donner la vue d'ensemble des 5 jours pour situer la session du jour dans le parcours complet."
      },
      {
        "id": "claude-anthropic",
        "type": "agent-boxes",
        "eyebrow": "Chapitre 1",
        "title": "C'est quoi Claude, et qui est Anthropic",
        "boxes": [
          {
            "badge": "RAPIDE",
            "title": "Haiku",
            "detail": "Rapide et léger. Tâches simples et répétitives."
          },
          {
            "badge": "ÉQUILIBRE",
            "title": "Sonnet",
            "detail": "L'équilibre parfait. Ton modèle par défaut cette semaine.",
            "highlight": true
          },
          {
            "badge": "PUISSANT",
            "title": "Opus",
            "detail": "Puissant. Pour le raisonnement complexe."
          },
          {
            "badge": "AVANCÉ",
            "title": "Mythos",
            "detail": "Le palier le plus avancé. Pour plus tard."
          }
        ],
        "presenterNotes": "Anthropic est obsédée par la sécurité et la fiabilité de l'IA depuis le premier jour — ça se traduit directement dans la façon dont Claude répond. Présenter les 4 paliers de modèles ; insister sur Sonnet comme modèle par défaut de la semaine."
      },
      {
        "id": "pourquoi-claude-data",
        "type": "comparison",
        "eyebrow": "Chapitre 2",
        "title": "Pourquoi Claude, spécifiquement pour la data",
        "columns": [
          {
            "label": "Un outil générique",
            "items": [
              "Bon pour discuter",
              "Perd le fil sur les longs fichiers",
              "Résultat, sans la méthode"
            ]
          },
          {
            "label": "Claude, pour la data",
            "items": [
              "Grande fenêtre de contexte",
              "Code rigoureux, expliqué",
              "Traduit le technique en langage business"
            ],
            "winner": true
          }
        ],
        "presenterNotes": "Contraster un usage générique d'un chatbot avec ce que Claude apporte spécifiquement à un analyste : contexte, rigueur, traduction business."
      },
      {
        "id": "ecosysteme",
        "type": "ecosystem-grid",
        "eyebrow": "Chapitre 3",
        "title": "L'écosystème Claude, le tour complet",
        "items": [
          {
            "icon": "chat",
            "title": "Chat",
            "detail": "Discuter, analyser"
          },
          {
            "icon": "code",
            "title": "Code",
            "detail": "Terminal, dev"
          },
          {
            "icon": "cowork",
            "title": "Cowork",
            "detail": "Travail collaboratif"
          },
          {
            "icon": "apps",
            "title": "Excel / PPT",
            "detail": "Intégré aux apps"
          },
          {
            "icon": "artifacts",
            "title": "Artifacts",
            "detail": "Docs, dashboards"
          },
          {
            "icon": "projects",
            "title": "Projects",
            "detail": "Contexte regroupé"
          },
          {
            "icon": "skills",
            "title": "Skills",
            "detail": "Méthodes réutilisables"
          },
          {
            "icon": "api",
            "title": "API",
            "detail": "Pour les développeurs"
          }
        ],
        "presenterNotes": "Tour du propriétaire complet : chaque brique de l'écosystème et à quoi elle sert concrètement pour un data analyst."
      },
      {
        "id": "ou-acceder",
        "type": "decision-table",
        "eyebrow": "Chapitre 4",
        "title": "Où accéder à Claude, selon ce que tu fais",
        "rows": [
          {
            "want": "Discuter, analyser un fichier, générer un dashboard",
            "tool": "Navigateur"
          },
          {
            "want": "Automatiser des tâches de code répétitives",
            "tool": "Terminal / Claude Code"
          },
          {
            "want": "Travailler directement dans Excel",
            "tool": "Claude in Excel"
          },
          {
            "want": "Interagir plus profondément avec ton ordinateur",
            "tool": "App Desktop"
          }
        ],
        "presenterNotes": "Aider à choisir la bonne porte d'entrée selon la tâche du moment — pas besoin de tout utiliser en même temps."
      },
      {
        "id": "acces-pays",
        "type": "principle-list",
        "eyebrow": "Chapitre 5",
        "title": "Un mot rapide sur l'accès selon les pays",
        "lead": "Claude n'est pas disponible partout — une question réglementaire, pas technique. La grande majorité des pays d'Afrique francophone sont couverts.",
        "items": [
          {
            "num": "01",
            "title": "Vérifie la liste officielle avant toute chose",
            "detail": "support.claude.com — la liste évolue régulièrement"
          },
          {
            "num": "02",
            "title": "Pas de solution de contournement risquée",
            "detail": "Si tu es bloqué, viens en parler dans le groupe, on regarde ton cas"
          }
        ],
        "presenterNotes": "Rassurer sur la couverture géographique tout en étant honnête sur les limites — rediriger vers le groupe en cas de blocage plutôt que vers des contournements."
      },
      {
        "id": "securite-confidentialite-intro",
        "type": "principle-list",
        "eyebrow": "Chapitre 6",
        "title": "Avant de coller quoi que ce soit dans Claude",
        "lead": "La loi de protection des données de ton pays s'applique aussi quand tu utilises une IA — ce n'est pas un vide juridique.",
        "items": [
          {
            "num": "01",
            "title": "Ce n'est pas propre à un pays",
            "detail": "La grande majorité des pays d'Afrique francophone ont aujourd'hui une loi et une autorité dédiées."
          },
          {
            "num": "02",
            "title": "La responsabilité reste la tienne",
            "detail": "Même si Claude est un outil sûr, c'est toi qui décides quelles données tu lui montres."
          }
        ],
        "presenterNotes": "Poser le principe avant le détail juridique — l'idée que la loi s'applique aussi à l'usage d'une IA surprend souvent une partie du public."
      },
      {
        "id": "lois-protection-donnees-afrique",
        "type": "data-table",
        "eyebrow": "Chapitre 6",
        "title": "Repères juridiques et protection des données",
        "lead": "Cadres légaux de référence pour le traitement des données et la conformité.",
        "columns": [
          "Pays / Région",
          "Loi",
          "Autorité",
          "Sanction maximale"
        ],
        "rows": [
          {
            "cells": [
              "Maroc 🇲🇦",
              "Loi n° 09-08",
              "CNDP",
              "300 000 MAD + sanctions pénales"
            ],
            "critical": true
          },
          {
            "cells": [
              "Union Européenne 🇪🇺",
              "RGPD (GDPR)",
              "CNIL / EDPB",
              "20M € ou 4% du CA mondial"
            ],
            "critical": false
          },
          {
            "cells": [
              "Sénégal 🇸🇳",
              "Loi n° 2008-12",
              "CDP",
              "100M FCFA + peines pénales"
            ],
            "critical": false
          },
          {
            "cells": [
              "Côte d'Ivoire 🇨🇮",
              "Loi n° 2013-450",
              "ARTCI",
              "500M FCFA (récidive)"
            ],
            "critical": false
          }
        ],
        "presenterNotes": "Mettre l'accent sur la Loi 09-08 au Maroc (CNDP) et le RGPD : tout transfert de données nominatives vers des serveurs tiers ou des LLM sans accord/anonymisation préalable est sanctionné."
      },
      {
        "id": "anonymiser-avant-upload",
        "type": "principle-list",
        "eyebrow": "Chapitre 6",
        "title": "Le réflexe : anonymiser avant d'envoyer",
        "items": [
          {
            "num": "01",
            "title": "Retire les identifiants directs",
            "detail": "Noms, numéros de téléphone, numéros de pièce d'identité — remplace-les par un identifiant neutre."
          },
          {
            "num": "02",
            "title": "Garde une table de correspondance à part",
            "detail": "En dehors de la conversation avec Claude, pour pouvoir retrouver qui est qui si besoin plus tard."
          }
        ],
        "presenterNotes": "Ce réflexe sera rappelé brièvement chaque fois qu'un vrai fichier terrain sera manipulé dans la semaine — l'objectif est qu'il devienne automatique."
      },
      {
        "id": "exemple-anonymisation",
        "type": "before-after",
        "eyebrow": "Chapitre 6",
        "title": "Le fichier du centre de santé, anonymisé",
        "before": {
          "label": "AVANT",
          "rows": [
            "Mukamba Alice ; 0991234567 ; stock centre 1",
            "Kabila Jean ; 0997654321 ; stock centre 2"
          ]
        },
        "after": {
          "label": "APRÈS",
          "rows": [
            {
              "primary": "Agent-A1 · Centre 1",
              "secondary": "stock"
            },
            {
              "primary": "Agent-A2 · Centre 2",
              "secondary": "stock"
            }
          ]
        },
        "presenterNotes": "Réutiliser volontairement l'exemple du centre de santé déjà présenté plus tôt — montrer que l'anonymisation s'applique au même cas plutôt qu'à un exemple abstrait supplémentaire."
      },
      {
        "id": "workflow-manuel",
        "type": "workflow-flow",
        "eyebrow": "Chapitre 7 — Le cœur de la journée",
        "title": "Le workflow manuel traditionnel",
        "nodes": [
          {
            "icon": "search",
            "label": "Repérer",
            "detail": "les incohérences"
          },
          {
            "icon": "wipe",
            "label": "Nettoyer",
            "detail": "à la main, ligne par ligne"
          },
          {
            "icon": "table",
            "label": "TCD",
            "detail": "tableau croisé"
          },
          {
            "icon": "chart-bar",
            "label": "Graphique",
            "detail": "en espérant que ça marche"
          },
          {
            "icon": "clock",
            "label": "3-4 heures",
            "detail": "de travail manuel",
            "highlight": true
          }
        ],
        "presenterNotes": "Poser le problème avant la solution : le chemin manuel classique, long et fragile, qui sert de point de comparaison pour la suite."
      },
      {
        "id": "nettoyage-avant-apres",
        "type": "before-after",
        "eyebrow": "Chapitre 6 — Même fichier, avec Claude",
        "title": "Nettoyage en quelques secondes",
        "before": {
          "label": "AVANT",
          "rows": [
            "centre_1 ; MARS ; stok_debut",
            "Centre 2 ; 03/2026 ; 140",
            "CENTRE-2 ; mars ; N/A",
            "centre2 ;  ; 140"
          ]
        },
        "after": {
          "label": "APRÈS",
          "rows": [
            {
              "primary": "Centre 1 · Mars 2026",
              "secondary": "128 unités"
            },
            {
              "primary": "Centre 2 · Mars 2026",
              "secondary": "140 unités"
            },
            {
              "primary": "Centre 3 · Mars 2026",
              "secondary": "96 unités"
            },
            {
              "primary": "Centre 4 · Mars 2026",
              "secondary": "112 unités"
            }
          ]
        },
        "presenterNotes": "Montrer en direct le même fichier sale, nettoyé par Claude en quelques secondes — c'est l'élément de bascule émotionnelle de la session."
      },
      {
        "id": "dashboard-demo",
        "type": "code-card",
        "eyebrow": "Chapitre 8",
        "title": "Construire et personnaliser ton dashboard",
        "filename": "prompt_personnalisation.txt",
        "code": "\"J'aimerais que le dashboard utilise <k>ces couleurs</k> : <v>[tes couleurs]</v>. Peux-tu adapter le design en gardant la même structure ?\"",
        "previewLabel": "→ aperçu du dashboard généré par Claude, à l'écran en direct",
        "presenterNotes": "Slide de repère uniquement — la démo du dashboard se fait à l'écran en direct, pas sur cette diapositive. Montrer comment personnaliser via un prompt simple."
      },
      {
        "id": "agents-mcp",
        "type": "agent-boxes",
        "eyebrow": "Chapitre 9",
        "title": "Agents et MCP — deux notions à connaître",
        "boxes": [
          {
            "badge": "AGENT",
            "title": "Claude qui travaille pour toi",
            "detail": "Tu donnes un objectif, Claude exécute plusieurs étapes seul — sans que tu guides chaque instant."
          },
          {
            "badge": "MCP",
            "title": "Se connecter à tes outils",
            "detail": "Un moyen sécurisé pour Claude d'aller chercher l'info directement dans Drive, GitHub, tes bases de données."
          }
        ],
        "presenterNotes": "Deux notions à connaître sans forcément les pratiquer aujourd'hui — poser les mots pour plus tard dans la semaine."
      },
      {
        "id": "verifier-reponse-ia",
        "type": "principle-list",
        "eyebrow": "Chapitre 10",
        "title": "Ne jamais copier une réponse sans la vérifier",
        "lead": "Claude se trompe rarement sur ce type de tâche — mais \"rarement\" ne veut pas dire \"jamais\".",
        "items": [
          {
            "num": "01",
            "title": "L'esprit critique reste ton outil principal",
            "detail": "Relire, tester, comprendre — jamais accepter un résultat seulement parce qu'il est bien présenté."
          },
          {
            "num": "02",
            "title": "Une hallucination ne ressemble pas à une erreur",
            "detail": "Elle est souvent formulée avec autant d'assurance qu'une réponse juste."
          }
        ],
        "presenterNotes": "Poser le principe général avant le protocole concret de la slide suivante — insister sur le fait qu'une IA confiante n'est pas synonyme d'IA juste."
      },
      {
        "id": "protocole-verification",
        "type": "step-list",
        "eyebrow": "Chapitre 10",
        "title": "Le protocole de vérification, en 4 étapes",
        "steps": [
          {
            "title": "Vérifier sur un petit échantillon connu",
            "detail": "Recalculer à la main 2-3 lignes et comparer au résultat de Claude"
          },
          {
            "title": "Vérifier que les comptes ont un sens",
            "detail": "Un total, un nombre de lignes qui semble cohérent avec la réalité"
          },
          {
            "title": "Reposer la question à tête reposée",
            "detail": "Demander à Claude de relire et critiquer sa propre réponse"
          },
          {
            "title": "Adapter l'effort de vérification au risque",
            "detail": "Plus la décision est importante, plus la vérification doit être poussée"
          }
        ],
        "presenterNotes": "Ce protocole reviendra explicitement au Jour 3 avec le code — le poser dès maintenant permet de l'appliquer toute la semaine, pas seulement au moment du coding."
      },
      {
        "id": "exercice-reperer-erreur-ia",
        "type": "code-card",
        "eyebrow": "Chapitre 10 — Exercice",
        "title": "Repère l'erreur dans cette réponse",
        "filename": "exercice_erreur_ia.txt",
        "code": "<v>Question posée à Claude :</v> \"Combien de centres ont un taux de rupture\nsupérieur à 20% ce mois ?\"\n\n<v>Réponse de Claude :</v> \"3 centres dépassent 20% : Centre 1, Centre 3 et Centre 5.\"\n\n<k>Sur les données affichées plus tôt, seuls Centre 1 et Centre 3\ndépassaient réellement ce seuil — Centre 5 n'existe même pas dans le fichier.</k>",
        "presenterNotes": "Laisser les apprenants chercher l'erreur avant de révéler la partie en évidence — l'exercice fonctionne mieux si la réponse n'est pas donnée trop vite."
      },
      {
        "id": "publication",
        "type": "step-list",
        "eyebrow": "Chapitre 11",
        "title": "Publier ton travail en ligne",
        "steps": [
          {
            "title": "Créer un repository sur GitHub",
            "detail": "Gratuit, deux minutes, on y dépose les fichiers du dashboard"
          },
          {
            "title": "Déployer sur Github",
            "detail": "Connexion au repo GitHub, déploiement automatique"
          },
          {
            "title": "Récupérer ton lien public",
            "detail": "Un vrai site en ligne, partageable à n'importe qui"
          }
        ],
        "presenterNotes": "Dérouler les 3 étapes en direct à l'écran : GitHub puis récupération du lien. C'est le livrable central de la journée."
      },
      {
        "id": "livrables",
        "type": "deliverable-checklist",
        "eyebrow": "À soumettre avant le live",
        "title": "Livrables du Jour 01",
        "items": [
          {
            "title": "Lien vers ton repository GitHub",
            "detail": "Contenant les fichiers du dashboard"
          },
          {
            "title": "Lien Github fonctionnel",
            "detail": "Le dashboard déployé et accessible en ligne"
          },
          {
            "title": "Une trace de personnalisation",
            "detail": "Couleur, titre — quelque chose qui montre que c'est le tien"
          }
        ],
        "presenterNotes": "Rappeler clairement ce qui est attendu avant le live Teams du soir."
      },
      {
        "id": "cloture",
        "type": "cover",
        "eyebrow": "À ce soir",
        "title": [
          "Rendez-vous en",
          "live sur Teams"
        ],
        "highlight": "live sur Teams",
        "subtitle": "Questions, blocages GitHub, et découverte de vos premiers dashboards. Demain : Excel & Power BI, sérieusement boostés par Claude.",
        "meta": "ZAYN4DATA · JOUR 02 DEMAIN À LA MÊME HEURE",
        "metaHighlight": "JOUR 02 DEMAIN À LA MÊME HEURE",
        "presenterNotes": "Clôturer en rappelant le rendez-vous du soir et en teasant le contenu du Jour 2."
      }
    ]
  },
  {
    "day": 2,
    "title": "Excel & Power BI boostés par Claude",
    "date": "2026-07-14",
    "objective": "Nettoyer un dataset réel avec Claude in Excel, comprendre la modélisation Power BI, et construire un dashboard décisionnel accessible — à partir d'un cas concret de programme d'aide (transferts monétaires) suivi du début à la fin de la journée.",
    "deliverables": [
      "Fichier Excel nettoyé + tableau croisé dynamique, avec synthèse en 3 phrases",
      "Dashboard Power BI fonctionnel avec au moins 3 visuels répondant à une question centrale",
      "Slide de synthèse exécutive rédigée avec Claude, 1 page, langage business"
    ],
    "chapters": [
      {
        "title": "Ouverture",
        "minutes": 3,
        "firstSlideId": "cover"
      },
      {
        "title": "Le programme de la semaine",
        "minutes": 3,
        "firstSlideId": "programme"
      },
      {
        "title": "Concepts — comprendre & nettoyer la donnée",
        "minutes": 28,
        "firstSlideId": "pourquoi-deux-outils"
      },
      {
        "title": "Atelier — cas ONG, nettoyage Excel",
        "minutes": 22,
        "firstSlideId": "cas-ong-intro"
      },
      {
        "title": "Concepts — Power BI, modélisation & storytelling",
        "minutes": 30,
        "firstSlideId": "excel-vs-powerbi"
      },
      {
        "title": "Atelier — dashboard Power BI, suite du cas ONG",
        "minutes": 20,
        "firstSlideId": "cas-ong-modele"
      },
      {
        "title": "Résumé & livrables",
        "minutes": 5,
        "firstSlideId": "resume-jour2"
      },
      {
        "title": "Clôture",
        "minutes": 2,
        "firstSlideId": "cloture"
      }
    ],
    "slides": [
      {
        "id": "cover",
        "type": "cover",
        "eyebrow": "Jour 02 · Zayn4Data",
        "title": [
          "Excel & Power BI",
          "boostés par Claude"
        ],
        "highlight": "boostés par Claude",
        "subtitle": "Aujourd'hui, un vrai dataset sale du début à la fin : nettoyage Excel, puis dashboard Power BI. Deux livrables portfolio en une seule session.",
        "meta": "MAÎTRISEZ L'ANALYSE DES DONNÉES AVEC CLAUDE · 14 JUILLET 2026",
        "metaHighlight": "14 JUILLET 2026",
        "presenterNotes": "Rappeler la promesse concrète : à la fin de la session, un dataset nettoyé ET un dashboard publié, construits sur le même cas du début à la fin."
      },
      {
        "id": "programme",
        "type": "day-map",
        "eyebrow": "Notre semaine ensemble",
        "title": "Le programme complet",
        "activeDay": 2,
        "days": [
          {
            "num": "01",
            "title": "Découverte de l'écosystème Claude",
            "subtitle": "Dashboard publié en ligne"
          },
          {
            "num": "02",
            "title": "Excel & Power BI boostés par Claude",
            "subtitle": "2 projets portfolio"
          },
          {
            "num": "03",
            "title": "Coding : SQL, Python, R",
            "subtitle": "1 projet transversal"
          },
          {
            "num": "04",
            "title": "Portfolio complet + stratégie carrière",
            "subtitle": "Site en ligne + plan 90 jours"
          },
          {
            "num": "05",
            "title": "Présentation & lancement",
            "subtitle": "Ton plan des 90 jours démarre"
          }
        ],
        "presenterNotes": "Situer la journée dans le parcours complet — on est sur le 2e jour, le premier jour \"outils du quotidien\"."
      },
      {
        "id": "pourquoi-deux-outils",
        "type": "principle-list",
        "eyebrow": "Chapitre 1",
        "title": "Pourquoi Excel ET Power BI le même jour",
        "lead": "Ce ne sont pas deux concurrents — c'est une chaîne. Excel nettoie et structure, Power BI raconte et décide.",
        "items": [
          {
            "num": "01",
            "title": "Excel reste roi pour l'exploration rapide",
            "detail": "Ouvrir un fichier, repérer un problème, tester une formule en quelques secondes."
          },
          {
            "num": "02",
            "title": "Power BI prend le relais pour la décision",
            "detail": "Dès qu'un chiffre doit être suivi dans le temps ou partagé à plusieurs personnes."
          },
          {
            "num": "03",
            "title": "Claude accélère les deux étapes",
            "detail": "Nettoyage plus rapide dans Excel, mesures DAX expliquées en clair dans Power BI."
          }
        ],
        "presenterNotes": "Cadrer la journée : pas un choix entre les deux outils, mais une chaîne de production qu'on va suivre de bout en bout sur un seul cas."
      },
      {
        "id": "types-donnees",
        "type": "principle-list",
        "eyebrow": "Chapitre 1",
        "title": "Comprendre la donnée avant de la nettoyer",
        "lead": "Toute donnée n'a pas la même origine ni la même fiabilité — ça change la façon de la traiter.",
        "items": [
          {
            "num": "01",
            "title": "Fichiers plats (Excel, CSV)",
            "detail": "Le plus courant sur le terrain — mais aussi le plus exposé aux erreurs de saisie manuelle."
          },
          {
            "num": "02",
            "title": "Exports d'applications ou de bases de données",
            "detail": "Plus structurés, mais souvent avec des noms de colonnes techniques à traduire."
          },
          {
            "num": "03",
            "title": "Données collectées en ligne ou par formulaire",
            "detail": "Format généralement propre, mais attention aux doublons de soumission."
          },
          {
            "num": "04",
            "title": "La qualité n'est jamais garantie par la source",
            "detail": "Même un export officiel peut contenir des incohérences — on vérifie toujours."
          }
        ],
        "presenterNotes": "Poser les bases avant d'entrer dans le concret : d'où vient la donnée influence comment on la nettoie."
      },
      {
        "id": "dataset-propre",
        "type": "principle-list",
        "eyebrow": "Chapitre 1",
        "title": "À quoi ressemble un dataset \"propre\"",
        "lead": "Quatre critères simples à vérifier avant de faire confiance à un fichier.",
        "items": [
          {
            "num": "01",
            "title": "Cohérent",
            "detail": "Un même format pour une même information partout dans le fichier."
          },
          {
            "num": "02",
            "title": "Complet",
            "detail": "Pas de trous inexpliqués — ou alors clairement justifiés."
          },
          {
            "num": "03",
            "title": "Unique",
            "detail": "Chaque ligne représente une seule observation réelle, sans doublon caché."
          },
          {
            "num": "04",
            "title": "À la bonne granularité",
            "detail": "Le niveau de détail correspond à la question qu'on veut répondre."
          }
        ],
        "presenterNotes": "Donner une grille de lecture réutilisable toute la semaine, pas seulement pour Excel."
      },
      {
        "id": "pieges-excel-terrain",
        "type": "data-table",
        "eyebrow": "Chapitre 1",
        "title": "Les pièges classiques d'un fichier terrain",
        "lead": "Quatre problèmes qui reviennent presque à chaque fois — les deux premiers cassent silencieusement tes formules.",
        "columns": [
          "Ligne du fichier",
          "Problème détecté",
          "Conséquence"
        ],
        "rows": [
          {
            "cells": [
              "Agence_Casa1 · mars/région fusionnées",
              "Cellules fusionnées",
              "Impossible à trier ou filtrer correctement"
            ],
            "critical": true
          },
          {
            "cells": [
              "03/2026 saisi en texte",
              "Date stockée comme texte",
              "Trié par ordre alphabétique, pas chronologique"
            ],
            "critical": true
          },
          {
            "cells": [
              "\" Casablanca\" avec espace",
              "Espace invisible en début de cellule",
              "RECHERCHEV échoue sans message d'erreur visible"
            ],
            "critical": true
          },
          {
            "cells": [
              "MA / MAR / Maroc",
              "Trois façons d'écrire le même pays/région",
              "Un TCD compte 3 entrées au lieu d'1"
            ],
            "critical": false
          }
        ],
        "presenterNotes": "Montrer ces 4 lignes à l'écran depuis un vrai fichier si possible — l'objectif est que ça résonne comme du déjà-vu pour les apprenants."
      },
      {
        "id": "doublons-manquants",
        "type": "principle-list",
        "eyebrow": "Chapitre 1",
        "title": "Quatre familles de problèmes à repérer",
        "lead": "Presque tous les soucis de qualité rentrent dans une de ces quatre cases.",
        "items": [
          {
            "num": "01",
            "title": "Doublons",
            "detail": "Même observation saisie deux fois, parfois avec une légère variation d'orthographe."
          },
          {
            "num": "02",
            "title": "Valeurs manquantes",
            "detail": "Case vide, ou pire, remplie par un faux zéro qui fausse les moyennes."
          },
          {
            "num": "03",
            "title": "Formats incohérents",
            "detail": "Dates, nombres, unités qui changent de forme d'une ligne à l'autre."
          },
          {
            "num": "04",
            "title": "Incohérences logiques",
            "detail": "Une date de fin antérieure à la date de début, un total qui ne correspond pas au détail."
          }
        ],
        "presenterNotes": "Cette grille sert de checklist mentale avant de lancer n'importe quel nettoyage, avec ou sans IA."
      },
      {
        "id": "anonymiser-avant-upload",
        "type": "principle-list",
        "eyebrow": "Rappel sécurité",
        "title": "Avant de coller ce fichier dans Claude",
        "lead": "On l'a vu au Jour 1 — ça vaut particulièrement pour un vrai fichier terrain avec des noms de personnes.",
        "items": [
          {
            "num": "01",
            "title": "Retire les identifiants directs",
            "detail": "Noms, numéros de téléphone, numéros de pièce d'identité — remplace par un ID anonyme."
          },
          {
            "num": "02",
            "title": "Garde une table de correspondance à part",
            "detail": "Hors de la conversation avec Claude, pour pouvoir retrouver qui est qui plus tard si besoin."
          }
        ],
        "presenterNotes": "Rappel court et concret juste avant de manipuler un vrai dataset avec des données personnelles — pas une nouvelle leçon, juste un réflexe qu'on active."
      },
      {
        "id": "nettoyer-avec-claude",
        "type": "code-card",
        "eyebrow": "Chapitre 1",
        "title": "Le prompt de nettoyage type",
        "filename": "prompt_nettoyage_excel.txt",
        "code": "Tu es un <k>data analyst senior</k>.\nVoici un extrait de mon fichier (colonnes : <v>centre, date, region, montant</v>).\n\n1. Identifie les doublons, valeurs manquantes et formats incohérents.\n2. Propose une version corrigée, colonne par colonne.\n3. Explique chaque correction en une phrase, sans jargon technique.\n\nRéponds en français, dans un tableau clair.",
        "presenterNotes": "Ce prompt sert de trame réutilisable toute la journée — insister sur la demande d'explication, pas juste le résultat."
      },
      {
        "id": "avant-apres-terrain",
        "type": "before-after",
        "eyebrow": "Chapitre 1",
        "title": "Le même fichier, avant et après",
        "before": {
          "label": "AVANT",
          "rows": [
            "agence_1 ; 03/2026 ; casablanca ; 45000",
            "Agence 1 ;  mars ; CASABLANCA ; 45 000",
            "AGENCE-1 ; 2026-03 ; Casablanca ; N/A"
          ]
        },
        "after": {
          "label": "APRÈS",
          "rows": [
            {
              "primary": "Agence 1 · Mars 2026",
              "secondary": "45 000 DH"
            },
            {
              "primary": "Agence 2 · Mars 2026",
              "secondary": "38 000 DH"
            },
            {
              "primary": "Agence 3 · Mars 2026",
              "secondary": "52 000 DH"
            }
          ]
        },
        "presenterNotes": "Même mécanique que le Jour 1 mais sur un exemple différent — l'idée est que ce geste devienne un réflexe, pas un tour de magie ponctuel."
      },
      {
        "id": "recherchex-vs-recherchev",
        "type": "comparison",
        "eyebrow": "Chapitre 1",
        "title": "RECHERCHEV ou RECHERCHEX ?",
        "columns": [
          {
            "label": "RECHERCHEV",
            "items": [
              "Cherche uniquement vers la droite",
              "Casse si on insère une colonne",
              "Pas de recherche par défaut vers la gauche"
            ]
          },
          {
            "label": "RECHERCHEX",
            "items": [
              "Cherche dans n'importe quelle direction",
              "Résiste à l'insertion de colonnes",
              "Gère nativement les valeurs non trouvées"
            ],
            "winner": true
          }
        ],
        "presenterNotes": "Message simple : RECHERCHEX est la version moderne, à privilégier par défaut sauf contrainte de compatibilité avec une vieille version d'Excel."
      },
      {
        "id": "si-imbriques",
        "type": "code-card",
        "eyebrow": "Chapitre 1",
        "title": "SI imbriqués et SOMME.SI.ENS, expliqués simplement",
        "filename": "prompt_formule_excel.txt",
        "code": "J'ai une colonne <v>taux_rupture</v>. Écris-moi une formule qui affiche :\n<k>\"Critique\"</k> si le taux dépasse 20%,\n<k>\"À surveiller\"</k> s'il est entre 10% et 20%,\n<k>\"OK\"</k> sinon.\n\nExplique chaque partie de la formule en une ligne, comme si je ne connaissais pas encore SI.",
        "presenterNotes": "Montrer que Claude peut aussi bien écrire la formule qu'expliquer pédagogiquement chaque bloc — utile pour progresser, pas juste pour copier-coller."
      },
      {
        "id": "tcd-concept",
        "type": "workflow-flow",
        "eyebrow": "Chapitre 1",
        "title": "Du fichier brut à l'information utile",
        "nodes": [
          {
            "icon": "database",
            "label": "Données brutes",
            "detail": "fichier terrain"
          },
          {
            "icon": "clean",
            "label": "Nettoyage",
            "detail": "avec Claude"
          },
          {
            "icon": "table",
            "label": "TCD",
            "detail": "tableau croisé"
          },
          {
            "icon": "chart-bar",
            "label": "Insight",
            "detail": "prêt pour décision",
            "highlight": true
          }
        ],
        "presenterNotes": "Le tableau croisé dynamique n'est pas une fin en soi — c'est l'étape qui transforme des lignes en réponse à une question."
      },
      {
        "id": "kpi-bons-criteres",
        "type": "principle-list",
        "eyebrow": "Chapitre 1",
        "title": "Qu'est-ce qu'un bon KPI",
        "lead": "Un chiffre affiché n'est pas automatiquement un indicateur utile.",
        "items": [
          {
            "num": "01",
            "title": "Mesurable de façon fiable",
            "detail": "À partir de données qu'on collecte vraiment, pas d'une estimation approximative."
          },
          {
            "num": "02",
            "title": "Relié à une décision",
            "detail": "Si le chiffre change, qu'est-ce que ça change dans l'action ?"
          },
          {
            "num": "03",
            "title": "Compréhensible sans jargon",
            "detail": "Un directeur non-technique doit pouvoir l'interpréter en une phrase."
          }
        ],
        "presenterNotes": "Ce filtre sert de test avant d'ajouter n'importe quel chiffre à un dashboard — évite la surcharge de métriques décoratives."
      },
      {
        "id": "kpi-decision",
        "type": "decision-table",
        "eyebrow": "Chapitre 1",
        "title": "Relier un KPI à une vraie question",
        "rows": [
          {
            "want": "Savoir si un centre est en rupture de stock",
            "tool": "Taux de rupture mensuel"
          },
          {
            "want": "Savoir si un programme cible bien les bons ménages",
            "tool": "Taux de ciblage correct"
          },
          {
            "want": "Savoir si un dashboard est encore utile",
            "tool": "Fréquence de consultation"
          }
        ],
        "presenterNotes": "Répéter le même mécanisme que le Jour 1 pour ancrer l'habitude de partir de la question avant de choisir l'indicateur."
      },
      {
        "id": "cas-ong-intro",
        "type": "principle-list",
        "eyebrow": "Chapitre 2 — Le cas du jour",
        "title": "Un programme de transferts monétaires à auditer",
        "lead": "Une ONG distribue une aide financière mensuelle à des ménages vulnérables. Le fichier de suivi contient exactement les pièges qu'on vient de voir — exemple pédagogique construit pour l'exercice, pas un vrai audit publié.",
        "items": [
          {
            "num": "01",
            "title": "L'objectif du programme",
            "detail": "Vérifier que l'aide arrive aux bons ménages, sans doublon ni sur-paiement."
          },
          {
            "num": "02",
            "title": "Ta mission aujourd'hui",
            "detail": "Nettoyer le fichier, puis construire le dashboard qui répond à cette question pour le responsable programme."
          }
        ],
        "presenterNotes": "Poser le décor du fil rouge de la journée — un seul cas, suivi de A à Z, pour que le nettoyage et le dashboard se répondent."
      },
      {
        "id": "cas-ong-donnees",
        "type": "data-table",
        "eyebrow": "Chapitre 2 — Le cas du jour",
        "title": "Le fichier de suivi, tel que reçu",
        "lead": "Repère les deux lignes qui posent vraiment problème avant de continuer.",
        "columns": [
          "ID ménage",
          "Région",
          "Montant transféré",
          "Statut"
        ],
        "rows": [
          {
            "cells": [
              "MEN-0231",
              "Marrakech-Safi",
              "4 500 DH",
              "Payé"
            ],
            "critical": false
          },
          {
            "cells": [
              "MEN-0231",
              "Marrakech-Safi",
              "4 500 DH",
              "Payé"
            ],
            "critical": true
          },
          {
            "cells": [
              "MEN-0198",
              "marrakech-safi",
              "18 000 DH",
              "Payé"
            ],
            "critical": true
          },
          {
            "cells": [
              "MEN-0304",
              "Souss-Massa",
              "4 500 DH",
              "En attente"
            ],
            "critical": false
          }
        ],
        "presenterNotes": "Ligne 2 : doublon exact du ménage MEN-0231. Ligne 3 : montant 4x supérieur à la norme, plus une variante d'orthographe de région — deux signaux différents à ne pas confondre."
      },
      {
        "id": "cas-ong-prompt-nettoyage",
        "type": "code-card",
        "eyebrow": "Chapitre 2 — Le cas du jour",
        "title": "Le prompt de nettoyage pour ce cas précis",
        "filename": "prompt_audit_ong.txt",
        "code": "Tu es un <k>data analyst senior</k> spécialisé en programmes de subventions et suivi de projets.\nVoici mon fichier de suivi (colonnes : <v>id_menage, region, montant, statut</v>).\n\n1. Identifie les doublons d'ID ménage.\n2. Repère les montants qui dépassent <v>2x la médiane</v> de la région.\n3. Uniformise l'orthographe des régions.\n4. Explique chaque anomalie en une phrase, pour un responsable programme non-technique.",
        "presenterNotes": "Montrer qu'un prompt précis (seuil à 2x la médiane, pas juste \"trouve les erreurs\") donne un résultat bien plus exploitable."
      },
      {
        "id": "cas-ong-resultat",
        "type": "before-after",
        "eyebrow": "Chapitre 2 — Le cas du jour",
        "title": "Le fichier, avant et après audit",
        "before": {
          "label": "AVANT",
          "rows": [
            "MEN-0231 ; Marrakech-Safi ; 4500DH ; paye",
            "MEN-0231 ; Marrakech-Safi ; 4500 ; PAYE",
            "MEN-0198 ; marrakech-safi ; 18 000 ; Payé"
          ]
        },
        "after": {
          "label": "APRÈS",
          "rows": [
            {
              "primary": "MEN-0231 · Marrakech-Safi",
              "secondary": "4 500 DH"
            },
            {
              "primary": "MEN-0198 · Marrakech-Safi — à vérifier",
              "secondary": "18 000 DH ⚠"
            },
            {
              "primary": "MEN-0304 · Souss-Massa",
              "secondary": "4 500 DH"
            }
          ]
        },
        "presenterNotes": "Le doublon a disparu, l'orthographe est uniforme, et le montant anormal est conservé mais flagué pour vérification humaine — Claude ne supprime jamais une donnée suspecte sans le signaler."
      },
      {
        "id": "cas-ong-tcd",
        "type": "step-list",
        "eyebrow": "Chapitre 2 — Le cas du jour",
        "title": "Construire le tableau croisé dynamique",
        "steps": [
          {
            "title": "Lignes : région",
            "detail": "Un ménage regroupé par région géographique"
          },
          {
            "title": "Valeurs : somme des montants + comptage des ménages",
            "detail": "Pour voir le volume ET le montant en un coup d'œil"
          },
          {
            "title": "Filtre : statut = Payé",
            "detail": "Se concentrer sur ce qui a effectivement été distribué"
          }
        ],
        "presenterNotes": "Dérouler la construction du TCD à l'écran en direct, en s'appuyant sur le fichier nettoyé de la slide précédente."
      },
      {
        "id": "cas-ong-synthese",
        "type": "code-card",
        "eyebrow": "Chapitre 2 — Le cas du jour",
        "title": "La synthèse exécutive en 3 phrases",
        "filename": "prompt_synthese_ong.txt",
        "code": "À partir de ce tableau croisé, rédige une synthèse de <v>3 phrases maximum</v> pour la direction :\n1. Ce qui fonctionne bien.\n2. Le point d'attention principal.\n3. Une recommandation concrète et actionnable.\n\nLangage <k>business</k>, zéro terme technique.",
        "presenterNotes": "Insister sur la contrainte de 3 phrases — c'est ce qui force Claude (et l'apprenant) à prioriser plutôt qu'à tout lister."
      },
      {
        "id": "cas-ong-checkpoint",
        "type": "quote-stat",
        "eyebrow": "Chapitre 2 — Checkpoint",
        "value": 15,
        "suffix": " min",
        "label": "C'est le temps qu'a pris tout ce nettoyage, doublon et anomalie compris",
        "context": "Le même travail à la main aurait demandé de croiser manuellement chaque ligne — plusieurs heures sur un vrai fichier de plusieurs milliers de ménages.",
        "presenterNotes": "Marquer une pause avant de basculer vers Power BI — insister sur le contraste de temps, pas sur la performance de l'outil pour l'outil."
      },
      {
        "id": "excel-vs-powerbi",
        "type": "comparison",
        "eyebrow": "Chapitre 3",
        "title": "Excel ou Power BI, pour quoi faire",
        "columns": [
          {
            "label": "Excel",
            "items": [
              "Exploration rapide d'un fichier",
              "Analyse ponctuelle, usage personnel",
              "Pas besoin de suivi dans le temps"
            ]
          },
          {
            "label": "Power BI",
            "items": [
              "Suivi récurrent, mis à jour régulièrement",
              "Partagé avec plusieurs personnes",
              "Plusieurs sources combinées en un seul modèle"
            ],
            "winner": true
          }
        ],
        "presenterNotes": "Le dashboard qu'on va construire répond exactement au cas où Power BI gagne : suivi récurrent, partagé avec la direction du programme."
      },
      {
        "id": "modelisation-relations",
        "type": "workflow-flow",
        "eyebrow": "Chapitre 3",
        "title": "Modéliser, c'est relier des tables séparées",
        "nodes": [
          {
            "icon": "table",
            "label": "Table ménages",
            "detail": "1 ligne / ménage"
          },
          {
            "icon": "table",
            "label": "Table transferts",
            "detail": "1 ligne / paiement"
          },
          {
            "icon": "projects",
            "label": "Relation",
            "detail": "clé commune",
            "highlight": true
          },
          {
            "icon": "chart-bar",
            "label": "Modèle unique",
            "detail": "prêt pour les visuels"
          }
        ],
        "presenterNotes": "Insister sur l'idée qu'un bon modèle évite de dupliquer l'information région/ménage dans chaque table de transferts."
      },
      {
        "id": "schema-etoile",
        "type": "principle-list",
        "eyebrow": "Chapitre 3",
        "title": "Le schéma en étoile, sans jargon",
        "lead": "Le standard le plus simple pour organiser un modèle Power BI.",
        "items": [
          {
            "num": "01",
            "title": "Une table de faits au centre",
            "detail": "Les événements qu'on mesure — ici, chaque transfert effectué."
          },
          {
            "num": "02",
            "title": "Des tables de dimensions autour",
            "detail": "Le contexte : ménage, région, date — chacune une seule fois."
          },
          {
            "num": "03",
            "title": "Des relations qui les relient",
            "detail": "Pas de duplication d'information entre les tables."
          }
        ],
        "presenterNotes": "Se limiter à l'intuition visuelle de l'étoile — pas besoin d'aller plus loin en un jour d'introduction."
      },
      {
        "id": "power-query",
        "type": "step-list",
        "eyebrow": "Chapitre 3",
        "title": "Power Query, le nettoyage en amont du modèle",
        "steps": [
          {
            "title": "Se connecter à la source",
            "detail": "Fichier, base de données, ou export d'application"
          },
          {
            "title": "Transformer sans toucher au fichier d'origine",
            "detail": "Chaque étape est enregistrée et modifiable"
          },
          {
            "title": "Charger dans le modèle",
            "detail": "Prêt pour les mesures DAX et les visuels"
          }
        ],
        "presenterNotes": "Message clé : Power Query garde une trace de chaque transformation, contrairement à un nettoyage manuel dans Excel qui écrase l'original."
      },
      {
        "id": "power-query-vs-main",
        "type": "comparison",
        "eyebrow": "Chapitre 3",
        "title": "Power Query ou nettoyage manuel",
        "columns": [
          {
            "label": "À la main dans Excel",
            "items": [
              "Rapide pour un fichier unique",
              "Aucune trace des étapes",
              "À refaire entièrement le mois suivant"
            ]
          },
          {
            "label": "Power Query",
            "items": [
              "Étapes enregistrées et réutilisables",
              "Se rafraîchit automatiquement",
              "Rentable dès le 2e mois de données"
            ],
            "winner": true
          }
        ],
        "presenterNotes": "Rassurer : pour un usage ponctuel, Excel manuel reste légitime — Power Query devient rentable dès qu'un fichier se répète."
      },
      {
        "id": "dax-mesures",
        "type": "code-card",
        "eyebrow": "Chapitre 3",
        "title": "Une première mesure DAX, expliquée",
        "filename": "prompt_dax_powerbi.txt",
        "code": "Écris une mesure DAX qui calcule le <v>montant total transféré par région</v>,\nfiltré sur les paiements au statut <v>\"Payé\"</v>.\n\nExplique la mesure ligne par ligne, comme si j'apprenais DAX pour la première fois.",
        "presenterNotes": "Faire écrire la mesure par Claude puis la lire ensemble ligne par ligne — l'objectif est de comprendre, pas seulement de copier."
      },
      {
        "id": "dax-pieges",
        "type": "principle-list",
        "eyebrow": "Chapitre 3",
        "title": "Deux pièges DAX à connaître",
        "lead": "Les deux causes les plus fréquentes d'un chiffre DAX qui semble faux.",
        "items": [
          {
            "num": "01",
            "title": "Le contexte de filtre change tout",
            "detail": "La même mesure peut donner un résultat différent selon les filtres actifs sur la page."
          },
          {
            "num": "02",
            "title": "CALCULATE mal utilisé",
            "detail": "Ajouter un filtre sans comprendre qu'il remplace le contexte existant plutôt que de s'y ajouter."
          }
        ],
        "presenterNotes": "Rassurer : demander à Claude d'expliquer pourquoi un chiffre DAX paraît faux est un des usages les plus rentables de la journée."
      },
      {
        "id": "choisir-visualisation",
        "type": "decision-table",
        "eyebrow": "Chapitre 3",
        "title": "Quel graphique pour quel message",
        "rows": [
          {
            "want": "Comparer des catégories entre elles",
            "tool": "Graphique en barres"
          },
          {
            "want": "Montrer une évolution dans le temps",
            "tool": "Graphique en ligne"
          },
          {
            "want": "Montrer une répartition d'un tout",
            "tool": "Graphique en anneau (max 4-5 parts)"
          },
          {
            "want": "Localiser un phénomène géographiquement",
            "tool": "Carte"
          }
        ],
        "presenterNotes": "Insister sur la limite \"4-5 parts max\" pour les graphiques circulaires — au-delà, ils deviennent illisibles."
      },
      {
        "id": "erreurs-visualisation",
        "type": "principle-list",
        "eyebrow": "Chapitre 3",
        "title": "Trois erreurs qui rendent un dashboard mensonger",
        "lead": "Pas de mauvaise intention en général — juste des réflexes à corriger.",
        "items": [
          {
            "num": "01",
            "title": "Axe vertical tronqué",
            "detail": "Fait paraître une petite variation comme un changement énorme."
          },
          {
            "num": "02",
            "title": "Effets 3D",
            "detail": "Déforme la perception des proportions réelles."
          },
          {
            "num": "03",
            "title": "Camembert à 10 parts ou plus",
            "detail": "Impossible à comparer visuellement au-delà de 5 catégories."
          }
        ],
        "presenterNotes": "Ces trois erreurs sont très répandues dans les dashboards \"faits maison\" — les nommer aide à les repérer ensuite partout."
      },
      {
        "id": "accessibilite-contraste",
        "type": "comparison",
        "eyebrow": "Chapitre 3 — Accessibilité",
        "title": "Un dashboard que tout le monde peut lire",
        "columns": [
          {
            "label": "Contraste insuffisant",
            "items": [
              "Barres pâles sur fond clair",
              "Texte gris clair sur blanc",
              "Illisible en plein soleil ou en basse vue"
            ]
          },
          {
            "label": "Contraste conforme (WCAG 1.4.11)",
            "items": [
              "Ratio d'au moins 3:1 pour les éléments graphiques",
              "Texte principal en ratio 4.5:1 minimum",
              "Lisible dans plus de conditions réelles"
            ],
            "winner": true
          }
        ],
        "presenterNotes": "Norme concrète et vérifiable, pas juste \"fais joli\" — WCAG 1.4.11 s'applique spécifiquement aux barres et lignes de graphique, pas seulement au texte."
      },
      {
        "id": "accessibilite-couleur-seule",
        "type": "principle-list",
        "eyebrow": "Chapitre 3 — Accessibilité",
        "title": "Ne jamais coder une info par la couleur seule",
        "lead": "Environ 1 personne sur 12 a une forme de daltonisme — le rouge/vert est le cas le plus fréquent.",
        "items": [
          {
            "num": "01",
            "title": "Le problème",
            "detail": "\"Rouge = alerte, vert = OK\" devient invisible pour une partie du public."
          },
          {
            "num": "02",
            "title": "La solution",
            "detail": "Ajouter une forme, un motif, ou une étiquette texte en plus de la couleur."
          }
        ],
        "presenterNotes": "Règle WCAG 1.4.1 — simple à appliquer une fois qu'on y pense : icône d'alerte en plus du rouge, pas le rouge seul."
      },
      {
        "id": "palettes-daltoniens",
        "type": "ecosystem-grid",
        "eyebrow": "Chapitre 3 — Accessibilité",
        "title": "Des palettes prêtes à l'emploi, sans droits",
        "items": [
          {
            "icon": "target",
            "title": "ColorBrewer",
            "detail": "Palettes cartographiques, filtre \"colorblind safe\""
          },
          {
            "icon": "chart-bar",
            "title": "Viridis",
            "detail": "Dégradé perceptuel uniforme, intégré à beaucoup d'outils"
          },
          {
            "icon": "shield",
            "title": "Okabe-Ito",
            "detail": "8 couleurs qualitatives, conçues pour le daltonisme"
          },
          {
            "icon": "check",
            "title": "Règle des 6 couleurs",
            "detail": "Au-delà, la distinction visuelle se dégrade pour tout le monde"
          }
        ],
        "presenterNotes": "Ces trois palettes sont gratuites et déjà intégrées ou importables dans Power BI, Excel, Python et R."
      },
      {
        "id": "data-storytelling",
        "type": "step-list",
        "eyebrow": "Chapitre 3",
        "title": "Construire l'histoire derrière les chiffres",
        "steps": [
          {
            "title": "Connaître son audience",
            "detail": "Un directeur non-technique n'a pas besoin de voir la mesure DAX"
          },
          {
            "title": "Trouver le message clé",
            "detail": "Une seule idée principale, pas dix informations à la fois"
          },
          {
            "title": "Structurer la démonstration",
            "detail": "Du contexte vers la conclusion, pas l'inverse"
          },
          {
            "title": "Mettre en scène les chiffres",
            "detail": "Mettre en avant ce qui compte, estomper le reste"
          }
        ],
        "presenterNotes": "Le storytelling n'est pas de la décoration — c'est ce qui transforme un dashboard consulté une fois en outil utilisé chaque semaine."
      },
      {
        "id": "cas-ong-modele",
        "type": "step-list",
        "eyebrow": "Chapitre 4 — Le cas du jour",
        "title": "Construire le modèle du dashboard",
        "steps": [
          {
            "title": "Importer le fichier nettoyé du matin",
            "detail": "Le même fichier ONG, cette fois dans Power BI"
          },
          {
            "title": "Créer la relation région ↔ transferts",
            "detail": "Une seule table de dimension région, pas de duplication"
          },
          {
            "title": "Écrire les mesures de base avec Claude",
            "detail": "Montant total, nombre de ménages, montant moyen"
          }
        ],
        "presenterNotes": "Continuité volontaire avec le nettoyage Excel du matin — même fichier, même histoire, pour que la journée se sente comme un seul projet."
      },
      {
        "id": "cas-ong-question-centrale",
        "type": "decision-table",
        "eyebrow": "Chapitre 4 — Le cas du jour",
        "title": "La question centrale du programme",
        "rows": [
          {
            "want": "Le programme cible-t-il les bonnes régions ?",
            "tool": "Carte + montant par région"
          },
          {
            "want": "Y a-t-il des paiements anormaux à vérifier ?",
            "tool": "Tableau des ménages flagués"
          },
          {
            "want": "La distribution avance-t-elle comme prévu ?",
            "tool": "Jauge payés vs en attente"
          }
        ],
        "presenterNotes": "Rappeler que ces 3 questions sont directement héritées du contexte posé en tout début de chapitre 2 — rien n'est ajouté au hasard."
      },
      {
        "id": "cas-ong-3-visuels",
        "type": "principle-list",
        "eyebrow": "Chapitre 4 — Le cas du jour",
        "title": "Les 3 visuels retenus",
        "lead": "Le minimum demandé dans le livrable — pas un de plus pour l'instant.",
        "items": [
          {
            "num": "01",
            "title": "Carte des montants par région",
            "detail": "Répond directement à la question de ciblage géographique."
          },
          {
            "num": "02",
            "title": "Tableau des ménages flagués",
            "detail": "Rend visible ce que le nettoyage du matin a mis de côté pour vérification."
          },
          {
            "num": "03",
            "title": "Jauge de progression des paiements",
            "detail": "Une lecture en 2 secondes de l'avancement du programme."
          }
        ],
        "presenterNotes": "Rappeler la contrainte du livrable : 3 visuels qui répondent à la question centrale, pas un dashboard tentaculaire."
      },
      {
        "id": "cas-ong-personnaliser",
        "type": "code-card",
        "eyebrow": "Chapitre 4 — Le cas du jour",
        "previewLabel": "→ aperçu du dashboard ONG personnalisé, à l'écran en direct",
        "title": "Personnaliser le dashboard avec Claude",
        "filename": "prompt_personnalisation_ong.txt",
        "code": "J'aimerais que le dashboard utilise <k>ces couleurs</k> : <v>[tes couleurs, en gardant un bon contraste]</v>.\nPeux-tu adapter le design en gardant la structure des 3 visuels, et vérifier que les couleurs restent lisibles pour une personne daltonienne ?",
        "presenterNotes": "Montrer qu'on peut demander la personnalisation ET la vérification d'accessibilité dans le même prompt — les deux ne s'opposent pas."
      },
      {
        "id": "cas-ong-rapport",
        "type": "code-card",
        "eyebrow": "Chapitre 4 — Le cas du jour",
        "title": "Le rapport décisionnel qui accompagne le dashboard",
        "filename": "prompt_rapport_ong.txt",
        "code": "Rédige le rapport qui accompagne ce dashboard, en <v>une page</v> :\n1. Contexte du programme, en 2 phrases.\n2. Ce que montrent les 3 visuels.\n3. Une recommandation pour le responsable programme.\n\nLangage <k>business</k>, aucune référence technique à Power BI ou DAX.",
        "presenterNotes": "Ce rapport est le pont entre le dashboard technique et la personne qui va réellement prendre une décision à partir de lui."
      },
      {
        "id": "cas-ong-resultat-final",
        "type": "quote-stat",
        "eyebrow": "Chapitre 4 — Checkpoint final",
        "value": 3,
        "label": "visuels qui répondent à la question centrale, publiés et partageables en fin de journée",
        "context": "Depuis un fichier reçu en désordre ce matin jusqu'à un dashboard décisionnel — sur un seul cas, suivi de bout en bout.",
        "presenterNotes": "Boucler la boucle sur le fil rouge de la journée avant de passer au résumé et aux livrables."
      },
      {
        "id": "resume-jour2",
        "type": "principle-list",
        "eyebrow": "Résumé",
        "title": "Ce qu'on retient du Jour 02",
        "lead": "Trois idées à garder en tête avant de passer au coding demain.",
        "items": [
          {
            "num": "01",
            "title": "Nettoyer avant de visualiser, toujours",
            "detail": "Un dashboard magnifique sur des données sales reste un dashboard faux."
          },
          {
            "num": "02",
            "title": "Un KPI répond à une question, pas l'inverse",
            "detail": "Partir de la décision à prendre, jamais du graphique qu'on a envie de faire."
          },
          {
            "num": "03",
            "title": "L'accessibilité n'est pas une option",
            "detail": "Contraste et redondance d'information coûtent une slide à apprendre, zéro effort ensuite."
          }
        ],
        "presenterNotes": "Ce résumé sert de pont mental avant les livrables — trois phrases que l'apprenant doit pouvoir répéter de mémoire."
      },
      {
        "id": "livrables",
        "type": "deliverable-checklist",
        "eyebrow": "À soumettre avant le live",
        "title": "Livrables du Jour 02",
        "items": [
          {
            "title": "Fichier Excel nettoyé + tableau croisé dynamique",
            "detail": "Rupture ou anomalie par région, avec synthèse en 3 phrases"
          },
          {
            "title": "Dashboard Power BI fonctionnel",
            "detail": "Au moins 3 visuels répondant à la question centrale du programme"
          },
          {
            "title": "Slide de synthèse exécutive",
            "detail": "Rédigée avec Claude, 1 page, langage business"
          }
        ],
        "presenterNotes": "Rappeler clairement ce qui est attendu avant le live Teams du soir — les 3 livrables correspondent exactement aux 3 sorties produites pendant les ateliers."
      },
      {
        "id": "cloture",
        "type": "cover",
        "eyebrow": "À ce soir",
        "title": [
          "Rendez-vous en",
          "live sur Teams"
        ],
        "highlight": "live sur Teams",
        "subtitle": "Questions, blocages Power BI, et découverte de vos dashboards ONG. Demain : SQL, Python et R, avec le même réflexe de vérification qu'aujourd'hui.",
        "meta": "ZAYN4DATA · JOUR 03 DEMAIN À LA MÊME HEURE",
        "metaHighlight": "JOUR 03 DEMAIN À LA MÊME HEURE",
        "presenterNotes": "Clôturer en rappelant le rendez-vous du soir et en teasant le contenu du Jour 3 — coding, avec le même fil rouge de rigueur."
      }
    ]
  },
  {
    "day": 3,
    "title": "Coding : SQL, Python, R",
    "date": "2026-07-15",
    "objective": "Écrire et comprendre de vraies requêtes SQL, construire un pipeline Python complet, découvrir R — avec un seul fil rouge (le risque de crédit d'une institution de microfinance) et une discipline de vérification qui ne relâche jamais la garde face au code généré par l'IA.",
    "deliverables": [
      "Un notebook Python reproductible (import → nettoyage → analyse → visualisation)",
      "Une analyse R sur le même jeu de données",
      "Les requêtes SQL du cas microfinance, commentées et expliquées"
    ],
    "chapters": [
      {
        "title": "Ouverture",
        "minutes": 3,
        "firstSlideId": "cover"
      },
      {
        "title": "Le programme de la semaine",
        "minutes": 3,
        "firstSlideId": "programme"
      },
      {
        "title": "Concepts — SQL avec Claude",
        "minutes": 22,
        "firstSlideId": "quand-sql-python-r"
      },
      {
        "title": "Atelier — cas microfinance, requêtes SQL",
        "minutes": 15,
        "firstSlideId": "cas-mfi-intro"
      },
      {
        "title": "Concepts — Python pour la data",
        "minutes": 15,
        "firstSlideId": "pipeline-python-schema"
      },
      {
        "title": "Concepts — R avec Claude",
        "minutes": 10,
        "firstSlideId": "r-vs-python"
      },
      {
        "title": "Reproductibilité & Git",
        "minutes": 13,
        "firstSlideId": "reproductibilite-probleme"
      },
      {
        "title": "Le vibe coding, avec esprit critique",
        "minutes": 10,
        "firstSlideId": "vibe-coding-definition"
      },
      {
        "title": "Atelier — pipeline Python complet",
        "minutes": 15,
        "firstSlideId": "cas-mfi-pipeline-intro"
      },
      {
        "title": "Résumé & livrables",
        "minutes": 5,
        "firstSlideId": "resume-jour3"
      },
      {
        "title": "Clôture",
        "minutes": 2,
        "firstSlideId": "cloture"
      }
    ],
    "slides": [
      {
        "id": "cover",
        "type": "cover",
        "eyebrow": "Jour 03 · Zayn4Data",
        "title": [
          "Coding avec Claude —",
          "SQL, Python, R"
        ],
        "highlight": "SQL, Python, R",
        "subtitle": "Un seul cas — le risque de crédit d'une institution de microfinance — traversé en SQL puis en Python. Avec une règle simple : jamais de code qu'on ne comprend pas.",
        "meta": "MAÎTRISEZ L'ANALYSE DES DONNÉES AVEC CLAUDE · 15 JUILLET 2026",
        "metaHighlight": "15 JUILLET 2026",
        "presenterNotes": "Annoncer le fil rouge de la journée dès l'ouverture — un seul cas, deux langages, pour montrer la continuité plutôt que trois blocs déconnectés."
      },
      {
        "id": "programme",
        "type": "day-map",
        "eyebrow": "Notre semaine ensemble",
        "title": "Le programme complet",
        "activeDay": 3,
        "days": [
          {
            "num": "01",
            "title": "Découverte de l'écosystème Claude",
            "subtitle": "Dashboard publié en ligne"
          },
          {
            "num": "02",
            "title": "Excel & Power BI boostés par Claude",
            "subtitle": "2 projets portfolio"
          },
          {
            "num": "03",
            "title": "Coding : SQL, Python, R",
            "subtitle": "1 projet transversal"
          },
          {
            "num": "04",
            "title": "Portfolio complet + stratégie carrière",
            "subtitle": "Site en ligne + plan 90 jours"
          },
          {
            "num": "05",
            "title": "Présentation & lancement",
            "subtitle": "Ton plan des 90 jours démarre"
          }
        ],
        "presenterNotes": "Situer la journée : le virage \"code\" de la semaine, après deux jours d'outils no-code."
      },
      {
        "id": "quand-sql-python-r",
        "type": "decision-table",
        "eyebrow": "Chapitre 1",
        "title": "SQL, Python ou R — pour quoi faire",
        "rows": [
          {
            "want": "Interroger une base de données directement",
            "tool": "SQL"
          },
          {
            "want": "Construire un pipeline reproductible et complexe",
            "tool": "Python"
          },
          {
            "want": "Faire des statistiques ou tests avancés rapidement",
            "tool": "R"
          }
        ],
        "presenterNotes": "Poser la carte mentale avant de plonger — les trois langages ne sont pas en compétition, ils répondent à des besoins différents."
      },
      {
        "id": "pourquoi-sql-meme-avec-claude",
        "type": "principle-list",
        "eyebrow": "Chapitre 1",
        "title": "Pourquoi apprendre SQL, même si Claude peut l'écrire",
        "lead": "Savoir lire une requête reste indispensable pour juger si le résultat est fiable.",
        "items": [
          {
            "num": "01",
            "title": "Vérifier plutôt que subir",
            "detail": "Comprendre une jointure permet de repérer une erreur avant qu'elle ne fausse une décision."
          },
          {
            "num": "02",
            "title": "Discuter avec les équipes techniques",
            "detail": "Un minimum de vocabulaire SQL change la qualité des échanges avec les développeurs."
          },
          {
            "num": "03",
            "title": "Optimiser un prompt",
            "detail": "Savoir ce qu'on veut demander précisément produit de meilleures requêtes générées."
          }
        ],
        "presenterNotes": "Répondre à l'objection implicite \"si Claude écrit le SQL, pourquoi l'apprendre\" dès le départ du chapitre."
      },
      {
        "id": "anatomie-requete-sql",
        "type": "workflow-flow",
        "eyebrow": "Chapitre 1",
        "title": "L'anatomie d'une requête SQL",
        "nodes": [
          {
            "icon": "search",
            "label": "SELECT",
            "detail": "quelles colonnes"
          },
          {
            "icon": "target",
            "label": "WHERE",
            "detail": "quels filtres"
          },
          {
            "icon": "projects",
            "label": "JOIN",
            "detail": "quelles tables"
          },
          {
            "icon": "table",
            "label": "GROUP BY",
            "detail": "quel regroupement",
            "highlight": true
          },
          {
            "icon": "chart-bar",
            "label": "ORDER BY",
            "detail": "quel tri final"
          }
        ],
        "presenterNotes": "Ce schéma sert de carte de référence à réutiliser à chaque nouvelle requête de la journée."
      },
      {
        "id": "inner-vs-left-join",
        "type": "comparison",
        "eyebrow": "Chapitre 1",
        "title": "INNER JOIN ou LEFT JOIN",
        "columns": [
          {
            "label": "INNER JOIN",
            "items": [
              "Garde seulement les lignes qui correspondent dans les deux tables",
              "Risque de perdre des lignes sans le vouloir",
              "À utiliser quand on veut une correspondance stricte"
            ]
          },
          {
            "label": "LEFT JOIN",
            "items": [
              "Garde toutes les lignes de la table de gauche",
              "Complète par NULL quand il n'y a pas de correspondance",
              "Le choix par défaut le plus sûr pour explorer"
            ],
            "winner": true
          }
        ],
        "presenterNotes": "Beaucoup de tutoriels enseignent INNER JOIN en premier — en pratique LEFT JOIN évite de perdre silencieusement des lignes, donc on le pose comme réflexe par défaut."
      },
      {
        "id": "piege-produit-cartesien",
        "type": "data-table",
        "eyebrow": "Chapitre 1",
        "title": "Le piège du produit cartésien",
        "lead": "Un JOIN sans condition ON associe chaque ligne de la première table à CHAQUE ligne de la seconde.",
        "columns": [
          "Table A",
          "Table B",
          "Résultat sans ON"
        ],
        "rows": [
          {
            "cells": [
              "1 000 lignes",
              "5 000 lignes",
              "5 000 000 lignes"
            ],
            "critical": true
          },
          {
            "cells": [
              "+ une 3e table de 10 000 lignes",
              "",
              "50 000 000 000 lignes"
            ],
            "critical": true
          }
        ],
        "presenterNotes": "Chiffres volontairement spectaculaires — l'objectif est que personne n'oublie jamais une clause ON après cette slide."
      },
      {
        "id": "toujours-un-on",
        "type": "principle-list",
        "eyebrow": "Chapitre 1",
        "title": "Le réflexe qui évite le piège",
        "items": [
          {
            "num": "01",
            "title": "Toujours une clause ON explicite",
            "detail": "Jamais de virgule à la place d'un vrai JOIN."
          },
          {
            "num": "02",
            "title": "Filtrer avant de croiser si possible",
            "detail": "Réduire chaque table avant la jointure limite les dégâts en cas d'erreur."
          },
          {
            "num": "03",
            "title": "Vérifier le nombre de lignes après jointure",
            "detail": "Un compte qui explose est le premier signal d'alerte à surveiller."
          }
        ],
        "presenterNotes": "Trois réflexes simples, à répéter comme un mantra pour ce chapitre."
      },
      {
        "id": "fenetres-row-rank-dense",
        "type": "data-table",
        "eyebrow": "Chapitre 1",
        "title": "ROW_NUMBER, RANK, DENSE_RANK — sur une égalité",
        "lead": "Deux valeurs à égalité en position 4 : voici ce que donne chaque fonction pour elles et pour la ligne suivante.",
        "columns": [
          "Fonction",
          "Comportement sur l'égalité",
          "Résultat (4e, 5e position)"
        ],
        "rows": [
          {
            "cells": [
              "ROW_NUMBER()",
              "Départage arbitrairement, jamais d'égalité",
              "4, 5"
            ],
            "critical": false
          },
          {
            "cells": [
              "RANK()",
              "Même rang, puis un saut",
              "4, 4, 6"
            ],
            "critical": true
          },
          {
            "cells": [
              "DENSE_RANK()",
              "Même rang, sans saut",
              "4, 4, 5"
            ],
            "critical": false
          }
        ],
        "presenterNotes": "La ligne RANK() est marquée car c'est la source de confusion la plus fréquente — le saut de 4 à 6 surprend presque tout le monde la première fois."
      },
      {
        "id": "group-by-vs-window",
        "type": "comparison",
        "eyebrow": "Chapitre 1",
        "title": "GROUP BY ou fonction fenêtre",
        "columns": [
          {
            "label": "GROUP BY",
            "items": [
              "Résume plusieurs lignes en une seule",
              "On perd le détail individuel",
              "Parfait pour un total ou une moyenne"
            ]
          },
          {
            "label": "Fonction fenêtre (OVER)",
            "items": [
              "Calcule sur un groupe sans perdre le détail",
              "Chaque ligne garde sa place",
              "Idéal pour un classement ou un cumul"
            ],
            "winner": true
          }
        ],
        "presenterNotes": "La distinction clé : GROUP BY réduit le nombre de lignes, une fonction fenêtre non — c'est souvent ce qui débloque la compréhension."
      },
      {
        "id": "lag-lead-comparaison",
        "type": "code-card",
        "eyebrow": "Chapitre 1",
        "title": "Comparer un mois au précédent avec LAG",
        "filename": "requete_lag.sql",
        "code": "-- Demande à Claude :\n<k>\"Écris une requête qui calcule la variation du montant en retard\n(colonne montant_retard) par rapport au mois précédent, pour chaque agence.\nUtilise LAG() et explique la clause OVER.\"</k>",
        "presenterNotes": "Montrer que le prompt peut directement demander la fonction ET l'explication de la clause OVER dans la même requête."
      },
      {
        "id": "dedoublonner-row-number",
        "type": "code-card",
        "eyebrow": "Chapitre 1",
        "title": "Dédoublonner avec ROW_NUMBER",
        "filename": "requete_dedoublonnage.sql",
        "code": "-- Demande à Claude :\n<k>\"J'ai des doublons dans ma table prêts (même id_pret plusieurs fois).\nÉcris une requête qui garde une seule ligne par id_pret\n(la plus récente selon date_maj), avec ROW_NUMBER et un CTE.\"</k>",
        "presenterNotes": "Ce pattern (CTE + ROW_NUMBER + filtre rn=1) revient tellement souvent qu'il vaut la peine de le mémoriser, pas seulement de le copier."
      },
      {
        "id": "demander-explication-requete",
        "type": "code-card",
        "eyebrow": "Chapitre 1",
        "title": "Faire expliquer une requête qu'on ne comprend pas",
        "filename": "prompt_expliquer_sql.txt",
        "code": "Voici une requête que je ne comprends pas entièrement :\n<v>[coller la requête]</v>\n\nExplique-la <k>clause par clause</k>, dans l'ordre d'exécution réel\n(pas l'ordre d'écriture). Signale si une clause te semble risquée.",
        "presenterNotes": "Rappeler que l'ordre d'exécution SQL (FROM/JOIN puis WHERE puis GROUP BY puis SELECT) diffère de l'ordre d'écriture — Claude peut lever cette confusion classique."
      },
      {
        "id": "cas-mfi-intro",
        "type": "principle-list",
        "eyebrow": "Chapitre 2 — Le cas du jour",
        "title": "Le risque de crédit d'une institution de microfinance",
        "lead": "Un portefeuille de prêts à auditer avec les indicateurs standards du secteur — exemple pédagogique construit pour l'exercice, pas un audit d'institution réelle.",
        "items": [
          {
            "num": "01",
            "title": "L'indicateur clé : le PAR30",
            "detail": "La part du portefeuille avec au moins 30 jours de retard de paiement."
          },
          {
            "num": "02",
            "title": "Ta mission",
            "detail": "Écrire la requête SQL qui calcule ce taux par agence, puis continuer l'analyse en Python cet après-midi."
          }
        ],
        "presenterNotes": "Poser le vocabulaire métier (PAR30) une seule fois clairement — il sera réutilisé toute la journée sans le redéfinir chaque fois."
      },
      {
        "id": "cas-mfi-donnees",
        "type": "data-table",
        "eyebrow": "Chapitre 2 — Le cas du jour",
        "title": "La table des prêts, telle que reçue",
        "columns": [
          "ID prêt",
          "Agence",
          "Montant",
          "Jours de retard"
        ],
        "rows": [
          {
            "cells": [
              "PRET-5521",
              "Casablanca",
              "80 000 DH",
              "0"
            ],
            "critical": false
          },
          {
            "cells": [
              "PRET-5522",
              "Casablanca",
              "120 000 DH",
              "45"
            ],
            "critical": true
          },
          {
            "cells": [
              "PRET-5523",
              "Tanger",
              "65 000 DH",
              "12"
            ],
            "critical": false
          },
          {
            "cells": [
              "PRET-5524",
              "Tanger",
              "240 000 DH",
              "97"
            ],
            "critical": true
          }
        ],
        "presenterNotes": "Deux prêts au-delà de 30 jours de retard (PRET-5522 et PRET-5524) — ce sont eux que la requête PAR30 doit isoler."
      },
      {
        "id": "cas-mfi-prompt-par30",
        "type": "code-card",
        "eyebrow": "Chapitre 2 — Le cas du jour",
        "title": "La requête PAR30 par agence",
        "filename": "requete_par30.sql",
        "code": "-- Demande à Claude :\n<k>\"Écris une requête qui calcule le PAR30 par agence :\nmontant total en retard de plus de 30 jours divisé par montant total du portefeuille.\nTable prets (agence, montant, jours_retard). Explique chaque partie.\"</k>",
        "presenterNotes": "Faire écrire la requête en direct puis vérifier manuellement le calcul sur les 4 lignes de la slide précédente — la vérification manuelle sur un petit échantillon est la meilleure garantie de confiance."
      },
      {
        "id": "cas-mfi-checkpoint",
        "type": "quote-stat",
        "eyebrow": "Chapitre 2 — Checkpoint",
        "value": 18,
        "suffix": "%",
        "label": "du portefeuille de l'agence de Tanger dépasse le seuil PAR30 dans notre exercice",
        "context": "Le seuil d'alerte généralement retenu dans le secteur financier et microfinance marocain est autour de 5% — un signal qui justifierait un audit ciblé.",
        "presenterNotes": "Ancrer le chiffre dans un repère métier réel (seuil ~5%) pour que l'exercice ne reste pas un calcul abstrait."
      },
      {
        "id": "pipeline-python-schema",
        "type": "workflow-flow",
        "eyebrow": "Chapitre 3",
        "title": "Le pipeline Python, en un schéma",
        "nodes": [
          {
            "icon": "database",
            "label": "Importer",
            "detail": "pandas.read_csv"
          },
          {
            "icon": "clean",
            "label": "Nettoyer",
            "detail": "types, doublons"
          },
          {
            "icon": "search",
            "label": "Analyser",
            "detail": "groupby, agrégats"
          },
          {
            "icon": "chart-bar",
            "label": "Visualiser",
            "detail": "matplotlib / seaborn",
            "highlight": true
          }
        ],
        "presenterNotes": "Ce schéma structure tout l'après-midi — chaque bloc de concepts qui suit correspond à une étape ici."
      },
      {
        "id": "pandas-loc-vs-chained",
        "type": "comparison",
        "eyebrow": "Chapitre 3",
        "title": "Le piège de l'indexation chaînée",
        "columns": [
          {
            "label": "Indexation chaînée",
            "items": [
              "df[df.x == 1]['y'] = 100",
              "Peut échouer silencieusement",
              "pandas ne garantit pas vue ou copie"
            ]
          },
          {
            "label": ".loc en un seul appel",
            "items": [
              "df.loc[df.x == 1, 'y'] = 100",
              "Comportement toujours prévisible",
              "Le réflexe recommandé par la documentation pandas"
            ],
            "winner": true
          }
        ],
        "presenterNotes": "Le message SettingWithCopyWarning fait peur au début — expliquer qu'il existe justement pour prévenir ce piège précis."
      },
      {
        "id": "piege-inplace-true",
        "type": "principle-list",
        "eyebrow": "Chapitre 3",
        "title": "inplace=True, moins utile qu'il ne paraît",
        "lead": "Un réflexe très répandu, mais qui mérite d'être questionné.",
        "items": [
          {
            "num": "01",
            "title": "Ne fait presque jamais gagner en performance",
            "detail": "Une copie est créée en interne dans la plupart des cas malgré tout."
          },
          {
            "num": "02",
            "title": "Modifie silencieusement la variable d'origine",
            "detail": "Source classique de bug quand une fonction reçoit un dataframe partagé."
          },
          {
            "num": "03",
            "title": "Empêche le chaînage de méthodes",
            "detail": "inplace=True renvoie None, donc impossible d'enchaîner une autre opération derrière."
          }
        ],
        "presenterNotes": "pandas prévoit de dépréciplayer ce paramètre dans les prochaines versions majeures — autant prendre le bon réflexe dès maintenant."
      },
      {
        "id": "views-vs-copies",
        "type": "principle-list",
        "eyebrow": "Chapitre 3",
        "title": "Vue ou copie — pourquoi ça compte",
        "items": [
          {
            "num": "01",
            "title": "Une vue partage la mémoire avec l'original",
            "detail": "Modifier la vue peut modifier le dataframe source sans le vouloir."
          },
          {
            "num": "02",
            "title": "Une copie est totalement indépendante",
            "detail": "Utiliser .copy() explicitement quand on veut vraiment une copie."
          },
          {
            "num": "03",
            "title": "Le seul moyen d'être sûr : un seul appel .loc",
            "detail": "Évite d'avoir à deviner ce que pandas a choisi de faire."
          }
        ],
        "presenterNotes": "Pas besoin d'aller plus loin que cette intuition pour un niveau débutant/intermédiaire."
      },
      {
        "id": "pandas-groupby-agg",
        "type": "code-card",
        "eyebrow": "Chapitre 3",
        "title": "Regrouper et agréger avec pandas",
        "filename": "prompt_pandas_groupby.txt",
        "code": "Sur mon dataframe <v>prets</v> (colonnes : agence, montant, jours_retard),\nécris le code pandas qui calcule le <k>PAR30 par agence</k>,\nla même métrique que ce matin en SQL. Utilise .loc, pas d'indexation chaînée.",
        "presenterNotes": "Faire le lien explicite avec la requête SQL du matin — même métrique, même résultat attendu, langage différent."
      },
      {
        "id": "data-viz-python-example",
        "type": "code-card",
        "eyebrow": "Chapitre 3",
        "title": "Un premier graphique avec seaborn",
        "filename": "prompt_visualisation_python.txt",
        "code": "Trace un graphique en barres du <v>PAR30 par agence</v> avec seaborn,\nen utilisant une palette <k>adaptée au daltonisme</k> (viridis ou équivalent),\net trie les agences de la plus risquée à la moins risquée.",
        "presenterNotes": "Réutiliser volontairement le réflexe d'accessibilité vu au Jour 2 — montrer que ce n'est pas propre à Power BI."
      },
      {
        "id": "visualiser-decision",
        "type": "decision-table",
        "eyebrow": "Chapitre 3",
        "title": "matplotlib ou seaborn, vite",
        "rows": [
          {
            "want": "Un graphique rapide pour explorer soi-même",
            "tool": "matplotlib"
          },
          {
            "want": "Un graphique statistique déjà stylé",
            "tool": "seaborn"
          },
          {
            "want": "Un graphique interactif à partager",
            "tool": "plotly"
          }
        ],
        "presenterNotes": "Pas besoin de trancher définitivement — juste donner un repère rapide pour ne pas hésiter au moment de coder."
      },
      {
        "id": "r-vs-python",
        "type": "comparison",
        "eyebrow": "Chapitre 4",
        "title": "R, pourquoi en plus de Python",
        "columns": [
          {
            "label": "Python",
            "items": [
              "Polyvalent, pipelines complets",
              "Écosystème plus large hors statistiques",
              "Standard de fait en entreprise"
            ]
          },
          {
            "label": "R",
            "items": [
              "Pensé nativement pour la statistique",
              "Tests statistiques très rapides à écrire",
              "Toujours dominant en recherche académique"
            ],
            "winner": true
          }
        ],
        "presenterNotes": "Ne pas opposer les deux comme un choix exclusif — beaucoup d'analystes gardent R pour les stats et Python pour le reste."
      },
      {
        "id": "r-stats-descriptives",
        "type": "code-card",
        "eyebrow": "Chapitre 4",
        "title": "Statistiques descriptives en R",
        "filename": "prompt_r_stats.txt",
        "code": "Sur mon dataframe <v>prets</v> (colonnes : agence, montant, jours_retard),\nécris le code R qui donne moyenne, médiane et écart-type de <k>jours_retard</k>\npar agence, avec dplyr. Explique chaque fonction utilisée.",
        "presenterNotes": "Montrer la syntaxe dplyr (%>%) comme une autre façon de penser un pipeline, en écho au schéma Python vu plus tôt."
      },
      {
        "id": "r-test-simple",
        "type": "code-card",
        "eyebrow": "Chapitre 4",
        "title": "Un test statistique simple, expliqué",
        "filename": "prompt_r_test.txt",
        "code": "Je veux savoir si le retard moyen diffère significativement entre les agences\nde Casablanca et Tanger. Écris un test t en R et explique en une phrase\nce que signifie le résultat, <k>sans jargon statistique</k>.",
        "presenterNotes": "L'objectif n'est pas de maîtriser les tests statistiques en une slide, mais de savoir en demander un et en comprendre la conclusion."
      },
      {
        "id": "reproductibilite-probleme",
        "type": "quote-stat",
        "eyebrow": "Chapitre 5",
        "value": 15,
        "suffix": "%",
        "label": "seulement des notebooks réexécutés produisent exactement le même résultat, selon plusieurs études",
        "context": "La cause la plus fréquente : des cellules exécutées dans le désordre, avec un état caché qui ne survit pas à un redémarrage.",
        "presenterNotes": "Chiffre volontairement inquiétant pour justifier la discipline qui suit — citer la fourchette (5-15%) plutôt qu'un chiffre unique, par honnêteté sur l'incertitude."
      },
      {
        "id": "redemarrer-tout-executer",
        "type": "step-list",
        "eyebrow": "Chapitre 5",
        "title": "La discipline minimale : redémarrer et tout exécuter",
        "steps": [
          {
            "title": "Avant de partager un notebook",
            "detail": "Redémarrer le noyau et exécuter toutes les cellules dans l'ordre"
          },
          {
            "title": "Si une erreur apparaît",
            "detail": "C'est le signe qu'une cellule dépendait d'un état caché — à corriger avant de partager"
          },
          {
            "title": "Une fois propre",
            "detail": "Le notebook peut être considéré comme reproductible"
          }
        ],
        "presenterNotes": "Cette seule habitude règle la majorité des problèmes de reproductibilité rencontrés en pratique."
      },
      {
        "id": "fixer-seeds",
        "type": "principle-list",
        "eyebrow": "Chapitre 5",
        "title": "Fixer les seeds aléatoires",
        "lead": "Dès qu'un traitement utilise du hasard (échantillonnage, split train/test), le résultat doit être reproductible.",
        "items": [
          {
            "num": "01",
            "title": "Un seed par bibliothèque",
            "detail": "Il n'existe pas de seed global universel — chaque outil a le sien à fixer."
          },
          {
            "num": "02",
            "title": "Documenter le choix dans le notebook",
            "detail": "Une simple note en markdown suffit : \"seed fixé à 42 pour la reproductibilité\"."
          }
        ],
        "presenterNotes": "Petit détail technique mais qui évite une question classique : \"pourquoi j'obtiens un résultat différent en relançant ?\""
      },
      {
        "id": "environment-files",
        "type": "principle-list",
        "eyebrow": "Chapitre 5",
        "title": "Figer les versions des outils utilisés",
        "items": [
          {
            "num": "01",
            "title": "requirements.txt en Python",
            "detail": "Liste des bibliothèques avec leur version exacte."
          },
          {
            "num": "02",
            "title": "environment.yml avec Conda",
            "detail": "Même principe, en incluant aussi la version de Python elle-même."
          }
        ],
        "presenterNotes": "Message simple : un notebook qui fonctionne aujourd'hui doit encore fonctionner dans six mois — figer les versions le permet."
      },
      {
        "id": "git-minimum-analyste",
        "type": "step-list",
        "eyebrow": "Chapitre 5",
        "title": "Git, le strict minimum pour un analyste",
        "steps": [
          {
            "title": "clone puis status",
            "detail": "Récupérer un projet, voir ce qui a changé"
          },
          {
            "title": "add puis commit",
            "detail": "Sélectionner et enregistrer un instantané de son travail"
          },
          {
            "title": "push puis pull",
            "detail": "Envoyer son travail, récupérer celui des autres"
          }
        ],
        "presenterNotes": "Volontairement minimaliste — rebase, cherry-pick et GitFlow sont hors sujet pour ce niveau, à ne surtout pas introduire ici."
      },
      {
        "id": "commit-cest-quoi",
        "type": "principle-list",
        "eyebrow": "Chapitre 5",
        "title": "Un commit, concrètement",
        "items": [
          {
            "num": "01",
            "title": "Une photo de ton projet à un instant donné",
            "detail": "Pas juste le fichier modifié — tout l'état du projet à ce moment."
          },
          {
            "num": "02",
            "title": "Un message clair, pas \"update\"",
            "detail": "Ce message est ce qui rendra ton historique utile dans six mois."
          }
        ],
        "presenterNotes": "Lien direct avec le Jour 1 : c'est exactement ce que l'apprenant a déjà fait en poussant son premier dashboard sur GitHub, sans forcément le nommer."
      },
      {
        "id": "vibe-coding-definition",
        "type": "principle-list",
        "eyebrow": "Chapitre 6",
        "title": "Le vibe coding, c'est quoi exactement",
        "lead": "Un terme récent pour une pratique déjà courante : coder en guidant l'IA plutôt qu'en écrivant chaque ligne.",
        "items": [
          {
            "num": "01",
            "title": "On décrit l'intention",
            "detail": "Plutôt que la syntaxe exacte à taper."
          },
          {
            "num": "02",
            "title": "L'IA génère, on vérifie",
            "detail": "La vérification devient la compétence centrale, pas la frappe au clavier."
          }
        ],
        "presenterNotes": "Cadrer positivement — ce n'est pas de la paresse, c'est un changement de compétence centrale : de \"écrire\" à \"vérifier\"."
      },
      {
        "id": "echecs-silencieux",
        "type": "quote-stat",
        "eyebrow": "Chapitre 6",
        "value": 45,
        "suffix": "%",
        "label": "des scripts générés par IA qui s'exécutent sans erreur contiendraient un résultat mathématiquement faux, selon certaines études",
        "context": "Le code qui tourne sans message d'erreur n'est pas une preuve de justesse — c'est justement le cas le plus dangereux, car rien n'alerte visuellement.",
        "presenterNotes": "Chiffre à citer avec prudence (source secondaire, pas une étude officielle unique) — l'idée à retenir compte plus que le chiffre exact : \"ça tourne\" ne veut pas dire \"c'est juste\"."
      },
      {
        "id": "protocole-verification-ia",
        "type": "step-list",
        "eyebrow": "Chapitre 6",
        "title": "Le protocole de vérification, pas juste \"fais attention\"",
        "steps": [
          {
            "title": "Vérifier sur un petit échantillon connu",
            "detail": "Calculer le résultat à la main sur 3-4 lignes et comparer"
          },
          {
            "title": "Vérifier les comptes avant/après",
            "detail": "Le nombre de lignes après une jointure ou un filtre doit avoir un sens"
          },
          {
            "title": "Reposer la question à tête reposée",
            "detail": "Demander à Claude de relire son propre résultat d'un œil critique"
          },
          {
            "title": "Adapter l'effort au risque",
            "detail": "Une exploration rapide n'exige pas le même niveau de vérification qu'un chiffre présenté à la direction"
          }
        ],
        "presenterNotes": "Ce protocole est directement transférable à toute la semaine, pas seulement au code — le répéter renforce l'habitude."
      },
      {
        "id": "exercice-reperer-erreur",
        "type": "code-card",
        "eyebrow": "Chapitre 6 — Exercice",
        "title": "Trouve l'erreur glissée dans ce code",
        "filename": "exercice_bug_cache.py",
        "code": "par30 = prets[prets.jours_retard > 30]\ntaux = len(par30) / len(prets) * 100\nprint(f\"PAR30 : {taux}%\")\n\n# Le calcul du PAR30 utilise normalement le <k>montant</k>\n# en retard, pas le <v>nombre de prêts</v> en retard.",
        "presenterNotes": "L'erreur : ce code calcule un taux de PRÊTS en retard, pas un taux de MONTANT en retard — la vraie définition du PAR30. Laisser l'apprenant chercher avant de révéler la réponse en direct."
      },
      {
        "id": "cas-mfi-pipeline-intro",
        "type": "principle-list",
        "eyebrow": "Chapitre 7 — Le cas du jour",
        "title": "Retour au cas microfinance, version pipeline complet",
        "lead": "Même portefeuille de prêts que ce matin — cette fois avec le regard critique qu'on vient de construire.",
        "items": [
          {
            "num": "01",
            "title": "Import et nettoyage",
            "detail": "Reprendre le fichier, vérifier les types de colonnes."
          },
          {
            "num": "02",
            "title": "Analyse avec vérification",
            "detail": "Comparer le résultat Python au résultat SQL du matin — ils doivent correspondre."
          }
        ],
        "presenterNotes": "Le point de vérification croisée SQL/Python est volontaire — si les deux résultats diffèrent, c'est le signal qu'une erreur s'est glissée quelque part."
      },
      {
        "id": "cas-mfi-import-nettoyage",
        "type": "code-card",
        "eyebrow": "Chapitre 7 — Le cas du jour",
        "title": "Importer et typer correctement",
        "filename": "prompt_import_mfi.txt",
        "code": "Importe <v>prets.csv</v> avec pandas.\nVérifie que jours_retard et montant sont bien de type numérique,\npas du texte. Signale toute valeur manquante avant de continuer.",
        "presenterNotes": "Rappeler que les colonnes numériques importées comme texte sont un des pièges les plus fréquents et les plus silencieux."
      },
      {
        "id": "cas-mfi-analyse-groupby",
        "type": "code-card",
        "eyebrow": "Chapitre 7 — Le cas du jour",
        "title": "Recalculer le PAR30 et vérifier contre le SQL du matin",
        "filename": "prompt_verification_croisee.txt",
        "code": "Calcule le PAR30 par agence avec pandas (même définition que ce matin :\nmontant en retard >30j / montant total). Compare ton résultat au tableau\nSQL du matin : <v>[coller les chiffres SQL]</v>. Signale tout écart.",
        "presenterNotes": "Moment pédagogique clé de la journée : la vérification croisée SQL/Python matérialise concrètement le protocole de vérification enseigné plus tôt."
      },
      {
        "id": "cas-mfi-visualisation",
        "type": "step-list",
        "eyebrow": "Chapitre 7 — Le cas du jour",
        "title": "Visualiser le résultat final",
        "steps": [
          {
            "title": "Un graphique en barres, PAR30 par agence",
            "detail": "Palette accessible, trié du plus risqué au moins risqué"
          },
          {
            "title": "Une ligne de seuil à 5%",
            "detail": "Repère visuel immédiat pour situer chaque agence"
          }
        ],
        "presenterNotes": "Réinvestir directement les principes de visualisation et d'accessibilité vus au Jour 2, sur un jeu de données différent."
      },
      {
        "id": "cas-mfi-resultat-final",
        "type": "quote-stat",
        "eyebrow": "Chapitre 7 — Checkpoint final",
        "value": 2,
        "label": "méthodes différentes (SQL et Python), un seul et même résultat vérifié",
        "context": "C'est cette correspondance, pas la sophistication du code, qui rend ce résultat présentable à une direction.",
        "presenterNotes": "Boucler la boucle du fil rouge de la journée avant le résumé final."
      },
      {
        "id": "resume-jour3",
        "type": "principle-list",
        "eyebrow": "Résumé",
        "title": "Ce qu'on retient du Jour 03",
        "items": [
          {
            "num": "01",
            "title": "Comprendre avant de faire confiance",
            "detail": "Que ce soit une jointure SQL ou un DataFrame pandas."
          },
          {
            "num": "02",
            "title": "\"Ça tourne\" n'est pas \"c'est juste\"",
            "detail": "La vérification est la compétence centrale du vibe coding."
          },
          {
            "num": "03",
            "title": "Git et la reproductibilité ne sont pas optionnels",
            "detail": "Même pour un notebook personnel, l'habitude évite bien des pertes de temps."
          }
        ],
        "presenterNotes": "Trois idées simples à faire répéter à voix haute par les apprenants avant de passer aux livrables."
      },
      {
        "id": "livrables",
        "type": "deliverable-checklist",
        "eyebrow": "À soumettre avant le live",
        "title": "Livrables du Jour 03",
        "items": [
          {
            "title": "Requêtes SQL du cas microfinance",
            "detail": "Commentées, avec l'explication de chaque clause"
          },
          {
            "title": "Notebook Python reproductible",
            "detail": "Redémarré et exécuté en entier avant l'envoi"
          },
          {
            "title": "Analyse R",
            "detail": "Statistiques descriptives et un test simple, sur le même jeu de données"
          }
        ],
        "presenterNotes": "Rappeler la contrainte \"redémarré et exécuté en entier\" — c'est un critère de correction, pas juste une bonne pratique facultative."
      },
      {
        "id": "cloture",
        "type": "cover",
        "eyebrow": "À ce soir",
        "title": [
          "Rendez-vous en",
          "live sur Teams"
        ],
        "highlight": "live sur Teams",
        "subtitle": "Questions, blocages SQL/Python/R, et retour sur le protocole de vérification. Demain : on assemble tout en un projet de portfolio complet.",
        "meta": "ZAYN4DATA · JOUR 04 DEMAIN À LA MÊME HEURE",
        "metaHighlight": "JOUR 04 DEMAIN À LA MÊME HEURE",
        "presenterNotes": "Teaser du Jour 4 : on ne rajoute plus de nouvel outil, on assemble tout ce qui a été vu pour en faire un vrai projet de portfolio."
      }
    ]
  },
  {
    "day": 4,
    "title": "Portfolio complet + stratégie carrière",
    "date": "2026-07-16",
    "objective": "Cadrer et démarrer un projet capstone complet à partir d'un cas réel au choix, le documenter en portfolio, et optimiser son profil LinkedIn pour la recherche d'opportunités.",
    "deliverables": [
      "Projet capstone cadré : question métier, hypothèses, données collectées et nettoyées",
      "Portfolio en ligne avec au moins ce projet documenté",
      "Profil LinkedIn optimisé, réécrit en direct pendant la session"
    ],
    "chapters": [
      {
        "title": "Ouverture",
        "minutes": 3,
        "firstSlideId": "cover"
      },
      {
        "title": "Le programme de la semaine",
        "minutes": 3,
        "firstSlideId": "programme"
      },
      {
        "title": "Concepts — méthodologie de projet & éthique",
        "minutes": 20,
        "firstSlideId": "cadrer-projet"
      },
      {
        "title": "Atelier — capstone, partie 1 : cadrage",
        "minutes": 30,
        "firstSlideId": "menu-cas-capstone"
      },
      {
        "title": "Atelier — capstone, partie 2 : analyse",
        "minutes": 20,
        "firstSlideId": "analyser-avec-claude"
      },
      {
        "title": "Concepts — portfolio & LinkedIn qui convertissent",
        "minutes": 20,
        "firstSlideId": "bon-portfolio-data"
      },
      {
        "title": "Concepts — trouver des opportunités",
        "minutes": 12,
        "firstSlideId": "ou-chercher-opportunites"
      },
      {
        "title": "Résumé & livrables",
        "minutes": 5,
        "firstSlideId": "resume-jour4"
      },
      {
        "title": "Clôture",
        "minutes": 2,
        "firstSlideId": "cloture"
      }
    ],
    "slides": [
      {
        "id": "cover",
        "type": "cover",
        "eyebrow": "Jour 04 · Zayn4Data",
        "title": [
          "Portfolio complet +",
          "stratégie carrière"
        ],
        "highlight": "stratégie carrière",
        "subtitle": "On n'apprend plus de nouvel outil aujourd'hui — on assemble tout ce qui a été vu en un vrai projet de portfolio, sur un cas que tu choisis toi-même.",
        "meta": "MAÎTRISEZ L'ANALYSE DES DONNÉES AVEC CLAUDE · 16 JUILLET 2026",
        "metaHighlight": "16 JUILLET 2026",
        "presenterNotes": "Marquer le changement de nature de la journée : plus d'outil nouveau, de l'assemblage et de la mise en valeur de ce qui a déjà été appris."
      },
      {
        "id": "programme",
        "type": "day-map",
        "eyebrow": "Notre semaine ensemble",
        "title": "Le programme complet",
        "activeDay": 4,
        "days": [
          {
            "num": "01",
            "title": "Découverte de l'écosystème Claude",
            "subtitle": "Dashboard publié en ligne"
          },
          {
            "num": "02",
            "title": "Excel & Power BI boostés par Claude",
            "subtitle": "2 projets portfolio"
          },
          {
            "num": "03",
            "title": "Coding : SQL, Python, R",
            "subtitle": "1 projet transversal"
          },
          {
            "num": "04",
            "title": "Portfolio complet + stratégie carrière",
            "subtitle": "Site en ligne + plan 90 jours"
          },
          {
            "num": "05",
            "title": "Présentation & lancement",
            "subtitle": "Ton plan des 90 jours démarre"
          }
        ],
        "presenterNotes": "Rappeler que ce jour prépare directement la soutenance du Jour 5 — tout ce qui est cadré aujourd'hui sera présenté demain."
      },
      {
        "id": "cadrer-projet",
        "type": "step-list",
        "eyebrow": "Chapitre 1",
        "title": "Cadrer un projet avant d'ouvrir Excel ou Python",
        "steps": [
          {
            "title": "Poser la question métier",
            "detail": "Une phrase claire, pas un thème vague"
          },
          {
            "title": "Formuler des hypothèses",
            "detail": "Ce qu'on s'attend à trouver, et pourquoi ça compte"
          },
          {
            "title": "Écrire un plan d'analyse",
            "detail": "Quelles données, quelles étapes, quel livrable final"
          }
        ],
        "presenterNotes": "Ce cadrage en 3 étapes évite le piège le plus fréquent d'un projet portfolio : partir directement dans les données sans savoir quelle question on cherche à répondre."
      },
      {
        "id": "definir-succes-projet",
        "type": "principle-list",
        "eyebrow": "Chapitre 1",
        "title": "À quoi ressemble un capstone réussi",
        "lead": "Pas la complexité technique — la clarté de la démonstration.",
        "items": [
          {
            "num": "01",
            "title": "Une question métier précise",
            "detail": "Un recruteur doit comprendre le sujet en une phrase."
          },
          {
            "num": "02",
            "title": "Une méthode expliquée, pas juste un résultat",
            "detail": "Montrer comment on est arrivé à la conclusion compte autant que la conclusion."
          },
          {
            "num": "03",
            "title": "Une recommandation actionnable",
            "detail": "Le projet doit se terminer par une décision possible, pas juste un constat."
          }
        ],
        "presenterNotes": "Rassurer : un projet simple mais clair vaut mieux qu'un projet techniquement impressionnant mais confus."
      },
      {
        "id": "bonnes-questions-avant",
        "type": "principle-list",
        "eyebrow": "Chapitre 1",
        "title": "Les questions à se poser avant de commencer",
        "items": [
          {
            "num": "01",
            "title": "Qui va lire ce projet ?",
            "detail": "Un recruteur technique et un recruteur RH n'attendent pas la même chose."
          },
          {
            "num": "02",
            "title": "Quelles données sont réellement accessibles ?",
            "detail": "Mieux vaut un jeu de données simple et complet qu'un jeu ambitieux mais introuvable."
          },
          {
            "num": "03",
            "title": "Combien de temps ce projet peut-il prendre ?",
            "detail": "Un capstone réaliste en une journée vaut mieux qu'un projet abandonné à moitié fait."
          }
        ],
        "presenterNotes": "Encourager à choisir un scope réaliste pour la journée — le projet pourra toujours être enrichi après la formation."
      },
      {
        "id": "ethique-principes",
        "type": "principle-list",
        "eyebrow": "Chapitre 1 — Éthique",
        "title": "Trois principes pour un usage responsable de la donnée",
        "items": [
          {
            "num": "01",
            "title": "Anonymiser par défaut",
            "detail": "Même dans un projet d'entraînement, retirer les identifiants directs devient un réflexe."
          },
          {
            "num": "02",
            "title": "Vérifier la représentativité",
            "detail": "Un échantillon qui exclut une partie de la population fausse toute conclusion tirée de lui."
          },
          {
            "num": "03",
            "title": "Rester transparent sur la méthode",
            "detail": "Dire clairement quelles données ont été utilisées et comment, jamais les présenter comme plus complètes qu'elles ne le sont."
          }
        ],
        "presenterNotes": "Ces trois principes seront directement appliqués sur le projet capstone que chacun choisit dans quelques slides."
      },
      {
        "id": "consentement-collecte",
        "type": "principle-list",
        "eyebrow": "Chapitre 1 — Éthique",
        "title": "Si tu collectes de vraies données pour ton capstone",
        "lead": "Valable si le projet s'appuie sur une enquête ou des données de personnes réelles autour de toi.",
        "items": [
          {
            "num": "01",
            "title": "Informer avant de collecter",
            "detail": "Les personnes doivent savoir à quoi serviront leurs réponses."
          },
          {
            "num": "02",
            "title": "Ne collecter que ce qui est nécessaire",
            "detail": "Chaque champ demandé doit avoir une utilité claire pour l'analyse."
          }
        ],
        "presenterNotes": "Concerne surtout les apprenants qui choisiraient de bâtir leur capstone sur une mini-enquête personnelle plutôt que sur un des cas fournis."
      },
      {
        "id": "biais-exemple",
        "type": "comparison",
        "eyebrow": "Chapitre 1 — Éthique",
        "title": "Un échantillon biaisé change la conclusion",
        "columns": [
          {
            "label": "Échantillon biaisé",
            "items": [
              "Collecté uniquement par SMS",
              "Exclut les foyers sans téléphone actif",
              "Conclusion : \"tout va bien\" — fausse"
            ]
          },
          {
            "label": "Échantillon représentatif",
            "items": [
              "Combine plusieurs canaux de collecte",
              "Inclut les zones rurales et les plus vulnérables",
              "Conclusion fiable, sur laquelle on peut agir"
            ],
            "winner": true
          }
        ],
        "presenterNotes": "Le biais n'est presque jamais volontaire — il vient souvent du canal de collecte le plus facile, pas du plus représentatif."
      },
      {
        "id": "exemple-biais-donnees-table",
        "type": "data-table",
        "eyebrow": "Chapitre 1 — Éthique",
        "title": "Repérer un biais de collecte",
        "columns": [
          "Source de collecte",
          "Ce qu'elle capture vraiment",
          "Biais introduit"
        ],
        "rows": [
          {
            "cells": [
              "Enquête par SMS uniquement",
              "Seulement les foyers avec téléphone actif",
              "Exclut les plus vulnérables, souvent les plus concernés"
            ],
            "critical": true
          },
          {
            "cells": [
              "Collecte en zone urbaine seulement",
              "Uniquement les profils urbains",
              "Sous-représente la réalité rurale"
            ],
            "critical": true
          },
          {
            "cells": [
              "Volontaires auto-inscrits",
              "Les personnes déjà motivées à participer",
              "Sur-représente les cas déjà engagés"
            ],
            "critical": false
          }
        ],
        "presenterNotes": "Faire deviner le biais avant de révéler la colonne de droite — l'exercice ancre mieux la notion qu'une explication directe."
      },
      {
        "id": "lois-protection-donnees",
        "type": "data-table",
        "eyebrow": "Chapitre 1 — Rappel",
        "title": "La loi de protection des données et conformité",
        "lead": "Rappel de gouvernance avant d'ingérer vos données réelles pour le capstone.",
        "columns": [
          "Pays / Région",
          "Loi",
          "Autorité",
          "Sanction maximale"
        ],
        "rows": [
          {
            "cells": [
              "Maroc 🇲🇦",
              "Loi n° 09-08",
              "CNDP",
              "300 000 MAD + sanctions pénales"
            ],
            "critical": true
          },
          {
            "cells": [
              "Union Européenne 🇪🇺",
              "RGPD (GDPR)",
              "CNIL / EDPB",
              "20M € ou 4% du CA mondial"
            ],
            "critical": false
          },
          {
            "cells": [
              "Sénégal 🇸🇳",
              "Loi n° 2008-12",
              "CDP",
              "100M FCFA + peines pénales"
            ],
            "critical": false
          },
          {
            "cells": [
              "Côte d'Ivoire 🇨🇮",
              "Loi n° 2013-450",
              "ARTCI",
              "500M FCFA (récidive)"
            ],
            "critical": false
          }
        ],
        "presenterNotes": "Répétition volontaire du tableau du Jour 1 — mieux vaut le revoir une deuxième fois juste avant de s'en servir que de compter sur un souvenir de trois jours."
      },
      {
        "id": "menu-cas-capstone",
        "type": "principle-list",
        "eyebrow": "Chapitre 2 — Le projet capstone",
        "title": "Choisis ton cas pour la suite de la semaine",
        "lead": "Trois cas nouveaux, ou continuer à approfondir un cas déjà vu cette semaine — à toi de choisir.",
        "items": [
          {
            "num": "01",
            "title": "Distribution FMCG",
            "detail": "Optimiser la couverture de points de vente pour un distributeur régional."
          },
          {
            "num": "02",
            "title": "Coopérative agricole",
            "detail": "Traçabilité et paiement des producteurs d'une coopérative de cacao."
          },
          {
            "num": "03",
            "title": "Résiliation télécom / mobile money",
            "detail": "Prédire quels abonnés prépayés risquent de partir."
          },
          {
            "num": "04",
            "title": "Approfondir un cas déjà vu",
            "detail": "Le programme ONG du Jour 2 ou le portefeuille microfinance du Jour 3, en plus de détail."
          }
        ],
        "presenterNotes": "Laisser 2-3 minutes de réflexion avant de continuer — le choix du cas engage le reste de la journée et de la soutenance de demain."
      },
      {
        "id": "cas-fmcg-detail",
        "type": "principle-list",
        "eyebrow": "Chapitre 2 — Option 1",
        "title": "Distribution FMCG — le contexte",
        "lead": "Exemple pédagogique inspiré de pratiques réelles de distribution en Afrique — pas les données d'une entreprise nommée.",
        "items": [
          {
            "num": "01",
            "title": "Le problème",
            "detail": "Un distributeur ne sait pas quels points de vente informels visiter en priorité."
          },
          {
            "num": "02",
            "title": "La décision à informer",
            "detail": "Quels points de vente ajouter ou retirer d'une tournée de livraison."
          }
        ],
        "presenterNotes": "Insister sur le fait que la donnée informelle (kiosques, marchés) domine le commerce africain — un vrai défi de collecte à mentionner si le temps le permet."
      },
      {
        "id": "cas-fmcg-donnees",
        "type": "data-table",
        "eyebrow": "Chapitre 2 — Option 1",
        "title": "Colonnes types du dataset FMCG",
        "columns": [
          "Point de vente",
          "Type de canal",
          "Stock restant",
          "Rupture"
        ],
        "rows": [
          {
            "cells": [
              "PDV-014",
              "Kiosque",
              "3 unités",
              "Non"
            ],
            "critical": false
          },
          {
            "cells": [
              "PDV-027",
              "Marché ouvert",
              "0 unité",
              "Oui"
            ],
            "critical": true
          },
          {
            "cells": [
              "PDV-041",
              "Supérette",
              "22 unités",
              "Non"
            ],
            "critical": false
          }
        ],
        "presenterNotes": "Ce type de structure de données se construit facilement avec un tableau synthétique — pas besoin d'un vrai accès terrain pour s'exercer."
      },
      {
        "id": "cas-cacao-detail",
        "type": "principle-list",
        "eyebrow": "Chapitre 2 — Option 2",
        "title": "Coopérative agricole & Terroir — le contexte",
        "lead": "Inspiré des coopératives agricoles marocaines (Huile d'Argan, Oléiculture, Agrumes Souss-Massa & Béni Mellal) — exemple pédagogique de traçabilité.",
        "items": [
          {
            "num": "01",
            "title": "Le problème",
            "detail": "Vérifier que chaque producteur et adhérent est rémunéré équitablement et que les parcelles sont certifiées IGP/Bio."
          },
          {
            "num": "02",
            "title": "La décision à informer",
            "detail": "Quelles parcelles ou lots coopératifs présentent un risque de non-conformité ou d'anomalie de rendement."
          }
        ],
        "presenterNotes": "Cas d'excellence pour les filières agro-industrielles et produits de terroir marocains (Plan Génération Green)."
      },
      {
        "id": "cas-cacao-donnees",
        "type": "data-table",
        "eyebrow": "Chapitre 2 — Option 2",
        "title": "Colonnes types du dataset coopérative",
        "columns": [
          "Producteur",
          "Coopérative / Région",
          "Volume (kg)",
          "Prix payé / kg"
        ],
        "rows": [
          {
            "cells": [
              "PROD-102",
              "Coop Argan Souss",
              "340 kg",
              "120 DH"
            ],
            "critical": false
          },
          {
            "cells": [
              "PROD-118",
              "Coop Argan Souss",
              "12 kg",
              "120 DH"
            ],
            "critical": true
          },
          {
            "cells": [
              "PROD-145",
              "Coop Atlas Olive",
              "280 kg",
              "95 DH"
            ],
            "critical": false
          }
        ],
        "presenterNotes": "Le volume anormalement faible (12 kg) est un signal à faire remarquer — soit une erreur de saisie, soit un cas réellement particulier à vérifier."
      },
      {
        "id": "cas-mobile-money-detail",
        "type": "principle-list",
        "eyebrow": "Chapitre 2 — Option 3",
        "title": "Résiliation mobile — le contexte",
        "lead": "Inspiré d'études sectorielles publiques sur le prépayé en Afrique — exemple pédagogique, pas les données d'un opérateur nommé.",
        "items": [
          {
            "num": "01",
            "title": "Le problème",
            "detail": "Le prépayé ne \"résilie\" jamais formellement — il devient juste inactif."
          },
          {
            "num": "02",
            "title": "La décision à informer",
            "detail": "Quels abonnés cibler avec une offre de rétention avant qu'ils ne partent."
          }
        ],
        "presenterNotes": "Point pédagogique intéressant : la résiliation silencieuse (pas de bouton \"annuler\") change complètement la façon de la détecter."
      },
      {
        "id": "cas-mobile-donnees",
        "type": "data-table",
        "eyebrow": "Chapitre 2 — Option 3",
        "title": "Colonnes types du dataset mobile",
        "columns": [
          "Abonné",
          "Ancienneté (jours)",
          "Taux d'appels coupés",
          "Dernière activité"
        ],
        "rows": [
          {
            "cells": [
              "AB-3391",
              "410",
              "2%",
              "il y a 2 jours"
            ],
            "critical": false
          },
          {
            "cells": [
              "AB-3402",
              "38",
              "14%",
              "il y a 41 jours"
            ],
            "critical": true
          },
          {
            "cells": [
              "AB-3417",
              "220",
              "3%",
              "il y a 5 jours"
            ],
            "critical": false
          }
        ],
        "presenterNotes": "Un taux d'appels coupés élevé combiné à une longue inactivité est le signal combiné classique d'un abonné en train de partir."
      },
      {
        "id": "choisir-son-cas",
        "type": "decision-table",
        "eyebrow": "Chapitre 2",
        "title": "Quel cas correspond à ton profil",
        "rows": [
          {
            "want": "Tu aimes la logistique et le terrain",
            "tool": "Distribution FMCG"
          },
          {
            "want": "Tu t'intéresses à l'agro-industrie ou l'export",
            "tool": "Coopérative cacao"
          },
          {
            "want": "Tu veux un cas orienté prédiction / risque",
            "tool": "Résiliation mobile"
          },
          {
            "want": "Tu préfères aller plus loin sur un cas déjà maîtrisé",
            "tool": "ONG (Jour 2) ou microfinance (Jour 3)"
          }
        ],
        "presenterNotes": "Dernier repère avant que chacun tranche définitivement son choix pour le reste de la journée."
      },
      {
        "id": "hypotheses-avec-claude",
        "type": "code-card",
        "eyebrow": "Chapitre 2",
        "title": "Formuler ses hypothèses avec Claude",
        "filename": "prompt_hypotheses_capstone.txt",
        "code": "Je travaille sur <v>[ton cas choisi]</v>. Ma question métier est :\n<v>[ta question]</v>.\n\nAide-moi à formuler 3 hypothèses testables avec les données disponibles,\net pour chacune, dis-moi quelle colonne du dataset permettrait de la vérifier.",
        "presenterNotes": "Montrer que Claude peut aider dès la phase de cadrage, pas seulement au moment du calcul — beaucoup d'apprenants ignorent cet usage."
      },
      {
        "id": "plan-analyse-template",
        "type": "step-list",
        "eyebrow": "Chapitre 2",
        "title": "Un modèle de plan d'analyse en 4 étapes",
        "steps": [
          {
            "title": "Nettoyer et vérifier les données",
            "detail": "Même réflexe que toute la semaine, sur ce nouveau dataset"
          },
          {
            "title": "Explorer les grandes tendances",
            "detail": "Avant de creuser un détail précis, regarder l'ensemble"
          },
          {
            "title": "Tester chaque hypothèse",
            "detail": "Une par une, en notant ce qui est confirmé ou infirmé"
          },
          {
            "title": "Formuler une recommandation",
            "detail": "Ce que la décision métier finale devrait être"
          }
        ],
        "presenterNotes": "Ce modèle de plan est volontairement réutilisable pour n'importe quel projet futur, pas seulement ce capstone."
      },
      {
        "id": "structurer-donnees",
        "type": "step-list",
        "eyebrow": "Chapitre 2",
        "title": "Collecter et structurer les données de ton cas",
        "steps": [
          {
            "title": "Construire un jeu de données synthétique réaliste",
            "detail": "À partir des colonnes types vues plus tôt, avec l'aide de Claude"
          },
          {
            "title": "Vérifier la cohérence avant d'analyser",
            "detail": "Les mêmes réflexes de nettoyage que le Jour 2 s'appliquent ici"
          }
        ],
        "presenterNotes": "Rassurer : construire un jeu de données synthétique cohérent est une compétence légitime pour s'entraîner, pas une triche — le préciser clairement dans le portfolio final."
      },
      {
        "id": "analyser-avec-claude",
        "type": "code-card",
        "eyebrow": "Chapitre 3",
        "title": "Lancer l'analyse de ton cas",
        "filename": "prompt_analyse_capstone.txt",
        "code": "Voici mon dataset nettoyé pour <v>[ton cas]</v>.\nTeste mes 3 hypothèses une par une, en précisant pour chacune\nsi elle est confirmée, infirmée, ou à nuancer — avec le chiffre à l'appui.",
        "presenterNotes": "Le prompt demande explicitement un verdict par hypothèse, pas une réponse floue — c'est ce qui rend le résultat exploitable pour la suite."
      },
      {
        "id": "visualiser-resultats-capstone",
        "type": "step-list",
        "eyebrow": "Chapitre 3",
        "title": "Visualiser ce qui soutient la recommandation",
        "steps": [
          {
            "title": "Un visuel par hypothèse confirmée",
            "detail": "Pas un mur de graphiques — seulement ce qui appuie la conclusion"
          },
          {
            "title": "Palette accessible",
            "detail": "Même réflexe qu'au Jour 2 et au Jour 3"
          }
        ],
        "presenterNotes": "Rappeler une dernière fois la règle de sobriété visuelle — un projet capstone se juge sur la clarté, pas sur le nombre de graphiques."
      },
      {
        "id": "recommandations-actionnables",
        "type": "code-card",
        "eyebrow": "Chapitre 3",
        "title": "Formuler une recommandation actionnable",
        "filename": "prompt_recommandation_capstone.txt",
        "code": "À partir de mes résultats, rédige <v>une recommandation unique</v>,\nformulée comme une décision que quelqu'un pourrait prendre dès demain.\nPas de généralité — une action précise, avec le chiffre qui la justifie.",
        "presenterNotes": "Le mot \"unique\" est volontaire — un projet qui recommande dix choses à la fois ne recommande en réalité rien de priorisé."
      },
      {
        "id": "capstone-checkpoint",
        "type": "quote-stat",
        "eyebrow": "Chapitre 3 — Checkpoint",
        "value": 1,
        "label": "question métier, testée, avec une recommandation qu'on peut défendre demain",
        "context": "C'est exactement ce que tu présenteras à la soutenance du Jour 5 — pas besoin de plus.",
        "presenterNotes": "Rassurer une dernière fois sur le scope attendu avant de passer à la partie portfolio de la journée."
      },
      {
        "id": "bon-portfolio-data",
        "type": "principle-list",
        "eyebrow": "Chapitre 4",
        "title": "Ce qui rend un portfolio data convaincant",
        "items": [
          {
            "num": "01",
            "title": "Peu de projets, mais bien racontés",
            "detail": "Trois projets clairs valent mieux que dix projets à moitié documentés."
          },
          {
            "num": "02",
            "title": "Le \"pourquoi\" avant le \"comment\"",
            "detail": "Commencer par le problème métier, pas par la liste des outils utilisés."
          },
          {
            "num": "03",
            "title": "Une preuve de résultat",
            "detail": "Un chiffre, une capture d'écran, un lien vers le dashboard réel."
          }
        ],
        "presenterNotes": "Ce filtre s'applique directement au capstone qui vient d'être cadré — c'est lui qui va devenir la pièce centrale du portfolio."
      },
      {
        "id": "erreurs-portfolio-debutant",
        "type": "principle-list",
        "eyebrow": "Chapitre 4",
        "title": "Trois erreurs fréquentes de portfolio débutant",
        "items": [
          {
            "num": "01",
            "title": "Lister des certificats plutôt que des projets",
            "detail": "Un certificat prouve qu'on a suivi une formation, pas qu'on sait produire un résultat."
          },
          {
            "num": "02",
            "title": "Montrer du code sans contexte",
            "detail": "Sans la question métier, le code le plus élégant ne dit rien à un recruteur."
          },
          {
            "num": "03",
            "title": "Ne jamais mettre à jour",
            "detail": "Un portfolio figé depuis un an donne l'impression d'un projet abandonné."
          }
        ],
        "presenterNotes": "Ces trois erreurs sont probablement déjà présentes dans certains profils de la promotion — l'occasion de les corriger dès aujourd'hui."
      },
      {
        "id": "structurer-projet-vitrine",
        "type": "step-list",
        "eyebrow": "Chapitre 4",
        "title": "Structurer la page de ton projet capstone",
        "steps": [
          {
            "title": "Le contexte en 2-3 phrases",
            "detail": "Le problème métier, pour qui, pourquoi ça compte"
          },
          {
            "title": "La méthode, résumée",
            "detail": "Les grandes étapes, sans détailler chaque ligne de code"
          },
          {
            "title": "Le résultat et la recommandation",
            "detail": "Ce qui a été trouvé, et ce qu'on ferait avec"
          }
        ],
        "presenterNotes": "Cette structure en 3 blocs est directement transposable au capstone cadré plus tôt dans la journée."
      },
      {
        "id": "github-notion-site",
        "type": "decision-table",
        "eyebrow": "Chapitre 4",
        "title": "GitHub, Notion ou mini-site",
        "rows": [
          {
            "want": "Montrer du code proprement organisé",
            "tool": "GitHub"
          },
          {
            "want": "Rédiger une présentation riche, sans coder de page web",
            "tool": "Notion"
          },
          {
            "want": "Avoir une vitrine personnalisée et mémorable",
            "tool": "Mini-site (Claude Design)"
          }
        ],
        "presenterNotes": "Rappeler qu'il n'y a pas de bonne réponse unique — l'essentiel est que le lien existe et soit à jour, pas la plateforme choisie."
      },
      {
        "id": "construire-claude-design",
        "type": "code-card",
        "eyebrow": "Chapitre 4",
        "previewLabel": "→ aperçu du mini-site portfolio, à l'écran en direct",
        "title": "Construire une page portfolio avec Claude",
        "filename": "prompt_portfolio_design.txt",
        "code": "Construis une page portfolio simple présentant mon projet <v>[ton cas]</v> :\ncontexte, méthode, résultat, recommandation. Design sobre,\nune seule couleur d'accent, optimisé mobile.",
        "presenterNotes": "Montrer en direct la génération d'une première version, à personnaliser ensuite pendant le reste de la session."
      },
      {
        "id": "linkedin-titre-infos",
        "type": "principle-list",
        "eyebrow": "Chapitre 4",
        "title": "LinkedIn : le titre et la section Infos",
        "items": [
          {
            "num": "01",
            "title": "Le titre n'est pas un poste, c'est une promesse",
            "detail": "\"Data Analyst\" seul en dit moins que \"J'aide les organisations à décider avec leurs données\"."
          },
          {
            "num": "02",
            "title": "La section Infos raconte une trajectoire",
            "detail": "Pas une liste de compétences — une histoire cohérente, avec le capstone comme preuve."
          }
        ],
        "presenterNotes": "Encourager à réécrire ces deux sections en direct pendant la session, pas \"plus tard ce soir\"."
      },
      {
        "id": "linkedin-projets-avant",
        "type": "principle-list",
        "eyebrow": "Chapitre 4",
        "title": "Mettre ses projets en avant",
        "items": [
          {
            "num": "01",
            "title": "La section Projets, pas juste Expérience",
            "detail": "LinkedIn a un espace dédié, souvent sous-utilisé."
          },
          {
            "num": "02",
            "title": "Un lien direct vers le portfolio",
            "detail": "Jamais \"disponible sur demande\" — le lien doit être cliquable immédiatement."
          }
        ],
        "presenterNotes": "Vérifier collectivement que chacun a bien un lien cliquable, pas juste une mention textuelle du projet."
      },
      {
        "id": "mots-cles-recruteurs",
        "type": "principle-list",
        "eyebrow": "Chapitre 4",
        "title": "Les mots-clés que les recruteurs recherchent",
        "items": [
          {
            "num": "01",
            "title": "Les outils précis, pas des catégories vagues",
            "detail": "\"Power BI, SQL, Python\" plutôt que \"outils data\"."
          },
          {
            "num": "02",
            "title": "Le secteur d'application si pertinent",
            "detail": "\"Santé\", \"microfinance\", \"agro-industrie\" aident un recruteur sectoriel à te trouver."
          }
        ],
        "presenterNotes": "Suggérer d'utiliser Claude pour relire son profil et suggérer les mots-clés manquants par rapport à une offre type."
      },
      {
        "id": "ou-chercher-opportunites",
        "type": "ecosystem-grid",
        "eyebrow": "Chapitre 5",
        "title": "Où chercher des opportunités",
        "items": [
          {
            "icon": "globe",
            "title": "Plateformes d'offres",
            "detail": "LinkedIn Jobs, portails sectoriels"
          },
          {
            "icon": "rocket",
            "title": "Freelance",
            "detail": "Missions courtes pour construire son historique"
          },
          {
            "icon": "cowork",
            "title": "Réseau direct",
            "detail": "Anciens collègues, groupes de formation"
          },
          {
            "icon": "chat",
            "title": "Prospection",
            "detail": "Contacter directement une organisation ciblée"
          }
        ],
        "presenterNotes": "Insister sur le réseau et la prospection directe — souvent sous-exploités par rapport aux plateformes d'offres classiques."
      },
      {
        "id": "prospection-directe",
        "type": "step-list",
        "eyebrow": "Chapitre 5",
        "title": "Prospecter une organisation qui t'intéresse",
        "steps": [
          {
            "title": "Identifier un problème visible chez elle",
            "detail": "Un dashboard absent, un rapport qui pourrait être plus clair"
          },
          {
            "title": "Proposer une preuve, pas juste une candidature",
            "detail": "Un mini-audit ou une maquette, comme celles construites cette semaine"
          }
        ],
        "presenterNotes": "Le capstone de la journée devient ici un modèle réutilisable : la même démarche peut être refaite pour une vraie organisation ciblée."
      },
      {
        "id": "exemple-message-recruteur",
        "type": "code-card",
        "eyebrow": "Chapitre 5",
        "title": "Rédiger un message de prospection",
        "filename": "prompt_message_prospection.txt",
        "code": "Aide-moi à écrire un message court pour <v>[organisation ciblée]</v>,\nqui mentionne un problème précis que j'ai remarqué et propose\nune preuve concrète (mon projet <v>[ton cas capstone]</v>) plutôt qu'une candidature générique.",
        "presenterNotes": "Montrer que le capstone du jour sert de preuve concrète et réutilisable dans une vraie démarche de prospection, pas seulement pour la formation."
      },
      {
        "id": "proposition-gagnante",
        "type": "principle-list",
        "eyebrow": "Chapitre 5",
        "title": "Ce qui distingue une proposition gagnante",
        "items": [
          {
            "num": "01",
            "title": "Spécifique à l'organisation",
            "detail": "Jamais un message copié-collé envoyé à dix organisations différentes."
          },
          {
            "num": "02",
            "title": "Centrée sur leur problème, pas sur tes compétences",
            "detail": "Le \"je sais faire X\" vient après le \"vous avez ce problème précis\"."
          }
        ],
        "presenterNotes": "Clore le chapitre opportunités sur ce principe — il résume tout ce qui vient d'être vu sur la prospection."
      },
      {
        "id": "resume-jour4",
        "type": "principle-list",
        "eyebrow": "Résumé",
        "title": "Ce qu'on retient du Jour 04",
        "items": [
          {
            "num": "01",
            "title": "Un cadrage clair vaut plus qu'un outil sophistiqué",
            "detail": "La question métier précède toujours la technique."
          },
          {
            "num": "02",
            "title": "Un portfolio se juge sur la clarté, pas le volume",
            "detail": "Peu de projets, bien racontés, avec une preuve de résultat."
          },
          {
            "num": "03",
            "title": "La prospection peut réutiliser le capstone",
            "detail": "Le projet du jour devient un argument concret face à une vraie organisation."
          }
        ],
        "presenterNotes": "Trois idées à faire répéter avant les livrables — elles préparent directement la posture attendue à la soutenance de demain."
      },
      {
        "id": "livrables",
        "type": "deliverable-checklist",
        "eyebrow": "À soumettre avant le live",
        "title": "Livrables du Jour 04",
        "items": [
          {
            "title": "Projet capstone cadré",
            "detail": "Question métier, hypothèses, données collectées et nettoyées"
          },
          {
            "title": "Portfolio en ligne",
            "detail": "Avec au moins ce projet documenté et un lien cliquable"
          },
          {
            "title": "Profil LinkedIn optimisé",
            "detail": "Titre, section Infos, projets en avant"
          }
        ],
        "presenterNotes": "Rappeler que le capstone sera présenté demain — ce n'est pas un livrable isolé, c'est la base de la soutenance du Jour 5."
      },
      {
        "id": "cloture",
        "type": "cover",
        "eyebrow": "À ce soir",
        "title": [
          "Rendez-vous en",
          "live sur Teams"
        ],
        "highlight": "live sur Teams",
        "subtitle": "Questions sur ton capstone, ton portfolio ou ton profil LinkedIn. Demain : soutenance, certification, et lancement de ton plan des 90 jours.",
        "meta": "ZAYN4DATA · JOUR 05 DEMAIN À LA MÊME HEURE",
        "metaHighlight": "JOUR 05 DEMAIN À LA MÊME HEURE",
        "presenterNotes": "Rappeler que le live de ce soir est l'occasion de débloquer un capstone qui coince avant la soutenance du lendemain."
      }
    ]
  },
  {
    "day": 5,
    "title": "Présentation & lancement",
    "date": "2026-07-17",
    "objective": "Soutenir son projet capstone devant le groupe, comprendre les modalités de certification, et repartir avec un plan d'action concret pour les 90 prochains jours.",
    "deliverables": [
      "Projet capstone finalisé et documenté, présenté à l'oral",
      "Plan d'action des 90 jours, rédigé avec Claude",
      "Certification passée"
    ],
    "chapters": [
      {
        "title": "Ouverture",
        "minutes": 3,
        "firstSlideId": "cover"
      },
      {
        "title": "Le programme de la semaine",
        "minutes": 3,
        "firstSlideId": "programme"
      },
      {
        "title": "Automatisation & productivité",
        "minutes": 12,
        "firstSlideId": "cowork-intro"
      },
      {
        "title": "Préparer la soutenance",
        "minutes": 15,
        "firstSlideId": "structure-soutenance"
      },
      {
        "title": "Soutenances",
        "minutes": 35,
        "firstSlideId": "grille-evaluation"
      },
      {
        "title": "Certification",
        "minutes": 12,
        "firstSlideId": "modalites-examen"
      },
      {
        "title": "Ton plan des 90 jours",
        "minutes": 12,
        "firstSlideId": "pourquoi-plan-90-jours"
      },
      {
        "title": "Continuer après la formation",
        "minutes": 4,
        "firstSlideId": "ressources-pour-continuer"
      },
      {
        "title": "Résumé & livrables",
        "minutes": 4,
        "firstSlideId": "resume-jour5"
      },
      {
        "title": "Clôture",
        "minutes": 3,
        "firstSlideId": "mot-de-la-fin"
      }
    ],
    "slides": [
      {
        "id": "cover",
        "type": "cover",
        "eyebrow": "Jour 05 · Zayn4Data",
        "title": [
          "Présentation &",
          "lancement"
        ],
        "highlight": "lancement",
        "subtitle": "Dernier jour. Tu vas présenter ton projet, obtenir ta certification, et repartir avec un plan concret pour les 90 prochains jours.",
        "meta": "MAÎTRISEZ L'ANALYSE DES DONNÉES AVEC CLAUDE · 17 JUILLET 2026",
        "metaHighlight": "17 JUILLET 2026",
        "presenterNotes": "Marquer solennellement que c'est le dernier jour — le ton change, on passe de l'apprentissage à la démonstration de ce qui a été appris."
      },
      {
        "id": "programme",
        "type": "day-map",
        "eyebrow": "Notre semaine ensemble",
        "title": "Le programme complet",
        "activeDay": 5,
        "days": [
          {
            "num": "01",
            "title": "Découverte de l'écosystème Claude",
            "subtitle": "Dashboard publié en ligne"
          },
          {
            "num": "02",
            "title": "Excel & Power BI boostés par Claude",
            "subtitle": "2 projets portfolio"
          },
          {
            "num": "03",
            "title": "Coding : SQL, Python, R",
            "subtitle": "1 projet transversal"
          },
          {
            "num": "04",
            "title": "Portfolio complet + stratégie carrière",
            "subtitle": "Site en ligne + plan 90 jours"
          },
          {
            "num": "05",
            "title": "Présentation & lancement",
            "subtitle": "Ton plan des 90 jours démarre"
          }
        ],
        "presenterNotes": "Dernier passage sur cette vue d'ensemble — l'occasion de mesurer collectivement le chemin parcouru depuis lundi."
      },
      {
        "id": "cowork-intro",
        "type": "principle-list",
        "eyebrow": "Chapitre 1",
        "title": "Claude Cowork, pour aller plus loin que le prompt unique",
        "lead": "Vu en un mot au Jour 1 — aujourd'hui, on regarde comment ça s'utilise vraiment au quotidien.",
        "items": [
          {
            "num": "01",
            "title": "Un espace de travail partagé avec Claude",
            "detail": "Plutôt qu'une conversation isolée, un contexte qui persiste entre les sessions."
          },
          {
            "num": "02",
            "title": "Pensé pour des tâches récurrentes",
            "detail": "Un rapport hebdomadaire, un suivi régulier — pas un usage ponctuel."
          }
        ],
        "presenterNotes": "Repartir du mot déjà posé au Jour 1 pour ne pas donner l'impression d'un concept totalement nouveau à cette étape tardive de la semaine."
      },
      {
        "id": "agents-automatiser",
        "type": "agent-boxes",
        "eyebrow": "Chapitre 1",
        "title": "Ce qu'on délègue, ce qu'on garde",
        "boxes": [
          {
            "badge": "AGENT",
            "title": "Ce qu'un agent peut faire",
            "detail": "Exécuter plusieurs étapes vers un objectif fixé, sans validation à chaque clic intermédiaire.",
            "highlight": true
          },
          {
            "badge": "CONTRÔLE HUMAIN",
            "title": "Ce qui reste sous ton contrôle",
            "detail": "La décision finale, l'accès aux données sensibles, et toute communication envoyée à l'extérieur."
          }
        ],
        "presenterNotes": "Reprendre exactement le duo Agent/MCP posé au Jour 1, mais avec un vrai exemple d'usage cette fois — voir la slide suivante."
      },
      {
        "id": "exemple-agent-rapport",
        "type": "workflow-flow",
        "eyebrow": "Chapitre 1",
        "title": "Exemple : automatiser un rapport hebdomadaire",
        "nodes": [
          {
            "icon": "clock",
            "label": "Chaque lundi",
            "detail": "déclenchement automatique"
          },
          {
            "icon": "database",
            "label": "Collecte",
            "detail": "les chiffres de la semaine"
          },
          {
            "icon": "chart-bar",
            "label": "Analyse",
            "detail": "génère le résumé"
          },
          {
            "icon": "chat",
            "label": "Envoi",
            "detail": "au responsable, à valider",
            "highlight": true
          }
        ],
        "presenterNotes": "Insister sur la dernière étape : \"à valider\", pas \"envoyé automatiquement\" — l'humain garde la dernière main sur ce qui sort réellement."
      },
      {
        "id": "mcp-rappel",
        "type": "principle-list",
        "eyebrow": "Chapitre 1 — Rappel",
        "title": "MCP, en une phrase",
        "items": [
          {
            "num": "01",
            "title": "Un moyen sécurisé de connecter tes outils",
            "detail": "Drive, GitHub, une base de données — sans copier-coller manuel."
          },
          {
            "num": "02",
            "title": "C'est ce qui rend un agent vraiment utile",
            "detail": "Sans connexion à de vraies données, un agent ne peut qu'imaginer des réponses."
          }
        ],
        "presenterNotes": "Rappel volontairement bref — le concept a déjà été posé au Jour 1, on ne fait que le raccrocher à l'automatisation."
      },
      {
        "id": "securite-avant-automatiser",
        "type": "principle-list",
        "eyebrow": "Chapitre 1 — Sécurité",
        "title": "Plus d'automatisation, plus de vigilance",
        "lead": "Connecter un agent à de vrais outils augmente ce qu'il peut faire — et ce qu'il peut casser.",
        "items": [
          {
            "num": "01",
            "title": "Limiter les accès au strict nécessaire",
            "detail": "Un agent qui génère un rapport n'a pas besoin d'un accès en écriture à toute la base."
          },
          {
            "num": "02",
            "title": "Superviser les premières exécutions",
            "detail": "Vérifier manuellement les premiers résultats avant de laisser tourner sans supervision."
          }
        ],
        "presenterNotes": "Boucler avec la discipline de vérification vue au Jour 3 — l'automatisation ne dispense jamais de la vérification, elle la rend juste moins fréquente."
      },
      {
        "id": "limites-automatisation",
        "type": "principle-list",
        "eyebrow": "Chapitre 1",
        "title": "Ce qu'on ne délègue jamais complètement",
        "items": [
          {
            "num": "01",
            "title": "La décision finale",
            "detail": "Un agent recommande, une personne décide."
          },
          {
            "num": "02",
            "title": "Les données sensibles sans relecture",
            "detail": "Toujours repasser par la règle d'anonymisation vue en début de semaine."
          },
          {
            "num": "03",
            "title": "La communication externe non relue",
            "detail": "Un message envoyé au nom de l'organisation se relit toujours avant departure."
          }
        ],
        "presenterNotes": "Clore le chapitre automatisation sur une note de prudence équilibrée, ni technophobe ni naïve."
      },
      {
        "id": "structure-soutenance",
        "type": "step-list",
        "eyebrow": "Chapitre 2",
        "title": "La structure d'une bonne soutenance",
        "steps": [
          {
            "title": "Le contexte, en 30 secondes",
            "detail": "La question métier, pour qui, pourquoi ça compte"
          },
          {
            "title": "La méthode, en 1 minute",
            "detail": "Les grandes étapes, sans détail technique excessif"
          },
          {
            "title": "Le résultat et la recommandation, en 1 minute",
            "detail": "Ce qui a été trouvé, et l'action qui en découle"
          },
          {
            "title": "Les questions, 2-3 minutes",
            "detail": "Le moment où le jury vérifie la compréhension réelle du projet"
          }
        ],
        "presenterNotes": "Cette structure tient sous 5 minutes de présentation — insister sur le fait que la brièveté est un signe de maîtrise, pas un manque de contenu."
      },
      {
        "id": "exemple-mauvaise-soutenance",
        "type": "comparison",
        "eyebrow": "Chapitre 2",
        "title": "Deux façons de présenter le même projet",
        "columns": [
          {
            "label": "Soutenance confuse",
            "items": [
              "Commence par le code et les outils",
              "Aucune question métier clairement énoncée",
              "Se termine sans recommandation"
            ]
          },
          {
            "label": "Soutenance claire",
            "items": [
              "Commence par le problème, en une phrase",
              "Chaque étape reliée à la question posée",
              "Se termine par une décision proposée"
            ],
            "winner": true
          }
        ],
        "presenterNotes": "Ce contraste est probablement le repère le plus utile de tout le chapitre — le faire relire une dernière fois juste avant les soutenances."
      },
      {
        "id": "anticiper-questions-jury",
        "type": "principle-list",
        "eyebrow": "Chapitre 2",
        "title": "Les questions qui reviennent presque toujours",
        "items": [
          {
            "num": "01",
            "title": "Pourquoi ce choix de données ?",
            "detail": "Être capable de justifier, pas seulement de décrire."
          },
          {
            "num": "02",
            "title": "Quelle est la limite de ton analyse ?",
            "detail": "Savoir reconnaître une limite renforce la crédibilité, ne l'affaiblit pas."
          },
          {
            "num": "03",
            "title": "Que ferais-tu avec plus de temps ?",
            "detail": "Montre que le scope du jour était un choix, pas un plafond de compétence."
          }
        ],
        "presenterNotes": "Encourager à préparer une réponse courte à ces 3 questions avant même de passer devant le groupe."
      },
      {
        "id": "repeter-pitch-claude",
        "type": "code-card",
        "eyebrow": "Chapitre 2",
        "title": "Répéter son pitch face à un évaluateur exigeant",
        "filename": "prompt_repetition_soutenance.txt",
        "code": "Voici mon pitch de soutenance : <v>[colle ton texte]</v>.\nJoue le rôle d'un <k>évaluateur exigeant mais juste</k>.\nPose-moi 3 questions difficiles sur ce projet, comme tu le ferais en vrai.",
        "presenterNotes": "Laisser quelques minutes pour que chacun teste ce prompt individuellement avant le tour de table réel."
      },
      {
        "id": "slides-soutenance-nombre",
        "type": "decision-table",
        "eyebrow": "Chapitre 2",
        "title": "Combien de slides pour 5 minutes",
        "rows": [
          {
            "want": "Présenter le contexte",
            "tool": "1 slide"
          },
          {
            "want": "Expliquer la méthode",
            "tool": "1 à 2 slides"
          },
          {
            "want": "Montrer le résultat",
            "tool": "1 à 2 slides"
          },
          {
            "want": "Formuler la recommandation",
            "tool": "1 slide"
          }
        ],
        "presenterNotes": "Même logique que cette plateforme elle-même a essayé de suivre toute la semaine : une idée par slide, jamais un mur de texte pour gagner du temps."
      },
      {
        "id": "checklist-avant-soutenance",
        "type": "deliverable-checklist",
        "eyebrow": "Juste avant de passer",
        "title": "Dernière vérification avant de présenter",
        "items": [
          {
            "title": "Pitch chronométré à moins de 5 minutes",
            "detail": "Répété au moins une fois à voix haute"
          },
          {
            "title": "Lien portfolio testé sur un autre appareil",
            "detail": "Un lien qui ne s'ouvre pas casse toute la démonstration"
          },
          {
            "title": "Réponse prête aux 3 questions classiques",
            "detail": "Choix des données, limites, et \"avec plus de temps\""
          }
        ],
        "presenterNotes": "Cette checklist est interactive à l'écran — laisser chacun la cocher mentalement dans les dernières minutes avant son tour."
      },
      {
        "id": "grille-evaluation",
        "type": "data-table",
        "eyebrow": "Chapitre 3 — Soutenances",
        "title": "La grille d'évaluation",
        "columns": [
          "Critère",
          "Ce qui est regardé"
        ],
        "rows": [
          {
            "cells": [
              "Clarté du cadrage",
              "La question métier est-elle compréhensible en une phrase ?"
            ],
            "critical": false
          },
          {
            "cells": [
              "Rigueur de la méthode",
              "Le nettoyage et l'analyse sont-ils cohérents avec ce qui a été enseigné ?"
            ],
            "critical": false
          },
          {
            "cells": [
              "Qualité de la recommandation",
              "L'action proposée est-elle concrète et justifiée par un chiffre ?"
            ],
            "critical": false
          },
          {
            "cells": [
              "Maîtrise des outils",
              "L'apprenant peut-il expliquer ses propres choix techniques ?"
            ],
            "critical": false
          }
        ],
        "presenterNotes": "Afficher cette grille avant de commencer le tour de table pour que chacun sache précisément sur quoi il sera jugé."
      },
      {
        "id": "consignes-tour-de-table",
        "type": "step-list",
        "eyebrow": "Chapitre 3 — Soutenances",
        "title": "Le déroulé du tour de table",
        "steps": [
          {
            "title": "5 minutes de présentation",
            "detail": "Chronométrées, coupées si dépassement"
          },
          {
            "title": "3 minutes de questions",
            "detail": "Du jury puis du groupe"
          },
          {
            "title": "2 minutes de retour",
            "detail": "Un point fort et un point d'amélioration, formulés par le groupe"
          }
        ],
        "presenterNotes": "Rappeler que le feedback du groupe fait partie de l'exercice — apprendre à recevoir une critique constructive est aussi une compétence professionnelle."
      },
      {
        "id": "conseil-avant-soutenance",
        "type": "principle-list",
        "eyebrow": "Chapitre 3 — Soutenances",
        "title": "Un dernier mot avant de commencer",
        "items": [
          {
            "num": "01",
            "title": "Le jury évalue la démarche, pas la perfection",
            "detail": "Un projet imparfait mais bien compris vaut mieux qu'un résultat impressionnant mal maîtrisé."
          },
          {
            "num": "02",
            "title": "Le trac est normal, il ne disqualifie personne",
            "detail": "Respirer, parler lentement, et se concentrer sur l'histoire à raconter."
          }
        ],
        "presenterNotes": "Moment volontairement humain avant de lancer les passages — désamorcer le stress sans minimiser l'exercice."
      },
      {
        "id": "modalites-examen",
        "type": "principle-list",
        "eyebrow": "Chapitre 4 — Certification",
        "title": "Les modalités de l'examen",
        "items": [
          {
            "num": "01",
            "title": "Format",
            "detail": "Questions à choix multiples et un cas pratique court, sur les 5 jours de contenu."
          },
          {
            "num": "02",
            "title": "Durée",
            "detail": "30 minutes, à faire juste après les soutenances."
          }
        ],
        "presenterNotes": "Rassurer sur le fait que l'examen porte sur les concepts vus, pas sur des pièges — la préparation, c'est d'avoir suivi la semaine activement."
      },
      {
        "id": "ce-qui-est-evalue",
        "type": "principle-list",
        "eyebrow": "Chapitre 4 — Certification",
        "title": "Ce que l'examen vérifie vraiment",
        "items": [
          {
            "num": "01",
            "title": "La compréhension des concepts clés",
            "detail": "Pas la mémorisation exacte d'une formule ou d'une commande."
          },
          {
            "num": "02",
            "title": "L'usage critique de Claude",
            "detail": "Savoir quand faire confiance et quand vérifier, pas juste savoir écrire un prompt."
          },
          {
            "num": "03",
            "title": "La qualité du portfolio produit",
            "detail": "La preuve concrète que les compétences ont mené à un résultat réel."
          }
        ],
        "presenterNotes": "Ce triptyque reflète exactement l'esprit de toute la formation, pas seulement du dernier jour."
      },
      {
        "id": "pourquoi-plan-90-jours",
        "type": "principle-list",
        "eyebrow": "Chapitre 5",
        "title": "Pourquoi 90 jours, pas juste une bonne intention",
        "items": [
          {
            "num": "01",
            "title": "Un vœu vague ne se réalise presque jamais",
            "detail": "\"Je vais continuer à progresser\" ne dit rien de ce qu'il faut faire lundi matin."
          },
          {
            "num": "02",
            "title": "Un plan avec paliers se suit et s'ajuste",
            "detail": "On peut mesurer si on avance, et corriger en cours de route."
          }
        ],
        "presenterNotes": "Poser l'intention avant la méthode — le plan 90 jours n'est pas un exercice administratif, c'est ce qui évite que la formation reste sans suite concrète."
      },
      {
        "id": "objectifs-smart",
        "type": "principle-list",
        "eyebrow": "Chapitre 5",
        "title": "Des objectifs SMART pour ton plan",
        "items": [
          {
            "num": "01",
            "title": "Spécifique",
            "detail": "Une action précise, pas une direction générale."
          },
          {
            "num": "02",
            "title": "Mesurable",
            "detail": "Un moyen clair de savoir si c'est fait ou non."
          },
          {
            "num": "03",
            "title": "Atteignable",
            "detail": "Réalisable avec le temps et les ressources réellement disponibles."
          },
          {
            "num": "04",
            "title": "Réaliste",
            "detail": "Cohérent avec les autres priorités de ta vie actuelle."
          },
          {
            "num": "05",
            "title": "Temporellement défini",
            "detail": "Une échéance précise, pas \"un jour\"."
          }
        ],
        "presenterNotes": "Cadre volontairement classique mais efficace — rien de nouveau à inventer, juste à appliquer sérieusement au plan qui suit."
      },
      {
        "id": "paliers-30-60-90",
        "type": "step-list",
        "eyebrow": "Chapitre 5",
        "title": "Les trois paliers du plan",
        "steps": [
          {
            "title": "30 jours — consolider",
            "detail": "Finaliser le portfolio, republier si besoin, solidifier les bases de la semaine"
          },
          {
            "title": "60 jours — candidater activement",
            "detail": "Prospection régulière, profil LinkedIn vivant, premières réponses"
          },
          {
            "title": "90 jours — premiers résultats",
            "detail": "Un entretien, une mission freelance, ou une progression mesurable"
          }
        ],
        "presenterNotes": "Ces trois paliers donnent une trame par défaut — chacun l'ajuste ensuite à sa situation personnelle avec Claude."
      },
      {
        "id": "rediger-plan-avec-claude",
        "type": "code-card",
        "eyebrow": "Chapitre 5",
        "title": "Rédiger ton plan avec Claude",
        "filename": "prompt_plan_90_jours.txt",
        "code": "Voici mon profil et mon projet capstone : <v>[résumé en quelques lignes]</v>.\nAide-moi à rédiger un plan des 90 prochains jours, avec des objectifs\n<k>SMART</k> pour chaque palier (30/60/90 jours), réaliste par rapport\nà mon temps disponible : <v>[ton temps disponible par semaine]</v>.",
        "presenterNotes": "Insister sur la personnalisation du temps disponible dans le prompt — un plan générique de 10h/semaine ne sert à rien à quelqu'un qui en a 3."
      },
      {
        "id": "exemple-plan-90-jours",
        "type": "data-table",
        "eyebrow": "Chapitre 5",
        "title": "Un exemple de plan, pour s'inspirer",
        "columns": [
          "Palier",
          "Objectif principal",
          "Action clé"
        ],
        "rows": [
          {
            "cells": [
              "30 jours",
              "Portfolio solide et en ligne",
              "Republier le capstone avec les retours de la soutenance"
            ],
            "critical": false
          },
          {
            "cells": [
              "60 jours",
              "Visibilité et premiers contacts",
              "5 messages de prospection ciblée par semaine"
            ],
            "critical": false
          },
          {
            "cells": [
              "90 jours",
              "Premier résultat concret",
              "Un entretien décroché ou une première mission freelance"
            ],
            "critical": false
          }
        ],
        "presenterNotes": "Préciser que c'est un exemple générique — chaque plan réel doit être adapté à la situation et au secteur visé par l'apprenant."
      },
      {
        "id": "ressources-pour-continuer",
        "type": "ecosystem-grid",
        "eyebrow": "Chapitre 6",
        "title": "Pour continuer après la formation",
        "items": [
          {
            "icon": "database",
            "title": "Jeux de données",
            "detail": "Pour continuer à s'exercer"
          },
          {
            "icon": "skills",
            "title": "Prompts & méthode",
            "detail": "Bibliothèque Claude officielle"
          },
          {
            "icon": "cowork",
            "title": "Le groupe",
            "detail": "Continuer à échanger après la semaine"
          },
          {
            "icon": "globe",
            "title": "Documentation Claude",
            "detail": "Pour aller plus loin en autonomie"
          }
        ],
        "presenterNotes": "Rappeler explicitement que la page Ressources de cette plateforme reste accessible après la formation — ce n'est pas un contenu à usage unique."
      },
      {
        "id": "rester-connecte-communaute",
        "type": "principle-list",
        "eyebrow": "Chapitre 6",
        "title": "Rester connecté après la semaine",
        "items": [
          {
            "num": "01",
            "title": "Le groupe continue",
            "detail": "Les questions ne s'arrêtent pas à la certification."
          },
          {
            "num": "02",
            "title": "Cette plateforme reste disponible",
            "detail": "Pour revoir une slide, un prompt, ou reprendre une explication plus tard."
          }
        ],
        "presenterNotes": "Fermer le chapitre en rassurant : la formation se termine, l'accompagnement et les ressources restent."
      },
      {
        "id": "resume-jour5",
        "type": "principle-list",
        "eyebrow": "Résumé de la semaine",
        "title": "Ce qu'on retient de ces cinq jours",
        "items": [
          {
            "num": "01",
            "title": "Un écosystème maîtrisé, pas juste survolé",
            "detail": "De la découverte du Jour 1 jusqu'à l'automatisation du Jour 5."
          },
          {
            "num": "02",
            "title": "Un portfolio réel, pas un exercice théorique",
            "detail": "Un dashboard, une analyse, un projet capstone — tous publiés."
          },
          {
            "num": "03",
            "title": "Un plan pour la suite, pas juste une fin de formation",
            "detail": "90 jours avec des paliers concrets, pas un vague \"il faudra continuer\"."
          }
        ],
        "presenterNotes": "Dernier résumé de toute la semaine, pas seulement du jour — laisser ce moment prendre un peu plus de place que les résumés précédents."
      },
      {
        "id": "livrables",
        "type": "deliverable-checklist",
        "eyebrow": "Livrables finaux",
        "title": "Livrables du Jour 05",
        "items": [
          {
            "title": "Projet capstone finalisé et documenté",
            "detail": "Présenté à l'oral, disponible en ligne"
          },
          {
            "title": "Plan d'action des 90 jours",
            "detail": "Rédigé avec Claude, avec des objectifs SMART par palier"
          },
          {
            "title": "Certification passée",
            "detail": "Examen complété"
          }
        ],
        "presenterNotes": "Derniers livrables de la formation — vérifier qu'ils sont bien compris avant la clôture finale."
      },
      {
        "id": "mot-de-la-fin",
        "type": "quote-stat",
        "eyebrow": "Avant de se dire au revoir",
        "value": 5,
        "suffix": " jours",
        "label": "Cinq jours, un portfolio réel, un plan pour les 90 prochains",
        "context": "La formation s'arrête ici. Ton plan, lui, commence dès demain matin.",
        "presenterNotes": "Marquer une vraie pause avant la slide de clôture — laisser ce chiffre résonner quelques secondes."
      },
      {
        "id": "cloture-finale",
        "type": "cover",
        "eyebrow": "Fin de la formation",
        "title": [
          "Ton plan des 90 jours",
          "démarre maintenant"
        ],
        "highlight": "démarre maintenant",
        "subtitle": "Merci d'avoir été présent et rigoureux cette semaine. La suite dépend de toi, avec Claude comme copilote — exactement comme depuis lundi.",
        "meta": "ZAYN4DATA · MERCI D'AVOIR ÉTÉ LÀ CETTE SEMAINE",
        "metaHighlight": "MERCI D'AVOIR ÉTÉ LÀ CETTE SEMAINE",
        "presenterNotes": "Clôture officielle de la formation — laisser un temps pour les derniers mots, applaudissements ou questions finales en live."
      }
    ]
  }
];
