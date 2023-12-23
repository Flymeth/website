<script lang="ts">
    import "$lib/app.scss";
    import Nav, { isNavOpen } from "$lib/components/nav.svelte";
	import { onMount } from "svelte";
	import Loader from "$lib/components/loader.svelte";
	import { fade, fly } from "svelte/transition";
    import genScene from "$lib/scenes/layout";
	import { onNavigate } from "$app/navigation";
	import Footer from "$lib/components/footer.svelte";
	import { navigating } from "$app/stores";
	import setupCursor from "$lib/ts/setupCursor";
	import { changeTheme, theme } from "../+layout.svelte";
    
    let loader: Loader;
    let showPage = false;
    let mobile = false;
    let sceneContainer: HTMLDivElement;
    onMount(() => {
        loader.animationEnded.subscribe(v => showPage = v)
        mobile = navigator.userAgent.toLowerCase().includes("mobile")

        // Set theme
        {
            const storedTheme = window.localStorage.getItem("theme")
            if(storedTheme && ["light", "dark"].includes(storedTheme)) changeTheme(storedTheme as "light" | "dark")
            else window.localStorage.removeItem("theme")
        }

        // Set cursor position (only update if the user is on desktop)
        !mobile && setupCursor()

        // Setup the 3D background scene
        genScene().then((content) => {
            sceneContainer.append(content.renderer.domElement)
            content.animate()
            content.tools.setBG($theme)
            theme.subscribe(value => {
                content.tools.setBG(value)
            })
            loader.loaded()
        })

        window.addEventListener("resize", () => {
            console.warn("Hey! You just resized the window. Please reload the page if you switched between the mobile and the pc version.")
        })
    })

    // Add page transition
    //>> https://svelte.dev/blog/view-transitions
    onNavigate((navigation) => {
        //@ts-ignore
        if (!document.startViewTransition) return;
        $isNavOpen = false
        
        return new Promise((resolve) => {
            //@ts-ignore
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    })
</script>

<div id="scene" bind:this={sceneContainer}></div>

{#if showPage}
    <Nav />

    {#if (!mobile || $navigating === null)}
        <div id="app" data-mobile={mobile ? "" : null}>
            <slot />
        </div>
    {:else}
        <div transition:fade>
            <Loader />
        </div>
    {/if}

    <Footer />
{:else}
    <div transition:fade>
        <Loader bind:this={loader}/>
    </div>
{/if}

<style lang="scss">
    #scene {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: .65;
        filter: blur(5px);
    }

    #app {
        min-height: 100vh;
    }
</style>