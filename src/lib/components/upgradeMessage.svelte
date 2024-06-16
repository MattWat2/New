<script lang="ts">
	import { writeableConfig as config } from '$lib/stores/config';
	import { onMount } from 'svelte';

	const appVersion = APP_VERSION;

	let previousVersion: string | undefined;

	onMount(() => {
		previousVersion = $config.appVersion;
		console.log('previous version is', previousVersion);
		$config.appVersion = appVersion;
	});
</script>

{#if previousVersion === undefined}
	Welcome to Binary Tab! Hover here for settings.
{:else if previousVersion < appVersion}
	Upgraded to v{appVersion}
{/if}
