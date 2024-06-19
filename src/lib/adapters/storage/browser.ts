/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StorageAdapter } from '.';

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
		return await browser.storage.sync.set(val);
	},

	subscribeToExternalChanges: (getLocalState, onChange) => {
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
};
