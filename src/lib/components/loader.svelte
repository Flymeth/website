<script lang="ts">
    import { gsap } from "gsap";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

    let point: HTMLDivElement;
    let pourcentElement: HTMLHeadingElement;

    let pourcent = 0
    export let hideProgress = false
    export const animationEnded = writable(false)
    export const loaded = () => {
        const delay = 10
        for(let j = 0; j + pourcent < 100; j++) {
            setTimeout(() => {
                if(pourcent < 100) pourcent++
            }, delay * j)
        }

        setTimeout(() => {
            gsap.to([pourcentElement, point], {
                opacity: 0,
                delay: 1,
            }).then(() => {
                animationEnded.set(true)
                document.body.classList.remove("noscroll")
            })
        }, delay * (100 - pourcent))
    }

    const timeline = gsap.timeline({
        repeat: -1,
    })
    animationEnded.subscribe((v) => v && timeline.pause())

    onMount(() => {
        document.body.classList.add("noscroll")
        $animationEnded = false
        const incrementPourcentFunc = () => {
            if(pourcent >= 95) return;
            pourcent++
            setTimeout(incrementPourcentFunc, Math.floor((Math.random() * 400)) + 100)
        }
        incrementPourcentFunc()

        gsap.to(point, {
            opacity: 1
        })
        timeline
        .set(point, {
            translateX: 50,
            translateY: "-50%"
        })
        .to(point, {
            translateX: -50,
            ease: "power2.out"
        })
        .to(point, {
            translateX: 50,
            ease: "power2.out"
        })
    })
</script>

<div id="loader">
    <div bind:this={point}></div>
    {#if !hideProgress}
        <h1 id="progress" bind:this={pourcentElement}>{pourcent}%</h1>
    {/if}
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
            opacity: 0;

            height: 25px;
            aspect-ratio: 1 / 1;
            background-color: var(--primary);
        }

        > #progress {
            position: absolute;
            bottom: 50px;
            left: 50%;
            translate: -50% 0;

            font-size: 80px;
            font-style: italic;
        }
    }
</style>