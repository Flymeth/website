<script lang="ts">
	import Nav from "$lib/components/nav.svelte";
    import "$lib/main.scss";
	import { onMount } from "svelte";
	import setupCursor from "$lib/ts/setupCursor";
	import { isMobile } from "$lib/ts/mobile";

    onMount(() => {
        // Set cursor position (only update if the user is on desktop)
        !isMobile() && setupCursor()
    })
</script>

<Nav />

<div>
    <slot />
</div>