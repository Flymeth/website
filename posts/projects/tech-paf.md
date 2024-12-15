---
name: Site Web Tech-Paf
description: "Création du site web full-stack du BDE Tech-Paf : connexion via google, inscriptions aux événements, page de paiment, ..."
bannerURL: /cdn/projects/site-tech-paf/homepage.png
iconURL: /cdn/projects/site-tech-paf/logo.jpg
link: https://tech-paf.netlify.app
tags:
  - Svelte
  - FullStack
  - Stripe
  - Supabase
  - Notion
  - Front-end
  - Back-end
---

# 🌐 **Le site web de Tech-Paf : Entre innovation et fonctionnalité**

**Tech-Paf**, c’est le BDE dynamique et énergique de **My Digital School Lyon**, conçu pour animer la vie étudiante à travers des événements, des activités et du partage. En tant que **membre du BDE et responsable du site web**, j'ai eu le plaisir de concevoir un outil central pour tous les étudiants : **le site officiel de Tech-Paf**.

L’objectif était clair : offrir une plateforme simple, efficace et moderne permettant aux étudiants de s’informer, de s’inscrire à des événements, de lire les actualités et de participer à la vie étudiante.

---

## 🛠 **Les technologies utilisées**

Pour développer ce site, j'ai mis en place une stack moderne et performante :

- **Framework :** [Svelte](https://svelte.dev) pour une interface rapide et interactive.
- **Base de données :** [Supabase](https://supabase.com) pour gérer les utilisateurs et les inscriptions. ![Image de la table des evenements](/cdn/projects/site-tech-paf/supabase.png)
- **Paiement :** [Stripe](https://stripe.com) pour permettre des événements payants. ![Image du Dashboard Stripe](/cdn/projects/site-tech-paf/stripe.png)
- **CMS :** [Notion](https://www.notion.so) pour l’écriture des articles de blog et la gestion des événements. ![Image du notion](/cdn/projects/site-tech-paf/notion.png)

Chaque choix technique a été fait pour offrir une solution scalable et pratique pour les besoins du BDE.

---

## 🔐 **Les fonctionnalités clés du site**

1. **Connexion Google**  
   Les utilisateurs peuvent se connecter directement avec leur compte Google pour une expérience fluide et rapide.

2. **Gestion du compte utilisateur**  
   Une fois connecté, chaque étudiant peut gérer ses informations personnelles, dont l’ajout de son **numéro de téléphone** pour ne rater aucun événement important.

3. **Gestion des événements**

   - 🗓 **Calendrier interactif :** Intégration du module [Svelte-Calendar](https://madewithsvelte.com/event-calendar) pour afficher tous les événements prévus.
   - ⭐ **Inscription facilitée :** L'inscription aux événements est accessible uniquement aux utilisateurs connectés. Les données des inscrits sont sauvegardées dans **Supabase**.
   - 💰 **Événements payants :** Grâce à **Stripe**, les étudiants peuvent s’inscrire à des événements payants directement via le site.

4. **Blog et actualités**

   - Les articles de blog et les événements sont écrits sur **Notion** et récupérés dynamiquement par un **Back-end For Front-end (BFF)** pour maintenir le site à jour.

5. **Gestion des inscriptions**  
   Les étudiants peuvent consulter et modifier leur statut d’inscription à tout moment.

---

## 🔄 **Une interface moderne et accessible**

L’interface a été conçue pour être **responsive**, simple d’utilisation et adaptée à tous les appareils : ordinateur, tablette et mobile. Voici quelques aperçus :

- **Page d'accueil**  
  ![homepage](/cdn/projects/site-tech-paf/homepage.png)

- **Calendrier des événements**  
  ![calendar](/cdn/projects/site-tech-paf/calendar.png)

- **Page d'un événement**  
  ![event_page](/cdn/projects/site-tech-paf/event_page.png)

- **Articles de blog**  
  ![blog](/cdn/projects/site-tech-paf/blog.png)

---

## 🚀 **En résumé**

Le site **Tech-Paf** est une plateforme centralisée qui facilite la gestion des événements et dynamise la vie étudiante à My Digital School Lyon. Grâce à des outils modernes comme **Svelte**, **Supabase**, **Stripe** et **Notion**, nous avons pu créer une solution performante et intuitive.

> ✨ **Le résultat ?** Une expérience utilisateur simple, moderne et pratique pour l'ensemble des étudiants du campus !

Retrouvez tout cela en visitant le site ici : [tech-paf.netlify.app](https://tech-paf.netlify.app). 👉
