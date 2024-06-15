<script lang="ts">
	import Bookmarks from '$lib/components/bookmarks.svelte';
	import Clock from '$lib/components/clock.svelte';
	import CloseIcon from '$lib/components/closeIcon.svelte';
	import Config from '$lib/components/config.svelte';
	import SettingsIcon from '$lib/components/settingsIcon.svelte';
	import ThemeProvider from '$lib/components/themeProvider.svelte';
	import { config } from '$lib/stores/config';

	let settingsOpen = false;
	$: settingsTitle = settingsOpen ? 'Close settings' : 'Show settings';
</script>

<ThemeProvider>
	<div class="container" class:settingsOpen>
		<div class="bookmarksContainer">
			{#if $config.bookmarksBar !== 'off'}
				<Bookmarks />
			{/if}
		</div>
		<div class="clockContainer">
			<Clock />
			<div class="toggleSettingsHoverZone" aria-hidden="true" />
			<button
				class="toggleSettings"
				class:autoHide={!settingsOpen}
				aria-label={settingsTitle}
				title={settingsTitle}
				on:click={() => {
					settingsOpen = !settingsOpen;
				}}
				>{#if settingsOpen}
					<CloseIcon />
				{:else}
					<SettingsIcon />
				{/if}</button
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

	.bookmarksContainer {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
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

	.toggleSettingsHoverZone {
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 50%;
		min-width: 500px;
		height: calc(3rem + 30vh);
	}

	.toggleSettings {
		position: absolute;
		left: 1rem;
		bottom: 1rem;
		padding: 0;
		font-size: 1rem;
		border: none;
		cursor: pointer;
		transition: opacity 0.3s ease-in-out;
	}

	.toggleSettings.autoHide {
		opacity: 0;
		pointer-events: none;
	}

	.toggleSettingsHoverZone:hover ~ .toggleSettings,
	.toggleSettings:hover {
		opacity: 1;
		pointer-events: initial;
	}

	.configContainer {
		grid-row: 3 / 4;
	}
</style>
