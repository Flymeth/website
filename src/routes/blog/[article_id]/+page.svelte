<script lang="ts">
	import Header from "$lib/components/header.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;

    const { article } = data
</script>

<div id="article-nav">
    <a href="/blog">Go back to the blog page</a>
</div>
<Header>
    <h1><span>{article.metadata.title}</span></h1>
    <p>{article.metadata.description}</p>
</Header>
<main>
    {@html article.content.html}
</main>
<footer>
    <h2>Already finished ?</h2>
</footer>

<style lang="scss">
    main {
        padding: 25px;
    }

    #article-nav {
        position: fixed;
        bottom: 0;
        right: 0;

        padding: 10px 15px;
        border-radius: 15px 0 0 0;
        background-color: var(--foreground);
        color: var(--background);
    }
</style>