<script lang="ts">
	import Clock from '$lib/components/clock.svelte';
	import Config from '$lib/components/config.svelte';
	import ThemeProvider from '$lib/components/themeProvider.svelte';

	let settingsOpen = false;
</script>

<ThemeProvider>
	<div class="container" class:settingsOpen>
		<div class="clockContainer">
			<Clock />
			<button
				class="showSettings"
				on:click={() => {
					settingsOpen = !settingsOpen;
				}}>Show settings</button
			>
		</div>
		<div class="configContainer">
			<Config />
		</div>
	</div>
</ThemeProvider>

<style>
	.container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 0 1fr 0;
		overflow: hidden;
		flex-direction: column;
		height: 100%;
		min-height: 100%;
	}

	.container.settingsOpen {
		grid-template-rows: 0 minmax(400px, 1fr) max-content;
		height: initial;
	}

	.clockContainer {
		grid-row: 2 / 3;
		font-size: var(--bt-size);
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		background-color: var(--bt-color-bg);
		transition:
			background-color 0.3s ease-in-out,
			height 0.3s ease-in-out,
			font-size 0.3s cubic-bezier(0.42, 0, 0.3, 1.4);
		justify-content: center;
		position: relative;
	}

	.showSettings {
		position: absolute;
		left: 1rem;
		bottom: 1rem;
		font-size: 1rem;
	}

	.configContainer {
		grid-row: 3 / 4;
	}
</style>
