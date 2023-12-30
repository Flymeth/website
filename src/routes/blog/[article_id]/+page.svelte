<script lang="ts">
	import Header from "$lib/components/header.svelte";
	import { fade } from "svelte/transition";
    import type { PageData } from "./$types";
    export let data: PageData;

    const { article } = data
    console.info("User is reading the following article:")
    console.info(article)

    let isMenuOpen = false;
</script>

<aside id="article-nav">
    {#if isMenuOpen}
        <menu transition:fade>
            <h3>Table Of Content</h3>
            <ul>
                {#each article.toc as title}
                <li style="--level:{title.level}">
                    <a href={title.link} on:click={() => isMenuOpen = false}>{title.title}</a>
                </li>
                {/each}
            </ul>
        </menu>
    {/if}

    <a href="/blog">Close article</a>
    <input type="checkbox" name="menu-oppener" id="open-toc" class="nodefault" bind:checked={isMenuOpen}>
</aside>
<Header bannerURL={article.metadata.coverURL}>
    <h1><span>{article.metadata.title}</span></h1>
    <p>{article.metadata.description}</p>
</Header>
<main>
    {@html article.content.html}
</main>
<hr>
<footer>
    <h2>Already finished ?</h2>
    <p>Don't forget to share my work!</p>

    {#if article.metadata.ressources}
        <h2>Mentions</h2>
        <p>Here is the ressources I used to write this article:</p>
        <ul>
            {#each article.metadata.ressources as rsrc}
                <li><a href={rsrc} target="_blank">{rsrc}</a></li>
            {/each}
        </ul>
    {/if}
    
</footer>

<style lang="scss">
    main {
        padding: 25px;
        @import "$lib/assets/styles/markdowns.scss";
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
            "closer toggle"
        ;
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
                    padding-left: calc((var(--level) - 1) * 7.5px);
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
            transition: .25s;

            &::before,&::after {
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
        padding: 15px;
        > h2 {
            margin: 15px 0;
        }
    }
</style>