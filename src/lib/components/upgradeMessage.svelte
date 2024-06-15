<script lang="ts">
	import { writeableConfig as config } from '$lib/stores/config';
	import { onMount } from 'svelte';

	let previousVersion: string | undefined;

	onMount(() => {
		previousVersion = $config.appVersion;
		console.log('previous version is', previousVersion);
		$config.appVersion = APP_VERSION;
	});
</script>

{#if previousVersion === undefined}
	Welcome to Binary Tab! Hover here for settings.
{:else if previousVersion < APP_VERSION}
	Upgraded to v{APP_VERSION}
{/if}
