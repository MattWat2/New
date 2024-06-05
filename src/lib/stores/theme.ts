import type { ConfigLatest } from '$lib/config/latest';
import { derived } from 'svelte/store';
import { config } from './config';
import { time } from './time';

const sizes: Record<ConfigLatest['size'], string> = {
	xs: '0.5em',
	sm: '0.7em',
	md: '1.25em',
	lg: '2em'
};

const colorsLight: Record<ConfigLatest['colorLight'], string> = {
	white: 'rgb(252 252 252)',
	grey: 'rgb(220 220 220)',
	green: 'rgb(215 220 210)',
	blue: 'rgb(221 229 255)',
	pink: 'rgb(245 221 221)',
	orange: 'rgb(246 115 0)'
};

const colorsDark: Record<ConfigLatest['colorDark'], string> = {
	black: 'rgb(15 15 15)',
	grey: 'rgb(40 40 40)',
	green: 'rgb(40 45 35)',
	blue: 'rgb(49 52 78)',
	red: 'rgb(123 13 13)'
};

const padLeft =
	(desiredMinLength: number) =>
	(num: number): string => {
		let out = num.toString();
		while (out.length < desiredMinLength) {
			out = '0' + out;
		}
		return out;
	};

const pad2 = padLeft(2);

const darkFromTime = (time: Date) =>
	'#' + pad2(time.getHours()) + pad2(time.getMinutes()) + pad2(time.getSeconds());

const lightFromTime = (time: Date) => {
	const base = darkFromTime(time);

	return `color-mix(in srgb, ${base} 25%, white)`;
};

export const theme = derived([config, time], ([$c, $t]) => {
	const darkRgb = $c.hexDark ? darkFromTime($t) : colorsDark[$c.colorDark];
	const lightRgb = $c.hexLight ? lightFromTime($t) : colorsLight[$c.colorLight];
	return {
		'--bt-size': sizes[$c.size],
		'--bt-hint-font-weight': 400,
		'--bt-font-family': 'system-ui, Arial, sans-serif',
		'--bt-color-bg': $c.inversion.method === 'on' ? darkRgb : lightRgb,
		'--bt-color-fg': $c.inversion.method === 'on' ? lightRgb : darkRgb,
		'--bt-col-hint-opacity': $c.rightHints ? 1 : 0
	};
});
