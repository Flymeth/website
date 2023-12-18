<script lang="ts">
	import Nav from "$lib/components/nav.svelte";
    import "$lib/app.scss";
	import { onMount } from "svelte";
	import setupCursor from "$lib/ts/setupCursor";

    onMount(() => {
        const mobile = navigator.userAgent.toLowerCase().includes("mobile")

        // Set cursor position (only update if the user is on desktop)
        !mobile && setupCursor()
    })
</script>

<Nav />

<div>
    <slot />
</div>