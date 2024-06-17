import { it, describe, expect } from 'vitest';
import { migrateToLatest, type ConfigLatest } from './latest';
import { defaultConfigV2 } from './v2';
import { defaultConfigV1, type ConfigV1 } from './v1';

describe('migrating to the latest config version', () => {
	describe('when the config is already the latest version', () => {
		const input: ConfigLatest = {
			...defaultConfigV2,
			size: 'lg'
		};

		it('returns the same config', () => {
			const result = migrateToLatest(input);

			expect(result).toStrictEqual(input);
		});
	});

	describe('when the config is v1', () => {
		const input: ConfigV1 = {
			...defaultConfigV1,
			size: '4'
		};

		it('migrates it to the latest', () => {
			const result = migrateToLatest(input);

			expect(result).toMatchObject({
				version: 2,
				size: 'lg'
			} satisfies Partial<ConfigLatest>);
		});
	});
});
