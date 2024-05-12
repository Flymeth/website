---
name: Chess Guez
description: Création de mon propre jeu d'échecs en PHP
bannerURL: /cdn/projects/chess_guez/banner.png
iconURL: /cdn/projects/chess_guez/plate.png
github: https://github.com/Flymeth/php_chess
tags:
- php
- algorithmie
- sessions
- game
- multiplayer
---

# Voici comment j'ai conçu mon propre jeu d'échecs en PHP

En première année d'étude suppérieur, on nous a fait apprendre les langages web comme le HTML, le CSS ou encore le Javascript. Ces langages sont principalement utilisés pour la partie "client" des sites web. Plus tard dans l'année nous avons commencer à apprendre notre premier langage "server" : le PHP.

Donc on nous a fait apprendre les bases du PHP à savoir :

- La syntax
- Les différentes notions
  - Les sessions
  - Les classes
  - Les requètes GET/POST

Et pour finaliser notre module, notre intervenant nous a proposé de créer un jeu d'échecs.

Au début nous avons tous pensés que cela allait être irréalisable (moi le premier). De fait tout le monde a un peu abandonné l'idée de créer ce jeu. Tout le monde... sauf moi. En effet j'ai vu en ce projet un moyen de repousser mes limites en termes d'algorithmie (car coder un jeu d'échecs en prenant en compte les coups interdits, les échecs, etc... n'est pas une mince à faire).

## Fonctionnalités clefs

Je ne vais pas détailler le fonctionnement du jeu ici. Si cela vous intéresse, je publierai dans quelques jours une série d'articles sur [mon blog](/blog) pour expliquer tout le fonctionnement derrière ce projet.
En revanche je vais lister juste ici quelques fonctonnalités qui sont selon moi interressantes pour la présentation de ce projet.

### Paramètres de partie

![Paramètres de partie](/cdn/projects/chess_guez/settings.png)

- Choix du nom des joueurs
- Choix du joueur de départ (par défaut les blancs)
- Choix de l'orientation du plateau
  1. Les blancs sont toujours en haut du plateau
  2. Le jeu se fait vers le haut (par défaut)
  3. Le jeu se fait vers le bas
  4. Les blancs sont toujours en bas du plateau

### Plateau

![Plateau de jeu](/cdn/projects/chess_guez/plate.png)

Pour les pions j'ai utilisé les charactères présent dans l'encodage `UTF-8`. J'ai ensuite repris le même style de couleur que la célèbre application [chess.com](https://chess.com).
Pour jouer, vous devait tout d'abord séléctionner un de vos pions en cliquant sur celui-ci, puis cliquer sur la case où vous souhaitez le déplacer. Si le mouvement fait n'est pas valide (ce n'est pas votre tour, la pièce ne se déplace pas correctement, mise en échecs, ...), le jeu invalidera votre mouvement et vous dira en quoi le mouvement est impossible.
Sur l'image d'exemple la fonctionnalité n'est pas présente, mais la liste des pièces mangées est affichée verticalement à droite et à gauche du plateau.

### Liste des coups

![Listes des coups](/cdn/projects/chess_guez/coups.png)

J'ai également souhaité afficher la liste des coups de la partie afin d'avoir une sorte d'historique de partie.

### Invitation

![Invitation](/cdn/projects/chess_guez/invitations.png)

Enfin, étant donné que le jeu d'échecs est un jeu qui se joue à 2, j'ai créé un système d'invitation au jeu. Mon application peut se jouer entre ami sur la même machine mais également en ligne sur des machines différentes.
Le système d'invitation va simplement copier le lien de la page actuelle dans le clipboard de l'utilisateur, qui pourra ensuite envoyer ce lien à ses amis afin de pouvoir jouer avec eux.

> NB: Ici je suis sur un serveur local mais il suffirait d'héberger le projet et le fonctionnement resterait le même
