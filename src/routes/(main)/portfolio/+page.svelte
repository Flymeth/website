<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/stores";
  import ProjectCard from "$lib/components/projectCard.svelte";
  import WorkWithMe from "$lib/components/workWithMe.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import Header from "$lib/components/header.svelte";
  import { reveal } from "svelte-reveal";
  import { afterNavigate, replaceState } from "$app/navigation";
  export let data: PageData;

  const { projects, preopen } = data;
  const preopenProject = typeof preopen === "number" ? projects[preopen] : null;

  afterNavigate(() => {
    if (preopenProject)
      replaceState("", {
        portfolio: {
          activeProjectID: preopenProject.metadata.id,
        },
      });
  });
  onMount(() => {
    console.debug(
      `Found ${projects.length} projects. ${preopenProject ? `Openning project [${preopenProject.metadata.name}]: ${preopenProject}` : ""}`
    );

    window.addEventListener("keydown", (e) => {
      if (
        e.key.toLowerCase() === "escape" &&
        $page.state.portfolio?.activeProjectID
      )
        history.back();
    });
  });
</script>

<svelte:head>
  <title
    >Le Portfolio{preopenProject
      ? ` - ${preopenProject.metadata.name}`
      : ""}</title
  >
  <meta name="title" content="Johan Janin - Le Portfolio" />
  <meta
    name="description"
    content="Vous trouverez ici mes meilleures réalisations durant mes études ou mon temps libre!"
  />
  <meta property="og:image" content="/icons/bg_white/logo_256.png" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="johan-janin.com" />
  <meta property="twitter:url" content="https://johan-janin.com" />
  <meta name="twitter:title" content="Johan Janin - Le Portfolio" />
  <meta
    name="twitter:description"
    content="Vous trouverez ici mes meilleures réalisations durant mes études ou mon temps libre!"
  />
  <meta name="twitter:image" content="/icons/bg_white/logo_256.png" />
</svelte:head>

<Header>
  <h1>Mon <span>Portfolio</span></h1>
  <p>
    Ici sont répertoriés mes meilleures projets ainsi que des explications sur
    la réalisation de ceux-ci.
  </p>
</Header>

<main>
  <ul>
    {#each [...projects].sort(() => Math.random() - 0.5) as project (project.metadata.id)}
      <li
        use:reveal={{
          disable: !!preopenProject,
        }}
      >
        <ProjectCard {project} />
      </li>
    {/each}
  </ul>

  <WorkWithMe />
</main>

<style lang="scss">
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px 20px;
    padding: 0;

    > li {
      &:has([data-open]) {
        opacity: 1 !important;
      }
    }
  }
</style>
