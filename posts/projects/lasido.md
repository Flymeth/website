---
name: Lasido
description: A music discord bot built from scratch using the discord voice api
iconURL: /cdn/projects/lasido/logo.png
github: https://github.com/Flymeth/Lasido_v2
discord: https://discord.com/api/oauth2/authorize?client_id=893579508752478279&permissions=8&scope=bot%20applications.commands
---

# Lasido: Un robot discord musical

## Description

Ce projet consiste en la création d'un robot Discord entièrement codé à la main en Node.js, en utilisant l'API Discord.js ainsi que Discord Voice. L'objectif principal est de permettre aux utilisateurs de Discord d'écouter leur musique préférée à partir de différentes plateformes de streaming, le tout intégré de manière transparente dans l'environnement Discord.

## Principales commandes

### /search

Afin de pouvoir rechercher une musique/playlist/artiste sur les principales plateformes de streaming sans avoir à quitter discord, j'ai mis en place cette commande à l'utilisation enfantine:

![Commande /search en action](/cdn/projects/lasido/search_command.png)

### /lyrics

Vous souhaitez chanter votre musique préféré pour montrer votre magnifique voix à vos amis mais ne vous souvenez plus des paroles ? La commande `/lyrics` vous donnera directement les paroles de la chansons qui est en train de se jouer ou simplement d'une chanson dont vous lui aurez donner le nom.

![Commande /lyrics en action](/cdn/projects/lasido/lyrics_command.png)

### /player

Cette commande est ma préféré. Afin d'avoir un player entierement fonctionnel (c'est à dire un réel tableau de bord pour controler le comportement de Lasido sur les musiques), vous n'aurez plus qu'à envoyer cette commande. Et même mieux:

- Avec l'option `stick=true`, vous aurez la possibilité de faire en sorte que le player soit toujours le premier message du salon dans lequel vous envoyer la commande
- Le player se met automatiquement à jour au niveau des musiques, de la file d'attente ou encore de type de lecture (rejouer le morceau, jouer morceaux aléatoire, etc...)

![Commande /player en action](/cdn/projects/lasido/player_command.png)

## Fonctionnalités Principales

- **Gestion des Paramètres par Serveur :** Chaque serveur Discord peut avoir ses propres paramètres spécifiques, lesquels sont sauvegardés à l'aide de MariaDB. Les interactions avec la base de données se font grâce à des requêtes SQL, offrant ainsi une personnalisation avancée pour chaque communauté.

- **Intégration de Différentes Plateformes :** Grâce à la bibliothèque play-dl, le bot peut interagir avec les API de YouTube, Deezer, SoundCloud et Spotify. Les utilisateurs peuvent écouter leurs morceaux favoris depuis n'importe quel service de streaming, offrant une expérience musicale diversifiée.

- **Recherche et Lecture Facilitées :** Le bot prend en charge non seulement les playlists, mais également la recherche directe de musique sans avoir besoin de coller un lien spécifique. La rapidité de recherche et de conversion entre les différentes plateformes est optimisée pour une expérience utilisateur fluide.

## Perspectives Futures

Le développement du bot vise à intégrer de nouvelles fonctionnalités pour enrichir l'expérience musicale des utilisateurs :

- **Likes Utilisateur :** Permettre aux utilisateurs de "liker" des titres, créant ainsi une liste personnalisée de leurs morceaux préférés.

- **Importation de Musique entre Serveurs :** Possibilité d'importer des morceaux d'un serveur Discord à un autre, favorisant le partage de musique entre différentes communautés.

- **Interface Web Fonctionnelle à 100% :** Mise en place d'une interface web complète pour une gestion simplifiée des paramètres et des fonctionnalités du bot.

- **Égaliseur Audio :** Intégration d'un système d'égalisation audio offrant aux utilisateurs la possibilité de personnaliser le traitement sonore, notamment en ajoutant des basses ou en améliorant la qualité vocale.

Ce projet vise à créer un environnement musical interactif et personnalisé au sein des serveurs Discord, offrant une expérience utilisateur innovante et immersive.
