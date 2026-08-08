import { SvelteMap, SvelteSet } from 'svelte/reactivity';

export const cache = new SvelteMap<string, any>();
export const jobs = new SvelteSet<string>();

// tba: extensible via edge