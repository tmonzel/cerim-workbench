import { writable } from 'svelte/store';

export const selectedHeroType = writable<string>('wretch');
