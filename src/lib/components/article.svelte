<script lang="ts">
    import type { Article } from "$lib/server/posts_utilities/articles";

    export let article: Article;
</script>

<article id={article.metadata.id}>
    <a href="/blog/{article.metadata.id}" class="nodefault">
        <div class="first-view">
            {#if article.metadata.coverURL}
                <img src={article.metadata.coverURL} alt="Cover for article '{article.metadata.title}'">
            {/if}
            <h3>{article.metadata.title}</h3>
        </div>
        <div class="hover-view" style="--cover:{article.metadata.coverURL ? `url(${article.metadata.coverURL});` : "var(--secondary);"}">
            <p>{article.metadata.description}</p>
        </div>
    </a>
</article>

<style lang="scss">
    @import "$lib/_colors.scss";

    article {
        * {
            color: inherit;
            font-weight: inherit;
        }
        
        width: 250px;
        height: 100%;
        box-shadow: 0 0 15px -5px $black;
        border-radius: 15px;
        color: $white;
        background-color: rgba($color: $primary, $alpha: .25);
        -webkit-backdrop-filter: blur(15px);
        backdrop-filter: blur(15px);
        transition: .15s;
        overflow: hidden;

        > a {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;
            aspect-ratio: 1 / 1;
            text-shadow: none !important;
            position: relative;

            > div {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                transition: opacity .15s;
                padding: 10px;
                padding-bottom: 20px;

                &.first-view {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    > img {
                        width: 100%;
                        height: 50%;
                        object-fit: cover;
                        border-radius: 999px;
                    }
                    
                    > h3 {
                        text-align: center;
                        font-size: 25px;
                    }
                }
                &.hover-view {
                    $opacity: .85;
                    $color: $white;
                    background: linear-gradient(rgba($color, $opacity), rgba($color, $opacity)), var(--cover);
                    background-size: cover;
                    background-position: center;
                    opacity: 0;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    color: $black;
                    font-weight: bolder;
                }
            }
        }

        &:hover {
            box-shadow: 0 10px 20px -1.5px $black;
            scale: 1.02;
            translate: 0 -10px;
            > a> div {
                &.first-view {
                    opacity: 0;
                }
                &.hover-view {
                    opacity: 1;
                }
            }
        }
    }
</style>