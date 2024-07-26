<script lang="ts">
	import ExperienceCard from "$lib/components/experienceCard.svelte";
	import Header from "$lib/components/header.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<title>Mes experiences</title>
	<meta name="title" content="Johan Janin" />
	<meta
		name="description"
		content="Découvrez les différentes missions que l'on m'a confiées."
	/>
	<meta property="og:image" content="/icons/bg_white/logo_256.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="johan-janin.com" />
	<meta
		property="twitter:url"
		content="https://johan-janin.com/experiences"
	/>
	<meta name="twitter:title" content="Johan Janin" />
	<meta
		name="twitter:description"
		content="Découvrez les différentes missions que l'on m'a confiées."
	/>
	<meta name="twitter:image" content="/icons/bg_white/logo_256.png" />
</svelte:head>

<Header>
	<h1>Mes experiences</h1>
	<p>
		Au cours de mon apprentissage j'ai effectué plusieurs missions liées au
		développement web
	</p>
</Header>

<main>
	<ol>
		{#each data.experiences as exp}
			<li>
				<ExperienceCard {exp} />
			</li>
		{/each}
	</ol>
</main>

<style lang="scss">
	$timeline-width: 5px;
	$timeline-color: var(--secondary);
	$timeline-margin: 20px;

	main {
		padding: 0 $timeline-margin;

		ol {
			list-style: none;
			padding-left: $timeline-width + $timeline-margin;
			position: relative;

			&::before {
				content: "";
				position: absolute;

				top: 0.5em;
				bottom: 0.5em;
				left: 0;

				width: $timeline-width;

				background-image: linear-gradient(
					to bottom,
					transparent 0 50%,
					$timeline-color 50%
				);
				background-size: auto 10px;
				background-repeat: repeat-y;

				mask-image: linear-gradient(to top, transparent, black 20px);
			}

			> li {
				position: relative;

				&::before {
					content: "";
					position: absolute;

					top: 0;
					left: -($timeline-width + $timeline-margin);
					translate: -35% 55%;

					height: 15px;
					aspect-ratio: 1 / 1;
					border-radius: 50%;

					background-color: $timeline-color;
				}
			}
		}
	}
</style>
