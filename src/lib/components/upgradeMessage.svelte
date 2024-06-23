<script lang="ts">
	import { config } from '../stores/config';
	import { onMount } from 'svelte';

	const appVersion = APP_VERSION;

	let previousVersion: string | undefined;

	onMount(() => {
		previousVersion = $config.appVersion;
		console.log(`Previous version is ${previousVersion}; this version is ${appVersion}`);

		config.update((c) => ({ ...c, appVersion }));
	});
</script>

<span class="message">
	{#if previousVersion === undefined}
		Welcome to Binary Tab! Hover here for settings.
	{:else if previousVersion < appVersion}
		Upgraded to v{appVersion}. Hover here for settings.
	{/if}
</span>

<style>
	.message {
		font-size: 0.875rem;
	}
</style>
