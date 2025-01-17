<script context="module">
  export const isNavOpen = writable(false);
  export const navHeight = "75px";
</script>

<script lang="ts">
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { gsap } from "gsap";
  import { fade } from "svelte/transition";
  import { circInOut } from "svelte/easing";
  import { changeTheme } from "$lib/ts/theme";
  import { useCustomCursor } from "$lib/ts/setupCursor";

  export let disable_sections: {
    location?: boolean;
    nav?: boolean;
    theme?: boolean;
    custom_cursor?: boolean;
  } = {};
  export let customMessages = [
    "Bonjour!",
    "Je suis Johan",
    "Un développeur web,",
    "Amoureux du web,",
    "Adorant Svelte et React,",
    "Qui fait du front & du back",
    "Membre du BDE Tech-Paf",
    "Etudiant en digital",
    `Et travaille le ${["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"].at(new Date().getDay() - 1)}`,
    "Qui a hâte de travailler avec vous!",
  ];
  export let changeMessageEachMs = 5000;
  let messageID = 0;

  $: pathname =
    $page.url.pathname !== "/" && $page.url.pathname.endsWith("/")
      ? $page.url.pathname.slice(0, -1)
      : $page.url.pathname;
  $: locations = pathname === "/" ? [] : pathname.split("/").slice(1);
  const menuPaths = {
    Présentation: "/",
    Portfolio: "/portfolio",
    // Experiences: "/experiences",
    Discographie: "/discography",
    "Prendre contact": "/contact",
    "Mon petit blog": "/blog",
  };

  let nextTextElement: HTMLSpanElement;
  let currentTextElement: HTMLSpanElement;
  let theme: "dark" | "light" | "auto";
  let custom_cursor: boolean;

  onMount(() => {
    $isNavOpen = false;
    const timeline = gsap.timeline();
    timeline
      .set(nextTextElement, {
        opacity: 0,
      })
      .add(() => {
        currentTextElement.innerText = customMessages.at(messageID - 1) || "?";
        nextTextElement.innerText = customMessages[messageID];
      })
      .to(
        currentTextElement,
        {
          translateY: 15,
          opacity: 0,
          ease: "back.in",
        },
        "<"
      )
      .from(
        nextTextElement,
        {
          translateY: -15,
          opacity: 0,
          ease: "bounce.out",
        },
        ">-.25"
      );

    const interval: NodeJS.Timer = setInterval(() => {
      if (!(currentTextElement && nextTextElement))
        return clearInterval(interval);

      messageID = (messageID + 1) % customMessages.length;
      timeline.play(0);
    }, changeMessageEachMs);

    const themeStorage = window.localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    theme = themeStorage || "auto";

    custom_cursor = useCustomCursor();
    document.body.style.scrollPaddingTop = navHeight;
  });

  function themeChanged(form: HTMLFormElement) {
    theme = new FormData(form).get("theme")?.toString() as typeof theme;
    changeTheme(theme);
  }
  function cursorChanged(form: HTMLFormElement) {
    custom_cursor = new FormData(form).get("use_custom_cursor") === "on";
    useCustomCursor(custom_cursor);
  }
</script>

<div id="navbar" style="--h:{navHeight}">
  <h1>
    <span bind:this={nextTextElement}>~</span>
    <span bind:this={currentTextElement}>{customMessages[0]}</span>
  </h1>
  <input
    type="checkbox"
    class="burger nodefault"
    checked={$isNavOpen}
    title="{$isNavOpen ? 'Fermer' : 'Ouvrir'} le menu de navigation"
    on:change={() => ($isNavOpen = !$isNavOpen)}
  />
</div>

{#if $isNavOpen}
  <menu transition:fade={{ duration: 200, easing: circInOut }}>
    {#if !(disable_sections && disable_sections.location)}
      <section id="location">
        <h2>Fil d'ariane</h2>
        <p class="ariane">
          {#each ["/", ...locations] as name, i}
            {@const path = locations.slice(0, i).join("/")}
            {#if i < locations.length}
              <a href="/{path}">{name}</a>
              {i ? "/" : ""}
            {:else}
              <span>{name}</span>
            {/if}
          {/each}
        </p>
      </section>
    {/if}
    {#if !(disable_sections && disable_sections.nav)}
      <section id="nav">
        <h2>Menu</h2>
        <nav>
          <ul>
            {#each Object.entries(menuPaths) as [name, path]}
              {@const selected = path === pathname}
              <li>
                {#if selected}
                  <p class="current-page">{name}</p>
                {:else}
                  <a href={path}>{name}</a>
                {/if}
              </li>
            {/each}
          </ul>
        </nav>
      </section>
    {/if}
    {#if !(disable_sections && disable_sections.theme)}
      <section id="theme">
        <h2>Thèmes</h2>
        <form
          method="dialog"
          on:change={({ currentTarget }) => themeChanged(currentTarget)}
        >
          <input
            type="radio"
            class="nodefault"
            value="dark"
            name="theme"
            id="theme-dark"
            checked={theme === "dark"}
            title="Forcer le mode sombre"
          />
          <input
            type="radio"
            class="nodefault"
            value="auto"
            name="theme"
            id="theme-auto"
            checked={theme === "auto"}
            title="Utiliser les paramètres système"
          />
          <input
            type="radio"
            class="nodefault"
            value="light"
            name="theme"
            id="theme-light"
            checked={theme === "light"}
            title="Forcer le mode clair"
          />
        </form>
      </section>
    {/if}
    {#if !(disable_sections && disable_sections.custom_cursor)}
      <section id="custom_cursor">
        <h2>Curseur personnalisé</h2>
        <form
          method="dialog"
          on:change={({ currentTarget }) => cursorChanged(currentTarget)}
        >
          <label for="cursor_checkbox">
            <input
              type="checkbox"
              name="use_custom_cursor"
              checked={custom_cursor}
              id="cursor_checkbox"
              title="{custom_cursor
                ? 'Désactiver'
                : 'Activer'} le curseur personnalisé"
            />
            {custom_cursor ? "Actif" : "Innactif"}
          </label>
        </form>
      </section>
    {/if}
  </menu>
{/if}

<style lang="scss">
  @import "$lib/_colors.scss";
  $burger-animation-duration: 0.15s;

  #navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--h);
    z-index: 100;

    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 15px;

    padding: 15px 25px;

    backdrop-filter: blur(2px);
    > h1 {
      position: relative;
      width: 100%;
      > span {
        position: absolute;
        translate: 0 -50%;
      }
    }

    > input {
      appearance: none;
      border: none;
      height: 100%;
      aspect-ratio: 1 / 1;
      outline: none;
      position: relative;

      &::before,
      &::after {
        content: "";
        position: absolute;
        left: 50%;

        width: 90%;
        height: 10%;

        background-color: var(--primary);
        border-radius: 999px;

        transition: $burger-animation-duration ease-in-out;
      }

      &::before {
        top: 30%;
        translate: -50% -50%;
      }
      &::after {
        bottom: 30%;
        translate: -50% 50%;
      }

      &:checked {
        &::before {
          top: 50%;
          width: 75%;
        }
        &::after {
          bottom: 50%;
          width: 75%;
        }
      }
      &:hover {
        &::before,
        &::after {
          width: 75%;
        }
        &:checked {
          &::before,
          &::after {
            width: 100%;
          }
        }
      }
    }
  }

  menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 25px;
    z-index: 99;
    background: url("/logo.svg"),
      linear-gradient(to right, transparent, rgba($white, 0.5));
    background-size: 25%;
    padding-right: 25%;
    background-position: center right;
    backdrop-filter: blur(15px);
    background-repeat: no-repeat;

    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 17px;

    h2 {
      font-size: 30px;
      margin-bottom: 15px;
      & + * {
        margin-left: 25px;
      }
    }
    > section {
      margin: 25px 0;
    }

    > #nav nav ul p {
      display: inline;
    }

    > #theme form {
      > input[type="radio"] {
        width: 30px;
        aspect-ratio: 1 / 1;
        border-radius: 10px;
        border: 2px solid var(--foreground);
        appearance: none;
        outline: none;

        &[value="dark"] {
          background-color: $black;
          border-color: $white;
        }
        &[value="auto"] {
          background: linear-gradient(to bottom right, $black, $white);
        }
        &[value="light"] {
          background-color: $white;
          border-color: $black;
        }

        &:checked {
          border-color: $primary;
        }
      }
    }
  }

  // Disable the scroll-y if the menu is oppenned
  :global(body:has(#navbar + menu)) {
    overflow-y: hidden;
  }
</style>
