<script lang="ts">
	import { config } from '../stores/config';
	import { bookmarks } from '../stores/bookmarks';

	const ext = typeof chrome !== 'undefined';
</script>

<div class="bookmarksHoverZone" />

<div class="bookmarks" class:autoHide={$config.bookmarksBar === 'auto_hide'}>
	{#each $bookmarks as { title, url }}
		<a class="bookmark" href={url}>{title}</a>
	{/each}
</div>

<style>
	.bookmarksHoverZone {
		position: absolute;
		display: block;
		left: 0;
		top: 0;
		height: calc(100% + 10vh);
		width: 100%;
	}

	.bookmarks {
		display: flex;
		position: relative;
		gap: 0.5em;
		padding: 0.5em;
		flex-wrap: wrap;
		transition: opacity 0.3s ease-in-out;
	}

	.bookmarks.autoHide {
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s ease-in-out 2s;
	}

	.bookmarksHoverZone:hover ~ .bookmarks,
	.bookmarks:hover {
		opacity: 1;
		pointer-events: initial;
		transition: opacity 0.3s ease-in-out;
	}

	.bookmark,
	.bookmark:link {
		color: inherit;
		text-decoration: none;
		border: 1px solid var(--bt-color-fg);
		border-radius: 1em;
		padding: 0.1em 0.5em;
		max-width: 250px;
		text-overflow: ellipsis;
		text-wrap: nowrap;
		overflow: hidden;
		font-size: 0.875rem;
		transition:
			border-color 0.3s ease-in-out,
			color 0.3s ease-in-out;
	}
</style>
