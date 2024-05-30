import { z } from 'zod';

const checkboxValue = z.enum(['0', '1']);

export const configV1 = z.object({
	version: z.literal(1.9),
	lastrow: z.enum(['nothing', 'letters', 'digits']),
	light: z.enum(['blue', 'green', 'grey', 'orange', 'pink', 'white']),
	dark: z.enum(['black', 'blue', 'green', 'grey', 'red']),
	size: z.enum(['1', '2', '3', '4']),
	bookmarks: z.enum(['0', '1', '2']),
	invert: checkboxValue,
	showverttips: checkboxValue,
	hex: checkboxValue,
	'hex-light': checkboxValue,
	'auto-invert': checkboxValue,
	lat: z.number().min(-90).max(90),
	long: z.number().min(-180).max(180)
});

export type ConfigV1 = z.infer<typeof configV1>;
