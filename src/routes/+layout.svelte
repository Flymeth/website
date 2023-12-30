<script context="module" lang="ts">
    import { isNavOpen } from "$lib/components/nav.svelte";
    
</script>

<script lang="ts">
    import "../app.scss";
    import "highlight.js/styles/atom-one-dark.min.css";
	import { onNavigate } from "$app/navigation";
	import { onMount } from "svelte";

    // Add page transition
    //>> https://svelte.dev/blog/view-transitions
    onNavigate((navigation) => {
        //@ts-ignore
        if (!document.startViewTransition) return;
        $isNavOpen = false
        
        return new Promise((resolve) => {
            //@ts-ignore
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    })

    onMount(() => {
        window.addEventListener("resize", () => {
            console.warn("Hey! You just resized the window. Please reload the page if you switched between the mobile and the pc version.")
        })
    })
</script>

<slot />
