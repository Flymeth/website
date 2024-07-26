<script lang="ts" context="module">
	import { writable } from "svelte/store";
	export const backgroundScene = writable<Scene>();
</script>

<script lang="ts">
	import "$lib/main.scss";
	import Nav from "$lib/components/nav.svelte";
	import { onMount } from "svelte";
	import Loader from "$lib/components/loader.svelte";
	import { fade } from "svelte/transition";
	import Footer from "$lib/components/footer.svelte";
	import { navigating } from "$app/stores";
	import setupCursor from "$lib/ts/setupCursor";
	import { changeTheme, theme } from "$lib/ts/theme";
	import { isMobile } from "$lib/ts/mobile";
	import Scene from "$lib/scenes/_default";
	import { onNavigate } from "$app/navigation";
	import { LayoutScene } from "$lib/scenes/layout";

	let loader: Loader;
	let loading = true;
	let loadingScene = false;
	let sceneContainer: HTMLDivElement;
	let currentScene: Scene | undefined;
	let defaultScene: Scene | undefined;

	onNavigate(async () => {
		if (!defaultScene) return;

		$backgroundScene = defaultScene;
	});

	onMount(() => {
		defaultScene = new LayoutScene();

		// Set theme
		const storedTheme = window.localStorage.getItem("theme");
		if (storedTheme && ["light", "dark"].includes(storedTheme))
			changeTheme(storedTheme as "light" | "dark");
		else window.localStorage.removeItem("theme");

		// Set cursor position (only if the user is on desktop)
		!isMobile() && setupCursor();

		if (!location.hash) window.scrollY = 0;

		// Setup the 3D background scenes
		backgroundScene.subscribe(async (scene) => {
			if (
				scene &&
				scene.constructor.name === currentScene?.constructor.name
			)
				return;

			if (currentScene) Scene.stopAnimation(currentScene);
			currentScene = undefined;
			sceneContainer?.children[0]?.remove();
			if (loader && loading)
				loader.animationEnded.subscribe((ended) => {
					loading = !ended;
					if (ended && scene) scene.doEntrance?.();
				});

			if (!scene) return loader?.loaded();

			loadingScene = true;
			currentScene = scene;
			sceneContainer.appendChild(scene.renderer.domElement);

			await scene.load();
			Scene.animate(scene);
			if ("setBG" in scene && typeof scene.setBG === "function")
				scene.setBG($theme);
			loader?.loaded();
			loadingScene = false;
		});

		theme.subscribe((value) => {
			if (
				currentScene &&
				"setBG" in currentScene &&
				typeof currentScene.setBG === "function"
			)
				currentScene.setBG(value);
		});

		if (!currentScene) $backgroundScene = defaultScene;
	});
</script>

<div id="scene" bind:this={sceneContainer}></div>

{#if loading}
	<div out:fade>
		<Loader bind:this={loader} />
	</div>
{:else if $navigating !== null || loadingScene}
	<div transition:fade>
		<Loader hideProgress={true} />
	</div>
{/if}

<Nav />

<div id="app">
	<slot />
</div>

<Footer />

<style lang="scss">
	#scene {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: 0.65;
		filter: blur(2.5px);
	}

	#app {
		min-height: 100vh;
	}
</style>
