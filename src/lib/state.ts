import { writable } from 'svelte/store';

export type AppState = {
	maxLevel: number;
	attributePointsPerLevel: number;
};

export const appState = writable<AppState>({
	maxLevel: 713,
	attributePointsPerLevel: 1
});
