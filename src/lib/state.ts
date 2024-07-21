import { writable } from 'svelte/store';

export type AppState = {
	excludeStaminaFromAttackCalc: boolean;
};

export type UIState = {
	showAttributeInfo: string | null;
};

export const appState = writable<AppState>({
	excludeStaminaFromAttackCalc: false
});

export const uiState = writable<UIState>({
	showAttributeInfo: null
});
