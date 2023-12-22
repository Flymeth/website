<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let name: string;
    export let icons: string[];

    const dispatch = createEventDispatcher()
</script>

<h3>{name}</h3>
<ul>
    {#each icons as icon, i}
        {@const techName = icon.replace(/^.*[\\/]/, '').split(".")[0]}
        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
        <li data-tech={techName} style="z-index: {icons.length - i};" on:click={() => dispatch("iconClicked", {techName, icon})} on:keypress>
            <img src={icon} alt="{icon.split("/").at(-1)?.replace(".svg", "")} icon">
        </li>
    {/each}
</ul>

<style lang="scss">
    @import "$lib/_colors.scss";
    $icon-width: 50px;
    $icon-gap: 20px;
    $max-icons-per-row: 5;
    $techNameAnimationDuration: .15s;

    h3 {
        margin-bottom: 15px;
        text-align: center;
    }
    ul {
        list-style: none;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        max-width: ($icon-width + $icon-gap) * $max-icons-per-row;
        margin: 0 auto;
        gap: $icon-gap;

        > li {
            filter: grayscale(1) drop-shadow(0 0 5px $black);
            :global([data-mobile]) & {
                filter: grayscale(0) drop-shadow(0 0 5px $black)
            }
            width: $icon-width;
            aspect-ratio: 1 / 1;
            position: relative;

            display: flex;
            align-items: center;
            justify-content: center;
            transition: $techNameAnimationDuration * 2;

            &:not([data-mobile] *):hover {
                filter: grayscale(0) drop-shadow(0 0 10px $white);
            }
            > img {
                width: 100%;
                border-radius: 2.5px;
            }

            &::before {
                content: attr(data-tech);
                position: absolute;
                top: 100%;
                left: 50%;
                translate: -50% 20px;
                opacity: 0;
                text-transform: capitalize;
                clip-path: polygon(0 10%, 40% 10%, 50% 0, 60% 10%, 100% 10%, 100% 100%, 0 100%);
                background-color: var(--background);
                padding: 5px;
                border-radius: 5px;
                font-weight: bold;
                pointer-events: none;
                transition: $techNameAnimationDuration;
            }
            &:hover {
                &::before {
                    opacity: 1;
                    translate: -50% 5px;
                }
            }
        }
    }
</style>