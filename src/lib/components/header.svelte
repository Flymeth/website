<script lang="ts">
  import Fa from "svelte-fa";
  import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
  import { faCircle } from "@fortawesome/free-regular-svg-icons";
  import { gsap } from "gsap";
  import { onMount } from "svelte";
  import { navHeight } from "./nav.svelte";

  export let bannerURL: string = "";

  let mouse: HTMLSpanElement;
  let circle: HTMLSpanElement;
  let header: HTMLElement;
  const scrollInsitationTimeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 1.5,
  });

  onMount(() => {
    scrollInsitationTimeline
      // Init
      .set(circle, {
        scale: 0,
        opacity: 0,
        x: "-50%",
        y: "-25%",
      })
      .from(mouse, {
        y: "-80%",
        ease: "power2.out",
      })

      // Mouse scale down + circle apparition
      .to(mouse, {
        scale: 0.75,
        rotateZ: -15,
      })
      .to(
        circle,
        {
          scale: 0.25,
          opacity: 0.25,
        },
        "<"
      )

      // Movement to the top
      .to(mouse, {
        y: "-100%",
        duration: 1,
        ease: "power1.in",
      })
      .to(
        circle,
        {
          y: "-125%",
          scale: 0.75,
          duration: 1,
          opacity: 1,
          ease: "power1.in",
        },
        "<"
      )

      // The mouse stops and circle goes to the void
      .to(mouse, {
        y: "-80%",
        scale: 1,
        rotateZ: 0,
        ease: "bounce.out",
      })
      .to(
        circle,
        {
          scale: 1,
          opacity: 0,
          y: "-150%",
          ease: "power1.out",
        },
        "<"
      );

    scrollInsitationTimeline.play();
  });
</script>

<!-- REQUIRING SVELTE 5 -->
<!-- {#snippet letterAnimation(words)}
    {#each sentence as letter}
        {#if /\s/.match(letter)}
            <span class="space"></span>
        {:else}
            <span class="letter">{a}</span>  
        {/if}
    {/each}
{/snippet} -->

<header bind:this={header} style="--banner:url({bannerURL})">
  <!-- <h1>
        {#each title as sentence, i}
            {@const isAccented = i % 2}

            {#if isAccented}
                <span class="accented">
                    {@render letterAnimation(sentence)}
                </span>
            {:else}
                {@render letterAnimation(sentence)}
            {/if}
        {/each}
    </h1> -->

  <slot />
  <button
    class="scroll-insitation nodefault"
    on:click={() => {
      const { height } = header.getBoundingClientRect();

      const top =
        height + header.scrollTop - parseInt(navHeight.replace("px", ""));
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }}
  >
    <span class="circle cursor-action" bind:this={circle}>
      <Fa icon={faCircle} style="regular" />
    </span>
    <span class="arrow cursor-action" bind:this={mouse}>
      <Fa icon={faArrowPointer} />
    </span>
  </button>
</header>

<style lang="scss">
  @import "$lib/_colors.scss";

  header {
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px 25px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: var(--banner);
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      z-index: -1;
      filter: blur(10px);
    }

    > :global(h1) {
      font-size: 50px;
    }
    > :global(h1 span) {
      color: var(--primary);
      font-family: inherit;
    }
    > :global(p) {
      font-style: italic;
      font-size: 20px;
    }
    @media screen and (max-width: 500px) {
      > :global(h1) {
        font-size: 35px;
      }
    }

    > .scroll-insitation {
      position: absolute;
      bottom: 50px;
      left: 50%;
      translate: 0 -50%;
      color: var(--secondary);
      border: none;
      appearance: none;
      font-size: inherit;

      > * {
        position: absolute;
        transform-origin: center center;
        will-change: transform, scale;

        &.arrow :global(svg g) {
          filter: drop-shadow(0 5px 50px $black);
        }
      }
    }
  }
</style>
