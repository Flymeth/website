<script context="module" lang="ts">
    import { isNavOpen } from "$lib/components/nav.svelte";
</script>

<script lang="ts">
    import "../app.scss";
    import "highlight.js/styles/atom-one-dark.min.css";
	import { beforeNavigate, onNavigate } from "$app/navigation";
	import { onMount } from "svelte";
	import SubLoader from "$lib/components/subLoader.svelte";

    let navigating = false
    // Add page transition
    //>> https://svelte.dev/blog/view-transitions
    onNavigate((navigation) => {
        //@ts-ignore
        if (!document.startViewTransition) return;
        $isNavOpen = false
        navigating = true

        return new Promise((resolve) => {
            //@ts-ignore
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
                navigating = false
            });
        });
    })
    beforeNavigate(() => {
        navigating = true
    })

    onMount(() => {
        window.addEventListener("resize", () => {
            console.warn("Hey! You just resized the window. Please reload the page if you switched between the mobile and the pc version.")
        })
    })
</script>

<svelte:head>
    <meta property="og:site_name" content="Johan JANIN" />
    <meta property="og:type" content="website" />
</svelte:head>

{#if navigating}
    <SubLoader />
{/if}

<slot />
