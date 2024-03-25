<script lang="ts">
    import Jumper from "$lib/assets/games/jumper/_game";
    import { onMount } from "svelte";
    let element: HTMLCanvasElement;
    let game: Jumper;

    onMount(() => {
        game = new Jumper(element)
        game.loadAssets().then(() => game.launch())
    })
</script>

<svelte:head>
    <title>Jumper - An Easteregg Jumping Game</title>
</svelte:head>

{#if game}
    <div id="gui" data-state={game.state}>
        {#if game.state === "menu_0"}
            <h1>Jumper</h1>
            <p>A game where you just have to jump...</p>
            <nav>
                <ul>
                    <li><button>Play</button></li>
                    <li><button>Settings</button></li>
                    <li><button>About</button></li>
                    <li>
                        <a href="/"><button>Quit</button></a>
                    </li>
                </ul>
            </nav>
        {:else if game.state === "settings"}
            <div id="settings">
                <p>This part has not been made for now...</p>
            </div>
        {:else if game.state === "about"}
            <h1>About Jumper</h1>
            <div id="about">
                <section id="game">
                    <h2>The game</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo quae voluptate eius officiis ut placeat, quam eaque pariatur beatae excepturi explicabo, quos vero enim nesciunt ex ea, eveniet vitae veritatis?</p>
                </section>
                <section id="author">
                    <h2>Me</h2>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quo quae voluptate eius officiis ut placeat, quam eaque pariatur beatae excepturi explicabo, quos vero enim nesciunt ex ea, eveniet vitae veritatis?</p>
                </section>
            </div>
        {/if}
    </div>
{/if}

<canvas bind:this={element}></canvas>

<style lang="scss">
    :global(*, ::before, ::after) {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    :global(body) {
        height: 100vh;
    }

    #gui {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
</style>