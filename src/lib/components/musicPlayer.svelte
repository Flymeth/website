<!-- todo: Faire la version mobile -->
<script lang="ts">
	import type { Music } from "$lib/server/posts_utilities/musics";
	import { onMount } from "svelte";
	import { derived, writable } from "svelte/store";
	import { fade } from "svelte/transition";

    export let list: Music[];
    export let keepPlayerIfNoSong: boolean;
    let current = writable<{
        music: Music,
        player: {
            e: HTMLAudioElement,
            ready: boolean
        },
        status: "playing" | "paused" | "idle"
    } | undefined>(undefined);
    let updateIntervalID: NodeJS.Timer | undefined;

    export const controls = {
        /**
         * Play or resume the player
         * @param query Leave empty to just resume the player
         */
        play(query?: number | string | Music | ((m: Music, i: number) => boolean)) {
            this.pause()
            const music = query !== undefined ? (
                typeof query === "number" ? list.at(query) :
                typeof query === "string" ? list.find(m => m.audioSrc === query || m.metadata.file === query || m.metadata.title === query) :
                typeof query === "function" ? list.find(query) : query
            ) : "current"
            if(!music) throw new Error(`Music has not been found with query: ${query?.toString()}.`)
            
            if(music === "current") {
                if(!$current) throw new Error("Cannot resume music as it is undefined.")
                $current.status = "playing"
                $current.player.e.play()
                return;
            }

            if(typeof updateIntervalID === "number") clearInterval(updateIntervalID)
            $current = {
                music,
                player: {
                    e: new Audio(music.audioSrc),
                    ready: false
                },
                status: "idle"
            }
            $current.player.e.onloadedmetadata = () => {
                if(!$current) return;
                $current.player.e.volume = .25
                $current.player.e.play()
                $current.player.ready = true
                $current.status = "playing"
            }
            $current.player.e.onended = () => controls.stop()
            updateIntervalID = setInterval(() => {
                if($current) {
                    $current.player.e.currentTime= $current.player.e.currentTime
                }
            }, 100)
        },
        pause() {
            if($current) {
                $current.player.e.pause()
                $current.status = "paused"
            }
        },
        stop() {
            if($current) $current.player.e.pause()
            $current = undefined;
            if(typeof updateIntervalID === "number") clearInterval(updateIntervalID)
        },
        get player() {
            return $current?.player.e
        },
        get music() {
            if($current) return {
                data: $current.music,
                index: list.findIndex(({audioSrc}) => audioSrc === $current?.music.audioSrc)
            }
        },
        get status() { return $current?.status || "idle" },
        get queue() { return list },
        info: derived(current, v => v)
    }

    onMount(() => {
        controls.stop()
    })
</script>

{#if $current?.player.ready || keepPlayerIfNoSong}
    <div id="player" data-active={current ? "" : undefined} transition:fade={{duration: 250}}>
        {#if $current}
            <div class="player-wrapper" transition:fade>
                <div id="song">
                    <h3>{$current.music.metadata.title}</h3>
                    <p>{$current.music.metadata.date.toLocaleDateString("fr-FR")}</p>
                </div>
                <form id="controls" method="dialog">
                    <div class="buttons">
                        <button id="previous" class="nodefault" on:click={() => {
                            const { music } = controls
                            if(music) controls.play(music.index - 1)
                        }}>⏪</button>
                        <button id="play-pause" class="nodefault" on:click={() => (
                            $current?.status === "paused" ? controls.play() : controls.pause()
                        )}>{$current.status === "playing" ? "⏸️" : "▶️"}</button>
                        <button id="next" class="nodefault" on:click={() => {
                            const { music } = controls
                            if(music) controls.play((music.index + 1) % list.length)
                        }}>⏩</button>
                    </div>
                    <label for="slider">
                        {#key $current.player.ready}
                            <input class="nodefault" type="range" bind:value={$current.player.e.currentTime} on:change={(e) => {
                                if($current) $current.player.e.currentTime = parseFloat(e.currentTarget.value)
                            }} name="slider" id="slider" min="0" max={$current.player.e.duration} step="0.01">
                        {/key}
                    </label>
                </form>
                <div id="actions">
                    <button id="stop" on:click={() => controls.stop()}>❎</button>
                    <a href={$current.music.audioSrc} download>
                        <button id="download">🔗</button>
                    </a>
                </div>
            </div>
        {:else}
            <p class="player-idle">No song is currently selected.</p>
        {/if}
    </div>
{/if}

<style lang="scss">
    @import "$lib/_colors.scss";
    $margin: 10px;
    #player {
        position: sticky;
        bottom: $margin;
        left: $margin;
        width: calc(100% - 2 * $margin);
        height: 50px;
        opacity: 1;

        background-color: rgba($color: $primary, $alpha: .5);
        backdrop-filter: blur(15px);
        transition: opacity .15s;

        border-radius: 999px;

        &:has(> .player-idle) {
            opacity: .5;
            padding: 5px 0;
            text-align: center;
        }

        > .player-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-areas: "song controls actions";
            grid-template-columns: 200px auto 200px;
            align-items: center;
            padding: 5px 5%;

            > #song {
                font-size: small;
                text-transform: capitalize;
                grid-area: song;
            }
            > #controls {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                height: 100%;
                grid-area: controls;

                > .buttons {
                    width: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    flex-grow: 1;
                    button {
                        border: none;
                        background: transparent;
                        padding: 0;
                        font-size: 20px;
                    }
                }
                > label[for="slider"] {
                    width: 100%;
                    display: flex;
                    align-items: start;
                    justify-content: stretch;
                    > input {
                        appearance: none;
                        background-color: rgba($color: $black, $alpha: .2);
                        outline: none;
                        border-radius: 100px;
                        width: 100%;
                        height: 7.5px;
                        margin-bottom: auto;
                        &::-webkit-slider-thumb {
                            appearance: none;
                            width: 12px;
                            height: 12px;
                            background-color: var(--secondary);
                            border-radius: 50%;
                        }
                    }
                }
            }
            > #actions {
                display: flex;
                align-items: center;
                justify-content: right;
                grid-area: actions;

                gap: 10px;
            }
        }

        @media screen and (max-width: 600px) {
            transition: height .15s;
            &:not(:has(> .player-idle)) {
                height: 100px;
            }
            > .player-wrapper {
                grid-template-columns: unset;
                padding: 10px 7%;
                grid-template-areas: 
                    "song actions"
                    "controls controls"
                ;

                > #controls {
                    flex-direction: row-reverse;
                }
            }
        }
    }
</style>