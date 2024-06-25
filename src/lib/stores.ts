import { writable } from 'svelte/store';
import type { Item } from './core/Item';

export const itemStore = writable<Record<string, Item>>({});

export type EquipState = {
  rune: Item | null;
  pouch: Item | null;
  pouch2: Item | null;
  pouch3: Item | null;
  pouch4: Item | null;
  head: Item | null;
  chest: Item | null;
  legs: Item | null;
  hand: Item | null;
  mainHand: Item | null;
  offHand: Item | null;
}

export const equipStore = writable<EquipState>({
  rune: null,
  pouch: null,
  pouch2: null,
  pouch3: null,
  pouch4: null,
  head: null,
  chest: null,
  legs: null,
  hand: null,
  mainHand: null,
  offHand: null,
});
