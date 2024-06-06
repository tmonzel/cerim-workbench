import { derived, writable } from 'svelte/store';
import type { Attribute } from './types';
import type { Item } from './items/Item';

export type AttributeState = Record<string, Attribute>;

export type AppState = {
  maxLevel: number;
  attributePointsPerLevel: number;
  attributes: AttributeState;
  items: Item[];
}

export const appState = writable<AppState>({
  maxLevel: 0,
  attributePointsPerLevel: 0,
  attributes: {},
  items: []
});

export const attributeState = derived(appState, (s) => s.attributes);
export const itemState = derived(appState, (s) => s.items);
