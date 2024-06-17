import { BrowserStorageAdapter } from './browser';
import { ChromeStorageAdapter } from './chrome';
import { LocalStorageAdapter } from './localStorage';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface StorageAdapter<T extends { [key: string]: any }> {
	name: string;
	isSupported: boolean;
	get: () => Promise<T | undefined>;
	set: (items: T) => Promise<void>;
	/**
	 * @param getLocalState Get the in-memory state of this instance
	 * @param onChange Function to call if storage deviates from local state
	 */
	subscribeToExternalChanges: (
		getLocalState: () => T,
		onChange: () => void | Promise<void>
	) => void;
}

export const getStorageAdapter = <T extends { [key: string]: any }>(): StorageAdapter<T> => {
	const adapter = [
		new BrowserStorageAdapter<T>(),
		new ChromeStorageAdapter<T>(),
		new LocalStorageAdapter<T>()
	].find((adapter) => adapter.isSupported);

	if (adapter === undefined) {
		throw new Error('No supported storage adapter');
	}

	console.info(`Using ${adapter.name} storage adapter`);

	return adapter;
};
