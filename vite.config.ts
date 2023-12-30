import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import circularDeps from "vite-plugin-circular-dependency";

export default defineConfig({
	plugins: [
		sveltekit(), circularDeps({
			circleImportThrowErr: true
		})
	],
	assetsInclude: ["./posts/**/*"],
	server: {
		fs: {
			allow: ["./posts"]			
		}
	}
});
