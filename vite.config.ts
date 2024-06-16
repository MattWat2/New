import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [svelte()],
	esbuild: {
		supported: {
			'top-level-await': true
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version)
	}
});
