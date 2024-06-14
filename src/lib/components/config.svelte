<script lang="ts">
	import { writeableConfig as config } from '$lib/stores/config';
	import ConfigInvert from './configInvert.svelte';
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
					<option value="off">Nothing</option>
					<option value="letters">Letters</option>
					<option value="digits">Digits</option>
				</select>
				below clock
			</label>
		</div>
		<div>
			<label>
				Size:
				<select bind:value={$config.size}>
					<option value="xs">Tiny</option>
					<option value="sm">Small</option>
					<option value="md">Medium</option>
					<option value="lg">Large</option>
				</select>
			</label>
		</div>
		<h2>Colour</h2>
		<div>
			<label>
				Dark colour:
				<select bind:value={$config.colorDark} disabled={$config.hexDark}>
					<option value="black">Black</option>
					<option value="grey">Grey</option>
					<option value="green">Green</option>
					<option value="blue">Blue</option>
					<option value="red">Red</option>
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
					<option value="white">White</option>
					<option value="grey">Grey</option>
					<option value="green">Green</option>
					<option value="blue">Blue</option>
					<option value="pink">Pink</option>
					<option value="orange">Orange</option>
				</select>
			</label>
			<label>
				Hex
				<input type="checkbox" bind:checked={$config.hexLight} />
			</label>
		</div>
	</div>
	<div class="col2 col">
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
