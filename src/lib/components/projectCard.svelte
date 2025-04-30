<script lang="ts">
  import type { Project } from "$lib/server/posts_utilities/projects";
  import { fade } from "svelte/transition";
  import { navHeight } from "./nav.svelte";
  import SvelteFA from "svelte-fa";
  import { faLink } from "@fortawesome/free-solid-svg-icons";
  import {
    faGithub,
    faFigma,
    faCodepen,
    faDiscord,
    faStackOverflow,
  } from "@fortawesome/free-brands-svg-icons";
  import ImageDisplay from "./imageDisplay.svelte";
  import Share from "./share.svelte";
  import { page } from "$app/stores";
  import { pushState, replaceState } from "$app/navigation";

  export let project: Project;

  const projectLinks = Object.entries({
    prototype: {
      icon: faFigma,
      url: project.metadata.prototype,
    },
    github: {
      icon: faGithub,
      url: project.metadata.github,
    },
    codesandbox: {
      icon: faCodepen,
      url: project.metadata.codesandbox,
    },
    codepen: {
      icon: faCodepen,
      url: project.metadata.codepen,
    },
    stackoverflow: {
      icon: faStackOverflow,
      url: project.metadata.stackoverflow,
    },
    discord: {
      icon: faDiscord,
      url: project.metadata.discord,
    },
    internet: {
      icon: faLink,
      url: project.metadata.link,
    },
  })
    .map(([platform, data]) => ({ platform, ...data }))
    .filter((link) => link.url);

  $: isOpen = $page.state.portfolio?.activeProjectID === project.metadata.id;
</script>

<div
  id="project-{project.metadata.name.replaceAll(' ', '-')}"
  data-open={isOpen ? "" : null}
>
  <div
    class="card"
    style="--banner: {project.metadata.bannerURL
      ? `url(${project.metadata.bannerURL})`
      : 'url()'}"
  >
    <div class="info">
      <h3>{project.metadata.name}</h3>
      <p>{project.metadata.description}</p>
    </div>
    <div class="actions">
      {#if project.metadata.link}
        <a href={project.metadata.link} target="_blank">Accéder</a>
      {/if}
      <button
        class="primary-color"
        on:click={() =>
          pushState(`?open=${project.metadata.id}`, {
            portfolio: {
              activeProjectID: project.metadata.id,
            },
          })}>Découvrir</button
      >
    </div>
  </div>
  {#if isOpen}
    <ImageDisplay />
    <div id="project-view" style="--nav-height: {navHeight};" transition:fade>
      <div id="project-nav">
        <div class="info">
          {#if project.metadata.iconURL}
            <img
              src={project.metadata.iconURL}
              alt="Project icon"
              class="no-visualizer"
            />
          {/if}
          <h2>
            {#if project.metadata.link}
              <a href={project.metadata.link} target="_blank">
                {project.metadata.name}
              </a>
            {:else}
              {project.metadata.name}
            {/if}
          </h2>
        </div>

        {#if projectLinks.length}
          <ul class="links">
            {#each projectLinks as link (link.platform)}
              <li id="link-{link.platform}">
                <a
                  href={link.url}
                  target="_blank"
                  title="See the project on {link.platform}"
                >
                  <SvelteFA icon={link.icon} size="lg" />
                </a>
              </li>
            {/each}
          </ul>
        {/if}

        <button
          class="closer"
          on:click={() => {
            const newURL = new URL($page.url);
            newURL.search = "";
            replaceState(newURL, {
              portfolio: {
                activeProjectID: undefined,
              },
            });
          }}>Close Project</button
        >
      </div>
      <hr />
      <div id="project-content">
        {@html project.content.html}
      </div>

      <Share
        sharingInformation={{
          title: project.metadata.name,
          link: new URL(`?open=${project.metadata.id}`, $page.url).toString(),
          description: project.metadata.description,
        }}
      />
    </div>
  {/if}
</div>

<style lang="scss">
  @import "$lib/_colors.scss";

  .card {
    background: linear-gradient(
        to bottom,
        rgba($secondary, 0.5),
        rgba($black, 0.75)
      ),
      var(--banner), $primary;
    background-position: center;
    background-size: cover;
    width: min(500px, 90vw);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 15px;
    border-radius: 10px;
    color: $white;
    text-shadow: 0 0 15px $black;
    transition: 0.25s;

    will-change: scale;

    aspect-ratio: 2 / 1;

    h3 {
      font-size: 30px;
      margin-bottom: 10px;
      text-align: center;
      text-decoration: underline;
    }
    p {
      font-size: 0.85em;
      font-style: italic;
      font-weight: 600;
    }

    button {
      padding: 7.5px 15px;
    }

    .actions {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;
      gap: 1em;
    }

    &:hover {
      scale: 1.05;
      border-radius: 5px;
    }
  }

  #project-view {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    z-index: 10;

    background-color: rgba($secondary, 0.15);
    backdrop-filter: blur(15px);

    overflow-y: scroll;
    padding: var(--nav-height) 0 50px;

    #project-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px;
      font-style: italic;
      z-index: 2;

      position: sticky;
      top: 5px;
      left: 0;
      width: 75%;
      margin: 0 auto;
      height: calc(var(--nav-height) / 1.5);

      background-color: var(--foreground);
      color: var(--background);
      border-radius: 999px;
      &:not([data-mobile] *) {
        opacity: 0.25;
        transition: opacity 0.15s;
      }
      &:hover {
        opacity: 1;
      }

      .info {
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 20px;
        grid-area: info;

        h2 {
          margin-left: 5px;
          a {
            color: inherit;
            text-decoration: underline;
            &:hover {
              color: $primary;
            }
            &::before {
              content: unset;
            }
          }
        }

        img {
          height: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          border-radius: 50%;
        }
      }

      .links {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        grid-area: links;

        > li {
          margin: 0 7.5px;
          > a {
            height: 100%;
            aspect-ratio: 1 / 1;
            display: grid;
            place-items: center;

            &::before {
              content: unset;
            }
            &:hover {
              color: $secondary;
            }
          }
        }
      }

      button {
        border-radius: 999px;
        transform-origin: center right;
        grid-area: close;
        margin-right: 2.5px;
      }

      @media screen and (max-width: 630px) {
        height: calc(var(--nav-height) * 1.5);
        width: 90%;
        padding: 15px;
        display: grid;
        grid-template-areas:
          "info links"
          "close close";
        grid-template-rows: repeat(2, 50%);
        gap: 10px;
        grid-template-columns: repeat(2, 50%);
        border-radius: 15px;
        align-items: center;
        justify-content: center;
        position: static;

        > ul {
          justify-content: flex-end !important;
        }
        > button {
          transform-origin: bottom center;
          margin: 0;
          &:hover {
            scale: 1;
          }
        }
      }
    }
    #project-content {
      padding: 0 25px;
      max-width: 1300px;
      margin: 0 auto;
      @import "$lib/assets/styles/markdowns.scss";
    }
  }
  // Disable the scroll-y if the project is oppenned
  :global(body:has(#project-view)) {
    overflow-y: hidden;
  }
</style>
