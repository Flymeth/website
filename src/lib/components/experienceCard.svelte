<script lang="ts">
	import type { Experience } from "$lib/server/posts_utilities/experiences";
	import { faXmark } from "@fortawesome/free-solid-svg-icons";
	import SvelteFA from "svelte-fa";
	import MediaLink from "./mediaLink.svelte";
	import { writable } from "svelte/store";
	import { navHeight } from "./nav.svelte";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import gsap from "gsap";

	export let exp: Experience;
	const date = exp.date;
	const doc = exp.document;

	const formater = new Intl.DateTimeFormat("fr-FR", {
		dateStyle: "long",
	});
	const hoursFormater = new Intl.DateTimeFormat("fr-FR", {
		hourCycle: "h24",
		hour: "numeric",
	});

	let isReportOpen = writable(false);
	onMount(() => {
		isReportOpen.subscribe((value) => {
			document.body.classList.toggle("noscroll", value);
		});
	});
</script>

<div class="exp-card">
	<header>
		<h2>{exp.title}</h2>
		<span>
			{date instanceof Array
				? `Du ${formater.format(date[0])} au ${formater.format(date[1])} (${hoursFormater.format(date[0])} - ${hoursFormater.format(date[1])})`
				: formater.format(date)}
		</span>
	</header>
	<p>{exp.description}</p>

	<div class="action">
		<ul>
			{#each Object.entries(exp.links) as [type, link]}
				<li>
					<MediaLink
						link={{
							href: link,
							media: type,
							target: "_blank",
						}}
					>
						<p>
							{type}
						</p>
					</MediaLink>
				</li>
			{/each}
		</ul>

		<button on:click={() => ($isReportOpen = !!doc)}>Voir le rapport</button
		>
	</div>
</div>

{#if $isReportOpen && doc}
	{@const docName = doc.split("/").at(-1)}
	<div class="report" style:--nav-height={navHeight} transition:fade>
		<embed
			src={exp.document}
			type="application/pdf"
			title={docName}
			on:mouseenter={() => {
				gsap.to(document.body, {
					"--cursor-opacity": 0,
				});
			}}
			on:close={() => ($isReportOpen = false)}
		/>

		<aside>
			<header>
				<h3>{docName}</h3>
				<button on:click={() => ($isReportOpen = false)}>
					<SvelteFA icon={faXmark} />
				</button>
			</header>

			<main>
				<h3>Periode de l'experience</h3>
				{#if date instanceof Array}
					<p>
						{date[0].toLocaleDateString()} - {date[1].toLocaleDateString()}
					</p>
					<p>
						De {hoursFormater.format(date[0])} à {hoursFormater.format(
							date[1]
						)}.
					</p>
				{:else}
					{formater.format(date)}
				{/if}

				<h3>Skills acquis</h3>
				<ul>
					{#each exp.skills as skill}
						<li>{skill}</li>
					{/each}
				</ul>
			</main>
		</aside>
	</div>
{/if}

<style lang="scss">
	.exp-card {
		> header {
			margin-bottom: 10px;

			> h2 {
				color: var(--primary);
			}
			> span {
				font-style: italic;
				font-size: 0.75em;
			}
		}

		> .action {
			margin-top: 10px;
			> ul {
				list-style: none;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				gap: 15px;
				max-width: 500px;

				margin-bottom: 15px;
				text-transform: capitalize;

				:global(> li > a) {
					display: flex;
					align-items: center;
					gap: 10px;
				}
			}
		}
	}

	.report {
		position: fixed;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
		padding: 25px 15px;
		padding-top: calc(10px + var(--nav-height));

		backdrop-filter: blur(25px);

		z-index: 15;

		display: grid;
		grid-template-columns: 1fr auto;
		gap: 25px;

		> aside {
			height: 100%;

			> header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 5px;
				max-width: 400px;
			}

			> main {
				> h3 {
					margin-top: 15px;
				}
			}
		}

		> embed {
			width: 100%;
			height: 100%;
			object-position: center;
			border-radius: 5px;
		}

		@media screen and (max-width: 760px) {
			display: flex;
			flex-direction: column-reverse;

			overflow-y: scroll;
			> aside {
				height: unset;
				> header {
					max-width: unset !important;
				}
			}
		}
	}
</style>
