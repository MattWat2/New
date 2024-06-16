<script lang="ts">
	import { config } from '../stores/config';
	import { time } from '../stores/time';

	// Persist last non-off hint state to enable animations
	let visBelowHints = $config.belowHints;
	config.subscribe((c) => {
		if (c.belowHints === 'off') {
			return;
		} else {
			visBelowHints = c.belowHints;
		}
	});

	$: hours10 = Math.floor($time.getHours() / 10);
	$: hours1 = $time.getHours() % 10;
	$: minutes10 = Math.floor($time.getMinutes() / 10);
	$: minutes1 = $time.getMinutes() % 10;
	$: seconds10 = Math.floor($time.getSeconds() / 10);
	$: seconds1 = $time.getSeconds() % 10;
</script>

<div class="clockGrid">
	<div class="col-digit-1 row-digit-1 bit h-10-1" class:on={hours10 & 0x1} />
	<div class="col-digit-1 row-digit-2 bit h-10-2" class:on={hours10 & 0x2} />
	<div class="col-digit-2 row-digit-1 bit h-1-1" class:on={hours1 % 10 & 0x1} />
	<div class="col-digit-2 row-digit-2 bit h-1-2" class:on={hours1 % 10 & 0x2} />
	<div class="col-digit-2 row-digit-4 bit h-1-4" class:on={hours1 % 10 & 0x4} />
	<div class="col-digit-2 row-digit-8 bit h-1-8" class:on={hours1 % 10 & 0x8} />
	<div class="col-digit-3 row-digit-1 bit m-10-1" class:on={minutes10 & 0x1} />
	<div class="col-digit-3 row-digit-2 bit m-10-2" class:on={minutes10 & 0x2} />
	<div class="col-digit-3 row-digit-4 bit m-10-4" class:on={minutes10 & 0x4} />
	<div class="col-digit-4 row-digit-1 bit m-1-1" class:on={minutes1 % 10 & 0x1} />
	<div class="col-digit-4 row-digit-2 bit m-1-2" class:on={minutes1 % 10 & 0x2} />
	<div class="col-digit-4 row-digit-4 bit m-1-4" class:on={minutes1 % 10 & 0x4} />
	<div class="col-digit-4 row-digit-8 bit m-1-8" class:on={minutes1 % 10 & 0x8} />
	<div class="col-digit-5 row-digit-1 bit s-10-1" class:on={seconds10 & 0x1} />
	<div class="col-digit-5 row-digit-2 bit s-10-2" class:on={seconds10 & 0x2} />
	<div class="col-digit-5 row-digit-4 bit s-10-4" class:on={seconds10 & 0x4} />
	<div class="col-digit-6 row-digit-1 bit s-1-1" class:on={seconds1 % 10 & 0x1} />
	<div class="col-digit-6 row-digit-2 bit s-1-2" class:on={seconds1 % 10 & 0x2} />
	<div class="col-digit-6 row-digit-4 bit s-1-4" class:on={seconds1 % 10 & 0x4} />
	<div class="col-digit-6 row-digit-8 bit s-1-8" class:on={seconds1 % 10 & 0x8} />

	<div class="hint col-hint row-digit-1">{$config.rightHints ? '1' : ''}</div>
	<div class="hint col-hint row-digit-2">{$config.rightHints ? '2' : ''}</div>
	<div class="hint col-hint row-digit-4">{$config.rightHints ? '4' : ''}</div>
	<div class="hint col-hint row-digit-8">{$config.rightHints ? '8' : ''}</div>

	<div class="hint col-digit-1 row-hint" class:hidden={$config.belowHints === 'off'}>
		{visBelowHints === 'letters' ? 'H' : hours10}
	</div>
	<div class="hint col-digit-2 row-hint" class:hidden={$config.belowHints === 'off'}>
		{visBelowHints === 'letters' ? 'H' : hours1}
	</div>
	<div class="hint col-digit-3 row-hint" class:hidden={$config.belowHints === 'off'}>
		{visBelowHints === 'letters' ? 'M' : minutes10}
	</div>
	<div class="hint col-digit-4 row-hint" class:hidden={$config.belowHints === 'off'}>
		{visBelowHints === 'letters' ? 'M' : minutes1}
	</div>
	<div class="hint col-digit-5 row-hint" class:hidden={$config.belowHints === 'off'}>
		{visBelowHints === 'letters' ? 'S' : seconds10}
	</div>
	<div class="hint col-digit-6 row-hint" class:hidden={$config.belowHints === 'off'}>
		{visBelowHints === 'letters' ? 'S' : seconds1}
	</div>
</div>

<style>
	.clockGrid {
		display: grid;
		grid-template-columns: 1.25em 1.25em 1.25em 0.125em 1.25em 1.25em 0.125em 1.25em 1.25em 1.25em;
		grid-template-rows: 1.25em 1.25em 1.25em 1.25em 1.25em;
		gap: 0.8em;
		align-items: center;
	}

	.bit {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		opacity: 0.1;
		transition:
			opacity 0.3s ease-in-out,
			background-color 0.3s ease-in-out;
		background-color: var(--bt-color-fg);
	}

	.bit.on {
		opacity: 1;
	}

	.hint {
		text-align: center;
		cursor: default;
		transition:
			opacity 0.3s ease-in-out,
			color 0.3s ease-in-out;
	}

	.hidden {
		opacity: 0;
	}

	.col-hint {
		grid-column: 10;
		opacity: var(--bt-col-hint-opacity);
	}

	.row-hint {
		grid-row: 5;
	}

	.col-hint,
	.row-hint {
		font-weight: var(--bt-hint-font-weight);
		font-size: calc(0.75rem + 0.25em);
	}

	.col-digit-1 {
		grid-column: 2;
	}

	.col-digit-2 {
		grid-column: 3;
	}

	.col-digit-3 {
		grid-column: 5;
	}

	.col-digit-4 {
		grid-column: 6;
	}

	.col-digit-5 {
		grid-column: 8;
	}

	.col-digit-6 {
		grid-column: 9;
	}

	.row-digit-1 {
		grid-row: 4;
	}

	.row-digit-2 {
		grid-row: 3;
	}

	.row-digit-4 {
		grid-row: 2;
	}

	.row-digit-8 {
		grid-row: 1;
	}
</style>
