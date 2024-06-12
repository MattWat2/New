<script lang="ts">
	import Clock from '$lib/components/clock.svelte';
	import Config from '$lib/components/config.svelte';
	import ThemeProvider from '$lib/components/themeProvider.svelte';
</script>

<ThemeProvider>
	<Clock />
	<Config />
</ThemeProvider>
