/* eslint-disable @typescript-eslint/no-explicit-any */
import { browserStorageAdapter } from './browser';
import { chromeStorageAdapter } from './chrome';
import { localStorageAdapter } from './localStorage';

export interface StorageAdapter {
	name: string;
	isSupported: boolean;
	get: () => Promise<Record<string, any> | undefined>;
	set: (items: Record<string, any>) => Promise<void>;
	/**
	 * @param getLocalState Get the in-memory state of this instance
	 * @param onChange Function to call if storage deviates from local state
	 */
	subscribeToExternalChanges: (
		getLocalState: () => Record<string, any>,
		onChange: () => void | Promise<void>
	) => void;
}

export const getStorageAdapter = (): StorageAdapter => {
	const adapter = [browserStorageAdapter, chromeStorageAdapter, localStorageAdapter].find(
		(adapter) => adapter.isSupported
	);

	if (adapter === undefined) {
		throw new Error('No supported storage adapter');
	}

	console.info(`Using ${adapter.name} storage adapter`);

	return adapter;
};
