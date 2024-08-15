<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { useZoomImageWheel } from "@zoom-image/svelte";
	const { createZoomImage } = useZoomImageWheel();

	let imgInformations:
		| {
				src: string;
				alt: string;
		  }
		| undefined;
	export const openModal = (data: typeof imgInformations) => {
		imgInformations = data;
	};
	export const closeModal = () => (imgInformations = undefined);
	export let auto_implement = true;

	function handleClick(target: EventTarget | null) {
		if ((target as HTMLElement | null)?.nodeName === "BUTTON")
			return closeModal();
	}

	let locator: HTMLDivElement;
	let zoomableElement: HTMLElement;
	$: zoomableElement && createZoomImage(zoomableElement, {
        maxZoom: 2.75,
        initialState: {
            currentZoom: 1,
        },
    });

	onMount(() => {
		if (auto_implement && locator) {
			locator.parentElement
				?.querySelectorAll<HTMLImageElement>(
					"img:not(#image-visualizer):not(.no-visualizer)"
				)
				.forEach((img) => {
					img.classList.add("img-display");
					img.onclick = () => openModal(img);
				});
		}
	});
</script>

<div bind:this={locator}></div>
{#if imgInformations}
	<div id="img-displayer" transition:fade>
		<button
			class="nodefault"
			on:click={(e) => handleClick(e.target)}
			bind:this={zoomableElement}
		>
			<img
				src={imgInformations.src}
				alt={imgInformations.alt}
				id="image-visualizer"
				class="disabled-cursor-action"
			/>
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
		background-color: rgba($color: $black, $alpha: 0.75);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 101;

		overflow: hidden;

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
				max-width: 95vw;
				max-height: 80vh;
				width: max-content;
				height: max-content;
				border-radius: 5px;
			}
		}
	}

	:global(img.img-display) {
		will-change: scale;
		transition: scale 0.15s;

		&:hover {
			scale: 1.02;
		}
	}
</style>
