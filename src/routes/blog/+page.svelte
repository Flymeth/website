<script lang="ts">
	import Article from "$lib/components/article.svelte";
    import Header from "$lib/components/header.svelte";
	import type { PageData } from "./$types";
    export let data: PageData;
</script>

<svelte:head>
    <meta property="og:title" content="Johan Janin's blog" />
    <meta property="og:description" content="Hey! This is my little blog where I write article about any subjects! Come discover my work!" />
</svelte:head>

<Header>
    <h1>Welcome to my <span>blog</span>!</h1>
    <p>Ready to learn a lot ?</p>
</Header>

<main id="blog-content">
    <h2>Read my latest articles:</h2>
    <ul class="article-list">
        {#each Array.from(data.articles).slice(0, 5) as article}
            <li>
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
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
        }
    }
</style>