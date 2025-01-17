<script lang="ts">
	import Article from "$lib/components/article.svelte";
	import Header from "$lib/components/header.svelte";
	import { reveal } from "svelte-reveal";
	import type { PageData } from "./$types";
	import { onMount } from "svelte";
	export let data: PageData;

	onMount(() => {
		document.body.style.setProperty("--blog-bg", `url(${data.thumbnail})`);
	});
</script>

<svelte:head>
	<title>Le Blog</title>
	<meta name="title" content="Johan Janin - Le Blog" />
	<meta
		name="description"
		content="Un petit blog créé pour partager mon savoir et mes découvertes!"
	/>
	<meta property="og:image" content="/logo.svg" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="johan-janin.com" />
	<meta property="twitter:url" content="https://johan-janin.com" />
	<meta name="twitter:title" content="Johan Janin - Le Blog" />
	<meta
		name="twitter:description"
		content="Un petit blog créé pour partager mon savoir et mes découvertes!"
	/>
	<meta name="twitter:image" content="/logo.svg" />
</svelte:head>

<Header>
	<h1>Bienvenue sur mon <span>blog</span>!</h1>
	<p>Es-tu prêts à en apprendre un peu plus sur le web ?</p>
</Header>

<main id="blog-content">
	<h2>Voici mes derniers articles:</h2>
	<ul class="article-list">
		{#each Array.from(data.articles)
			.sort((a, b) => b.metadata.time.created.getTime() - a.metadata.time.created.getTime())
			.slice(0, 5) as article, i}
			<li
				use:reveal={{
					delay: 100 * i,
					y: 0,
				}}
			>
				<Article {article} />
			</li>
		{/each}
	</ul>
</main>

<style lang="scss">
	@import "$lib/_colors.scss";

	:global(body:has(#blog-content) > div) {
		background: var(--blog-bg), var(--background);
		background-size: cover;
		background-position: center;
		background-attachment: fixed;
	}
	:global(body:has(#blog-content) > div > div:not(#navbar)) {
		backdrop-filter: blur(calc(var(--scroll) * 15px + 2.5px));
	}
	:global(body:has(#blog-content) footer) {
		margin-top: 0;
	}
	:global(body:has(#blog-content) > div > *:not(footer)) {
		color: $white;
	}

	main {
		padding: 25px;

		ul.article-list {
			list-style: none;
			margin: 25px 10px;

			display: flex;
			align-items: stretch;
			justify-content: center;
			flex-wrap: wrap;
			gap: 20px;
		}
	}
</style>
