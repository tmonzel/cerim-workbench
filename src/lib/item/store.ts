import { writable } from 'svelte/store';
import type { Item } from './Item';

export type ItemState = {
  weapons: Record<string, Item>;

  helmets: Record<string, Item>;
  armors: Record<string, Item>;
  legs: Record<string, Item>;
  gauntlets: Record<string, Item>;

  runes: Record<string, Item>;
  talismans: Record<string, Item>;
}

export const itemStore = writable<ItemState>({
  weapons: {},
  helmets: {},
  armors: {},
  legs: {},
  gauntlets: {},
  runes: {},
  talismans: {}
});
