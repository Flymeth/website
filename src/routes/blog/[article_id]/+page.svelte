<script lang="ts">
  import Header from "$lib/components/header.svelte";
  import { fade } from "svelte/transition";
  import type { PageData } from "./$types";
  import Share from "$lib/components/share.svelte";
  import { page } from "$app/stores";
  import ImageDisplay from "$lib/components/imageDisplay.svelte";
  import Fa from "svelte-fa";
  import {
    faPen,
    faFolder,
    type IconDefinition,
    faClock,
  } from "@fortawesome/free-solid-svg-icons";

  export let data: PageData;

  const { article } = data;
  let isMenuOpen = false;

  const articleInfos: [IconDefinition, string][] = [
    [faFolder, article.metadata.category],
    [faPen, article.metadata.time.created.toLocaleDateString()],
  ];
</script>

<svelte:head>
  <title>{article.metadata.title} - Johan Janin</title>

  <meta name="title" content="Johan Janin - {article.metadata.title}" />
  <meta name="description" content={article.metadata.description} />
  <meta property="og:image" content={article.metadata.coverURL} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="johan-janin.com" />
  <meta property="twitter:url" content="https://johan-janin.com" />
  <meta name="twitter:title" content={article.metadata.title} />
  <meta name="twitter:description" content={article.metadata.description} />
  <meta name="twitter:image" content={article.metadata.coverURL} />

  <meta property="og:type" content="article" />
  <meta property="article:author" content="johan_jnn" />
  <meta property="article:section" content={article.metadata.category} />
  {#each article.metadata.tags as tag}
    <meta property="article:tag" content={tag} />
  {/each}

  <meta
    property="article:published_time"
    content={article.metadata.time.created.toISOString()}
  />
  <meta
    property="article:modified_time"
    content={article.metadata.time.edited.toISOString()}
  />
  <meta property="profile:first_name" content="Johan" />
  <meta property="profile:last_name" content="Janin" />
  <meta property="profile:username" content="johan_jnn" />
  <meta property="profile:gender" content="male" />
</svelte:head>

<aside id="article-nav">
  {#if isMenuOpen}
    <menu transition:fade>
      <h3>Sommaire</h3>
      <ul>
        {#each article.toc as title}
          <li style="--level:{title.level}">
            <a href={title.link} on:click={() => (isMenuOpen = false)}
              >{title.title}</a
            >
          </li>
        {/each}
      </ul>
    </menu>
  {/if}

  <a href="/blog">Quitter l'article</a>
  <input
    type="checkbox"
    name="menu-oppener"
    id="open-toc"
    class="nodefault"
    bind:checked={isMenuOpen}
  />
</aside>
<Header bannerURL={article.metadata.coverURL}>
  <h1 id="article-title"><span>{article.metadata.title}</span></h1>
  <p>{article.metadata.description}</p>
</Header>
<main>
  <ul id="article-info">
    {#each articleInfos as [icon, value]}
      <li>
        <Fa {icon} color="var(--primary)" />
        <span>{value}</span>
      </li>
    {/each}
  </ul>
  <div id="article-content">
    {@html article.content.html}
    <ImageDisplay />
  </div>
</main>
<hr />
<footer>
  <h2>Déjà fini ?</h2>
  <p>
    J'espère que tu as apprécié mon travail! Si c'est le cas, n'hésite pas à le
    faire découvrir à d'autres personnes:
  </p>

  <Share
    sharingInformation={{
      title: "Un bel article!",
      description: `Je viens de lire l'article "${article.metadata.title}" sur le site de Johan JANIN (johan-janin.com), et il fut très interressant!`,
      link:
        $page.url.hostname === "localhost"
          ? new URL(
              $page.url.pathname,
              "https://johan-janin.netlify.app"
            ).toString()
          : $page.url.href,
    }}
  />

  {#if article.metadata.ressources}
    <h2>Ressources</h2>
    <p>
      Ci-dessous sont listés les différentes ressources que j'ai utilisées pour
      écrire cet article:
    </p>
    <ul>
      {#each article.metadata.ressources as rsrc}
        <li><a href={rsrc} target="_blank" class="ressource">{rsrc}</a></li>
      {/each}
    </ul>
  {/if}
</footer>

<style lang="scss">
  @import "$lib/_colors.scss";
  :global(header:has(> h1#article-title) p) {
    mix-blend-mode: difference;
    color: $white;
  }
  main {
    padding: 25px;
    > #article-info {
      width: min(90%, 500px);
      margin: 10px auto;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      list-style: none;
      margin-bottom: 30px;
      > li {
        background-color: var(--foreground);
        color: var(--background);
        padding: 5px 10px;
        border-radius: 999px;
        font-weight: bold;
        span {
          display: inline-block;
          margin-left: 5px;
        }
      }
    }
    > #article-content {
      @import "$lib/assets/styles/markdowns.scss";
    }
  }

  #article-nav {
    position: fixed;
    bottom: 0;
    right: 0;

    padding: 10px 15px;
    border-radius: 15px 0 0 0;
    background-color: var(--foreground);
    color: var(--background);
    z-index: 5;
    display: grid;
    grid-template-areas:
      "menu menu"
      "closer toggle";
    grid-template-columns: auto min-content;
    align-items: center;
    justify-content: right;
    column-gap: 50px;

    > menu {
      grid-area: menu;
      max-width: 90vw;

      > h3 {
        font-style: italic;
        text-decoration: underline;
      }
      > ul {
        list-style: none;
        padding: 0;
        margin: 15px 0 30px;
        > li {
          padding-left: calc((var(--level) - 1) * 10px);
          &::before {
            content: "# ";
          }
        }
      }
    }
    > a {
      grid-area: closer;
      text-align: right;
    }
    > input {
      grid-area: toggle;
      appearance: none;
      height: 25px;
      width: 25px;
      position: relative;
      will-change: rotate;
      transition: 0.25s;

      &::before,
      &::after {
        content: "";
        transform-origin: center;
        width: 70%;
        height: 10%;
        position: absolute;
        top: 50%;
        left: 50%;
        translate: -50% -50%;
        border-radius: 999px;
        background-color: var(--primary);
      }
      &::after {
        rotate: 90deg;
      }

      &:checked {
        rotate: -45deg;
        filter: drop-shadow(-2.5px 2.5px 7px var(--background));
      }
    }
  }

  footer {
    margin-top: 20px;
    margin-bottom: 50px;
    padding: 15px;
    > h2 {
      margin: 15px 0;
    }

    a.ressource {
      word-wrap: break-word;
    }
  }
</style>
