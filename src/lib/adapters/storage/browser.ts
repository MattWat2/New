/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StorageAdapter } from '.';

/** Use `browser` extension storage API provided by Firefox */
export class BrowserStorageAdapter<T extends { [key: string]: any }> implements StorageAdapter<T> {
	name = 'generic browser extension';
	isSupported = typeof browser !== 'undefined';

	async get() {
		const sync = await browser.storage.sync.get();

		if (Object.keys(sync).length > 0) {
			return sync as T;
		}

		return undefined;
	}

	async set(val: T) {
		return await browser.storage.sync.set(val);
	}

	subscribeToExternalChanges(getLocalState: () => void, onChange: () => void | Promise<void>) {
		browser.storage.sync.onChanged.addListener((changes) => {
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
