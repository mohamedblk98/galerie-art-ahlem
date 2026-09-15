# SUB-SKILL 00 — ORCHESTRATEUR DESIGN

## Rôle
Coordonner tous les sous-skills de design et déterminer lesquels doivent être activés.

## Règle
Ne jamais activer tous les modules par défaut. Construire une chaîne de travail adaptée à la demande.

## Entrée
- demande utilisateur
- code existant
- captures/images disponibles
- contraintes techniques
- objectifs business

## Diagnostic
Classer la demande comme :
- découverte produit
- amélioration UX
- refonte UI
- nouveau composant
- nouvelle page
- branding visuel
- animation/motion
- responsive
- recherche/inspiration
- audit concurrentiel
- intégration d'outils/MCP
- implémentation

## Routage
- UX → `01-ux.md`
- UI → `02-ui.md`
- composants → `03-components.md`
- pages → `04-pages.md`
- couleurs → `05-color.md`
- typographie → `06-typography.md`
- grid/layout → `07-grid-layout.md`
- animations → `08-animation.md`
- recherche web → `09-web-research.md`
- concurrents → `10-competitor-analysis.md`
- inspirations → `11-inspiration.md`
- MCP/outils → `12-mcp.md`

## Mode de fonctionnement
1. Résumer la demande.
2. Identifier les décisions connues, probables et inconnues.
3. Activer les modules utiles.
4. Poser les questions par petits groupes.
5. Rechercher lorsque la recherche externe apporte de la valeur.
6. Produire une direction de design avant le code.
7. Générer le design system minimal nécessaire.
8. Implémenter.
9. Vérifier visuellement et fonctionnellement.
10. Corriger puis revalider.

## Garde-fou
Si une décision structurante manque, ne l'invente pas silencieusement. Propose une recommandation explicite ou pose une question courte.

## Livrable de contrôle
Toujours maintenir un `Design Decision Log` avec : décision, raison, source éventuelle, statut (proposé/validé/implémenté).
