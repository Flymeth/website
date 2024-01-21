<script context="module" lang="ts">
    import { writable } from "svelte/store";
    export const opennedProject = writable<null | string>(null)
</script>

<script lang="ts">
	import type { Project } from "$lib/server/posts_utilities/projects";
	import { fade } from "svelte/transition";
    import { navHeight } from "./nav.svelte";
    import SvelteFA from "svelte-fa";
    import { faLink, type IconDefinition } from "@fortawesome/free-solid-svg-icons"
    import { faGithub, faFigma, faCodepen, faDiscord, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
	import ImageDisplay from "./imageDisplay.svelte";

    export let project: Project;

    const projectLinks = Object.entries({
        prototype: {
            icon: faFigma,
            url: project.metadata.prototype
        },
        github: {
            icon: faGithub,
            url: project.metadata.github
        },
        codesandbox: {
            icon: faCodepen,
            url: project.metadata.codesandbox
        },
        codepen: {
            icon: faCodepen,
            url: project.metadata.codepen
        },
        stackoverflow: {
            icon: faStackOverflow,
            url: project.metadata.stackoverflow
        },
        discord: {
            icon: faDiscord,
            url: project.metadata.discord
        },
        internet: {
            icon: faLink,
            url: project.metadata.link
        },
    })
    .map(([platform, data]) => ({platform, ...data}))
    .filter(link => link.url)
    
    $: isOpen = $opennedProject === project.metadata.name
</script>

<div id="project-{project.metadata.name.replaceAll(" ", "-")}"  data-open={isOpen ? "" : null}>
    <div class="card" style="--banner: {project.metadata.bannerURL ? `url(${project.metadata.bannerURL})` : "url()"}">
        <div class="info">
            <h3>{project.metadata.name}</h3>
            <p>{project.metadata.description}</p>
        </div>
        <div class="actions">
            <button class="primary-color" on:click={() => $opennedProject = project.metadata.name}>Découvrir</button>
            {#if project.metadata.link}
                <a href={project.metadata.link} target="_blank">
                    <button>Accéder</button>
                </a>
            {/if}
        </div>
    </div>
    {#if isOpen}
        <ImageDisplay />
        <div id="project-view" style="--nav-height: {navHeight};" transition:fade>
            <div id="project-nav">
                <div class="info">
                    {#if project.metadata.iconURL}
                        <img src={project.metadata.iconURL} alt="Project icon">
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
                                <a href={link.url} target="_blank" title="See the project on {link.platform}">
                                    <SvelteFA icon={link.icon} size="lg"/>
                                </a>
                            </li>
                        {/each}
                    </ul>
                {/if}

                <button class="closer" on:click={() => $opennedProject = null}>Close Project</button>
            </div>
            <hr>
            <div id="project-content">
                {@html project.content.html}
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    @import "$lib/_colors.scss";
    
    .card {
        background: linear-gradient(to bottom, rgba($black, .5), rgba($black, .85)), var(--banner), $primary;
        background-position: center;
        background-size: cover;
        width: min(300px, 90vw);
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px;
        border-radius: 10px;
        color: $white;
        text-shadow: 0 0 15px $black;

        aspect-ratio: 2 / 1;

        h3 {
            font-size: 30px;
            text-align: right;
        }
        p {
            font-size: 13px;
            font-style: italic;
            text-align: center;
        }

        button {
            padding: 7.5px 15px;
        }

        .actions {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            width: 100%;
        }
    }

    #project-view {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
        z-index: 10;

        background-color: rgba($secondary, .15);
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
                opacity: .25;
                transition: opacity .15s;
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
                    }
                }
            }

            button {
                border-radius: 999px;
                transform-origin: center right;
                grid-area: close;
            }

            @media screen and (max-width: 630px) {
                height: calc(var(--nav-height) * 1.5);
                width: 90%;
                padding: 15px;
                display: grid;
                grid-template-areas: 
                    "info links"
                    "close close"
                ;
                grid-template-rows: 50%;
                gap: 10px;
                grid-template-columns: 1fr;
                border-radius: 15px;
                align-items: center;
                justify-content: center;
                position: static;
                > button {
                    transform-origin: bottom center;
                }
            }
        }
        #project-content {
            padding: 0 25px;
            @import "$lib/assets/styles/markdowns.scss";
        }
    }
    // Disable the scroll-y if the project is oppenned
    :global(body:has(#project-view)) {
        overflow-y: hidden;
    }
</style>