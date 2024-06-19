/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StorageAdapter } from '.';

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
		if (Object.keys(sync).length > 0) {
			return local;
		}

		return undefined;
	},

	set: async (val) => {
		return await chrome.storage.sync.set(val);
	},

	subscribeToExternalChanges: (getLocalState, onChange) => {
		chrome.storage.sync.onChanged.addListener((changes) => {
			const val = getLocalState();
			const dirtyChanges = Object.fromEntries(
				Object.entries(changes).filter(([k, c]) => c.newValue !== val?.[k])
			);
			if (Object.keys(dirtyChanges).length > 0) {
				console.log('Settings updated externally:', dirtyChanges);
				onChange();
			}
		});
	}
};
