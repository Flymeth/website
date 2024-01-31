---
title: "Les raccourcisseurs d'URL: pourquoi, et comment ?"
description: Les raccourcisseurs d'URL sont des outils offrant une solution simple et efficace pour compresser des liens web longs en des versions plus courtes et plus gérables. Nous allons découvrir leur utilité mais également apprendre à créer notre propre raccourcisseur.
coverURL: /cdn/articles/url-shortener/cover.png
category: Outils
tags:
- URL
- Raccourcisseur d'url
- HTML
- Back-end
- bitly
---

## Les Raccourcisseurs d'URL : Simplifier la Navigation Web

Les raccourcisseurs d'URL sont devenus des outils indispensables dans le paysage numérique, offrant une solution simple et efficace pour compresser des liens web longs en des versions plus courtes et plus gérables. Que ce soit pour partager des liens sur les réseaux sociaux, dans des e-mails ou même dans des documents imprimés, ces services jouent un rôle essentiel en facilitant la communication en ligne.

### Comment fonctionnent-ils ?

Les raccourcisseurs d'URL fonctionnent en assignant à un lien long une nouvelle URL plus concise, généralement composée de quelques caractères alphanumériques. Lorsqu'un utilisateur clique sur un lien, il est redirigé automatiquement vers l'URL d'origine. Cette redirection se fait en utilisant une technique appelée redirection HTTP (pour les plus curieux, le code de cette redirection est généralement `301`), où le serveur du raccourcisseur d'URL reçoit la demande de l'utilisateur et renvoie une réponse avec l'URL complète.

### Avantages et Utilisations

1. **Gain de Place** : Les URL longues peuvent être encombrantes et peu esthétiques, surtout sur des plateformes où l'espace est limité. Les raccourcisseurs permettent de réduire la longueur des liens, ce qui les rend plus attrayants et plus pratiques à partager.

2. **Suivi des Statistiques** : De nombreux services de raccourcissement d'URL offrent des fonctionnalités avancées de suivi, permettant aux utilisateurs de voir combien de fois leur lien a été cliqué, d'où proviennent les clics et même quand ils ont eu lieu. Cela peut s'avérer utile pour les campagnes de marketing en ligne ou simplement pour suivre l'engagement.

3. **Personnalisation des Liens** : Certains raccourcisseurs offrent la possibilité de personnaliser les URL raccourcies, ce qui permet aux utilisateurs de créer des liens plus mémorables et plus significatifs.

4. **Réduction des Erreurs** : Les URL longues peuvent être sujettes à des erreurs de saisie, ce qui peut entraîner des liens brisés. En utilisant des liens raccourcis, on réduit le risque d'erreurs de saisie et on assure une meilleure accessibilité aux ressources en ligne.

### Préoccupations en Matière de Confidentialité et de Sécurité

Bien que les raccourcisseurs d'URL offrent de nombreux avantages, ils ne sont pas exempts de préoccupations en matière de confidentialité et de sécurité. Étant donné que chaque clic sur un lien raccourci passe par le serveur du raccourcisseur, il existe un potentiel pour la collecte de données, ce qui peut soulever des inquiétudes en matière de vie privée. De plus, les liens raccourcis peuvent être utilisés à des fins malveillantes, comme le phishing ou la distribution de logiciels malveillants.

### En bref

Malgré ces préoccupations, les raccourcisseurs d'URL restent des outils précieux pour simplifier la navigation web et faciliter le partage de liens. En choisissant des services réputés et en restant vigilants quant à la sécurité en ligne, les utilisateurs peuvent profiter pleinement des avantages offerts par ces outils tout en minimisant les risques potentiels.

## Créer son propre outils de raccourcissement d'URL

Si l'on y réfléchit bien, les outils de raccourcissement d'URL ne sont composés que de 3 éléments:

- Une interface qui permet à l'utilisateur de créer une URL compressée

- Une mini base de donnée qui va permettre d'associer chaque code d'URL à l'URL initiale

- Un serveur qui va s'occuper de rediriger les URLs vers les bonnes URLs

Bien, maintenant que nous savons ce que nous allons construire, il nous faut désormais créer ces parties. Pour cela, je vais utiliser du code Javascript de A à Z. Si vous souhaitez vous informer sur les technologies que je vais utiliser pour ce tutoriel, voici des liens qui vous permettrons d'en apprendre plus:

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) : Pour créer l'interface où l'utilisateur va pouvoir compresser ses URLs
- [Node.js](https://nodejs.org/en) - [Express](https://expressjs.com/fr/) : Pour créer la partie serveur, gérer les requètes, etc...

### L'interface

Pour cette partie, nous allons simplement créer un formulaire HTML qui lorsqu'il sera validé, enverra une requète au serveur avec l'url qui doit se faire raccourcir. Le serveur se chargera de sauvegarder l'URL et nous renverra l'URL raccourcis.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Raccourcisseur d'URL - Home made</title>
    </head>
    <body>
    <h1>Mon Raccourcisseur d'URL</h1>
    <form method="POST" action="/new">
        <input type="url" name="url" placeholder="Entrez votre URL ici"/>
        <button type="submit">Raccourcir</button>
    </form>
    </body>
</html>
```

Et voilà! L'interface est déjà terminé! Facile non ? Bon, voici quelques petites explications sur ce code:

1. `method="POST"`: Etant donné que ce formulaire a pour but de "créer" des informations dans la partie server, nous utilisons un formulaire de type "POST" (en réalité c'est la requête qui sera de type "POST")

2. `type="url"`: Pour être certain que l'utilisateur rentre une url valide

3. `action="/new"`: Cette propriété permet de dire que la requête sera à faire sur l'URL `/new`

4. `<button type="submit">...`: Cette balise va être considéré comme un bouton qui, dès lors qu'il sera cliqué, validera et enverra le formulaire

Au final, voici ce que l'on obtient avec ce code:

![La page finale](/cdn/articles/url-shortener/page.png)

### Le serveur

Pour cette partie, nous allons utiliser [Express](https://expressjs.com/fr/) qui permet de créer la partie serveur beaucoup plus facilement et rapidemment.

#### Initialisation des modules

```js
// Import des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const path = require("node:path")

// Initialisation de l'application Express
const app = express();

// Configuration de l'analyseur de corps pour traiter les demandes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Création de la mini base de donnée
const bdd = new Map();

// Pour envoyer la page d'enregistrement des urls
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"))
})
```

#### Génération du code

```js
// Fonction pour générer un raccourci URL aléatoire
function generateCode(len= 6) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code= '';
  for (let i = 0; i < len; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
```

#### Enregistrement des URLs

Après avoir reçu le formulaire, il nous faut le traiter.
Le code ci-dessous s'occupe de recevoir l'url, de l'enregistrer et de générer et retourner le code associé.

```js
app.post('/new', async (req, res) => {
  const { url } = req.body;

  // Vérification si l'URL est déjà raccourcie
  const existingUrl = await bdd.get(url);
  if (existingUrl) {
    res.send(`URL compressé: ${existingURL}`);
    return;
  }

  // Création d'un nouveau raccourci URL
  const code= generateCode();

  // Sauvegarde de l'URL
  bdd.set(code, url)

  res.send(`URL compressé: /${code}`);
});
```

![Message de confirmation](/cdn/articles/url-shortener/validation.png)

#### Redirection des URLs

```js
app.get('/:code', async (req, res) => {
  const { code } = req.params;

  // Recherche de l'URL originale dans la base de données
  const url = bdd.get(code);
  if (!url) {
    res.status(404).send('URL not found');
    return;
  }

  res.redirect(url);
});
```

#### Fichier final

```js
// server.js

// Import des modules nécessaires
const express = require('express');
const bodyParser = require('body-parser');
const path = require("node:path")

// Initialisation de l'application Express
const app = express();

// Configuration de l'analyseur de corps pour traiter les demandes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Création de la mini base de donnée
const bdd = new Map();

// Route pour raccourcir une URL
app.post('/new', async (req, res) => {
  const { url} = req.body;

  // Vérification si l'URL est déjà raccourcie
  const existingUrl = await bdd.get(url);
  if (existingUrl) {
    res.send(`URL compressé: ${existingURL}`);
    return;
  }

  // Création d'un nouveau raccourci URL
  const code= generateCode();

  // Sauvegarde de l'URL
  bdd.set(code, url)

  res.send(`URL compressé: /${code}`);
});

// Route pour rediriger vers l'URL d'origine
app.get('/:code', async (req, res) => {
  const { code } = req.params;

  // Recherche de l'URL originale dans la base de données
  const url = bdd.get(code);
  if (!url) {
    res.status(404).send('URL not found');
    return;
  }

  res.redirect(url);
});

// Pour envoyer la page d'enregistrement des urls
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"))
})

// Fonction pour générer un raccourci URL aléatoire
function generateCode(len= 6) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code= '';
  for (let i = 0; i < len; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

### Résultat final

![Le projet final](/cdn/articles/url-shortener/final.mp4)

## Conclusion

Les raccourcisseurs d'URL simplifient la gestion des liens web en les compressant en des versions plus courtes et pratiques. Leur fonctionnement offre des avantages tels que le gain de place, le suivi des statistiques et la personnalisation des liens, mais soulève également des préoccupations en matière de sécurité et de confidentialité. En utilisant Node.js et Express.js, il est possible de créer un raccourcisseur d'URL fonctionnel, comme illustré dans l'exemple de code fourni.
