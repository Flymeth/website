---
title: "UI/UX Recode #2: Le scroll horizontal du studio Akaru"
description: "Recréation d'une conception UX par le studio de développement web Akaru. Au programme: du Vue, des animations GSAP et un scroll horizontal à (re)développer !"
category: Redesign
coverURL: /cdn/articles/rd-2/banner.png
tags:
  - Vue
  - UI/UX
  - CSS
  - Maths
  - GSAP
  - Animations
  - Design
  - Développement
  - Akaru
  - Scroll
  - Projet
---

## Préambule

Cette série d'article a pour but de montrer les étapes à suivre afin de reconcevoir au mieux des éléments d'un site web déjà existant.

Le but ici n'est évidemment pas de faire mieux (ce serait très prétentieux), mais essayer de se rapprocher au mieux du design original, sans pour autant faire un copier-coller.

Si cette série d'articles vous plait, n'hésitez pas à le partager sur les réseaux sociaux (voir en fin d'article la rubrique "partager").

---

## Le studio

En faisant mes recherches pour trouver un stage afin de valider mon année de Bachelor 1, je suis tombé sur le site web du studio Akaru.

Ce studio conçu en 2008 et basé à Lyon est reconnu pour ses designs et expériences utilisateurs plus qu'à la perfection. Et pour cause : à chaque création de sortie, ils sont récompensés pour leur travail :

- 25 "site of the day"

  - 19 sur [Awwward](https://awwward.com)
  - 6 sur [FWA](https://fwa.com)

- 20+ mentions spéciales

Bref, ce studio est une reférence en terme de création de site web de tous types. Il y a énormément de choses à dire sur ce studio. Malheureusement, je ne vais pas détailler ce sujet ici, mais si vous souhaitez en connaître plus sur ce studio, je vous invite à consulter directement [la page dédié à cela sur leur site web](https://akaru.fr/agence-web-lyon/).

## Design original

Revenons au design que l'on va recréer aujourd'hui. Le site web d'Akaru m'a en premier lieu paru très complexe à recréer :

- Il y a de nombreux changements entre un scroll "normal" et des scrolls horizontaux

- Pour chacun de ces scrolls il y a des animations lié à la perfection à celui-ci

Autant vous dire que rien que de refaire un scroll horizontal à leur manière m'a en premier lieu semblé assez compliqué.

Pour vous aider à meux comprendre ce que je souhaite recréer, voici leur site web en action (scrollez vers le bas pour découvrir le scroll horizontal que je souhaite recréer) :

<iframe src=https://akaru.fr/ width="100%" height="750px" loading="lazy"></iframe>

## La recréation

Maintenant que l'on connais le design de ce que l'on veut reproduire, il nous faut désormais... le reproduire : cela va de sois !

J'ai décidé de séparer les étapes de la recréation dans leur ordre chronologique.

### 1. Les technologies

La première chose que je fais lorsque je vois un design qui me plait, c'est de comprendre comment il a été conçu. Et pour ce faire je vais voir les technologies que le site a utilisées. En utilisant l'extension chrome [Wappalizer](https://wappalizer.com), j'apprends que le studio utilise pour son site web :

- ⚛️ [Vue](https://vuejs.org/) en tant que framework
- D'autres outils dont nous n'aurons pas besoin pour ce projet

Pour m'approcher au mieux du résultat final, j'ai utilisé les mêmes technologies qu'eux afin de reconcevoir leur design.
J'ai également décidé d'utiliser [GSAP](https://gsap.com/) pour ce projet afin de me faciliter la création du scroll horizontal.

> Note: c'est la première fois que j'utilise Vue pour un projet, donc il se peut qu'il y ait de nombreuses mauvaises pratiques dans mon code
> Soyez indulgent et n'hésitez pas à partager mes fautes sur les réseaux ;)

### 2. Mise en place du projet

En utilisant [Vite](https://vitejs.dev/), j'ai rapidement créer les différents fichiers nécessaire au fonctionnement du site.

J'ai ensuite installé [SASS](https://sass-lang.com/) qui va me permettre d'écrire du CSS bien plus facilement.

![Structure du projet](/cdn/articles/rd-2/file_structure.png)

### 3. Le slider

Après quelques recherches, j'ai découvert qu'un scroll horizontal comme celui-ci se faisait assez simplement grâce au pluggin [ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).
En fait, il suffit de choisir l'élément parent qui va contenir les "slides", avec du CSS mettre ces slides les unes à côté des autres, et grâce à ce pluggin faire défiler cet élément parent (que l'on appelera le "slider") de la droite vers la gauche.

```vue
<script setup lang="ts">
const { slides } = defineProps<{ slides: any[] }>();
const container = ref<HTMLUListElement>();
onMounted(() => {
  gsap.to(container.value, {
    translateX: () => -container.value!.scrollWidth,
    scrollTrigger: {
      scrub: 1,
      trigger: container.value,
      start: "top top",
      end: () => `+=800`,
      pin: true,
    },
  });
});
</script>

<template>
  <div id="slider">
    <ol ref="container">
      <li v-for="slide in slides" :key="element.id">
        <component :is="element"></component>
      </li>
    </ol>
  </div>
</template>

<style scoped lang="scss">
#slider {
  width: 100%;
  overflow: hidden;
  ol {
    list-style: none;
    display: flex;
    width: fit-content;
    height: 100vh;

    > li {
      height: 100%;
      width: 100vw;
    }
  }
}
</style>
```

Et globalement... le projet est déjà fini...
Grâce à ce petit bout de code on possède déjà un slider horizontal fonctionnel : Merci GSAP !
Je vais quand même avant de continuer expliquer les paramètres entrés dans le pluggin ScrollTrigger :

```ts
gsap.to(container.value, {
  // Ici le but est de scroller l'entièreté du container
  translateX: () => -container.value!.scrollWidth,
  scrollTrigger: {
    // Ce paramètre permet de racrocher l'animation au scroll de la page
    scrub: 1,
    // Le trigger est en fait ce qui va déclancher le scroller
    trigger: container.value,
    // On commence l'animation quand le "top" du trigger atteint le "top" de la viewport
    start: "top top",
    // Et l'animation se termine après avoir scrollé 800 pixels à partir du début de l'animation
    end: () => `+=800`,
    // Pin permet de garder le container visible et au même endroit qu'au début de
    // l'animation pendant toute la durée de celle-ci
    pin: true,
  },
});
```

![Slider en action](/cdn/articles/rd-2/slider.webm)

### 4. Les slides

Vous avez peut-être pu le remarquer dans la [création du slider](#3-le-slider), mais pour que celui-ci fonctionne, il lui faut des slides. Et pour ce faire je ne vais pas m'amuser à créer les slides directement dans le slider, mais plutôt utiliser les `props` du composant du slider pour lui passer une liste de slides (qui ne seront rien d'autre que des composants vue) en paramètres.

```vue
<!-- Slider.vue -->
<script setup lang="ts">
// Définition des props attendus par le slider lors de sa création
const { slides } = defineProps<{ slides: any[] }>();
// ...
</script>
<template>
  <!-- ... -->
  <!-- Instanciation des différentes slides -->
  <li v-for="slide in slides" :key="element.id">
    <component :is="element"></component>
  </li>
</template>
```

De fait, lors de la création du slider, je n'ai plus qu'à passer ma liste de slides (qui encore une fois ne sont rien de plus que des composants vue que je n'ai qu'à importer) dans le slider :

```vue
<!-- App.vue -->
<script setup lang="ts">
import Slider from "./components/Slider.vue";
import IndexSlide from "./components/IndexSlide.vue";
import FooterSlide from "./components/FooterSlide.vue";
import CustomSlide from "./components/CustomSlide.vue";
</script>

<template>
  <Slider :cards="[IndexSlide, CustomSlide, FooterSlide]" />
</template>
```

#### Exemple d'une slide

Voici un exemple de ce à quoi peut ressembler une slide (ici c'est la slide `IndexSlide.vue`) :

```vue
<template>
  <header>
    <h1>Scroll Horizontal</h1>
    <p>
      Mon petit slider à la manière du studio
      <a href="https://akaru.fr" target="_blank">Akaru</a>.
    </p>
    <p style="max-width: 500px; margin-top: 15px">
      Ce slider présente une partie des agences web où j'aimerai avoir
      l'opportunité de faire mon stage.
    </p>

    <div class="mouse">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
      >
        <!-- ... -->
      </svg>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: grid;
  place-content: center;
  text-align: center;
  background-image: url("/homeSlideBG.svg");
  background-size: cover;
  background-position: center;
  position: relative;

  > .mouse {
    position: absolute;
    width: 75px;
    aspect-ratio: 1 / 1;
    top: 60%;
    left: 50%;
    animation: mouseAnimation infinite ease-in-out alternate 5s;

    @keyframes mouseAnimation {
      from {
        translate: -50% 0;
      }
      to {
        translate: -50% 15px;
      }
    }
  }
}
</style>
```

![Slide index](/cdn/articles/rd-2/slide_exemple.png)

L'avantage avec cette méthode, c'est que le contenu des slides est entièrement indépendant : vous pouvez écrire du vuejs comme bon vous semble (avec des écouteurs d'évênements, des `position: absolute`, etc...).

### 5. Slides spéciales

Sur leur site web, on peut remarquer que les slides de leur scroll horizontal sont relativement similaires:

![Similitute des slides (slide 1 / 3)](/cdn/articles/rd-2/akaru_slide1.png)
![Similitute des slides (slide 2 / 3)](/cdn/articles/rd-2/akaru_slide2.png)
![Similitute des slides (slide 3 / 3)](/cdn/articles/rd-2/akaru_slide3.png)

De fait, au lieu de concevoir un composant par slide, j'ai décidé de créer une slide qui va prendre en paramètre les différentes informations de la slide :

- Le titre
- L'image de fond
- La couleur de l'arrière plan et du texte
- Les différents "tags" (ce qu'il y a à droite de chaque slides sur le site du studio)
- Une date (dont on ne prendra que l'année)
- Et un éventuel lien

Ensuite, il suffit simplement de créer ce composant et de le styliser pour faire en sorte qu'il ressemble le plus possible aux slides du studio Akaru :

```vue
<!-- BuildInSlide.vue -->
<script setup lang="ts">
interface BuiltInSlideOptions {
  title: string;
  cover: string;
  tags: string[];
  date: Date;
  id: number;
  color: string;
  link?: string;
  fontColor?: string;
}
defineProps<BuiltInSlideOptions>();
</script>

<template>
  <section
    :style="{
      backgroundColor: color,
      color: fontColor,
      borderColor: fontColor,
      '--font-color': fontColor,
      '--back-color': color,
    }"
  >
    <img :src="cover" :alt="`${title}'s cover'`" />
    <main>
      <div class="top">
        <span class="date">{{ date.getFullYear() }}</span>
        <ul class="tags">
          <li v-for="tag in tags" :key="tag">
            {{ tag }}
          </li>
        </ul>
      </div>
      <h2>
        {{ title }}
      </h2>
      <div class="bottom">
        <span class="index">{{ id }}</span>
        <a :href="link" target="_blank" v-if="link"> 🔗 </a>
      </div>
    </main>
  </section>
</template>

<style scoped lang="scss">
// ...
</style>
```

Puis il m'a suffit d'ajouter ces slides au slider avec différents paramètres :

<!-- prettier-ignore -->
```vue
<!-- App.vue -->
<script setup lang="ts">
import Slider from "./components/Slider.vue";
import IndexSlide from "./components/IndexSlide.vue";
import FooterSlide from "./components/FooterSlide.vue";
import BuildInSlide from "./components/BuildInSlide.vue";
</script>

<template>
  <Slider :cards="[
    IndexSlide, 
    <BuildInSlide 
      title = "Studio Akaru"
      color = "#000"
      fontColor = "#bfccd8"
      cover = "/covers/akaru.png"
      date = new Date("09-02-2024")
      tags = ["web", "lyon", "creative design"]
      link = "https://akaru.fr"
    />,
    FooterSlide
  ]" />
</template>
```

![Slide "BuiltIn"](/cdn/articles/rd-2/buildin_slide.png)

### 6. Transmition des informations du scroll

Vous l'aurez surement remarqué, mais sur le site web du studio Akaru, en même temps que l'utilisateur scroll, il y a des animations sur les slides.
Pour ce faire, il me suffit de transmettre l'état actuel du scroll aux différentes slides.
De fait, je me dis que chacune des slides recevra une props nommé `tween` qui correspondra à la séquence du scroll :

```vue
<script setup lang="ts">
// ...
let tween: GSAPTween;
onMounted(() => {
  tween = gsap.to(container.value, {
    translateX: () => -container.value!.scrollWidth,
    scrollTrigger: {
      scrub: 1,
      trigger: container.value,
      start: "top top",
      end: () => `+=800`,
      pin: true,
    },
  });
});
</script>
<template>
  <!-- ... -->
  <component :is="element" :tween="tween"></component>
</template>
```

Cela va me permettre de récupérer les informations de scroll pour chaque slide et gérer les animations en fonction de celui-ci. Par exemple pour la dernière slide :

```vue
<!-- Footer.vue -->
<script setup lang="ts">
// ... (importations)

const hearts = ref<HTMLOrSVGImageElement[]>();
const heartsContainer = ref<HTMLDivElement>();

const { tween } = defineProps<{
  tween?: GSAPTween;
}>();

watchEffect(() => {
  if (heartsContainer.value && tween) {
    const randomPosition = gsap.utils.random(0, 100, 1, true);

    gsap.to(hearts.value || [], {
      rotate: () => gsap.utils.random(0, 360, 1) + "deg",
      top: () => randomPosition() + "%",
      left: () => randomPosition() + "%",
      width: gsap.utils.random(20, 125, 1, true),
      duration: 3,
      stagger: 0.005,
      ease: "elastic.out",
      scrollTrigger: {
        trigger: heartsContainer.value,
        // Ici j'insère la "tween" car la slide est à l'interieur d'un élément animé par GSAP
        // De fait la ligne suivante permet de bien prendre en compte cela
        containerAnimation: tween,
        start: "left center",
      },
    });
  }
});
</script>

<template>
  <footer>
    <div class="background" ref="heartsContainer">
      <svg
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        v-for="_ in 25"
        ref="hearts"
        viewBox="2.5 7.65 640 575.43"
      >
        <!-- ... -->
      </svg>
    </div>
  </footer>
</template>
```

Cela va me permettre de créer une animation de 3 secondes avec des valeurs de paramètres aléatoires qui démarera quand la slide atteindra le milieu de la viewport :

![Animation du footer](/cdn/articles/rd-2/footer_anim.webm)

### 7. Résultat final

Et voilà! Le projet est fini, et entièrement fonctionnel.
Le seul problème n'est désormais que votre imagination afin de rajouter différentes slides !

Vous pouvez retrouver le résultat de cet article dans mes projets :

- [Sur mon portfolio](/portfolio?open=rework-akaru)
- [Sur le site web du projet](https://h3ccd9-5173.csb.app/)

Pour le code source, vous pouvez directement le retrouver sur [Github](https://github.com/johan-jnn/horizontal-scroll) ou sur le codesandbox ci-dessous :

<iframe src="https://codesandbox.io/p/devbox/horizontal-scroll-h3ccd9?embed=1"
  style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
  title="horizontal-scroll"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  loading="lazy"
></iframe>
