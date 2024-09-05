---
name: "Système de 'cartes'"
description: "Recréation d'un système de 'carte' déplaçables sur une grille définie"
bannerURL: "/cdn/projects/remake-beaucoup/overview.png"
github: https://github.com/johan-jnn/tiles-grid
codesandbox: https://codesandbox.io/p/devbox/grid-cards-ktgqgn
link: https://ktgqgn-5173.csb.app/
---

# Recréation d'un design créatif d'une agence

Le but de ce projet était de recréer le système de "cartes" déplaçable sur une grille.
Cette idée m'est venu en découvrant le [site internet du studio Beaucoup](https://beaucoup.studio).

![Overview](/cdn/projects/remake-beaucoup/overview.png)

J'ai utilisé pour ce projet les technologies suivantes :

- Reactjs (et Vite) : pour utiliser les mêmes technologies que le site d'origine
- GSAP : pour les animations et le système de déplacement des cartes
- SASS (SCSS) : pour me faciliter au mieux l'écriture du style de la page

## La Grille

Pour créer la grille j'ai créé un composant qui me permettra de définir les comportements de celle-ci en fonction des paramètres entrés afin de me faciliter au mieux la création de celle-ci suivant les besoins.

```js
import Grid from "./components/Grid";
//... (other imports)

function App() {
 return (
  <Grid
   tiles={[LogoTile, MainHeader, Content, QRCodes, Stats]}
   behavior={{
    auto_size: "height",
   }}
  />
 );
}
```

Le paramètre `tiles` permet d'inclure les différentes cartes dans la grille.
Le paramètre `behavior` permet de gérer le comportement de la grille.

Ces deux paramètres sont obligatatoires.

### Le paramètre Behavior

Ce paramètre est obligatoire, et peux se définir comme 3 type d'objet différents:

#### Largeur de la grille forcé

```ts
behavior: {
 width?: number;
 horizontal_tiles_count?: number;
}
```

Grâce à ce type d'objet, vous pourrez sois:

- Définir la largeur de la grille
- Définir le nombre de cases sur la largeur de la grille
- Définir ces deux comportements en même temps

#### Hauteur de la grille forcé

```ts
behavior: {
 height?: number;
 vertical_tiles_count?: number;
}
```

Grâce à ce type d'objet, vous pourrez sois:

- Définir la hauteur de la grille
- Définir le nombre de cases sur la hauteur de la grille
- Définir ces deux comportements en même temps

#### Taille calculé automatiquement

```ts
behavior: {
 auto_size: "width" | "height";
}
```

Grâce à ce type d'objet, vous pourrez, sur la largeur ou la hauteur, faire en sorte que le composant créer automatiquement le nombre de cases sur la grille en fonction des cartes que vous lui donnerez, et calculer la hauteur/largeur en fonction la place que prendra le container initalement.

Cette propriété est utile lorsque vous ne savez pas d'avance le nombre de case qu'auront besoin les différentes cartes de la grille.

## Les cartes

Afin de me simplifier le temps de développement, j'ai conçu une classe utilitaire afin que chaque Carte de la grille possèdent les mêmes comportements :

```ts
export class TileBuilder extends React.Component {
 protected element = React.createRef<HTMLElement>();
 readonly breakpoints: BreakPoint[];
 constructor(...breakpoints: BreakPoint[]) {
  super({});
  this.breakpoints = breakpoints;
 }
}
```

Afin que la grille sois responsive, j'ai conçu un système de `breakpoints` afin de changer la disposition et la taille des cartes au besoin au changement de la hauteur/largeur de la fenêtre/grille ou n'importe quel autre élément.

### Les breakpoints

Voici comment se construit un breakpoint :

```ts
interface BreakPoint {
 width?: {
  min?: number;
  max?: number;
 };
 height?: {
  min?: number;
  max?: number;
 };
 relativeTo?: "container" | "window" | (string & {});
 name?: string;
 box: TileBox;
}
```

propriété | utilité
---|---
width | Permet de définir la largeur minimal/maximal que l'élément de référence doit avoir afin que ce breakpoint soit valide
height | Permet de définir la hauteur minimal/maximal que l'élément de référence doit avoir afin que ce breakpoint soit valide
relativeTo | permet de définir l'élément de référence ("container" = la grille (par défaut) ; "window" = la fenêtre ; string = un sélecteur CSS)
name | Permet de définir un nom à la viewport. Si celle-ci est active, la grille possédera l'attribut `data-viewport` dont la valeur sera celle défini par cette propriété
box | La taille et position de la carte si cette viewport est active

### Définition de la taille et position d'une carte

Vous avez surement du remarqué la propriété `box` des viewports.
Cette propriété permet de définir la taille et la position de la carte sur la grille :

```ts
interface TileBox {
 location: {
  x: number;
  y: number;
 };
 size: {
  width: number;
  height: number;
 };
}
```

## Exemple d'une carte

Afin de conclure ce projet, voici le code qui représente la carte où est affiché mon logo (en haut à droite de la capture d'écran au début de ce projet) :

```ts
import { ReactNode } from "react";
import { TileBuilder } from "./_tile";
import "./styles/Logo.scss";
import gsap from "gsap";

export default class LogoTile extends TileBuilder {
 constructor() {
  // Définition des différents breakpoints
  super(
   {
    box: {
     location: {
      x: 0,
      y: 0,
     },
     size: {
      width: 2,
      height: 2,
     },
    },
   },
   // Lorsque la largeur de l'écran est en dessous
   // de 550px, on place la carte à droite de la grille
   {
    width: {
     max: 550,
    },
    relativeTo: "window",
    box: {
     location: {
      x: 8,
      y: 0,
     },
     size: {
      width: 2,
      height: 2,
     },
    },
   }
  );
 }

 render(): ReactNode {
  return (
   <button
    id="logo"
    ref={this.element}
    // Petit easter-egg :
    // Lorsque l'on clique sur la carte,
    // On fait tourner le logo avec une animation
    // conçu avec GSAP
    onClick={() => {
     if (this.element.current) {
      gsap.fromTo(
       this.element.current.children[0],
       {
        rotate: 0,
       },
       {
        rotate: "360deg",
        duration: 3,
        ease: "elastic.out(1,0.5)",
       }
      );
     }
    }}
   >
    <img src="/johan_janin.svg" alt="Logo Johan Janin" />
   </button>
  );
 }
}
```

## Projet final

<iframe src="https://codesandbox.io/p/devbox/objective-wind-ktgqgn?embed=2"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="grid-cards"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
     loading="lazy"
   ></iframe>
