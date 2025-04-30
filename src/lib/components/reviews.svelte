<script context="module" lang="ts">
    export interface Review {
        author: {
            name: string,
            status: string,
            img: string,
            link?: string
        },
        comment: string
    }
</script>
<script lang="ts">
    export let list: Review[]
    export let name = "reviews"

    import { Splide, SplideSlide } from "@splidejs/svelte-splide";
    import "@splidejs/svelte-splide/css";
</script>

<div id={name} class="reviews">
    <Splide
        options={{
            drag: true,
            type: "loop",
            autoplay: true,
            interval: 7500,
            speed: 1000,
            arrows: false,
            pagination: false,
            padding: 2.5,
            fixedWidth: "min(350px, 86vw)",
            width: "100%",
            gap: 20,
            easing: "ease",
        }}
    >
        {#each list as e}
            <SplideSlide>
                <div class="review">
                    <div class="author">
                        <img src={e.author.img} alt="{e.author.name}'s profile picture">
                        <div>
                            <h3>
                                {#if e.author.link}
                                    <a href={e.author.link} target="_blank">{e.author.name}</a>
                                {:else}
                                    {e.author.name}
                                {/if}
                            </h3>
                            <p>{e.author.status}</p>
                        </div>
                    </div>
                    <q class="comment">
                        {#each e.comment.split(/\r?\n/) as line}
                            <p>{line}</p>
                        {/each}
                    </q>
                </div>
            </SplideSlide>
        {/each}
    </Splide>
</div>

<style lang="scss">
    @import "$lib/_colors.scss";

    .reviews {
        display: flex;
        align-items: center;
        justify-content: center;

        background-color: rgba($secondary, .5);
        padding: 15px 10px;
        border-radius: 25px;
        margin-top: 30px;
        
        .review {
            background-color: var(--background);
            padding: 15px;
            border-radius: 15px;
            height: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            
            > .author {
                display: flex;
                align-items: center;
                text-transform: capitalize;
    
                > img {
                    height: 50px;
                    aspect-ratio: 1 / 1;
                    object-fit: cover;
                    border-radius: 50%;
                    margin-right: 20px;
                }
                > div {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
            }
    
            > .comment {
                margin-top: 15px;
                padding: 0 20px 10px;
                display: block;
                position: relative;
                height: 100%;

                &::before, &::after {
                    font-size: 3em;
                    position: absolute;
                }
                &::before {
                    content: "“";
                    top: 0;
                    left: 0;
                    translate: 0 -25%;
                }
                &::after {
                    content: "”";
                    bottom: 0;
                    right: 0;
                    translate: 0 50%;
                }
            }
        }
    }
</style>
