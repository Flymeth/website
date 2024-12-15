<script lang="ts">
  import WorkWithMe from "$lib/components/workWithMe.svelte";
  import Header from "$lib/components/header.svelte";

  import vscode from "$lib/assets/img/tools/vscode.svg";

  import html from "$lib/assets/img/tools/html.svg";
  import css from "$lib/assets/img/tools/css.svg";
  import js from "$lib/assets/img/tools/javascript.svg";
  import ts from "$lib/assets/img/tools/typescript.svg";
  let scriptingLang = ts;
  import python from "$lib/assets/img/tools/python.svg";
  import sass from "$lib/assets/img/tools/sass.svg";
  import svelte from "$lib/assets/img/tools/svelte.svg";
  import react from "$lib/assets/img/tools/react.svg";
  import vue from "$lib/assets/img/tools/vuejs.svg";
  import nodejs from "$lib/assets/img/tools/nodejs.svg";
  import php from "$lib/assets/img/tools/php.svg";
  import rust from "$lib/assets/img/tools/rust.svg";

  import pocketbase from "$lib/assets/img/tools/pocketbase.svg";
  import supabase from "$lib/assets/img/tools/supabase.svg";
  import mariadb from "$lib/assets/img/tools/mariadb.svg";
  import mysql from "$lib/assets/img/tools/mysql.svg";
  import php_myadmin from "$lib/assets/img/tools/php_myadmin.svg";
  import graphQL from "$lib/assets/img/tools/graphql.svg";

  import netlify from "$lib/assets/img/tools/netlify.svg";
  import heroku from "$lib/assets/img/tools/heroku.svg";

  import wordpress from "$lib/assets/img/tools/wordpress.svg";
  import elementor from "$lib/assets/img/tools/elementor.svg";
  import shopify from "$lib/assets/img/tools/shopify.svg";

  import photoshop from "$lib/assets/img/tools/photoshop.svg";
  import illustrator from "$lib/assets/img/tools/illustrator.svg";
  import premierepro from "$lib/assets/img/tools/premierepro.svg";
  import indesign from "$lib/assets/img/tools/indesign.svg";
  import xd from "$lib/assets/img/tools/xd.svg";
  import figma from "$lib/assets/img/tools/figma.svg";

  import unity from "$lib/assets/img/tools/unity.svg";
  import flstudio from "$lib/assets/img/tools/flstudio.svg";
  import discordDev from "$lib/assets/img/tools/discord_bot.svg";

  import TechCategory from "$lib/components/techCategory.svelte";
  import gsap from "gsap";
  import { goto } from "$app/navigation";
  import Reviews from "$lib/components/reviews.svelte";
  import reviews from "$lib/assets/data/reviews.json";

  import { IndexScene } from "$lib/three/scenes/index";
  import { backgroundScene } from "./+layout.svelte";
  import { onMount } from "svelte";
  import { reveal } from "svelte-reveal";
  import type { PageData } from "./$types";
  import ProjectCard from "$lib/components/projectCard.svelte";

  export let data: PageData;

  onMount(() => {
    backgroundScene.set(new IndexScene());
  });

  function enterEasterGame() {
    const tm = gsap.timeline();
    tm.to(document.body, {
      opacity: 0,
      "--cursor-scale": 50,
      duration: 1.25,
      ease: "power1.inOut",
    })
      .to(
        document.body.children[0],
        {
          opacity: 0,
          duration: 2,
          ease: "power1.inOut",
        },
        "<"
      )

      .then(() => {
        // The entire page needs to be reloaded...
        window.location.href = "/eastereggs/jumper";
      });
  }
</script>

<svelte:head>
  <title>Johan JANIN</title>
  <meta name="title" content="Johan Janin" />
  <meta
    name="description"
    content="Salut! Moi c'est Johan: un passionné du digital spécialisé dans le développement web."
  />
  <meta property="og:image" content="/logo.svg" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="johan-janin.com" />
  <meta property="twitter:url" content="https://johan-janin.com" />
  <meta name="twitter:title" content="Johan Janin" />
  <meta
    name="twitter:description"
    content="Salut! Moi c'est Johan: un passionné du digital spécialisé dans le développement web."
  />
  <meta name="twitter:image" content="/logo.svg" />
</svelte:head>

<Header>
  <h1>En quête d'un <span>développeur full-stack</span>?</h1>
  <p>Je suis Johan : un expert dans la création web, basé à Lyon.</p>
</Header>
<main id="index">
  <section id="me">
    <h2>Je me présente</h2>
    <p use:reveal>
      Je m'appelle Johan, j'ai {new Date().getFullYear() - 2005} ans, et je suis
      étudiant en digital.
    </p>
    <p use:reveal>
      Depuis plus de 4 ans je suis passionné par le monde du digital. Que ce
      soit dans la création d'identité visuelle, de conception/création web,
      référrencement et développement web, je suis dévoué à ma tâche afin de
      pouvoir proposer un résultat digne de mes compétences à mes clients.
    </p>
    <p use:reveal>
      Avec la création de projets comme des applications de messageries
      instantanées, de robot discord ou de sites e-commerce, je possède
      aujourd'hui des compétences solides en terme de développement web.
    </p>
  </section>

  <section id="showoff">
    <h2>Mes projets</h2>
    <p>
      Que ce soit pour mes études ou par passe-temps personnel, j'ai réalisé de
      nombreux projets dont les meilleurs sont répertoriés sur <a
        href="/portfolio">mon portfolio</a
      >. Voici une séléction de {data.showOfProjects.length} projets que je souhaite
      vous mettre en avant :
    </p>
    <ul>
      {#each data.showOfProjects as project}
        <li>
          <ProjectCard {project} />
        </li>
      {/each}
    </ul>
  </section>

  <section id="tech">
    <h2>Mes outils</h2>
    <p>Voici ce que j'utilise au quotidien afin de réaliser mes projets:</p>
    <ol>
      <li>
        <TechCategory
          name="Logiciels de développement"
          list={{
            VScode: vscode,
          }}
        />
      </li>
      <li>
        <TechCategory
          name="Langages de programmation/frameworks"
          on:iconClicked={({ detail: { icon } }) => {
            if (icon === ts) return (scriptingLang = js);
            if (icon === js) return enterEasterGame();
          }}
          list={{
            html,
            css,
            sass,
            Javascript: scriptingLang === js ? scriptingLang : undefined,
            Typescript: scriptingLang === ts ? scriptingLang : undefined,
            python,
            svelte,
            react,
            vue,
            nodejs,
            php,
            rust,
          }}
        />
      </li>
      <li>
        <TechCategory
          name="Bases de données"
          list={{
            pocketbase,
            supabase,
            mariadb,
            mysql,
            "PHP My Admin": php_myadmin,
            graphQL,
          }}
        />
      </li>
      <li>
        <TechCategory
          name="CMS & Outils"
          list={{ wordpress, elementor, shopify }}
        />
      </li>
      <li>
        <TechCategory name="Hébergement" list={{ netlify, heroku }} />
      </li>
      <li>
        <TechCategory
          name="Suite Adobe"
          list={{ photoshop, illustrator, premierepro, indesign, xd, figma }}
        />
      </li>
      <li>
        <TechCategory
          name="Autres"
          list={{ "Robots Discord": discordDev, unity, flstudio }}
          on:iconClicked={({ detail: { icon } }) => {
            if (icon === flstudio) goto("/discography");
          }}
        />
      </li>
    </ol>
  </section>

  <section id="reviews">
    <h2>Ce qu'ils disent de mon travail</h2>
    <Reviews list={reviews} />
  </section>

  <WorkWithMe />

  <style>
    #scene {
      filter: none !important;
      opacity: 1 !important;
      backdrop-filter: blur(2.5px);
    }
    body {
      background: url(/index_bg.svg) var(--background);
      background-attachment: fixed;
      background-size: contain;
      background-position: center calc(var(--scroll, 0) * -50vh);
    }
    header {
      justify-content: flex-end !important;
      padding: max(10%, 100px) 20px !important;
      text-align: center;
    }
  </style>
</main>

<style lang="scss">
  main {
    padding: 15px 45px;
    @media screen and (max-width: 800px) {
      padding: 15px;
    }

    section {
      > h2 {
        margin: 50px 25px 0;
      }
      > p:is([data-mobile] *) {
        margin: 10px 0;
      }
      > p:not([data-mobile] *) {
        position: relative;
        margin: 20px 4em;

        &::before {
          content: "<p>";
          opacity: 0.25;
          font-style: italic;
          position: absolute;
          right: calc(100% + 5px);
          top: 0;
        }
        &::after {
          content: "</p>";
          opacity: 0.25;
          font-style: italic;
          margin-left: 5px;
        }
      }

      &#tech ol {
        list-style: none;
        margin-top: 20px;
        > li {
          padding: 20px 0;
          position: relative;
          &:not(:last-of-type)::before {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            translate: -50% -50%;

            width: 25%;
            height: 2px;
            border-radius: 999px;

            background-color: var(--primary);
          }
        }
      }

      &#reviews {
        margin: 30px 0;
        > h2 {
          margin-bottom: 15px;
        }
      }

      &#showoff {
        > ul {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 25px;
          flex-wrap: wrap;
          list-style: none;
        }
      }
    }
  }
</style>
