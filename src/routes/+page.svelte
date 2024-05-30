<script lang="ts">
	import Clock from '$lib/components/clock.svelte';

	let time = new Date();

	setInterval(() => {
		time = new Date();
	}, 1000);
</script>

<Clock {time} belowHints={'digits'} rowHints={true} />
