<script lang="ts">
	import Article from "$lib/components/article.svelte";
    import Header from "$lib/components/header.svelte";
	import { reveal } from "svelte-reveal";
	import type { PageData } from "./$types";
    export let data: PageData;
</script>

<svelte:head>
    <title>Le Blog</title>
    <meta name="title" content="Johan Janin - Le Blog" />
    <meta name="description" content="Un petit blog créé pour partager mon savoir et mes découvertes!" />
    <meta property="og:image" content="/icons/bg_white/logo_256.png" />

    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:domain" content="johan-janin.com">
    <meta property="twitter:url" content="https://johan-janin.com">
    <meta name="twitter:title" content="Johan Janin - Le Blog">
    <meta name="twitter:description" content="Un petit blog créé pour partager mon savoir et mes découvertes!">
    <meta name="twitter:image" content="/icons/bg_white/logo_256.png">
</svelte:head>

<Header>
    <h1>Bienvenue sur mon <span>blog</span>!</h1>
    <p>Es-tu prêts à en apprendre un peu plus sur le web ?</p>
</Header>

<main id="blog-content">
    <h2>Voici mes derniers articles:</h2>
    <ul class="article-list">
        {#each  Array.from(data.articles)
                .sort((a, b) => b.metadata.time.created.getTime() - a.metadata.time.created.getTime())
                .slice(0, 5)
        as article, i}
            <li use:reveal={{
                delay: 100 * i,
                y: 0
            }}>
                <Article {article}/>
            </li>
        {/each}
    </ul>
</main>

<style lang="scss">
    @import "$lib/_colors.scss";

    :global(body:has(#blog-content) > div) {
        background: url("https://source.unsplash.com/random/?programation"), var(--background);
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        text-shadow: 0 0 10px var(--background);
    }
    :global(body:has(#blog-content) > div > div:not(#navbar)) {
        backdrop-filter: blur(5px);
    }

    main {
        padding: 25px;

        ul.article-list {
            list-style: none;
            margin: 25px 10px;
    
            display: flex;
            align-items: stretch;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
        }
    }
</style>