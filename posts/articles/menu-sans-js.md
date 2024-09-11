---
title: Créer un menu burger sans Javascript ?
description: Créer un menu qui s'ouvre en cliquant sur un bouton nécessite l'utilisation de Javascript... Sauf si vous utilisez cette technique !
category: astuces
coverURL: /cdn/articles/nojs-menu/thumbnail.png
tags:
  - codepen
  - css
  - input
  - checkbox
  - menu
  - menu burger
  - no js
  - tricks
  - astuces
ressources:
  - https://developer.mozilla.org/fr/docs/Web/HTML/Element/input/checkbox
  - https://developer.mozilla.org/fr/docs/Web/CSS/:checked
  - https://codepen.io/Johan-J/pen/poXYLKz
---

Pour créer un menu sur son site web, la plus part des personnes utiliserait un bouton, puis du javascript pour modifier le DOM lors du clique de ce bouton pour afficher/cacher le menu en utilisant les classes CSS.
Par exemple, voici un exemple de ce qui se fait le plus (en simplifiant bien sûr le code) :

```html
<!-- index.html -->
<nav id="mon-menu">
  <ul>
    <li>
      <a href="...">Lien menu 1</a>
    </li>
    <li>
      <a href="...">Lien menu 2</a>
    </li>
    <li>
      <a href="...">Lien menu 3</a>
    </li>
  </ul>
</nav>
<!-- ... -->
<button id="menu-toggler">MENU</button>
```

```js
// main.js
const menu = document.getElementById("mon-menu");
const toggler = document.getElementById("menu-toggler");
toggler.addEventListener("click", () => {
  menu.classList.toggle("is-open");
});
```

```css
#mon-menu:not(.is-open) {
  display: none;
}
```

Bon, et cette méthode marche parfaitement et aucune raison de changer de méthode !
Cet article a simplement pour but de vous montrer que vous pouvez obtenir exactement le même comportement sans utiliser la moindre ligne de code Javascript !

## L'astuce

Bon je ne vais pas vous faire attendre plus longtemps, pour obtenir un menu sans javascript, nous n'allons pas utiliser un bouton, mais bien un `input` de type `checkbox`.

> Les éléments &lt;input> de type checkbox sont affichés sous la forme de boîtes à cocher qui sont cochées lorsqu'elles sont activées. Elles permettent de sélectionner une ou plusieurs valeurs dans un formulaire. Leur apparence exacte dépend du navigateur utilisé. Il s'agit généralement d'une case carrée, dont les coins peuvent parfois être arrondis.
> &ndash; MDN Web Docs

### Pourquoi cet élément ?

Les éléments `input[type="checkbox"]` ne peuvent que prendre 2 valeurs: `yes` et `no`. La valeur de l'input est inversé lorsque l'on clique sur cet élément.
Vous voyez ou je veux en venir ? L'élément input permettra de représenter l'état du menu:

1. Si l'input n'est pas coché, alors le menu n'est pas affiché
2. Si l'input est coché, alors le menu est affiché

Le principe n'est pas plus compliqué que cela !

## L'élément input en action

Pour vous prouvez l'éfficacité de cet élément, nous allons créer un menu très simple en utilisant cette astuce.

> Note: Le menu de mon site web fonctionne également grâce à cette astuce 🎉 !

Commençons avec un code html très basique se constituant d'un menu, et de la page principale. Le menu se trouvera dans le header afin de garder une certaine sémantique :

```html
<header id="navbar">
  <h2>My navbar</h2>
  <input id="menu-toggler" title="Ouvrir/fermer le menu" type="checkbox" />
  <nav>
    <ul>
      <li>
        <a href="https://johan-janin.com" target="_blank">My website</a>
      </li>
      <li>
        <a href="https://github.com/johan-jnn" target="_blank">My Github</a>
      </li>
      <li>
        <a href="https://www.linkedin.com/in/johan-janin" target="_blank"
          >My LinkedIn</a
        >
      </li>
    </ul>
  </nav>
</header>
<main>
  <h1>Menu Burger sans Javascript !</h1>
  <p>
    Appuyez simplement sur le burger de la navbar pour voir ce projet en action
    !
  </p>
</main>
```

Après un peu de mise en forme, nous obtenons ceci :

![Base](/cdn/articles/nojs-menu/base.png)

## Ouvrir le menu

Dans la base du css que j'ai utilisé, j'ai décidé par défaut de masquer le menu en utilisant le code suivant :

```css
header > nav {
  display: none;
}
```

En css, l'input checkbox possède une propriété très utile qui permet de connaître son état: l'attribut `checked`

> La pseudo-classe :checked représente n'importe quel bouton radio (&lt;input type="radio">), case à cocher (&lt;input type="checkbox">) ou option (&lt;option> d'un élément &lt;select>) qui est coché ou activé (on). L'utilisateur peut modifier cet état en cliquant sur l'élément ou en sélectionnant une valeur différente auquel cas la pseudo-classe :checked ne s'applique plus à l'élément en question.
> &ndash; MDN Web Docs

En claire :

```css
input:checked {
  /* Ici le menu est ouvert */
}
input:not(:checked) {
  /* Ici le menu est fermé */
}
```

De fait, il nous faut simplement supprimer le `display: none` du menu lorsque cette checkbox est active (c'est à dire lorsque le sélécteur `input:checked` existe/est vrai).

Et pour récupérer cette information depuis l'élément `<header>`, on va utiliser le sélécteur `:has` qui permet de connaitre si un élément possède dans ses enfants le sélécteur mis en paramètre :

```css
header > nav {
  display: none;
}
header:has(> input:checked) > nav {
  display: block;
}
```

On pourrait même avoir une version compacté de ce code :

```css
header:not(:has(> input:checked)) > nav {
  display: none;
}
/* (Ici on inverse simplement la condition pour masquer le menu lorsque l'input checkbox n'est pas coché) */
```

Et voici le résultat :

![Ouverture et fermeture avec l'input checkbox](/cdn/articles/nojs-menu/no-anim.webm)

Et techniquement : vous avez votre menu : pas de javascript, simplement un astuce très maline en CSS.

## Styliser l'input

Et oui : vous n'allez pas garder cette espèce de case toute moche en tant qu'ouvreur/fermeur du menu ?
Il nous faut désormais pouvoir styliser cette checkbox. Et pour cela, nous allons utiliser [les pseudo-classes css](https://developer.mozilla.org/fr/docs/Web/CSS/Pseudo-classes) de l'élément :

```css
input {
  /* Afin de ne pas avoir l'apparence par défaut du navigateur pour les checkbox */
  appearance: none;
  position: relative;
}
input::before, input::after {
  content: "";
  position: absolute;
  left: 50%;
  height: 8px;
  translate: -50% -50%;
  border-radius: 999px;
  background-color: white;
}
input::before {
  top: 25%;
}
input::after {
  bottom: 25%
}
```

Voici la principale partie du code css qui me permet de styliser le bouton comme un vrai menu burger :

![Bouton du menu](/cdn/articles/nojs-menu/button.png)

## Touches finales

Enfin, j'ajoute quelques animations lors de l'ouverture et la fermeture de mon menu. De même pour mon bouton, je fais en sorte d'afficher une croix lorsque le menu est ouvert (pour faire comprendre à l'utilisateur que ce même bouton permet de fermer mon menu), et j'obtient un header avec menu burger entièrement fonctionnel :

![Projet final](/cdn/articles/nojs-menu/final.webm)

### Code source

J'ai placé ce projet sur codepen afin de vous permettre de voir le projet directement avec le code et le résultat sur la même page. Je vous laisse aller y jeter un oeil:

<!-- markdownlint-disable -->
<iframe height="500" style="width: 100%;" scrolling="no" title="Burger Menu Without JS" src="https://codepen.io/Johan-J/embed/poXYLKz?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/Johan-J/pen/poXYLKz">
  Burger Menu Without JS</a> by Johan JANIN (<a href="https://codepen.io/Johan-J">@Johan-J</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>
<!-- markdownlint-enable -->
