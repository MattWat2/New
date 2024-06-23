import { writable } from 'svelte/store';
import { getBookmarksAdapter } from '../adapters/bookmarks';

const adapter = getBookmarksAdapter();

const initialBookmarks = await adapter.get();

export const bookmarks = writable(initialBookmarks);

bookmarks.subscribe(async (newBookmarks) => {
	console.debug('Bookmarks updated to', newBookmarks);
});

adapter.subscribeToExternalChanges(async () => {
	const latestBookmarks = await adapter.get();
	bookmarks.set(latestBookmarks);
});
