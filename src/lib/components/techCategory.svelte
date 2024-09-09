<script lang="ts">
  import { reveal } from "svelte-reveal";
  import { createEventDispatcher } from "svelte";
  export let name: string;
  interface Tech {
    icon: string;
    name: string;
  }
  /**
   * Key is the tech's name and value is the icon url
   */
  export let list: { [key: string]: string | undefined };
  $: entries = Object.entries(list).filter(([_, i]) => typeof i === "string") as [string, string][];
  $: list_len = entries.length;

  const dispatch = createEventDispatcher<{
    iconClicked: Tech;
  }>();
</script>

<h3>{name}</h3>
<ul>
  {#each entries as [name, icon], i}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <li
      data-tech={name}
      style="z-index: {list_len - i};"
      on:click={() => dispatch("iconClicked", { name, icon })}
      on:keypress
    >
      <img
        src={icon}
        alt="{name}'s icon"
        use:reveal={{
          delay: 100 * i,
          blur: 15,
          easing: "easeInOutCirc",
          reset: true,
        }}
      />
    </li>
  {/each}
</ul>

<style lang="scss">
  @import "$lib/_colors.scss";
  $icon-width: 50px;
  $icon-gap: 20px;
  $container-padding: 15px;
  $max-icons-per-row: 5;
  $techNameAnimationDuration: 0.15s;

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
    max-width: ($icon-width + $icon-gap + $container-padding) *
      $max-icons-per-row;
    margin: 0 auto;
    gap: $icon-gap;
    backdrop-filter: blur(10px);
    padding: calc($container-padding * 2) $container-padding;
    border: 1.5px dashed rgba($secondary, 0.15);
    border-radius: 5px;

    > li {
      filter: drop-shadow(0 0 5px $black);
      width: $icon-width;
      aspect-ratio: 1 / 1;
      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;
      transition: $techNameAnimationDuration * 2;

      &:not([data-mobile] *):hover {
        filter: drop-shadow(0 0 10px $white);
      }
      > img {
        width: 100%;
        border-radius: 2.5px;
      }

      $animationMaxScale: 1.15;
      $animationMaxRotate: 15deg;
      $animationMaxYTranslation: 5%;
      @keyframes hoverIconAnimation {
        0%,
        100% {
          scale: 1;
          rotate: 0;
          translate: 0 0;
        }
        15% {
          scale: $animationMaxScale;
          rotate: -$animationMaxRotate;
          translate: 0 (-$animationMaxYTranslation);
        }
        30% {
          rotate: $animationMaxRotate;
        }
        50% {
          rotate: calc($animationMaxRotate / -2);
          scale: $animationMaxScale;
          translate: 0 calc($animationMaxYTranslation / -2);
        }
        75% {
          scale: max(1, calc($animationMaxScale / 2));
          rotate: calc($animationMaxRotate / 2);
          translate: 0 calc($animationMaxYTranslation / -4);
        }
      }

      &::before {
        content: attr(data-tech);
        position: absolute;
        top: 100%;
        left: 50%;
        translate: -50% 20px;
        opacity: 0;
        text-transform: capitalize;
        clip-path: polygon(
          0 10%,
          40% 10%,
          50% 0,
          60% 10%,
          100% 10%,
          100% 100%,
          0 100%
        );
        background-color: var(--background);
        padding: 5px;
        border-radius: 5px;
        font-weight: bold;
        pointer-events: none;
        transition: $techNameAnimationDuration;
        text-wrap: nowrap;
      }
      &:hover {
        &::before {
          opacity: 1;
          translate: -50% 5px;
        }

        > img {
          animation: hoverIconAnimation 0.75s ease-in-out;
        }
      }
    }
  }
</style>
