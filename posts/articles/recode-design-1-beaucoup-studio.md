---
title: "UI/UX Recode #1: Les cartes du studio Beaucoup"
description: "Recréation d'une conception UX par le studio de développement web Beaucoup. Au programme: du React, des animations GSAP et un système de \"cases\" à (re)développer !"
category: Redesign
coverURL: /cdn/articles/rd-1/banner.png
tags:
  - React
  - UI/UX
  - CSS
  - Maths
  - GSAP
  - Animations
  - Design
  - Développement
  - Beaucoup
  - Cases
  - Cartes
  - Projet
---

## Préambule

Cette série d'article a pour but de montrer les étapes à suivre afin de reconcevoir au mieux des éléments d'un site web déjà existant.

Le but ici n'est évidemment pas de faire mieux (ce serait très prétentieux), mais essayer de se rapprocher au mieux du design original, sans pour autant faire un copier-coller.

Si cette série d'articles vous plait, n'hésitez pas à le partager sur les réseaux sociaux (voir en fin d'article la rubrique "partager").

---

## Le studio

En faisant mes recherches pour trouver un stage afin de valider mon année de Bachelor 1, je suis tombé sur le site web du studio Beaucoup.

Ce studio conçu en 2021 et basé à Lyon est reconnu pour ses designs et expériences utilisateurs plus qu'à la perfection. Et pour cause : à chaque création de sortie, ils sont récompensés pour leur travail :

- 12 "site of the day"

  - 2 sur [Awwward](https://awwward.com)
  - 6 sur [FWA](https://fwa.com)
  - 4 sur [CSS Design Awards](https://cssdesignawards.com)

- 22 mentions spéciales

Je trouve ça réellement incroyable qu'un studio aussi jeune puisse être aussi performant et qualitatif.

Il y a énormément de choses à dire sur ce studio. Malheureusement, je ne vais pas détailler ce sujet ici, mais si vous souhaitez en connaître plus sur ce studio, je vous invite à consulter directement [la page dédié à cela sur leur site web](https://beaucoup.studio/studio/).

## Design original

Revenu au design que l'on va recréer aujourd'hui. Le site web de Beaucoup est en fait assez simple quand on y réfléchit bien :

- Une grille qui fait office de contenu de la page

- Des cartes qui se fixent sur cette grille où le contenu de la page est rédigé

Ces cartes peuvent être déplacées sur la grille selon notre guise (hormis certaines cartes que l'on va appeler "statiques" - c'est le cas de la carte "menu").

Lorsque l'on fait bouger une carte, les cases où la carte va être placé au final sont mis en avant en changeant leur couleur de fond (en bleu ciel).

Le site original vaudra surement mieux que mille mots :

<iframe src=https://beaucoup.studio/ width="100%" height="500px" loading="lazy"></iframe>

## La recréation

Maintenant que l'on connais le design de ce que l'on veut reproduire, il nous faut désormais... le reproduire : cela va de sois !

J'ai décidé de séparer les étapes de la recréation dans leur ordre chronologique.

### 1. Les technologies

La première chose que je fais lorsque je vois un design qui me plait, c'est de comprendre comment il a été conçu. Et pour ce faire je vais voir les technologies que le site a utilisées. En utilisant l'extension chrome [Wappalizer](https://wappalizer.com), j'apprends que le studio utilise pour son site web :

- ⚛️ [React](https://fr.react.dev/) en tant que framework
- 🚀 [GSAP](https://gsap.com/) pour les animations
- D'autres outils dont nous n'aurons pas besoin pour ce projet

Pour m'approcher au mieux du résultat final, j'ai utilisé les mêmes technologies qu'eux afin de reconcevoir leur design.

### 2. Mise en place du projet

En utilisant [Vite](https://vitejs.dev/), j'ai rapidement créer les différents fichiers nécessaire au fonctionnement du site.

J'ai ensuite installé [SASS](https://sass-lang.com/) qui va me permettre d'écrire du CSS bien plus facilement.

### 3. Les cartes

Afin de pouvoir éditer au maximum chaque carte de la grille, j'ai décidé d'associer chaque carte à un composant React.
Cependant ne faire que cela ne serait pas suffisant, car je dois dans chaque composant stocker sa position sur la grille ainsi que la place en `x` et `y` que la case prendrait.

#### Classes parents

Il faut savoir que React permet de créer des composants de 2 manières différentes :

1. Par des functions qui retournent du JSX
2. En créant directement une classe de type `React.Component`

Afin de pouvoir "hériter" les propriétés, j'ai utiliser pour la création des cartes la deuxième méthode. De sorte à ce que je puisse créer une classe "parent" qui demanderait toutes les propriétés nécessaires au bon fonctionnement des cartes.

```tsx
export class Carte extends React.Component {
 readonly breakpoints: BreakPoint[];
 constructor(...breakpoints: BreakPoint[]) {
  super({});
  this.breakpoints = breakpoints;
 }
}
```

Cette classe prend en argument une liste de `breakpoints`, ce qui permettra par la suite de rendre la grille entièrement responsive.

Voici les propriétés d'un breakpoint :

```ts
interface BreakPoint {
 /**
  * The width of the grid container.
  */
 width?: {
  min?: number;
  max?: number;
 };
 /**
  * The height of the grid container.
  */
 height?: {
  min?: number;
  max?: number;
 };
 relativeTo?: "container" | "window" | (string & {});
 box: Box;
}
```

Les propriétés `width` et `height` permettent de définir la largeur/hauteur minimal et maximal valide pour que ce breakpoint soit utilisé.
La propriété `relativeTo` permet d'utiliser la `width` et la `height` de la grille, de la page ou de n'importe quel élément (via un sélécteur CSS) pour les propriétés `width` et `height` du breakpoint.
Enfin, la propriété `box` correspond à la taille et le placement de la carte lorsque ce breakpoint est utilisé :

```ts
interface Box {
 x: number;
 y: number;
 height: number;
 width: number;
}
```

![Responsive des cartes](/cdn/articles/rd-1/cards_responsive.webm)

#### Exemple d'une carte

Voici un exemple de carte utilisé dans le projet (celle-ci correspond au logo) :

```tsx
export default class LogoTile extends Carte {
 constructor() {
  super(
   {
    box: {
     x: 0,
     y: 0,
     width: 2,
     height: 2,
    },
   },
   {
    width: {
     max: 550,
    },
    relativeTo: "window",
    box: {
     x: 8,
     y: 0,
     width: 2,
     height: 2,
    },
   }
  );
 }

 render(): ReactNode {
  return (
   <button
    id="logo"
    onClick={() => {
     console.log("Button clicked !");
    }}
   >
    <img src="/johan_janin.svg" alt="Logo Johan Janin" />
   </button>
  );
 }
}
```

![Carte logo](/cdn/articles/rd-1/logo_card.png)

L'avantage avec cette méthode, c'est que le contenu des cartes est entièrement indépendant : vous pouvez écrire du React comme bon vous semble (avec des écouteurs d'évênements, des `position: absolute`, etc...).

### 4. La grille

Sur leur site web, chaque case de la grille était créée par une `<div></div>`.

Le problème de cette approche selon moi est la performance.

Sur un site web de cette taille, le nombre de case peut facilement être à plus de 100. Maintenant, ajoutez à chaqu'une de ces cases un écouteur d'événements, et ça devient vite compliqué à gérer.

#### Mon alternative

Plutôt que d'avoir un élément par case, j'ai plutôt pensé à **ne pas avoir de cases dutout**.

Oui vous avez bien lu, et je vais vous expliquer comment.

Quand je dis ne pas avoir de cases, je signifie simplement que les cases seront virtuelles, qu'elles ne seront pas présente dans le contenu de la page. Comment on fait cela ?

Avec des mathématiques, et les `background` des éléments.

![La grille en un unique élément](/cdn/articles/rd-1/empty_grid.png)

Je commence par créer mon composant `Grille` :

```tsx
export interface GrilleProps {
 cartes: Carte[];
 width: number;
 height: number;
}

export default function Grille({ cartes, width, height }: GrilleProps) {
 const [cases, setCases] = useState({
  size: 0,
  x: 0,
  y: 0,
 });

 return (
  <div
   id="grid"
   style={{
    "--case-size": cases.size,
    "--cases-x": cases.x,
    "--cases-y": cases.y,
   }}
  >
   {cartes.map((Carte) => (
    <Carte />
   ))}
  </div>
 );
}
```

> Note: Dans cet article tous les composants seront simplifiés, afin de facilité la lecture et d'aller à l'essentiel. De fait le code du projet final et celui de cet article peut être différent

Maintenant que l'on a le composant il faut faire en sorte qu'il fonctionne. Pour ce faire, je vais utiliser le hook `useEffect` afin de calculer la bonne dimension des cases en fonction des paramètres entrés.

Utiliser `useEffect` va également me servir afin que la grille soit entièrement responsive même après le changement de la taille de la page :

```tsx
export default function Grille(...) {
  // ...
  useEffect(() => {
    function calculateCasesInfo() {
      // ...
    }
    window.addEventListener("resize", calculateCasesInfo)
    calculateCasesInfo()

    return () => {
      window.removeEventListener("resize", calculateCasesInfo)
    }
  }, [width, height, cartes])
  return // ...
}
```

Et il ne me reste plus qu'à calculer la taille des cases, et le nombre de celles-ci sur l'horizontale et la verticale :

```tsx
function calculateCasesInfo() {
 const maxHorizontalCases = Math.max(...cartes.map((t) => t.x + t.width));
 const maxVerticalCases = Math.max(...cartes.map((t) => t.y + t.height));

 const size = width / maxHorizontalCases;

 setCases({
  size,
  x: maxHorizontalCases,
  y: maxVerticalCases,
 });
}
```

![Responsive de la grille](/cdn/articles/rd-1/grid_responsive.webm)

> Note : pour simplifier les choses, je n'ai pas inclu le choix du breakpoint des cartes dans ce code.
> Mais pour faire court, pour ce faire, voici les étapes que j'utilise :
>
> 1. Je compare les breakpoints pour récupérer uniquement ceux qui sont valides
> 2. Je les compare entre-eux pour savoir celui qui est le plus spécifique
> 3. J'utilise la box du breakpoint retourné

### 5. Déplacement et animations

Maintenant que les cartes sont sur la grille, que la grille est correctement créée, il nous faut désormais coder le plus interressant du projet : la possibilité de déplacer les cartes sur la grille.

Pour ce faire, j'ai utilisé GSAP qui avec sa librairie [`Draggable`](https://gsap.com/docs/v3/Plugins/Draggable/) et son pluggin [`InertiaPlugin`](https://gsap.com/docs/v3/Plugins/InertiaPlugin/) vont me permettre d'atteindre le résultat du site de Beaucoup.

> Note : le pluggin `InertiaPlugin` est un pluggin reservé aux membres [Club de GSAP](https://gsap.com/pricing/).
> Heureusement, GSAP autorise l'utilisation de ce pluggin gratuitement sur les sites comme `codesandbox`, ou `codepen`, etc...

Avant toute chose, il nous faut enregistrer ces pluggins dans GSAP :

```ts
import { gsap } from "gsap";
import Draggable from "gsap/Draggable";
import InertiaPlugin from "gsap-trial/InertiaPlugin";
gsap.registerPlugin(Draggable, InertiaPlugin);
```

#### Draggable

Le pluggin `Draggable` permet de rendre n'importe quel élément déplaçable en suivant au besoin des règles définies.
Pour notre projet, voici les différentes règles à respecter :

1. L'élément ne doit pas être déplacé en dehors de la grille
2. L'élément doit toujours se placé sur la grille
3. L'élément doit connaitre sont état (relaché ou en mouvement) : pour les animations liées à cette règle

Pour utiliser ce pluggin, on va devoir changer un petit peu la manière dont les cartes sont créées à l'interrieur de la grille.
En effet, il nous faut pouvoir les récupérer lors de leur création afin d'initaliser le pluggin pour chaqu'une de ces cartes.
Et pour ce faire, quoi de mieux qu'un nouveau composant "d'initalisation" de carte ? :

```tsx
function CreerCarte(props: {
 carte: Carte;
 tailleCase: number;
 breakpoint: Breakpoint;
}) {
 const {
  carte,
  tailleCase,
  breakpoint: { x, y, width, height },
 } = props;
 const container = useRef();

 useEffect(() => {
  if (!container.current) return;

    // Pour bien placer la carte au chargement de la page
  gsap.to(container.current, {
   x: x * tailleCase,
   y: y * tailleCase,
   duration: 0,
  });

    // Pour rendre la carte déplaçable sur la grille
  Draggable.create(container.current, {
   type: "x,y",
      // Cette propriété permet de forcer à ce que la carte soit toujours placée sur la grille
   snap: {
    x: (v) => Math.floor(v / tailleCase) * tailleCase,
    y: (v) => Math.floor(v / tailleCase) * tailleCase,
   },
      // Celle-ci permet de forcer à ce que la carte reste toujours à l'interrieur de la grille
   bounds: "#grid",
      // Ces deux propriétés permette d'ajouter/supprimer la classe `dragging` suivant si la carte
      // est en train d'être déplacée ou non.
   onDragEnd() {
    container.current?.classList.remove("dragging");
   },
   onDragStart() {
    container.current?.classList.add("dragging");
   },
  });
 }, [tailleCase, container]);

 return (
  <div
   id={carte.constructor.name}
   ref={container}
   style={{
    width: tailleCase * width + "px",
    height: tailleCase * height + "px",
    position: "absolute",
   }}
  >
   {carte.render()}
  </div>
 );
}
```

En en quelques ligne la fonctionnalité principale du projet est créée (merci GSAP pour la simplicité à faire ce genre d'interraction !).

![Grille sans inertiaPluggin](/cdn/articles/rd-1/without_inertia.webm)

#### InertiaPlugin

Je vous ai parlé plus tôt du pluggin `InertiaPlugin` du GSAP. Celui-ci va nous permettre d'animer la carte lorsqu'elle se replace sur la grille lorsque vous "relâcher" la carte.

![Grille avec ineriaPluggin](/cdn/articles/rd-1/with_inertia.webm)

### 6. Profiter du résultat

Et voilà! Le projet est fini, est entièrement fonctionnel.
Le seul problème n'est désormais que votre imagination afin de rajouter différentes cartes !

Vous pouvez retrouver le résultat de cet article dans mes projets :

- [Sur mon portfolio](/portfolio#rework-beaucoup)
- [Sur le site web du projet](https://ktgqgn-5173.csb.app/)

Pour le code source, vous pouvez directement le retrouver sur [Github](https://github.com/johan-jnn/tiles-grid) ou sur le codesandbox ci-dessous :

<iframe src="https://codesandbox.io/p/devbox/objective-wind-ktgqgn?embed=2"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="grid-cards"
     loading="lazy"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
