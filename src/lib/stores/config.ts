import { readonly, writable, get } from 'svelte/store';
import { configAny, defaultConfig, migrateToLatest, type ConfigLatest } from '../config/latest';
import { getStorageAdapter } from '../adapters/storage';

const storageAdapter = getStorageAdapter();

const loadConfig = async (): Promise<ConfigLatest> => {
	const config = await storageAdapter.get();

	const configParse = configAny.safeParse(config);
	if (configParse.success) {
		return migrateToLatest(configParse.data);
	}

	// If config missing or invalid, use default
	return defaultConfig;
};

const initialConfig = await loadConfig();

export const writeableConfig = writable(initialConfig);
export const config = readonly(writeableConfig);

config.subscribe(storageAdapter.set);

config.subscribe(async (newConfig) => {
	console.info('Config updated to', newConfig);
});

storageAdapter.subscribeToExternalChanges(
	() => get(config),
	() => {
		loadConfig().then(writeableConfig.set);
	}
);
