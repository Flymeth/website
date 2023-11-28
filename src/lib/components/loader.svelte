
<script lang="ts">
    import { gsap } from "gsap";
	import { onMount } from "svelte";

    let firstPoint: HTMLDivElement;

    const timeline = gsap.timeline({
        repeat: -1,
    })

    onMount(() => {
        timeline
        .set(firstPoint, {
            translateX: 50,
            translateY: "-50%"
        })
        .to(firstPoint, {
            translateX: -50,
            ease: "power2.out"
        })
        .to(firstPoint, {
            translateX: 50,
            ease: "power2.out"
        })
    })
</script>

<div id="loader">
    <div bind:this={firstPoint}></div>
</div>

<style lang="scss">
    #loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--background);

        z-index: 9999;

        > div {
            position: absolute;
            top: 50%;
            left: 50%;
            translate: -50% -50%;

            height: 25px;
            aspect-ratio: 1 / 1;
            background-color: var(--primary);
        }
    }
</style>