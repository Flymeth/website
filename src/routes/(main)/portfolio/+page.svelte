<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import ProjectCard, { opennedProject } from "$lib/components/projectCard.svelte";
	import WorkWithMe from "$lib/components/workWithMe.svelte";
	import { onMount } from "svelte";
    import { gsap } from "gsap";
    import ScrollTrigger from "gsap/dist/ScrollTrigger";
    import type { PageData } from "./$types";
	import Header from "$lib/components/header.svelte";
    export let data: PageData;
    gsap.registerPlugin(ScrollTrigger)

    const projectlist = Array.from(data.projects)
    console.debug(`Found ${projectlist.length} projects:`)
    console.debug(projectlist)

    const preOpenIndex = parseInt($page.url.searchParams.get("project") || "-1")
    let projectContainer: HTMLUListElement;

    if(preOpenIndex >= 0) $opennedProject = projectlist[preOpenIndex].metadata.name
    opennedProject.subscribe(name => {
        if(browser) {
            const id = projectlist.findIndex(p => p.metadata.name === name)
            if(id >= 0) window.history.pushState(null, "", new URL(`?project=${id}`, $page.url.href))
            else window.history.pushState(null, "", new URL($page.url.pathname, $page.url.origin))
        }
    })

    onMount(() => {
        if(preOpenIndex >= 0) {
            const {top, bottom, height} = projectContainer.getBoundingClientRect()
            window.scrollTo({
                top: (top + bottom - height)/2,
                behavior: "instant"
            })
        }
        window.addEventListener("keydown", (e) => {
            if(e.key.toLowerCase() === "escape") $opennedProject = null
        })

        for(const card of projectContainer.children) {
            gsap.from(card, {
                opacity: 0,
                scrollTrigger: {
                    trigger: card,
                    start: "top+=50px bottom",
                    end: "bottom+=150px bottom",
                    scrub: 1
                }
            })
        }
    })
</script>

<svelte:head>
    <title>Le Portfolio</title>
    <meta name="title" content="Johan Janin - Le Portfolio" />
    <meta name="description" content="Vous trouverez ici mes meilleures réalisations durant mes études ou mon temps libre!" />
    <meta property="og:image" content="/icons/bg_white/logo_256.png" />

    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:domain" content="johan-janin.com">
    <meta property="twitter:url" content="https://johan-janin.com">
    <meta name="twitter:title" content="Johan Janin - Le Portfolio">
    <meta name="twitter:description" content="Vous trouverez ici mes meilleures réalisations durant mes études ou mon temps libre!">
    <meta name="twitter:image" content="/icons/bg_white/logo_256.png">
</svelte:head>

<Header>
    <h1>Mon <span>Portfolio</span></h1>
    <p>Ici sont répertoriés mes meilleures projets ainsi que des explications sur la réalisation de ceux-ci.</p>
</Header>

<main>
    <ul bind:this={projectContainer}>
        {#each [...projectlist].sort(() => Math.random() - .5) as project (project.metadata.name)}
            <li>
                <ProjectCard {project}/>
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