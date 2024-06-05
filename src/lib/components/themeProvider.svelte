<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { derived } from 'svelte/store';

	const style = derived(theme, ($t) =>
		Object.entries($t)
			.map((e) => e.join(':'))
			.join(';')
	);
</script>

<div style={$style} class="theme-provider"><slot /></div>

<style>
	.theme-provider {
		display: contents;
		font-family: var(--bt-font-family);
		color: var(--bt-color-fg);
	}
</style>
