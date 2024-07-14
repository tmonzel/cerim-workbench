import { writable } from 'svelte/store';
import type { SlotState } from './types';

export const slotStore = writable<SlotState>({
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
