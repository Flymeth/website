<script context="module" lang="ts">
	import { writable, derived, get } from "svelte/store";
    const __theme = writable<"dark" | "light" | "auto">("auto")
    export const theme = derived(__theme, (v) => (
        v === "auto" ? (
            browser && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
        ) : v
    ))

    export function changeTheme(to: "light" | "dark" | "auto") {
        if(to === get(__theme)) return;
        if(browser) {
            document.documentElement.removeAttribute("force-light")
            document.documentElement.removeAttribute("force-dark")
            __theme.set(to)
            
            if(to === "auto") {
                window.localStorage.removeItem("theme")
            } else {
                window.localStorage.setItem("theme", to)
                document.documentElement.setAttribute(`force-${to}`, "")
            }
        }
    }
</script>

<script lang="ts">
    import "../app.scss";
    import Nav, { isNavOpen } from "$lib/components/nav.svelte";
	import { onMount } from "svelte";
	import { browser } from "$app/environment";
	import { gsap } from "gsap";
	import Loader from "$lib/components/loader.svelte";
	import { fade, fly } from "svelte/transition";
    import genScene from "$lib/scenes/layout";
	import { onNavigate } from "$app/navigation";
	import Footer from "$lib/components/footer.svelte";
	import { navigating } from "$app/stores";
    
    let loaded = false;
    let mobile = false;
    let sceneContainer: HTMLDivElement;
    const clickableElementsNames = [
        "A",
        "BUTTON",
        "INPUT",
        "TEXTAREA",
        "OPTION"
    ]
    onMount(() => {
        mobile = navigator.userAgent.toLowerCase().includes("mobile")

        // Set theme
        {
            const storedTheme = window.localStorage.getItem("theme")
            if(storedTheme && ["light", "dark"].includes(storedTheme)) changeTheme(storedTheme as "light" | "dark")
            else window.localStorage.removeItem("theme")
        }

        // Set cursor position (only update if the user is on desktop)
        !mobile && (window.onmousemove = ({clientX, clientY}) => {
            const hoveringElements = Array.from(document.querySelectorAll(":hover"))
            const onClickableElement = hoveringElements.find(e => (
                clickableElementsNames.includes(e.nodeName)
            ))
            const scale = onClickableElement ? 1.5 : 1
            gsap.to(document.body, {
                "--cursor-x": clientX + "px",
                "--cursor-y": clientY + "px",
                "--cursor-scale": scale, 
                "--cursor-opacity": .75,
                duration: .25,
                ease: "power1.out"
            })
        })

        // Setup the 3D background scene
        genScene().then((content) => {
            sceneContainer.append(content.renderer.domElement)
            content.animate()
            loaded= true
            content.tools.setBG($theme)
            theme.subscribe(value => {
                content.tools.setBG(value)
            })
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

{#if loaded}
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
    <div out:fade>
        <Loader />
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
