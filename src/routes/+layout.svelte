<script context="module" lang="ts">
  import { isNavOpen } from "$lib/components/nav.svelte";
</script>

<script lang="ts">
  import "../app.scss";
  import "highlight.js/styles/atom-one-dark.min.css";
  import { afterNavigate, beforeNavigate, onNavigate } from "$app/navigation";
  import { onMount } from "svelte";
  import SubLoader from "$lib/components/subLoader.svelte";
  import { navigating as isNavigating } from "$app/stores";
  import { isMobile } from "$lib/ts/mobile";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { gsap } from "gsap/dist/gsap";
  gsap.registerPlugin(ScrollTrigger);

  let navigating = false;
  let scrollTween: GSAPTween | undefined;
  // Add page transition
  //>> https://svelte.dev/blog/view-transitions
  onNavigate((navigation) => {
    $isNavOpen = false;

    //@ts-ignore
    if (!document.startViewTransition) return;
    navigating = true;

    return new Promise((resolve) => {
      //@ts-ignore
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
        navigating = false;
        document.body.classList.remove("noscroll");
      });
    });
  });
  beforeNavigate(() => {
    navigating = true;
  });
  afterNavigate(() => {
    navigating = false;
    if (scrollTween) scrollTween.scrollTrigger?.kill(true, true);
    scrollTween = gsap.to(document.scrollingElement, {
      "--scroll": 1,
      scrollTrigger: {
        scrub: 1,
        start: "top top",
        end: "bottom bottom",
      },
    });
  });

  onMount(() => {
    window.addEventListener("resize", () => {
      console.warn(
        "Hey! You just resized the window. Please reload the page if you switched between the mobile and the pc version."
      );
    });
    if (isMobile()) document.body.setAttribute("data-mobile", "");
  });
</script>

<svelte:head>
  <!-- Google Tag Manager -->
  <script>
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-WZ9SJV75");
  </script>
  <!-- End Google Tag Manager -->

  <meta property="og:site_name" content="johan-janin.com" />
  <meta property="og:type" content="website" />
  <meta property="theme-color" content="#FF7F11" />
</svelte:head>

<!-- Google Tag Manager (noscript) -->
<noscript
  ><iframe
    src="https://www.googletagmanager.com/ns.html?id=GTM-WZ9SJV75"
    height="0"
    width="0"
    style="display:none;visibility:hidden"
    title="Google Tag Manager"
  ></iframe></noscript
>
<!-- End Google Tag Manager (noscript) -->

{#if navigating || $isNavigating}
  <SubLoader />
{/if}

<slot />
