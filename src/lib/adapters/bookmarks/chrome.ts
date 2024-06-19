import type { Bookmark, BookmarksAdapter } from '.';

export const chromeBookmarksAdapter: BookmarksAdapter = {
	name: 'Chrome browser extension',
	isSupported: typeof chrome !== 'undefined',
	get: async () => {
		let bookmarksBars;
		try {
			bookmarksBars = await chrome.bookmarks.getSubTree('1');
		} catch {
			return [];
		}

		const children = bookmarksBars[0]?.children ?? [];

		return children
			.map((c) => (c.url ? ({ title: c.title, url: c.url } satisfies Bookmark) : undefined))
			.filter((c): c is Bookmark => c !== undefined);
	},
	subscribeToExternalChanges: (onChange) => {
		chrome.bookmarks.onChanged.addListener((id) => {
			chrome.bookmarks.get(id).then(([bookmark]) => {
				if (bookmark?.parentId === '1' && bookmark?.url) {
					onChange();
				}
			});
		});
	}
};
