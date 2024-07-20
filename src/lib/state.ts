import { writable } from 'svelte/store';

export type AppState = {
	showAttributeInfo: string | null;
};

export const appState = writable<AppState>({
	showAttributeInfo: null
});
