/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StorageAdapter } from '.';
import { deepEqual } from '../../deepEqual';

/** Use `chrome` extension storage API provided by Chrome */
export const chromeStorageAdapter: StorageAdapter = {
	name: 'Chrome browser extension',
	isSupported: typeof chrome !== 'undefined',

	get: async () => {
		const sync = await chrome.storage.sync.get();

		if (Object.keys(sync).length > 0) {
			return sync;
		}

		// Backwards compatibility with config from previous versions stored in local
		const local = await chrome.storage.local.get();
		if (Object.keys(local).length > 0) {
			return local;
		}

		return undefined;
	},

	set: async (val) => {
		console.debug('Storing in Chrome sync:', val);
		return await chrome.storage.sync.set(val);
	},

	subscribeToExternalChanges: (getLocalState, onChange) => {
		chrome.storage.sync.onChanged.addListener((changes) => {
			const val = getLocalState();
			const dirtyChanges = Object.fromEntries(
				Object.entries(changes).filter(([k, c]) => !deepEqual(c.newValue, val?.[k]))
			);
			if (Object.keys(dirtyChanges).length > 0) {
				console.info('Settings updated externally', dirtyChanges);
				onChange();
			} else {
				console.debug('Settings change event was ignored as already up-to-date');
			}
		});
	}
};
