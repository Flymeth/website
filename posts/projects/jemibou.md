---
name: Jemibou
description: Robot Discord disposant de son interface web
iconURL: /cdn/projects/jemibou/logo.png
bannerURL: /cdn/projects/jemibou/website/command_list.png
github: https://github.com/Flymeth/jemibou
---

# Jemibou: Robot Discord multi-purpose

Jemibou est l'un des robot discord les plus avancé que j'ai pu créer. Avec l'intégration d'une base de donnée interne (basé sur du JSON), j'ai réussi à relier un site internet directement aux comportements du robot afin d'avoir un bot personnalisé pour chaque server.
Malheureusement, ce robot n'est plus actif aujourd'hui, mais pour vous rassurer je l'ai réveillé quelques secondes afin d'avoir de "la matière à vous montrer"...

## Présentation

J'ai réalisé 2 vidéos de présentation des différentes fonctionnalité du robot (l'une étant un peu plus ancienne que l'autre):

![Vidéo de présentation #1](/cdn/projects/jemibou/presentation.mp4)

Dans cette vidéo vous avez surement remarqué que je modifiais le comportement du robot d'une manière un peu étrange...
Cela est dû au fait que dans la version 1.5.0 de Jemibou, il n'y avait pas encore de site web (et donc pas de dashboard). Et j'ai eu envie d'experimenter une fonctionnalité que je n'avais vu sur aucun autre robot.

## Un channel discord comme dashboard

L'idée peut paraître un peu loufoque, mais au final, pourquoi pas:
> Utiliser un channel discord dédié pour modifier le comportement du robot

Voici comment cela fonctionne:

1. Vous générez/assignez un salon discord pour les paramètres du robot
2. Vous écrivez les différents paramètres à modifier à l'interieur (format: `<nom_du_paramètre> = <valeur_du_paramètre>`)
3. Et voilà! Terminé

L'avantage de cela est que je n'ai pas eu à utiliser une base de donnée... puisque Discord était directement ma base de donnée!
Le problème de cette méthode est simplement le temps: aller chercher les paramètres en faisant une requête à discord et en essayant de récuperer tout les messages d'un salon est quelque chose d'assez long. Ducoup, j'ai par la suite créer un site web avec un véritable dashboard afin de faire comme les autres robots (mais je n'ai évidemment pas retiré cette fonctionnalité).

## Site web

Donc j'ai voulu créer un site internet pour mon robot, afin de gagner en visibiliter ainsi que de pouvoir le partager plus facilement.

### Page d'accueil

Le header du site doit être accrocheur et donner envie de découvrir le robot.
Pour cela, j'ai implémenté l'affichage des informations comme:

- Le nombre de serveurs où le robot est présent
- Le nombre d'utilisateur que le robot peut gérer
- Le temps d'uptime (la durée depuis laquelle le robot est en ligne)

![Header](/cdn/projects/jemibou/website/header.png)

### Liste des commandes

Ici j'ai récupérer dynamiquement la liste des commandes du robot ainsi que leur description pour donner un apperçu à l'utilisateur des fonctionnalités du robot.

![Liste des commandes](/cdn/projects/jemibou/website/command_list.png)

Je vous retranscris ici cette liste:

Nom de la commande | Description
---|---
avatar | Obtenir l’avatar de profil d’un utilisateur
ban | Bannir un utilisateur
changelog | Obtenir des informations sur la dernière version du bot
clear | Effacer certains messages dans le canal actuel
customfont | Obtenez votre texte avec une police personnalisée !
dashboard | Obtenez le lien de votre tableau de bord.
game | Jouez à des jeux avec le bot !
help | Obtenir de l’aide sur les commandes du bot
infos | Obtenir des informations sur un serveur, un canal, un rôle ou un membre
invite | Envoyer le lien d’invitation d’un bot (ou le lien d’invitation de Jemibou)
kick | Expulser un utilisateur
links | Obtenir les informations du bot
poll | Faites un sondage !
premium | Obtenir des informations sur les rangs premium
randomUser | Vous donne l’utilisateur d’une guilde aléatoire
roletoall | Ajouter/supprimer un rôle spécifique à tous les utilisateurs du serveur
say | Dites quelque chose en tant que bot !
search | La recherche google, wikipedia et github résultent directement d’une seule commande
seePerms | Voir l’autorisation d’un membre sur le serveur. Vous pouvez également utiliser cette commande pour obtenir ma permission en l’utilisant sans mentionner de membre.
settings | Modifier les paramètres du bot dans votre serveur
translate | Traduisez votre message ! Utilisez la commande sans argument pour afficher chaque langue disponible.

### Footer

Enfin, j'ai conçu un footer basique mais efficace: un présentation du développeur (donc moi) ainsi que le dernier changelog du robot (également récupéré dynamique depuis un fichier `changelog.md`).

![Footer](/cdn/projects/jemibou/website/latest_changelog.png)

Vous avez sûrement remarqué également le bouton "Invite Jemibou" en bas à droite du site internet. C'est simplement un bouton qui renvoi l'utilisateur vers l'écran d'ajout du robot discord sur un de ses serveurs.

## Le dashboard

Comme évoqué plus tôt, le site internet sert principalement de dashboard pour modifier le comportement du robot suivant les serveurs discord.
Grâce à ce dashboard il est possible de:

- Changer le préfix des commandes du robot
- Ajouter/supprimer les mots interdits du serveur
- Modifier le message de bienvenue lorsqu'un utilisateur rejoint le serveur
  - Modification de channel d'envoie de ce message
  - Modification du contenu avec possibilité d'utiliser des variables dynamiques
  - Modification du message envoyé en privé à l'utilisateur avec possibilité d'utiliser des variables dynamiques
  - Modification du/des rôle(s) à ajouter automatiquement à cet utilisateur
  - Possibilité de désactiver ce message d'accueil pour les robots
- Modifier le message d'au-revoir avec les mêmes possibilités que le message d'accueil

![Dashboard 1](/cdn/projects/jemibou/dashboard/screen1.png)
![Dashboard 2](/cdn/projects/jemibou/dashboard/screen2.png)
![Dashboard 3](/cdn/projects/jemibou/dashboard/screen3.png)

Mais avant tout cela, il faut se connecter!

### La connection et le choix du serveur à modifier

Afin de garder une certaine simplicité, pour accéder au dashboard, l'utilisateur doit se connecter avec son compte Discord. Cela permet par la suite de récuperer la liste de serveur où l'utilisateur est présent et où il a les permissions de modifier le serveur.

![Interface de connection](/cdn/projects/jemibou/website/discord_connection.png)

Après s'être connecté, le site va lui afficher la liste de ses serveurs discord, et ce selon plusieurs critères:

1. __Si l'utilisateur n'a pas les permissions de modifier le serveur__, alors le serveur en question ne lui sera pas affiché
2. __Si le robot n'est pas présent sur le serveur__, alors le serveur sera moins mis en avant et la séléction de ce serveur entrainera une redirection vers l'interface d'ajout du robot pour ce serveur
3. __Sinon__, le serveur sera affiché avec son iconne (ou une iconne par défaut si il n'en a pas) et le click de la carte ouvrira l'interface pour changer le comportement du robot pour ce serveur

![Liste des serveurs](/cdn/projects/jemibou/website/server_selection.png)

Voilà, vous savez désormais tout de ce projet!
Voici rien que pour vous une autre présentation vidéo du robot avec les fonctionnalités du dashboard:

![Vidéo de présentation #2](/cdn/projects/jemibou/presentation_2.mp4)
