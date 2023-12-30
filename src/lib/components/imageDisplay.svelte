<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
    let imgInformations: {
        src: string,
        alt: string,
        zoom?: boolean
    } | undefined;
    export const openModal = (data: typeof imgInformations) => {
        imgInformations= data
    }
    export const closeModal = () => imgInformations = undefined
    export let auto_implement = true;

    function handleClick(target: EventTarget | null) {
        if((target as HTMLElement | null)?.nodeName === "IMG" && imgInformations) imgInformations.zoom = !imgInformations?.zoom
        else return closeModal()
    }

    let locator: HTMLDivElement;
    onMount(() => {
        if(auto_implement && locator) {
            locator.parentElement?.querySelectorAll<HTMLImageElement>("img:not(#image-visualizer)").forEach(img => {
                img.onclick = () => openModal(img)
            })
        }
    })
</script>

<div bind:this={locator}></div>
{#if imgInformations}
    <div id="img-displayer" transition:fade>
        <button class="nodefault" on:click={(e) => handleClick(e.target)}>
            <img src={imgInformations.src} alt={imgInformations.alt} id="image-visualizer" class:zoom={imgInformations.zoom}>
        </button>
    </div>
{/if}

<style lang="scss">
    @import "$lib/_colors.scss";

    #img-displayer {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba($color: $black, $alpha: .75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 101;

        overflow: scroll;

        > button {
            border: none;
            outline: none;
            background: transparent;
            box-shadow: none;
            height: 100%;
            width: 100%;
            &:hover {
                scale: 1;
            }

            > img {
                max-width: 90vw;
                max-height: 90vh;
    
                width: 50%;
                cursor: zoom-in;
                &.zoom {
                    height: 100%;
                    width: auto;
                    scale: 2;

                    cursor: zoom-out;
                }
            }
        }
    }
</style>