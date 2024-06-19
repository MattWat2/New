import type { Bookmark, BookmarksAdapter } from '.';

export const browserBookmarksAdapter: BookmarksAdapter = {
	name: 'generic browser extension',
	isSupported: typeof browser !== 'undefined',
	get: async () => {
		let bookmarksBars;
		try {
			bookmarksBars = await browser.bookmarks.getSubTree('1');
		} catch {
			return [];
		}

		const children = bookmarksBars[0]?.children ?? [];

		return children
			.map((c) => (c.url ? ({ title: c.title, url: c.url } satisfies Bookmark) : undefined))
			.filter((c): c is Bookmark => c !== undefined);
	},
	subscribeToExternalChanges: (onChange) => {
		browser.bookmarks.onChanged.addListener((id) => {
			browser.bookmarks.get(id).then(([bookmark]) => {
				if (bookmark?.parentId === '1' && bookmark?.url) {
					onChange();
				}
			});
		});
	}
};
