<script lang="ts">
    export let name: string;
    export let icons: string[];
</script>

<h3>{name}</h3>
<ul>
    {#each icons as icon}
        <li>
            <img src={icon} alt="{icon.split("/").at(-1)?.replace(".svg", "")} icon">
        </li>
    {/each}
</ul>

<style lang="scss">
    @import "$lib/_colors.scss";
    $icon-width: 50px;
    $icon-gap: 15px;
    $max-icons-per-row: 5;

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
            transition: filter .15s;

            display: flex;
            align-items: center;
            justify-content: center;

            &:not([data-mobile] *):hover {
                filter: grayscale(0) drop-shadow(0 0 10px $white);
            }
            > img {
                width: 100%;
            }
        }
    }
</style>