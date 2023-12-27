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
    import "highlight.js/styles/atom-one-dark.min.css";
	import { browser } from "$app/environment";
	import { isNavOpen } from "$lib/components/nav.svelte";
	import { onNavigate } from "$app/navigation";

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

<slot />
