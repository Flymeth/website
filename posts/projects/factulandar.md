---
name: Factulandar
description: Générateur de factures à partir d’un calendrier
bannerURL: /cdn/projects/factulandar/edit_invoice.png
iconURL: /cdn/projects/factulandar/icon.png
github: https://github.com/johan-jnn/factulandar
tags:
  - Laravel
  - PHP
  - SASS
  - Calendrier
  - Facturation
---

## 📌 Présentation

**Factulandar** est un outil de facturation développé pour les professionnels dont l’activité repose sur un emploi du temps précis (cours, prestations, rendez-vous, etc.).  
L’application permet d’importer un **fichier `.ical`**, de filtrer les événements pertinents, et de générer automatiquement une **facture mensuelle personnalisée**.

---

## 🛠 Stack technique

- **Framework** : Laravel (PHP)
- **Frontend** : SASS, Blade, JavaScript
- **Base de données** : SQLite
- **Parsing des calendriers** : Analyse des fichiers `.ical`
- **Export** : Impression PDF via navigateur (export direct en cours de développement)

---

## 🔧 Fonctionnalités

- **📅 Importation de calendrier**

  - Prise en charge des fichiers `.ical` depuis Google Calendar, Apple, Outlook...

- **🔍 Filtres dynamiques**

  - **Par date** : sélection d’une période ou d’un mois
  - **Par mot-clé** : recherche dans les titres ou descriptions d’événements

- **🏢 Gestion administrative**

  - Création d’une ou plusieurs **entreprises**
  - Gestion de **clients** avec historique des factures

- **🧾 Génération automatique des factures**

  - Sélection des événements filtrés
  - Création d’une facture modifiable avant validation
  - Ajout/suppression manuelle d’éléments

- **📤 Export**
  - Impression PDF via la fonction d’impression du navigateur
  - Pas d’export automatisé intégré pour le moment

---

## 🙋‍♂️ Mon rôle

Ce projet a été entièrement conçu et développé en autonomie. J’ai réalisé :

- 🧠 L’analyse du besoin et la conception de l’interface
- 💻 Le développement backend avec Laravel
- 🎨 L’intégration responsive en SASS
- 📅 L’implémentation du parsing `.ical`
- 🔄 Le système de filtrage dynamique et de génération de factures

---

## 📸 Images clés

### Tableau de bord principal

_Modification des clients_
![Dashboard](/cdn/projects/factulandar/client_settings.png)

### Interface d’importation .ical

_Sélection et filtrage des événements_
![Dashboard](/cdn/projects/factulandar/select_events.png)

### Prévisualisation de facture

_Génération automatique d’une facture avec modification manuelle possible_
![Dashboard](/cdn/projects/factulandar/edit_invoice.png)
![Dashboard](/cdn/projects/factulandar/invoice_print.png)

---

## 🚀 Objectif

Ce projet a pour but de **faciliter la vie des indépendants**, notamment ceux dans l’enseignement ou les prestations régulières, en leur évitant la gestion manuelle et chronophage de leur facturation mensuelle.
