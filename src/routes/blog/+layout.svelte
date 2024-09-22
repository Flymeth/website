<script lang="ts">
  import Nav from "$lib/components/nav.svelte";
  import "$lib/main.scss";
  import { onMount } from "svelte";
  import setupCursor from "$lib/ts/setupCursor";
  import { isMobile } from "$lib/ts/mobile";
  import Footer from "$lib/components/footer.svelte";
  import { browser } from "$app/environment";

  $: show_cursor_personnalisation = browser && !isMobile();
  onMount(() => {
    // Set cursor position (only update if the user is on desktop)
    !isMobile() && setupCursor();
  });
</script>

<Nav
  disable_sections={{
    custom_cursor: !show_cursor_personnalisation,
  }}
/>

<div>
  <slot />
</div>

<Footer />
