<script lang="ts">
	import { browser } from "$app/environment";
	import { page } from "$app/stores";
	import ProjectCard, { opennedProject } from "$lib/components/projectCard.svelte";
	import WorkWithMe from "$lib/components/workWithMe.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;

    const projectlist = Array.from(data.projects)
    const preOpen = $page.url.searchParams.get("project")
    if(preOpen) $opennedProject = projectlist[parseInt(preOpen)].metadata.name
    opennedProject.subscribe(name => {
        if(browser) {
            const id = projectlist.findIndex(p => p.metadata.name === name)
            if(id >= 0) window.history.pushState(null, "", new URL(`?project=${id}`, $page.url.href))
            else window.history.pushState(null, "", new URL($page.url.pathname, $page.url.origin))
        }
    })
</script>

<header>
    <h1>Wanna discover <span>my projects</span> ?</h1>
    <p>My portefolio is here for that!</p>
</header>

<main>
    <ul>
        {#each projectlist.sort(() => Math.random() - .5) as project (project.metadata.name)}
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
    }
</style>