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
        setTimeout(() => {
            pourcent= 100
    
            gsap.to([pourcentElement, point], {
                opacity: 0,
                delay: 1,
            }).then(() => {
                animationEnded.set(true)
                document.body.classList.remove("noscroll")
            })
        }, 500);
    }
    export const reset = () => {
        pourcent= 0
        $animationEnded= false
        startIncrementation()
    }

    function startIncrementation() {
        const incrementPourcentFunc = () => {
            if(pourcent >= 95) return;
            pourcent++
            setTimeout(incrementPourcentFunc, Math.floor((Math.random() * 400)) + 100)
        }
        incrementPourcentFunc()
    }

    const timeline = gsap.timeline({
        repeat: -1,
    })
    animationEnded.subscribe((v) => v && timeline.pause())

    onMount(() => {
        reset()

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
        <h2 id="progress" bind:this={pourcentElement}>
            <span style="translate: 0 {
                pourcent < 100 ? 1 : -Math.floor(pourcent / 100)
            }em;">
                {#each Array(10).fill(null).map((_, i) => i) as i}
                    <span class="digit">{i}</span>
                {/each}
            </span>
            <span style="translate: 0 -{
                Math.floor((pourcent % 100) / 10)
            }em;">
                {#each Array(10).fill(null).map((_, i) => i) as i}
                    <span class="digit">{i}</span>
                {/each}</span>
            <span style="translate: 0 -{
                pourcent % 10
            }em;">
                {#each Array(10).fill(null).map((_, i) => i) as i}
                    <span class="digit">{i}</span>
                {/each}</span>
            
            %
        </h2>
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
            width: 100%;

            font-size: 80px;
            font-style: italic;

            display: flex;
            align-items: flex-start;
            justify-content: center;
            height: 1em;
            line-height: 1em;
            overflow-y: hidden;

            span {
                text-align: end;
                transition: .15s;
                > .digit {
                    display: block;
                }
            }
        }
    }
</style>