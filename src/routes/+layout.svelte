<script context="module" lang="ts">
	import { isNavOpen } from "$lib/components/nav.svelte";
</script>

<script lang="ts">
	import "../app.scss";
	import "highlight.js/styles/atom-one-dark.min.css";
	import { afterNavigate, beforeNavigate, onNavigate } from "$app/navigation";
	import { onMount } from "svelte";
	import SubLoader from "$lib/components/subLoader.svelte";
	import { navigating as isNavigating } from "$app/stores";
	import { isMobile } from "$lib/ts/mobile";
	import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
	import { gsap } from "gsap";
	gsap.registerPlugin(ScrollTrigger);

	let navigating = false;
	let scrollTween: GSAPTween | undefined;
	// Add page transition
	//>> https://svelte.dev/blog/view-transitions
	onNavigate((navigation) => {
		//@ts-ignore
		if (!document.startViewTransition) return;
		$isNavOpen = false;
		navigating = true;

		return new Promise((resolve) => {
			//@ts-ignore
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
				navigating = false;
				document.body.classList.remove("noscroll");
			});
		});
	});
	beforeNavigate(() => {
		navigating = true;
	});
	afterNavigate(() => {
		navigating = false;
		if (scrollTween) scrollTween.scrollTrigger?.kill(true, true);
		scrollTween = gsap.to(document.scrollingElement, {
			"--scroll": 1,
			scrollTrigger: {
				scrub: 1,
				start: "top top",
				end: "bottom bottom",
			},
		});
	});

	onMount(() => {
		window.addEventListener("resize", () => {
			console.warn(
				"Hey! You just resized the window. Please reload the page if you switched between the mobile and the pc version."
			);
		});
		if (isMobile()) document.body.setAttribute("data-mobile", "");
	});
</script>

<svelte:head>
	<meta property="og:site_name" content="johan-janin.com" />
	<meta property="og:type" content="website" />
	<meta property="theme-color" content="#FF7F11" />
</svelte:head>

{#if navigating || $isNavigating}
	<SubLoader />
{/if}

<slot />
