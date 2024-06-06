import { derived, writable } from 'svelte/store';
import type { Attribute } from './types';

export type AttributeState = Record<string, Attribute>;

export type AppState = {
  maxLevel: number;
  attributePointsPerLevel: number;
  attributes: AttributeState
}

export const appState = writable<AppState>({
  maxLevel: 0,
  attributePointsPerLevel: 0,
  attributes: {}
});

export const attributeState = derived(appState, (s) => s.attributes);
