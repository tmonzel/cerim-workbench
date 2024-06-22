import { writable } from 'svelte/store';
import type { Item } from './Item';

export type EquipState = {
  neck: Item | null;
  head: Item | null;
  chest: Item | null;
  legs: Item | null;
  hand: Item | null;
  feet: Item | null;
  mainHand: Item | null;
  offHand: Item | null;
  pocket: Item | null;
}

export const equipStore = writable<EquipState>({
  neck: null,
  head: null,
  chest: null,
  legs: null,
  hand: null,
  feet: null,
  mainHand: null,
  offHand: null,
  pocket: null
});
