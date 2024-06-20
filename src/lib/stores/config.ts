import { writable, get } from 'svelte/store';
import {
	configAny,
	defaultConfig,
	migrateToLatest,
	type ConfigLatest,
	configLatest
} from '../config/latest';
import { getStorageAdapter } from '../adapters/storage';

const storageAdapter = getStorageAdapter();

const loadConfig = async (): Promise<ConfigLatest> => {
	const config = await storageAdapter.get();

	const configParse = configAny.safeParse(config);
	if (configParse.success) {
		console.info(`Retrieved config with version ${configParse.data.version}`);
		return migrateToLatest(configParse.data);
	} else if (config !== undefined) {
		console.warn('Failed to parse stored config. Reverting to default.', configParse.error);
	}

	// If config missing or invalid, use default
	return defaultConfig;
};

const initialConfig = await loadConfig();

export const config = writable(initialConfig);
const validConfig = writable(initialConfig);

config.subscribe(async (newConfig) => {
	console.info('Config updated to', newConfig);
	const result = configLatest.safeParse(newConfig);

	if (result.success) {
		validConfig.set(result.data);
	} else {
		console.error('Attempted to update to invalid config. Rolling back.', result.error);
		config.set(get(validConfig));
	}
});

validConfig.subscribe(storageAdapter.set);

storageAdapter.subscribeToExternalChanges(
	() => get(config),
	() => {
		loadConfig().then(config.set);
	}
);
