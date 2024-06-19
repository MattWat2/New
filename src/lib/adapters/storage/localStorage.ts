/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StorageAdapter } from '.';

/** Use `localStorage` API for non-extension usage */
export const localStorageAdapter: StorageAdapter = {
	name: 'local storage',
	isSupported: typeof window.localStorage !== 'undefined',

	get: async () => {
		const storedVal = localStorage.getItem('config');
		return storedVal == null ? undefined : JSON.parse(storedVal);
	},

	set: async (val) => {
		localStorage.setItem('config', JSON.stringify(val));
	},

	subscribeToExternalChanges: (_, onChange) => {
		window.addEventListener('storage', () => {
			onChange();
		});
	}
};
