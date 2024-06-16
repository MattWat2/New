<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { config } from '../stores/config';

	const ext = typeof chrome !== 'undefined';

	interface BookmarkLink {
		title: string;
		url: string;
	}

	let bookmarks: BookmarkLink[] = [];

	const updateBookmarks = () => {
		if (ext) {
			chrome.bookmarks.getTree((r) => {
				bookmarks = r.filter((r) => typeof r.url !== 'undefined') as BookmarkLink[];
			});
		}
	};

	onMount(() => {
		updateBookmarks();
		if (ext) {
			chrome.bookmarks.onChanged.addListener(updateBookmarks);
		}
	});

	onDestroy(() => {
		if (ext) {
			chrome.bookmarks.onChanged.removeListener(updateBookmarks);
		}
	});
</script>

<div class="bookmarksHoverZone" />

<div class="bookmarks" class:autoHide={$config.bookmarksBar === 'auto_hide'}>
	{#each bookmarks as { title, url }}
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
	}

	.bookmarksHoverZone:hover ~ .bookmarks,
	.bookmarks:hover {
		opacity: 1;
		pointer-events: initial;
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
	}
</style>
