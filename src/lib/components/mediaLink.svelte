<script lang="ts" context="module">
	import {
		faCodepen,
		faDiscord,
		faFigma,
		faGithub,
		faStackOverflow,
	} from "@fortawesome/free-brands-svg-icons";
	import { faLink, faScroll } from "@fortawesome/free-solid-svg-icons";

	export const mediaIcons = {
		prototype: {
			icon: faFigma,
		},
		github: {
			icon: faGithub,
		},
		codesandbox: {
			icon: faCodepen,
		},
		codepen: {
			icon: faCodepen,
		},
		stackoverflow: {
			icon: faStackOverflow,
		},
		discord: {
			icon: faDiscord,
		},
		notion: {
			icon: faScroll,
		},
		internet: {
			icon: faLink,
		},
	};
</script>

<script lang="ts">
	import SvelteFA from "svelte-fa";

	export let link: {
		href: string;
		target?: string;
		title?: string;
		media: keyof typeof mediaIcons | (string & {});
	};
	export let iconOptions: Omit<SvelteFA["$$prop_def"], "icon"> = {};

	$: icon =
		link.media in mediaIcons
			? mediaIcons[link.media as keyof typeof mediaIcons].icon
			: faLink;
</script>

<a href={link.href} target={link.target} title={link.title}>
	<SvelteFA {icon} {...iconOptions} />
	<span>
		<slot />
	</span>
</a>
