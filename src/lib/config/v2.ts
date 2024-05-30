import { z } from 'zod';
import type { ConfigV1 } from './v1';

export const configV2 = z.object({
	version: z.literal(2),
	belowHints: z.enum(['off', 'letters', 'digits']),
	size: z.enum(['xs', 'sm', 'md', 'lg']),
	bookmarksBar: z.enum(['off', 'auto_hide', 'show']),
	rightHints: z.boolean(),

	colorLight: z.enum(['blue', 'green', 'grey', 'orange', 'pink', 'white']),
	colorDark: z.enum(['black', 'blue', 'green', 'grey', 'red']),

	hexLight: z.boolean(),
	hexDark: z.boolean(),

	inversion: z.discriminatedUnion('method', [
		z.object({ method: z.literal('on') }),
		z.object({ method: z.literal('off') }),
		z.object({
			method: z.literal('auto_coordinates'),
			lat: z.number().min(-90).max(90),
			long: z.number().min(-180).max(180)
		})
	]),

	showMessage: z.enum(['none', 'migrated', 'new'])
});

export type ConfigV2 = z.infer<typeof configV2>;

export const defaultConfigV2: ConfigV2 = {
	version: 2,
	belowHints: 'digits',
	rightHints: true,
	hexDark: false,
	hexLight: false,
	inversion: {
		method: 'off'
	},
	colorLight: 'green',
	colorDark: 'green',
	size: 'md',
	bookmarksBar: 'show',
	showMessage: 'new'
};

const belowHintsMigration: Record<ConfigV1['lastrow'], ConfigV2['belowHints']> = {
	nothing: 'off',
	letters: 'letters',
	digits: 'digits'
};

const sizeMigration: Record<ConfigV1['size'], ConfigV2['size']> = {
	'1': 'xs',
	'2': 'sm',
	'3': 'md',
	'4': 'lg'
};

const bookmarksBarMigration: Record<ConfigV1['bookmarks'], ConfigV2['bookmarksBar']> = {
	'0': 'off',
	'1': 'auto_hide',
	'2': 'show'
};

const booleanMigration: Record<'0' | '1', boolean> = {
	'0': false,
	'1': true
};

const inversionMigration = (
	v1: Pick<ConfigV1, 'invert' | 'auto-invert' | 'lat' | 'long'>
): ConfigV2['inversion'] => {
	if (v1['auto-invert']) {
		return {
			method: 'auto_coordinates',
			lat: v1.lat,
			long: v1.long
		};
	}

	if (v1.invert === '1') {
		return {
			method: 'on'
		};
	}

	return {
		method: 'off'
	};
};

export const migrateV1ToV2 = (v1: ConfigV1): ConfigV2 => {
	return {
		version: 2,
		belowHints: belowHintsMigration[v1.lastrow],
		size: sizeMigration[v1.size],
		bookmarksBar: bookmarksBarMigration[v1.bookmarks],
		rightHints: booleanMigration[v1.showverttips],
		colorDark: v1.dark,
		colorLight: v1.light,
		inversion: inversionMigration(v1),
		hexDark: booleanMigration[v1.hex],
		hexLight: booleanMigration[v1['hex-light']],
		showMessage: 'migrated'
	};
};
