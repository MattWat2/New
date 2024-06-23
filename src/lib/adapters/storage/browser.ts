/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StorageAdapter } from '.';
import { deepEqual } from '../../deepEqual';

/** Use `browser` extension storage API provided by Firefox */
export const browserStorageAdapter: StorageAdapter = {
	name: 'generic browser extension',
	isSupported: typeof browser !== 'undefined',

	get: async () => {
		const sync = await browser.storage.sync.get();

		if (Object.keys(sync).length > 0) {
			return sync;
		}
		Intl.PluralRules;
		return undefined;
	},

	set: async (val) => {
		console.debug('Storing in browser sync:', val);
		return await browser.storage.sync.set(val);
	},

	subscribeToExternalChanges: (getLocalState, onChange) => {
		browser.storage.sync.onChanged.addListener((changes) => {
			const val = getLocalState();
			const dirtyChanges = Object.fromEntries(
				Object.entries(changes).filter(([k, c]) => !deepEqual(c.newValue, val?.[k]))
			);
			if (Object.keys(dirtyChanges).length > 0) {
				console.log('Settings updated externally:', dirtyChanges);
				onChange();
			} else {
				console.debug('Settings change event was ignored as already up-to-date');
			}
		});
	}
};
