---
name: ETAPS
description: Système interactif pour courses d’orientation scolaires
bannerURL: "/cdn/projects/etaps/cover.png"
iconURL: "/cdn/projects/etaps/icon.png"
tags:
  - php
  - scss
  - team
  - mariaDB
  - SQL
---

## 🎯 Contexte

Projet scolaire réalisé en équipe avec **deux collègues**, pour le compte d’un **client éducatif** souhaitant moderniser l’organisation de **courses d’orientation pour écoles primaires**.  
L’application permet de gérer en temps réel les départs, arrivées, validations et scores des élèves lors de ces épreuves.

---

## 🛠 Stack technique

- **Langages** : PHP (back-end), HTML/CSS avec **SASS** (front-end)
- **Base de données** : MariaDB
- **Serveur** : Apache (local ou distant)
- **Temps réel** : via une **librairie développée sur mesure** (polling manuel), sans WebSocket

---

## 🔧 Fonctionnalités principales

- **🧭 Modes de jeu** :

  - **Départ** : sélection des élèves ou groupes et démarrage du chrono
  - **Arrivée** : arrêt du chrono + réintégration dans la liste de départ
  - **Validation** : les élèves valident eux-mêmes leur parcours (correct/incorrect)
  - **Admin** : création de jeux, classes, élèves, et gestion du tableau de score

- **📊 Classements et points** :
  - Calcul de scores basé sur le temps et la réussite de l'élève ou de l'équipe
  - Classement individuel et par groupe

---

## 💡 Particularités

- ⚡ **Système en “temps réel”**, grâce à une librairie maison basée sur du polling PHP
- 🧠 **Interface simple**, conçue pour un usage rapide sur tablette ou ordinateur portable
- 🤝 **Validation manuelle des parcours par les élèves eux-mêmes**, pour encourager l’autonomie

---

## 🙋‍♂️ Mon rôle

Au sein de notre équipe de trois personnes, j’ai contribué à :

- 🧠 La conception de l’architecture et du modèle de données
- 💻 Le développement Full-Stack en PHP
- 🎨 L’intégration front-end avec SASS
- 🔄 Le système de mise à jour "temps réel" entre les interfaces
- 🧪 La mise en place de jeux de test pour valider les cas d’usage

---

## 📸 Images clés

### Interface de départ

_Choix des élèves ou groupes et sélection du jeu_
![Interface départ](/cdn/projects/etaps/start.png)
![Interface départ - Démarrage du timer](/cdn/projects/etaps/start_timer.png)

### Mode validation

_L’élève valide son parcours directement depuis une tablette_
![Interface départ - Démarrage du timer](/cdn/projects/etaps/validation.png)

### Tableau des scores

_Paramétrage des jeux et élèves_
![Interface départ - Démarrage du timer](/cdn/projects/etaps/game_settings.png)
![Interface départ - Démarrage du timer](/cdn/projects/etaps/student_settings.png)

---

## 🚀 Résultat

Le projet a été finalisé dans le cadre d’un **travail de groupe encadré**, avec une journée complète de test et démonstration.  
L’application est stable, fonctionnelle, et pourrait être facilement déployée dans un contexte éducatif réel avec une connexion réseau locale ou distante.
