import type { BookmarksAdapter } from '.';

export const emptyBookmarksAdapter: BookmarksAdapter = {
	name: 'empty',
	isSupported: true,
	get: () => Promise.resolve([]),
	subscribeToExternalChanges: () => {}
};
