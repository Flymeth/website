<script lang="ts">
    import code from "$lib/assets/data/mention-legal.html?raw";
    import "$lib/main.scss";

    import Header from "$lib/components/header.svelte";
    import Nav from "$lib/components/nav.svelte";
	import setupCursor from "$lib/ts/setupCursor";
	import { onMount } from "svelte";
	import { isMobile } from "$lib/ts/mobile";

    onMount(() => {
        !isMobile() && setupCursor()
    })
</script>

<Nav />

<Header>
    <h1>Mentions légales</h1>
</Header>

<main>
    {@html code}
</main>

<style lang="scss">
    main {
        padding: 10px 20px;
    }

    @for $i from 1 to 5 {
        :global(h#{$i}) {
            margin: 25px 15px;
        }
    }
</style>
