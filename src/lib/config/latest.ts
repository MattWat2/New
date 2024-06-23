import { configV1 } from './v1';
import { configV2, migrateV1ToV2, type ConfigV2, defaultConfigV2 } from './v2';
import { z } from 'zod';

export const configLatest = configV2;
export type ConfigLatest = ConfigV2;

export const configAny = z.discriminatedUnion('version', [configV1, configV2]);
export type ConfigAny = z.infer<typeof configAny>;

export const migrateToLatest = (config: ConfigAny): ConfigLatest => {
	if (config.version === 1.9) {
		const next = migrateV1ToV2(config);
		console.info(`Migrated v${config.version} to v${next.version}`, next);
		return migrateToLatest(next);
	}

	return config;
};

export const defaultConfig: ConfigLatest = defaultConfigV2;
