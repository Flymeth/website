<script lang="ts">
	import { isMobile } from "$lib/ts/mobile";
	import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
	import { onMount } from "svelte";
	import Fa from "svelte-fa";
	import { fade } from "svelte/transition";

	let mobile: boolean;
	onMount(() => {
		mobile = isMobile();
	});
</script>

<div id="subloader" data-mobile={mobile || undefined} transition:fade>
	<Fa icon={faAsterisk} />
</div>

<style lang="scss">
	#subloader {
		animation: spinningAnimation 1s infinite linear;
		position: fixed;
		cursor: initial !important;

		@keyframes spinningAnimation {
			from {
				rotate: 0deg;
			}
			to {
				rotate: 360deg;
			}
		}

		&:not([data-mobile]) {
			top: var(--cursor-y);
			left: var(--cursor-x);
			translate: 10px -25px;
		}
		&[data-mobile] {
			bottom: 10px;
			right: 10px;
			font-size: 30px;
			z-index: 150;
		}
	}
</style>
