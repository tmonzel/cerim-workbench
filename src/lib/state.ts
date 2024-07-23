import { writable } from 'svelte/store';

export type AppState = {
	heroType: string;
	heroContext: string;
	excludeStaminaFromAttackCalc: boolean;
};

export type UIState = {
	showAttributeInfo: string | null;
};

export const appState = writable<AppState>({
	heroType: 'wretch',
	heroContext: 'attack',
	excludeStaminaFromAttackCalc: false
});

export const uiState = writable<UIState>({
	showAttributeInfo: null
});
