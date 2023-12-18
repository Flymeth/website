<script lang="ts">
    import type { Article } from "$lib/server/articles/_utilities";

    export let article: Article;
</script>

<article id={article.metadata.id}>
    <a href="/blog/{article.metadata.id}" class="nodefault">
        <h3>{article.metadata.title}</h3>
        <p>{article.metadata.description}</p>
    </a>
</article>

<style lang="scss">
    article {
        * {
            color: inherit;
            font-weight: inherit;
        }
        
        width: 200px;
        aspect-ratio: 1 / 1.25;
        box-shadow: 0 2.5px 15px -5px var(--foreground);
        border-radius: 15px;
        -webkit-backdrop-filter: blur(15px);
        backdrop-filter: blur(15px);
        transition: .15s;
        &:hover {
            box-shadow: 0 0 15px 0 var(--foreground);
            scale: 1.02;
        }

        > a {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            padding: 10px;
            width: 100%;
            &:hover {
                text-shadow: unset;
            }

            > h3 {
                text-align: center;
                font-size: 25px;
            }
        }
    }
</style>