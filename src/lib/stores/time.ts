import { readonly, writable } from 'svelte/store';

const writeableTime = writable(new Date());
export const time = readonly(writeableTime);

setInterval(() => {
	writeableTime.set(new Date());
}, 1000);
