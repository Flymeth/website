<script lang="ts">
	import Article from "$lib/components/article.svelte";
import Header from "$lib/components/header.svelte";
	import type { PageData } from "./$types";
    export let data: PageData;
</script>
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
    :global(body:has(#blog-content)) {
        background: linear-gradient(rgba($black, .5), rgba($black, .5)), url("https://source.unsplash.com/random/?codage,code");
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
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