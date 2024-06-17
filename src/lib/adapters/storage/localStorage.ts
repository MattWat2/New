/* eslint-disable @typescript-eslint/no-explicit-any */
import type { StorageAdapter } from '.';

/** Use `localStorage` API for non-extension usage */
export class LocalStorageAdapter<T extends { [key: string]: any }> implements StorageAdapter<T> {
	name = 'local storage';
	isSupported = typeof window.localStorage !== 'undefined';

	async get() {
		const storedVal = localStorage.getItem('config');

		return storedVal == null ? undefined : JSON.parse(storedVal);
	}

	async set(val: T) {
		localStorage.setItem('config', JSON.stringify(val));
	}

	subscribeToExternalChanges(_: () => void, onChange: () => void | Promise<void>) {
		window.addEventListener('storage', () => {
			onChange();
		});
	}
}
