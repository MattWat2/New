import { browserBookmarksAdapter } from './browser';
import { chromeBookmarksAdapter } from './chrome';
import { emptyBookmarksAdapter } from './empty';

export interface Bookmark {
	title: string;
	url: string;
}

export interface BookmarksAdapter {
	name: string;
	isSupported: boolean;
	get: () => Promise<Bookmark[]>;
	subscribeToExternalChanges: (onChange: () => void | Promise<void>) => void;
}

export const getBookmarksAdapter = (): BookmarksAdapter => {
	const adapter = [chromeBookmarksAdapter, browserBookmarksAdapter, emptyBookmarksAdapter].find(
		(a) => a.isSupported
	);

	if (adapter === undefined) {
		throw new Error('No supported bookmarks adapter');
	}

	console.info(`Using ${adapter.name} bookmarks adapter`);

	return adapter;
};
