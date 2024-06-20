<script lang="ts">
	import { config } from '../stores/config';
	import { bookmarks } from '../stores/bookmarks';
	import ConfigInvert from './configInvert.svelte';
	import { configLatest } from '../config/latest';

	const { colorDark, colorLight, belowHints, size, bookmarksBar } = configLatest.shape;
</script>

<div class="container">
	<div class="col1 col">
		<h1 class="heading">Settings</h1>
		<div>
			<label>
				<input type="checkbox" bind:checked={$config.rightHints} />
				Show numbers to the right
			</label>
		</div>
		<div>
			<label>
				Show
				<select bind:value={$config.belowHints}>
					<option value={belowHints.enum.off}>Nothing</option>
					<option value={belowHints.enum.letters}>Letters</option>
					<option value={belowHints.enum.digits}>Digits</option>
				</select>
				below clock
			</label>
		</div>
		<div>
			<label>
				Size:
				<select bind:value={$config.size}>
					<option value={size.enum.xs}>Tiny</option>
					<option value={size.enum.sm}>Small</option>
					<option value={size.enum.md}>Medium</option>
					<option value={size.enum.lg}>Large</option>
				</select>
			</label>
		</div>
		<h2>Colour</h2>
		<div>
			<label>
				Dark colour:
				<select bind:value={$config.colorDark} disabled={$config.hexDark}>
					<option value={colorDark.enum.black}>Black</option>
					<option value={colorDark.enum.grey}>Grey</option>
					<option value={colorDark.enum.green}>Green</option>
					<option value={colorDark.enum.blue}>Blue</option>
					<option value={colorDark.enum.red}>Red</option>
				</select>
			</label>
			<label>
				Hex
				<input type="checkbox" bind:checked={$config.hexDark} />
			</label>
		</div>
		<div>
			<label>
				Light colour:
				<select bind:value={$config.colorLight} disabled={$config.hexLight}>
					<option value={colorLight.enum.white}>White</option>
					<option value={colorLight.enum.grey}>Grey</option>
					<option value={colorLight.enum.green}>Green</option>
					<option value={colorLight.enum.blue}>Blue</option>
					<option value={colorLight.enum.pink}>Pink</option>
					<option value={colorLight.enum.orange}>Orange</option>
				</select>
			</label>
			<label>
				Hex
				<input type="checkbox" bind:checked={$config.hexLight} />
			</label>
		</div>
	</div>
	<div class="col2 col">
		{#if $bookmarks.length > 0}
			<h2>Bookmarks bar</h2>
			<label>
				<input type="radio" bind:group={$config.bookmarksBar} value={bookmarksBar.enum.off} />
				Hide
			</label>

			<label>
				<input type="radio" bind:group={$config.bookmarksBar} value={bookmarksBar.enum.auto_hide} />
				Show on hover
			</label>

			<label>
				<input type="radio" bind:group={$config.bookmarksBar} value={bookmarksBar.enum.show} />
				Show
			</label>
		{/if}
		<ConfigInvert bind:inversion={$config.inversion} />
	</div>
	<div class="col1 col">
		<!-- svelte-ignore missing-declaration -->
		<div>
			Version {APP_VERSION}
		</div>
	</div>
</div>

<style>
	.container {
		background-color: var(--bt-color-fg);
		color: var(--bt-color-bg);
		transition:
			color 0.3s ease-in-out,
			background-color 0.3s ease-in-out;
		padding: 2rem 0;
		display: grid;

		grid-template-columns:
			1rem
			[col1-start col2-start]
			1fr
			[col1-end col2-end]
			1rem;
		gap: 1rem;
	}

	@media screen and (min-width: 768px) {
		.container {
			grid-template-columns:
				2rem
				[col1-start col2-start]
				1fr
				[col1-end col2-end]
				2rem;
		}
	}

	@media screen and (min-width: 1024px) {
		.container {
			grid-template-columns:
				minmax(0, 1fr)
				[col1-start]
				512px
				[col1-end col2-start]
				512px
				[col2-end]
				minmax(0, 1fr);
		}
	}

	.col {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.col1 {
		grid-column: col1-start / col1-end;
	}

	.col2 {
		grid-column: col2-start / col2-end;
	}

	.heading {
		font-weight: 800;
	}
</style>
