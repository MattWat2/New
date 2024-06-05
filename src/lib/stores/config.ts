import { readonly, writable, get } from 'svelte/store';
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
export const config = readonly(writeableConfig);

config.subscribe(async (newConfig) => {
	await source.storage.sync.set(newConfig);
});

config.subscribe(async (newConfig) => {
	console.info('Config updated to', newConfig);
});

if (typeof chrome !== 'undefined') {
	chrome.storage.sync.onChanged.addListener((changes) => {
		const val = get(config);
		const dirtyChanges = Object.fromEntries(
			Object.entries(changes).filter(([k, c]) => c.newValue !== val[k as keyof ConfigLatest])
		);
		if (Object.keys(dirtyChanges).length > 0) {
			console.log('Settings updated externally:', dirtyChanges);
			console.log('Reloading config');
			loadConfig().then(writeableConfig.set);
		}
	});
}
