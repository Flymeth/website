<script lang="ts">
	import Header from "$lib/components/header.svelte";
	import MusicPlayer from "$lib/components/musicPlayer.svelte";
	import { onMount } from "svelte";
	import type { PageServerData } from "./$types";
    export let data: PageServerData;

    const musics = Array.from(data.musics).sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime())
    let player: MusicPlayer;
    let keepPlayerIfNoSong = false
    $: selectedMusic = player?.controls.info

    onMount(() => {
        keepPlayerIfNoSong = !window.navigator.userAgent.toLowerCase().includes("mobile")
    })
</script>

<svelte:head>
    <title>My musics</title>
    <meta name="title" content="Johan Janin's musics" />
    <meta name="description" content="I love musics, espacialy the electronic genre. So since I'm young I always tried to make my own music..." />
</svelte:head>

<Header>
    <h1>Here are <span>all</span> the different <span>songs</span> I made!</h1>
    <p>Because I'm a music lover, sometime I'm making my own music "for fun"...</p>
</Header>

<main>
    {#if player}
        <div class="list">
            {#each musics as music}
                {@const selected = $selectedMusic?.music.audioSrc === music.audioSrc}
                <section id={music.metadata.file} class="music">
                    <h3>{music.metadata.title}</h3>
                    <hr>
                    <button on:click={() => {
                        if(selected) {
                            if(player.controls.status === "playing") player.controls.pause()
                            else player.controls.play()
                        }else player.controls.play(music)
                    }} class:primary-color={selected}>{
                        selected && player.controls.status === "playing" ? "⏸️" : "▶️"
                    }</button>
                </section>        
            {/each}
        </div>
    {/if}
    
    <MusicPlayer list={musics} {keepPlayerIfNoSong} bind:this={player}/>
</main>

<style lang="scss">
    main > .list {
        padding: 20px;

        > section {
            width: 100%;
            margin: 15px 0;
            display: grid;
            grid-template-columns: 200px auto 200px;
            align-items: center;
            gap: 50px;

            h3 {
                text-transform: capitalize;
                font-size: 20px;
            }
            hr {
                margin: 0;
                width: 100%;
            }

            @media screen and (max-width: 650px) {
                grid-template-columns: auto 100px;
                hr {
                    display: none;
                }
            }
        }
    }
</style>
