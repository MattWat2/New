import { readonly, writable } from 'svelte/store';
import { configAny, defaultConfig, migrateToLatest, type ConfigLatest } from '$lib/config/latest';

// In development, fall back to stub when no chrome or browser
const stubSource = import.meta.env.PROD
	? undefined
	: {
			storage: {
				sync: {
					get: () => JSON.parse(localStorage.getItem('stubStorage') ?? '{}'),
					set: (obj: unknown) => localStorage.setItem('stubStorage', JSON.stringify(obj))
				},
				local: {
					get: () => ({})
				}
			}
		};
const source = stubSource ?? chrome ?? browser;

const loadConfig = async (): Promise<ConfigLatest> => {
	const [modernConfigFromSync, legacyConfigFromLocal] = await Promise.all([
		source.storage.sync.get(),
		source.storage.local.get()
	]);

	// Attempt to load modern config (v2+)
	const configModernParse = configAny.safeParse(modernConfigFromSync);
	if (configModernParse.success) {
		return migrateToLatest(configModernParse.data);
	}

	// Fallback to legacy config (v1)
	const configLegacyParse = configAny.safeParse(legacyConfigFromLocal);
	if (configLegacyParse.success) {
		return migrateToLatest(configLegacyParse.data);
	}

	return defaultConfig;
};

const initialConfig = await loadConfig();

export const writeableConfig = writable(initialConfig);
export const readonlyConfig = readonly(writeableConfig);

export const setConfig = (updates: Partial<ConfigLatest>) =>
	writeableConfig.update((existing) => ({
		...existing,
		updates
	}));

readonlyConfig.subscribe(async (newConfig) => {
	await source.storage.sync.set(newConfig);
});

readonlyConfig.subscribe(async (newConfig) => {
	console.info('Config updated to', newConfig);
});
