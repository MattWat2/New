<script lang="ts">
	import Clock from '$lib/components/clock.svelte';
	import Config from '$lib/components/config.svelte';
	import ThemeProvider from '$lib/components/themeProvider.svelte';

	let time = new Date();

	setInterval(() => {
		time = new Date();
	}, 1000);
</script>

<ThemeProvider>
	<Clock {time} belowHints={'digits'} rowHints={true} />
	<Config />
</ThemeProvider>
