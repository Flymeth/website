<script context="module">
    export const isNavOpen = writable(false)
    export const navHeight = "75px"
</script>

<script lang="ts">
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
    import gsap from "gsap";
	import { blur } from "svelte/transition";
	import { changeTheme } from "../../routes/+layout.svelte";
    import { circInOut } from "svelte/easing";

    export let customMessages = [
        "Hello there",
        "I'm Johan",
        "A web developper,",
        "Rocket League player,",
        "Web lover,",
        "Minecraft engineer,",
        "Svelte enjoyer,",
        `Who always work on ${["Monday", "Tuesday", "Whenesday", "Thursday", "Friday", "Saturday", "Sunday"].at(new Date().getDay() -1)}`,
        "So feel free to contact me!",
    ]
    export let changeMessageEachMs = 5000
    let messageID = 0
    
    $: locations = $page.url.pathname === "/" ? [] : $page.url.pathname.split("/").slice(1)
    const menuPaths = {
        Home: "/",
        Portefolio: "/portefolio",
        Discography: "/discography",
        "Work With Me": "/contact"
    }

    let nextTextElement: HTMLSpanElement;
    let currentTextElement: HTMLSpanElement;
    let theme: "dark" | "light" | "auto";
    
    onMount(() => {
        const timeline = gsap.timeline()
        timeline
        .set(nextTextElement, {
            opacity: 0,
        })
        .add(() => {
            currentTextElement.innerText = customMessages.at(messageID - 1) || "?"
            nextTextElement.innerText = customMessages[messageID]
        })
        .to(currentTextElement, {
            translateY: 15,
            opacity: 0,
            ease: "back.in",
        }, "<")
        .from(nextTextElement, {
            translateY: -15,
            opacity: 0,
            ease: "bounce.out"
        }, ">-.25")

        setInterval(() => {
            messageID = (messageID + 1) % customMessages.length
            timeline.play(0)
        }, changeMessageEachMs);

        const themeStorage = window.localStorage.getItem("theme") as "light" | "dark" | null
        theme = themeStorage || "auto"
    })

    let form: HTMLFormElement;
    function themeChanged() {
        const formulary = new FormData(form)
        theme = formulary.get("theme") as typeof theme | "auto"
        changeTheme(theme)
    }
</script>

<div id="navbar" style="--h: {navHeight}">
    <h1>
        <span bind:this={nextTextElement}>~</span>
        <span bind:this={currentTextElement}>{customMessages[0]}</span>
    </h1>
    <input type="checkbox" class="burger" checked={$isNavOpen} on:change={() => $isNavOpen = !$isNavOpen} />
</div>

{#if $isNavOpen}
    <menu transition:blur={{duration: 100, easing: circInOut}}>
        <div class="content">
            <section id="location">
                <h2>Location</h2>
                <p class="ariane">
                    {#each ["/", locations] as name, i}
                        {@const path = locations.slice(0, i).join("/")}
                        {#if i < locations.length}
                            <a href="/{path}">{name}</a>
                        {:else}
                            <span>{name}</span>
                        {/if}
                    {/each}
                </p>
            </section>
            <section id="nav">
                <h2>Navigation</h2>
                <nav>
                    <ul>
                        {#each Object.entries(menuPaths) as [name, path]}
                            {@const selected = path === $page.url.pathname}
                            <li>
                                {#if selected}
                                    <p class="current-page">{name}</p>
                                {:else}
                                    <a href={path}>{name}</a>
                                {/if}
                            </li>
                        {/each}
                    </ul>
                </nav>
            </section>
            <section id="theme">
                <h2>Theme</h2>
                <form method="dialog" on:change={themeChanged} bind:this={form}>
                    <input type="radio" value="dark" name="theme" id="theme-dark" checked={theme === "dark"}>
                    <input type="radio" value="auto" name="theme" id="theme-auto" checked={theme === "auto"}>
                    <input type="radio" value="light" name="theme" id="theme-light" checked={theme === "light"}>
                </form>
            </section>
        </div>
    </menu>
{/if}


<style lang="scss">
    @import "$lib/_colors.scss";
    $burger-animation-duration: .15s;

    #navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: var(--h);
        z-index: 100;

        display: flex;
        align-items: center;
        justify-content: space-between;

        font-size: 15px;

        padding: 15px 25px;

        backdrop-filter: blur(2px);
        > h1 {
            position: relative;
            width: 100%;
            > span {
                position: absolute;
                translate: 0 -50%;
            }
        }

        > input {
            appearance: none;
            border: none;
            height: 100%;
            aspect-ratio: 1 / 1;
            outline: none;
            position: relative;

            &::before, &::after {
                content: "";
                position: absolute;
                left: 50%;

                width: 90%;
                height: 10%;
                
                background-color: var(--primary);
                border-radius: 999px;

                transition: $burger-animation-duration ease-in-out;
            }

            &::before {
                top: 30%;
                translate: -50% -50%;
            }
            &::after {
                bottom: 30%;
                translate: -50% 50%;
            }

            &:checked {
                &::before {
                    top: 50%;
                    width: 75%;
                }
                &::after {
                    bottom: 50%;
                    width: 75%;
                }
            }
            &:hover {
                &::before, &::after {
                    width: 75%;
                }
                &:checked {
                    &::before, &::after {
                        width: 100%;
                    }
                }
            }
        }
    }

    menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 99;

        backdrop-filter: blur(15px);
        background-color: rgba($color: $black, $alpha: .25);

        > .content {
            height: 100%;
            padding: 25px;

            display: flex;
            justify-content: center;

            flex-direction: column;
            font-size: 17px;

            h2 {
                font-size: 30px;
                margin-bottom: 15px;
                & + * {
                    margin-left: 25px;
                }
            }
            > section {
                margin: 25px 0;
            }

            > #theme form {
                > input[type="radio"] {
                    width: 30px;
                    aspect-ratio: 1 / 1;
                    border-radius: 10px;
                    border: 2px solid var(--foreground);
                    appearance: none;

                    &[value="dark"] {
                        background-color: $black;
                    }
                    &[value="auto"] {
                        background: linear-gradient(to bottom right, $black, $white);
                    }
                    &[value="light"] {
                        background-color: $white;
                    }

                    &:checked {
                        border-color: $primary;
                    }
                }
            }
        }
    }

    // Disable the scroll-y if the menu is oppenned
    :global(body:has(#navbar + menu)) {
        overflow-y: hidden;
    }
</style>
