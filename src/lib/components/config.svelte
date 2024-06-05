<script lang="ts">
	import { writeableConfig as config } from '$lib/stores/config';
</script>

<div class="container">
	<div class="contents">
		<h1 class="heading">Settings</h1>
		<div>
			<label>
				<input type="checkbox" bind:checked={$config.rightHints} />
				Show numbers to the right
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
		<div>
			<label>
				Dark colour:
				<select bind:value={$config.colorDark}>
					<option value="black">Black</option>
					<option value="grey">Grey</option>
					<option value="green">Green</option>
					<option value="blue">Blue</option>
					<option value="red">Red</option>
				</select>
			</label>
		</div>
		<div>
			<label>
				Light colour:
				<select bind:value={$config.colorLight}>
					<option value="white">White</option>
					<option value="grey">Grey</option>
					<option value="green">Green</option>
					<option value="blue">Blue</option>
					<option value="pink">Pink</option>
					<option value="orange">Orange</option>
				</select>
			</label>
		</div>
		<div>
			Version {APP_VERSION}
		</div>
	</div>
</div>

<style>
	.container {
		background-color: var(--bt-color-fg);
		color: var(--bt-color-bg);
		padding: 2rem 0;
	}

	.heading {
		font-weight: 800;
	}

	.contents {
		margin: 0 auto;
		max-width: 1000px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
