/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StorageAdapter } from '.';

/** Use `chrome` extension storage API provided by Chrome */
export class ChromeStorageAdapter<T extends { [key: string]: any }> implements StorageAdapter<T> {
	name = 'Chrome browser extension';
	isSupported = typeof chrome !== 'undefined';

	async get() {
		const sync = await chrome.storage.sync.get();

		if (Object.keys(sync).length > 0) {
			return sync as T;
		}

		// Backwards compatibility with config from previous versions stored in local
		const local = await chrome.storage.local.get();
		if (Object.keys(sync).length > 0) {
			return local as T;
		}

		return undefined;
	}

	async set(val: T) {
		return await chrome.storage.sync.set(val);
	}

	subscribeToExternalChanges(getLocalState: () => void, onChange: () => void | Promise<void>) {
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
}
